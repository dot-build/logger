var ulogger = require('.');
var log = ulogger('test');

ulogger.logLevel(0);

log.info('this info should not be printed!');
log.error('this error should be printed');

ulogger.logLevel(4);

log.debug('this debugging info should be printed!');

ulogger.enableDate();

log.debug('this message should have a date on it');

ulogger.enablePrefix();

log.info('this message should have a "info" prefix on it');