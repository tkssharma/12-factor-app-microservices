"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_service_1 = require("./config/config.service");
const swagger_1 = require("./swagger/swagger");
const swagger_2 = require("@nestjs/swagger");
require('dotenv').config();
require("reflect-metadata");
(async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const configService = app.get(config_service_1.ConfigService);
    swagger_2.SwaggerModule.setup('api/v1', app, swagger_1.createDocument(app));
    await app.listen(process.env.port || 3000);
    console.info('SERVER IS RUNNING ON PORT', process.env.port || 3000);
})();
//# sourceMappingURL=main.js.map