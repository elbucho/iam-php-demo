import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { permissionApi } from "@/api/PermissionApi";
import { Permission } from "@/types/Permission";

const permissionLabels: Record<Permission, string> = {
    "widget:view": "View Widgets",
    "widget:create": "Create Widgets",
    "widget:update": "Edit Widgets",
    "widget:delete": "Delete Widgets",

    "doohickey:view": "View Doohickeys",
    "doohickey:create": "Create Doohickeys",
    "doohickey:update": "Edit Doohickeys",
    "doohickey:delete": "Delete Doohickeys",
};

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
        },

        label(permission: Permission) {
            return permissionLabels[permission];
        }
    };
}
