import Modal from "../../ui/Modal"
import Button from "../../ui/Button"
import CreateItemForm from "./createItemForm"

function AddInventory() {
    return (
        <Modal>
            <Modal.Open opens={'item-form'}>
                <Button text={'+ Add Item'} type={'primary'} size={'big'} />
            </Modal.Open>
            <Modal.Window name="item-form">
                <CreateItemForm />
            </Modal.Window>
        </Modal>
    )
}

export default AddInventory
