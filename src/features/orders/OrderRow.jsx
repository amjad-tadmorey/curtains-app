import Table from "../../ui/Table"
import Tag from "../../ui/Tag"

/* eslint-disable react/prop-types */
function OrderRow({ order }) {

    const { id, status, generalInfo } = order
    const { customer, date, orderType } = generalInfo
    const [customerName, customerId] = customer.split(",")
    console.log(customerId);


    return (
        <Table.Row>
            <div className="table__item">{customerName}</div>
            <div className="table__item">{date}</div>
            <div className="table__item">{orderType}</div>
            <div className="table__item">{id}</div>
            <div className="table__item">X</div>
            <Tag role="table__item" status={status}>{status}</Tag>
        </Table.Row>
    )
}

export default OrderRow
