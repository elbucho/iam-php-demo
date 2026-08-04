import {
    useMutation,
    useQuery,
    useQueryClient
} from "@tanstack/react-query";

import { widgetApi } from "@/api/WidgetApi";

export function useWidgets() {

    const queryClient = useQueryClient();

    const widgets = useQuery({
        queryKey: ["widgets"],
        queryFn: widgetApi.list
    });

    const create = useMutation({
        mutationFn: widgetApi.create,
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["widgets"]
            })
    });

    const update = useMutation({
        mutationFn: widgetApi.update,
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["widgets"]
            })
    });

    const remove = useMutation({
        mutationFn: widgetApi.remove,
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["widgets"]
            })
    });

    return {
        widgets,
        create,
        update,
        remove
    };
}