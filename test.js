var ulogger = require('.');
var log = ulogger('test');

ulogger.logLevel(0);

log.info('this info should not be printed!');
log.error('this error should be printed');

ulogger.logLevel(4);

log.debug('this debugging info should be printed!');