import AddCustomer from "../features/customers/AddCustomer"
import CustomersTable from "../features/customers/CustomersTable"
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
            <SectionStats />

            <Wrapper>
                <TableHeading label='Customers' />
                <CustomersTable />
            </Wrapper>
        </>
    )
}

export default Customers
