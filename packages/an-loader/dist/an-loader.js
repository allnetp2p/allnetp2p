/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/* harmony import */ var jose_browser_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jose-browser-runtime */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/util/base64url.js");
/* harmony import */ var jose_browser_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jose-browser-runtime */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/key/import.js");
/* harmony import */ var jose_browser_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jose-browser-runtime */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/key/generate_key_pair.js");
/* harmony import */ var jose_browser_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jose-browser-runtime */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/key/export.js");
/* harmony import */ var jose_browser_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jose-browser-runtime */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jwk/thumbprint.js");
/* harmony import */ var jose_browser_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! jose-browser-runtime */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/general/sign.js");
/* harmony import */ var idb_keyval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! idb-keyval */ "../an-identity/node_modules/idb-keyval/dist/index.js");



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

    // microseconds in the future to set new identity expirations
    this.expireAfterCountMicros = Number.MAX_SAFE_INTEGER

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
  const activeId = await idb_keyval__WEBPACK_IMPORTED_MODULE_0__.get('anIdActive:')

  console.log('activeId', activeId)

  const saveIdentity = await idb_keyval__WEBPACK_IMPORTED_MODULE_0__.get('anIdPriv:' + activeId)

  console.log('loaded saveIdentity', saveIdentity)

  const decryptContext = {}

  for (const enc of saveIdentity.enc) {
    enc._priv = await _decryptPriv(enc, decryptContext, passphraseKey)
    delete enc.encryptedPrivateKey
  }

  for (const sig of saveIdentity.sig) {
    sig._priv = await _decryptPriv(sig, decryptContext, passphraseKey)
    delete sig.encryptedPrivateKey
  }

  const fullIdentity = saveIdentity

  console.log('loaded fullIdentity', fullIdentity)

  const pubIdentity = {
    expiresAtUtcMicros: fullIdentity.expiresAtUtcMicros,
    id: fullIdentity.id,
    jws: fullIdentity.jws,
    enc: [],
    sig: []
  }

  for (const enc of fullIdentity.enc) {
    pubIdentity.enc.push({
      alg: enc.alg,
      enc: enc.enc,
      id: enc.id,
      jwk: enc.jwk
    })
  }

  for (const sig of fullIdentity.sig) {
    pubIdentity.sig.push({
      alg: sig.alg,
      id: sig.id,
      jwk: sig.jwk
    })
  }

  console.log('loaded pubIdentity', pubIdentity)

  return new AnIdentity(fullIdentity, pubIdentity)
}

async function _decryptPriv (item, ctx, passphraseKey) {
  const outAlg = item.alg
  const enc = item.encryptedPrivateKey
  if (!enc.passphraseSecretAlg || !enc.passphraseSecretAlg.startsWith('PBKDF2:')) {
    throw new Error('bad secret alg')
  }
  if (!enc.passphraseSymAlg || !enc.passphraseSymAlg.startsWith('AES-GCM:')) {
    throw new Error('bad sym alg')
  }

  const algParts = enc.passphraseSecretAlg.split(':')
  const hash = algParts[1]
  const iters = parseInt(algParts[2], 10)
  const [alg, length] = enc.passphraseSymAlg.split(':')

  if (!ctx.salt || ctx.salt !== enc.passphraseSecretOpts.salt) {
    console.log('regenerate secret key...')

    ctx.salt = enc.passphraseSecretOpts.salt
    ctx.saltBytes = jose_browser_runtime__WEBPACK_IMPORTED_MODULE_1__.decode(ctx.salt)
    ctx.secretKey = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        hash,
        salt: ctx.saltBytes,
        iterations: iters
      },
      passphraseKey,
      {
        name: alg,
        length: parseInt(length, 10)
      },
      false,
      ['unwrapKey']
    )
  }

  console.log('ctx.secretKey', ctx.secretKey)

  let decKeyAlg = null
  let namedCurve = null
  let cap = null
  if (outAlg === 'ECDH-ES') {
    decKeyAlg = 'ECDH'
    namedCurve = 'P-256'
    cap = ['deriveKey', 'deriveBits']
  } else if (outAlg === 'ES384') {
    decKeyAlg = 'ECDSA'
    namedCurve = 'P-384'
    cap = ['sign']
  } else {
    throw new Error('unsupported priv key alg: "' + outAlg + '"')
  }

  const privateKey = await crypto.subtle.unwrapKey(
    'jwk',
    jose_browser_runtime__WEBPACK_IMPORTED_MODULE_1__.decode(enc.privateKey),
    ctx.secretKey,
    {
      name: 'AES-GCM',
      iv: jose_browser_runtime__WEBPACK_IMPORTED_MODULE_1__.decode(enc.passphraseSymOpts.iv),
      tagLength: 128
    },
    {
      name: decKeyAlg,
      namedCurve
    },
    true,
    cap
  )

  console.log('EXTRACTED PRIV KEY!!:', privateKey)

  const publicKey = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_2__.importJWK)(item.jwk, item.alg)

  console.log('pub key: ', publicKey)

  return {
    encryptedPrivateKey: item.encryptedPrivateKey,
    privateKey,
    publicKey
  }
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
            salt: jose_browser_runtime__WEBPACK_IMPORTED_MODULE_1__.encode(pbkdf2Salt)
          },
          passphraseSymAlg: config.passphraseSymAlg,
          passphraseSymOpts: {
            iv: jose_browser_runtime__WEBPACK_IMPORTED_MODULE_1__.encode(aesGcmIv)
          },
          privateKey: jose_browser_runtime__WEBPACK_IMPORTED_MODULE_1__.encode(new Uint8Array(savePrivKey))
        }
      }
    } else {
      throw new Error('unsupported passphraseSymAlg: "' + config.passphraseSymAlg + '"')
    }

    let expiresAtUtcMicros = Date.now() * 1000 + config.expireAfterCountMicros
    if (expiresAtUtcMicros > Number.MAX_SAFE_INTEGER) {
      expiresAtUtcMicros = Number.MAX_SAFE_INTEGER
    }

    const fullIdentity = {
      expiresAtUtcMicros,
      enc: [],
      sig: []
    }

    const pubIdentity = {
      expiresAtUtcMicros,
      enc: [],
      sig: []
    }

    const saveIdentity = {
      expiresAtUtcMicros,
      enc: [],
      sig: []
    }

    for (const encDef of config.encryptionAlgList) {
      const [alg, enc] = encDef.split(':')
      const pair = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_3__.generateKeyPair)(alg, { extractable: true })

      const publicKeyJwk = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_4__.exportJWK)(pair.publicKey)
      const publicThumbprint = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_5__.calculateJwkThumbprint)(publicKeyJwk, 'sha256')
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

      pubIdentity.enc.push({
        alg,
        enc,
        jwk: publicKeyJwk,
        id: publicThumbprint
      })

      saveIdentity.enc.push({
        alg,
        enc,
        jwk: publicKeyJwk,
        id: publicThumbprint,
        encryptedPrivateKey
      })
    }

    for (const sigAlg of config.signatureAlgList) {
      const pair = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_3__.generateKeyPair)(sigAlg, { extractable: true })

      const publicKeyJwk = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_4__.exportJWK)(pair.publicKey)
      const publicThumbprint = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_5__.calculateJwkThumbprint)(publicKeyJwk, 'sha256')
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

      pubIdentity.sig.push({
        alg: sigAlg,
        jwk: publicKeyJwk,
        id: publicThumbprint
      })

      saveIdentity.sig.push({
        alg: sigAlg,
        jwk: publicKeyJwk,
        id: publicThumbprint,
        encryptedPrivateKey
      })
    }

    // the payload for the signatures is:
    // - 8 bytes i64LE utc ms expiration
    // - [enc[N].id, ..]
    // - [sig[N].id, ..]
    const sigBytes = []

    const expiresAtBytes = new ArrayBuffer(8)
    const dv = new DataView(expiresAtBytes)
    dv.setBigInt64(0, BigInt(fullIdentity.expiresAtUtcMicros), true)
    sigBytes.push(new Uint8Array(expiresAtBytes))

    for (const enc of fullIdentity.enc) {
      sigBytes.push(jose_browser_runtime__WEBPACK_IMPORTED_MODULE_1__.decode(enc.id))
    }

    for (const sig of fullIdentity.sig) {
      sigBytes.push(jose_browser_runtime__WEBPACK_IMPORTED_MODULE_1__.decode(sig.id))
    }

    const sigBytesHash = await _concatHash(sigBytes)

    const sign = new jose_browser_runtime__WEBPACK_IMPORTED_MODULE_6__.GeneralSign(sigBytesHash)

    for (const sig of fullIdentity.sig) {
      sign
        .addSignature(sig._priv.privateKey)
        .setProtectedHeader({ alg: sig.alg })
    }

    fullIdentity.jws = await sign.sign()
    pubIdentity.jws = fullIdentity.jws
    saveIdentity.jws = fullIdentity.jws

    // unlike jwk thumbprints, there's no standard here...
    // using a sha-256 of: `payload + [protected + signature, ..]`
    const idBytes = []
    idBytes.push(jose_browser_runtime__WEBPACK_IMPORTED_MODULE_1__.decode(fullIdentity.jws.payload))
    for (const sig of fullIdentity.jws.signatures) {
      idBytes.push(jose_browser_runtime__WEBPACK_IMPORTED_MODULE_1__.decode(sig.protected))
      idBytes.push(jose_browser_runtime__WEBPACK_IMPORTED_MODULE_1__.decode(sig.signature))
    }

    fullIdentity.id = jose_browser_runtime__WEBPACK_IMPORTED_MODULE_1__.encode(await _concatHash(idBytes))
    pubIdentity.id = fullIdentity.id
    saveIdentity.id = fullIdentity.id

    console.log('full', fullIdentity)
    console.log('pub', pubIdentity)
    console.log('save', saveIdentity)

    await idb_keyval__WEBPACK_IMPORTED_MODULE_0__.set('anIdPub:' + pubIdentity.id, pubIdentity)
    await idb_keyval__WEBPACK_IMPORTED_MODULE_0__.set('anIdPriv:' + saveIdentity.id, saveIdentity)
    await idb_keyval__WEBPACK_IMPORTED_MODULE_0__.set('anIdActive:', saveIdentity.id)

    return new AnIdentity(fullIdentity, pubIdentity)
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
  constructor (fullIdentity, pubIdentity) {
    this.fullIdentity = fullIdentity
    this.pubIdentity = pubIdentity
  }

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
    } catch (e) {
      console.error('faild to load identity, generating new...', e)
      return await _genIdent(config, passphraseKey)
    }
  }
}

// -- helpers -- //

async function _concatHash (bufs) {
  let len = 0
  for (const buf of bufs) {
    len += buf.byteLength
  }

  const out = new Uint8Array(len)
  let offset = 0

  for (const buf of bufs) {
    out.set(buf, offset)
    offset += buf.byteLength
  }

  const hash = await crypto.subtle.digest('SHA-256', out)

  return new Uint8Array(hash)
}


/***/ }),

/***/ "../an-identity/node_modules/idb-keyval/dist/index.js":
/*!************************************************************!*\
  !*** ../an-identity/node_modules/idb-keyval/dist/index.js ***!
  \************************************************************/
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
/* harmony import */ var safari_14_idb_fix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! safari-14-idb-fix */ "../an-identity/node_modules/safari-14-idb-fix/dist/index.js");


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

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/key/import.js":
/*!***********************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/key/import.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "importSPKI": () => (/* binding */ importSPKI),
/* harmony export */   "importX509": () => (/* binding */ importX509),
/* harmony export */   "importPKCS8": () => (/* binding */ importPKCS8),
/* harmony export */   "importJWK": () => (/* binding */ importJWK)
/* harmony export */ });
/* harmony import */ var _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../runtime/base64url.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/base64url.js");
/* harmony import */ var _runtime_asn1_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../runtime/asn1.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/asn1.js");
/* harmony import */ var _runtime_jwk_to_key_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../runtime/jwk_to_key.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/jwk_to_key.js");
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/errors.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/util/errors.js");
/* harmony import */ var _lib_format_pem_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/format_pem.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/format_pem.js");
/* harmony import */ var _lib_is_object_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/is_object.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/is_object.js");







function getElement(seq) {
    let result = [];
    let next = 0;
    while (next < seq.length) {
        let nextPart = parseElement(seq.subarray(next));
        result.push(nextPart);
        next += nextPart.byteLength;
    }
    return result;
}
function parseElement(bytes) {
    let position = 0;
    let tag = bytes[0] & 0x1f;
    position++;
    if (tag === 0x1f) {
        tag = 0;
        while (bytes[position] >= 0x80) {
            tag = tag * 128 + bytes[position] - 0x80;
            position++;
        }
        tag = tag * 128 + bytes[position] - 0x80;
        position++;
    }
    let length = 0;
    if (bytes[position] < 0x80) {
        length = bytes[position];
        position++;
    }
    else {
        let numberOfDigits = bytes[position] & 0x7f;
        position++;
        length = 0;
        for (let i = 0; i < numberOfDigits; i++) {
            length = length * 256 + bytes[position];
            position++;
        }
    }
    if (length === 0x80) {
        length = 0;
        while (bytes[position + length] !== 0 || bytes[position + length + 1] !== 0) {
            length++;
        }
        const byteLength = position + length + 2;
        return {
            byteLength,
            contents: bytes.subarray(position, position + length),
            raw: bytes.subarray(0, byteLength),
        };
    }
    const byteLength = position + length;
    return {
        byteLength,
        contents: bytes.subarray(position, byteLength),
        raw: bytes.subarray(0, byteLength),
    };
}
function spkiFromX509(buf) {
    return (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_0__.encodeBase64)(getElement(getElement(parseElement(buf).contents)[0].contents)[6].raw);
}
function getSPKI(x509) {
    const pem = x509.replace(/(?:-----(?:BEGIN|END) CERTIFICATE-----|\s)/g, '');
    const raw = (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_0__.decodeBase64)(pem);
    return (0,_lib_format_pem_js__WEBPACK_IMPORTED_MODULE_1__["default"])(spkiFromX509(raw), 'PUBLIC KEY');
}
async function importSPKI(spki, alg, options) {
    if (typeof spki !== 'string' || spki.indexOf('-----BEGIN PUBLIC KEY-----') !== 0) {
        throw new TypeError('"spki" must be SPKI formatted string');
    }
    return (0,_runtime_asn1_js__WEBPACK_IMPORTED_MODULE_2__.fromSPKI)(spki, alg, options);
}
async function importX509(x509, alg, options) {
    if (typeof x509 !== 'string' || x509.indexOf('-----BEGIN CERTIFICATE-----') !== 0) {
        throw new TypeError('"x509" must be X.509 formatted string');
    }
    const spki = getSPKI(x509);
    return (0,_runtime_asn1_js__WEBPACK_IMPORTED_MODULE_2__.fromSPKI)(spki, alg, options);
}
async function importPKCS8(pkcs8, alg, options) {
    if (typeof pkcs8 !== 'string' || pkcs8.indexOf('-----BEGIN PRIVATE KEY-----') !== 0) {
        throw new TypeError('"pkcs8" must be PCKS8 formatted string');
    }
    return (0,_runtime_asn1_js__WEBPACK_IMPORTED_MODULE_2__.fromPKCS8)(pkcs8, alg, options);
}
async function importJWK(jwk, alg, octAsKeyObject) {
    if (!(0,_lib_is_object_js__WEBPACK_IMPORTED_MODULE_3__["default"])(jwk)) {
        throw new TypeError('JWK must be an object');
    }
    alg || (alg = jwk.alg);
    if (typeof alg !== 'string' || !alg) {
        throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
    }
    switch (jwk.kty) {
        case 'oct':
            if (typeof jwk.k !== 'string' || !jwk.k) {
                throw new TypeError('missing "k" (Key Value) Parameter value');
            }
            octAsKeyObject !== null && octAsKeyObject !== void 0 ? octAsKeyObject : (octAsKeyObject = jwk.ext !== true);
            if (octAsKeyObject) {
                return (0,_runtime_jwk_to_key_js__WEBPACK_IMPORTED_MODULE_4__["default"])({ ...jwk, alg, ext: false });
            }
            return (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_0__.decode)(jwk.k);
        case 'RSA':
            if (jwk.oth !== undefined) {
                throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_5__.JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
            }
        case 'EC':
        case 'OKP':
            return (0,_runtime_jwk_to_key_js__WEBPACK_IMPORTED_MODULE_4__["default"])({ ...jwk, alg });
        default:
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_5__.JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
    }
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

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/jwk_to_key.js":
/*!*******************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/jwk_to_key.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/global.js");
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webcrypto.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/webcrypto.js");
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/errors.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/util/errors.js");
/* harmony import */ var _base64url_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base64url.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/base64url.js");




function subtleMapping(jwk) {
    let algorithm;
    let keyUsages;
    switch (jwk.kty) {
        case 'oct': {
            switch (jwk.alg) {
                case 'HS256':
                case 'HS384':
                case 'HS512':
                    algorithm = { name: 'HMAC', hash: `SHA-${jwk.alg.substr(-3)}` };
                    keyUsages = ['sign', 'verify'];
                    break;
                case 'A128CBC-HS256':
                case 'A192CBC-HS384':
                case 'A256CBC-HS512':
                    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JOSENotSupported(`${jwk.alg} keys cannot be imported as CryptoKey instances`);
                case 'A128GCM':
                case 'A192GCM':
                case 'A256GCM':
                case 'A128GCMKW':
                case 'A192GCMKW':
                case 'A256GCMKW':
                    algorithm = { name: 'AES-GCM' };
                    keyUsages = ['encrypt', 'decrypt'];
                    break;
                case 'A128KW':
                case 'A192KW':
                case 'A256KW':
                    algorithm = { name: 'AES-KW' };
                    keyUsages = ['wrapKey', 'unwrapKey'];
                    break;
                case 'PBES2-HS256+A128KW':
                case 'PBES2-HS384+A192KW':
                case 'PBES2-HS512+A256KW':
                    algorithm = { name: 'PBKDF2' };
                    keyUsages = ['deriveBits'];
                    break;
                default:
                    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
            }
            break;
        }
        case 'RSA': {
            switch (jwk.alg) {
                case 'PS256':
                case 'PS384':
                case 'PS512':
                    algorithm = { name: 'RSA-PSS', hash: `SHA-${jwk.alg.substr(-3)}` };
                    keyUsages = jwk.d ? ['sign'] : ['verify'];
                    break;
                case 'RS256':
                case 'RS384':
                case 'RS512':
                    algorithm = { name: 'RSASSA-PKCS1-v1_5', hash: `SHA-${jwk.alg.substr(-3)}` };
                    keyUsages = jwk.d ? ['sign'] : ['verify'];
                    break;
                case 'RSA-OAEP':
                case 'RSA-OAEP-256':
                case 'RSA-OAEP-384':
                case 'RSA-OAEP-512':
                    algorithm = {
                        name: 'RSA-OAEP',
                        hash: `SHA-${parseInt(jwk.alg.substr(-3), 10) || 1}`,
                    };
                    keyUsages = jwk.d ? ['decrypt', 'unwrapKey'] : ['encrypt', 'wrapKey'];
                    break;
                default:
                    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
            }
            break;
        }
        case 'EC': {
            switch (jwk.alg) {
                case 'ES256':
                    algorithm = { name: 'ECDSA', namedCurve: 'P-256' };
                    keyUsages = jwk.d ? ['sign'] : ['verify'];
                    break;
                case 'ES384':
                    algorithm = { name: 'ECDSA', namedCurve: 'P-384' };
                    keyUsages = jwk.d ? ['sign'] : ['verify'];
                    break;
                case 'ES512':
                    algorithm = { name: 'ECDSA', namedCurve: 'P-521' };
                    keyUsages = jwk.d ? ['sign'] : ['verify'];
                    break;
                case 'ECDH-ES':
                case 'ECDH-ES+A128KW':
                case 'ECDH-ES+A192KW':
                case 'ECDH-ES+A256KW':
                    algorithm = { name: 'ECDH', namedCurve: jwk.crv };
                    keyUsages = jwk.d ? ['deriveBits'] : [];
                    break;
                default:
                    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
            }
            break;
        }
        case ((0,_global_js__WEBPACK_IMPORTED_MODULE_1__.isCloudflareWorkers)() || (0,_global_js__WEBPACK_IMPORTED_MODULE_1__.isNodeJs)()) && 'OKP':
            if (jwk.alg !== 'EdDSA') {
                throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
            }
            switch (jwk.crv) {
                case 'Ed25519':
                    algorithm = { name: 'NODE-ED25519', namedCurve: 'NODE-ED25519' };
                    keyUsages = jwk.d ? ['sign'] : ['verify'];
                    break;
                case (0,_global_js__WEBPACK_IMPORTED_MODULE_1__.isNodeJs)() && 'Ed448':
                    algorithm = { name: 'NODE-ED448', namedCurve: 'NODE-ED448' };
                    keyUsages = jwk.d ? ['sign'] : ['verify'];
                    break;
                default:
                    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JOSENotSupported('Invalid or unsupported JWK "crv" (Subtype of Key Pair) Parameter value');
            }
            break;
        default:
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JOSENotSupported('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
    }
    return { algorithm, keyUsages };
}
const parse = async (jwk) => {
    var _a, _b;
    const { algorithm, keyUsages } = subtleMapping(jwk);
    const rest = [
        algorithm,
        (_a = jwk.ext) !== null && _a !== void 0 ? _a : false,
        (_b = jwk.key_ops) !== null && _b !== void 0 ? _b : keyUsages,
    ];
    if (algorithm.name === 'PBKDF2') {
        return _webcrypto_js__WEBPACK_IMPORTED_MODULE_2__["default"].subtle.importKey('raw', (0,_base64url_js__WEBPACK_IMPORTED_MODULE_3__.decode)(jwk.k), ...rest);
    }
    const keyData = { ...jwk };
    delete keyData.alg;
    return _webcrypto_js__WEBPACK_IMPORTED_MODULE_2__["default"].subtle.importKey('jwk', keyData, ...rest);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parse);


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

/***/ "../an-identity/node_modules/safari-14-idb-fix/dist/index.js":
/*!*******************************************************************!*\
  !*** ../an-identity/node_modules/safari-14-idb-fix/dist/index.js ***!
  \*******************************************************************/
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
/* harmony import */ var _node_modules_allnetp2p_an_broker_dist_an_broker_js_raw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/@allnetp2p/an-broker/dist/an-broker.js?raw */ "../an-broker/dist/an-broker.js?raw");
/* harmony import */ var _allnetp2p_an_identity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @allnetp2p/an-identity */ "../an-identity/lib/an-identity.mjs");



