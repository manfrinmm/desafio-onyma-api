import { getRepository, Repository } from 'typeorm';

import { IInputCreateCompanyDTO } from '@application/usecases/companies/create/CreateCompany.dto';
import Company from '@domain/companies/entities/Company';
import { ICompaniesRepositoryInterface } from '@domain/companies/repositories/CompaniesRepositoryInterface';

export default class ConcreteCompaniesRepository
  implements ICompaniesRepositoryInterface
{
  private repository: Repository<Company>;

  constructor() {
    this.repository = getRepository(Company);
  }

  async create(entity: IInputCreateCompanyDTO): Promise<Company> {
    const company = this.repository.create(entity);

    return this.repository.save(company);
  }

  async update(entity: Company): Promise<Company> {
    const companyUpdated = await this.repository.save(entity);

    return companyUpdated;
  }

  async find(id: string): Promise<Company | undefined> {
    const company = await this.repository.findOne({ id });

    return company;
  }

  async findAll(): Promise<Company[]> {
    const company = await this.repository.find();

    return company;
  }

  async findByCnpj(cnpj: string): Promise<Company | undefined> {
    const company = await this.repository.findOne(
      { cnpj },
      { relations: ['employees'] },
    );

    return company;
  }
}
