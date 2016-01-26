'use strict';
/* jshint node: true */

function Logger (name) {
    this._name = name;
}

var config = {
    enabled: false,
    date: false,
    prefix: false,
    caller: false,
    output: null
};

var methods = ['error', 'warn', 'info', 'log', 'debug'];
var enabledMethods = [];

methods.forEach(function (method) {
    enabledMethods[method] = true;

    if (!console[method]) {
        console[method] = console.log;
    }

    function logType () {
        if (!config.prefix) return '';

        return '[' + method + ']';
    }

    Logger.prototype[method] = function methodWrapper () {
        if (!isLogEnabled(method)) return;

        var caller = this._name;

        if (config.caller) {
            caller = this._name + ':' + getCaller();
        }

        /* jshint validthis: true */
        var prefix = logType() + datetime() + '<' + caller + '>';
        var args = [].slice.call(arguments);

        if (typeof args[0] === 'string') {
            args[0] = prefix + ' ' + args[0];
        } else {
            args.unshift(prefix);
        }

        var output = config.output || console[method];
        output.apply(console, args);
    };
});

function datetime () {
    if (!config.date) return '';

    var date = new Date();
    var dateStr = (date.toISOString || date.toString).call(date);

    return '[' + dateStr + ']';
}

function isLogEnabled (method) {
    var logEnabled = (
        config.enabled ||
        (typeof window !== 'undefined' && window.DEBUG) ||
        (typeof process !== 'undefined' && process.env && process.env.DEBUG)
    );

    return logEnabled && enabledMethods[method];
}

function getCaller() {
    var stack = Error().stack;

    if (!stack) return '';

    stack = String(stack).split('\n');
    var caller = stack[4];

    if (!caller) return '';

    return caller.slice(caller.indexOf('at') + 3, caller.indexOf('(') - 1);
}

var loggers = {};

exports = module.exports = function (name) {
    if (name in loggers === false) {
        loggers[name] = new Logger(name);
    }

    return loggers[name];
};

exports.enable = function () {
    config.enabled = true;
};

exports.disable = function () {
    config.enabled = false;
};

exports.config = config;

/**
 * @param {Function} output     Function to call with every log message
 */
exports.setOutput = function (output) {
    config.output = output || null;
};

/**
 * @param {Number} logLevel [0-4] from error to debug. -1 to disable;
 */
exports.logLevel = function (logLevel) {
    methods.forEach(function (method, index) {
        enabledMethods[method] = index <= logLevel;
    });
};

exports.Logger = Logger;
