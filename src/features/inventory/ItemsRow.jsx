import { useNavigate } from "react-router"
import Table from "../../ui/Table"
import Tag from "../../ui/Tag"

/* eslint-disable react/prop-types */
function ItemsRow({ product }) {
    const navigate = useNavigate()
    const { id, productName, productType, price, status, inStock, sapID } = product

    return (
        <Table.Row>
            <div className="table__item ">{sapID}</div>
            <div className="table__item ">{productName}</div>
            <div className="table__item ">{productType}</div>
            <div className="table__item ">{price}</div>
            <div className="table__item ">{inStock}</div>
            <div className="">
                <Tag role="table__item " status={status}>{status}</Tag>
            </div>
            <img src="/src/assets/icons/show.svg" alt="" onClick={() => navigate(`/inventory/${id}`)} className="tool-icon" />
        </Table.Row>
    )
}

export default ItemsRow
