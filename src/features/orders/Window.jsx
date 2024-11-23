/* eslint-disable react/prop-types */
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addWindow } from "./orderSlice"
import Button from "../../ui/Button"
import { createPortal } from "react-dom"
import { generateNumberId } from "../../utils/helpers"

function Window({ window }) {
    const { imageId, src } = window
    
    const [showForm, setShowForm] = useState(false)
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [heightType, setHeightType] = useState('')
    const dispatch = useDispatch()

    const disAbleDone = width === '' || height === '' || heightType === ''


    function handleSubmit() {
        const newWindow = {
            windowId: generateNumberId(),
            src,
            width,
            height,
            heightType
        }
        dispatch(addWindow(newWindow))
        setWidth('')
        setHeight('')
        setHeightType('')
        setShowForm(false)
    };

    /*
        border-right: 1px solid;
    padding-right: 3rem;
    */

    return (
        <div className="flex flex-col position-relative" style={{ borderRight: ".5rem solid", paddingRight: "3rem" }}>
            <img src={src} className="w-100px" onClick={() => setShowForm(!showForm)} style={{ cursor: "pointer" }} />

            {/* Window Materials */}
            {showForm &&
                createPortal(<div className="windows-options">
                    <form className="" action="" onSubmit={handleSubmit} >
                        {/* <button className='modal__close position-static ml-auto' onClick={() => setShowForm(false)}>x</button> */}
                        <div className="flex">
                            <div className="windows-options__row">
                                <div className="flex align-center gap-1">
                                    <p>Width</p>
                                    <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
                                </div>
                                <div className="flex align-center gap-1">
                                    <p>Height</p>
                                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
                                </div>
                                <div className="flex align-center gap-1">

                                    <p>Height Type</p>
                                    <select className="flex-1" name="" id="" value={heightType} onChange={(e) => setHeightType(e.target.value)}>
                                        <option value="">Choose</option>
                                        <option value="K">K</option>
                                        <option value="S">S</option>
                                        <option value="T">T</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                        <div className="flex gap-1">
                            <Button text={'cancel'} size={'small'} type={'primary-transparent'}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setShowForm(false)

                                }}
                            />
                            <Button disabled={disAbleDone} text={'Done'} size={'small'} type={'primary'} />
                        </div>
                    </form>
                </div>, document.body)
            }
        </div>
    )
}

export default Window
