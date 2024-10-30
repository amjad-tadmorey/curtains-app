/* eslint-disable react/prop-types */
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux"
import { addCuttedOffItem, editQuantity, getItems, getRooms } from "./orderSlice";

import AddRoom from "./AddRoom";
import SelectedItem from "./SelectedItem";
import Button from "../../ui/Button"
import Modal from "../../ui/Modal";


function WindowsForm({ onCloseModal }) {
    const dispatch = useDispatch()

    const [showRoom, setShowRoom] = useState(false)
    const [showCutOffForm, setShowCutOffForm] = useState(false)
    const [isEditSession, setIsEditSession] = useState(false)
    const items = useSelector(getItems)
    const itemsToCutOff = items.filter(product =>
        (product.productType === "rail" || product.productType === "rod") && product.quantity > 0
    )
    console.log(items);

    const rooms = useSelector(getRooms)
    const remainingItems = items.reduce((acc, cur) => acc + cur.quantity, 0)
    const isRoomsEmpty = rooms.length === 0

    function handleAddCuttedOffItem(item, numId, btnId) {
        const { productName: product } = item

        let quantity = document.getElementById(numId).value
        let btn = document.getElementById(btnId)

        btn.disabled = true
        dispatch(addCuttedOffItem({
            product,
            quantity
        }))
        dispatch(editQuantity({ product, quantity }))
    }

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
                    {
                        !showRoom && <Button text={'Cut-off Materials'} type={'black'} size={"big"} onClick={() => setShowCutOffForm(!showCutOffForm)} />
                    }

                </div>

                {
                    showRoom && <AddRoom type={roomType} setShowRoom={setShowRoom} />
                }

                {
                    showCutOffForm && <form className="room-materials-form" action="" onSubmit={(e) => {
                        e.preventDefault()
                        setShowCutOffForm(false)
                    }}>

                        <h3 className='heading-3'>Materials</h3>

                        {
                            itemsToCutOff.map((item) => {
                                return <div key={item.code} className='flex gap-1 mt-1'>
                                    <input key={itemsToCutOff.indexOf(item)} disabled={true} value={item.productName} type="text" name="" id="" />
                                    <input type="number" name="" id={item.code} min={0} step={"0.01"} />
                                    <Button text={"Add"} id={item.productName} type={"primary"} size={"small"} onClick={(e) => {
                                        e.preventDefault()
                                        handleAddCuttedOffItem(item, item.code, item.productName)
                                    }} />
                                </div>
                            })
                        }
                        <div className='flex align-center gap-1'>
                            <div className='mt-2'><Button text={"Cancel"} type={"primary-transparent"} size={"small"} onClick={(e) => {
                                e.preventDefault()
                                setShowCutOffForm(false)
                            }} />
                            </div>
                            <div className='mt-2'><Button text={"Done"} type={"primary"} size={"small"} /></div>
                        </div>
                    </form>
                }


            </div>

            <div className="modal__submit">
                <Button type={'primary-transparent'} text={'Cancel'} size={'big'} onClick={onCloseModal} />
                {!showRoom && <div className="ml-auto">
                    <Modal.Open opens='schedule-form'>
                        <Button type={'black'} text={'Put in schedule'} size={'big'} disabled={remainingItems || isRoomsEmpty} />
                    </Modal.Open>
                </div>}

            </div>
        </div >
    )
}

export default WindowsForm
