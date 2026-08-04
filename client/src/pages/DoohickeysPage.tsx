import {
    Spinner,
    HStack,
    Heading,
    Badge
} from "@chakra-ui/react";
import { useState } from "react";
import { Doohickey } from "@/types/Doohickey";
import { useDoohickeys } from "@/hooks/useDoohickeys";
import { useFilteredDoohickeys } from "@/hooks/useFilteredDoohickeys";
import { usePermissions } from "@/hooks/usePermissions";
import PageHeader from "@/components/common/PageHeader";
import AccessDenied from "@/components/common/AccessDenied";
import DoohickeyToolbar from "@/components/doohickeys/DoohickeyToolbar";
import DoohickeyTable from "@/components/doohickeys/DoohickeyTable";
import DoohickeyDrawer from "@/components/doohickeys/DoohickeyDrawer";
import DeleteDoohickeyDialog from "@/components/doohickeys/DeleteDoohickeyDialog";

export default function DoohickeysPage() {
    const { doohickeys } = useDoohickeys();

    const [search, setSearch] = useState("");

    const [selectedDoohickey, setSelectedDoohickey] =
        useState<Doohickey | null>(null);

    const [drawerOpen, setDrawerOpen] =
        useState(false);

    const [deleteOpen, setDeleteOpen] =
        useState(false);

    const filteredDoohickeys = useFilteredDoohickeys(
        doohickeys.data,
        search
    );

    const permissions = usePermissions();
    const readOnly = (
        !permissions.has("doohickey:delete") &&
        !permissions.has("doohickey:update") &&
        !permissions.has("doohickey:create")
    );

    if (permissions.isLoading) {
        return <Spinner />
    }

    if (!permissions.has("doohickey:view")) {
        return <AccessDenied resource="doohickey" />;
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
                subtitle="Manage doohickeys available to your application"
            />

            <DoohickeyToolbar
                search={search}
                onSearchChange={setSearch}
                onCreate={() => {
                    setSelectedDoohickey(null);
                    setDrawerOpen(true);
                }}
                isCreateDisabled={!permissions.has("doohickey:create")}
            />

            <DoohickeyTable
                doohickeys={filteredDoohickeys}
                onEdit={(doohickey: Doohickey) => {
                    setSelectedDoohickey(doohickey);
                    setDrawerOpen(true);
                }}
                onDelete={(doohickey: Doohickey) => {
                    setSelectedDoohickey(doohickey);
                    setDeleteOpen(true);
                }}
                canEdit={permissions.has("doohickey:update")}
                canDelete={permissions.has("doohickey:delete")}
            />

            <DoohickeyDrawer
                open={drawerOpen}
                doohickey={selectedDoohickey}
                onClose={() => setDrawerOpen(false)}
            />

            <DeleteDoohickeyDialog
                open={deleteOpen}
                doohickey={selectedDoohickey}
                onClose={() => setDeleteOpen(false)}
            />
        </>
    );
}