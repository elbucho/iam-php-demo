import {
    Box,
    Button,
    Separator,
    Stack,
    Text,
} from "@chakra-ui/react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Tooltip from "@/components/common/Tooltip";
import { authService } from "@/services/AuthService";
import {useAuth} from "@/hooks/useAuth";

export interface SidebarFooterProps {
    collapsed?: boolean;
}

export default function SidebarFooter({
    collapsed = false,
}: SidebarFooterProps) {
    const auth = useAuth();
    const navigate = useNavigate();
    async function handleLogout() {
        await authService.logout();
        navigate("/");
    }

    const logoutButton = (
        <Button
            variant="ghost"
            justifyContent={collapsed ? "center" : "flex-start"}
            onClick={() => void auth.logout()}
        >
            <LogOut size={18} />

            {!collapsed && (
                <Text ml={2}>
                    Sign Out
                </Text>
            )}
        </Button>
    );

    return (
        <Box mt="auto" pt={4}>
            <Separator mb={4} />

            {!collapsed && (
                <Stack gap={0} mb={3}>
                    <Text
                        fontWeight="semibold"
                        fontSize="sm"
                    >
                        {auth.user?.name}
                    </Text>

                    <Text
                        fontSize="xs"
                        color="fg.muted"
                    >
                        Authenticated User
                    </Text>
                </Stack>
            )}

            {collapsed ? (
                <Tooltip content="Sign Out">
                    {logoutButton}
                </Tooltip>
            ) : (
                logoutButton
            )}
        </Box>
    );
}