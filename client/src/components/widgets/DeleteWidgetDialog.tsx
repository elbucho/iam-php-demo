import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Widget } from "@/types/Widget";
import { useWidgets } from "@/hooks/useWidgets";

interface DeleteWidgetDialogProps {
    open: boolean;
    widget: Widget | null;
    onClose(): void;
}
export default function DeleteWidgetDialog({
    open,
    widget,
    onClose
}: DeleteWidgetDialogProps) {
    const { remove } = useWidgets();

    async function handleConfirm() {
        if (!widget?.id) {
            return;
        }

        await remove.mutateAsync(widget.id);

        onClose();
    }

    return (
        <ConfirmDialog
            open={open}
            title="Delete Widget"
            message={
                <>
                    Are you sure you want to delete{" "}
                    <strong>{widget?.name}</strong>?
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