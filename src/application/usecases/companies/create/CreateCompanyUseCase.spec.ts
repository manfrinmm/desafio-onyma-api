import AppError from '@domain/@shared/errors/AppError';
import { CompaniesRepositoryInMemory } from '@domain/companies/repositories/in-memory/CompaniesRepositoryInMemory';

import CreateCompanyUseCase from './CreateCompanyUseCase';

describe('Create a Company', () => {
  let createCompanyUseCase: CreateCompanyUseCase;
  let companiesRepositoryInMemory: CompaniesRepositoryInMemory;

  const company = {
    name: 'Matheus MM',
    cnpj: '70016354000100',
  };

  beforeEach(() => {
    companiesRepositoryInMemory = new CompaniesRepositoryInMemory();

    createCompanyUseCase = new CreateCompanyUseCase(
      companiesRepositoryInMemory,
    );
  });

  it('should be able to create a new company', async () => {
    const companyCreated = await createCompanyUseCase.execute(company);

    expect(companyCreated).toMatchObject(companyCreated);
    expect(companyCreated).toHaveProperty('id');
  });

  it('should not be able to create a new company with same cnpj', async () => {
    await createCompanyUseCase.execute(company);

    expect(async () => {
      await createCompanyUseCase.execute(company);
    }).rejects.toBeInstanceOf(AppError);
  });
});
