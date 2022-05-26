import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateEmployeeUseCase from '@application/usecases/employees/create/CreateEmployeeUseCase';
import ListEmployeeUseCase from '@application/usecases/employees/list/ListEmployeeUseCase';

export default class EmployeesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listEmployeeUseCase = container.resolve(ListEmployeeUseCase);

    const employees = await listEmployeeUseCase.execute();

    return response.json(employees);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const {
      name,
      cpf,
      rg,
      birth_date,
      email,
      phone,
      role,
      department,
      address,
    } = request.body;

    const createEmployeeUseCase = container.resolve(CreateEmployeeUseCase);

    const employee = await createEmployeeUseCase.execute({
      name,
      cpf,
      rg,
      birth_date,
      email,
      phone,
      role,
      department,
      address,
    });

    return response.status(201).json(employee);
  }
}
