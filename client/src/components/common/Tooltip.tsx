import {
    Tooltip as ChakraTooltip,
    Portal
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface TooltipProps {
    content: ReactNode;
    children: ReactNode;
    isDisabled?: boolean;
}
export default function Tooltip({
    content,
    children,
    isDisabled = false
}: TooltipProps) {
    if (isDisabled) {
        return <>{children}</>;
    }

    return (
        <ChakraTooltip.Root>
            <ChakraTooltip.Trigger asChild>
                {children}
            </ChakraTooltip.Trigger>

            <Portal>
                <ChakraTooltip.Positioner>
                    <ChakraTooltip.Content>
                        {content}
                    </ChakraTooltip.Content>
                </ChakraTooltip.Positioner>
            </Portal>
        </ChakraTooltip.Root>
    );
}