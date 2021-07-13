"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConfigError = exports.DbError = void 0;
class DbError extends Error {
    constructor(message = 'Unknown database error') {
        super(message);
    }
}
exports.DbError = DbError;
class DbConfigError extends DbError {
    constructor(message = 'Database configuration error') {
        super(message);
    }
}
exports.DbConfigError = DbConfigError;
//# sourceMappingURL=db.errors.js.map