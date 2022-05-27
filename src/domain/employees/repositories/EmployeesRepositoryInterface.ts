import { IInputCreateEmployeeDTO } from '@application/usecases/employees/create/CreateEmployee.dto';
import { IInputUpdateEmployeeDTO } from '@application/usecases/employees/update/UpdateEmployee.dto';
import Employee from '@domain/employees/entities/Employee';

export interface IEmployeesRepositoryInterface {
  create(entity: IInputCreateEmployeeDTO): Promise<Employee>;
  update(id: string, entity: IInputUpdateEmployeeDTO): Promise<Employee>;
  find(id: string): Promise<Employee | undefined>;
  findAll(): Promise<Employee[]>;
  remove(id: string): Promise<void>;
  findByCpf(cpf: string): Promise<Employee | undefined>;
}
