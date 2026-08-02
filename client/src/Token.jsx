import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import {
    Stack,
    Table,
    Text,
    Box
} from "@chakra-ui/react";

const TokenTable = (props) => (
    <Box>
        <Text textStyle={"xl"} fontWeight={"bold"}>
            {props.name}
        </Text>

        <Table.Root tableLayout={"fixed"} w={"100%"} striped>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader w={"200px"} fontWeight={"bold"} bg={"blue.100"}>Claim</Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight={"bold"} bg={"blue.100"}>Value</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {props.data && Object.entries(props.data).map(([key, value], index) => {
                    const displayValue =
                        key === 'groups'
                            ? value.join(', ')
                            : value.toString();

                    return (
                        <Table.Row key={index}>
                            <Table.Cell>{key}</Table.Cell>
                            <Table.Cell>{displayValue}</Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table.Root>
    </Box>
);

const Token = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const [ accessTokenInfo, setAccessTokenInfo ] = useState(null);
    const [ idTokenInfo, setIdTokenInfo ] = useState(null);

    useEffect(() => {
        if (!authState || !authState.isAuthenticated) {
            setAccessTokenInfo(null);
            setIdTokenInfo(null);
        } else {
            setAccessTokenInfo(authState.accessToken.claims);
            setIdTokenInfo(authState.idToken.claims);
        }
    }, [ authState, oktaAuth ]);

    return (
        <>
            <Stack gap={8}>
                <TokenTable name={"ID Token Info"} data={idTokenInfo} />
                <TokenTable name={"Access Token Info"} data={accessTokenInfo} />
            </Stack>
        </>
    );
}

export default Token;