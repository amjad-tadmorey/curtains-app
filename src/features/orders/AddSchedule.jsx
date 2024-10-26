import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ScheduleForm from "./ScheduleForm";

export default function AddSchedule() {
    return (
        <>
            <Modal>
                <Modal.Open opens={'schedule-form'}>
                    <Button text={'+ Add Schedule'} type={'primary'} size={'big'} />
                </Modal.Open>
                <Modal.Window name="schedule-form">
                    <ScheduleForm />
                </Modal.Window>

                {/* <Modal.Window name="confirm">
                    <ConfirmOrder />
                </Modal.Window> */}

            </Modal>
        </>
    )
}
