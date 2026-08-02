import { Route, Switch } from "react-router-dom";
import { LoginCallback } from "@okta/okta-react";
import { Container } from "@chakra-ui/react";
import Home from "./Home";
import Token from "./Token.jsx";

function App() {

    return (
        <>
            <Container maxW={"100%"} pt={4} pb={10} px={8}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login/callback" component={LoginCallback} />
                    <Route path="/token" component={Token} />
                </Switch>
            </Container>
        </>
    );
}

export default App
