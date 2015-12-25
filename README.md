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
logger.enabled();

// ...

logger.enabled(false);

```

On Node.JS, you can start your app with an environment flag:

`DEBUG=1 node my-app.js`

Same goes for a web app, but in the `window` object:

```js
window.DEBUG=1;
```

Happy debugging!