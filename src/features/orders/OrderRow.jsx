import { useNavigate } from "react-router"
import Button from "../../ui/Button"
import Table from "../../ui/Table"
import Tag from "../../ui/Tag"

/* eslint-disable react/prop-types */
function OrderRow({ order }) {
    const navigate = useNavigate()

    const { id, status, generalInfo, orderTotal, orderDate } = order
    const { customer, orderType } = generalInfo
    const [customerName, customerId] = customer.split(",")


    return (
        <Table.Row>
            <td className="table__item">{customerName}</td>
            <td className="table__item">{orderDate}</td>
            <td className="table__item">{orderType}</td>
            <td className="table__item">{id}</td>
            <td className="table__item">{orderTotal}</td>
            <td><Tag role="table__item" status={status}>{status}</Tag></td>
            <td><img src="/src/assets/icons/show.svg" alt="" onClick={() => navigate(`/orders/${id}`)} className="tool-icon" /></td>
        </Table.Row>
    )
}

export default OrderRow
