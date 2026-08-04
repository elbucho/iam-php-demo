import {
    VStack,
    Box,
    Separator,
    Spacer
} from "@chakra-ui/react";
import { sidebarNavigation } from "./SidebarNavigation";
import { usePermissions } from "@/hooks/usePermissions";
import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";
import SidebarHeader from "./SidebarHeader";
import SidebarAccess from "./SidebarAccess";
import SidebarFooter from "./SidebarFooter";

export interface SidebarProps {
    collapsed?: boolean;
}

export default function Sidebar({
    collapsed = false,
}: SidebarProps) {
    const permissions = usePermissions();

    if (permissions.isLoading) {
        return (
            <Box p={4}>
                Loading...
            </Box>
        );
    }

    if (permissions.isError) {
        return (
            <Box p={4}>
                Unable to load permissions.
            </Box>
        );
    }

    return (
        <Box
            as="aside"
            w={collapsed ? "72px" : "280px"}
            h="100vh"
            bg="gray.50"
            borderRightWidth="1px"
            borderColor="gray.200"
            display="flex"
            flexDirection="column"
        >
            <SidebarHeader collapsed={collapsed} />

            <Separator />

            <SidebarAccess />

            <Box
                flex="1"
                overflowY="auto"
                px={3}
                py={4}
            >
                <VStack
                    align="stretch"
                    gap={6}
                >
                    {sidebarNavigation.map((section) => {
                        const items = section.items.filter(
                            item =>
                                !item.permission ||
                                permissions.has(item.permission)
                        );

                        if (items.length === 0) {
                            return null;
                        }

                        return (
                            <SidebarSection
                                key={section.title}
                                title={section.title}
                                collapsed={collapsed}
                            >
                                {items.map(item => (
                                    <SidebarItem
                                        key={item.to}
                                        {...item}
                                        collapsed={collapsed}
                                    />
                                ))}
                            </SidebarSection>
                        );
                    })}
                </VStack>
            </Box>

            <Spacer />

            <Separator />

            <SidebarFooter collapsed={collapsed} />
        </Box>
    );
}