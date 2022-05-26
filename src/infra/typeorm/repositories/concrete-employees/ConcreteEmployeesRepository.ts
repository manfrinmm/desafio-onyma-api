import { getRepository, Repository } from 'typeorm';

import { IInputCreateEmployeeDTO } from '@application/usecases/employees/create/CreateEmployee.dto';
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
    console.log(entity);
    const employee = this.repository.create(entity);

    const employeeCreated = await this.repository.save(employee);
    return employeeCreated;
  }

  async update(entity: Employee): Promise<Employee> {
    const employeeUpdated = await this.repository.save(entity);

    return employeeUpdated;
  }

  async find(id: string): Promise<Employee | undefined> {
    const employee = await this.repository.findOne(id, {
      relations: ['address'],
    });

    return employee;
  }

  async findAll(): Promise<Employee[]> {
    const employee = await this.repository.find({
      relations: ['address'],
    });

    return employee;
  }

  async findByCpf(cpf: string): Promise<Employee | undefined> {
    const employee = await this.repository.findOne(
      { cpf },
      {
        relations: ['address'],
      },
    );

    return employee;
  }
}
