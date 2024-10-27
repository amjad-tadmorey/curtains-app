/* eslint-disable react/prop-types */
import { useState } from 'react'
import toast from 'react-hot-toast';
import {
    addRoom,
    addRoomCleats,
    addRoomMaterials,
    editQuantity,
    editRoom,
    getCleats,
    getItems,
    getMaterials,
    getRoomByName,
    getRooms,
    getWindows,
    resetRoomCleats,
    resetRoomMaterials,
    resetWindows
} from './orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button'
import Window from "./Window";



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

    // for edit session
    const [selectedRoom, setSelectedRoom] = useState("")

    const [roomName, setRoomName] = useState('')
    const [notes, setNotes] = useState('')
    const windows = useSelector(getWindows)
    const roomMaterials = useSelector(getMaterials)
    const roomCleats = useSelector(getCleats)
    const rooms = useSelector(getRooms)
    const prevRoomData = useSelector(getRoomByName(selectedRoom))



    function handleAddMaterial(item, numId, btnId) {
        const { productName: product, productType } = item
        console.log(item);
        
        const selectedItem = items.find(item => item.productName === product)
        let quantity = document.getElementById(numId).value
        let sewingType = document.getElementById(`${item.code}-2`).value
        let btn = document.getElementById(btnId)
        console.log(sewingType);
        

        const prevQuantity = prevRoomData?.roomMaterials?.filter((el) => el.product === product)[0].quantity
        console.log(prevQuantity);
        const compareVlaue = prevQuantity === undefined ? quantity : quantity - prevQuantity

        if (selectedItem.quantity < compareVlaue) {
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
            dispatch(editQuantity({ product, quantity: quantity - prevQuantity }))
        }
    }

    function handleAddCleats(item, numId, btnId) {
        const { productName: product, productType, sewingType } = item
        const selectedItem = items.find(item => item.productName === product)
        let quantity = document.getElementById(numId).value
        let btn = document.getElementById(btnId)

        const prevQuantity = prevRoomData?.roomCleates?.filter((el) => el.product === product)[0].quantity
        const compareVlaue = prevQuantity === undefined ? quantity : quantity - prevQuantity

        if (selectedItem.quantity < compareVlaue) {
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
        if (type === "add") {
            dispatch(editQuantity({ product, quantity }))
        } else if (type === "edit") {
            dispatch(editQuantity({ product, quantity: quantity - prevQuantity }))
        }
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
                <Button text={'Add Materials'} type={'red-light'} size={'big'} onClick={() => {
                    setShowMaterialsForm(true)
                    setShowCleatsForm(false)
                }} />
                <Button text={'Add Cleats'} type={'red-light'} size={'big'} onClick={() => {
                    setShowCleatsForm(true)
                    setShowMaterialsForm(false)
                }} />
            </div>

            {
                showMaterialsForm && <form className="room-materials-form" action="" onSubmit={(e) => {
                    e.preventDefault()
                    setShowMaterialsForm(false)
                }}>

                    <h3 className='heading-3'>Materials</h3>

                    {
                        items.map((item) => {
                            return <div key={item.code} className='flex gap-1 mt-1'>
                                <input key={items.indexOf(item)} disabled={true} value={item.productName} type="text" name="" id="" />
                                <input type="number" name="" id={item.code} min={0} />
                                <select name="" id={`${item.code}-2`}>
                                    <option value="type-1">type-1</option>
                                    <option value="type-2">type-2</option>
                                    <option value="type-3">type-3</option>
                                </select>
                                <Button text={"Add"} id={item.productName} type={"primary"} size={"small"} onClick={(e) => {
                                    e.preventDefault()
                                    handleAddMaterial(item, item.code, item.productName)
                                }} />
                            </div>
                        })
                    }
                    <div className='flex align-center gap-1'>
                        <div className='mt-2'><Button text={"Cancel"} type={"primary-transparent"} size={"small"} onClick={(e) => {
                            e.preventDefault()
                            setShowMaterialsForm(false)
                        }} />
                        </div>
                        <div className='mt-2'><Button text={"Done"} type={"primary"} size={"small"} /></div>
                    </div>
                </form>
            }
            {/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {
                showCleatsForm && <form className="room-materials-form" action="" onSubmit={(e) => {
                    e.preventDefault()
                    setShowCleatsForm(false)
                }}>

                    <h3 className='heading-3'>Cleats</h3>

                    {
                        items.map((item) => {
                            return <div key={item.code} className='flex gap-1 mt-1'>
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
                    <div className='flex align-center gap-1'>
                        <div className='mt-2'><Button text={"Cancel"} type={"primary-transparent"} size={"small"} onClick={(e) => {
                            e.preventDefault()
                            setShowCleatsForm(false)
                        }} />
                        </div>
                        <div className='mt-2'><Button text={"Done"} type={"primary"} size={"small"} /></div>
                    </div>
                </form>
            }

            <div>
                <div className="flex align-center gap-2" style={{ overflowX: "auto", margin: "2rem", padding: "1rem 0 " }}>
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

            <Button type={'black'} text={'Add'} onClick={handleSubmitRoom} size={'big'} />
        </div>
    )
}
