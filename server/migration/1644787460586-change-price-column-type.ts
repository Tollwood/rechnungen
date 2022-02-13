import { MigrationInterface, QueryRunner } from "typeorm";

export class changePriceColumnType1644787460586 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE service ALTER COLUMN price TYPE double precision`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE service ALTER COLUMN price TYPE numeric`);
  }
}
