import {
    Stack,
    Card,
    Heading,
    Text
} from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";
import TokenTable from "@/components/tokens/TokenTable";

export default function Tokens() {
    const auth = useAuth();

    return (
        <Stack gap={8}>
            <Card.Root>
                <Card.Body>
                    <Heading size="2xl">
                        Token Inspection
                    </Heading>

                    <Text color="gray.600">
                        Inspect the claims returned by Okta after
                        authentication. The ID Token contains
                        identity information, while the Access
                        Token is used to authorize requests to
                        the Resource Server.
                    </Text>
                </Card.Body>
            </Card.Root>

            <TokenTable
                heading={"ID Token"}
                subtitle={"Identity information about the authenticated user."}
                claims={auth.tokens.id?.claims}
            />
            <TokenTable
                heading={"Access Token"}
                subtitle={"Access information about the authenticated user."}
                claims={auth.tokens.access?.claims}
            />
        </Stack>
    );
}