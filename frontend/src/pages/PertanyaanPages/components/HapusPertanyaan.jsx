import Button from "../../../components/ui/button/Button";
import { Modal } from "../../../components/ui/modal/ModalDialog";

export default function HapusPertanyaan({isOpen, onClose, hapusPertanyaan, closeModalHapus}){
    return(
        <>
             <Modal isOpen={isOpen} onClose={onClose} className="max-w-xl p-6">
            <div className="justify-center items-center p-5 m-5">
                 <h2>Are you sure you want to delete this food item?</h2>
                 <div className="items-center flex justify-center space-x-4 mt-4">
                    <Button onClick={hapusPertanyaan}>Hapus</Button>
                    <Button onClick={closeModalHapus}>Batal</Button>
                 </div>
            </div>
        </Modal>
        </>
    )
}