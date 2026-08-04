import {
    Box,
    Flex,
    Heading,
    Text
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface PageHeaderProps {
    title: ReactNode;
    subtitle?: ReactNode;
    actions?: ReactNode;
}

export default function PageHeader({
    title,
    subtitle,
    actions
}: PageHeaderProps) {
    return (
        <Flex
            justify="space-between"
            align="flex-start"
            gap={6}
            mb={8}
        >
            <Box flex="1">
                <Heading size="xl">
                    {title}
                </Heading>

                {subtitle && (
                    <Text mt={2} color="fg.muted">
                        {subtitle}
                    </Text>
                )}
            </Box>

            {actions && (
                <Box>
                    {actions}
                </Box>
            )}
        </Flex>
    );
}