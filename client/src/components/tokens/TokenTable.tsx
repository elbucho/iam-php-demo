import {
    Table,
    Text,
    Card,
    Heading
} from "@chakra-ui/react";
import { UserClaims } from "@okta/okta-auth-js";

export interface TokenTableProps {
    heading: string;
    subtitle: string;
    claims: UserClaims | undefined;
}

export default function TokenTable({
    heading,
    subtitle,
    claims
}: TokenTableProps) {
    return (
        <Card.Root>
            <Card.Header>
                <Heading size="md">
                    {heading}
                </Heading>

                <Text
                    color="gray.600"
                    fontSize="sm"
                >
                    {subtitle}
                </Text>
            </Card.Header>

            <Card.Body>
                <Table.Root variant="outline">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader fontWeight="semibold">
                                Claim
                            </Table.ColumnHeader>

                            <Table.ColumnHeader fontWeight="semibold">
                                Value
                            </Table.ColumnHeader>
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
                                    <Table.Cell
                                        fontFamily="mono"
                                        fontSize="sm"
                                        wordBreak="break-all"
                                    >
                                        {displayValue}
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table.Root>
            </Card.Body>
        </Card.Root>
    )
}