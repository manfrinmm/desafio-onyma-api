import { getRepository, Repository } from 'typeorm';

import { IInputCreateEmployeeDTO } from '@application/usecases/employees/create/CreateEmployee.dto';
import { IInputUpdateEmployeeDTO } from '@application/usecases/employees/update/UpdateEmployee.dto';
import Employee from '@domain/employees/entities/Employee';
import { IEmployeesRepositoryInterface } from '@domain/employees/repositories/EmployeesRepositoryInterface';

export default class ConcreteEmployeesRepository
  implements IEmployeesRepositoryInterface
{
  private repository: Repository<Employee>;

  constructor() {
    this.repository = getRepository(Employee);
  }

  async create(entity: IInputCreateEmployeeDTO): Promise<Employee> {
    const employee = this.repository.create(entity);

    const employeeCreated = await this.repository.save(employee);
    return employeeCreated;
  }

  async update(id: string, entity: IInputUpdateEmployeeDTO): Promise<Employee> {
    const employeeUpdated = await this.repository.save({ id, ...entity });

    return employeeUpdated;
  }

  async findAll(): Promise<Employee[]> {
    const employee = await this.repository.find();

    return employee;
  }

  async find(id: string): Promise<Employee | undefined> {
    const employee = await this.repository.findOne(
      { id },
      {
        relations: ['address', 'company'],
      },
    );

    return employee;
  }

  async findByCpf(cpf: string): Promise<Employee | undefined> {
    const employee = await this.repository.findOne(
      { cpf },
      { relations: ['address', 'company'] },
    );

    return employee;
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete({
      id,
    });
  }
}
