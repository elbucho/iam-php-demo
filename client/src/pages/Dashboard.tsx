import {
    Stack,
    Text,
    Table,
    List,
    Button,
    Spinner
} from "@chakra-ui/react";
import { usePermissions } from "@/hooks/usePermissions";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
    const auth = useAuth();
    const permissions = usePermissions();

    if (auth.loading) {
        return <Spinner />;
    }

    if (!auth.authenticated) {
        return (
            <>
                <Stack gap={6}>
                    <Text textStyle={"lg"}>
                        You are currently logged out.  You can log into the app as the following users
                        to test the various app functions.
                    </Text>

                    <Table.Root striped>
                        <Table.Header>
                            <Table.Row bg={"blue.100"}>
                                <Table.ColumnHeader>Email</Table.ColumnHeader>
                                <Table.ColumnHeader>Password</Table.ColumnHeader>
                                <Table.ColumnHeader>Permissions</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>mjhinkson+widget_viewer@gmail.com</Table.Cell>
                                <Table.Cell>SecurePass1234!</Table.Cell>
                                <Table.Cell>View Widget entries</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>mjhinkson+widget_editor@gmail.com</Table.Cell>
                                <Table.Cell>SecurePass1234!</Table.Cell>
                                <Table.Cell>Edit Widget entries</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>mjhinkson+doohickey_viewer@gmail.com</Table.Cell>
                                <Table.Cell>SecurePass1234!</Table.Cell>
                                <Table.Cell>View Doohickey entries</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>mjhinkson+doohickey_editor@gmail.com</Table.Cell>
                                <Table.Cell>SecurePass1234!</Table.Cell>
                                <Table.Cell>Edit Doohickey entries</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table.Root>
                </Stack>

                <Button
                    colorPalette="blue"
                    onClick={() => void auth.login()}
                >
                    Sign In
                </Button>
            </>
        );
    }

    if (permissions.isLoading) {
        return (
            <Text>Loading permissions...</Text>
        );
    }

    if (permissions.isError) {
        return (
            <Text>Error: {permissions.error.message}</Text>
        );
    }

    return (
        <>
            <Text textStyle={"lg"} fontWeight={"bold"}>
                Permissions for {auth.user?.name}:
            </Text>
            <List.Root ml={8}>
                {permissions.list().map((permission, index) => (
                    <List.Item key={index}>{permission}</List.Item>
                ))}
            </List.Root>
        </>
    );
}