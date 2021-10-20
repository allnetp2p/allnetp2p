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

    const sigPairs = []
    for (const sigAlg of config.signatureAlgList) {
      const pair = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_1__.generateKeyPair)(sigAlg, { extractable: true })

      const publicKeyJwk = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_2__.exportJWK)(pair.publicKey)
      const encryptedPrivateKey = await encryptPrivKey(pair.privateKey)

      sigPairs.push({
        publicKey: pair.publicKey,
        publicKeyJwk,
        privateKey: pair.privateKey,
        encryptedPrivateKey
      })
    }

    const encPairs = []
    for (const encDef of config.encryptionAlgList) {
      const [alg, enc] = encDef.split(':')
      const pair = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_1__.generateKeyPair)(alg, { extractable: true })

      const publicKeyJwk = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_2__.exportJWK)(pair.publicKey)
      const encryptedPrivateKey = await encryptPrivKey(pair.privateKey)

      encPairs.push({
        publicKey: pair.publicKey,
        publicKeyJwk,
        privateKey: pair.privateKey,
        encryptedPrivateKey,
        enc
      })
    }

    console.log('sigPairs', sigPairs)
    console.log('encPairs', encPairs)

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

    /*
    const {
      publicKey: signPublicKey,
      privateKey: signPrivateKey
    } = await generateKeyPair('ES384', { extractable: true })
    console.log('sign publicKey', signPublicKey)
    console.log('sign privateKey', signPrivateKey)

    const {
      publicKey: encPublicKey,
      privateKey: encPrivateKey
    } = await generateKeyPair('ECDH-ES', { extractable: true })
    console.log('enc publicKey', encPublicKey)
    console.log('enc privateKey', encPrivateKey)

    const pbkdf2Salt = crypto.getRandomValues(new Uint8Array(24))
    const pbkdf2HashAlgo = 'SHA-512'
    const pbkdf2Iterations = 200000
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
      ['encrypt', 'decrypt']
    )

    console.log('aes gcm 256 secret', secretKey)

    const dirJwe = await new CompactEncrypt(
      (new TextEncoder()).encode('test message')
    ).setProtectedHeader({ alg: 'dir', enc: 'A256GCM' }).encrypt(secretKey)

    console.log('dir/a256gcm jwe', dirJwe)

    const ecdhJwe = await new CompactEncrypt(
      (new TextEncoder()).encode('test message')
    ).setProtectedHeader({ alg: 'ECDH-ES', enc: 'A256GCM' }).encrypt(encPublicKey)

    console.log('ecdh-es/a256gcm jwe', ecdhJwe)

    return new AnIdentity(
      signPublicKey,
      signPrivateKey,
      encPublicKey,
      encPrivateKey
    )
    */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xKMEM7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsZ0JBQWdCLDZEQUFTO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXlIOzs7Ozs7Ozs7Ozs7Ozs7QUN6S3pIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0EsS0FBSyx3QkFBd0IsbUNBQW1DO0FBQ2hFOztBQUVBLGlFQUFlLFFBQVEsRUFBQzs7Ozs7OztVQ3JCeEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05tQztBQUNBO0FBQ2tEO0FBQ2hCOztBQUVyRTtBQUNBLDZCQUE2QixvRUFBZ0I7QUFDN0MseUJBQXlCLCtFQUEyQjtBQUNwRDs7QUFFQSxnREFBZ0Qsb0ZBQVk7O0FBRTVEO0FBQ0EsS0FBSyxvRkFBWTtBQUNqQixNQUFNO0FBQ047O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUMsaUJBQWlCO0FBQ2xCO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixvREFBb0I7QUFDcEMsY0FBYyxvREFBb0I7QUFDbEMsZ0JBQWdCLG9EQUFvQjtBQUNwQztBQUNBOztBQUVBOztBQUVBLFFBQVEsMkNBQVM7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsMkNBQVM7QUFDNUIsTUFBTTtBQUNOO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHFCQUFxQixrREFBa0I7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGtEQUFrQjs7QUFFckM7QUFDQTtBQUNBLElBQUksa0RBQWtCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9saWIvYW4taWRlbnRpdHkubWpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIva2V5L2V4cG9ydC5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2tleS9nZW5lcmF0ZV9rZXlfcGFpci5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2xpYi9idWZmZXJfdXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9saWIvZm9ybWF0X3BlbS5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2xpYi9pbnZhbGlkX2tleV9pbnB1dC5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL3J1bnRpbWUvYXNuMS5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL3J1bnRpbWUvYmFzZTY0dXJsLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvcnVudGltZS9nZW5lcmF0ZS5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL3J1bnRpbWUvZ2xvYmFsLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvcnVudGltZS9rZXlfdG9fandrLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvcnVudGltZS9yYW5kb20uanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9ydW50aW1lL3dlYmNyeXB0by5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL3V0aWwvYmFzZTY0dXJsLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvdXRpbC9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi9ub2RlX21vZHVsZXMvaWRiLWtleXZhbC9kaXN0L2luZGV4LmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4vbm9kZV9tb2R1bGVzL3NhZmFyaS0xNC1pZGItZml4L2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uL2xpYi9hbi1sb2FkZXIubWpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5leHBvcnRzLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5leHBvcnRzLnRvQnl0ZUFycmF5ID0gdG9CeXRlQXJyYXlcbmV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IGZyb21CeXRlQXJyYXlcblxudmFyIGxvb2t1cCA9IFtdXG52YXIgcmV2TG9va3VwID0gW11cbnZhciBBcnIgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBVaW50OEFycmF5IDogQXJyYXlcblxudmFyIGNvZGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLydcbmZvciAodmFyIGkgPSAwLCBsZW4gPSBjb2RlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gIGxvb2t1cFtpXSA9IGNvZGVbaV1cbiAgcmV2TG9va3VwW2NvZGUuY2hhckNvZGVBdChpKV0gPSBpXG59XG5cbi8vIFN1cHBvcnQgZGVjb2RpbmcgVVJMLXNhZmUgYmFzZTY0IHN0cmluZ3MsIGFzIE5vZGUuanMgZG9lcy5cbi8vIFNlZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmFzZTY0I1VSTF9hcHBsaWNhdGlvbnNcbnJldkxvb2t1cFsnLScuY2hhckNvZGVBdCgwKV0gPSA2MlxucmV2TG9va3VwWydfJy5jaGFyQ29kZUF0KDApXSA9IDYzXG5cbmZ1bmN0aW9uIGdldExlbnMgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyBUcmltIG9mZiBleHRyYSBieXRlcyBhZnRlciBwbGFjZWhvbGRlciBieXRlcyBhcmUgZm91bmRcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vYmVhdGdhbW1pdC9iYXNlNjQtanMvaXNzdWVzLzQyXG4gIHZhciB2YWxpZExlbiA9IGI2NC5pbmRleE9mKCc9JylcbiAgaWYgKHZhbGlkTGVuID09PSAtMSkgdmFsaWRMZW4gPSBsZW5cblxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gdmFsaWRMZW4gPT09IGxlblxuICAgID8gMFxuICAgIDogNCAtICh2YWxpZExlbiAlIDQpXG5cbiAgcmV0dXJuIFt2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuXVxufVxuXG4vLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKGI2NCkge1xuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiBfYnl0ZUxlbmd0aCAoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSB7XG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiB0b0J5dGVBcnJheSAoYjY0KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuXG4gIHZhciBhcnIgPSBuZXcgQXJyKF9ieXRlTGVuZ3RoKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikpXG5cbiAgdmFyIGN1ckJ5dGUgPSAwXG5cbiAgLy8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuICB2YXIgbGVuID0gcGxhY2VIb2xkZXJzTGVuID4gMFxuICAgID8gdmFsaWRMZW4gLSA0XG4gICAgOiB2YWxpZExlblxuXG4gIHZhciBpXG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxOCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDEyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfFxuICAgICAgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAzKV1cbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gMTYpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDIpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAxKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDEwKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgNCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDEyICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gNiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID1cbiAgICAgICgodWludDhbaV0gPDwgMTYpICYgMHhGRjAwMDApICtcbiAgICAgICgodWludDhbaSArIDFdIDw8IDgpICYgMHhGRjAwKSArXG4gICAgICAodWludDhbaSArIDJdICYgMHhGRilcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayh1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDJdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl0gK1xuICAgICAgJz09J1xuICAgIClcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgdG1wID0gKHVpbnQ4W2xlbiAtIDJdIDw8IDgpICsgdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAxMF0gK1xuICAgICAgbG9va3VwWyh0bXAgPj4gNCkgJiAweDNGXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCAyKSAmIDB4M0ZdICtcbiAgICAgICc9J1xuICAgIClcbiAgfVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuIiwiaW1wb3J0IHtcbiAgYmFzZTY0dXJsLFxuICBleHBvcnRKV0ssXG4gIGdlbmVyYXRlS2V5UGFpclxufSBmcm9tICdqb3NlLWJyb3dzZXItcnVudGltZSdcblxuLyoqXG4gKiBBbklkZW50aXR5IEFsZ29yaXRobSBUdW5pbmcuXG4gKiBJZiB5b3UncmUgbm90IHN1cmUgd2hhdCB5b3UncmUgZG9pbmcsIGp1c3QgY3JlYXRlIGEgZGVmYXVsdCBjb25maWcuXG4gKi9cbmV4cG9ydCBjbGFzcyBBbklkZW50aXR5Q29uZmlnIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIC8vIGp3cyBhbGcgYXJyYXlcbiAgICB0aGlzLnNpZ25hdHVyZUFsZ0xpc3QgPSBbJ0VTMzg0J11cblxuICAgIC8vIGp3ZSBhbGc6ZW5jIGFycmF5XG4gICAgdGhpcy5lbmNyeXB0aW9uQWxnTGlzdCA9IFsnRUNESC1FUzpBMjU2R0NNJ11cblxuICAgIC8vIGNyeXB0by5zdWJ0bGUgZGVyaXZlS2V5IGFsZyArIGNvbG9uIGRlbGltaXRlZCBjb25maWdcbiAgICB0aGlzLnBhc3NwaHJhc2VTZWNyZXRBbGcgPSAnUEJLREYyOlNIQS01MTI6MjAwMDAwJ1xuXG4gICAgLy8gY3J5cHRvLnN1YnRsZSB3cmFwS2V5IGFsZyArIGNvbG9uIGRlbGltaXRlZCBjb25maWdcbiAgICB0aGlzLnBhc3NwaHJhc2VTeW1BbGcgPSAnQUVTLUdDTToyNTYnXG5cbiAgICAvLyBtaWxsaXNlY29uZHMgaW4gdGhlIGZ1dHVyZSB0byBzZXQgbmV3IGlkZW50aXR5IGV4cGlyYXRpb25zXG4gICAgdGhpcy5leHBpcmVBZnRlckNvdW50TXMgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxuXG4gICAgLy8gZnVuY3Rpb24gcmV0dXJuaW5nIFByb21pc2U8Q3J5cHRvS2V5PiBtYXJrZWQgd2l0aCBkZXJpdmVLZXlcbiAgICB0aGlzLnBhc3NwaHJhc2VHZXRDYiA9IGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHBhc3NwaHJhc2UgPSB3aW5kb3cucHJvbXB0KCdFbnRlciB5b3VyIHBhc3NwaHJhc2UgLSB0aGlzIGlzIHRoZSBkZWZhdWx0IERFViBwYXNzd29yZCBmZXRjaGVyIHVzaW5nIHdpbmRvdy5wcm9tcHQuLi4gdGhlcmUgaXMgbm8gd2F5IHRvIG9ic2N1cmUgdGhlIGVudGVyZWQgcGFzc3BocmFzZSwgeW91IHNob3VsZCBOT1QgdXNlIHRoaXMgaW4gUFJPRFVDVElPTiEgT25jZSB0aGlzIGlzIG1hc2tlZCwgd2UgaGlnaGx5IHJlY29tbWVuZCB1c2luZyBhIHBhc3N3b3JkIG1hbmFnZXIgdG8gbWFuYWdlIHRoaXMgcGFzc3BocmFzZS4nLCAnJylcbiAgICAgIGNvbnN0IHBhc3NwaHJhc2VSYXcgPSAobmV3IFRleHRFbmNvZGVyKCkpLmVuY29kZShwYXNzcGhyYXNlKVxuICAgICAgY29uc3QgcGFzc3BocmFzZUtleSA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KFxuICAgICAgICAncmF3JyxcbiAgICAgICAgcGFzc3BocmFzZVJhdy5idWZmZXIsXG4gICAgICAgICdQQktERjInLFxuICAgICAgICBmYWxzZSxcbiAgICAgICAgWydkZXJpdmVLZXknXVxuICAgICAgKVxuICAgICAgcmV0dXJuIHBhc3NwaHJhc2VLZXlcbiAgICB9XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gX2xvYWRJZGVudCAocGFzc3BocmFzZUtleSkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ3VuaW1wbGVtZW50ZWQnKVxufVxuXG5hc3luYyBmdW5jdGlvbiBfZ2VuSWRlbnQgKGNvbmZpZywgcGFzc3BocmFzZUtleSkge1xuICBpZiAoY29uZmlnLnBhc3NwaHJhc2VTZWNyZXRBbGcuc3RhcnRzV2l0aCgnUEJLREYyOicpKSB7XG4gICAgY29uc3QgYWxnUGFydHMgPSBjb25maWcucGFzc3BocmFzZVNlY3JldEFsZy5zcGxpdCgnOicpXG4gICAgY29uc3QgaGFzaCA9IGFsZ1BhcnRzWzFdXG4gICAgY29uc3QgaXRlcnMgPSBwYXJzZUludChhbGdQYXJ0c1syXSwgMTApXG5cbiAgICBsZXQgZW5jcnlwdFByaXZLZXkgPSBudWxsXG5cbiAgICBpZiAoY29uZmlnLnBhc3NwaHJhc2VTeW1BbGcuc3RhcnRzV2l0aCgnQUVTLUdDTTonKSkge1xuICAgICAgY29uc3QgW2FsZywgbGVuZ3RoXSA9IGNvbmZpZy5wYXNzcGhyYXNlU3ltQWxnLnNwbGl0KCc6JylcblxuICAgICAgY29uc3QgcGJrZGYyU2FsdCA9IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMjQpKVxuICAgICAgY29uc3Qgc2VjcmV0S2V5ID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5kZXJpdmVLZXkoXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnUEJLREYyJyxcbiAgICAgICAgICBoYXNoLFxuICAgICAgICAgIHNhbHQ6IHBia2RmMlNhbHQsXG4gICAgICAgICAgaXRlcmF0aW9uczogaXRlcnNcbiAgICAgICAgfSxcbiAgICAgICAgcGFzc3BocmFzZUtleSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IGFsZyxcbiAgICAgICAgICBsZW5ndGg6IHBhcnNlSW50KGxlbmd0aCwgMTApXG4gICAgICAgIH0sXG4gICAgICAgIGZhbHNlLFxuICAgICAgICBbJ3dyYXBLZXknXVxuICAgICAgKVxuXG4gICAgICBlbmNyeXB0UHJpdktleSA9IGFzeW5jIHByaXZhdGVLZXkgPT4ge1xuICAgICAgICBjb25zdCBhZXNHY21JdiA9IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMjQpKVxuICAgICAgICBjb25zdCBzYXZlUHJpdktleSA9IGF3YWl0IGNyeXB0by5zdWJ0bGUud3JhcEtleShcbiAgICAgICAgICAnandrJyxcbiAgICAgICAgICBwcml2YXRlS2V5LFxuICAgICAgICAgIHNlY3JldEtleSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBhbGcsXG4gICAgICAgICAgICBpdjogYWVzR2NtSXYsXG4gICAgICAgICAgICB0YWdMZW5ndGg6IDEyOFxuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHBhc3NwaHJhc2VTZWNyZXRBbGc6IGNvbmZpZy5wYXNzcGhyYXNlU2VjcmV0QWxnLFxuICAgICAgICAgIHBhc3NwaHJhc2VTZWNyZXRPcHRzOiB7XG4gICAgICAgICAgICBzYWx0OiBiYXNlNjR1cmwuZW5jb2RlKHBia2RmMlNhbHQpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwYXNzcGhyYXNlU3ltQWxnOiBjb25maWcucGFzc3BocmFzZVN5bUFsZyxcbiAgICAgICAgICBwYXNzcGhyYXNlU3ltT3B0czoge1xuICAgICAgICAgICAgaXY6IGJhc2U2NHVybC5lbmNvZGUoYWVzR2NtSXYpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcml2YXRlS2V5OiBiYXNlNjR1cmwuZW5jb2RlKG5ldyBVaW50OEFycmF5KHNhdmVQcml2S2V5KSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIHBhc3NwaHJhc2VTeW1BbGc6IFwiJyArIGNvbmZpZy5wYXNzcGhyYXNlU3ltQWxnICsgJ1wiJylcbiAgICB9XG5cbiAgICBjb25zdCBzaWdQYWlycyA9IFtdXG4gICAgZm9yIChjb25zdCBzaWdBbGcgb2YgY29uZmlnLnNpZ25hdHVyZUFsZ0xpc3QpIHtcbiAgICAgIGNvbnN0IHBhaXIgPSBhd2FpdCBnZW5lcmF0ZUtleVBhaXIoc2lnQWxnLCB7IGV4dHJhY3RhYmxlOiB0cnVlIH0pXG5cbiAgICAgIGNvbnN0IHB1YmxpY0tleUp3ayA9IGF3YWl0IGV4cG9ydEpXSyhwYWlyLnB1YmxpY0tleSlcbiAgICAgIGNvbnN0IGVuY3J5cHRlZFByaXZhdGVLZXkgPSBhd2FpdCBlbmNyeXB0UHJpdktleShwYWlyLnByaXZhdGVLZXkpXG5cbiAgICAgIHNpZ1BhaXJzLnB1c2goe1xuICAgICAgICBwdWJsaWNLZXk6IHBhaXIucHVibGljS2V5LFxuICAgICAgICBwdWJsaWNLZXlKd2ssXG4gICAgICAgIHByaXZhdGVLZXk6IHBhaXIucHJpdmF0ZUtleSxcbiAgICAgICAgZW5jcnlwdGVkUHJpdmF0ZUtleVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBlbmNQYWlycyA9IFtdXG4gICAgZm9yIChjb25zdCBlbmNEZWYgb2YgY29uZmlnLmVuY3J5cHRpb25BbGdMaXN0KSB7XG4gICAgICBjb25zdCBbYWxnLCBlbmNdID0gZW5jRGVmLnNwbGl0KCc6JylcbiAgICAgIGNvbnN0IHBhaXIgPSBhd2FpdCBnZW5lcmF0ZUtleVBhaXIoYWxnLCB7IGV4dHJhY3RhYmxlOiB0cnVlIH0pXG5cbiAgICAgIGNvbnN0IHB1YmxpY0tleUp3ayA9IGF3YWl0IGV4cG9ydEpXSyhwYWlyLnB1YmxpY0tleSlcbiAgICAgIGNvbnN0IGVuY3J5cHRlZFByaXZhdGVLZXkgPSBhd2FpdCBlbmNyeXB0UHJpdktleShwYWlyLnByaXZhdGVLZXkpXG5cbiAgICAgIGVuY1BhaXJzLnB1c2goe1xuICAgICAgICBwdWJsaWNLZXk6IHBhaXIucHVibGljS2V5LFxuICAgICAgICBwdWJsaWNLZXlKd2ssXG4gICAgICAgIHByaXZhdGVLZXk6IHBhaXIucHJpdmF0ZUtleSxcbiAgICAgICAgZW5jcnlwdGVkUHJpdmF0ZUtleSxcbiAgICAgICAgZW5jXG4gICAgICB9KVxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCdzaWdQYWlycycsIHNpZ1BhaXJzKVxuICAgIGNvbnNvbGUubG9nKCdlbmNQYWlycycsIGVuY1BhaXJzKVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKCd1bmltcGxlbWVudGVkJylcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIHBhc3NwaHJhc2VTZWNyZXRBbGc6IFwiJyArIGNvbmZpZy5wYXNzcGhyYXNlU2VjcmV0QWxnICsgJ1wiJylcbiAgfVxufVxuXG4vKipcbiAqIFByb3ZpZGVzIGFsbG5ldCBzeXN0ZW0gSldLIEpXUyBKV0UgSldUIGZ1bmN0aW9uYWxpdHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBBbklkZW50aXR5IHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpZGVudGl0eS4gVXNlIHRoZSBhc3luYyBjb25zdHJ1Y3RvciBjcmVhdGVBbklkZW50aXR5LlxuICAgKi9cbiAgLy8gY29uc3RydWN0b3IgKCkge1xuICAvLyB9XG5cbiAgLyoqXG4gICAqIEFzeW5jIGNvbnN0cnVjdG9yIC0gQ3JlYXRlIGEgbmV3IGlkZW50aXR5LlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBnZXRQYXNzcGhyYXNlQ2Igc2hvdWxkIHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlc1xuICAgKiAgICAgICAgICAgICAgICAgICB0byBhIHBhc3NwaHJhc2UgYXMgYSBDcnlwdG9LZXlcbiAgICovXG4gIHN0YXRpYyBhc3luYyBjcmVhdGVBbklkZW50aXR5IChjb25maWcpIHtcbiAgICBjb25zdCBwYXNzcGhyYXNlS2V5ID0gYXdhaXQgY29uZmlnLnBhc3NwaHJhc2VHZXRDYigpXG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IF9sb2FkSWRlbnQocGFzc3BocmFzZUtleSlcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiBhd2FpdCBfZ2VuSWRlbnQoY29uZmlnLCBwYXNzcGhyYXNlS2V5KVxuICAgIH1cblxuICAgIC8qXG4gICAgY29uc3Qge1xuICAgICAgcHVibGljS2V5OiBzaWduUHVibGljS2V5LFxuICAgICAgcHJpdmF0ZUtleTogc2lnblByaXZhdGVLZXlcbiAgICB9ID0gYXdhaXQgZ2VuZXJhdGVLZXlQYWlyKCdFUzM4NCcsIHsgZXh0cmFjdGFibGU6IHRydWUgfSlcbiAgICBjb25zb2xlLmxvZygnc2lnbiBwdWJsaWNLZXknLCBzaWduUHVibGljS2V5KVxuICAgIGNvbnNvbGUubG9nKCdzaWduIHByaXZhdGVLZXknLCBzaWduUHJpdmF0ZUtleSlcblxuICAgIGNvbnN0IHtcbiAgICAgIHB1YmxpY0tleTogZW5jUHVibGljS2V5LFxuICAgICAgcHJpdmF0ZUtleTogZW5jUHJpdmF0ZUtleVxuICAgIH0gPSBhd2FpdCBnZW5lcmF0ZUtleVBhaXIoJ0VDREgtRVMnLCB7IGV4dHJhY3RhYmxlOiB0cnVlIH0pXG4gICAgY29uc29sZS5sb2coJ2VuYyBwdWJsaWNLZXknLCBlbmNQdWJsaWNLZXkpXG4gICAgY29uc29sZS5sb2coJ2VuYyBwcml2YXRlS2V5JywgZW5jUHJpdmF0ZUtleSlcblxuICAgIGNvbnN0IHBia2RmMlNhbHQgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDI0KSlcbiAgICBjb25zdCBwYmtkZjJIYXNoQWxnbyA9ICdTSEEtNTEyJ1xuICAgIGNvbnN0IHBia2RmMkl0ZXJhdGlvbnMgPSAyMDAwMDBcbiAgICBjb25zdCBzZWNyZXRLZXkgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmRlcml2ZUtleShcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1BCS0RGMicsXG4gICAgICAgIGhhc2g6IHBia2RmMkhhc2hBbGdvLFxuICAgICAgICBzYWx0OiBwYmtkZjJTYWx0LFxuICAgICAgICBpdGVyYXRpb25zOiBwYmtkZjJJdGVyYXRpb25zXG4gICAgICB9LFxuICAgICAgcGFzc3BocmFzZSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0FFUy1HQ00nLFxuICAgICAgICBsZW5ndGg6IDggKiAzMlxuICAgICAgfSxcbiAgICAgIGZhbHNlLFxuICAgICAgWydlbmNyeXB0JywgJ2RlY3J5cHQnXVxuICAgIClcblxuICAgIGNvbnNvbGUubG9nKCdhZXMgZ2NtIDI1NiBzZWNyZXQnLCBzZWNyZXRLZXkpXG5cbiAgICBjb25zdCBkaXJKd2UgPSBhd2FpdCBuZXcgQ29tcGFjdEVuY3J5cHQoXG4gICAgICAobmV3IFRleHRFbmNvZGVyKCkpLmVuY29kZSgndGVzdCBtZXNzYWdlJylcbiAgICApLnNldFByb3RlY3RlZEhlYWRlcih7IGFsZzogJ2RpcicsIGVuYzogJ0EyNTZHQ00nIH0pLmVuY3J5cHQoc2VjcmV0S2V5KVxuXG4gICAgY29uc29sZS5sb2coJ2Rpci9hMjU2Z2NtIGp3ZScsIGRpckp3ZSlcblxuICAgIGNvbnN0IGVjZGhKd2UgPSBhd2FpdCBuZXcgQ29tcGFjdEVuY3J5cHQoXG4gICAgICAobmV3IFRleHRFbmNvZGVyKCkpLmVuY29kZSgndGVzdCBtZXNzYWdlJylcbiAgICApLnNldFByb3RlY3RlZEhlYWRlcih7IGFsZzogJ0VDREgtRVMnLCBlbmM6ICdBMjU2R0NNJyB9KS5lbmNyeXB0KGVuY1B1YmxpY0tleSlcblxuICAgIGNvbnNvbGUubG9nKCdlY2RoLWVzL2EyNTZnY20gandlJywgZWNkaEp3ZSlcblxuICAgIHJldHVybiBuZXcgQW5JZGVudGl0eShcbiAgICAgIHNpZ25QdWJsaWNLZXksXG4gICAgICBzaWduUHJpdmF0ZUtleSxcbiAgICAgIGVuY1B1YmxpY0tleSxcbiAgICAgIGVuY1ByaXZhdGVLZXlcbiAgICApXG4gICAgKi9cbiAgfVxufVxuIiwiaW1wb3J0IHsgdG9TUEtJIGFzIGV4cG9ydFB1YmxpYyB9IGZyb20gJy4uL3J1bnRpbWUvYXNuMS5qcyc7XG5pbXBvcnQgeyB0b1BLQ1M4IGFzIGV4cG9ydFByaXZhdGUgfSBmcm9tICcuLi9ydW50aW1lL2FzbjEuanMnO1xuaW1wb3J0IGtleVRvSldLIGZyb20gJy4uL3J1bnRpbWUva2V5X3RvX2p3ay5qcyc7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhwb3J0U1BLSShrZXkpIHtcbiAgICByZXR1cm4gZXhwb3J0UHVibGljKGtleSk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhwb3J0UEtDUzgoa2V5KSB7XG4gICAgcmV0dXJuIGV4cG9ydFByaXZhdGUoa2V5KTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleHBvcnRKV0soa2V5KSB7XG4gICAgcmV0dXJuIGtleVRvSldLKGtleSk7XG59XG4iLCJpbXBvcnQgeyBnZW5lcmF0ZUtleVBhaXIgYXMgZ2VuZXJhdGUgfSBmcm9tICcuLi9ydW50aW1lL2dlbmVyYXRlLmpzJztcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUtleVBhaXIoYWxnLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGdlbmVyYXRlKGFsZywgb3B0aW9ucyk7XG59XG4iLCJleHBvcnQgY29uc3QgZW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpO1xuZXhwb3J0IGNvbnN0IGRlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoKTtcbmNvbnN0IE1BWF9JTlQzMiA9IDIgKiogMzI7XG5leHBvcnQgZnVuY3Rpb24gY29uY2F0KC4uLmJ1ZmZlcnMpIHtcbiAgICBjb25zdCBzaXplID0gYnVmZmVycy5yZWR1Y2UoKGFjYywgeyBsZW5ndGggfSkgPT4gYWNjICsgbGVuZ3RoLCAwKTtcbiAgICBjb25zdCBidWYgPSBuZXcgVWludDhBcnJheShzaXplKTtcbiAgICBsZXQgaSA9IDA7XG4gICAgYnVmZmVycy5mb3JFYWNoKChidWZmZXIpID0+IHtcbiAgICAgICAgYnVmLnNldChidWZmZXIsIGkpO1xuICAgICAgICBpICs9IGJ1ZmZlci5sZW5ndGg7XG4gICAgfSk7XG4gICAgcmV0dXJuIGJ1Zjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwMnMoYWxnLCBwMnNJbnB1dCkge1xuICAgIHJldHVybiBjb25jYXQoZW5jb2Rlci5lbmNvZGUoYWxnKSwgbmV3IFVpbnQ4QXJyYXkoWzBdKSwgcDJzSW5wdXQpO1xufVxuZnVuY3Rpb24gd3JpdGVVSW50MzJCRShidWYsIHZhbHVlLCBvZmZzZXQpIHtcbiAgICBpZiAodmFsdWUgPCAwIHx8IHZhbHVlID49IE1BWF9JTlQzMikge1xuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgdmFsdWUgbXVzdCBiZSA+PSAwIGFuZCA8PSAke01BWF9JTlQzMiAtIDF9LiBSZWNlaXZlZCAke3ZhbHVlfWApO1xuICAgIH1cbiAgICBidWYuc2V0KFt2YWx1ZSA+Pj4gMjQsIHZhbHVlID4+PiAxNiwgdmFsdWUgPj4+IDgsIHZhbHVlICYgMHhmZl0sIG9mZnNldCk7XG59XG5leHBvcnQgZnVuY3Rpb24gdWludDY0YmUodmFsdWUpIHtcbiAgICBjb25zdCBoaWdoID0gTWF0aC5mbG9vcih2YWx1ZSAvIE1BWF9JTlQzMik7XG4gICAgY29uc3QgbG93ID0gdmFsdWUgJSBNQVhfSU5UMzI7XG4gICAgY29uc3QgYnVmID0gbmV3IFVpbnQ4QXJyYXkoOCk7XG4gICAgd3JpdGVVSW50MzJCRShidWYsIGhpZ2gsIDApO1xuICAgIHdyaXRlVUludDMyQkUoYnVmLCBsb3csIDQpO1xuICAgIHJldHVybiBidWY7XG59XG5leHBvcnQgZnVuY3Rpb24gdWludDMyYmUodmFsdWUpIHtcbiAgICBjb25zdCBidWYgPSBuZXcgVWludDhBcnJheSg0KTtcbiAgICB3cml0ZVVJbnQzMkJFKGJ1ZiwgdmFsdWUpO1xuICAgIHJldHVybiBidWY7XG59XG5leHBvcnQgZnVuY3Rpb24gbGVuZ3RoQW5kSW5wdXQoaW5wdXQpIHtcbiAgICByZXR1cm4gY29uY2F0KHVpbnQzMmJlKGlucHV0Lmxlbmd0aCksIGlucHV0KTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25jYXRLZGYoZGlnZXN0LCBzZWNyZXQsIGJpdHMsIHZhbHVlKSB7XG4gICAgY29uc3QgaXRlcmF0aW9ucyA9IE1hdGguY2VpbCgoYml0cyA+PiAzKSAvIDMyKTtcbiAgICBsZXQgcmVzO1xuICAgIGZvciAobGV0IGl0ZXIgPSAxOyBpdGVyIDw9IGl0ZXJhdGlvbnM7IGl0ZXIrKykge1xuICAgICAgICBjb25zdCBidWYgPSBuZXcgVWludDhBcnJheSg0ICsgc2VjcmV0Lmxlbmd0aCArIHZhbHVlLmxlbmd0aCk7XG4gICAgICAgIGJ1Zi5zZXQodWludDMyYmUoaXRlcikpO1xuICAgICAgICBidWYuc2V0KHNlY3JldCwgNCk7XG4gICAgICAgIGJ1Zi5zZXQodmFsdWUsIDQgKyBzZWNyZXQubGVuZ3RoKTtcbiAgICAgICAgaWYgKCFyZXMpIHtcbiAgICAgICAgICAgIHJlcyA9IGF3YWl0IGRpZ2VzdCgnc2hhMjU2JywgYnVmKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlcyA9IGNvbmNhdChyZXMsIGF3YWl0IGRpZ2VzdCgnc2hhMjU2JywgYnVmKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzID0gcmVzLnNsaWNlKDAsIGJpdHMgPj4gMyk7XG4gICAgcmV0dXJuIHJlcztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IChiNjQsIGRlc2NyaXB0b3IpID0+IHtcbiAgICBjb25zdCBuZXdsaW5lZCA9IChiNjQubWF0Y2goLy57MSw2NH0vZykgfHwgW10pLmpvaW4oJ1xcbicpO1xuICAgIHJldHVybiBgLS0tLS1CRUdJTiAke2Rlc2NyaXB0b3J9LS0tLS1cXG4ke25ld2xpbmVkfVxcbi0tLS0tRU5EICR7ZGVzY3JpcHRvcn0tLS0tLWA7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgKGFjdHVhbCwgLi4udHlwZXMpID0+IHtcbiAgICBsZXQgbXNnID0gJ0tleSBtdXN0IGJlICc7XG4gICAgaWYgKHR5cGVzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgY29uc3QgbGFzdCA9IHR5cGVzLnBvcCgpO1xuICAgICAgICBtc2cgKz0gYG9uZSBvZiB0eXBlICR7dHlwZXMuam9pbignLCAnKX0sIG9yICR7bGFzdH0uYDtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZXMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIG1zZyArPSBgb25lIG9mIHR5cGUgJHt0eXBlc1swXX0gb3IgJHt0eXBlc1sxXX0uYDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG1zZyArPSBgb2YgdHlwZSAke3R5cGVzWzBdfS5gO1xuICAgIH1cbiAgICBpZiAoYWN0dWFsID09IG51bGwpIHtcbiAgICAgICAgbXNnICs9IGAgUmVjZWl2ZWQgJHthY3R1YWx9YDtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGFjdHVhbCA9PT0gJ2Z1bmN0aW9uJyAmJiBhY3R1YWwubmFtZSkge1xuICAgICAgICBtc2cgKz0gYCBSZWNlaXZlZCBmdW5jdGlvbiAke2FjdHVhbC5uYW1lfWA7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBhY3R1YWwgPT09ICdvYmplY3QnICYmIGFjdHVhbCAhPSBudWxsKSB7XG4gICAgICAgIGlmIChhY3R1YWwuY29uc3RydWN0b3IgJiYgYWN0dWFsLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgICAgICAgIG1zZyArPSBgIFJlY2VpdmVkIGFuIGluc3RhbmNlIG9mICR7YWN0dWFsLmNvbnN0cnVjdG9yLm5hbWV9YDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbXNnO1xufTtcbiIsImltcG9ydCBnbG9iYWxUaGlzLCB7IGlzQ2xvdWRmbGFyZVdvcmtlcnMsIGlzTm9kZUpzIH0gZnJvbSAnLi9nbG9iYWwuanMnO1xuaW1wb3J0IGNyeXB0bywgeyBpc0NyeXB0b0tleSB9IGZyb20gJy4vd2ViY3J5cHRvLmpzJztcbmltcG9ydCBpbnZhbGlkS2V5SW5wdXQgZnJvbSAnLi4vbGliL2ludmFsaWRfa2V5X2lucHV0LmpzJztcbmltcG9ydCB7IGVuY29kZUJhc2U2NCB9IGZyb20gJy4vYmFzZTY0dXJsLmpzJztcbmltcG9ydCBmb3JtYXRQRU0gZnJvbSAnLi4vbGliL2Zvcm1hdF9wZW0uanMnO1xuaW1wb3J0IHsgSk9TRU5vdFN1cHBvcnRlZCB9IGZyb20gJy4uL3V0aWwvZXJyb3JzLmpzJztcbmNvbnN0IGdlbmVyaWNFeHBvcnQgPSBhc3luYyAoa2V5VHlwZSwga2V5Rm9ybWF0LCBrZXkpID0+IHtcbiAgICBpZiAoIWlzQ3J5cHRvS2V5KGtleSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihpbnZhbGlkS2V5SW5wdXQoa2V5LCAnQ3J5cHRvS2V5JykpO1xuICAgIH1cbiAgICBpZiAoIWtleS5leHRyYWN0YWJsZSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDcnlwdG9LZXkgaXMgbm90IGV4dHJhY3RhYmxlJyk7XG4gICAgfVxuICAgIGlmIChrZXkudHlwZSAhPT0ga2V5VHlwZSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBrZXkgaXMgbm90IGEgJHtrZXlUeXBlfSBrZXlgKTtcbiAgICB9XG4gICAgcmV0dXJuIGZvcm1hdFBFTShlbmNvZGVCYXNlNjQobmV3IFVpbnQ4QXJyYXkoYXdhaXQgY3J5cHRvLnN1YnRsZS5leHBvcnRLZXkoa2V5Rm9ybWF0LCBrZXkpKSksIGAke2tleVR5cGUudG9VcHBlckNhc2UoKX0gS0VZYCk7XG59O1xuZXhwb3J0IGNvbnN0IHRvU1BLSSA9IChrZXkpID0+IHtcbiAgICByZXR1cm4gZ2VuZXJpY0V4cG9ydCgncHVibGljJywgJ3Nwa2knLCBrZXkpO1xufTtcbmV4cG9ydCBjb25zdCB0b1BLQ1M4ID0gKGtleSkgPT4ge1xuICAgIHJldHVybiBnZW5lcmljRXhwb3J0KCdwcml2YXRlJywgJ3BrY3M4Jywga2V5KTtcbn07XG5jb25zdCBnZXROYW1lZEN1cnZlID0gKGtleURhdGEpID0+IHtcbiAgICBjb25zdCBrZXlEYXRhU3RyID0ga2V5RGF0YS50b1N0cmluZygpO1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICBjYXNlIGtleURhdGFTdHIuaW5jbHVkZXMobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgMHgwNiwgMHgwNywgMHgyYSwgMHg4NiwgMHg0OCwgMHhjZSwgMHgzZCwgMHgwMiwgMHgwMSwgMHgwNiwgMHgwOCwgMHgyYSwgMHg4NiwgMHg0OCwgMHhjZSxcbiAgICAgICAgICAgIDB4M2QsIDB4MDMsIDB4MDEsIDB4MDcsXG4gICAgICAgIF0pLnRvU3RyaW5nKCkpOlxuICAgICAgICAgICAgcmV0dXJuICdQLTI1Nic7XG4gICAgICAgIGNhc2Uga2V5RGF0YVN0ci5pbmNsdWRlcyhuZXcgVWludDhBcnJheShbXG4gICAgICAgICAgICAweDA2LCAweDA3LCAweDJhLCAweDg2LCAweDQ4LCAweGNlLCAweDNkLCAweDAyLCAweDAxLCAweDA2LCAweDA1LCAweDJiLCAweDgxLCAweDA0LCAweDAwLFxuICAgICAgICAgICAgMHgyMixcbiAgICAgICAgXSkudG9TdHJpbmcoKSk6XG4gICAgICAgICAgICByZXR1cm4gJ1AtMzg0JztcbiAgICAgICAgY2FzZSBrZXlEYXRhU3RyLmluY2x1ZGVzKG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgICAgIDB4MDYsIDB4MDcsIDB4MmEsIDB4ODYsIDB4NDgsIDB4Y2UsIDB4M2QsIDB4MDIsIDB4MDEsIDB4MDYsIDB4MDUsIDB4MmIsIDB4ODEsIDB4MDQsIDB4MDAsXG4gICAgICAgICAgICAweDIzLFxuICAgICAgICBdKS50b1N0cmluZygpKTpcbiAgICAgICAgICAgIHJldHVybiAnUC01MjEnO1xuICAgICAgICBjYXNlIChpc0Nsb3VkZmxhcmVXb3JrZXJzKCkgfHwgaXNOb2RlSnMoKSkgJiZcbiAgICAgICAgICAgIGtleURhdGFTdHIuaW5jbHVkZXMobmV3IFVpbnQ4QXJyYXkoWzB4MDYsIDB4MDMsIDB4MmIsIDB4NjUsIDB4NzBdKS50b1N0cmluZygpKTpcbiAgICAgICAgICAgIHJldHVybiAnRWQyNTUxOSc7XG4gICAgICAgIGNhc2UgaXNOb2RlSnMoKSAmJlxuICAgICAgICAgICAga2V5RGF0YVN0ci5pbmNsdWRlcyhuZXcgVWludDhBcnJheShbMHgwNiwgMHgwMywgMHgyYiwgMHg2NSwgMHg3MV0pLnRvU3RyaW5nKCkpOlxuICAgICAgICAgICAgcmV0dXJuICdFZDQ0OCc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZCgnSW52YWxpZCBvciB1bnN1cHBvcnRlZCBFQyBLZXkgQ3VydmUgb3IgT0tQIEtleSBTdWIgVHlwZScpO1xuICAgIH1cbn07XG5jb25zdCBnZW5lcmljSW1wb3J0ID0gYXN5bmMgKHJlcGxhY2UsIGtleUZvcm1hdCwgcGVtLCBhbGcsIG9wdGlvbnMpID0+IHtcbiAgICB2YXIgX2E7XG4gICAgbGV0IGFsZ29yaXRobTtcbiAgICBsZXQga2V5VXNhZ2VzO1xuICAgIGNvbnN0IGtleURhdGEgPSBuZXcgVWludDhBcnJheShnbG9iYWxUaGlzXG4gICAgICAgIC5hdG9iKHBlbS5yZXBsYWNlKHJlcGxhY2UsICcnKSlcbiAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAubWFwKChjKSA9PiBjLmNoYXJDb2RlQXQoMCkpKTtcbiAgICBjb25zdCBpc1B1YmxpYyA9IGtleUZvcm1hdCA9PT0gJ3Nwa2knO1xuICAgIHN3aXRjaCAoYWxnKSB7XG4gICAgICAgIGNhc2UgJ1BTMjU2JzpcbiAgICAgICAgY2FzZSAnUFMzODQnOlxuICAgICAgICBjYXNlICdQUzUxMic6XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdSU0EtUFNTJywgaGFzaDogYFNIQS0ke2FsZy5zdWJzdHIoLTMpfWAgfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IGlzUHVibGljID8gWyd2ZXJpZnknXSA6IFsnc2lnbiddO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1JTMjU2JzpcbiAgICAgICAgY2FzZSAnUlMzODQnOlxuICAgICAgICBjYXNlICdSUzUxMic6XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdSU0FTU0EtUEtDUzEtdjFfNScsIGhhc2g6IGBTSEEtJHthbGcuc3Vic3RyKC0zKX1gIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBpc1B1YmxpYyA/IFsndmVyaWZ5J10gOiBbJ3NpZ24nXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdSU0EtT0FFUCc6XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQLTI1Nic6XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQLTM4NCc6XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQLTUxMic6XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ1JTQS1PQUVQJyxcbiAgICAgICAgICAgICAgICBoYXNoOiBgU0hBLSR7cGFyc2VJbnQoYWxnLnN1YnN0cigtMyksIDEwKSB8fCAxfWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gaXNQdWJsaWMgPyBbJ2VuY3J5cHQnLCAnd3JhcEtleSddIDogWydkZWNyeXB0JywgJ3Vud3JhcEtleSddO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0VTMjU2JzpcbiAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogJ0VDRFNBJywgbmFtZWRDdXJ2ZTogJ1AtMjU2JyB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gaXNQdWJsaWMgPyBbJ3ZlcmlmeSddIDogWydzaWduJ107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRVMzODQnOlxuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiAnUC0zODQnIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBpc1B1YmxpYyA/IFsndmVyaWZ5J10gOiBbJ3NpZ24nXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFUzUxMic6XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdFQ0RTQScsIG5hbWVkQ3VydmU6ICdQLTUyMScgfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IGlzUHVibGljID8gWyd2ZXJpZnknXSA6IFsnc2lnbiddO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0VDREgtRVMnOlxuICAgICAgICBjYXNlICdFQ0RILUVTK0ExMjhLVyc6XG4gICAgICAgIGNhc2UgJ0VDREgtRVMrQTE5MktXJzpcbiAgICAgICAgY2FzZSAnRUNESC1FUytBMjU2S1cnOlxuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNESCcsIG5hbWVkQ3VydmU6IGdldE5hbWVkQ3VydmUoa2V5RGF0YSkgfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IGlzUHVibGljID8gW10gOiBbJ2Rlcml2ZUJpdHMnXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChpc0Nsb3VkZmxhcmVXb3JrZXJzKCkgfHwgaXNOb2RlSnMoKSkgJiYgJ0VkRFNBJzpcbiAgICAgICAgICAgIGNvbnN0IG5hbWVkQ3VydmUgPSBnZXROYW1lZEN1cnZlKGtleURhdGEpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6IGBOT0RFLSR7bmFtZWRDdXJ2ZX1gLCBuYW1lZEN1cnZlOiBgTk9ERS0ke25hbWVkQ3VydmV9YCB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gaXNQdWJsaWMgPyBbJ3ZlcmlmeSddIDogWydzaWduJ107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdJbnZhbGlkIG9yIHVuc3VwcG9ydGVkIFwiYWxnXCIgKEFsZ29yaXRobSkgdmFsdWUnKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KGtleUZvcm1hdCwga2V5RGF0YSwgYWxnb3JpdGhtLCAoX2EgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZXh0cmFjdGFibGUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGZhbHNlLCBrZXlVc2FnZXMpO1xufTtcbmV4cG9ydCBjb25zdCBmcm9tUEtDUzggPSAocGVtLCBhbGcsIG9wdGlvbnMpID0+IHtcbiAgICByZXR1cm4gZ2VuZXJpY0ltcG9ydCgvKD86LS0tLS0oPzpCRUdJTnxFTkQpIFBSSVZBVEUgS0VZLS0tLS18XFxzKS9nLCAncGtjczgnLCBwZW0sIGFsZywgb3B0aW9ucyk7XG59O1xuZXhwb3J0IGNvbnN0IGZyb21TUEtJID0gKHBlbSwgYWxnLCBvcHRpb25zKSA9PiB7XG4gICAgcmV0dXJuIGdlbmVyaWNJbXBvcnQoLyg/Oi0tLS0tKD86QkVHSU58RU5EKSBQVUJMSUMgS0VZLS0tLS18XFxzKS9nLCAnc3BraScsIHBlbSwgYWxnLCBvcHRpb25zKTtcbn07XG4iLCJpbXBvcnQgeyBlbmNvZGVyLCBkZWNvZGVyIH0gZnJvbSAnLi4vbGliL2J1ZmZlcl91dGlscy5qcyc7XG5pbXBvcnQgZ2xvYmFsVGhpcyBmcm9tICcuL2dsb2JhbC5qcyc7XG5leHBvcnQgY29uc3QgZW5jb2RlQmFzZTY0ID0gKGlucHV0KSA9PiB7XG4gICAgbGV0IHVuZW5jb2RlZCA9IGlucHV0O1xuICAgIGlmICh0eXBlb2YgdW5lbmNvZGVkID09PSAnc3RyaW5nJykge1xuICAgICAgICB1bmVuY29kZWQgPSBlbmNvZGVyLmVuY29kZSh1bmVuY29kZWQpO1xuICAgIH1cbiAgICBjb25zdCBDSFVOS19TSVpFID0gMHg4MDAwO1xuICAgIGNvbnN0IGFyciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdW5lbmNvZGVkLmxlbmd0aDsgaSArPSBDSFVOS19TSVpFKSB7XG4gICAgICAgIGFyci5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgdW5lbmNvZGVkLnN1YmFycmF5KGksIGkgKyBDSFVOS19TSVpFKSkpO1xuICAgIH1cbiAgICByZXR1cm4gZ2xvYmFsVGhpcy5idG9hKGFyci5qb2luKCcnKSk7XG59O1xuZXhwb3J0IGNvbnN0IGVuY29kZSA9IChpbnB1dCkgPT4ge1xuICAgIHJldHVybiBlbmNvZGVCYXNlNjQoaW5wdXQpLnJlcGxhY2UoLz0vZywgJycpLnJlcGxhY2UoL1xcKy9nLCAnLScpLnJlcGxhY2UoL1xcLy9nLCAnXycpO1xufTtcbmV4cG9ydCBjb25zdCBkZWNvZGVCYXNlNjQgPSAoZW5jb2RlZCkgPT4ge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShnbG9iYWxUaGlzXG4gICAgICAgIC5hdG9iKGVuY29kZWQpXG4gICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgLm1hcCgoYykgPT4gYy5jaGFyQ29kZUF0KDApKSk7XG59O1xuZXhwb3J0IGNvbnN0IGRlY29kZSA9IChpbnB1dCkgPT4ge1xuICAgIGxldCBlbmNvZGVkID0gaW5wdXQ7XG4gICAgaWYgKGVuY29kZWQgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgIGVuY29kZWQgPSBkZWNvZGVyLmRlY29kZShlbmNvZGVkKTtcbiAgICB9XG4gICAgZW5jb2RlZCA9IGVuY29kZWQucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVCYXNlNjQoZW5jb2RlZCk7XG4gICAgfVxuICAgIGNhdGNoIChfYSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgaW5wdXQgdG8gYmUgZGVjb2RlZCBpcyBub3QgY29ycmVjdGx5IGVuY29kZWQuJyk7XG4gICAgfVxufTtcbiIsImltcG9ydCB7IGlzQ2xvdWRmbGFyZVdvcmtlcnMsIGlzTm9kZUpzIH0gZnJvbSAnLi9nbG9iYWwuanMnO1xuaW1wb3J0IGNyeXB0byBmcm9tICcuL3dlYmNyeXB0by5qcyc7XG5pbXBvcnQgeyBKT1NFTm90U3VwcG9ydGVkIH0gZnJvbSAnLi4vdXRpbC9lcnJvcnMuanMnO1xuaW1wb3J0IHJhbmRvbSBmcm9tICcuL3JhbmRvbS5qcyc7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVTZWNyZXQoYWxnLCBvcHRpb25zKSB7XG4gICAgdmFyIF9hO1xuICAgIGxldCBsZW5ndGg7XG4gICAgbGV0IGFsZ29yaXRobTtcbiAgICBsZXQga2V5VXNhZ2VzO1xuICAgIHN3aXRjaCAoYWxnKSB7XG4gICAgICAgIGNhc2UgJ0hTMjU2JzpcbiAgICAgICAgY2FzZSAnSFMzODQnOlxuICAgICAgICBjYXNlICdIUzUxMic6XG4gICAgICAgICAgICBsZW5ndGggPSBwYXJzZUludChhbGcuc3Vic3RyKC0zKSwgMTApO1xuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnSE1BQycsIGhhc2g6IGBTSEEtJHtsZW5ndGh9YCwgbGVuZ3RoIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ3NpZ24nLCAndmVyaWZ5J107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnQTEyOENCQy1IUzI1Nic6XG4gICAgICAgIGNhc2UgJ0ExOTJDQkMtSFMzODQnOlxuICAgICAgICBjYXNlICdBMjU2Q0JDLUhTNTEyJzpcbiAgICAgICAgICAgIGxlbmd0aCA9IHBhcnNlSW50KGFsZy5zdWJzdHIoLTMpLCAxMCk7XG4gICAgICAgICAgICByZXR1cm4gcmFuZG9tKG5ldyBVaW50OEFycmF5KGxlbmd0aCA+PiAzKSk7XG4gICAgICAgIGNhc2UgJ0ExMjhLVyc6XG4gICAgICAgIGNhc2UgJ0ExOTJLVyc6XG4gICAgICAgIGNhc2UgJ0EyNTZLVyc6XG4gICAgICAgICAgICBsZW5ndGggPSBwYXJzZUludChhbGcuc3Vic3RyaW5nKDEsIDQpLCAxMCk7XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdBRVMtS1cnLCBsZW5ndGggfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IFsnd3JhcEtleScsICd1bndyYXBLZXknXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBMTI4R0NNS1cnOlxuICAgICAgICBjYXNlICdBMTkyR0NNS1cnOlxuICAgICAgICBjYXNlICdBMjU2R0NNS1cnOlxuICAgICAgICBjYXNlICdBMTI4R0NNJzpcbiAgICAgICAgY2FzZSAnQTE5MkdDTSc6XG4gICAgICAgIGNhc2UgJ0EyNTZHQ00nOlxuICAgICAgICAgICAgbGVuZ3RoID0gcGFyc2VJbnQoYWxnLnN1YnN0cmluZygxLCA0KSwgMTApO1xuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnQUVTLUdDTScsIGxlbmd0aCB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gWydlbmNyeXB0JywgJ2RlY3J5cHQnXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEpPU0VOb3RTdXBwb3J0ZWQoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgSldLIFwiYWxnXCIgKEFsZ29yaXRobSkgUGFyYW1ldGVyIHZhbHVlJyk7XG4gICAgfVxuICAgIHJldHVybiBjcnlwdG8uc3VidGxlLmdlbmVyYXRlS2V5KGFsZ29yaXRobSwgKF9hID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmV4dHJhY3RhYmxlKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBmYWxzZSwga2V5VXNhZ2VzKTtcbn1cbmZ1bmN0aW9uIGdldE1vZHVsdXNMZW5ndGhPcHRpb24ob3B0aW9ucykge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBtb2R1bHVzTGVuZ3RoID0gKF9hID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLm1vZHVsdXNMZW5ndGgpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDIwNDg7XG4gICAgaWYgKHR5cGVvZiBtb2R1bHVzTGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBtb2R1bHVzTGVuZ3RoIDwgMjA0OCkge1xuICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZCgnSW52YWxpZCBvciB1bnN1cHBvcnRlZCBtb2R1bHVzTGVuZ3RoIG9wdGlvbiBwcm92aWRlZCwgMjA0OCBiaXRzIG9yIGxhcmdlciBrZXlzIG11c3QgYmUgdXNlZCcpO1xuICAgIH1cbiAgICByZXR1cm4gbW9kdWx1c0xlbmd0aDtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUtleVBhaXIoYWxnLCBvcHRpb25zKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBsZXQgYWxnb3JpdGhtO1xuICAgIGxldCBrZXlVc2FnZXM7XG4gICAgc3dpdGNoIChhbGcpIHtcbiAgICAgICAgY2FzZSAnUFMyNTYnOlxuICAgICAgICBjYXNlICdQUzM4NCc6XG4gICAgICAgIGNhc2UgJ1BTNTEyJzpcbiAgICAgICAgICAgIGFsZ29yaXRobSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnUlNBLVBTUycsXG4gICAgICAgICAgICAgICAgaGFzaDogYFNIQS0ke2FsZy5zdWJzdHIoLTMpfWAsXG4gICAgICAgICAgICAgICAgcHVibGljRXhwb25lbnQ6IG5ldyBVaW50OEFycmF5KFsweDAxLCAweDAwLCAweDAxXSksXG4gICAgICAgICAgICAgICAgbW9kdWx1c0xlbmd0aDogZ2V0TW9kdWx1c0xlbmd0aE9wdGlvbihvcHRpb25zKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ3NpZ24nLCAndmVyaWZ5J107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnUlMyNTYnOlxuICAgICAgICBjYXNlICdSUzM4NCc6XG4gICAgICAgIGNhc2UgJ1JTNTEyJzpcbiAgICAgICAgICAgIGFsZ29yaXRobSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnUlNBU1NBLVBLQ1MxLXYxXzUnLFxuICAgICAgICAgICAgICAgIGhhc2g6IGBTSEEtJHthbGcuc3Vic3RyKC0zKX1gLFxuICAgICAgICAgICAgICAgIHB1YmxpY0V4cG9uZW50OiBuZXcgVWludDhBcnJheShbMHgwMSwgMHgwMCwgMHgwMV0pLFxuICAgICAgICAgICAgICAgIG1vZHVsdXNMZW5ndGg6IGdldE1vZHVsdXNMZW5ndGhPcHRpb24ob3B0aW9ucyksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gWydzaWduJywgJ3ZlcmlmeSddO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQJzpcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAtMjU2JzpcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAtMzg0JzpcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAtNTEyJzpcbiAgICAgICAgICAgIGFsZ29yaXRobSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnUlNBLU9BRVAnLFxuICAgICAgICAgICAgICAgIGhhc2g6IGBTSEEtJHtwYXJzZUludChhbGcuc3Vic3RyKC0zKSwgMTApIHx8IDF9YCxcbiAgICAgICAgICAgICAgICBwdWJsaWNFeHBvbmVudDogbmV3IFVpbnQ4QXJyYXkoWzB4MDEsIDB4MDAsIDB4MDFdKSxcbiAgICAgICAgICAgICAgICBtb2R1bHVzTGVuZ3RoOiBnZXRNb2R1bHVzTGVuZ3RoT3B0aW9uKG9wdGlvbnMpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IFsnZGVjcnlwdCcsICd1bndyYXBLZXknLCAnZW5jcnlwdCcsICd3cmFwS2V5J107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRVMyNTYnOlxuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiAnUC0yNTYnIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ3NpZ24nLCAndmVyaWZ5J107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRVMzODQnOlxuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiAnUC0zODQnIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ3NpZ24nLCAndmVyaWZ5J107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRVM1MTInOlxuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiAnUC01MjEnIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ3NpZ24nLCAndmVyaWZ5J107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoaXNDbG91ZGZsYXJlV29ya2VycygpIHx8IGlzTm9kZUpzKCkpICYmICdFZERTQSc6XG4gICAgICAgICAgICBzd2l0Y2ggKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jcnYpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgICAgICAgICBjYXNlICdFZDI1NTE5JzpcbiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnTk9ERS1FRDI1NTE5JywgbmFtZWRDdXJ2ZTogJ05PREUtRUQyNTUxOScgfTtcbiAgICAgICAgICAgICAgICAgICAga2V5VXNhZ2VzID0gWydzaWduJywgJ3ZlcmlmeSddO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGlzTm9kZUpzKCkgJiYgJ0VkNDQ4JzpcbiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnTk9ERS1FRDQ0OCcsIG5hbWVkQ3VydmU6ICdOT0RFLUVENDQ4JyB9O1xuICAgICAgICAgICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ3NpZ24nLCAndmVyaWZ5J107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdJbnZhbGlkIG9yIHVuc3VwcG9ydGVkIGNydiBvcHRpb24gcHJvdmlkZWQsIHN1cHBvcnRlZCB2YWx1ZXMgYXJlIEVkMjU1MTkgYW5kIEVkNDQ4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRUNESC1FUyc6XG4gICAgICAgIGNhc2UgJ0VDREgtRVMrQTEyOEtXJzpcbiAgICAgICAgY2FzZSAnRUNESC1FUytBMTkyS1cnOlxuICAgICAgICBjYXNlICdFQ0RILUVTK0EyNTZLVyc6XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdFQ0RIJywgbmFtZWRDdXJ2ZTogKF9hID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNydikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJ1AtMjU2JyB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gWydkZXJpdmVLZXknLCAnZGVyaXZlQml0cyddO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZCgnSW52YWxpZCBvciB1bnN1cHBvcnRlZCBKV0sgXCJhbGdcIiAoQWxnb3JpdGhtKSBQYXJhbWV0ZXIgdmFsdWUnKTtcbiAgICB9XG4gICAgcmV0dXJuIChjcnlwdG8uc3VidGxlLmdlbmVyYXRlS2V5KGFsZ29yaXRobSwgKF9iID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmV4dHJhY3RhYmxlKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBmYWxzZSwga2V5VXNhZ2VzKSk7XG59XG4iLCJmdW5jdGlvbiBnZXRHbG9iYWwoKSB7XG4gICAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgcmV0dXJuIGdsb2JhbFRoaXM7XG4gICAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICByZXR1cm4gd2luZG93O1xuICAgIHRocm93IG5ldyBFcnJvcigndW5hYmxlIHRvIGxvY2F0ZSBnbG9iYWwgb2JqZWN0Jyk7XG59XG5leHBvcnQgZGVmYXVsdCBnZXRHbG9iYWwoKTtcbmV4cG9ydCBmdW5jdGlvbiBpc0Nsb3VkZmxhcmVXb3JrZXJzKCkge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBnZXRHbG9iYWwoKS5XZWJTb2NrZXRQYWlyICE9PSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNhdGNoIChfYSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzTm9kZUpzKCkge1xuICAgIHZhciBfYSwgX2I7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuICgoX2IgPSAoX2EgPSBnZXRHbG9iYWwoKS5wcm9jZXNzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudmVyc2lvbnMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5ub2RlKSAhPT0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjYXRjaCAoX2MpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiIsImltcG9ydCBjcnlwdG8sIHsgaXNDcnlwdG9LZXkgfSBmcm9tICcuL3dlYmNyeXB0by5qcyc7XG5pbXBvcnQgaW52YWxpZEtleUlucHV0IGZyb20gJy4uL2xpYi9pbnZhbGlkX2tleV9pbnB1dC5qcyc7XG5pbXBvcnQgeyBlbmNvZGUgYXMgYmFzZTY0dXJsIH0gZnJvbSAnLi9iYXNlNjR1cmwuanMnO1xuY29uc3Qga2V5VG9KV0sgPSBhc3luYyAoa2V5KSA9PiB7XG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGt0eTogJ29jdCcsXG4gICAgICAgICAgICBrOiBiYXNlNjR1cmwoa2V5KSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCFpc0NyeXB0b0tleShrZXkpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoaW52YWxpZEtleUlucHV0KGtleSwgJ0NyeXB0b0tleScsICdVaW50OEFycmF5JykpO1xuICAgIH1cbiAgICBpZiAoIWtleS5leHRyYWN0YWJsZSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdub24tZXh0cmFjdGFibGUgQ3J5cHRvS2V5IGNhbm5vdCBiZSBleHBvcnRlZCBhcyBhIEpXSycpO1xuICAgIH1cbiAgICBjb25zdCB7IGV4dCwga2V5X29wcywgYWxnLCB1c2UsIC4uLmp3ayB9ID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5leHBvcnRLZXkoJ2p3aycsIGtleSk7XG4gICAgcmV0dXJuIGp3aztcbn07XG5leHBvcnQgZGVmYXVsdCBrZXlUb0pXSztcbiIsImltcG9ydCBjcnlwdG8gZnJvbSAnLi93ZWJjcnlwdG8uanMnO1xuZXhwb3J0IGRlZmF1bHQgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0byk7XG4iLCJpbXBvcnQgZ2xvYmFsVGhpcyBmcm9tICcuL2dsb2JhbC5qcyc7XG5leHBvcnQgZGVmYXVsdCBnbG9iYWxUaGlzLmNyeXB0bztcbmV4cG9ydCBmdW5jdGlvbiBpc0NyeXB0b0tleShrZXkpIHtcbiAgICBpZiAodHlwZW9mIGdsb2JhbFRoaXMuQ3J5cHRvS2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBrZXkgIT0gbnVsbCAmJiBrZXkgaW5zdGFuY2VvZiBnbG9iYWxUaGlzLkNyeXB0b0tleTtcbn1cbiIsImltcG9ydCAqIGFzIGJhc2U2NHVybCBmcm9tICcuLi9ydW50aW1lL2Jhc2U2NHVybC5qcyc7XG5leHBvcnQgY29uc3QgZW5jb2RlID0gYmFzZTY0dXJsLmVuY29kZTtcbmV4cG9ydCBjb25zdCBkZWNvZGUgPSBiYXNlNjR1cmwuZGVjb2RlO1xuIiwiZXhwb3J0IGNsYXNzIEpPU0VFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSk9TRV9HRU5FUklDJztcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICAoX2EgPSBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwoRXJyb3IsIHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pPU0VfR0VORVJJQyc7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEpXVENsYWltVmFsaWRhdGlvbkZhaWxlZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgY2xhaW0gPSAndW5zcGVjaWZpZWQnLCByZWFzb24gPSAndW5zcGVjaWZpZWQnKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXVF9DTEFJTV9WQUxJREFUSU9OX0ZBSUxFRCc7XG4gICAgICAgIHRoaXMuY2xhaW0gPSBjbGFpbTtcbiAgICAgICAgdGhpcy5yZWFzb24gPSByZWFzb247XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSldUX0NMQUlNX1ZBTElEQVRJT05fRkFJTEVEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldURXhwaXJlZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgY2xhaW0gPSAndW5zcGVjaWZpZWQnLCByZWFzb24gPSAndW5zcGVjaWZpZWQnKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXVF9FWFBJUkVEJztcbiAgICAgICAgdGhpcy5jbGFpbSA9IGNsYWltO1xuICAgICAgICB0aGlzLnJlYXNvbiA9IHJlYXNvbjtcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KV1RfRVhQSVJFRCc7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEpPU0VBbGdOb3RBbGxvd2VkIGV4dGVuZHMgSk9TRUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5jb2RlID0gJ0VSUl9KT1NFX0FMR19OT1RfQUxMT1dFRCc7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSk9TRV9BTEdfTk9UX0FMTE9XRUQnO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBKT1NFTm90U3VwcG9ydGVkIGV4dGVuZHMgSk9TRUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5jb2RlID0gJ0VSUl9KT1NFX05PVF9TVVBQT1JURUQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pPU0VfTk9UX1NVUFBPUlRFRCc7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEpXRURlY3J5cHRpb25GYWlsZWQgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXRV9ERUNSWVBUSU9OX0ZBSUxFRCc7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICdkZWNyeXB0aW9uIG9wZXJhdGlvbiBmYWlsZWQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXRV9ERUNSWVBUSU9OX0ZBSUxFRCc7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEpXRUludmFsaWQgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXRV9JTlZBTElEJztcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KV0VfSU5WQUxJRCc7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEpXU0ludmFsaWQgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXU19JTlZBTElEJztcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KV1NfSU5WQUxJRCc7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEpXVEludmFsaWQgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXVF9JTlZBTElEJztcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KV1RfSU5WQUxJRCc7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEpXS0ludmFsaWQgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXS19JTlZBTElEJztcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KV0tfSU5WQUxJRCc7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEpXS1NJbnZhbGlkIGV4dGVuZHMgSk9TRUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5jb2RlID0gJ0VSUl9KV0tTX0lOVkFMSUQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXS1NfSU5WQUxJRCc7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEpXS1NOb01hdGNoaW5nS2V5IGV4dGVuZHMgSk9TRUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5jb2RlID0gJ0VSUl9KV0tTX05PX01BVENISU5HX0tFWSc7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICdubyBhcHBsaWNhYmxlIGtleSBmb3VuZCBpbiB0aGUgSlNPTiBXZWIgS2V5IFNldCc7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSldLU19OT19NQVRDSElOR19LRVknO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBKV0tTTXVsdGlwbGVNYXRjaGluZ0tleXMgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXS1NfTVVMVElQTEVfTUFUQ0hJTkdfS0VZUyc7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICdtdWx0aXBsZSBtYXRjaGluZyBrZXlzIGZvdW5kIGluIHRoZSBKU09OIFdlYiBLZXkgU2V0JztcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KV0tTX01VTFRJUExFX01BVENISU5HX0tFWVMnO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBKV0tTVGltZW91dCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldLU19USU1FT1VUJztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJ3JlcXVlc3QgdGltZWQgb3V0JztcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KV0tTX1RJTUVPVVQnO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBKV1NTaWduYXR1cmVWZXJpZmljYXRpb25GYWlsZWQgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXU19TSUdOQVRVUkVfVkVSSUZJQ0FUSU9OX0ZBSUxFRCc7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICdzaWduYXR1cmUgdmVyaWZpY2F0aW9uIGZhaWxlZCc7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSldTX1NJR05BVFVSRV9WRVJJRklDQVRJT05fRkFJTEVEJztcbiAgICB9XG59XG4iLCJpbXBvcnQgc2FmYXJpRml4IGZyb20gJ3NhZmFyaS0xNC1pZGItZml4JztcblxuZnVuY3Rpb24gcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSAtIGZpbGUgc2l6ZSBoYWNrc1xuICAgICAgICByZXF1ZXN0Lm9uY29tcGxldGUgPSByZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHJlc29sdmUocmVxdWVzdC5yZXN1bHQpO1xuICAgICAgICAvLyBAdHMtaWdub3JlIC0gZmlsZSBzaXplIGhhY2tzXG4gICAgICAgIHJlcXVlc3Qub25hYm9ydCA9IHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHJlamVjdChyZXF1ZXN0LmVycm9yKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVN0b3JlKGRiTmFtZSwgc3RvcmVOYW1lKSB7XG4gICAgY29uc3QgZGJwID0gc2FmYXJpRml4KCkudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIub3BlbihkYk5hbWUpO1xuICAgICAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9ICgpID0+IHJlcXVlc3QucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpO1xuICAgIH0pO1xuICAgIHJldHVybiAodHhNb2RlLCBjYWxsYmFjaykgPT4gZGJwLnRoZW4oKGRiKSA9PiBjYWxsYmFjayhkYi50cmFuc2FjdGlvbihzdG9yZU5hbWUsIHR4TW9kZSkub2JqZWN0U3RvcmUoc3RvcmVOYW1lKSkpO1xufVxubGV0IGRlZmF1bHRHZXRTdG9yZUZ1bmM7XG5mdW5jdGlvbiBkZWZhdWx0R2V0U3RvcmUoKSB7XG4gICAgaWYgKCFkZWZhdWx0R2V0U3RvcmVGdW5jKSB7XG4gICAgICAgIGRlZmF1bHRHZXRTdG9yZUZ1bmMgPSBjcmVhdGVTdG9yZSgna2V5dmFsLXN0b3JlJywgJ2tleXZhbCcpO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdEdldFN0b3JlRnVuYztcbn1cbi8qKlxuICogR2V0IGEgdmFsdWUgYnkgaXRzIGtleS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZ2V0KGtleSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0KGtleSkpKTtcbn1cbi8qKlxuICogU2V0IGEgdmFsdWUgd2l0aCBhIGtleS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIHN0b3JlLnB1dCh2YWx1ZSwga2V5KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgbXVsdGlwbGUgdmFsdWVzIGF0IG9uY2UuIFRoaXMgaXMgZmFzdGVyIHRoYW4gY2FsbGluZyBzZXQoKSBtdWx0aXBsZSB0aW1lcy5cbiAqIEl0J3MgYWxzbyBhdG9taWMg4oCTIGlmIG9uZSBvZiB0aGUgcGFpcnMgY2FuJ3QgYmUgYWRkZWQsIG5vbmUgd2lsbCBiZSBhZGRlZC5cbiAqXG4gKiBAcGFyYW0gZW50cmllcyBBcnJheSBvZiBlbnRyaWVzLCB3aGVyZSBlYWNoIGVudHJ5IGlzIGFuIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHNldE1hbnkoZW50cmllcywgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHN0b3JlLnB1dChlbnRyeVsxXSwgZW50cnlbMF0pKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgbXVsdGlwbGUgdmFsdWVzIGJ5IHRoZWlyIGtleXNcbiAqXG4gKiBAcGFyYW0ga2V5c1xuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGdldE1hbnkoa2V5cywgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IFByb21pc2UuYWxsKGtleXMubWFwKChrZXkpID0+IHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0KGtleSkpKSkpO1xufVxuLyoqXG4gKiBVcGRhdGUgYSB2YWx1ZS4gVGhpcyBsZXRzIHlvdSBzZWUgdGhlIG9sZCB2YWx1ZSBhbmQgdXBkYXRlIGl0IGFzIGFuIGF0b21pYyBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIHVwZGF0ZXIgQSBjYWxsYmFjayB0aGF0IHRha2VzIHRoZSBvbGQgdmFsdWUgYW5kIHJldHVybnMgYSBuZXcgdmFsdWUuXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlKGtleSwgdXBkYXRlciwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiBcbiAgICAvLyBOZWVkIHRvIGNyZWF0ZSB0aGUgcHJvbWlzZSBtYW51YWxseS5cbiAgICAvLyBJZiBJIHRyeSB0byBjaGFpbiBwcm9taXNlcywgdGhlIHRyYW5zYWN0aW9uIGNsb3NlcyBpbiBicm93c2Vyc1xuICAgIC8vIHRoYXQgdXNlIGEgcHJvbWlzZSBwb2x5ZmlsbCAoSUUxMC8xMSkuXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBzdG9yZS5nZXQoa2V5KS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHN0b3JlLnB1dCh1cGRhdGVyKHRoaXMucmVzdWx0KSwga2V5KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KSk7XG59XG4vKipcbiAqIERlbGV0ZSBhIHBhcnRpY3VsYXIga2V5IGZyb20gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBkZWwoa2V5LCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgc3RvcmUuZGVsZXRlKGtleSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogRGVsZXRlIG11bHRpcGxlIGtleXMgYXQgb25jZS5cbiAqXG4gKiBAcGFyYW0ga2V5cyBMaXN0IG9mIGtleXMgdG8gZGVsZXRlLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGRlbE1hbnkoa2V5cywgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiBzdG9yZS5kZWxldGUoa2V5KSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogQ2xlYXIgYWxsIHZhbHVlcyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGNsZWFyKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBzdG9yZS5jbGVhcigpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBlYWNoQ3Vyc29yKGN1c3RvbVN0b3JlLCBjYWxsYmFjaykge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gVGhpcyB3b3VsZCBiZSBzdG9yZS5nZXRBbGxLZXlzKCksIGJ1dCBpdCBpc24ndCBzdXBwb3J0ZWQgYnkgRWRnZSBvciBTYWZhcmkuXG4gICAgICAgIC8vIEFuZCBvcGVuS2V5Q3Vyc29yIGlzbid0IHN1cHBvcnRlZCBieSBTYWZhcmkuXG4gICAgICAgIHN0b3JlLm9wZW5DdXJzb3IoKS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucmVzdWx0KVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMucmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0LmNvbnRpbnVlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IGFsbCBrZXlzIGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24ga2V5cyhjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICByZXR1cm4gZWFjaEN1cnNvcihjdXN0b21TdG9yZSwgKGN1cnNvcikgPT4gaXRlbXMucHVzaChjdXJzb3Iua2V5KSkudGhlbigoKSA9PiBpdGVtcyk7XG59XG4vKipcbiAqIEdldCBhbGwgdmFsdWVzIGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gdmFsdWVzKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIHJldHVybiBlYWNoQ3Vyc29yKGN1c3RvbVN0b3JlLCAoY3Vyc29yKSA9PiBpdGVtcy5wdXNoKGN1cnNvci52YWx1ZSkpLnRoZW4oKCkgPT4gaXRlbXMpO1xufVxuLyoqXG4gKiBHZXQgYWxsIGVudHJpZXMgaW4gdGhlIHN0b3JlLiBFYWNoIGVudHJ5IGlzIGFuIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBlbnRyaWVzKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIHJldHVybiBlYWNoQ3Vyc29yKGN1c3RvbVN0b3JlLCAoY3Vyc29yKSA9PiBpdGVtcy5wdXNoKFtjdXJzb3Iua2V5LCBjdXJzb3IudmFsdWVdKSkudGhlbigoKSA9PiBpdGVtcyk7XG59XG5cbmV4cG9ydCB7IGNsZWFyLCBjcmVhdGVTdG9yZSwgZGVsLCBkZWxNYW55LCBlbnRyaWVzLCBnZXQsIGdldE1hbnksIGtleXMsIHByb21pc2lmeVJlcXVlc3QsIHNldCwgc2V0TWFueSwgdXBkYXRlLCB2YWx1ZXMgfTtcbiIsIi8qKlxuICogV29yayBhcm91bmQgU2FmYXJpIDE0IEluZGV4ZWREQiBvcGVuIGJ1Zy5cbiAqXG4gKiBTYWZhcmkgaGFzIGEgaG9ycmlibGUgYnVnIHdoZXJlIElEQiByZXF1ZXN0cyBjYW4gaGFuZyB3aGlsZSB0aGUgYnJvd3NlciBpcyBzdGFydGluZyB1cC4gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTIyNjU0N1xuICogVGhlIG9ubHkgc29sdXRpb24gaXMgdG8ga2VlcCBudWRnaW5nIGl0IHVudGlsIGl0J3MgYXdha2UuXG4gKi9cbmZ1bmN0aW9uIGlkYlJlYWR5KCkge1xuICAgIHZhciBpc1NhZmFyaSA9ICFuYXZpZ2F0b3IudXNlckFnZW50RGF0YSAmJlxuICAgICAgICAvU2FmYXJpXFwvLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmXG4gICAgICAgICEvQ2hyb20oZXxpdW0pXFwvLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIC8vIE5vIHBvaW50IHB1dHRpbmcgb3RoZXIgYnJvd3NlcnMgb3Igb2xkZXIgdmVyc2lvbnMgb2YgU2FmYXJpIHRocm91Z2ggdGhpcyBtZXNzLlxuICAgIGlmICghaXNTYWZhcmkgfHwgIWluZGV4ZWREQi5kYXRhYmFzZXMpXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB2YXIgaW50ZXJ2YWxJZDtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgdmFyIHRyeUlkYiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGluZGV4ZWREQi5kYXRhYmFzZXMoKS5maW5hbGx5KHJlc29sdmUpOyB9O1xuICAgICAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodHJ5SWRiLCAxMDApO1xuICAgICAgICB0cnlJZGIoKTtcbiAgICB9KS5maW5hbGx5KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7IH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpZGJSZWFkeTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgYmFzZTY0IGZyb20gJ2Jhc2U2NC1qcydcbmltcG9ydCAqIGFzIGlkYkt2IGZyb20gJ2lkYi1rZXl2YWwnXG5pbXBvcnQgYnJva2VyU291cmNlIGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWxsbmV0cDJwL2FuLWJyb2tlci9kaXN0L2FuLWJyb2tlci5qcz9yYXcnXG5pbXBvcnQgeyBBbklkZW50aXR5Q29uZmlnLCBBbklkZW50aXR5IH0gZnJvbSAnQGFsbG5ldHAycC9hbi1pZGVudGl0eSdcblxuKGFzeW5jICgpID0+IHtcbiAgY29uc3QgaWRlbnRpdHlDb25maWcgPSBuZXcgQW5JZGVudGl0eUNvbmZpZygpXG4gIGNvbnN0IGlkZW50aXR5ID0gYXdhaXQgQW5JZGVudGl0eS5jcmVhdGVBbklkZW50aXR5KGlkZW50aXR5Q29uZmlnKVxuICBjb25zb2xlLmxvZygnQEAtbG9hZGVyLUBAIC0gaWRlbnRpdHk6ICcsIGlkZW50aXR5KVxuXG4gIGNvbnNvbGUubG9nKCdAQC1sb2FkZXItQEAgLSBicm9rZXIgc291cmNlOiAnLCBicm9rZXJTb3VyY2UpXG5cbiAgY29uc3QgYnJva2VyQmxvYiA9IG5ldyBCbG9iKFxuICAgIFticm9rZXJTb3VyY2VdLFxuICAgIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnIH1cbiAgKVxuXG4gIGNvbnNvbGUubG9nKCdAQC1sb2FkZXItQEAgLSBicm9rZXIgYmxvYjogJywgYnJva2VyQmxvYilcblxuICBjb25zdCBicm9rZXJVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJyb2tlckJsb2IpXG5cbiAgY29uc29sZS5sb2coJ0BALWxvYWRlci1AQCAtIGJyb2tlciB1cmw6ICcsIGJyb2tlclVybClcblxuICBjb25zdCBicm9rZXJXb3JrZXIgPSBuZXcgV29ya2VyKGJyb2tlclVybClcblxuICBVUkwucmV2b2tlT2JqZWN0VVJMKGJyb2tlclVybClcblxuICBjb25zb2xlLmxvZygnQEAtbG9hZGVyLUBAIC0gYnJva2VyIHdvcmtlcjogJywgYnJva2VyV29ya2VyKVxuXG4gIGJyb2tlcldvcmtlci5vbm1lc3NhZ2UgPSBldnQgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSBldnQuZGF0YVxuICAgIGlmIChkYXRhLnR5cGUgPT09ICdyZWdpc3Rlck1vZHVsZScpIHtcbiAgICAgIGJyb2tlcldvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGRpcjogJ3JlcycsXG4gICAgICAgIG1zZ0lkOiBkYXRhLm1zZ0lkXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBicm9rZXJXb3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBkaXI6ICdyZXMnLFxuICAgICAgICBtc2dJZDogZGF0YS5tc2dJZCxcbiAgICAgICAgZXJyb3I6ICd1bmhhbmRsZWQgcmVxIHR5cGU6ICcgKyBkYXRhLnR5cGVcbiAgICAgIH0pXG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKCdAQC1sb2FkZXItQEAgLSBicm9rZXIgbWVzc2FnZTogJywgZXZ0LmRhdGEpXG4gIH1cblxuICAvLyBicm9rZXJXb3JrZXIucG9zdE1lc3NhZ2UoJ3Rlc3QtbWVzc2FnZS1mcm9tLWFuLWxvYWRlcicpXG5cbiAgY29uc3QgcGFzc3BocmFzZSA9IGF3YWl0IGdldFVzZXJQYXNzcGhyYXNlKClcbiAgY29uc3Qgc2lnbktleXBhaXIgPSBhd2FpdCBsb2FkT3JHZW5lcmF0ZVNpZ25hdHVyZUtleXBhaXIocGFzc3BocmFzZSlcblxuICBjb25zb2xlLmxvZygnU0lHTiBLRVlQQUlSIElERU5USVRZJywgc2lnbktleXBhaXIpXG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjYW4gZGVidWc/JylcbiAgfSwgMTAwMClcbn0pKCkudGhlbigoKSA9PiB7fSwgZXJyID0+IHtcbiAgY29uc29sZS5lcnJvcihlcnIpXG59KVxuXG4vKipcbiAqIFRoaXMgaXMgYSBzdHViIHJpZ2h0IG5vdyB0aGF0IGp1c3QgcmV0dXJucyB0aGUgcGFzc3BocmFzZVxuICogJ3Bhc3NwaHJhc2UnIDogKVxuICovXG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyUGFzc3BocmFzZSAoKSB7XG4gIGNvbnN0IHBhc3NwaHJhc2VSYXcgPSAobmV3IFRleHRFbmNvZGVyKCkpLmVuY29kZSgncGFzc3BocmFzZScpXG5cbiAgY29uc29sZS5sb2coJ0BALWxvYWRlci1AQCAtIHBhc3NwaHJhc2VSYXc6ICcsIHBhc3NwaHJhc2VSYXcpXG5cbiAgY29uc3QgcGFzc3BocmFzZSA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KFxuICAgICdyYXcnLFxuICAgIHBhc3NwaHJhc2VSYXcuYnVmZmVyLFxuICAgICdQQktERjInLFxuICAgIGZhbHNlLFxuICAgIFsnZGVyaXZlS2V5J11cbiAgKVxuXG4gIGNvbnNvbGUubG9nKCdAQC1sb2FkZXItQEAgLSBwYXNzcGhyYXNlOiAnLCBwYXNzcGhyYXNlKVxuXG4gIHJldHVybiBwYXNzcGhyYXNlXG59XG5cbi8qKlxuICogR2VuZXJhdGUsIGVuY3J5cHQsIHN0b3JlLCBhbmQgcmV0dXJuIGEgbmV3IHNpZ25hdHVyZSBrZXlwYWlyLlxuICovXG5hc3luYyBmdW5jdGlvbiBnZW5lcmF0ZU5ld1NpZ25hdHVyZUtleXBhaXIgKHBhc3NwaHJhc2UpIHtcbiAgY29uc3Qgc2lnbkN1cnZlID0gJ1AtMzg0J1xuICBjb25zdCBwYmtkZjJIYXNoQWxnbyA9ICdTSEEtNTEyJ1xuICBjb25zdCBwYmtkZjJJdGVyYXRpb25zID0gMjAwMDAwXG5cbiAgY29uc3Qgc2lnbktleXBhaXIgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmdlbmVyYXRlS2V5KFxuICAgIHtcbiAgICAgIG5hbWU6ICdFQ0RTQScsXG4gICAgICBuYW1lZEN1cnZlOiBzaWduQ3VydmVcbiAgICB9LFxuICAgIHRydWUsXG4gICAgWydzaWduJywgJ3ZlcmlmeSddXG4gIClcblxuICBjb25zb2xlLmxvZygnQEAtbG9hZGVyLUBAIC0gc2lnbktleXBhaXI6ICcsIHNpZ25LZXlwYWlyKVxuXG4gIGNvbnN0IHBia2RmMlNhbHQgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDI0KSlcblxuICBjb25zdCBwYmtkZjJzdGFydCA9IERhdGUubm93KClcbiAgY29uc3Qgc2VjcmV0S2V5ID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5kZXJpdmVLZXkoXG4gICAge1xuICAgICAgbmFtZTogJ1BCS0RGMicsXG4gICAgICBoYXNoOiBwYmtkZjJIYXNoQWxnbyxcbiAgICAgIHNhbHQ6IHBia2RmMlNhbHQsXG4gICAgICBpdGVyYXRpb25zOiBwYmtkZjJJdGVyYXRpb25zXG4gICAgfSxcbiAgICBwYXNzcGhyYXNlLFxuICAgIHtcbiAgICAgIG5hbWU6ICdBRVMtR0NNJyxcbiAgICAgIGxlbmd0aDogOCAqIDMyXG4gICAgfSxcbiAgICBmYWxzZSxcbiAgICBbJ3dyYXBLZXknLCAndW53cmFwS2V5J11cbiAgKVxuICBjb25zdCBwYmtkZjJlbmQgPSBEYXRlLm5vdygpXG5cbiAgY29uc29sZS5sb2coXG4gICAgJ0BALWxvYWRlci1AQCAtIHNlY3JldEtleSAoaW4nLFxuICAgIHBia2RmMmVuZCAtIHBia2RmMnN0YXJ0LFxuICAgICdtcyk6ICcsXG4gICAgc2VjcmV0S2V5XG4gIClcblxuICBjb25zdCBhZXNHY21JdiA9IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMjQpKVxuXG4gIGNvbnN0IHNhdmVQcml2S2V5ID0gYXdhaXQgY3J5cHRvLnN1YnRsZS53cmFwS2V5KFxuICAgICdqd2snLFxuICAgIHNpZ25LZXlwYWlyLnByaXZhdGVLZXksXG4gICAgc2VjcmV0S2V5LFxuICAgIHtcbiAgICAgIG5hbWU6ICdBRVMtR0NNJyxcbiAgICAgIGl2OiBhZXNHY21JdixcbiAgICAgIHRhZ0xlbmd0aDogMTI4XG4gICAgfVxuICApXG5cbiAgY29uc29sZS5sb2coJ0BALWxvYWRlci1AQCAtIHNhdmVQcml2S2V5OiAnLCBzYXZlUHJpdktleSlcblxuICBjb25zdCBzYXZlUHViS2V5ID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5leHBvcnRLZXkoXG4gICAgJ2p3aycsXG4gICAgc2lnbktleXBhaXIucHVibGljS2V5XG4gIClcblxuICBjb25zb2xlLmxvZygnQEAtbG9hZGVyLUBAIC0gc2F2ZVB1YktleTogJywgc2F2ZVB1YktleSlcblxuICBjb25zdCBzaWduS2V5cGFpckVuYyA9IHtcbiAgICBwYmtkZjJIYXNoQWxnbyxcbiAgICBwYmtkZjJJdGVyYXRpb25zLFxuICAgIHBia2RmMlNhbHQ6IGJhc2U2NC5mcm9tQnl0ZUFycmF5KHBia2RmMlNhbHQpLFxuICAgIGFlc0djbUl2OiBiYXNlNjQuZnJvbUJ5dGVBcnJheShhZXNHY21JdiksXG4gICAgcHJpdmF0ZUtleTogYmFzZTY0LmZyb21CeXRlQXJyYXkobmV3IFVpbnQ4QXJyYXkoc2F2ZVByaXZLZXkpKSxcbiAgICBwdWJsaWNLZXk6IHNhdmVQdWJLZXlcbiAgfVxuXG4gIGNvbnNvbGUubG9nKCdAQC1sb2FkZXItQEAgLSBzaWduS2V5cGFpckVuYzogJywgc2lnbktleXBhaXJFbmMpXG5cbiAgYXdhaXQgaWRiS3Yuc2V0KCdzaWduS2V5cGFpcicsIHNpZ25LZXlwYWlyRW5jKVxuXG4gIHJldHVybiB7XG4gICAgcHJpdmF0ZUtleTogc2lnbktleXBhaXIucHJpdmF0ZUtleSxcbiAgICBwdWJsaWNLZXk6IHNpZ25LZXlwYWlyLnB1YmxpY0tleSxcbiAgICBwdWJsaWNLZXlKd2s6IHNpZ25LZXlwYWlyRW5jLnB1YmxpY0tleVxuICB9XG59XG5cbi8qKlxuICogTG9hZCBvciBnZW5lcmF0ZSBhIG5ldyBzaWduYXR1cmUga2V5cGFpci5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gbG9hZE9yR2VuZXJhdGVTaWduYXR1cmVLZXlwYWlyIChwYXNzcGhyYXNlKSB7XG4gIGNvbnN0IHNpZ25DdXJ2ZSA9ICdQLTM4NCdcblxuICBjb25zdCBzaWduS2V5cGFpckVuYyA9IGF3YWl0IChhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCBpZGJLdi5nZXQoJ3NpZ25LZXlwYWlyJylcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9KSgpXG5cbiAgaWYgKCFzaWduS2V5cGFpckVuYykge1xuICAgIGNvbnNvbGUubG9nKCdAQC1sb2FkZXItQEAgLSBubyBrZXlwYWlyIGluIGRiLCBHRU5FUkFUSU5HIE5FVycpXG4gICAgcmV0dXJuIGF3YWl0IGdlbmVyYXRlTmV3U2lnbmF0dXJlS2V5cGFpcihwYXNzcGhyYXNlKVxuICB9XG5cbiAgY29uc29sZS5sb2coJ0BALWxvYWRlci1AQCAtIGxvYWRlZCBzdG9yZWQga2V5cGFpcjogJywgc2lnbktleXBhaXJFbmMpXG5cbiAgY29uc3QgcGJrZGYyU2FsdCA9IGJhc2U2NC50b0J5dGVBcnJheShzaWduS2V5cGFpckVuYy5wYmtkZjJTYWx0KVxuXG4gIGNvbnN0IHBia2RmMnN0YXJ0ID0gRGF0ZS5ub3coKVxuICBjb25zdCBzZWNyZXRLZXkgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmRlcml2ZUtleShcbiAgICB7XG4gICAgICBuYW1lOiAnUEJLREYyJyxcbiAgICAgIGhhc2g6IHNpZ25LZXlwYWlyRW5jLnBia2RmMkhhc2hBbGdvLFxuICAgICAgc2FsdDogcGJrZGYyU2FsdCxcbiAgICAgIGl0ZXJhdGlvbnM6IHNpZ25LZXlwYWlyRW5jLnBia2RmMkl0ZXJhdGlvbnNcbiAgICB9LFxuICAgIHBhc3NwaHJhc2UsXG4gICAge1xuICAgICAgbmFtZTogJ0FFUy1HQ00nLFxuICAgICAgbGVuZ3RoOiA4ICogMzJcbiAgICB9LFxuICAgIGZhbHNlLFxuICAgIFsnd3JhcEtleScsICd1bndyYXBLZXknXVxuICApXG5cbiAgY29uc3QgcGJrZGYyZW5kID0gRGF0ZS5ub3coKVxuXG4gIGNvbnNvbGUubG9nKFxuICAgICdAQC1sb2FkZXItQEAgLSBzZWNyZXRLZXkgKGluJyxcbiAgICBwYmtkZjJlbmQgLSBwYmtkZjJzdGFydCxcbiAgICAnbXMpOiAnLFxuICAgIHNlY3JldEtleVxuICApXG5cbiAgY29uc3QgYWVzR2NtSXYgPSBiYXNlNjQudG9CeXRlQXJyYXkoc2lnbktleXBhaXJFbmMuYWVzR2NtSXYpXG5cbiAgY29uc3Qgc2lnblByaXZLZXkgPSBhd2FpdCBjcnlwdG8uc3VidGxlLnVud3JhcEtleShcbiAgICAnandrJyxcbiAgICBiYXNlNjQudG9CeXRlQXJyYXkoc2lnbktleXBhaXJFbmMucHJpdmF0ZUtleSksXG4gICAgc2VjcmV0S2V5LFxuICAgIHtcbiAgICAgIG5hbWU6ICdBRVMtR0NNJyxcbiAgICAgIGl2OiBhZXNHY21JdixcbiAgICAgIHRhZ0xlbmd0aDogMTI4XG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnRUNEU0EnLFxuICAgICAgbmFtZWRDdXJ2ZTogc2lnbkN1cnZlXG4gICAgfSxcbiAgICB0cnVlLFxuICAgIFsnc2lnbiddXG4gIClcblxuICBjb25zb2xlLmxvZygnQEAtbG9hZGVyLUBAIC0gc2lnblByaXZLZXk6ICcsIHNpZ25Qcml2S2V5KVxuXG4gIGNvbnN0IHNpZ25QdWJLZXkgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmltcG9ydEtleShcbiAgICAnandrJyxcbiAgICBzaWduS2V5cGFpckVuYy5wdWJsaWNLZXksXG4gICAge1xuICAgICAgbmFtZTogJ0VDRFNBJyxcbiAgICAgIG5hbWVkQ3VydmU6IHNpZ25DdXJ2ZVxuICAgIH0sXG4gICAgdHJ1ZSxcbiAgICBbJ3ZlcmlmeSddXG4gIClcblxuICByZXR1cm4ge1xuICAgIHByaXZhdGVLZXk6IHNpZ25Qcml2S2V5LFxuICAgIHB1YmxpY0tleTogc2lnblB1YktleSxcbiAgICBwdWJsaWNLZXlKd2s6IHNpZ25LZXlwYWlyRW5jLnB1YmxpY0tleVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=