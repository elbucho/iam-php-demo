import {
    Box,
    List,
    Text,
    VStack
} from "@chakra-ui/react";
import { usePermissions } from "@/hooks/usePermissions";
import { useAuth } from "@/hooks/useAuth";

export default function SidebarAccess() {
    const permissions = usePermissions();
    const auth = useAuth();

    return (
        <Box
            px={5}
            py={4}
        >
            <VStack
                align="stretch"
                gap={4}
            >
                <Box mb={2}>
                    <Text
                        mb={2}
                        fontSize="xs"
                        fontWeight="bold"
                        textTransform="uppercase"
                        color="fg.muted"
                        letterSpacing="wider"
                    >
                        Current Access
                    </Text>

                    <Text
                        fontSize="md"
                        fontWeight="bold"
                    >
                        {auth.user?.name ?? "Authenticated User"}
                    </Text>
                </Box>

                <Box>
                    <Text
                        mb={2}
                        fontSize="xs"
                        fontWeight="bold"
                        textTransform="uppercase"
                        color="fg.muted"
                        letterSpacing="wider"
                    >
                        Permissions
                    </Text>

                    <List.Root gap={2}>
                        {[...permissions.list()].map(permission => (
                            <List.Item
                                key={permission}
                                listStyleType="none"
                                fontSize="sm"
                            >
                                ✓ {permissions.label(permission)}
                            </List.Item>
                        ))}
                    </List.Root>
                </Box>
            </VStack>
        </Box>
    )
}