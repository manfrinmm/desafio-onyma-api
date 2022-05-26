import { IInputCreateCompanyDTO } from '@application/usecases/companies/create/CreateCompany.dto';

import Company from '../entities/Company';

export interface ICompaniesRepositoryInterface {
  create(entity: IInputCreateCompanyDTO): Promise<Company>;
  find(id: string): Promise<Company | undefined>;
  findByCnpj(cnpj: string): Promise<Company | undefined>;
  findAll(): Promise<Company[]>;
}
