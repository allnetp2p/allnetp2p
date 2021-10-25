/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {



exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "../an-broker/dist/an-broker.js?raw":
/*!******************************************!*\
  !*** ../an-broker/dist/an-broker.js?raw ***!
  \******************************************/
/***/ ((module) => {

module.exports = "/******/ (() => { // webpackBootstrap\n/******/ \t\"use strict\";\n/******/ \tvar __webpack_modules__ = ({\n\n/***/ \"../an-worker-api/lib/an-worker-api.mjs\":\n/*!**********************************************!*\\\n  !*** ../an-worker-api/lib/an-worker-api.mjs ***!\n  \\**********************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AnWorkerApi\": () => (/* binding */ AnWorkerApi)\n/* harmony export */ });\n/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nanoid */ \"../an-worker-api/node_modules/nanoid/index.dev.js\");\n\n\n/**\n * When writing a new allnet worker module, construct an instance\n * of this class in order to communicate your module's capabilities\n * and make connections to other running modules.\n */\nclass AnWorkerApi {\n  /**\n   * Create a new AnWorkerApi instance connects to webworker communication\n   * channels, and exposes the standard allnet worker module api hooks.\n   */\n  constructor () {\n    if (globalThis.onmessage) {\n      throw new Error('globalThis.onmessage is already set. You should only initialize AnWorkerApi once per web worker.')\n    }\n    globalThis.onmessage = evt => {\n      this._handleMessage(evt.data)\n    }\n    this._pending = new Map()\n  }\n\n  /**\n   * Emit a raw allnet module api event.\n   * You probably want to use a higher-level api.\n   */\n  rawEvent (type, data, transfer) {\n    globalThis.postMessage({\n      type,\n      dir: 'evt',\n      data\n    }, transfer)\n  }\n\n  /**\n   * Make a raw allnet module api request.\n   * You probably want to use a higher-level api.\n   */\n  rawRequest (type, data, transfer) {\n    const msgId = (0,nanoid__WEBPACK_IMPORTED_MODULE_0__.nanoid)()\n    globalThis.postMessage({\n      type,\n      dir: 'req',\n      msgId,\n      data\n    }, transfer)\n    return new Promise((resolve, reject) => {\n      this._pending.set(msgId, [resolve, reject])\n      setTimeout(() => {\n        const res = this._pending.get(msgId)\n        this._pending.delete(msgId)\n        if (res) {\n          res[1](new Error('timeout'))\n        }\n      }, 30000)\n    })\n  }\n\n  /**\n   */\n  async registerModule (spec) {\n    // don't care about response, just need it to not be an error\n    await this.rawRequest(\n      'registerModule',\n      spec\n    )\n  }\n\n  // -- private -- //\n\n  _handleMessage (data) {\n    if (data.dir === 'res') {\n      const res = this._pending.get(data.msgId)\n      this._pending.delete(data.msgId)\n      if (res) {\n        if (data.error) {\n          res[1](data.error)\n        } else {\n          res[0](data.data)\n        }\n      }\n    } else {\n      throw new Error('dir ' + data.dir + ' not yet handled')\n    }\n  }\n}\n\n\n/***/ }),\n\n/***/ \"../an-worker-api/node_modules/nanoid/index.dev.js\":\n/*!*********************************************************!*\\\n  !*** ../an-worker-api/node_modules/nanoid/index.dev.js ***!\n  \\*********************************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"nanoid\": () => (/* binding */ nanoid),\n/* harmony export */   \"customAlphabet\": () => (/* binding */ customAlphabet),\n/* harmony export */   \"customRandom\": () => (/* binding */ customRandom),\n/* harmony export */   \"urlAlphabet\": () => (/* reexport safe */ _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__.urlAlphabet),\n/* harmony export */   \"random\": () => (/* binding */ random)\n/* harmony export */ });\n/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-alphabet/index.js */ \"../an-worker-api/node_modules/nanoid/url-alphabet/index.js\");\n\nif (true) {\n  if (\n    typeof navigator !== 'undefined' &&\n    navigator.product === 'ReactNative' &&\n    typeof crypto === 'undefined'\n  ) {\n    throw new Error(\n      'React Native does not have a built-in secure random generator. ' +\n        'If you don’t need unpredictable IDs use `nanoid/non-secure`. ' +\n        'For secure IDs, import `react-native-get-random-values` ' +\n        'before Nano ID.'\n    )\n  }\n  if (typeof msCrypto !== 'undefined' && typeof crypto === 'undefined') {\n    throw new Error(\n      'Import file with `if (!window.crypto) window.crypto = window.msCrypto`' +\n        ' before importing Nano ID to fix IE 11 support'\n    )\n  }\n  if (typeof crypto === 'undefined') {\n    throw new Error(\n      'Your browser does not have secure random generator. ' +\n        'If you don’t need unpredictable IDs, you can use nanoid/non-secure.'\n    )\n  }\n}\nlet random = bytes => crypto.getRandomValues(new Uint8Array(bytes))\nlet customRandom = (alphabet, size, getRandom) => {\n  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1\n  let step = -~((1.6 * mask * size) / alphabet.length)\n  return () => {\n    let id = ''\n    while (true) {\n      let bytes = getRandom(step)\n      let j = step\n      while (j--) {\n        id += alphabet[bytes[j] & mask] || ''\n        if (id.length === size) return id\n      }\n    }\n  }\n}\nlet customAlphabet = (alphabet, size) => customRandom(alphabet, size, random)\nlet nanoid = (size = 21) => {\n  let id = ''\n  let bytes = crypto.getRandomValues(new Uint8Array(size))\n  while (size--) {\n    let byte = bytes[size] & 63\n    if (byte < 36) {\n      id += byte.toString(36)\n    } else if (byte < 62) {\n      id += (byte - 26).toString(36).toUpperCase()\n    } else if (byte < 63) {\n      id += '_'\n    } else {\n      id += '-'\n    }\n  }\n  return id\n}\n\n\n\n/***/ }),\n\n/***/ \"../an-worker-api/node_modules/nanoid/url-alphabet/index.js\":\n/*!******************************************************************!*\\\n  !*** ../an-worker-api/node_modules/nanoid/url-alphabet/index.js ***!\n  \\******************************************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"urlAlphabet\": () => (/* binding */ urlAlphabet)\n/* harmony export */ });\nlet urlAlphabet =\n  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'\n\n\n\n/***/ })\n\n/******/ \t});\n/************************************************************************/\n/******/ \t// The module cache\n/******/ \tvar __webpack_module_cache__ = {};\n/******/ \t\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/ \t\t// Check if module is in cache\n/******/ \t\tvar cachedModule = __webpack_module_cache__[moduleId];\n/******/ \t\tif (cachedModule !== undefined) {\n/******/ \t\t\treturn cachedModule.exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = __webpack_module_cache__[moduleId] = {\n/******/ \t\t\t// no module.id needed\n/******/ \t\t\t// no module.loaded needed\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/ \t\n/******/ \t\t// Execute the module function\n/******/ \t\t__webpack_modules__[moduleId](module, module.exports, __webpack_require__);\n/******/ \t\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/ \t\n/************************************************************************/\n/******/ \t/* webpack/runtime/define property getters */\n/******/ \t(() => {\n/******/ \t\t// define getter functions for harmony exports\n/******/ \t\t__webpack_require__.d = (exports, definition) => {\n/******/ \t\t\tfor(var key in definition) {\n/******/ \t\t\t\tif(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {\n/******/ \t\t\t\t\tObject.defineProperty(exports, key, { enumerable: true, get: definition[key] });\n/******/ \t\t\t\t}\n/******/ \t\t\t}\n/******/ \t\t};\n/******/ \t})();\n/******/ \t\n/******/ \t/* webpack/runtime/hasOwnProperty shorthand */\n/******/ \t(() => {\n/******/ \t\t__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))\n/******/ \t})();\n/******/ \t\n/******/ \t/* webpack/runtime/make namespace object */\n/******/ \t(() => {\n/******/ \t\t// define __esModule on exports\n/******/ \t\t__webpack_require__.r = (exports) => {\n/******/ \t\t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t\t}\n/******/ \t\t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t\t};\n/******/ \t})();\n/******/ \t\n/************************************************************************/\nvar __webpack_exports__ = {};\n// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.\n(() => {\n/*!***************************!*\\\n  !*** ./lib/an-broker.mjs ***!\n  \\***************************/\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _allnetp2p_an_worker_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @allnetp2p/an-worker-api */ \"../an-worker-api/lib/an-worker-api.mjs\");\n\n\n(async () => {\n  console.log(_allnetp2p_an_worker_api__WEBPACK_IMPORTED_MODULE_0__.AnWorkerApi, typeof _allnetp2p_an_worker_api__WEBPACK_IMPORTED_MODULE_0__.AnWorkerApi, Object.keys(_allnetp2p_an_worker_api__WEBPACK_IMPORTED_MODULE_0__.AnWorkerApi))\n  const workerApi = new _allnetp2p_an_worker_api__WEBPACK_IMPORTED_MODULE_0__.AnWorkerApi()\n  // TODO pull version from package.json\n  await workerApi.registerModule('system.allnetp2p.broker@0.0.1')\n  console.log('BROKER WORKER REGISTER SUCCESS')\n\n  setTimeout(() => {\n    throw new Error('can debug?')\n  }, 1000)\n})().then(() => {}, err => {\n  console.error(err)\n})\n\n})();\n\n/******/ })()\n;\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW4tYnJva2VyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUErQjs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsOENBQU07QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JGcUQ7QUFDckQsSUFBSSxJQUFJO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNvRTs7Ozs7Ozs7Ozs7Ozs7O0FDN0RwRTtBQUNBO0FBQ3NCOzs7Ozs7O1VDRnRCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOc0Q7O0FBRXREO0FBQ0EsY0FBYyxpRUFBVyxTQUFTLGlFQUFXLGNBQWMsaUVBQVc7QUFDdEUsd0JBQXdCLGlFQUFXO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUMsaUJBQWlCO0FBQ2xCO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL0BhbGxuZXRwMnAvYW4tYnJva2VyLy4uL2FuLXdvcmtlci1hcGkvbGliL2FuLXdvcmtlci1hcGkubWpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tYnJva2VyLy4uL2FuLXdvcmtlci1hcGkvbm9kZV9tb2R1bGVzL25hbm9pZC9pbmRleC5kZXYuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1icm9rZXIvLi4vYW4td29ya2VyLWFwaS9ub2RlX21vZHVsZXMvbmFub2lkL3VybC1hbHBoYWJldC9pbmRleC5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWJyb2tlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWJyb2tlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1icm9rZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWJyb2tlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tYnJva2VyLy4vbGliL2FuLWJyb2tlci5tanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbmFub2lkIH0gZnJvbSAnbmFub2lkJ1xuXG4vKipcbiAqIFdoZW4gd3JpdGluZyBhIG5ldyBhbGxuZXQgd29ya2VyIG1vZHVsZSwgY29uc3RydWN0IGFuIGluc3RhbmNlXG4gKiBvZiB0aGlzIGNsYXNzIGluIG9yZGVyIHRvIGNvbW11bmljYXRlIHlvdXIgbW9kdWxlJ3MgY2FwYWJpbGl0aWVzXG4gKiBhbmQgbWFrZSBjb25uZWN0aW9ucyB0byBvdGhlciBydW5uaW5nIG1vZHVsZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBBbldvcmtlckFwaSB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgQW5Xb3JrZXJBcGkgaW5zdGFuY2UgY29ubmVjdHMgdG8gd2Vid29ya2VyIGNvbW11bmljYXRpb25cbiAgICogY2hhbm5lbHMsIGFuZCBleHBvc2VzIHRoZSBzdGFuZGFyZCBhbGxuZXQgd29ya2VyIG1vZHVsZSBhcGkgaG9va3MuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgaWYgKGdsb2JhbFRoaXMub25tZXNzYWdlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dsb2JhbFRoaXMub25tZXNzYWdlIGlzIGFscmVhZHkgc2V0LiBZb3Ugc2hvdWxkIG9ubHkgaW5pdGlhbGl6ZSBBbldvcmtlckFwaSBvbmNlIHBlciB3ZWIgd29ya2VyLicpXG4gICAgfVxuICAgIGdsb2JhbFRoaXMub25tZXNzYWdlID0gZXZ0ID0+IHtcbiAgICAgIHRoaXMuX2hhbmRsZU1lc3NhZ2UoZXZ0LmRhdGEpXG4gICAgfVxuICAgIHRoaXMuX3BlbmRpbmcgPSBuZXcgTWFwKClcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0IGEgcmF3IGFsbG5ldCBtb2R1bGUgYXBpIGV2ZW50LlxuICAgKiBZb3UgcHJvYmFibHkgd2FudCB0byB1c2UgYSBoaWdoZXItbGV2ZWwgYXBpLlxuICAgKi9cbiAgcmF3RXZlbnQgKHR5cGUsIGRhdGEsIHRyYW5zZmVyKSB7XG4gICAgZ2xvYmFsVGhpcy5wb3N0TWVzc2FnZSh7XG4gICAgICB0eXBlLFxuICAgICAgZGlyOiAnZXZ0JyxcbiAgICAgIGRhdGFcbiAgICB9LCB0cmFuc2ZlcilcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIGEgcmF3IGFsbG5ldCBtb2R1bGUgYXBpIHJlcXVlc3QuXG4gICAqIFlvdSBwcm9iYWJseSB3YW50IHRvIHVzZSBhIGhpZ2hlci1sZXZlbCBhcGkuXG4gICAqL1xuICByYXdSZXF1ZXN0ICh0eXBlLCBkYXRhLCB0cmFuc2Zlcikge1xuICAgIGNvbnN0IG1zZ0lkID0gbmFub2lkKClcbiAgICBnbG9iYWxUaGlzLnBvc3RNZXNzYWdlKHtcbiAgICAgIHR5cGUsXG4gICAgICBkaXI6ICdyZXEnLFxuICAgICAgbXNnSWQsXG4gICAgICBkYXRhXG4gICAgfSwgdHJhbnNmZXIpXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuX3BlbmRpbmcuc2V0KG1zZ0lkLCBbcmVzb2x2ZSwgcmVqZWN0XSlcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCByZXMgPSB0aGlzLl9wZW5kaW5nLmdldChtc2dJZClcbiAgICAgICAgdGhpcy5fcGVuZGluZy5kZWxldGUobXNnSWQpXG4gICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICByZXNbMV0obmV3IEVycm9yKCd0aW1lb3V0JykpXG4gICAgICAgIH1cbiAgICAgIH0sIDMwMDAwKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICovXG4gIGFzeW5jIHJlZ2lzdGVyTW9kdWxlIChzcGVjKSB7XG4gICAgLy8gZG9uJ3QgY2FyZSBhYm91dCByZXNwb25zZSwganVzdCBuZWVkIGl0IHRvIG5vdCBiZSBhbiBlcnJvclxuICAgIGF3YWl0IHRoaXMucmF3UmVxdWVzdChcbiAgICAgICdyZWdpc3Rlck1vZHVsZScsXG4gICAgICBzcGVjXG4gICAgKVxuICB9XG5cbiAgLy8gLS0gcHJpdmF0ZSAtLSAvL1xuXG4gIF9oYW5kbGVNZXNzYWdlIChkYXRhKSB7XG4gICAgaWYgKGRhdGEuZGlyID09PSAncmVzJykge1xuICAgICAgY29uc3QgcmVzID0gdGhpcy5fcGVuZGluZy5nZXQoZGF0YS5tc2dJZClcbiAgICAgIHRoaXMuX3BlbmRpbmcuZGVsZXRlKGRhdGEubXNnSWQpXG4gICAgICBpZiAocmVzKSB7XG4gICAgICAgIGlmIChkYXRhLmVycm9yKSB7XG4gICAgICAgICAgcmVzWzFdKGRhdGEuZXJyb3IpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzWzBdKGRhdGEuZGF0YSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RpciAnICsgZGF0YS5kaXIgKyAnIG5vdCB5ZXQgaGFuZGxlZCcpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyB1cmxBbHBoYWJldCB9IGZyb20gJy4vdXJsLWFscGhhYmV0L2luZGV4LmpzJ1xuaWYgKHRydWUpIHtcbiAgaWYgKFxuICAgIHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmXG4gICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgJiZcbiAgICB0eXBlb2YgY3J5cHRvID09PSAndW5kZWZpbmVkJ1xuICApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnUmVhY3QgTmF0aXZlIGRvZXMgbm90IGhhdmUgYSBidWlsdC1pbiBzZWN1cmUgcmFuZG9tIGdlbmVyYXRvci4gJyArXG4gICAgICAgICdJZiB5b3UgZG9u4oCZdCBuZWVkIHVucHJlZGljdGFibGUgSURzIHVzZSBgbmFub2lkL25vbi1zZWN1cmVgLiAnICtcbiAgICAgICAgJ0ZvciBzZWN1cmUgSURzLCBpbXBvcnQgYHJlYWN0LW5hdGl2ZS1nZXQtcmFuZG9tLXZhbHVlc2AgJyArXG4gICAgICAgICdiZWZvcmUgTmFubyBJRC4nXG4gICAgKVxuICB9XG4gIGlmICh0eXBlb2YgbXNDcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjcnlwdG8gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0ltcG9ydCBmaWxlIHdpdGggYGlmICghd2luZG93LmNyeXB0bykgd2luZG93LmNyeXB0byA9IHdpbmRvdy5tc0NyeXB0b2AnICtcbiAgICAgICAgJyBiZWZvcmUgaW1wb3J0aW5nIE5hbm8gSUQgdG8gZml4IElFIDExIHN1cHBvcnQnXG4gICAgKVxuICB9XG4gIGlmICh0eXBlb2YgY3J5cHRvID09PSAndW5kZWZpbmVkJykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdZb3VyIGJyb3dzZXIgZG9lcyBub3QgaGF2ZSBzZWN1cmUgcmFuZG9tIGdlbmVyYXRvci4gJyArXG4gICAgICAgICdJZiB5b3UgZG9u4oCZdCBuZWVkIHVucHJlZGljdGFibGUgSURzLCB5b3UgY2FuIHVzZSBuYW5vaWQvbm9uLXNlY3VyZS4nXG4gICAgKVxuICB9XG59XG5sZXQgcmFuZG9tID0gYnl0ZXMgPT4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheShieXRlcykpXG5sZXQgY3VzdG9tUmFuZG9tID0gKGFscGhhYmV0LCBzaXplLCBnZXRSYW5kb20pID0+IHtcbiAgbGV0IG1hc2sgPSAoMiA8PCAoTWF0aC5sb2coYWxwaGFiZXQubGVuZ3RoIC0gMSkgLyBNYXRoLkxOMikpIC0gMVxuICBsZXQgc3RlcCA9IC1+KCgxLjYgKiBtYXNrICogc2l6ZSkgLyBhbHBoYWJldC5sZW5ndGgpXG4gIHJldHVybiAoKSA9PiB7XG4gICAgbGV0IGlkID0gJydcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgbGV0IGJ5dGVzID0gZ2V0UmFuZG9tKHN0ZXApXG4gICAgICBsZXQgaiA9IHN0ZXBcbiAgICAgIHdoaWxlIChqLS0pIHtcbiAgICAgICAgaWQgKz0gYWxwaGFiZXRbYnl0ZXNbal0gJiBtYXNrXSB8fCAnJ1xuICAgICAgICBpZiAoaWQubGVuZ3RoID09PSBzaXplKSByZXR1cm4gaWRcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbmxldCBjdXN0b21BbHBoYWJldCA9IChhbHBoYWJldCwgc2l6ZSkgPT4gY3VzdG9tUmFuZG9tKGFscGhhYmV0LCBzaXplLCByYW5kb20pXG5sZXQgbmFub2lkID0gKHNpemUgPSAyMSkgPT4ge1xuICBsZXQgaWQgPSAnJ1xuICBsZXQgYnl0ZXMgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KHNpemUpKVxuICB3aGlsZSAoc2l6ZS0tKSB7XG4gICAgbGV0IGJ5dGUgPSBieXRlc1tzaXplXSAmIDYzXG4gICAgaWYgKGJ5dGUgPCAzNikge1xuICAgICAgaWQgKz0gYnl0ZS50b1N0cmluZygzNilcbiAgICB9IGVsc2UgaWYgKGJ5dGUgPCA2Mikge1xuICAgICAgaWQgKz0gKGJ5dGUgLSAyNikudG9TdHJpbmcoMzYpLnRvVXBwZXJDYXNlKClcbiAgICB9IGVsc2UgaWYgKGJ5dGUgPCA2Mykge1xuICAgICAgaWQgKz0gJ18nXG4gICAgfSBlbHNlIHtcbiAgICAgIGlkICs9ICctJ1xuICAgIH1cbiAgfVxuICByZXR1cm4gaWRcbn1cbmV4cG9ydCB7IG5hbm9pZCwgY3VzdG9tQWxwaGFiZXQsIGN1c3RvbVJhbmRvbSwgdXJsQWxwaGFiZXQsIHJhbmRvbSB9XG4iLCJsZXQgdXJsQWxwaGFiZXQgPVxuICAndXNlYW5kb20tMjZUMTk4MzQwUFg3NXB4SkFDS1ZFUllNSU5EQlVTSFdPTEZfR1FaYmZnaGprbHF2d3l6cmljdCdcbmV4cG9ydCB7IHVybEFscGhhYmV0IH1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQW5Xb3JrZXJBcGkgfSBmcm9tICdAYWxsbmV0cDJwL2FuLXdvcmtlci1hcGknXG5cbihhc3luYyAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKEFuV29ya2VyQXBpLCB0eXBlb2YgQW5Xb3JrZXJBcGksIE9iamVjdC5rZXlzKEFuV29ya2VyQXBpKSlcbiAgY29uc3Qgd29ya2VyQXBpID0gbmV3IEFuV29ya2VyQXBpKClcbiAgLy8gVE9ETyBwdWxsIHZlcnNpb24gZnJvbSBwYWNrYWdlLmpzb25cbiAgYXdhaXQgd29ya2VyQXBpLnJlZ2lzdGVyTW9kdWxlKCdzeXN0ZW0uYWxsbmV0cDJwLmJyb2tlckAwLjAuMScpXG4gIGNvbnNvbGUubG9nKCdCUk9LRVIgV09SS0VSIFJFR0lTVEVSIFNVQ0NFU1MnKVxuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHRocm93IG5ldyBFcnJvcignY2FuIGRlYnVnPycpXG4gIH0sIDEwMDApXG59KSgpLnRoZW4oKCkgPT4ge30sIGVyciA9PiB7XG4gIGNvbnNvbGUuZXJyb3IoZXJyKVxufSlcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==";

/***/ }),

/***/ "../an-identity/lib/an-identity.mjs":
/*!******************************************!*\
  !*** ../an-identity/lib/an-identity.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnIdentityConfig": () => (/* binding */ AnIdentityConfig),
/* harmony export */   "AnIdentity": () => (/* binding */ AnIdentity)
/* harmony export */ });
/* harmony import */ var jose_browser_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jose-browser-runtime */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/util/base64url.js");
/* harmony import */ var jose_browser_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jose-browser-runtime */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/key/generate_key_pair.js");
/* harmony import */ var jose_browser_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jose-browser-runtime */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/key/export.js");
/* harmony import */ var jose_browser_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jose-browser-runtime */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jwk/thumbprint.js");
/* harmony import */ var jose_browser_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jose-browser-runtime */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/general/sign.js");


/**
 * AnIdentity Algorithm Tuning.
 * If you're not sure what you're doing, just create a default config.
 */
class AnIdentityConfig {
  constructor () {
    // jws alg array
    this.signatureAlgList = ['ES384']

    // jwe alg:enc array
    this.encryptionAlgList = ['ECDH-ES:A256GCM']

    // crypto.subtle deriveKey alg + colon delimited config
    this.passphraseSecretAlg = 'PBKDF2:SHA-512:200000'

    // crypto.subtle wrapKey alg + colon delimited config
    this.passphraseSymAlg = 'AES-GCM:256'

    // milliseconds in the future to set new identity expirations
    this.expireAfterCountMs = Number.MAX_SAFE_INTEGER

    // function returning Promise<CryptoKey> marked with deriveKey
    this.passphraseGetCb = async () => {
      const passphrase = window.prompt('Enter your passphrase - this is the default DEV password fetcher using window.prompt... there is no way to obscure the entered passphrase, you should NOT use this in PRODUCTION! Once this is masked, we highly recommend using a password manager to manage this passphrase.', '')
      const passphraseRaw = (new TextEncoder()).encode(passphrase)
      const passphraseKey = await crypto.subtle.importKey(
        'raw',
        passphraseRaw.buffer,
        'PBKDF2',
        false,
        ['deriveKey']
      )
      return passphraseKey
    }
  }
}

async function _loadIdent (passphraseKey) {
  throw new Error('unimplemented')
}

async function _genIdent (config, passphraseKey) {
  if (config.passphraseSecretAlg.startsWith('PBKDF2:')) {
    const algParts = config.passphraseSecretAlg.split(':')
    const hash = algParts[1]
    const iters = parseInt(algParts[2], 10)

    let encryptPrivKey = null

    if (config.passphraseSymAlg.startsWith('AES-GCM:')) {
      const [alg, length] = config.passphraseSymAlg.split(':')

      const pbkdf2Salt = crypto.getRandomValues(new Uint8Array(24))
      const secretKey = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          hash,
          salt: pbkdf2Salt,
          iterations: iters
        },
        passphraseKey,
        {
          name: alg,
          length: parseInt(length, 10)
        },
        false,
        ['wrapKey']
      )

      // jose/jw* tools don't have any support for password hashing
      // nor the ability to encrypt private keys without exposing
      // them to unsafe javascript runtime memory, so we'll
      // use crypto.subtle directly for persisting the private keys.
      encryptPrivKey = async privateKey => {
        const aesGcmIv = crypto.getRandomValues(new Uint8Array(24))
        const savePrivKey = await crypto.subtle.wrapKey(
          'jwk',
          privateKey,
          secretKey,
          {
            name: alg,
            iv: aesGcmIv,
            tagLength: 128
          }
        )
        return {
          passphraseSecretAlg: config.passphraseSecretAlg,
          passphraseSecretOpts: {
            salt: jose_browser_runtime__WEBPACK_IMPORTED_MODULE_0__.encode(pbkdf2Salt)
          },
          passphraseSymAlg: config.passphraseSymAlg,
          passphraseSymOpts: {
            iv: jose_browser_runtime__WEBPACK_IMPORTED_MODULE_0__.encode(aesGcmIv)
          },
          privateKey: jose_browser_runtime__WEBPACK_IMPORTED_MODULE_0__.encode(new Uint8Array(savePrivKey))
        }
      }
    } else {
      throw new Error('unsupported passphraseSymAlg: "' + config.passphraseSymAlg + '"')
    }

    let expiresAtUtcMs = Date.now() + config.expireAfterCountMs
    if (expiresAtUtcMs > Number.MAX_SAFE_INTEGER) {
      expiresAtUtcMs = Number.MAX_SAFE_INTEGER
    }

    const fullIdentity = {
      expiresAtUtcMs,
      enc: [],
      sig: [],
      sigBytes: ''
    }

    for (const encDef of config.encryptionAlgList) {
      const [alg, enc] = encDef.split(':')
      const pair = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_1__.generateKeyPair)(alg, { extractable: true })

      const publicKeyJwk = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_2__.exportJWK)(pair.publicKey)
      const publicThumbprint = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_3__.calculateJwkThumbprint)(publicKeyJwk)
      const encryptedPrivateKey = await encryptPrivKey(pair.privateKey)

      fullIdentity.enc.push({
        alg,
        enc,
        jwk: publicKeyJwk,
        id: publicThumbprint,
        _priv: {
          publicKey: pair.publicKey,
          privateKey: pair.privateKey,
          encryptedPrivateKey
        }
      })
    }

    for (const sigAlg of config.signatureAlgList) {
      const pair = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_1__.generateKeyPair)(sigAlg, { extractable: true })

      const publicKeyJwk = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_2__.exportJWK)(pair.publicKey)
      const publicThumbprint = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_3__.calculateJwkThumbprint)(publicKeyJwk)
      const encryptedPrivateKey = await encryptPrivKey(pair.privateKey)

      fullIdentity.sig.push({
        alg: sigAlg,
        jwk: publicKeyJwk,
        id: publicThumbprint,
        _priv: {
          publicKey: pair.publicKey,
          privateKey: pair.privateKey,
          encryptedPrivateKey
        }
      })
    }

    const sigBytes = []
    let sigBytesCount = 0

    const expiresAtBytes = new ArrayBuffer(8)
    const dv = new DataView(expiresAtBytes)
    dv.setFloat64(0, fullIdentity.expiresAtUtcMs, true)
    sigBytes.push(new Uint8Array(expiresAtBytes))
    sigBytesCount += 8

    for (const enc of fullIdentity.enc) {
      const bytes = jose_browser_runtime__WEBPACK_IMPORTED_MODULE_0__.decode(enc.id)
      sigBytes.push(bytes)
      sigBytesCount += bytes.byteLength
    }

    for (const sig of fullIdentity.sig) {
      const bytes = jose_browser_runtime__WEBPACK_IMPORTED_MODULE_0__.decode(sig.id)
      sigBytes.push(bytes)
      sigBytesCount += bytes.byteLength
    }

    const sigBytesAll = new Uint8Array(sigBytesCount)
    let offset = 0

    for (const bytes of sigBytes) {
      sigBytesAll.set(bytes, offset)
      offset += bytes.byteLength
    }

    fullIdentity.sigBytes = jose_browser_runtime__WEBPACK_IMPORTED_MODULE_0__.encode(sigBytesAll)

    const sign = new jose_browser_runtime__WEBPACK_IMPORTED_MODULE_4__.GeneralSign(sigBytesAll)

    for (const sig of fullIdentity.sig) {
      sign
        .addSignature(sig._priv.privateKey)
        .setProtectedHeader({ alg: sig.alg })
    }

    fullIdentity.jws = await sign.sign()

    console.log('full', fullIdentity)

    throw new Error('unimplemented')
  } else {
    throw new Error('unsupported passphraseSecretAlg: "' + config.passphraseSecretAlg + '"')
  }
}

