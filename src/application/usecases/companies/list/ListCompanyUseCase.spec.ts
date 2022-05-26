import { CompaniesRepositoryInMemory } from '@domain/companies/repositories/in-memory/CompaniesRepositoryInMemory';

import CreateCompanyUseCase from '../create/CreateCompanyUseCase';
import ListCompanyUseCase from './ListCompanyUseCase';

describe('List all Companies', () => {
  let listCompanyUseCase: ListCompanyUseCase;
  let companiesRepositoryInMemory: CompaniesRepositoryInMemory;
  let createCompanyUseCase: CreateCompanyUseCase;

  const company = {
    name: 'MM Industries',
    cnpj: '60240841000106',
  };

  const company2 = {
    name: 'LL company',
    cnpj: '53503081000109',
  };

  beforeEach(() => {
    companiesRepositoryInMemory = new CompaniesRepositoryInMemory();

    listCompanyUseCase = new ListCompanyUseCase(companiesRepositoryInMemory);
    createCompanyUseCase = new CreateCompanyUseCase(
      companiesRepositoryInMemory,
    );
  });

  it('should be able to list all companies', async () => {
    await createCompanyUseCase.execute(company);
    await createCompanyUseCase.execute(company2);

    const companies = await listCompanyUseCase.execute();

    expect(companies).toEqual(
      expect.arrayContaining([
        expect.objectContaining(company),
        expect.objectContaining(company2),
      ]),
    );
  });
});
