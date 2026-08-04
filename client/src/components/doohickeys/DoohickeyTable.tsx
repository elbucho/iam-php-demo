import {
    Box,
    IconButton,
    Table,
    Text
} from "@chakra-ui/react";

import {
    LuPencil,
    LuTrash2
} from "react-icons/lu";

import Tooltip from "@/components/common/Tooltip";
import { Doohickey } from "@/types/Doohickey";

interface DoohickeyTableProps {
    doohickeys: Doohickey[];
    canEdit: boolean;
    canDelete: boolean;
    onEdit(doohickey: Doohickey): void;
    onDelete(doohickey: Doohickey): void;
}

export default function DoohickeyTable({
    doohickeys,
    canEdit,
    canDelete,
    onEdit,
    onDelete
}: DoohickeyTableProps) {
    if (doohickeys.length === 0) {
        return (
            <Box py={16} textAlign="center">
                <Text fontSize="lg" fontWeight="medium">
                    No doohickeys found.
                </Text>

                <Text color="fg.muted">
                    Try creating a new doohickey.
                </Text>
            </Box>
        );
    }

    return (
        <Table.Root size="md" variant="outline">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>
                        Name
                    </Table.ColumnHeader>

                    <Table.ColumnHeader>
                        Foo
                    </Table.ColumnHeader>

                    <Table.ColumnHeader textAlign="end">
                        Bars
                    </Table.ColumnHeader>

                    <Table.ColumnHeader textAlign="center">
                        Actions
                    </Table.ColumnHeader>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {doohickeys.map(doohickey => (
                    <Table.Row key={doohickey.id}>
                        <Table.Cell>{doohickey.name}</Table.Cell>
                        <Table.Cell>{doohickey.foo}</Table.Cell>
                        <Table.Cell textAlign="end">
                            {doohickey.bars}
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                            <Tooltip
                                content="Edit doohickey"
                                isDisabled={!canEdit}
                            >
                                <IconButton
                                    variant="ghost"
                                    aria-label="Edit doohickey"
                                    disabled={!canEdit}
                                    onClick={() => onEdit(doohickey)}
                                >
                                    <LuPencil />
                                </IconButton>
                            </Tooltip>

                            <Tooltip
                                content="Delete doohickey"
                                isDisabled={!canDelete}
                            >
                                <IconButton
                                    variant="ghost"
                                    colorPalette="red"
                                    aria-label="Delete doohickey"
                                    disabled={!canDelete}
                                    onClick={() => onDelete(doohickey)}
                                >
                                    <LuTrash2 />
                                </IconButton>
                            </Tooltip>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
}