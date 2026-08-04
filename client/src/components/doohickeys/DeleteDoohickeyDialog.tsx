import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Doohickey } from "@/types/Doohickey";
import { useDoohickeys } from "@/hooks/useDoohickeys";

interface DeleteDoohickeyDialogProps {
    open: boolean;
    doohickey: Doohickey | null;
    onClose(): void;
}
export default function DeleteDoohickeyDialog({
    open,
    doohickey,
    onClose
}: DeleteDoohickeyDialogProps) {
    const { remove } = useDoohickeys();

    async function handleConfirm() {
        if (!doohickey?.id) {
            return;
        }

        await remove.mutateAsync(doohickey.id);

        onClose();
    }

    return (
        <ConfirmDialog
            open={open}
            title="Delete Doohickey"
            message={
                <>
                    Are you sure you want to delete{" "}
                    <strong>{doohickey?.name}</strong>?
                </>
            }
            confirmText="Delete"
            variant="danger"
            isLoading={remove.isPending}
            onConfirm={handleConfirm}
            onClose={onClose}
        />
    );
}