/**
 * Provides allnet system JWK JWS JWE JWT functionality.
 */
class AnIdentity {
  /**
   * Create a new identity. Use the async constructor createAnIdentity.
   */
  // constructor () {
  // }

  /**
   * Async constructor - Create a new identity.
   *
   * @param {function} getPassphraseCb should return a promise that resolves
   *                   to a passphrase as a CryptoKey
   */
  static async createAnIdentity (config) {
    const passphraseKey = await config.passphraseGetCb()

    try {
      return await _loadIdent(passphraseKey)
    } catch {
      return await _genIdent(config, passphraseKey)
    }
  }
}


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jwk/thumbprint.js":
/*!***************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/jwk/thumbprint.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calculateJwkThumbprint": () => (/* binding */ calculateJwkThumbprint)
/* harmony export */ });
/* harmony import */ var _runtime_digest_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../runtime/digest.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/digest.js");
/* harmony import */ var _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../runtime/base64url.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/base64url.js");
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/errors.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/util/errors.js");
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/buffer_utils.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/buffer_utils.js");
/* harmony import */ var _lib_is_object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/is_object.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/is_object.js");





const check = (value, description) => {
    if (typeof value !== 'string' || !value) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWKInvalid(`${description} missing or invalid`);
    }
};
async function calculateJwkThumbprint(jwk, digestAlgorithm = 'sha256') {
    if (!(0,_lib_is_object_js__WEBPACK_IMPORTED_MODULE_1__["default"])(jwk)) {
        throw new TypeError('JWK must be an object');
    }
    let components;
    switch (jwk.kty) {
        case 'EC':
            check(jwk.crv, '"crv" (Curve) Parameter');
            check(jwk.x, '"x" (X Coordinate) Parameter');
            check(jwk.y, '"y" (Y Coordinate) Parameter');
            components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x, y: jwk.y };
            break;
        case 'OKP':
            check(jwk.crv, '"crv" (Subtype of Key Pair) Parameter');
            check(jwk.x, '"x" (Public Key) Parameter');
            components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x };
            break;
        case 'RSA':
            check(jwk.e, '"e" (Exponent) Parameter');
            check(jwk.n, '"n" (Modulus) Parameter');
            components = { e: jwk.e, kty: jwk.kty, n: jwk.n };
            break;
        case 'oct':
            check(jwk.k, '"k" (Key Value) Parameter');
            components = { k: jwk.k, kty: jwk.kty };
            break;
        default:
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JOSENotSupported('"kty" (Key Type) Parameter missing or unsupported');
    }
    const data = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_2__.encoder.encode(JSON.stringify(components));
    return (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_3__.encode)(await (0,_runtime_digest_js__WEBPACK_IMPORTED_MODULE_4__["default"])(digestAlgorithm, data));
}


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/flattened/sign.js":
/*!*******************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/flattened/sign.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FlattenedSign": () => (/* binding */ FlattenedSign)
/* harmony export */ });
/* harmony import */ var _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../runtime/base64url.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/base64url.js");
/* harmony import */ var _runtime_sign_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../runtime/sign.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/sign.js");
/* harmony import */ var _lib_is_disjoint_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/is_disjoint.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/is_disjoint.js");
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/errors.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/util/errors.js");
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/buffer_utils.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/buffer_utils.js");
/* harmony import */ var _lib_check_key_type_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/check_key_type.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/check_key_type.js");
/* harmony import */ var _lib_validate_crit_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/validate_crit.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/validate_crit.js");







class FlattenedSign {
    constructor(payload) {
        if (!(payload instanceof Uint8Array)) {
            throw new TypeError('payload must be an instance of Uint8Array');
        }
        this._payload = payload;
    }
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError('setProtectedHeader can only be called once');
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this._unprotectedHeader) {
            throw new TypeError('setUnprotectedHeader can only be called once');
        }
        this._unprotectedHeader = unprotectedHeader;
        return this;
    }
    async sign(key, options) {
        if (!this._protectedHeader && !this._unprotectedHeader) {
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWSInvalid('either setProtectedHeader or setUnprotectedHeader must be called before #sign()');
        }
        if (!(0,_lib_is_disjoint_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this._protectedHeader, this._unprotectedHeader)) {
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWSInvalid('JWS Protected and JWS Unprotected Header Parameter names must be disjoint');
        }
        const joseHeader = {
            ...this._protectedHeader,
            ...this._unprotectedHeader,
        };
        const extensions = (0,_lib_validate_crit_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWSInvalid, new Map([['b64', true]]), options === null || options === void 0 ? void 0 : options.crit, this._protectedHeader, joseHeader);
        let b64 = true;
        if (extensions.has('b64')) {
            b64 = this._protectedHeader.b64;
            if (typeof b64 !== 'boolean') {
                throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
            }
        }
        const { alg } = joseHeader;
        if (typeof alg !== 'string' || !alg) {
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
        }
        (0,_lib_check_key_type_js__WEBPACK_IMPORTED_MODULE_3__["default"])(alg, key, 'sign');
        let payload = this._payload;
        if (b64) {
            payload = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_4__.encoder.encode((0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_5__.encode)(payload));
        }
        let protectedHeader;
        if (this._protectedHeader) {
            protectedHeader = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_4__.encoder.encode((0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_5__.encode)(JSON.stringify(this._protectedHeader)));
        }
        else {
            protectedHeader = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_4__.encoder.encode('');
        }
        const data = (0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_4__.concat)(protectedHeader, _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_4__.encoder.encode('.'), payload);
        const signature = await (0,_runtime_sign_js__WEBPACK_IMPORTED_MODULE_6__["default"])(alg, key, data);
        const jws = {
            signature: (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_5__.encode)(signature),
            payload: '',
        };
        if (b64) {
            jws.payload = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_4__.decoder.decode(payload);
        }
        if (this._unprotectedHeader) {
            jws.header = this._unprotectedHeader;
        }
        if (this._protectedHeader) {
            jws.protected = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_4__.decoder.decode(protectedHeader);
        }
        return jws;
    }
}


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/general/sign.js":
/*!*****************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/general/sign.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GeneralSign": () => (/* binding */ GeneralSign)
/* harmony export */ });
/* harmony import */ var _flattened_sign_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../flattened/sign.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/flattened/sign.js");
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/errors.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/util/errors.js");


const signatureRef = new WeakMap();
class IndividualSignature {
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError('setProtectedHeader can only be called once');
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this._unprotectedHeader) {
            throw new TypeError('setUnprotectedHeader can only be called once');
        }
        this._unprotectedHeader = unprotectedHeader;
        return this;
    }
    set _protectedHeader(value) {
        signatureRef.get(this).protectedHeader = value;
    }
    get _protectedHeader() {
        return signatureRef.get(this).protectedHeader;
    }
    set _unprotectedHeader(value) {
        signatureRef.get(this).unprotectedHeader = value;
    }
    get _unprotectedHeader() {
        return signatureRef.get(this).unprotectedHeader;
    }
}
class GeneralSign {
    constructor(payload) {
        this._signatures = [];
        this._payload = payload;
    }
    addSignature(key, options) {
        const signature = new IndividualSignature();
        signatureRef.set(signature, { key, options });
        this._signatures.push(signature);
        return signature;
    }
    async sign() {
        if (!this._signatures.length) {
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWSInvalid('at least one signature must be added');
        }
        const jws = {
            signatures: [],
            payload: '',
        };
        let payloads = new Set();
        await Promise.all(this._signatures.map(async (sig) => {
            const { protectedHeader, unprotectedHeader, options, key } = signatureRef.get(sig);
            const flattened = new _flattened_sign_js__WEBPACK_IMPORTED_MODULE_1__.FlattenedSign(this._payload);
            if (protectedHeader) {
                flattened.setProtectedHeader(protectedHeader);
            }
            if (unprotectedHeader) {
                flattened.setUnprotectedHeader(unprotectedHeader);
            }
            const { payload, ...rest } = await flattened.sign(key, options);
            payloads.add(payload);
            jws.payload = payload;
            jws.signatures.push(rest);
        }));
        if (payloads.size !== 1) {
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWSInvalid('inconsistent use of JWS Unencoded Payload Option (RFC7797)');
        }
        return jws;
    }
}


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/key/export.js":
/*!***********************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/key/export.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "exportSPKI": () => (/* binding */ exportSPKI),
/* harmony export */   "exportPKCS8": () => (/* binding */ exportPKCS8),
/* harmony export */   "exportJWK": () => (/* binding */ exportJWK)
/* harmony export */ });
/* harmony import */ var _runtime_asn1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../runtime/asn1.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/asn1.js");
/* harmony import */ var _runtime_key_to_jwk_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../runtime/key_to_jwk.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/key_to_jwk.js");



async function exportSPKI(key) {
    return (0,_runtime_asn1_js__WEBPACK_IMPORTED_MODULE_0__.toSPKI)(key);
}
async function exportPKCS8(key) {
    return (0,_runtime_asn1_js__WEBPACK_IMPORTED_MODULE_0__.toPKCS8)(key);
}
async function exportJWK(key) {
    return (0,_runtime_key_to_jwk_js__WEBPACK_IMPORTED_MODULE_1__["default"])(key);
}


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/key/generate_key_pair.js":
/*!**********************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/key/generate_key_pair.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateKeyPair": () => (/* binding */ generateKeyPair)
/* harmony export */ });
/* harmony import */ var _runtime_generate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../runtime/generate.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/generate.js");

async function generateKeyPair(alg, options) {
    return (0,_runtime_generate_js__WEBPACK_IMPORTED_MODULE_0__.generateKeyPair)(alg, options);
}


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/buffer_utils.js":
/*!*****************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/buffer_utils.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "encoder": () => (/* binding */ encoder),
/* harmony export */   "decoder": () => (/* binding */ decoder),
/* harmony export */   "concat": () => (/* binding */ concat),
/* harmony export */   "p2s": () => (/* binding */ p2s),
/* harmony export */   "uint64be": () => (/* binding */ uint64be),
/* harmony export */   "uint32be": () => (/* binding */ uint32be),
/* harmony export */   "lengthAndInput": () => (/* binding */ lengthAndInput),
/* harmony export */   "concatKdf": () => (/* binding */ concatKdf)
/* harmony export */ });
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const MAX_INT32 = 2 ** 32;
function concat(...buffers) {
    const size = buffers.reduce((acc, { length }) => acc + length, 0);
    const buf = new Uint8Array(size);
    let i = 0;
    buffers.forEach((buffer) => {
        buf.set(buffer, i);
        i += buffer.length;
    });
    return buf;
}
function p2s(alg, p2sInput) {
    return concat(encoder.encode(alg), new Uint8Array([0]), p2sInput);
}
function writeUInt32BE(buf, value, offset) {
    if (value < 0 || value >= MAX_INT32) {
        throw new RangeError(`value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`);
    }
    buf.set([value >>> 24, value >>> 16, value >>> 8, value & 0xff], offset);
}
function uint64be(value) {
    const high = Math.floor(value / MAX_INT32);
    const low = value % MAX_INT32;
    const buf = new Uint8Array(8);
    writeUInt32BE(buf, high, 0);
    writeUInt32BE(buf, low, 4);
    return buf;
}
function uint32be(value) {
    const buf = new Uint8Array(4);
    writeUInt32BE(buf, value);
    return buf;
}
function lengthAndInput(input) {
    return concat(uint32be(input.length), input);
}
async function concatKdf(digest, secret, bits, value) {
    const iterations = Math.ceil((bits >> 3) / 32);
    let res;
    for (let iter = 1; iter <= iterations; iter++) {
        const buf = new Uint8Array(4 + secret.length + value.length);
        buf.set(uint32be(iter));
        buf.set(secret, 4);
        buf.set(value, 4 + secret.length);
        if (!res) {
            res = await digest('sha256', buf);
        }
        else {
            res = concat(res, await digest('sha256', buf));
        }
    }
    res = res.slice(0, bits >> 3);
    return res;
}


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/check_key_type.js":
/*!*******************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/check_key_type.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _invalid_key_input_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./invalid_key_input.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/invalid_key_input.js");
/* harmony import */ var _runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../runtime/is_key_like.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/is_key_like.js");


const symmetricTypeCheck = (key) => {
    if (key instanceof Uint8Array)
        return;
    if (!(0,_runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_0__["default"])(key)) {
        throw new TypeError((0,_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_1__["default"])(key, ..._runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_0__.types, 'Uint8Array'));
    }
    if (key.type !== 'secret') {
        throw new TypeError(`${_runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_0__.types.join(' or ')} instances for symmetric algorithms must be of type "secret"`);
    }
};
const asymmetricTypeCheck = (key, usage) => {
    if (!(0,_runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_0__["default"])(key)) {
        throw new TypeError((0,_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_1__["default"])(key, ..._runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_0__.types));
    }
    if (key.type === 'secret') {
        throw new TypeError(`${_runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_0__.types.join(' or ')} instances for asymmetric algorithms must not be of type "secret"`);
    }
    if (usage === 'sign' && key.type === 'public') {
        throw new TypeError(`${_runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_0__.types.join(' or ')} instances for asymmetric algorithm signing must be of type "private"`);
    }
    if (usage === 'decrypt' && key.type === 'public') {
        throw new TypeError(`${_runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_0__.types.join(' or ')} instances for asymmetric algorithm decryption must be of type "private"`);
    }
    if (key.algorithm && usage === 'verify' && key.type === 'private') {
        throw new TypeError(`${_runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_0__.types.join(' or ')} instances for asymmetric algorithm verifying must be of type "public"`);
    }
    if (key.algorithm && usage === 'encrypt' && key.type === 'private') {
        throw new TypeError(`${_runtime_is_key_like_js__WEBPACK_IMPORTED_MODULE_0__.types.join(' or ')} instances for asymmetric algorithm encryption must be of type "public"`);
    }
};
const checkKeyType = (alg, key, usage) => {
    const symmetric = alg.startsWith('HS') ||
        alg === 'dir' ||
        alg.startsWith('PBES2') ||
        /^A\d{3}(?:GCM)?KW$/.test(alg);
    if (symmetric) {
        symmetricTypeCheck(key);
    }
    else {
        asymmetricTypeCheck(key, usage);
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkKeyType);


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/crypto_key.js":
/*!***************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/crypto_key.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkSigCryptoKey": () => (/* binding */ checkSigCryptoKey),
/* harmony export */   "checkEncCryptoKey": () => (/* binding */ checkEncCryptoKey)
/* harmony export */ });
/* harmony import */ var _runtime_global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../runtime/global.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/global.js");

function unusable(name, prop = 'algorithm.name') {
    return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
}
function isAlgorithm(algorithm, name) {
    return algorithm.name === name;
}
function getHashLength(hash) {
    return parseInt(hash.name.substr(4), 10);
}
function getNamedCurve(alg) {
    switch (alg) {
        case 'ES256':
            return 'P-256';
        case 'ES384':
            return 'P-384';
        case 'ES512':
            return 'P-521';
        default:
            throw new Error('unreachable');
    }
}
function checkUsage(key, usages) {
    if (usages.length && !usages.some((expected) => key.usages.includes(expected))) {
        let msg = 'CryptoKey does not support this operation, its usages must include ';
        if (usages.length > 2) {
            const last = usages.pop();
            msg += `one of ${usages.join(', ')}, or ${last}.`;
        }
        else if (usages.length === 2) {
            msg += `one of ${usages[0]} or ${usages[1]}.`;
        }
        else {
            msg += `${usages[0]}.`;
        }
        throw new TypeError(msg);
    }
}
function checkSigCryptoKey(key, alg, ...usages) {
    switch (alg) {
        case 'HS256':
        case 'HS384':
        case 'HS512': {
            if (!isAlgorithm(key.algorithm, 'HMAC'))
                throw unusable('HMAC');
            const expected = parseInt(alg.substr(2), 10);
            const actual = getHashLength(key.algorithm.hash);
            if (actual !== expected)
                throw unusable(`SHA-${expected}`, 'algorithm.hash');
            break;
        }
        case 'RS256':
        case 'RS384':
        case 'RS512': {
            if (!isAlgorithm(key.algorithm, 'RSASSA-PKCS1-v1_5'))
                throw unusable('RSASSA-PKCS1-v1_5');
            const expected = parseInt(alg.substr(2), 10);
            const actual = getHashLength(key.algorithm.hash);
            if (actual !== expected)
                throw unusable(`SHA-${expected}`, 'algorithm.hash');
            break;
        }
        case 'PS256':
        case 'PS384':
        case 'PS512': {
            if (!isAlgorithm(key.algorithm, 'RSA-PSS'))
                throw unusable('RSA-PSS');
            const expected = parseInt(alg.substr(2), 10);
            const actual = getHashLength(key.algorithm.hash);
            if (actual !== expected)
                throw unusable(`SHA-${expected}`, 'algorithm.hash');
            break;
        }
        case (0,_runtime_global_js__WEBPACK_IMPORTED_MODULE_0__.isNodeJs)() && 'EdDSA': {
            if (key.algorithm.name !== 'NODE-ED25519' && key.algorithm.name !== 'NODE-ED448')
                throw unusable('NODE-ED25519 or NODE-ED448');
            break;
        }
        case (0,_runtime_global_js__WEBPACK_IMPORTED_MODULE_0__.isCloudflareWorkers)() && 'EdDSA': {
            if (!isAlgorithm(key.algorithm, 'NODE-ED25519'))
                throw unusable('NODE-ED25519');
            break;
        }
        case 'ES256':
        case 'ES384':
        case 'ES512': {
            if (!isAlgorithm(key.algorithm, 'ECDSA'))
                throw unusable('ECDSA');
            const expected = getNamedCurve(alg);
            const actual = key.algorithm.namedCurve;
            if (actual !== expected)
                throw unusable(expected, 'algorithm.namedCurve');
            break;
        }
        default:
            throw new TypeError('CryptoKey does not support this operation');
    }
    checkUsage(key, usages);
}
function checkEncCryptoKey(key, alg, ...usages) {
    switch (alg) {
        case 'A128GCM':
        case 'A192GCM':
        case 'A256GCM': {
            if (!isAlgorithm(key.algorithm, 'AES-GCM'))
                throw unusable('AES-GCM');
            const expected = parseInt(alg.substr(1, 3), 10);
            const actual = key.algorithm.length;
            if (actual !== expected)
                throw unusable(expected, 'algorithm.length');
            break;
        }
        case 'A128KW':
        case 'A192KW':
        case 'A256KW': {
            if (!isAlgorithm(key.algorithm, 'AES-KW'))
                throw unusable('AES-KW');
            const expected = parseInt(alg.substr(1, 3), 10);
            const actual = key.algorithm.length;
            if (actual !== expected)
                throw unusable(expected, 'algorithm.length');
            break;
        }
        case 'ECDH-ES':
            if (!isAlgorithm(key.algorithm, 'ECDH'))
                throw unusable('ECDH');
            break;
        case 'PBES2-HS256+A128KW':
        case 'PBES2-HS384+A192KW':
        case 'PBES2-HS512+A256KW':
            if (!isAlgorithm(key.algorithm, 'PBKDF2'))
                throw unusable('PBKDF2');
            break;
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512': {
            if (!isAlgorithm(key.algorithm, 'RSA-OAEP'))
                throw unusable('RSA-OAEP');
            const expected = parseInt(alg.substr(9), 10) || 1;
            const actual = getHashLength(key.algorithm.hash);
            if (actual !== expected)
                throw unusable(`SHA-${expected}`, 'algorithm.hash');
            break;
        }
        default:
            throw new TypeError('CryptoKey does not support this operation');
    }
    checkUsage(key, usages);
}


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/format_pem.js":
/*!***************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/format_pem.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((b64, descriptor) => {
    const newlined = (b64.match(/.{1,64}/g) || []).join('\n');
    return `-----BEGIN ${descriptor}-----\n${newlined}\n-----END ${descriptor}-----`;
});


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/invalid_key_input.js":
/*!**********************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/invalid_key_input.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((actual, ...types) => {
    let msg = 'Key must be ';
    if (types.length > 2) {
        const last = types.pop();
        msg += `one of type ${types.join(', ')}, or ${last}.`;
    }
    else if (types.length === 2) {
        msg += `one of type ${types[0]} or ${types[1]}.`;
    }
    else {
        msg += `of type ${types[0]}.`;
    }
    if (actual == null) {
        msg += ` Received ${actual}`;
    }
    else if (typeof actual === 'function' && actual.name) {
        msg += ` Received function ${actual.name}`;
    }
    else if (typeof actual === 'object' && actual != null) {
        if (actual.constructor && actual.constructor.name) {
            msg += ` Received an instance of ${actual.constructor.name}`;
        }
    }
    return msg;
});


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/is_disjoint.js":
/*!****************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/is_disjoint.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const isDisjoint = (...headers) => {
    const sources = headers.filter(Boolean);
    if (sources.length === 0 || sources.length === 1) {
        return true;
    }
    let acc;
    for (const header of sources) {
        const parameters = Object.keys(header);
        if (!acc || acc.size === 0) {
            acc = new Set(parameters);
            continue;
        }
        for (const parameter of parameters) {
            if (acc.has(parameter)) {
                return false;
            }
            acc.add(parameter);
        }
    }
    return true;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isDisjoint);


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/is_object.js":
/*!**************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/is_object.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isObject)
/* harmony export */ });
function isObjectLike(value) {
    return typeof value === 'object' && value !== null;
}
function isObject(input) {
    if (!isObjectLike(input) || Object.prototype.toString.call(input) !== '[object Object]') {
        return false;
    }
    if (Object.getPrototypeOf(input) === null) {
        return true;
    }
    let proto = input;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(input) === proto;
}


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/validate_crit.js":
/*!******************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/validate_crit.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/errors.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/util/errors.js");

function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
    if (joseHeader.crit !== undefined && protectedHeader.crit === undefined) {
        throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
    }
    if (!protectedHeader || protectedHeader.crit === undefined) {
        return new Set();
    }
    if (!Array.isArray(protectedHeader.crit) ||
        protectedHeader.crit.length === 0 ||
        protectedHeader.crit.some((input) => typeof input !== 'string' || input.length === 0)) {
        throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
    }
    let recognized;
    if (recognizedOption !== undefined) {
        recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
    }
    else {
        recognized = recognizedDefault;
    }
    for (const parameter of protectedHeader.crit) {
        if (!recognized.has(parameter)) {
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
        }
        if (joseHeader[parameter] === undefined) {
            throw new Err(`Extension Header Parameter "${parameter}" is missing`);
        }
        else if (recognized.get(parameter) && protectedHeader[parameter] === undefined) {
            throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
        }
    }
    return new Set(protectedHeader.crit);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validateCrit);


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/asn1.js":
/*!*************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/asn1.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toSPKI": () => (/* binding */ toSPKI),
/* harmony export */   "toPKCS8": () => (/* binding */ toPKCS8),
/* harmony export */   "fromPKCS8": () => (/* binding */ fromPKCS8),
/* harmony export */   "fromSPKI": () => (/* binding */ fromSPKI)
/* harmony export */ });
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./global.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/global.js");
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webcrypto.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/webcrypto.js");
/* harmony import */ var _lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/invalid_key_input.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/invalid_key_input.js");
/* harmony import */ var _base64url_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base64url.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/base64url.js");
/* harmony import */ var _lib_format_pem_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/format_pem.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/format_pem.js");
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/errors.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/util/errors.js");






const genericExport = async (keyType, keyFormat, key) => {
    if (!(0,_webcrypto_js__WEBPACK_IMPORTED_MODULE_0__.isCryptoKey)(key)) {
        throw new TypeError((0,_lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_1__["default"])(key, 'CryptoKey'));
    }
    if (!key.extractable) {
        throw new TypeError('CryptoKey is not extractable');
    }
    if (key.type !== keyType) {
        throw new TypeError(`key is not a ${keyType} key`);
    }
    return (0,_lib_format_pem_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_base64url_js__WEBPACK_IMPORTED_MODULE_3__.encodeBase64)(new Uint8Array(await _webcrypto_js__WEBPACK_IMPORTED_MODULE_0__["default"].subtle.exportKey(keyFormat, key))), `${keyType.toUpperCase()} KEY`);
};
const toSPKI = (key) => {
    return genericExport('public', 'spki', key);
};
const toPKCS8 = (key) => {
    return genericExport('private', 'pkcs8', key);
};
const getNamedCurve = (keyData) => {
    const keyDataStr = keyData.toString();
    switch (true) {
        case keyDataStr.includes(new Uint8Array([
            0x06, 0x07, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x02, 0x01, 0x06, 0x08, 0x2a, 0x86, 0x48, 0xce,
            0x3d, 0x03, 0x01, 0x07,
        ]).toString()):
            return 'P-256';
        case keyDataStr.includes(new Uint8Array([
            0x06, 0x07, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x02, 0x01, 0x06, 0x05, 0x2b, 0x81, 0x04, 0x00,
            0x22,
        ]).toString()):
            return 'P-384';
        case keyDataStr.includes(new Uint8Array([
            0x06, 0x07, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x02, 0x01, 0x06, 0x05, 0x2b, 0x81, 0x04, 0x00,
            0x23,
        ]).toString()):
            return 'P-521';
        case ((0,_global_js__WEBPACK_IMPORTED_MODULE_4__.isCloudflareWorkers)() || (0,_global_js__WEBPACK_IMPORTED_MODULE_4__.isNodeJs)()) &&
            keyDataStr.includes(new Uint8Array([0x06, 0x03, 0x2b, 0x65, 0x70]).toString()):
            return 'Ed25519';
        case (0,_global_js__WEBPACK_IMPORTED_MODULE_4__.isNodeJs)() &&
            keyDataStr.includes(new Uint8Array([0x06, 0x03, 0x2b, 0x65, 0x71]).toString()):
            return 'Ed448';
        default:
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_5__.JOSENotSupported('Invalid or unsupported EC Key Curve or OKP Key Sub Type');
    }
};
const genericImport = async (replace, keyFormat, pem, alg, options) => {
    var _a;
    let algorithm;
    let keyUsages;
    const keyData = new Uint8Array(_global_js__WEBPACK_IMPORTED_MODULE_4__["default"].atob(pem.replace(replace, ''))
        .split('')
        .map((c) => c.charCodeAt(0)));
    const isPublic = keyFormat === 'spki';
    switch (alg) {
        case 'PS256':
        case 'PS384':
        case 'PS512':
            algorithm = { name: 'RSA-PSS', hash: `SHA-${alg.substr(-3)}` };
            keyUsages = isPublic ? ['verify'] : ['sign'];
            break;
        case 'RS256':
        case 'RS384':
        case 'RS512':
            algorithm = { name: 'RSASSA-PKCS1-v1_5', hash: `SHA-${alg.substr(-3)}` };
            keyUsages = isPublic ? ['verify'] : ['sign'];
            break;
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512':
            algorithm = {
                name: 'RSA-OAEP',
                hash: `SHA-${parseInt(alg.substr(-3), 10) || 1}`,
            };
            keyUsages = isPublic ? ['encrypt', 'wrapKey'] : ['decrypt', 'unwrapKey'];
            break;
        case 'ES256':
            algorithm = { name: 'ECDSA', namedCurve: 'P-256' };
            keyUsages = isPublic ? ['verify'] : ['sign'];
            break;
        case 'ES384':
            algorithm = { name: 'ECDSA', namedCurve: 'P-384' };
            keyUsages = isPublic ? ['verify'] : ['sign'];
            break;
        case 'ES512':
            algorithm = { name: 'ECDSA', namedCurve: 'P-521' };
            keyUsages = isPublic ? ['verify'] : ['sign'];
            break;
        case 'ECDH-ES':
        case 'ECDH-ES+A128KW':
        case 'ECDH-ES+A192KW':
        case 'ECDH-ES+A256KW':
            algorithm = { name: 'ECDH', namedCurve: getNamedCurve(keyData) };
            keyUsages = isPublic ? [] : ['deriveBits'];
            break;
        case ((0,_global_js__WEBPACK_IMPORTED_MODULE_4__.isCloudflareWorkers)() || (0,_global_js__WEBPACK_IMPORTED_MODULE_4__.isNodeJs)()) && 'EdDSA':
            const namedCurve = getNamedCurve(keyData).toUpperCase();
            algorithm = { name: `NODE-${namedCurve}`, namedCurve: `NODE-${namedCurve}` };
            keyUsages = isPublic ? ['verify'] : ['sign'];
            break;
        default:
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_5__.JOSENotSupported('Invalid or unsupported "alg" (Algorithm) value');
    }
    return _webcrypto_js__WEBPACK_IMPORTED_MODULE_0__["default"].subtle.importKey(keyFormat, keyData, algorithm, (_a = options === null || options === void 0 ? void 0 : options.extractable) !== null && _a !== void 0 ? _a : false, keyUsages);
};
const fromPKCS8 = (pem, alg, options) => {
    return genericImport(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, 'pkcs8', pem, alg, options);
};
const fromSPKI = (pem, alg, options) => {
    return genericImport(/(?:-----(?:BEGIN|END) PUBLIC KEY-----|\s)/g, 'spki', pem, alg, options);
};


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/base64url.js":
/*!******************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/base64url.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "encodeBase64": () => (/* binding */ encodeBase64),
/* harmony export */   "encode": () => (/* binding */ encode),
/* harmony export */   "decodeBase64": () => (/* binding */ decodeBase64),
/* harmony export */   "decode": () => (/* binding */ decode)
/* harmony export */ });
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/buffer_utils.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/buffer_utils.js");
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/global.js");


