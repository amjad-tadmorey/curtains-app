import { LOW_STOCK } from "../../services/constants";
import SectionStats from "../../ui/SectionStats";
import Spinner from "../../ui/Spinner";
import { useItems } from "./useItems";

export default function InventoryStat() {
    const { items, isLoading } = useItems()
    if (isLoading) return <Spinner />

    const allItems = items.length
    const activeItems = items.filter((item) => item.status === 'active').length
    const inActiveItems = items.filter((item) => item.status === 'in-active').length
    const lowStockItems = items.filter((item) => item.quantity < LOW_STOCK).length

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
