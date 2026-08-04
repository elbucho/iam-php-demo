import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { permissionApi } from "@/api/PermissionApi";
import { Permission } from "@/types/Permission";

export function usePermissions() {
    const query = useQuery({
        queryKey: ["permissions"],
        queryFn: permissionApi.list,
        staleTime: Infinity
    });

    const permissions = useMemo(
        () => new Set<Permission>(query.data ?? []),
        [ query.data ]
    );

    return {
        ...query,

        list(): Permission[] {
            return [...permissions];
        },

        has(permission: Permission) {
            return permissions.has(permission);
        }
    };
}
