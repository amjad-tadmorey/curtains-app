import { useQuery } from "@tanstack/react-query";
import { getCustomerById } from "../../services/customersApi";

export function useGetCustomerById(id) {
    const { isLoading: isLoadingCustomer, data: customer } = useQuery({
        queryKey: ['customer'],
        queryFn: () => getCustomerById(id),
    })
    return { isLoadingCustomer, customer }
}