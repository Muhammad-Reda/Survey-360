import { useCallback, useEffect, useState } from "react";
import TabelKategori from "./component/TabelKategori";
import apiClient from "../../services/Api";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal/ModalDialog";
import FormTambah from "./component/FormTambah";
import FormEdit from "./component/FormEdit";
import debounce from "lodash.debounce";
import Search from "../../components/Search/Search";
import Swal from "sweetalert2";
import { PlusIcon } from "../../icons";

export default function KategoriPage() {
  const [dataKategori, setDataKategori] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModalTambah, setOpenModalTambah] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [openModalHapus, setOpenModalHapus] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [openModalEdit, setModalEditOpen] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [current_page, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    perPage: 15,
    total: 0,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) {
        params.append("search", searchQuery);
      }
      const url = `/kategori?${params.toString()}`;
      const response = await apiClient.get(url);
      const data = response.data.data.data;
      const pagination = response.data.data;
      setDataKategori(data);
      setRefreshData(false);
      setPagination({
        currentPage: pagination.current_page,
        lastPage: pagination.last_page,
        perPage: pagination.per_page,
        total: pagination.total,
      });
    } catch (err) {
      console.log("Error fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshData, searchQuery, current_page]);

  //   Handle Page
  function handleNextPage() {
    if (current_page < pagination.lastPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }
  function handlePrevPage() {
    if (current_page > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }

  const debounceSearch = useCallback(
    debounce((query) => {
      setCurrentPage(1);
      setSearchQuery(query);
    }, 500)
  );

  // Handling modal tambah
  function handleOpenModalTambah() {
    setOpenModalTambah(true);
  }
  function handleCloseModal() {
    setOpenModalTambah(false);
  }
  function handleSuccesTambah() {
    setOpenModalTambah(false);
    setRefreshData(true);
  }

  // Handling Modal Hapus
  function handleOpenModalHapus(id) {
    setOpenModalHapus(true);
    setIdToDelete(id);
  }

  function handleCloseModaHapus() {
    setOpenModalHapus(false);
  }

  const submitHapus = async () => {
    setLoading(true);
    try {
      await apiClient.delete(`/kategori/${idToDelete}`);
      console.log("Data berhasil dihapus");
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Kategori berhasil dihapus",
        timer: 1500,
      });
      setRefreshData(true);
      setOpenModalHapus(false);
    } catch (err) {
      console.log(
        "Error hapus data",
        err.response ? err.response.data : err.response.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Handling Modal Edit
  function handleOpenModalEdit(id) {
    setModalEditOpen(true);
    setIdToEdit(id);
  }
  function handleSuccessEdit() {
    setModalEditOpen(false);
    setRefreshData(true);
  }
  function handleClosemodaEdit() {
    setModalEditOpen(false);
  }
  return (
    <>
      {/* Modal tambah */}
      <Modal isOpen={openModalTambah} className="max-w-xl p-6">
        <FormTambah
          closeModal={handleCloseModal}
          onSucces={handleSuccesTambah}
        />
      </Modal>
      {/* Modal Hapus */}
      <Modal
        isOpen={openModalHapus}
        className="max-w-xl p-6"
        onClose={handleCloseModaHapus}
      >
        <div className="justify-center items-center p-5 m-5">
          <h2 className="text-center text-lg font-medium">
            Apa anda yakin ingin menghapus kategori?
          </h2>
          <div className="items-center flex justify-center space-x-4 mt-4">
            <Button onClick={submitHapus}>Hapus</Button>
            <Button onClick={handleCloseModaHapus}>Batal</Button>
          </div>
        </div>
      </Modal>
      {/* Modal Edit */}
      <Modal isOpen={openModalEdit} className="max-w-xl p-6">
        <FormEdit
          dataToEdit={idToEdit}
          onSucces={handleSuccessEdit}
          closeModal={handleClosemodaEdit}
        />
      </Modal>
      <div className="space-y-6">
        <ComponentCard>
             <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <div className="w-full sm:w-auto">
            <Search onSearch={debounceSearch} />
          </div>
          <Button
            size="sm"
            onClick={handleOpenModalTambah}
            startIcon={PlusIcon}
          >
            Tambah Kategori
          </Button></div>
          
          <TabelKategori
            dataKategori={dataKategori}
            openModalHapus={handleOpenModalHapus}
            openModalEdit={handleOpenModalEdit}
          />
          {/* <div className="flex gap-2">
            <Button size="sm" onClick={handlePrevPage} disabled={pagination.currentPage <= 1 || loading}>
              Previous
            </Button>
            <Button size="sm" onClick={handleNextPage} disabled={pagination.currentPage >= pagination.lastPage || loading}>
              Next
            </Button>
          </div> */}
        </ComponentCard>
      </div>
    </>
  );
}
