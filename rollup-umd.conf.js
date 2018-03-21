import rollupBase from './rollup-base.conf.js'
export default Object.assign(rollupBase, {
  input: 'tmp/esm5/logger.js',
  output: {
    file: 'dist/bundles/logger.umd.js',
    format: 'umd'
  },
  name: 'logger',
  external: []
});
