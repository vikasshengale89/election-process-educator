import { OAuth2Client } from 'google-auth-library';
import { envConfig } from './env.config';
import fs from 'fs';
import path from 'path';

let authClient: OAuth2Client | null = null;

export const getGoogleAuthClient = () => {
    if (!authClient) {
        // use the downloaded json
        const clientSecretJson = JSON.parse(
          fs.readFileSync(path.resolve('/home/vikas/Downloads/client_secret_676364789784-9c4li406fnpckhb6189v8gfo2f3u1mak.apps.googleusercontent.com.json'), 'utf-8')
        );
        const { client_secret, client_id, redirect_uris } = clientSecretJson.web;
        
        authClient = new OAuth2Client(
            client_id,
            client_secret,
            // the downloaded json might not have the correct redirect URI for our local dev env
            // we will log it so the user can configure it in google cloud console
            'http://localhost:3000/api/v1/auth/google/callback'
        );
    }
    return authClient;
};
