import { IInputCreateEmployeeDTO } from '@application/usecases/employees/create/CreateEmployee.dto';
import Employee from '@domain/employees/entities/Employee';

export interface IEmployeesRepositoryInterface {
  create(entity: IInputCreateEmployeeDTO): Promise<Employee>;
  // update(entity: T): Promise<Employee>;
  find(id: string): Promise<Employee | undefined>;
  findAll(): Promise<Employee[]>;

  findByCpf(cpf: string): Promise<Employee | undefined>;
}
