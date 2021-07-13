"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DbModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_module_1 = require("../config/config.module");
const config_service_1 = require("../config/config.service");
const logger_module_1 = require("../logger/logger.module");
const db_errors_1 = require("./db.errors");
const db_service_1 = require("./db.service");
let DbModule = DbModule_1 = class DbModule {
    static getConnectionOptions(config, dbconfig) {
        const dbdata = config.get().db;
        if (!dbdata) {
            throw new db_errors_1.DbConfigError('Database config is missing');
        }
        const connectionOptions = DbModule_1.getConnectionOptionsPostgres(dbdata);
        return Object.assign(Object.assign({}, connectionOptions), { entities: dbconfig.entities, synchronize: false, logging: false });
    }
    static getConnectionOptionsPostgres(dbdata) {
        return {
            type: 'postgres',
            url: dbdata.url,
            keepConnectionAlive: true,
            ssl: process.env.NODE_ENV !== 'local' && process.env.NODE_ENV !== 'test'
                ? { rejectUnauthorized: false }
                : false,
        };
    }
    static forRoot(dbconfig) {
        return {
            module: DbModule_1,
            imports: [
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [config_module_1.ConfigModule, logger_module_1.AppLoggerModule],
                    useFactory: (configService, logger) => DbModule_1.getConnectionOptions(configService, dbconfig),
                    inject: [config_service_1.ConfigService],
                }),
            ],
            controllers: [],
            providers: [db_service_1.DatabaseService],
            exports: [db_service_1.DatabaseService],
        };
    }
};
DbModule = DbModule_1 = __decorate([
    common_1.Module({})
], DbModule);
exports.DbModule = DbModule;
//# sourceMappingURL=db.module.js.map