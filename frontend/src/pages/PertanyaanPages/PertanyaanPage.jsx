import { useCallback, useEffect, useState } from "react";
import apiClient from "../../services/Api";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal/ModalDialog";
import FormTambah from "./components/FormTambah";
import PertanyaanTabel from "./components/PertanyaanTabel";
import HapusPertanyaan from "./components/HapusPertanyaan";
import FilterKategori from "./components/FilterKategori";
import FormEdit from "./components/FormEdit";
import debounce from "lodash.debounce";
import Search from "../../components/Search/Search";
import Swal from "sweetalert2";

export default function PertanyaanPage() {
  const [dataPertanyaan, setDataPertanyaan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // State untuk filter
  const [modalTambahPertanyaan, setModalTambahPertanyaan] = useState(false);
  const [refreshPertanyaan, setRefreshPertanyaan] = useState(false);
  const [modalHapusOpen, setModalHapusOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [pertanyaanToEdit, setPertanyaanToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    perPage: 15,
    total: 0,
  });

  // Fungsi untuk mengambil data pertanyaan dengan filter
  const fetchPertanyaan = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory) {
        params.append("kategori_id", selectedCategory);
      }
      if (searchQuery) {
        params.append("search", searchQuery);
      }
      if(currentPage){
        params.append('page', currentPage)
      }
      const url = `/pertanyaan?${params.toString()}`;
      const response = await apiClient.get(url);
      const data = response.data.data.data;
      const paginationData = response.data.data;

      setDataPertanyaan(data);
      setRefreshPertanyaan(false);
      setPagination({
        currentPage: paginationData.current_page,
        lastPage: paginationData.last_page,
        perPage: paginationData.per_page,
        total: paginationData.total,
      });
    } catch (err) {
      console.log("Error fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  // function handleNextPage() {
  //   if (currentPage < pagination.lastPage) {
  //     setCurrentPage((prevPage) => prevPage + 1);
  //   }
  // }
  // function handlePrevPage() {
  //   if (currentPage > 1) {
  //     setCurrentPage((prevPage) => prevPage - 1);
  //   }
  // }

  useEffect(() => {
    fetchCategories(); // Ambil kategori saat komponen pertama kali dimuat
  }, []);

  useEffect(() => {
    fetchPertanyaan(); // Ambil data pertanyaan setiap kali filter berubah
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, refreshPertanyaan, searchQuery, currentPage]); // Dependensi sudah benar

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce((query) => {
        setCurrentPage(1)
      setSearchQuery(query);
    }, 500),
    []
  );

  // Fungsi untuk mengambil daftar kategori
  const fetchCategories = async () => {
    try {
      // Asumsi endpoint /kategori mengembalikan semua kategori
      const response = await apiClient.get("/kategori");
      setCategories(response.data.data.data);
    } catch (err) {
      console.log("Error fetching categories", err);
    }
  };

  console.log("data pertanyaan", dataPertanyaan);
  console.log("Info Paginasi", pagination);
  console.log("Data kategori", categories);

  function handleSuccesTambah() {
    setModalTambahPertanyaan(false);
    setRefreshPertanyaan(true);
  }

  function closeModalTambah() {
    setModalTambahPertanyaan(false);
  }

  function openModalHapus(id) {
    setModalHapusOpen(true);
    setIdToDelete(id);
  }
  function closeModalHapus() {
    setModalHapusOpen(false);
  }

  const hapusPertanyaan = async () => {
    setLoading(true);
    try {
      await apiClient.delete(`/pertanyaan/${idToDelete}`);
      console.log("Pertanyaan berhasil dihapus");
      setModalHapusOpen(false);
      setRefreshPertanyaan(true);
    } catch (err) {
      console.log("Error hapus data", err);
    } finally {
      setLoading(false);
    }
  };

  function handleOpenModalEdit(id) {
    setModalEditOpen(true);
    setPertanyaanToEdit(id);
  }
  function handleCloseModalEdit() {
    setModalEditOpen(false);
  }

  function handleSuccessEdit() {
    setModalEditOpen(false);
    setRefreshPertanyaan(true);
  }

  return (
    <>
      {/* Modal Tambah */}
      <Modal
        isOpen={modalTambahPertanyaan}
        onClose={() => setModalTambahPertanyaan()}
        className="max-w-xl p-6"
      >
        <FormTambah
          onSuccess={handleSuccesTambah}
          onCloseModal={modalTambahPertanyaan}
          closeModal={closeModalTambah}
        />
      </Modal>
      {/* Modal Hapus */}
      <HapusPertanyaan
        isOpen={modalHapusOpen}
        onClose={closeModalHapus}
        hapusPertanyaan={hapusPertanyaan}
        closeModalHapus={closeModalHapus}
      />
      {/* Modal Edit */}
      <Modal isOpen={modalEditOpen} className="max-w-xl p-6">
        <FormEdit
          onCloseModal={handleCloseModalEdit}
          dataToEdit={pertanyaanToEdit}
          onSuccess={handleSuccessEdit}
        />
      </Modal>
      <ComponentCard>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <div className="w-full sm:w-auto">
            <Search onSearch={debounceSearch} />
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <FilterKategori
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <Button
              size="sm"
              onClick={() => setModalTambahPertanyaan(true)}
              className="flex-shrink-0"
            >
              Tambah
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <PertanyaanTabel
            dataPertanyaan={dataPertanyaan}
            loading={loading}
            openModalHapus={openModalHapus}
            openModalEdit={handleOpenModalEdit}
          />
        </div>

        {/* Pagination Controls */}
        {/* <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Halaman {pagination.currentPage} dari {pagination.lastPage}
          </span>
          <div className="flex gap-2">
            <Button size="sm" onClick={handlePrevPage} disabled={pagination.currentPage <= 1 || loading}>
              Previous
            </Button>
            <Button size="sm" onClick={handleNextPage} disabled={pagination.currentPage >= pagination.lastPage || loading}>
              Next
            </Button>
          </div>
        </div> */}
      </ComponentCard>
    </>
  );
}
