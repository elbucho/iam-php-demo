import {
    Box,
    HStack,
    Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { ReactNode } from "react";
import Tooltip from "@/components/common/Tooltip";

export interface SidebarItemProps {
    icon: ReactNode;
    label: string;
    to: string;
    collapsed?: boolean;
}

export default function SidebarItem({
    icon,
    label,
    to,
    collapsed = false,
}: SidebarItemProps) {
    const content = (
        <Box
            asChild
            w="100%"
            px={3}
            py={2.5}
            borderRadius="md"
            transition="all 0.2s ease"
            cursor="pointer"
            color="fg.muted"
            _hover={{
                bg: "gray.200",
                color: "fg",
            }}
            _currentPage={{
                bg: "blue.50",
                color: "blue.700",
                fontWeight: "semibold",
                _hover: {
                    bg: "blue.100",
                },
            }}
        >
            <NavLink to={to} end={to === "/"}>
                <HStack gap={3}>
                    {icon}

                    {!collapsed && (
                        <Text>
                            {label}
                        </Text>
                    )}
                </HStack>
            </NavLink>
        </Box>
    );

    return collapsed ? (
        <Tooltip content={label}>
            {content}
        </Tooltip>
    ) : (
        content
    );
}