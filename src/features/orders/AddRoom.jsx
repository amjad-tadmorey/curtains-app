/* eslint-disable react/prop-types */
import { useState } from 'react'
import Button from '../../ui/Button'
import MaterialInput from './MaterialInput'
import Window from "./Window";
import { addRoom, addRoomCleats, addRoomMaterials, editQuantity, editRoom, getCleats, getItemByName, getItems, getMaterials, getRoomByName, getRooms, getWindows, resetRoomCleats, resetRoomMaterials, resetWindows } from './orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';



const fakeData = [
    {
        src: "/src/assets/windows/shape-1.svg",
        imageId: 1,
    },
    {
        src: "/src/assets/windows/shape-2.svg",
        imageId: 2,
    },
    {
        src: "/src/assets/windows/shape-3.svg",
        imageId: 3,
    },
    {
        src: "/src/assets/windows/shape-4.svg",
        imageId: 4,
    },
    {
        src: "/src/assets/windows/shape-5.svg",
        imageId: 5,
    },
    {
        src: "/src/assets/windows/shape-6.svg",
        imageId: 6,
    },
    {
        src: "/src/assets/windows/shape-7.svg",
        imageId: 7,
    },
    {
        src: "/src/assets/windows/shape-8.svg",
        imageId: 8,
    },
    {
        src: "/src/assets/windows/shape-9.svg",
        imageId: 9,
    },
    {
        src: "/src/assets/windows/shape-10.svg",
        imageId: 10,
    },
    {
        src: "/src/assets/windows/shape-11.svg",
        imageId: 11,
    },
    {
        src: "/src/assets/windows/shape-12.svg",
        imageId: 12,
    },
    {
        src: "/src/assets/windows/shape-13.svg",
        imageId: 13,
    },
    {
        src: "/src/assets/windows/shape-14.svg",
        imageId: 14,
    },
    {
        src: "/src/assets/windows/shape-15.svg",
        imageId: 15,
    },
    {
        src: "/src/assets/windows/shape-16.svg",
        imageId: 16,
    },
]


