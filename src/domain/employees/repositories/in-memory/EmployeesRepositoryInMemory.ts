import { IInputCreateEmployeeDTO } from '@application/usecases/employees/create/CreateEmployee.dto';
import { IInputUpdateEmployeeDTO } from '@application/usecases/employees/update/UpdateEmployee.dto';
import Employee from '@domain/employees/entities/Employee';

import { IEmployeesRepositoryInterface } from '../EmployeesRepositoryInterface';

export class EmployeesRepositoryInMemory
  implements IEmployeesRepositoryInterface
{
  employees: Employee[] = [];

  async create(entity: IInputCreateEmployeeDTO): Promise<Employee> {
    const address = {
      id: Math.random(),
      created_at: new Date(),
      updated_at: new Date(),
      ...entity.address,
    };

    const employee = Object.assign(new Employee(), {
      ...entity,
      id: Math.random().toString(),
      created_at: new Date(),
      updated_at: new Date(),
      address,
      address_id: address.id,
    });

    this.employees.push(employee);

    return employee;
  }

  async find(id: string): Promise<Employee | undefined> {
    return this.employees.find(employee => employee.id === id);
  }

  async findAll(): Promise<Employee[]> {
    return this.employees;
  }

  async findByCpf(cpf: string): Promise<Employee | undefined> {
    return this.employees.find(employee => employee.cpf === cpf);
  }

  async update(id: string, entity: IInputUpdateEmployeeDTO): Promise<Employee> {
    const employeePosition = this.employees.findIndex(employee => employee.id);

    const employee = this.employees[employeePosition];

    const employeeUpdated = Object.assign(employee, {
      ...entity,
      updated_at: new Date(),
    });

    this.employees[employeePosition] = employeeUpdated;

    return employeeUpdated;
  }

  async remove(id: string): Promise<void> {
    this.employees = this.employees.filter(employee => employee.id !== id);
  }
}
