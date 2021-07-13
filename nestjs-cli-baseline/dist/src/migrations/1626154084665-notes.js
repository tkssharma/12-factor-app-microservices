"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notes1626154084665 = void 0;
class notes1626154084665 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`
        CREATE TABLE notes (
          id uuid NOT NULL DEFAULT uuid_generate_v4(),
          "text" varchar(255) NOT NULL,
          "is_completed" boolean NOT NULL,
          CONSTRAINT "PK_1e6c4a92b7d2ea5db198f313ce11" PRIMARY KEY (id),
          "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE notes`);
    }
}
exports.notes1626154084665 = notes1626154084665;
//# sourceMappingURL=1626154084665-notes.js.map