import { AccessToken } from "@okta/okta-auth-js";

export interface IAuthService {
    getAccessToken(): Promise<AccessToken | undefined>;
    isAuthenticated(): Promise<boolean>;
    login(): Promise<void>;
    logout(): Promise<void>;
}