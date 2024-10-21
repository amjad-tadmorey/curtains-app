import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
function MenuItem({ icon, label, to }) {
    return (
        <li className='menu-item'>
            <Link to={to} className='menu-item__link'>
                <img src={icon} alt="" className='menu-item__icon' />
                <p className='menu-item__text'>{label}</p>
            </Link>
        </li>
    )
}

export default MenuItem
