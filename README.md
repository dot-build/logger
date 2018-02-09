# ulogger

Tiny logger utility for Node.JS and web apps

## Usage

```js
import { Logger, LogLevel } from '@dot-build/ulogger'
const logger = new Logger('any-name');

logger.info('Unicorns are real');

// output to `console.log`: <any-name> Unicorns are real

// Optional. Can be None, Error, Warning, Info, Log, Debug
Logger.setLevel(LogLevel.Info);
```

## Using a different log output

Implement LogOutput interface:

```js
import { Logger, LogOutput } from '@dot-build/ulogger';

class CustomOutput implements LogOutput {
  log(...args) {
      // do something with arguments
  }
}

Logger.setOutput(new CustomOutput());

```
