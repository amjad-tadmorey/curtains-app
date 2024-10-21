import OrdersTable from "../features/orders/OrdersTable"
import AddOrder from "../features/orders/AddOrder"
import PageHeading from "../ui/PageHeading"
import SectionStats from "../ui/SectionStats"
import TableHeading from "../ui/TableHeading"
import Wrapper from "../ui/Wrapper"


function Orders() {
    return (
        <>
            <PageHeading label={"Orders"}>
                <AddOrder />
            </PageHeading>
            <SectionStats />

            <Wrapper >
                <TableHeading label='Orders' />
                <OrdersTable />
            </Wrapper>
        </>
    )
}

export default Orders
