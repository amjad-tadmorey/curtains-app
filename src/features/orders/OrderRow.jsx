import Table from "../../ui/Table"
import Tag from "../../ui/Tag"
import { useGetCustomerById } from "../customers/useGetCustomerById"

/* eslint-disable react/prop-types */
function OrderRow({ order }) {

    const { id, status, generalInfo } = order
    const { customer: customerId, date, orderType } = generalInfo
    const { isLoadingCustomer, customer } = useGetCustomerById(customerId)
    
    if (isLoadingCustomer) return null

    return (
        <Table.Row>
            <div className="table__item">{customer.customerName}</div>
            <div className="table__item">{date}</div>
            <div className="table__item">{orderType}</div>
            <div className="table__item">{id}</div>
            <div className="table__item">X</div>
            <Tag role="table__item" status={status}>{status}</Tag>
        </Table.Row>
    )
}

export default OrderRow
