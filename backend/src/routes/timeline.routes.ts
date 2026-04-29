import { Router } from 'express';
import Joi from 'joi';
import { getTimeline } from '../controllers/timeline.controller';
import { validate } from '../middleware/validate.middleware';

const router = Router();

const timelineQuerySchema = Joi.object({
  location: Joi.string().max(100).optional()
});

router.get('/', validate(timelineQuerySchema, 'query'), getTimeline);

export { router as timelineRoutes };
