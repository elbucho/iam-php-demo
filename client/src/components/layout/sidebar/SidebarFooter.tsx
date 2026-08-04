import {
    Box,
    Button,
    Text,
} from "@chakra-ui/react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Tooltip from "@/components/common/Tooltip";

export interface SidebarFooterProps {
    collapsed?: boolean;
}

export default function SidebarFooter({
    collapsed = false,
}: SidebarFooterProps) {
    const auth = useAuth();

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
        <Box mt="auto" py={3}>
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