import { inject, injectable } from 'tsyringe';

import AppError from '@domain/@shared/errors/AppError';
import { IEmployeesRepositoryInterface } from '@domain/employees/repositories/EmployeesRepositoryInterface';

import {
  IInputShowEmployeeDTO,
  IOutputShowEmployeeDTO,
} from './ShowEmployee.dto';

@injectable()
export default class ShowEmployeeUseCase {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepositoryInterface,
  ) {}

  public async execute({
    cpf,
  }: IInputShowEmployeeDTO): Promise<IOutputShowEmployeeDTO> {
    const employee = await this.employeesRepository.findByCpf(cpf);

    if (!employee) {
      throw new AppError('Employee not found');
    }

    return employee;
  }
}
