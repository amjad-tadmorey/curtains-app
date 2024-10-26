/* eslint-disable react/prop-types */
import { useState } from "react";

import { useSelector } from "react-redux"
import { getItems, getRooms } from "./orderSlice";

import AddRoom from "./AddRoom";
import SelectedItem from "./SelectedItem";
import Button from "../../ui/Button"
import Modal from "../../ui/Modal";
import ScheduleForm from "./ScheduleForm";


function WindowsForm({ onCloseModal }) {
    const [showRoom, setShowRoom] = useState(false)
    const [isEditSession, setIsEditSession] = useState(false)
    const items = useSelector(getItems)
    const rooms = useSelector(getRooms)
    const remainingItems = items.reduce((acc, cur) => acc + cur.quantity, 0)
    const isRoomsEmpty = rooms.length === 0

    const roomType = isEditSession ? "edit" : "add"

    return (
        <div className='modal'>

            <button className='modal__close' onClick={onCloseModal}>x</button>

            <h1 className='heading-2'>Windows</h1>

            <div className="modal__wrapper modal__wrapper--vertical">
                <div className="flex align-center gap-2 pb-1 overflow-auto">
                    {
                        items.map(item => <SelectedItem item={item} key={item.code} />)
                    }
                </div>

                <div className="flex align-center gap-1">
                    <Button text={'Add Room'} type={'black'} size={"big"} onClick={() => {
                        setShowRoom(true)
                        setIsEditSession(false)
                    }} />
                    {rooms.length > 0 && <Button text={'Edit Room'} type={'primary'} size={"big"} onClick={() => {
                        setShowRoom(true)
                        setIsEditSession(true)
                    }} />}
                    {/* {!showRoom && <div className="ml-auto"><Button type={'black'} text={'Put in schedule'} size={'big'} disabled={remainingItems || isRoomsEmpty} /></div>} */}
                    {!showRoom && <div className="ml-auto">
                        <Modal>
                            <Modal.Open opens='schedule-form'>
                                <Button type={'black'} text={'Put in schedule'} size={'big'} disabled={remainingItems || isRoomsEmpty} />
                            </Modal.Open>
                            <Modal.Window name="schedule-form">
                                <ScheduleForm />
                            </Modal.Window>
                        </Modal>
                    </div>}
                </div>

                {
                    showRoom && <AddRoom type={roomType} setShowRoom={setShowRoom} />
                }


            </div>

            <div className="modal__submit">
                <Button type={'primary-transparent'} text={'Cancel'} size={'big'} onClick={onCloseModal} />
                <Modal.Open opens={'confirm'}>
                    <Button type={'primary'} text={'Next'} size={'big'} /*disabled={remainingItems || isRoomsEmpty}*/ disabled={false} />
                </Modal.Open>
            </div>
        </div >
    )
}

export default WindowsForm
