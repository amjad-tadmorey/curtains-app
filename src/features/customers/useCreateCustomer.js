import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer as createCustomerApi } from "../../services/customersApi";

export function useCreateCustomer() {

    const queryClient = useQueryClient()
    const { mutate: createCustomer, isLoading: isCreating } = useMutation({
        mutationFn: createCustomerApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customer'] })
        }
    })

    return { createCustomer, isCreating }
}