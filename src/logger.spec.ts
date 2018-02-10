import { Logger, LoggerOptions, LogOutput, LogLevel } from './logger';

describe('Logger', () => {
    beforeEach(() => {
        Logger.setLevel(LogLevel.Debug);
    });

    it('should have a name', () => {
        const log = new Logger('test');
        expect(log.name).toBe('<test>');
    });

    describe('#error()', () => {
        it('should print to console.log', () => {
            const log = new Logger('test');
            const spy = spyOn(console, 'log');

            log.error('foo');

            expect(spy).toHaveBeenCalledWith('<test>', 'foo');
        });

        it('should NOT print to console.log if log level is less than Error', () => {
            const log = new Logger('test');
            const spy = spyOn(console, 'log');
            Logger.setLevel(LogLevel.None);

            log.error('foo');

            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe('#warning()', () => {
        it('should print to console.log', () => {
            const log = new Logger('test');
            const spy = spyOn(console, 'log');

            log.warning('foo');

            expect(spy).toHaveBeenCalledWith('<test>', 'foo');
        });

        it('should NOT print to console.log if log level is less than Warning', () => {
            const log = new Logger('test');
            const spy = spyOn(console, 'log');
            Logger.setLevel(LogLevel.Error);

            log.warning('foo');

            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe('#info()', () => {
        it('should print to console.log', () => {
            const log = new Logger('test');
            const spy = spyOn(console, 'log');

            log.info('foo');

            expect(spy).toHaveBeenCalledWith('<test>', 'foo');
        });

        it('should NOT print to console.log if log level is less than Info', () => {
            const log = new Logger('test');
            const spy = spyOn(console, 'log');
            Logger.setLevel(LogLevel.Warning);

            log.info('foo');

            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe('#log()', () => {
        it('should print to console.log', () => {
            const log = new Logger('test');
            const spy = spyOn(console, 'log');

            log.log('foo');

            expect(spy).toHaveBeenCalledWith('<test>', 'foo');
        });

        it('should NOT print to console.log if log level is less than Log', () => {
            const log = new Logger('test');
            const spy = spyOn(console, 'log');
            Logger.setLevel(LogLevel.Info);

            log.log('foo');

            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe('#debug()', () => {
        it('should print to console.log', () => {
            const log = new Logger('test');
            const spy = spyOn(console, 'log');
            Logger.setLevel(LogLevel.Debug);

            log.debug('foo');

            expect(spy).toHaveBeenCalledWith('<test>', 'foo');
        });
    });

    describe('LOG_LEVEL environment value', () => {
        it('should set log level from environment value', () => {
            window['process'] = { env: { LOG_LEVEL: LogLevel.Debug } };
            const log = new Logger('test');
            const spy = spyOn(console, 'log');

            log.log('foo');

            expect(spy).toHaveBeenCalledWith('<test>', 'foo');
        });
    });
});

describe('LogOutput', () => {
    it('should allow custom log outputs to be used', () => {
        const spy = jasmine.createSpy();
        class CustomOutput implements LogOutput {
            log(...args) {
                spy(...args);
            }
        }

        Logger.setOutput(new CustomOutput());

        const log = new Logger('test');
        log.log('foo', 1, true);

        expect(spy).toHaveBeenCalledWith(log.name, 'foo', 1, true);
    });
});