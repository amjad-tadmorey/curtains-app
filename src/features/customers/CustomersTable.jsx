import Spinner from "../../ui/Spinner"
import Table from "../../ui/Table"
import NoData from "../../ui/NoData"
import CustomerRow from "./CustomerRow"
import { useCreateCustomer } from "./useCreateCustomer"
import { useCustomers } from "./useCustomers"

function CustomersTable() {
    const { isCreating } = useCreateCustomer()
    const { customers, isLoading } = useCustomers()

    if (isLoading || isCreating) return <Spinner />

    if (customers.length === 0) return <NoData resource={'Customers'} icon={"src/assets/icons/2user.svg"} />

    return (
        <Table cols="15rem 22rem repeat(4, 1fr)">
            <Table.Header>
                <div>Customer Name</div>
                <div>Adress</div>
                <div>Phone</div>
                <div>Customer Since</div>
                <div>Status</div>
                <div>Actions</div>
            </Table.Header>
            <Table.Body data={customers} render={(customer => <CustomerRow key={customer.id} customer={customer} isLoading={isLoading} />)} />
        </Table>
    )
}

export default CustomersTable