(async () => {
  const identityConfig = new _allnetp2p_an_identity__WEBPACK_IMPORTED_MODULE_1__.AnIdentityConfig()
  const identity = await _allnetp2p_an_identity__WEBPACK_IMPORTED_MODULE_1__.AnIdentity.createAnIdentity(identityConfig)
  console.log('@@-loader-@@ - identity: ', identity)

  console.log('@@-loader-@@ - broker source: ', _node_modules_allnetp2p_an_broker_dist_an_broker_js_raw__WEBPACK_IMPORTED_MODULE_0__)

  const brokerBlob = new Blob(
    [_node_modules_allnetp2p_an_broker_dist_an_broker_js_raw__WEBPACK_IMPORTED_MODULE_0__],
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

  setTimeout(() => {
    throw new Error('can debug?')
  }, 1000)
})().then(() => {}, err => {
  console.error(err)
})

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnFGO0FBQ2hCOztBQUVyRTtBQUNBLDZCQUE2QixvRUFBZ0I7QUFDN0MseUJBQXlCLCtFQUEyQjtBQUNwRDs7QUFFQSxnREFBZ0Qsb0ZBQVk7O0FBRTVEO0FBQ0EsS0FBSyxvRkFBWTtBQUNqQixNQUFNO0FBQ047O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDLGlCQUFpQjtBQUNsQjtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9saWIvYW4taWRlbnRpdHkubWpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9pZGIta2V5dmFsL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9qd2svdGh1bWJwcmludC5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2p3cy9mbGF0dGVuZWQvc2lnbi5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2p3cy9nZW5lcmFsL3NpZ24uanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9rZXkvZXhwb3J0LmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIva2V5L2dlbmVyYXRlX2tleV9wYWlyLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIva2V5L2ltcG9ydC5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2xpYi9idWZmZXJfdXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9saWIvY2hlY2tfa2V5X3R5cGUuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9saWIvY3J5cHRvX2tleS5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2xpYi9mb3JtYXRfcGVtLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvbGliL2ludmFsaWRfa2V5X2lucHV0LmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvbGliL2lzX2Rpc2pvaW50LmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvbGliL2lzX29iamVjdC5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2xpYi92YWxpZGF0ZV9jcml0LmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvcnVudGltZS9hc24xLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvcnVudGltZS9iYXNlNjR1cmwuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9ydW50aW1lL2NoZWNrX2tleV9sZW5ndGguanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9ydW50aW1lL2RpZ2VzdC5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL3J1bnRpbWUvZ2VuZXJhdGUuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9ydW50aW1lL2dldF9zaWduX3ZlcmlmeV9rZXkuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9ydW50aW1lL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL3J1bnRpbWUvaXNfa2V5X2xpa2UuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9ydW50aW1lL2p3a190b19rZXkuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9ydW50aW1lL2tleV90b19qd2suanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9ydW50aW1lL3JhbmRvbS5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL3J1bnRpbWUvc2lnbi5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL3J1bnRpbWUvc3VidGxlX2RzYS5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL3J1bnRpbWUvd2ViY3J5cHRvLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvdXRpbC9iYXNlNjR1cmwuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci91dGlsL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvc2FmYXJpLTE0LWlkYi1maXgvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4vbGliL2FuLWxvYWRlci5tanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgYmFzZTY0dXJsLFxuICBjYWxjdWxhdGVKd2tUaHVtYnByaW50LFxuICBleHBvcnRKV0ssXG4gIEdlbmVyYWxTaWduLFxuICBnZW5lcmF0ZUtleVBhaXIsXG4gIGltcG9ydEpXS1xufSBmcm9tICdqb3NlLWJyb3dzZXItcnVudGltZSdcbmltcG9ydCAqIGFzIGlkYkt2IGZyb20gJ2lkYi1rZXl2YWwnXG5cbi8qKlxuICogQW5JZGVudGl0eSBBbGdvcml0aG0gVHVuaW5nLlxuICogSWYgeW91J3JlIG5vdCBzdXJlIHdoYXQgeW91J3JlIGRvaW5nLCBqdXN0IGNyZWF0ZSBhIGRlZmF1bHQgY29uZmlnLlxuICovXG5leHBvcnQgY2xhc3MgQW5JZGVudGl0eUNvbmZpZyB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICAvLyBqd3MgYWxnIGFycmF5XG4gICAgdGhpcy5zaWduYXR1cmVBbGdMaXN0ID0gWydFUzM4NCddXG5cbiAgICAvLyBqd2UgYWxnOmVuYyBhcnJheVxuICAgIHRoaXMuZW5jcnlwdGlvbkFsZ0xpc3QgPSBbJ0VDREgtRVM6QTI1NkdDTSddXG5cbiAgICAvLyBjcnlwdG8uc3VidGxlIGRlcml2ZUtleSBhbGcgKyBjb2xvbiBkZWxpbWl0ZWQgY29uZmlnXG4gICAgdGhpcy5wYXNzcGhyYXNlU2VjcmV0QWxnID0gJ1BCS0RGMjpTSEEtNTEyOjIwMDAwMCdcblxuICAgIC8vIGNyeXB0by5zdWJ0bGUgd3JhcEtleSBhbGcgKyBjb2xvbiBkZWxpbWl0ZWQgY29uZmlnXG4gICAgdGhpcy5wYXNzcGhyYXNlU3ltQWxnID0gJ0FFUy1HQ006MjU2J1xuXG4gICAgLy8gbWljcm9zZWNvbmRzIGluIHRoZSBmdXR1cmUgdG8gc2V0IG5ldyBpZGVudGl0eSBleHBpcmF0aW9uc1xuICAgIHRoaXMuZXhwaXJlQWZ0ZXJDb3VudE1pY3JvcyA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSXG5cbiAgICAvLyBmdW5jdGlvbiByZXR1cm5pbmcgUHJvbWlzZTxDcnlwdG9LZXk+IG1hcmtlZCB3aXRoIGRlcml2ZUtleVxuICAgIHRoaXMucGFzc3BocmFzZUdldENiID0gYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgcGFzc3BocmFzZSA9IHdpbmRvdy5wcm9tcHQoJ0VudGVyIHlvdXIgcGFzc3BocmFzZSAtIHRoaXMgaXMgdGhlIGRlZmF1bHQgREVWIHBhc3N3b3JkIGZldGNoZXIgdXNpbmcgd2luZG93LnByb21wdC4uLiB0aGVyZSBpcyBubyB3YXkgdG8gb2JzY3VyZSB0aGUgZW50ZXJlZCBwYXNzcGhyYXNlLCB5b3Ugc2hvdWxkIE5PVCB1c2UgdGhpcyBpbiBQUk9EVUNUSU9OISBPbmNlIHRoaXMgaXMgbWFza2VkLCB3ZSBoaWdobHkgcmVjb21tZW5kIHVzaW5nIGEgcGFzc3dvcmQgbWFuYWdlciB0byBtYW5hZ2UgdGhpcyBwYXNzcGhyYXNlLicsICcnKVxuICAgICAgY29uc3QgcGFzc3BocmFzZVJhdyA9IChuZXcgVGV4dEVuY29kZXIoKSkuZW5jb2RlKHBhc3NwaHJhc2UpXG4gICAgICBjb25zdCBwYXNzcGhyYXNlS2V5ID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5pbXBvcnRLZXkoXG4gICAgICAgICdyYXcnLFxuICAgICAgICBwYXNzcGhyYXNlUmF3LmJ1ZmZlcixcbiAgICAgICAgJ1BCS0RGMicsXG4gICAgICAgIGZhbHNlLFxuICAgICAgICBbJ2Rlcml2ZUtleSddXG4gICAgICApXG4gICAgICByZXR1cm4gcGFzc3BocmFzZUtleVxuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBfbG9hZElkZW50IChwYXNzcGhyYXNlS2V5KSB7XG4gIGNvbnN0IGFjdGl2ZUlkID0gYXdhaXQgaWRiS3YuZ2V0KCdhbklkQWN0aXZlOicpXG5cbiAgY29uc29sZS5sb2coJ2FjdGl2ZUlkJywgYWN0aXZlSWQpXG5cbiAgY29uc3Qgc2F2ZUlkZW50aXR5ID0gYXdhaXQgaWRiS3YuZ2V0KCdhbklkUHJpdjonICsgYWN0aXZlSWQpXG5cbiAgY29uc29sZS5sb2coJ2xvYWRlZCBzYXZlSWRlbnRpdHknLCBzYXZlSWRlbnRpdHkpXG5cbiAgY29uc3QgZGVjcnlwdENvbnRleHQgPSB7fVxuXG4gIGZvciAoY29uc3QgZW5jIG9mIHNhdmVJZGVudGl0eS5lbmMpIHtcbiAgICBlbmMuX3ByaXYgPSBhd2FpdCBfZGVjcnlwdFByaXYoZW5jLCBkZWNyeXB0Q29udGV4dCwgcGFzc3BocmFzZUtleSlcbiAgICBkZWxldGUgZW5jLmVuY3J5cHRlZFByaXZhdGVLZXlcbiAgfVxuXG4gIGZvciAoY29uc3Qgc2lnIG9mIHNhdmVJZGVudGl0eS5zaWcpIHtcbiAgICBzaWcuX3ByaXYgPSBhd2FpdCBfZGVjcnlwdFByaXYoc2lnLCBkZWNyeXB0Q29udGV4dCwgcGFzc3BocmFzZUtleSlcbiAgICBkZWxldGUgc2lnLmVuY3J5cHRlZFByaXZhdGVLZXlcbiAgfVxuXG4gIGNvbnN0IGZ1bGxJZGVudGl0eSA9IHNhdmVJZGVudGl0eVxuXG4gIGNvbnNvbGUubG9nKCdsb2FkZWQgZnVsbElkZW50aXR5JywgZnVsbElkZW50aXR5KVxuXG4gIGNvbnN0IHB1YklkZW50aXR5ID0ge1xuICAgIGV4cGlyZXNBdFV0Y01pY3JvczogZnVsbElkZW50aXR5LmV4cGlyZXNBdFV0Y01pY3JvcyxcbiAgICBpZDogZnVsbElkZW50aXR5LmlkLFxuICAgIGp3czogZnVsbElkZW50aXR5Lmp3cyxcbiAgICBlbmM6IFtdLFxuICAgIHNpZzogW11cbiAgfVxuXG4gIGZvciAoY29uc3QgZW5jIG9mIGZ1bGxJZGVudGl0eS5lbmMpIHtcbiAgICBwdWJJZGVudGl0eS5lbmMucHVzaCh7XG4gICAgICBhbGc6IGVuYy5hbGcsXG4gICAgICBlbmM6IGVuYy5lbmMsXG4gICAgICBpZDogZW5jLmlkLFxuICAgICAgandrOiBlbmMuandrXG4gICAgfSlcbiAgfVxuXG4gIGZvciAoY29uc3Qgc2lnIG9mIGZ1bGxJZGVudGl0eS5zaWcpIHtcbiAgICBwdWJJZGVudGl0eS5zaWcucHVzaCh7XG4gICAgICBhbGc6IHNpZy5hbGcsXG4gICAgICBpZDogc2lnLmlkLFxuICAgICAgandrOiBzaWcuandrXG4gICAgfSlcbiAgfVxuXG4gIGNvbnNvbGUubG9nKCdsb2FkZWQgcHViSWRlbnRpdHknLCBwdWJJZGVudGl0eSlcblxuICByZXR1cm4gbmV3IEFuSWRlbnRpdHkoZnVsbElkZW50aXR5LCBwdWJJZGVudGl0eSlcbn1cblxuYXN5bmMgZnVuY3Rpb24gX2RlY3J5cHRQcml2IChpdGVtLCBjdHgsIHBhc3NwaHJhc2VLZXkpIHtcbiAgY29uc3Qgb3V0QWxnID0gaXRlbS5hbGdcbiAgY29uc3QgZW5jID0gaXRlbS5lbmNyeXB0ZWRQcml2YXRlS2V5XG4gIGlmICghZW5jLnBhc3NwaHJhc2VTZWNyZXRBbGcgfHwgIWVuYy5wYXNzcGhyYXNlU2VjcmV0QWxnLnN0YXJ0c1dpdGgoJ1BCS0RGMjonKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignYmFkIHNlY3JldCBhbGcnKVxuICB9XG4gIGlmICghZW5jLnBhc3NwaHJhc2VTeW1BbGcgfHwgIWVuYy5wYXNzcGhyYXNlU3ltQWxnLnN0YXJ0c1dpdGgoJ0FFUy1HQ006JykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2JhZCBzeW0gYWxnJylcbiAgfVxuXG4gIGNvbnN0IGFsZ1BhcnRzID0gZW5jLnBhc3NwaHJhc2VTZWNyZXRBbGcuc3BsaXQoJzonKVxuICBjb25zdCBoYXNoID0gYWxnUGFydHNbMV1cbiAgY29uc3QgaXRlcnMgPSBwYXJzZUludChhbGdQYXJ0c1syXSwgMTApXG4gIGNvbnN0IFthbGcsIGxlbmd0aF0gPSBlbmMucGFzc3BocmFzZVN5bUFsZy5zcGxpdCgnOicpXG5cbiAgaWYgKCFjdHguc2FsdCB8fCBjdHguc2FsdCAhPT0gZW5jLnBhc3NwaHJhc2VTZWNyZXRPcHRzLnNhbHQpIHtcbiAgICBjb25zb2xlLmxvZygncmVnZW5lcmF0ZSBzZWNyZXQga2V5Li4uJylcblxuICAgIGN0eC5zYWx0ID0gZW5jLnBhc3NwaHJhc2VTZWNyZXRPcHRzLnNhbHRcbiAgICBjdHguc2FsdEJ5dGVzID0gYmFzZTY0dXJsLmRlY29kZShjdHguc2FsdClcbiAgICBjdHguc2VjcmV0S2V5ID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5kZXJpdmVLZXkoXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdQQktERjInLFxuICAgICAgICBoYXNoLFxuICAgICAgICBzYWx0OiBjdHguc2FsdEJ5dGVzLFxuICAgICAgICBpdGVyYXRpb25zOiBpdGVyc1xuICAgICAgfSxcbiAgICAgIHBhc3NwaHJhc2VLZXksXG4gICAgICB7XG4gICAgICAgIG5hbWU6IGFsZyxcbiAgICAgICAgbGVuZ3RoOiBwYXJzZUludChsZW5ndGgsIDEwKVxuICAgICAgfSxcbiAgICAgIGZhbHNlLFxuICAgICAgWyd1bndyYXBLZXknXVxuICAgIClcbiAgfVxuXG4gIGNvbnNvbGUubG9nKCdjdHguc2VjcmV0S2V5JywgY3R4LnNlY3JldEtleSlcblxuICBsZXQgZGVjS2V5QWxnID0gbnVsbFxuICBsZXQgbmFtZWRDdXJ2ZSA9IG51bGxcbiAgbGV0IGNhcCA9IG51bGxcbiAgaWYgKG91dEFsZyA9PT0gJ0VDREgtRVMnKSB7XG4gICAgZGVjS2V5QWxnID0gJ0VDREgnXG4gICAgbmFtZWRDdXJ2ZSA9ICdQLTI1NidcbiAgICBjYXAgPSBbJ2Rlcml2ZUtleScsICdkZXJpdmVCaXRzJ11cbiAgfSBlbHNlIGlmIChvdXRBbGcgPT09ICdFUzM4NCcpIHtcbiAgICBkZWNLZXlBbGcgPSAnRUNEU0EnXG4gICAgbmFtZWRDdXJ2ZSA9ICdQLTM4NCdcbiAgICBjYXAgPSBbJ3NpZ24nXVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcigndW5zdXBwb3J0ZWQgcHJpdiBrZXkgYWxnOiBcIicgKyBvdXRBbGcgKyAnXCInKVxuICB9XG5cbiAgY29uc3QgcHJpdmF0ZUtleSA9IGF3YWl0IGNyeXB0by5zdWJ0bGUudW53cmFwS2V5KFxuICAgICdqd2snLFxuICAgIGJhc2U2NHVybC5kZWNvZGUoZW5jLnByaXZhdGVLZXkpLFxuICAgIGN0eC5zZWNyZXRLZXksXG4gICAge1xuICAgICAgbmFtZTogJ0FFUy1HQ00nLFxuICAgICAgaXY6IGJhc2U2NHVybC5kZWNvZGUoZW5jLnBhc3NwaHJhc2VTeW1PcHRzLml2KSxcbiAgICAgIHRhZ0xlbmd0aDogMTI4XG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBkZWNLZXlBbGcsXG4gICAgICBuYW1lZEN1cnZlXG4gICAgfSxcbiAgICB0cnVlLFxuICAgIGNhcFxuICApXG5cbiAgY29uc29sZS5sb2coJ0VYVFJBQ1RFRCBQUklWIEtFWSEhOicsIHByaXZhdGVLZXkpXG5cbiAgY29uc3QgcHVibGljS2V5ID0gYXdhaXQgaW1wb3J0SldLKGl0ZW0uandrLCBpdGVtLmFsZylcblxuICBjb25zb2xlLmxvZygncHViIGtleTogJywgcHVibGljS2V5KVxuXG4gIHJldHVybiB7XG4gICAgZW5jcnlwdGVkUHJpdmF0ZUtleTogaXRlbS5lbmNyeXB0ZWRQcml2YXRlS2V5LFxuICAgIHByaXZhdGVLZXksXG4gICAgcHVibGljS2V5XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gX2dlbklkZW50IChjb25maWcsIHBhc3NwaHJhc2VLZXkpIHtcbiAgaWYgKGNvbmZpZy5wYXNzcGhyYXNlU2VjcmV0QWxnLnN0YXJ0c1dpdGgoJ1BCS0RGMjonKSkge1xuICAgIGNvbnN0IGFsZ1BhcnRzID0gY29uZmlnLnBhc3NwaHJhc2VTZWNyZXRBbGcuc3BsaXQoJzonKVxuICAgIGNvbnN0IGhhc2ggPSBhbGdQYXJ0c1sxXVxuICAgIGNvbnN0IGl0ZXJzID0gcGFyc2VJbnQoYWxnUGFydHNbMl0sIDEwKVxuXG4gICAgbGV0IGVuY3J5cHRQcml2S2V5ID0gbnVsbFxuXG4gICAgaWYgKGNvbmZpZy5wYXNzcGhyYXNlU3ltQWxnLnN0YXJ0c1dpdGgoJ0FFUy1HQ006JykpIHtcbiAgICAgIGNvbnN0IFthbGcsIGxlbmd0aF0gPSBjb25maWcucGFzc3BocmFzZVN5bUFsZy5zcGxpdCgnOicpXG5cbiAgICAgIGNvbnN0IHBia2RmMlNhbHQgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDI0KSlcbiAgICAgIGNvbnN0IHNlY3JldEtleSA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuZGVyaXZlS2V5KFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ1BCS0RGMicsXG4gICAgICAgICAgaGFzaCxcbiAgICAgICAgICBzYWx0OiBwYmtkZjJTYWx0LFxuICAgICAgICAgIGl0ZXJhdGlvbnM6IGl0ZXJzXG4gICAgICAgIH0sXG4gICAgICAgIHBhc3NwaHJhc2VLZXksXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBhbGcsXG4gICAgICAgICAgbGVuZ3RoOiBwYXJzZUludChsZW5ndGgsIDEwKVxuICAgICAgICB9LFxuICAgICAgICBmYWxzZSxcbiAgICAgICAgWyd3cmFwS2V5J11cbiAgICAgIClcblxuICAgICAgLy8gam9zZS9qdyogdG9vbHMgZG9uJ3QgaGF2ZSBhbnkgc3VwcG9ydCBmb3IgcGFzc3dvcmQgaGFzaGluZ1xuICAgICAgLy8gbm9yIHRoZSBhYmlsaXR5IHRvIGVuY3J5cHQgcHJpdmF0ZSBrZXlzIHdpdGhvdXQgZXhwb3NpbmdcbiAgICAgIC8vIHRoZW0gdG8gdW5zYWZlIGphdmFzY3JpcHQgcnVudGltZSBtZW1vcnksIHNvIHdlJ2xsXG4gICAgICAvLyB1c2UgY3J5cHRvLnN1YnRsZSBkaXJlY3RseSBmb3IgcGVyc2lzdGluZyB0aGUgcHJpdmF0ZSBrZXlzLlxuICAgICAgZW5jcnlwdFByaXZLZXkgPSBhc3luYyBwcml2YXRlS2V5ID0+IHtcbiAgICAgICAgY29uc3QgYWVzR2NtSXYgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDI0KSlcbiAgICAgICAgY29uc3Qgc2F2ZVByaXZLZXkgPSBhd2FpdCBjcnlwdG8uc3VidGxlLndyYXBLZXkoXG4gICAgICAgICAgJ2p3aycsXG4gICAgICAgICAgcHJpdmF0ZUtleSxcbiAgICAgICAgICBzZWNyZXRLZXksXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogYWxnLFxuICAgICAgICAgICAgaXY6IGFlc0djbUl2LFxuICAgICAgICAgICAgdGFnTGVuZ3RoOiAxMjhcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwYXNzcGhyYXNlU2VjcmV0QWxnOiBjb25maWcucGFzc3BocmFzZVNlY3JldEFsZyxcbiAgICAgICAgICBwYXNzcGhyYXNlU2VjcmV0T3B0czoge1xuICAgICAgICAgICAgc2FsdDogYmFzZTY0dXJsLmVuY29kZShwYmtkZjJTYWx0KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcGFzc3BocmFzZVN5bUFsZzogY29uZmlnLnBhc3NwaHJhc2VTeW1BbGcsXG4gICAgICAgICAgcGFzc3BocmFzZVN5bU9wdHM6IHtcbiAgICAgICAgICAgIGl2OiBiYXNlNjR1cmwuZW5jb2RlKGFlc0djbUl2KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcHJpdmF0ZUtleTogYmFzZTY0dXJsLmVuY29kZShuZXcgVWludDhBcnJheShzYXZlUHJpdktleSkpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBwYXNzcGhyYXNlU3ltQWxnOiBcIicgKyBjb25maWcucGFzc3BocmFzZVN5bUFsZyArICdcIicpXG4gICAgfVxuXG4gICAgbGV0IGV4cGlyZXNBdFV0Y01pY3JvcyA9IERhdGUubm93KCkgKiAxMDAwICsgY29uZmlnLmV4cGlyZUFmdGVyQ291bnRNaWNyb3NcbiAgICBpZiAoZXhwaXJlc0F0VXRjTWljcm9zID4gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpIHtcbiAgICAgIGV4cGlyZXNBdFV0Y01pY3JvcyA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSXG4gICAgfVxuXG4gICAgY29uc3QgZnVsbElkZW50aXR5ID0ge1xuICAgICAgZXhwaXJlc0F0VXRjTWljcm9zLFxuICAgICAgZW5jOiBbXSxcbiAgICAgIHNpZzogW11cbiAgICB9XG5cbiAgICBjb25zdCBwdWJJZGVudGl0eSA9IHtcbiAgICAgIGV4cGlyZXNBdFV0Y01pY3JvcyxcbiAgICAgIGVuYzogW10sXG4gICAgICBzaWc6IFtdXG4gICAgfVxuXG4gICAgY29uc3Qgc2F2ZUlkZW50aXR5ID0ge1xuICAgICAgZXhwaXJlc0F0VXRjTWljcm9zLFxuICAgICAgZW5jOiBbXSxcbiAgICAgIHNpZzogW11cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGVuY0RlZiBvZiBjb25maWcuZW5jcnlwdGlvbkFsZ0xpc3QpIHtcbiAgICAgIGNvbnN0IFthbGcsIGVuY10gPSBlbmNEZWYuc3BsaXQoJzonKVxuICAgICAgY29uc3QgcGFpciA9IGF3YWl0IGdlbmVyYXRlS2V5UGFpcihhbGcsIHsgZXh0cmFjdGFibGU6IHRydWUgfSlcblxuICAgICAgY29uc3QgcHVibGljS2V5SndrID0gYXdhaXQgZXhwb3J0SldLKHBhaXIucHVibGljS2V5KVxuICAgICAgY29uc3QgcHVibGljVGh1bWJwcmludCA9IGF3YWl0IGNhbGN1bGF0ZUp3a1RodW1icHJpbnQocHVibGljS2V5SndrLCAnc2hhMjU2JylcbiAgICAgIGNvbnN0IGVuY3J5cHRlZFByaXZhdGVLZXkgPSBhd2FpdCBlbmNyeXB0UHJpdktleShwYWlyLnByaXZhdGVLZXkpXG5cbiAgICAgIGZ1bGxJZGVudGl0eS5lbmMucHVzaCh7XG4gICAgICAgIGFsZyxcbiAgICAgICAgZW5jLFxuICAgICAgICBqd2s6IHB1YmxpY0tleUp3ayxcbiAgICAgICAgaWQ6IHB1YmxpY1RodW1icHJpbnQsXG4gICAgICAgIF9wcml2OiB7XG4gICAgICAgICAgcHVibGljS2V5OiBwYWlyLnB1YmxpY0tleSxcbiAgICAgICAgICBwcml2YXRlS2V5OiBwYWlyLnByaXZhdGVLZXksXG4gICAgICAgICAgZW5jcnlwdGVkUHJpdmF0ZUtleVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBwdWJJZGVudGl0eS5lbmMucHVzaCh7XG4gICAgICAgIGFsZyxcbiAgICAgICAgZW5jLFxuICAgICAgICBqd2s6IHB1YmxpY0tleUp3ayxcbiAgICAgICAgaWQ6IHB1YmxpY1RodW1icHJpbnRcbiAgICAgIH0pXG5cbiAgICAgIHNhdmVJZGVudGl0eS5lbmMucHVzaCh7XG4gICAgICAgIGFsZyxcbiAgICAgICAgZW5jLFxuICAgICAgICBqd2s6IHB1YmxpY0tleUp3ayxcbiAgICAgICAgaWQ6IHB1YmxpY1RodW1icHJpbnQsXG4gICAgICAgIGVuY3J5cHRlZFByaXZhdGVLZXlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBzaWdBbGcgb2YgY29uZmlnLnNpZ25hdHVyZUFsZ0xpc3QpIHtcbiAgICAgIGNvbnN0IHBhaXIgPSBhd2FpdCBnZW5lcmF0ZUtleVBhaXIoc2lnQWxnLCB7IGV4dHJhY3RhYmxlOiB0cnVlIH0pXG5cbiAgICAgIGNvbnN0IHB1YmxpY0tleUp3ayA9IGF3YWl0IGV4cG9ydEpXSyhwYWlyLnB1YmxpY0tleSlcbiAgICAgIGNvbnN0IHB1YmxpY1RodW1icHJpbnQgPSBhd2FpdCBjYWxjdWxhdGVKd2tUaHVtYnByaW50KHB1YmxpY0tleUp3aywgJ3NoYTI1NicpXG4gICAgICBjb25zdCBlbmNyeXB0ZWRQcml2YXRlS2V5ID0gYXdhaXQgZW5jcnlwdFByaXZLZXkocGFpci5wcml2YXRlS2V5KVxuXG4gICAgICBmdWxsSWRlbnRpdHkuc2lnLnB1c2goe1xuICAgICAgICBhbGc6IHNpZ0FsZyxcbiAgICAgICAgandrOiBwdWJsaWNLZXlKd2ssXG4gICAgICAgIGlkOiBwdWJsaWNUaHVtYnByaW50LFxuICAgICAgICBfcHJpdjoge1xuICAgICAgICAgIHB1YmxpY0tleTogcGFpci5wdWJsaWNLZXksXG4gICAgICAgICAgcHJpdmF0ZUtleTogcGFpci5wcml2YXRlS2V5LFxuICAgICAgICAgIGVuY3J5cHRlZFByaXZhdGVLZXlcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgcHViSWRlbnRpdHkuc2lnLnB1c2goe1xuICAgICAgICBhbGc6IHNpZ0FsZyxcbiAgICAgICAgandrOiBwdWJsaWNLZXlKd2ssXG4gICAgICAgIGlkOiBwdWJsaWNUaHVtYnByaW50XG4gICAgICB9KVxuXG4gICAgICBzYXZlSWRlbnRpdHkuc2lnLnB1c2goe1xuICAgICAgICBhbGc6IHNpZ0FsZyxcbiAgICAgICAgandrOiBwdWJsaWNLZXlKd2ssXG4gICAgICAgIGlkOiBwdWJsaWNUaHVtYnByaW50LFxuICAgICAgICBlbmNyeXB0ZWRQcml2YXRlS2V5XG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIHRoZSBwYXlsb2FkIGZvciB0aGUgc2lnbmF0dXJlcyBpczpcbiAgICAvLyAtIDggYnl0ZXMgaTY0TEUgdXRjIG1zIGV4cGlyYXRpb25cbiAgICAvLyAtIFtlbmNbTl0uaWQsIC4uXVxuICAgIC8vIC0gW3NpZ1tOXS5pZCwgLi5dXG4gICAgY29uc3Qgc2lnQnl0ZXMgPSBbXVxuXG4gICAgY29uc3QgZXhwaXJlc0F0Qnl0ZXMgPSBuZXcgQXJyYXlCdWZmZXIoOClcbiAgICBjb25zdCBkdiA9IG5ldyBEYXRhVmlldyhleHBpcmVzQXRCeXRlcylcbiAgICBkdi5zZXRCaWdJbnQ2NCgwLCBCaWdJbnQoZnVsbElkZW50aXR5LmV4cGlyZXNBdFV0Y01pY3JvcyksIHRydWUpXG4gICAgc2lnQnl0ZXMucHVzaChuZXcgVWludDhBcnJheShleHBpcmVzQXRCeXRlcykpXG5cbiAgICBmb3IgKGNvbnN0IGVuYyBvZiBmdWxsSWRlbnRpdHkuZW5jKSB7XG4gICAgICBzaWdCeXRlcy5wdXNoKGJhc2U2NHVybC5kZWNvZGUoZW5jLmlkKSlcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHNpZyBvZiBmdWxsSWRlbnRpdHkuc2lnKSB7XG4gICAgICBzaWdCeXRlcy5wdXNoKGJhc2U2NHVybC5kZWNvZGUoc2lnLmlkKSlcbiAgICB9XG5cbiAgICBjb25zdCBzaWdCeXRlc0hhc2ggPSBhd2FpdCBfY29uY2F0SGFzaChzaWdCeXRlcylcblxuICAgIGNvbnN0IHNpZ24gPSBuZXcgR2VuZXJhbFNpZ24oc2lnQnl0ZXNIYXNoKVxuXG4gICAgZm9yIChjb25zdCBzaWcgb2YgZnVsbElkZW50aXR5LnNpZykge1xuICAgICAgc2lnblxuICAgICAgICAuYWRkU2lnbmF0dXJlKHNpZy5fcHJpdi5wcml2YXRlS2V5KVxuICAgICAgICAuc2V0UHJvdGVjdGVkSGVhZGVyKHsgYWxnOiBzaWcuYWxnIH0pXG4gICAgfVxuXG4gICAgZnVsbElkZW50aXR5Lmp3cyA9IGF3YWl0IHNpZ24uc2lnbigpXG4gICAgcHViSWRlbnRpdHkuandzID0gZnVsbElkZW50aXR5Lmp3c1xuICAgIHNhdmVJZGVudGl0eS5qd3MgPSBmdWxsSWRlbnRpdHkuandzXG5cbiAgICAvLyB1bmxpa2UgandrIHRodW1icHJpbnRzLCB0aGVyZSdzIG5vIHN0YW5kYXJkIGhlcmUuLi5cbiAgICAvLyB1c2luZyBhIHNoYS0yNTYgb2Y6IGBwYXlsb2FkICsgW3Byb3RlY3RlZCArIHNpZ25hdHVyZSwgLi5dYFxuICAgIGNvbnN0IGlkQnl0ZXMgPSBbXVxuICAgIGlkQnl0ZXMucHVzaChiYXNlNjR1cmwuZGVjb2RlKGZ1bGxJZGVudGl0eS5qd3MucGF5bG9hZCkpXG4gICAgZm9yIChjb25zdCBzaWcgb2YgZnVsbElkZW50aXR5Lmp3cy5zaWduYXR1cmVzKSB7XG4gICAgICBpZEJ5dGVzLnB1c2goYmFzZTY0dXJsLmRlY29kZShzaWcucHJvdGVjdGVkKSlcbiAgICAgIGlkQnl0ZXMucHVzaChiYXNlNjR1cmwuZGVjb2RlKHNpZy5zaWduYXR1cmUpKVxuICAgIH1cblxuICAgIGZ1bGxJZGVudGl0eS5pZCA9IGJhc2U2NHVybC5lbmNvZGUoYXdhaXQgX2NvbmNhdEhhc2goaWRCeXRlcykpXG4gICAgcHViSWRlbnRpdHkuaWQgPSBmdWxsSWRlbnRpdHkuaWRcbiAgICBzYXZlSWRlbnRpdHkuaWQgPSBmdWxsSWRlbnRpdHkuaWRcblxuICAgIGNvbnNvbGUubG9nKCdmdWxsJywgZnVsbElkZW50aXR5KVxuICAgIGNvbnNvbGUubG9nKCdwdWInLCBwdWJJZGVudGl0eSlcbiAgICBjb25zb2xlLmxvZygnc2F2ZScsIHNhdmVJZGVudGl0eSlcblxuICAgIGF3YWl0IGlkYkt2LnNldCgnYW5JZFB1YjonICsgcHViSWRlbnRpdHkuaWQsIHB1YklkZW50aXR5KVxuICAgIGF3YWl0IGlkYkt2LnNldCgnYW5JZFByaXY6JyArIHNhdmVJZGVudGl0eS5pZCwgc2F2ZUlkZW50aXR5KVxuICAgIGF3YWl0IGlkYkt2LnNldCgnYW5JZEFjdGl2ZTonLCBzYXZlSWRlbnRpdHkuaWQpXG5cbiAgICByZXR1cm4gbmV3IEFuSWRlbnRpdHkoZnVsbElkZW50aXR5LCBwdWJJZGVudGl0eSlcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIHBhc3NwaHJhc2VTZWNyZXRBbGc6IFwiJyArIGNvbmZpZy5wYXNzcGhyYXNlU2VjcmV0QWxnICsgJ1wiJylcbiAgfVxufVxuXG4vKipcbiAqIFByb3ZpZGVzIGFsbG5ldCBzeXN0ZW0gSldLIEpXUyBKV0UgSldUIGZ1bmN0aW9uYWxpdHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBBbklkZW50aXR5IHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpZGVudGl0eS4gVXNlIHRoZSBhc3luYyBjb25zdHJ1Y3RvciBjcmVhdGVBbklkZW50aXR5LlxuICAgKi9cbiAgY29uc3RydWN0b3IgKGZ1bGxJZGVudGl0eSwgcHViSWRlbnRpdHkpIHtcbiAgICB0aGlzLmZ1bGxJZGVudGl0eSA9IGZ1bGxJZGVudGl0eVxuICAgIHRoaXMucHViSWRlbnRpdHkgPSBwdWJJZGVudGl0eVxuICB9XG5cbiAgLyoqXG4gICAqIEFzeW5jIGNvbnN0cnVjdG9yIC0gQ3JlYXRlIGEgbmV3IGlkZW50aXR5LlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBnZXRQYXNzcGhyYXNlQ2Igc2hvdWxkIHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlc1xuICAgKiAgICAgICAgICAgICAgICAgICB0byBhIHBhc3NwaHJhc2UgYXMgYSBDcnlwdG9LZXlcbiAgICovXG4gIHN0YXRpYyBhc3luYyBjcmVhdGVBbklkZW50aXR5IChjb25maWcpIHtcbiAgICBjb25zdCBwYXNzcGhyYXNlS2V5ID0gYXdhaXQgY29uZmlnLnBhc3NwaHJhc2VHZXRDYigpXG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IF9sb2FkSWRlbnQocGFzc3BocmFzZUtleSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdmYWlsZCB0byBsb2FkIGlkZW50aXR5LCBnZW5lcmF0aW5nIG5ldy4uLicsIGUpXG4gICAgICByZXR1cm4gYXdhaXQgX2dlbklkZW50KGNvbmZpZywgcGFzc3BocmFzZUtleSlcbiAgICB9XG4gIH1cbn1cblxuLy8gLS0gaGVscGVycyAtLSAvL1xuXG5hc3luYyBmdW5jdGlvbiBfY29uY2F0SGFzaCAoYnVmcykge1xuICBsZXQgbGVuID0gMFxuICBmb3IgKGNvbnN0IGJ1ZiBvZiBidWZzKSB7XG4gICAgbGVuICs9IGJ1Zi5ieXRlTGVuZ3RoXG4gIH1cblxuICBjb25zdCBvdXQgPSBuZXcgVWludDhBcnJheShsZW4pXG4gIGxldCBvZmZzZXQgPSAwXG5cbiAgZm9yIChjb25zdCBidWYgb2YgYnVmcykge1xuICAgIG91dC5zZXQoYnVmLCBvZmZzZXQpXG4gICAgb2Zmc2V0ICs9IGJ1Zi5ieXRlTGVuZ3RoXG4gIH1cblxuICBjb25zdCBoYXNoID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5kaWdlc3QoJ1NIQS0yNTYnLCBvdXQpXG5cbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGhhc2gpXG59XG4iLCJpbXBvcnQgc2FmYXJpRml4IGZyb20gJ3NhZmFyaS0xNC1pZGItZml4JztcblxuZnVuY3Rpb24gcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSAtIGZpbGUgc2l6ZSBoYWNrc1xuICAgICAgICByZXF1ZXN0Lm9uY29tcGxldGUgPSByZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHJlc29sdmUocmVxdWVzdC5yZXN1bHQpO1xuICAgICAgICAvLyBAdHMtaWdub3JlIC0gZmlsZSBzaXplIGhhY2tzXG4gICAgICAgIHJlcXVlc3Qub25hYm9ydCA9IHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHJlamVjdChyZXF1ZXN0LmVycm9yKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVN0b3JlKGRiTmFtZSwgc3RvcmVOYW1lKSB7XG4gICAgY29uc3QgZGJwID0gc2FmYXJpRml4KCkudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIub3BlbihkYk5hbWUpO1xuICAgICAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9ICgpID0+IHJlcXVlc3QucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpO1xuICAgIH0pO1xuICAgIHJldHVybiAodHhNb2RlLCBjYWxsYmFjaykgPT4gZGJwLnRoZW4oKGRiKSA9PiBjYWxsYmFjayhkYi50cmFuc2FjdGlvbihzdG9yZU5hbWUsIHR4TW9kZSkub2JqZWN0U3RvcmUoc3RvcmVOYW1lKSkpO1xufVxubGV0IGRlZmF1bHRHZXRTdG9yZUZ1bmM7XG5mdW5jdGlvbiBkZWZhdWx0R2V0U3RvcmUoKSB7XG4gICAgaWYgKCFkZWZhdWx0R2V0U3RvcmVGdW5jKSB7XG4gICAgICAgIGRlZmF1bHRHZXRTdG9yZUZ1bmMgPSBjcmVhdGVTdG9yZSgna2V5dmFsLXN0b3JlJywgJ2tleXZhbCcpO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdEdldFN0b3JlRnVuYztcbn1cbi8qKlxuICogR2V0IGEgdmFsdWUgYnkgaXRzIGtleS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZ2V0KGtleSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0KGtleSkpKTtcbn1cbi8qKlxuICogU2V0IGEgdmFsdWUgd2l0aCBhIGtleS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIHN0b3JlLnB1dCh2YWx1ZSwga2V5KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgbXVsdGlwbGUgdmFsdWVzIGF0IG9uY2UuIFRoaXMgaXMgZmFzdGVyIHRoYW4gY2FsbGluZyBzZXQoKSBtdWx0aXBsZSB0aW1lcy5cbiAqIEl0J3MgYWxzbyBhdG9taWMg4oCTIGlmIG9uZSBvZiB0aGUgcGFpcnMgY2FuJ3QgYmUgYWRkZWQsIG5vbmUgd2lsbCBiZSBhZGRlZC5cbiAqXG4gKiBAcGFyYW0gZW50cmllcyBBcnJheSBvZiBlbnRyaWVzLCB3aGVyZSBlYWNoIGVudHJ5IGlzIGFuIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHNldE1hbnkoZW50cmllcywgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHN0b3JlLnB1dChlbnRyeVsxXSwgZW50cnlbMF0pKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgbXVsdGlwbGUgdmFsdWVzIGJ5IHRoZWlyIGtleXNcbiAqXG4gKiBAcGFyYW0ga2V5c1xuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGdldE1hbnkoa2V5cywgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IFByb21pc2UuYWxsKGtleXMubWFwKChrZXkpID0+IHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0KGtleSkpKSkpO1xufVxuLyoqXG4gKiBVcGRhdGUgYSB2YWx1ZS4gVGhpcyBsZXRzIHlvdSBzZWUgdGhlIG9sZCB2YWx1ZSBhbmQgdXBkYXRlIGl0IGFzIGFuIGF0b21pYyBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIHVwZGF0ZXIgQSBjYWxsYmFjayB0aGF0IHRha2VzIHRoZSBvbGQgdmFsdWUgYW5kIHJldHVybnMgYSBuZXcgdmFsdWUuXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlKGtleSwgdXBkYXRlciwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiBcbiAgICAvLyBOZWVkIHRvIGNyZWF0ZSB0aGUgcHJvbWlzZSBtYW51YWxseS5cbiAgICAvLyBJZiBJIHRyeSB0byBjaGFpbiBwcm9taXNlcywgdGhlIHRyYW5zYWN0aW9uIGNsb3NlcyBpbiBicm93c2Vyc1xuICAgIC8vIHRoYXQgdXNlIGEgcHJvbWlzZSBwb2x5ZmlsbCAoSUUxMC8xMSkuXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBzdG9yZS5nZXQoa2V5KS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHN0b3JlLnB1dCh1cGRhdGVyKHRoaXMucmVzdWx0KSwga2V5KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KSk7XG59XG4vKipcbiAqIERlbGV0ZSBhIHBhcnRpY3VsYXIga2V5IGZyb20gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBkZWwoa2V5LCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgc3RvcmUuZGVsZXRlKGtleSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogRGVsZXRlIG11bHRpcGxlIGtleXMgYXQgb25jZS5cbiAqXG4gKiBAcGFyYW0ga2V5cyBMaXN0IG9mIGtleXMgdG8gZGVsZXRlLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGRlbE1hbnkoa2V5cywgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiBzdG9yZS5kZWxldGUoa2V5KSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogQ2xlYXIgYWxsIHZhbHVlcyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGNsZWFyKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBzdG9yZS5jbGVhcigpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBlYWNoQ3Vyc29yKGN1c3RvbVN0b3JlLCBjYWxsYmFjaykge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gVGhpcyB3b3VsZCBiZSBzdG9yZS5nZXRBbGxLZXlzKCksIGJ1dCBpdCBpc24ndCBzdXBwb3J0ZWQgYnkgRWRnZSBvciBTYWZhcmkuXG4gICAgICAgIC8vIEFuZCBvcGVuS2V5Q3Vyc29yIGlzbid0IHN1cHBvcnRlZCBieSBTYWZhcmkuXG4gICAgICAgIHN0b3JlLm9wZW5DdXJzb3IoKS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucmVzdWx0KVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMucmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0LmNvbnRpbnVlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IGFsbCBrZXlzIGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24ga2V5cyhjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICByZXR1cm4gZWFjaEN1cnNvcihjdXN0b21TdG9yZSwgKGN1cnNvcikgPT4gaXRlbXMucHVzaChjdXJzb3Iua2V5KSkudGhlbigoKSA9PiBpdGVtcyk7XG59XG4vKipcbiAqIEdldCBhbGwgdmFsdWVzIGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gdmFsdWVzKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIHJldHVybiBlYWNoQ3Vyc29yKGN1c3RvbVN0b3JlLCAoY3Vyc29yKSA9PiBpdGVtcy5wdXNoKGN1cnNvci52YWx1ZSkpLnRoZW4oKCkgPT4gaXRlbXMpO1xufVxuLyoqXG4gKiBHZXQgYWxsIGVudHJpZXMgaW4gdGhlIHN0b3JlLiBFYWNoIGVudHJ5IGlzIGFuIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBlbnRyaWVzKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIHJldHVybiBlYWNoQ3Vyc29yKGN1c3RvbVN0b3JlLCAoY3Vyc29yKSA9PiBpdGVtcy5wdXNoKFtjdXJzb3Iua2V5LCBjdXJzb3IudmFsdWVdKSkudGhlbigoKSA9PiBpdGVtcyk7XG59XG5cbmV4cG9ydCB7IGNsZWFyLCBjcmVhdGVTdG9yZSwgZGVsLCBkZWxNYW55LCBlbnRyaWVzLCBnZXQsIGdldE1hbnksIGtleXMsIHByb21pc2lmeVJlcXVlc3QsIHNldCwgc2V0TWFueSwgdXBkYXRlLCB2YWx1ZXMgfTtcbiIsImltcG9ydCBkaWdlc3QgZnJvbSAnLi4vcnVudGltZS9kaWdlc3QuanMnO1xuaW1wb3J0IHsgZW5jb2RlIGFzIGJhc2U2NHVybCB9IGZyb20gJy4uL3J1bnRpbWUvYmFzZTY0dXJsLmpzJztcbmltcG9ydCB7IEpPU0VOb3RTdXBwb3J0ZWQsIEpXS0ludmFsaWQgfSBmcm9tICcuLi91dGlsL2Vycm9ycy5qcyc7XG5pbXBvcnQgeyBlbmNvZGVyIH0gZnJvbSAnLi4vbGliL2J1ZmZlcl91dGlscy5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi4vbGliL2lzX29iamVjdC5qcyc7XG5jb25zdCBjaGVjayA9ICh2YWx1ZSwgZGVzY3JpcHRpb24pID0+IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyB8fCAhdmFsdWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEpXS0ludmFsaWQoYCR7ZGVzY3JpcHRpb259IG1pc3Npbmcgb3IgaW52YWxpZGApO1xuICAgIH1cbn07XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2FsY3VsYXRlSndrVGh1bWJwcmludChqd2ssIGRpZ2VzdEFsZ29yaXRobSA9ICdzaGEyNTYnKSB7XG4gICAgaWYgKCFpc09iamVjdChqd2spKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0pXSyBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICAgIH1cbiAgICBsZXQgY29tcG9uZW50cztcbiAgICBzd2l0Y2ggKGp3ay5rdHkpIHtcbiAgICAgICAgY2FzZSAnRUMnOlxuICAgICAgICAgICAgY2hlY2soandrLmNydiwgJ1wiY3J2XCIgKEN1cnZlKSBQYXJhbWV0ZXInKTtcbiAgICAgICAgICAgIGNoZWNrKGp3ay54LCAnXCJ4XCIgKFggQ29vcmRpbmF0ZSkgUGFyYW1ldGVyJyk7XG4gICAgICAgICAgICBjaGVjayhqd2sueSwgJ1wieVwiIChZIENvb3JkaW5hdGUpIFBhcmFtZXRlcicpO1xuICAgICAgICAgICAgY29tcG9uZW50cyA9IHsgY3J2OiBqd2suY3J2LCBrdHk6IGp3ay5rdHksIHg6IGp3ay54LCB5OiBqd2sueSB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ09LUCc6XG4gICAgICAgICAgICBjaGVjayhqd2suY3J2LCAnXCJjcnZcIiAoU3VidHlwZSBvZiBLZXkgUGFpcikgUGFyYW1ldGVyJyk7XG4gICAgICAgICAgICBjaGVjayhqd2sueCwgJ1wieFwiIChQdWJsaWMgS2V5KSBQYXJhbWV0ZXInKTtcbiAgICAgICAgICAgIGNvbXBvbmVudHMgPSB7IGNydjogandrLmNydiwga3R5OiBqd2sua3R5LCB4OiBqd2sueCB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1JTQSc6XG4gICAgICAgICAgICBjaGVjayhqd2suZSwgJ1wiZVwiIChFeHBvbmVudCkgUGFyYW1ldGVyJyk7XG4gICAgICAgICAgICBjaGVjayhqd2subiwgJ1wiblwiIChNb2R1bHVzKSBQYXJhbWV0ZXInKTtcbiAgICAgICAgICAgIGNvbXBvbmVudHMgPSB7IGU6IGp3ay5lLCBrdHk6IGp3ay5rdHksIG46IGp3ay5uIH07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnb2N0JzpcbiAgICAgICAgICAgIGNoZWNrKGp3ay5rLCAnXCJrXCIgKEtleSBWYWx1ZSkgUGFyYW1ldGVyJyk7XG4gICAgICAgICAgICBjb21wb25lbnRzID0geyBrOiBqd2suaywga3R5OiBqd2sua3R5IH07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdcImt0eVwiIChLZXkgVHlwZSkgUGFyYW1ldGVyIG1pc3Npbmcgb3IgdW5zdXBwb3J0ZWQnKTtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IGVuY29kZXIuZW5jb2RlKEpTT04uc3RyaW5naWZ5KGNvbXBvbmVudHMpKTtcbiAgICByZXR1cm4gYmFzZTY0dXJsKGF3YWl0IGRpZ2VzdChkaWdlc3RBbGdvcml0aG0sIGRhdGEpKTtcbn1cbiIsImltcG9ydCB7IGVuY29kZSBhcyBiYXNlNjR1cmwgfSBmcm9tICcuLi8uLi9ydW50aW1lL2Jhc2U2NHVybC5qcyc7XG5pbXBvcnQgc2lnbiBmcm9tICcuLi8uLi9ydW50aW1lL3NpZ24uanMnO1xuaW1wb3J0IGlzRGlzam9pbnQgZnJvbSAnLi4vLi4vbGliL2lzX2Rpc2pvaW50LmpzJztcbmltcG9ydCB7IEpXU0ludmFsaWQgfSBmcm9tICcuLi8uLi91dGlsL2Vycm9ycy5qcyc7XG5pbXBvcnQgeyBlbmNvZGVyLCBkZWNvZGVyLCBjb25jYXQgfSBmcm9tICcuLi8uLi9saWIvYnVmZmVyX3V0aWxzLmpzJztcbmltcG9ydCBjaGVja0tleVR5cGUgZnJvbSAnLi4vLi4vbGliL2NoZWNrX2tleV90eXBlLmpzJztcbmltcG9ydCB2YWxpZGF0ZUNyaXQgZnJvbSAnLi4vLi4vbGliL3ZhbGlkYXRlX2NyaXQuanMnO1xuZXhwb3J0IGNsYXNzIEZsYXR0ZW5lZFNpZ24ge1xuICAgIGNvbnN0cnVjdG9yKHBheWxvYWQpIHtcbiAgICAgICAgaWYgKCEocGF5bG9hZCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXlsb2FkIG11c3QgYmUgYW4gaW5zdGFuY2Ugb2YgVWludDhBcnJheScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3BheWxvYWQgPSBwYXlsb2FkO1xuICAgIH1cbiAgICBzZXRQcm90ZWN0ZWRIZWFkZXIocHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgIGlmICh0aGlzLl9wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3NldFByb3RlY3RlZEhlYWRlciBjYW4gb25seSBiZSBjYWxsZWQgb25jZScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Byb3RlY3RlZEhlYWRlciA9IHByb3RlY3RlZEhlYWRlcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFVucHJvdGVjdGVkSGVhZGVyKHVucHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgIGlmICh0aGlzLl91bnByb3RlY3RlZEhlYWRlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc2V0VW5wcm90ZWN0ZWRIZWFkZXIgY2FuIG9ubHkgYmUgY2FsbGVkIG9uY2UnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91bnByb3RlY3RlZEhlYWRlciA9IHVucHJvdGVjdGVkSGVhZGVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYXN5bmMgc2lnbihrZXksIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wcm90ZWN0ZWRIZWFkZXIgJiYgIXRoaXMuX3VucHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnZWl0aGVyIHNldFByb3RlY3RlZEhlYWRlciBvciBzZXRVbnByb3RlY3RlZEhlYWRlciBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgI3NpZ24oKScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNEaXNqb2ludCh0aGlzLl9wcm90ZWN0ZWRIZWFkZXIsIHRoaXMuX3VucHJvdGVjdGVkSGVhZGVyKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEpXU0ludmFsaWQoJ0pXUyBQcm90ZWN0ZWQgYW5kIEpXUyBVbnByb3RlY3RlZCBIZWFkZXIgUGFyYW1ldGVyIG5hbWVzIG11c3QgYmUgZGlzam9pbnQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBqb3NlSGVhZGVyID0ge1xuICAgICAgICAgICAgLi4udGhpcy5fcHJvdGVjdGVkSGVhZGVyLFxuICAgICAgICAgICAgLi4udGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGV4dGVuc2lvbnMgPSB2YWxpZGF0ZUNyaXQoSldTSW52YWxpZCwgbmV3IE1hcChbWydiNjQnLCB0cnVlXV0pLCBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY3JpdCwgdGhpcy5fcHJvdGVjdGVkSGVhZGVyLCBqb3NlSGVhZGVyKTtcbiAgICAgICAgbGV0IGI2NCA9IHRydWU7XG4gICAgICAgIGlmIChleHRlbnNpb25zLmhhcygnYjY0JykpIHtcbiAgICAgICAgICAgIGI2NCA9IHRoaXMuX3Byb3RlY3RlZEhlYWRlci5iNjQ7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGI2NCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEpXU0ludmFsaWQoJ1RoZSBcImI2NFwiIChiYXNlNjR1cmwtZW5jb2RlIHBheWxvYWQpIEhlYWRlciBQYXJhbWV0ZXIgbXVzdCBiZSBhIGJvb2xlYW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IGFsZyB9ID0gam9zZUhlYWRlcjtcbiAgICAgICAgaWYgKHR5cGVvZiBhbGcgIT09ICdzdHJpbmcnIHx8ICFhbGcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdKV1MgXCJhbGdcIiAoQWxnb3JpdGhtKSBIZWFkZXIgUGFyYW1ldGVyIG1pc3Npbmcgb3IgaW52YWxpZCcpO1xuICAgICAgICB9XG4gICAgICAgIGNoZWNrS2V5VHlwZShhbGcsIGtleSwgJ3NpZ24nKTtcbiAgICAgICAgbGV0IHBheWxvYWQgPSB0aGlzLl9wYXlsb2FkO1xuICAgICAgICBpZiAoYjY0KSB7XG4gICAgICAgICAgICBwYXlsb2FkID0gZW5jb2Rlci5lbmNvZGUoYmFzZTY0dXJsKHBheWxvYWQpKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcHJvdGVjdGVkSGVhZGVyO1xuICAgICAgICBpZiAodGhpcy5fcHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgICAgICBwcm90ZWN0ZWRIZWFkZXIgPSBlbmNvZGVyLmVuY29kZShiYXNlNjR1cmwoSlNPTi5zdHJpbmdpZnkodGhpcy5fcHJvdGVjdGVkSGVhZGVyKSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcHJvdGVjdGVkSGVhZGVyID0gZW5jb2Rlci5lbmNvZGUoJycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRhdGEgPSBjb25jYXQocHJvdGVjdGVkSGVhZGVyLCBlbmNvZGVyLmVuY29kZSgnLicpLCBwYXlsb2FkKTtcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgc2lnbihhbGcsIGtleSwgZGF0YSk7XG4gICAgICAgIGNvbnN0IGp3cyA9IHtcbiAgICAgICAgICAgIHNpZ25hdHVyZTogYmFzZTY0dXJsKHNpZ25hdHVyZSksXG4gICAgICAgICAgICBwYXlsb2FkOiAnJyxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGI2NCkge1xuICAgICAgICAgICAgandzLnBheWxvYWQgPSBkZWNvZGVyLmRlY29kZShwYXlsb2FkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgICAgIGp3cy5oZWFkZXIgPSB0aGlzLl91bnByb3RlY3RlZEhlYWRlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgICAgICBqd3MucHJvdGVjdGVkID0gZGVjb2Rlci5kZWNvZGUocHJvdGVjdGVkSGVhZGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gandzO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEZsYXR0ZW5lZFNpZ24gfSBmcm9tICcuLi9mbGF0dGVuZWQvc2lnbi5qcyc7XG5pbXBvcnQgeyBKV1NJbnZhbGlkIH0gZnJvbSAnLi4vLi4vdXRpbC9lcnJvcnMuanMnO1xuY29uc3Qgc2lnbmF0dXJlUmVmID0gbmV3IFdlYWtNYXAoKTtcbmNsYXNzIEluZGl2aWR1YWxTaWduYXR1cmUge1xuICAgIHNldFByb3RlY3RlZEhlYWRlcihwcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Byb3RlY3RlZEhlYWRlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc2V0UHJvdGVjdGVkSGVhZGVyIGNhbiBvbmx5IGJlIGNhbGxlZCBvbmNlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcHJvdGVjdGVkSGVhZGVyID0gcHJvdGVjdGVkSGVhZGVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VW5wcm90ZWN0ZWRIZWFkZXIodW5wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX3VucHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzZXRVbnByb3RlY3RlZEhlYWRlciBjYW4gb25seSBiZSBjYWxsZWQgb25jZScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VucHJvdGVjdGVkSGVhZGVyID0gdW5wcm90ZWN0ZWRIZWFkZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXQgX3Byb3RlY3RlZEhlYWRlcih2YWx1ZSkge1xuICAgICAgICBzaWduYXR1cmVSZWYuZ2V0KHRoaXMpLnByb3RlY3RlZEhlYWRlciA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgX3Byb3RlY3RlZEhlYWRlcigpIHtcbiAgICAgICAgcmV0dXJuIHNpZ25hdHVyZVJlZi5nZXQodGhpcykucHJvdGVjdGVkSGVhZGVyO1xuICAgIH1cbiAgICBzZXQgX3VucHJvdGVjdGVkSGVhZGVyKHZhbHVlKSB7XG4gICAgICAgIHNpZ25hdHVyZVJlZi5nZXQodGhpcykudW5wcm90ZWN0ZWRIZWFkZXIgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IF91bnByb3RlY3RlZEhlYWRlcigpIHtcbiAgICAgICAgcmV0dXJuIHNpZ25hdHVyZVJlZi5nZXQodGhpcykudW5wcm90ZWN0ZWRIZWFkZXI7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEdlbmVyYWxTaWduIHtcbiAgICBjb25zdHJ1Y3RvcihwYXlsb2FkKSB7XG4gICAgICAgIHRoaXMuX3NpZ25hdHVyZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHBheWxvYWQ7XG4gICAgfVxuICAgIGFkZFNpZ25hdHVyZShrZXksIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlID0gbmV3IEluZGl2aWR1YWxTaWduYXR1cmUoKTtcbiAgICAgICAgc2lnbmF0dXJlUmVmLnNldChzaWduYXR1cmUsIHsga2V5LCBvcHRpb25zIH0pO1xuICAgICAgICB0aGlzLl9zaWduYXR1cmVzLnB1c2goc2lnbmF0dXJlKTtcbiAgICAgICAgcmV0dXJuIHNpZ25hdHVyZTtcbiAgICB9XG4gICAgYXN5bmMgc2lnbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zaWduYXR1cmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEpXU0ludmFsaWQoJ2F0IGxlYXN0IG9uZSBzaWduYXR1cmUgbXVzdCBiZSBhZGRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGp3cyA9IHtcbiAgICAgICAgICAgIHNpZ25hdHVyZXM6IFtdLFxuICAgICAgICAgICAgcGF5bG9hZDogJycsXG4gICAgICAgIH07XG4gICAgICAgIGxldCBwYXlsb2FkcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5fc2lnbmF0dXJlcy5tYXAoYXN5bmMgKHNpZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBwcm90ZWN0ZWRIZWFkZXIsIHVucHJvdGVjdGVkSGVhZGVyLCBvcHRpb25zLCBrZXkgfSA9IHNpZ25hdHVyZVJlZi5nZXQoc2lnKTtcbiAgICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lZCA9IG5ldyBGbGF0dGVuZWRTaWduKHRoaXMuX3BheWxvYWQpO1xuICAgICAgICAgICAgaWYgKHByb3RlY3RlZEhlYWRlcikge1xuICAgICAgICAgICAgICAgIGZsYXR0ZW5lZC5zZXRQcm90ZWN0ZWRIZWFkZXIocHJvdGVjdGVkSGVhZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh1bnByb3RlY3RlZEhlYWRlcikge1xuICAgICAgICAgICAgICAgIGZsYXR0ZW5lZC5zZXRVbnByb3RlY3RlZEhlYWRlcih1bnByb3RlY3RlZEhlYWRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB7IHBheWxvYWQsIC4uLnJlc3QgfSA9IGF3YWl0IGZsYXR0ZW5lZC5zaWduKGtleSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBwYXlsb2Fkcy5hZGQocGF5bG9hZCk7XG4gICAgICAgICAgICBqd3MucGF5bG9hZCA9IHBheWxvYWQ7XG4gICAgICAgICAgICBqd3Muc2lnbmF0dXJlcy5wdXNoKHJlc3QpO1xuICAgICAgICB9KSk7XG4gICAgICAgIGlmIChwYXlsb2Fkcy5zaXplICE9PSAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnaW5jb25zaXN0ZW50IHVzZSBvZiBKV1MgVW5lbmNvZGVkIFBheWxvYWQgT3B0aW9uIChSRkM3Nzk3KScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqd3M7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgdG9TUEtJIGFzIGV4cG9ydFB1YmxpYyB9IGZyb20gJy4uL3J1bnRpbWUvYXNuMS5qcyc7XG5pbXBvcnQgeyB0b1BLQ1M4IGFzIGV4cG9ydFByaXZhdGUgfSBmcm9tICcuLi9ydW50aW1lL2FzbjEuanMnO1xuaW1wb3J0IGtleVRvSldLIGZyb20gJy4uL3J1bnRpbWUva2V5X3RvX2p3ay5qcyc7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhwb3J0U1BLSShrZXkpIHtcbiAgICByZXR1cm4gZXhwb3J0UHVibGljKGtleSk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhwb3J0UEtDUzgoa2V5KSB7XG4gICAgcmV0dXJuIGV4cG9ydFByaXZhdGUoa2V5KTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleHBvcnRKV0soa2V5KSB7XG4gICAgcmV0dXJuIGtleVRvSldLKGtleSk7XG59XG4iLCJpbXBvcnQgeyBnZW5lcmF0ZUtleVBhaXIgYXMgZ2VuZXJhdGUgfSBmcm9tICcuLi9ydW50aW1lL2dlbmVyYXRlLmpzJztcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUtleVBhaXIoYWxnLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGdlbmVyYXRlKGFsZywgb3B0aW9ucyk7XG59XG4iLCJpbXBvcnQgeyBkZWNvZGUgYXMgZGVjb2RlQmFzZTY0VVJMLCBlbmNvZGVCYXNlNjQsIGRlY29kZUJhc2U2NCB9IGZyb20gJy4uL3J1bnRpbWUvYmFzZTY0dXJsLmpzJztcbmltcG9ydCB7IGZyb21TUEtJIGFzIGltcG9ydFB1YmxpYyB9IGZyb20gJy4uL3J1bnRpbWUvYXNuMS5qcyc7XG5pbXBvcnQgeyBmcm9tUEtDUzggYXMgaW1wb3J0UHJpdmF0ZSB9IGZyb20gJy4uL3J1bnRpbWUvYXNuMS5qcyc7XG5pbXBvcnQgYXNLZXlPYmplY3QgZnJvbSAnLi4vcnVudGltZS9qd2tfdG9fa2V5LmpzJztcbmltcG9ydCB7IEpPU0VOb3RTdXBwb3J0ZWQgfSBmcm9tICcuLi91dGlsL2Vycm9ycy5qcyc7XG5pbXBvcnQgZm9ybWF0UEVNIGZyb20gJy4uL2xpYi9mb3JtYXRfcGVtLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuLi9saWIvaXNfb2JqZWN0LmpzJztcbmZ1bmN0aW9uIGdldEVsZW1lbnQoc2VxKSB7XG4gICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgIGxldCBuZXh0ID0gMDtcbiAgICB3aGlsZSAobmV4dCA8IHNlcS5sZW5ndGgpIHtcbiAgICAgICAgbGV0IG5leHRQYXJ0ID0gcGFyc2VFbGVtZW50KHNlcS5zdWJhcnJheShuZXh0KSk7XG4gICAgICAgIHJlc3VsdC5wdXNoKG5leHRQYXJ0KTtcbiAgICAgICAgbmV4dCArPSBuZXh0UGFydC5ieXRlTGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gcGFyc2VFbGVtZW50KGJ5dGVzKSB7XG4gICAgbGV0IHBvc2l0aW9uID0gMDtcbiAgICBsZXQgdGFnID0gYnl0ZXNbMF0gJiAweDFmO1xuICAgIHBvc2l0aW9uKys7XG4gICAgaWYgKHRhZyA9PT0gMHgxZikge1xuICAgICAgICB0YWcgPSAwO1xuICAgICAgICB3aGlsZSAoYnl0ZXNbcG9zaXRpb25dID49IDB4ODApIHtcbiAgICAgICAgICAgIHRhZyA9IHRhZyAqIDEyOCArIGJ5dGVzW3Bvc2l0aW9uXSAtIDB4ODA7XG4gICAgICAgICAgICBwb3NpdGlvbisrO1xuICAgICAgICB9XG4gICAgICAgIHRhZyA9IHRhZyAqIDEyOCArIGJ5dGVzW3Bvc2l0aW9uXSAtIDB4ODA7XG4gICAgICAgIHBvc2l0aW9uKys7XG4gICAgfVxuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGlmIChieXRlc1twb3NpdGlvbl0gPCAweDgwKSB7XG4gICAgICAgIGxlbmd0aCA9IGJ5dGVzW3Bvc2l0aW9uXTtcbiAgICAgICAgcG9zaXRpb24rKztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxldCBudW1iZXJPZkRpZ2l0cyA9IGJ5dGVzW3Bvc2l0aW9uXSAmIDB4N2Y7XG4gICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgIGxlbmd0aCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZEaWdpdHM7IGkrKykge1xuICAgICAgICAgICAgbGVuZ3RoID0gbGVuZ3RoICogMjU2ICsgYnl0ZXNbcG9zaXRpb25dO1xuICAgICAgICAgICAgcG9zaXRpb24rKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobGVuZ3RoID09PSAweDgwKSB7XG4gICAgICAgIGxlbmd0aCA9IDA7XG4gICAgICAgIHdoaWxlIChieXRlc1twb3NpdGlvbiArIGxlbmd0aF0gIT09IDAgfHwgYnl0ZXNbcG9zaXRpb24gKyBsZW5ndGggKyAxXSAhPT0gMCkge1xuICAgICAgICAgICAgbGVuZ3RoKys7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYnl0ZUxlbmd0aCA9IHBvc2l0aW9uICsgbGVuZ3RoICsgMjtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJ5dGVMZW5ndGgsXG4gICAgICAgICAgICBjb250ZW50czogYnl0ZXMuc3ViYXJyYXkocG9zaXRpb24sIHBvc2l0aW9uICsgbGVuZ3RoKSxcbiAgICAgICAgICAgIHJhdzogYnl0ZXMuc3ViYXJyYXkoMCwgYnl0ZUxlbmd0aCksXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IGJ5dGVMZW5ndGggPSBwb3NpdGlvbiArIGxlbmd0aDtcbiAgICByZXR1cm4ge1xuICAgICAgICBieXRlTGVuZ3RoLFxuICAgICAgICBjb250ZW50czogYnl0ZXMuc3ViYXJyYXkocG9zaXRpb24sIGJ5dGVMZW5ndGgpLFxuICAgICAgICByYXc6IGJ5dGVzLnN1YmFycmF5KDAsIGJ5dGVMZW5ndGgpLFxuICAgIH07XG59XG5mdW5jdGlvbiBzcGtpRnJvbVg1MDkoYnVmKSB7XG4gICAgcmV0dXJuIGVuY29kZUJhc2U2NChnZXRFbGVtZW50KGdldEVsZW1lbnQocGFyc2VFbGVtZW50KGJ1ZikuY29udGVudHMpWzBdLmNvbnRlbnRzKVs2XS5yYXcpO1xufVxuZnVuY3Rpb24gZ2V0U1BLSSh4NTA5KSB7XG4gICAgY29uc3QgcGVtID0geDUwOS5yZXBsYWNlKC8oPzotLS0tLSg/OkJFR0lOfEVORCkgQ0VSVElGSUNBVEUtLS0tLXxcXHMpL2csICcnKTtcbiAgICBjb25zdCByYXcgPSBkZWNvZGVCYXNlNjQocGVtKTtcbiAgICByZXR1cm4gZm9ybWF0UEVNKHNwa2lGcm9tWDUwOShyYXcpLCAnUFVCTElDIEtFWScpO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFNQS0koc3BraSwgYWxnLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBzcGtpICE9PSAnc3RyaW5nJyB8fCBzcGtpLmluZGV4T2YoJy0tLS0tQkVHSU4gUFVCTElDIEtFWS0tLS0tJykgIT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzcGtpXCIgbXVzdCBiZSBTUEtJIGZvcm1hdHRlZCBzdHJpbmcnKTtcbiAgICB9XG4gICAgcmV0dXJuIGltcG9ydFB1YmxpYyhzcGtpLCBhbGcsIG9wdGlvbnMpO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFg1MDkoeDUwOSwgYWxnLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiB4NTA5ICE9PSAnc3RyaW5nJyB8fCB4NTA5LmluZGV4T2YoJy0tLS0tQkVHSU4gQ0VSVElGSUNBVEUtLS0tLScpICE9PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wieDUwOVwiIG11c3QgYmUgWC41MDkgZm9ybWF0dGVkIHN0cmluZycpO1xuICAgIH1cbiAgICBjb25zdCBzcGtpID0gZ2V0U1BLSSh4NTA5KTtcbiAgICByZXR1cm4gaW1wb3J0UHVibGljKHNwa2ksIGFsZywgb3B0aW9ucyk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW1wb3J0UEtDUzgocGtjczgsIGFsZywgb3B0aW9ucykge1xuICAgIGlmICh0eXBlb2YgcGtjczggIT09ICdzdHJpbmcnIHx8IHBrY3M4LmluZGV4T2YoJy0tLS0tQkVHSU4gUFJJVkFURSBLRVktLS0tLScpICE9PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wicGtjczhcIiBtdXN0IGJlIFBDS1M4IGZvcm1hdHRlZCBzdHJpbmcnKTtcbiAgICB9XG4gICAgcmV0dXJuIGltcG9ydFByaXZhdGUocGtjczgsIGFsZywgb3B0aW9ucyk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW1wb3J0SldLKGp3aywgYWxnLCBvY3RBc0tleU9iamVjdCkge1xuICAgIGlmICghaXNPYmplY3QoandrKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdKV0sgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgICB9XG4gICAgYWxnIHx8IChhbGcgPSBqd2suYWxnKTtcbiAgICBpZiAodHlwZW9mIGFsZyAhPT0gJ3N0cmluZycgfHwgIWFsZykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImFsZ1wiIGFyZ3VtZW50IGlzIHJlcXVpcmVkIHdoZW4gXCJqd2suYWxnXCIgaXMgbm90IHByZXNlbnQnKTtcbiAgICB9XG4gICAgc3dpdGNoIChqd2sua3R5KSB7XG4gICAgICAgIGNhc2UgJ29jdCc6XG4gICAgICAgICAgICBpZiAodHlwZW9mIGp3ay5rICE9PSAnc3RyaW5nJyB8fCAhandrLmspIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdtaXNzaW5nIFwia1wiIChLZXkgVmFsdWUpIFBhcmFtZXRlciB2YWx1ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2N0QXNLZXlPYmplY3QgIT09IG51bGwgJiYgb2N0QXNLZXlPYmplY3QgIT09IHZvaWQgMCA/IG9jdEFzS2V5T2JqZWN0IDogKG9jdEFzS2V5T2JqZWN0ID0gandrLmV4dCAhPT0gdHJ1ZSk7XG4gICAgICAgICAgICBpZiAob2N0QXNLZXlPYmplY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXNLZXlPYmplY3QoeyAuLi5qd2ssIGFsZywgZXh0OiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkZWNvZGVCYXNlNjRVUkwoandrLmspO1xuICAgICAgICBjYXNlICdSU0EnOlxuICAgICAgICAgICAgaWYgKGp3ay5vdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdSU0EgSldLIFwib3RoXCIgKE90aGVyIFByaW1lcyBJbmZvKSBQYXJhbWV0ZXIgdmFsdWUgaXMgbm90IHN1cHBvcnRlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICBjYXNlICdFQyc6XG4gICAgICAgIGNhc2UgJ09LUCc6XG4gICAgICAgICAgICByZXR1cm4gYXNLZXlPYmplY3QoeyAuLi5qd2ssIGFsZyB9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdVbnN1cHBvcnRlZCBcImt0eVwiIChLZXkgVHlwZSkgUGFyYW1ldGVyIHZhbHVlJyk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IGVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKTtcbmV4cG9ydCBjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7XG5jb25zdCBNQVhfSU5UMzIgPSAyICoqIDMyO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdCguLi5idWZmZXJzKSB7XG4gICAgY29uc3Qgc2l6ZSA9IGJ1ZmZlcnMucmVkdWNlKChhY2MsIHsgbGVuZ3RoIH0pID0+IGFjYyArIGxlbmd0aCwgMCk7XG4gICAgY29uc3QgYnVmID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XG4gICAgbGV0IGkgPSAwO1xuICAgIGJ1ZmZlcnMuZm9yRWFjaCgoYnVmZmVyKSA9PiB7XG4gICAgICAgIGJ1Zi5zZXQoYnVmZmVyLCBpKTtcbiAgICAgICAgaSArPSBidWZmZXIubGVuZ3RoO1xuICAgIH0pO1xuICAgIHJldHVybiBidWY7XG59XG5leHBvcnQgZnVuY3Rpb24gcDJzKGFsZywgcDJzSW5wdXQpIHtcbiAgICByZXR1cm4gY29uY2F0KGVuY29kZXIuZW5jb2RlKGFsZyksIG5ldyBVaW50OEFycmF5KFswXSksIHAyc0lucHV0KTtcbn1cbmZ1bmN0aW9uIHdyaXRlVUludDMyQkUoYnVmLCB2YWx1ZSwgb2Zmc2V0KSB7XG4gICAgaWYgKHZhbHVlIDwgMCB8fCB2YWx1ZSA+PSBNQVhfSU5UMzIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYHZhbHVlIG11c3QgYmUgPj0gMCBhbmQgPD0gJHtNQVhfSU5UMzIgLSAxfS4gUmVjZWl2ZWQgJHt2YWx1ZX1gKTtcbiAgICB9XG4gICAgYnVmLnNldChbdmFsdWUgPj4+IDI0LCB2YWx1ZSA+Pj4gMTYsIHZhbHVlID4+PiA4LCB2YWx1ZSAmIDB4ZmZdLCBvZmZzZXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHVpbnQ2NGJlKHZhbHVlKSB7XG4gICAgY29uc3QgaGlnaCA9IE1hdGguZmxvb3IodmFsdWUgLyBNQVhfSU5UMzIpO1xuICAgIGNvbnN0IGxvdyA9IHZhbHVlICUgTUFYX0lOVDMyO1xuICAgIGNvbnN0IGJ1ZiA9IG5ldyBVaW50OEFycmF5KDgpO1xuICAgIHdyaXRlVUludDMyQkUoYnVmLCBoaWdoLCAwKTtcbiAgICB3cml0ZVVJbnQzMkJFKGJ1ZiwgbG93LCA0KTtcbiAgICByZXR1cm4gYnVmO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHVpbnQzMmJlKHZhbHVlKSB7XG4gICAgY29uc3QgYnVmID0gbmV3IFVpbnQ4QXJyYXkoNCk7XG4gICAgd3JpdGVVSW50MzJCRShidWYsIHZhbHVlKTtcbiAgICByZXR1cm4gYnVmO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGxlbmd0aEFuZElucHV0KGlucHV0KSB7XG4gICAgcmV0dXJuIGNvbmNhdCh1aW50MzJiZShpbnB1dC5sZW5ndGgpLCBpbnB1dCk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29uY2F0S2RmKGRpZ2VzdCwgc2VjcmV0LCBiaXRzLCB2YWx1ZSkge1xuICAgIGNvbnN0IGl0ZXJhdGlvbnMgPSBNYXRoLmNlaWwoKGJpdHMgPj4gMykgLyAzMik7XG4gICAgbGV0IHJlcztcbiAgICBmb3IgKGxldCBpdGVyID0gMTsgaXRlciA8PSBpdGVyYXRpb25zOyBpdGVyKyspIHtcbiAgICAgICAgY29uc3QgYnVmID0gbmV3IFVpbnQ4QXJyYXkoNCArIHNlY3JldC5sZW5ndGggKyB2YWx1ZS5sZW5ndGgpO1xuICAgICAgICBidWYuc2V0KHVpbnQzMmJlKGl0ZXIpKTtcbiAgICAgICAgYnVmLnNldChzZWNyZXQsIDQpO1xuICAgICAgICBidWYuc2V0KHZhbHVlLCA0ICsgc2VjcmV0Lmxlbmd0aCk7XG4gICAgICAgIGlmICghcmVzKSB7XG4gICAgICAgICAgICByZXMgPSBhd2FpdCBkaWdlc3QoJ3NoYTI1NicsIGJ1Zik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXMgPSBjb25jYXQocmVzLCBhd2FpdCBkaWdlc3QoJ3NoYTI1NicsIGJ1ZikpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlcyA9IHJlcy5zbGljZSgwLCBiaXRzID4+IDMpO1xuICAgIHJldHVybiByZXM7XG59XG4iLCJpbXBvcnQgaW52YWxpZEtleUlucHV0IGZyb20gJy4vaW52YWxpZF9rZXlfaW5wdXQuanMnO1xuaW1wb3J0IGlzS2V5TGlrZSwgeyB0eXBlcyB9IGZyb20gJy4uL3J1bnRpbWUvaXNfa2V5X2xpa2UuanMnO1xuY29uc3Qgc3ltbWV0cmljVHlwZUNoZWNrID0gKGtleSkgPT4ge1xuICAgIGlmIChrZXkgaW5zdGFuY2VvZiBVaW50OEFycmF5KVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKCFpc0tleUxpa2Uoa2V5KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGludmFsaWRLZXlJbnB1dChrZXksIC4uLnR5cGVzLCAnVWludDhBcnJheScpKTtcbiAgICB9XG4gICAgaWYgKGtleS50eXBlICE9PSAnc2VjcmV0Jykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke3R5cGVzLmpvaW4oJyBvciAnKX0gaW5zdGFuY2VzIGZvciBzeW1tZXRyaWMgYWxnb3JpdGhtcyBtdXN0IGJlIG9mIHR5cGUgXCJzZWNyZXRcImApO1xuICAgIH1cbn07XG5jb25zdCBhc3ltbWV0cmljVHlwZUNoZWNrID0gKGtleSwgdXNhZ2UpID0+IHtcbiAgICBpZiAoIWlzS2V5TGlrZShrZXkpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoaW52YWxpZEtleUlucHV0KGtleSwgLi4udHlwZXMpKTtcbiAgICB9XG4gICAgaWYgKGtleS50eXBlID09PSAnc2VjcmV0Jykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke3R5cGVzLmpvaW4oJyBvciAnKX0gaW5zdGFuY2VzIGZvciBhc3ltbWV0cmljIGFsZ29yaXRobXMgbXVzdCBub3QgYmUgb2YgdHlwZSBcInNlY3JldFwiYCk7XG4gICAgfVxuICAgIGlmICh1c2FnZSA9PT0gJ3NpZ24nICYmIGtleS50eXBlID09PSAncHVibGljJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke3R5cGVzLmpvaW4oJyBvciAnKX0gaW5zdGFuY2VzIGZvciBhc3ltbWV0cmljIGFsZ29yaXRobSBzaWduaW5nIG11c3QgYmUgb2YgdHlwZSBcInByaXZhdGVcImApO1xuICAgIH1cbiAgICBpZiAodXNhZ2UgPT09ICdkZWNyeXB0JyAmJiBrZXkudHlwZSA9PT0gJ3B1YmxpYycpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0eXBlcy5qb2luKCcgb3IgJyl9IGluc3RhbmNlcyBmb3IgYXN5bW1ldHJpYyBhbGdvcml0aG0gZGVjcnlwdGlvbiBtdXN0IGJlIG9mIHR5cGUgXCJwcml2YXRlXCJgKTtcbiAgICB9XG4gICAgaWYgKGtleS5hbGdvcml0aG0gJiYgdXNhZ2UgPT09ICd2ZXJpZnknICYmIGtleS50eXBlID09PSAncHJpdmF0ZScpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0eXBlcy5qb2luKCcgb3IgJyl9IGluc3RhbmNlcyBmb3IgYXN5bW1ldHJpYyBhbGdvcml0aG0gdmVyaWZ5aW5nIG11c3QgYmUgb2YgdHlwZSBcInB1YmxpY1wiYCk7XG4gICAgfVxuICAgIGlmIChrZXkuYWxnb3JpdGhtICYmIHVzYWdlID09PSAnZW5jcnlwdCcgJiYga2V5LnR5cGUgPT09ICdwcml2YXRlJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke3R5cGVzLmpvaW4oJyBvciAnKX0gaW5zdGFuY2VzIGZvciBhc3ltbWV0cmljIGFsZ29yaXRobSBlbmNyeXB0aW9uIG11c3QgYmUgb2YgdHlwZSBcInB1YmxpY1wiYCk7XG4gICAgfVxufTtcbmNvbnN0IGNoZWNrS2V5VHlwZSA9IChhbGcsIGtleSwgdXNhZ2UpID0+IHtcbiAgICBjb25zdCBzeW1tZXRyaWMgPSBhbGcuc3RhcnRzV2l0aCgnSFMnKSB8fFxuICAgICAgICBhbGcgPT09ICdkaXInIHx8XG4gICAgICAgIGFsZy5zdGFydHNXaXRoKCdQQkVTMicpIHx8XG4gICAgICAgIC9eQVxcZHszfSg/OkdDTSk/S1ckLy50ZXN0KGFsZyk7XG4gICAgaWYgKHN5bW1ldHJpYykge1xuICAgICAgICBzeW1tZXRyaWNUeXBlQ2hlY2soa2V5KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGFzeW1tZXRyaWNUeXBlQ2hlY2soa2V5LCB1c2FnZSk7XG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGNoZWNrS2V5VHlwZTtcbiIsImltcG9ydCB7IGlzQ2xvdWRmbGFyZVdvcmtlcnMsIGlzTm9kZUpzIH0gZnJvbSAnLi4vcnVudGltZS9nbG9iYWwuanMnO1xuZnVuY3Rpb24gdW51c2FibGUobmFtZSwgcHJvcCA9ICdhbGdvcml0aG0ubmFtZScpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihgQ3J5cHRvS2V5IGRvZXMgbm90IHN1cHBvcnQgdGhpcyBvcGVyYXRpb24sIGl0cyAke3Byb3B9IG11c3QgYmUgJHtuYW1lfWApO1xufVxuZnVuY3Rpb24gaXNBbGdvcml0aG0oYWxnb3JpdGhtLCBuYW1lKSB7XG4gICAgcmV0dXJuIGFsZ29yaXRobS5uYW1lID09PSBuYW1lO1xufVxuZnVuY3Rpb24gZ2V0SGFzaExlbmd0aChoYXNoKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGhhc2gubmFtZS5zdWJzdHIoNCksIDEwKTtcbn1cbmZ1bmN0aW9uIGdldE5hbWVkQ3VydmUoYWxnKSB7XG4gICAgc3dpdGNoIChhbGcpIHtcbiAgICAgICAgY2FzZSAnRVMyNTYnOlxuICAgICAgICAgICAgcmV0dXJuICdQLTI1Nic7XG4gICAgICAgIGNhc2UgJ0VTMzg0JzpcbiAgICAgICAgICAgIHJldHVybiAnUC0zODQnO1xuICAgICAgICBjYXNlICdFUzUxMic6XG4gICAgICAgICAgICByZXR1cm4gJ1AtNTIxJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWFjaGFibGUnKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjaGVja1VzYWdlKGtleSwgdXNhZ2VzKSB7XG4gICAgaWYgKHVzYWdlcy5sZW5ndGggJiYgIXVzYWdlcy5zb21lKChleHBlY3RlZCkgPT4ga2V5LnVzYWdlcy5pbmNsdWRlcyhleHBlY3RlZCkpKSB7XG4gICAgICAgIGxldCBtc2cgPSAnQ3J5cHRvS2V5IGRvZXMgbm90IHN1cHBvcnQgdGhpcyBvcGVyYXRpb24sIGl0cyB1c2FnZXMgbXVzdCBpbmNsdWRlICc7XG4gICAgICAgIGlmICh1c2FnZXMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgY29uc3QgbGFzdCA9IHVzYWdlcy5wb3AoKTtcbiAgICAgICAgICAgIG1zZyArPSBgb25lIG9mICR7dXNhZ2VzLmpvaW4oJywgJyl9LCBvciAke2xhc3R9LmA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodXNhZ2VzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgbXNnICs9IGBvbmUgb2YgJHt1c2FnZXNbMF19IG9yICR7dXNhZ2VzWzFdfS5gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbXNnICs9IGAke3VzYWdlc1swXX0uYDtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKG1zZyk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrU2lnQ3J5cHRvS2V5KGtleSwgYWxnLCAuLi51c2FnZXMpIHtcbiAgICBzd2l0Y2ggKGFsZykge1xuICAgICAgICBjYXNlICdIUzI1Nic6XG4gICAgICAgIGNhc2UgJ0hTMzg0JzpcbiAgICAgICAgY2FzZSAnSFM1MTInOiB7XG4gICAgICAgICAgICBpZiAoIWlzQWxnb3JpdGhtKGtleS5hbGdvcml0aG0sICdITUFDJykpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoJ0hNQUMnKTtcbiAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkID0gcGFyc2VJbnQoYWxnLnN1YnN0cigyKSwgMTApO1xuICAgICAgICAgICAgY29uc3QgYWN0dWFsID0gZ2V0SGFzaExlbmd0aChrZXkuYWxnb3JpdGhtLmhhc2gpO1xuICAgICAgICAgICAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoYFNIQS0ke2V4cGVjdGVkfWAsICdhbGdvcml0aG0uaGFzaCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnUlMyNTYnOlxuICAgICAgICBjYXNlICdSUzM4NCc6XG4gICAgICAgIGNhc2UgJ1JTNTEyJzoge1xuICAgICAgICAgICAgaWYgKCFpc0FsZ29yaXRobShrZXkuYWxnb3JpdGhtLCAnUlNBU1NBLVBLQ1MxLXYxXzUnKSlcbiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZSgnUlNBU1NBLVBLQ1MxLXYxXzUnKTtcbiAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkID0gcGFyc2VJbnQoYWxnLnN1YnN0cigyKSwgMTApO1xuICAgICAgICAgICAgY29uc3QgYWN0dWFsID0gZ2V0SGFzaExlbmd0aChrZXkuYWxnb3JpdGhtLmhhc2gpO1xuICAgICAgICAgICAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoYFNIQS0ke2V4cGVjdGVkfWAsICdhbGdvcml0aG0uaGFzaCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnUFMyNTYnOlxuICAgICAgICBjYXNlICdQUzM4NCc6XG4gICAgICAgIGNhc2UgJ1BTNTEyJzoge1xuICAgICAgICAgICAgaWYgKCFpc0FsZ29yaXRobShrZXkuYWxnb3JpdGhtLCAnUlNBLVBTUycpKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKCdSU0EtUFNTJyk7XG4gICAgICAgICAgICBjb25zdCBleHBlY3RlZCA9IHBhcnNlSW50KGFsZy5zdWJzdHIoMiksIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbCA9IGdldEhhc2hMZW5ndGgoa2V5LmFsZ29yaXRobS5oYXNoKTtcbiAgICAgICAgICAgIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKGBTSEEtJHtleHBlY3RlZH1gLCAnYWxnb3JpdGhtLmhhc2gnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgaXNOb2RlSnMoKSAmJiAnRWREU0EnOiB7XG4gICAgICAgICAgICBpZiAoa2V5LmFsZ29yaXRobS5uYW1lICE9PSAnTk9ERS1FRDI1NTE5JyAmJiBrZXkuYWxnb3JpdGhtLm5hbWUgIT09ICdOT0RFLUVENDQ4JylcbiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZSgnTk9ERS1FRDI1NTE5IG9yIE5PREUtRUQ0NDgnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgaXNDbG91ZGZsYXJlV29ya2VycygpICYmICdFZERTQSc6IHtcbiAgICAgICAgICAgIGlmICghaXNBbGdvcml0aG0oa2V5LmFsZ29yaXRobSwgJ05PREUtRUQyNTUxOScpKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKCdOT0RFLUVEMjU1MTknKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ0VTMjU2JzpcbiAgICAgICAgY2FzZSAnRVMzODQnOlxuICAgICAgICBjYXNlICdFUzUxMic6IHtcbiAgICAgICAgICAgIGlmICghaXNBbGdvcml0aG0oa2V5LmFsZ29yaXRobSwgJ0VDRFNBJykpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoJ0VDRFNBJyk7XG4gICAgICAgICAgICBjb25zdCBleHBlY3RlZCA9IGdldE5hbWVkQ3VydmUoYWxnKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbCA9IGtleS5hbGdvcml0aG0ubmFtZWRDdXJ2ZTtcbiAgICAgICAgICAgIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKGV4cGVjdGVkLCAnYWxnb3JpdGhtLm5hbWVkQ3VydmUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDcnlwdG9LZXkgZG9lcyBub3Qgc3VwcG9ydCB0aGlzIG9wZXJhdGlvbicpO1xuICAgIH1cbiAgICBjaGVja1VzYWdlKGtleSwgdXNhZ2VzKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0VuY0NyeXB0b0tleShrZXksIGFsZywgLi4udXNhZ2VzKSB7XG4gICAgc3dpdGNoIChhbGcpIHtcbiAgICAgICAgY2FzZSAnQTEyOEdDTSc6XG4gICAgICAgIGNhc2UgJ0ExOTJHQ00nOlxuICAgICAgICBjYXNlICdBMjU2R0NNJzoge1xuICAgICAgICAgICAgaWYgKCFpc0FsZ29yaXRobShrZXkuYWxnb3JpdGhtLCAnQUVTLUdDTScpKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKCdBRVMtR0NNJyk7XG4gICAgICAgICAgICBjb25zdCBleHBlY3RlZCA9IHBhcnNlSW50KGFsZy5zdWJzdHIoMSwgMyksIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbCA9IGtleS5hbGdvcml0aG0ubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoZXhwZWN0ZWQsICdhbGdvcml0aG0ubGVuZ3RoJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdBMTI4S1cnOlxuICAgICAgICBjYXNlICdBMTkyS1cnOlxuICAgICAgICBjYXNlICdBMjU2S1cnOiB7XG4gICAgICAgICAgICBpZiAoIWlzQWxnb3JpdGhtKGtleS5hbGdvcml0aG0sICdBRVMtS1cnKSlcbiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZSgnQUVTLUtXJyk7XG4gICAgICAgICAgICBjb25zdCBleHBlY3RlZCA9IHBhcnNlSW50KGFsZy5zdWJzdHIoMSwgMyksIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbCA9IGtleS5hbGdvcml0aG0ubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoZXhwZWN0ZWQsICdhbGdvcml0aG0ubGVuZ3RoJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdFQ0RILUVTJzpcbiAgICAgICAgICAgIGlmICghaXNBbGdvcml0aG0oa2V5LmFsZ29yaXRobSwgJ0VDREgnKSlcbiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZSgnRUNESCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1BCRVMyLUhTMjU2K0ExMjhLVyc6XG4gICAgICAgIGNhc2UgJ1BCRVMyLUhTMzg0K0ExOTJLVyc6XG4gICAgICAgIGNhc2UgJ1BCRVMyLUhTNTEyK0EyNTZLVyc6XG4gICAgICAgICAgICBpZiAoIWlzQWxnb3JpdGhtKGtleS5hbGdvcml0aG0sICdQQktERjInKSlcbiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZSgnUEJLREYyJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAnOlxuICAgICAgICBjYXNlICdSU0EtT0FFUC0yNTYnOlxuICAgICAgICBjYXNlICdSU0EtT0FFUC0zODQnOlxuICAgICAgICBjYXNlICdSU0EtT0FFUC01MTInOiB7XG4gICAgICAgICAgICBpZiAoIWlzQWxnb3JpdGhtKGtleS5hbGdvcml0aG0sICdSU0EtT0FFUCcpKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKCdSU0EtT0FFUCcpO1xuICAgICAgICAgICAgY29uc3QgZXhwZWN0ZWQgPSBwYXJzZUludChhbGcuc3Vic3RyKDkpLCAxMCkgfHwgMTtcbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbCA9IGdldEhhc2hMZW5ndGgoa2V5LmFsZ29yaXRobS5oYXNoKTtcbiAgICAgICAgICAgIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKGBTSEEtJHtleHBlY3RlZH1gLCAnYWxnb3JpdGhtLmhhc2gnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDcnlwdG9LZXkgZG9lcyBub3Qgc3VwcG9ydCB0aGlzIG9wZXJhdGlvbicpO1xuICAgIH1cbiAgICBjaGVja1VzYWdlKGtleSwgdXNhZ2VzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IChiNjQsIGRlc2NyaXB0b3IpID0+IHtcbiAgICBjb25zdCBuZXdsaW5lZCA9IChiNjQubWF0Y2goLy57MSw2NH0vZykgfHwgW10pLmpvaW4oJ1xcbicpO1xuICAgIHJldHVybiBgLS0tLS1CRUdJTiAke2Rlc2NyaXB0b3J9LS0tLS1cXG4ke25ld2xpbmVkfVxcbi0tLS0tRU5EICR7ZGVzY3JpcHRvcn0tLS0tLWA7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgKGFjdHVhbCwgLi4udHlwZXMpID0+IHtcbiAgICBsZXQgbXNnID0gJ0tleSBtdXN0IGJlICc7XG4gICAgaWYgKHR5cGVzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgY29uc3QgbGFzdCA9IHR5cGVzLnBvcCgpO1xuICAgICAgICBtc2cgKz0gYG9uZSBvZiB0eXBlICR7dHlwZXMuam9pbignLCAnKX0sIG9yICR7bGFzdH0uYDtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZXMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIG1zZyArPSBgb25lIG9mIHR5cGUgJHt0eXBlc1swXX0gb3IgJHt0eXBlc1sxXX0uYDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG1zZyArPSBgb2YgdHlwZSAke3R5cGVzWzBdfS5gO1xuICAgIH1cbiAgICBpZiAoYWN0dWFsID09IG51bGwpIHtcbiAgICAgICAgbXNnICs9IGAgUmVjZWl2ZWQgJHthY3R1YWx9YDtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGFjdHVhbCA9PT0gJ2Z1bmN0aW9uJyAmJiBhY3R1YWwubmFtZSkge1xuICAgICAgICBtc2cgKz0gYCBSZWNlaXZlZCBmdW5jdGlvbiAke2FjdHVhbC5uYW1lfWA7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBhY3R1YWwgPT09ICdvYmplY3QnICYmIGFjdHVhbCAhPSBudWxsKSB7XG4gICAgICAgIGlmIChhY3R1YWwuY29uc3RydWN0b3IgJiYgYWN0dWFsLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgICAgICAgIG1zZyArPSBgIFJlY2VpdmVkIGFuIGluc3RhbmNlIG9mICR7YWN0dWFsLmNvbnN0cnVjdG9yLm5hbWV9YDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbXNnO1xufTtcbiIsImNvbnN0IGlzRGlzam9pbnQgPSAoLi4uaGVhZGVycykgPT4ge1xuICAgIGNvbnN0IHNvdXJjZXMgPSBoZWFkZXJzLmZpbHRlcihCb29sZWFuKTtcbiAgICBpZiAoc291cmNlcy5sZW5ndGggPT09IDAgfHwgc291cmNlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGxldCBhY2M7XG4gICAgZm9yIChjb25zdCBoZWFkZXIgb2Ygc291cmNlcykge1xuICAgICAgICBjb25zdCBwYXJhbWV0ZXJzID0gT2JqZWN0LmtleXMoaGVhZGVyKTtcbiAgICAgICAgaWYgKCFhY2MgfHwgYWNjLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIGFjYyA9IG5ldyBTZXQocGFyYW1ldGVycyk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHBhcmFtZXRlciBvZiBwYXJhbWV0ZXJzKSB7XG4gICAgICAgICAgICBpZiAoYWNjLmhhcyhwYXJhbWV0ZXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWNjLmFkZChwYXJhbWV0ZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufTtcbmV4cG9ydCBkZWZhdWx0IGlzRGlzam9pbnQ7XG4iLCJmdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbDtcbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzT2JqZWN0KGlucHV0KSB7XG4gICAgaWYgKCFpc09iamVjdExpa2UoaW5wdXQpIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZihpbnB1dCkgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGxldCBwcm90byA9IGlucHV0O1xuICAgIHdoaWxlIChPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pICE9PSBudWxsKSB7XG4gICAgICAgIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKTtcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZihpbnB1dCkgPT09IHByb3RvO1xufVxuIiwiaW1wb3J0IHsgSk9TRU5vdFN1cHBvcnRlZCB9IGZyb20gJy4uL3V0aWwvZXJyb3JzLmpzJztcbmZ1bmN0aW9uIHZhbGlkYXRlQ3JpdChFcnIsIHJlY29nbml6ZWREZWZhdWx0LCByZWNvZ25pemVkT3B0aW9uLCBwcm90ZWN0ZWRIZWFkZXIsIGpvc2VIZWFkZXIpIHtcbiAgICBpZiAoam9zZUhlYWRlci5jcml0ICE9PSB1bmRlZmluZWQgJiYgcHJvdGVjdGVkSGVhZGVyLmNyaXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyKCdcImNyaXRcIiAoQ3JpdGljYWwpIEhlYWRlciBQYXJhbWV0ZXIgTVVTVCBiZSBpbnRlZ3JpdHkgcHJvdGVjdGVkJyk7XG4gICAgfVxuICAgIGlmICghcHJvdGVjdGVkSGVhZGVyIHx8IHByb3RlY3RlZEhlYWRlci5jcml0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZXQoKTtcbiAgICB9XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3RlY3RlZEhlYWRlci5jcml0KSB8fFxuICAgICAgICBwcm90ZWN0ZWRIZWFkZXIuY3JpdC5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgcHJvdGVjdGVkSGVhZGVyLmNyaXQuc29tZSgoaW5wdXQpID0+IHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycgfHwgaW5wdXQubGVuZ3RoID09PSAwKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyKCdcImNyaXRcIiAoQ3JpdGljYWwpIEhlYWRlciBQYXJhbWV0ZXIgTVVTVCBiZSBhbiBhcnJheSBvZiBub24tZW1wdHkgc3RyaW5ncyB3aGVuIHByZXNlbnQnKTtcbiAgICB9XG4gICAgbGV0IHJlY29nbml6ZWQ7XG4gICAgaWYgKHJlY29nbml6ZWRPcHRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZWNvZ25pemVkID0gbmV3IE1hcChbLi4uT2JqZWN0LmVudHJpZXMocmVjb2duaXplZE9wdGlvbiksIC4uLnJlY29nbml6ZWREZWZhdWx0LmVudHJpZXMoKV0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVjb2duaXplZCA9IHJlY29nbml6ZWREZWZhdWx0O1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHBhcmFtZXRlciBvZiBwcm90ZWN0ZWRIZWFkZXIuY3JpdCkge1xuICAgICAgICBpZiAoIXJlY29nbml6ZWQuaGFzKHBhcmFtZXRlcikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKGBFeHRlbnNpb24gSGVhZGVyIFBhcmFtZXRlciBcIiR7cGFyYW1ldGVyfVwiIGlzIG5vdCByZWNvZ25pemVkYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGpvc2VIZWFkZXJbcGFyYW1ldGVyXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyKGBFeHRlbnNpb24gSGVhZGVyIFBhcmFtZXRlciBcIiR7cGFyYW1ldGVyfVwiIGlzIG1pc3NpbmdgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZWNvZ25pemVkLmdldChwYXJhbWV0ZXIpICYmIHByb3RlY3RlZEhlYWRlcltwYXJhbWV0ZXJdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnIoYEV4dGVuc2lvbiBIZWFkZXIgUGFyYW1ldGVyIFwiJHtwYXJhbWV0ZXJ9XCIgTVVTVCBiZSBpbnRlZ3JpdHkgcHJvdGVjdGVkYCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBTZXQocHJvdGVjdGVkSGVhZGVyLmNyaXQpO1xufVxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGVDcml0O1xuIiwiaW1wb3J0IGdsb2JhbFRoaXMsIHsgaXNDbG91ZGZsYXJlV29ya2VycywgaXNOb2RlSnMgfSBmcm9tICcuL2dsb2JhbC5qcyc7XG5pbXBvcnQgY3J5cHRvLCB7IGlzQ3J5cHRvS2V5IH0gZnJvbSAnLi93ZWJjcnlwdG8uanMnO1xuaW1wb3J0IGludmFsaWRLZXlJbnB1dCBmcm9tICcuLi9saWIvaW52YWxpZF9rZXlfaW5wdXQuanMnO1xuaW1wb3J0IHsgZW5jb2RlQmFzZTY0IH0gZnJvbSAnLi9iYXNlNjR1cmwuanMnO1xuaW1wb3J0IGZvcm1hdFBFTSBmcm9tICcuLi9saWIvZm9ybWF0X3BlbS5qcyc7XG5pbXBvcnQgeyBKT1NFTm90U3VwcG9ydGVkIH0gZnJvbSAnLi4vdXRpbC9lcnJvcnMuanMnO1xuY29uc3QgZ2VuZXJpY0V4cG9ydCA9IGFzeW5jIChrZXlUeXBlLCBrZXlGb3JtYXQsIGtleSkgPT4ge1xuICAgIGlmICghaXNDcnlwdG9LZXkoa2V5KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGludmFsaWRLZXlJbnB1dChrZXksICdDcnlwdG9LZXknKSk7XG4gICAgfVxuICAgIGlmICgha2V5LmV4dHJhY3RhYmxlKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NyeXB0b0tleSBpcyBub3QgZXh0cmFjdGFibGUnKTtcbiAgICB9XG4gICAgaWYgKGtleS50eXBlICE9PSBrZXlUeXBlKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGtleSBpcyBub3QgYSAke2tleVR5cGV9IGtleWApO1xuICAgIH1cbiAgICByZXR1cm4gZm9ybWF0UEVNKGVuY29kZUJhc2U2NChuZXcgVWludDhBcnJheShhd2FpdCBjcnlwdG8uc3VidGxlLmV4cG9ydEtleShrZXlGb3JtYXQsIGtleSkpKSwgYCR7a2V5VHlwZS50b1VwcGVyQ2FzZSgpfSBLRVlgKTtcbn07XG5leHBvcnQgY29uc3QgdG9TUEtJID0gKGtleSkgPT4ge1xuICAgIHJldHVybiBnZW5lcmljRXhwb3J0KCdwdWJsaWMnLCAnc3BraScsIGtleSk7XG59O1xuZXhwb3J0IGNvbnN0IHRvUEtDUzggPSAoa2V5KSA9PiB7XG4gICAgcmV0dXJuIGdlbmVyaWNFeHBvcnQoJ3ByaXZhdGUnLCAncGtjczgnLCBrZXkpO1xufTtcbmNvbnN0IGdldE5hbWVkQ3VydmUgPSAoa2V5RGF0YSkgPT4ge1xuICAgIGNvbnN0IGtleURhdGFTdHIgPSBrZXlEYXRhLnRvU3RyaW5nKCk7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgIGNhc2Uga2V5RGF0YVN0ci5pbmNsdWRlcyhuZXcgVWludDhBcnJheShbXG4gICAgICAgICAgICAweDA2LCAweDA3LCAweDJhLCAweDg2LCAweDQ4LCAweGNlLCAweDNkLCAweDAyLCAweDAxLCAweDA2LCAweDA4LCAweDJhLCAweDg2LCAweDQ4LCAweGNlLFxuICAgICAgICAgICAgMHgzZCwgMHgwMywgMHgwMSwgMHgwNyxcbiAgICAgICAgXSkudG9TdHJpbmcoKSk6XG4gICAgICAgICAgICByZXR1cm4gJ1AtMjU2JztcbiAgICAgICAgY2FzZSBrZXlEYXRhU3RyLmluY2x1ZGVzKG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgICAgIDB4MDYsIDB4MDcsIDB4MmEsIDB4ODYsIDB4NDgsIDB4Y2UsIDB4M2QsIDB4MDIsIDB4MDEsIDB4MDYsIDB4MDUsIDB4MmIsIDB4ODEsIDB4MDQsIDB4MDAsXG4gICAgICAgICAgICAweDIyLFxuICAgICAgICBdKS50b1N0cmluZygpKTpcbiAgICAgICAgICAgIHJldHVybiAnUC0zODQnO1xuICAgICAgICBjYXNlIGtleURhdGFTdHIuaW5jbHVkZXMobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgMHgwNiwgMHgwNywgMHgyYSwgMHg4NiwgMHg0OCwgMHhjZSwgMHgzZCwgMHgwMiwgMHgwMSwgMHgwNiwgMHgwNSwgMHgyYiwgMHg4MSwgMHgwNCwgMHgwMCxcbiAgICAgICAgICAgIDB4MjMsXG4gICAgICAgIF0pLnRvU3RyaW5nKCkpOlxuICAgICAgICAgICAgcmV0dXJuICdQLTUyMSc7XG4gICAgICAgIGNhc2UgKGlzQ2xvdWRmbGFyZVdvcmtlcnMoKSB8fCBpc05vZGVKcygpKSAmJlxuICAgICAgICAgICAga2V5RGF0YVN0ci5pbmNsdWRlcyhuZXcgVWludDhBcnJheShbMHgwNiwgMHgwMywgMHgyYiwgMHg2NSwgMHg3MF0pLnRvU3RyaW5nKCkpOlxuICAgICAgICAgICAgcmV0dXJuICdFZDI1NTE5JztcbiAgICAgICAgY2FzZSBpc05vZGVKcygpICYmXG4gICAgICAgICAgICBrZXlEYXRhU3RyLmluY2x1ZGVzKG5ldyBVaW50OEFycmF5KFsweDA2LCAweDAzLCAweDJiLCAweDY1LCAweDcxXSkudG9TdHJpbmcoKSk6XG4gICAgICAgICAgICByZXR1cm4gJ0VkNDQ4JztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdJbnZhbGlkIG9yIHVuc3VwcG9ydGVkIEVDIEtleSBDdXJ2ZSBvciBPS1AgS2V5IFN1YiBUeXBlJyk7XG4gICAgfVxufTtcbmNvbnN0IGdlbmVyaWNJbXBvcnQgPSBhc3luYyAocmVwbGFjZSwga2V5Rm9ybWF0LCBwZW0sIGFsZywgb3B0aW9ucykgPT4ge1xuICAgIHZhciBfYTtcbiAgICBsZXQgYWxnb3JpdGhtO1xuICAgIGxldCBrZXlVc2FnZXM7XG4gICAgY29uc3Qga2V5RGF0YSA9IG5ldyBVaW50OEFycmF5KGdsb2JhbFRoaXNcbiAgICAgICAgLmF0b2IocGVtLnJlcGxhY2UocmVwbGFjZSwgJycpKVxuICAgICAgICAuc3BsaXQoJycpXG4gICAgICAgIC5tYXAoKGMpID0+IGMuY2hhckNvZGVBdCgwKSkpO1xuICAgIGNvbnN0IGlzUHVibGljID0ga2V5Rm9ybWF0ID09PSAnc3BraSc7XG4gICAgc3dpdGNoIChhbGcpIHtcbiAgICAgICAgY2FzZSAnUFMyNTYnOlxuICAgICAgICBjYXNlICdQUzM4NCc6XG4gICAgICAgIGNhc2UgJ1BTNTEyJzpcbiAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogJ1JTQS1QU1MnLCBoYXNoOiBgU0hBLSR7YWxnLnN1YnN0cigtMyl9YCB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gaXNQdWJsaWMgPyBbJ3ZlcmlmeSddIDogWydzaWduJ107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnUlMyNTYnOlxuICAgICAgICBjYXNlICdSUzM4NCc6XG4gICAgICAgIGNhc2UgJ1JTNTEyJzpcbiAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogJ1JTQVNTQS1QS0NTMS12MV81JywgaGFzaDogYFNIQS0ke2FsZy5zdWJzdHIoLTMpfWAgfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IGlzUHVibGljID8gWyd2ZXJpZnknXSA6IFsnc2lnbiddO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQJzpcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAtMjU2JzpcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAtMzg0JzpcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAtNTEyJzpcbiAgICAgICAgICAgIGFsZ29yaXRobSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnUlNBLU9BRVAnLFxuICAgICAgICAgICAgICAgIGhhc2g6IGBTSEEtJHtwYXJzZUludChhbGcuc3Vic3RyKC0zKSwgMTApIHx8IDF9YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBpc1B1YmxpYyA/IFsnZW5jcnlwdCcsICd3cmFwS2V5J10gOiBbJ2RlY3J5cHQnLCAndW53cmFwS2V5J107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRVMyNTYnOlxuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiAnUC0yNTYnIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBpc1B1YmxpYyA/IFsndmVyaWZ5J10gOiBbJ3NpZ24nXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFUzM4NCc6XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdFQ0RTQScsIG5hbWVkQ3VydmU6ICdQLTM4NCcgfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IGlzUHVibGljID8gWyd2ZXJpZnknXSA6IFsnc2lnbiddO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0VTNTEyJzpcbiAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogJ0VDRFNBJywgbmFtZWRDdXJ2ZTogJ1AtNTIxJyB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gaXNQdWJsaWMgPyBbJ3ZlcmlmeSddIDogWydzaWduJ107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRUNESC1FUyc6XG4gICAgICAgIGNhc2UgJ0VDREgtRVMrQTEyOEtXJzpcbiAgICAgICAgY2FzZSAnRUNESC1FUytBMTkyS1cnOlxuICAgICAgICBjYXNlICdFQ0RILUVTK0EyNTZLVyc6XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdFQ0RIJywgbmFtZWRDdXJ2ZTogZ2V0TmFtZWRDdXJ2ZShrZXlEYXRhKSB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gaXNQdWJsaWMgPyBbXSA6IFsnZGVyaXZlQml0cyddO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgKGlzQ2xvdWRmbGFyZVdvcmtlcnMoKSB8fCBpc05vZGVKcygpKSAmJiAnRWREU0EnOlxuICAgICAgICAgICAgY29uc3QgbmFtZWRDdXJ2ZSA9IGdldE5hbWVkQ3VydmUoa2V5RGF0YSkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogYE5PREUtJHtuYW1lZEN1cnZlfWAsIG5hbWVkQ3VydmU6IGBOT0RFLSR7bmFtZWRDdXJ2ZX1gIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBpc1B1YmxpYyA/IFsndmVyaWZ5J10gOiBbJ3NpZ24nXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEpPU0VOb3RTdXBwb3J0ZWQoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgXCJhbGdcIiAoQWxnb3JpdGhtKSB2YWx1ZScpO1xuICAgIH1cbiAgICByZXR1cm4gY3J5cHRvLnN1YnRsZS5pbXBvcnRLZXkoa2V5Rm9ybWF0LCBrZXlEYXRhLCBhbGdvcml0aG0sIChfYSA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5leHRyYWN0YWJsZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZmFsc2UsIGtleVVzYWdlcyk7XG59O1xuZXhwb3J0IGNvbnN0IGZyb21QS0NTOCA9IChwZW0sIGFsZywgb3B0aW9ucykgPT4ge1xuICAgIHJldHVybiBnZW5lcmljSW1wb3J0KC8oPzotLS0tLSg/OkJFR0lOfEVORCkgUFJJVkFURSBLRVktLS0tLXxcXHMpL2csICdwa2NzOCcsIHBlbSwgYWxnLCBvcHRpb25zKTtcbn07XG5leHBvcnQgY29uc3QgZnJvbVNQS0kgPSAocGVtLCBhbGcsIG9wdGlvbnMpID0+IHtcbiAgICByZXR1cm4gZ2VuZXJpY0ltcG9ydCgvKD86LS0tLS0oPzpCRUdJTnxFTkQpIFBVQkxJQyBLRVktLS0tLXxcXHMpL2csICdzcGtpJywgcGVtLCBhbGcsIG9wdGlvbnMpO1xufTtcbiIsImltcG9ydCB7IGVuY29kZXIsIGRlY29kZXIgfSBmcm9tICcuLi9saWIvYnVmZmVyX3V0aWxzLmpzJztcbmltcG9ydCBnbG9iYWxUaGlzIGZyb20gJy4vZ2xvYmFsLmpzJztcbmV4cG9ydCBjb25zdCBlbmNvZGVCYXNlNjQgPSAoaW5wdXQpID0+IHtcbiAgICBsZXQgdW5lbmNvZGVkID0gaW5wdXQ7XG4gICAgaWYgKHR5cGVvZiB1bmVuY29kZWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHVuZW5jb2RlZCA9IGVuY29kZXIuZW5jb2RlKHVuZW5jb2RlZCk7XG4gICAgfVxuICAgIGNvbnN0IENIVU5LX1NJWkUgPSAweDgwMDA7XG4gICAgY29uc3QgYXJyID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1bmVuY29kZWQubGVuZ3RoOyBpICs9IENIVU5LX1NJWkUpIHtcbiAgICAgICAgYXJyLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCB1bmVuY29kZWQuc3ViYXJyYXkoaSwgaSArIENIVU5LX1NJWkUpKSk7XG4gICAgfVxuICAgIHJldHVybiBnbG9iYWxUaGlzLmJ0b2EoYXJyLmpvaW4oJycpKTtcbn07XG5leHBvcnQgY29uc3QgZW5jb2RlID0gKGlucHV0KSA9PiB7XG4gICAgcmV0dXJuIGVuY29kZUJhc2U2NChpbnB1dCkucmVwbGFjZSgvPS9nLCAnJykucmVwbGFjZSgvXFwrL2csICctJykucmVwbGFjZSgvXFwvL2csICdfJyk7XG59O1xuZXhwb3J0IGNvbnN0IGRlY29kZUJhc2U2NCA9IChlbmNvZGVkKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGdsb2JhbFRoaXNcbiAgICAgICAgLmF0b2IoZW5jb2RlZClcbiAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAubWFwKChjKSA9PiBjLmNoYXJDb2RlQXQoMCkpKTtcbn07XG5leHBvcnQgY29uc3QgZGVjb2RlID0gKGlucHV0KSA9PiB7XG4gICAgbGV0IGVuY29kZWQgPSBpbnB1dDtcbiAgICBpZiAoZW5jb2RlZCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgZW5jb2RlZCA9IGRlY29kZXIuZGVjb2RlKGVuY29kZWQpO1xuICAgIH1cbiAgICBlbmNvZGVkID0gZW5jb2RlZC5yZXBsYWNlKC8tL2csICcrJykucmVwbGFjZSgvXy9nLCAnLycpLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZUJhc2U2NChlbmNvZGVkKTtcbiAgICB9XG4gICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBpbnB1dCB0byBiZSBkZWNvZGVkIGlzIG5vdCBjb3JyZWN0bHkgZW5jb2RlZC4nKTtcbiAgICB9XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgKGFsZywga2V5KSA9PiB7XG4gICAgaWYgKGFsZy5zdGFydHNXaXRoKCdIUycpKSB7XG4gICAgICAgIGNvbnN0IGJpdGxlbiA9IHBhcnNlSW50KGFsZy5zdWJzdHIoLTMpLCAxMCk7XG4gICAgICAgIGNvbnN0IHsgbGVuZ3RoIH0gPSBrZXkuYWxnb3JpdGhtO1xuICAgICAgICBpZiAodHlwZW9mIGxlbmd0aCAhPT0gJ251bWJlcicgfHwgbGVuZ3RoIDwgYml0bGVuKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2FsZ30gcmVxdWlyZXMgc3ltbWV0cmljIGtleXMgdG8gYmUgJHtiaXRsZW59IGJpdHMgb3IgbGFyZ2VyYCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGFsZy5zdGFydHNXaXRoKCdSUycpIHx8IGFsZy5zdGFydHNXaXRoKCdQUycpKSB7XG4gICAgICAgIGNvbnN0IHsgbW9kdWx1c0xlbmd0aCB9ID0ga2V5LmFsZ29yaXRobTtcbiAgICAgICAgaWYgKHR5cGVvZiBtb2R1bHVzTGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBtb2R1bHVzTGVuZ3RoIDwgMjA0OCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHthbGd9IHJlcXVpcmVzIGtleSBtb2R1bHVzTGVuZ3RoIHRvIGJlIDIwNDggYml0cyBvciBsYXJnZXJgKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJpbXBvcnQgY3J5cHRvIGZyb20gJy4vd2ViY3J5cHRvLmpzJztcbmNvbnN0IGRpZ2VzdCA9IGFzeW5jIChhbGdvcml0aG0sIGRhdGEpID0+IHtcbiAgICBjb25zdCBzdWJ0bGVEaWdlc3QgPSBgU0hBLSR7YWxnb3JpdGhtLnN1YnN0cigtMyl9YDtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYXdhaXQgY3J5cHRvLnN1YnRsZS5kaWdlc3Qoc3VidGxlRGlnZXN0LCBkYXRhKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZGlnZXN0O1xuIiwiaW1wb3J0IHsgaXNDbG91ZGZsYXJlV29ya2VycywgaXNOb2RlSnMgfSBmcm9tICcuL2dsb2JhbC5qcyc7XG5pbXBvcnQgY3J5cHRvIGZyb20gJy4vd2ViY3J5cHRvLmpzJztcbmltcG9ydCB7IEpPU0VOb3RTdXBwb3J0ZWQgfSBmcm9tICcuLi91dGlsL2Vycm9ycy5qcyc7XG5pbXBvcnQgcmFuZG9tIGZyb20gJy4vcmFuZG9tLmpzJztcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZW5lcmF0ZVNlY3JldChhbGcsIG9wdGlvbnMpIHtcbiAgICB2YXIgX2E7XG4gICAgbGV0IGxlbmd0aDtcbiAgICBsZXQgYWxnb3JpdGhtO1xuICAgIGxldCBrZXlVc2FnZXM7XG4gICAgc3dpdGNoIChhbGcpIHtcbiAgICAgICAgY2FzZSAnSFMyNTYnOlxuICAgICAgICBjYXNlICdIUzM4NCc6XG4gICAgICAgIGNhc2UgJ0hTNTEyJzpcbiAgICAgICAgICAgIGxlbmd0aCA9IHBhcnNlSW50KGFsZy5zdWJzdHIoLTMpLCAxMCk7XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdITUFDJywgaGFzaDogYFNIQS0ke2xlbmd0aH1gLCBsZW5ndGggfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IFsnc2lnbicsICd2ZXJpZnknXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBMTI4Q0JDLUhTMjU2JzpcbiAgICAgICAgY2FzZSAnQTE5MkNCQy1IUzM4NCc6XG4gICAgICAgIGNhc2UgJ0EyNTZDQkMtSFM1MTInOlxuICAgICAgICAgICAgbGVuZ3RoID0gcGFyc2VJbnQoYWxnLnN1YnN0cigtMyksIDEwKTtcbiAgICAgICAgICAgIHJldHVybiByYW5kb20obmV3IFVpbnQ4QXJyYXkobGVuZ3RoID4+IDMpKTtcbiAgICAgICAgY2FzZSAnQTEyOEtXJzpcbiAgICAgICAgY2FzZSAnQTE5MktXJzpcbiAgICAgICAgY2FzZSAnQTI1NktXJzpcbiAgICAgICAgICAgIGxlbmd0aCA9IHBhcnNlSW50KGFsZy5zdWJzdHJpbmcoMSwgNCksIDEwKTtcbiAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogJ0FFUy1LVycsIGxlbmd0aCB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gWyd3cmFwS2V5JywgJ3Vud3JhcEtleSddO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0ExMjhHQ01LVyc6XG4gICAgICAgIGNhc2UgJ0ExOTJHQ01LVyc6XG4gICAgICAgIGNhc2UgJ0EyNTZHQ01LVyc6XG4gICAgICAgIGNhc2UgJ0ExMjhHQ00nOlxuICAgICAgICBjYXNlICdBMTkyR0NNJzpcbiAgICAgICAgY2FzZSAnQTI1NkdDTSc6XG4gICAgICAgICAgICBsZW5ndGggPSBwYXJzZUludChhbGcuc3Vic3RyaW5nKDEsIDQpLCAxMCk7XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdBRVMtR0NNJywgbGVuZ3RoIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ2VuY3J5cHQnLCAnZGVjcnlwdCddO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZCgnSW52YWxpZCBvciB1bnN1cHBvcnRlZCBKV0sgXCJhbGdcIiAoQWxnb3JpdGhtKSBQYXJhbWV0ZXIgdmFsdWUnKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyeXB0by5zdWJ0bGUuZ2VuZXJhdGVLZXkoYWxnb3JpdGhtLCAoX2EgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZXh0cmFjdGFibGUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGZhbHNlLCBrZXlVc2FnZXMpO1xufVxuZnVuY3Rpb24gZ2V0TW9kdWx1c0xlbmd0aE9wdGlvbihvcHRpb25zKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IG1vZHVsdXNMZW5ndGggPSAoX2EgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMubW9kdWx1c0xlbmd0aCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogMjA0ODtcbiAgICBpZiAodHlwZW9mIG1vZHVsdXNMZW5ndGggIT09ICdudW1iZXInIHx8IG1vZHVsdXNMZW5ndGggPCAyMDQ4KSB7XG4gICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdJbnZhbGlkIG9yIHVuc3VwcG9ydGVkIG1vZHVsdXNMZW5ndGggb3B0aW9uIHByb3ZpZGVkLCAyMDQ4IGJpdHMgb3IgbGFyZ2VyIGtleXMgbXVzdCBiZSB1c2VkJyk7XG4gICAgfVxuICAgIHJldHVybiBtb2R1bHVzTGVuZ3RoO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlS2V5UGFpcihhbGcsIG9wdGlvbnMpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGxldCBhbGdvcml0aG07XG4gICAgbGV0IGtleVVzYWdlcztcbiAgICBzd2l0Y2ggKGFsZykge1xuICAgICAgICBjYXNlICdQUzI1Nic6XG4gICAgICAgIGNhc2UgJ1BTMzg0JzpcbiAgICAgICAgY2FzZSAnUFM1MTInOlxuICAgICAgICAgICAgYWxnb3JpdGhtID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdSU0EtUFNTJyxcbiAgICAgICAgICAgICAgICBoYXNoOiBgU0hBLSR7YWxnLnN1YnN0cigtMyl9YCxcbiAgICAgICAgICAgICAgICBwdWJsaWNFeHBvbmVudDogbmV3IFVpbnQ4QXJyYXkoWzB4MDEsIDB4MDAsIDB4MDFdKSxcbiAgICAgICAgICAgICAgICBtb2R1bHVzTGVuZ3RoOiBnZXRNb2R1bHVzTGVuZ3RoT3B0aW9uKG9wdGlvbnMpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IFsnc2lnbicsICd2ZXJpZnknXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdSUzI1Nic6XG4gICAgICAgIGNhc2UgJ1JTMzg0JzpcbiAgICAgICAgY2FzZSAnUlM1MTInOlxuICAgICAgICAgICAgYWxnb3JpdGhtID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdSU0FTU0EtUEtDUzEtdjFfNScsXG4gICAgICAgICAgICAgICAgaGFzaDogYFNIQS0ke2FsZy5zdWJzdHIoLTMpfWAsXG4gICAgICAgICAgICAgICAgcHVibGljRXhwb25lbnQ6IG5ldyBVaW50OEFycmF5KFsweDAxLCAweDAwLCAweDAxXSksXG4gICAgICAgICAgICAgICAgbW9kdWx1c0xlbmd0aDogZ2V0TW9kdWx1c0xlbmd0aE9wdGlvbihvcHRpb25zKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ3NpZ24nLCAndmVyaWZ5J107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAnOlxuICAgICAgICBjYXNlICdSU0EtT0FFUC0yNTYnOlxuICAgICAgICBjYXNlICdSU0EtT0FFUC0zODQnOlxuICAgICAgICBjYXNlICdSU0EtT0FFUC01MTInOlxuICAgICAgICAgICAgYWxnb3JpdGhtID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdSU0EtT0FFUCcsXG4gICAgICAgICAgICAgICAgaGFzaDogYFNIQS0ke3BhcnNlSW50KGFsZy5zdWJzdHIoLTMpLCAxMCkgfHwgMX1gLFxuICAgICAgICAgICAgICAgIHB1YmxpY0V4cG9uZW50OiBuZXcgVWludDhBcnJheShbMHgwMSwgMHgwMCwgMHgwMV0pLFxuICAgICAgICAgICAgICAgIG1vZHVsdXNMZW5ndGg6IGdldE1vZHVsdXNMZW5ndGhPcHRpb24ob3B0aW9ucyksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gWydkZWNyeXB0JywgJ3Vud3JhcEtleScsICdlbmNyeXB0JywgJ3dyYXBLZXknXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFUzI1Nic6XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdFQ0RTQScsIG5hbWVkQ3VydmU6ICdQLTI1NicgfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IFsnc2lnbicsICd2ZXJpZnknXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFUzM4NCc6XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdFQ0RTQScsIG5hbWVkQ3VydmU6ICdQLTM4NCcgfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IFsnc2lnbicsICd2ZXJpZnknXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFUzUxMic6XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdFQ0RTQScsIG5hbWVkQ3VydmU6ICdQLTUyMScgfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IFsnc2lnbicsICd2ZXJpZnknXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChpc0Nsb3VkZmxhcmVXb3JrZXJzKCkgfHwgaXNOb2RlSnMoKSkgJiYgJ0VkRFNBJzpcbiAgICAgICAgICAgIHN3aXRjaCAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNydikge1xuICAgICAgICAgICAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0VkMjU1MTknOlxuICAgICAgICAgICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdOT0RFLUVEMjU1MTknLCBuYW1lZEN1cnZlOiAnTk9ERS1FRDI1NTE5JyB9O1xuICAgICAgICAgICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ3NpZ24nLCAndmVyaWZ5J107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgaXNOb2RlSnMoKSAmJiAnRWQ0NDgnOlxuICAgICAgICAgICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdOT0RFLUVENDQ4JywgbmFtZWRDdXJ2ZTogJ05PREUtRUQ0NDgnIH07XG4gICAgICAgICAgICAgICAgICAgIGtleVVzYWdlcyA9IFsnc2lnbicsICd2ZXJpZnknXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEpPU0VOb3RTdXBwb3J0ZWQoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgY3J2IG9wdGlvbiBwcm92aWRlZCwgc3VwcG9ydGVkIHZhbHVlcyBhcmUgRWQyNTUxOSBhbmQgRWQ0NDgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFQ0RILUVTJzpcbiAgICAgICAgY2FzZSAnRUNESC1FUytBMTI4S1cnOlxuICAgICAgICBjYXNlICdFQ0RILUVTK0ExOTJLVyc6XG4gICAgICAgIGNhc2UgJ0VDREgtRVMrQTI1NktXJzpcbiAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogJ0VDREgnLCBuYW1lZEN1cnZlOiAoX2EgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY3J2KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnUC0yNTYnIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ2Rlcml2ZUtleScsICdkZXJpdmVCaXRzJ107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdJbnZhbGlkIG9yIHVuc3VwcG9ydGVkIEpXSyBcImFsZ1wiIChBbGdvcml0aG0pIFBhcmFtZXRlciB2YWx1ZScpO1xuICAgIH1cbiAgICByZXR1cm4gKGNyeXB0by5zdWJ0bGUuZ2VuZXJhdGVLZXkoYWxnb3JpdGhtLCAoX2IgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZXh0cmFjdGFibGUpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IGZhbHNlLCBrZXlVc2FnZXMpKTtcbn1cbiIsImltcG9ydCBjcnlwdG8sIHsgaXNDcnlwdG9LZXkgfSBmcm9tICcuL3dlYmNyeXB0by5qcyc7XG5pbXBvcnQgeyBjaGVja1NpZ0NyeXB0b0tleSB9IGZyb20gJy4uL2xpYi9jcnlwdG9fa2V5LmpzJztcbmltcG9ydCBpbnZhbGlkS2V5SW5wdXQgZnJvbSAnLi4vbGliL2ludmFsaWRfa2V5X2lucHV0LmpzJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldENyeXB0b0tleShhbGcsIGtleSwgdXNhZ2UpIHtcbiAgICBpZiAoaXNDcnlwdG9LZXkoa2V5KSkge1xuICAgICAgICBjaGVja1NpZ0NyeXB0b0tleShrZXksIGFsZywgdXNhZ2UpO1xuICAgICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgICBpZiAoa2V5IGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgICBpZiAoIWFsZy5zdGFydHNXaXRoKCdIUycpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGludmFsaWRLZXlJbnB1dChrZXksICdDcnlwdG9LZXknKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KCdyYXcnLCBrZXksIHsgaGFzaDogYFNIQS0ke2FsZy5zdWJzdHIoLTMpfWAsIG5hbWU6ICdITUFDJyB9LCBmYWxzZSwgW3VzYWdlXSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoaW52YWxpZEtleUlucHV0KGtleSwgJ0NyeXB0b0tleScsICdVaW50OEFycmF5JykpO1xufVxuIiwiZnVuY3Rpb24gZ2V0R2xvYmFsKCkge1xuICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIHJldHVybiBnbG9iYWxUaGlzO1xuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuYWJsZSB0byBsb2NhdGUgZ2xvYmFsIG9iamVjdCcpO1xufVxuZXhwb3J0IGRlZmF1bHQgZ2V0R2xvYmFsKCk7XG5leHBvcnQgZnVuY3Rpb24gaXNDbG91ZGZsYXJlV29ya2VycygpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZ2V0R2xvYmFsKCkuV2ViU29ja2V0UGFpciAhPT0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjYXRjaCAoX2EpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBpc05vZGVKcygpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiAoKF9iID0gKF9hID0gZ2V0R2xvYmFsKCkucHJvY2VzcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnZlcnNpb25zKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iubm9kZSkgIT09IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY2F0Y2ggKF9jKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBpc0NyeXB0b0tleSB9IGZyb20gJy4vd2ViY3J5cHRvLmpzJztcbmV4cG9ydCBkZWZhdWx0IChrZXkpID0+IHtcbiAgICByZXR1cm4gaXNDcnlwdG9LZXkoa2V5KTtcbn07XG5leHBvcnQgY29uc3QgdHlwZXMgPSBbJ0NyeXB0b0tleSddO1xuIiwiaW1wb3J0IHsgaXNDbG91ZGZsYXJlV29ya2VycywgaXNOb2RlSnMgfSBmcm9tICcuL2dsb2JhbC5qcyc7XG5pbXBvcnQgY3J5cHRvIGZyb20gJy4vd2ViY3J5cHRvLmpzJztcbmltcG9ydCB7IEpPU0VOb3RTdXBwb3J0ZWQgfSBmcm9tICcuLi91dGlsL2Vycm9ycy5qcyc7XG5pbXBvcnQgeyBkZWNvZGUgYXMgYmFzZTY0dXJsIH0gZnJvbSAnLi9iYXNlNjR1cmwuanMnO1xuZnVuY3Rpb24gc3VidGxlTWFwcGluZyhqd2spIHtcbiAgICBsZXQgYWxnb3JpdGhtO1xuICAgIGxldCBrZXlVc2FnZXM7XG4gICAgc3dpdGNoIChqd2sua3R5KSB7XG4gICAgICAgIGNhc2UgJ29jdCc6IHtcbiAgICAgICAgICAgIHN3aXRjaCAoandrLmFsZykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0hTMjU2JzpcbiAgICAgICAgICAgICAgICBjYXNlICdIUzM4NCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnSFM1MTInOlxuICAgICAgICAgICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdITUFDJywgaGFzaDogYFNIQS0ke2p3ay5hbGcuc3Vic3RyKC0zKX1gIH07XG4gICAgICAgICAgICAgICAgICAgIGtleVVzYWdlcyA9IFsnc2lnbicsICd2ZXJpZnknXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQTEyOENCQy1IUzI1Nic6XG4gICAgICAgICAgICAgICAgY2FzZSAnQTE5MkNCQy1IUzM4NCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnQTI1NkNCQy1IUzUxMic6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKGAke2p3ay5hbGd9IGtleXMgY2Fubm90IGJlIGltcG9ydGVkIGFzIENyeXB0b0tleSBpbnN0YW5jZXNgKTtcbiAgICAgICAgICAgICAgICBjYXNlICdBMTI4R0NNJzpcbiAgICAgICAgICAgICAgICBjYXNlICdBMTkyR0NNJzpcbiAgICAgICAgICAgICAgICBjYXNlICdBMjU2R0NNJzpcbiAgICAgICAgICAgICAgICBjYXNlICdBMTI4R0NNS1cnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0ExOTJHQ01LVyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnQTI1NkdDTUtXJzpcbiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnQUVTLUdDTScgfTtcbiAgICAgICAgICAgICAgICAgICAga2V5VXNhZ2VzID0gWydlbmNyeXB0JywgJ2RlY3J5cHQnXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQTEyOEtXJzpcbiAgICAgICAgICAgICAgICBjYXNlICdBMTkyS1cnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0EyNTZLVyc6XG4gICAgICAgICAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogJ0FFUy1LVycgfTtcbiAgICAgICAgICAgICAgICAgICAga2V5VXNhZ2VzID0gWyd3cmFwS2V5JywgJ3Vud3JhcEtleSddO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQQkVTMi1IUzI1NitBMTI4S1cnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1BCRVMyLUhTMzg0K0ExOTJLVyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnUEJFUzItSFM1MTIrQTI1NktXJzpcbiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnUEJLREYyJyB9O1xuICAgICAgICAgICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ2Rlcml2ZUJpdHMnXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEpPU0VOb3RTdXBwb3J0ZWQoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgSldLIFwiYWxnXCIgKEFsZ29yaXRobSkgUGFyYW1ldGVyIHZhbHVlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdSU0EnOiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGp3ay5hbGcpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdQUzI1Nic6XG4gICAgICAgICAgICAgICAgY2FzZSAnUFMzODQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1BTNTEyJzpcbiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnUlNBLVBTUycsIGhhc2g6IGBTSEEtJHtqd2suYWxnLnN1YnN0cigtMyl9YCB9O1xuICAgICAgICAgICAgICAgICAgICBrZXlVc2FnZXMgPSBqd2suZCA/IFsnc2lnbiddIDogWyd2ZXJpZnknXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUlMyNTYnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1JTMzg0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdSUzUxMic6XG4gICAgICAgICAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogJ1JTQVNTQS1QS0NTMS12MV81JywgaGFzaDogYFNIQS0ke2p3ay5hbGcuc3Vic3RyKC0zKX1gIH07XG4gICAgICAgICAgICAgICAgICAgIGtleVVzYWdlcyA9IGp3ay5kID8gWydzaWduJ10gOiBbJ3ZlcmlmeSddO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdSU0EtT0FFUCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnUlNBLU9BRVAtMjU2JzpcbiAgICAgICAgICAgICAgICBjYXNlICdSU0EtT0FFUC0zODQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1JTQS1PQUVQLTUxMic6XG4gICAgICAgICAgICAgICAgICAgIGFsZ29yaXRobSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdSU0EtT0FFUCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNoOiBgU0hBLSR7cGFyc2VJbnQoandrLmFsZy5zdWJzdHIoLTMpLCAxMCkgfHwgMX1gLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBrZXlVc2FnZXMgPSBqd2suZCA/IFsnZGVjcnlwdCcsICd1bndyYXBLZXknXSA6IFsnZW5jcnlwdCcsICd3cmFwS2V5J107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdJbnZhbGlkIG9yIHVuc3VwcG9ydGVkIEpXSyBcImFsZ1wiIChBbGdvcml0aG0pIFBhcmFtZXRlciB2YWx1ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnRUMnOiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGp3ay5hbGcpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdFUzI1Nic6XG4gICAgICAgICAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogJ0VDRFNBJywgbmFtZWRDdXJ2ZTogJ1AtMjU2JyB9O1xuICAgICAgICAgICAgICAgICAgICBrZXlVc2FnZXMgPSBqd2suZCA/IFsnc2lnbiddIDogWyd2ZXJpZnknXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRVMzODQnOlxuICAgICAgICAgICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdFQ0RTQScsIG5hbWVkQ3VydmU6ICdQLTM4NCcgfTtcbiAgICAgICAgICAgICAgICAgICAga2V5VXNhZ2VzID0gandrLmQgPyBbJ3NpZ24nXSA6IFsndmVyaWZ5J107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VTNTEyJzpcbiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiAnUC01MjEnIH07XG4gICAgICAgICAgICAgICAgICAgIGtleVVzYWdlcyA9IGp3ay5kID8gWydzaWduJ10gOiBbJ3ZlcmlmeSddO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFQ0RILUVTJzpcbiAgICAgICAgICAgICAgICBjYXNlICdFQ0RILUVTK0ExMjhLVyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnRUNESC1FUytBMTkyS1cnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0VDREgtRVMrQTI1NktXJzpcbiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNESCcsIG5hbWVkQ3VydmU6IGp3ay5jcnYgfTtcbiAgICAgICAgICAgICAgICAgICAga2V5VXNhZ2VzID0gandrLmQgPyBbJ2Rlcml2ZUJpdHMnXSA6IFtdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZCgnSW52YWxpZCBvciB1bnN1cHBvcnRlZCBKV0sgXCJhbGdcIiAoQWxnb3JpdGhtKSBQYXJhbWV0ZXIgdmFsdWUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgKGlzQ2xvdWRmbGFyZVdvcmtlcnMoKSB8fCBpc05vZGVKcygpKSAmJiAnT0tQJzpcbiAgICAgICAgICAgIGlmIChqd2suYWxnICE9PSAnRWREU0EnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEpPU0VOb3RTdXBwb3J0ZWQoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgSldLIFwiYWxnXCIgKEFsZ29yaXRobSkgUGFyYW1ldGVyIHZhbHVlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKGp3ay5jcnYpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdFZDI1NTE5JzpcbiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnTk9ERS1FRDI1NTE5JywgbmFtZWRDdXJ2ZTogJ05PREUtRUQyNTUxOScgfTtcbiAgICAgICAgICAgICAgICAgICAga2V5VXNhZ2VzID0gandrLmQgPyBbJ3NpZ24nXSA6IFsndmVyaWZ5J107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgaXNOb2RlSnMoKSAmJiAnRWQ0NDgnOlxuICAgICAgICAgICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdOT0RFLUVENDQ4JywgbmFtZWRDdXJ2ZTogJ05PREUtRUQ0NDgnIH07XG4gICAgICAgICAgICAgICAgICAgIGtleVVzYWdlcyA9IGp3ay5kID8gWydzaWduJ10gOiBbJ3ZlcmlmeSddO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZCgnSW52YWxpZCBvciB1bnN1cHBvcnRlZCBKV0sgXCJjcnZcIiAoU3VidHlwZSBvZiBLZXkgUGFpcikgUGFyYW1ldGVyIHZhbHVlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdJbnZhbGlkIG9yIHVuc3VwcG9ydGVkIEpXSyBcImt0eVwiIChLZXkgVHlwZSkgUGFyYW1ldGVyIHZhbHVlJyk7XG4gICAgfVxuICAgIHJldHVybiB7IGFsZ29yaXRobSwga2V5VXNhZ2VzIH07XG59XG5jb25zdCBwYXJzZSA9IGFzeW5jIChqd2spID0+IHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGNvbnN0IHsgYWxnb3JpdGhtLCBrZXlVc2FnZXMgfSA9IHN1YnRsZU1hcHBpbmcoandrKTtcbiAgICBjb25zdCByZXN0ID0gW1xuICAgICAgICBhbGdvcml0aG0sXG4gICAgICAgIChfYSA9IGp3ay5leHQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGZhbHNlLFxuICAgICAgICAoX2IgPSBqd2sua2V5X29wcykgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDoga2V5VXNhZ2VzLFxuICAgIF07XG4gICAgaWYgKGFsZ29yaXRobS5uYW1lID09PSAnUEJLREYyJykge1xuICAgICAgICByZXR1cm4gY3J5cHRvLnN1YnRsZS5pbXBvcnRLZXkoJ3JhdycsIGJhc2U2NHVybChqd2suayksIC4uLnJlc3QpO1xuICAgIH1cbiAgICBjb25zdCBrZXlEYXRhID0geyAuLi5qd2sgfTtcbiAgICBkZWxldGUga2V5RGF0YS5hbGc7XG4gICAgcmV0dXJuIGNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KCdqd2snLCBrZXlEYXRhLCAuLi5yZXN0KTtcbn07XG5leHBvcnQgZGVmYXVsdCBwYXJzZTtcbiIsImltcG9ydCBjcnlwdG8sIHsgaXNDcnlwdG9LZXkgfSBmcm9tICcuL3dlYmNyeXB0by5qcyc7XG5pbXBvcnQgaW52YWxpZEtleUlucHV0IGZyb20gJy4uL2xpYi9pbnZhbGlkX2tleV9pbnB1dC5qcyc7XG5pbXBvcnQgeyBlbmNvZGUgYXMgYmFzZTY0dXJsIH0gZnJvbSAnLi9iYXNlNjR1cmwuanMnO1xuY29uc3Qga2V5VG9KV0sgPSBhc3luYyAoa2V5KSA9PiB7XG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGt0eTogJ29jdCcsXG4gICAgICAgICAgICBrOiBiYXNlNjR1cmwoa2V5KSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCFpc0NyeXB0b0tleShrZXkpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoaW52YWxpZEtleUlucHV0KGtleSwgJ0NyeXB0b0tleScsICdVaW50OEFycmF5JykpO1xuICAgIH1cbiAgICBpZiAoIWtleS5leHRyYWN0YWJsZSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdub24tZXh0cmFjdGFibGUgQ3J5cHRvS2V5IGNhbm5vdCBiZSBleHBvcnRlZCBhcyBhIEpXSycpO1xuICAgIH1cbiAgICBjb25zdCB7IGV4dCwga2V5X29wcywgYWxnLCB1c2UsIC4uLmp3ayB9ID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5leHBvcnRLZXkoJ2p3aycsIGtleSk7XG4gICAgcmV0dXJuIGp3aztcbn07XG5leHBvcnQgZGVmYXVsdCBrZXlUb0pXSztcbiIsImltcG9ydCBjcnlwdG8gZnJvbSAnLi93ZWJjcnlwdG8uanMnO1xuZXhwb3J0IGRlZmF1bHQgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0byk7XG4iLCJpbXBvcnQgc3VidGxlQWxnb3JpdGhtIGZyb20gJy4vc3VidGxlX2RzYS5qcyc7XG5pbXBvcnQgY3J5cHRvIGZyb20gJy4vd2ViY3J5cHRvLmpzJztcbmltcG9ydCBjaGVja0tleUxlbmd0aCBmcm9tICcuL2NoZWNrX2tleV9sZW5ndGguanMnO1xuaW1wb3J0IGdldFNpZ25LZXkgZnJvbSAnLi9nZXRfc2lnbl92ZXJpZnlfa2V5LmpzJztcbmNvbnN0IHNpZ24gPSBhc3luYyAoYWxnLCBrZXksIGRhdGEpID0+IHtcbiAgICBjb25zdCBjcnlwdG9LZXkgPSBhd2FpdCBnZXRTaWduS2V5KGFsZywga2V5LCAnc2lnbicpO1xuICAgIGNoZWNrS2V5TGVuZ3RoKGFsZywgY3J5cHRvS2V5KTtcbiAgICBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCBjcnlwdG8uc3VidGxlLnNpZ24oc3VidGxlQWxnb3JpdGhtKGFsZywgY3J5cHRvS2V5LmFsZ29yaXRobS5uYW1lZEN1cnZlKSwgY3J5cHRvS2V5LCBkYXRhKTtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoc2lnbmF0dXJlKTtcbn07XG5leHBvcnQgZGVmYXVsdCBzaWduO1xuIiwiaW1wb3J0IHsgaXNDbG91ZGZsYXJlV29ya2VycywgaXNOb2RlSnMgfSBmcm9tICcuL2dsb2JhbC5qcyc7XG5pbXBvcnQgeyBKT1NFTm90U3VwcG9ydGVkIH0gZnJvbSAnLi4vdXRpbC9lcnJvcnMuanMnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3VidGxlRHNhKGFsZywgbmFtZWRDdXJ2ZSkge1xuICAgIGNvbnN0IGxlbmd0aCA9IHBhcnNlSW50KGFsZy5zdWJzdHIoLTMpLCAxMCk7XG4gICAgc3dpdGNoIChhbGcpIHtcbiAgICAgICAgY2FzZSAnSFMyNTYnOlxuICAgICAgICBjYXNlICdIUzM4NCc6XG4gICAgICAgIGNhc2UgJ0hTNTEyJzpcbiAgICAgICAgICAgIHJldHVybiB7IGhhc2g6IGBTSEEtJHtsZW5ndGh9YCwgbmFtZTogJ0hNQUMnIH07XG4gICAgICAgIGNhc2UgJ1BTMjU2JzpcbiAgICAgICAgY2FzZSAnUFMzODQnOlxuICAgICAgICBjYXNlICdQUzUxMic6XG4gICAgICAgICAgICByZXR1cm4geyBoYXNoOiBgU0hBLSR7bGVuZ3RofWAsIG5hbWU6ICdSU0EtUFNTJywgc2FsdExlbmd0aDogbGVuZ3RoID4+IDMgfTtcbiAgICAgICAgY2FzZSAnUlMyNTYnOlxuICAgICAgICBjYXNlICdSUzM4NCc6XG4gICAgICAgIGNhc2UgJ1JTNTEyJzpcbiAgICAgICAgICAgIHJldHVybiB7IGhhc2g6IGBTSEEtJHtsZW5ndGh9YCwgbmFtZTogJ1JTQVNTQS1QS0NTMS12MV81JyB9O1xuICAgICAgICBjYXNlICdFUzI1Nic6XG4gICAgICAgIGNhc2UgJ0VTMzg0JzpcbiAgICAgICAgY2FzZSAnRVM1MTInOlxuICAgICAgICAgICAgcmV0dXJuIHsgaGFzaDogYFNIQS0ke2xlbmd0aH1gLCBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlIH07XG4gICAgICAgIGNhc2UgKGlzQ2xvdWRmbGFyZVdvcmtlcnMoKSB8fCBpc05vZGVKcygpKSAmJiAnRWREU0EnOlxuICAgICAgICAgICAgcmV0dXJuIHsgbmFtZTogbmFtZWRDdXJ2ZSwgbmFtZWRDdXJ2ZSB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEpPU0VOb3RTdXBwb3J0ZWQoYGFsZyAke2FsZ30gaXMgbm90IHN1cHBvcnRlZCBlaXRoZXIgYnkgSk9TRSBvciB5b3VyIGphdmFzY3JpcHQgcnVudGltZWApO1xuICAgIH1cbn1cbiIsImltcG9ydCBnbG9iYWxUaGlzIGZyb20gJy4vZ2xvYmFsLmpzJztcbmV4cG9ydCBkZWZhdWx0IGdsb2JhbFRoaXMuY3J5cHRvO1xuZXhwb3J0IGZ1bmN0aW9uIGlzQ3J5cHRvS2V5KGtleSkge1xuICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcy5DcnlwdG9LZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGtleSAhPSBudWxsICYmIGtleSBpbnN0YW5jZW9mIGdsb2JhbFRoaXMuQ3J5cHRvS2V5O1xufVxuIiwiaW1wb3J0ICogYXMgYmFzZTY0dXJsIGZyb20gJy4uL3J1bnRpbWUvYmFzZTY0dXJsLmpzJztcbmV4cG9ydCBjb25zdCBlbmNvZGUgPSBiYXNlNjR1cmwuZW5jb2RlO1xuZXhwb3J0IGNvbnN0IGRlY29kZSA9IGJhc2U2NHVybC5kZWNvZGU7XG4iLCJleHBvcnQgY2xhc3MgSk9TRUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5jb2RlID0gJ0VSUl9KT1NFX0dFTkVSSUMnO1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgIChfYSA9IEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChFcnJvciwgdGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSk9TRV9HRU5FUklDJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkIGV4dGVuZHMgSk9TRUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBjbGFpbSA9ICd1bnNwZWNpZmllZCcsIHJlYXNvbiA9ICd1bnNwZWNpZmllZCcpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldUX0NMQUlNX1ZBTElEQVRJT05fRkFJTEVEJztcbiAgICAgICAgdGhpcy5jbGFpbSA9IGNsYWltO1xuICAgICAgICB0aGlzLnJlYXNvbiA9IHJlYXNvbjtcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KV1RfQ0xBSU1fVkFMSURBVElPTl9GQUlMRUQnO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBKV1RFeHBpcmVkIGV4dGVuZHMgSk9TRUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBjbGFpbSA9ICd1bnNwZWNpZmllZCcsIHJlYXNvbiA9ICd1bnNwZWNpZmllZCcpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldUX0VYUElSRUQnO1xuICAgICAgICB0aGlzLmNsYWltID0gY2xhaW07XG4gICAgICAgIHRoaXMucmVhc29uID0gcmVhc29uO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXVF9FWFBJUkVEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSk9TRUFsZ05vdEFsbG93ZWQgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pPU0VfQUxHX05PVF9BTExPV0VEJztcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KT1NFX0FMR19OT1RfQUxMT1dFRCc7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEpPU0VOb3RTdXBwb3J0ZWQgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pPU0VfTk9UX1NVUFBPUlRFRCc7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSk9TRV9OT1RfU1VQUE9SVEVEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldFRGVjcnlwdGlvbkZhaWxlZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldFX0RFQ1JZUFRJT05fRkFJTEVEJztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJ2RlY3J5cHRpb24gb3BlcmF0aW9uIGZhaWxlZCc7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSldFX0RFQ1JZUFRJT05fRkFJTEVEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldFSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldFX0lOVkFMSUQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXRV9JTlZBTElEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldTSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldTX0lOVkFMSUQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXU19JTlZBTElEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldUSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldUX0lOVkFMSUQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXVF9JTlZBTElEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldLSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldLX0lOVkFMSUQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXS19JTlZBTElEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldLU0ludmFsaWQgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXS1NfSU5WQUxJRCc7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSldLU19JTlZBTElEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldLU05vTWF0Y2hpbmdLZXkgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXS1NfTk9fTUFUQ0hJTkdfS0VZJztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJ25vIGFwcGxpY2FibGUga2V5IGZvdW5kIGluIHRoZSBKU09OIFdlYiBLZXkgU2V0JztcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KV0tTX05PX01BVENISU5HX0tFWSc7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEpXS1NNdWx0aXBsZU1hdGNoaW5nS2V5cyBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldLU19NVUxUSVBMRV9NQVRDSElOR19LRVlTJztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJ211bHRpcGxlIG1hdGNoaW5nIGtleXMgZm91bmQgaW4gdGhlIEpTT04gV2ViIEtleSBTZXQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXS1NfTVVMVElQTEVfTUFUQ0hJTkdfS0VZUyc7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEpXS1NUaW1lb3V0IGV4dGVuZHMgSk9TRUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5jb2RlID0gJ0VSUl9KV0tTX1RJTUVPVVQnO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSAncmVxdWVzdCB0aW1lZCBvdXQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXS1NfVElNRU9VVCc7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEpXU1NpZ25hdHVyZVZlcmlmaWNhdGlvbkZhaWxlZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldTX1NJR05BVFVSRV9WRVJJRklDQVRJT05fRkFJTEVEJztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJ3NpZ25hdHVyZSB2ZXJpZmljYXRpb24gZmFpbGVkJztcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KV1NfU0lHTkFUVVJFX1ZFUklGSUNBVElPTl9GQUlMRUQnO1xuICAgIH1cbn1cbiIsIi8qKlxuICogV29yayBhcm91bmQgU2FmYXJpIDE0IEluZGV4ZWREQiBvcGVuIGJ1Zy5cbiAqXG4gKiBTYWZhcmkgaGFzIGEgaG9ycmlibGUgYnVnIHdoZXJlIElEQiByZXF1ZXN0cyBjYW4gaGFuZyB3aGlsZSB0aGUgYnJvd3NlciBpcyBzdGFydGluZyB1cC4gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTIyNjU0N1xuICogVGhlIG9ubHkgc29sdXRpb24gaXMgdG8ga2VlcCBudWRnaW5nIGl0IHVudGlsIGl0J3MgYXdha2UuXG4gKi9cbmZ1bmN0aW9uIGlkYlJlYWR5KCkge1xuICAgIHZhciBpc1NhZmFyaSA9ICFuYXZpZ2F0b3IudXNlckFnZW50RGF0YSAmJlxuICAgICAgICAvU2FmYXJpXFwvLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmXG4gICAgICAgICEvQ2hyb20oZXxpdW0pXFwvLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIC8vIE5vIHBvaW50IHB1dHRpbmcgb3RoZXIgYnJvd3NlcnMgb3Igb2xkZXIgdmVyc2lvbnMgb2YgU2FmYXJpIHRocm91Z2ggdGhpcyBtZXNzLlxuICAgIGlmICghaXNTYWZhcmkgfHwgIWluZGV4ZWREQi5kYXRhYmFzZXMpXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB2YXIgaW50ZXJ2YWxJZDtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgdmFyIHRyeUlkYiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGluZGV4ZWREQi5kYXRhYmFzZXMoKS5maW5hbGx5KHJlc29sdmUpOyB9O1xuICAgICAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodHJ5SWRiLCAxMDApO1xuICAgICAgICB0cnlJZGIoKTtcbiAgICB9KS5maW5hbGx5KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7IH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpZGJSZWFkeTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGJyb2tlclNvdXJjZSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFsbG5ldHAycC9hbi1icm9rZXIvZGlzdC9hbi1icm9rZXIuanM/cmF3J1xuaW1wb3J0IHsgQW5JZGVudGl0eUNvbmZpZywgQW5JZGVudGl0eSB9IGZyb20gJ0BhbGxuZXRwMnAvYW4taWRlbnRpdHknXG5cbihhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGlkZW50aXR5Q29uZmlnID0gbmV3IEFuSWRlbnRpdHlDb25maWcoKVxuICBjb25zdCBpZGVudGl0eSA9IGF3YWl0IEFuSWRlbnRpdHkuY3JlYXRlQW5JZGVudGl0eShpZGVudGl0eUNvbmZpZylcbiAgY29uc29sZS5sb2coJ0BALWxvYWRlci1AQCAtIGlkZW50aXR5OiAnLCBpZGVudGl0eSlcblxuICBjb25zb2xlLmxvZygnQEAtbG9hZGVyLUBAIC0gYnJva2VyIHNvdXJjZTogJywgYnJva2VyU291cmNlKVxuXG4gIGNvbnN0IGJyb2tlckJsb2IgPSBuZXcgQmxvYihcbiAgICBbYnJva2VyU291cmNlXSxcbiAgICB7IHR5cGU6ICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0JyB9XG4gIClcblxuICBjb25zb2xlLmxvZygnQEAtbG9hZGVyLUBAIC0gYnJva2VyIGJsb2I6ICcsIGJyb2tlckJsb2IpXG5cbiAgY29uc3QgYnJva2VyVXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChicm9rZXJCbG9iKVxuXG4gIGNvbnNvbGUubG9nKCdAQC1sb2FkZXItQEAgLSBicm9rZXIgdXJsOiAnLCBicm9rZXJVcmwpXG5cbiAgY29uc3QgYnJva2VyV29ya2VyID0gbmV3IFdvcmtlcihicm9rZXJVcmwpXG5cbiAgVVJMLnJldm9rZU9iamVjdFVSTChicm9rZXJVcmwpXG5cbiAgY29uc29sZS5sb2coJ0BALWxvYWRlci1AQCAtIGJyb2tlciB3b3JrZXI6ICcsIGJyb2tlcldvcmtlcilcblxuICBicm9rZXJXb3JrZXIub25tZXNzYWdlID0gZXZ0ID0+IHtcbiAgICBjb25zdCBkYXRhID0gZXZ0LmRhdGFcbiAgICBpZiAoZGF0YS50eXBlID09PSAncmVnaXN0ZXJNb2R1bGUnKSB7XG4gICAgICBicm9rZXJXb3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBkaXI6ICdyZXMnLFxuICAgICAgICBtc2dJZDogZGF0YS5tc2dJZFxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgYnJva2VyV29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgZGlyOiAncmVzJyxcbiAgICAgICAgbXNnSWQ6IGRhdGEubXNnSWQsXG4gICAgICAgIGVycm9yOiAndW5oYW5kbGVkIHJlcSB0eXBlOiAnICsgZGF0YS50eXBlXG4gICAgICB9KVxuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZygnQEAtbG9hZGVyLUBAIC0gYnJva2VyIG1lc3NhZ2U6ICcsIGV2dC5kYXRhKVxuICB9XG5cbiAgLy8gYnJva2VyV29ya2VyLnBvc3RNZXNzYWdlKCd0ZXN0LW1lc3NhZ2UtZnJvbS1hbi1sb2FkZXInKVxuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHRocm93IG5ldyBFcnJvcignY2FuIGRlYnVnPycpXG4gIH0sIDEwMDApXG59KSgpLnRoZW4oKCkgPT4ge30sIGVyciA9PiB7XG4gIGNvbnNvbGUuZXJyb3IoZXJyKVxufSlcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==