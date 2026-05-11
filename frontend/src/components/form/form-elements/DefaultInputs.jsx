import { useEffect, useState } from "react";
import apiClient from "../../../services/Api";
import Button from "../../ui/button/Button";
import InputSelect from "./InputSelect";
import Swal from "sweetalert2";

// Terima props baru: isEdit dan dataToEdit
export default function DefaultInputs({
  onClose,
  onSuccess,
  isEdit = false,
  dataToEdit = null,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // State untuk field yang hanya ada di form tambah
  const [periodId, setPeriodId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // State untuk menampung data dropdown
  const [periods, setPeriods] = useState([]);
  const [categories, setCategories] = useState([]);

  const [status, setStatus] = useState(false); // Default status tidak aktif
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hanya jalankan jika dalam mode edit dan ada data yang dikirim
    if (isEdit && dataToEdit) {
      setTitle(dataToEdit.title || "");
      setDescription(dataToEdit.description || "");
      setStatus(dataToEdit.status || false);
    }
  }, [dataToEdit, isEdit]); // <-- Dependency array: hook ini berjalan saat props ini berubah

  // useEffect untuk mengambil data dropdown saat komponen dimuat
  useEffect(() => {
    // Hanya ambil data jika ini adalah form tambah baru
    if (!isEdit) {
      // Asumsi endpoint ini mengembalikan semua data (tidak dipaginasi)
      apiClient
        .get("/periode")
        .then((response) => {
          const formattedPeriods = response.data.data.data.map((p) => ({
            value: p.id,
            label: p.prd_tgl_mulai + " - " + p.prd_tgl_selesai,
          }));
          setPeriods(formattedPeriods);
        })
        .catch((err) => console.error("Gagal mengambil data periode:", err));

      apiClient
        .get("/kategori")
        .then((response) => {
          const formattedCategories = response.data.data.data.map((c) => ({
            value: c.id,
            label: c.ktg_nama,
          }));
          setCategories(formattedCategories);
        })
        .catch((err) => console.error("Gagal mengambil data kategori:", err));
    }
  }, [isEdit]); // Jalankan hanya saat mode isEdit berubah (efektif sekali saat mount)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      let response;
      if (isEdit) {
        // Payload untuk EDIT
        const payload = { title, description, status };
        // Panggil API UPDATE
        response = await apiClient.put(`/survey/${dataToEdit.id}`, payload);
      } else {
        // Payload untuk TAMBAH BARU
        const payload = {
          title,
          description,
          status,
          period_id: periodId,
          category_id: categoryId,
        };
        // Panggil API CREATE sesuai route yang Anda berikan
        response = await apiClient.post("/survey", payload);
      }
      onSuccess(); // Panggil fungsi sukses dari parent
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Survey berhasil dihapus",
        timer: 1500,
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        `Gagal ${isEdit ? "memperbarui" : "membuat"} survei.`;
      setError(errorMessage);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold">
        {isEdit ? "Edit Survei" : "Tambah Survei Baru"}
      </h3>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Judul Survei
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600"
          required
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Deskripsi
        </label>
        <textarea
          id="description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600"
          required
        />
      </div>

      {/* Tampilkan field ini hanya saat mode TAMBAH BARU */}
      {!isEdit && (
        <>
          <div>
            <label
              htmlFor="period"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Periode
            </label>
            <InputSelect
              options={periods}
              value={periodId}
              onChange={(e) => setPeriodId(e.target.value)}
              placeholder="Pilih Periode"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Kategori
            </label>
            <InputSelect
              options={categories}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              placeholder="Pilih Kategori"
            />
          </div>
        </>
      )}

      <div className="flex items-center">
        <input
          id="status"
          type="checkbox"
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label
          htmlFor="status"
          className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
        >
          Aktifkan / Publikasikan Survei
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onClose}>
          Batal
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting
            ? "Menyimpan..."
            : isEdit
              ? "Simpan Perubahan"
              : "Buat Survei"}
        </Button>
      </div>
    </form>
  );
}
