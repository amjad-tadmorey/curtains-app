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
        <Table >
            <Table.Header>
                <div className='w-16'>Customer Name</div>
                <div className='w-16'>Order Date</div>
                <div className='w-16'>Order Type</div>
                <div className='w-16'>Tracking ID</div>
                <div className='w-16'>Order Total</div>
                <div className='w-16'>Status</div>
            </Table.Header>
            <Table.Body data={orders} render={(order => <OrderRow key={order.id} order={order} isLoading={isLoading} />)} />
        </Table>
    )
}

export default OrdersTable
