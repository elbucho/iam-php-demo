import {
    Box,
    Stack,
    Text
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface SidebarSectionProps extends PropsWithChildren {
    title: string;
    collapsed?: boolean;
}

export default function SidebarSection({
    title,
    collapsed = false,
    children
}: SidebarSectionProps) {
    return (
        <Box>
            {!collapsed && (
                <Text
                    px={3}
                    mb={2}
                    fontSize="xs"
                    fontWeight="bold"
                    textTransform="uppercase"
                    color="fg.muted"
                    letterSpacing="wider"
                >
                    {title}
                </Text>
            )}

            <Stack gap={1}>
                {children}
            </Stack>
        </Box>
    );
}