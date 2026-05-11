import { useEffect, useState } from "react";
import InputSelect from "../../../components/form/form-elements/InputSelect";
import apiClient from "../../../services/Api";
import Button from "../../../components/ui/button/Button";
import Swal from "sweetalert2";

export default function FormTambah({onSuccess, closeModal}) {
  const [dataKategori, setDataKategori] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formTambahPertanyaan, setFormTambahPertanyaan] = useState({
    ktg_id: "",
    prtn_isi: "",
  });

  function handleOnChange(InputIdentifier, value) {
    setFormTambahPertanyaan((prevState) => {
      return {
        ...prevState,
        [InputIdentifier]: value,
      };
    });
  }

  console.log("Form tambah", formTambahPertanyaan);

  const handleSubmitTambah = async () => {
    setLoading(true);
    try {
      await apiClient.post("/pertanyaan", formTambahPertanyaan, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
      });
      console.log("Pertanyaan berhasil ditambahkan");
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Pertanyaan berhasil ditambah",
        timer: 1500,
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.log(
        "Error tambah pertanyaan",
        err
      );
    }finally{
        setLoading(false)
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/kategori");
      const data = response.data.data.data.map((k) => ({
        value: k.id,
        label: k.ktg_nama,
      }));
      setDataKategori(data);
    } catch (err) {
      console.log(
        "Error fetch data",
        err.response ? err.response.data : err.response.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("Data kategori", dataKategori);
  return (
    <form className="space-y-6 mt-5" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label
          htmlFor="kategori"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Kategori
        </label>
        <InputSelect
          id="kategori"
          options={dataKategori}
          value={formTambahPertanyaan.ktg_id}
          onChange={(e) => handleOnChange("ktg_id", e.target.value)}
          placeholder="Pilih Kategori"
        />
      </div>

      <div>
        <label
          htmlFor="pertanyaan"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Pertanyaan
        </label>
        <textarea
          id="pertanyaan"
          rows={4}
          value={formTambahPertanyaan.prtn_isi}
          onChange={(e) => handleOnChange("prtn_isi", e.target.value)}
          className="mt-1 block p-3 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100"
          placeholder="Masukkan pertanyaan"
          required
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={closeModal}
          disabled={loading}
        >
          Batal
        </Button>
        <Button 
          type="submit" 
          onClick={handleSubmitTambah}
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </form>
  );
}
