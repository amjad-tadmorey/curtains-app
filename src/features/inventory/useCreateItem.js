import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem as createItemApi } from "../../services/itemsApi";

export function useCreateItem() {

    const queryClient = useQueryClient()
    const { mutate: createItem, isLoading: isCreating } = useMutation({
        mutationFn: createItemApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] })
        }
    })

    return { createItem, isCreating }
}