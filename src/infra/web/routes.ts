import { Router } from 'express';

import employeesRouter from '@infra/web/employees/routes';

const routes = Router();

routes.use('/', employeesRouter);

export default routes;
