export interface LogOutput {
    log(...args: any[]): void;
}

export interface LoggerOptions {
    useBrowserConsole: boolean;
    backend?: LogOutput;
}

export enum LogLevel { None, Error, Warning, Info, Log, Debug }

const browserConsole: LogOutput = {
    log(...args) {
        console.log(...args);
    }
};

const loggerSettings = {
    output: browserConsole,
    logLevel: LogLevel.Log
};

export class Logger {
    name: string;

    static setOutput(output: LogOutput) {
        loggerSettings.output = output;
    }

    static setLevel(level) {
        loggerSettings.logLevel = level;
    }

    constructor(name: string) {
        this.name = `<${name}>`;
    }

    error(...args) {
        this.emit(LogLevel.Error, args);
    }

    warning(...args) {
        this.emit(LogLevel.Warning, args);
    }

    info(...args) {
        this.emit(LogLevel.Info, args);
    }

    log(...args) {
        this.emit(LogLevel.Log, args);
    }

    debug(...args) {
        this.emit(LogLevel.Debug, args);
    }

    emit(logLevel, args) {
        if (loggerSettings.logLevel >= logLevel) {
            loggerSettings.output.log(this.name, ...args);
        }
    }
}

const levelKey = 'LOG_LEVEL';

if (typeof window !== undefined && levelKey in window) {
    loggerSettings.logLevel = window[levelKey];
}

if (typeof process !== undefined && levelKey in process.env) {
    loggerSettings.logLevel = process.env[levelKey];
}
