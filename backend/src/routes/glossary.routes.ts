import { Router } from 'express';
import Joi from 'joi';
import { getGlossary } from '../controllers/glossary.controller';
import { validate } from '../middleware/validate.middleware';

const router = Router();

const glossaryQuerySchema = Joi.object({
  category: Joi.string().valid('all', 'registration', 'voting', 'government', 'process').optional(),
  q: Joi.string().max(100).optional()
});

router.get('/', validate(glossaryQuerySchema, 'query'), getGlossary);

export { router as glossaryRoutes };
