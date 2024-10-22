/* eslint-disable react/prop-types */
import Table from "../../ui/Table"
import Tag from "../../ui/Tag";

function CustomerRow({ customer }) {
    const { customerName, adress, phoneNumber, orders, created_at, status } = customer

    return (
        <Table.Row>
            <div className="table__item ">{customerName}</div>
            <div className="table__item ">{adress[0]}</div>
            <div className="table__item ">{phoneNumber}</div>
            <div className="table__item ">{orders}</div>
            <div className="table__item ">{created_at}</div>
            <div className="">
                <Tag role="table__item " status={status}>{status}</Tag>
            </div>
        </Table.Row>
    )
}

export default CustomerRow
