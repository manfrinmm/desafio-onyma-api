import { NextFunction, Request, Response } from 'express';

import * as yup from 'yup';

export const validateEmployeeCreatePayload = async (
  req: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  await yup
    .object()
    .shape(
      {
        name: yup.string().required('name property is required'),
        cpf: yup.string().required('cpf property is required'),
        rg: yup.string().required('rg property is required'),
        birth_date: yup.string().required('birth_date property is required'),
        role: yup.string().required('role property is required'),
        department: yup.string().required('department property is required'),
        company_id: yup
          .string()
          .uuid('company_id must be a uuid')
          .required('company_id property is required'),

        email: yup
          .string()
          .email('email property is invalid')
          .when('phone', {
            is: (value: string) => !value,
            then: yup
              .string()
              .required('An email or phone number must be provided'),
          }),
        phone: yup.string().when('email', {
          is: (value: string) => !value,
          then: yup
            .string()
            .required('An email or phone number must be provided'),
        }),

        address: yup.object().shape({
          country: yup
            .string()
            .required('country property is required in address'),
          state: yup.string().required('state property is required in address'),
          city: yup.string().required('city property is required in address'),
          zipcode: yup
            .string()
            .required('zipcode property is required in address'),
          neighborhood: yup
            .string()
            .required('neighborhood property is required in address'),
          street: yup
            .string()
            .required('street property is required in address'),
          number: yup
            .string()
            .required('number property is required in address'),
          complement: yup.string(),
        }),
      },
      [['email', 'phone']],
    )
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

export const validateEmployeeUpdatePayload = async (
  req: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  await yup
    .object()
    .shape(
      {
        name: yup.string().required('name property is required'),
        cpf: yup.string().required('cpf property is required'),
        rg: yup.string().required('rg property is required'),
        birth_date: yup.string().required('birth_date property is required'),
        role: yup.string().required('role property is required'),
        department: yup.string().required('department property is required'),
        company_id: yup
          .string()
          .uuid('company_id must be a uuid')
          .required('company_id property is required'),

        email: yup
          .string()
          .email('email property is invalid')
          .when('phone', {
            is: (value: string) => !value,
            then: yup
              .string()
              .required('An email or phone number must be provided'),
          }),
        phone: yup.string().when('email', {
          is: (value: string) => !value,
          then: yup
            .string()
            .required('An email or phone number must be provided'),
        }),

        address: yup.object().shape({
          id: yup.number().required('id property is required in address'),
          country: yup
            .string()
            .required('country property is required in address'),
          state: yup.string().required('state property is required in address'),
          city: yup.string().required('city property is required in address'),
          zipcode: yup
            .string()
            .required('zipcode property is required in address'),
          neighborhood: yup
            .string()
            .required('neighborhood property is required in address'),
          street: yup
            .string()
            .required('street property is required in address'),
          number: yup
            .string()
            .required('number property is required in address'),
          complement: yup.string(),
        }),
      },
      [['email', 'phone']],
    )
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
