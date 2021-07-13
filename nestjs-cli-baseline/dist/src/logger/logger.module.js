"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLoggerModule = void 0;
const common_1 = require("@nestjs/common");
const config_module_1 = require("../config/config.module");
const logger_1 = require("./logger");
const logger_middleware_1 = require("./logger.middleware");
let AppLoggerModule = class AppLoggerModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
AppLoggerModule = __decorate([
    common_1.Module({
        imports: [config_module_1.ConfigModule],
        controllers: [],
        providers: [logger_1.Logger],
        exports: [logger_1.Logger],
    })
], AppLoggerModule);
exports.AppLoggerModule = AppLoggerModule;
//# sourceMappingURL=logger.module.js.map