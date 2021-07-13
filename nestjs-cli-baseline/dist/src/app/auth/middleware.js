"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const http_exception_1 = require("@nestjs/common/exceptions/http.exception");
const app_constats_1 = require("../app.constats");
let AuthMiddleware = class AuthMiddleware {
    constructor() { }
    async use(req, res, next) {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new http_exception_1.HttpException({ message: app_constats_1.MISSING_AUTH_HEADER }, common_1.HttpStatus.BAD_REQUEST);
        }
        const { user_id, roles } = { user_id: '1', roles: [] };
        req.user = { user_id, roles };
        next();
    }
};
AuthMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=middleware.js.map