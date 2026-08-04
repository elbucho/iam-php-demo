import {
    Button,
    CloseButton,
    Dialog,
    Portal
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: ReactNode;
    confirmText?: string;
    cancelText?: string;
    variant?: "default" | "danger";
    isLoading?: boolean;
    onConfirm(): void;
    onClose(): void;
}

export default function ConfirmDialog({
    open,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "default",
    isLoading = false,
    onConfirm,
    onClose
}: ConfirmDialogProps) {
    return (
        <Dialog.Root
            open={open}
            onOpenChange={(details) => {
                if (!details.open) {
                    onClose();
                }
            }}
        >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>
                                {title}
                            </Dialog.Title>

                            <Dialog.CloseTrigger asChild>
                                <CloseButton />
                            </Dialog.CloseTrigger>
                        </Dialog.Header>

                        <Dialog.Body>
                            {message}
                        </Dialog.Body>

                        <Dialog.Footer>
                            <Button
                                variant="outline"
                                onClick={onClose}
                            >
                                {cancelText}
                            </Button>

                            <Button
                                colorPalette={
                                    variant === "danger"
                                        ? "red"
                                        : "blue"
                                }
                                loading={isLoading}
                                onClick={onConfirm}
                            >
                                {confirmText}
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}