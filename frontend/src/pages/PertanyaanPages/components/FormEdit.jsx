import { useState, useEffect } from "react";
import InputSelect from "../../../components/form/form-elements/InputSelect";
import Button from "../../../components/ui/button/Button";
import apiClient from "../../../services/Api";

export default function FormEdit({ onCloseModal, dataToEdit, onSuccess }) {
  const [dataKategori, setDataKategori] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formEditPertanyaan, setFormEditPertanyaan] = useState({
    ktg_id: "",
    prtn_isi: "",
  });

  function handleOnChange(InputIdentifier, value) {
    setFormEditPertanyaan((prevState) => {
      return {
        ...prevState,
        [InputIdentifier]: value,
      };
    });
  }

  const handleSubmitEdit = async () => {
    setLoading(true);
    let id = idEdit.id
    try {
      await apiClient.put(`/pertanyaan/${id}`, formEditPertanyaan, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
      });
      console.log("Pertanyaan berhasil diedit");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.log("Error tambah pertanyaan", err);
    } finally {
      setLoading(false);
    }
  };

  console.log("Form edit", formEditPertanyaan);

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

  let idEdit = dataToEdit

  console.log("Data kategori", dataKategori);
  console.log("Ide edit", idEdit)

  useEffect(() => {
    if(idEdit){
      setFormEditPertanyaan({
        ktg_id: idEdit.ktg_id || '',
        prtn_isi: idEdit.prtn_isi || ''
      })
    }
  }, [idEdit])

  console.log("Form edit pertanyaan", formEditPertanyaan)

  return (
    <>
      <form className="space-y-6 mt-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label
            htmlFor="period"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Kategori
          </label>
          <InputSelect
            options={dataKategori}
            value={formEditPertanyaan.ktg_id}
            onChange={(e) => {
              handleOnChange("ktg_id", e.target.value);
            }}
            placeholder="Pilih Kategori"
          />
        </div>
        <div>
          <label
            htmlFor="pertanyaan"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Pertanyaan
          </label>
          <textarea
            id="pertanyaan"
            rows={3}
            value={formEditPertanyaan.prtn_isi}
            onChange={(e) => handleOnChange("prtn_isi", e.target.value)}
            className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600"
            required
          />
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={onCloseModal}>
            Batal
          </Button>
          <Button type="submit" onClick={handleSubmitEdit}>Simpan</Button>
        </div>
      </form>
    </>
  );
}
