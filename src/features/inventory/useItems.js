import { useQuery } from "@tanstack/react-query";
import { getItems } from "../../services/itemsApi";

export function useItems() {
    const { data: items, isLoading } = useQuery({
        queryKey: ['items'],
        queryFn: getItems
    })

    return { items, isLoading }
}