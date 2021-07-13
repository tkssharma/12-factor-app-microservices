import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { ConfigService } from '../config/config.service';
import { LogLevel } from './loglevel';
export declare class Logger implements LoggerService {
    private configService;
    logger: winston.Logger;
    constructor(configService: ConfigService);
    log(level: LogLevel, message: string): void;
    log(message: string): void;
    setDefaultMeta(correlationId: string): void;
    error(message: string): void;
    warn(message: string): void;
    info(message: string): void;
    http(message: string): void;
    verbose(message: string): void;
    debug(message: string): void;
    silly(message: string): void;
}
