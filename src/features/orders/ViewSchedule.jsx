import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Schedule from "./Schedule";

export default function AddSchedule() {
    return (
        <>
            <Modal>
                <Modal.Open opens={'schedule'}>
                    <Button text={'View Schedule'} type={'black'} size={'big'} />
                </Modal.Open>
                <Modal.Window name="schedule">
                    <Schedule />
                </Modal.Window>
            </Modal>
        </>
    )
}
