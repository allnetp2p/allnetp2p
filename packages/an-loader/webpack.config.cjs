// vim: syntax=javascript

const path = require('path')

const root = __dirname
const pathDist = path.resolve(root, 'dist')
const pathLib = path.resolve(root, 'lib')

module.exports = {
  mode: 'production',
  target: ['web', 'es2020'],
  entry: path.resolve(pathLib, 'an-loader.mjs'),
  output: {
    path: pathDist,
    filename: 'an-loader.js'
  },
  module: {
    rules: [
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      }
    ]
  }
}
