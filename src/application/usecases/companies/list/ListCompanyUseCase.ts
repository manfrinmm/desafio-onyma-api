import { inject, injectable } from 'tsyringe';

import { ICompaniesRepositoryInterface } from '@domain/companies/repositories/CompaniesRepositoryInterface';

import { IOutputListCompanyDTO } from './ListCompany.dto';

@injectable()
export default class ListCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepositoryInterface,
  ) {}

  public async execute(): Promise<IOutputListCompanyDTO> {
    return this.companiesRepository.findAll();
  }
}
