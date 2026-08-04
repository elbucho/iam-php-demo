import {
    Table,
    Text,
    Box
} from "@chakra-ui/react";
import { UserClaims } from "@okta/okta-auth-js";

export interface TokenTableProps {
    name: string;
    claims: UserClaims | undefined;
}

export default function TokenTable({
    name,
    claims
}: TokenTableProps) {
    return (
        <Box>
            <Text textStyle={"xl"} fontWeight={"bold"}>
                {name}
            </Text>

            <Table.Root tableLayout={"fixed"} w={"100%"} striped>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader w={"200px"} fontWeight={"bold"} bg={"blue.100"}>Claim</Table.ColumnHeader>
                        <Table.ColumnHeader fontWeight={"bold"} bg={"blue.100"}>Value</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {claims && Object.entries(claims).map(([key, value], index) => {
                        const displayValue =
                            Array.isArray(value)
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
    )
}