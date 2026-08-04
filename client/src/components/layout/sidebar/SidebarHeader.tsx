import {
    HStack,
    VStack,
    Image,
    Text
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface SidebarHeaderProps {
    collapsed?: boolean;
}

export default function SidebarHeader({
    collapsed = false
}: SidebarHeaderProps) {
    return (
        <HStack
            asChild
            px={5}
            py={5}
            gap={3}
            align="center"
        >
            <Link
                to="/"
                style={{ textDecoration: "none" }}
            >
                <Image
                    src="/iam.svg"
                    alt="IAM PHP Demo"
                    boxSize="40px"
                    flexShrink={0}
                />

                {!collapsed && (
                    <VStack
                        align="start"
                        gap={0}
                    >
                        <Text
                            fontSize="xl"
                            fontWeight="bold"
                            lineHeight="1.1"
                            color="gray.800"
                        >
                            IAM PHP Demo
                        </Text>

                        <Text
                            fontSize="2xs"
                            fontStyle="italic"
                            color="gray.500"
                            letterSpacing="0.05em"
                            textTransform="uppercase"
                            lineHeight="1.2"
                        >
                            Identity &amp; Access Management
                        </Text>
                    </VStack>
                )}
            </Link>
        </HStack>
    );
}