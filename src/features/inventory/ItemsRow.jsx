import Table from "../../ui/Table"
import Tag from "../../ui/Tag"

/* eslint-disable react/prop-types */
function ItemsRow({ item }) {
    const { id, productName, productType, price, status, quantity, created_at } = item

    return (
        <Table.Row>
            <div className="table__item w-16">{id}</div>
            <div className="table__item w-16">{productName}</div>
            <div className="table__item w-16">{productType}</div>
            <div className="table__item w-16">{price}</div>
            <div className="table__item w-16">{quantity}</div>
            <div className="table__item w-16">{created_at}</div>
            <div className="w-16">
                <Tag role="table__item w-16" status={status}>{status}</Tag>
            </div>
        </Table.Row>
    )
}

export default ItemsRow
