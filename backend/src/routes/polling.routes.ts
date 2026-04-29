import { Router } from 'express';
import Joi from 'joi';
import { getPollingLocation } from '../controllers/polling.controller';
import { validate } from '../middleware/validate.middleware';

const router = Router();

const pollingQuerySchema = Joi.object({
  zip: Joi.string().pattern(/^\d{5}(-\d{4})?$/).required().messages({
    'string.pattern.base': 'Zip code must be a valid 5-digit US zip code',
    'any.required': 'Zip code is required'
  }),
  address: Joi.string().max(200).optional()
});

router.get('/', validate(pollingQuerySchema, 'query'), getPollingLocation);

export { router as pollingRoutes };
