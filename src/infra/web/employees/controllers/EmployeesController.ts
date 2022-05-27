import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateEmployeeUseCase from '@application/usecases/employees/create/CreateEmployeeUseCase';
import DeleteEmployeeUseCase from '@application/usecases/employees/delete/DeleteEmployeeUseCase';
import ListEmployeeUseCase from '@application/usecases/employees/list/ListEmployeeUseCase';
import ShowEmployeeUseCase from '@application/usecases/employees/show/ShowEmployeeUseCase';
import UpdateEmployeeUseCase from '@application/usecases/employees/update/UpdateEmployeeUseCase';

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
      company_id,
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
      company_id,
      address,
    });

    return response.status(201).json(employee);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params;

    const showEmployeeUseCase = container.resolve(ShowEmployeeUseCase);

    const employees = await showEmployeeUseCase.execute({ cpf });

    return response.json(employees);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      name,
      cpf,
      rg,
      birth_date,
      email,
      phone,
      role,
      department,
      company_id,
      address,
    } = request.body;

    const updateEmployeeUseCase = container.resolve(UpdateEmployeeUseCase);

    const employeeUpdated = await updateEmployeeUseCase.execute(id, {
      name,
      cpf,
      rg,
      birth_date,
      email,
      phone,
      role,
      department,
      company_id,
      address,
    });

    return response.json(employeeUpdated);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params;

    const deleteEmployeeUseCase = container.resolve(DeleteEmployeeUseCase);

    await deleteEmployeeUseCase.execute(cpf);

    return response.send();
  }
}
