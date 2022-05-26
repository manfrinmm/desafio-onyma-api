import { inject, injectable } from 'tsyringe';

import AppError from '@domain/@shared/errors/AppError';
import { IEmployeesRepositoryInterface } from '@domain/employees/repositories/EmployeesRepositoryInterface';

import {
  IInputCreateEmployeeDTO,
  IOutputCreateEmployeeDTO,
} from './CreateEmployee.dto';

@injectable()
export default class CreateEmployeeUseCase {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepositoryInterface,
  ) {}

  public async execute(
    input: IInputCreateEmployeeDTO,
  ): Promise<IOutputCreateEmployeeDTO> {
    const employeeAlreadyExists = await this.employeesRepository.findByCpf(
      input.cpf,
    );

    if (employeeAlreadyExists) {
      throw new AppError('Employee already exists');
    }

    const employee = await this.employeesRepository.create(input);

    return employee;
  }
}
