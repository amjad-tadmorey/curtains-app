import Spinner from "../../ui/Spinner"
import Table from "../../ui/Table"
import ItemsRow from "./ItemsRow"
import { useCreateItem } from "./useCreateItem"
import { useItems } from "./useItems"

function InventoryTable() {

    const { isCreating } = useCreateItem()
    const { items, isLoading } = useItems()

    if (isLoading || isCreating) return <Spinner />
    return (
        <Table>
            <Table.Header>
                <div className="w-16">Product ID</div>
                <div className="w-16">Product Name</div>
                <div className="w-16">Product Type</div>
                <div className="w-16">Price</div>
                <div className="w-16">In-Stock</div>
                <div className="w-16">Status</div>
            </Table.Header>
            <Table.Body data={items} render={(item => <ItemsRow key={items.id} item={item} isLoading={isLoading} />)} />
        </Table>
    )
}

export default InventoryTable
