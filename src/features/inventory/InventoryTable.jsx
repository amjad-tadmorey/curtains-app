import Spinner from "../../ui/Spinner"
import Table from "../../ui/Table"
import ItemsRow from "./ItemsRow"
import { useCreateProduct } from "./useCreateProduct"
import { useProducts } from "./useProducts"

function InventoryTable() {

    const { isCreating } = useCreateProduct()
    const { products, isLoading } = useProducts()

    if (isLoading || isCreating) return <Spinner />
    
    return (
        <Table cols="18rem 30rem repeat(5, 1fr)">
            <Table.Header>
                <div>Product ID</div>
                <div>Product Name</div>
                <div>Product Type</div>
                <div>Price</div>
                <div>In-Stock</div>
                <div>Status</div>
                <div>Action</div>
            </Table.Header>
            <Table.Body data={products} render={(product => <ItemsRow key={products.id} product={product} isLoading={isLoading} />)} />
        </Table>
    )
}

export default InventoryTable
