import {
    Badge,
    Button,
    Card,
    Flex,
    Heading,
    List,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";
import { LuArrowRight } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";
import CompanyCard from "@/components/common/CompanyCard";

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
                        <CompanyCard
                            name="React"
                            iconPath="/icons/react.svg"
                            badge="TypeScript 7"
                            badgeColor="blue"
                            subtitle="Client"
                        />

                        <CompanyCard
                            name="Chakra UI"
                            iconPath="/icons/chakra.svg"
                        />

                        <CompanyCard
                            name="Okta"
                            iconPath="/icons/okta.svg"
                        />

                        <CompanyCard
                            name="Symfony"
                            iconPath="/icons/symfony.svg"
                            badge="PHP 8.4"
                            badgeColor="purple"
                            subtitle="IAM Server"
                        />

                        <CompanyCard
                            name="Slim"
                            iconPath="/icons/slim.svg"
                            badge="PHP 8.4"
                            badgeColor="purple"
                            subtitle="Resource API"
                        />

                        <CompanyCard
                            name="MariaDB"
                            iconPath="/icons/mariadb.svg"
                        />
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