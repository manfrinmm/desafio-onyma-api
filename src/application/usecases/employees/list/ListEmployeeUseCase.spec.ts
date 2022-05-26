import { EmployeesRepositoryInMemory } from '@domain/employees/repositories/in-memory/EmployeesRepositoryInMemory';

import CreateEmployeeUseCase from '../create/CreateEmployeeUseCase';
import ListEmployeeUseCase from './ListEmployeeUseCase';

describe('Create a Employee', () => {
  let listEmployeeUseCase: ListEmployeeUseCase;
  let employeesRepositoryInMemory: EmployeesRepositoryInMemory;
  let createEmployeeUseCase: CreateEmployeeUseCase;

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

  const employee2 = {
    name: 'Paulo MM',
    cpf: '18125680020',
    rg: '553311',
    birth_date: '1997-04-03',
    email: 'matheus_poow2@hotmail.com',
    phone: '+5564996140385',
    role: 'Full Stack',
    department: 'Developer',
    address: {
      country: 'brazil',
      state: 'goias',
      city: 'jatai',
      zipcode: '75804000',
      neighborhood: 'centro',
      street: 'rua centro',
      number: '1542',
      complement: 'q13 lt10',
    },
  };

  beforeEach(() => {
    employeesRepositoryInMemory = new EmployeesRepositoryInMemory();

    listEmployeeUseCase = new ListEmployeeUseCase(employeesRepositoryInMemory);
    createEmployeeUseCase = new CreateEmployeeUseCase(
      employeesRepositoryInMemory,
    );
  });

  it('should be able to list all employees', async () => {
    await createEmployeeUseCase.execute(employee);
    await createEmployeeUseCase.execute(employee2);

    const employees = await listEmployeeUseCase.execute();

    expect(employees).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...employee,
          address: expect.objectContaining(employee.address),
        }),
        expect.objectContaining({
          ...employee2,
          address: expect.objectContaining(employee2.address),
        }),
      ]),
    );
  });
});
