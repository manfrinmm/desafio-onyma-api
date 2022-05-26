import { NextFunction, Request, Response } from 'express';

import * as yup from 'yup';

export const validateCompanyCreatePayload = async (
  req: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  await yup
    .object()
    .shape({
      name: yup.string().required('name property is required'),
      cnpj: yup.string().required('cnpj property is required'),
    })
    .validate(req.body, { abortEarly: false })
    .catch(error => {
      return response.status(400).json({
        message: 'Validation error',
        erros: error.inner.map((er: any) => ({
          field: er.path,
          message: er.message,
        })),
      });
    });

  return next();
};
