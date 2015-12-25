'use strict';

function Logger (name) {
    this._name = name;
}

var isEnabled = false;

['info', 'error', 'warn', 'debug', 'log'].forEach(function (method) {
    function isEnabled () {
        return (
            isEnabled ||
            (typeof window !== 'undefined' && window.DEBUG) ||
            (typeof process !== 'undefined' && process.env && process.env.DEBUG)
        );
    }

    function datetime () {
        var date = new Date();
        return (date.toISOString || date.toString).call(date);
    }

    function methodWrapper () {
        if (!isEnabled()) return;

        /* jshint validthis: true */
        var prefix = '[' + method + ']['+datetime() + ']<' + this._name + '>';
        var fn = console[method] || console.log;

        var args = [].slice.call(arguments);
        args.unshift(prefix);

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

exports.enabled = function (value) {
    isEnabled = value !== undefined && !!value || true;
};

exports.Logger = Logger;