import {
    useMutation,
    useQuery,
    useQueryClient
} from "@tanstack/react-query";

import { doohickeyApi } from "@/api/DoohickeyApi";

export function useDoohickeys() {

    const queryClient = useQueryClient();

    const doohickeys = useQuery({
        queryKey: ["doohickeys"],
        queryFn: doohickeyApi.list
    });

    const create = useMutation({
        mutationFn: doohickeyApi.create,
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["doohickeys"]
            })
    });

    const update = useMutation({
        mutationFn: doohickeyApi.update,
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["doohickeys"]
            })
    });

    const remove = useMutation({
        mutationFn: doohickeyApi.remove,
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["doohickeys"]
            })
    });

    return {
        doohickeys,
        create,
        update,
        remove
    };
}