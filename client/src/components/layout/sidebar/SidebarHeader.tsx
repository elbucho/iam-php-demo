import {
    Box,
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
        <Box
            asChild
            px={collapsed ? 2 : 5}
            py={5}
        >
            <Link
                to="/"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: collapsed ? "center" : "flex-start",
                    gap: "12px",
                    textDecoration: "none"
                }}
            >
                <Image
                    src="/iam.svg"
                    alt="IAM PHP Demo"
                    boxSize={collapsed ? "44px" : "40px"}
                    flexShrink={0}
                />

                {!collapsed && (
                    <Box>
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
                    </Box>
                )}
            </Link>
        </Box>
    );
}