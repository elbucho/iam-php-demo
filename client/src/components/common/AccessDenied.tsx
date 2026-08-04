import {
    Box,
    Heading,
    Text
} from "@chakra-ui/react";

interface AccessDeniedProps {
    resource: string;
}

export default function AccessDenied({
    resource
}: AccessDeniedProps) {
    return (
        <Box py={16} textAlign="center">
            <Heading size="lg">
                Access Denied
            </Heading>

            <Text mt={4} color="fg.muted">
                You don't have permission to view {resource}.
            </Text>
        </Box>
    );
}