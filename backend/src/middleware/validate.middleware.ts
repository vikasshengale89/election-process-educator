import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validate = (schema: Joi.ObjectSchema, source: 'body' | 'query' | 'params' = 'query') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const data = source === 'body' ? req.body : source === 'params' ? req.params : req.query;
    const { error } = schema.validate(data, { abortEarly: false, stripUnknown: true });

    if (error) {
      const messages = error.details.map(d => d.message);
      res.status(400).json({ success: false, error: 'Validation failed', details: messages });
      return;
    }

    next();
  };
};
