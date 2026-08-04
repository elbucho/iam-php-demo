import {
    Button,
    HStack,
    Input,
    InputGroup,
    Spacer
} from "@chakra-ui/react";
import Tooltip from "@/components/common/Tooltip";
import { LuPlus, LuSearch } from "react-icons/lu";

interface WidgetToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
    onCreate: () => void;
    isCreateDisabled?: boolean;
    isCreateLoading?: boolean;
}

export default function WidgetToolbar({
    search,
    onSearchChange,
    onCreate,
    isCreateDisabled = false,
    isCreateLoading = false
}: WidgetToolbarProps) {
    return (
        <HStack gap={4} w="100%" mb={4}>
            <InputGroup
                startElement={<LuSearch />}
                flex="1"
            >
                <Input
                    placeholder="Search widgets..."
                    value={search}
                    onChange={(e) =>
                        onSearchChange(e.target.value)
                    }
                />
            </InputGroup>

            <Spacer />

            <Tooltip
                content={
                    isCreateDisabled
                        ? "You don't have permission to create widgets."
                        : undefined
                }
                isDisabled={!isCreateDisabled}
            >
                <Button
                    colorPalette="blue"
                    onClick={onCreate}
                    disabled={isCreateDisabled}
                    loading={isCreateLoading}
                >
                    <LuPlus />
                    New Widget
                </Button>
            </Tooltip>
        </HStack>
    );
}