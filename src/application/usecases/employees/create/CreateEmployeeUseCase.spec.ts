import AppError from '@domain/@shared/errors/AppError';
import { EmployeesRepositoryInMemory } from '@domain/employees/repositories/in-memory/EmployeesRepositoryInMemory';

import CreateEmployeeUseCase from './CreateEmployeeUseCase';

describe('Create a Employee', () => {
  let createEmployeeUseCase: CreateEmployeeUseCase;
  let employeesRepositoryInMemory: EmployeesRepositoryInMemory;

  const employee = {
    name: 'Matheus MM',
    cpf: '07128213090',
    rg: '554411',
    birth_date: '1999-04-03',
    email: 'matheus_poow@hotmail.com',
    phone: '+5564996140384',
    role: 'Full Stack',
    department: 'Developer',
    address: {
      country: 'brazil',
      state: 'goias',
      city: 'jatai',
      zipcode: '75804000',
      neighborhood: 'centro',
      street: 'rua centro',
      number: '1541',
      complement: 'q03 lt10',
    },
  };

  beforeEach(() => {
    employeesRepositoryInMemory = new EmployeesRepositoryInMemory();

    createEmployeeUseCase = new CreateEmployeeUseCase(
      employeesRepositoryInMemory,
    );
  });

  it('should be able to create a new employee', async () => {
    const employeeCreated = await createEmployeeUseCase.execute(employee);

    expect(employeeCreated).toMatchObject(employeeCreated);
    expect(employeeCreated).toHaveProperty('id');
  });

  it('should not be able to create a new employee with same cpf', async () => {
    await createEmployeeUseCase.execute(employee);

    expect(async () => {
      await createEmployeeUseCase.execute(employee);
    }).rejects.toBeInstanceOf(AppError);
  });
});
