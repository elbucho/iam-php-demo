import {AccessToken, OktaAuth} from "@okta/okta-auth-js";
import { IAuthService } from "@/services/AuthServiceInterface";

export class OktaAuthService implements IAuthService {
    constructor(private okta: OktaAuth) {}

    async getAccessToken(): Promise<AccessToken | undefined> {
        const tokens =
            await this.okta.tokenManager.getTokens();

        return tokens?.accessToken;
    }

    async isAuthenticated(): Promise<boolean> {
        return this.okta.isAuthenticated();
    }

    async login(): Promise<void> {
        await this.okta.signInWithRedirect();
    }

    async logout(): Promise<void> {
        await this.okta.signOut();
    }

    subscribe(callback: () => void): () => void {
        this.okta.authStateManager.subscribe(callback);

        return () =>
            this.okta.authStateManager.unsubscribe(callback);
    }
}