import { container } from 'tsyringe';

import { IEmployeesRepositoryInterface } from '@domain/employees/repositories/EmployeesRepositoryInterface';
import ConcreteEmployeesRepository from '@infra/typeorm/repositories/concrete-employees/ConcreteEmployeesRepository';

container.registerSingleton<IEmployeesRepositoryInterface>(
  'EmployeesRepository',
  ConcreteEmployeesRepository,
);
