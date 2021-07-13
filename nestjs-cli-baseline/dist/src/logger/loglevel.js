"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogLevel = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["Error"] = "error";
    LogLevel["Warn"] = "warn";
    LogLevel["Info"] = "info";
    LogLevel["HTTP"] = "http";
    LogLevel["Verbose"] = "verbose";
    LogLevel["Debug"] = "debug";
    LogLevel["Silly"] = "silly";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
const allLogLevels = [
    LogLevel.Error,
    LogLevel.Warn,
    LogLevel.Info,
    LogLevel.HTTP,
    LogLevel.Verbose,
    LogLevel.Debug,
    LogLevel.Silly,
];
function isLogLevel(value) {
    if (typeof value !== 'string') {
        return false;
    }
    return allLogLevels.indexOf(value) !== -1;
}
exports.isLogLevel = isLogLevel;
//# sourceMappingURL=loglevel.js.map