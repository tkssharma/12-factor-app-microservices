import { MigrationInterface, QueryRunner } from 'typeorm';

export class contacts1610109188285 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
    await queryRunner.query(`
        CREATE TABLE contacts (
          id uuid NOT NULL DEFAULT uuid_generate_v4(),
          "name" varchar(255) NOT NULL,
          "email" varchar(255) NOT NULL,
          "phone" varchar(255) NOT NULL,
          CONSTRAINT "PK_1e6c4a92b7d2ea5db198f313ce5" PRIMARY KEY (id),
          CONSTRAINT "UQ_789dea39a92e60d13418ba305bf" UNIQUE (name),
          "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE contacts`);
  }
}
