'use strict';

function Logger (name) {
    this._name = name;
}

var isEnabled = false;
var methods = ['error', 'warn', 'info', 'log', 'debug'];
var enabledMethods = [];

methods.forEach(function (method) {
    enabledMethods[method] = true;

    function isLogEnabled () {
        var logEnabled = (
            isEnabled ||
            (typeof window !== 'undefined' && window.DEBUG) ||
            (typeof process !== 'undefined' && process.env && process.env.DEBUG)
        );

        return logEnabled && enabledMethods[method];
    }

    function datetime () {
        var date = new Date();
        return (date.toISOString || date.toString).call(date);
    }

    function methodWrapper () {
        if (!isLogEnabled()) return;

        /* jshint validthis: true */
        var prefix = '[' + method + ']['+datetime() + ']<' + this._name + '>';
        var fn = console[method] || console.log;

        var args = [].slice.call(arguments);

        if (typeof args[0] === 'string') {
            args[0] = prefix + ' ' + args[0];
        } else {
            args.unshift(prefix);
        }

        fn.apply(console, args);
    }

    Logger.prototype[method] = methodWrapper;
});

var loggers = {};

exports = module.exports = function (name) {
    if (name in loggers === false) {
        loggers[name] = new Logger(name);
    }

    return loggers[name];
};

exports.enable = function (value) {
    isEnabled = value !== undefined && !!value || true;
};

exports.disable = function () {
    isEnabled = false;
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
