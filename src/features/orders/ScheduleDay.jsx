/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Table from "../../ui/Table";
import { getOrderByDate } from "../../services/ordersApi";

function ScheduleDay({ day }) {
    const [orders, setOrders] = useState()

    useEffect(() => {
        async function getOrders() {
            const orders = await getOrderByDate(day.date)
            setOrders(orders)
        }
        getOrders()
    }, [orders])

    console.log(orders);


    return (
        <Table.Row withBorders={true}>
            <div className="table__item">{day.date}</div>
            <div className="table__item">{day.day}</div>
            <div>{orders}</div>
        </Table.Row>
    )
}

export default ScheduleDay
