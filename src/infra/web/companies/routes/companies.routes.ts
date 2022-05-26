import { Router } from 'express';

import CompaniesController from '../controllers/CompaniesController';
import { validateCompanyCreatePayload } from '../validators/CompanyValidator';

const companiesRouter = Router();

const companiesController = new CompaniesController();

companiesRouter.get('/', companiesController.index);
companiesRouter.post(
  '/',
  validateCompanyCreatePayload,
  companiesController.store,
);

export default companiesRouter;
