/* eslint-disable react/prop-types */
import Table from "../../ui/Table"
import Tag from "../../ui/Tag";

function CustomerRow({ customer }) {
    const { customerName, adress, phoneNumber, orders, created_at, status } = customer

    return (
        <Table.Row>
            <div className="table__item w-16">{customerName}</div>
            <div className="table__item w-16">{adress[0]}</div>
            <div className="table__item w-16">{phoneNumber}</div>
            <div className="table__item w-16">{orders}</div>
            <div className="table__item w-16">X</div>
            <div className="table__item w-16">{created_at}</div>
            <div className="w-16">
                <Tag role="table__item w-16" status={status}>{status}</Tag>
            </div>
        </Table.Row>
    )
}

export default CustomerRow
