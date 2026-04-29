import { OAuth2Client } from 'google-auth-library';

let authClient: OAuth2Client | null = null;

export const getGoogleAuthClient = (): OAuth2Client => {
  if (!authClient) {
    const clientId = process.env['GOOGLE_CLIENT_ID'] ?? '';
    const clientSecret = process.env['GOOGLE_CLIENT_SECRET'] ?? '';
    const redirectUri = process.env['GOOGLE_REDIRECT_URI'] ?? 'http://localhost:3000/api/v1/auth/google/callback';

    authClient = new OAuth2Client(clientId, clientSecret, redirectUri);
  }
  return authClient;
};
