import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSchedule as updateScheduleApi } from "../../services/scheduleApi";
import toast from "react-hot-toast";

export function useUpdateSchedule() {
    const queryClient = useQueryClient()

    const { mutate: updateSchedule, isLoading: isUpdating } = useMutation({
        mutationFn: ({ date, newDayData }) => updateScheduleApi(date, newDayData),
        onSuccess: () => {
            toast.success("the order has been added to schedule successfuly")
            queryClient.invalidateQueries({ queryKey: ['schedule'] })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    return { updateSchedule, isUpdating }
}