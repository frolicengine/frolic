const yargs = require('yargs');

const argv = yargs
  .option('entry', {
    alias: 'e',
    type: 'string',
    description: 'Entry file',
  })
  .option('outfile', {
    alias: 'o',
    type: 'string',
    description: 'Out file',
  }).argv;

require('esbuild').build({
  entryPoints: [argv.entry],
  outfile: argv.outfile,
  bundle: true,
  platform: 'node',
  external: ['./node_modules/*'],
  watch: {
    onRebuild(error) {
      if (error) console.error('watch build failed:', error)
      else console.log('watch build succeeded')
    },
  },
}).then(result => {
  console.log('watching...')
})