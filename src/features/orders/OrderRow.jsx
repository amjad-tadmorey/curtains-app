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
            <div className="table__item w-16">{customer.customerName}</div>
            <div className="table__item w-16">{date}</div>
            <div className="table__item w-16">{orderType}</div>
            <div className="table__item w-16">{id}</div>
            <div className="table__item w-16">X</div>
            <Tag role="table__item w-16" status={status}>{status}</Tag>
        </Table.Row>
    )
}

export default OrderRow
