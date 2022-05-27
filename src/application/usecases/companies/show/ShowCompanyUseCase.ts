import { inject, injectable } from 'tsyringe';

import AppError from '@domain/@shared/errors/AppError';
import { ICompaniesRepositoryInterface } from '@domain/companies/repositories/CompaniesRepositoryInterface';

import { IInputShowCompanyDTO, IOutputShowCompanyDTO } from './ShowCompany.dto';

@injectable()
export default class ShowCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepositoryInterface,
  ) {}

  public async execute({
    cnpj,
  }: IInputShowCompanyDTO): Promise<IOutputShowCompanyDTO> {
    const company = await this.companiesRepository.findByCnpj(cnpj);

    if (!company) {
      throw new AppError('Company not found');
    }

    return company;
  }
}
