# uLogger

Tiny logger utility for Node.JS and the browser

## Usage

```js

var logger = require('ulogger')('my-unit');

logger.log('A message inside my unit');
logger.error('Oops, my unit has an error!');

```

## Enable/disable

In your app code, you can enable/disable the logger at any moment:

```js

var logger = require('ulogger')
logger.enable();

// ...

logger.disable();

```

On Node.JS, you can start your app with an environment flag:

`DEBUG=1 node my-app.js`

Same goes for a web app, but in the `window` object:

```js
window.DEBUG=1;
```

## Log levels

You can adjust the logging level from error to debug. The log whose values are
higher than the level won't be printed.

```js
// 0 = error
// 1 = warn
// 2 = info
// 3 = log
// 4 = debug

var level = 2;
logger.logLevel(level);

// only error, warn and info logs will be printed from now on

```

Happy debugging!