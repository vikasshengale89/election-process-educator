import { Router } from 'express';
import { getQuiz } from '../controllers/quiz.controller';

const router = Router();

router.get('/', getQuiz);

export { router as quizRoutes };
