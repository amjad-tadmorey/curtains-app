import SectionStats from "../../ui/SectionStats"
import Spinner from "../../ui/Spinner"
import { useOrders } from "./useOrders"

export default function OrdersStat() {
    const { orders, isLoading } = useOrders()
    if (isLoading) return <Spinner />

    const allOrders = orders.length
    const pendingOrders = orders.filter((order) => order.status === 'pending').length
    const completedOrders = orders.filter((order) => order.status === 'completed').length
    const returnedOrders = orders.filter((order) => order.status === 'returned').length
    const canceledOrders = orders.filter((order) => order.status === 'canceled').length
    const damagedOrders = orders.filter((order) => order.status === 'damaged').length

    return <SectionStats cards={[
        {
            icon: '/src/assets/icons/small-bag.svg',
            cols: [
                {
                    title: 'All Orders',
                    value: allOrders
                },
                {
                    title: 'Pending Orders',
                    value: pendingOrders
                },
                {
                    title: 'Completed Orders',
                    value: completedOrders
                },
            ]
        },
        {
            icon: '/src/assets/icons/small-bag.svg',
            cols: [
                {
                    title: 'Returned Orders',
                    value: returnedOrders
                },
                {
                    title: 'Canceled Orders',
                    value: canceledOrders
                },
                {
                    title: 'Damaged Orders',
                    value: damagedOrders
                },
            ]
        }
    ]} />
}
