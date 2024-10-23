import Table from "../../ui/Table"
import Tag from "../../ui/Tag"

/* eslint-disable react/prop-types */
function ItemsRow({ item }) {
    const { id, productName, productType, price, status, quantity, created_at } = item

    return (
        <Table.Row>
            <div className="table__item ">{id}</div>
            <div className="table__item ">{productName}</div>
            <div className="table__item ">{productType}</div>
            <div className="table__item ">{price}</div>
            <div className="table__item ">{quantity}</div>
            <div className="">
                <Tag role="table__item " status={status}>{status}</Tag>
            </div>
        </Table.Row>
    )
}

export default ItemsRow
