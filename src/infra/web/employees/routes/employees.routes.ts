import { Router } from 'express';

import EmployeesController from '@infra/web/employees/controllers/EmployeesController';

import {
  validateEmployeeCreatePayload,
  validateEmployeeUpdatePayload,
} from '../validators/EmployeeValidator';

const employeesRouter = Router();

const employeesController = new EmployeesController();

employeesRouter.get('/', employeesController.index);
employeesRouter.post(
  '/',
  validateEmployeeCreatePayload,
  employeesController.store,
);
employeesRouter.get('/:cpf', employeesController.show);
employeesRouter.put(
  '/:id',
  validateEmployeeUpdatePayload,
  employeesController.update,
);
employeesRouter.delete('/:cpf', employeesController.delete);

export default employeesRouter;
