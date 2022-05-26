import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEmployee1653516148821 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employees',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'name', type: 'varchar' },
          { name: 'cpf', type: 'varchar' },
          { name: 'rg', type: 'varchar' },
          { name: 'birth_date', type: 'varchar' },
          { name: 'email', type: 'varchar', isNullable: true },
          { name: 'phone', type: 'varchar', isNullable: true },
          { name: 'address_id', type: 'integer' },
          { name: 'department', type: 'varchar' },
          { name: 'role', type: 'varchar' },

          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'EmployeeAddress',
            columnNames: ['address_id'],
            referencedTableName: 'addresses',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employees');
  }
}