const encodeBase64 = (input) => {
    let unencoded = input;
    if (typeof unencoded === 'string') {
        unencoded = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_0__.encoder.encode(unencoded);
    }
    const CHUNK_SIZE = 0x8000;
    const arr = [];
    for (let i = 0; i < unencoded.length; i += CHUNK_SIZE) {
        arr.push(String.fromCharCode.apply(null, unencoded.subarray(i, i + CHUNK_SIZE)));
    }
    return _global_js__WEBPACK_IMPORTED_MODULE_1__["default"].btoa(arr.join(''));
};
const encode = (input) => {
    return encodeBase64(input).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};
const decodeBase64 = (encoded) => {
    return new Uint8Array(_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].atob(encoded)
        .split('')
        .map((c) => c.charCodeAt(0)));
};
const decode = (input) => {
    let encoded = input;
    if (encoded instanceof Uint8Array) {
        encoded = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_0__.decoder.decode(encoded);
    }
    encoded = encoded.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
    try {
        return decodeBase64(encoded);
    }
    catch (_a) {
        throw new TypeError('The input to be decoded is not correctly encoded.');
    }
};


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/check_key_length.js":
/*!*************************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/check_key_length.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((alg, key) => {
    if (alg.startsWith('HS')) {
        const bitlen = parseInt(alg.substr(-3), 10);
        const { length } = key.algorithm;
        if (typeof length !== 'number' || length < bitlen) {
            throw new TypeError(`${alg} requires symmetric keys to be ${bitlen} bits or larger`);
        }
    }
    if (alg.startsWith('RS') || alg.startsWith('PS')) {
        const { modulusLength } = key.algorithm;
        if (typeof modulusLength !== 'number' || modulusLength < 2048) {
            throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
        }
    }
});


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/digest.js":
/*!***************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/digest.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webcrypto.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/webcrypto.js");

const digest = async (algorithm, data) => {
    const subtleDigest = `SHA-${algorithm.substr(-3)}`;
    return new Uint8Array(await _webcrypto_js__WEBPACK_IMPORTED_MODULE_0__["default"].subtle.digest(subtleDigest, data));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (digest);


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/generate.js":
/*!*****************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/generate.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateSecret": () => (/* binding */ generateSecret),
/* harmony export */   "generateKeyPair": () => (/* binding */ generateKeyPair)
/* harmony export */ });
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./global.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/global.js");
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webcrypto.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/webcrypto.js");
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/errors.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/util/errors.js");
/* harmony import */ var _random_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./random.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/random.js");




async function generateSecret(alg, options) {
    var _a;
    let length;
    let algorithm;
    let keyUsages;
    switch (alg) {
        case 'HS256':
        case 'HS384':
        case 'HS512':
            length = parseInt(alg.substr(-3), 10);
            algorithm = { name: 'HMAC', hash: `SHA-${length}`, length };
            keyUsages = ['sign', 'verify'];
            break;
        case 'A128CBC-HS256':
        case 'A192CBC-HS384':
        case 'A256CBC-HS512':
            length = parseInt(alg.substr(-3), 10);
            return (0,_random_js__WEBPACK_IMPORTED_MODULE_0__["default"])(new Uint8Array(length >> 3));
        case 'A128KW':
        case 'A192KW':
        case 'A256KW':
            length = parseInt(alg.substring(1, 4), 10);
            algorithm = { name: 'AES-KW', length };
            keyUsages = ['wrapKey', 'unwrapKey'];
            break;
        case 'A128GCMKW':
        case 'A192GCMKW':
        case 'A256GCMKW':
        case 'A128GCM':
        case 'A192GCM':
        case 'A256GCM':
            length = parseInt(alg.substring(1, 4), 10);
            algorithm = { name: 'AES-GCM', length };
            keyUsages = ['encrypt', 'decrypt'];
            break;
        default:
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
    }
    return _webcrypto_js__WEBPACK_IMPORTED_MODULE_2__["default"].subtle.generateKey(algorithm, (_a = options === null || options === void 0 ? void 0 : options.extractable) !== null && _a !== void 0 ? _a : false, keyUsages);
}
function getModulusLengthOption(options) {
    var _a;
    const modulusLength = (_a = options === null || options === void 0 ? void 0 : options.modulusLength) !== null && _a !== void 0 ? _a : 2048;
    if (typeof modulusLength !== 'number' || modulusLength < 2048) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JOSENotSupported('Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used');
    }
    return modulusLength;
}
async function generateKeyPair(alg, options) {
    var _a, _b;
    let algorithm;
    let keyUsages;
    switch (alg) {
        case 'PS256':
        case 'PS384':
        case 'PS512':
            algorithm = {
                name: 'RSA-PSS',
                hash: `SHA-${alg.substr(-3)}`,
                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                modulusLength: getModulusLengthOption(options),
            };
            keyUsages = ['sign', 'verify'];
            break;
        case 'RS256':
        case 'RS384':
        case 'RS512':
            algorithm = {
                name: 'RSASSA-PKCS1-v1_5',
                hash: `SHA-${alg.substr(-3)}`,
                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                modulusLength: getModulusLengthOption(options),
            };
            keyUsages = ['sign', 'verify'];
            break;
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512':
            algorithm = {
                name: 'RSA-OAEP',
                hash: `SHA-${parseInt(alg.substr(-3), 10) || 1}`,
                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                modulusLength: getModulusLengthOption(options),
            };
            keyUsages = ['decrypt', 'unwrapKey', 'encrypt', 'wrapKey'];
            break;
        case 'ES256':
            algorithm = { name: 'ECDSA', namedCurve: 'P-256' };
            keyUsages = ['sign', 'verify'];
            break;
        case 'ES384':
            algorithm = { name: 'ECDSA', namedCurve: 'P-384' };
            keyUsages = ['sign', 'verify'];
            break;
        case 'ES512':
            algorithm = { name: 'ECDSA', namedCurve: 'P-521' };
            keyUsages = ['sign', 'verify'];
            break;
        case ((0,_global_js__WEBPACK_IMPORTED_MODULE_3__.isCloudflareWorkers)() || (0,_global_js__WEBPACK_IMPORTED_MODULE_3__.isNodeJs)()) && 'EdDSA':
            switch (options === null || options === void 0 ? void 0 : options.crv) {
                case undefined:
                case 'Ed25519':
                    algorithm = { name: 'NODE-ED25519', namedCurve: 'NODE-ED25519' };
                    keyUsages = ['sign', 'verify'];
                    break;
                case (0,_global_js__WEBPACK_IMPORTED_MODULE_3__.isNodeJs)() && 'Ed448':
                    algorithm = { name: 'NODE-ED448', namedCurve: 'NODE-ED448' };
                    keyUsages = ['sign', 'verify'];
                    break;
                default:
                    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JOSENotSupported('Invalid or unsupported crv option provided, supported values are Ed25519 and Ed448');
            }
            break;
        case 'ECDH-ES':
        case 'ECDH-ES+A128KW':
        case 'ECDH-ES+A192KW':
        case 'ECDH-ES+A256KW':
            algorithm = { name: 'ECDH', namedCurve: (_a = options === null || options === void 0 ? void 0 : options.crv) !== null && _a !== void 0 ? _a : 'P-256' };
            keyUsages = ['deriveKey', 'deriveBits'];
            break;
        default:
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
    }
    return (_webcrypto_js__WEBPACK_IMPORTED_MODULE_2__["default"].subtle.generateKey(algorithm, (_b = options === null || options === void 0 ? void 0 : options.extractable) !== null && _b !== void 0 ? _b : false, keyUsages));
}


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/get_sign_verify_key.js":
/*!****************************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/get_sign_verify_key.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCryptoKey)
/* harmony export */ });
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webcrypto.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/webcrypto.js");
/* harmony import */ var _lib_crypto_key_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/crypto_key.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/crypto_key.js");
/* harmony import */ var _lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/invalid_key_input.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/invalid_key_input.js");



function getCryptoKey(alg, key, usage) {
    if ((0,_webcrypto_js__WEBPACK_IMPORTED_MODULE_0__.isCryptoKey)(key)) {
        (0,_lib_crypto_key_js__WEBPACK_IMPORTED_MODULE_1__.checkSigCryptoKey)(key, alg, usage);
        return key;
    }
    if (key instanceof Uint8Array) {
        if (!alg.startsWith('HS')) {
            throw new TypeError((0,_lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_2__["default"])(key, 'CryptoKey'));
        }
        return _webcrypto_js__WEBPACK_IMPORTED_MODULE_0__["default"].subtle.importKey('raw', key, { hash: `SHA-${alg.substr(-3)}`, name: 'HMAC' }, false, [usage]);
    }
    throw new TypeError((0,_lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_2__["default"])(key, 'CryptoKey', 'Uint8Array'));
}


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/global.js":
/*!***************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/global.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "isCloudflareWorkers": () => (/* binding */ isCloudflareWorkers),
/* harmony export */   "isNodeJs": () => (/* binding */ isNodeJs)
/* harmony export */ });
function getGlobal() {
    if (typeof globalThis !== 'undefined')
        return globalThis;
    if (typeof self !== 'undefined')
        return self;
    if (typeof window !== 'undefined')
        return window;
    throw new Error('unable to locate global object');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getGlobal());
function isCloudflareWorkers() {
    try {
        return getGlobal().WebSocketPair !== undefined;
    }
    catch (_a) {
        return false;
    }
}
function isNodeJs() {
    var _a, _b;
    try {
        return ((_b = (_a = getGlobal().process) === null || _a === void 0 ? void 0 : _a.versions) === null || _b === void 0 ? void 0 : _b.node) !== undefined;
    }
    catch (_c) {
        return false;
    }
}


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/is_key_like.js":
/*!********************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/is_key_like.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "types": () => (/* binding */ types)
/* harmony export */ });
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webcrypto.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/webcrypto.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((key) => {
    return (0,_webcrypto_js__WEBPACK_IMPORTED_MODULE_0__.isCryptoKey)(key);
});
const types = ['CryptoKey'];


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/key_to_jwk.js":
/*!*******************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/key_to_jwk.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webcrypto.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/webcrypto.js");
/* harmony import */ var _lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/invalid_key_input.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/invalid_key_input.js");
/* harmony import */ var _base64url_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base64url.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/base64url.js");



const keyToJWK = async (key) => {
    if (key instanceof Uint8Array) {
        return {
            kty: 'oct',
            k: (0,_base64url_js__WEBPACK_IMPORTED_MODULE_0__.encode)(key),
        };
    }
    if (!(0,_webcrypto_js__WEBPACK_IMPORTED_MODULE_1__.isCryptoKey)(key)) {
        throw new TypeError((0,_lib_invalid_key_input_js__WEBPACK_IMPORTED_MODULE_2__["default"])(key, 'CryptoKey', 'Uint8Array'));
    }
    if (!key.extractable) {
        throw new TypeError('non-extractable CryptoKey cannot be exported as a JWK');
    }
    const { ext, key_ops, alg, use, ...jwk } = await _webcrypto_js__WEBPACK_IMPORTED_MODULE_1__["default"].subtle.exportKey('jwk', key);
    return jwk;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (keyToJWK);


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/random.js":
/*!***************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/random.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webcrypto.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/webcrypto.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_webcrypto_js__WEBPACK_IMPORTED_MODULE_0__["default"].getRandomValues.bind(_webcrypto_js__WEBPACK_IMPORTED_MODULE_0__["default"]));


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/sign.js":
/*!*************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/sign.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _subtle_dsa_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./subtle_dsa.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/subtle_dsa.js");
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webcrypto.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/webcrypto.js");
/* harmony import */ var _check_key_length_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./check_key_length.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/check_key_length.js");
/* harmony import */ var _get_sign_verify_key_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get_sign_verify_key.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/get_sign_verify_key.js");




const sign = async (alg, key, data) => {
    const cryptoKey = await (0,_get_sign_verify_key_js__WEBPACK_IMPORTED_MODULE_0__["default"])(alg, key, 'sign');
    (0,_check_key_length_js__WEBPACK_IMPORTED_MODULE_1__["default"])(alg, cryptoKey);
    const signature = await _webcrypto_js__WEBPACK_IMPORTED_MODULE_2__["default"].subtle.sign((0,_subtle_dsa_js__WEBPACK_IMPORTED_MODULE_3__["default"])(alg, cryptoKey.algorithm.namedCurve), cryptoKey, data);
    return new Uint8Array(signature);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sign);


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/subtle_dsa.js":
/*!*******************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/subtle_dsa.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ subtleDsa)
/* harmony export */ });
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/global.js");
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/errors.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/util/errors.js");


function subtleDsa(alg, namedCurve) {
    const length = parseInt(alg.substr(-3), 10);
    switch (alg) {
        case 'HS256':
        case 'HS384':
        case 'HS512':
            return { hash: `SHA-${length}`, name: 'HMAC' };
        case 'PS256':
        case 'PS384':
        case 'PS512':
            return { hash: `SHA-${length}`, name: 'RSA-PSS', saltLength: length >> 3 };
        case 'RS256':
        case 'RS384':
        case 'RS512':
            return { hash: `SHA-${length}`, name: 'RSASSA-PKCS1-v1_5' };
        case 'ES256':
        case 'ES384':
        case 'ES512':
            return { hash: `SHA-${length}`, name: 'ECDSA', namedCurve };
        case ((0,_global_js__WEBPACK_IMPORTED_MODULE_0__.isCloudflareWorkers)() || (0,_global_js__WEBPACK_IMPORTED_MODULE_0__.isNodeJs)()) && 'EdDSA':
            return { name: namedCurve, namedCurve };
        default:
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
}


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/webcrypto.js":
/*!******************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/webcrypto.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "isCryptoKey": () => (/* binding */ isCryptoKey)
/* harmony export */ });
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/global.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_global_js__WEBPACK_IMPORTED_MODULE_0__["default"].crypto);
function isCryptoKey(key) {
    if (typeof _global_js__WEBPACK_IMPORTED_MODULE_0__["default"].CryptoKey === 'undefined') {
        return false;
    }
    return key != null && key instanceof _global_js__WEBPACK_IMPORTED_MODULE_0__["default"].CryptoKey;
}


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/util/base64url.js":
/*!***************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/util/base64url.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "encode": () => (/* binding */ encode),
/* harmony export */   "decode": () => (/* binding */ decode)
/* harmony export */ });
/* harmony import */ var _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../runtime/base64url.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/base64url.js");

const encode = _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_0__.encode;
const decode = _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_0__.decode;


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/util/errors.js":
/*!************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/util/errors.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JOSEError": () => (/* binding */ JOSEError),
/* harmony export */   "JWTClaimValidationFailed": () => (/* binding */ JWTClaimValidationFailed),
/* harmony export */   "JWTExpired": () => (/* binding */ JWTExpired),
/* harmony export */   "JOSEAlgNotAllowed": () => (/* binding */ JOSEAlgNotAllowed),
/* harmony export */   "JOSENotSupported": () => (/* binding */ JOSENotSupported),
/* harmony export */   "JWEDecryptionFailed": () => (/* binding */ JWEDecryptionFailed),
/* harmony export */   "JWEInvalid": () => (/* binding */ JWEInvalid),
/* harmony export */   "JWSInvalid": () => (/* binding */ JWSInvalid),
/* harmony export */   "JWTInvalid": () => (/* binding */ JWTInvalid),
/* harmony export */   "JWKInvalid": () => (/* binding */ JWKInvalid),
/* harmony export */   "JWKSInvalid": () => (/* binding */ JWKSInvalid),
/* harmony export */   "JWKSNoMatchingKey": () => (/* binding */ JWKSNoMatchingKey),
/* harmony export */   "JWKSMultipleMatchingKeys": () => (/* binding */ JWKSMultipleMatchingKeys),
/* harmony export */   "JWKSTimeout": () => (/* binding */ JWKSTimeout),
/* harmony export */   "JWSSignatureVerificationFailed": () => (/* binding */ JWSSignatureVerificationFailed)
/* harmony export */ });
class JOSEError extends Error {
    constructor(message) {
        var _a;
        super(message);
        this.code = 'ERR_JOSE_GENERIC';
        this.name = this.constructor.name;
        (_a = Error.captureStackTrace) === null || _a === void 0 ? void 0 : _a.call(Error, this, this.constructor);
    }
    static get code() {
        return 'ERR_JOSE_GENERIC';
    }
}
class JWTClaimValidationFailed extends JOSEError {
    constructor(message, claim = 'unspecified', reason = 'unspecified') {
        super(message);
        this.code = 'ERR_JWT_CLAIM_VALIDATION_FAILED';
        this.claim = claim;
        this.reason = reason;
    }
    static get code() {
        return 'ERR_JWT_CLAIM_VALIDATION_FAILED';
    }
}
class JWTExpired extends JOSEError {
    constructor(message, claim = 'unspecified', reason = 'unspecified') {
        super(message);
        this.code = 'ERR_JWT_EXPIRED';
        this.claim = claim;
        this.reason = reason;
    }
    static get code() {
        return 'ERR_JWT_EXPIRED';
    }
}
class JOSEAlgNotAllowed extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JOSE_ALG_NOT_ALLOWED';
    }
    static get code() {
        return 'ERR_JOSE_ALG_NOT_ALLOWED';
    }
}
class JOSENotSupported extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JOSE_NOT_SUPPORTED';
    }
    static get code() {
        return 'ERR_JOSE_NOT_SUPPORTED';
    }
}
class JWEDecryptionFailed extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWE_DECRYPTION_FAILED';
        this.message = 'decryption operation failed';
    }
    static get code() {
        return 'ERR_JWE_DECRYPTION_FAILED';
    }
}
class JWEInvalid extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWE_INVALID';
    }
    static get code() {
        return 'ERR_JWE_INVALID';
    }
}
class JWSInvalid extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWS_INVALID';
    }
    static get code() {
        return 'ERR_JWS_INVALID';
    }
}
class JWTInvalid extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWT_INVALID';
    }
    static get code() {
        return 'ERR_JWT_INVALID';
    }
}
class JWKInvalid extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWK_INVALID';
    }
    static get code() {
        return 'ERR_JWK_INVALID';
    }
}
class JWKSInvalid extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWKS_INVALID';
    }
    static get code() {
        return 'ERR_JWKS_INVALID';
    }
}
class JWKSNoMatchingKey extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWKS_NO_MATCHING_KEY';
        this.message = 'no applicable key found in the JSON Web Key Set';
    }
    static get code() {
        return 'ERR_JWKS_NO_MATCHING_KEY';
    }
}
class JWKSMultipleMatchingKeys extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWKS_MULTIPLE_MATCHING_KEYS';
        this.message = 'multiple matching keys found in the JSON Web Key Set';
    }
    static get code() {
        return 'ERR_JWKS_MULTIPLE_MATCHING_KEYS';
    }
}
class JWKSTimeout extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWKS_TIMEOUT';
        this.message = 'request timed out';
    }
    static get code() {
        return 'ERR_JWKS_TIMEOUT';
    }
}
class JWSSignatureVerificationFailed extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';
        this.message = 'signature verification failed';
    }
    static get code() {
        return 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';
    }
}


/***/ }),

/***/ "./node_modules/idb-keyval/dist/index.js":
/*!***********************************************!*\
  !*** ./node_modules/idb-keyval/dist/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clear": () => (/* binding */ clear),
/* harmony export */   "createStore": () => (/* binding */ createStore),
/* harmony export */   "del": () => (/* binding */ del),
/* harmony export */   "delMany": () => (/* binding */ delMany),
/* harmony export */   "entries": () => (/* binding */ entries),
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "getMany": () => (/* binding */ getMany),
/* harmony export */   "keys": () => (/* binding */ keys),
/* harmony export */   "promisifyRequest": () => (/* binding */ promisifyRequest),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "setMany": () => (/* binding */ setMany),
/* harmony export */   "update": () => (/* binding */ update),
/* harmony export */   "values": () => (/* binding */ values)
/* harmony export */ });
/* harmony import */ var safari_14_idb_fix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! safari-14-idb-fix */ "./node_modules/safari-14-idb-fix/dist/index.js");


function promisifyRequest(request) {
    return new Promise((resolve, reject) => {
        // @ts-ignore - file size hacks
        request.oncomplete = request.onsuccess = () => resolve(request.result);
        // @ts-ignore - file size hacks
        request.onabort = request.onerror = () => reject(request.error);
    });
}
function createStore(dbName, storeName) {
    const dbp = (0,safari_14_idb_fix__WEBPACK_IMPORTED_MODULE_0__["default"])().then(() => {
        const request = indexedDB.open(dbName);
        request.onupgradeneeded = () => request.result.createObjectStore(storeName);
        return promisifyRequest(request);
    });
    return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
let defaultGetStoreFunc;
function defaultGetStore() {
    if (!defaultGetStoreFunc) {
        defaultGetStoreFunc = createStore('keyval-store', 'keyval');
    }
    return defaultGetStoreFunc;
}
/**
 * Get a value by its key.
 *
 * @param key
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function get(key, customStore = defaultGetStore()) {
    return customStore('readonly', (store) => promisifyRequest(store.get(key)));
}
/**
 * Set a value with a key.
 *
 * @param key
 * @param value
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function set(key, value, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.put(value, key);
        return promisifyRequest(store.transaction);
    });
}
/**
 * Set multiple values at once. This is faster than calling set() multiple times.
 * It's also atomic – if one of the pairs can't be added, none will be added.
 *
 * @param entries Array of entries, where each entry is an array of `[key, value]`.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function setMany(entries, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        entries.forEach((entry) => store.put(entry[1], entry[0]));
        return promisifyRequest(store.transaction);
    });
}
/**
 * Get multiple values by their keys
 *
 * @param keys
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function getMany(keys, customStore = defaultGetStore()) {
    return customStore('readonly', (store) => Promise.all(keys.map((key) => promisifyRequest(store.get(key)))));
}
/**
 * Update a value. This lets you see the old value and update it as an atomic operation.
 *
 * @param key
 * @param updater A callback that takes the old value and returns a new value.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function update(key, updater, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => 
    // Need to create the promise manually.
    // If I try to chain promises, the transaction closes in browsers
    // that use a promise polyfill (IE10/11).
    new Promise((resolve, reject) => {
        store.get(key).onsuccess = function () {
            try {
                store.put(updater(this.result), key);
                resolve(promisifyRequest(store.transaction));
            }
            catch (err) {
                reject(err);
            }
        };
    }));
}
/**
 * Delete a particular key from the store.
 *
 * @param key
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function del(key, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.delete(key);
        return promisifyRequest(store.transaction);
    });
}
/**
 * Delete multiple keys at once.
 *
 * @param keys List of keys to delete.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function delMany(keys, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        keys.forEach((key) => store.delete(key));
        return promisifyRequest(store.transaction);
    });
}
/**
 * Clear all values in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function clear(customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.clear();
        return promisifyRequest(store.transaction);
    });
}
function eachCursor(customStore, callback) {
    return customStore('readonly', (store) => {
        // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
        // And openKeyCursor isn't supported by Safari.
        store.openCursor().onsuccess = function () {
            if (!this.result)
                return;
            callback(this.result);
            this.result.continue();
        };
        return promisifyRequest(store.transaction);
    });
}
/**
 * Get all keys in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function keys(customStore = defaultGetStore()) {
    const items = [];
    return eachCursor(customStore, (cursor) => items.push(cursor.key)).then(() => items);
}
/**
 * Get all values in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function values(customStore = defaultGetStore()) {
    const items = [];
    return eachCursor(customStore, (cursor) => items.push(cursor.value)).then(() => items);
}
/**
 * Get all entries in the store. Each entry is an array of `[key, value]`.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function entries(customStore = defaultGetStore()) {
    const items = [];
    return eachCursor(customStore, (cursor) => items.push([cursor.key, cursor.value])).then(() => items);
}




/***/ }),

/***/ "./node_modules/safari-14-idb-fix/dist/index.js":
/*!******************************************************!*\
  !*** ./node_modules/safari-14-idb-fix/dist/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Work around Safari 14 IndexedDB open bug.
 *
 * Safari has a horrible bug where IDB requests can hang while the browser is starting up. https://bugs.webkit.org/show_bug.cgi?id=226547
 * The only solution is to keep nudging it until it's awake.
 */
function idbReady() {
    var isSafari = !navigator.userAgentData &&
        /Safari\//.test(navigator.userAgent) &&
        !/Chrom(e|ium)\//.test(navigator.userAgent);
    // No point putting other browsers or older versions of Safari through this mess.
    if (!isSafari || !indexedDB.databases)
        return Promise.resolve();
    var intervalId;
    return new Promise(function (resolve) {
        var tryIdb = function () { return indexedDB.databases().finally(resolve); };
        intervalId = setInterval(tryIdb, 100);
        tryIdb();
    }).finally(function () { return clearInterval(intervalId); });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (idbReady);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./lib/an-loader.mjs ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var base64_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js");
/* harmony import */ var idb_keyval__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! idb-keyval */ "./node_modules/idb-keyval/dist/index.js");
/* harmony import */ var _node_modules_allnetp2p_an_broker_dist_an_broker_js_raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/@allnetp2p/an-broker/dist/an-broker.js?raw */ "../an-broker/dist/an-broker.js?raw");
/* harmony import */ var _allnetp2p_an_identity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @allnetp2p/an-identity */ "../an-identity/lib/an-identity.mjs");





(async () => {
  const identityConfig = new _allnetp2p_an_identity__WEBPACK_IMPORTED_MODULE_2__.AnIdentityConfig()
  const identity = await _allnetp2p_an_identity__WEBPACK_IMPORTED_MODULE_2__.AnIdentity.createAnIdentity(identityConfig)
  console.log('@@-loader-@@ - identity: ', identity)

  console.log('@@-loader-@@ - broker source: ', _node_modules_allnetp2p_an_broker_dist_an_broker_js_raw__WEBPACK_IMPORTED_MODULE_1__)

  const brokerBlob = new Blob(
    [_node_modules_allnetp2p_an_broker_dist_an_broker_js_raw__WEBPACK_IMPORTED_MODULE_1__],
    { type: 'application/javascript' }
  )

  console.log('@@-loader-@@ - broker blob: ', brokerBlob)

  const brokerUrl = URL.createObjectURL(brokerBlob)

  console.log('@@-loader-@@ - broker url: ', brokerUrl)

  const brokerWorker = new Worker(brokerUrl)

  URL.revokeObjectURL(brokerUrl)

  console.log('@@-loader-@@ - broker worker: ', brokerWorker)

  brokerWorker.onmessage = evt => {
    const data = evt.data
    if (data.type === 'registerModule') {
      brokerWorker.postMessage({
        dir: 'res',
        msgId: data.msgId
      })
    } else {
      brokerWorker.postMessage({
        dir: 'res',
        msgId: data.msgId,
        error: 'unhandled req type: ' + data.type
      })
    }
    // console.log('@@-loader-@@ - broker message: ', evt.data)
  }

  // brokerWorker.postMessage('test-message-from-an-loader')

  const passphrase = await getUserPassphrase()
  const signKeypair = await loadOrGenerateSignatureKeypair(passphrase)

  console.log('SIGN KEYPAIR IDENTITY', signKeypair)

  setTimeout(() => {
    throw new Error('can debug?')
  }, 1000)
})().then(() => {}, err => {
  console.error(err)
})

/**
 * This is a stub right now that just returns the passphrase
 * 'passphrase' : )
 */
