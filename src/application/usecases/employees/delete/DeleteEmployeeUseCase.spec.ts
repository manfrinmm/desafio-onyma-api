import AppError from '@domain/@shared/errors/AppError';
import { EmployeesRepositoryInMemory } from '@domain/employees/repositories/in-memory/EmployeesRepositoryInMemory';

import DeleteEmployeeUseCase from './DeleteEmployeeUseCase';

describe('Delete a Employee', () => {
  let employeesRepositoryInMemory: EmployeesRepositoryInMemory;
  let deleteEmployeeUseCase: DeleteEmployeeUseCase;

  let employee = {
    name: 'Matheus MM',
    cpf: '07128213090',
    rg: '554411',
    birth_date: '1999-04-03',
    email: 'matheus_poow@hotmail.com',
    phone: '+5564996140384',
    role: 'Full Stack',
    department: 'Developer',
    company_id: 'fake',
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

  let employee2 = {
    name: 'jj MM',
    cpf: '26170415061',
    rg: '554411',
    birth_date: '1999-04-03',
    email: 'matheus_poow2@hotmail.com',
    phone: '+5564996140381',
    role: 'Full Stack',
    department: 'Developer',
    company_id: 'fake',
    address: {
      country: 'brazil',
      state: 'goias',
      city: 'jatai2',
      zipcode: '75804000',
      neighborhood: 'centro',
      street: 'rua centro',
      number: '1541',
      complement: 'q03 lt10',
    },
  };

  beforeEach(() => {
    employeesRepositoryInMemory = new EmployeesRepositoryInMemory();

    deleteEmployeeUseCase = new DeleteEmployeeUseCase(
      employeesRepositoryInMemory,
    );
  });

  it('should be able to delete a employee by cpf', async () => {
    employeesRepositoryInMemory.create(employee);
    employeesRepositoryInMemory.create(employee2);

    await deleteEmployeeUseCase.execute(employee.cpf);

    expect(employeesRepositoryInMemory.employees).toEqual(
      expect.not.arrayContaining([expect.objectContaining(employee)]),
    );
  });

  it('should bot be able to delete a employee non exists', async () => {
    expect(async () => {
      await deleteEmployeeUseCase.execute('employee.cpf');
    }).rejects.toBeInstanceOf(AppError);
  });
});
