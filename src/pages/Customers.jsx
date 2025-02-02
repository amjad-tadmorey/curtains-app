import AddCustomer from "../features/customers/AddCustomer"
import CustomersTable from "../features/customers/CustomersTable"
import CustomerStat from "../features/customers/CustomerStat"
import PageHeading from "../ui/PageHeading"
import SectionStats from "../ui/SectionStats"
import TableHeading from "../ui/TableHeading"
import Wrapper from "../ui/Wrapper"

function Customers() {
    return (
        <>
            <PageHeading label={"Customers"}>
                <AddCustomer />
            </PageHeading>
            <CustomerStat />

            <Wrapper>
                <TableHeading label='Customers' />
                <CustomersTable />
            </Wrapper>
        </>
    )
}

export default Customers
