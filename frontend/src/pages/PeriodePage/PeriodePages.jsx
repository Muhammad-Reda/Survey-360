import { useCallback, useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import TabelPeriode from "./component/TabelPeriode";
import apiClient from "../../services/Api";
import { Modal } from "../../components/ui/modal/ModalDialog";
import FormTambah from "./component/FormTambah";
import FormEdit from "./component/FormEdit";
import debounce from "lodash.debounce";
import Search from "../../components/Search/Search";

export default function PeriodePages() {
    const [data, setData] = useState({
        periode: [],
        kategori: []
    })
    const [loading, setLoading] = useState(false)
    const [modalTambahPeriode, setModalTambahPeriode] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [modalHapus, setModalHapus] = useState(false)
    const [idToDelete, setIdToDelete] = useState(null)
    const [modalEdit, setModalEdit] = useState(false)
    const [idToEdit, setIdToEdit] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        perPage: 15,
        total: 0
    })

    const fetchData = async () => {
        setLoading(true)
        try {
            const [resPeriode, resKategori] = await Promise.all([
                apiClient.get("/periode"),
                apiClient.get("/kategori")
            ])
            const params = new URLSearchParams()
            if (currentPage) {
                params.append('page', currentPage)
            }
            if (searchQuery) {
                params.append('search', searchQuery)
            }
            const url = `/periode?${params.toString()}`
            const res = await apiClient.get(url)
            const pagination = res.data.data
            setPagination({
                currentPage: pagination.current_page,
                lastPage: pagination.last_page,
                perPage: pagination.per_page,
                total: pagination.total
            })
            const dataPeriode = resPeriode.data.data.data
            const dataKategori = resKategori.data.data.data.map((k) => ({
                value: k.id,
                label: k.ktg_nama
            }))
            setData({ periode: dataPeriode, kategori: dataKategori })
            setRefresh(false)
        } catch (err) {
            console.log("Error fetch data", err.response ? err.response.data : err.response.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [refresh, currentPage, searchQuery])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceSearch = useCallback(
        debounce((query) => {
            setCurrentPage(1)
            setSearchQuery(query)
        }, 500), // Debounce time
        [] // Dependency array for useCallback
    );
    function handleNextPage() {
        if (currentPage < pagination.lastPage) {
            setCurrentPage((prevPage) => prevPage + 1)
        }
    }

    function handlePrevPage() {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1)
        }
    }
    // Handle Modal Tambah
    function openTambahPeriode() {
        setModalTambahPeriode(true)
    }
    function closeModalPeriode() {
        setModalTambahPeriode(false)
    }
    function succesSubmitPeriode() {
        setModalTambahPeriode(false)
        setRefresh(true)
    }

    // Handle Modal Hapus
    function openHapus(id) {
        setModalHapus(true)
        setIdToDelete(id)
    }
    function closeHapus() {
        setModalHapus(false)
    }
    const submitHapus = async () => {
        try {
            await apiClient.delete(`/periode/${idToDelete}`)
            setRefresh(true)
            setModalHapus(false)
            console.log("Sukses hapus periode")
            Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "Periode berhasil dihapus",
                    timer: 1500,
                  });
        } catch (err) {
            console.log("Error hapus periode", err)
        }
    }

    // Handle Modal Edit
    function openEdit(id) {
        setModalEdit(true)
        setIdToEdit(id)
    }
    function closeEdit() {
        setModalEdit(false)
    }
    function succesEdit() {
        setModalEdit(false)
        setRefresh(true)
    }
    // console.log("Edit id", idToEdit)
    return (
        <>
            {/* Modal Tambah */}
            <Modal className="max-w-xl p-6" isOpen={modalTambahPeriode} onClose={closeModalPeriode}>
                <FormTambah dataKategori={data.kategori} onSucces={succesSubmitPeriode} closeModalTambah={closeModalPeriode} />
            </Modal>
            {/* Modal Edit */}
            <Modal className="max-w-xl p-6" isOpen={modalEdit} onClose={closeEdit}>
                <FormEdit dataKategori={data.kategori} dataId={idToEdit} onSucces={succesEdit} closeModalEdit={closeEdit} />
            </Modal>
            {/* Modal Hapus */}
            <Modal className="max-w-xl p-6" isOpen={modalHapus} onClose={closeHapus}>
                <div className="justify-center items-center p-5 m-5">
                    <h2 className="text-center text-lg font-medium">Apa anda yakin ingin menghapus periode?</h2>
                    <div className="items-center flex justify-center space-x-4 mt-4">
                        <Button onClick={submitHapus}>Hapus</Button>
                        <Button onClick={closeHapus}>Batal</Button>
                    </div>
                </div>
            </Modal>
            {/* <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4"> */}
            <ComponentCard>
                <div className="w-full sm:w-auto">
                    <Search onSearch={debounceSearch} />
                </div>
                <Button size="sm" onClick={openTambahPeriode}>
                    Tambah
                </Button>
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                    <TabelPeriode dataPeriode={data.periode} openModalHapus={openHapus} openModalEdit={openEdit} />
                </div>
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
            {/* </div> */}
        </>
    )
}
