import { Router } from 'express';
import { getGoogleAuthClient } from '../config/google.config';
import { envConfig } from '../config/env.config';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Store temporary sessions (in a real app, use a DB or Redis)
export const sessions: Record<string, any> = {};

// 1. Endpoint to get the Google Auth URL
router.get('/google', (req, res) => {
    const authClient = getGoogleAuthClient();
    
    // Generate a url that asks permissions for email and profile scopes
    const authorizationUrl = authClient.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
      include_granted_scopes: true
    });
  
    res.json({ url: authorizationUrl });
});

// 2. Callback URL that Google redirects to after login
router.get('/google/callback', async (req, res) => {
    const { code } = req.query;
    if (!code || typeof code !== 'string') {
        res.status(400).send('Missing code parameter');
        return;
    }

    try {
        const authClient = getGoogleAuthClient();
        // Exchange the code for tokens
        const { tokens } = await authClient.getToken(code);
        
        // Verify the token
        const ticket = await authClient.verifyIdToken({
            idToken: tokens.id_token!,
            audience: authClient._clientId,
        });

        const payload = ticket.getPayload();
        
        // Create a session for the user
        const sessionId = uuidv4();
        sessions[sessionId] = {
            userId: payload?.sub,
            email: payload?.email,
            name: payload?.name,
            picture: payload?.picture,
            provider: 'google'
        };

        // Redirect to frontend with the session ID
        // In a real app we'd set a secure cookie instead
        res.redirect(`http://localhost:4200/login/success?session_id=${sessionId}`);
    } catch (error) {
        console.error('Error during Google Auth Callback:', error);
        res.redirect(`http://localhost:4200/login/error`);
    }
});

// 3. Login as Guest
router.post('/guest', (req, res) => {
    const sessionId = uuidv4();
    sessions[sessionId] = {
        userId: `guest_${uuidv4()}`,
        name: 'Guest User',
        provider: 'guest'
    };
    res.json({ session_id: sessionId, user: sessions[sessionId] });
});

// 4. Get Current User info
router.get('/me', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
         res.status(401).json({ error: 'Unauthorized' });
         return;
    }

    const sessionId = authHeader.split(' ')[1];
    const user = sessions[sessionId];

    if (!user) {
         res.status(401).json({ error: 'Invalid session' });
         return;
    }

    res.json({ user });
});


export const authRoutes = router;
