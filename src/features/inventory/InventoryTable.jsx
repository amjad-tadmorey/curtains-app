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
        <Table cols="18rem 30rem repeat(4, 1fr)">
            <Table.Header>
                <div>Product ID</div>
                <div>Product Name</div>
                <div>Product Type</div>
                <div>Price</div>
                <div>In-Stock</div>
                <div>Status</div>
            </Table.Header>
            <Table.Body data={items} render={(item => <ItemsRow key={items.id} item={item} isLoading={isLoading} />)} />
        </Table>
    )
}

export default InventoryTable
