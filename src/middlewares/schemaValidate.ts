import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

import { AppError } from '../errors/AppError';

function schemaValidate(schema: yup.ObjectSchema<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });

      next();
    } catch (err) {
      throw new AppError(err);
    }
  };
}

export { schemaValidate };
