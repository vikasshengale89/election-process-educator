import { Router } from 'express';
import { getPollingLocation } from '../controllers/polling.controller';

const router = Router();

router.get('/', getPollingLocation);

export { router as pollingRoutes };
