import { inject, injectable } from 'tsyringe';

import { IEmployeesRepositoryInterface } from '@domain/employees/repositories/EmployeesRepositoryInterface';

import { IOutputListEmployeeDTO } from './ListEmployee.dto';

@injectable()
export default class ListEmployeeUseCase {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepositoryInterface,
  ) {}

  public async execute(): Promise<IOutputListEmployeeDTO> {
    return this.employeesRepository.findAll();
  }
}
