import { Router } from 'express';

import EmployeesController from '@infra/web/employees/controllers/EmployeesController';

import { validateEmployeeCreatePayload } from '../validators/EmployeeValidator';

const employeesRouter = Router();

const employeesController = new EmployeesController();

employeesRouter.get('/', employeesController.index);
employeesRouter.post(
  '/',
  validateEmployeeCreatePayload,
  employeesController.store,
);

export default employeesRouter;
