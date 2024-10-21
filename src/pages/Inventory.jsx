import AddInventory from '../features/inventory/AddInventory'
import InventoryTable from '../features/inventory/InventoryTable'
import PageHeading from '../ui/PageHeading'
import SectionStats from '../ui/SectionStats'
import TableHeading from '../ui/TableHeading'
import Wrapper from '../ui/Wrapper'

function Inventory() {
    return (
        <>
            <PageHeading label={"Inventory"}>
                <AddInventory />
            </PageHeading>
            <SectionStats />

            <Wrapper>
                <TableHeading label={"Inventory"} />
                <InventoryTable />
            </Wrapper>
        </>
    )
}

export default Inventory
