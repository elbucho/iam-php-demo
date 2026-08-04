import { OktaAuth } from "@okta/okta-auth-js";

export const okta = new OktaAuth({
    issuer: 'https://integrator-8270804.okta.com/oauth2/default',
    clientId: '0oa15wkbhmudNmGis698',
    redirectUri: window.location.origin + '/login/callback',
    postLogoutRedirectUri: window.location.origin,
    scopes: ['openid', 'profile', 'email', 'offline_access']
});
