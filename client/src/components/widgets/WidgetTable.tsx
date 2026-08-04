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
import { Widget } from "@/types/Widget";

interface WidgetTableProps {
    widgets: Widget[];
    canEdit: boolean;
    canDelete: boolean;
    onEdit(widget: Widget): void;
    onDelete(widget: Widget): void;
}

export default function WidgetTable({
    widgets,
    canEdit,
    canDelete,
    onEdit,
    onDelete
}: WidgetTableProps) {
    if (widgets.length === 0) {
        return (
            <Box py={16} textAlign="center">
                <Text fontSize="lg" fontWeight="medium">
                    No widgets found.
                </Text>

                <Text color="fg.muted">
                    Try creating a new widget.
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
                        Type
                    </Table.ColumnHeader>

                    <Table.ColumnHeader textAlign="end">
                        Cost
                    </Table.ColumnHeader>

                    <Table.ColumnHeader textAlign="center">
                        Actions
                    </Table.ColumnHeader>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {widgets.map(widget => (
                    <Table.Row key={widget.id}>
                        <Table.Cell>{widget.name}</Table.Cell>
                        <Table.Cell>{widget.type}</Table.Cell>
                        <Table.Cell textAlign="end">
                            {widget.cost.toLocaleString(
                                undefined,
                                {
                                    style: "currency",
                                    currency: "USD"
                                }
                            )}
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                            <Tooltip
                                content="Edit widget"
                                isDisabled={!canEdit}
                            >
                                <IconButton
                                    variant="ghost"
                                    aria-label="Edit widget"
                                    disabled={!canEdit}
                                    onClick={() => onEdit(widget)}
                                >
                                    <LuPencil />
                                </IconButton>
                            </Tooltip>

                            <Tooltip
                                content="Delete widget"
                                isDisabled={!canDelete}
                            >
                                <IconButton
                                    variant="ghost"
                                    colorPalette="red"
                                    aria-label="Delete widget"
                                    disabled={!canDelete}
                                    onClick={() => onDelete(widget)}
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