/* eslint-disable react/prop-types */
import Table from "../../ui/Table"
import Tag from "../../ui/Tag";

function CustomerOrderRow({ order }) {
    const { generalInfo: { date, orderType }, id, status } = order
    console.log(order);

    return (
        <Table.Row>
            <div className="table__item">{date}</div>
            <div className="table__item">{orderType}</div>
            <div className="table__item">{id}</div>
            <div className="table__item">X</div>
            <div className="table__item">
                <Tag role="table__item" status={status}>{status}</Tag>
            </div>
        </Table.Row>
    )
}

export default CustomerOrderRow
