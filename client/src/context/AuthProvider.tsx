import {
    ReactNode,
    useMemo
} from "react";
import { useOktaAuth } from "@okta/okta-react";
import { AuthContext } from "./AuthContext";

interface Props {
    children: ReactNode;
}

export default function AuthProvider({
    children
}: Props) {
    const { authState, oktaAuth } = useOktaAuth();

    const value = useMemo(() => ({
        loading: authState == null,

        authenticated:
            authState?.isAuthenticated ?? false,

        user: authState?.idToken
            ? {
                name:
                    authState.idToken.claims.name?.toString() ??
                    "Authenticated User",

                email:
                    authState.idToken.claims.email?.toString() ??
                    ""
              }
            : null,

        tokens: {
            access: authState?.accessToken,
            id: authState?.idToken
        },

        login: () => oktaAuth.signInWithRedirect(),

        logout: () => oktaAuth.signOut()
    }), [authState, oktaAuth]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}