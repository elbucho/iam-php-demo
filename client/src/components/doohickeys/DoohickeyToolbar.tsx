import {
    Button,
    HStack,
    Input,
    InputGroup,
    Spacer
} from "@chakra-ui/react";
import Tooltip from "@/components/common/Tooltip";
import { LuPlus, LuSearch } from "react-icons/lu";

interface DoohickeyToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
    onCreate: () => void;
    isCreateDisabled?: boolean;
    isCreateLoading?: boolean;
}

export default function DoohickeyToolbar({
    search,
    onSearchChange,
    onCreate,
    isCreateDisabled = false,
    isCreateLoading = false
}: DoohickeyToolbarProps) {
    console.log(isCreateDisabled);

    return (
        <HStack gap={4} w="100%" mb={4}>
            <InputGroup
                startElement={<LuSearch />}
                flex="1"
            >
                <Input
                    placeholder="Search doohickeys..."
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
                        ? "You don't have permission to create doohickeys."
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
                    New Doohickey
                </Button>
            </Tooltip>
        </HStack>
    );
}