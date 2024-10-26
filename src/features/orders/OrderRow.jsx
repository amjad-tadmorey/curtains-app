import { useNavigate } from "react-router"
import Button from "../../ui/Button"
import Table from "../../ui/Table"
import Tag from "../../ui/Tag"

/* eslint-disable react/prop-types */
function OrderRow({ order }) {
    const navigate = useNavigate()

    const { id, status, generalInfo, orderTotal } = order
    const { customer, date, orderType } = generalInfo
    const [customerName, customerId] = customer.split(",")
    console.log(customerId);


    return (
        <Table.Row>
            <div className="table__item">{customerName}</div>
            <div className="table__item">{date}</div>
            <div className="table__item">{orderType}</div>
            <div className="table__item">{id}</div>
            <div className="table__item">{orderTotal}</div>
            <Tag role="table__item" status={status}>{status}</Tag>
            <img src="/src/assets/icons/show.svg" alt="" onClick={() => navigate(`/orders/${id}`)} className="tool-icon"/>
            {/* <Button text={"View"} type={"primary"} size={"medium"} onClick={() => navigate(`/orders/${id}`)}>View</Button> */}
        </Table.Row>
    )
}

export default OrderRow
