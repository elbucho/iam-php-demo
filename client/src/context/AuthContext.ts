import { createContext } from "react";
import { AccessToken, IDToken } from "@okta/okta-auth-js";

export interface AuthUser {
    name: string;
    email: string;
}

export interface AuthContextValue {
    authenticated: boolean;
    loading: boolean;
    user: AuthUser | null;
    tokens: {
        access: AccessToken | undefined,
        id: IDToken | undefined
    },
    login(): Promise<void>;
    logout(): Promise<boolean>;
}

export const AuthContext =
    createContext<AuthContextValue | null>(null);