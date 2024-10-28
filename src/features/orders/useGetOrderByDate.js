import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrdersByDate } from "../../services/ordersApi";

export function useGetOrderByDate(date) {
    const { isLoading: isLoadingOrder, data: orders } = useQuery({
        queryKey: ['order'],
        queryFn: () => getOrdersByDate(date),
        retry: false
    })
    return { isLoadingOrder, orders }
}