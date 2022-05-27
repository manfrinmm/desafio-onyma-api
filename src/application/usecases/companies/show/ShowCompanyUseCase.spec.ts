import AppError from '@domain/@shared/errors/AppError';
import { CompaniesRepositoryInMemory } from '@domain/companies/repositories/in-memory/CompaniesRepositoryInMemory';

import ShowCompanyUseCase from './ShowCompanyUseCase';

describe('Show a Company', () => {
  let companiesRepositoryInMemory: CompaniesRepositoryInMemory;

  let showCompanyUseCase: ShowCompanyUseCase;

  const company = {
    name: 'MM productions',
    cnpj: '60240841000106',
  };

  beforeEach(() => {
    companiesRepositoryInMemory = new CompaniesRepositoryInMemory();

    showCompanyUseCase = new ShowCompanyUseCase(companiesRepositoryInMemory);
  });

  it('should be able to show a company by cnpj', async () => {
    companiesRepositoryInMemory.create(company);

    const companyCreated = await showCompanyUseCase.execute({
      cnpj: company.cnpj,
    });

    expect(companyCreated).toEqual(expect.objectContaining(company));
  });

  it('should not be able to show a company non exists', async () => {
    expect(async () => {
      await showCompanyUseCase.execute({
        cnpj: 'not exists',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
