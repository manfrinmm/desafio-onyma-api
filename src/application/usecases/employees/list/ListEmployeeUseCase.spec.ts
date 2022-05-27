import { EmployeesRepositoryInMemory } from '@domain/employees/repositories/in-memory/EmployeesRepositoryInMemory';

import ListEmployeeUseCase from './ListEmployeeUseCase';

describe('List Employees', () => {
  let employeesRepositoryInMemory: EmployeesRepositoryInMemory;

  let listEmployeeUseCase: ListEmployeeUseCase;

  beforeEach(() => {
    employeesRepositoryInMemory = new EmployeesRepositoryInMemory();

    listEmployeeUseCase = new ListEmployeeUseCase(employeesRepositoryInMemory);
  });

  it('should be able to list all employees', async () => {
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

    const employee2 = {
      name: 'Paulo MM',
      cpf: '18125680020',
      rg: '553311',
      birth_date: '1997-04-03',
      email: 'matheus_poow2@hotmail.com',
      phone: '+5564996140385',
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
        number: '1542',
        complement: 'q13 lt10',
      },
    };

    await employeesRepositoryInMemory.create(employee);
    await employeesRepositoryInMemory.create(employee2);

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
