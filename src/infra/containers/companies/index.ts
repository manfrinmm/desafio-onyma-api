import { container } from 'tsyringe';

import { ICompaniesRepositoryInterface } from '@domain/companies/repositories/CompaniesRepositoryInterface';
import ConcreteCompaniesRepository from '@infra/typeorm/repositories/concrete-companies/ConcreteCompanieesRepository';

container.registerSingleton<ICompaniesRepositoryInterface>(
  'CompaniesRepository',
  ConcreteCompaniesRepository,
);
