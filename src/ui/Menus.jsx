/* eslint-disable react/prop-types */
import { useContext } from "react"
import { useState } from "react"
import { createContext } from "react"
import { createPortal } from "react-dom"

const MenusContext = createContext()
function Menus({ children }) {
    const [openId, setOpenId] = useState('')
    const [position, setPosition] = useState()
    const close = () => setOpenId('')
    const open = setOpenId


    return <MenusContext.Provider
        value={{
            openId,
            position,
            close,
            open,
            setPosition
        }}
    >
        {children}
    </MenusContext.Provider>
}

function Toggle({ id }) {
    const { openId, close, open, setPosition } = useContext(MenusContext)
    function handleClick(e) {
        const rect = e.target.closest('img').getBoundingClientRect()

        setPosition({
            x: window.innerWidth - rect.width - rect.x,
            y: rect.y + rect.height - + 8,
        })
        openId === '' || openId !== id ? open(id) : close()
    }

    return <div onClick={handleClick}><img src="/src/assets/icons/edit.svg" alt="" className="tool-icon" /></div>
}

function List({ id, children }) {
    const { openId, position } = useContext(MenusContext)
    if (openId !== id) return null

    return createPortal(
        <ul className="menus__list" style={{ right: position.x, top: position.y }}>
            {children}
        </ul>
        , document.body
    )
}
function Button({ children, icon, onClick, status }) {
    const { close } = useContext(MenusContext)
    function handleClick(e) {
        onClick?.(e)
        close()
    }
    return <li>
        <span>{children}</span>
        <img onClick={handleClick} className={status} src={icon} alt="" />
    </li>
}

Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button

export default Menus