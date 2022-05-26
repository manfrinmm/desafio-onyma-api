import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAddress1653516128821 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'addresses',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'country', type: 'varchar' },
          { name: 'state', type: 'varchar' },
          { name: 'city', type: 'varchar' },
          { name: 'zipcode', type: 'varchar' },
          { name: 'neighborhood', type: 'varchar' },
          { name: 'street', type: 'varchar' },
          { name: 'number', type: 'varchar' },
          { name: 'complement', type: 'varchar', isNullable: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('addresses');
  }
}
