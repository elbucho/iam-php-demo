import {
    Box,
    Flex,
    useBreakpointValue
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";

export default function AppLayout() {
    const collapsed = useBreakpointValue({
        base: true,
        md: false
    });

    return (
        <Flex h="100vh">
            <Sidebar collapsed={collapsed ?? false} />

            <Box flex="1" overflow="auto" py={4} px={6}>
                <Outlet />
            </Box>
        </Flex>
    );
}