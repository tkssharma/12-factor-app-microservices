import { MigrationInterface, QueryRunner } from 'typeorm';

export class items1626020149276 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
    await queryRunner.query(`
        CREATE TABLE items (
          id uuid NOT NULL DEFAULT uuid_generate_v4(),
          "text" varchar(255) NOT NULL,
          "is_completed" boolean NOT NULL,
          CONSTRAINT "PK_1e6c4a92b7d2ea5db198f313ce11" PRIMARY KEY (id),
          "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE items`);
  }
}
