import { Router } from 'express';
import { getGoogleAuthClient } from '../config/google.config';
import { envConfig } from '../config/env.config';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';

interface SessionData {
  userId: string;
  email?: string;
  name: string;
  picture?: string;
  provider: 'google' | 'guest';
}

const router = Router();

const sessions: Record<string, SessionData> = {};

router.get('/google', (_req, res) => {
  const authClient = getGoogleAuthClient();
  const authorizationUrl = authClient.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ],
    include_granted_scopes: true
  });
  res.json({ url: authorizationUrl });
});

router.get('/google/callback', async (req, res) => {
  const { code } = req.query;
  if (!code || typeof code !== 'string') {
    res.status(400).json({ error: 'Missing code parameter' });
    return;
  }

  try {
    const authClient = getGoogleAuthClient();
    const { tokens } = await authClient.getToken(code);

    const ticket = await authClient.verifyIdToken({
      idToken: tokens.id_token ?? '',
      audience: envConfig.googleClientId,
    });

    const payload = ticket.getPayload();

    const sessionId = uuidv4();
    sessions[sessionId] = {
      userId: payload?.sub ?? uuidv4(),
      email: payload?.email,
      name: payload?.name ?? 'User',
      picture: payload?.picture,
      provider: 'google'
    };

    res.redirect(`${envConfig.frontendUrl}/login/success?session_id=${sessionId}`);
  } catch (error: unknown) {
    logger.error('Google Auth Callback failed', error);
    res.redirect(`${envConfig.frontendUrl}/login?error=auth_failed`);
  }
});

router.post('/guest', (_req, res) => {
  const sessionId = uuidv4();
  const userId = `guest_${uuidv4()}`;
  sessions[sessionId] = {
    userId,
    name: 'Guest User',
    provider: 'guest'
  };
  res.json({
    session_id: sessionId,
    user: { id: userId, name: 'Guest User', isGuest: true }
  });
});

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

  res.json({
    user: {
      id: user.userId,
      name: user.name,
      email: user.email,
      isGuest: user.provider === 'guest'
    }
  });
});

export const authRoutes = router;
