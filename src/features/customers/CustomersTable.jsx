import Spinner from "../../ui/Spinner"
import Table from "../../ui/Table"
import CustomerRow from "./CustomerRow"
import { useCreateCustomer } from "./useCreateCustomer"
import { useCustomers } from "./useCustomers"

function CustomersTable() {
    const { isCreating } = useCreateCustomer()
    const { customers, isLoading } = useCustomers()

    if (isLoading || isCreating) return <Spinner />

    return (
        <Table cols="1fr 35rem repeat(4, 1fr)">
            <Table.Header>
                <div>Customer Name</div>
                <div>Adress</div>
                <div>Phone</div>
                <div>Orders</div>
                <div>Customer Since</div>
                <div>Status</div>
            </Table.Header>
            <Table.Body data={customers} render={(customer => <CustomerRow key={customer.id} customer={customer} isLoading={isLoading} />)} />
        </Table>
    )
}

export default CustomersTable
