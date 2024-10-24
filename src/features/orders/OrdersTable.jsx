import { useAddOrder } from './useAddOrder'
import { useOrders } from './useOrders'

import Table from "../../ui/Table"
import OrderRow from "./OrderRow"
import Spinner from '../../ui/Spinner'



function OrdersTable() {
    // just to take the loading state to handle the component
    const { isAdding } = useAddOrder()

    const { isLoading, orders } = useOrders()


    if (isAdding || isLoading) return <Spinner />

    return (
        <Table cols="repeat(7, 1fr)">
            <Table.Header>
                <div>Customer Name</div>
                <div>Order Date</div>
                <div>Order Type</div>
                <div>Tracking ID</div>
                <div>Order Total</div>
                <div>Status</div>
            </Table.Header>
            <Table.Body data={orders} render={(order => <OrderRow key={order.id} order={order} isLoading={isLoading} />)} />
        </Table>
    )
}

export default OrdersTable
