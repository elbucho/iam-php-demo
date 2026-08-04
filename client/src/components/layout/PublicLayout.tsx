import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
    return (
        <Box
            bg="gray.50"
            minH="100vh"
        >
            <Outlet />
        </Box>
    );
}