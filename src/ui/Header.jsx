import { useLocation, useNavigate } from "react-router"

function Header() {

    const navigate = useNavigate()

    const { pathname } = useLocation()


    return (
        <header className='header'>
            <div className="flex justify-between p-2 align-center header__info">
                <h2 className="heading-2">{pathname === "/" ? "Dashboard" : pathname.split('/')}</h2>
                <div className="flex align-center gap-2">
                    <img src="/src/assets/icons/profile.svg" alt="" className="w-25px" />
                    <p>Amjad Ghassan</p>
                    <i>Notification</i>
                    <i>Dark Mode</i>
                </div>
            </div>

            <div className="header__routes">
                <img onClick={() => navigate('/')} src="/src/assets/icons/home.svg" alt="" /><span>{pathname === "/" ? "" : `/${pathname.split('/')}`}</span>
            </div>
        </header>
    )
}

export default Header
