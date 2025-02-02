import { useAddOrder } from './useAddOrder'
import { useOrders } from './useOrders'

import Table from "../../ui/Table"
import OrderRow from "./OrderRow"
import Spinner from '../../ui/Spinner'
import NoData from '../../ui/NoData'
import Menus from '../../ui/Menus'



function OrdersTable() {
    // just to take the loading state to handle the component
    const { isAdding } = useAddOrder()

    const { isLoading, orders } = useOrders()


    if (isAdding || isLoading) return <Spinner />

    if (orders.length === 0) return <NoData resource={'Orders'} icon={'src/assets/icons/bag.svg'} />

    return (
        <Menus>
            <Table cols="repeat(7, 1fr)">
                <Table.Header>
                    <tr><td>Customer Name</td></tr>
                    <tr><td>Order Date</td></tr>
                    <tr><td>Order Type</td></tr>
                    <tr><td>Tracking ID</td></tr>
                    <tr><td>Order Total</td></tr>
                    <tr><td>Status</td></tr>
                    <tr><td>Acions</td></tr>
                </Table.Header>
                <Table.Body data={orders} render={(order => <OrderRow key={order.id} order={order} isLoading={isLoading} />)} />
            </Table>
        </Menus>
    )
}

export default OrdersTable
