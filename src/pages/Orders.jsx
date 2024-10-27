import OrdersTable from "../features/orders/OrdersTable"
import AddOrder from "../features/orders/AddOrder"
import OrdersStat from '../features/orders/OrdersStat'
import PageHeading from "../ui/PageHeading"
import TableHeading from "../ui/TableHeading"
import Wrapper from "../ui/Wrapper"


function Orders() {
    
    return (
        <>
            <PageHeading label={"Orders"}>
                <AddOrder />
                {/* <AddSchedule /> */}
            </PageHeading>
            <OrdersStat />
            <Wrapper >
                <TableHeading label='Orders' />
                <OrdersTable />
            </Wrapper>
        </>
    )
}

export default Orders
