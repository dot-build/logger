import 'zone.js/dist/zone';
import 'zone.js/dist/zone-testing';

declare const require: any;

const context = require.context('./src/', true, /\.spec\.ts$/);
context.keys().map(context);
