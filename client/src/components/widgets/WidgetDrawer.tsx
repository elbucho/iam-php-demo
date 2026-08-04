import { useRef } from "react";
import { Widget } from "@/types/Widget";
import { useWidgets } from "@/hooks/useWidgets";
import EntityDrawer from "@/components/common/EntityDrawer";
import WidgetForm, {
    WidgetFormHandle
} from "./WidgetForm";

interface WidgetDrawerProps {
    open: boolean;
    widget: Widget | null;
    onClose(): void;
}

export default function WidgetDrawer({
    open,
    widget,
    onClose
}: WidgetDrawerProps) {
    const formRef = useRef<WidgetFormHandle>(null);
    const { create, update } = useWidgets();

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
                widget
                    ? "Edit Widget"
                    : "New Widget"
            }
            isLoading={
                create.isPending || update.isPending
            }
            onClose={onClose}
            onSave={handleSave}
        >
            <WidgetForm
                ref={formRef}
                widget={widget}
            />
        </EntityDrawer>
    );
}