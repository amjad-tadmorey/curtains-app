import AddInventory from '../features/inventory/AddInventory'
import InventoryStat from '../features/inventory/InventoryStat'
import InventoryTable from '../features/inventory/InventoryTable'
import PageHeading from '../ui/PageHeading'
import TableHeading from '../ui/TableHeading'
import Wrapper from '../ui/Wrapper'

function Inventory() {
    return (
        <>
            <PageHeading label={"Inventory"}>
                <AddInventory />
            </PageHeading>
            <InventoryStat />

            <Wrapper>
                <TableHeading label={"Inventory"} />
                <InventoryTable />
            </Wrapper>
        </>
    )
}

export default Inventory
