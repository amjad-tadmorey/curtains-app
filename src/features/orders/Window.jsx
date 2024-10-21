/* eslint-disable react/prop-types */
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addWindow } from "./orderSlice"
import Button from "../../ui/Button"

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
            windowId: Math.random(),
            imageId,
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

    return (
        <div className="flex flex-col position-relative">
            <img src={src} className="w-100px" onClick={() => setShowForm(!showForm)} />

            {/* Window Materials */}
            {showForm &&
                <div className="windows-options">
                    <form className="" action="" onSubmit={handleSubmit} >
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
                                        <option value="full">Full</option>
                                        <option value="net">Net</option>
                                        <option value="installation">Installation</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                        <Button disabled={disAbleDone} text={'Done'} size={'small'} type={'primary'} />
                    </form>
                </div>
            }
        </div>
    )
}

export default Window
