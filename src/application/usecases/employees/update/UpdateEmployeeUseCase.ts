import { inject, injectable } from 'tsyringe';

import AppError from '@domain/@shared/errors/AppError';
import { ICompaniesRepositoryInterface } from '@domain/companies/repositories/CompaniesRepositoryInterface';
import { IEmployeesRepositoryInterface } from '@domain/employees/repositories/EmployeesRepositoryInterface';

import {
  IInputUpdateEmployeeDTO,
  IOutputUpdateEmployeeDTO,
} from './UpdateEmployee.dto';

@injectable()
export default class UpdateEmployeeUseCase {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepositoryInterface,

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepositoryInterface,
  ) {}

  public async execute(
    id: string,
    input: IInputUpdateEmployeeDTO,
  ): Promise<IOutputUpdateEmployeeDTO> {
    const employee = await this.employeesRepository.find(id);

    if (!employee) {
      throw new AppError('Employee not found');
    }

    if (employee.cpf !== input.cpf) {
      const employeeAlreadyExists = await this.employeesRepository.findByCpf(
        input.cpf,
      );

      if (employeeAlreadyExists) {
        throw new AppError('CPF already used');
      }
    }

    console.log(input.company_id, employee.company_id);

    if (employee.company_id !== input.company_id) {
      const companyExists = await this.companiesRepository.find(
        input.company_id,
      );

      if (!companyExists) {
        throw new AppError('Company not found');
      }
    }

    const employeeUpdated = await this.employeesRepository.update(id, input);

    return employeeUpdated;
  }
}
