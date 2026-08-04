import {
    Badge,
    Button,
    Card,
    Flex,
    Heading,
    Icon,
    List,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";

import {
    LuArrowRight,
    LuBoxes,
    LuShieldCheck,
    LuPackage,
    LuServer,
    LuDatabase,
    LuKeyRound,
} from "react-icons/lu";

import { Link } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";

export default function Dashboard() {
    const auth = useAuth();
    const permissions = usePermissions();

    return (
        <Stack gap={8}>
            <Card.Root>
                <Card.Body>
                    <Heading size="2xl" mb={3}>
                        Welcome, {auth.user?.name}
                    </Heading>

                    <Text color="gray.600" fontSize="lg">
                        This demonstration showcases OAuth&nbsp;2.1,
                        OpenID Connect, role-based authorization,
                        and a modern React + PHP architecture.
                    </Text>
                </Card.Body>
            </Card.Root>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                <Card.Root>
                    <Card.Header>
                        <Heading size="md">
                            Quick Actions
                        </Heading>
                    </Card.Header>

                    <Card.Body>
                        <Stack gap={3}>
                            {permissions.has("widget:view") && (
                                <Button
                                    asChild
                                    justifyContent="space-between"
                                    colorPalette="blue"
                                    variant="subtle"
                                >
                                    <Link to="/widgets">
                                        Browse Widgets
                                        <LuArrowRight />
                                    </Link>
                                </Button>
                            )}

                            {permissions.has("doohickey:view") && (
                                <Button
                                    asChild
                                    justifyContent="space-between"
                                    colorPalette="blue"
                                    variant="subtle"
                                >
                                    <Link to="/doohickeys">
                                        Browse Doohickeys
                                        <LuArrowRight />
                                    </Link>
                                </Button>
                            )}
                        </Stack>
                    </Card.Body>
                </Card.Root>

                <Card.Root>
                    <Card.Header>
                        <Heading size="md">
                            Current Permissions
                        </Heading>
                    </Card.Header>

                    <Card.Body>
                        <List.Root gap={2}>
                            {[...permissions.list()].map(permission => (
                                <List.Item
                                    key={permission}
                                    listStyleType="none"
                                >
                                    ✓ {permissions.label(permission)}
                                </List.Item>
                            ))}
                        </List.Root>
                    </Card.Body>
                </Card.Root>
            </SimpleGrid>

            <Card.Root>

                <Card.Header>
                    <Heading size="md">
                        Technology Stack
                    </Heading>
                </Card.Header>

                <Card.Body>

                    <SimpleGrid
                        columns={{
                            base: 2,
                            md: 3,
                            lg: 6
                        }}
                        gap={6}
                    >
                        <Stack align="center">
                            <Icon as={LuBoxes} boxSize={8} />
                            <Text fontWeight="medium">
                                React
                            </Text>
                            <Badge>TypeScript</Badge>
                        </Stack>

                        <Stack align="center">
                            <Icon as={LuShieldCheck} boxSize={8} />
                            <Text fontWeight="medium">
                                Chakra UI
                            </Text>
                        </Stack>

                        <Stack align="center">
                            <Icon as={LuKeyRound} boxSize={8} />
                            <Text fontWeight="medium">
                                Okta
                            </Text>
                        </Stack>

                        <Stack align="center">
                            <Icon as={LuServer} boxSize={8} />
                            <Text fontWeight="medium">
                                Symfony
                            </Text>
                            <Text fontSize="sm">
                                IAM Server
                            </Text>
                        </Stack>

                        <Stack align="center">
                            <Icon as={LuPackage} boxSize={8} />
                            <Text fontWeight="medium">
                                Slim
                            </Text>
                            <Text fontSize="sm">
                                Resource API
                            </Text>
                        </Stack>

                        <Stack align="center">
                            <Icon as={LuDatabase} boxSize={8} />
                            <Text fontWeight="medium">
                                MariaDB
                            </Text>
                        </Stack>
                    </SimpleGrid>
                </Card.Body>
            </Card.Root>

            <Card.Root>
                <Card.Header>
                    <Heading size="md">
                        Request Flow
                    </Heading>
                </Card.Header>

                <Card.Body>
                    <Flex
                        wrap="wrap"
                        justify="center"
                        align="center"
                        gap={4}
                    >
                        <Badge size="lg" colorPalette="blue">
                            React SPA
                        </Badge>

                        <LuArrowRight />

                        <Badge size="lg" colorPalette="green">
                            Okta
                        </Badge>

                        <LuArrowRight />

                        <Badge size="lg" colorPalette="orange">
                            Symfony IAM
                        </Badge>

                        <LuArrowRight />

                        <Badge size="lg" colorPalette="purple">
                            Slim Resource API
                        </Badge>

                        <LuArrowRight />

                        <Badge size="lg">
                            MariaDB
                        </Badge>
                    </Flex>
                </Card.Body>
            </Card.Root>
        </Stack>
    );
}