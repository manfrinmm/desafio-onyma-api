import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateCompanyUseCase from '@application/usecases/companies/create/CreateCompanyUseCase';
import ListCompanyUseCase from '@application/usecases/companies/list/ListCompanyUseCase';
import ShowCompanyUseCase from '@application/usecases/companies/show/ShowCompanyUseCase';

export default class CompaniesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCompanyUseCase = container.resolve(ListCompanyUseCase);

    const employees = await listCompanyUseCase.execute();

    return response.json(employees);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, cnpj } = request.body;

    const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

    const company = await createCompanyUseCase.execute({
      name,
      cnpj,
    });

    return response.status(201).json(company);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { cnpj } = request.params;

    const showCompanyUseCase = container.resolve(ShowCompanyUseCase);

    const employees = await showCompanyUseCase.execute({ cnpj });

    return response.json(employees);
  }
}
