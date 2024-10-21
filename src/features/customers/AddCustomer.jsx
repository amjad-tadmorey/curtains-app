import Modal from "../../ui/Modal"
import Button from "../../ui/Button"
import CreateCustomerForm from "./CreateCustomerForm"

function AddCustomer() {
    return (
        <Modal>
            <Modal.Open opens={'customer-form'}>
                <Button text={'+ Add Customer'} type={'primary'} size={'big'} />
            </Modal.Open>
            <Modal.Window name="customer-form">
                <CreateCustomerForm />
            </Modal.Window>
        </Modal>
    )
}

export default AddCustomer
