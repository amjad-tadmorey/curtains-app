import Modal from "../../ui/Modal"
import Button from "../../ui/Button"
import CreateOrderForm from "./CreateOrderForm"
import WindowsForm from "./WindowsForm"
import ConfirmOrder from "./ConfirmOrder"
import ScheduleForm from "./ScheduleForm"
import { OrderDateProvider } from "../../context/OrderDateContext"

function AddOrder() {
    return (
        <>
            <OrderDateProvider>
                <Modal>
                    <Modal.Open opens={'order-form'}>
                        <Button text={'+ Add Order'} type={'primary'} size={'big'} />
                    </Modal.Open>
                    <Modal.Window name="order-form">
                        <CreateOrderForm />
                    </Modal.Window>

                    <Modal.Window name="windows-form">
                        <WindowsForm />
                    </Modal.Window>

                    <Modal.Window name="schedule-form">
                        <ScheduleForm />
                    </Modal.Window>

                    <Modal.Window name="confirm">
                        <ConfirmOrder />
                    </Modal.Window>
                </Modal>
            </OrderDateProvider>
        </>
    )
}

export default AddOrder
