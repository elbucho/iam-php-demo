import { VStack, Box, Separator } from "@chakra-ui/react";
import { sidebarNavigation } from "./SidebarNavigation";
import { usePermissions } from "@/hooks/usePermissions";
import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";
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
            w={collapsed ? "72px" : "260px"}
            h="100vh"
            borderRightWidth="1px"
            bg="gray.100"
            p={3}
            display="flex"
            flexDirection="column"
        >
            <VStack
                flex="1"
                align="stretch"
                gap={0}
            >
                {sidebarNavigation.map((section, index) => {
                    const items = section.items.filter(
                        item =>
                            !item.permission ||
                            permissions.has(item.permission)
                    );

                    if (items.length === 0) {
                        return null;
                    }

                    return (
                        <Box key={section.title}>
                            {index > 0 && (
                                <Separator my={4} />
                            )}

                            <SidebarSection
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
                        </Box>
                    );
                })}
            </VStack>

            <SidebarFooter collapsed={collapsed} />
        </Box>
    );
}