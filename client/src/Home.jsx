import { useOktaAuth } from "@okta/okta-react";
import { Stack, Text, Table, List } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const LoggedOut = () => (
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
);

const LoggedIn = (props) => {
    const [ permissions, setPermissions ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        async function loadPermissions() {
            try {
                const response = await fetch('http://localhost:3001/permissions', {
                    headers: { Authorization: `Bearer ${props.auth.accessToken?.accessToken}` }
                });

                if (!response.ok) {
                    throw new Error(`Server returned ${response.status}`);
                }

                const json = await response.json();

                setPermissions(json.permissions);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        }

        loadPermissions();
    }, []);

    if (loading) {
        return (
            <div>Loading permissions...</div>
        );
    }

    if (error) {
        return (
            <div>Error: {error}</div>
        );
    }

    const name = props.auth.accessToken?.claims?.name ?? "Logged In User";

    return (
        <>
            <Text textStyle={"lg"} fontWeight={"bold"}>Permissions for {name}:</Text>
            <List.Root ml={8}>
                {permissions && permissions.map(permission => (
                    <List.Item>{permission}</List.Item>
                ))}
            </List.Root>
        </>
    );
}

const Home = () => {
    const { authState} = useOktaAuth();

    return (
        <>
            {!authState?.isAuthenticated && (
                <LoggedOut />
            )}

            {authState?.isAuthenticated && (
                <LoggedIn auth={authState} />
            )}
        </>
    );
}

export default Home;