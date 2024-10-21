import MainNav from "./MainNav"

function Sidebar() {
    return (
        <aside className='sidebar'>
            <div className="logo">
                <img src="src/assets/images/logo.png" alt="" className="logo__img" />
                <h1 className='logo__name'>Kabbani <br /> Curtains</h1>
            </div>
            <MainNav />
            <div className="footer">

            </div>
        </aside>
    )
}

export default Sidebar
