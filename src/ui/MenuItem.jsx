import { NavLink } from "react-router-dom"

/* eslint-disable react/prop-types */
function MenuItem({ icon, label, to }) {
    return (
        <li className='menu-item'>
            <NavLink to={to} className='menu-item__link'>
                <img src={icon} alt="" className='menu-item__icon' />
                <p className='menu-item__text'>{label}</p>
            </NavLink>
        </li>
    )
}

export default MenuItem
