/* eslint-disable react/prop-types */
import { useContext } from "react"
import { cloneElement } from "react"
import { useState } from "react"
import { createContext } from "react"
import { createPortal } from "react-dom"

const ModalContext = createContext()

function Modal({ children }) {

    const [openName, setOpenName] = useState('')
    const close = () => setOpenName('')
    const open = setOpenName

    return (
        <ModalContext.Provider
            value={{
                openName,
                close,
                open
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}

function Open({ children, opens: opensWindowName }) {
    const { open } = useContext(ModalContext)
    return cloneElement(children, { onClick: () => open(opensWindowName) })
}

function Window({ children, name }) {
    const { open, close, openName } = useContext(ModalContext)

    if (name !== openName) return null

    return createPortal(
        <div className="overlay">
            <div className="modal__content">
                {cloneElement(children, { onCloseModal: close, onOpenModal: open })}
            </div>
        </div>
        , document.body
    )
}

Modal.Open = Open
Modal.Window = Window

export default Modal
