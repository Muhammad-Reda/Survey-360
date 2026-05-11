import { useEffect, useState } from "react";
import DatePicker from "../../../components/form/date-picker";
import InputSelect from "../../../components/form/form-elements/InputSelect";
import Button from "../../../components/ui/button/Button";
import apiClient from "../../../services/Api";

export default function FormEdit({dataKategori, closeModalEdit, dataId, onSucces}){
    const [form, setForm] = useState({
        ktg_id:"",
        prd_tgl_mulai:"",
        prd_tgl_selesai:"",
        prd_status:""
    })

    useEffect(() => {
        if(dataId){
            setForm({
                ktg_id: dataId.ktg_id || "",
                prd_tgl_mulai: dataId.prd_tgl_mulai || "",
                prd_tgl_selesai: dataId.prd_tgl_selesai || "",
                prd_status: dataId.prd_status || ""
            })
        }
    }, [dataId])

    function handleChange(InputIdentifier, value){
        setForm((prevState) => {
            return{
                ...prevState,
                [InputIdentifier]:value
            }
        })
    }

    const handleSubmit = async () => {
        let id = dataId.id
        try{
            await apiClient.put(`/periode/${id}`, form)
            console.log("Berhasil update data periode")
            if(onSucces) onSucces()
        }catch(err){
            console.log("Error update data", err)
        }
    }

     // Fungsi helper untuk memformat objek Date menjadi YYYY-MM-DD
  function formatDate(date) {
    if (!date) return "";
    const year = date.getFullYear();
    // getMonth() adalah 0-indexed, jadi tambah 1. padStart memastikan format 2 digit (01, 02, dst.)
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

    return(
        <>
            <form className="space-y-4" onSubmit={(e) => {e.preventDefault()}}>
        <div>
          <label
            htmlFor="period"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Kategori
          </label>
          <InputSelect
            placeholder="Pilih Kategori"
            // Tambahkan prefix pada value untuk memastikan keunikan
            options={dataKategori.map((opt) => ({
              ...opt,
              value: opt.value,
            }))}
            value={form.ktg_id}
            onChange={(e) => {
              handleChange("ktg_id", e.target.value);
            }}
          />
        </div>
        <DatePicker
          id="periode_mulai"
          label="Periode Mulai"
          placeholder="Pilih tanggal mulai"
          value={form.prd_tgl_mulai}
          onChange={(selectedDates) => {
            handleChange("prd_tgl_mulai", formatDate(selectedDates[0]));
          }}
        />
        <DatePicker
          id="periode_selesai"
          label="Periode Selesai"
          placeholder="Pilih tanggal selesai"
          value={form.prd_tgl_selesai}
          onChange={(selectedDates) => {
            handleChange("prd_tgl_selesai", formatDate(selectedDates[0]));
          }}
        />
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Status
          </label>
          <InputSelect
            placeholder="Pilih Status"
            options={[
              // Tambahkan prefix pada value untuk memastikan keunikan
              { value: "status-1", label: "Aktif" },
              { value: "status-0", label: "Tidak Aktif" },
            ]}
           value={form.prd_status ? `status-${form.prd_status}` : ""}
            // Hapus prefix sebelum menyimpan ke state
            onChange={(e) => {
              handleChange("prd_status", e.target.value.replace("status-", ""));
            }}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={closeModalEdit}>
            Batal
          </Button>
          <Button type="submit" onClick={handleSubmit}>Simpan</Button>
        </div>
      </form>
        </>
    )
}