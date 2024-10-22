import { useParams } from "react-router";
import { useGetItemById } from '../features/inventory/useGetItemById'
import Spinner from "../ui/Spinner";

function ItemView() {
    const { itemId } = useParams()
    console.log(itemId);

    const { item, isLoadingItem } = useGetItemById(itemId)

    if (isLoadingItem) return <Spinner />

    console.log(item);
    return (
        <div>
            ItemView
        </div>
    )
}

export default ItemView
