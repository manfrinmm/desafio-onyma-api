import { IInputCreateCompanyDTO } from '@application/usecases/companies/create/CreateCompany.dto';
import Company from '@domain/companies/entities/Company';

import { ICompaniesRepositoryInterface } from '../CompaniesRepositoryInterface';

export class CompaniesRepositoryInMemory
  implements ICompaniesRepositoryInterface
{
  companies: Company[] = [];

  async create(entity: IInputCreateCompanyDTO): Promise<Company> {
    const company: Company = {
      ...entity,
      id: Math.random().toString(),
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.companies.push(company);

    return company;
  }

  async find(id: string): Promise<Company | undefined> {
    return this.companies.find(company => company.id === id);
  }

  async findAll(): Promise<Company[]> {
    return this.companies;
  }

  async findByCnpj(cnpj: string): Promise<Company | undefined> {
    return this.companies.find(company => company.cnpj === cnpj);
  }
}
