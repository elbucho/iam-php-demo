import {
    Spinner,
    HStack,
    Heading,
    Badge
} from "@chakra-ui/react";
import { useState } from "react";
import { Widget } from "@/types/Widget";
import { useWidgets } from "@/hooks/useWidgets";
import { useFilteredWidgets } from "@/hooks/useFilteredWidgets";
import { usePermissions } from "@/hooks/usePermissions";
import PageHeader from "@/components/common/PageHeader";
import AccessDenied from "@/components/common/AccessDenied";
import WidgetToolbar from "@/components/widgets/WidgetToolbar";
import WidgetTable from "@/components/widgets/WidgetTable";
import WidgetDrawer from "@/components/widgets/WidgetDrawer";
import DeleteWidgetDialog from "@/components/widgets/DeleteWidgetDialog";

export default function WidgetsPage() {
    const { widgets } = useWidgets();

    const [search, setSearch] = useState("");

    const [selectedWidget, setSelectedWidget] =
        useState<Widget | null>(null);

    const [drawerOpen, setDrawerOpen] =
        useState(false);

    const [deleteOpen, setDeleteOpen] =
        useState(false);

    const filteredWidgets = useFilteredWidgets(
        widgets.data,
        search
    );

    const permissions = usePermissions();
    const readOnly = (
        !permissions.has("widget:delete") &&
        !permissions.has("widget:update") &&
        !permissions.has("widget:create")
    );

    if (permissions.isLoading) {
        return <Spinner />
    }

    if (!permissions.has("widget:view")) {
        return <AccessDenied resource="widgets" />;
    }

    return (
        <>
            <PageHeader
                title={
                    <HStack gap={3}>
                        <Heading size="xl">Widgets</Heading>
                        {readOnly && (
                            <Badge colorPalette="orange">
                                Read Only
                            </Badge>
                        )}
                    </HStack>
                }
                subtitle="Manage widgets available to your application"
            />

            <WidgetToolbar
                search={search}
                onSearchChange={setSearch}
                onCreate={() => {
                    setSelectedWidget(null);
                    setDrawerOpen(true);
                }}
                isCreateDisabled={!permissions.has("widget:create")}
            />

            <WidgetTable
                widgets={filteredWidgets}
                onEdit={(widget: Widget) => {
                    setSelectedWidget(widget);
                    setDrawerOpen(true);
                }}
                onDelete={(widget: Widget) => {
                    setSelectedWidget(widget);
                    setDeleteOpen(true);
                }}
                canEdit={permissions.has("widget:update")}
                canDelete={permissions.has("widget:delete")}
            />

            <WidgetDrawer
                open={drawerOpen}
                widget={selectedWidget}
                onClose={() => setDrawerOpen(false)}
            />

            <DeleteWidgetDialog
                open={deleteOpen}
                widget={selectedWidget}
                onClose={() => setDeleteOpen(false)}
            />
        </>
    );
}