async function getUserPassphrase () {
  const passphraseRaw = (new TextEncoder()).encode('passphrase')

  console.log('@@-loader-@@ - passphraseRaw: ', passphraseRaw)

  const passphrase = await crypto.subtle.importKey(
    'raw',
    passphraseRaw.buffer,
    'PBKDF2',
    false,
    ['deriveKey']
  )

  console.log('@@-loader-@@ - passphrase: ', passphrase)

  return passphrase
}

/**
 * Generate, encrypt, store, and return a new signature keypair.
 */
async function generateNewSignatureKeypair (passphrase) {
  const signCurve = 'P-384'
  const pbkdf2HashAlgo = 'SHA-512'
  const pbkdf2Iterations = 200000

  const signKeypair = await crypto.subtle.generateKey(
    {
      name: 'ECDSA',
      namedCurve: signCurve
    },
    true,
    ['sign', 'verify']
  )

  console.log('@@-loader-@@ - signKeypair: ', signKeypair)

  const pbkdf2Salt = crypto.getRandomValues(new Uint8Array(24))

  const pbkdf2start = Date.now()
  const secretKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      hash: pbkdf2HashAlgo,
      salt: pbkdf2Salt,
      iterations: pbkdf2Iterations
    },
    passphrase,
    {
      name: 'AES-GCM',
      length: 8 * 32
    },
    false,
    ['wrapKey', 'unwrapKey']
  )
  const pbkdf2end = Date.now()

  console.log(
    '@@-loader-@@ - secretKey (in',
    pbkdf2end - pbkdf2start,
    'ms): ',
    secretKey
  )

  const aesGcmIv = crypto.getRandomValues(new Uint8Array(24))

  const savePrivKey = await crypto.subtle.wrapKey(
    'jwk',
    signKeypair.privateKey,
    secretKey,
    {
      name: 'AES-GCM',
      iv: aesGcmIv,
      tagLength: 128
    }
  )

  console.log('@@-loader-@@ - savePrivKey: ', savePrivKey)

  const savePubKey = await crypto.subtle.exportKey(
    'jwk',
    signKeypair.publicKey
  )

  console.log('@@-loader-@@ - savePubKey: ', savePubKey)

  const signKeypairEnc = {
    pbkdf2HashAlgo,
    pbkdf2Iterations,
    pbkdf2Salt: base64_js__WEBPACK_IMPORTED_MODULE_0__.fromByteArray(pbkdf2Salt),
    aesGcmIv: base64_js__WEBPACK_IMPORTED_MODULE_0__.fromByteArray(aesGcmIv),
    privateKey: base64_js__WEBPACK_IMPORTED_MODULE_0__.fromByteArray(new Uint8Array(savePrivKey)),
    publicKey: savePubKey
  }

  console.log('@@-loader-@@ - signKeypairEnc: ', signKeypairEnc)

  await idb_keyval__WEBPACK_IMPORTED_MODULE_3__.set('signKeypair', signKeypairEnc)

  return {
    privateKey: signKeypair.privateKey,
    publicKey: signKeypair.publicKey,
    publicKeyJwk: signKeypairEnc.publicKey
  }
}

/**
 * Load or generate a new signature keypair.
 */
