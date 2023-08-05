/**
 * @ref: build filename convention of prebuildify
 * https://github.com/prebuild/prebuildify/blob/v5.0.1/index.js#L58 'builds'
 *
 *
 * @ref: addon matching with node-gyp-build
 */

/**
 * NOTE must require the JS file rather than package root
 */
const load = require('node-gyp-build/node-gyp-build');

try {
  const found = load.resolve(__dirname);
  console.info(found);
} catch (e) {
  // console.warn('[publicaddr] native module not found.');
} finally {
  process.exit(0);
}
