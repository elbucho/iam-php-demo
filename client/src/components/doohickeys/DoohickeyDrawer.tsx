import { useRef } from "react";
import { Doohickey } from "@/types/Doohickey";
import { useDoohickeys } from "@/hooks/useDoohickeys";
import EntityDrawer from "@/components/common/EntityDrawer";
import DoohickeyForm, {
    DoohickeyFormHandle
} from "./DoohickeyForm";

interface DoohickeyDrawerProps {
    open: boolean;
    doohickey: Doohickey | null;
    onClose(): void;
}

export default function DoohickeyDrawer({
    open,
    doohickey,
    onClose
}: DoohickeyDrawerProps) {
    const formRef = useRef<DoohickeyFormHandle>(null);
    const { create, update } = useDoohickeys();

    async function handleSave() {
        if (!formRef.current) {
            return;
        }

        const dto = formRef.current.submit();

        if (!dto) {
            return;
        }

        if (dto.id === undefined) {
            await create.mutateAsync(dto);
        } else {
            await update.mutateAsync(dto);
        }

        onClose();
    }

    return (
        <EntityDrawer
            open={open}
            title={
                doohickey
                    ? "Edit Doohickey"
                    : "New Doohickey"
            }
            isLoading={
                create.isPending || update.isPending
            }
            onClose={onClose}
            onSave={handleSave}
        >
            <DoohickeyForm
                ref={formRef}
                doohickey={doohickey}
            />
        </EntityDrawer>
    );
}