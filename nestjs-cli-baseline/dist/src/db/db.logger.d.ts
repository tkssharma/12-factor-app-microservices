import { Logger as TypeORMLogger } from 'typeorm';
import { Logger } from '../logger/logger';
export declare class DbLogger implements TypeORMLogger {
    private logger;
    constructor(logger: Logger);
    private stringifyQuery;
    logQuery(query: string, parameters?: any[]): void;
    logQueryError(error: string, query: string, parameters?: any[]): void;
    logQuerySlow(time: number, query: string, parameters?: any[]): void;
    logSchemaBuild(message: string): void;
    logMigration(message: string): void;
    log(level: 'log' | 'info' | 'warn', message: any): void;
}
