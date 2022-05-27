import { inject, injectable } from 'tsyringe';

import AppError from '@domain/@shared/errors/AppError';
import { IEmployeesRepositoryInterface } from '@domain/employees/repositories/EmployeesRepositoryInterface';

@injectable()
export default class DeleteEmployeeUseCase {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepositoryInterface,
  ) {}

  public async execute(cpf: string): Promise<void> {
    const employee = await this.employeesRepository.findByCpf(cpf);

    if (!employee) {
      throw new AppError('Employee not found');
    }

    await this.employeesRepository.remove(employee.id);
  }
}
