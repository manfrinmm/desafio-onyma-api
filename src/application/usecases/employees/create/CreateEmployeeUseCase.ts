import { inject, injectable } from 'tsyringe';

import AppError from '@domain/@shared/errors/AppError';
import { ICompaniesRepositoryInterface } from '@domain/companies/repositories/CompaniesRepositoryInterface';
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

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepositoryInterface,
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

    const companyExists = await this.companiesRepository.find(input.company_id);

    if (!companyExists) {
      throw new AppError('Company not found');
    }

    const employee = await this.employeesRepository.create(input);

    return employee;
  }
}
