import AppError from '@domain/@shared/errors/AppError';
import { CompaniesRepositoryInMemory } from '@domain/companies/repositories/in-memory/CompaniesRepositoryInMemory';
import { EmployeesRepositoryInMemory } from '@domain/employees/repositories/in-memory/EmployeesRepositoryInMemory';

import UpdateEmployeeUseCase from './UpdateEmployeeUseCase';

describe('Update a Employee', () => {
  let employeesRepositoryInMemory: EmployeesRepositoryInMemory;
  let companiesRepositoryInMemory: CompaniesRepositoryInMemory;

  let updateEmployeeUseCase: UpdateEmployeeUseCase;

  const employee = {
    name: 'Matheus MM',
    cpf: '07128213090',
    rg: '554411',
    birth_date: '1999-04-03',
    email: 'matheus_poow@hotmail.com',
    phone: '+5564996140384',
    role: 'Full Stack',
    department: 'Developer',
    company_id: 'company_id',
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

  const employee2 = {
    name: 'Matheus MM',
    cpf: '07128213092',
    rg: '554411',
    birth_date: '1999-04-03',
    email: 'matheus_poow@hotmail.com',
    phone: '+5564996140384',
    role: 'Full Stack',
    department: 'Developer',
    company_id: 'company_id',
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

    updateEmployeeUseCase = new UpdateEmployeeUseCase(
      employeesRepositoryInMemory,
      companiesRepositoryInMemory,
    );
  });

  it('should be able to update employee', async () => {
    const employeeCreated = await employeesRepositoryInMemory.create(employee);

    const employeeToUpdate = {
      ...employeeCreated,
      name: 'name updated',
      phone: '+5564996140314',
      address: {
        ...employeeCreated.address,
        city: 'City updated',
      },
    };

    jest
      .spyOn(global, 'Date')
      .mockImplementationOnce(() => new Date(2022, 4, 25).toString());

    const employeeUpdated = await updateEmployeeUseCase.execute(
      employeeCreated.id,
      employeeToUpdate,
    );

    expect(employeeUpdated).toEqual(
      expect.objectContaining({
        ...employeeToUpdate,
        address: expect.objectContaining(employeeToUpdate.address),
        updated_at: new Date(2022, 4, 25),
      }),
    );
  });

  it('should not be able to update a user non-existing', async () => {
    const employeeCreated = await employeesRepositoryInMemory.create(employee);

    const employeeToUpdate = {
      ...employeeCreated,
      name: 'name updated',
      phone: '+5564996140314',
      address: {
        ...employeeCreated.address,
        city: 'City updated',
      },
    };

    expect(async () => {
      await updateEmployeeUseCase.execute('id', employeeToUpdate);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a user with cpf already used', async () => {
    const employeeCreated = await employeesRepositoryInMemory.create(employee);
    await employeesRepositoryInMemory.create(employee2);

    const employeeToUpdate = {
      ...employeeCreated,
      cpf: employee2.cpf,
      phone: '+5564996140314',
    };

    expect(async () => {
      await updateEmployeeUseCase.execute(
        employeeToUpdate.id,
        employeeToUpdate,
      );
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a user to a company non existing', async () => {
    const employeeCreated = await employeesRepositoryInMemory.create(employee);
    await employeesRepositoryInMemory.create(employee2);

    const employeeToUpdate = {
      ...employeeCreated,
      phone: '+5564996140314',
      company_id: 'id',
    };

    expect(async () => {
      await updateEmployeeUseCase.execute(
        employeeToUpdate.id,
        employeeToUpdate,
      );
    }).rejects.toBeInstanceOf(AppError);
  });
});
