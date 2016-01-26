'use strict';

var ulogger = require('.');
var log = ulogger('test');

ulogger.logLevel(0);
ulogger.enable();

log.info('this info should not be printed!');
log.error('this error should be printed');

ulogger.logLevel(4);

log.debug('this debugging info should be printed!');

ulogger.config.date = true;

log.debug('this message should have a date on it');

ulogger.config.prefix = true;

log.info('this message should have a "info" prefix on it');

function callerName () {
    log.info('this message should have the original caller on it');
}

ulogger.config.caller = true;
ulogger.config.date = false;
ulogger.config.prefix = false;
callerName();