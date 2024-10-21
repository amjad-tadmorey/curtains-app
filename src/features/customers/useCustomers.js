import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../../services/customersApi";

export function useCustomers() {
    const { data: customers, isLoading } = useQuery({
        queryKey: ['customers'],
        queryFn: getCustomers
    })

    return { customers, isLoading }
}