import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderState as updateOrderStateApi } from "../../services/ordersApi";
import toast from "react-hot-toast";

export function useUpdateOrderStatus() {
    const queryClient = useQueryClient()

    const { mutate: updateOrderState, isLoading: isUpdating } = useMutation({
        mutationFn: updateOrderStateApi,
        onSuccess: () => {
            toast.success("the order status has been updated successfuly")
            queryClient.invalidateQueries({ queryKey: ['order'] })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    return { updateOrderState, isUpdating }
}