import { useParams } from "react-router";
import { getItemById } from "../services/itemsApi";
import { useEffect, useState } from "react";

function ItemView() {
    const { itemId } = useParams()
    const [item, setitem] = useState()

    useEffect(() => {
        async function getItem() {
            const itemApi = await getItemById(itemId)
            setitem(itemApi)
        }
        getItem()
    }, [itemId])

    console.log(item);
    
    return (
        <div>
            ItemView
        </div>
    )
}

export default ItemView
