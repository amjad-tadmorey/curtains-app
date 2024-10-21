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
        <Table>
            <Table.Header>
                <div className="w-16">Customer Name</div>
                <div className="w-16">Adress</div>
                <div className="w-16">Phone</div>
                <div className="w-16">Orders</div>
                <div className="w-16">Order Total</div>
                <div className="w-16">Customer Since</div>
                <div className="w-16">Status</div>
            </Table.Header>
            <Table.Body data={customers} render={(customer => <CustomerRow key={customer.id} customer={customer} isLoading={isLoading} />)} />
        </Table>
    )
}

export default CustomersTable
