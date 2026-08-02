import {
    Avatar,
    Flex,
    Spacer,
    Image,
    Text,
    Button,
    Menu,
    Portal
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

const LoggedInUser = (props) => {
    const history = useHistory();
    const signOut = async () => await props.okta.signOut();

    return (
        <Menu.Root positioning={{ sameWidth: true }}>
            <Menu.Trigger asChild>
                <Button
                    variant={"solid"}
                    bg={"gray.200"}
                    height={"40px"}
                    color={"black"}
                    mr={"10px"}
                    _hover={{
                        bg: "gray.400",
                        color: "white"
                    }}
                >
                    <Text>{props.name}</Text>
                    <Avatar.Root boxSize={"32px"}>
                        <Avatar.Image
                            src={"/user.jpg"}
                            alt={props.name}
                        />
                    </Avatar.Root>
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        <Menu.Item
                            value={"inspect-token"}
                            cursor={"pointer"}
                            onClick={() => history.push("/token")}
                        >
                            Inspect Token
                        </Menu.Item>
                        <Menu.Separator />
                        <Menu.Item
                            value={"logout"}
                            cursor={"pointer"}
                            onClick={signOut}
                        >
                            Log Out
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}

const LoggedOutUser = (props) => {
    const signIn = async () => await props.okta.signInWithRedirect();

    return (
        <Button
            variant={"solid"}
            bg={"gray.200"}
            height={"40px"}
            color={"black"}
            mr={"10px"}
            borderRadius={"12px"}
            _hover={{
                bg: "gray.400",
                color: "white"
            }}
            onClick={signIn}
        >
            Log In
        </Button>
    );
}

const NavBar = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const history = useHistory();
    const name = authState?.accessToken?.claims?.name ?? "Logged In User";

    return (
        <Flex
            bg={"gray.100"}
            color={"black"}
            height={"52px"}
            align={"center"}
            position={"sticky"}
            top={0}
            zIndex={"sticky"}
            boxShadow={"sm"}
        >
            <Button
                ml={"5px"}
                onClick={() => history.push("/")}
                cursor={"pointer"}
                bg={"gray.100"}
                color={"black"}
                _hover={{
                    bg: "gray.300",
                    color: "white"
                }}
                height={"100%"}
            >
                <Image
                    src={"/iam.svg"}
                    height={"44px"}
                    borderRadius={"8px"}
                    overflow={"hidden"}
                />
                <Text
                    textStyle={"xl"}
                    fontWeight={"bold"}
                    position={"relative"}
                    top={"2px"}
                >
                    IAM PHP Demo
                </Text>
            </Button>
            <Spacer />
            {!authState?.isAuthenticated && (
                <LoggedOutUser okta={oktaAuth} />
            )}

            {authState?.isAuthenticated && (
                <LoggedInUser name={name} okta={oktaAuth} />
            )}
        </Flex>
    )
}

export default NavBar;