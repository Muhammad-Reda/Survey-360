import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import apiClient from "../../services/Api"; // Asumsi Anda punya file ini

// Komponen untuk satu pertanyaan
const QuestionItem = ({ question, answer, onAnswerChange, questionNumber }) => {
  const questionId = question.id;
  const options = [1, 2, 3, 4, 5]; // Pilihan jawaban 1-5

  return (
    <div className="p-4 my-4 border rounded-lg shadow-sm">
      <p className="font-semibold mb-3">
        {questionNumber}. {question.prtn_isi}
      </p>
      <div className="flex justify-around">
        {options.map((value) => (
          <label key={value} className="flex flex-col items-center space-y-1 cursor-pointer">
            <input
              type="radio"
              name={`question_${questionId}`}
              value={value}
              checked={answer === value}
              onChange={() => onAnswerChange(questionId, value)}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span>{value}</span>
          </label>
        ))}
      </div>
    </div>
  );
};


// Komponen Halaman Utama Survei
export default function PublicSurveyPage() {
  const { slug } = useParams(); // Mengambil 'slug' dari URL, contoh: 'survei-sekolah-xyz'
  const navigate = useNavigate();

  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({}); // { prtn_id_1: 4, prtn_id_2: 5 }
  const [loading, setLoading] = useState(true);
  // State baru untuk data diri responden
  const [namaResponden, setNamaResponden] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [nomorWhatsapp, setNomorWhatsapp] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        // Hanya perlu mengambil data survei
        const response = await apiClient.get(`/survey/${slug}`);
        setSurvey(response.data.survey);
        setError(null);
      } catch (err) {
        const errorMessage = err.response?.data?.message || "Gagal memuat survei.";
        setError(errorMessage);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Transformasi data jawaban ke format yang diminta backend
    const details = Object.keys(answers).map(prtn_id => ({
        prtn_id: parseInt(prtn_id),
        jawaban: answers[prtn_id]
    }));

    // Validasi: pastikan semua pertanyaan dijawab
    const totalQuestions = survey.category?.pertanyaan?.length || 0;
    if (details.length !== totalQuestions) {
        alert("Harap jawab semua pertanyaan sebelum mengirim.");
        setSubmitting(false);
        return;
    }

    // Validasi: pastikan data diri responden telah diisi
    if (!namaResponden || !jabatan || !nomorWhatsapp) {
      alert("Harap lengkapi data diri Anda (Nama, Jabatan, dan No. WhatsApp) sebelum mengirim.");
      setSubmitting(false);
      return;
    }

    const dataToSubmit = {
        prd_id: survey.period_id,
        svy_nama: namaResponden,
        svy_jabatan: jabatan,
        svy_nomor_whatsapp: nomorWhatsapp,
        details: details
    };

    console.log("Data form", dataToSubmit)

    try {
        await apiClient.post('/penilaian', dataToSubmit);
        alert("Survei berhasil dikirim! Terima kasih.");
        navigate('/thank-you'); // Arahkan ke halaman terima kasih
    } catch (err) {
        const errorMessage = err.response?.data?.message || "Gagal mengirim survei.";
        alert(`Error: ${errorMessage}`);
        console.error("Error submitting survey:", err);
    } finally {
        setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center p-10">Loading survei...</div>;
  if (error) return <div className="text-center p-10 text-red-600">Error: {error}</div>;
  if (!survey) return <div className="text-center p-10">Survei tidak ditemukan.</div>;

  const pertanyaan = survey.category?.pertanyaan || [];

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold mb-2">{survey.title}</h1>
            <p className="text-gray-600">{survey.description}</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form untuk data diri responden */}
          <div className="space-y-4 mb-8 p-4 border rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800">Data Diri Responden</h2>
            <div>
              <label htmlFor="nama_responden" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input
                type="text"
                id="nama_responden"
                value={namaResponden}
                onChange={(e) => setNamaResponden(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="jabatan" className="block text-sm font-medium text-gray-700">Jabatan</label>
              <input
                type="text"
                id="jabatan"
                value={jabatan}
                onChange={(e) => setJabatan(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="nomor_whatsapp" className="block text-sm font-medium text-gray-700">Nomor WhatsApp</label>
              <input
                type="text"
                id="nomor_whatsapp"
                value={nomorWhatsapp}
                onChange={(e) => setNomorWhatsapp(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {pertanyaan.length > 0 ? (
            pertanyaan.map((q, index) => (
              <QuestionItem 
                key={q.id} 
                question={q}
                answer={answers[q.id]}
                onAnswerChange={handleAnswerChange}
                questionNumber={index + 1}
              />
            ))
          ) : (
            <p>Belum ada pertanyaan untuk survei ini.</p>
          )}

          <button 
            type="submit"
            disabled={submitting || pertanyaan.length === 0}
            className="w-full mt-6 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {submitting ? "Mengirim..." : "Kirim Jawaban Survei"}
          </button>
        </form>
      </div>
    </div>
  );
}
