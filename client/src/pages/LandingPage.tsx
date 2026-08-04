import {
    Button,
    Card,
    Container,
    Flex,
    Heading,
    HStack,
    Separator,
    SimpleGrid,
    Stack,
    Table,
    Text,
    Badge,
    List,
    Link
} from "@chakra-ui/react";
import {
    LuShieldCheck,
    LuLock,
    LuDatabase,
    LuBoxes,
} from "react-icons/lu";
import { useAuth } from "@/hooks/useAuth";

export default function LandingPage() {
    const auth = useAuth();

    return (
        <Container maxW="7xl" py={16}>
            <Stack gap={12}>
                <Stack
                    gap={6}
                    textAlign="center"
                    align="center"
                >
                    <Heading size="2xl">
                        Identity &amp; Access Management Demo
                    </Heading>

                    <Text
                        fontSize="xl"
                        maxW="3xl"
                        color="gray.600"
                    >
                        A demonstration application showcasing
                        enterprise authentication, role-based
                        authorization, and modern full-stack
                        architecture using Symfony, React,
                        TypeScript, Okta, Redis, and MariaDB.
                    </Text>

                    <Button
                        size="lg"
                        colorPalette="blue"
                        onClick={() => void auth.login()}
                    >
                        Sign In With Okta
                    </Button>

                    <HStack wrap="wrap" justify="center">
                        <Badge>React</Badge>
                        <Badge>TypeScript</Badge>
                        <Badge>Symfony</Badge>
                        <Badge>PHP</Badge>
                        <Badge>Redis</Badge>
                        <Badge>MariaDB</Badge>
                        <Badge>Okta</Badge>
                        <Badge>Docker</Badge>
                        <Badge>Chakra UI</Badge>
                        <Badge>TanStack Query</Badge>
                    </HStack>
                </Stack>

                <Separator />

                <SimpleGrid columns={{ base: 1, md: 2, lg: 4}} gap={6}>
                    <Card.Root>
                        <Card.Body>
                            <Stack gap={3}>
                                <LuLock size={32} />
                                <Heading size="md">
                                    Authentication
                                </Heading>
                                <Text color="gray.600">
                                    OpenID Connect,
                                    OAuth 2.0,
                                    refresh tokens,
                                    and secure login
                                    powered by Okta.
                                </Text>
                            </Stack>
                        </Card.Body>
                    </Card.Root>

                    <Card.Root>
                        <Card.Body>
                            <Stack gap={3}>
                                <LuShieldCheck size={32} />
                                <Heading size="md">
                                    Authorization
                                </Heading>
                                <Text color="gray.600">
                                    Fine-grained
                                    permission checks,
                                    RBAC,
                                    protected routes,
                                    and UI gating.
                                </Text>
                            </Stack>
                        </Card.Body>
                    </Card.Root>

                    <Card.Root>
                        <Card.Body>
                            <Stack gap={3}>
                                <LuBoxes size={32} />
                                <Heading size="md">
                                    REST API
                                </Heading>
                                <Text color="gray.600">
                                    Full CRUD
                                    operations backed
                                    by Symfony with
                                    validation and
                                    typed DTOs.
                                </Text>
                            </Stack>
                        </Card.Body>
                    </Card.Root>

                    <Card.Root>
                        <Card.Body>
                            <Stack gap={3}>
                                <LuDatabase size={32} />
                                <Heading size="md">
                                    Infrastructure
                                </Heading>
                                <Text color="gray.600">
                                    Dockerized
                                    services,
                                    MariaDB,
                                    React Query,
                                    and clean
                                    separation of
                                    concerns.
                                </Text>
                            </Stack>
                        </Card.Body>
                    </Card.Root>
                </SimpleGrid>

                <Separator />

                <Card.Root>
                    <Card.Header>
                        <Heading size="lg">
                            Why this project?
                        </Heading>
                    </Card.Header>

                    <Card.Body>
                        <Text>
                            This application was built to demonstrate
                            how a modern enterprise application
                            implements authentication,
                            authorization, and permission-driven user
                            interfaces. The focus is on clean
                            architecture, reusable React components,
                            secure API design, and a consistent
                            permission model shared across both the
                            client and server.  Please hire me.
                        </Text>
                    </Card.Body>
                </Card.Root>

                <Flex
                    direction={{
                        base: "column",
                        lg: "row",
                    }}
                    gap={8}
                    align="start"
                >
                    <Card.Root flex={1}>
                        <Card.Header>
                            <Heading size="lg">
                                Suggested Walkthrough
                            </Heading>
                        </Card.Header>

                        <Card.Body>
                            <List.Root gap={4}>
                                <List.Item>
                                    Sign in as the
                                    <strong>
                                        {" "}Widget Viewer
                                    </strong>
                                    {" "}account and observe
                                    the limited navigation.
                                </List.Item>

                                <List.Item>
                                    Sign out and sign in
                                    as the
                                    <strong>
                                        {" "}Widget Editor
                                    </strong>
                                    {" "}account to gain
                                    create, update,
                                    and delete permissions.
                                </List.Item>

                                <List.Item>
                                    Repeat with the
                                    Doohickey accounts
                                    to see resource-level
                                    authorization.
                                </List.Item>

                                <List.Item>
                                    Notice how the
                                    navigation,
                                    buttons,
                                    dialogs,
                                    and routes adapt
                                    automatically
                                    based on the
                                    authenticated user's
                                    permissions.
                                </List.Item>
                            </List.Root>
                        </Card.Body>
                    </Card.Root>

                    <Card.Root
                        flex={1}
                        w={{
                            base: "100%",
                            lg: "auto",
                        }}
                        maxW={{
                            base: "700px",
                            lg: "none",
                        }}
                        mx={{
                            base: "auto",
                            lg: 0
                        }}
                    >
                        <Card.Header>
                            <Heading size="lg">
                                Demo Accounts:
                            </Heading>
                        </Card.Header>

                        <Card.Body>
                            <Table.Root>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeader>
                                            Account
                                        </Table.ColumnHeader>

                                        <Table.ColumnHeader>
                                            Permissions
                                        </Table.ColumnHeader>

                                        <Table.ColumnHeader>
                                            Email
                                        </Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            Widget Viewer
                                        </Table.Cell>

                                        <Table.Cell>
                                            Read widgets
                                        </Table.Cell>

                                        <Table.Cell>
                                            mjhinkson+widget_viewer@gmail.com
                                        </Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell>
                                            Widget Editor
                                        </Table.Cell>

                                        <Table.Cell>
                                            Full widget CRUD
                                        </Table.Cell>

                                        <Table.Cell>
                                            mjhinkson+widget_editor@gmail.com
                                        </Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell>
                                            Doohickey Viewer
                                        </Table.Cell>

                                        <Table.Cell>
                                            Read doohickeys
                                        </Table.Cell>

                                        <Table.Cell>
                                            mjhinkson+doohickey_viewer@gmail.com
                                        </Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell>
                                            Doohickey Editor
                                        </Table.Cell>

                                        <Table.Cell>
                                            Full doohickey CRUD
                                        </Table.Cell>

                                        <Table.Cell>
                                            mjhinkson+doohickey_editor@gmail.com
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table.Root>

                            <Text
                                mt={6}
                                fontSize="sm"
                                color="gray.600"
                            >
                                All demo accounts share the same
                                password, which is provided with the
                                accompanying documentation for this
                                project.
                            </Text>
                        </Card.Body>
                    </Card.Root>
                </Flex>

                <Separator />

                <Stack
                    align="center"
                    textAlign="center"
                >
                    <Text color="gray.600">
                        Developed by Michael Hinkson
                    </Text>

                    <HStack gap={6}>
                        <Link
                            href="mailto:mjhinkson@gmail.com"
                            colorPalette="blue"
                        >
                            Email
                        </Link>

                        <Link
                            href="https://www.linkedin.com/in/michael-hinkson"
                            target="_blank"
                            rel="noopener noreferrer"
                            colorPalette="blue"
                        >
                            LinkedIn
                        </Link>

                        <Link
                            href="https://github.com/elbucho"
                            target="_blank"
                            rel="noopener noreferrer"
                            colorPalette="blue"
                        >
                            GitHub
                        </Link>
                    </HStack>

                    <Text
                        fontSize="sm"
                        color="gray.500"
                    >
                        A portfolio project demonstrating
                        enterprise authentication and
                        authorization patterns.
                    </Text>
                </Stack>
            </Stack>
        </Container>
    );
}