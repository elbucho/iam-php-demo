import {
    Button,
    CloseButton,
    Drawer,
    Portal
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface EntityDrawerProps {
    title: string;
    open: boolean;
    children: ReactNode;
    isLoading?: boolean;
    saveText?: string;
    cancelText?: string;
    onSave?: () => void;
    onClose(): void;
}

export default function EntityDrawer({
    open,
    title,
    children,
    isLoading = false,
    saveText = "Save",
    cancelText = "Cancel",
    onClose,
    onSave,
}: EntityDrawerProps) {
    return (
        <Drawer.Root
            open={open}
            onOpenChange={(e) => {
                if (!e.open) {
                    onClose();
                }
            }}
        >
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title>
                                {title}
                            </Drawer.Title>

                            <Drawer.CloseTrigger asChild>
                                <CloseButton />
                            </Drawer.CloseTrigger>
                        </Drawer.Header>

                        <Drawer.Body>
                            {children}
                        </Drawer.Body>

                        <Drawer.Footer>
                            <Button
                                variant="outline"
                                onClick={onClose}
                            >
                                {cancelText}
                            </Button>

                            {onSave && (
                                <Button
                                    colorPalette="blue"
                                    loading={isLoading}
                                    onClick={onSave}
                                >
                                    {saveText}
                                </Button>
                            )}
                        </Drawer.Footer>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    );
}