async function loadOrGenerateSignatureKeypair (passphrase) {
  const signCurve = 'P-384'

  const signKeypairEnc = await (async () => {
    try {
      return await idb_keyval__WEBPACK_IMPORTED_MODULE_3__.get('signKeypair')
    } catch {
      return null
    }
  })()

  if (!signKeypairEnc) {
    console.log('@@-loader-@@ - no keypair in db, GENERATING NEW')
    return await generateNewSignatureKeypair(passphrase)
  }

  console.log('@@-loader-@@ - loaded stored keypair: ', signKeypairEnc)

  const pbkdf2Salt = base64_js__WEBPACK_IMPORTED_MODULE_0__.toByteArray(signKeypairEnc.pbkdf2Salt)

  const pbkdf2start = Date.now()
  const secretKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      hash: signKeypairEnc.pbkdf2HashAlgo,
      salt: pbkdf2Salt,
      iterations: signKeypairEnc.pbkdf2Iterations
    },
    passphrase,
    {
      name: 'AES-GCM',
      length: 8 * 32
    },
    false,
    ['wrapKey', 'unwrapKey']
  )

  const pbkdf2end = Date.now()

  console.log(
    '@@-loader-@@ - secretKey (in',
    pbkdf2end - pbkdf2start,
    'ms): ',
    secretKey
  )

  const aesGcmIv = base64_js__WEBPACK_IMPORTED_MODULE_0__.toByteArray(signKeypairEnc.aesGcmIv)

  const signPrivKey = await crypto.subtle.unwrapKey(
    'jwk',
    base64_js__WEBPACK_IMPORTED_MODULE_0__.toByteArray(signKeypairEnc.privateKey),
    secretKey,
    {
      name: 'AES-GCM',
      iv: aesGcmIv,
      tagLength: 128
    },
    {
      name: 'ECDSA',
      namedCurve: signCurve
    },
    true,
    ['sign']
  )

  console.log('@@-loader-@@ - signPrivKey: ', signPrivKey)

  const signPubKey = await crypto.subtle.importKey(
    'jwk',
    signKeypairEnc.publicKey,
    {
      name: 'ECDSA',
      namedCurve: signCurve
    },
    true,
    ['verify']
  )

  return {
    privateKey: signPrivKey,
    publicKey: signPubKey,
    publicKeyJwk: signKeypairEnc.publicKey
  }
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsSjBDOztBQUUxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGdCQUFnQiw2REFBUztBQUN6QjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUV5SDs7Ozs7Ozs7Ozs7Ozs7O0FDekt6SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBLEtBQUssd0JBQXdCLG1DQUFtQztBQUNoRTs7QUFFQSxpRUFBZSxRQUFRLEVBQUM7Ozs7Ozs7VUNyQnhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNObUM7QUFDQTtBQUNrRDtBQUNoQjs7QUFFckU7QUFDQSw2QkFBNkIsb0VBQWdCO0FBQzdDLHlCQUF5QiwrRUFBMkI7QUFDcEQ7O0FBRUEsZ0RBQWdELG9GQUFZOztBQUU1RDtBQUNBLEtBQUssb0ZBQVk7QUFDakIsTUFBTTtBQUNOOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDLGlCQUFpQjtBQUNsQjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isb0RBQW9CO0FBQ3BDLGNBQWMsb0RBQW9CO0FBQ2xDLGdCQUFnQixvREFBb0I7QUFDcEM7QUFDQTs7QUFFQTs7QUFFQSxRQUFRLDJDQUFTOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLDJDQUFTO0FBQzVCLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxxQkFBcUIsa0RBQWtCOztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixrREFBa0I7O0FBRXJDO0FBQ0E7QUFDQSxJQUFJLGtEQUFrQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbGliL2FuLWlkZW50aXR5Lm1qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2p3ay90aHVtYnByaW50LmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvandzL2ZsYXR0ZW5lZC9zaWduLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvandzL2dlbmVyYWwvc2lnbi5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2tleS9leHBvcnQuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9rZXkvZ2VuZXJhdGVfa2V5X3BhaXIuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9saWIvYnVmZmVyX3V0aWxzLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvbGliL2NoZWNrX2tleV90eXBlLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvbGliL2NyeXB0b19rZXkuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9saWIvZm9ybWF0X3BlbS5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2xpYi9pbnZhbGlkX2tleV9pbnB1dC5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2xpYi9pc19kaXNqb2ludC5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2xpYi9pc19vYmplY3QuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9saWIvdmFsaWRhdGVfY3JpdC5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL3J1bnRpbWUvYXNuMS5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL3J1bnRpbWUvYmFzZTY0dXJsLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvcnVudGltZS9jaGVja19rZXlfbGVuZ3RoLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvcnVudGltZS9kaWdlc3QuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9ydW50aW1lL2dlbmVyYXRlLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvcnVudGltZS9nZXRfc2lnbl92ZXJpZnlfa2V5LmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvcnVudGltZS9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9ydW50aW1lL2lzX2tleV9saWtlLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvcnVudGltZS9rZXlfdG9fandrLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvcnVudGltZS9yYW5kb20uanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9ydW50aW1lL3NpZ24uanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9ydW50aW1lL3N1YnRsZV9kc2EuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9ydW50aW1lL3dlYmNyeXB0by5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL3V0aWwvYmFzZTY0dXJsLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvdXRpbC9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi9ub2RlX21vZHVsZXMvaWRiLWtleXZhbC9kaXN0L2luZGV4LmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4vbm9kZV9tb2R1bGVzL3NhZmFyaS0xNC1pZGItZml4L2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uL2xpYi9hbi1sb2FkZXIubWpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5leHBvcnRzLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5leHBvcnRzLnRvQnl0ZUFycmF5ID0gdG9CeXRlQXJyYXlcbmV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IGZyb21CeXRlQXJyYXlcblxudmFyIGxvb2t1cCA9IFtdXG52YXIgcmV2TG9va3VwID0gW11cbnZhciBBcnIgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBVaW50OEFycmF5IDogQXJyYXlcblxudmFyIGNvZGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLydcbmZvciAodmFyIGkgPSAwLCBsZW4gPSBjb2RlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gIGxvb2t1cFtpXSA9IGNvZGVbaV1cbiAgcmV2TG9va3VwW2NvZGUuY2hhckNvZGVBdChpKV0gPSBpXG59XG5cbi8vIFN1cHBvcnQgZGVjb2RpbmcgVVJMLXNhZmUgYmFzZTY0IHN0cmluZ3MsIGFzIE5vZGUuanMgZG9lcy5cbi8vIFNlZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmFzZTY0I1VSTF9hcHBsaWNhdGlvbnNcbnJldkxvb2t1cFsnLScuY2hhckNvZGVBdCgwKV0gPSA2MlxucmV2TG9va3VwWydfJy5jaGFyQ29kZUF0KDApXSA9IDYzXG5cbmZ1bmN0aW9uIGdldExlbnMgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyBUcmltIG9mZiBleHRyYSBieXRlcyBhZnRlciBwbGFjZWhvbGRlciBieXRlcyBhcmUgZm91bmRcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vYmVhdGdhbW1pdC9iYXNlNjQtanMvaXNzdWVzLzQyXG4gIHZhciB2YWxpZExlbiA9IGI2NC5pbmRleE9mKCc9JylcbiAgaWYgKHZhbGlkTGVuID09PSAtMSkgdmFsaWRMZW4gPSBsZW5cblxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gdmFsaWRMZW4gPT09IGxlblxuICAgID8gMFxuICAgIDogNCAtICh2YWxpZExlbiAlIDQpXG5cbiAgcmV0dXJuIFt2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuXVxufVxuXG4vLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKGI2NCkge1xuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiBfYnl0ZUxlbmd0aCAoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSB7XG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiB0b0J5dGVBcnJheSAoYjY0KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuXG4gIHZhciBhcnIgPSBuZXcgQXJyKF9ieXRlTGVuZ3RoKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikpXG5cbiAgdmFyIGN1ckJ5dGUgPSAwXG5cbiAgLy8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuICB2YXIgbGVuID0gcGxhY2VIb2xkZXJzTGVuID4gMFxuICAgID8gdmFsaWRMZW4gLSA0XG4gICAgOiB2YWxpZExlblxuXG4gIHZhciBpXG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxOCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDEyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfFxuICAgICAgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAzKV1cbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gMTYpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDIpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAxKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDEwKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgNCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDEyICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gNiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID1cbiAgICAgICgodWludDhbaV0gPDwgMTYpICYgMHhGRjAwMDApICtcbiAgICAgICgodWludDhbaSArIDFdIDw8IDgpICYgMHhGRjAwKSArXG4gICAgICAodWludDhbaSArIDJdICYgMHhGRilcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayh1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDJdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl0gK1xuICAgICAgJz09J1xuICAgIClcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgdG1wID0gKHVpbnQ4W2xlbiAtIDJdIDw8IDgpICsgdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAxMF0gK1xuICAgICAgbG9va3VwWyh0bXAgPj4gNCkgJiAweDNGXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCAyKSAmIDB4M0ZdICtcbiAgICAgICc9J1xuICAgIClcbiAgfVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuIiwiaW1wb3J0IHtcbiAgYmFzZTY0dXJsLFxuICBjYWxjdWxhdGVKd2tUaHVtYnByaW50LFxuICBHZW5lcmFsU2lnbixcbiAgZXhwb3J0SldLLFxuICBnZW5lcmF0ZUtleVBhaXJcbn0gZnJvbSAnam9zZS1icm93c2VyLXJ1bnRpbWUnXG5cbi8qKlxuICogQW5JZGVudGl0eSBBbGdvcml0aG0gVHVuaW5nLlxuICogSWYgeW91J3JlIG5vdCBzdXJlIHdoYXQgeW91J3JlIGRvaW5nLCBqdXN0IGNyZWF0ZSBhIGRlZmF1bHQgY29uZmlnLlxuICovXG5leHBvcnQgY2xhc3MgQW5JZGVudGl0eUNvbmZpZyB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICAvLyBqd3MgYWxnIGFycmF5XG4gICAgdGhpcy5zaWduYXR1cmVBbGdMaXN0ID0gWydFUzM4NCddXG5cbiAgICAvLyBqd2UgYWxnOmVuYyBhcnJheVxuICAgIHRoaXMuZW5jcnlwdGlvbkFsZ0xpc3QgPSBbJ0VDREgtRVM6QTI1NkdDTSddXG5cbiAgICAvLyBjcnlwdG8uc3VidGxlIGRlcml2ZUtleSBhbGcgKyBjb2xvbiBkZWxpbWl0ZWQgY29uZmlnXG4gICAgdGhpcy5wYXNzcGhyYXNlU2VjcmV0QWxnID0gJ1BCS0RGMjpTSEEtNTEyOjIwMDAwMCdcblxuICAgIC8vIGNyeXB0by5zdWJ0bGUgd3JhcEtleSBhbGcgKyBjb2xvbiBkZWxpbWl0ZWQgY29uZmlnXG4gICAgdGhpcy5wYXNzcGhyYXNlU3ltQWxnID0gJ0FFUy1HQ006MjU2J1xuXG4gICAgLy8gbWlsbGlzZWNvbmRzIGluIHRoZSBmdXR1cmUgdG8gc2V0IG5ldyBpZGVudGl0eSBleHBpcmF0aW9uc1xuICAgIHRoaXMuZXhwaXJlQWZ0ZXJDb3VudE1zID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJcblxuICAgIC8vIGZ1bmN0aW9uIHJldHVybmluZyBQcm9taXNlPENyeXB0b0tleT4gbWFya2VkIHdpdGggZGVyaXZlS2V5XG4gICAgdGhpcy5wYXNzcGhyYXNlR2V0Q2IgPSBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwYXNzcGhyYXNlID0gd2luZG93LnByb21wdCgnRW50ZXIgeW91ciBwYXNzcGhyYXNlIC0gdGhpcyBpcyB0aGUgZGVmYXVsdCBERVYgcGFzc3dvcmQgZmV0Y2hlciB1c2luZyB3aW5kb3cucHJvbXB0Li4uIHRoZXJlIGlzIG5vIHdheSB0byBvYnNjdXJlIHRoZSBlbnRlcmVkIHBhc3NwaHJhc2UsIHlvdSBzaG91bGQgTk9UIHVzZSB0aGlzIGluIFBST0RVQ1RJT04hIE9uY2UgdGhpcyBpcyBtYXNrZWQsIHdlIGhpZ2hseSByZWNvbW1lbmQgdXNpbmcgYSBwYXNzd29yZCBtYW5hZ2VyIHRvIG1hbmFnZSB0aGlzIHBhc3NwaHJhc2UuJywgJycpXG4gICAgICBjb25zdCBwYXNzcGhyYXNlUmF3ID0gKG5ldyBUZXh0RW5jb2RlcigpKS5lbmNvZGUocGFzc3BocmFzZSlcbiAgICAgIGNvbnN0IHBhc3NwaHJhc2VLZXkgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmltcG9ydEtleShcbiAgICAgICAgJ3JhdycsXG4gICAgICAgIHBhc3NwaHJhc2VSYXcuYnVmZmVyLFxuICAgICAgICAnUEJLREYyJyxcbiAgICAgICAgZmFsc2UsXG4gICAgICAgIFsnZGVyaXZlS2V5J11cbiAgICAgIClcbiAgICAgIHJldHVybiBwYXNzcGhyYXNlS2V5XG4gICAgfVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9sb2FkSWRlbnQgKHBhc3NwaHJhc2VLZXkpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCd1bmltcGxlbWVudGVkJylcbn1cblxuYXN5bmMgZnVuY3Rpb24gX2dlbklkZW50IChjb25maWcsIHBhc3NwaHJhc2VLZXkpIHtcbiAgaWYgKGNvbmZpZy5wYXNzcGhyYXNlU2VjcmV0QWxnLnN0YXJ0c1dpdGgoJ1BCS0RGMjonKSkge1xuICAgIGNvbnN0IGFsZ1BhcnRzID0gY29uZmlnLnBhc3NwaHJhc2VTZWNyZXRBbGcuc3BsaXQoJzonKVxuICAgIGNvbnN0IGhhc2ggPSBhbGdQYXJ0c1sxXVxuICAgIGNvbnN0IGl0ZXJzID0gcGFyc2VJbnQoYWxnUGFydHNbMl0sIDEwKVxuXG4gICAgbGV0IGVuY3J5cHRQcml2S2V5ID0gbnVsbFxuXG4gICAgaWYgKGNvbmZpZy5wYXNzcGhyYXNlU3ltQWxnLnN0YXJ0c1dpdGgoJ0FFUy1HQ006JykpIHtcbiAgICAgIGNvbnN0IFthbGcsIGxlbmd0aF0gPSBjb25maWcucGFzc3BocmFzZVN5bUFsZy5zcGxpdCgnOicpXG5cbiAgICAgIGNvbnN0IHBia2RmMlNhbHQgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDI0KSlcbiAgICAgIGNvbnN0IHNlY3JldEtleSA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuZGVyaXZlS2V5KFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ1BCS0RGMicsXG4gICAgICAgICAgaGFzaCxcbiAgICAgICAgICBzYWx0OiBwYmtkZjJTYWx0LFxuICAgICAgICAgIGl0ZXJhdGlvbnM6IGl0ZXJzXG4gICAgICAgIH0sXG4gICAgICAgIHBhc3NwaHJhc2VLZXksXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBhbGcsXG4gICAgICAgICAgbGVuZ3RoOiBwYXJzZUludChsZW5ndGgsIDEwKVxuICAgICAgICB9LFxuICAgICAgICBmYWxzZSxcbiAgICAgICAgWyd3cmFwS2V5J11cbiAgICAgIClcblxuICAgICAgLy8gam9zZS9qdyogdG9vbHMgZG9uJ3QgaGF2ZSBhbnkgc3VwcG9ydCBmb3IgcGFzc3dvcmQgaGFzaGluZ1xuICAgICAgLy8gbm9yIHRoZSBhYmlsaXR5IHRvIGVuY3J5cHQgcHJpdmF0ZSBrZXlzIHdpdGhvdXQgZXhwb3NpbmdcbiAgICAgIC8vIHRoZW0gdG8gdW5zYWZlIGphdmFzY3JpcHQgcnVudGltZSBtZW1vcnksIHNvIHdlJ2xsXG4gICAgICAvLyB1c2UgY3J5cHRvLnN1YnRsZSBkaXJlY3RseSBmb3IgcGVyc2lzdGluZyB0aGUgcHJpdmF0ZSBrZXlzLlxuICAgICAgZW5jcnlwdFByaXZLZXkgPSBhc3luYyBwcml2YXRlS2V5ID0+IHtcbiAgICAgICAgY29uc3QgYWVzR2NtSXYgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDI0KSlcbiAgICAgICAgY29uc3Qgc2F2ZVByaXZLZXkgPSBhd2FpdCBjcnlwdG8uc3VidGxlLndyYXBLZXkoXG4gICAgICAgICAgJ2p3aycsXG4gICAgICAgICAgcHJpdmF0ZUtleSxcbiAgICAgICAgICBzZWNyZXRLZXksXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogYWxnLFxuICAgICAgICAgICAgaXY6IGFlc0djbUl2LFxuICAgICAgICAgICAgdGFnTGVuZ3RoOiAxMjhcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwYXNzcGhyYXNlU2VjcmV0QWxnOiBjb25maWcucGFzc3BocmFzZVNlY3JldEFsZyxcbiAgICAgICAgICBwYXNzcGhyYXNlU2VjcmV0T3B0czoge1xuICAgICAgICAgICAgc2FsdDogYmFzZTY0dXJsLmVuY29kZShwYmtkZjJTYWx0KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcGFzc3BocmFzZVN5bUFsZzogY29uZmlnLnBhc3NwaHJhc2VTeW1BbGcsXG4gICAgICAgICAgcGFzc3BocmFzZVN5bU9wdHM6IHtcbiAgICAgICAgICAgIGl2OiBiYXNlNjR1cmwuZW5jb2RlKGFlc0djbUl2KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcHJpdmF0ZUtleTogYmFzZTY0dXJsLmVuY29kZShuZXcgVWludDhBcnJheShzYXZlUHJpdktleSkpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBwYXNzcGhyYXNlU3ltQWxnOiBcIicgKyBjb25maWcucGFzc3BocmFzZVN5bUFsZyArICdcIicpXG4gICAgfVxuXG4gICAgbGV0IGV4cGlyZXNBdFV0Y01zID0gRGF0ZS5ub3coKSArIGNvbmZpZy5leHBpcmVBZnRlckNvdW50TXNcbiAgICBpZiAoZXhwaXJlc0F0VXRjTXMgPiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUikge1xuICAgICAgZXhwaXJlc0F0VXRjTXMgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxuICAgIH1cblxuICAgIGNvbnN0IGZ1bGxJZGVudGl0eSA9IHtcbiAgICAgIGV4cGlyZXNBdFV0Y01zLFxuICAgICAgZW5jOiBbXSxcbiAgICAgIHNpZzogW10sXG4gICAgICBzaWdCeXRlczogJydcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGVuY0RlZiBvZiBjb25maWcuZW5jcnlwdGlvbkFsZ0xpc3QpIHtcbiAgICAgIGNvbnN0IFthbGcsIGVuY10gPSBlbmNEZWYuc3BsaXQoJzonKVxuICAgICAgY29uc3QgcGFpciA9IGF3YWl0IGdlbmVyYXRlS2V5UGFpcihhbGcsIHsgZXh0cmFjdGFibGU6IHRydWUgfSlcblxuICAgICAgY29uc3QgcHVibGljS2V5SndrID0gYXdhaXQgZXhwb3J0SldLKHBhaXIucHVibGljS2V5KVxuICAgICAgY29uc3QgcHVibGljVGh1bWJwcmludCA9IGF3YWl0IGNhbGN1bGF0ZUp3a1RodW1icHJpbnQocHVibGljS2V5SndrKVxuICAgICAgY29uc3QgZW5jcnlwdGVkUHJpdmF0ZUtleSA9IGF3YWl0IGVuY3J5cHRQcml2S2V5KHBhaXIucHJpdmF0ZUtleSlcblxuICAgICAgZnVsbElkZW50aXR5LmVuYy5wdXNoKHtcbiAgICAgICAgYWxnLFxuICAgICAgICBlbmMsXG4gICAgICAgIGp3azogcHVibGljS2V5SndrLFxuICAgICAgICBpZDogcHVibGljVGh1bWJwcmludCxcbiAgICAgICAgX3ByaXY6IHtcbiAgICAgICAgICBwdWJsaWNLZXk6IHBhaXIucHVibGljS2V5LFxuICAgICAgICAgIHByaXZhdGVLZXk6IHBhaXIucHJpdmF0ZUtleSxcbiAgICAgICAgICBlbmNyeXB0ZWRQcml2YXRlS2V5XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBzaWdBbGcgb2YgY29uZmlnLnNpZ25hdHVyZUFsZ0xpc3QpIHtcbiAgICAgIGNvbnN0IHBhaXIgPSBhd2FpdCBnZW5lcmF0ZUtleVBhaXIoc2lnQWxnLCB7IGV4dHJhY3RhYmxlOiB0cnVlIH0pXG5cbiAgICAgIGNvbnN0IHB1YmxpY0tleUp3ayA9IGF3YWl0IGV4cG9ydEpXSyhwYWlyLnB1YmxpY0tleSlcbiAgICAgIGNvbnN0IHB1YmxpY1RodW1icHJpbnQgPSBhd2FpdCBjYWxjdWxhdGVKd2tUaHVtYnByaW50KHB1YmxpY0tleUp3aylcbiAgICAgIGNvbnN0IGVuY3J5cHRlZFByaXZhdGVLZXkgPSBhd2FpdCBlbmNyeXB0UHJpdktleShwYWlyLnByaXZhdGVLZXkpXG5cbiAgICAgIGZ1bGxJZGVudGl0eS5zaWcucHVzaCh7XG4gICAgICAgIGFsZzogc2lnQWxnLFxuICAgICAgICBqd2s6IHB1YmxpY0tleUp3ayxcbiAgICAgICAgaWQ6IHB1YmxpY1RodW1icHJpbnQsXG4gICAgICAgIF9wcml2OiB7XG4gICAgICAgICAgcHVibGljS2V5OiBwYWlyLnB1YmxpY0tleSxcbiAgICAgICAgICBwcml2YXRlS2V5OiBwYWlyLnByaXZhdGVLZXksXG4gICAgICAgICAgZW5jcnlwdGVkUHJpdmF0ZUtleVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IHNpZ0J5dGVzID0gW11cbiAgICBsZXQgc2lnQnl0ZXNDb3VudCA9IDBcblxuICAgIGNvbnN0IGV4cGlyZXNBdEJ5dGVzID0gbmV3IEFycmF5QnVmZmVyKDgpXG4gICAgY29uc3QgZHYgPSBuZXcgRGF0YVZpZXcoZXhwaXJlc0F0Qnl0ZXMpXG4gICAgZHYuc2V0RmxvYXQ2NCgwLCBmdWxsSWRlbnRpdHkuZXhwaXJlc0F0VXRjTXMsIHRydWUpXG4gICAgc2lnQnl0ZXMucHVzaChuZXcgVWludDhBcnJheShleHBpcmVzQXRCeXRlcykpXG4gICAgc2lnQnl0ZXNDb3VudCArPSA4XG5cbiAgICBmb3IgKGNvbnN0IGVuYyBvZiBmdWxsSWRlbnRpdHkuZW5jKSB7XG4gICAgICBjb25zdCBieXRlcyA9IGJhc2U2NHVybC5kZWNvZGUoZW5jLmlkKVxuICAgICAgc2lnQnl0ZXMucHVzaChieXRlcylcbiAgICAgIHNpZ0J5dGVzQ291bnQgKz0gYnl0ZXMuYnl0ZUxlbmd0aFxuICAgIH1cblxuICAgIGZvciAoY29uc3Qgc2lnIG9mIGZ1bGxJZGVudGl0eS5zaWcpIHtcbiAgICAgIGNvbnN0IGJ5dGVzID0gYmFzZTY0dXJsLmRlY29kZShzaWcuaWQpXG4gICAgICBzaWdCeXRlcy5wdXNoKGJ5dGVzKVxuICAgICAgc2lnQnl0ZXNDb3VudCArPSBieXRlcy5ieXRlTGVuZ3RoXG4gICAgfVxuXG4gICAgY29uc3Qgc2lnQnl0ZXNBbGwgPSBuZXcgVWludDhBcnJheShzaWdCeXRlc0NvdW50KVxuICAgIGxldCBvZmZzZXQgPSAwXG5cbiAgICBmb3IgKGNvbnN0IGJ5dGVzIG9mIHNpZ0J5dGVzKSB7XG4gICAgICBzaWdCeXRlc0FsbC5zZXQoYnl0ZXMsIG9mZnNldClcbiAgICAgIG9mZnNldCArPSBieXRlcy5ieXRlTGVuZ3RoXG4gICAgfVxuXG4gICAgZnVsbElkZW50aXR5LnNpZ0J5dGVzID0gYmFzZTY0dXJsLmVuY29kZShzaWdCeXRlc0FsbClcblxuICAgIGNvbnN0IHNpZ24gPSBuZXcgR2VuZXJhbFNpZ24oc2lnQnl0ZXNBbGwpXG5cbiAgICBmb3IgKGNvbnN0IHNpZyBvZiBmdWxsSWRlbnRpdHkuc2lnKSB7XG4gICAgICBzaWduXG4gICAgICAgIC5hZGRTaWduYXR1cmUoc2lnLl9wcml2LnByaXZhdGVLZXkpXG4gICAgICAgIC5zZXRQcm90ZWN0ZWRIZWFkZXIoeyBhbGc6IHNpZy5hbGcgfSlcbiAgICB9XG5cbiAgICBmdWxsSWRlbnRpdHkuandzID0gYXdhaXQgc2lnbi5zaWduKClcblxuICAgIGNvbnNvbGUubG9nKCdmdWxsJywgZnVsbElkZW50aXR5KVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKCd1bmltcGxlbWVudGVkJylcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIHBhc3NwaHJhc2VTZWNyZXRBbGc6IFwiJyArIGNvbmZpZy5wYXNzcGhyYXNlU2VjcmV0QWxnICsgJ1wiJylcbiAgfVxufVxuXG4vKipcbiAqIFByb3ZpZGVzIGFsbG5ldCBzeXN0ZW0gSldLIEpXUyBKV0UgSldUIGZ1bmN0aW9uYWxpdHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBBbklkZW50aXR5IHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpZGVudGl0eS4gVXNlIHRoZSBhc3luYyBjb25zdHJ1Y3RvciBjcmVhdGVBbklkZW50aXR5LlxuICAgKi9cbiAgLy8gY29uc3RydWN0b3IgKCkge1xuICAvLyB9XG5cbiAgLyoqXG4gICAqIEFzeW5jIGNvbnN0cnVjdG9yIC0gQ3JlYXRlIGEgbmV3IGlkZW50aXR5LlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBnZXRQYXNzcGhyYXNlQ2Igc2hvdWxkIHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlc1xuICAgKiAgICAgICAgICAgICAgICAgICB0byBhIHBhc3NwaHJhc2UgYXMgYSBDcnlwdG9LZXlcbiAgICovXG4gIHN0YXRpYyBhc3luYyBjcmVhdGVBbklkZW50aXR5IChjb25maWcpIHtcbiAgICBjb25zdCBwYXNzcGhyYXNlS2V5ID0gYXdhaXQgY29uZmlnLnBhc3NwaHJhc2VHZXRDYigpXG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IF9sb2FkSWRlbnQocGFzc3BocmFzZUtleSlcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiBhd2FpdCBfZ2VuSWRlbnQoY29uZmlnLCBwYXNzcGhyYXNlS2V5KVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IGRpZ2VzdCBmcm9tICcuLi9ydW50aW1lL2RpZ2VzdC5qcyc7XG5pbXBvcnQgeyBlbmNvZGUgYXMgYmFzZTY0dXJsIH0gZnJvbSAnLi4vcnVudGltZS9iYXNlNjR1cmwuanMnO1xuaW1wb3J0IHsgSk9TRU5vdFN1cHBvcnRlZCwgSldLSW52YWxpZCB9IGZyb20gJy4uL3V0aWwvZXJyb3JzLmpzJztcbmltcG9ydCB7IGVuY29kZXIgfSBmcm9tICcuLi9saWIvYnVmZmVyX3V0aWxzLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuLi9saWIvaXNfb2JqZWN0LmpzJztcbmNvbnN0IGNoZWNrID0gKHZhbHVlLCBkZXNjcmlwdGlvbikgPT4ge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnIHx8ICF2YWx1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgSldLSW52YWxpZChgJHtkZXNjcmlwdGlvbn0gbWlzc2luZyBvciBpbnZhbGlkYCk7XG4gICAgfVxufTtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjYWxjdWxhdGVKd2tUaHVtYnByaW50KGp3aywgZGlnZXN0QWxnb3JpdGhtID0gJ3NoYTI1NicpIHtcbiAgICBpZiAoIWlzT2JqZWN0KGp3aykpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSldLIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gICAgfVxuICAgIGxldCBjb21wb25lbnRzO1xuICAgIHN3aXRjaCAoandrLmt0eSkge1xuICAgICAgICBjYXNlICdFQyc6XG4gICAgICAgICAgICBjaGVjayhqd2suY3J2LCAnXCJjcnZcIiAoQ3VydmUpIFBhcmFtZXRlcicpO1xuICAgICAgICAgICAgY2hlY2soandrLngsICdcInhcIiAoWCBDb29yZGluYXRlKSBQYXJhbWV0ZXInKTtcbiAgICAgICAgICAgIGNoZWNrKGp3ay55LCAnXCJ5XCIgKFkgQ29vcmRpbmF0ZSkgUGFyYW1ldGVyJyk7XG4gICAgICAgICAgICBjb21wb25lbnRzID0geyBjcnY6IGp3ay5jcnYsIGt0eTogandrLmt0eSwgeDogandrLngsIHk6IGp3ay55IH07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnT0tQJzpcbiAgICAgICAgICAgIGNoZWNrKGp3ay5jcnYsICdcImNydlwiIChTdWJ0eXBlIG9mIEtleSBQYWlyKSBQYXJhbWV0ZXInKTtcbiAgICAgICAgICAgIGNoZWNrKGp3ay54LCAnXCJ4XCIgKFB1YmxpYyBLZXkpIFBhcmFtZXRlcicpO1xuICAgICAgICAgICAgY29tcG9uZW50cyA9IHsgY3J2OiBqd2suY3J2LCBrdHk6IGp3ay5rdHksIHg6IGp3ay54IH07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnUlNBJzpcbiAgICAgICAgICAgIGNoZWNrKGp3ay5lLCAnXCJlXCIgKEV4cG9uZW50KSBQYXJhbWV0ZXInKTtcbiAgICAgICAgICAgIGNoZWNrKGp3ay5uLCAnXCJuXCIgKE1vZHVsdXMpIFBhcmFtZXRlcicpO1xuICAgICAgICAgICAgY29tcG9uZW50cyA9IHsgZTogandrLmUsIGt0eTogandrLmt0eSwgbjogandrLm4gfTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdvY3QnOlxuICAgICAgICAgICAgY2hlY2soandrLmssICdcImtcIiAoS2V5IFZhbHVlKSBQYXJhbWV0ZXInKTtcbiAgICAgICAgICAgIGNvbXBvbmVudHMgPSB7IGs6IGp3ay5rLCBrdHk6IGp3ay5rdHkgfTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEpPU0VOb3RTdXBwb3J0ZWQoJ1wia3R5XCIgKEtleSBUeXBlKSBQYXJhbWV0ZXIgbWlzc2luZyBvciB1bnN1cHBvcnRlZCcpO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0gZW5jb2Rlci5lbmNvZGUoSlNPTi5zdHJpbmdpZnkoY29tcG9uZW50cykpO1xuICAgIHJldHVybiBiYXNlNjR1cmwoYXdhaXQgZGlnZXN0KGRpZ2VzdEFsZ29yaXRobSwgZGF0YSkpO1xufVxuIiwiaW1wb3J0IHsgZW5jb2RlIGFzIGJhc2U2NHVybCB9IGZyb20gJy4uLy4uL3J1bnRpbWUvYmFzZTY0dXJsLmpzJztcbmltcG9ydCBzaWduIGZyb20gJy4uLy4uL3J1bnRpbWUvc2lnbi5qcyc7XG5pbXBvcnQgaXNEaXNqb2ludCBmcm9tICcuLi8uLi9saWIvaXNfZGlzam9pbnQuanMnO1xuaW1wb3J0IHsgSldTSW52YWxpZCB9IGZyb20gJy4uLy4uL3V0aWwvZXJyb3JzLmpzJztcbmltcG9ydCB7IGVuY29kZXIsIGRlY29kZXIsIGNvbmNhdCB9IGZyb20gJy4uLy4uL2xpYi9idWZmZXJfdXRpbHMuanMnO1xuaW1wb3J0IGNoZWNrS2V5VHlwZSBmcm9tICcuLi8uLi9saWIvY2hlY2tfa2V5X3R5cGUuanMnO1xuaW1wb3J0IHZhbGlkYXRlQ3JpdCBmcm9tICcuLi8uLi9saWIvdmFsaWRhdGVfY3JpdC5qcyc7XG5leHBvcnQgY2xhc3MgRmxhdHRlbmVkU2lnbiB7XG4gICAgY29uc3RydWN0b3IocGF5bG9hZCkge1xuICAgICAgICBpZiAoIShwYXlsb2FkIGluc3RhbmNlb2YgVWludDhBcnJheSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BheWxvYWQgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBVaW50OEFycmF5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHBheWxvYWQ7XG4gICAgfVxuICAgIHNldFByb3RlY3RlZEhlYWRlcihwcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Byb3RlY3RlZEhlYWRlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc2V0UHJvdGVjdGVkSGVhZGVyIGNhbiBvbmx5IGJlIGNhbGxlZCBvbmNlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcHJvdGVjdGVkSGVhZGVyID0gcHJvdGVjdGVkSGVhZGVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VW5wcm90ZWN0ZWRIZWFkZXIodW5wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX3VucHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzZXRVbnByb3RlY3RlZEhlYWRlciBjYW4gb25seSBiZSBjYWxsZWQgb25jZScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VucHJvdGVjdGVkSGVhZGVyID0gdW5wcm90ZWN0ZWRIZWFkZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhc3luYyBzaWduKGtleSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIXRoaXMuX3Byb3RlY3RlZEhlYWRlciAmJiAhdGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdlaXRoZXIgc2V0UHJvdGVjdGVkSGVhZGVyIG9yIHNldFVucHJvdGVjdGVkSGVhZGVyIG11c3QgYmUgY2FsbGVkIGJlZm9yZSAjc2lnbigpJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0Rpc2pvaW50KHRoaXMuX3Byb3RlY3RlZEhlYWRlciwgdGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnSldTIFByb3RlY3RlZCBhbmQgSldTIFVucHJvdGVjdGVkIEhlYWRlciBQYXJhbWV0ZXIgbmFtZXMgbXVzdCBiZSBkaXNqb2ludCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGpvc2VIZWFkZXIgPSB7XG4gICAgICAgICAgICAuLi50aGlzLl9wcm90ZWN0ZWRIZWFkZXIsXG4gICAgICAgICAgICAuLi50aGlzLl91bnByb3RlY3RlZEhlYWRlcixcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9ucyA9IHZhbGlkYXRlQ3JpdChKV1NJbnZhbGlkLCBuZXcgTWFwKFtbJ2I2NCcsIHRydWVdXSksIG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jcml0LCB0aGlzLl9wcm90ZWN0ZWRIZWFkZXIsIGpvc2VIZWFkZXIpO1xuICAgICAgICBsZXQgYjY0ID0gdHJ1ZTtcbiAgICAgICAgaWYgKGV4dGVuc2lvbnMuaGFzKCdiNjQnKSkge1xuICAgICAgICAgICAgYjY0ID0gdGhpcy5fcHJvdGVjdGVkSGVhZGVyLmI2NDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYjY0ICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnVGhlIFwiYjY0XCIgKGJhc2U2NHVybC1lbmNvZGUgcGF5bG9hZCkgSGVhZGVyIFBhcmFtZXRlciBtdXN0IGJlIGEgYm9vbGVhbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgYWxnIH0gPSBqb3NlSGVhZGVyO1xuICAgICAgICBpZiAodHlwZW9mIGFsZyAhPT0gJ3N0cmluZycgfHwgIWFsZykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEpXU0ludmFsaWQoJ0pXUyBcImFsZ1wiIChBbGdvcml0aG0pIEhlYWRlciBQYXJhbWV0ZXIgbWlzc2luZyBvciBpbnZhbGlkJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2hlY2tLZXlUeXBlKGFsZywga2V5LCAnc2lnbicpO1xuICAgICAgICBsZXQgcGF5bG9hZCA9IHRoaXMuX3BheWxvYWQ7XG4gICAgICAgIGlmIChiNjQpIHtcbiAgICAgICAgICAgIHBheWxvYWQgPSBlbmNvZGVyLmVuY29kZShiYXNlNjR1cmwocGF5bG9hZCkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwcm90ZWN0ZWRIZWFkZXI7XG4gICAgICAgIGlmICh0aGlzLl9wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgICAgIHByb3RlY3RlZEhlYWRlciA9IGVuY29kZXIuZW5jb2RlKGJhc2U2NHVybChKU09OLnN0cmluZ2lmeSh0aGlzLl9wcm90ZWN0ZWRIZWFkZXIpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwcm90ZWN0ZWRIZWFkZXIgPSBlbmNvZGVyLmVuY29kZSgnJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YSA9IGNvbmNhdChwcm90ZWN0ZWRIZWFkZXIsIGVuY29kZXIuZW5jb2RlKCcuJyksIHBheWxvYWQpO1xuICAgICAgICBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCBzaWduKGFsZywga2V5LCBkYXRhKTtcbiAgICAgICAgY29uc3QgandzID0ge1xuICAgICAgICAgICAgc2lnbmF0dXJlOiBiYXNlNjR1cmwoc2lnbmF0dXJlKSxcbiAgICAgICAgICAgIHBheWxvYWQ6ICcnLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoYjY0KSB7XG4gICAgICAgICAgICBqd3MucGF5bG9hZCA9IGRlY29kZXIuZGVjb2RlKHBheWxvYWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl91bnByb3RlY3RlZEhlYWRlcikge1xuICAgICAgICAgICAgandzLmhlYWRlciA9IHRoaXMuX3VucHJvdGVjdGVkSGVhZGVyO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgICAgIGp3cy5wcm90ZWN0ZWQgPSBkZWNvZGVyLmRlY29kZShwcm90ZWN0ZWRIZWFkZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqd3M7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRmxhdHRlbmVkU2lnbiB9IGZyb20gJy4uL2ZsYXR0ZW5lZC9zaWduLmpzJztcbmltcG9ydCB7IEpXU0ludmFsaWQgfSBmcm9tICcuLi8uLi91dGlsL2Vycm9ycy5qcyc7XG5jb25zdCBzaWduYXR1cmVSZWYgPSBuZXcgV2Vha01hcCgpO1xuY2xhc3MgSW5kaXZpZHVhbFNpZ25hdHVyZSB7XG4gICAgc2V0UHJvdGVjdGVkSGVhZGVyKHByb3RlY3RlZEhlYWRlcikge1xuICAgICAgICBpZiAodGhpcy5fcHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzZXRQcm90ZWN0ZWRIZWFkZXIgY2FuIG9ubHkgYmUgY2FsbGVkIG9uY2UnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wcm90ZWN0ZWRIZWFkZXIgPSBwcm90ZWN0ZWRIZWFkZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRVbnByb3RlY3RlZEhlYWRlcih1bnByb3RlY3RlZEhlYWRlcikge1xuICAgICAgICBpZiAodGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3NldFVucHJvdGVjdGVkSGVhZGVyIGNhbiBvbmx5IGJlIGNhbGxlZCBvbmNlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIgPSB1bnByb3RlY3RlZEhlYWRlcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldCBfcHJvdGVjdGVkSGVhZGVyKHZhbHVlKSB7XG4gICAgICAgIHNpZ25hdHVyZVJlZi5nZXQodGhpcykucHJvdGVjdGVkSGVhZGVyID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBfcHJvdGVjdGVkSGVhZGVyKCkge1xuICAgICAgICByZXR1cm4gc2lnbmF0dXJlUmVmLmdldCh0aGlzKS5wcm90ZWN0ZWRIZWFkZXI7XG4gICAgfVxuICAgIHNldCBfdW5wcm90ZWN0ZWRIZWFkZXIodmFsdWUpIHtcbiAgICAgICAgc2lnbmF0dXJlUmVmLmdldCh0aGlzKS51bnByb3RlY3RlZEhlYWRlciA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgX3VucHJvdGVjdGVkSGVhZGVyKCkge1xuICAgICAgICByZXR1cm4gc2lnbmF0dXJlUmVmLmdldCh0aGlzKS51bnByb3RlY3RlZEhlYWRlcjtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgR2VuZXJhbFNpZ24ge1xuICAgIGNvbnN0cnVjdG9yKHBheWxvYWQpIHtcbiAgICAgICAgdGhpcy5fc2lnbmF0dXJlcyA9IFtdO1xuICAgICAgICB0aGlzLl9wYXlsb2FkID0gcGF5bG9hZDtcbiAgICB9XG4gICAgYWRkU2lnbmF0dXJlKGtleSwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCBzaWduYXR1cmUgPSBuZXcgSW5kaXZpZHVhbFNpZ25hdHVyZSgpO1xuICAgICAgICBzaWduYXR1cmVSZWYuc2V0KHNpZ25hdHVyZSwgeyBrZXksIG9wdGlvbnMgfSk7XG4gICAgICAgIHRoaXMuX3NpZ25hdHVyZXMucHVzaChzaWduYXR1cmUpO1xuICAgICAgICByZXR1cm4gc2lnbmF0dXJlO1xuICAgIH1cbiAgICBhc3luYyBzaWduKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3NpZ25hdHVyZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnYXQgbGVhc3Qgb25lIHNpZ25hdHVyZSBtdXN0IGJlIGFkZGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgandzID0ge1xuICAgICAgICAgICAgc2lnbmF0dXJlczogW10sXG4gICAgICAgICAgICBwYXlsb2FkOiAnJyxcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHBheWxvYWRzID0gbmV3IFNldCgpO1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCh0aGlzLl9zaWduYXR1cmVzLm1hcChhc3luYyAoc2lnKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHByb3RlY3RlZEhlYWRlciwgdW5wcm90ZWN0ZWRIZWFkZXIsIG9wdGlvbnMsIGtleSB9ID0gc2lnbmF0dXJlUmVmLmdldChzaWcpO1xuICAgICAgICAgICAgY29uc3QgZmxhdHRlbmVkID0gbmV3IEZsYXR0ZW5lZFNpZ24odGhpcy5fcGF5bG9hZCk7XG4gICAgICAgICAgICBpZiAocHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgZmxhdHRlbmVkLnNldFByb3RlY3RlZEhlYWRlcihwcm90ZWN0ZWRIZWFkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHVucHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgZmxhdHRlbmVkLnNldFVucHJvdGVjdGVkSGVhZGVyKHVucHJvdGVjdGVkSGVhZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgcGF5bG9hZCwgLi4ucmVzdCB9ID0gYXdhaXQgZmxhdHRlbmVkLnNpZ24oa2V5LCBvcHRpb25zKTtcbiAgICAgICAgICAgIHBheWxvYWRzLmFkZChwYXlsb2FkKTtcbiAgICAgICAgICAgIGp3cy5wYXlsb2FkID0gcGF5bG9hZDtcbiAgICAgICAgICAgIGp3cy5zaWduYXR1cmVzLnB1c2gocmVzdCk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgaWYgKHBheWxvYWRzLnNpemUgIT09IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdpbmNvbnNpc3RlbnQgdXNlIG9mIEpXUyBVbmVuY29kZWQgUGF5bG9hZCBPcHRpb24gKFJGQzc3OTcpJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGp3cztcbiAgICB9XG59XG4iLCJpbXBvcnQgeyB0b1NQS0kgYXMgZXhwb3J0UHVibGljIH0gZnJvbSAnLi4vcnVudGltZS9hc24xLmpzJztcbmltcG9ydCB7IHRvUEtDUzggYXMgZXhwb3J0UHJpdmF0ZSB9IGZyb20gJy4uL3J1bnRpbWUvYXNuMS5qcyc7XG5pbXBvcnQga2V5VG9KV0sgZnJvbSAnLi4vcnVudGltZS9rZXlfdG9fandrLmpzJztcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleHBvcnRTUEtJKGtleSkge1xuICAgIHJldHVybiBleHBvcnRQdWJsaWMoa2V5KTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleHBvcnRQS0NTOChrZXkpIHtcbiAgICByZXR1cm4gZXhwb3J0UHJpdmF0ZShrZXkpO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4cG9ydEpXSyhrZXkpIHtcbiAgICByZXR1cm4ga2V5VG9KV0soa2V5KTtcbn1cbiIsImltcG9ydCB7IGdlbmVyYXRlS2V5UGFpciBhcyBnZW5lcmF0ZSB9IGZyb20gJy4uL3J1bnRpbWUvZ2VuZXJhdGUuanMnO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlS2V5UGFpcihhbGcsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gZ2VuZXJhdGUoYWxnLCBvcHRpb25zKTtcbn1cbiIsImV4cG9ydCBjb25zdCBlbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyKCk7XG5leHBvcnQgY29uc3QgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigpO1xuY29uc3QgTUFYX0lOVDMyID0gMiAqKiAzMjtcbmV4cG9ydCBmdW5jdGlvbiBjb25jYXQoLi4uYnVmZmVycykge1xuICAgIGNvbnN0IHNpemUgPSBidWZmZXJzLnJlZHVjZSgoYWNjLCB7IGxlbmd0aCB9KSA9PiBhY2MgKyBsZW5ndGgsIDApO1xuICAgIGNvbnN0IGJ1ZiA9IG5ldyBVaW50OEFycmF5KHNpemUpO1xuICAgIGxldCBpID0gMDtcbiAgICBidWZmZXJzLmZvckVhY2goKGJ1ZmZlcikgPT4ge1xuICAgICAgICBidWYuc2V0KGJ1ZmZlciwgaSk7XG4gICAgICAgIGkgKz0gYnVmZmVyLmxlbmd0aDtcbiAgICB9KTtcbiAgICByZXR1cm4gYnVmO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHAycyhhbGcsIHAyc0lucHV0KSB7XG4gICAgcmV0dXJuIGNvbmNhdChlbmNvZGVyLmVuY29kZShhbGcpLCBuZXcgVWludDhBcnJheShbMF0pLCBwMnNJbnB1dCk7XG59XG5mdW5jdGlvbiB3cml0ZVVJbnQzMkJFKGJ1ZiwgdmFsdWUsIG9mZnNldCkge1xuICAgIGlmICh2YWx1ZSA8IDAgfHwgdmFsdWUgPj0gTUFYX0lOVDMyKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGB2YWx1ZSBtdXN0IGJlID49IDAgYW5kIDw9ICR7TUFYX0lOVDMyIC0gMX0uIFJlY2VpdmVkICR7dmFsdWV9YCk7XG4gICAgfVxuICAgIGJ1Zi5zZXQoW3ZhbHVlID4+PiAyNCwgdmFsdWUgPj4+IDE2LCB2YWx1ZSA+Pj4gOCwgdmFsdWUgJiAweGZmXSwgb2Zmc2V0KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB1aW50NjRiZSh2YWx1ZSkge1xuICAgIGNvbnN0IGhpZ2ggPSBNYXRoLmZsb29yKHZhbHVlIC8gTUFYX0lOVDMyKTtcbiAgICBjb25zdCBsb3cgPSB2YWx1ZSAlIE1BWF9JTlQzMjtcbiAgICBjb25zdCBidWYgPSBuZXcgVWludDhBcnJheSg4KTtcbiAgICB3cml0ZVVJbnQzMkJFKGJ1ZiwgaGlnaCwgMCk7XG4gICAgd3JpdGVVSW50MzJCRShidWYsIGxvdywgNCk7XG4gICAgcmV0dXJuIGJ1Zjtcbn1cbmV4cG9ydCBmdW5jdGlvbiB1aW50MzJiZSh2YWx1ZSkge1xuICAgIGNvbnN0IGJ1ZiA9IG5ldyBVaW50OEFycmF5KDQpO1xuICAgIHdyaXRlVUludDMyQkUoYnVmLCB2YWx1ZSk7XG4gICAgcmV0dXJuIGJ1Zjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBsZW5ndGhBbmRJbnB1dChpbnB1dCkge1xuICAgIHJldHVybiBjb25jYXQodWludDMyYmUoaW5wdXQubGVuZ3RoKSwgaW5wdXQpO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbmNhdEtkZihkaWdlc3QsIHNlY3JldCwgYml0cywgdmFsdWUpIHtcbiAgICBjb25zdCBpdGVyYXRpb25zID0gTWF0aC5jZWlsKChiaXRzID4+IDMpIC8gMzIpO1xuICAgIGxldCByZXM7XG4gICAgZm9yIChsZXQgaXRlciA9IDE7IGl0ZXIgPD0gaXRlcmF0aW9uczsgaXRlcisrKSB7XG4gICAgICAgIGNvbnN0IGJ1ZiA9IG5ldyBVaW50OEFycmF5KDQgKyBzZWNyZXQubGVuZ3RoICsgdmFsdWUubGVuZ3RoKTtcbiAgICAgICAgYnVmLnNldCh1aW50MzJiZShpdGVyKSk7XG4gICAgICAgIGJ1Zi5zZXQoc2VjcmV0LCA0KTtcbiAgICAgICAgYnVmLnNldCh2YWx1ZSwgNCArIHNlY3JldC5sZW5ndGgpO1xuICAgICAgICBpZiAoIXJlcykge1xuICAgICAgICAgICAgcmVzID0gYXdhaXQgZGlnZXN0KCdzaGEyNTYnLCBidWYpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzID0gY29uY2F0KHJlcywgYXdhaXQgZGlnZXN0KCdzaGEyNTYnLCBidWYpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXMgPSByZXMuc2xpY2UoMCwgYml0cyA+PiAzKTtcbiAgICByZXR1cm4gcmVzO1xufVxuIiwiaW1wb3J0IGludmFsaWRLZXlJbnB1dCBmcm9tICcuL2ludmFsaWRfa2V5X2lucHV0LmpzJztcbmltcG9ydCBpc0tleUxpa2UsIHsgdHlwZXMgfSBmcm9tICcuLi9ydW50aW1lL2lzX2tleV9saWtlLmpzJztcbmNvbnN0IHN5bW1ldHJpY1R5cGVDaGVjayA9IChrZXkpID0+IHtcbiAgICBpZiAoa2V5IGluc3RhbmNlb2YgVWludDhBcnJheSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmICghaXNLZXlMaWtlKGtleSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihpbnZhbGlkS2V5SW5wdXQoa2V5LCAuLi50eXBlcywgJ1VpbnQ4QXJyYXknKSk7XG4gICAgfVxuICAgIGlmIChrZXkudHlwZSAhPT0gJ3NlY3JldCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0eXBlcy5qb2luKCcgb3IgJyl9IGluc3RhbmNlcyBmb3Igc3ltbWV0cmljIGFsZ29yaXRobXMgbXVzdCBiZSBvZiB0eXBlIFwic2VjcmV0XCJgKTtcbiAgICB9XG59O1xuY29uc3QgYXN5bW1ldHJpY1R5cGVDaGVjayA9IChrZXksIHVzYWdlKSA9PiB7XG4gICAgaWYgKCFpc0tleUxpa2Uoa2V5KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGludmFsaWRLZXlJbnB1dChrZXksIC4uLnR5cGVzKSk7XG4gICAgfVxuICAgIGlmIChrZXkudHlwZSA9PT0gJ3NlY3JldCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0eXBlcy5qb2luKCcgb3IgJyl9IGluc3RhbmNlcyBmb3IgYXN5bW1ldHJpYyBhbGdvcml0aG1zIG11c3Qgbm90IGJlIG9mIHR5cGUgXCJzZWNyZXRcImApO1xuICAgIH1cbiAgICBpZiAodXNhZ2UgPT09ICdzaWduJyAmJiBrZXkudHlwZSA9PT0gJ3B1YmxpYycpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0eXBlcy5qb2luKCcgb3IgJyl9IGluc3RhbmNlcyBmb3IgYXN5bW1ldHJpYyBhbGdvcml0aG0gc2lnbmluZyBtdXN0IGJlIG9mIHR5cGUgXCJwcml2YXRlXCJgKTtcbiAgICB9XG4gICAgaWYgKHVzYWdlID09PSAnZGVjcnlwdCcgJiYga2V5LnR5cGUgPT09ICdwdWJsaWMnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7dHlwZXMuam9pbignIG9yICcpfSBpbnN0YW5jZXMgZm9yIGFzeW1tZXRyaWMgYWxnb3JpdGhtIGRlY3J5cHRpb24gbXVzdCBiZSBvZiB0eXBlIFwicHJpdmF0ZVwiYCk7XG4gICAgfVxuICAgIGlmIChrZXkuYWxnb3JpdGhtICYmIHVzYWdlID09PSAndmVyaWZ5JyAmJiBrZXkudHlwZSA9PT0gJ3ByaXZhdGUnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7dHlwZXMuam9pbignIG9yICcpfSBpbnN0YW5jZXMgZm9yIGFzeW1tZXRyaWMgYWxnb3JpdGhtIHZlcmlmeWluZyBtdXN0IGJlIG9mIHR5cGUgXCJwdWJsaWNcImApO1xuICAgIH1cbiAgICBpZiAoa2V5LmFsZ29yaXRobSAmJiB1c2FnZSA9PT0gJ2VuY3J5cHQnICYmIGtleS50eXBlID09PSAncHJpdmF0ZScpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0eXBlcy5qb2luKCcgb3IgJyl9IGluc3RhbmNlcyBmb3IgYXN5bW1ldHJpYyBhbGdvcml0aG0gZW5jcnlwdGlvbiBtdXN0IGJlIG9mIHR5cGUgXCJwdWJsaWNcImApO1xuICAgIH1cbn07XG5jb25zdCBjaGVja0tleVR5cGUgPSAoYWxnLCBrZXksIHVzYWdlKSA9PiB7XG4gICAgY29uc3Qgc3ltbWV0cmljID0gYWxnLnN0YXJ0c1dpdGgoJ0hTJykgfHxcbiAgICAgICAgYWxnID09PSAnZGlyJyB8fFxuICAgICAgICBhbGcuc3RhcnRzV2l0aCgnUEJFUzInKSB8fFxuICAgICAgICAvXkFcXGR7M30oPzpHQ00pP0tXJC8udGVzdChhbGcpO1xuICAgIGlmIChzeW1tZXRyaWMpIHtcbiAgICAgICAgc3ltbWV0cmljVHlwZUNoZWNrKGtleSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhc3ltbWV0cmljVHlwZUNoZWNrKGtleSwgdXNhZ2UpO1xuICAgIH1cbn07XG5leHBvcnQgZGVmYXVsdCBjaGVja0tleVR5cGU7XG4iLCJpbXBvcnQgeyBpc0Nsb3VkZmxhcmVXb3JrZXJzLCBpc05vZGVKcyB9IGZyb20gJy4uL3J1bnRpbWUvZ2xvYmFsLmpzJztcbmZ1bmN0aW9uIHVudXNhYmxlKG5hbWUsIHByb3AgPSAnYWxnb3JpdGhtLm5hbWUnKSB7XG4gICAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoYENyeXB0b0tleSBkb2VzIG5vdCBzdXBwb3J0IHRoaXMgb3BlcmF0aW9uLCBpdHMgJHtwcm9wfSBtdXN0IGJlICR7bmFtZX1gKTtcbn1cbmZ1bmN0aW9uIGlzQWxnb3JpdGhtKGFsZ29yaXRobSwgbmFtZSkge1xuICAgIHJldHVybiBhbGdvcml0aG0ubmFtZSA9PT0gbmFtZTtcbn1cbmZ1bmN0aW9uIGdldEhhc2hMZW5ndGgoaGFzaCkge1xuICAgIHJldHVybiBwYXJzZUludChoYXNoLm5hbWUuc3Vic3RyKDQpLCAxMCk7XG59XG5mdW5jdGlvbiBnZXROYW1lZEN1cnZlKGFsZykge1xuICAgIHN3aXRjaCAoYWxnKSB7XG4gICAgICAgIGNhc2UgJ0VTMjU2JzpcbiAgICAgICAgICAgIHJldHVybiAnUC0yNTYnO1xuICAgICAgICBjYXNlICdFUzM4NCc6XG4gICAgICAgICAgICByZXR1cm4gJ1AtMzg0JztcbiAgICAgICAgY2FzZSAnRVM1MTInOlxuICAgICAgICAgICAgcmV0dXJuICdQLTUyMSc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVhY2hhYmxlJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gY2hlY2tVc2FnZShrZXksIHVzYWdlcykge1xuICAgIGlmICh1c2FnZXMubGVuZ3RoICYmICF1c2FnZXMuc29tZSgoZXhwZWN0ZWQpID0+IGtleS51c2FnZXMuaW5jbHVkZXMoZXhwZWN0ZWQpKSkge1xuICAgICAgICBsZXQgbXNnID0gJ0NyeXB0b0tleSBkb2VzIG5vdCBzdXBwb3J0IHRoaXMgb3BlcmF0aW9uLCBpdHMgdXNhZ2VzIG11c3QgaW5jbHVkZSAnO1xuICAgICAgICBpZiAodXNhZ2VzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3QgPSB1c2FnZXMucG9wKCk7XG4gICAgICAgICAgICBtc2cgKz0gYG9uZSBvZiAke3VzYWdlcy5qb2luKCcsICcpfSwgb3IgJHtsYXN0fS5gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHVzYWdlcy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIG1zZyArPSBgb25lIG9mICR7dXNhZ2VzWzBdfSBvciAke3VzYWdlc1sxXX0uYDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1zZyArPSBgJHt1c2FnZXNbMF19LmA7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihtc2cpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1NpZ0NyeXB0b0tleShrZXksIGFsZywgLi4udXNhZ2VzKSB7XG4gICAgc3dpdGNoIChhbGcpIHtcbiAgICAgICAgY2FzZSAnSFMyNTYnOlxuICAgICAgICBjYXNlICdIUzM4NCc6XG4gICAgICAgIGNhc2UgJ0hTNTEyJzoge1xuICAgICAgICAgICAgaWYgKCFpc0FsZ29yaXRobShrZXkuYWxnb3JpdGhtLCAnSE1BQycpKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKCdITUFDJyk7XG4gICAgICAgICAgICBjb25zdCBleHBlY3RlZCA9IHBhcnNlSW50KGFsZy5zdWJzdHIoMiksIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbCA9IGdldEhhc2hMZW5ndGgoa2V5LmFsZ29yaXRobS5oYXNoKTtcbiAgICAgICAgICAgIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKGBTSEEtJHtleHBlY3RlZH1gLCAnYWxnb3JpdGhtLmhhc2gnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ1JTMjU2JzpcbiAgICAgICAgY2FzZSAnUlMzODQnOlxuICAgICAgICBjYXNlICdSUzUxMic6IHtcbiAgICAgICAgICAgIGlmICghaXNBbGdvcml0aG0oa2V5LmFsZ29yaXRobSwgJ1JTQVNTQS1QS0NTMS12MV81JykpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoJ1JTQVNTQS1QS0NTMS12MV81Jyk7XG4gICAgICAgICAgICBjb25zdCBleHBlY3RlZCA9IHBhcnNlSW50KGFsZy5zdWJzdHIoMiksIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbCA9IGdldEhhc2hMZW5ndGgoa2V5LmFsZ29yaXRobS5oYXNoKTtcbiAgICAgICAgICAgIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKGBTSEEtJHtleHBlY3RlZH1gLCAnYWxnb3JpdGhtLmhhc2gnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ1BTMjU2JzpcbiAgICAgICAgY2FzZSAnUFMzODQnOlxuICAgICAgICBjYXNlICdQUzUxMic6IHtcbiAgICAgICAgICAgIGlmICghaXNBbGdvcml0aG0oa2V5LmFsZ29yaXRobSwgJ1JTQS1QU1MnKSlcbiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZSgnUlNBLVBTUycpO1xuICAgICAgICAgICAgY29uc3QgZXhwZWN0ZWQgPSBwYXJzZUludChhbGcuc3Vic3RyKDIpLCAxMCk7XG4gICAgICAgICAgICBjb25zdCBhY3R1YWwgPSBnZXRIYXNoTGVuZ3RoKGtleS5hbGdvcml0aG0uaGFzaCk7XG4gICAgICAgICAgICBpZiAoYWN0dWFsICE9PSBleHBlY3RlZClcbiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZShgU0hBLSR7ZXhwZWN0ZWR9YCwgJ2FsZ29yaXRobS5oYXNoJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGlzTm9kZUpzKCkgJiYgJ0VkRFNBJzoge1xuICAgICAgICAgICAgaWYgKGtleS5hbGdvcml0aG0ubmFtZSAhPT0gJ05PREUtRUQyNTUxOScgJiYga2V5LmFsZ29yaXRobS5uYW1lICE9PSAnTk9ERS1FRDQ0OCcpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoJ05PREUtRUQyNTUxOSBvciBOT0RFLUVENDQ4Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGlzQ2xvdWRmbGFyZVdvcmtlcnMoKSAmJiAnRWREU0EnOiB7XG4gICAgICAgICAgICBpZiAoIWlzQWxnb3JpdGhtKGtleS5hbGdvcml0aG0sICdOT0RFLUVEMjU1MTknKSlcbiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZSgnTk9ERS1FRDI1NTE5Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdFUzI1Nic6XG4gICAgICAgIGNhc2UgJ0VTMzg0JzpcbiAgICAgICAgY2FzZSAnRVM1MTInOiB7XG4gICAgICAgICAgICBpZiAoIWlzQWxnb3JpdGhtKGtleS5hbGdvcml0aG0sICdFQ0RTQScpKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKCdFQ0RTQScpO1xuICAgICAgICAgICAgY29uc3QgZXhwZWN0ZWQgPSBnZXROYW1lZEN1cnZlKGFsZyk7XG4gICAgICAgICAgICBjb25zdCBhY3R1YWwgPSBrZXkuYWxnb3JpdGhtLm5hbWVkQ3VydmU7XG4gICAgICAgICAgICBpZiAoYWN0dWFsICE9PSBleHBlY3RlZClcbiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZShleHBlY3RlZCwgJ2FsZ29yaXRobS5uYW1lZEN1cnZlJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ3J5cHRvS2V5IGRvZXMgbm90IHN1cHBvcnQgdGhpcyBvcGVyYXRpb24nKTtcbiAgICB9XG4gICAgY2hlY2tVc2FnZShrZXksIHVzYWdlcyk7XG59XG5leHBvcnQgZnVuY3Rpb24gY2hlY2tFbmNDcnlwdG9LZXkoa2V5LCBhbGcsIC4uLnVzYWdlcykge1xuICAgIHN3aXRjaCAoYWxnKSB7XG4gICAgICAgIGNhc2UgJ0ExMjhHQ00nOlxuICAgICAgICBjYXNlICdBMTkyR0NNJzpcbiAgICAgICAgY2FzZSAnQTI1NkdDTSc6IHtcbiAgICAgICAgICAgIGlmICghaXNBbGdvcml0aG0oa2V5LmFsZ29yaXRobSwgJ0FFUy1HQ00nKSlcbiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZSgnQUVTLUdDTScpO1xuICAgICAgICAgICAgY29uc3QgZXhwZWN0ZWQgPSBwYXJzZUludChhbGcuc3Vic3RyKDEsIDMpLCAxMCk7XG4gICAgICAgICAgICBjb25zdCBhY3R1YWwgPSBrZXkuYWxnb3JpdGhtLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKGV4cGVjdGVkLCAnYWxnb3JpdGhtLmxlbmd0aCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnQTEyOEtXJzpcbiAgICAgICAgY2FzZSAnQTE5MktXJzpcbiAgICAgICAgY2FzZSAnQTI1NktXJzoge1xuICAgICAgICAgICAgaWYgKCFpc0FsZ29yaXRobShrZXkuYWxnb3JpdGhtLCAnQUVTLUtXJykpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoJ0FFUy1LVycpO1xuICAgICAgICAgICAgY29uc3QgZXhwZWN0ZWQgPSBwYXJzZUludChhbGcuc3Vic3RyKDEsIDMpLCAxMCk7XG4gICAgICAgICAgICBjb25zdCBhY3R1YWwgPSBrZXkuYWxnb3JpdGhtLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKGV4cGVjdGVkLCAnYWxnb3JpdGhtLmxlbmd0aCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnRUNESC1FUyc6XG4gICAgICAgICAgICBpZiAoIWlzQWxnb3JpdGhtKGtleS5hbGdvcml0aG0sICdFQ0RIJykpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoJ0VDREgnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdQQkVTMi1IUzI1NitBMTI4S1cnOlxuICAgICAgICBjYXNlICdQQkVTMi1IUzM4NCtBMTkyS1cnOlxuICAgICAgICBjYXNlICdQQkVTMi1IUzUxMitBMjU2S1cnOlxuICAgICAgICAgICAgaWYgKCFpc0FsZ29yaXRobShrZXkuYWxnb3JpdGhtLCAnUEJLREYyJykpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoJ1BCS0RGMicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQJzpcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAtMjU2JzpcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAtMzg0JzpcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAtNTEyJzoge1xuICAgICAgICAgICAgaWYgKCFpc0FsZ29yaXRobShrZXkuYWxnb3JpdGhtLCAnUlNBLU9BRVAnKSlcbiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZSgnUlNBLU9BRVAnKTtcbiAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkID0gcGFyc2VJbnQoYWxnLnN1YnN0cig5KSwgMTApIHx8IDE7XG4gICAgICAgICAgICBjb25zdCBhY3R1YWwgPSBnZXRIYXNoTGVuZ3RoKGtleS5hbGdvcml0aG0uaGFzaCk7XG4gICAgICAgICAgICBpZiAoYWN0dWFsICE9PSBleHBlY3RlZClcbiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZShgU0hBLSR7ZXhwZWN0ZWR9YCwgJ2FsZ29yaXRobS5oYXNoJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ3J5cHRvS2V5IGRvZXMgbm90IHN1cHBvcnQgdGhpcyBvcGVyYXRpb24nKTtcbiAgICB9XG4gICAgY2hlY2tVc2FnZShrZXksIHVzYWdlcyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCAoYjY0LCBkZXNjcmlwdG9yKSA9PiB7XG4gICAgY29uc3QgbmV3bGluZWQgPSAoYjY0Lm1hdGNoKC8uezEsNjR9L2cpIHx8IFtdKS5qb2luKCdcXG4nKTtcbiAgICByZXR1cm4gYC0tLS0tQkVHSU4gJHtkZXNjcmlwdG9yfS0tLS0tXFxuJHtuZXdsaW5lZH1cXG4tLS0tLUVORCAke2Rlc2NyaXB0b3J9LS0tLS1gO1xufTtcbiIsImV4cG9ydCBkZWZhdWx0IChhY3R1YWwsIC4uLnR5cGVzKSA9PiB7XG4gICAgbGV0IG1zZyA9ICdLZXkgbXVzdCBiZSAnO1xuICAgIGlmICh0eXBlcy5sZW5ndGggPiAyKSB7XG4gICAgICAgIGNvbnN0IGxhc3QgPSB0eXBlcy5wb3AoKTtcbiAgICAgICAgbXNnICs9IGBvbmUgb2YgdHlwZSAke3R5cGVzLmpvaW4oJywgJyl9LCBvciAke2xhc3R9LmA7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBtc2cgKz0gYG9uZSBvZiB0eXBlICR7dHlwZXNbMF19IG9yICR7dHlwZXNbMV19LmA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBtc2cgKz0gYG9mIHR5cGUgJHt0eXBlc1swXX0uYDtcbiAgICB9XG4gICAgaWYgKGFjdHVhbCA9PSBudWxsKSB7XG4gICAgICAgIG1zZyArPSBgIFJlY2VpdmVkICR7YWN0dWFsfWA7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBhY3R1YWwgPT09ICdmdW5jdGlvbicgJiYgYWN0dWFsLm5hbWUpIHtcbiAgICAgICAgbXNnICs9IGAgUmVjZWl2ZWQgZnVuY3Rpb24gJHthY3R1YWwubmFtZX1gO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgYWN0dWFsID09PSAnb2JqZWN0JyAmJiBhY3R1YWwgIT0gbnVsbCkge1xuICAgICAgICBpZiAoYWN0dWFsLmNvbnN0cnVjdG9yICYmIGFjdHVhbC5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICAgICAgICBtc2cgKz0gYCBSZWNlaXZlZCBhbiBpbnN0YW5jZSBvZiAke2FjdHVhbC5jb25zdHJ1Y3Rvci5uYW1lfWA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1zZztcbn07XG4iLCJjb25zdCBpc0Rpc2pvaW50ID0gKC4uLmhlYWRlcnMpID0+IHtcbiAgICBjb25zdCBzb3VyY2VzID0gaGVhZGVycy5maWx0ZXIoQm9vbGVhbik7XG4gICAgaWYgKHNvdXJjZXMubGVuZ3RoID09PSAwIHx8IHNvdXJjZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsZXQgYWNjO1xuICAgIGZvciAoY29uc3QgaGVhZGVyIG9mIHNvdXJjZXMpIHtcbiAgICAgICAgY29uc3QgcGFyYW1ldGVycyA9IE9iamVjdC5rZXlzKGhlYWRlcik7XG4gICAgICAgIGlmICghYWNjIHx8IGFjYy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICBhY2MgPSBuZXcgU2V0KHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBwYXJhbWV0ZXIgb2YgcGFyYW1ldGVycykge1xuICAgICAgICAgICAgaWYgKGFjYy5oYXMocGFyYW1ldGVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFjYy5hZGQocGFyYW1ldGVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5leHBvcnQgZGVmYXVsdCBpc0Rpc2pvaW50O1xuIiwiZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGw7XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc09iamVjdChpbnB1dCkge1xuICAgIGlmICghaXNPYmplY3RMaWtlKGlucHV0KSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YoaW5wdXQpID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsZXQgcHJvdG8gPSBpbnB1dDtcbiAgICB3aGlsZSAoT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKSAhPT0gbnVsbCkge1xuICAgICAgICBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90byk7XG4gICAgfVxuICAgIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoaW5wdXQpID09PSBwcm90bztcbn1cbiIsImltcG9ydCB7IEpPU0VOb3RTdXBwb3J0ZWQgfSBmcm9tICcuLi91dGlsL2Vycm9ycy5qcyc7XG5mdW5jdGlvbiB2YWxpZGF0ZUNyaXQoRXJyLCByZWNvZ25pemVkRGVmYXVsdCwgcmVjb2duaXplZE9wdGlvbiwgcHJvdGVjdGVkSGVhZGVyLCBqb3NlSGVhZGVyKSB7XG4gICAgaWYgKGpvc2VIZWFkZXIuY3JpdCAhPT0gdW5kZWZpbmVkICYmIHByb3RlY3RlZEhlYWRlci5jcml0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycignXCJjcml0XCIgKENyaXRpY2FsKSBIZWFkZXIgUGFyYW1ldGVyIE1VU1QgYmUgaW50ZWdyaXR5IHByb3RlY3RlZCcpO1xuICAgIH1cbiAgICBpZiAoIXByb3RlY3RlZEhlYWRlciB8fCBwcm90ZWN0ZWRIZWFkZXIuY3JpdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2V0KCk7XG4gICAgfVxuICAgIGlmICghQXJyYXkuaXNBcnJheShwcm90ZWN0ZWRIZWFkZXIuY3JpdCkgfHxcbiAgICAgICAgcHJvdGVjdGVkSGVhZGVyLmNyaXQubGVuZ3RoID09PSAwIHx8XG4gICAgICAgIHByb3RlY3RlZEhlYWRlci5jcml0LnNvbWUoKGlucHV0KSA9PiB0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnIHx8IGlucHV0Lmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycignXCJjcml0XCIgKENyaXRpY2FsKSBIZWFkZXIgUGFyYW1ldGVyIE1VU1QgYmUgYW4gYXJyYXkgb2Ygbm9uLWVtcHR5IHN0cmluZ3Mgd2hlbiBwcmVzZW50Jyk7XG4gICAgfVxuICAgIGxldCByZWNvZ25pemVkO1xuICAgIGlmIChyZWNvZ25pemVkT3B0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVjb2duaXplZCA9IG5ldyBNYXAoWy4uLk9iamVjdC5lbnRyaWVzKHJlY29nbml6ZWRPcHRpb24pLCAuLi5yZWNvZ25pemVkRGVmYXVsdC5lbnRyaWVzKCldKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlY29nbml6ZWQgPSByZWNvZ25pemVkRGVmYXVsdDtcbiAgICB9XG4gICAgZm9yIChjb25zdCBwYXJhbWV0ZXIgb2YgcHJvdGVjdGVkSGVhZGVyLmNyaXQpIHtcbiAgICAgICAgaWYgKCFyZWNvZ25pemVkLmhhcyhwYXJhbWV0ZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZChgRXh0ZW5zaW9uIEhlYWRlciBQYXJhbWV0ZXIgXCIke3BhcmFtZXRlcn1cIiBpcyBub3QgcmVjb2duaXplZGApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChqb3NlSGVhZGVyW3BhcmFtZXRlcl0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycihgRXh0ZW5zaW9uIEhlYWRlciBQYXJhbWV0ZXIgXCIke3BhcmFtZXRlcn1cIiBpcyBtaXNzaW5nYCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVjb2duaXplZC5nZXQocGFyYW1ldGVyKSAmJiBwcm90ZWN0ZWRIZWFkZXJbcGFyYW1ldGVyXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyKGBFeHRlbnNpb24gSGVhZGVyIFBhcmFtZXRlciBcIiR7cGFyYW1ldGVyfVwiIE1VU1QgYmUgaW50ZWdyaXR5IHByb3RlY3RlZGApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgU2V0KHByb3RlY3RlZEhlYWRlci5jcml0KTtcbn1cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlQ3JpdDtcbiIsImltcG9ydCBnbG9iYWxUaGlzLCB7IGlzQ2xvdWRmbGFyZVdvcmtlcnMsIGlzTm9kZUpzIH0gZnJvbSAnLi9nbG9iYWwuanMnO1xuaW1wb3J0IGNyeXB0bywgeyBpc0NyeXB0b0tleSB9IGZyb20gJy4vd2ViY3J5cHRvLmpzJztcbmltcG9ydCBpbnZhbGlkS2V5SW5wdXQgZnJvbSAnLi4vbGliL2ludmFsaWRfa2V5X2lucHV0LmpzJztcbmltcG9ydCB7IGVuY29kZUJhc2U2NCB9IGZyb20gJy4vYmFzZTY0dXJsLmpzJztcbmltcG9ydCBmb3JtYXRQRU0gZnJvbSAnLi4vbGliL2Zvcm1hdF9wZW0uanMnO1xuaW1wb3J0IHsgSk9TRU5vdFN1cHBvcnRlZCB9IGZyb20gJy4uL3V0aWwvZXJyb3JzLmpzJztcbmNvbnN0IGdlbmVyaWNFeHBvcnQgPSBhc3luYyAoa2V5VHlwZSwga2V5Rm9ybWF0LCBrZXkpID0+IHtcbiAgICBpZiAoIWlzQ3J5cHRvS2V5KGtleSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihpbnZhbGlkS2V5SW5wdXQoa2V5LCAnQ3J5cHRvS2V5JykpO1xuICAgIH1cbiAgICBpZiAoIWtleS5leHRyYWN0YWJsZSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDcnlwdG9LZXkgaXMgbm90IGV4dHJhY3RhYmxlJyk7XG4gICAgfVxuICAgIGlmIChrZXkudHlwZSAhPT0ga2V5VHlwZSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBrZXkgaXMgbm90IGEgJHtrZXlUeXBlfSBrZXlgKTtcbiAgICB9XG4gICAgcmV0dXJuIGZvcm1hdFBFTShlbmNvZGVCYXNlNjQobmV3IFVpbnQ4QXJyYXkoYXdhaXQgY3J5cHRvLnN1YnRsZS5leHBvcnRLZXkoa2V5Rm9ybWF0LCBrZXkpKSksIGAke2tleVR5cGUudG9VcHBlckNhc2UoKX0gS0VZYCk7XG59O1xuZXhwb3J0IGNvbnN0IHRvU1BLSSA9IChrZXkpID0+IHtcbiAgICByZXR1cm4gZ2VuZXJpY0V4cG9ydCgncHVibGljJywgJ3Nwa2knLCBrZXkpO1xufTtcbmV4cG9ydCBjb25zdCB0b1BLQ1M4ID0gKGtleSkgPT4ge1xuICAgIHJldHVybiBnZW5lcmljRXhwb3J0KCdwcml2YXRlJywgJ3BrY3M4Jywga2V5KTtcbn07XG5jb25zdCBnZXROYW1lZEN1cnZlID0gKGtleURhdGEpID0+IHtcbiAgICBjb25zdCBrZXlEYXRhU3RyID0ga2V5RGF0YS50b1N0cmluZygpO1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICBjYXNlIGtleURhdGFTdHIuaW5jbHVkZXMobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgMHgwNiwgMHgwNywgMHgyYSwgMHg4NiwgMHg0OCwgMHhjZSwgMHgzZCwgMHgwMiwgMHgwMSwgMHgwNiwgMHgwOCwgMHgyYSwgMHg4NiwgMHg0OCwgMHhjZSxcbiAgICAgICAgICAgIDB4M2QsIDB4MDMsIDB4MDEsIDB4MDcsXG4gICAgICAgIF0pLnRvU3RyaW5nKCkpOlxuICAgICAgICAgICAgcmV0dXJuICdQLTI1Nic7XG4gICAgICAgIGNhc2Uga2V5RGF0YVN0ci5pbmNsdWRlcyhuZXcgVWludDhBcnJheShbXG4gICAgICAgICAgICAweDA2LCAweDA3LCAweDJhLCAweDg2LCAweDQ4LCAweGNlLCAweDNkLCAweDAyLCAweDAxLCAweDA2LCAweDA1LCAweDJiLCAweDgxLCAweDA0LCAweDAwLFxuICAgICAgICAgICAgMHgyMixcbiAgICAgICAgXSkudG9TdHJpbmcoKSk6XG4gICAgICAgICAgICByZXR1cm4gJ1AtMzg0JztcbiAgICAgICAgY2FzZSBrZXlEYXRhU3RyLmluY2x1ZGVzKG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgICAgIDB4MDYsIDB4MDcsIDB4MmEsIDB4ODYsIDB4NDgsIDB4Y2UsIDB4M2QsIDB4MDIsIDB4MDEsIDB4MDYsIDB4MDUsIDB4MmIsIDB4ODEsIDB4MDQsIDB4MDAsXG4gICAgICAgICAgICAweDIzLFxuICAgICAgICBdKS50b1N0cmluZygpKTpcbiAgICAgICAgICAgIHJldHVybiAnUC01MjEnO1xuICAgICAgICBjYXNlIChpc0Nsb3VkZmxhcmVXb3JrZXJzKCkgfHwgaXNOb2RlSnMoKSkgJiZcbiAgICAgICAgICAgIGtleURhdGFTdHIuaW5jbHVkZXMobmV3IFVpbnQ4QXJyYXkoWzB4MDYsIDB4MDMsIDB4MmIsIDB4NjUsIDB4NzBdKS50b1N0cmluZygpKTpcbiAgICAgICAgICAgIHJldHVybiAnRWQyNTUxOSc7XG4gICAgICAgIGNhc2UgaXNOb2RlSnMoKSAmJlxuICAgICAgICAgICAga2V5RGF0YVN0ci5pbmNsdWRlcyhuZXcgVWludDhBcnJheShbMHgwNiwgMHgwMywgMHgyYiwgMHg2NSwgMHg3MV0pLnRvU3RyaW5nKCkpOlxuICAgICAgICAgICAgcmV0dXJuICdFZDQ0OCc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZCgnSW52YWxpZCBvciB1bnN1cHBvcnRlZCBFQyBLZXkgQ3VydmUgb3IgT0tQIEtleSBTdWIgVHlwZScpO1xuICAgIH1cbn07XG5jb25zdCBnZW5lcmljSW1wb3J0ID0gYXN5bmMgKHJlcGxhY2UsIGtleUZvcm1hdCwgcGVtLCBhbGcsIG9wdGlvbnMpID0+IHtcbiAgICB2YXIgX2E7XG4gICAgbGV0IGFsZ29yaXRobTtcbiAgICBsZXQga2V5VXNhZ2VzO1xuICAgIGNvbnN0IGtleURhdGEgPSBuZXcgVWludDhBcnJheShnbG9iYWxUaGlzXG4gICAgICAgIC5hdG9iKHBlbS5yZXBsYWNlKHJlcGxhY2UsICcnKSlcbiAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAubWFwKChjKSA9PiBjLmNoYXJDb2RlQXQoMCkpKTtcbiAgICBjb25zdCBpc1B1YmxpYyA9IGtleUZvcm1hdCA9PT0gJ3Nwa2knO1xuICAgIHN3aXRjaCAoYWxnKSB7XG4gICAgICAgIGNhc2UgJ1BTMjU2JzpcbiAgICAgICAgY2FzZSAnUFMzODQnOlxuICAgICAgICBjYXNlICdQUzUxMic6XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdSU0EtUFNTJywgaGFzaDogYFNIQS0ke2FsZy5zdWJzdHIoLTMpfWAgfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IGlzUHVibGljID8gWyd2ZXJpZnknXSA6IFsnc2lnbiddO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1JTMjU2JzpcbiAgICAgICAgY2FzZSAnUlMzODQnOlxuICAgICAgICBjYXNlICdSUzUxMic6XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdSU0FTU0EtUEtDUzEtdjFfNScsIGhhc2g6IGBTSEEtJHthbGcuc3Vic3RyKC0zKX1gIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBpc1B1YmxpYyA/IFsndmVyaWZ5J10gOiBbJ3NpZ24nXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdSU0EtT0FFUCc6XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQLTI1Nic6XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQLTM4NCc6XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQLTUxMic6XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ1JTQS1PQUVQJyxcbiAgICAgICAgICAgICAgICBoYXNoOiBgU0hBLSR7cGFyc2VJbnQoYWxnLnN1YnN0cigtMyksIDEwKSB8fCAxfWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gaXNQdWJsaWMgPyBbJ2VuY3J5cHQnLCAnd3JhcEtleSddIDogWydkZWNyeXB0JywgJ3Vud3JhcEtleSddO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0VTMjU2JzpcbiAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogJ0VDRFNBJywgbmFtZWRDdXJ2ZTogJ1AtMjU2JyB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gaXNQdWJsaWMgPyBbJ3ZlcmlmeSddIDogWydzaWduJ107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRVMzODQnOlxuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiAnUC0zODQnIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBpc1B1YmxpYyA/IFsndmVyaWZ5J10gOiBbJ3NpZ24nXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFUzUxMic6XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdFQ0RTQScsIG5hbWVkQ3VydmU6ICdQLTUyMScgfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IGlzUHVibGljID8gWyd2ZXJpZnknXSA6IFsnc2lnbiddO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0VDREgtRVMnOlxuICAgICAgICBjYXNlICdFQ0RILUVTK0ExMjhLVyc6XG4gICAgICAgIGNhc2UgJ0VDREgtRVMrQTE5MktXJzpcbiAgICAgICAgY2FzZSAnRUNESC1FUytBMjU2S1cnOlxuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNESCcsIG5hbWVkQ3VydmU6IGdldE5hbWVkQ3VydmUoa2V5RGF0YSkgfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IGlzUHVibGljID8gW10gOiBbJ2Rlcml2ZUJpdHMnXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChpc0Nsb3VkZmxhcmVXb3JrZXJzKCkgfHwgaXNOb2RlSnMoKSkgJiYgJ0VkRFNBJzpcbiAgICAgICAgICAgIGNvbnN0IG5hbWVkQ3VydmUgPSBnZXROYW1lZEN1cnZlKGtleURhdGEpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6IGBOT0RFLSR7bmFtZWRDdXJ2ZX1gLCBuYW1lZEN1cnZlOiBgTk9ERS0ke25hbWVkQ3VydmV9YCB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gaXNQdWJsaWMgPyBbJ3ZlcmlmeSddIDogWydzaWduJ107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdJbnZhbGlkIG9yIHVuc3VwcG9ydGVkIFwiYWxnXCIgKEFsZ29yaXRobSkgdmFsdWUnKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KGtleUZvcm1hdCwga2V5RGF0YSwgYWxnb3JpdGhtLCAoX2EgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZXh0cmFjdGFibGUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGZhbHNlLCBrZXlVc2FnZXMpO1xufTtcbmV4cG9ydCBjb25zdCBmcm9tUEtDUzggPSAocGVtLCBhbGcsIG9wdGlvbnMpID0+IHtcbiAgICByZXR1cm4gZ2VuZXJpY0ltcG9ydCgvKD86LS0tLS0oPzpCRUdJTnxFTkQpIFBSSVZBVEUgS0VZLS0tLS18XFxzKS9nLCAncGtjczgnLCBwZW0sIGFsZywgb3B0aW9ucyk7XG59O1xuZXhwb3J0IGNvbnN0IGZyb21TUEtJID0gKHBlbSwgYWxnLCBvcHRpb25zKSA9PiB7XG4gICAgcmV0dXJuIGdlbmVyaWNJbXBvcnQoLyg/Oi0tLS0tKD86QkVHSU58RU5EKSBQVUJMSUMgS0VZLS0tLS18XFxzKS9nLCAnc3BraScsIHBlbSwgYWxnLCBvcHRpb25zKTtcbn07XG4iLCJpbXBvcnQgeyBlbmNvZGVyLCBkZWNvZGVyIH0gZnJvbSAnLi4vbGliL2J1ZmZlcl91dGlscy5qcyc7XG5pbXBvcnQgZ2xvYmFsVGhpcyBmcm9tICcuL2dsb2JhbC5qcyc7XG5leHBvcnQgY29uc3QgZW5jb2RlQmFzZTY0ID0gKGlucHV0KSA9PiB7XG4gICAgbGV0IHVuZW5jb2RlZCA9IGlucHV0O1xuICAgIGlmICh0eXBlb2YgdW5lbmNvZGVkID09PSAnc3RyaW5nJykge1xuICAgICAgICB1bmVuY29kZWQgPSBlbmNvZGVyLmVuY29kZSh1bmVuY29kZWQpO1xuICAgIH1cbiAgICBjb25zdCBDSFVOS19TSVpFID0gMHg4MDAwO1xuICAgIGNvbnN0IGFyciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdW5lbmNvZGVkLmxlbmd0aDsgaSArPSBDSFVOS19TSVpFKSB7XG4gICAgICAgIGFyci5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgdW5lbmNvZGVkLnN1YmFycmF5KGksIGkgKyBDSFVOS19TSVpFKSkpO1xuICAgIH1cbiAgICByZXR1cm4gZ2xvYmFsVGhpcy5idG9hKGFyci5qb2luKCcnKSk7XG59O1xuZXhwb3J0IGNvbnN0IGVuY29kZSA9IChpbnB1dCkgPT4ge1xuICAgIHJldHVybiBlbmNvZGVCYXNlNjQoaW5wdXQpLnJlcGxhY2UoLz0vZywgJycpLnJlcGxhY2UoL1xcKy9nLCAnLScpLnJlcGxhY2UoL1xcLy9nLCAnXycpO1xufTtcbmV4cG9ydCBjb25zdCBkZWNvZGVCYXNlNjQgPSAoZW5jb2RlZCkgPT4ge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShnbG9iYWxUaGlzXG4gICAgICAgIC5hdG9iKGVuY29kZWQpXG4gICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgLm1hcCgoYykgPT4gYy5jaGFyQ29kZUF0KDApKSk7XG59O1xuZXhwb3J0IGNvbnN0IGRlY29kZSA9IChpbnB1dCkgPT4ge1xuICAgIGxldCBlbmNvZGVkID0gaW5wdXQ7XG4gICAgaWYgKGVuY29kZWQgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgIGVuY29kZWQgPSBkZWNvZGVyLmRlY29kZShlbmNvZGVkKTtcbiAgICB9XG4gICAgZW5jb2RlZCA9IGVuY29kZWQucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVCYXNlNjQoZW5jb2RlZCk7XG4gICAgfVxuICAgIGNhdGNoIChfYSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgaW5wdXQgdG8gYmUgZGVjb2RlZCBpcyBub3QgY29ycmVjdGx5IGVuY29kZWQuJyk7XG4gICAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IChhbGcsIGtleSkgPT4ge1xuICAgIGlmIChhbGcuc3RhcnRzV2l0aCgnSFMnKSkge1xuICAgICAgICBjb25zdCBiaXRsZW4gPSBwYXJzZUludChhbGcuc3Vic3RyKC0zKSwgMTApO1xuICAgICAgICBjb25zdCB7IGxlbmd0aCB9ID0ga2V5LmFsZ29yaXRobTtcbiAgICAgICAgaWYgKHR5cGVvZiBsZW5ndGggIT09ICdudW1iZXInIHx8IGxlbmd0aCA8IGJpdGxlbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHthbGd9IHJlcXVpcmVzIHN5bW1ldHJpYyBrZXlzIHRvIGJlICR7Yml0bGVufSBiaXRzIG9yIGxhcmdlcmApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChhbGcuc3RhcnRzV2l0aCgnUlMnKSB8fCBhbGcuc3RhcnRzV2l0aCgnUFMnKSkge1xuICAgICAgICBjb25zdCB7IG1vZHVsdXNMZW5ndGggfSA9IGtleS5hbGdvcml0aG07XG4gICAgICAgIGlmICh0eXBlb2YgbW9kdWx1c0xlbmd0aCAhPT0gJ251bWJlcicgfHwgbW9kdWx1c0xlbmd0aCA8IDIwNDgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7YWxnfSByZXF1aXJlcyBrZXkgbW9kdWx1c0xlbmd0aCB0byBiZSAyMDQ4IGJpdHMgb3IgbGFyZ2VyYCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiaW1wb3J0IGNyeXB0byBmcm9tICcuL3dlYmNyeXB0by5qcyc7XG5jb25zdCBkaWdlc3QgPSBhc3luYyAoYWxnb3JpdGhtLCBkYXRhKSA9PiB7XG4gICAgY29uc3Qgc3VidGxlRGlnZXN0ID0gYFNIQS0ke2FsZ29yaXRobS5zdWJzdHIoLTMpfWA7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGF3YWl0IGNyeXB0by5zdWJ0bGUuZGlnZXN0KHN1YnRsZURpZ2VzdCwgZGF0YSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGRpZ2VzdDtcbiIsImltcG9ydCB7IGlzQ2xvdWRmbGFyZVdvcmtlcnMsIGlzTm9kZUpzIH0gZnJvbSAnLi9nbG9iYWwuanMnO1xuaW1wb3J0IGNyeXB0byBmcm9tICcuL3dlYmNyeXB0by5qcyc7XG5pbXBvcnQgeyBKT1NFTm90U3VwcG9ydGVkIH0gZnJvbSAnLi4vdXRpbC9lcnJvcnMuanMnO1xuaW1wb3J0IHJhbmRvbSBmcm9tICcuL3JhbmRvbS5qcyc7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVTZWNyZXQoYWxnLCBvcHRpb25zKSB7XG4gICAgdmFyIF9hO1xuICAgIGxldCBsZW5ndGg7XG4gICAgbGV0IGFsZ29yaXRobTtcbiAgICBsZXQga2V5VXNhZ2VzO1xuICAgIHN3aXRjaCAoYWxnKSB7XG4gICAgICAgIGNhc2UgJ0hTMjU2JzpcbiAgICAgICAgY2FzZSAnSFMzODQnOlxuICAgICAgICBjYXNlICdIUzUxMic6XG4gICAgICAgICAgICBsZW5ndGggPSBwYXJzZUludChhbGcuc3Vic3RyKC0zKSwgMTApO1xuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnSE1BQycsIGhhc2g6IGBTSEEtJHtsZW5ndGh9YCwgbGVuZ3RoIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ3NpZ24nLCAndmVyaWZ5J107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnQTEyOENCQy1IUzI1Nic6XG4gICAgICAgIGNhc2UgJ0ExOTJDQkMtSFMzODQnOlxuICAgICAgICBjYXNlICdBMjU2Q0JDLUhTNTEyJzpcbiAgICAgICAgICAgIGxlbmd0aCA9IHBhcnNlSW50KGFsZy5zdWJzdHIoLTMpLCAxMCk7XG4gICAgICAgICAgICByZXR1cm4gcmFuZG9tKG5ldyBVaW50OEFycmF5KGxlbmd0aCA+PiAzKSk7XG4gICAgICAgIGNhc2UgJ0ExMjhLVyc6XG4gICAgICAgIGNhc2UgJ0ExOTJLVyc6XG4gICAgICAgIGNhc2UgJ0EyNTZLVyc6XG4gICAgICAgICAgICBsZW5ndGggPSBwYXJzZUludChhbGcuc3Vic3RyaW5nKDEsIDQpLCAxMCk7XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdBRVMtS1cnLCBsZW5ndGggfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IFsnd3JhcEtleScsICd1bndyYXBLZXknXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBMTI4R0NNS1cnOlxuICAgICAgICBjYXNlICdBMTkyR0NNS1cnOlxuICAgICAgICBjYXNlICdBMjU2R0NNS1cnOlxuICAgICAgICBjYXNlICdBMTI4R0NNJzpcbiAgICAgICAgY2FzZSAnQTE5MkdDTSc6XG4gICAgICAgIGNhc2UgJ0EyNTZHQ00nOlxuICAgICAgICAgICAgbGVuZ3RoID0gcGFyc2VJbnQoYWxnLnN1YnN0cmluZygxLCA0KSwgMTApO1xuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnQUVTLUdDTScsIGxlbmd0aCB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gWydlbmNyeXB0JywgJ2RlY3J5cHQnXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEpPU0VOb3RTdXBwb3J0ZWQoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgSldLIFwiYWxnXCIgKEFsZ29yaXRobSkgUGFyYW1ldGVyIHZhbHVlJyk7XG4gICAgfVxuICAgIHJldHVybiBjcnlwdG8uc3VidGxlLmdlbmVyYXRlS2V5KGFsZ29yaXRobSwgKF9hID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmV4dHJhY3RhYmxlKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBmYWxzZSwga2V5VXNhZ2VzKTtcbn1cbmZ1bmN0aW9uIGdldE1vZHVsdXNMZW5ndGhPcHRpb24ob3B0aW9ucykge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBtb2R1bHVzTGVuZ3RoID0gKF9hID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLm1vZHVsdXNMZW5ndGgpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDIwNDg7XG4gICAgaWYgKHR5cGVvZiBtb2R1bHVzTGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBtb2R1bHVzTGVuZ3RoIDwgMjA0OCkge1xuICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZCgnSW52YWxpZCBvciB1bnN1cHBvcnRlZCBtb2R1bHVzTGVuZ3RoIG9wdGlvbiBwcm92aWRlZCwgMjA0OCBiaXRzIG9yIGxhcmdlciBrZXlzIG11c3QgYmUgdXNlZCcpO1xuICAgIH1cbiAgICByZXR1cm4gbW9kdWx1c0xlbmd0aDtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUtleVBhaXIoYWxnLCBvcHRpb25zKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBsZXQgYWxnb3JpdGhtO1xuICAgIGxldCBrZXlVc2FnZXM7XG4gICAgc3dpdGNoIChhbGcpIHtcbiAgICAgICAgY2FzZSAnUFMyNTYnOlxuICAgICAgICBjYXNlICdQUzM4NCc6XG4gICAgICAgIGNhc2UgJ1BTNTEyJzpcbiAgICAgICAgICAgIGFsZ29yaXRobSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnUlNBLVBTUycsXG4gICAgICAgICAgICAgICAgaGFzaDogYFNIQS0ke2FsZy5zdWJzdHIoLTMpfWAsXG4gICAgICAgICAgICAgICAgcHVibGljRXhwb25lbnQ6IG5ldyBVaW50OEFycmF5KFsweDAxLCAweDAwLCAweDAxXSksXG4gICAgICAgICAgICAgICAgbW9kdWx1c0xlbmd0aDogZ2V0TW9kdWx1c0xlbmd0aE9wdGlvbihvcHRpb25zKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ3NpZ24nLCAndmVyaWZ5J107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnUlMyNTYnOlxuICAgICAgICBjYXNlICdSUzM4NCc6XG4gICAgICAgIGNhc2UgJ1JTNTEyJzpcbiAgICAgICAgICAgIGFsZ29yaXRobSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnUlNBU1NBLVBLQ1MxLXYxXzUnLFxuICAgICAgICAgICAgICAgIGhhc2g6IGBTSEEtJHthbGcuc3Vic3RyKC0zKX1gLFxuICAgICAgICAgICAgICAgIHB1YmxpY0V4cG9uZW50OiBuZXcgVWludDhBcnJheShbMHgwMSwgMHgwMCwgMHgwMV0pLFxuICAgICAgICAgICAgICAgIG1vZHVsdXNMZW5ndGg6IGdldE1vZHVsdXNMZW5ndGhPcHRpb24ob3B0aW9ucyksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gWydzaWduJywgJ3ZlcmlmeSddO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQJzpcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAtMjU2JzpcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAtMzg0JzpcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAtNTEyJzpcbiAgICAgICAgICAgIGFsZ29yaXRobSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnUlNBLU9BRVAnLFxuICAgICAgICAgICAgICAgIGhhc2g6IGBTSEEtJHtwYXJzZUludChhbGcuc3Vic3RyKC0zKSwgMTApIHx8IDF9YCxcbiAgICAgICAgICAgICAgICBwdWJsaWNFeHBvbmVudDogbmV3IFVpbnQ4QXJyYXkoWzB4MDEsIDB4MDAsIDB4MDFdKSxcbiAgICAgICAgICAgICAgICBtb2R1bHVzTGVuZ3RoOiBnZXRNb2R1bHVzTGVuZ3RoT3B0aW9uKG9wdGlvbnMpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IFsnZGVjcnlwdCcsICd1bndyYXBLZXknLCAnZW5jcnlwdCcsICd3cmFwS2V5J107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRVMyNTYnOlxuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiAnUC0yNTYnIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ3NpZ24nLCAndmVyaWZ5J107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRVMzODQnOlxuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiAnUC0zODQnIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ3NpZ24nLCAndmVyaWZ5J107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRVM1MTInOlxuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiAnUC01MjEnIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ3NpZ24nLCAndmVyaWZ5J107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoaXNDbG91ZGZsYXJlV29ya2VycygpIHx8IGlzTm9kZUpzKCkpICYmICdFZERTQSc6XG4gICAgICAgICAgICBzd2l0Y2ggKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jcnYpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgICAgICAgICBjYXNlICdFZDI1NTE5JzpcbiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnTk9ERS1FRDI1NTE5JywgbmFtZWRDdXJ2ZTogJ05PREUtRUQyNTUxOScgfTtcbiAgICAgICAgICAgICAgICAgICAga2V5VXNhZ2VzID0gWydzaWduJywgJ3ZlcmlmeSddO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGlzTm9kZUpzKCkgJiYgJ0VkNDQ4JzpcbiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnTk9ERS1FRDQ0OCcsIG5hbWVkQ3VydmU6ICdOT0RFLUVENDQ4JyB9O1xuICAgICAgICAgICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ3NpZ24nLCAndmVyaWZ5J107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdJbnZhbGlkIG9yIHVuc3VwcG9ydGVkIGNydiBvcHRpb24gcHJvdmlkZWQsIHN1cHBvcnRlZCB2YWx1ZXMgYXJlIEVkMjU1MTkgYW5kIEVkNDQ4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRUNESC1FUyc6XG4gICAgICAgIGNhc2UgJ0VDREgtRVMrQTEyOEtXJzpcbiAgICAgICAgY2FzZSAnRUNESC1FUytBMTkyS1cnOlxuICAgICAgICBjYXNlICdFQ0RILUVTK0EyNTZLVyc6XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdFQ0RIJywgbmFtZWRDdXJ2ZTogKF9hID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNydikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJ1AtMjU2JyB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gWydkZXJpdmVLZXknLCAnZGVyaXZlQml0cyddO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZCgnSW52YWxpZCBvciB1bnN1cHBvcnRlZCBKV0sgXCJhbGdcIiAoQWxnb3JpdGhtKSBQYXJhbWV0ZXIgdmFsdWUnKTtcbiAgICB9XG4gICAgcmV0dXJuIChjcnlwdG8uc3VidGxlLmdlbmVyYXRlS2V5KGFsZ29yaXRobSwgKF9iID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmV4dHJhY3RhYmxlKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBmYWxzZSwga2V5VXNhZ2VzKSk7XG59XG4iLCJpbXBvcnQgY3J5cHRvLCB7IGlzQ3J5cHRvS2V5IH0gZnJvbSAnLi93ZWJjcnlwdG8uanMnO1xuaW1wb3J0IHsgY2hlY2tTaWdDcnlwdG9LZXkgfSBmcm9tICcuLi9saWIvY3J5cHRvX2tleS5qcyc7XG5pbXBvcnQgaW52YWxpZEtleUlucHV0IGZyb20gJy4uL2xpYi9pbnZhbGlkX2tleV9pbnB1dC5qcyc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDcnlwdG9LZXkoYWxnLCBrZXksIHVzYWdlKSB7XG4gICAgaWYgKGlzQ3J5cHRvS2V5KGtleSkpIHtcbiAgICAgICAgY2hlY2tTaWdDcnlwdG9LZXkoa2V5LCBhbGcsIHVzYWdlKTtcbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgaWYgKCFhbGcuc3RhcnRzV2l0aCgnSFMnKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihpbnZhbGlkS2V5SW5wdXQoa2V5LCAnQ3J5cHRvS2V5JykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjcnlwdG8uc3VidGxlLmltcG9ydEtleSgncmF3Jywga2V5LCB7IGhhc2g6IGBTSEEtJHthbGcuc3Vic3RyKC0zKX1gLCBuYW1lOiAnSE1BQycgfSwgZmFsc2UsIFt1c2FnZV0pO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGludmFsaWRLZXlJbnB1dChrZXksICdDcnlwdG9LZXknLCAnVWludDhBcnJheScpKTtcbn1cbiIsImZ1bmN0aW9uIGdldEdsb2JhbCgpIHtcbiAgICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICByZXR1cm4gZ2xvYmFsVGhpcztcbiAgICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1bmFibGUgdG8gbG9jYXRlIGdsb2JhbCBvYmplY3QnKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGdldEdsb2JhbCgpO1xuZXhwb3J0IGZ1bmN0aW9uIGlzQ2xvdWRmbGFyZVdvcmtlcnMoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGdldEdsb2JhbCgpLldlYlNvY2tldFBhaXIgIT09IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaXNOb2RlSnMoKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gKChfYiA9IChfYSA9IGdldEdsb2JhbCgpLnByb2Nlc3MpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS52ZXJzaW9ucykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLm5vZGUpICE9PSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNhdGNoIChfYykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgaXNDcnlwdG9LZXkgfSBmcm9tICcuL3dlYmNyeXB0by5qcyc7XG5leHBvcnQgZGVmYXVsdCAoa2V5KSA9PiB7XG4gICAgcmV0dXJuIGlzQ3J5cHRvS2V5KGtleSk7XG59O1xuZXhwb3J0IGNvbnN0IHR5cGVzID0gWydDcnlwdG9LZXknXTtcbiIsImltcG9ydCBjcnlwdG8sIHsgaXNDcnlwdG9LZXkgfSBmcm9tICcuL3dlYmNyeXB0by5qcyc7XG5pbXBvcnQgaW52YWxpZEtleUlucHV0IGZyb20gJy4uL2xpYi9pbnZhbGlkX2tleV9pbnB1dC5qcyc7XG5pbXBvcnQgeyBlbmNvZGUgYXMgYmFzZTY0dXJsIH0gZnJvbSAnLi9iYXNlNjR1cmwuanMnO1xuY29uc3Qga2V5VG9KV0sgPSBhc3luYyAoa2V5KSA9PiB7XG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGt0eTogJ29jdCcsXG4gICAgICAgICAgICBrOiBiYXNlNjR1cmwoa2V5KSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCFpc0NyeXB0b0tleShrZXkpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoaW52YWxpZEtleUlucHV0KGtleSwgJ0NyeXB0b0tleScsICdVaW50OEFycmF5JykpO1xuICAgIH1cbiAgICBpZiAoIWtleS5leHRyYWN0YWJsZSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdub24tZXh0cmFjdGFibGUgQ3J5cHRvS2V5IGNhbm5vdCBiZSBleHBvcnRlZCBhcyBhIEpXSycpO1xuICAgIH1cbiAgICBjb25zdCB7IGV4dCwga2V5X29wcywgYWxnLCB1c2UsIC4uLmp3ayB9ID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5leHBvcnRLZXkoJ2p3aycsIGtleSk7XG4gICAgcmV0dXJuIGp3aztcbn07XG5leHBvcnQgZGVmYXVsdCBrZXlUb0pXSztcbiIsImltcG9ydCBjcnlwdG8gZnJvbSAnLi93ZWJjcnlwdG8uanMnO1xuZXhwb3J0IGRlZmF1bHQgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0byk7XG4iLCJpbXBvcnQgc3VidGxlQWxnb3JpdGhtIGZyb20gJy4vc3VidGxlX2RzYS5qcyc7XG5pbXBvcnQgY3J5cHRvIGZyb20gJy4vd2ViY3J5cHRvLmpzJztcbmltcG9ydCBjaGVja0tleUxlbmd0aCBmcm9tICcuL2NoZWNrX2tleV9sZW5ndGguanMnO1xuaW1wb3J0IGdldFNpZ25LZXkgZnJvbSAnLi9nZXRfc2lnbl92ZXJpZnlfa2V5LmpzJztcbmNvbnN0IHNpZ24gPSBhc3luYyAoYWxnLCBrZXksIGRhdGEpID0+IHtcbiAgICBjb25zdCBjcnlwdG9LZXkgPSBhd2FpdCBnZXRTaWduS2V5KGFsZywga2V5LCAnc2lnbicpO1xuICAgIGNoZWNrS2V5TGVuZ3RoKGFsZywgY3J5cHRvS2V5KTtcbiAgICBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCBjcnlwdG8uc3VidGxlLnNpZ24oc3VidGxlQWxnb3JpdGhtKGFsZywgY3J5cHRvS2V5LmFsZ29yaXRobS5uYW1lZEN1cnZlKSwgY3J5cHRvS2V5LCBkYXRhKTtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoc2lnbmF0dXJlKTtcbn07XG5leHBvcnQgZGVmYXVsdCBzaWduO1xuIiwiaW1wb3J0IHsgaXNDbG91ZGZsYXJlV29ya2VycywgaXNOb2RlSnMgfSBmcm9tICcuL2dsb2JhbC5qcyc7XG5pbXBvcnQgeyBKT1NFTm90U3VwcG9ydGVkIH0gZnJvbSAnLi4vdXRpbC9lcnJvcnMuanMnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3VidGxlRHNhKGFsZywgbmFtZWRDdXJ2ZSkge1xuICAgIGNvbnN0IGxlbmd0aCA9IHBhcnNlSW50KGFsZy5zdWJzdHIoLTMpLCAxMCk7XG4gICAgc3dpdGNoIChhbGcpIHtcbiAgICAgICAgY2FzZSAnSFMyNTYnOlxuICAgICAgICBjYXNlICdIUzM4NCc6XG4gICAgICAgIGNhc2UgJ0hTNTEyJzpcbiAgICAgICAgICAgIHJldHVybiB7IGhhc2g6IGBTSEEtJHtsZW5ndGh9YCwgbmFtZTogJ0hNQUMnIH07XG4gICAgICAgIGNhc2UgJ1BTMjU2JzpcbiAgICAgICAgY2FzZSAnUFMzODQnOlxuICAgICAgICBjYXNlICdQUzUxMic6XG4gICAgICAgICAgICByZXR1cm4geyBoYXNoOiBgU0hBLSR7bGVuZ3RofWAsIG5hbWU6ICdSU0EtUFNTJywgc2FsdExlbmd0aDogbGVuZ3RoID4+IDMgfTtcbiAgICAgICAgY2FzZSAnUlMyNTYnOlxuICAgICAgICBjYXNlICdSUzM4NCc6XG4gICAgICAgIGNhc2UgJ1JTNTEyJzpcbiAgICAgICAgICAgIHJldHVybiB7IGhhc2g6IGBTSEEtJHtsZW5ndGh9YCwgbmFtZTogJ1JTQVNTQS1QS0NTMS12MV81JyB9O1xuICAgICAgICBjYXNlICdFUzI1Nic6XG4gICAgICAgIGNhc2UgJ0VTMzg0JzpcbiAgICAgICAgY2FzZSAnRVM1MTInOlxuICAgICAgICAgICAgcmV0dXJuIHsgaGFzaDogYFNIQS0ke2xlbmd0aH1gLCBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlIH07XG4gICAgICAgIGNhc2UgKGlzQ2xvdWRmbGFyZVdvcmtlcnMoKSB8fCBpc05vZGVKcygpKSAmJiAnRWREU0EnOlxuICAgICAgICAgICAgcmV0dXJuIHsgbmFtZTogbmFtZWRDdXJ2ZSwgbmFtZWRDdXJ2ZSB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEpPU0VOb3RTdXBwb3J0ZWQoYGFsZyAke2FsZ30gaXMgbm90IHN1cHBvcnRlZCBlaXRoZXIgYnkgSk9TRSBvciB5b3VyIGphdmFzY3JpcHQgcnVudGltZWApO1xuICAgIH1cbn1cbiIsImltcG9ydCBnbG9iYWxUaGlzIGZyb20gJy4vZ2xvYmFsLmpzJztcbmV4cG9ydCBkZWZhdWx0IGdsb2JhbFRoaXMuY3J5cHRvO1xuZXhwb3J0IGZ1bmN0aW9uIGlzQ3J5cHRvS2V5KGtleSkge1xuICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcy5DcnlwdG9LZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGtleSAhPSBudWxsICYmIGtleSBpbnN0YW5jZW9mIGdsb2JhbFRoaXMuQ3J5cHRvS2V5O1xufVxuIiwiaW1wb3J0ICogYXMgYmFzZTY0dXJsIGZyb20gJy4uL3J1bnRpbWUvYmFzZTY0dXJsLmpzJztcbmV4cG9ydCBjb25zdCBlbmNvZGUgPSBiYXNlNjR1cmwuZW5jb2RlO1xuZXhwb3J0IGNvbnN0IGRlY29kZSA9IGJhc2U2NHVybC5kZWNvZGU7XG4iLCJleHBvcnQgY2xhc3MgSk9TRUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5jb2RlID0gJ0VSUl9KT1NFX0dFTkVSSUMnO1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgIChfYSA9IEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChFcnJvciwgdGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSk9TRV9HRU5FUklDJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkIGV4dGVuZHMgSk9TRUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBjbGFpbSA9ICd1bnNwZWNpZmllZCcsIHJlYXNvbiA9ICd1bnNwZWNpZmllZCcpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldUX0NMQUlNX1ZBTElEQVRJT05fRkFJTEVEJztcbiAgICAgICAgdGhpcy5jbGFpbSA9IGNsYWltO1xuICAgICAgICB0aGlzLnJlYXNvbiA9IHJlYXNvbjtcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KV1RfQ0xBSU1fVkFMSURBVElPTl9GQUlMRUQnO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBKV1RFeHBpcmVkIGV4dGVuZHMgSk9TRUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBjbGFpbSA9ICd1bnNwZWNpZmllZCcsIHJlYXNvbiA9ICd1bnNwZWNpZmllZCcpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldUX0VYUElSRUQnO1xuICAgICAgICB0aGlzLmNsYWltID0gY2xhaW07XG4gICAgICAgIHRoaXMucmVhc29uID0gcmVhc29uO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXVF9FWFBJUkVEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSk9TRUFsZ05vdEFsbG93ZWQgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pPU0VfQUxHX05PVF9BTExPV0VEJztcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KT1NFX0FMR19OT1RfQUxMT1dFRCc7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEpPU0VOb3RTdXBwb3J0ZWQgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pPU0VfTk9UX1NVUFBPUlRFRCc7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSk9TRV9OT1RfU1VQUE9SVEVEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldFRGVjcnlwdGlvbkZhaWxlZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldFX0RFQ1JZUFRJT05fRkFJTEVEJztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJ2RlY3J5cHRpb24gb3BlcmF0aW9uIGZhaWxlZCc7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSldFX0RFQ1JZUFRJT05fRkFJTEVEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldFSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldFX0lOVkFMSUQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXRV9JTlZBTElEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldTSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldTX0lOVkFMSUQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXU19JTlZBTElEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldUSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldUX0lOVkFMSUQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXVF9JTlZBTElEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldLSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldLX0lOVkFMSUQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXS19JTlZBTElEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldLU0ludmFsaWQgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXS1NfSU5WQUxJRCc7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSldLU19JTlZBTElEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldLU05vTWF0Y2hpbmdLZXkgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXS1NfTk9fTUFUQ0hJTkdfS0VZJztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJ25vIGFwcGxpY2FibGUga2V5IGZvdW5kIGluIHRoZSBKU09OIFdlYiBLZXkgU2V0JztcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KV0tTX05PX01BVENISU5HX0tFWSc7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEpXS1NNdWx0aXBsZU1hdGNoaW5nS2V5cyBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldLU19NVUxUSVBMRV9NQVRDSElOR19LRVlTJztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJ211bHRpcGxlIG1hdGNoaW5nIGtleXMgZm91bmQgaW4gdGhlIEpTT04gV2ViIEtleSBTZXQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXS1NfTVVMVElQTEVfTUFUQ0hJTkdfS0VZUyc7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEpXS1NUaW1lb3V0IGV4dGVuZHMgSk9TRUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5jb2RlID0gJ0VSUl9KV0tTX1RJTUVPVVQnO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSAncmVxdWVzdCB0aW1lZCBvdXQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXS1NfVElNRU9VVCc7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEpXU1NpZ25hdHVyZVZlcmlmaWNhdGlvbkZhaWxlZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldTX1NJR05BVFVSRV9WRVJJRklDQVRJT05fRkFJTEVEJztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJ3NpZ25hdHVyZSB2ZXJpZmljYXRpb24gZmFpbGVkJztcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KV1NfU0lHTkFUVVJFX1ZFUklGSUNBVElPTl9GQUlMRUQnO1xuICAgIH1cbn1cbiIsImltcG9ydCBzYWZhcmlGaXggZnJvbSAnc2FmYXJpLTE0LWlkYi1maXgnO1xuXG5mdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyBAdHMtaWdub3JlIC0gZmlsZSBzaXplIGhhY2tzXG4gICAgICAgIHJlcXVlc3Qub25jb21wbGV0ZSA9IHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4gcmVzb2x2ZShyZXF1ZXN0LnJlc3VsdCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmUgLSBmaWxlIHNpemUgaGFja3NcbiAgICAgICAgcmVxdWVzdC5vbmFib3J0ID0gcmVxdWVzdC5vbmVycm9yID0gKCkgPT4gcmVqZWN0KHJlcXVlc3QuZXJyb3IpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gY3JlYXRlU3RvcmUoZGJOYW1lLCBzdG9yZU5hbWUpIHtcbiAgICBjb25zdCBkYnAgPSBzYWZhcmlGaXgoKS50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKGRiTmFtZSk7XG4gICAgICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gKCkgPT4gcmVxdWVzdC5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCk7XG4gICAgfSk7XG4gICAgcmV0dXJuICh0eE1vZGUsIGNhbGxiYWNrKSA9PiBkYnAudGhlbigoZGIpID0+IGNhbGxiYWNrKGRiLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgdHhNb2RlKS5vYmplY3RTdG9yZShzdG9yZU5hbWUpKSk7XG59XG5sZXQgZGVmYXVsdEdldFN0b3JlRnVuYztcbmZ1bmN0aW9uIGRlZmF1bHRHZXRTdG9yZSgpIHtcbiAgICBpZiAoIWRlZmF1bHRHZXRTdG9yZUZ1bmMpIHtcbiAgICAgICAgZGVmYXVsdEdldFN0b3JlRnVuYyA9IGNyZWF0ZVN0b3JlKCdrZXl2YWwtc3RvcmUnLCAna2V5dmFsJyk7XG4gICAgfVxuICAgIHJldHVybiBkZWZhdWx0R2V0U3RvcmVGdW5jO1xufVxuLyoqXG4gKiBHZXQgYSB2YWx1ZSBieSBpdHMga2V5LlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBnZXQoa2V5LCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXQoa2V5KSkpO1xufVxuLyoqXG4gKiBTZXQgYSB2YWx1ZSB3aXRoIGEga2V5LlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHNldChrZXksIHZhbHVlLCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgc3RvcmUucHV0KHZhbHVlLCBrZXkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIFNldCBtdWx0aXBsZSB2YWx1ZXMgYXQgb25jZS4gVGhpcyBpcyBmYXN0ZXIgdGhhbiBjYWxsaW5nIHNldCgpIG11bHRpcGxlIHRpbWVzLlxuICogSXQncyBhbHNvIGF0b21pYyDigJMgaWYgb25lIG9mIHRoZSBwYWlycyBjYW4ndCBiZSBhZGRlZCwgbm9uZSB3aWxsIGJlIGFkZGVkLlxuICpcbiAqIEBwYXJhbSBlbnRyaWVzIEFycmF5IG9mIGVudHJpZXMsIHdoZXJlIGVhY2ggZW50cnkgaXMgYW4gYXJyYXkgb2YgYFtrZXksIHZhbHVlXWAuXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gc2V0TWFueShlbnRyaWVzLCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4gc3RvcmUucHV0KGVudHJ5WzFdLCBlbnRyeVswXSkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG4vKipcbiAqIEdldCBtdWx0aXBsZSB2YWx1ZXMgYnkgdGhlaXIga2V5c1xuICpcbiAqIEBwYXJhbSBrZXlzXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFueShrZXlzLCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4gUHJvbWlzZS5hbGwoa2V5cy5tYXAoKGtleSkgPT4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS5nZXQoa2V5KSkpKSk7XG59XG4vKipcbiAqIFVwZGF0ZSBhIHZhbHVlLiBUaGlzIGxldHMgeW91IHNlZSB0aGUgb2xkIHZhbHVlIGFuZCB1cGRhdGUgaXQgYXMgYW4gYXRvbWljIG9wZXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdXBkYXRlciBBIGNhbGxiYWNrIHRoYXQgdGFrZXMgdGhlIG9sZCB2YWx1ZSBhbmQgcmV0dXJucyBhIG5ldyB2YWx1ZS5cbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiB1cGRhdGUoa2V5LCB1cGRhdGVyLCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IFxuICAgIC8vIE5lZWQgdG8gY3JlYXRlIHRoZSBwcm9taXNlIG1hbnVhbGx5LlxuICAgIC8vIElmIEkgdHJ5IHRvIGNoYWluIHByb21pc2VzLCB0aGUgdHJhbnNhY3Rpb24gY2xvc2VzIGluIGJyb3dzZXJzXG4gICAgLy8gdGhhdCB1c2UgYSBwcm9taXNlIHBvbHlmaWxsIChJRTEwLzExKS5cbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHN0b3JlLmdldChrZXkpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc3RvcmUucHV0KHVwZGF0ZXIodGhpcy5yZXN1bHQpLCBrZXkpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUocHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pKTtcbn1cbi8qKlxuICogRGVsZXRlIGEgcGFydGljdWxhciBrZXkgZnJvbSB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGRlbChrZXksIGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBzdG9yZS5kZWxldGUoa2V5KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBEZWxldGUgbXVsdGlwbGUga2V5cyBhdCBvbmNlLlxuICpcbiAqIEBwYXJhbSBrZXlzIExpc3Qgb2Yga2V5cyB0byBkZWxldGUuXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZGVsTWFueShrZXlzLCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHN0b3JlLmRlbGV0ZShrZXkpKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBDbGVhciBhbGwgdmFsdWVzIGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gY2xlYXIoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIHN0b3JlLmNsZWFyKCk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGVhY2hDdXJzb3IoY3VzdG9tU3RvcmUsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkb25seScsIChzdG9yZSkgPT4ge1xuICAgICAgICAvLyBUaGlzIHdvdWxkIGJlIHN0b3JlLmdldEFsbEtleXMoKSwgYnV0IGl0IGlzbid0IHN1cHBvcnRlZCBieSBFZGdlIG9yIFNhZmFyaS5cbiAgICAgICAgLy8gQW5kIG9wZW5LZXlDdXJzb3IgaXNuJ3Qgc3VwcG9ydGVkIGJ5IFNhZmFyaS5cbiAgICAgICAgc3RvcmUub3BlbkN1cnNvcigpLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5yZXN1bHQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5yZXN1bHQpO1xuICAgICAgICAgICAgdGhpcy5yZXN1bHQuY29udGludWUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgYWxsIGtleXMgaW4gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBrZXlzKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIHJldHVybiBlYWNoQ3Vyc29yKGN1c3RvbVN0b3JlLCAoY3Vyc29yKSA9PiBpdGVtcy5wdXNoKGN1cnNvci5rZXkpKS50aGVuKCgpID0+IGl0ZW1zKTtcbn1cbi8qKlxuICogR2V0IGFsbCB2YWx1ZXMgaW4gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiB2YWx1ZXMoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgcmV0dXJuIGVhY2hDdXJzb3IoY3VzdG9tU3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goY3Vyc29yLnZhbHVlKSkudGhlbigoKSA9PiBpdGVtcyk7XG59XG4vKipcbiAqIEdldCBhbGwgZW50cmllcyBpbiB0aGUgc3RvcmUuIEVhY2ggZW50cnkgaXMgYW4gYXJyYXkgb2YgYFtrZXksIHZhbHVlXWAuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGVudHJpZXMoY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgcmV0dXJuIGVhY2hDdXJzb3IoY3VzdG9tU3RvcmUsIChjdXJzb3IpID0+IGl0ZW1zLnB1c2goW2N1cnNvci5rZXksIGN1cnNvci52YWx1ZV0pKS50aGVuKCgpID0+IGl0ZW1zKTtcbn1cblxuZXhwb3J0IHsgY2xlYXIsIGNyZWF0ZVN0b3JlLCBkZWwsIGRlbE1hbnksIGVudHJpZXMsIGdldCwgZ2V0TWFueSwga2V5cywgcHJvbWlzaWZ5UmVxdWVzdCwgc2V0LCBzZXRNYW55LCB1cGRhdGUsIHZhbHVlcyB9O1xuIiwiLyoqXG4gKiBXb3JrIGFyb3VuZCBTYWZhcmkgMTQgSW5kZXhlZERCIG9wZW4gYnVnLlxuICpcbiAqIFNhZmFyaSBoYXMgYSBob3JyaWJsZSBidWcgd2hlcmUgSURCIHJlcXVlc3RzIGNhbiBoYW5nIHdoaWxlIHRoZSBicm93c2VyIGlzIHN0YXJ0aW5nIHVwLiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MjI2NTQ3XG4gKiBUaGUgb25seSBzb2x1dGlvbiBpcyB0byBrZWVwIG51ZGdpbmcgaXQgdW50aWwgaXQncyBhd2FrZS5cbiAqL1xuZnVuY3Rpb24gaWRiUmVhZHkoKSB7XG4gICAgdmFyIGlzU2FmYXJpID0gIW5hdmlnYXRvci51c2VyQWdlbnREYXRhICYmXG4gICAgICAgIC9TYWZhcmlcXC8vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiZcbiAgICAgICAgIS9DaHJvbShlfGl1bSlcXC8vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgLy8gTm8gcG9pbnQgcHV0dGluZyBvdGhlciBicm93c2VycyBvciBvbGRlciB2ZXJzaW9ucyBvZiBTYWZhcmkgdGhyb3VnaCB0aGlzIG1lc3MuXG4gICAgaWYgKCFpc1NhZmFyaSB8fCAhaW5kZXhlZERCLmRhdGFiYXNlcylcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIHZhciBpbnRlcnZhbElkO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICB2YXIgdHJ5SWRiID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gaW5kZXhlZERCLmRhdGFiYXNlcygpLmZpbmFsbHkocmVzb2x2ZSk7IH07XG4gICAgICAgIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCh0cnlJZGIsIDEwMCk7XG4gICAgICAgIHRyeUlkYigpO1xuICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24gKCkgeyByZXR1cm4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTsgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlkYlJlYWR5O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBiYXNlNjQgZnJvbSAnYmFzZTY0LWpzJ1xuaW1wb3J0ICogYXMgaWRiS3YgZnJvbSAnaWRiLWtleXZhbCdcbmltcG9ydCBicm9rZXJTb3VyY2UgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhbGxuZXRwMnAvYW4tYnJva2VyL2Rpc3QvYW4tYnJva2VyLmpzP3JhdydcbmltcG9ydCB7IEFuSWRlbnRpdHlDb25maWcsIEFuSWRlbnRpdHkgfSBmcm9tICdAYWxsbmV0cDJwL2FuLWlkZW50aXR5J1xuXG4oYXN5bmMgKCkgPT4ge1xuICBjb25zdCBpZGVudGl0eUNvbmZpZyA9IG5ldyBBbklkZW50aXR5Q29uZmlnKClcbiAgY29uc3QgaWRlbnRpdHkgPSBhd2FpdCBBbklkZW50aXR5LmNyZWF0ZUFuSWRlbnRpdHkoaWRlbnRpdHlDb25maWcpXG4gIGNvbnNvbGUubG9nKCdAQC1sb2FkZXItQEAgLSBpZGVudGl0eTogJywgaWRlbnRpdHkpXG5cbiAgY29uc29sZS5sb2coJ0BALWxvYWRlci1AQCAtIGJyb2tlciBzb3VyY2U6ICcsIGJyb2tlclNvdXJjZSlcblxuICBjb25zdCBicm9rZXJCbG9iID0gbmV3IEJsb2IoXG4gICAgW2Jyb2tlclNvdXJjZV0sXG4gICAgeyB0eXBlOiAnYXBwbGljYXRpb24vamF2YXNjcmlwdCcgfVxuICApXG5cbiAgY29uc29sZS5sb2coJ0BALWxvYWRlci1AQCAtIGJyb2tlciBibG9iOiAnLCBicm9rZXJCbG9iKVxuXG4gIGNvbnN0IGJyb2tlclVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYnJva2VyQmxvYilcblxuICBjb25zb2xlLmxvZygnQEAtbG9hZGVyLUBAIC0gYnJva2VyIHVybDogJywgYnJva2VyVXJsKVxuXG4gIGNvbnN0IGJyb2tlcldvcmtlciA9IG5ldyBXb3JrZXIoYnJva2VyVXJsKVxuXG4gIFVSTC5yZXZva2VPYmplY3RVUkwoYnJva2VyVXJsKVxuXG4gIGNvbnNvbGUubG9nKCdAQC1sb2FkZXItQEAgLSBicm9rZXIgd29ya2VyOiAnLCBicm9rZXJXb3JrZXIpXG5cbiAgYnJva2VyV29ya2VyLm9ubWVzc2FnZSA9IGV2dCA9PiB7XG4gICAgY29uc3QgZGF0YSA9IGV2dC5kYXRhXG4gICAgaWYgKGRhdGEudHlwZSA9PT0gJ3JlZ2lzdGVyTW9kdWxlJykge1xuICAgICAgYnJva2VyV29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgZGlyOiAncmVzJyxcbiAgICAgICAgbXNnSWQ6IGRhdGEubXNnSWRcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGJyb2tlcldvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGRpcjogJ3JlcycsXG4gICAgICAgIG1zZ0lkOiBkYXRhLm1zZ0lkLFxuICAgICAgICBlcnJvcjogJ3VuaGFuZGxlZCByZXEgdHlwZTogJyArIGRhdGEudHlwZVxuICAgICAgfSlcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coJ0BALWxvYWRlci1AQCAtIGJyb2tlciBtZXNzYWdlOiAnLCBldnQuZGF0YSlcbiAgfVxuXG4gIC8vIGJyb2tlcldvcmtlci5wb3N0TWVzc2FnZSgndGVzdC1tZXNzYWdlLWZyb20tYW4tbG9hZGVyJylcblxuICBjb25zdCBwYXNzcGhyYXNlID0gYXdhaXQgZ2V0VXNlclBhc3NwaHJhc2UoKVxuICBjb25zdCBzaWduS2V5cGFpciA9IGF3YWl0IGxvYWRPckdlbmVyYXRlU2lnbmF0dXJlS2V5cGFpcihwYXNzcGhyYXNlKVxuXG4gIGNvbnNvbGUubG9nKCdTSUdOIEtFWVBBSVIgSURFTlRJVFknLCBzaWduS2V5cGFpcilcblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbiBkZWJ1Zz8nKVxuICB9LCAxMDAwKVxufSkoKS50aGVuKCgpID0+IHt9LCBlcnIgPT4ge1xuICBjb25zb2xlLmVycm9yKGVycilcbn0pXG5cbi8qKlxuICogVGhpcyBpcyBhIHN0dWIgcmlnaHQgbm93IHRoYXQganVzdCByZXR1cm5zIHRoZSBwYXNzcGhyYXNlXG4gKiAncGFzc3BocmFzZScgOiApXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdldFVzZXJQYXNzcGhyYXNlICgpIHtcbiAgY29uc3QgcGFzc3BocmFzZVJhdyA9IChuZXcgVGV4dEVuY29kZXIoKSkuZW5jb2RlKCdwYXNzcGhyYXNlJylcblxuICBjb25zb2xlLmxvZygnQEAtbG9hZGVyLUBAIC0gcGFzc3BocmFzZVJhdzogJywgcGFzc3BocmFzZVJhdylcblxuICBjb25zdCBwYXNzcGhyYXNlID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5pbXBvcnRLZXkoXG4gICAgJ3JhdycsXG4gICAgcGFzc3BocmFzZVJhdy5idWZmZXIsXG4gICAgJ1BCS0RGMicsXG4gICAgZmFsc2UsXG4gICAgWydkZXJpdmVLZXknXVxuICApXG5cbiAgY29uc29sZS5sb2coJ0BALWxvYWRlci1AQCAtIHBhc3NwaHJhc2U6ICcsIHBhc3NwaHJhc2UpXG5cbiAgcmV0dXJuIHBhc3NwaHJhc2Vcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSwgZW5jcnlwdCwgc3RvcmUsIGFuZCByZXR1cm4gYSBuZXcgc2lnbmF0dXJlIGtleXBhaXIuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlTmV3U2lnbmF0dXJlS2V5cGFpciAocGFzc3BocmFzZSkge1xuICBjb25zdCBzaWduQ3VydmUgPSAnUC0zODQnXG4gIGNvbnN0IHBia2RmMkhhc2hBbGdvID0gJ1NIQS01MTInXG4gIGNvbnN0IHBia2RmMkl0ZXJhdGlvbnMgPSAyMDAwMDBcblxuICBjb25zdCBzaWduS2V5cGFpciA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuZ2VuZXJhdGVLZXkoXG4gICAge1xuICAgICAgbmFtZTogJ0VDRFNBJyxcbiAgICAgIG5hbWVkQ3VydmU6IHNpZ25DdXJ2ZVxuICAgIH0sXG4gICAgdHJ1ZSxcbiAgICBbJ3NpZ24nLCAndmVyaWZ5J11cbiAgKVxuXG4gIGNvbnNvbGUubG9nKCdAQC1sb2FkZXItQEAgLSBzaWduS2V5cGFpcjogJywgc2lnbktleXBhaXIpXG5cbiAgY29uc3QgcGJrZGYyU2FsdCA9IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMjQpKVxuXG4gIGNvbnN0IHBia2RmMnN0YXJ0ID0gRGF0ZS5ub3coKVxuICBjb25zdCBzZWNyZXRLZXkgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmRlcml2ZUtleShcbiAgICB7XG4gICAgICBuYW1lOiAnUEJLREYyJyxcbiAgICAgIGhhc2g6IHBia2RmMkhhc2hBbGdvLFxuICAgICAgc2FsdDogcGJrZGYyU2FsdCxcbiAgICAgIGl0ZXJhdGlvbnM6IHBia2RmMkl0ZXJhdGlvbnNcbiAgICB9LFxuICAgIHBhc3NwaHJhc2UsXG4gICAge1xuICAgICAgbmFtZTogJ0FFUy1HQ00nLFxuICAgICAgbGVuZ3RoOiA4ICogMzJcbiAgICB9LFxuICAgIGZhbHNlLFxuICAgIFsnd3JhcEtleScsICd1bndyYXBLZXknXVxuICApXG4gIGNvbnN0IHBia2RmMmVuZCA9IERhdGUubm93KClcblxuICBjb25zb2xlLmxvZyhcbiAgICAnQEAtbG9hZGVyLUBAIC0gc2VjcmV0S2V5IChpbicsXG4gICAgcGJrZGYyZW5kIC0gcGJrZGYyc3RhcnQsXG4gICAgJ21zKTogJyxcbiAgICBzZWNyZXRLZXlcbiAgKVxuXG4gIGNvbnN0IGFlc0djbUl2ID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgyNCkpXG5cbiAgY29uc3Qgc2F2ZVByaXZLZXkgPSBhd2FpdCBjcnlwdG8uc3VidGxlLndyYXBLZXkoXG4gICAgJ2p3aycsXG4gICAgc2lnbktleXBhaXIucHJpdmF0ZUtleSxcbiAgICBzZWNyZXRLZXksXG4gICAge1xuICAgICAgbmFtZTogJ0FFUy1HQ00nLFxuICAgICAgaXY6IGFlc0djbUl2LFxuICAgICAgdGFnTGVuZ3RoOiAxMjhcbiAgICB9XG4gIClcblxuICBjb25zb2xlLmxvZygnQEAtbG9hZGVyLUBAIC0gc2F2ZVByaXZLZXk6ICcsIHNhdmVQcml2S2V5KVxuXG4gIGNvbnN0IHNhdmVQdWJLZXkgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmV4cG9ydEtleShcbiAgICAnandrJyxcbiAgICBzaWduS2V5cGFpci5wdWJsaWNLZXlcbiAgKVxuXG4gIGNvbnNvbGUubG9nKCdAQC1sb2FkZXItQEAgLSBzYXZlUHViS2V5OiAnLCBzYXZlUHViS2V5KVxuXG4gIGNvbnN0IHNpZ25LZXlwYWlyRW5jID0ge1xuICAgIHBia2RmMkhhc2hBbGdvLFxuICAgIHBia2RmMkl0ZXJhdGlvbnMsXG4gICAgcGJrZGYyU2FsdDogYmFzZTY0LmZyb21CeXRlQXJyYXkocGJrZGYyU2FsdCksXG4gICAgYWVzR2NtSXY6IGJhc2U2NC5mcm9tQnl0ZUFycmF5KGFlc0djbUl2KSxcbiAgICBwcml2YXRlS2V5OiBiYXNlNjQuZnJvbUJ5dGVBcnJheShuZXcgVWludDhBcnJheShzYXZlUHJpdktleSkpLFxuICAgIHB1YmxpY0tleTogc2F2ZVB1YktleVxuICB9XG5cbiAgY29uc29sZS5sb2coJ0BALWxvYWRlci1AQCAtIHNpZ25LZXlwYWlyRW5jOiAnLCBzaWduS2V5cGFpckVuYylcblxuICBhd2FpdCBpZGJLdi5zZXQoJ3NpZ25LZXlwYWlyJywgc2lnbktleXBhaXJFbmMpXG5cbiAgcmV0dXJuIHtcbiAgICBwcml2YXRlS2V5OiBzaWduS2V5cGFpci5wcml2YXRlS2V5LFxuICAgIHB1YmxpY0tleTogc2lnbktleXBhaXIucHVibGljS2V5LFxuICAgIHB1YmxpY0tleUp3azogc2lnbktleXBhaXJFbmMucHVibGljS2V5XG4gIH1cbn1cblxuLyoqXG4gKiBMb2FkIG9yIGdlbmVyYXRlIGEgbmV3IHNpZ25hdHVyZSBrZXlwYWlyLlxuICovXG5hc3luYyBmdW5jdGlvbiBsb2FkT3JHZW5lcmF0ZVNpZ25hdHVyZUtleXBhaXIgKHBhc3NwaHJhc2UpIHtcbiAgY29uc3Qgc2lnbkN1cnZlID0gJ1AtMzg0J1xuXG4gIGNvbnN0IHNpZ25LZXlwYWlyRW5jID0gYXdhaXQgKGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IGlkYkt2LmdldCgnc2lnbktleXBhaXInKVxuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH0pKClcblxuICBpZiAoIXNpZ25LZXlwYWlyRW5jKSB7XG4gICAgY29uc29sZS5sb2coJ0BALWxvYWRlci1AQCAtIG5vIGtleXBhaXIgaW4gZGIsIEdFTkVSQVRJTkcgTkVXJylcbiAgICByZXR1cm4gYXdhaXQgZ2VuZXJhdGVOZXdTaWduYXR1cmVLZXlwYWlyKHBhc3NwaHJhc2UpXG4gIH1cblxuICBjb25zb2xlLmxvZygnQEAtbG9hZGVyLUBAIC0gbG9hZGVkIHN0b3JlZCBrZXlwYWlyOiAnLCBzaWduS2V5cGFpckVuYylcblxuICBjb25zdCBwYmtkZjJTYWx0ID0gYmFzZTY0LnRvQnl0ZUFycmF5KHNpZ25LZXlwYWlyRW5jLnBia2RmMlNhbHQpXG5cbiAgY29uc3QgcGJrZGYyc3RhcnQgPSBEYXRlLm5vdygpXG4gIGNvbnN0IHNlY3JldEtleSA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuZGVyaXZlS2V5KFxuICAgIHtcbiAgICAgIG5hbWU6ICdQQktERjInLFxuICAgICAgaGFzaDogc2lnbktleXBhaXJFbmMucGJrZGYySGFzaEFsZ28sXG4gICAgICBzYWx0OiBwYmtkZjJTYWx0LFxuICAgICAgaXRlcmF0aW9uczogc2lnbktleXBhaXJFbmMucGJrZGYySXRlcmF0aW9uc1xuICAgIH0sXG4gICAgcGFzc3BocmFzZSxcbiAgICB7XG4gICAgICBuYW1lOiAnQUVTLUdDTScsXG4gICAgICBsZW5ndGg6IDggKiAzMlxuICAgIH0sXG4gICAgZmFsc2UsXG4gICAgWyd3cmFwS2V5JywgJ3Vud3JhcEtleSddXG4gIClcblxuICBjb25zdCBwYmtkZjJlbmQgPSBEYXRlLm5vdygpXG5cbiAgY29uc29sZS5sb2coXG4gICAgJ0BALWxvYWRlci1AQCAtIHNlY3JldEtleSAoaW4nLFxuICAgIHBia2RmMmVuZCAtIHBia2RmMnN0YXJ0LFxuICAgICdtcyk6ICcsXG4gICAgc2VjcmV0S2V5XG4gIClcblxuICBjb25zdCBhZXNHY21JdiA9IGJhc2U2NC50b0J5dGVBcnJheShzaWduS2V5cGFpckVuYy5hZXNHY21JdilcblxuICBjb25zdCBzaWduUHJpdktleSA9IGF3YWl0IGNyeXB0by5zdWJ0bGUudW53cmFwS2V5KFxuICAgICdqd2snLFxuICAgIGJhc2U2NC50b0J5dGVBcnJheShzaWduS2V5cGFpckVuYy5wcml2YXRlS2V5KSxcbiAgICBzZWNyZXRLZXksXG4gICAge1xuICAgICAgbmFtZTogJ0FFUy1HQ00nLFxuICAgICAgaXY6IGFlc0djbUl2LFxuICAgICAgdGFnTGVuZ3RoOiAxMjhcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdFQ0RTQScsXG4gICAgICBuYW1lZEN1cnZlOiBzaWduQ3VydmVcbiAgICB9LFxuICAgIHRydWUsXG4gICAgWydzaWduJ11cbiAgKVxuXG4gIGNvbnNvbGUubG9nKCdAQC1sb2FkZXItQEAgLSBzaWduUHJpdktleTogJywgc2lnblByaXZLZXkpXG5cbiAgY29uc3Qgc2lnblB1YktleSA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KFxuICAgICdqd2snLFxuICAgIHNpZ25LZXlwYWlyRW5jLnB1YmxpY0tleSxcbiAgICB7XG4gICAgICBuYW1lOiAnRUNEU0EnLFxuICAgICAgbmFtZWRDdXJ2ZTogc2lnbkN1cnZlXG4gICAgfSxcbiAgICB0cnVlLFxuICAgIFsndmVyaWZ5J11cbiAgKVxuXG4gIHJldHVybiB7XG4gICAgcHJpdmF0ZUtleTogc2lnblByaXZLZXksXG4gICAgcHVibGljS2V5OiBzaWduUHViS2V5LFxuICAgIHB1YmxpY0tleUp3azogc2lnbktleXBhaXJFbmMucHVibGljS2V5XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==