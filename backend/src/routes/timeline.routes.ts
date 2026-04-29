import { Router } from 'express';
import { getTimeline } from '../controllers/timeline.controller';

const router = Router();

router.get('/', getTimeline);

export { router as timelineRoutes };
