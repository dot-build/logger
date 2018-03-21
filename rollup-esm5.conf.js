import rollupBase from './rollup-base.conf.js'
export default Object.assign(rollupBase, {
  input: 'tmp/esm5/logger.js',
  output: {
    file: 'dist/esm5/logger.js',
    format: 'es'
  },
  external: []
});
