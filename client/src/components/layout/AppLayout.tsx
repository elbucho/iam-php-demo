import {
    Box,
    Flex
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";

export default function AppLayout() {
    return (
        <Flex h="100vh">
            <Sidebar />

            <Box flex="1" overflow="auto" py={4} px={6}>
                <Outlet />
            </Box>
        </Flex>
    );
}