// import CreateEmployeeUseCase from '@application/usecases/employees/create/CreateEmployeeUseCase';
import AppError from '@domain/@shared/errors/AppError';
import { CompaniesRepositoryInMemory } from '@domain/companies/repositories/in-memory/CompaniesRepositoryInMemory';
// import { EmployeesRepositoryInMemory } from '@domain/employees/repositories/in-memory/EmployeesRepositoryInMemory';

// import CreateCompanyUseCase from '../create/CreateCompanyUseCase';
import ShowCompanyUseCase from './ShowCompanyUseCase';

describe('Show a Company', () => {
  // let employeesRepositoryInMemory: EmployeesRepositoryInMemory;
  let companiesRepositoryInMemory: CompaniesRepositoryInMemory;

  let showCompanyUseCase: ShowCompanyUseCase;
  // let createCompanyUseCase: CreateCompanyUseCase;
  // let createEmployeeUseCase: CreateEmployeeUseCase;

  const company = {
    name: 'MM productions',
    cnpj: '60240841000106',
  };

  // let employee = {
  //   name: 'Matheus MM',
  //   cpf: '07128213090',
  //   rg: '554411',
  //   birth_date: '1999-04-03',
  //   email: 'matheus_poow@hotmail.com',
  //   phone: '+5564996140384',
  //   role: 'Full Stack',
  //   department: 'Developer',
  //   address: {
  //     country: 'brazil',
  //     state: 'goias',
  //     city: 'jatai',
  //     zipcode: '75804000',
  //     neighborhood: 'centro',
  //     street: 'rua centro',
  //     number: '1541',
  //     complement: 'q03 lt10',
  //   },
  // };

  beforeEach(() => {
    // employeesRepositoryInMemory = new EmployeesRepositoryInMemory();
    companiesRepositoryInMemory = new CompaniesRepositoryInMemory();

    // createEmployeeUseCase = new CreateEmployeeUseCase(
    //   employeesRepositoryInMemory,
    //   companiesRepositoryInMemory,
    // );
    // createCompanyUseCase = new CreateCompanyUseCase(
    //   companiesRepositoryInMemory,
    // );

    showCompanyUseCase = new ShowCompanyUseCase(companiesRepositoryInMemory);
  });

  it('should be able to show a company by cnpj', async () => {
    // const companyCreated = await createCompanyUseCase.execute(company);

    // await createEmployeeUseCase.execute({
    //   ...employee,
    //   company_id: companyCreated.id,
    // });

    companiesRepositoryInMemory.create(company);

    const companyCreated = await showCompanyUseCase.execute({
      cnpj: company.cnpj,
    });

    expect(companyCreated).toEqual(expect.objectContaining(company));

    // expect(companyCreated).toEqual({
    //   ...company,
    //   employees: expect.arrayContaining([
    //     expect.objectContaining({
    //       ...employee,
    //       address: expect.objectContaining(employee.address),
    //     }),
    //   ]),
    // });
  });

  it('should not be able to show a company non exists', async () => {
    expect(async () => {
      await showCompanyUseCase.execute({
        cnpj: 'not exists',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
