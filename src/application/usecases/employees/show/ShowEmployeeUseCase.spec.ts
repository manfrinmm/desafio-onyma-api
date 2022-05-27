import CreateCompanyUseCase from '@application/usecases/companies/create/CreateCompanyUseCase';
import AppError from '@domain/@shared/errors/AppError';
import { CompaniesRepositoryInMemory } from '@domain/companies/repositories/in-memory/CompaniesRepositoryInMemory';
import { EmployeesRepositoryInMemory } from '@domain/employees/repositories/in-memory/EmployeesRepositoryInMemory';

import CreateEmployeeUseCase from '../create/CreateEmployeeUseCase';
import ShowEmployeeUseCase from './ShowEmployeeUseCase';

describe('Show a Employee', () => {
  let showEmployeeUseCase: ShowEmployeeUseCase;
  let employeesRepositoryInMemory: EmployeesRepositoryInMemory;
  let companiesRepositoryInMemory: CompaniesRepositoryInMemory;
  let createEmployeeUseCase: CreateEmployeeUseCase;
  let createCompanyUseCase: CreateCompanyUseCase;

  const company = {
    name: 'MM productions',
    cnpj: '60240841000106',
  };

  let employee = {
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
    companiesRepositoryInMemory = new CompaniesRepositoryInMemory();

    showEmployeeUseCase = new ShowEmployeeUseCase(employeesRepositoryInMemory);
    createEmployeeUseCase = new CreateEmployeeUseCase(
      employeesRepositoryInMemory,
      companiesRepositoryInMemory,
    );
    createCompanyUseCase = new CreateCompanyUseCase(
      companiesRepositoryInMemory,
    );
  });

  it('should be able to show a employee by cpf', async () => {
    const companyCreated = await createCompanyUseCase.execute(company);

    await createEmployeeUseCase.execute({
      ...employee,
      company_id: companyCreated.id,
    });

    const employeeData = await showEmployeeUseCase.execute({
      cpf: employee.cpf,
    });

    expect(employeeData).toMatchObject({
      ...employee,
      address: expect.objectContaining(employee.address),
    });
  });

  it('should not be able to show a user non exists', async () => {
    expect(async () => {
      await showEmployeeUseCase.execute({
        cpf: 'not exists',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
