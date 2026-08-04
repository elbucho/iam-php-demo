import { Stack } from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";
import TokenTable from "@/components/tokens/TokenTable";

export default function Tokens() {
    const auth = useAuth();

    return (
        <>
            <Stack gap={8}>
                <TokenTable name={"ID Token Info"} claims={auth.tokens.id?.claims} />
                <TokenTable name={"Access Token Info"} claims={auth.tokens.access?.claims} />
            </Stack>
        </>
    );
}