import { useQuery } from "@tanstack/react-query";
import { getOrderByDate } from "../../services/ordersApi";

export function useGetOrderByDate() {
    const { isLoading: isLoadingOrder, data: order } = useQuery({
        queryKey: ['order'],
        queryFn: getOrderByDate,
        retry: false
    })

    return { isLoadingOrder, order }
}