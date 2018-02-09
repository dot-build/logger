const vfs = require('vinyl-fs');
const inlineNg2Template = require('gulp-inline-ng2-template');

const src = './src';
const tmp = './tmp';
const dest = './tmp/src';

vfs
    .src(['public_api.ts'])
    .pipe(vfs.dest(`${tmp}`));

vfs
    .src([`${src}/**/*.ts`])
    .pipe(
    inlineNg2Template({
        base: `${src}`,
        useRelativePaths: true
    })
    )
    .pipe(vfs.dest(`${dest}`));