// vim: syntax=javascript

const path = require('path')

const root = __dirname
const pathDist = path.resolve(root, 'dist')
const pathLib = path.resolve(root, 'lib')

module.exports = {
  mode: 'production',
  target: ['webworker', 'es2020'],
  entry: path.resolve(pathLib, 'an-broker.mjs'),
  output: {
    path: pathDist,
    filename: 'an-broker.js'
  }
}
