import { Router } from 'express';
import { getGlossary } from '../controllers/glossary.controller';

const router = Router();

router.get('/', getGlossary);

export { router as glossaryRoutes };
