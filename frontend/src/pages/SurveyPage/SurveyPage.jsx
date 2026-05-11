import { useCallback, useEffect, useState } from "react"
import ComponentCard from "../../components/common/ComponentCard"
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne"
import Button from "../../components/ui/button/Button"
import {Modal} from "../../components/ui/modal/ModalDialog"
import DefaultInputs from "../../components/form/form-elements/DefaultInputs"
import apiClient from "../../services/Api"
import { Link } from "react-router"
import debounce from "lodash.debounce"
import Search from "../../components/Search/Search"
import { PlusIcon } from "../../icons"

export default function SurveyPage(){
    const [openModal, setOpenModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [selectedSurvey, setSelectedSurvey] = useState(null)
    const [openModalHapus, setOpenModalHapus] = useState(false)
    const [idToDelete, setIdToDelete] = useState(null)
    const [loading, setLoading] = useState(false)
    const [dataSurvey, setDataSurvey] = useState([])
    const [refreshData, setRefreshData] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    perPage: 15,
    total: 0,
  });
    
  const fetchSurvey = async () => {
    setLoading(true)
    try{
        const params = new URLSearchParams()
        if(searchQuery){
            params.append('search', searchQuery)
        }
        if(currentPage){
            params.append('page', currentPage)
        }
        const url = `/survey?${params.toString()}`
        const res = await apiClient.get(url)
        const data = res.data.survey.data
        const pagination = res.data.survey
        setDataSurvey(data)
        setPagination({
            currentPage: pagination.current_page,
            lastPage: pagination.last_page,
            perPage: pagination.per_page,
            total: pagination.total
        })
    }catch(err){
        console.log("Error fetch survey", err)
    }finally{
        setLoading(false)
    }
  }
  useEffect(() => {
    fetchSurvey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshData, searchQuery, currentPage]);

//   handle halaman
const debounceSearch = useCallback(
    debounce((query) => {
        setCurrentPage(1)
        setSearchQuery(query)
    }, 500),
    []
)
function handleNextPage(){
    if(currentPage < pagination.lastPage){
        setCurrentPage((prevPage) => prevPage + 1)
    }
}
function handlePrevPage(){
    if(currentPage > 1){
        setCurrentPage((prevPage) => prevPage - 1)
    }
}
//   console.log("Data survey: ", dataSurvey);

    const handleOpenEditModal = (survey) => {
        setSelectedSurvey(survey); // Simpan data survei yang dipilih
        setEditModal(true); // Buka modal
    }
    
    const closeEditModal = () => {
        setEditModal(false);
        setSelectedSurvey(null); // Bersihkan state setelah modal ditutup
    }

    const handleOpenmodal = () => setOpenModal(true)
    const closeModal = () => setOpenModal(false)

    // Function untuk handle success submit
    const handleSuccessSubmit = () => {
        closeModal();
        setRefreshData(true)
        closeEditModal()
        // Bisa tambahkan refresh data tabel di sini
    }

    // Handle Modal hapus
    function handleOpenModalHapus(id){
        setOpenModalHapus(true)
        setIdToDelete(id)
    }
    function closeModalHapus(){
        setOpenModalHapus(false)
    }
    const submitHapus = async () => {
        setLoading(false)
        try{
            await apiClient.delete(`/survey/${idToDelete}`)
            console.log("Sukses hapus data survei")
            setRefreshData(true)
            setOpenModalHapus(false)
        }catch(err){
            console.log("Error hapus data", err.response ? err.response.data : err.message)
        }finally{
            setLoading(false)
        }
    }
    
    return(
        <>
        {/* Modal Tambah */}
        <Modal isOpen={openModal} onClose={closeModal} className="max-w-xl p-6">
            {/* TAMBAHKAN PROPS onClose dan onSuccess */}
            <DefaultInputs 
                onClose={closeModal}
                onSuccess={handleSuccessSubmit}
            />
        </Modal>
        {/* Modal Edit */}
        <Modal isOpen={editModal} onClose={closeEditModal} className="max-w-xl p-6">
            <DefaultInputs 
                onClose={closeEditModal}
                onSuccess={handleSuccessSubmit}
                isEdit={true} // Tandai bahwa ini adalah mode edit
                dataToEdit={selectedSurvey} // Kirim data ke form
            />
        </Modal>
        {/* Modal Hapus */}
        <Modal isOpen={openModalHapus} onClose={closeModalHapus}  className="max-w-xl p-6">
             <div className="justify-center items-center p-5 m-5">
                 <h2 className="text-center text-lg font-medium">Apa anda yakin ingin menghapus survei?</h2>
                 <div className="items-center flex justify-center space-x-4 mt-4">
                    <Button onClick={submitHapus}>Hapus</Button>
                    <Button onClick={closeModalHapus}>Batal</Button>
                 </div>
            </div>
        </Modal>
            <div className="space-y-6">
              <ComponentCard>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                    <div className="w-full sm:w-auto">
                        <Search onSearch={debounceSearch} />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <Link to={"/pertanyaan"}>
                            <Button size="sm" variant="secondary">
                                Bank Pertanyaan
                            </Button>
                        </Link>
                        <Button size="sm" onClick={handleOpenmodal} startIcon={PlusIcon}>
                            Tambah Survei
                        </Button>
                    </div>
                </div>
                <BasicTableOne onModalEdit={handleOpenEditModal} onModalHapus={handleOpenModalHapus} dataSurvey={dataSurvey} loading={loading}/>
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
            </div>
        </>
    )
}