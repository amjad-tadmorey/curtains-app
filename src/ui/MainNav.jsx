import MenuItem from "./MenuItem"

function MainNav() {
    return (
        <ul className="nav">
            <MenuItem to={'/'} label='Dashboard' icon='src/assets/icons/dashboard.svg' />
            <MenuItem to={'/orders'} label='Orders' icon='src/assets/icons/bag.svg' />
            <MenuItem to={'/customers'} label='Customers' icon='src/assets/icons/2user.svg' />
            <MenuItem to={'/inventory'} label='Inventory' icon='src/assets/icons/folder.svg' />
            <MenuItem to={'/settings'} label='Settings' icon='src/assets/icons/setting.svg' />
        </ul>
    )
}

export default MainNav
