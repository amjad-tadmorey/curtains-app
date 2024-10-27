import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../services/productsApi";

export function useGetProductById(id) {
    const { isLoading: isLoadingProduct, data: product } = useQuery({
        queryKey: ['products'],
        queryFn: () => getProductById(id),
    })
    return { product, isLoadingProduct }
}