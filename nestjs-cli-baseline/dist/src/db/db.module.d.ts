import { DynamicModule } from '@nestjs/common';
import { DbConfig } from './db.interface';
export declare class DbModule {
    private static getConnectionOptions;
    private static getConnectionOptionsPostgres;
    static forRoot(dbconfig: DbConfig): DynamicModule;
}
