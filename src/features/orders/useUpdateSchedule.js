import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSchedule as updateScheduleApi } from "../../services/scheduleApi";

export function useUpdateSchedule() {
    const queryClient = useQueryClient()

    const { mutate: updateSchedule, isLoading: isUpdating } = useMutation({
        mutationFn: updateScheduleApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['schedule'] })
        }
    })

    return { updateSchedule, isUpdating }
}