import { Router } from 'express';
import Joi from 'joi';
import { getQuiz } from '../controllers/quiz.controller';
import { validate } from '../middleware/validate.middleware';

const router = Router();

const quizQuerySchema = Joi.object({}).unknown(false);

router.get('/', validate(quizQuerySchema, 'query'), getQuiz);

export { router as quizRoutes };
