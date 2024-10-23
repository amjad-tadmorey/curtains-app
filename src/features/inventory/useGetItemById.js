import { useQuery } from "@tanstack/react-query";
import { getItemById } from "../../services/itemsApi";

export function useGetItemById(id) {
    const { isLoading: isLoadingItem, data: item } = useQuery({
        queryKey: ['items'],
        queryFn: () => getItemById(id),
    })
    return { isLoadingItem, item }
}