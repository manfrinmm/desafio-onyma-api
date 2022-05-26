import { inject, injectable } from 'tsyringe';

import AppError from '@domain/@shared/errors/AppError';
import { ICompaniesRepositoryInterface } from '@domain/companies/repositories/CompaniesRepositoryInterface';

import {
  IInputCreateCompanyDTO,
  IOutputCreateCompanyDTO,
} from './CreateCompany.dto';

@injectable()
export default class CreateCompanyUseCase {
  constructor(
    @inject('EmployeesRepository')
    private companiesRepository: ICompaniesRepositoryInterface,
  ) {}

  public async execute({
    name,
    cnpj,
  }: IInputCreateCompanyDTO): Promise<IOutputCreateCompanyDTO> {
    const companyAlreadyExists = await this.companiesRepository.findByCnpj(
      cnpj,
    );

    if (companyAlreadyExists) {
      throw new AppError('Company already exists');
    }

    const company = await this.companiesRepository.create({
      name,
      cnpj,
    });

    return company;
  }
}
