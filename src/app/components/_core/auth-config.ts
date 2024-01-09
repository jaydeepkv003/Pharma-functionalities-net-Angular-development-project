import { AuthConfig } from 'angular-oauth2-oidc';
import { environment as env } from '../../../environments/environment';

export const authConfig: AuthConfig = {
  responseType: 'code',
  clearHashAfterLogin: false,
  issuer: env.auth.issuer,
  redirectUri: (typeof window !== "undefined" ? window.location.origin : '') + env.auth.redirectUri,
  userinfoEndpoint: env.auth.userinfoEndpoint,
  useIdTokenHintForSilentRefresh: true, // Needed for Code Flow to suggest using iframe-based refreshes
  silentRefreshRedirectUri: (typeof window !== "undefined" ? window.location.origin : '') + env.auth.silentRefreshRedirectUri,
  timeoutFactor: 0.75, // For faster testing
  sessionChecksEnabled: true,
  clientId: env.auth.clientId,
  scope: env.auth.scope,
  logoutUrl: env.auth.logoutUrl,
  nonceStateSeparator: env.auth.nonceStateSeparator,
  showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
  strictDiscoveryDocumentValidation: false,
  skipIssuerCheck: true,
  sessionCheckIFrameUrl: env.auth.silentRefreshRedirectUri
};
