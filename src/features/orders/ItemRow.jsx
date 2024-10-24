/* eslint-disable react/prop-types */

import Table from "../../ui/Table"

function ItemRow({ item }) {
    const { productName, code, quantity } = item
    return (
        <Table.Row>
            <div className="table__item">{productName}</div>
            <div className="table__item">X</div>
            <div className="table__item">{quantity}</div>
            <div className="table__item">X</div>
            <div className="table__item">X</div>
            <div className="table__item">X</div>
        </Table.Row>
    )
}

export default ItemRow
