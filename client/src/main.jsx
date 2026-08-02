import { Provider } from "./components/ui/provider";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useHistory } from "react-router-dom";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security } from "@okta/okta-react";
import App from "./App.jsx";
import NavBar from "./components/Navbar";

const oktaAuth = new OktaAuth({
    issuer: 'https://integrator-8270804.okta.com/oauth2/default',
    clientId: '0oa15wkbhmudNmGis698',
    redirectUri: window.location.origin + '/login/callback',
    scopes: ['openid', 'profile', 'email', 'offline_access']
});

function Root() {
    const history = useHistory();

    const restoreOriginalUri = (_oktaAuth, originalUri) => {
        history.replace(
            toRelativeUrl(
                originalUri || '/', window.location.origin
            )
        );
    };

    return (
        <Provider>
            <Security
                oktaAuth={oktaAuth}
                restoreOriginalUri={restoreOriginalUri}
            >
                <NavBar />
                <App />
            </Security>
        </Provider>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Root />
  </BrowserRouter>
);
