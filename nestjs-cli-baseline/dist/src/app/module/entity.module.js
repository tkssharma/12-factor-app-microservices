"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainModule = exports.ALL_SERVICES = exports.ALL_ENTITIES = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const db_module_1 = require("../../db/db.module");
const fs = require("fs");
const path = require("path");
const note_entity_1 = require("./entity/note.entity");
const note_controller_1 = require("./controllers/note.controller");
exports.ALL_ENTITIES = fs
    .readdirSync(path.join(path.dirname(__filename), 'entity'))
    .map(file => require(`./entity/${file}`).default);
exports.ALL_SERVICES = fs
    .readdirSync(path.join(path.dirname(__filename), 'services'))
    .filter(file => (path.extname(file) === '.js' || path.extname(file) === '.ts') &&
    !file.endsWith('.d.ts'))
    .filter(file => file.indexOf('.spec') === -1)
    .map(file => require(`./services/${file}`).default);
let DomainModule = class DomainModule {
};
DomainModule = __decorate([
    common_1.Module({
        imports: [
            db_module_1.DbModule.forRoot({ entities: exports.ALL_ENTITIES }),
            typeorm_1.TypeOrmModule.forFeature([note_entity_1.default])
        ],
        providers: [...exports.ALL_SERVICES],
        exports: [...exports.ALL_SERVICES],
        controllers: [note_controller_1.NoteController],
    })
], DomainModule);
exports.DomainModule = DomainModule;
//# sourceMappingURL=entity.module.js.map