export default function AddRoom({ setShowRoom, type }) {
    const dispatch = useDispatch()
    const items = useSelector(getItems)

    const [showMaterialsForm, setShowMaterialsForm] = useState(false)
    const [showCleatsForm, setShowCleatsForm] = useState(false)
    const isMaterialsEmpty = useSelector(getMaterials).length === 0

    const [roomName, setRoomName] = useState('')
    const [notes, setNotes] = useState('')
    const windows = useSelector(getWindows)
    const roomMaterials = useSelector(getMaterials)
    const roomCleats = useSelector(getCleats)
    const rooms = useSelector(getRooms)

    // for edit session
    const [selectedRoom, setSelectedRoom] = useState("")


    function handleAddMaterial(item, numId, btnId) {
        

        const { productName: product, productType, sewingType } = item
        const selectedItem = items.find(item => item.productName === product)
        let quantity = document.getElementById(numId).value
        let btn = document.getElementById(btnId)

        if (selectedItem.quantity < quantity) {
            return
            // must rendering error 
        }

        btn.disabled = true

        dispatch(addRoomMaterials({
            product,
            quantity,
            productType,
            sewingType
        }))
        if (type === "add") {
            dispatch(editQuantity({ product, quantity }))
        } else if (type === "edit") {
            dispatch(editQuantity({ product, quantity: selectedItem.quantity - quantity }))
        }
    }

    function handleAddCleats(item, numId, btnId) {
        const { productName: product, productType, sewingType } = item
        const selectedItem = items.find(item => item.productName === product)
        let quantity = document.getElementById(numId).value
        let btn = document.getElementById(btnId)

        if (selectedItem.quantity < quantity) {
            return
            // must rendering error 
        }

        btn.disabled = true

        dispatch(addRoomCleats({
            product,
            quantity,
            productType,
            sewingType
        }))
        dispatch(editQuantity({ product, quantity }))
    }

    function handleSubmitRoom() {
        const newRoom = {
            roomName,
            windows,
            roomMaterials,
            roomCleats,
            notes
        }
        if (type === "add") {
            if (roomName === "") return (
                toast.error("name is required")
            )
            if (isMaterialsEmpty) return (
                toast.error('You did not any materials')
            )

            dispatch(addRoom(newRoom))

        } else if (type === "edit") {
            dispatch(editRoom({ ...newRoom, roomName: selectedRoom }))
        }
        dispatch(resetWindows())
        dispatch(resetRoomMaterials())
        dispatch(resetRoomCleats())
        setShowRoom(false)
    }



    return (
        <div>
            <div className='flex align-center gap-1'>
                {
                    type === "add" ? <label htmlFor="" className="flex flex-col gap-1">
                        Room Name
                        <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                    </label> :
                        <select name="" id="" value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
                            <option disabled={true} value="">Choose</option>
                            {rooms.map((el) => <option key={el.roomName} value={el.roomName}>{el.roomName}</option>)}
                        </select>
                }
                <Button text={'Add Materials'} type={'primary'} size={'big'} onClick={() => setShowMaterialsForm(!showMaterialsForm)} />
                <Button text={'Add Cleats'} type={'primary'} size={'big'} onClick={() => setShowCleatsForm(!showCleatsForm)} />
            </div>

            {
                showMaterialsForm && <form className="room-materials-form" action="" onSubmit={(e) => {
                    e.preventDefault()
                    setShowMaterialsForm(false)
                }}>

                    {
                        items.map((item) => {
                            return <div className='flex gap-1 mt-1'>
                                <input key={items.indexOf(item)} disabled={true} value={item.productName} type="text" name="" id="" />
                                <input type="number" name="" id={item.code} min={0} />
                                <Button text={"Add"} id={item.productName} type={"primary"} size={"small"} onClick={(e) => {
                                    e.preventDefault()
                                    handleAddMaterial(item, item.code, item.productName)
                                }} />
                            </div>
                        })
                    }
                    <Button text={"Done"} type={"primary"} size={"small"} />
                </form>
            }
            {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {
                showCleatsForm && <form className="room-materials-form" action="" onSubmit={(e) => {
                    e.preventDefault()
                    setShowCleatsForm(false)
                }}>

                    {
                        items.map((item) => {
                            return <div className='flex gap-1 mt-1'>
                                <input key={items.indexOf(item)} disabled={true} value={item.productName} type="text" name="" id="" />
                                <select name="" id="" onChange={(e) => {
                                    if (e.target.value === 'height') {
                                        document.getElementById(item.code).disabled = true;
                                    } else {
                                        document.getElementById(item.code).disabled = false;
                                    }
                                }}>
                                    <option value="width">Width</option>
                                    <option value="height">height</option>
                                </select>

                                <input type="number" name="" id={item.code} min={0} />
                                <Button text={"Add"} id={item.productName} type={"primary"} size={"small"} onClick={(e) => {
                                    e.preventDefault()
                                    handleAddCleats(item, item.code, item.productName)
                                }} />
                            </div>
                        })
                    }
                    <Button text={"Done"} type={"primary"} size={"small"} />
                </form>
            }

            <div>
                <div className="flex align-center gap-2" style={{ overflowX: "auto", margin: "2rem" }}>
                    {
                        fakeData.map(window => <Window window={window} key={window.imageId} />)
                    }
                </div>

                <div className="widows-preview">
                    {
                        windows.map(window => <img className="w-50px" src={window.src} key={window.windowId} />)
                    }
                </div>

                <div className="room-notes">
                    <h2 className="heading-2">
                        Notes:
                    </h2>
                    <textarea name="" id="" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                </div>
            </div>

            <Button type={'primary'} text={'Add'} onClick={handleSubmitRoom} size={'big'} />
        </div>
    )
}
