import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../../services/customersApi";

export function useCustomers() {
    const { data: customers, isLoading } = useQuery({
        queryKey: ['customer'],
        queryFn: getCustomers
    })

    return { customers, isLoading }
}