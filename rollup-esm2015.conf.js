import rollupBase from './rollup-base.conf.js'
export default Object.assign(rollupBase, {
  input: 'tmp/esm2015/logger.js',
  output: {
    file: 'dist/esm2015/logger.js',
    format: 'es'
  },
  external: []
});
