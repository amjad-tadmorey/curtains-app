import { LOW_STOCK } from "../../services/constants";
import SectionStats from "../../ui/SectionStats";
import Spinner from "../../ui/Spinner";
import { useProducts } from "./useProducts";

export default function InventoryStat() {
    const { products, isLoading } = useProducts()
    if (isLoading) return <Spinner />

    const allItems = products.length
    const activeItems = products.filter((item) => item.status === 'active').length
    const inActiveItems = products.filter((item) => item.status === 'in-active').length
    const lowStockItems = products.filter((item) => item.quantity < LOW_STOCK).length

    return <SectionStats cards={[
        {
            icon: '/src/assets/icons/small-folder.svg',
            cols: [
                {
                    title: 'All Products',
                    value: allItems
                },
                {
                    title: 'Active Products',
                    value: activeItems
                },
                {
                    title: 'In-Active Products',
                    value: inActiveItems
                },
            ]
        },
        {
            icon: '/src/assets/icons/small-folder.svg',
            cols: [
                {
                    title: 'Low Stock Alert',
                    value: lowStockItems
                },
            ]
        },
    ]} />
}
