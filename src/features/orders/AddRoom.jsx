/* eslint-disable react/prop-types */
import { useState } from 'react'
import Button from '../../ui/Button'
import MaterialInput from './MaterialInput'
import Window from "./Window";
import { addRoom, editRoom, getCleats, getItems, getMaterials, getRoomByName, getRooms, getWindows, resetRoomCleats, resetRoomMaterials, resetWindows } from './orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';



const fakeData = [
    {
        src: "/src/assets/Window-Frame-placeholder.jpg",
        imageId: 1,
    },
    {
        src: "/src/assets/Window-Frame-placeholder.jpg",
        imageId: 2,
    },
    {
        src: "/src/assets/Window-Frame-placeholder.jpg",
        imageId: 3,
    },
    {
        src: "/src/assets/Window-Frame-placeholder.jpg",
        imageId: 4,
    },
    {
        src: "/src/assets/Window-Frame-placeholder.jpg",
        imageId: 5,
    },
]


export default function AddRoom({ setShowRoom, type }) {
    const dispatch = useDispatch()
    const [materialsArray, setMaterialsArray] = useState([""])
    const [cleatsArray, setCleatsArray] = useState([""])

    const [roomMaterials, setRoomMaterials] = useState()
    const [roomCleats, setRoomCleats] = useState()

    const [selectedRoom, setSelectedRoom] = useState("")

    const items = useSelector(getItems)
    const rooms = useSelector(getRooms)
    const currentRoom = useSelector(getRoomByName(selectedRoom))
    const isMaterialsEmpty = useSelector(getMaterials).length === 0
    const isCleatsEmpty = useSelector(getCleats).length === 0



    const [roomName, setRoomName] = useState('')
    const [showMaterialsForm, setShowMaterialsForm] = useState(false)
    const [showCleatsForm, setShowCleatsForm] = useState(false)
    const [notes, setNotes] = useState('')

    const windows = useSelector(getWindows)
    const roomMaterialsRedux = useSelector(getMaterials)
    const roomCleatsRedux = useSelector(getCleats)


    function handleAddMaterial(e) {
        e.preventDefault()
        setMaterialsArray([...materialsArray, ""])
    }
    function handleAddCleats(e) {
        e.preventDefault()
        setCleatsArray([...cleatsArray, ""])
    }

    function handleSubmitMaterials(e) {
        e.preventDefault()
        setMaterialsArray([''])
        setRoomMaterials(roomMaterialsRedux)
        setShowMaterialsForm(false)
    }
    function handleSubmitCleats(e) {
        e.preventDefault()
        setCleatsArray([''])
        setRoomCleats(roomCleatsRedux)
        setShowCleatsForm(false)
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
                showMaterialsForm && <form className="room-materials-form" action="" onSubmit={handleSubmitMaterials}>
                    <div className="flex flex-col gap-1">
                        {currentRoom && currentRoom[0]?.roomMaterials?.map(el => <MaterialInput items={items} editedProductQuantity={el.quantity} editedProductName={el.product} currentRoom={currentRoom} sessionType={type} type="materials" key={materialsArray.indexOf(el)} />)}

                        {materialsArray.map(el => <MaterialInput currentRoom={currentRoom} sessionType={type} type="materials" items={items} key={materialsArray.indexOf(el)} />)}
                    </div>
                    <div className="flex flex-col gap-1 mt-3">
                        <Button text={'Add More'} type={'primary'} size={'medium'} onClick={handleAddMaterial} />
                        <Button text={'Done'} type={'primary'} size={'medium'} disabled={isMaterialsEmpty} />
                    </div>
                </form>
            }
            {
                showCleatsForm && <form className="room-materials-form" action="" onSubmit={handleSubmitCleats}>
                    <div className="flex flex-col gap-1">
                        {currentRoom && currentRoom[0]?.roomCleats?.map(el => <MaterialInput items={items} editedProductQuantity={el.quantity} editedProductName={el.product} currentRoom={currentRoom} sessionType={type} type="cleats" key={materialsArray.indexOf(el)} />)}
                        {cleatsArray.map(el => <MaterialInput currentRoom={currentRoom} sessionType={type} type="cleats" items={items} key={cleatsArray.indexOf(el)} />)}
                    </div>
                    <div className="flex flex-col gap-1 mt-3">
                        <Button text={'Add More'} type={'primary'} size={'medium'} onClick={handleAddCleats} />
                        <Button text={'Done'} type={'primary'} size={'medium'} disabled={isCleatsEmpty} />
                    </div>
                </form>
            }

            <div>
                <div className="flex align-center gap-2">
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
