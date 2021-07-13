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
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const uuid_1 = require("uuid");
const logger_1 = require("./logger");
let LoggerMiddleware = class LoggerMiddleware {
    constructor(logger) {
        this.logger = logger;
    }
    use(req, res, next) {
        const before = Date.now();
        const id = req.headers['x-request-id']
            ? req.headers['x-request-id']
            : uuid_1.v4();
        this.logger.setDefaultMeta(id);
        const span = req.headers['x-span'] || '0';
        req.correlationId = id;
        req.parentSpan = span;
        req.span = span;
        next();
        res.on('close', () => this.logger.http(this.generateLogMessage(req, res, Date.now() - before)));
    }
    getResponseSize(res) {
        const sizeRaw = res.getHeader('Content-Length');
        if (typeof sizeRaw === 'number') {
            return sizeRaw;
        }
        if (typeof sizeRaw === 'string') {
            const parsed = parseInt(sizeRaw, 10);
            if (isNaN(parsed)) {
                return 0;
            }
            return parsed;
        }
        return 0;
    }
    generateLogMessage(req, res, timeTaken) {
        const size = this.getResponseSize(res);
        const terms = {
            '%h': req.socket.remoteAddress || '-',
            '%l': '-',
            '%x1': `span=${req.span}`,
            '%x2': `trace=${req.correlationId}`,
            '%x3': 'type=Incoming request',
            '%u': '-',
            '%t': `date=[${moment().format('DD/MMM/YYYY:HH:mm:ss ZZ')}]`,
            '%r': `request=${req.method} ${req.originalUrl} ${req.httpVersion}`,
            '%>s': `status=${res.statusCode}`,
            '%b': size === 0 ? 'size=-' : `size=${size}`,
            '%tt': `duration=${timeTaken}`,
        };
        let str = '%t %x2 %x3 "%r" %x1 %>s %b %tt';
        for (const term in terms) {
            if (term in terms) {
                str = str.replace(term, terms[term]);
            }
        }
        str = str.replace(/%\{([a-zA-Z\-]+)\}i/g, (match, p1) => {
            const header = req.headers[`${p1}`.toLowerCase()];
            if (header == null) {
                return '-';
            }
            if (Array.isArray(header)) {
                return `"${header.join(',')}"`;
            }
            return `"${header}"`;
        });
        return str;
    }
};
LoggerMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [logger_1.Logger])
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map