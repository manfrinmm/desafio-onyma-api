import AppError from '@domain/@shared/errors/AppError';
import { CompaniesRepositoryInMemory } from '@domain/companies/repositories/in-memory/CompaniesRepositoryInMemory';
import { EmployeesRepositoryInMemory } from '@domain/employees/repositories/in-memory/EmployeesRepositoryInMemory';

import CreateEmployeeUseCase from './CreateEmployeeUseCase';

describe('Create a Employee', () => {
  let employeesRepositoryInMemory: EmployeesRepositoryInMemory;
  let companiesRepositoryInMemory: CompaniesRepositoryInMemory;

  let createEmployeeUseCase: CreateEmployeeUseCase;

  beforeEach(() => {
    employeesRepositoryInMemory = new EmployeesRepositoryInMemory();
    companiesRepositoryInMemory = new CompaniesRepositoryInMemory();

    createEmployeeUseCase = new CreateEmployeeUseCase(
      employeesRepositoryInMemory,
      companiesRepositoryInMemory,
    );
  });

  it('should be able to create a new employee', async () => {
    const company = await companiesRepositoryInMemory.create({
      name: 'fake',
      cnpj: 'fake',
    });

    const employee = {
      name: 'Matheus MM',
      cpf: '07128213090',
      rg: '554411',
      birth_date: '1999-04-03',
      email: 'matheus_poow@hotmail.com',
      phone: '+5564996140384',
      role: 'Full Stack',
      department: 'Developer',
      company_id: company.id,
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

    const employeeCreated = await createEmployeeUseCase.execute(employee);

    expect(employeeCreated).toMatchObject(employeeCreated);
    expect(employeeCreated).toHaveProperty('id');
  });

  it('should not be able to create a new employee with same cpf', async () => {
    const company = await companiesRepositoryInMemory.create({
      name: 'fake',
      cnpj: 'fake',
    });

    const employee = {
      name: 'Matheus MM',
      cpf: '07128213090',
      rg: '554411',
      birth_date: '1999-04-03',
      email: 'matheus_poow@hotmail.com',
      phone: '+5564996140384',
      role: 'Full Stack',
      department: 'Developer',
      company_id: company.id,
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

    await createEmployeeUseCase.execute(employee);

    expect(async () => {
      await createEmployeeUseCase.execute(employee);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new employee with non existing company', async () => {
    const employee = {
      name: 'Matheus MM',
      cpf: '07128213090',
      rg: '554411',
      birth_date: '1999-04-03',
      email: 'matheus_poow@hotmail.com',
      phone: '+5564996140384',
      role: 'Full Stack',
      department: 'Developer',
      company_id: 'company.id',
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

    expect(async () => {
      await createEmployeeUseCase.execute(employee);
    }).rejects.toBeInstanceOf(AppError);
  });
});
