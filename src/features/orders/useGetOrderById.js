import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../../services/ordersApi";
import { useParams } from "react-router";

export function useGetOrderById() {
    const { id } = useParams()
    const { isLoading: isLoadingOrder, data: order } = useQuery({
        queryKey: ['order'],
        queryFn: () => getOrderById(id),
        retry: false
    })

    return { isLoadingOrder, order }
}