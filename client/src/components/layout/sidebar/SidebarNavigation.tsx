import { ReactNode } from "react";
import { Permission } from "@/types/Permission";
import {
    LayoutDashboard,
    Package,
    Wrench,
    Search
} from "lucide-react";

export interface SidebarNavigationItem {
    label: string;
    to: string;
    icon: ReactNode;
    permission?: Permission;
}

export interface SidebarNavigationSection {
    title: string;
    items: SidebarNavigationItem[]
}

export const sidebarNavigation: SidebarNavigationSection[] = [
    {
        title: "General",
        items: [
            {
                label: "Dashboard",
                to: "/",
                icon: <LayoutDashboard size={20} />,
            },
            {
                label: "Inspect Tokens",
                to: "/tokens",
                icon: <Search size={20} />
            }
        ]
    },
    {
        title: "Resources",
        items: [
            {
                label: "Widgets",
                to: "/widgets",
                icon: <Package size={20} />,
                permission: "widget:view",
            },
            {
                label: "Doohickeys",
                to: "/doohickeys",
                icon: <Wrench size={20} />,
                permission: "doohickey:view",
            },
        ]
    }
];
