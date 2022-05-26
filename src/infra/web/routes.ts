import { Router } from 'express';

import companiesRouter from '@infra/web/companies/routes';
import employeesRouter from '@infra/web/employees/routes';

const routes = Router();

routes.use('/', employeesRouter);
routes.use('/', companiesRouter);

export default routes;
