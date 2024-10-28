/* eslint-disable react/prop-types */
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import { useGetOrderByDate } from "./useGetOrderByDate";
import { useEffect, useState } from "react";
import { getOrdersByDate } from "../../services/ordersApi";
import ShecduleBox from "./ShecduleBox";

function ScheduleDay({ day }) {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        async function getOrders() {
            const ordersApi = await getOrdersByDate(day.date)
            setOrders(ordersApi)
        }
        getOrders()
    }, [day.date])

    return (
        <Table.Row withBorders={true}>
            <div className="table__item">{day.date}</div>
            <div className="table__item">{day.day}</div>

            {
                orders.map((order) => <ShecduleBox order={order} />)
            }
        </Table.Row>
    )
}

export default ScheduleDay
