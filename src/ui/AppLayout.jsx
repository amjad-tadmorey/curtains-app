import { Outlet } from "react-router"
import MainContainer from "./MainContainer"
import Header from "./Header"
import Sidebar from "./Sidebar"
import Content from "./Content"

function AppLayout() {
    return (
        <MainContainer >
            <Header />
            <Sidebar />

            <Content>
                <Outlet />
            </Content>

        </MainContainer>
    )
}

export default AppLayout
