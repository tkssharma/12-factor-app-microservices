export declare enum LogLevel {
    Error = "error",
    Warn = "warn",
    Info = "info",
    HTTP = "http",
    Verbose = "verbose",
    Debug = "debug",
    Silly = "silly"
}
export declare function isLogLevel(value: unknown): value is LogLevel;
