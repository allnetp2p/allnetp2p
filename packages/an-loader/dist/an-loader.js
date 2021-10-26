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
/* harmony import */ var jose_browser_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jose-browser-runtime */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/key/import.js");
/* harmony import */ var jose_browser_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jose-browser-runtime */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/general/verify.js");
/* harmony import */ var jose_browser_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jose-browser-runtime */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/util/base64url.js");
/* harmony import */ var jose_browser_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jose-browser-runtime */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jwt/verify.js");
/* harmony import */ var jose_browser_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jose-browser-runtime */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jwt/sign.js");
/* harmony import */ var jose_browser_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! jose-browser-runtime */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/key/generate_key_pair.js");
/* harmony import */ var jose_browser_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! jose-browser-runtime */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/key/export.js");
/* harmony import */ var jose_browser_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! jose-browser-runtime */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jwk/thumbprint.js");
/* harmony import */ var jose_browser_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! jose-browser-runtime */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/general/sign.js");
/* harmony import */ var idb_keyval__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! idb-keyval */ "../an-identity/node_modules/idb-keyval/dist/index.js");



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

  /**
   * Validate a public identity.
   * This only checks the construction of the object and the self-signing,
   * you should still decide if you want to trust it.
   *
   * Will throw an error on invalid identity, returns undefined on success.
   */
  static async validatePublicIdentity (pubIdentity) {
    // FIXME this is just a stub that does a raw signature validation
    //       we need to also check all the hashes, etc
    for (const sig of pubIdentity.sig) {
      const pubKey = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_0__.importJWK)(sig.jwk, sig.alg)

      // will throw on failed validation
      await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_1__.generalVerify)(pubIdentity.jws, pubKey)
    }
  }

  /**
   * Validate and register a public identity.
   * Once an identity is registered, it can be used to:
   *  - send encrypted messages
   *  - validate JWT claims
   */
  static async validateAndRegisterPublicIdentity (publicIdentity) {
    await AnIdentity.validatePublicIdentity(publicIdentity)
    await idb_keyval__WEBPACK_IMPORTED_MODULE_2__.set('anIdPub:' + publicIdentity.id, publicIdentity)
  }

  /**
   * Verify a JTW claim.
   * This checks the signature, and raw data validation,
   * returning the claim data. You need to make sure the claim data is correct.
   */
  static async validateJWT (jwtList) {
    const content = JSON.parse((new TextDecoder()).decode(
      jose_browser_runtime__WEBPACK_IMPORTED_MODULE_3__.decode(jwtList[0].split('.')[1])
    ))

    const iss = await idb_keyval__WEBPACK_IMPORTED_MODULE_2__.get('anIdPub:' + content.iss)
    const pubKey = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_0__.importJWK)(iss.sig[0].jwk, iss.sig[0].alg)

    for (const jwt of jwtList) {
      await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_4__.jwtVerify)(jwt, pubKey, {
        issuer: content.iss,
        subject: content.sub
      })
    }

    return content
  }

  // -- methods requiring full private key access -- //

  /**
   */
  async signCapability (opts) {
    opts = opts || {}
    opts.expiration = opts.expiration || '1day'
    opts.capabilities = opts.capabilities || {}

    const out = []

    for (const sig of this.fullIdentity.sig) {
      const jwt = new jose_browser_runtime__WEBPACK_IMPORTED_MODULE_5__.SignJWT(opts.capabilities)
      jwt.setProtectedHeader({ alg: sig.alg })
      jwt.setExpirationTime(opts.expiration)
      jwt.setIssuer(this.fullIdentity.id)
      if (opts.subject) {
        jwt.setSubject(opts.subject)
      }
      out.push(await jwt.sign(sig._priv.privateKey))
    }

    return out
  }
}

// -- helpers -- //

async function _loadIdent (passphraseKey) {
  const activeId = await idb_keyval__WEBPACK_IMPORTED_MODULE_2__.get('anIdActive:')

  console.log('activeId', activeId)

  const saveIdentity = await idb_keyval__WEBPACK_IMPORTED_MODULE_2__.get('anIdPriv:' + activeId)

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
    ctx.saltBytes = jose_browser_runtime__WEBPACK_IMPORTED_MODULE_3__.decode(ctx.salt)
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
    jose_browser_runtime__WEBPACK_IMPORTED_MODULE_3__.decode(enc.privateKey),
    ctx.secretKey,
    {
      name: 'AES-GCM',
      iv: jose_browser_runtime__WEBPACK_IMPORTED_MODULE_3__.decode(enc.passphraseSymOpts.iv),
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

  const publicKey = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_0__.importJWK)(item.jwk, item.alg)

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
            salt: jose_browser_runtime__WEBPACK_IMPORTED_MODULE_3__.encode(pbkdf2Salt)
          },
          passphraseSymAlg: config.passphraseSymAlg,
          passphraseSymOpts: {
            iv: jose_browser_runtime__WEBPACK_IMPORTED_MODULE_3__.encode(aesGcmIv)
          },
          privateKey: jose_browser_runtime__WEBPACK_IMPORTED_MODULE_3__.encode(new Uint8Array(savePrivKey))
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
      const pair = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_6__.generateKeyPair)(alg, { extractable: true })

      const publicKeyJwk = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_7__.exportJWK)(pair.publicKey)
      const publicThumbprint = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_8__.calculateJwkThumbprint)(publicKeyJwk, 'sha256')
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
      const pair = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_6__.generateKeyPair)(sigAlg, { extractable: true })

      const publicKeyJwk = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_7__.exportJWK)(pair.publicKey)
      const publicThumbprint = await (0,jose_browser_runtime__WEBPACK_IMPORTED_MODULE_8__.calculateJwkThumbprint)(publicKeyJwk, 'sha256')
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
      sigBytes.push(jose_browser_runtime__WEBPACK_IMPORTED_MODULE_3__.decode(enc.id))
    }

    for (const sig of fullIdentity.sig) {
      sigBytes.push(jose_browser_runtime__WEBPACK_IMPORTED_MODULE_3__.decode(sig.id))
    }

    const sigBytesHash = await _concatHash(sigBytes)

    const sign = new jose_browser_runtime__WEBPACK_IMPORTED_MODULE_9__.GeneralSign(sigBytesHash)

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
    idBytes.push(jose_browser_runtime__WEBPACK_IMPORTED_MODULE_3__.decode(fullIdentity.jws.payload))
    for (const sig of fullIdentity.jws.signatures) {
      idBytes.push(jose_browser_runtime__WEBPACK_IMPORTED_MODULE_3__.decode(sig.protected))
      idBytes.push(jose_browser_runtime__WEBPACK_IMPORTED_MODULE_3__.decode(sig.signature))
    }

    fullIdentity.id = jose_browser_runtime__WEBPACK_IMPORTED_MODULE_3__.encode(await _concatHash(idBytes))
    pubIdentity.id = fullIdentity.id
    saveIdentity.id = fullIdentity.id

    console.log('full', fullIdentity)
    console.log('pub', pubIdentity)
    console.log('save', saveIdentity)

    await AnIdentity.validateAndRegisterPublicIdentity(pubIdentity)

    await idb_keyval__WEBPACK_IMPORTED_MODULE_2__.set('anIdPriv:' + saveIdentity.id, saveIdentity)
    await idb_keyval__WEBPACK_IMPORTED_MODULE_2__.set('anIdActive:', saveIdentity.id)

    return new AnIdentity(fullIdentity, pubIdentity)
  } else {
    throw new Error('unsupported passphraseSecretAlg: "' + config.passphraseSecretAlg + '"')
  }
}

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

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/compact/sign.js":
/*!*****************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/compact/sign.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompactSign": () => (/* binding */ CompactSign)
/* harmony export */ });
/* harmony import */ var _flattened_sign_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../flattened/sign.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/flattened/sign.js");

class CompactSign {
    constructor(payload) {
        this._flattened = new _flattened_sign_js__WEBPACK_IMPORTED_MODULE_0__.FlattenedSign(payload);
    }
    setProtectedHeader(protectedHeader) {
        this._flattened.setProtectedHeader(protectedHeader);
        return this;
    }
    async sign(key, options) {
        const jws = await this._flattened.sign(key, options);
        if (jws.payload === undefined) {
            throw new TypeError('use the flattened module for creating JWS with b64: false');
        }
        return `${jws.protected}.${jws.payload}.${jws.signature}`;
    }
}


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/compact/verify.js":
/*!*******************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/compact/verify.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compactVerify": () => (/* binding */ compactVerify)
/* harmony export */ });
/* harmony import */ var _flattened_verify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../flattened/verify.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/flattened/verify.js");
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/errors.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/util/errors.js");
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/buffer_utils.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/buffer_utils.js");



async function compactVerify(jws, key, options) {
    if (jws instanceof Uint8Array) {
        jws = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_0__.decoder.decode(jws);
    }
    if (typeof jws !== 'string') {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JWSInvalid('Compact JWS must be a string or Uint8Array');
    }
    const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split('.');
    if (length !== 3) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JWSInvalid('Invalid Compact JWS');
    }
    const verified = await (0,_flattened_verify_js__WEBPACK_IMPORTED_MODULE_2__.flattenedVerify)({
        payload: (payload || undefined),
        protected: protectedHeader || undefined,
        signature: (signature || undefined),
    }, key, options);
    const result = { payload: verified.payload, protectedHeader: verified.protectedHeader };
    if (typeof key === 'function') {
        return { ...result, key: verified.key };
    }
    return result;
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

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/flattened/verify.js":
/*!*********************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/flattened/verify.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "flattenedVerify": () => (/* binding */ flattenedVerify)
/* harmony export */ });
/* harmony import */ var _runtime_base64url_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../runtime/base64url.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/base64url.js");
/* harmony import */ var _runtime_verify_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../runtime/verify.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/verify.js");
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/errors.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/util/errors.js");
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/buffer_utils.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/buffer_utils.js");
/* harmony import */ var _lib_is_disjoint_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/is_disjoint.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/is_disjoint.js");
/* harmony import */ var _lib_is_object_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/is_object.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/is_object.js");
/* harmony import */ var _lib_check_key_type_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/check_key_type.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/check_key_type.js");
/* harmony import */ var _lib_validate_crit_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/validate_crit.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/validate_crit.js");
/* harmony import */ var _lib_validate_algorithms_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/validate_algorithms.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/validate_algorithms.js");









async function flattenedVerify(jws, key, options) {
    var _a;
    if (!(0,_lib_is_object_js__WEBPACK_IMPORTED_MODULE_0__["default"])(jws)) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JWSInvalid('Flattened JWS must be an object');
    }
    if (jws.protected === undefined && jws.header === undefined) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
    }
    if (jws.protected !== undefined && typeof jws.protected !== 'string') {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JWSInvalid('JWS Protected Header incorrect type');
    }
    if (jws.payload === undefined) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JWSInvalid('JWS Payload missing');
    }
    if (typeof jws.signature !== 'string') {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JWSInvalid('JWS Signature missing or incorrect type');
    }
    if (jws.header !== undefined && !(0,_lib_is_object_js__WEBPACK_IMPORTED_MODULE_0__["default"])(jws.header)) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JWSInvalid('JWS Unprotected Header incorrect type');
    }
    let parsedProt = {};
    if (jws.protected) {
        const protectedHeader = (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_2__.decode)(jws.protected);
        try {
            parsedProt = JSON.parse(_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__.decoder.decode(protectedHeader));
        }
        catch (_b) {
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JWSInvalid('JWS Protected Header is invalid');
        }
    }
    if (!(0,_lib_is_disjoint_js__WEBPACK_IMPORTED_MODULE_4__["default"])(parsedProt, jws.header)) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JWSInvalid('JWS Protected and JWS Unprotected Header Parameter names must be disjoint');
    }
    const joseHeader = {
        ...parsedProt,
        ...jws.header,
    };
    const extensions = (0,_lib_validate_crit_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JWSInvalid, new Map([['b64', true]]), options === null || options === void 0 ? void 0 : options.crit, parsedProt, joseHeader);
    let b64 = true;
    if (extensions.has('b64')) {
        b64 = parsedProt.b64;
        if (typeof b64 !== 'boolean') {
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        }
    }
    const { alg } = joseHeader;
    if (typeof alg !== 'string' || !alg) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    }
    const algorithms = options && (0,_lib_validate_algorithms_js__WEBPACK_IMPORTED_MODULE_6__["default"])('algorithms', options.algorithms);
    if (algorithms && !algorithms.has(alg)) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter not allowed');
    }
    if (b64) {
        if (typeof jws.payload !== 'string') {
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JWSInvalid('JWS Payload must be a string');
        }
    }
    else if (typeof jws.payload !== 'string' && !(jws.payload instanceof Uint8Array)) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JWSInvalid('JWS Payload must be a string or an Uint8Array instance');
    }
    let resolvedKey = false;
    if (typeof key === 'function') {
        key = await key(parsedProt, jws);
        resolvedKey = true;
    }
    (0,_lib_check_key_type_js__WEBPACK_IMPORTED_MODULE_7__["default"])(alg, key, 'verify');
    const data = (0,_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__.concat)(_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__.encoder.encode((_a = jws.protected) !== null && _a !== void 0 ? _a : ''), _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__.encoder.encode('.'), typeof jws.payload === 'string' ? _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__.encoder.encode(jws.payload) : jws.payload);
    const signature = (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_2__.decode)(jws.signature);
    const verified = await (0,_runtime_verify_js__WEBPACK_IMPORTED_MODULE_8__["default"])(alg, key, signature, data);
    if (!verified) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JWSSignatureVerificationFailed();
    }
    let payload;
    if (b64) {
        payload = (0,_runtime_base64url_js__WEBPACK_IMPORTED_MODULE_2__.decode)(jws.payload);
    }
    else if (typeof jws.payload === 'string') {
        payload = _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_3__.encoder.encode(jws.payload);
    }
    else {
        payload = jws.payload;
    }
    const result = { payload };
    if (jws.protected !== undefined) {
        result.protectedHeader = parsedProt;
    }
    if (jws.header !== undefined) {
        result.unprotectedHeader = jws.header;
    }
    if (resolvedKey) {
        return { ...result, key };
    }
    return result;
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

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/general/verify.js":
/*!*******************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/general/verify.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generalVerify": () => (/* binding */ generalVerify)
/* harmony export */ });
/* harmony import */ var _flattened_verify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../flattened/verify.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/flattened/verify.js");
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/errors.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/util/errors.js");
/* harmony import */ var _lib_is_object_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/is_object.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/is_object.js");



async function generalVerify(jws, key, options) {
    if (!(0,_lib_is_object_js__WEBPACK_IMPORTED_MODULE_0__["default"])(jws)) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JWSInvalid('General JWS must be an object');
    }
    if (!Array.isArray(jws.signatures) || !jws.signatures.every(_lib_is_object_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JWSInvalid('JWS Signatures missing or incorrect type');
    }
    for (const signature of jws.signatures) {
        try {
            return await (0,_flattened_verify_js__WEBPACK_IMPORTED_MODULE_2__.flattenedVerify)({
                header: signature.header,
                payload: jws.payload,
                protected: signature.protected,
                signature: signature.signature,
            }, key, options);
        }
        catch (_a) {
        }
    }
    throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JWSSignatureVerificationFailed();
}


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jwt/produce.js":
/*!************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/jwt/produce.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProduceJWT": () => (/* binding */ ProduceJWT)
/* harmony export */ });
/* harmony import */ var _lib_epoch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/epoch.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/epoch.js");
/* harmony import */ var _lib_is_object_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/is_object.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/is_object.js");
/* harmony import */ var _lib_secs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/secs.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/secs.js");



class ProduceJWT {
    constructor(payload) {
        if (!(0,_lib_is_object_js__WEBPACK_IMPORTED_MODULE_0__["default"])(payload)) {
            throw new TypeError('JWT Claims Set MUST be an object');
        }
        this._payload = payload;
    }
    setIssuer(issuer) {
        this._payload = { ...this._payload, iss: issuer };
        return this;
    }
    setSubject(subject) {
        this._payload = { ...this._payload, sub: subject };
        return this;
    }
    setAudience(audience) {
        this._payload = { ...this._payload, aud: audience };
        return this;
    }
    setJti(jwtId) {
        this._payload = { ...this._payload, jti: jwtId };
        return this;
    }
    setNotBefore(input) {
        if (typeof input === 'number') {
            this._payload = { ...this._payload, nbf: input };
        }
        else {
            this._payload = { ...this._payload, nbf: (0,_lib_epoch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(new Date()) + (0,_lib_secs_js__WEBPACK_IMPORTED_MODULE_2__["default"])(input) };
        }
        return this;
    }
    setExpirationTime(input) {
        if (typeof input === 'number') {
            this._payload = { ...this._payload, exp: input };
        }
        else {
            this._payload = { ...this._payload, exp: (0,_lib_epoch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(new Date()) + (0,_lib_secs_js__WEBPACK_IMPORTED_MODULE_2__["default"])(input) };
        }
        return this;
    }
    setIssuedAt(input) {
        if (typeof input === 'undefined') {
            this._payload = { ...this._payload, iat: (0,_lib_epoch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(new Date()) };
        }
        else {
            this._payload = { ...this._payload, iat: input };
        }
        return this;
    }
}


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jwt/sign.js":
/*!*********************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/jwt/sign.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SignJWT": () => (/* binding */ SignJWT)
/* harmony export */ });
/* harmony import */ var _jws_compact_sign_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jws/compact/sign.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/compact/sign.js");
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/errors.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/util/errors.js");
/* harmony import */ var _lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/buffer_utils.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/buffer_utils.js");
/* harmony import */ var _produce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./produce.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jwt/produce.js");




class SignJWT extends _produce_js__WEBPACK_IMPORTED_MODULE_0__.ProduceJWT {
    setProtectedHeader(protectedHeader) {
        this._protectedHeader = protectedHeader;
        return this;
    }
    async sign(key, options) {
        var _a;
        const sig = new _jws_compact_sign_js__WEBPACK_IMPORTED_MODULE_1__.CompactSign(_lib_buffer_utils_js__WEBPACK_IMPORTED_MODULE_2__.encoder.encode(JSON.stringify(this._payload)));
        sig.setProtectedHeader(this._protectedHeader);
        if (Array.isArray((_a = this._protectedHeader) === null || _a === void 0 ? void 0 : _a.crit) &&
            this._protectedHeader.crit.includes('b64') &&
            this._protectedHeader.b64 === false) {
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_3__.JWTInvalid('JWTs MUST NOT use unencoded payload');
        }
        return sig.sign(key, options);
    }
}


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jwt/verify.js":
/*!***********************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/jwt/verify.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "jwtVerify": () => (/* binding */ jwtVerify)
/* harmony export */ });
/* harmony import */ var _jws_compact_verify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jws/compact/verify.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/jws/compact/verify.js");
/* harmony import */ var _lib_jwt_claims_set_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/jwt_claims_set.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/jwt_claims_set.js");
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/errors.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/util/errors.js");



async function jwtVerify(jwt, key, options) {
    var _a;
    const verified = await (0,_jws_compact_verify_js__WEBPACK_IMPORTED_MODULE_0__.compactVerify)(jwt, key, options);
    if (((_a = verified.protectedHeader.crit) === null || _a === void 0 ? void 0 : _a.includes('b64')) && verified.protectedHeader.b64 === false) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_1__.JWTInvalid('JWTs MUST NOT use unencoded payload');
    }
    const payload = (0,_lib_jwt_claims_set_js__WEBPACK_IMPORTED_MODULE_2__["default"])(verified.protectedHeader, verified.payload, options);
    const result = { payload, protectedHeader: verified.protectedHeader };
    if (typeof key === 'function') {
        return { ...result, key: verified.key };
    }
    return result;
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

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/epoch.js":
/*!**********************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/epoch.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((date) => Math.floor(date.getTime() / 1000));


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

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/jwt_claims_set.js":
/*!*******************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/jwt_claims_set.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/errors.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/util/errors.js");
/* harmony import */ var _buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buffer_utils.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/buffer_utils.js");
/* harmony import */ var _epoch_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./epoch.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/epoch.js");
/* harmony import */ var _secs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./secs.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/secs.js");
/* harmony import */ var _is_object_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./is_object.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/is_object.js");





const normalizeTyp = (value) => value.toLowerCase().replace(/^application\//, '');
const checkAudiencePresence = (audPayload, audOption) => {
    if (typeof audPayload === 'string') {
        return audOption.includes(audPayload);
    }
    if (Array.isArray(audPayload)) {
        return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
    }
    return false;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((protectedHeader, encodedPayload, options = {}) => {
    const { typ } = options;
    if (typ &&
        (typeof protectedHeader.typ !== 'string' ||
            normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTClaimValidationFailed('unexpected "typ" JWT header value', 'typ', 'check_failed');
    }
    let payload;
    try {
        payload = JSON.parse(_buffer_utils_js__WEBPACK_IMPORTED_MODULE_1__.decoder.decode(encodedPayload));
    }
    catch (_a) {
    }
    if (!(0,_is_object_js__WEBPACK_IMPORTED_MODULE_2__["default"])(payload)) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTInvalid('JWT Claims Set must be a top-level JSON object');
    }
    const { issuer } = options;
    if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTClaimValidationFailed('unexpected "iss" claim value', 'iss', 'check_failed');
    }
    const { subject } = options;
    if (subject && payload.sub !== subject) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTClaimValidationFailed('unexpected "sub" claim value', 'sub', 'check_failed');
    }
    const { audience } = options;
    if (audience &&
        !checkAudiencePresence(payload.aud, typeof audience === 'string' ? [audience] : audience)) {
        throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTClaimValidationFailed('unexpected "aud" claim value', 'aud', 'check_failed');
    }
    let tolerance;
    switch (typeof options.clockTolerance) {
        case 'string':
            tolerance = (0,_secs_js__WEBPACK_IMPORTED_MODULE_3__["default"])(options.clockTolerance);
            break;
        case 'number':
            tolerance = options.clockTolerance;
            break;
        case 'undefined':
            tolerance = 0;
            break;
        default:
            throw new TypeError('Invalid clockTolerance option type');
    }
    const { currentDate } = options;
    const now = (0,_epoch_js__WEBPACK_IMPORTED_MODULE_4__["default"])(currentDate || new Date());
    if (payload.iat !== undefined || options.maxTokenAge) {
        if (typeof payload.iat !== 'number') {
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTClaimValidationFailed('"iat" claim must be a number', 'iat', 'invalid');
        }
        if (payload.exp === undefined && payload.iat > now + tolerance) {
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', 'iat', 'check_failed');
        }
    }
    if (payload.nbf !== undefined) {
        if (typeof payload.nbf !== 'number') {
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTClaimValidationFailed('"nbf" claim must be a number', 'nbf', 'invalid');
        }
        if (payload.nbf > now + tolerance) {
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTClaimValidationFailed('"nbf" claim timestamp check failed', 'nbf', 'check_failed');
        }
    }
    if (payload.exp !== undefined) {
        if (typeof payload.exp !== 'number') {
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTClaimValidationFailed('"exp" claim must be a number', 'exp', 'invalid');
        }
        if (payload.exp <= now - tolerance) {
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTExpired('"exp" claim timestamp check failed', 'exp', 'check_failed');
        }
    }
    if (options.maxTokenAge) {
        const age = now - payload.iat;
        const max = typeof options.maxTokenAge === 'number' ? options.maxTokenAge : (0,_secs_js__WEBPACK_IMPORTED_MODULE_3__["default"])(options.maxTokenAge);
        if (age - tolerance > max) {
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTExpired('"iat" claim timestamp check failed (too far in the past)', 'iat', 'check_failed');
        }
        if (age < 0 - tolerance) {
            throw new _util_errors_js__WEBPACK_IMPORTED_MODULE_0__.JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', 'iat', 'check_failed');
        }
    }
    return payload;
});


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/secs.js":
/*!*********************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/secs.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const year = day * 365.25;
const REGEX = /^(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)$/i;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((str) => {
    const matched = REGEX.exec(str);
    if (!matched) {
        throw new TypeError('Invalid time period format');
    }
    const value = parseFloat(matched[1]);
    const unit = matched[2].toLowerCase();
    switch (unit) {
        case 'sec':
        case 'secs':
        case 'second':
        case 'seconds':
        case 's':
            return Math.round(value);
        case 'minute':
        case 'minutes':
        case 'min':
        case 'mins':
        case 'm':
            return Math.round(value * minute);
        case 'hour':
        case 'hours':
        case 'hr':
        case 'hrs':
        case 'h':
            return Math.round(value * hour);
        case 'day':
        case 'days':
        case 'd':
            return Math.round(value * day);
        case 'week':
        case 'weeks':
        case 'w':
            return Math.round(value * week);
        default:
            return Math.round(value * year);
    }
});


/***/ }),

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/validate_algorithms.js":
/*!************************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/lib/validate_algorithms.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const validateAlgorithms = (option, algorithms) => {
    if (algorithms !== undefined &&
        (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== 'string'))) {
        throw new TypeError(`"${option}" option must be an array of strings`);
    }
    if (!algorithms) {
        return undefined;
    }
    return new Set(algorithms);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validateAlgorithms);


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

/***/ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/verify.js":
/*!***************************************************************************************!*\
  !*** ../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/verify.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _subtle_dsa_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./subtle_dsa.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/subtle_dsa.js");
/* harmony import */ var _webcrypto_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./webcrypto.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/webcrypto.js");
/* harmony import */ var _check_key_length_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./check_key_length.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/check_key_length.js");
/* harmony import */ var _get_sign_verify_key_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get_sign_verify_key.js */ "../an-identity/node_modules/jose-browser-runtime/dist/browser/runtime/get_sign_verify_key.js");




const verify = async (alg, key, signature, data) => {
    const cryptoKey = await (0,_get_sign_verify_key_js__WEBPACK_IMPORTED_MODULE_0__["default"])(alg, key, 'verify');
    (0,_check_key_length_js__WEBPACK_IMPORTED_MODULE_1__["default"])(alg, cryptoKey);
    const algorithm = (0,_subtle_dsa_js__WEBPACK_IMPORTED_MODULE_2__["default"])(alg, cryptoKey.algorithm.namedCurve);
    try {
        return await _webcrypto_js__WEBPACK_IMPORTED_MODULE_3__["default"].subtle.verify(algorithm, cryptoKey, signature, data);
    }
    catch (_a) {
        return false;
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (verify);


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

  const jwt = await identity.signCapability({
    capabilities: { 'test.zombie.what.is.this': true },
    subject: identity.fullIdentity.id
  })
  console.log('@@-loader-@@ - jwt: ', jwt)
  console.log('@@-loader-@@ - jwt-validate: ', await _allnetp2p_an_identity__WEBPACK_IMPORTED_MODULE_1__.AnIdentity.validateJWT(jwt))

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxLQUFLLG9GQUFZO0FBQ2pCLE1BQU07QUFDTjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUMsaUJBQWlCO0FBQ2xCO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L2xpYi9hbi1pZGVudGl0eS5tanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2lkYi1rZXl2YWwvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2p3ay90aHVtYnByaW50LmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvandzL2NvbXBhY3Qvc2lnbi5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2p3cy9jb21wYWN0L3ZlcmlmeS5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2p3cy9mbGF0dGVuZWQvc2lnbi5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2p3cy9mbGF0dGVuZWQvdmVyaWZ5LmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvandzL2dlbmVyYWwvc2lnbi5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2p3cy9nZW5lcmFsL3ZlcmlmeS5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2p3dC9wcm9kdWNlLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvand0L3NpZ24uanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9qd3QvdmVyaWZ5LmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIva2V5L2V4cG9ydC5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2tleS9nZW5lcmF0ZV9rZXlfcGFpci5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2tleS9pbXBvcnQuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9saWIvYnVmZmVyX3V0aWxzLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvbGliL2NoZWNrX2tleV90eXBlLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvbGliL2NyeXB0b19rZXkuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9saWIvZXBvY2guanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9saWIvZm9ybWF0X3BlbS5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2xpYi9pbnZhbGlkX2tleV9pbnB1dC5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2xpYi9pc19kaXNqb2ludC5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2xpYi9pc19vYmplY3QuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9saWIvand0X2NsYWltc19zZXQuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9saWIvc2Vjcy5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL2xpYi92YWxpZGF0ZV9hbGdvcml0aG1zLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvbGliL3ZhbGlkYXRlX2NyaXQuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9ydW50aW1lL2FzbjEuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9ydW50aW1lL2Jhc2U2NHVybC5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL3J1bnRpbWUvY2hlY2tfa2V5X2xlbmd0aC5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL3J1bnRpbWUvZGlnZXN0LmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvcnVudGltZS9nZW5lcmF0ZS5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL3J1bnRpbWUvZ2V0X3NpZ25fdmVyaWZ5X2tleS5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL3J1bnRpbWUvZ2xvYmFsLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvcnVudGltZS9pc19rZXlfbGlrZS5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL3J1bnRpbWUvandrX3RvX2tleS5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL3J1bnRpbWUva2V5X3RvX2p3ay5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL3J1bnRpbWUvcmFuZG9tLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvcnVudGltZS9zaWduLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvcnVudGltZS9zdWJ0bGVfZHNhLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvcnVudGltZS92ZXJpZnkuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL2pvc2UtYnJvd3Nlci1ydW50aW1lL2Rpc3QvYnJvd3Nlci9ydW50aW1lL3dlYmNyeXB0by5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uLi9hbi1pZGVudGl0eS9ub2RlX21vZHVsZXMvam9zZS1icm93c2VyLXJ1bnRpbWUvZGlzdC9icm93c2VyL3V0aWwvYmFzZTY0dXJsLmpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyLy4uL2FuLWlkZW50aXR5L25vZGVfbW9kdWxlcy9qb3NlLWJyb3dzZXItcnVudGltZS9kaXN0L2Jyb3dzZXIvdXRpbC9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvLi4vYW4taWRlbnRpdHkvbm9kZV9tb2R1bGVzL3NhZmFyaS0xNC1pZGItZml4L2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tbG9hZGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1sb2FkZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWxvYWRlci8uL2xpYi9hbi1sb2FkZXIubWpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGJhc2U2NHVybCxcbiAgY2FsY3VsYXRlSndrVGh1bWJwcmludCxcbiAgLy8gZGVjb2RlUHJvdGVjdGVkSGVhZGVyLFxuICBleHBvcnRKV0ssXG4gIEdlbmVyYWxTaWduLFxuICBnZW5lcmFsVmVyaWZ5LFxuICBnZW5lcmF0ZUtleVBhaXIsXG4gIGltcG9ydEpXSyxcbiAgand0VmVyaWZ5LFxuICBTaWduSldUXG59IGZyb20gJ2pvc2UtYnJvd3Nlci1ydW50aW1lJ1xuaW1wb3J0ICogYXMgaWRiS3YgZnJvbSAnaWRiLWtleXZhbCdcblxuLyoqXG4gKiBBbklkZW50aXR5IEFsZ29yaXRobSBUdW5pbmcuXG4gKiBJZiB5b3UncmUgbm90IHN1cmUgd2hhdCB5b3UncmUgZG9pbmcsIGp1c3QgY3JlYXRlIGEgZGVmYXVsdCBjb25maWcuXG4gKi9cbmV4cG9ydCBjbGFzcyBBbklkZW50aXR5Q29uZmlnIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIC8vIGp3cyBhbGcgYXJyYXlcbiAgICB0aGlzLnNpZ25hdHVyZUFsZ0xpc3QgPSBbJ0VTMzg0J11cblxuICAgIC8vIGp3ZSBhbGc6ZW5jIGFycmF5XG4gICAgdGhpcy5lbmNyeXB0aW9uQWxnTGlzdCA9IFsnRUNESC1FUzpBMjU2R0NNJ11cblxuICAgIC8vIGNyeXB0by5zdWJ0bGUgZGVyaXZlS2V5IGFsZyArIGNvbG9uIGRlbGltaXRlZCBjb25maWdcbiAgICB0aGlzLnBhc3NwaHJhc2VTZWNyZXRBbGcgPSAnUEJLREYyOlNIQS01MTI6MjAwMDAwJ1xuXG4gICAgLy8gY3J5cHRvLnN1YnRsZSB3cmFwS2V5IGFsZyArIGNvbG9uIGRlbGltaXRlZCBjb25maWdcbiAgICB0aGlzLnBhc3NwaHJhc2VTeW1BbGcgPSAnQUVTLUdDTToyNTYnXG5cbiAgICAvLyBtaWNyb3NlY29uZHMgaW4gdGhlIGZ1dHVyZSB0byBzZXQgbmV3IGlkZW50aXR5IGV4cGlyYXRpb25zXG4gICAgdGhpcy5leHBpcmVBZnRlckNvdW50TWljcm9zID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJcblxuICAgIC8vIGZ1bmN0aW9uIHJldHVybmluZyBQcm9taXNlPENyeXB0b0tleT4gbWFya2VkIHdpdGggZGVyaXZlS2V5XG4gICAgdGhpcy5wYXNzcGhyYXNlR2V0Q2IgPSBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwYXNzcGhyYXNlID0gd2luZG93LnByb21wdCgnRW50ZXIgeW91ciBwYXNzcGhyYXNlIC0gdGhpcyBpcyB0aGUgZGVmYXVsdCBERVYgcGFzc3dvcmQgZmV0Y2hlciB1c2luZyB3aW5kb3cucHJvbXB0Li4uIHRoZXJlIGlzIG5vIHdheSB0byBvYnNjdXJlIHRoZSBlbnRlcmVkIHBhc3NwaHJhc2UsIHlvdSBzaG91bGQgTk9UIHVzZSB0aGlzIGluIFBST0RVQ1RJT04hIE9uY2UgdGhpcyBpcyBtYXNrZWQsIHdlIGhpZ2hseSByZWNvbW1lbmQgdXNpbmcgYSBwYXNzd29yZCBtYW5hZ2VyIHRvIG1hbmFnZSB0aGlzIHBhc3NwaHJhc2UuJywgJycpXG4gICAgICBjb25zdCBwYXNzcGhyYXNlUmF3ID0gKG5ldyBUZXh0RW5jb2RlcigpKS5lbmNvZGUocGFzc3BocmFzZSlcbiAgICAgIGNvbnN0IHBhc3NwaHJhc2VLZXkgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmltcG9ydEtleShcbiAgICAgICAgJ3JhdycsXG4gICAgICAgIHBhc3NwaHJhc2VSYXcuYnVmZmVyLFxuICAgICAgICAnUEJLREYyJyxcbiAgICAgICAgZmFsc2UsXG4gICAgICAgIFsnZGVyaXZlS2V5J11cbiAgICAgIClcbiAgICAgIHJldHVybiBwYXNzcGhyYXNlS2V5XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUHJvdmlkZXMgYWxsbmV0IHN5c3RlbSBKV0sgSldTIEpXRSBKV1QgZnVuY3Rpb25hbGl0eS5cbiAqL1xuZXhwb3J0IGNsYXNzIEFuSWRlbnRpdHkge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGlkZW50aXR5LiBVc2UgdGhlIGFzeW5jIGNvbnN0cnVjdG9yIGNyZWF0ZUFuSWRlbnRpdHkuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoZnVsbElkZW50aXR5LCBwdWJJZGVudGl0eSkge1xuICAgIHRoaXMuZnVsbElkZW50aXR5ID0gZnVsbElkZW50aXR5XG4gICAgdGhpcy5wdWJJZGVudGl0eSA9IHB1YklkZW50aXR5XG4gIH1cblxuICAvKipcbiAgICogQXN5bmMgY29uc3RydWN0b3IgLSBDcmVhdGUgYSBuZXcgaWRlbnRpdHkuXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGdldFBhc3NwaHJhc2VDYiBzaG91bGQgcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzXG4gICAqICAgICAgICAgICAgICAgICAgIHRvIGEgcGFzc3BocmFzZSBhcyBhIENyeXB0b0tleVxuICAgKi9cbiAgc3RhdGljIGFzeW5jIGNyZWF0ZUFuSWRlbnRpdHkgKGNvbmZpZykge1xuICAgIGNvbnN0IHBhc3NwaHJhc2VLZXkgPSBhd2FpdCBjb25maWcucGFzc3BocmFzZUdldENiKClcblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgX2xvYWRJZGVudChwYXNzcGhyYXNlS2V5KVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2ZhaWxkIHRvIGxvYWQgaWRlbnRpdHksIGdlbmVyYXRpbmcgbmV3Li4uJywgZSlcbiAgICAgIHJldHVybiBhd2FpdCBfZ2VuSWRlbnQoY29uZmlnLCBwYXNzcGhyYXNlS2V5KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSBhIHB1YmxpYyBpZGVudGl0eS5cbiAgICogVGhpcyBvbmx5IGNoZWNrcyB0aGUgY29uc3RydWN0aW9uIG9mIHRoZSBvYmplY3QgYW5kIHRoZSBzZWxmLXNpZ25pbmcsXG4gICAqIHlvdSBzaG91bGQgc3RpbGwgZGVjaWRlIGlmIHlvdSB3YW50IHRvIHRydXN0IGl0LlxuICAgKlxuICAgKiBXaWxsIHRocm93IGFuIGVycm9yIG9uIGludmFsaWQgaWRlbnRpdHksIHJldHVybnMgdW5kZWZpbmVkIG9uIHN1Y2Nlc3MuXG4gICAqL1xuICBzdGF0aWMgYXN5bmMgdmFsaWRhdGVQdWJsaWNJZGVudGl0eSAocHViSWRlbnRpdHkpIHtcbiAgICAvLyBGSVhNRSB0aGlzIGlzIGp1c3QgYSBzdHViIHRoYXQgZG9lcyBhIHJhdyBzaWduYXR1cmUgdmFsaWRhdGlvblxuICAgIC8vICAgICAgIHdlIG5lZWQgdG8gYWxzbyBjaGVjayBhbGwgdGhlIGhhc2hlcywgZXRjXG4gICAgZm9yIChjb25zdCBzaWcgb2YgcHViSWRlbnRpdHkuc2lnKSB7XG4gICAgICBjb25zdCBwdWJLZXkgPSBhd2FpdCBpbXBvcnRKV0soc2lnLmp3aywgc2lnLmFsZylcblxuICAgICAgLy8gd2lsbCB0aHJvdyBvbiBmYWlsZWQgdmFsaWRhdGlvblxuICAgICAgYXdhaXQgZ2VuZXJhbFZlcmlmeShwdWJJZGVudGl0eS5qd3MsIHB1YktleSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGUgYW5kIHJlZ2lzdGVyIGEgcHVibGljIGlkZW50aXR5LlxuICAgKiBPbmNlIGFuIGlkZW50aXR5IGlzIHJlZ2lzdGVyZWQsIGl0IGNhbiBiZSB1c2VkIHRvOlxuICAgKiAgLSBzZW5kIGVuY3J5cHRlZCBtZXNzYWdlc1xuICAgKiAgLSB2YWxpZGF0ZSBKV1QgY2xhaW1zXG4gICAqL1xuICBzdGF0aWMgYXN5bmMgdmFsaWRhdGVBbmRSZWdpc3RlclB1YmxpY0lkZW50aXR5IChwdWJsaWNJZGVudGl0eSkge1xuICAgIGF3YWl0IEFuSWRlbnRpdHkudmFsaWRhdGVQdWJsaWNJZGVudGl0eShwdWJsaWNJZGVudGl0eSlcbiAgICBhd2FpdCBpZGJLdi5zZXQoJ2FuSWRQdWI6JyArIHB1YmxpY0lkZW50aXR5LmlkLCBwdWJsaWNJZGVudGl0eSlcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZnkgYSBKVFcgY2xhaW0uXG4gICAqIFRoaXMgY2hlY2tzIHRoZSBzaWduYXR1cmUsIGFuZCByYXcgZGF0YSB2YWxpZGF0aW9uLFxuICAgKiByZXR1cm5pbmcgdGhlIGNsYWltIGRhdGEuIFlvdSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGUgY2xhaW0gZGF0YSBpcyBjb3JyZWN0LlxuICAgKi9cbiAgc3RhdGljIGFzeW5jIHZhbGlkYXRlSldUIChqd3RMaXN0KSB7XG4gICAgY29uc3QgY29udGVudCA9IEpTT04ucGFyc2UoKG5ldyBUZXh0RGVjb2RlcigpKS5kZWNvZGUoXG4gICAgICBiYXNlNjR1cmwuZGVjb2RlKGp3dExpc3RbMF0uc3BsaXQoJy4nKVsxXSlcbiAgICApKVxuXG4gICAgY29uc3QgaXNzID0gYXdhaXQgaWRiS3YuZ2V0KCdhbklkUHViOicgKyBjb250ZW50LmlzcylcbiAgICBjb25zdCBwdWJLZXkgPSBhd2FpdCBpbXBvcnRKV0soaXNzLnNpZ1swXS5qd2ssIGlzcy5zaWdbMF0uYWxnKVxuXG4gICAgZm9yIChjb25zdCBqd3Qgb2Ygand0TGlzdCkge1xuICAgICAgYXdhaXQgand0VmVyaWZ5KGp3dCwgcHViS2V5LCB7XG4gICAgICAgIGlzc3VlcjogY29udGVudC5pc3MsXG4gICAgICAgIHN1YmplY3Q6IGNvbnRlbnQuc3ViXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiBjb250ZW50XG4gIH1cblxuICAvLyAtLSBtZXRob2RzIHJlcXVpcmluZyBmdWxsIHByaXZhdGUga2V5IGFjY2VzcyAtLSAvL1xuXG4gIC8qKlxuICAgKi9cbiAgYXN5bmMgc2lnbkNhcGFiaWxpdHkgKG9wdHMpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fVxuICAgIG9wdHMuZXhwaXJhdGlvbiA9IG9wdHMuZXhwaXJhdGlvbiB8fCAnMWRheSdcbiAgICBvcHRzLmNhcGFiaWxpdGllcyA9IG9wdHMuY2FwYWJpbGl0aWVzIHx8IHt9XG5cbiAgICBjb25zdCBvdXQgPSBbXVxuXG4gICAgZm9yIChjb25zdCBzaWcgb2YgdGhpcy5mdWxsSWRlbnRpdHkuc2lnKSB7XG4gICAgICBjb25zdCBqd3QgPSBuZXcgU2lnbkpXVChvcHRzLmNhcGFiaWxpdGllcylcbiAgICAgIGp3dC5zZXRQcm90ZWN0ZWRIZWFkZXIoeyBhbGc6IHNpZy5hbGcgfSlcbiAgICAgIGp3dC5zZXRFeHBpcmF0aW9uVGltZShvcHRzLmV4cGlyYXRpb24pXG4gICAgICBqd3Quc2V0SXNzdWVyKHRoaXMuZnVsbElkZW50aXR5LmlkKVxuICAgICAgaWYgKG9wdHMuc3ViamVjdCkge1xuICAgICAgICBqd3Quc2V0U3ViamVjdChvcHRzLnN1YmplY3QpXG4gICAgICB9XG4gICAgICBvdXQucHVzaChhd2FpdCBqd3Quc2lnbihzaWcuX3ByaXYucHJpdmF0ZUtleSkpXG4gICAgfVxuXG4gICAgcmV0dXJuIG91dFxuICB9XG59XG5cbi8vIC0tIGhlbHBlcnMgLS0gLy9cblxuYXN5bmMgZnVuY3Rpb24gX2xvYWRJZGVudCAocGFzc3BocmFzZUtleSkge1xuICBjb25zdCBhY3RpdmVJZCA9IGF3YWl0IGlkYkt2LmdldCgnYW5JZEFjdGl2ZTonKVxuXG4gIGNvbnNvbGUubG9nKCdhY3RpdmVJZCcsIGFjdGl2ZUlkKVxuXG4gIGNvbnN0IHNhdmVJZGVudGl0eSA9IGF3YWl0IGlkYkt2LmdldCgnYW5JZFByaXY6JyArIGFjdGl2ZUlkKVxuXG4gIGNvbnNvbGUubG9nKCdsb2FkZWQgc2F2ZUlkZW50aXR5Jywgc2F2ZUlkZW50aXR5KVxuXG4gIGNvbnN0IGRlY3J5cHRDb250ZXh0ID0ge31cblxuICBmb3IgKGNvbnN0IGVuYyBvZiBzYXZlSWRlbnRpdHkuZW5jKSB7XG4gICAgZW5jLl9wcml2ID0gYXdhaXQgX2RlY3J5cHRQcml2KGVuYywgZGVjcnlwdENvbnRleHQsIHBhc3NwaHJhc2VLZXkpXG4gICAgZGVsZXRlIGVuYy5lbmNyeXB0ZWRQcml2YXRlS2V5XG4gIH1cblxuICBmb3IgKGNvbnN0IHNpZyBvZiBzYXZlSWRlbnRpdHkuc2lnKSB7XG4gICAgc2lnLl9wcml2ID0gYXdhaXQgX2RlY3J5cHRQcml2KHNpZywgZGVjcnlwdENvbnRleHQsIHBhc3NwaHJhc2VLZXkpXG4gICAgZGVsZXRlIHNpZy5lbmNyeXB0ZWRQcml2YXRlS2V5XG4gIH1cblxuICBjb25zdCBmdWxsSWRlbnRpdHkgPSBzYXZlSWRlbnRpdHlcblxuICBjb25zb2xlLmxvZygnbG9hZGVkIGZ1bGxJZGVudGl0eScsIGZ1bGxJZGVudGl0eSlcblxuICBjb25zdCBwdWJJZGVudGl0eSA9IHtcbiAgICBleHBpcmVzQXRVdGNNaWNyb3M6IGZ1bGxJZGVudGl0eS5leHBpcmVzQXRVdGNNaWNyb3MsXG4gICAgaWQ6IGZ1bGxJZGVudGl0eS5pZCxcbiAgICBqd3M6IGZ1bGxJZGVudGl0eS5qd3MsXG4gICAgZW5jOiBbXSxcbiAgICBzaWc6IFtdXG4gIH1cblxuICBmb3IgKGNvbnN0IGVuYyBvZiBmdWxsSWRlbnRpdHkuZW5jKSB7XG4gICAgcHViSWRlbnRpdHkuZW5jLnB1c2goe1xuICAgICAgYWxnOiBlbmMuYWxnLFxuICAgICAgZW5jOiBlbmMuZW5jLFxuICAgICAgaWQ6IGVuYy5pZCxcbiAgICAgIGp3azogZW5jLmp3a1xuICAgIH0pXG4gIH1cblxuICBmb3IgKGNvbnN0IHNpZyBvZiBmdWxsSWRlbnRpdHkuc2lnKSB7XG4gICAgcHViSWRlbnRpdHkuc2lnLnB1c2goe1xuICAgICAgYWxnOiBzaWcuYWxnLFxuICAgICAgaWQ6IHNpZy5pZCxcbiAgICAgIGp3azogc2lnLmp3a1xuICAgIH0pXG4gIH1cblxuICBjb25zb2xlLmxvZygnbG9hZGVkIHB1YklkZW50aXR5JywgcHViSWRlbnRpdHkpXG5cbiAgcmV0dXJuIG5ldyBBbklkZW50aXR5KGZ1bGxJZGVudGl0eSwgcHViSWRlbnRpdHkpXG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9kZWNyeXB0UHJpdiAoaXRlbSwgY3R4LCBwYXNzcGhyYXNlS2V5KSB7XG4gIGNvbnN0IG91dEFsZyA9IGl0ZW0uYWxnXG4gIGNvbnN0IGVuYyA9IGl0ZW0uZW5jcnlwdGVkUHJpdmF0ZUtleVxuICBpZiAoIWVuYy5wYXNzcGhyYXNlU2VjcmV0QWxnIHx8ICFlbmMucGFzc3BocmFzZVNlY3JldEFsZy5zdGFydHNXaXRoKCdQQktERjI6JykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2JhZCBzZWNyZXQgYWxnJylcbiAgfVxuICBpZiAoIWVuYy5wYXNzcGhyYXNlU3ltQWxnIHx8ICFlbmMucGFzc3BocmFzZVN5bUFsZy5zdGFydHNXaXRoKCdBRVMtR0NNOicpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdiYWQgc3ltIGFsZycpXG4gIH1cblxuICBjb25zdCBhbGdQYXJ0cyA9IGVuYy5wYXNzcGhyYXNlU2VjcmV0QWxnLnNwbGl0KCc6JylcbiAgY29uc3QgaGFzaCA9IGFsZ1BhcnRzWzFdXG4gIGNvbnN0IGl0ZXJzID0gcGFyc2VJbnQoYWxnUGFydHNbMl0sIDEwKVxuICBjb25zdCBbYWxnLCBsZW5ndGhdID0gZW5jLnBhc3NwaHJhc2VTeW1BbGcuc3BsaXQoJzonKVxuXG4gIGlmICghY3R4LnNhbHQgfHwgY3R4LnNhbHQgIT09IGVuYy5wYXNzcGhyYXNlU2VjcmV0T3B0cy5zYWx0KSB7XG4gICAgY29uc29sZS5sb2coJ3JlZ2VuZXJhdGUgc2VjcmV0IGtleS4uLicpXG5cbiAgICBjdHguc2FsdCA9IGVuYy5wYXNzcGhyYXNlU2VjcmV0T3B0cy5zYWx0XG4gICAgY3R4LnNhbHRCeXRlcyA9IGJhc2U2NHVybC5kZWNvZGUoY3R4LnNhbHQpXG4gICAgY3R4LnNlY3JldEtleSA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuZGVyaXZlS2V5KFxuICAgICAge1xuICAgICAgICBuYW1lOiAnUEJLREYyJyxcbiAgICAgICAgaGFzaCxcbiAgICAgICAgc2FsdDogY3R4LnNhbHRCeXRlcyxcbiAgICAgICAgaXRlcmF0aW9uczogaXRlcnNcbiAgICAgIH0sXG4gICAgICBwYXNzcGhyYXNlS2V5LFxuICAgICAge1xuICAgICAgICBuYW1lOiBhbGcsXG4gICAgICAgIGxlbmd0aDogcGFyc2VJbnQobGVuZ3RoLCAxMClcbiAgICAgIH0sXG4gICAgICBmYWxzZSxcbiAgICAgIFsndW53cmFwS2V5J11cbiAgICApXG4gIH1cblxuICBjb25zb2xlLmxvZygnY3R4LnNlY3JldEtleScsIGN0eC5zZWNyZXRLZXkpXG5cbiAgbGV0IGRlY0tleUFsZyA9IG51bGxcbiAgbGV0IG5hbWVkQ3VydmUgPSBudWxsXG4gIGxldCBjYXAgPSBudWxsXG4gIGlmIChvdXRBbGcgPT09ICdFQ0RILUVTJykge1xuICAgIGRlY0tleUFsZyA9ICdFQ0RIJ1xuICAgIG5hbWVkQ3VydmUgPSAnUC0yNTYnXG4gICAgY2FwID0gWydkZXJpdmVLZXknLCAnZGVyaXZlQml0cyddXG4gIH0gZWxzZSBpZiAob3V0QWxnID09PSAnRVMzODQnKSB7XG4gICAgZGVjS2V5QWxnID0gJ0VDRFNBJ1xuICAgIG5hbWVkQ3VydmUgPSAnUC0zODQnXG4gICAgY2FwID0gWydzaWduJ11cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIHByaXYga2V5IGFsZzogXCInICsgb3V0QWxnICsgJ1wiJylcbiAgfVxuXG4gIGNvbnN0IHByaXZhdGVLZXkgPSBhd2FpdCBjcnlwdG8uc3VidGxlLnVud3JhcEtleShcbiAgICAnandrJyxcbiAgICBiYXNlNjR1cmwuZGVjb2RlKGVuYy5wcml2YXRlS2V5KSxcbiAgICBjdHguc2VjcmV0S2V5LFxuICAgIHtcbiAgICAgIG5hbWU6ICdBRVMtR0NNJyxcbiAgICAgIGl2OiBiYXNlNjR1cmwuZGVjb2RlKGVuYy5wYXNzcGhyYXNlU3ltT3B0cy5pdiksXG4gICAgICB0YWdMZW5ndGg6IDEyOFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogZGVjS2V5QWxnLFxuICAgICAgbmFtZWRDdXJ2ZVxuICAgIH0sXG4gICAgdHJ1ZSxcbiAgICBjYXBcbiAgKVxuXG4gIGNvbnNvbGUubG9nKCdFWFRSQUNURUQgUFJJViBLRVkhITonLCBwcml2YXRlS2V5KVxuXG4gIGNvbnN0IHB1YmxpY0tleSA9IGF3YWl0IGltcG9ydEpXSyhpdGVtLmp3aywgaXRlbS5hbGcpXG5cbiAgY29uc29sZS5sb2coJ3B1YiBrZXk6ICcsIHB1YmxpY0tleSlcblxuICByZXR1cm4ge1xuICAgIGVuY3J5cHRlZFByaXZhdGVLZXk6IGl0ZW0uZW5jcnlwdGVkUHJpdmF0ZUtleSxcbiAgICBwcml2YXRlS2V5LFxuICAgIHB1YmxpY0tleVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9nZW5JZGVudCAoY29uZmlnLCBwYXNzcGhyYXNlS2V5KSB7XG4gIGlmIChjb25maWcucGFzc3BocmFzZVNlY3JldEFsZy5zdGFydHNXaXRoKCdQQktERjI6JykpIHtcbiAgICBjb25zdCBhbGdQYXJ0cyA9IGNvbmZpZy5wYXNzcGhyYXNlU2VjcmV0QWxnLnNwbGl0KCc6JylcbiAgICBjb25zdCBoYXNoID0gYWxnUGFydHNbMV1cbiAgICBjb25zdCBpdGVycyA9IHBhcnNlSW50KGFsZ1BhcnRzWzJdLCAxMClcblxuICAgIGxldCBlbmNyeXB0UHJpdktleSA9IG51bGxcblxuICAgIGlmIChjb25maWcucGFzc3BocmFzZVN5bUFsZy5zdGFydHNXaXRoKCdBRVMtR0NNOicpKSB7XG4gICAgICBjb25zdCBbYWxnLCBsZW5ndGhdID0gY29uZmlnLnBhc3NwaHJhc2VTeW1BbGcuc3BsaXQoJzonKVxuXG4gICAgICBjb25zdCBwYmtkZjJTYWx0ID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgyNCkpXG4gICAgICBjb25zdCBzZWNyZXRLZXkgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmRlcml2ZUtleShcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdQQktERjInLFxuICAgICAgICAgIGhhc2gsXG4gICAgICAgICAgc2FsdDogcGJrZGYyU2FsdCxcbiAgICAgICAgICBpdGVyYXRpb25zOiBpdGVyc1xuICAgICAgICB9LFxuICAgICAgICBwYXNzcGhyYXNlS2V5LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogYWxnLFxuICAgICAgICAgIGxlbmd0aDogcGFyc2VJbnQobGVuZ3RoLCAxMClcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2UsXG4gICAgICAgIFsnd3JhcEtleSddXG4gICAgICApXG5cbiAgICAgIC8vIGpvc2UvancqIHRvb2xzIGRvbid0IGhhdmUgYW55IHN1cHBvcnQgZm9yIHBhc3N3b3JkIGhhc2hpbmdcbiAgICAgIC8vIG5vciB0aGUgYWJpbGl0eSB0byBlbmNyeXB0IHByaXZhdGUga2V5cyB3aXRob3V0IGV4cG9zaW5nXG4gICAgICAvLyB0aGVtIHRvIHVuc2FmZSBqYXZhc2NyaXB0IHJ1bnRpbWUgbWVtb3J5LCBzbyB3ZSdsbFxuICAgICAgLy8gdXNlIGNyeXB0by5zdWJ0bGUgZGlyZWN0bHkgZm9yIHBlcnNpc3RpbmcgdGhlIHByaXZhdGUga2V5cy5cbiAgICAgIGVuY3J5cHRQcml2S2V5ID0gYXN5bmMgcHJpdmF0ZUtleSA9PiB7XG4gICAgICAgIGNvbnN0IGFlc0djbUl2ID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgyNCkpXG4gICAgICAgIGNvbnN0IHNhdmVQcml2S2V5ID0gYXdhaXQgY3J5cHRvLnN1YnRsZS53cmFwS2V5KFxuICAgICAgICAgICdqd2snLFxuICAgICAgICAgIHByaXZhdGVLZXksXG4gICAgICAgICAgc2VjcmV0S2V5LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IGFsZyxcbiAgICAgICAgICAgIGl2OiBhZXNHY21JdixcbiAgICAgICAgICAgIHRhZ0xlbmd0aDogMTI4XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcGFzc3BocmFzZVNlY3JldEFsZzogY29uZmlnLnBhc3NwaHJhc2VTZWNyZXRBbGcsXG4gICAgICAgICAgcGFzc3BocmFzZVNlY3JldE9wdHM6IHtcbiAgICAgICAgICAgIHNhbHQ6IGJhc2U2NHVybC5lbmNvZGUocGJrZGYyU2FsdClcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBhc3NwaHJhc2VTeW1BbGc6IGNvbmZpZy5wYXNzcGhyYXNlU3ltQWxnLFxuICAgICAgICAgIHBhc3NwaHJhc2VTeW1PcHRzOiB7XG4gICAgICAgICAgICBpdjogYmFzZTY0dXJsLmVuY29kZShhZXNHY21JdilcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByaXZhdGVLZXk6IGJhc2U2NHVybC5lbmNvZGUobmV3IFVpbnQ4QXJyYXkoc2F2ZVByaXZLZXkpKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndW5zdXBwb3J0ZWQgcGFzc3BocmFzZVN5bUFsZzogXCInICsgY29uZmlnLnBhc3NwaHJhc2VTeW1BbGcgKyAnXCInKVxuICAgIH1cblxuICAgIGxldCBleHBpcmVzQXRVdGNNaWNyb3MgPSBEYXRlLm5vdygpICogMTAwMCArIGNvbmZpZy5leHBpcmVBZnRlckNvdW50TWljcm9zXG4gICAgaWYgKGV4cGlyZXNBdFV0Y01pY3JvcyA+IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKSB7XG4gICAgICBleHBpcmVzQXRVdGNNaWNyb3MgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxuICAgIH1cblxuICAgIGNvbnN0IGZ1bGxJZGVudGl0eSA9IHtcbiAgICAgIGV4cGlyZXNBdFV0Y01pY3JvcyxcbiAgICAgIGVuYzogW10sXG4gICAgICBzaWc6IFtdXG4gICAgfVxuXG4gICAgY29uc3QgcHViSWRlbnRpdHkgPSB7XG4gICAgICBleHBpcmVzQXRVdGNNaWNyb3MsXG4gICAgICBlbmM6IFtdLFxuICAgICAgc2lnOiBbXVxuICAgIH1cblxuICAgIGNvbnN0IHNhdmVJZGVudGl0eSA9IHtcbiAgICAgIGV4cGlyZXNBdFV0Y01pY3JvcyxcbiAgICAgIGVuYzogW10sXG4gICAgICBzaWc6IFtdXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBlbmNEZWYgb2YgY29uZmlnLmVuY3J5cHRpb25BbGdMaXN0KSB7XG4gICAgICBjb25zdCBbYWxnLCBlbmNdID0gZW5jRGVmLnNwbGl0KCc6JylcbiAgICAgIGNvbnN0IHBhaXIgPSBhd2FpdCBnZW5lcmF0ZUtleVBhaXIoYWxnLCB7IGV4dHJhY3RhYmxlOiB0cnVlIH0pXG5cbiAgICAgIGNvbnN0IHB1YmxpY0tleUp3ayA9IGF3YWl0IGV4cG9ydEpXSyhwYWlyLnB1YmxpY0tleSlcbiAgICAgIGNvbnN0IHB1YmxpY1RodW1icHJpbnQgPSBhd2FpdCBjYWxjdWxhdGVKd2tUaHVtYnByaW50KHB1YmxpY0tleUp3aywgJ3NoYTI1NicpXG4gICAgICBjb25zdCBlbmNyeXB0ZWRQcml2YXRlS2V5ID0gYXdhaXQgZW5jcnlwdFByaXZLZXkocGFpci5wcml2YXRlS2V5KVxuXG4gICAgICBmdWxsSWRlbnRpdHkuZW5jLnB1c2goe1xuICAgICAgICBhbGcsXG4gICAgICAgIGVuYyxcbiAgICAgICAgandrOiBwdWJsaWNLZXlKd2ssXG4gICAgICAgIGlkOiBwdWJsaWNUaHVtYnByaW50LFxuICAgICAgICBfcHJpdjoge1xuICAgICAgICAgIHB1YmxpY0tleTogcGFpci5wdWJsaWNLZXksXG4gICAgICAgICAgcHJpdmF0ZUtleTogcGFpci5wcml2YXRlS2V5LFxuICAgICAgICAgIGVuY3J5cHRlZFByaXZhdGVLZXlcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgcHViSWRlbnRpdHkuZW5jLnB1c2goe1xuICAgICAgICBhbGcsXG4gICAgICAgIGVuYyxcbiAgICAgICAgandrOiBwdWJsaWNLZXlKd2ssXG4gICAgICAgIGlkOiBwdWJsaWNUaHVtYnByaW50XG4gICAgICB9KVxuXG4gICAgICBzYXZlSWRlbnRpdHkuZW5jLnB1c2goe1xuICAgICAgICBhbGcsXG4gICAgICAgIGVuYyxcbiAgICAgICAgandrOiBwdWJsaWNLZXlKd2ssXG4gICAgICAgIGlkOiBwdWJsaWNUaHVtYnByaW50LFxuICAgICAgICBlbmNyeXB0ZWRQcml2YXRlS2V5XG4gICAgICB9KVxuICAgIH1cblxuICAgIGZvciAoY29uc3Qgc2lnQWxnIG9mIGNvbmZpZy5zaWduYXR1cmVBbGdMaXN0KSB7XG4gICAgICBjb25zdCBwYWlyID0gYXdhaXQgZ2VuZXJhdGVLZXlQYWlyKHNpZ0FsZywgeyBleHRyYWN0YWJsZTogdHJ1ZSB9KVxuXG4gICAgICBjb25zdCBwdWJsaWNLZXlKd2sgPSBhd2FpdCBleHBvcnRKV0socGFpci5wdWJsaWNLZXkpXG4gICAgICBjb25zdCBwdWJsaWNUaHVtYnByaW50ID0gYXdhaXQgY2FsY3VsYXRlSndrVGh1bWJwcmludChwdWJsaWNLZXlKd2ssICdzaGEyNTYnKVxuICAgICAgY29uc3QgZW5jcnlwdGVkUHJpdmF0ZUtleSA9IGF3YWl0IGVuY3J5cHRQcml2S2V5KHBhaXIucHJpdmF0ZUtleSlcblxuICAgICAgZnVsbElkZW50aXR5LnNpZy5wdXNoKHtcbiAgICAgICAgYWxnOiBzaWdBbGcsXG4gICAgICAgIGp3azogcHVibGljS2V5SndrLFxuICAgICAgICBpZDogcHVibGljVGh1bWJwcmludCxcbiAgICAgICAgX3ByaXY6IHtcbiAgICAgICAgICBwdWJsaWNLZXk6IHBhaXIucHVibGljS2V5LFxuICAgICAgICAgIHByaXZhdGVLZXk6IHBhaXIucHJpdmF0ZUtleSxcbiAgICAgICAgICBlbmNyeXB0ZWRQcml2YXRlS2V5XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIHB1YklkZW50aXR5LnNpZy5wdXNoKHtcbiAgICAgICAgYWxnOiBzaWdBbGcsXG4gICAgICAgIGp3azogcHVibGljS2V5SndrLFxuICAgICAgICBpZDogcHVibGljVGh1bWJwcmludFxuICAgICAgfSlcblxuICAgICAgc2F2ZUlkZW50aXR5LnNpZy5wdXNoKHtcbiAgICAgICAgYWxnOiBzaWdBbGcsXG4gICAgICAgIGp3azogcHVibGljS2V5SndrLFxuICAgICAgICBpZDogcHVibGljVGh1bWJwcmludCxcbiAgICAgICAgZW5jcnlwdGVkUHJpdmF0ZUtleVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyB0aGUgcGF5bG9hZCBmb3IgdGhlIHNpZ25hdHVyZXMgaXM6XG4gICAgLy8gLSA4IGJ5dGVzIGk2NExFIHV0YyBtcyBleHBpcmF0aW9uXG4gICAgLy8gLSBbZW5jW05dLmlkLCAuLl1cbiAgICAvLyAtIFtzaWdbTl0uaWQsIC4uXVxuICAgIGNvbnN0IHNpZ0J5dGVzID0gW11cblxuICAgIGNvbnN0IGV4cGlyZXNBdEJ5dGVzID0gbmV3IEFycmF5QnVmZmVyKDgpXG4gICAgY29uc3QgZHYgPSBuZXcgRGF0YVZpZXcoZXhwaXJlc0F0Qnl0ZXMpXG4gICAgZHYuc2V0QmlnSW50NjQoMCwgQmlnSW50KGZ1bGxJZGVudGl0eS5leHBpcmVzQXRVdGNNaWNyb3MpLCB0cnVlKVxuICAgIHNpZ0J5dGVzLnB1c2gobmV3IFVpbnQ4QXJyYXkoZXhwaXJlc0F0Qnl0ZXMpKVxuXG4gICAgZm9yIChjb25zdCBlbmMgb2YgZnVsbElkZW50aXR5LmVuYykge1xuICAgICAgc2lnQnl0ZXMucHVzaChiYXNlNjR1cmwuZGVjb2RlKGVuYy5pZCkpXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBzaWcgb2YgZnVsbElkZW50aXR5LnNpZykge1xuICAgICAgc2lnQnl0ZXMucHVzaChiYXNlNjR1cmwuZGVjb2RlKHNpZy5pZCkpXG4gICAgfVxuXG4gICAgY29uc3Qgc2lnQnl0ZXNIYXNoID0gYXdhaXQgX2NvbmNhdEhhc2goc2lnQnl0ZXMpXG5cbiAgICBjb25zdCBzaWduID0gbmV3IEdlbmVyYWxTaWduKHNpZ0J5dGVzSGFzaClcblxuICAgIGZvciAoY29uc3Qgc2lnIG9mIGZ1bGxJZGVudGl0eS5zaWcpIHtcbiAgICAgIHNpZ25cbiAgICAgICAgLmFkZFNpZ25hdHVyZShzaWcuX3ByaXYucHJpdmF0ZUtleSlcbiAgICAgICAgLnNldFByb3RlY3RlZEhlYWRlcih7IGFsZzogc2lnLmFsZyB9KVxuICAgIH1cblxuICAgIGZ1bGxJZGVudGl0eS5qd3MgPSBhd2FpdCBzaWduLnNpZ24oKVxuICAgIHB1YklkZW50aXR5Lmp3cyA9IGZ1bGxJZGVudGl0eS5qd3NcbiAgICBzYXZlSWRlbnRpdHkuandzID0gZnVsbElkZW50aXR5Lmp3c1xuXG4gICAgLy8gdW5saWtlIGp3ayB0aHVtYnByaW50cywgdGhlcmUncyBubyBzdGFuZGFyZCBoZXJlLi4uXG4gICAgLy8gdXNpbmcgYSBzaGEtMjU2IG9mOiBgcGF5bG9hZCArIFtwcm90ZWN0ZWQgKyBzaWduYXR1cmUsIC4uXWBcbiAgICBjb25zdCBpZEJ5dGVzID0gW11cbiAgICBpZEJ5dGVzLnB1c2goYmFzZTY0dXJsLmRlY29kZShmdWxsSWRlbnRpdHkuandzLnBheWxvYWQpKVxuICAgIGZvciAoY29uc3Qgc2lnIG9mIGZ1bGxJZGVudGl0eS5qd3Muc2lnbmF0dXJlcykge1xuICAgICAgaWRCeXRlcy5wdXNoKGJhc2U2NHVybC5kZWNvZGUoc2lnLnByb3RlY3RlZCkpXG4gICAgICBpZEJ5dGVzLnB1c2goYmFzZTY0dXJsLmRlY29kZShzaWcuc2lnbmF0dXJlKSlcbiAgICB9XG5cbiAgICBmdWxsSWRlbnRpdHkuaWQgPSBiYXNlNjR1cmwuZW5jb2RlKGF3YWl0IF9jb25jYXRIYXNoKGlkQnl0ZXMpKVxuICAgIHB1YklkZW50aXR5LmlkID0gZnVsbElkZW50aXR5LmlkXG4gICAgc2F2ZUlkZW50aXR5LmlkID0gZnVsbElkZW50aXR5LmlkXG5cbiAgICBjb25zb2xlLmxvZygnZnVsbCcsIGZ1bGxJZGVudGl0eSlcbiAgICBjb25zb2xlLmxvZygncHViJywgcHViSWRlbnRpdHkpXG4gICAgY29uc29sZS5sb2coJ3NhdmUnLCBzYXZlSWRlbnRpdHkpXG5cbiAgICBhd2FpdCBBbklkZW50aXR5LnZhbGlkYXRlQW5kUmVnaXN0ZXJQdWJsaWNJZGVudGl0eShwdWJJZGVudGl0eSlcblxuICAgIGF3YWl0IGlkYkt2LnNldCgnYW5JZFByaXY6JyArIHNhdmVJZGVudGl0eS5pZCwgc2F2ZUlkZW50aXR5KVxuICAgIGF3YWl0IGlkYkt2LnNldCgnYW5JZEFjdGl2ZTonLCBzYXZlSWRlbnRpdHkuaWQpXG5cbiAgICByZXR1cm4gbmV3IEFuSWRlbnRpdHkoZnVsbElkZW50aXR5LCBwdWJJZGVudGl0eSlcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIHBhc3NwaHJhc2VTZWNyZXRBbGc6IFwiJyArIGNvbmZpZy5wYXNzcGhyYXNlU2VjcmV0QWxnICsgJ1wiJylcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBfY29uY2F0SGFzaCAoYnVmcykge1xuICBsZXQgbGVuID0gMFxuICBmb3IgKGNvbnN0IGJ1ZiBvZiBidWZzKSB7XG4gICAgbGVuICs9IGJ1Zi5ieXRlTGVuZ3RoXG4gIH1cblxuICBjb25zdCBvdXQgPSBuZXcgVWludDhBcnJheShsZW4pXG4gIGxldCBvZmZzZXQgPSAwXG5cbiAgZm9yIChjb25zdCBidWYgb2YgYnVmcykge1xuICAgIG91dC5zZXQoYnVmLCBvZmZzZXQpXG4gICAgb2Zmc2V0ICs9IGJ1Zi5ieXRlTGVuZ3RoXG4gIH1cblxuICBjb25zdCBoYXNoID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5kaWdlc3QoJ1NIQS0yNTYnLCBvdXQpXG5cbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGhhc2gpXG59XG4iLCJpbXBvcnQgc2FmYXJpRml4IGZyb20gJ3NhZmFyaS0xNC1pZGItZml4JztcblxuZnVuY3Rpb24gcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSAtIGZpbGUgc2l6ZSBoYWNrc1xuICAgICAgICByZXF1ZXN0Lm9uY29tcGxldGUgPSByZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHJlc29sdmUocmVxdWVzdC5yZXN1bHQpO1xuICAgICAgICAvLyBAdHMtaWdub3JlIC0gZmlsZSBzaXplIGhhY2tzXG4gICAgICAgIHJlcXVlc3Qub25hYm9ydCA9IHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHJlamVjdChyZXF1ZXN0LmVycm9yKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVN0b3JlKGRiTmFtZSwgc3RvcmVOYW1lKSB7XG4gICAgY29uc3QgZGJwID0gc2FmYXJpRml4KCkudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIub3BlbihkYk5hbWUpO1xuICAgICAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9ICgpID0+IHJlcXVlc3QucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpO1xuICAgIH0pO1xuICAgIHJldHVybiAodHhNb2RlLCBjYWxsYmFjaykgPT4gZGJwLnRoZW4oKGRiKSA9PiBjYWxsYmFjayhkYi50cmFuc2FjdGlvbihzdG9yZU5hbWUsIHR4TW9kZSkub2JqZWN0U3RvcmUoc3RvcmVOYW1lKSkpO1xufVxubGV0IGRlZmF1bHRHZXRTdG9yZUZ1bmM7XG5mdW5jdGlvbiBkZWZhdWx0R2V0U3RvcmUoKSB7XG4gICAgaWYgKCFkZWZhdWx0R2V0U3RvcmVGdW5jKSB7XG4gICAgICAgIGRlZmF1bHRHZXRTdG9yZUZ1bmMgPSBjcmVhdGVTdG9yZSgna2V5dmFsLXN0b3JlJywgJ2tleXZhbCcpO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdEdldFN0b3JlRnVuYztcbn1cbi8qKlxuICogR2V0IGEgdmFsdWUgYnkgaXRzIGtleS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gZ2V0KGtleSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0KGtleSkpKTtcbn1cbi8qKlxuICogU2V0IGEgdmFsdWUgd2l0aCBhIGtleS5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIHN0b3JlLnB1dCh2YWx1ZSwga2V5KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgbXVsdGlwbGUgdmFsdWVzIGF0IG9uY2UuIFRoaXMgaXMgZmFzdGVyIHRoYW4gY2FsbGluZyBzZXQoKSBtdWx0aXBsZSB0aW1lcy5cbiAqIEl0J3MgYWxzbyBhdG9taWMg4oCTIGlmIG9uZSBvZiB0aGUgcGFpcnMgY2FuJ3QgYmUgYWRkZWQsIG5vbmUgd2lsbCBiZSBhZGRlZC5cbiAqXG4gKiBAcGFyYW0gZW50cmllcyBBcnJheSBvZiBlbnRyaWVzLCB3aGVyZSBlYWNoIGVudHJ5IGlzIGFuIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIHNldE1hbnkoZW50cmllcywgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHN0b3JlLnB1dChlbnRyeVsxXSwgZW50cnlbMF0pKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgbXVsdGlwbGUgdmFsdWVzIGJ5IHRoZWlyIGtleXNcbiAqXG4gKiBAcGFyYW0ga2V5c1xuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGdldE1hbnkoa2V5cywgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IFByb21pc2UuYWxsKGtleXMubWFwKChrZXkpID0+IHByb21pc2lmeVJlcXVlc3Qoc3RvcmUuZ2V0KGtleSkpKSkpO1xufVxuLyoqXG4gKiBVcGRhdGUgYSB2YWx1ZS4gVGhpcyBsZXRzIHlvdSBzZWUgdGhlIG9sZCB2YWx1ZSBhbmQgdXBkYXRlIGl0IGFzIGFuIGF0b21pYyBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIHVwZGF0ZXIgQSBjYWxsYmFjayB0aGF0IHRha2VzIHRoZSBvbGQgdmFsdWUgYW5kIHJldHVybnMgYSBuZXcgdmFsdWUuXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlKGtleSwgdXBkYXRlciwgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiBcbiAgICAvLyBOZWVkIHRvIGNyZWF0ZSB0aGUgcHJvbWlzZSBtYW51YWxseS5cbiAgICAvLyBJZiBJIHRyeSB0byBjaGFpbiBwcm9taXNlcywgdGhlIHRyYW5zYWN0aW9uIGNsb3NlcyBpbiBicm93c2Vyc1xuICAgIC8vIHRoYXQgdXNlIGEgcHJvbWlzZSBwb2x5ZmlsbCAoSUUxMC8xMSkuXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBzdG9yZS5nZXQoa2V5KS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHN0b3JlLnB1dCh1cGRhdGVyKHRoaXMucmVzdWx0KSwga2V5KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHByb21pc2lmeVJlcXVlc3Qoc3RvcmUudHJhbnNhY3Rpb24pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KSk7XG59XG4vKipcbiAqIERlbGV0ZSBhIHBhcnRpY3VsYXIga2V5IGZyb20gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBkZWwoa2V5LCBjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgcmV0dXJuIGN1c3RvbVN0b3JlKCdyZWFkd3JpdGUnLCAoc3RvcmUpID0+IHtcbiAgICAgICAgc3RvcmUuZGVsZXRlKGtleSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogRGVsZXRlIG11bHRpcGxlIGtleXMgYXQgb25jZS5cbiAqXG4gKiBAcGFyYW0ga2V5cyBMaXN0IG9mIGtleXMgdG8gZGVsZXRlLlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGRlbE1hbnkoa2V5cywgY3VzdG9tU3RvcmUgPSBkZWZhdWx0R2V0U3RvcmUoKSkge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZHdyaXRlJywgKHN0b3JlKSA9PiB7XG4gICAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiBzdG9yZS5kZWxldGUoa2V5KSk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogQ2xlYXIgYWxsIHZhbHVlcyBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIGN1c3RvbVN0b3JlIE1ldGhvZCB0byBnZXQgYSBjdXN0b20gc3RvcmUuIFVzZSB3aXRoIGNhdXRpb24gKHNlZSB0aGUgZG9jcykuXG4gKi9cbmZ1bmN0aW9uIGNsZWFyKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICByZXR1cm4gY3VzdG9tU3RvcmUoJ3JlYWR3cml0ZScsIChzdG9yZSkgPT4ge1xuICAgICAgICBzdG9yZS5jbGVhcigpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChzdG9yZS50cmFuc2FjdGlvbik7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBlYWNoQ3Vyc29yKGN1c3RvbVN0b3JlLCBjYWxsYmFjaykge1xuICAgIHJldHVybiBjdXN0b21TdG9yZSgncmVhZG9ubHknLCAoc3RvcmUpID0+IHtcbiAgICAgICAgLy8gVGhpcyB3b3VsZCBiZSBzdG9yZS5nZXRBbGxLZXlzKCksIGJ1dCBpdCBpc24ndCBzdXBwb3J0ZWQgYnkgRWRnZSBvciBTYWZhcmkuXG4gICAgICAgIC8vIEFuZCBvcGVuS2V5Q3Vyc29yIGlzbid0IHN1cHBvcnRlZCBieSBTYWZhcmkuXG4gICAgICAgIHN0b3JlLm9wZW5DdXJzb3IoKS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucmVzdWx0KVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMucmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0LmNvbnRpbnVlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHN0b3JlLnRyYW5zYWN0aW9uKTtcbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IGFsbCBrZXlzIGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24ga2V5cyhjdXN0b21TdG9yZSA9IGRlZmF1bHRHZXRTdG9yZSgpKSB7XG4gICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICByZXR1cm4gZWFjaEN1cnNvcihjdXN0b21TdG9yZSwgKGN1cnNvcikgPT4gaXRlbXMucHVzaChjdXJzb3Iua2V5KSkudGhlbigoKSA9PiBpdGVtcyk7XG59XG4vKipcbiAqIEdldCBhbGwgdmFsdWVzIGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tU3RvcmUgTWV0aG9kIHRvIGdldCBhIGN1c3RvbSBzdG9yZS4gVXNlIHdpdGggY2F1dGlvbiAoc2VlIHRoZSBkb2NzKS5cbiAqL1xuZnVuY3Rpb24gdmFsdWVzKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIHJldHVybiBlYWNoQ3Vyc29yKGN1c3RvbVN0b3JlLCAoY3Vyc29yKSA9PiBpdGVtcy5wdXNoKGN1cnNvci52YWx1ZSkpLnRoZW4oKCkgPT4gaXRlbXMpO1xufVxuLyoqXG4gKiBHZXQgYWxsIGVudHJpZXMgaW4gdGhlIHN0b3JlLiBFYWNoIGVudHJ5IGlzIGFuIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gLlxuICpcbiAqIEBwYXJhbSBjdXN0b21TdG9yZSBNZXRob2QgdG8gZ2V0IGEgY3VzdG9tIHN0b3JlLiBVc2Ugd2l0aCBjYXV0aW9uIChzZWUgdGhlIGRvY3MpLlxuICovXG5mdW5jdGlvbiBlbnRyaWVzKGN1c3RvbVN0b3JlID0gZGVmYXVsdEdldFN0b3JlKCkpIHtcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIHJldHVybiBlYWNoQ3Vyc29yKGN1c3RvbVN0b3JlLCAoY3Vyc29yKSA9PiBpdGVtcy5wdXNoKFtjdXJzb3Iua2V5LCBjdXJzb3IudmFsdWVdKSkudGhlbigoKSA9PiBpdGVtcyk7XG59XG5cbmV4cG9ydCB7IGNsZWFyLCBjcmVhdGVTdG9yZSwgZGVsLCBkZWxNYW55LCBlbnRyaWVzLCBnZXQsIGdldE1hbnksIGtleXMsIHByb21pc2lmeVJlcXVlc3QsIHNldCwgc2V0TWFueSwgdXBkYXRlLCB2YWx1ZXMgfTtcbiIsImltcG9ydCBkaWdlc3QgZnJvbSAnLi4vcnVudGltZS9kaWdlc3QuanMnO1xuaW1wb3J0IHsgZW5jb2RlIGFzIGJhc2U2NHVybCB9IGZyb20gJy4uL3J1bnRpbWUvYmFzZTY0dXJsLmpzJztcbmltcG9ydCB7IEpPU0VOb3RTdXBwb3J0ZWQsIEpXS0ludmFsaWQgfSBmcm9tICcuLi91dGlsL2Vycm9ycy5qcyc7XG5pbXBvcnQgeyBlbmNvZGVyIH0gZnJvbSAnLi4vbGliL2J1ZmZlcl91dGlscy5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi4vbGliL2lzX29iamVjdC5qcyc7XG5jb25zdCBjaGVjayA9ICh2YWx1ZSwgZGVzY3JpcHRpb24pID0+IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyB8fCAhdmFsdWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEpXS0ludmFsaWQoYCR7ZGVzY3JpcHRpb259IG1pc3Npbmcgb3IgaW52YWxpZGApO1xuICAgIH1cbn07XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2FsY3VsYXRlSndrVGh1bWJwcmludChqd2ssIGRpZ2VzdEFsZ29yaXRobSA9ICdzaGEyNTYnKSB7XG4gICAgaWYgKCFpc09iamVjdChqd2spKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0pXSyBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICAgIH1cbiAgICBsZXQgY29tcG9uZW50cztcbiAgICBzd2l0Y2ggKGp3ay5rdHkpIHtcbiAgICAgICAgY2FzZSAnRUMnOlxuICAgICAgICAgICAgY2hlY2soandrLmNydiwgJ1wiY3J2XCIgKEN1cnZlKSBQYXJhbWV0ZXInKTtcbiAgICAgICAgICAgIGNoZWNrKGp3ay54LCAnXCJ4XCIgKFggQ29vcmRpbmF0ZSkgUGFyYW1ldGVyJyk7XG4gICAgICAgICAgICBjaGVjayhqd2sueSwgJ1wieVwiIChZIENvb3JkaW5hdGUpIFBhcmFtZXRlcicpO1xuICAgICAgICAgICAgY29tcG9uZW50cyA9IHsgY3J2OiBqd2suY3J2LCBrdHk6IGp3ay5rdHksIHg6IGp3ay54LCB5OiBqd2sueSB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ09LUCc6XG4gICAgICAgICAgICBjaGVjayhqd2suY3J2LCAnXCJjcnZcIiAoU3VidHlwZSBvZiBLZXkgUGFpcikgUGFyYW1ldGVyJyk7XG4gICAgICAgICAgICBjaGVjayhqd2sueCwgJ1wieFwiIChQdWJsaWMgS2V5KSBQYXJhbWV0ZXInKTtcbiAgICAgICAgICAgIGNvbXBvbmVudHMgPSB7IGNydjogandrLmNydiwga3R5OiBqd2sua3R5LCB4OiBqd2sueCB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1JTQSc6XG4gICAgICAgICAgICBjaGVjayhqd2suZSwgJ1wiZVwiIChFeHBvbmVudCkgUGFyYW1ldGVyJyk7XG4gICAgICAgICAgICBjaGVjayhqd2subiwgJ1wiblwiIChNb2R1bHVzKSBQYXJhbWV0ZXInKTtcbiAgICAgICAgICAgIGNvbXBvbmVudHMgPSB7IGU6IGp3ay5lLCBrdHk6IGp3ay5rdHksIG46IGp3ay5uIH07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnb2N0JzpcbiAgICAgICAgICAgIGNoZWNrKGp3ay5rLCAnXCJrXCIgKEtleSBWYWx1ZSkgUGFyYW1ldGVyJyk7XG4gICAgICAgICAgICBjb21wb25lbnRzID0geyBrOiBqd2suaywga3R5OiBqd2sua3R5IH07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdcImt0eVwiIChLZXkgVHlwZSkgUGFyYW1ldGVyIG1pc3Npbmcgb3IgdW5zdXBwb3J0ZWQnKTtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IGVuY29kZXIuZW5jb2RlKEpTT04uc3RyaW5naWZ5KGNvbXBvbmVudHMpKTtcbiAgICByZXR1cm4gYmFzZTY0dXJsKGF3YWl0IGRpZ2VzdChkaWdlc3RBbGdvcml0aG0sIGRhdGEpKTtcbn1cbiIsImltcG9ydCB7IEZsYXR0ZW5lZFNpZ24gfSBmcm9tICcuLi9mbGF0dGVuZWQvc2lnbi5qcyc7XG5leHBvcnQgY2xhc3MgQ29tcGFjdFNpZ24ge1xuICAgIGNvbnN0cnVjdG9yKHBheWxvYWQpIHtcbiAgICAgICAgdGhpcy5fZmxhdHRlbmVkID0gbmV3IEZsYXR0ZW5lZFNpZ24ocGF5bG9hZCk7XG4gICAgfVxuICAgIHNldFByb3RlY3RlZEhlYWRlcihwcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgdGhpcy5fZmxhdHRlbmVkLnNldFByb3RlY3RlZEhlYWRlcihwcm90ZWN0ZWRIZWFkZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYXN5bmMgc2lnbihrZXksIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgandzID0gYXdhaXQgdGhpcy5fZmxhdHRlbmVkLnNpZ24oa2V5LCBvcHRpb25zKTtcbiAgICAgICAgaWYgKGp3cy5wYXlsb2FkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3VzZSB0aGUgZmxhdHRlbmVkIG1vZHVsZSBmb3IgY3JlYXRpbmcgSldTIHdpdGggYjY0OiBmYWxzZScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgJHtqd3MucHJvdGVjdGVkfS4ke2p3cy5wYXlsb2FkfS4ke2p3cy5zaWduYXR1cmV9YDtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBmbGF0dGVuZWRWZXJpZnkgfSBmcm9tICcuLi9mbGF0dGVuZWQvdmVyaWZ5LmpzJztcbmltcG9ydCB7IEpXU0ludmFsaWQgfSBmcm9tICcuLi8uLi91dGlsL2Vycm9ycy5qcyc7XG5pbXBvcnQgeyBkZWNvZGVyIH0gZnJvbSAnLi4vLi4vbGliL2J1ZmZlcl91dGlscy5qcyc7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29tcGFjdFZlcmlmeShqd3MsIGtleSwgb3B0aW9ucykge1xuICAgIGlmIChqd3MgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgIGp3cyA9IGRlY29kZXIuZGVjb2RlKGp3cyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgandzICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnQ29tcGFjdCBKV1MgbXVzdCBiZSBhIHN0cmluZyBvciBVaW50OEFycmF5Jyk7XG4gICAgfVxuICAgIGNvbnN0IHsgMDogcHJvdGVjdGVkSGVhZGVyLCAxOiBwYXlsb2FkLCAyOiBzaWduYXR1cmUsIGxlbmd0aCB9ID0gandzLnNwbGl0KCcuJyk7XG4gICAgaWYgKGxlbmd0aCAhPT0gMykge1xuICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnSW52YWxpZCBDb21wYWN0IEpXUycpO1xuICAgIH1cbiAgICBjb25zdCB2ZXJpZmllZCA9IGF3YWl0IGZsYXR0ZW5lZFZlcmlmeSh7XG4gICAgICAgIHBheWxvYWQ6IChwYXlsb2FkIHx8IHVuZGVmaW5lZCksXG4gICAgICAgIHByb3RlY3RlZDogcHJvdGVjdGVkSGVhZGVyIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgc2lnbmF0dXJlOiAoc2lnbmF0dXJlIHx8IHVuZGVmaW5lZCksXG4gICAgfSwga2V5LCBvcHRpb25zKTtcbiAgICBjb25zdCByZXN1bHQgPSB7IHBheWxvYWQ6IHZlcmlmaWVkLnBheWxvYWQsIHByb3RlY3RlZEhlYWRlcjogdmVyaWZpZWQucHJvdGVjdGVkSGVhZGVyIH07XG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4ucmVzdWx0LCBrZXk6IHZlcmlmaWVkLmtleSB9O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuIiwiaW1wb3J0IHsgZW5jb2RlIGFzIGJhc2U2NHVybCB9IGZyb20gJy4uLy4uL3J1bnRpbWUvYmFzZTY0dXJsLmpzJztcbmltcG9ydCBzaWduIGZyb20gJy4uLy4uL3J1bnRpbWUvc2lnbi5qcyc7XG5pbXBvcnQgaXNEaXNqb2ludCBmcm9tICcuLi8uLi9saWIvaXNfZGlzam9pbnQuanMnO1xuaW1wb3J0IHsgSldTSW52YWxpZCB9IGZyb20gJy4uLy4uL3V0aWwvZXJyb3JzLmpzJztcbmltcG9ydCB7IGVuY29kZXIsIGRlY29kZXIsIGNvbmNhdCB9IGZyb20gJy4uLy4uL2xpYi9idWZmZXJfdXRpbHMuanMnO1xuaW1wb3J0IGNoZWNrS2V5VHlwZSBmcm9tICcuLi8uLi9saWIvY2hlY2tfa2V5X3R5cGUuanMnO1xuaW1wb3J0IHZhbGlkYXRlQ3JpdCBmcm9tICcuLi8uLi9saWIvdmFsaWRhdGVfY3JpdC5qcyc7XG5leHBvcnQgY2xhc3MgRmxhdHRlbmVkU2lnbiB7XG4gICAgY29uc3RydWN0b3IocGF5bG9hZCkge1xuICAgICAgICBpZiAoIShwYXlsb2FkIGluc3RhbmNlb2YgVWludDhBcnJheSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BheWxvYWQgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBVaW50OEFycmF5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHBheWxvYWQ7XG4gICAgfVxuICAgIHNldFByb3RlY3RlZEhlYWRlcihwcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Byb3RlY3RlZEhlYWRlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc2V0UHJvdGVjdGVkSGVhZGVyIGNhbiBvbmx5IGJlIGNhbGxlZCBvbmNlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcHJvdGVjdGVkSGVhZGVyID0gcHJvdGVjdGVkSGVhZGVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VW5wcm90ZWN0ZWRIZWFkZXIodW5wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX3VucHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzZXRVbnByb3RlY3RlZEhlYWRlciBjYW4gb25seSBiZSBjYWxsZWQgb25jZScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VucHJvdGVjdGVkSGVhZGVyID0gdW5wcm90ZWN0ZWRIZWFkZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhc3luYyBzaWduKGtleSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIXRoaXMuX3Byb3RlY3RlZEhlYWRlciAmJiAhdGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdlaXRoZXIgc2V0UHJvdGVjdGVkSGVhZGVyIG9yIHNldFVucHJvdGVjdGVkSGVhZGVyIG11c3QgYmUgY2FsbGVkIGJlZm9yZSAjc2lnbigpJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0Rpc2pvaW50KHRoaXMuX3Byb3RlY3RlZEhlYWRlciwgdGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnSldTIFByb3RlY3RlZCBhbmQgSldTIFVucHJvdGVjdGVkIEhlYWRlciBQYXJhbWV0ZXIgbmFtZXMgbXVzdCBiZSBkaXNqb2ludCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGpvc2VIZWFkZXIgPSB7XG4gICAgICAgICAgICAuLi50aGlzLl9wcm90ZWN0ZWRIZWFkZXIsXG4gICAgICAgICAgICAuLi50aGlzLl91bnByb3RlY3RlZEhlYWRlcixcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9ucyA9IHZhbGlkYXRlQ3JpdChKV1NJbnZhbGlkLCBuZXcgTWFwKFtbJ2I2NCcsIHRydWVdXSksIG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jcml0LCB0aGlzLl9wcm90ZWN0ZWRIZWFkZXIsIGpvc2VIZWFkZXIpO1xuICAgICAgICBsZXQgYjY0ID0gdHJ1ZTtcbiAgICAgICAgaWYgKGV4dGVuc2lvbnMuaGFzKCdiNjQnKSkge1xuICAgICAgICAgICAgYjY0ID0gdGhpcy5fcHJvdGVjdGVkSGVhZGVyLmI2NDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYjY0ICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnVGhlIFwiYjY0XCIgKGJhc2U2NHVybC1lbmNvZGUgcGF5bG9hZCkgSGVhZGVyIFBhcmFtZXRlciBtdXN0IGJlIGEgYm9vbGVhbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgYWxnIH0gPSBqb3NlSGVhZGVyO1xuICAgICAgICBpZiAodHlwZW9mIGFsZyAhPT0gJ3N0cmluZycgfHwgIWFsZykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEpXU0ludmFsaWQoJ0pXUyBcImFsZ1wiIChBbGdvcml0aG0pIEhlYWRlciBQYXJhbWV0ZXIgbWlzc2luZyBvciBpbnZhbGlkJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2hlY2tLZXlUeXBlKGFsZywga2V5LCAnc2lnbicpO1xuICAgICAgICBsZXQgcGF5bG9hZCA9IHRoaXMuX3BheWxvYWQ7XG4gICAgICAgIGlmIChiNjQpIHtcbiAgICAgICAgICAgIHBheWxvYWQgPSBlbmNvZGVyLmVuY29kZShiYXNlNjR1cmwocGF5bG9hZCkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwcm90ZWN0ZWRIZWFkZXI7XG4gICAgICAgIGlmICh0aGlzLl9wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgICAgIHByb3RlY3RlZEhlYWRlciA9IGVuY29kZXIuZW5jb2RlKGJhc2U2NHVybChKU09OLnN0cmluZ2lmeSh0aGlzLl9wcm90ZWN0ZWRIZWFkZXIpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwcm90ZWN0ZWRIZWFkZXIgPSBlbmNvZGVyLmVuY29kZSgnJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YSA9IGNvbmNhdChwcm90ZWN0ZWRIZWFkZXIsIGVuY29kZXIuZW5jb2RlKCcuJyksIHBheWxvYWQpO1xuICAgICAgICBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCBzaWduKGFsZywga2V5LCBkYXRhKTtcbiAgICAgICAgY29uc3QgandzID0ge1xuICAgICAgICAgICAgc2lnbmF0dXJlOiBiYXNlNjR1cmwoc2lnbmF0dXJlKSxcbiAgICAgICAgICAgIHBheWxvYWQ6ICcnLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoYjY0KSB7XG4gICAgICAgICAgICBqd3MucGF5bG9hZCA9IGRlY29kZXIuZGVjb2RlKHBheWxvYWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl91bnByb3RlY3RlZEhlYWRlcikge1xuICAgICAgICAgICAgandzLmhlYWRlciA9IHRoaXMuX3VucHJvdGVjdGVkSGVhZGVyO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgICAgIGp3cy5wcm90ZWN0ZWQgPSBkZWNvZGVyLmRlY29kZShwcm90ZWN0ZWRIZWFkZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqd3M7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgZGVjb2RlIGFzIGJhc2U2NHVybCB9IGZyb20gJy4uLy4uL3J1bnRpbWUvYmFzZTY0dXJsLmpzJztcbmltcG9ydCB2ZXJpZnkgZnJvbSAnLi4vLi4vcnVudGltZS92ZXJpZnkuanMnO1xuaW1wb3J0IHsgSk9TRUFsZ05vdEFsbG93ZWQsIEpXU0ludmFsaWQsIEpXU1NpZ25hdHVyZVZlcmlmaWNhdGlvbkZhaWxlZCB9IGZyb20gJy4uLy4uL3V0aWwvZXJyb3JzLmpzJztcbmltcG9ydCB7IGNvbmNhdCwgZW5jb2RlciwgZGVjb2RlciB9IGZyb20gJy4uLy4uL2xpYi9idWZmZXJfdXRpbHMuanMnO1xuaW1wb3J0IGlzRGlzam9pbnQgZnJvbSAnLi4vLi4vbGliL2lzX2Rpc2pvaW50LmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuLi8uLi9saWIvaXNfb2JqZWN0LmpzJztcbmltcG9ydCBjaGVja0tleVR5cGUgZnJvbSAnLi4vLi4vbGliL2NoZWNrX2tleV90eXBlLmpzJztcbmltcG9ydCB2YWxpZGF0ZUNyaXQgZnJvbSAnLi4vLi4vbGliL3ZhbGlkYXRlX2NyaXQuanMnO1xuaW1wb3J0IHZhbGlkYXRlQWxnb3JpdGhtcyBmcm9tICcuLi8uLi9saWIvdmFsaWRhdGVfYWxnb3JpdGhtcy5qcyc7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmxhdHRlbmVkVmVyaWZ5KGp3cywga2V5LCBvcHRpb25zKSB7XG4gICAgdmFyIF9hO1xuICAgIGlmICghaXNPYmplY3QoandzKSkge1xuICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnRmxhdHRlbmVkIEpXUyBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICAgIH1cbiAgICBpZiAoandzLnByb3RlY3RlZCA9PT0gdW5kZWZpbmVkICYmIGp3cy5oZWFkZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnRmxhdHRlbmVkIEpXUyBtdXN0IGhhdmUgZWl0aGVyIG9mIHRoZSBcInByb3RlY3RlZFwiIG9yIFwiaGVhZGVyXCIgbWVtYmVycycpO1xuICAgIH1cbiAgICBpZiAoandzLnByb3RlY3RlZCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBqd3MucHJvdGVjdGVkICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnSldTIFByb3RlY3RlZCBIZWFkZXIgaW5jb3JyZWN0IHR5cGUnKTtcbiAgICB9XG4gICAgaWYgKGp3cy5wYXlsb2FkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEpXU0ludmFsaWQoJ0pXUyBQYXlsb2FkIG1pc3NpbmcnKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBqd3Muc2lnbmF0dXJlICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnSldTIFNpZ25hdHVyZSBtaXNzaW5nIG9yIGluY29ycmVjdCB0eXBlJyk7XG4gICAgfVxuICAgIGlmIChqd3MuaGVhZGVyICE9PSB1bmRlZmluZWQgJiYgIWlzT2JqZWN0KGp3cy5oZWFkZXIpKSB7XG4gICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdKV1MgVW5wcm90ZWN0ZWQgSGVhZGVyIGluY29ycmVjdCB0eXBlJyk7XG4gICAgfVxuICAgIGxldCBwYXJzZWRQcm90ID0ge307XG4gICAgaWYgKGp3cy5wcm90ZWN0ZWQpIHtcbiAgICAgICAgY29uc3QgcHJvdGVjdGVkSGVhZGVyID0gYmFzZTY0dXJsKGp3cy5wcm90ZWN0ZWQpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcGFyc2VkUHJvdCA9IEpTT04ucGFyc2UoZGVjb2Rlci5kZWNvZGUocHJvdGVjdGVkSGVhZGVyKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKF9iKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnSldTIFByb3RlY3RlZCBIZWFkZXIgaXMgaW52YWxpZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghaXNEaXNqb2ludChwYXJzZWRQcm90LCBqd3MuaGVhZGVyKSkge1xuICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnSldTIFByb3RlY3RlZCBhbmQgSldTIFVucHJvdGVjdGVkIEhlYWRlciBQYXJhbWV0ZXIgbmFtZXMgbXVzdCBiZSBkaXNqb2ludCcpO1xuICAgIH1cbiAgICBjb25zdCBqb3NlSGVhZGVyID0ge1xuICAgICAgICAuLi5wYXJzZWRQcm90LFxuICAgICAgICAuLi5qd3MuaGVhZGVyLFxuICAgIH07XG4gICAgY29uc3QgZXh0ZW5zaW9ucyA9IHZhbGlkYXRlQ3JpdChKV1NJbnZhbGlkLCBuZXcgTWFwKFtbJ2I2NCcsIHRydWVdXSksIG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jcml0LCBwYXJzZWRQcm90LCBqb3NlSGVhZGVyKTtcbiAgICBsZXQgYjY0ID0gdHJ1ZTtcbiAgICBpZiAoZXh0ZW5zaW9ucy5oYXMoJ2I2NCcpKSB7XG4gICAgICAgIGI2NCA9IHBhcnNlZFByb3QuYjY0O1xuICAgICAgICBpZiAodHlwZW9mIGI2NCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnVGhlIFwiYjY0XCIgKGJhc2U2NHVybC1lbmNvZGUgcGF5bG9hZCkgSGVhZGVyIFBhcmFtZXRlciBtdXN0IGJlIGEgYm9vbGVhbicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHsgYWxnIH0gPSBqb3NlSGVhZGVyO1xuICAgIGlmICh0eXBlb2YgYWxnICE9PSAnc3RyaW5nJyB8fCAhYWxnKSB7XG4gICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdKV1MgXCJhbGdcIiAoQWxnb3JpdGhtKSBIZWFkZXIgUGFyYW1ldGVyIG1pc3Npbmcgb3IgaW52YWxpZCcpO1xuICAgIH1cbiAgICBjb25zdCBhbGdvcml0aG1zID0gb3B0aW9ucyAmJiB2YWxpZGF0ZUFsZ29yaXRobXMoJ2FsZ29yaXRobXMnLCBvcHRpb25zLmFsZ29yaXRobXMpO1xuICAgIGlmIChhbGdvcml0aG1zICYmICFhbGdvcml0aG1zLmhhcyhhbGcpKSB7XG4gICAgICAgIHRocm93IG5ldyBKT1NFQWxnTm90QWxsb3dlZCgnXCJhbGdcIiAoQWxnb3JpdGhtKSBIZWFkZXIgUGFyYW1ldGVyIG5vdCBhbGxvd2VkJyk7XG4gICAgfVxuICAgIGlmIChiNjQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBqd3MucGF5bG9hZCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdKV1MgUGF5bG9hZCBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGp3cy5wYXlsb2FkICE9PSAnc3RyaW5nJyAmJiAhKGp3cy5wYXlsb2FkIGluc3RhbmNlb2YgVWludDhBcnJheSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEpXU0ludmFsaWQoJ0pXUyBQYXlsb2FkIG11c3QgYmUgYSBzdHJpbmcgb3IgYW4gVWludDhBcnJheSBpbnN0YW5jZScpO1xuICAgIH1cbiAgICBsZXQgcmVzb2x2ZWRLZXkgPSBmYWxzZTtcbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBrZXkgPSBhd2FpdCBrZXkocGFyc2VkUHJvdCwgandzKTtcbiAgICAgICAgcmVzb2x2ZWRLZXkgPSB0cnVlO1xuICAgIH1cbiAgICBjaGVja0tleVR5cGUoYWxnLCBrZXksICd2ZXJpZnknKTtcbiAgICBjb25zdCBkYXRhID0gY29uY2F0KGVuY29kZXIuZW5jb2RlKChfYSA9IGp3cy5wcm90ZWN0ZWQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICcnKSwgZW5jb2Rlci5lbmNvZGUoJy4nKSwgdHlwZW9mIGp3cy5wYXlsb2FkID09PSAnc3RyaW5nJyA/IGVuY29kZXIuZW5jb2RlKGp3cy5wYXlsb2FkKSA6IGp3cy5wYXlsb2FkKTtcbiAgICBjb25zdCBzaWduYXR1cmUgPSBiYXNlNjR1cmwoandzLnNpZ25hdHVyZSk7XG4gICAgY29uc3QgdmVyaWZpZWQgPSBhd2FpdCB2ZXJpZnkoYWxnLCBrZXksIHNpZ25hdHVyZSwgZGF0YSk7XG4gICAgaWYgKCF2ZXJpZmllZCkge1xuICAgICAgICB0aHJvdyBuZXcgSldTU2lnbmF0dXJlVmVyaWZpY2F0aW9uRmFpbGVkKCk7XG4gICAgfVxuICAgIGxldCBwYXlsb2FkO1xuICAgIGlmIChiNjQpIHtcbiAgICAgICAgcGF5bG9hZCA9IGJhc2U2NHVybChqd3MucGF5bG9hZCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBqd3MucGF5bG9hZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcGF5bG9hZCA9IGVuY29kZXIuZW5jb2RlKGp3cy5wYXlsb2FkKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHBheWxvYWQgPSBqd3MucGF5bG9hZDtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0geyBwYXlsb2FkIH07XG4gICAgaWYgKGp3cy5wcm90ZWN0ZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXN1bHQucHJvdGVjdGVkSGVhZGVyID0gcGFyc2VkUHJvdDtcbiAgICB9XG4gICAgaWYgKGp3cy5oZWFkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXN1bHQudW5wcm90ZWN0ZWRIZWFkZXIgPSBqd3MuaGVhZGVyO1xuICAgIH1cbiAgICBpZiAocmVzb2x2ZWRLZXkpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4ucmVzdWx0LCBrZXkgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsImltcG9ydCB7IEZsYXR0ZW5lZFNpZ24gfSBmcm9tICcuLi9mbGF0dGVuZWQvc2lnbi5qcyc7XG5pbXBvcnQgeyBKV1NJbnZhbGlkIH0gZnJvbSAnLi4vLi4vdXRpbC9lcnJvcnMuanMnO1xuY29uc3Qgc2lnbmF0dXJlUmVmID0gbmV3IFdlYWtNYXAoKTtcbmNsYXNzIEluZGl2aWR1YWxTaWduYXR1cmUge1xuICAgIHNldFByb3RlY3RlZEhlYWRlcihwcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Byb3RlY3RlZEhlYWRlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc2V0UHJvdGVjdGVkSGVhZGVyIGNhbiBvbmx5IGJlIGNhbGxlZCBvbmNlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcHJvdGVjdGVkSGVhZGVyID0gcHJvdGVjdGVkSGVhZGVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VW5wcm90ZWN0ZWRIZWFkZXIodW5wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX3VucHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzZXRVbnByb3RlY3RlZEhlYWRlciBjYW4gb25seSBiZSBjYWxsZWQgb25jZScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VucHJvdGVjdGVkSGVhZGVyID0gdW5wcm90ZWN0ZWRIZWFkZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXQgX3Byb3RlY3RlZEhlYWRlcih2YWx1ZSkge1xuICAgICAgICBzaWduYXR1cmVSZWYuZ2V0KHRoaXMpLnByb3RlY3RlZEhlYWRlciA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgX3Byb3RlY3RlZEhlYWRlcigpIHtcbiAgICAgICAgcmV0dXJuIHNpZ25hdHVyZVJlZi5nZXQodGhpcykucHJvdGVjdGVkSGVhZGVyO1xuICAgIH1cbiAgICBzZXQgX3VucHJvdGVjdGVkSGVhZGVyKHZhbHVlKSB7XG4gICAgICAgIHNpZ25hdHVyZVJlZi5nZXQodGhpcykudW5wcm90ZWN0ZWRIZWFkZXIgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IF91bnByb3RlY3RlZEhlYWRlcigpIHtcbiAgICAgICAgcmV0dXJuIHNpZ25hdHVyZVJlZi5nZXQodGhpcykudW5wcm90ZWN0ZWRIZWFkZXI7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEdlbmVyYWxTaWduIHtcbiAgICBjb25zdHJ1Y3RvcihwYXlsb2FkKSB7XG4gICAgICAgIHRoaXMuX3NpZ25hdHVyZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHBheWxvYWQ7XG4gICAgfVxuICAgIGFkZFNpZ25hdHVyZShrZXksIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlID0gbmV3IEluZGl2aWR1YWxTaWduYXR1cmUoKTtcbiAgICAgICAgc2lnbmF0dXJlUmVmLnNldChzaWduYXR1cmUsIHsga2V5LCBvcHRpb25zIH0pO1xuICAgICAgICB0aGlzLl9zaWduYXR1cmVzLnB1c2goc2lnbmF0dXJlKTtcbiAgICAgICAgcmV0dXJuIHNpZ25hdHVyZTtcbiAgICB9XG4gICAgYXN5bmMgc2lnbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zaWduYXR1cmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEpXU0ludmFsaWQoJ2F0IGxlYXN0IG9uZSBzaWduYXR1cmUgbXVzdCBiZSBhZGRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGp3cyA9IHtcbiAgICAgICAgICAgIHNpZ25hdHVyZXM6IFtdLFxuICAgICAgICAgICAgcGF5bG9hZDogJycsXG4gICAgICAgIH07XG4gICAgICAgIGxldCBwYXlsb2FkcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5fc2lnbmF0dXJlcy5tYXAoYXN5bmMgKHNpZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBwcm90ZWN0ZWRIZWFkZXIsIHVucHJvdGVjdGVkSGVhZGVyLCBvcHRpb25zLCBrZXkgfSA9IHNpZ25hdHVyZVJlZi5nZXQoc2lnKTtcbiAgICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lZCA9IG5ldyBGbGF0dGVuZWRTaWduKHRoaXMuX3BheWxvYWQpO1xuICAgICAgICAgICAgaWYgKHByb3RlY3RlZEhlYWRlcikge1xuICAgICAgICAgICAgICAgIGZsYXR0ZW5lZC5zZXRQcm90ZWN0ZWRIZWFkZXIocHJvdGVjdGVkSGVhZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh1bnByb3RlY3RlZEhlYWRlcikge1xuICAgICAgICAgICAgICAgIGZsYXR0ZW5lZC5zZXRVbnByb3RlY3RlZEhlYWRlcih1bnByb3RlY3RlZEhlYWRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB7IHBheWxvYWQsIC4uLnJlc3QgfSA9IGF3YWl0IGZsYXR0ZW5lZC5zaWduKGtleSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBwYXlsb2Fkcy5hZGQocGF5bG9hZCk7XG4gICAgICAgICAgICBqd3MucGF5bG9hZCA9IHBheWxvYWQ7XG4gICAgICAgICAgICBqd3Muc2lnbmF0dXJlcy5wdXNoKHJlc3QpO1xuICAgICAgICB9KSk7XG4gICAgICAgIGlmIChwYXlsb2Fkcy5zaXplICE9PSAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnaW5jb25zaXN0ZW50IHVzZSBvZiBKV1MgVW5lbmNvZGVkIFBheWxvYWQgT3B0aW9uIChSRkM3Nzk3KScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqd3M7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgZmxhdHRlbmVkVmVyaWZ5IH0gZnJvbSAnLi4vZmxhdHRlbmVkL3ZlcmlmeS5qcyc7XG5pbXBvcnQgeyBKV1NJbnZhbGlkLCBKV1NTaWduYXR1cmVWZXJpZmljYXRpb25GYWlsZWQgfSBmcm9tICcuLi8uLi91dGlsL2Vycm9ycy5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi4vLi4vbGliL2lzX29iamVjdC5qcyc7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2VuZXJhbFZlcmlmeShqd3MsIGtleSwgb3B0aW9ucykge1xuICAgIGlmICghaXNPYmplY3QoandzKSkge1xuICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnR2VuZXJhbCBKV1MgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgICB9XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGp3cy5zaWduYXR1cmVzKSB8fCAhandzLnNpZ25hdHVyZXMuZXZlcnkoaXNPYmplY3QpKSB7XG4gICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdKV1MgU2lnbmF0dXJlcyBtaXNzaW5nIG9yIGluY29ycmVjdCB0eXBlJyk7XG4gICAgfVxuICAgIGZvciAoY29uc3Qgc2lnbmF0dXJlIG9mIGp3cy5zaWduYXR1cmVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgZmxhdHRlbmVkVmVyaWZ5KHtcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHNpZ25hdHVyZS5oZWFkZXIsXG4gICAgICAgICAgICAgICAgcGF5bG9hZDogandzLnBheWxvYWQsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkOiBzaWduYXR1cmUucHJvdGVjdGVkLFxuICAgICAgICAgICAgICAgIHNpZ25hdHVyZTogc2lnbmF0dXJlLnNpZ25hdHVyZSxcbiAgICAgICAgICAgIH0sIGtleSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEpXU1NpZ25hdHVyZVZlcmlmaWNhdGlvbkZhaWxlZCgpO1xufVxuIiwiaW1wb3J0IGVwb2NoIGZyb20gJy4uL2xpYi9lcG9jaC5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi4vbGliL2lzX29iamVjdC5qcyc7XG5pbXBvcnQgc2VjcyBmcm9tICcuLi9saWIvc2Vjcy5qcyc7XG5leHBvcnQgY2xhc3MgUHJvZHVjZUpXVCB7XG4gICAgY29uc3RydWN0b3IocGF5bG9hZCkge1xuICAgICAgICBpZiAoIWlzT2JqZWN0KHBheWxvYWQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdKV1QgQ2xhaW1zIFNldCBNVVNUIGJlIGFuIG9iamVjdCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3BheWxvYWQgPSBwYXlsb2FkO1xuICAgIH1cbiAgICBzZXRJc3N1ZXIoaXNzdWVyKSB7XG4gICAgICAgIHRoaXMuX3BheWxvYWQgPSB7IC4uLnRoaXMuX3BheWxvYWQsIGlzczogaXNzdWVyIH07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRTdWJqZWN0KHN1YmplY3QpIHtcbiAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHsgLi4udGhpcy5fcGF5bG9hZCwgc3ViOiBzdWJqZWN0IH07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRBdWRpZW5jZShhdWRpZW5jZSkge1xuICAgICAgICB0aGlzLl9wYXlsb2FkID0geyAuLi50aGlzLl9wYXlsb2FkLCBhdWQ6IGF1ZGllbmNlIH07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRKdGkoand0SWQpIHtcbiAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHsgLi4udGhpcy5fcGF5bG9hZCwganRpOiBqd3RJZCB9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0Tm90QmVmb3JlKGlucHV0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLl9wYXlsb2FkID0geyAuLi50aGlzLl9wYXlsb2FkLCBuYmY6IGlucHV0IH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9wYXlsb2FkID0geyAuLi50aGlzLl9wYXlsb2FkLCBuYmY6IGVwb2NoKG5ldyBEYXRlKCkpICsgc2VjcyhpbnB1dCkgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0RXhwaXJhdGlvblRpbWUoaW5wdXQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMuX3BheWxvYWQgPSB7IC4uLnRoaXMuX3BheWxvYWQsIGV4cDogaW5wdXQgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3BheWxvYWQgPSB7IC4uLnRoaXMuX3BheWxvYWQsIGV4cDogZXBvY2gobmV3IERhdGUoKSkgKyBzZWNzKGlucHV0KSB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRJc3N1ZWRBdChpbnB1dCkge1xuICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHsgLi4udGhpcy5fcGF5bG9hZCwgaWF0OiBlcG9jaChuZXcgRGF0ZSgpKSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHsgLi4udGhpcy5fcGF5bG9hZCwgaWF0OiBpbnB1dCB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBhY3RTaWduIH0gZnJvbSAnLi4vandzL2NvbXBhY3Qvc2lnbi5qcyc7XG5pbXBvcnQgeyBKV1RJbnZhbGlkIH0gZnJvbSAnLi4vdXRpbC9lcnJvcnMuanMnO1xuaW1wb3J0IHsgZW5jb2RlciB9IGZyb20gJy4uL2xpYi9idWZmZXJfdXRpbHMuanMnO1xuaW1wb3J0IHsgUHJvZHVjZUpXVCB9IGZyb20gJy4vcHJvZHVjZS5qcyc7XG5leHBvcnQgY2xhc3MgU2lnbkpXVCBleHRlbmRzIFByb2R1Y2VKV1Qge1xuICAgIHNldFByb3RlY3RlZEhlYWRlcihwcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgdGhpcy5fcHJvdGVjdGVkSGVhZGVyID0gcHJvdGVjdGVkSGVhZGVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYXN5bmMgc2lnbihrZXksIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBzaWcgPSBuZXcgQ29tcGFjdFNpZ24oZW5jb2Rlci5lbmNvZGUoSlNPTi5zdHJpbmdpZnkodGhpcy5fcGF5bG9hZCkpKTtcbiAgICAgICAgc2lnLnNldFByb3RlY3RlZEhlYWRlcih0aGlzLl9wcm90ZWN0ZWRIZWFkZXIpO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSgoX2EgPSB0aGlzLl9wcm90ZWN0ZWRIZWFkZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jcml0KSAmJlxuICAgICAgICAgICAgdGhpcy5fcHJvdGVjdGVkSGVhZGVyLmNyaXQuaW5jbHVkZXMoJ2I2NCcpICYmXG4gICAgICAgICAgICB0aGlzLl9wcm90ZWN0ZWRIZWFkZXIuYjY0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEpXVEludmFsaWQoJ0pXVHMgTVVTVCBOT1QgdXNlIHVuZW5jb2RlZCBwYXlsb2FkJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNpZy5zaWduKGtleSwgb3B0aW9ucyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY29tcGFjdFZlcmlmeSB9IGZyb20gJy4uL2p3cy9jb21wYWN0L3ZlcmlmeS5qcyc7XG5pbXBvcnQgand0UGF5bG9hZCBmcm9tICcuLi9saWIvand0X2NsYWltc19zZXQuanMnO1xuaW1wb3J0IHsgSldUSW52YWxpZCB9IGZyb20gJy4uL3V0aWwvZXJyb3JzLmpzJztcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBqd3RWZXJpZnkoand0LCBrZXksIG9wdGlvbnMpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgdmVyaWZpZWQgPSBhd2FpdCBjb21wYWN0VmVyaWZ5KGp3dCwga2V5LCBvcHRpb25zKTtcbiAgICBpZiAoKChfYSA9IHZlcmlmaWVkLnByb3RlY3RlZEhlYWRlci5jcml0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW5jbHVkZXMoJ2I2NCcpKSAmJiB2ZXJpZmllZC5wcm90ZWN0ZWRIZWFkZXIuYjY0ID09PSBmYWxzZSkge1xuICAgICAgICB0aHJvdyBuZXcgSldUSW52YWxpZCgnSldUcyBNVVNUIE5PVCB1c2UgdW5lbmNvZGVkIHBheWxvYWQnKTtcbiAgICB9XG4gICAgY29uc3QgcGF5bG9hZCA9IGp3dFBheWxvYWQodmVyaWZpZWQucHJvdGVjdGVkSGVhZGVyLCB2ZXJpZmllZC5wYXlsb2FkLCBvcHRpb25zKTtcbiAgICBjb25zdCByZXN1bHQgPSB7IHBheWxvYWQsIHByb3RlY3RlZEhlYWRlcjogdmVyaWZpZWQucHJvdGVjdGVkSGVhZGVyIH07XG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4ucmVzdWx0LCBrZXk6IHZlcmlmaWVkLmtleSB9O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuIiwiaW1wb3J0IHsgdG9TUEtJIGFzIGV4cG9ydFB1YmxpYyB9IGZyb20gJy4uL3J1bnRpbWUvYXNuMS5qcyc7XG5pbXBvcnQgeyB0b1BLQ1M4IGFzIGV4cG9ydFByaXZhdGUgfSBmcm9tICcuLi9ydW50aW1lL2FzbjEuanMnO1xuaW1wb3J0IGtleVRvSldLIGZyb20gJy4uL3J1bnRpbWUva2V5X3RvX2p3ay5qcyc7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhwb3J0U1BLSShrZXkpIHtcbiAgICByZXR1cm4gZXhwb3J0UHVibGljKGtleSk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhwb3J0UEtDUzgoa2V5KSB7XG4gICAgcmV0dXJuIGV4cG9ydFByaXZhdGUoa2V5KTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleHBvcnRKV0soa2V5KSB7XG4gICAgcmV0dXJuIGtleVRvSldLKGtleSk7XG59XG4iLCJpbXBvcnQgeyBnZW5lcmF0ZUtleVBhaXIgYXMgZ2VuZXJhdGUgfSBmcm9tICcuLi9ydW50aW1lL2dlbmVyYXRlLmpzJztcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUtleVBhaXIoYWxnLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGdlbmVyYXRlKGFsZywgb3B0aW9ucyk7XG59XG4iLCJpbXBvcnQgeyBkZWNvZGUgYXMgZGVjb2RlQmFzZTY0VVJMLCBlbmNvZGVCYXNlNjQsIGRlY29kZUJhc2U2NCB9IGZyb20gJy4uL3J1bnRpbWUvYmFzZTY0dXJsLmpzJztcbmltcG9ydCB7IGZyb21TUEtJIGFzIGltcG9ydFB1YmxpYyB9IGZyb20gJy4uL3J1bnRpbWUvYXNuMS5qcyc7XG5pbXBvcnQgeyBmcm9tUEtDUzggYXMgaW1wb3J0UHJpdmF0ZSB9IGZyb20gJy4uL3J1bnRpbWUvYXNuMS5qcyc7XG5pbXBvcnQgYXNLZXlPYmplY3QgZnJvbSAnLi4vcnVudGltZS9qd2tfdG9fa2V5LmpzJztcbmltcG9ydCB7IEpPU0VOb3RTdXBwb3J0ZWQgfSBmcm9tICcuLi91dGlsL2Vycm9ycy5qcyc7XG5pbXBvcnQgZm9ybWF0UEVNIGZyb20gJy4uL2xpYi9mb3JtYXRfcGVtLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuLi9saWIvaXNfb2JqZWN0LmpzJztcbmZ1bmN0aW9uIGdldEVsZW1lbnQoc2VxKSB7XG4gICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgIGxldCBuZXh0ID0gMDtcbiAgICB3aGlsZSAobmV4dCA8IHNlcS5sZW5ndGgpIHtcbiAgICAgICAgbGV0IG5leHRQYXJ0ID0gcGFyc2VFbGVtZW50KHNlcS5zdWJhcnJheShuZXh0KSk7XG4gICAgICAgIHJlc3VsdC5wdXNoKG5leHRQYXJ0KTtcbiAgICAgICAgbmV4dCArPSBuZXh0UGFydC5ieXRlTGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gcGFyc2VFbGVtZW50KGJ5dGVzKSB7XG4gICAgbGV0IHBvc2l0aW9uID0gMDtcbiAgICBsZXQgdGFnID0gYnl0ZXNbMF0gJiAweDFmO1xuICAgIHBvc2l0aW9uKys7XG4gICAgaWYgKHRhZyA9PT0gMHgxZikge1xuICAgICAgICB0YWcgPSAwO1xuICAgICAgICB3aGlsZSAoYnl0ZXNbcG9zaXRpb25dID49IDB4ODApIHtcbiAgICAgICAgICAgIHRhZyA9IHRhZyAqIDEyOCArIGJ5dGVzW3Bvc2l0aW9uXSAtIDB4ODA7XG4gICAgICAgICAgICBwb3NpdGlvbisrO1xuICAgICAgICB9XG4gICAgICAgIHRhZyA9IHRhZyAqIDEyOCArIGJ5dGVzW3Bvc2l0aW9uXSAtIDB4ODA7XG4gICAgICAgIHBvc2l0aW9uKys7XG4gICAgfVxuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGlmIChieXRlc1twb3NpdGlvbl0gPCAweDgwKSB7XG4gICAgICAgIGxlbmd0aCA9IGJ5dGVzW3Bvc2l0aW9uXTtcbiAgICAgICAgcG9zaXRpb24rKztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxldCBudW1iZXJPZkRpZ2l0cyA9IGJ5dGVzW3Bvc2l0aW9uXSAmIDB4N2Y7XG4gICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgIGxlbmd0aCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZEaWdpdHM7IGkrKykge1xuICAgICAgICAgICAgbGVuZ3RoID0gbGVuZ3RoICogMjU2ICsgYnl0ZXNbcG9zaXRpb25dO1xuICAgICAgICAgICAgcG9zaXRpb24rKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobGVuZ3RoID09PSAweDgwKSB7XG4gICAgICAgIGxlbmd0aCA9IDA7XG4gICAgICAgIHdoaWxlIChieXRlc1twb3NpdGlvbiArIGxlbmd0aF0gIT09IDAgfHwgYnl0ZXNbcG9zaXRpb24gKyBsZW5ndGggKyAxXSAhPT0gMCkge1xuICAgICAgICAgICAgbGVuZ3RoKys7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYnl0ZUxlbmd0aCA9IHBvc2l0aW9uICsgbGVuZ3RoICsgMjtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJ5dGVMZW5ndGgsXG4gICAgICAgICAgICBjb250ZW50czogYnl0ZXMuc3ViYXJyYXkocG9zaXRpb24sIHBvc2l0aW9uICsgbGVuZ3RoKSxcbiAgICAgICAgICAgIHJhdzogYnl0ZXMuc3ViYXJyYXkoMCwgYnl0ZUxlbmd0aCksXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IGJ5dGVMZW5ndGggPSBwb3NpdGlvbiArIGxlbmd0aDtcbiAgICByZXR1cm4ge1xuICAgICAgICBieXRlTGVuZ3RoLFxuICAgICAgICBjb250ZW50czogYnl0ZXMuc3ViYXJyYXkocG9zaXRpb24sIGJ5dGVMZW5ndGgpLFxuICAgICAgICByYXc6IGJ5dGVzLnN1YmFycmF5KDAsIGJ5dGVMZW5ndGgpLFxuICAgIH07XG59XG5mdW5jdGlvbiBzcGtpRnJvbVg1MDkoYnVmKSB7XG4gICAgcmV0dXJuIGVuY29kZUJhc2U2NChnZXRFbGVtZW50KGdldEVsZW1lbnQocGFyc2VFbGVtZW50KGJ1ZikuY29udGVudHMpWzBdLmNvbnRlbnRzKVs2XS5yYXcpO1xufVxuZnVuY3Rpb24gZ2V0U1BLSSh4NTA5KSB7XG4gICAgY29uc3QgcGVtID0geDUwOS5yZXBsYWNlKC8oPzotLS0tLSg/OkJFR0lOfEVORCkgQ0VSVElGSUNBVEUtLS0tLXxcXHMpL2csICcnKTtcbiAgICBjb25zdCByYXcgPSBkZWNvZGVCYXNlNjQocGVtKTtcbiAgICByZXR1cm4gZm9ybWF0UEVNKHNwa2lGcm9tWDUwOShyYXcpLCAnUFVCTElDIEtFWScpO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFNQS0koc3BraSwgYWxnLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBzcGtpICE9PSAnc3RyaW5nJyB8fCBzcGtpLmluZGV4T2YoJy0tLS0tQkVHSU4gUFVCTElDIEtFWS0tLS0tJykgIT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzcGtpXCIgbXVzdCBiZSBTUEtJIGZvcm1hdHRlZCBzdHJpbmcnKTtcbiAgICB9XG4gICAgcmV0dXJuIGltcG9ydFB1YmxpYyhzcGtpLCBhbGcsIG9wdGlvbnMpO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFg1MDkoeDUwOSwgYWxnLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiB4NTA5ICE9PSAnc3RyaW5nJyB8fCB4NTA5LmluZGV4T2YoJy0tLS0tQkVHSU4gQ0VSVElGSUNBVEUtLS0tLScpICE9PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wieDUwOVwiIG11c3QgYmUgWC41MDkgZm9ybWF0dGVkIHN0cmluZycpO1xuICAgIH1cbiAgICBjb25zdCBzcGtpID0gZ2V0U1BLSSh4NTA5KTtcbiAgICByZXR1cm4gaW1wb3J0UHVibGljKHNwa2ksIGFsZywgb3B0aW9ucyk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW1wb3J0UEtDUzgocGtjczgsIGFsZywgb3B0aW9ucykge1xuICAgIGlmICh0eXBlb2YgcGtjczggIT09ICdzdHJpbmcnIHx8IHBrY3M4LmluZGV4T2YoJy0tLS0tQkVHSU4gUFJJVkFURSBLRVktLS0tLScpICE9PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wicGtjczhcIiBtdXN0IGJlIFBDS1M4IGZvcm1hdHRlZCBzdHJpbmcnKTtcbiAgICB9XG4gICAgcmV0dXJuIGltcG9ydFByaXZhdGUocGtjczgsIGFsZywgb3B0aW9ucyk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW1wb3J0SldLKGp3aywgYWxnLCBvY3RBc0tleU9iamVjdCkge1xuICAgIGlmICghaXNPYmplY3QoandrKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdKV0sgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgICB9XG4gICAgYWxnIHx8IChhbGcgPSBqd2suYWxnKTtcbiAgICBpZiAodHlwZW9mIGFsZyAhPT0gJ3N0cmluZycgfHwgIWFsZykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImFsZ1wiIGFyZ3VtZW50IGlzIHJlcXVpcmVkIHdoZW4gXCJqd2suYWxnXCIgaXMgbm90IHByZXNlbnQnKTtcbiAgICB9XG4gICAgc3dpdGNoIChqd2sua3R5KSB7XG4gICAgICAgIGNhc2UgJ29jdCc6XG4gICAgICAgICAgICBpZiAodHlwZW9mIGp3ay5rICE9PSAnc3RyaW5nJyB8fCAhandrLmspIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdtaXNzaW5nIFwia1wiIChLZXkgVmFsdWUpIFBhcmFtZXRlciB2YWx1ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2N0QXNLZXlPYmplY3QgIT09IG51bGwgJiYgb2N0QXNLZXlPYmplY3QgIT09IHZvaWQgMCA/IG9jdEFzS2V5T2JqZWN0IDogKG9jdEFzS2V5T2JqZWN0ID0gandrLmV4dCAhPT0gdHJ1ZSk7XG4gICAgICAgICAgICBpZiAob2N0QXNLZXlPYmplY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXNLZXlPYmplY3QoeyAuLi5qd2ssIGFsZywgZXh0OiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkZWNvZGVCYXNlNjRVUkwoandrLmspO1xuICAgICAgICBjYXNlICdSU0EnOlxuICAgICAgICAgICAgaWYgKGp3ay5vdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdSU0EgSldLIFwib3RoXCIgKE90aGVyIFByaW1lcyBJbmZvKSBQYXJhbWV0ZXIgdmFsdWUgaXMgbm90IHN1cHBvcnRlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICBjYXNlICdFQyc6XG4gICAgICAgIGNhc2UgJ09LUCc6XG4gICAgICAgICAgICByZXR1cm4gYXNLZXlPYmplY3QoeyAuLi5qd2ssIGFsZyB9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdVbnN1cHBvcnRlZCBcImt0eVwiIChLZXkgVHlwZSkgUGFyYW1ldGVyIHZhbHVlJyk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IGVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKTtcbmV4cG9ydCBjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7XG5jb25zdCBNQVhfSU5UMzIgPSAyICoqIDMyO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdCguLi5idWZmZXJzKSB7XG4gICAgY29uc3Qgc2l6ZSA9IGJ1ZmZlcnMucmVkdWNlKChhY2MsIHsgbGVuZ3RoIH0pID0+IGFjYyArIGxlbmd0aCwgMCk7XG4gICAgY29uc3QgYnVmID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XG4gICAgbGV0IGkgPSAwO1xuICAgIGJ1ZmZlcnMuZm9yRWFjaCgoYnVmZmVyKSA9PiB7XG4gICAgICAgIGJ1Zi5zZXQoYnVmZmVyLCBpKTtcbiAgICAgICAgaSArPSBidWZmZXIubGVuZ3RoO1xuICAgIH0pO1xuICAgIHJldHVybiBidWY7XG59XG5leHBvcnQgZnVuY3Rpb24gcDJzKGFsZywgcDJzSW5wdXQpIHtcbiAgICByZXR1cm4gY29uY2F0KGVuY29kZXIuZW5jb2RlKGFsZyksIG5ldyBVaW50OEFycmF5KFswXSksIHAyc0lucHV0KTtcbn1cbmZ1bmN0aW9uIHdyaXRlVUludDMyQkUoYnVmLCB2YWx1ZSwgb2Zmc2V0KSB7XG4gICAgaWYgKHZhbHVlIDwgMCB8fCB2YWx1ZSA+PSBNQVhfSU5UMzIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYHZhbHVlIG11c3QgYmUgPj0gMCBhbmQgPD0gJHtNQVhfSU5UMzIgLSAxfS4gUmVjZWl2ZWQgJHt2YWx1ZX1gKTtcbiAgICB9XG4gICAgYnVmLnNldChbdmFsdWUgPj4+IDI0LCB2YWx1ZSA+Pj4gMTYsIHZhbHVlID4+PiA4LCB2YWx1ZSAmIDB4ZmZdLCBvZmZzZXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHVpbnQ2NGJlKHZhbHVlKSB7XG4gICAgY29uc3QgaGlnaCA9IE1hdGguZmxvb3IodmFsdWUgLyBNQVhfSU5UMzIpO1xuICAgIGNvbnN0IGxvdyA9IHZhbHVlICUgTUFYX0lOVDMyO1xuICAgIGNvbnN0IGJ1ZiA9IG5ldyBVaW50OEFycmF5KDgpO1xuICAgIHdyaXRlVUludDMyQkUoYnVmLCBoaWdoLCAwKTtcbiAgICB3cml0ZVVJbnQzMkJFKGJ1ZiwgbG93LCA0KTtcbiAgICByZXR1cm4gYnVmO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHVpbnQzMmJlKHZhbHVlKSB7XG4gICAgY29uc3QgYnVmID0gbmV3IFVpbnQ4QXJyYXkoNCk7XG4gICAgd3JpdGVVSW50MzJCRShidWYsIHZhbHVlKTtcbiAgICByZXR1cm4gYnVmO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGxlbmd0aEFuZElucHV0KGlucHV0KSB7XG4gICAgcmV0dXJuIGNvbmNhdCh1aW50MzJiZShpbnB1dC5sZW5ndGgpLCBpbnB1dCk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29uY2F0S2RmKGRpZ2VzdCwgc2VjcmV0LCBiaXRzLCB2YWx1ZSkge1xuICAgIGNvbnN0IGl0ZXJhdGlvbnMgPSBNYXRoLmNlaWwoKGJpdHMgPj4gMykgLyAzMik7XG4gICAgbGV0IHJlcztcbiAgICBmb3IgKGxldCBpdGVyID0gMTsgaXRlciA8PSBpdGVyYXRpb25zOyBpdGVyKyspIHtcbiAgICAgICAgY29uc3QgYnVmID0gbmV3IFVpbnQ4QXJyYXkoNCArIHNlY3JldC5sZW5ndGggKyB2YWx1ZS5sZW5ndGgpO1xuICAgICAgICBidWYuc2V0KHVpbnQzMmJlKGl0ZXIpKTtcbiAgICAgICAgYnVmLnNldChzZWNyZXQsIDQpO1xuICAgICAgICBidWYuc2V0KHZhbHVlLCA0ICsgc2VjcmV0Lmxlbmd0aCk7XG4gICAgICAgIGlmICghcmVzKSB7XG4gICAgICAgICAgICByZXMgPSBhd2FpdCBkaWdlc3QoJ3NoYTI1NicsIGJ1Zik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXMgPSBjb25jYXQocmVzLCBhd2FpdCBkaWdlc3QoJ3NoYTI1NicsIGJ1ZikpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlcyA9IHJlcy5zbGljZSgwLCBiaXRzID4+IDMpO1xuICAgIHJldHVybiByZXM7XG59XG4iLCJpbXBvcnQgaW52YWxpZEtleUlucHV0IGZyb20gJy4vaW52YWxpZF9rZXlfaW5wdXQuanMnO1xuaW1wb3J0IGlzS2V5TGlrZSwgeyB0eXBlcyB9IGZyb20gJy4uL3J1bnRpbWUvaXNfa2V5X2xpa2UuanMnO1xuY29uc3Qgc3ltbWV0cmljVHlwZUNoZWNrID0gKGtleSkgPT4ge1xuICAgIGlmIChrZXkgaW5zdGFuY2VvZiBVaW50OEFycmF5KVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKCFpc0tleUxpa2Uoa2V5KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGludmFsaWRLZXlJbnB1dChrZXksIC4uLnR5cGVzLCAnVWludDhBcnJheScpKTtcbiAgICB9XG4gICAgaWYgKGtleS50eXBlICE9PSAnc2VjcmV0Jykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke3R5cGVzLmpvaW4oJyBvciAnKX0gaW5zdGFuY2VzIGZvciBzeW1tZXRyaWMgYWxnb3JpdGhtcyBtdXN0IGJlIG9mIHR5cGUgXCJzZWNyZXRcImApO1xuICAgIH1cbn07XG5jb25zdCBhc3ltbWV0cmljVHlwZUNoZWNrID0gKGtleSwgdXNhZ2UpID0+IHtcbiAgICBpZiAoIWlzS2V5TGlrZShrZXkpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoaW52YWxpZEtleUlucHV0KGtleSwgLi4udHlwZXMpKTtcbiAgICB9XG4gICAgaWYgKGtleS50eXBlID09PSAnc2VjcmV0Jykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke3R5cGVzLmpvaW4oJyBvciAnKX0gaW5zdGFuY2VzIGZvciBhc3ltbWV0cmljIGFsZ29yaXRobXMgbXVzdCBub3QgYmUgb2YgdHlwZSBcInNlY3JldFwiYCk7XG4gICAgfVxuICAgIGlmICh1c2FnZSA9PT0gJ3NpZ24nICYmIGtleS50eXBlID09PSAncHVibGljJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke3R5cGVzLmpvaW4oJyBvciAnKX0gaW5zdGFuY2VzIGZvciBhc3ltbWV0cmljIGFsZ29yaXRobSBzaWduaW5nIG11c3QgYmUgb2YgdHlwZSBcInByaXZhdGVcImApO1xuICAgIH1cbiAgICBpZiAodXNhZ2UgPT09ICdkZWNyeXB0JyAmJiBrZXkudHlwZSA9PT0gJ3B1YmxpYycpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0eXBlcy5qb2luKCcgb3IgJyl9IGluc3RhbmNlcyBmb3IgYXN5bW1ldHJpYyBhbGdvcml0aG0gZGVjcnlwdGlvbiBtdXN0IGJlIG9mIHR5cGUgXCJwcml2YXRlXCJgKTtcbiAgICB9XG4gICAgaWYgKGtleS5hbGdvcml0aG0gJiYgdXNhZ2UgPT09ICd2ZXJpZnknICYmIGtleS50eXBlID09PSAncHJpdmF0ZScpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0eXBlcy5qb2luKCcgb3IgJyl9IGluc3RhbmNlcyBmb3IgYXN5bW1ldHJpYyBhbGdvcml0aG0gdmVyaWZ5aW5nIG11c3QgYmUgb2YgdHlwZSBcInB1YmxpY1wiYCk7XG4gICAgfVxuICAgIGlmIChrZXkuYWxnb3JpdGhtICYmIHVzYWdlID09PSAnZW5jcnlwdCcgJiYga2V5LnR5cGUgPT09ICdwcml2YXRlJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke3R5cGVzLmpvaW4oJyBvciAnKX0gaW5zdGFuY2VzIGZvciBhc3ltbWV0cmljIGFsZ29yaXRobSBlbmNyeXB0aW9uIG11c3QgYmUgb2YgdHlwZSBcInB1YmxpY1wiYCk7XG4gICAgfVxufTtcbmNvbnN0IGNoZWNrS2V5VHlwZSA9IChhbGcsIGtleSwgdXNhZ2UpID0+IHtcbiAgICBjb25zdCBzeW1tZXRyaWMgPSBhbGcuc3RhcnRzV2l0aCgnSFMnKSB8fFxuICAgICAgICBhbGcgPT09ICdkaXInIHx8XG4gICAgICAgIGFsZy5zdGFydHNXaXRoKCdQQkVTMicpIHx8XG4gICAgICAgIC9eQVxcZHszfSg/OkdDTSk/S1ckLy50ZXN0KGFsZyk7XG4gICAgaWYgKHN5bW1ldHJpYykge1xuICAgICAgICBzeW1tZXRyaWNUeXBlQ2hlY2soa2V5KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGFzeW1tZXRyaWNUeXBlQ2hlY2soa2V5LCB1c2FnZSk7XG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGNoZWNrS2V5VHlwZTtcbiIsImltcG9ydCB7IGlzQ2xvdWRmbGFyZVdvcmtlcnMsIGlzTm9kZUpzIH0gZnJvbSAnLi4vcnVudGltZS9nbG9iYWwuanMnO1xuZnVuY3Rpb24gdW51c2FibGUobmFtZSwgcHJvcCA9ICdhbGdvcml0aG0ubmFtZScpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihgQ3J5cHRvS2V5IGRvZXMgbm90IHN1cHBvcnQgdGhpcyBvcGVyYXRpb24sIGl0cyAke3Byb3B9IG11c3QgYmUgJHtuYW1lfWApO1xufVxuZnVuY3Rpb24gaXNBbGdvcml0aG0oYWxnb3JpdGhtLCBuYW1lKSB7XG4gICAgcmV0dXJuIGFsZ29yaXRobS5uYW1lID09PSBuYW1lO1xufVxuZnVuY3Rpb24gZ2V0SGFzaExlbmd0aChoYXNoKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGhhc2gubmFtZS5zdWJzdHIoNCksIDEwKTtcbn1cbmZ1bmN0aW9uIGdldE5hbWVkQ3VydmUoYWxnKSB7XG4gICAgc3dpdGNoIChhbGcpIHtcbiAgICAgICAgY2FzZSAnRVMyNTYnOlxuICAgICAgICAgICAgcmV0dXJuICdQLTI1Nic7XG4gICAgICAgIGNhc2UgJ0VTMzg0JzpcbiAgICAgICAgICAgIHJldHVybiAnUC0zODQnO1xuICAgICAgICBjYXNlICdFUzUxMic6XG4gICAgICAgICAgICByZXR1cm4gJ1AtNTIxJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWFjaGFibGUnKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjaGVja1VzYWdlKGtleSwgdXNhZ2VzKSB7XG4gICAgaWYgKHVzYWdlcy5sZW5ndGggJiYgIXVzYWdlcy5zb21lKChleHBlY3RlZCkgPT4ga2V5LnVzYWdlcy5pbmNsdWRlcyhleHBlY3RlZCkpKSB7XG4gICAgICAgIGxldCBtc2cgPSAnQ3J5cHRvS2V5IGRvZXMgbm90IHN1cHBvcnQgdGhpcyBvcGVyYXRpb24sIGl0cyB1c2FnZXMgbXVzdCBpbmNsdWRlICc7XG4gICAgICAgIGlmICh1c2FnZXMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgY29uc3QgbGFzdCA9IHVzYWdlcy5wb3AoKTtcbiAgICAgICAgICAgIG1zZyArPSBgb25lIG9mICR7dXNhZ2VzLmpvaW4oJywgJyl9LCBvciAke2xhc3R9LmA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodXNhZ2VzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgbXNnICs9IGBvbmUgb2YgJHt1c2FnZXNbMF19IG9yICR7dXNhZ2VzWzFdfS5gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbXNnICs9IGAke3VzYWdlc1swXX0uYDtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKG1zZyk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrU2lnQ3J5cHRvS2V5KGtleSwgYWxnLCAuLi51c2FnZXMpIHtcbiAgICBzd2l0Y2ggKGFsZykge1xuICAgICAgICBjYXNlICdIUzI1Nic6XG4gICAgICAgIGNhc2UgJ0hTMzg0JzpcbiAgICAgICAgY2FzZSAnSFM1MTInOiB7XG4gICAgICAgICAgICBpZiAoIWlzQWxnb3JpdGhtKGtleS5hbGdvcml0aG0sICdITUFDJykpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoJ0hNQUMnKTtcbiAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkID0gcGFyc2VJbnQoYWxnLnN1YnN0cigyKSwgMTApO1xuICAgICAgICAgICAgY29uc3QgYWN0dWFsID0gZ2V0SGFzaExlbmd0aChrZXkuYWxnb3JpdGhtLmhhc2gpO1xuICAgICAgICAgICAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoYFNIQS0ke2V4cGVjdGVkfWAsICdhbGdvcml0aG0uaGFzaCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnUlMyNTYnOlxuICAgICAgICBjYXNlICdSUzM4NCc6XG4gICAgICAgIGNhc2UgJ1JTNTEyJzoge1xuICAgICAgICAgICAgaWYgKCFpc0FsZ29yaXRobShrZXkuYWxnb3JpdGhtLCAnUlNBU1NBLVBLQ1MxLXYxXzUnKSlcbiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZSgnUlNBU1NBLVBLQ1MxLXYxXzUnKTtcbiAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkID0gcGFyc2VJbnQoYWxnLnN1YnN0cigyKSwgMTApO1xuICAgICAgICAgICAgY29uc3QgYWN0dWFsID0gZ2V0SGFzaExlbmd0aChrZXkuYWxnb3JpdGhtLmhhc2gpO1xuICAgICAgICAgICAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoYFNIQS0ke2V4cGVjdGVkfWAsICdhbGdvcml0aG0uaGFzaCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnUFMyNTYnOlxuICAgICAgICBjYXNlICdQUzM4NCc6XG4gICAgICAgIGNhc2UgJ1BTNTEyJzoge1xuICAgICAgICAgICAgaWYgKCFpc0FsZ29yaXRobShrZXkuYWxnb3JpdGhtLCAnUlNBLVBTUycpKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKCdSU0EtUFNTJyk7XG4gICAgICAgICAgICBjb25zdCBleHBlY3RlZCA9IHBhcnNlSW50KGFsZy5zdWJzdHIoMiksIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbCA9IGdldEhhc2hMZW5ndGgoa2V5LmFsZ29yaXRobS5oYXNoKTtcbiAgICAgICAgICAgIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKGBTSEEtJHtleHBlY3RlZH1gLCAnYWxnb3JpdGhtLmhhc2gnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgaXNOb2RlSnMoKSAmJiAnRWREU0EnOiB7XG4gICAgICAgICAgICBpZiAoa2V5LmFsZ29yaXRobS5uYW1lICE9PSAnTk9ERS1FRDI1NTE5JyAmJiBrZXkuYWxnb3JpdGhtLm5hbWUgIT09ICdOT0RFLUVENDQ4JylcbiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZSgnTk9ERS1FRDI1NTE5IG9yIE5PREUtRUQ0NDgnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgaXNDbG91ZGZsYXJlV29ya2VycygpICYmICdFZERTQSc6IHtcbiAgICAgICAgICAgIGlmICghaXNBbGdvcml0aG0oa2V5LmFsZ29yaXRobSwgJ05PREUtRUQyNTUxOScpKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKCdOT0RFLUVEMjU1MTknKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ0VTMjU2JzpcbiAgICAgICAgY2FzZSAnRVMzODQnOlxuICAgICAgICBjYXNlICdFUzUxMic6IHtcbiAgICAgICAgICAgIGlmICghaXNBbGdvcml0aG0oa2V5LmFsZ29yaXRobSwgJ0VDRFNBJykpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoJ0VDRFNBJyk7XG4gICAgICAgICAgICBjb25zdCBleHBlY3RlZCA9IGdldE5hbWVkQ3VydmUoYWxnKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbCA9IGtleS5hbGdvcml0aG0ubmFtZWRDdXJ2ZTtcbiAgICAgICAgICAgIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKGV4cGVjdGVkLCAnYWxnb3JpdGhtLm5hbWVkQ3VydmUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDcnlwdG9LZXkgZG9lcyBub3Qgc3VwcG9ydCB0aGlzIG9wZXJhdGlvbicpO1xuICAgIH1cbiAgICBjaGVja1VzYWdlKGtleSwgdXNhZ2VzKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0VuY0NyeXB0b0tleShrZXksIGFsZywgLi4udXNhZ2VzKSB7XG4gICAgc3dpdGNoIChhbGcpIHtcbiAgICAgICAgY2FzZSAnQTEyOEdDTSc6XG4gICAgICAgIGNhc2UgJ0ExOTJHQ00nOlxuICAgICAgICBjYXNlICdBMjU2R0NNJzoge1xuICAgICAgICAgICAgaWYgKCFpc0FsZ29yaXRobShrZXkuYWxnb3JpdGhtLCAnQUVTLUdDTScpKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKCdBRVMtR0NNJyk7XG4gICAgICAgICAgICBjb25zdCBleHBlY3RlZCA9IHBhcnNlSW50KGFsZy5zdWJzdHIoMSwgMyksIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbCA9IGtleS5hbGdvcml0aG0ubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoZXhwZWN0ZWQsICdhbGdvcml0aG0ubGVuZ3RoJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdBMTI4S1cnOlxuICAgICAgICBjYXNlICdBMTkyS1cnOlxuICAgICAgICBjYXNlICdBMjU2S1cnOiB7XG4gICAgICAgICAgICBpZiAoIWlzQWxnb3JpdGhtKGtleS5hbGdvcml0aG0sICdBRVMtS1cnKSlcbiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZSgnQUVTLUtXJyk7XG4gICAgICAgICAgICBjb25zdCBleHBlY3RlZCA9IHBhcnNlSW50KGFsZy5zdWJzdHIoMSwgMyksIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbCA9IGtleS5hbGdvcml0aG0ubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoZXhwZWN0ZWQsICdhbGdvcml0aG0ubGVuZ3RoJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdFQ0RILUVTJzpcbiAgICAgICAgICAgIGlmICghaXNBbGdvcml0aG0oa2V5LmFsZ29yaXRobSwgJ0VDREgnKSlcbiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZSgnRUNESCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1BCRVMyLUhTMjU2K0ExMjhLVyc6XG4gICAgICAgIGNhc2UgJ1BCRVMyLUhTMzg0K0ExOTJLVyc6XG4gICAgICAgIGNhc2UgJ1BCRVMyLUhTNTEyK0EyNTZLVyc6XG4gICAgICAgICAgICBpZiAoIWlzQWxnb3JpdGhtKGtleS5hbGdvcml0aG0sICdQQktERjInKSlcbiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZSgnUEJLREYyJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAnOlxuICAgICAgICBjYXNlICdSU0EtT0FFUC0yNTYnOlxuICAgICAgICBjYXNlICdSU0EtT0FFUC0zODQnOlxuICAgICAgICBjYXNlICdSU0EtT0FFUC01MTInOiB7XG4gICAgICAgICAgICBpZiAoIWlzQWxnb3JpdGhtKGtleS5hbGdvcml0aG0sICdSU0EtT0FFUCcpKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKCdSU0EtT0FFUCcpO1xuICAgICAgICAgICAgY29uc3QgZXhwZWN0ZWQgPSBwYXJzZUludChhbGcuc3Vic3RyKDkpLCAxMCkgfHwgMTtcbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbCA9IGdldEhhc2hMZW5ndGgoa2V5LmFsZ29yaXRobS5oYXNoKTtcbiAgICAgICAgICAgIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKGBTSEEtJHtleHBlY3RlZH1gLCAnYWxnb3JpdGhtLmhhc2gnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDcnlwdG9LZXkgZG9lcyBub3Qgc3VwcG9ydCB0aGlzIG9wZXJhdGlvbicpO1xuICAgIH1cbiAgICBjaGVja1VzYWdlKGtleSwgdXNhZ2VzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IChkYXRlKSA9PiBNYXRoLmZsb29yKGRhdGUuZ2V0VGltZSgpIC8gMTAwMCk7XG4iLCJleHBvcnQgZGVmYXVsdCAoYjY0LCBkZXNjcmlwdG9yKSA9PiB7XG4gICAgY29uc3QgbmV3bGluZWQgPSAoYjY0Lm1hdGNoKC8uezEsNjR9L2cpIHx8IFtdKS5qb2luKCdcXG4nKTtcbiAgICByZXR1cm4gYC0tLS0tQkVHSU4gJHtkZXNjcmlwdG9yfS0tLS0tXFxuJHtuZXdsaW5lZH1cXG4tLS0tLUVORCAke2Rlc2NyaXB0b3J9LS0tLS1gO1xufTtcbiIsImV4cG9ydCBkZWZhdWx0IChhY3R1YWwsIC4uLnR5cGVzKSA9PiB7XG4gICAgbGV0IG1zZyA9ICdLZXkgbXVzdCBiZSAnO1xuICAgIGlmICh0eXBlcy5sZW5ndGggPiAyKSB7XG4gICAgICAgIGNvbnN0IGxhc3QgPSB0eXBlcy5wb3AoKTtcbiAgICAgICAgbXNnICs9IGBvbmUgb2YgdHlwZSAke3R5cGVzLmpvaW4oJywgJyl9LCBvciAke2xhc3R9LmA7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBtc2cgKz0gYG9uZSBvZiB0eXBlICR7dHlwZXNbMF19IG9yICR7dHlwZXNbMV19LmA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBtc2cgKz0gYG9mIHR5cGUgJHt0eXBlc1swXX0uYDtcbiAgICB9XG4gICAgaWYgKGFjdHVhbCA9PSBudWxsKSB7XG4gICAgICAgIG1zZyArPSBgIFJlY2VpdmVkICR7YWN0dWFsfWA7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBhY3R1YWwgPT09ICdmdW5jdGlvbicgJiYgYWN0dWFsLm5hbWUpIHtcbiAgICAgICAgbXNnICs9IGAgUmVjZWl2ZWQgZnVuY3Rpb24gJHthY3R1YWwubmFtZX1gO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgYWN0dWFsID09PSAnb2JqZWN0JyAmJiBhY3R1YWwgIT0gbnVsbCkge1xuICAgICAgICBpZiAoYWN0dWFsLmNvbnN0cnVjdG9yICYmIGFjdHVhbC5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICAgICAgICBtc2cgKz0gYCBSZWNlaXZlZCBhbiBpbnN0YW5jZSBvZiAke2FjdHVhbC5jb25zdHJ1Y3Rvci5uYW1lfWA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1zZztcbn07XG4iLCJjb25zdCBpc0Rpc2pvaW50ID0gKC4uLmhlYWRlcnMpID0+IHtcbiAgICBjb25zdCBzb3VyY2VzID0gaGVhZGVycy5maWx0ZXIoQm9vbGVhbik7XG4gICAgaWYgKHNvdXJjZXMubGVuZ3RoID09PSAwIHx8IHNvdXJjZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsZXQgYWNjO1xuICAgIGZvciAoY29uc3QgaGVhZGVyIG9mIHNvdXJjZXMpIHtcbiAgICAgICAgY29uc3QgcGFyYW1ldGVycyA9IE9iamVjdC5rZXlzKGhlYWRlcik7XG4gICAgICAgIGlmICghYWNjIHx8IGFjYy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICBhY2MgPSBuZXcgU2V0KHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBwYXJhbWV0ZXIgb2YgcGFyYW1ldGVycykge1xuICAgICAgICAgICAgaWYgKGFjYy5oYXMocGFyYW1ldGVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFjYy5hZGQocGFyYW1ldGVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5leHBvcnQgZGVmYXVsdCBpc0Rpc2pvaW50O1xuIiwiZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGw7XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc09iamVjdChpbnB1dCkge1xuICAgIGlmICghaXNPYmplY3RMaWtlKGlucHV0KSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YoaW5wdXQpID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsZXQgcHJvdG8gPSBpbnB1dDtcbiAgICB3aGlsZSAoT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKSAhPT0gbnVsbCkge1xuICAgICAgICBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90byk7XG4gICAgfVxuICAgIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoaW5wdXQpID09PSBwcm90bztcbn1cbiIsImltcG9ydCB7IEpXVENsYWltVmFsaWRhdGlvbkZhaWxlZCwgSldURXhwaXJlZCwgSldUSW52YWxpZCB9IGZyb20gJy4uL3V0aWwvZXJyb3JzLmpzJztcbmltcG9ydCB7IGRlY29kZXIgfSBmcm9tICcuL2J1ZmZlcl91dGlscy5qcyc7XG5pbXBvcnQgZXBvY2ggZnJvbSAnLi9lcG9jaC5qcyc7XG5pbXBvcnQgc2VjcyBmcm9tICcuL3NlY3MuanMnO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNfb2JqZWN0LmpzJztcbmNvbnN0IG5vcm1hbGl6ZVR5cCA9ICh2YWx1ZSkgPT4gdmFsdWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9eYXBwbGljYXRpb25cXC8vLCAnJyk7XG5jb25zdCBjaGVja0F1ZGllbmNlUHJlc2VuY2UgPSAoYXVkUGF5bG9hZCwgYXVkT3B0aW9uKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBhdWRQYXlsb2FkID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gYXVkT3B0aW9uLmluY2x1ZGVzKGF1ZFBheWxvYWQpO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShhdWRQYXlsb2FkKSkge1xuICAgICAgICByZXR1cm4gYXVkT3B0aW9uLnNvbWUoU2V0LnByb3RvdHlwZS5oYXMuYmluZChuZXcgU2V0KGF1ZFBheWxvYWQpKSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5leHBvcnQgZGVmYXVsdCAocHJvdGVjdGVkSGVhZGVyLCBlbmNvZGVkUGF5bG9hZCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgY29uc3QgeyB0eXAgfSA9IG9wdGlvbnM7XG4gICAgaWYgKHR5cCAmJlxuICAgICAgICAodHlwZW9mIHByb3RlY3RlZEhlYWRlci50eXAgIT09ICdzdHJpbmcnIHx8XG4gICAgICAgICAgICBub3JtYWxpemVUeXAocHJvdGVjdGVkSGVhZGVyLnR5cCkgIT09IG5vcm1hbGl6ZVR5cCh0eXApKSkge1xuICAgICAgICB0aHJvdyBuZXcgSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkKCd1bmV4cGVjdGVkIFwidHlwXCIgSldUIGhlYWRlciB2YWx1ZScsICd0eXAnLCAnY2hlY2tfZmFpbGVkJyk7XG4gICAgfVxuICAgIGxldCBwYXlsb2FkO1xuICAgIHRyeSB7XG4gICAgICAgIHBheWxvYWQgPSBKU09OLnBhcnNlKGRlY29kZXIuZGVjb2RlKGVuY29kZWRQYXlsb2FkKSk7XG4gICAgfVxuICAgIGNhdGNoIChfYSkge1xuICAgIH1cbiAgICBpZiAoIWlzT2JqZWN0KHBheWxvYWQpKSB7XG4gICAgICAgIHRocm93IG5ldyBKV1RJbnZhbGlkKCdKV1QgQ2xhaW1zIFNldCBtdXN0IGJlIGEgdG9wLWxldmVsIEpTT04gb2JqZWN0Jyk7XG4gICAgfVxuICAgIGNvbnN0IHsgaXNzdWVyIH0gPSBvcHRpb25zO1xuICAgIGlmIChpc3N1ZXIgJiYgIShBcnJheS5pc0FycmF5KGlzc3VlcikgPyBpc3N1ZXIgOiBbaXNzdWVyXSkuaW5jbHVkZXMocGF5bG9hZC5pc3MpKSB7XG4gICAgICAgIHRocm93IG5ldyBKV1RDbGFpbVZhbGlkYXRpb25GYWlsZWQoJ3VuZXhwZWN0ZWQgXCJpc3NcIiBjbGFpbSB2YWx1ZScsICdpc3MnLCAnY2hlY2tfZmFpbGVkJyk7XG4gICAgfVxuICAgIGNvbnN0IHsgc3ViamVjdCB9ID0gb3B0aW9ucztcbiAgICBpZiAoc3ViamVjdCAmJiBwYXlsb2FkLnN1YiAhPT0gc3ViamVjdCkge1xuICAgICAgICB0aHJvdyBuZXcgSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkKCd1bmV4cGVjdGVkIFwic3ViXCIgY2xhaW0gdmFsdWUnLCAnc3ViJywgJ2NoZWNrX2ZhaWxlZCcpO1xuICAgIH1cbiAgICBjb25zdCB7IGF1ZGllbmNlIH0gPSBvcHRpb25zO1xuICAgIGlmIChhdWRpZW5jZSAmJlxuICAgICAgICAhY2hlY2tBdWRpZW5jZVByZXNlbmNlKHBheWxvYWQuYXVkLCB0eXBlb2YgYXVkaWVuY2UgPT09ICdzdHJpbmcnID8gW2F1ZGllbmNlXSA6IGF1ZGllbmNlKSkge1xuICAgICAgICB0aHJvdyBuZXcgSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkKCd1bmV4cGVjdGVkIFwiYXVkXCIgY2xhaW0gdmFsdWUnLCAnYXVkJywgJ2NoZWNrX2ZhaWxlZCcpO1xuICAgIH1cbiAgICBsZXQgdG9sZXJhbmNlO1xuICAgIHN3aXRjaCAodHlwZW9mIG9wdGlvbnMuY2xvY2tUb2xlcmFuY2UpIHtcbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgIHRvbGVyYW5jZSA9IHNlY3Mob3B0aW9ucy5jbG9ja1RvbGVyYW5jZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgIHRvbGVyYW5jZSA9IG9wdGlvbnMuY2xvY2tUb2xlcmFuY2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgICAgIHRvbGVyYW5jZSA9IDA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2xvY2tUb2xlcmFuY2Ugb3B0aW9uIHR5cGUnKTtcbiAgICB9XG4gICAgY29uc3QgeyBjdXJyZW50RGF0ZSB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBub3cgPSBlcG9jaChjdXJyZW50RGF0ZSB8fCBuZXcgRGF0ZSgpKTtcbiAgICBpZiAocGF5bG9hZC5pYXQgIT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLm1heFRva2VuQWdlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcGF5bG9hZC5pYXQgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkKCdcImlhdFwiIGNsYWltIG11c3QgYmUgYSBudW1iZXInLCAnaWF0JywgJ2ludmFsaWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5leHAgPT09IHVuZGVmaW5lZCAmJiBwYXlsb2FkLmlhdCA+IG5vdyArIHRvbGVyYW5jZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEpXVENsYWltVmFsaWRhdGlvbkZhaWxlZCgnXCJpYXRcIiBjbGFpbSB0aW1lc3RhbXAgY2hlY2sgZmFpbGVkIChpdCBzaG91bGQgYmUgaW4gdGhlIHBhc3QpJywgJ2lhdCcsICdjaGVja19mYWlsZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAocGF5bG9hZC5uYmYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodHlwZW9mIHBheWxvYWQubmJmICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEpXVENsYWltVmFsaWRhdGlvbkZhaWxlZCgnXCJuYmZcIiBjbGFpbSBtdXN0IGJlIGEgbnVtYmVyJywgJ25iZicsICdpbnZhbGlkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheWxvYWQubmJmID4gbm93ICsgdG9sZXJhbmNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkKCdcIm5iZlwiIGNsYWltIHRpbWVzdGFtcCBjaGVjayBmYWlsZWQnLCAnbmJmJywgJ2NoZWNrX2ZhaWxlZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChwYXlsb2FkLmV4cCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcGF5bG9hZC5leHAgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkKCdcImV4cFwiIGNsYWltIG11c3QgYmUgYSBudW1iZXInLCAnZXhwJywgJ2ludmFsaWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5leHAgPD0gbm93IC0gdG9sZXJhbmNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSldURXhwaXJlZCgnXCJleHBcIiBjbGFpbSB0aW1lc3RhbXAgY2hlY2sgZmFpbGVkJywgJ2V4cCcsICdjaGVja19mYWlsZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy5tYXhUb2tlbkFnZSkge1xuICAgICAgICBjb25zdCBhZ2UgPSBub3cgLSBwYXlsb2FkLmlhdDtcbiAgICAgICAgY29uc3QgbWF4ID0gdHlwZW9mIG9wdGlvbnMubWF4VG9rZW5BZ2UgPT09ICdudW1iZXInID8gb3B0aW9ucy5tYXhUb2tlbkFnZSA6IHNlY3Mob3B0aW9ucy5tYXhUb2tlbkFnZSk7XG4gICAgICAgIGlmIChhZ2UgLSB0b2xlcmFuY2UgPiBtYXgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBKV1RFeHBpcmVkKCdcImlhdFwiIGNsYWltIHRpbWVzdGFtcCBjaGVjayBmYWlsZWQgKHRvbyBmYXIgaW4gdGhlIHBhc3QpJywgJ2lhdCcsICdjaGVja19mYWlsZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWdlIDwgMCAtIHRvbGVyYW5jZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEpXVENsYWltVmFsaWRhdGlvbkZhaWxlZCgnXCJpYXRcIiBjbGFpbSB0aW1lc3RhbXAgY2hlY2sgZmFpbGVkIChpdCBzaG91bGQgYmUgaW4gdGhlIHBhc3QpJywgJ2lhdCcsICdjaGVja19mYWlsZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGF5bG9hZDtcbn07XG4iLCJjb25zdCBtaW51dGUgPSA2MDtcbmNvbnN0IGhvdXIgPSBtaW51dGUgKiA2MDtcbmNvbnN0IGRheSA9IGhvdXIgKiAyNDtcbmNvbnN0IHdlZWsgPSBkYXkgKiA3O1xuY29uc3QgeWVhciA9IGRheSAqIDM2NS4yNTtcbmNvbnN0IFJFR0VYID0gL14oXFxkK3xcXGQrXFwuXFxkKykgPyhzZWNvbmRzP3xzZWNzP3xzfG1pbnV0ZXM/fG1pbnM/fG18aG91cnM/fGhycz98aHxkYXlzP3xkfHdlZWtzP3x3fHllYXJzP3x5cnM/fHkpJC9pO1xuZXhwb3J0IGRlZmF1bHQgKHN0cikgPT4ge1xuICAgIGNvbnN0IG1hdGNoZWQgPSBSRUdFWC5leGVjKHN0cik7XG4gICAgaWYgKCFtYXRjaGVkKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgdGltZSBwZXJpb2QgZm9ybWF0Jyk7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gcGFyc2VGbG9hdChtYXRjaGVkWzFdKTtcbiAgICBjb25zdCB1bml0ID0gbWF0Y2hlZFsyXS50b0xvd2VyQ2FzZSgpO1xuICAgIHN3aXRjaCAodW5pdCkge1xuICAgICAgICBjYXNlICdzZWMnOlxuICAgICAgICBjYXNlICdzZWNzJzpcbiAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUpO1xuICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICBjYXNlICdtaW51dGVzJzpcbiAgICAgICAgY2FzZSAnbWluJzpcbiAgICAgICAgY2FzZSAnbWlucyc6XG4gICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiBtaW51dGUpO1xuICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgY2FzZSAnaG91cnMnOlxuICAgICAgICBjYXNlICdocic6XG4gICAgICAgIGNhc2UgJ2hycyc6XG4gICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiBob3VyKTtcbiAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgY2FzZSAnZGF5cyc6XG4gICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiBkYXkpO1xuICAgICAgICBjYXNlICd3ZWVrJzpcbiAgICAgICAgY2FzZSAnd2Vla3MnOlxuICAgICAgICBjYXNlICd3JzpcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogd2Vlayk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIHllYXIpO1xuICAgIH1cbn07XG4iLCJjb25zdCB2YWxpZGF0ZUFsZ29yaXRobXMgPSAob3B0aW9uLCBhbGdvcml0aG1zKSA9PiB7XG4gICAgaWYgKGFsZ29yaXRobXMgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAoIUFycmF5LmlzQXJyYXkoYWxnb3JpdGhtcykgfHwgYWxnb3JpdGhtcy5zb21lKChzKSA9PiB0eXBlb2YgcyAhPT0gJ3N0cmluZycpKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBcIiR7b3B0aW9ufVwiIG9wdGlvbiBtdXN0IGJlIGFuIGFycmF5IG9mIHN0cmluZ3NgKTtcbiAgICB9XG4gICAgaWYgKCFhbGdvcml0aG1zKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBuZXcgU2V0KGFsZ29yaXRobXMpO1xufTtcbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlQWxnb3JpdGhtcztcbiIsImltcG9ydCB7IEpPU0VOb3RTdXBwb3J0ZWQgfSBmcm9tICcuLi91dGlsL2Vycm9ycy5qcyc7XG5mdW5jdGlvbiB2YWxpZGF0ZUNyaXQoRXJyLCByZWNvZ25pemVkRGVmYXVsdCwgcmVjb2duaXplZE9wdGlvbiwgcHJvdGVjdGVkSGVhZGVyLCBqb3NlSGVhZGVyKSB7XG4gICAgaWYgKGpvc2VIZWFkZXIuY3JpdCAhPT0gdW5kZWZpbmVkICYmIHByb3RlY3RlZEhlYWRlci5jcml0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycignXCJjcml0XCIgKENyaXRpY2FsKSBIZWFkZXIgUGFyYW1ldGVyIE1VU1QgYmUgaW50ZWdyaXR5IHByb3RlY3RlZCcpO1xuICAgIH1cbiAgICBpZiAoIXByb3RlY3RlZEhlYWRlciB8fCBwcm90ZWN0ZWRIZWFkZXIuY3JpdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2V0KCk7XG4gICAgfVxuICAgIGlmICghQXJyYXkuaXNBcnJheShwcm90ZWN0ZWRIZWFkZXIuY3JpdCkgfHxcbiAgICAgICAgcHJvdGVjdGVkSGVhZGVyLmNyaXQubGVuZ3RoID09PSAwIHx8XG4gICAgICAgIHByb3RlY3RlZEhlYWRlci5jcml0LnNvbWUoKGlucHV0KSA9PiB0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnIHx8IGlucHV0Lmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycignXCJjcml0XCIgKENyaXRpY2FsKSBIZWFkZXIgUGFyYW1ldGVyIE1VU1QgYmUgYW4gYXJyYXkgb2Ygbm9uLWVtcHR5IHN0cmluZ3Mgd2hlbiBwcmVzZW50Jyk7XG4gICAgfVxuICAgIGxldCByZWNvZ25pemVkO1xuICAgIGlmIChyZWNvZ25pemVkT3B0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVjb2duaXplZCA9IG5ldyBNYXAoWy4uLk9iamVjdC5lbnRyaWVzKHJlY29nbml6ZWRPcHRpb24pLCAuLi5yZWNvZ25pemVkRGVmYXVsdC5lbnRyaWVzKCldKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlY29nbml6ZWQgPSByZWNvZ25pemVkRGVmYXVsdDtcbiAgICB9XG4gICAgZm9yIChjb25zdCBwYXJhbWV0ZXIgb2YgcHJvdGVjdGVkSGVhZGVyLmNyaXQpIHtcbiAgICAgICAgaWYgKCFyZWNvZ25pemVkLmhhcyhwYXJhbWV0ZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZChgRXh0ZW5zaW9uIEhlYWRlciBQYXJhbWV0ZXIgXCIke3BhcmFtZXRlcn1cIiBpcyBub3QgcmVjb2duaXplZGApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChqb3NlSGVhZGVyW3BhcmFtZXRlcl0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycihgRXh0ZW5zaW9uIEhlYWRlciBQYXJhbWV0ZXIgXCIke3BhcmFtZXRlcn1cIiBpcyBtaXNzaW5nYCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVjb2duaXplZC5nZXQocGFyYW1ldGVyKSAmJiBwcm90ZWN0ZWRIZWFkZXJbcGFyYW1ldGVyXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyKGBFeHRlbnNpb24gSGVhZGVyIFBhcmFtZXRlciBcIiR7cGFyYW1ldGVyfVwiIE1VU1QgYmUgaW50ZWdyaXR5IHByb3RlY3RlZGApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgU2V0KHByb3RlY3RlZEhlYWRlci5jcml0KTtcbn1cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlQ3JpdDtcbiIsImltcG9ydCBnbG9iYWxUaGlzLCB7IGlzQ2xvdWRmbGFyZVdvcmtlcnMsIGlzTm9kZUpzIH0gZnJvbSAnLi9nbG9iYWwuanMnO1xuaW1wb3J0IGNyeXB0bywgeyBpc0NyeXB0b0tleSB9IGZyb20gJy4vd2ViY3J5cHRvLmpzJztcbmltcG9ydCBpbnZhbGlkS2V5SW5wdXQgZnJvbSAnLi4vbGliL2ludmFsaWRfa2V5X2lucHV0LmpzJztcbmltcG9ydCB7IGVuY29kZUJhc2U2NCB9IGZyb20gJy4vYmFzZTY0dXJsLmpzJztcbmltcG9ydCBmb3JtYXRQRU0gZnJvbSAnLi4vbGliL2Zvcm1hdF9wZW0uanMnO1xuaW1wb3J0IHsgSk9TRU5vdFN1cHBvcnRlZCB9IGZyb20gJy4uL3V0aWwvZXJyb3JzLmpzJztcbmNvbnN0IGdlbmVyaWNFeHBvcnQgPSBhc3luYyAoa2V5VHlwZSwga2V5Rm9ybWF0LCBrZXkpID0+IHtcbiAgICBpZiAoIWlzQ3J5cHRvS2V5KGtleSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihpbnZhbGlkS2V5SW5wdXQoa2V5LCAnQ3J5cHRvS2V5JykpO1xuICAgIH1cbiAgICBpZiAoIWtleS5leHRyYWN0YWJsZSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDcnlwdG9LZXkgaXMgbm90IGV4dHJhY3RhYmxlJyk7XG4gICAgfVxuICAgIGlmIChrZXkudHlwZSAhPT0ga2V5VHlwZSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBrZXkgaXMgbm90IGEgJHtrZXlUeXBlfSBrZXlgKTtcbiAgICB9XG4gICAgcmV0dXJuIGZvcm1hdFBFTShlbmNvZGVCYXNlNjQobmV3IFVpbnQ4QXJyYXkoYXdhaXQgY3J5cHRvLnN1YnRsZS5leHBvcnRLZXkoa2V5Rm9ybWF0LCBrZXkpKSksIGAke2tleVR5cGUudG9VcHBlckNhc2UoKX0gS0VZYCk7XG59O1xuZXhwb3J0IGNvbnN0IHRvU1BLSSA9IChrZXkpID0+IHtcbiAgICByZXR1cm4gZ2VuZXJpY0V4cG9ydCgncHVibGljJywgJ3Nwa2knLCBrZXkpO1xufTtcbmV4cG9ydCBjb25zdCB0b1BLQ1M4ID0gKGtleSkgPT4ge1xuICAgIHJldHVybiBnZW5lcmljRXhwb3J0KCdwcml2YXRlJywgJ3BrY3M4Jywga2V5KTtcbn07XG5jb25zdCBnZXROYW1lZEN1cnZlID0gKGtleURhdGEpID0+IHtcbiAgICBjb25zdCBrZXlEYXRhU3RyID0ga2V5RGF0YS50b1N0cmluZygpO1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICBjYXNlIGtleURhdGFTdHIuaW5jbHVkZXMobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgMHgwNiwgMHgwNywgMHgyYSwgMHg4NiwgMHg0OCwgMHhjZSwgMHgzZCwgMHgwMiwgMHgwMSwgMHgwNiwgMHgwOCwgMHgyYSwgMHg4NiwgMHg0OCwgMHhjZSxcbiAgICAgICAgICAgIDB4M2QsIDB4MDMsIDB4MDEsIDB4MDcsXG4gICAgICAgIF0pLnRvU3RyaW5nKCkpOlxuICAgICAgICAgICAgcmV0dXJuICdQLTI1Nic7XG4gICAgICAgIGNhc2Uga2V5RGF0YVN0ci5pbmNsdWRlcyhuZXcgVWludDhBcnJheShbXG4gICAgICAgICAgICAweDA2LCAweDA3LCAweDJhLCAweDg2LCAweDQ4LCAweGNlLCAweDNkLCAweDAyLCAweDAxLCAweDA2LCAweDA1LCAweDJiLCAweDgxLCAweDA0LCAweDAwLFxuICAgICAgICAgICAgMHgyMixcbiAgICAgICAgXSkudG9TdHJpbmcoKSk6XG4gICAgICAgICAgICByZXR1cm4gJ1AtMzg0JztcbiAgICAgICAgY2FzZSBrZXlEYXRhU3RyLmluY2x1ZGVzKG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgICAgIDB4MDYsIDB4MDcsIDB4MmEsIDB4ODYsIDB4NDgsIDB4Y2UsIDB4M2QsIDB4MDIsIDB4MDEsIDB4MDYsIDB4MDUsIDB4MmIsIDB4ODEsIDB4MDQsIDB4MDAsXG4gICAgICAgICAgICAweDIzLFxuICAgICAgICBdKS50b1N0cmluZygpKTpcbiAgICAgICAgICAgIHJldHVybiAnUC01MjEnO1xuICAgICAgICBjYXNlIChpc0Nsb3VkZmxhcmVXb3JrZXJzKCkgfHwgaXNOb2RlSnMoKSkgJiZcbiAgICAgICAgICAgIGtleURhdGFTdHIuaW5jbHVkZXMobmV3IFVpbnQ4QXJyYXkoWzB4MDYsIDB4MDMsIDB4MmIsIDB4NjUsIDB4NzBdKS50b1N0cmluZygpKTpcbiAgICAgICAgICAgIHJldHVybiAnRWQyNTUxOSc7XG4gICAgICAgIGNhc2UgaXNOb2RlSnMoKSAmJlxuICAgICAgICAgICAga2V5RGF0YVN0ci5pbmNsdWRlcyhuZXcgVWludDhBcnJheShbMHgwNiwgMHgwMywgMHgyYiwgMHg2NSwgMHg3MV0pLnRvU3RyaW5nKCkpOlxuICAgICAgICAgICAgcmV0dXJuICdFZDQ0OCc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZCgnSW52YWxpZCBvciB1bnN1cHBvcnRlZCBFQyBLZXkgQ3VydmUgb3IgT0tQIEtleSBTdWIgVHlwZScpO1xuICAgIH1cbn07XG5jb25zdCBnZW5lcmljSW1wb3J0ID0gYXN5bmMgKHJlcGxhY2UsIGtleUZvcm1hdCwgcGVtLCBhbGcsIG9wdGlvbnMpID0+IHtcbiAgICB2YXIgX2E7XG4gICAgbGV0IGFsZ29yaXRobTtcbiAgICBsZXQga2V5VXNhZ2VzO1xuICAgIGNvbnN0IGtleURhdGEgPSBuZXcgVWludDhBcnJheShnbG9iYWxUaGlzXG4gICAgICAgIC5hdG9iKHBlbS5yZXBsYWNlKHJlcGxhY2UsICcnKSlcbiAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAubWFwKChjKSA9PiBjLmNoYXJDb2RlQXQoMCkpKTtcbiAgICBjb25zdCBpc1B1YmxpYyA9IGtleUZvcm1hdCA9PT0gJ3Nwa2knO1xuICAgIHN3aXRjaCAoYWxnKSB7XG4gICAgICAgIGNhc2UgJ1BTMjU2JzpcbiAgICAgICAgY2FzZSAnUFMzODQnOlxuICAgICAgICBjYXNlICdQUzUxMic6XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdSU0EtUFNTJywgaGFzaDogYFNIQS0ke2FsZy5zdWJzdHIoLTMpfWAgfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IGlzUHVibGljID8gWyd2ZXJpZnknXSA6IFsnc2lnbiddO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1JTMjU2JzpcbiAgICAgICAgY2FzZSAnUlMzODQnOlxuICAgICAgICBjYXNlICdSUzUxMic6XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdSU0FTU0EtUEtDUzEtdjFfNScsIGhhc2g6IGBTSEEtJHthbGcuc3Vic3RyKC0zKX1gIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBpc1B1YmxpYyA/IFsndmVyaWZ5J10gOiBbJ3NpZ24nXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdSU0EtT0FFUCc6XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQLTI1Nic6XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQLTM4NCc6XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQLTUxMic6XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ1JTQS1PQUVQJyxcbiAgICAgICAgICAgICAgICBoYXNoOiBgU0hBLSR7cGFyc2VJbnQoYWxnLnN1YnN0cigtMyksIDEwKSB8fCAxfWAsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gaXNQdWJsaWMgPyBbJ2VuY3J5cHQnLCAnd3JhcEtleSddIDogWydkZWNyeXB0JywgJ3Vud3JhcEtleSddO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0VTMjU2JzpcbiAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogJ0VDRFNBJywgbmFtZWRDdXJ2ZTogJ1AtMjU2JyB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gaXNQdWJsaWMgPyBbJ3ZlcmlmeSddIDogWydzaWduJ107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRVMzODQnOlxuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiAnUC0zODQnIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBpc1B1YmxpYyA/IFsndmVyaWZ5J10gOiBbJ3NpZ24nXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFUzUxMic6XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdFQ0RTQScsIG5hbWVkQ3VydmU6ICdQLTUyMScgfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IGlzUHVibGljID8gWyd2ZXJpZnknXSA6IFsnc2lnbiddO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0VDREgtRVMnOlxuICAgICAgICBjYXNlICdFQ0RILUVTK0ExMjhLVyc6XG4gICAgICAgIGNhc2UgJ0VDREgtRVMrQTE5MktXJzpcbiAgICAgICAgY2FzZSAnRUNESC1FUytBMjU2S1cnOlxuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNESCcsIG5hbWVkQ3VydmU6IGdldE5hbWVkQ3VydmUoa2V5RGF0YSkgfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IGlzUHVibGljID8gW10gOiBbJ2Rlcml2ZUJpdHMnXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIChpc0Nsb3VkZmxhcmVXb3JrZXJzKCkgfHwgaXNOb2RlSnMoKSkgJiYgJ0VkRFNBJzpcbiAgICAgICAgICAgIGNvbnN0IG5hbWVkQ3VydmUgPSBnZXROYW1lZEN1cnZlKGtleURhdGEpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6IGBOT0RFLSR7bmFtZWRDdXJ2ZX1gLCBuYW1lZEN1cnZlOiBgTk9ERS0ke25hbWVkQ3VydmV9YCB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gaXNQdWJsaWMgPyBbJ3ZlcmlmeSddIDogWydzaWduJ107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdJbnZhbGlkIG9yIHVuc3VwcG9ydGVkIFwiYWxnXCIgKEFsZ29yaXRobSkgdmFsdWUnKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KGtleUZvcm1hdCwga2V5RGF0YSwgYWxnb3JpdGhtLCAoX2EgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZXh0cmFjdGFibGUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGZhbHNlLCBrZXlVc2FnZXMpO1xufTtcbmV4cG9ydCBjb25zdCBmcm9tUEtDUzggPSAocGVtLCBhbGcsIG9wdGlvbnMpID0+IHtcbiAgICByZXR1cm4gZ2VuZXJpY0ltcG9ydCgvKD86LS0tLS0oPzpCRUdJTnxFTkQpIFBSSVZBVEUgS0VZLS0tLS18XFxzKS9nLCAncGtjczgnLCBwZW0sIGFsZywgb3B0aW9ucyk7XG59O1xuZXhwb3J0IGNvbnN0IGZyb21TUEtJID0gKHBlbSwgYWxnLCBvcHRpb25zKSA9PiB7XG4gICAgcmV0dXJuIGdlbmVyaWNJbXBvcnQoLyg/Oi0tLS0tKD86QkVHSU58RU5EKSBQVUJMSUMgS0VZLS0tLS18XFxzKS9nLCAnc3BraScsIHBlbSwgYWxnLCBvcHRpb25zKTtcbn07XG4iLCJpbXBvcnQgeyBlbmNvZGVyLCBkZWNvZGVyIH0gZnJvbSAnLi4vbGliL2J1ZmZlcl91dGlscy5qcyc7XG5pbXBvcnQgZ2xvYmFsVGhpcyBmcm9tICcuL2dsb2JhbC5qcyc7XG5leHBvcnQgY29uc3QgZW5jb2RlQmFzZTY0ID0gKGlucHV0KSA9PiB7XG4gICAgbGV0IHVuZW5jb2RlZCA9IGlucHV0O1xuICAgIGlmICh0eXBlb2YgdW5lbmNvZGVkID09PSAnc3RyaW5nJykge1xuICAgICAgICB1bmVuY29kZWQgPSBlbmNvZGVyLmVuY29kZSh1bmVuY29kZWQpO1xuICAgIH1cbiAgICBjb25zdCBDSFVOS19TSVpFID0gMHg4MDAwO1xuICAgIGNvbnN0IGFyciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdW5lbmNvZGVkLmxlbmd0aDsgaSArPSBDSFVOS19TSVpFKSB7XG4gICAgICAgIGFyci5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgdW5lbmNvZGVkLnN1YmFycmF5KGksIGkgKyBDSFVOS19TSVpFKSkpO1xuICAgIH1cbiAgICByZXR1cm4gZ2xvYmFsVGhpcy5idG9hKGFyci5qb2luKCcnKSk7XG59O1xuZXhwb3J0IGNvbnN0IGVuY29kZSA9IChpbnB1dCkgPT4ge1xuICAgIHJldHVybiBlbmNvZGVCYXNlNjQoaW5wdXQpLnJlcGxhY2UoLz0vZywgJycpLnJlcGxhY2UoL1xcKy9nLCAnLScpLnJlcGxhY2UoL1xcLy9nLCAnXycpO1xufTtcbmV4cG9ydCBjb25zdCBkZWNvZGVCYXNlNjQgPSAoZW5jb2RlZCkgPT4ge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShnbG9iYWxUaGlzXG4gICAgICAgIC5hdG9iKGVuY29kZWQpXG4gICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgLm1hcCgoYykgPT4gYy5jaGFyQ29kZUF0KDApKSk7XG59O1xuZXhwb3J0IGNvbnN0IGRlY29kZSA9IChpbnB1dCkgPT4ge1xuICAgIGxldCBlbmNvZGVkID0gaW5wdXQ7XG4gICAgaWYgKGVuY29kZWQgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgIGVuY29kZWQgPSBkZWNvZGVyLmRlY29kZShlbmNvZGVkKTtcbiAgICB9XG4gICAgZW5jb2RlZCA9IGVuY29kZWQucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVCYXNlNjQoZW5jb2RlZCk7XG4gICAgfVxuICAgIGNhdGNoIChfYSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgaW5wdXQgdG8gYmUgZGVjb2RlZCBpcyBub3QgY29ycmVjdGx5IGVuY29kZWQuJyk7XG4gICAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IChhbGcsIGtleSkgPT4ge1xuICAgIGlmIChhbGcuc3RhcnRzV2l0aCgnSFMnKSkge1xuICAgICAgICBjb25zdCBiaXRsZW4gPSBwYXJzZUludChhbGcuc3Vic3RyKC0zKSwgMTApO1xuICAgICAgICBjb25zdCB7IGxlbmd0aCB9ID0ga2V5LmFsZ29yaXRobTtcbiAgICAgICAgaWYgKHR5cGVvZiBsZW5ndGggIT09ICdudW1iZXInIHx8IGxlbmd0aCA8IGJpdGxlbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHthbGd9IHJlcXVpcmVzIHN5bW1ldHJpYyBrZXlzIHRvIGJlICR7Yml0bGVufSBiaXRzIG9yIGxhcmdlcmApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChhbGcuc3RhcnRzV2l0aCgnUlMnKSB8fCBhbGcuc3RhcnRzV2l0aCgnUFMnKSkge1xuICAgICAgICBjb25zdCB7IG1vZHVsdXNMZW5ndGggfSA9IGtleS5hbGdvcml0aG07XG4gICAgICAgIGlmICh0eXBlb2YgbW9kdWx1c0xlbmd0aCAhPT0gJ251bWJlcicgfHwgbW9kdWx1c0xlbmd0aCA8IDIwNDgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7YWxnfSByZXF1aXJlcyBrZXkgbW9kdWx1c0xlbmd0aCB0byBiZSAyMDQ4IGJpdHMgb3IgbGFyZ2VyYCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiaW1wb3J0IGNyeXB0byBmcm9tICcuL3dlYmNyeXB0by5qcyc7XG5jb25zdCBkaWdlc3QgPSBhc3luYyAoYWxnb3JpdGhtLCBkYXRhKSA9PiB7XG4gICAgY29uc3Qgc3VidGxlRGlnZXN0ID0gYFNIQS0ke2FsZ29yaXRobS5zdWJzdHIoLTMpfWA7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGF3YWl0IGNyeXB0by5zdWJ0bGUuZGlnZXN0KHN1YnRsZURpZ2VzdCwgZGF0YSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGRpZ2VzdDtcbiIsImltcG9ydCB7IGlzQ2xvdWRmbGFyZVdvcmtlcnMsIGlzTm9kZUpzIH0gZnJvbSAnLi9nbG9iYWwuanMnO1xuaW1wb3J0IGNyeXB0byBmcm9tICcuL3dlYmNyeXB0by5qcyc7XG5pbXBvcnQgeyBKT1NFTm90U3VwcG9ydGVkIH0gZnJvbSAnLi4vdXRpbC9lcnJvcnMuanMnO1xuaW1wb3J0IHJhbmRvbSBmcm9tICcuL3JhbmRvbS5qcyc7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVTZWNyZXQoYWxnLCBvcHRpb25zKSB7XG4gICAgdmFyIF9hO1xuICAgIGxldCBsZW5ndGg7XG4gICAgbGV0IGFsZ29yaXRobTtcbiAgICBsZXQga2V5VXNhZ2VzO1xuICAgIHN3aXRjaCAoYWxnKSB7XG4gICAgICAgIGNhc2UgJ0hTMjU2JzpcbiAgICAgICAgY2FzZSAnSFMzODQnOlxuICAgICAgICBjYXNlICdIUzUxMic6XG4gICAgICAgICAgICBsZW5ndGggPSBwYXJzZUludChhbGcuc3Vic3RyKC0zKSwgMTApO1xuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnSE1BQycsIGhhc2g6IGBTSEEtJHtsZW5ndGh9YCwgbGVuZ3RoIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ3NpZ24nLCAndmVyaWZ5J107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnQTEyOENCQy1IUzI1Nic6XG4gICAgICAgIGNhc2UgJ0ExOTJDQkMtSFMzODQnOlxuICAgICAgICBjYXNlICdBMjU2Q0JDLUhTNTEyJzpcbiAgICAgICAgICAgIGxlbmd0aCA9IHBhcnNlSW50KGFsZy5zdWJzdHIoLTMpLCAxMCk7XG4gICAgICAgICAgICByZXR1cm4gcmFuZG9tKG5ldyBVaW50OEFycmF5KGxlbmd0aCA+PiAzKSk7XG4gICAgICAgIGNhc2UgJ0ExMjhLVyc6XG4gICAgICAgIGNhc2UgJ0ExOTJLVyc6XG4gICAgICAgIGNhc2UgJ0EyNTZLVyc6XG4gICAgICAgICAgICBsZW5ndGggPSBwYXJzZUludChhbGcuc3Vic3RyaW5nKDEsIDQpLCAxMCk7XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdBRVMtS1cnLCBsZW5ndGggfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IFsnd3JhcEtleScsICd1bndyYXBLZXknXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBMTI4R0NNS1cnOlxuICAgICAgICBjYXNlICdBMTkyR0NNS1cnOlxuICAgICAgICBjYXNlICdBMjU2R0NNS1cnOlxuICAgICAgICBjYXNlICdBMTI4R0NNJzpcbiAgICAgICAgY2FzZSAnQTE5MkdDTSc6XG4gICAgICAgIGNhc2UgJ0EyNTZHQ00nOlxuICAgICAgICAgICAgbGVuZ3RoID0gcGFyc2VJbnQoYWxnLnN1YnN0cmluZygxLCA0KSwgMTApO1xuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnQUVTLUdDTScsIGxlbmd0aCB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gWydlbmNyeXB0JywgJ2RlY3J5cHQnXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEpPU0VOb3RTdXBwb3J0ZWQoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgSldLIFwiYWxnXCIgKEFsZ29yaXRobSkgUGFyYW1ldGVyIHZhbHVlJyk7XG4gICAgfVxuICAgIHJldHVybiBjcnlwdG8uc3VidGxlLmdlbmVyYXRlS2V5KGFsZ29yaXRobSwgKF9hID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmV4dHJhY3RhYmxlKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBmYWxzZSwga2V5VXNhZ2VzKTtcbn1cbmZ1bmN0aW9uIGdldE1vZHVsdXNMZW5ndGhPcHRpb24ob3B0aW9ucykge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBtb2R1bHVzTGVuZ3RoID0gKF9hID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLm1vZHVsdXNMZW5ndGgpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDIwNDg7XG4gICAgaWYgKHR5cGVvZiBtb2R1bHVzTGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBtb2R1bHVzTGVuZ3RoIDwgMjA0OCkge1xuICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZCgnSW52YWxpZCBvciB1bnN1cHBvcnRlZCBtb2R1bHVzTGVuZ3RoIG9wdGlvbiBwcm92aWRlZCwgMjA0OCBiaXRzIG9yIGxhcmdlciBrZXlzIG11c3QgYmUgdXNlZCcpO1xuICAgIH1cbiAgICByZXR1cm4gbW9kdWx1c0xlbmd0aDtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUtleVBhaXIoYWxnLCBvcHRpb25zKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBsZXQgYWxnb3JpdGhtO1xuICAgIGxldCBrZXlVc2FnZXM7XG4gICAgc3dpdGNoIChhbGcpIHtcbiAgICAgICAgY2FzZSAnUFMyNTYnOlxuICAgICAgICBjYXNlICdQUzM4NCc6XG4gICAgICAgIGNhc2UgJ1BTNTEyJzpcbiAgICAgICAgICAgIGFsZ29yaXRobSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnUlNBLVBTUycsXG4gICAgICAgICAgICAgICAgaGFzaDogYFNIQS0ke2FsZy5zdWJzdHIoLTMpfWAsXG4gICAgICAgICAgICAgICAgcHVibGljRXhwb25lbnQ6IG5ldyBVaW50OEFycmF5KFsweDAxLCAweDAwLCAweDAxXSksXG4gICAgICAgICAgICAgICAgbW9kdWx1c0xlbmd0aDogZ2V0TW9kdWx1c0xlbmd0aE9wdGlvbihvcHRpb25zKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ3NpZ24nLCAndmVyaWZ5J107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnUlMyNTYnOlxuICAgICAgICBjYXNlICdSUzM4NCc6XG4gICAgICAgIGNhc2UgJ1JTNTEyJzpcbiAgICAgICAgICAgIGFsZ29yaXRobSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnUlNBU1NBLVBLQ1MxLXYxXzUnLFxuICAgICAgICAgICAgICAgIGhhc2g6IGBTSEEtJHthbGcuc3Vic3RyKC0zKX1gLFxuICAgICAgICAgICAgICAgIHB1YmxpY0V4cG9uZW50OiBuZXcgVWludDhBcnJheShbMHgwMSwgMHgwMCwgMHgwMV0pLFxuICAgICAgICAgICAgICAgIG1vZHVsdXNMZW5ndGg6IGdldE1vZHVsdXNMZW5ndGhPcHRpb24ob3B0aW9ucyksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gWydzaWduJywgJ3ZlcmlmeSddO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQJzpcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAtMjU2JzpcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAtMzg0JzpcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAtNTEyJzpcbiAgICAgICAgICAgIGFsZ29yaXRobSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnUlNBLU9BRVAnLFxuICAgICAgICAgICAgICAgIGhhc2g6IGBTSEEtJHtwYXJzZUludChhbGcuc3Vic3RyKC0zKSwgMTApIHx8IDF9YCxcbiAgICAgICAgICAgICAgICBwdWJsaWNFeHBvbmVudDogbmV3IFVpbnQ4QXJyYXkoWzB4MDEsIDB4MDAsIDB4MDFdKSxcbiAgICAgICAgICAgICAgICBtb2R1bHVzTGVuZ3RoOiBnZXRNb2R1bHVzTGVuZ3RoT3B0aW9uKG9wdGlvbnMpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGtleVVzYWdlcyA9IFsnZGVjcnlwdCcsICd1bndyYXBLZXknLCAnZW5jcnlwdCcsICd3cmFwS2V5J107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRVMyNTYnOlxuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiAnUC0yNTYnIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ3NpZ24nLCAndmVyaWZ5J107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRVMzODQnOlxuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiAnUC0zODQnIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ3NpZ24nLCAndmVyaWZ5J107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRVM1MTInOlxuICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiAnUC01MjEnIH07XG4gICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ3NpZ24nLCAndmVyaWZ5J107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAoaXNDbG91ZGZsYXJlV29ya2VycygpIHx8IGlzTm9kZUpzKCkpICYmICdFZERTQSc6XG4gICAgICAgICAgICBzd2l0Y2ggKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jcnYpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgICAgICAgICBjYXNlICdFZDI1NTE5JzpcbiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnTk9ERS1FRDI1NTE5JywgbmFtZWRDdXJ2ZTogJ05PREUtRUQyNTUxOScgfTtcbiAgICAgICAgICAgICAgICAgICAga2V5VXNhZ2VzID0gWydzaWduJywgJ3ZlcmlmeSddO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGlzTm9kZUpzKCkgJiYgJ0VkNDQ4JzpcbiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnTk9ERS1FRDQ0OCcsIG5hbWVkQ3VydmU6ICdOT0RFLUVENDQ4JyB9O1xuICAgICAgICAgICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ3NpZ24nLCAndmVyaWZ5J107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdJbnZhbGlkIG9yIHVuc3VwcG9ydGVkIGNydiBvcHRpb24gcHJvdmlkZWQsIHN1cHBvcnRlZCB2YWx1ZXMgYXJlIEVkMjU1MTkgYW5kIEVkNDQ4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRUNESC1FUyc6XG4gICAgICAgIGNhc2UgJ0VDREgtRVMrQTEyOEtXJzpcbiAgICAgICAgY2FzZSAnRUNESC1FUytBMTkyS1cnOlxuICAgICAgICBjYXNlICdFQ0RILUVTK0EyNTZLVyc6XG4gICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdFQ0RIJywgbmFtZWRDdXJ2ZTogKF9hID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNydikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJ1AtMjU2JyB9O1xuICAgICAgICAgICAga2V5VXNhZ2VzID0gWydkZXJpdmVLZXknLCAnZGVyaXZlQml0cyddO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZCgnSW52YWxpZCBvciB1bnN1cHBvcnRlZCBKV0sgXCJhbGdcIiAoQWxnb3JpdGhtKSBQYXJhbWV0ZXIgdmFsdWUnKTtcbiAgICB9XG4gICAgcmV0dXJuIChjcnlwdG8uc3VidGxlLmdlbmVyYXRlS2V5KGFsZ29yaXRobSwgKF9iID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmV4dHJhY3RhYmxlKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBmYWxzZSwga2V5VXNhZ2VzKSk7XG59XG4iLCJpbXBvcnQgY3J5cHRvLCB7IGlzQ3J5cHRvS2V5IH0gZnJvbSAnLi93ZWJjcnlwdG8uanMnO1xuaW1wb3J0IHsgY2hlY2tTaWdDcnlwdG9LZXkgfSBmcm9tICcuLi9saWIvY3J5cHRvX2tleS5qcyc7XG5pbXBvcnQgaW52YWxpZEtleUlucHV0IGZyb20gJy4uL2xpYi9pbnZhbGlkX2tleV9pbnB1dC5qcyc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDcnlwdG9LZXkoYWxnLCBrZXksIHVzYWdlKSB7XG4gICAgaWYgKGlzQ3J5cHRvS2V5KGtleSkpIHtcbiAgICAgICAgY2hlY2tTaWdDcnlwdG9LZXkoa2V5LCBhbGcsIHVzYWdlKTtcbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgaWYgKCFhbGcuc3RhcnRzV2l0aCgnSFMnKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihpbnZhbGlkS2V5SW5wdXQoa2V5LCAnQ3J5cHRvS2V5JykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjcnlwdG8uc3VidGxlLmltcG9ydEtleSgncmF3Jywga2V5LCB7IGhhc2g6IGBTSEEtJHthbGcuc3Vic3RyKC0zKX1gLCBuYW1lOiAnSE1BQycgfSwgZmFsc2UsIFt1c2FnZV0pO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGludmFsaWRLZXlJbnB1dChrZXksICdDcnlwdG9LZXknLCAnVWludDhBcnJheScpKTtcbn1cbiIsImZ1bmN0aW9uIGdldEdsb2JhbCgpIHtcbiAgICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICByZXR1cm4gZ2xvYmFsVGhpcztcbiAgICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1bmFibGUgdG8gbG9jYXRlIGdsb2JhbCBvYmplY3QnKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGdldEdsb2JhbCgpO1xuZXhwb3J0IGZ1bmN0aW9uIGlzQ2xvdWRmbGFyZVdvcmtlcnMoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGdldEdsb2JhbCgpLldlYlNvY2tldFBhaXIgIT09IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaXNOb2RlSnMoKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gKChfYiA9IChfYSA9IGdldEdsb2JhbCgpLnByb2Nlc3MpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS52ZXJzaW9ucykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLm5vZGUpICE9PSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNhdGNoIChfYykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgaXNDcnlwdG9LZXkgfSBmcm9tICcuL3dlYmNyeXB0by5qcyc7XG5leHBvcnQgZGVmYXVsdCAoa2V5KSA9PiB7XG4gICAgcmV0dXJuIGlzQ3J5cHRvS2V5KGtleSk7XG59O1xuZXhwb3J0IGNvbnN0IHR5cGVzID0gWydDcnlwdG9LZXknXTtcbiIsImltcG9ydCB7IGlzQ2xvdWRmbGFyZVdvcmtlcnMsIGlzTm9kZUpzIH0gZnJvbSAnLi9nbG9iYWwuanMnO1xuaW1wb3J0IGNyeXB0byBmcm9tICcuL3dlYmNyeXB0by5qcyc7XG5pbXBvcnQgeyBKT1NFTm90U3VwcG9ydGVkIH0gZnJvbSAnLi4vdXRpbC9lcnJvcnMuanMnO1xuaW1wb3J0IHsgZGVjb2RlIGFzIGJhc2U2NHVybCB9IGZyb20gJy4vYmFzZTY0dXJsLmpzJztcbmZ1bmN0aW9uIHN1YnRsZU1hcHBpbmcoandrKSB7XG4gICAgbGV0IGFsZ29yaXRobTtcbiAgICBsZXQga2V5VXNhZ2VzO1xuICAgIHN3aXRjaCAoandrLmt0eSkge1xuICAgICAgICBjYXNlICdvY3QnOiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGp3ay5hbGcpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdIUzI1Nic6XG4gICAgICAgICAgICAgICAgY2FzZSAnSFMzODQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0hTNTEyJzpcbiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnSE1BQycsIGhhc2g6IGBTSEEtJHtqd2suYWxnLnN1YnN0cigtMyl9YCB9O1xuICAgICAgICAgICAgICAgICAgICBrZXlVc2FnZXMgPSBbJ3NpZ24nLCAndmVyaWZ5J107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0ExMjhDQkMtSFMyNTYnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0ExOTJDQkMtSFMzODQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0EyNTZDQkMtSFM1MTInOlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZChgJHtqd2suYWxnfSBrZXlzIGNhbm5vdCBiZSBpbXBvcnRlZCBhcyBDcnlwdG9LZXkgaW5zdGFuY2VzYCk7XG4gICAgICAgICAgICAgICAgY2FzZSAnQTEyOEdDTSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnQTE5MkdDTSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnQTI1NkdDTSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnQTEyOEdDTUtXJzpcbiAgICAgICAgICAgICAgICBjYXNlICdBMTkyR0NNS1cnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0EyNTZHQ01LVyc6XG4gICAgICAgICAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogJ0FFUy1HQ00nIH07XG4gICAgICAgICAgICAgICAgICAgIGtleVVzYWdlcyA9IFsnZW5jcnlwdCcsICdkZWNyeXB0J107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0ExMjhLVyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnQTE5MktXJzpcbiAgICAgICAgICAgICAgICBjYXNlICdBMjU2S1cnOlxuICAgICAgICAgICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdBRVMtS1cnIH07XG4gICAgICAgICAgICAgICAgICAgIGtleVVzYWdlcyA9IFsnd3JhcEtleScsICd1bndyYXBLZXknXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUEJFUzItSFMyNTYrQTEyOEtXJzpcbiAgICAgICAgICAgICAgICBjYXNlICdQQkVTMi1IUzM4NCtBMTkyS1cnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1BCRVMyLUhTNTEyK0EyNTZLVyc6XG4gICAgICAgICAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogJ1BCS0RGMicgfTtcbiAgICAgICAgICAgICAgICAgICAga2V5VXNhZ2VzID0gWydkZXJpdmVCaXRzJ107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdJbnZhbGlkIG9yIHVuc3VwcG9ydGVkIEpXSyBcImFsZ1wiIChBbGdvcml0aG0pIFBhcmFtZXRlciB2YWx1ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnUlNBJzoge1xuICAgICAgICAgICAgc3dpdGNoIChqd2suYWxnKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnUFMyNTYnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1BTMzg0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdQUzUxMic6XG4gICAgICAgICAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogJ1JTQS1QU1MnLCBoYXNoOiBgU0hBLSR7andrLmFsZy5zdWJzdHIoLTMpfWAgfTtcbiAgICAgICAgICAgICAgICAgICAga2V5VXNhZ2VzID0gandrLmQgPyBbJ3NpZ24nXSA6IFsndmVyaWZ5J107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1JTMjU2JzpcbiAgICAgICAgICAgICAgICBjYXNlICdSUzM4NCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnUlM1MTInOlxuICAgICAgICAgICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdSU0FTU0EtUEtDUzEtdjFfNScsIGhhc2g6IGBTSEEtJHtqd2suYWxnLnN1YnN0cigtMyl9YCB9O1xuICAgICAgICAgICAgICAgICAgICBrZXlVc2FnZXMgPSBqd2suZCA/IFsnc2lnbiddIDogWyd2ZXJpZnknXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUlNBLU9BRVAnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1JTQS1PQUVQLTI1Nic6XG4gICAgICAgICAgICAgICAgY2FzZSAnUlNBLU9BRVAtMzg0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdSU0EtT0FFUC01MTInOlxuICAgICAgICAgICAgICAgICAgICBhbGdvcml0aG0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnUlNBLU9BRVAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzaDogYFNIQS0ke3BhcnNlSW50KGp3ay5hbGcuc3Vic3RyKC0zKSwgMTApIHx8IDF9YCxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAga2V5VXNhZ2VzID0gandrLmQgPyBbJ2RlY3J5cHQnLCAndW53cmFwS2V5J10gOiBbJ2VuY3J5cHQnLCAnd3JhcEtleSddO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZCgnSW52YWxpZCBvciB1bnN1cHBvcnRlZCBKV0sgXCJhbGdcIiAoQWxnb3JpdGhtKSBQYXJhbWV0ZXIgdmFsdWUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ0VDJzoge1xuICAgICAgICAgICAgc3dpdGNoIChqd2suYWxnKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnRVMyNTYnOlxuICAgICAgICAgICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdFQ0RTQScsIG5hbWVkQ3VydmU6ICdQLTI1NicgfTtcbiAgICAgICAgICAgICAgICAgICAga2V5VXNhZ2VzID0gandrLmQgPyBbJ3NpZ24nXSA6IFsndmVyaWZ5J107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VTMzg0JzpcbiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiAnUC0zODQnIH07XG4gICAgICAgICAgICAgICAgICAgIGtleVVzYWdlcyA9IGp3ay5kID8gWydzaWduJ10gOiBbJ3ZlcmlmeSddO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFUzUxMic6XG4gICAgICAgICAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogJ0VDRFNBJywgbmFtZWRDdXJ2ZTogJ1AtNTIxJyB9O1xuICAgICAgICAgICAgICAgICAgICBrZXlVc2FnZXMgPSBqd2suZCA/IFsnc2lnbiddIDogWyd2ZXJpZnknXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRUNESC1FUyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnRUNESC1FUytBMTI4S1cnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0VDREgtRVMrQTE5MktXJzpcbiAgICAgICAgICAgICAgICBjYXNlICdFQ0RILUVTK0EyNTZLVyc6XG4gICAgICAgICAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogJ0VDREgnLCBuYW1lZEN1cnZlOiBqd2suY3J2IH07XG4gICAgICAgICAgICAgICAgICAgIGtleVVzYWdlcyA9IGp3ay5kID8gWydkZXJpdmVCaXRzJ10gOiBbXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEpPU0VOb3RTdXBwb3J0ZWQoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgSldLIFwiYWxnXCIgKEFsZ29yaXRobSkgUGFyYW1ldGVyIHZhbHVlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIChpc0Nsb3VkZmxhcmVXb3JrZXJzKCkgfHwgaXNOb2RlSnMoKSkgJiYgJ09LUCc6XG4gICAgICAgICAgICBpZiAoandrLmFsZyAhPT0gJ0VkRFNBJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdJbnZhbGlkIG9yIHVuc3VwcG9ydGVkIEpXSyBcImFsZ1wiIChBbGdvcml0aG0pIFBhcmFtZXRlciB2YWx1ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoIChqd2suY3J2KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnRWQyNTUxOSc6XG4gICAgICAgICAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogJ05PREUtRUQyNTUxOScsIG5hbWVkQ3VydmU6ICdOT0RFLUVEMjU1MTknIH07XG4gICAgICAgICAgICAgICAgICAgIGtleVVzYWdlcyA9IGp3ay5kID8gWydzaWduJ10gOiBbJ3ZlcmlmeSddO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGlzTm9kZUpzKCkgJiYgJ0VkNDQ4JzpcbiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnTk9ERS1FRDQ0OCcsIG5hbWVkQ3VydmU6ICdOT0RFLUVENDQ4JyB9O1xuICAgICAgICAgICAgICAgICAgICBrZXlVc2FnZXMgPSBqd2suZCA/IFsnc2lnbiddIDogWyd2ZXJpZnknXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEpPU0VOb3RTdXBwb3J0ZWQoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgSldLIFwiY3J2XCIgKFN1YnR5cGUgb2YgS2V5IFBhaXIpIFBhcmFtZXRlciB2YWx1ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZCgnSW52YWxpZCBvciB1bnN1cHBvcnRlZCBKV0sgXCJrdHlcIiAoS2V5IFR5cGUpIFBhcmFtZXRlciB2YWx1ZScpO1xuICAgIH1cbiAgICByZXR1cm4geyBhbGdvcml0aG0sIGtleVVzYWdlcyB9O1xufVxuY29uc3QgcGFyc2UgPSBhc3luYyAoandrKSA9PiB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBjb25zdCB7IGFsZ29yaXRobSwga2V5VXNhZ2VzIH0gPSBzdWJ0bGVNYXBwaW5nKGp3ayk7XG4gICAgY29uc3QgcmVzdCA9IFtcbiAgICAgICAgYWxnb3JpdGhtLFxuICAgICAgICAoX2EgPSBqd2suZXh0KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBmYWxzZSxcbiAgICAgICAgKF9iID0gandrLmtleV9vcHMpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IGtleVVzYWdlcyxcbiAgICBdO1xuICAgIGlmIChhbGdvcml0aG0ubmFtZSA9PT0gJ1BCS0RGMicpIHtcbiAgICAgICAgcmV0dXJuIGNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KCdyYXcnLCBiYXNlNjR1cmwoandrLmspLCAuLi5yZXN0KTtcbiAgICB9XG4gICAgY29uc3Qga2V5RGF0YSA9IHsgLi4uandrIH07XG4gICAgZGVsZXRlIGtleURhdGEuYWxnO1xuICAgIHJldHVybiBjcnlwdG8uc3VidGxlLmltcG9ydEtleSgnandrJywga2V5RGF0YSwgLi4ucmVzdCk7XG59O1xuZXhwb3J0IGRlZmF1bHQgcGFyc2U7XG4iLCJpbXBvcnQgY3J5cHRvLCB7IGlzQ3J5cHRvS2V5IH0gZnJvbSAnLi93ZWJjcnlwdG8uanMnO1xuaW1wb3J0IGludmFsaWRLZXlJbnB1dCBmcm9tICcuLi9saWIvaW52YWxpZF9rZXlfaW5wdXQuanMnO1xuaW1wb3J0IHsgZW5jb2RlIGFzIGJhc2U2NHVybCB9IGZyb20gJy4vYmFzZTY0dXJsLmpzJztcbmNvbnN0IGtleVRvSldLID0gYXN5bmMgKGtleSkgPT4ge1xuICAgIGlmIChrZXkgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrdHk6ICdvY3QnLFxuICAgICAgICAgICAgazogYmFzZTY0dXJsKGtleSksXG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmICghaXNDcnlwdG9LZXkoa2V5KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGludmFsaWRLZXlJbnB1dChrZXksICdDcnlwdG9LZXknLCAnVWludDhBcnJheScpKTtcbiAgICB9XG4gICAgaWYgKCFrZXkuZXh0cmFjdGFibGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbm9uLWV4dHJhY3RhYmxlIENyeXB0b0tleSBjYW5ub3QgYmUgZXhwb3J0ZWQgYXMgYSBKV0snKTtcbiAgICB9XG4gICAgY29uc3QgeyBleHQsIGtleV9vcHMsIGFsZywgdXNlLCAuLi5qd2sgfSA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuZXhwb3J0S2V5KCdqd2snLCBrZXkpO1xuICAgIHJldHVybiBqd2s7XG59O1xuZXhwb3J0IGRlZmF1bHQga2V5VG9KV0s7XG4iLCJpbXBvcnQgY3J5cHRvIGZyb20gJy4vd2ViY3J5cHRvLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pO1xuIiwiaW1wb3J0IHN1YnRsZUFsZ29yaXRobSBmcm9tICcuL3N1YnRsZV9kc2EuanMnO1xuaW1wb3J0IGNyeXB0byBmcm9tICcuL3dlYmNyeXB0by5qcyc7XG5pbXBvcnQgY2hlY2tLZXlMZW5ndGggZnJvbSAnLi9jaGVja19rZXlfbGVuZ3RoLmpzJztcbmltcG9ydCBnZXRTaWduS2V5IGZyb20gJy4vZ2V0X3NpZ25fdmVyaWZ5X2tleS5qcyc7XG5jb25zdCBzaWduID0gYXN5bmMgKGFsZywga2V5LCBkYXRhKSA9PiB7XG4gICAgY29uc3QgY3J5cHRvS2V5ID0gYXdhaXQgZ2V0U2lnbktleShhbGcsIGtleSwgJ3NpZ24nKTtcbiAgICBjaGVja0tleUxlbmd0aChhbGcsIGNyeXB0b0tleSk7XG4gICAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5zaWduKHN1YnRsZUFsZ29yaXRobShhbGcsIGNyeXB0b0tleS5hbGdvcml0aG0ubmFtZWRDdXJ2ZSksIGNyeXB0b0tleSwgZGF0YSk7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHNpZ25hdHVyZSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgc2lnbjtcbiIsImltcG9ydCB7IGlzQ2xvdWRmbGFyZVdvcmtlcnMsIGlzTm9kZUpzIH0gZnJvbSAnLi9nbG9iYWwuanMnO1xuaW1wb3J0IHsgSk9TRU5vdFN1cHBvcnRlZCB9IGZyb20gJy4uL3V0aWwvZXJyb3JzLmpzJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN1YnRsZURzYShhbGcsIG5hbWVkQ3VydmUpIHtcbiAgICBjb25zdCBsZW5ndGggPSBwYXJzZUludChhbGcuc3Vic3RyKC0zKSwgMTApO1xuICAgIHN3aXRjaCAoYWxnKSB7XG4gICAgICAgIGNhc2UgJ0hTMjU2JzpcbiAgICAgICAgY2FzZSAnSFMzODQnOlxuICAgICAgICBjYXNlICdIUzUxMic6XG4gICAgICAgICAgICByZXR1cm4geyBoYXNoOiBgU0hBLSR7bGVuZ3RofWAsIG5hbWU6ICdITUFDJyB9O1xuICAgICAgICBjYXNlICdQUzI1Nic6XG4gICAgICAgIGNhc2UgJ1BTMzg0JzpcbiAgICAgICAgY2FzZSAnUFM1MTInOlxuICAgICAgICAgICAgcmV0dXJuIHsgaGFzaDogYFNIQS0ke2xlbmd0aH1gLCBuYW1lOiAnUlNBLVBTUycsIHNhbHRMZW5ndGg6IGxlbmd0aCA+PiAzIH07XG4gICAgICAgIGNhc2UgJ1JTMjU2JzpcbiAgICAgICAgY2FzZSAnUlMzODQnOlxuICAgICAgICBjYXNlICdSUzUxMic6XG4gICAgICAgICAgICByZXR1cm4geyBoYXNoOiBgU0hBLSR7bGVuZ3RofWAsIG5hbWU6ICdSU0FTU0EtUEtDUzEtdjFfNScgfTtcbiAgICAgICAgY2FzZSAnRVMyNTYnOlxuICAgICAgICBjYXNlICdFUzM4NCc6XG4gICAgICAgIGNhc2UgJ0VTNTEyJzpcbiAgICAgICAgICAgIHJldHVybiB7IGhhc2g6IGBTSEEtJHtsZW5ndGh9YCwgbmFtZTogJ0VDRFNBJywgbmFtZWRDdXJ2ZSB9O1xuICAgICAgICBjYXNlIChpc0Nsb3VkZmxhcmVXb3JrZXJzKCkgfHwgaXNOb2RlSnMoKSkgJiYgJ0VkRFNBJzpcbiAgICAgICAgICAgIHJldHVybiB7IG5hbWU6IG5hbWVkQ3VydmUsIG5hbWVkQ3VydmUgfTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKGBhbGcgJHthbGd9IGlzIG5vdCBzdXBwb3J0ZWQgZWl0aGVyIGJ5IEpPU0Ugb3IgeW91ciBqYXZhc2NyaXB0IHJ1bnRpbWVgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgc3VidGxlQWxnb3JpdGhtIGZyb20gJy4vc3VidGxlX2RzYS5qcyc7XG5pbXBvcnQgY3J5cHRvIGZyb20gJy4vd2ViY3J5cHRvLmpzJztcbmltcG9ydCBjaGVja0tleUxlbmd0aCBmcm9tICcuL2NoZWNrX2tleV9sZW5ndGguanMnO1xuaW1wb3J0IGdldFZlcmlmeUtleSBmcm9tICcuL2dldF9zaWduX3ZlcmlmeV9rZXkuanMnO1xuY29uc3QgdmVyaWZ5ID0gYXN5bmMgKGFsZywga2V5LCBzaWduYXR1cmUsIGRhdGEpID0+IHtcbiAgICBjb25zdCBjcnlwdG9LZXkgPSBhd2FpdCBnZXRWZXJpZnlLZXkoYWxnLCBrZXksICd2ZXJpZnknKTtcbiAgICBjaGVja0tleUxlbmd0aChhbGcsIGNyeXB0b0tleSk7XG4gICAgY29uc3QgYWxnb3JpdGhtID0gc3VidGxlQWxnb3JpdGhtKGFsZywgY3J5cHRvS2V5LmFsZ29yaXRobS5uYW1lZEN1cnZlKTtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gYXdhaXQgY3J5cHRvLnN1YnRsZS52ZXJpZnkoYWxnb3JpdGhtLCBjcnlwdG9LZXksIHNpZ25hdHVyZSwgZGF0YSk7XG4gICAgfVxuICAgIGNhdGNoIChfYSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IHZlcmlmeTtcbiIsImltcG9ydCBnbG9iYWxUaGlzIGZyb20gJy4vZ2xvYmFsLmpzJztcbmV4cG9ydCBkZWZhdWx0IGdsb2JhbFRoaXMuY3J5cHRvO1xuZXhwb3J0IGZ1bmN0aW9uIGlzQ3J5cHRvS2V5KGtleSkge1xuICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcy5DcnlwdG9LZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGtleSAhPSBudWxsICYmIGtleSBpbnN0YW5jZW9mIGdsb2JhbFRoaXMuQ3J5cHRvS2V5O1xufVxuIiwiaW1wb3J0ICogYXMgYmFzZTY0dXJsIGZyb20gJy4uL3J1bnRpbWUvYmFzZTY0dXJsLmpzJztcbmV4cG9ydCBjb25zdCBlbmNvZGUgPSBiYXNlNjR1cmwuZW5jb2RlO1xuZXhwb3J0IGNvbnN0IGRlY29kZSA9IGJhc2U2NHVybC5kZWNvZGU7XG4iLCJleHBvcnQgY2xhc3MgSk9TRUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5jb2RlID0gJ0VSUl9KT1NFX0dFTkVSSUMnO1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgIChfYSA9IEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChFcnJvciwgdGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSk9TRV9HRU5FUklDJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkIGV4dGVuZHMgSk9TRUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBjbGFpbSA9ICd1bnNwZWNpZmllZCcsIHJlYXNvbiA9ICd1bnNwZWNpZmllZCcpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldUX0NMQUlNX1ZBTElEQVRJT05fRkFJTEVEJztcbiAgICAgICAgdGhpcy5jbGFpbSA9IGNsYWltO1xuICAgICAgICB0aGlzLnJlYXNvbiA9IHJlYXNvbjtcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KV1RfQ0xBSU1fVkFMSURBVElPTl9GQUlMRUQnO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBKV1RFeHBpcmVkIGV4dGVuZHMgSk9TRUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBjbGFpbSA9ICd1bnNwZWNpZmllZCcsIHJlYXNvbiA9ICd1bnNwZWNpZmllZCcpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldUX0VYUElSRUQnO1xuICAgICAgICB0aGlzLmNsYWltID0gY2xhaW07XG4gICAgICAgIHRoaXMucmVhc29uID0gcmVhc29uO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXVF9FWFBJUkVEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSk9TRUFsZ05vdEFsbG93ZWQgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pPU0VfQUxHX05PVF9BTExPV0VEJztcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KT1NFX0FMR19OT1RfQUxMT1dFRCc7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEpPU0VOb3RTdXBwb3J0ZWQgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pPU0VfTk9UX1NVUFBPUlRFRCc7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSk9TRV9OT1RfU1VQUE9SVEVEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldFRGVjcnlwdGlvbkZhaWxlZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldFX0RFQ1JZUFRJT05fRkFJTEVEJztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJ2RlY3J5cHRpb24gb3BlcmF0aW9uIGZhaWxlZCc7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSldFX0RFQ1JZUFRJT05fRkFJTEVEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldFSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldFX0lOVkFMSUQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXRV9JTlZBTElEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldTSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldTX0lOVkFMSUQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXU19JTlZBTElEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldUSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldUX0lOVkFMSUQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXVF9JTlZBTElEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldLSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldLX0lOVkFMSUQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXS19JTlZBTElEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldLU0ludmFsaWQgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXS1NfSU5WQUxJRCc7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSldLU19JTlZBTElEJztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSldLU05vTWF0Y2hpbmdLZXkgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXS1NfTk9fTUFUQ0hJTkdfS0VZJztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJ25vIGFwcGxpY2FibGUga2V5IGZvdW5kIGluIHRoZSBKU09OIFdlYiBLZXkgU2V0JztcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KV0tTX05PX01BVENISU5HX0tFWSc7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEpXS1NNdWx0aXBsZU1hdGNoaW5nS2V5cyBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldLU19NVUxUSVBMRV9NQVRDSElOR19LRVlTJztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJ211bHRpcGxlIG1hdGNoaW5nIGtleXMgZm91bmQgaW4gdGhlIEpTT04gV2ViIEtleSBTZXQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXS1NfTVVMVElQTEVfTUFUQ0hJTkdfS0VZUyc7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEpXS1NUaW1lb3V0IGV4dGVuZHMgSk9TRUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5jb2RlID0gJ0VSUl9KV0tTX1RJTUVPVVQnO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSAncmVxdWVzdCB0aW1lZCBvdXQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXS1NfVElNRU9VVCc7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEpXU1NpZ25hdHVyZVZlcmlmaWNhdGlvbkZhaWxlZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldTX1NJR05BVFVSRV9WRVJJRklDQVRJT05fRkFJTEVEJztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJ3NpZ25hdHVyZSB2ZXJpZmljYXRpb24gZmFpbGVkJztcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KV1NfU0lHTkFUVVJFX1ZFUklGSUNBVElPTl9GQUlMRUQnO1xuICAgIH1cbn1cbiIsIi8qKlxuICogV29yayBhcm91bmQgU2FmYXJpIDE0IEluZGV4ZWREQiBvcGVuIGJ1Zy5cbiAqXG4gKiBTYWZhcmkgaGFzIGEgaG9ycmlibGUgYnVnIHdoZXJlIElEQiByZXF1ZXN0cyBjYW4gaGFuZyB3aGlsZSB0aGUgYnJvd3NlciBpcyBzdGFydGluZyB1cC4gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTIyNjU0N1xuICogVGhlIG9ubHkgc29sdXRpb24gaXMgdG8ga2VlcCBudWRnaW5nIGl0IHVudGlsIGl0J3MgYXdha2UuXG4gKi9cbmZ1bmN0aW9uIGlkYlJlYWR5KCkge1xuICAgIHZhciBpc1NhZmFyaSA9ICFuYXZpZ2F0b3IudXNlckFnZW50RGF0YSAmJlxuICAgICAgICAvU2FmYXJpXFwvLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmXG4gICAgICAgICEvQ2hyb20oZXxpdW0pXFwvLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIC8vIE5vIHBvaW50IHB1dHRpbmcgb3RoZXIgYnJvd3NlcnMgb3Igb2xkZXIgdmVyc2lvbnMgb2YgU2FmYXJpIHRocm91Z2ggdGhpcyBtZXNzLlxuICAgIGlmICghaXNTYWZhcmkgfHwgIWluZGV4ZWREQi5kYXRhYmFzZXMpXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB2YXIgaW50ZXJ2YWxJZDtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgdmFyIHRyeUlkYiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGluZGV4ZWREQi5kYXRhYmFzZXMoKS5maW5hbGx5KHJlc29sdmUpOyB9O1xuICAgICAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodHJ5SWRiLCAxMDApO1xuICAgICAgICB0cnlJZGIoKTtcbiAgICB9KS5maW5hbGx5KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7IH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpZGJSZWFkeTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGJyb2tlclNvdXJjZSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFsbG5ldHAycC9hbi1icm9rZXIvZGlzdC9hbi1icm9rZXIuanM/cmF3J1xuaW1wb3J0IHsgQW5JZGVudGl0eUNvbmZpZywgQW5JZGVudGl0eSB9IGZyb20gJ0BhbGxuZXRwMnAvYW4taWRlbnRpdHknXG5cbihhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGlkZW50aXR5Q29uZmlnID0gbmV3IEFuSWRlbnRpdHlDb25maWcoKVxuICBjb25zdCBpZGVudGl0eSA9IGF3YWl0IEFuSWRlbnRpdHkuY3JlYXRlQW5JZGVudGl0eShpZGVudGl0eUNvbmZpZylcbiAgY29uc29sZS5sb2coJ0BALWxvYWRlci1AQCAtIGlkZW50aXR5OiAnLCBpZGVudGl0eSlcblxuICBjb25zdCBqd3QgPSBhd2FpdCBpZGVudGl0eS5zaWduQ2FwYWJpbGl0eSh7XG4gICAgY2FwYWJpbGl0aWVzOiB7ICd0ZXN0LnpvbWJpZS53aGF0LmlzLnRoaXMnOiB0cnVlIH0sXG4gICAgc3ViamVjdDogaWRlbnRpdHkuZnVsbElkZW50aXR5LmlkXG4gIH0pXG4gIGNvbnNvbGUubG9nKCdAQC1sb2FkZXItQEAgLSBqd3Q6ICcsIGp3dClcbiAgY29uc29sZS5sb2coJ0BALWxvYWRlci1AQCAtIGp3dC12YWxpZGF0ZTogJywgYXdhaXQgQW5JZGVudGl0eS52YWxpZGF0ZUpXVChqd3QpKVxuXG4gIGNvbnNvbGUubG9nKCdAQC1sb2FkZXItQEAgLSBicm9rZXIgc291cmNlOiAnLCBicm9rZXJTb3VyY2UpXG5cbiAgY29uc3QgYnJva2VyQmxvYiA9IG5ldyBCbG9iKFxuICAgIFticm9rZXJTb3VyY2VdLFxuICAgIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnIH1cbiAgKVxuXG4gIGNvbnNvbGUubG9nKCdAQC1sb2FkZXItQEAgLSBicm9rZXIgYmxvYjogJywgYnJva2VyQmxvYilcblxuICBjb25zdCBicm9rZXJVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJyb2tlckJsb2IpXG5cbiAgY29uc29sZS5sb2coJ0BALWxvYWRlci1AQCAtIGJyb2tlciB1cmw6ICcsIGJyb2tlclVybClcblxuICBjb25zdCBicm9rZXJXb3JrZXIgPSBuZXcgV29ya2VyKGJyb2tlclVybClcblxuICBVUkwucmV2b2tlT2JqZWN0VVJMKGJyb2tlclVybClcblxuICBjb25zb2xlLmxvZygnQEAtbG9hZGVyLUBAIC0gYnJva2VyIHdvcmtlcjogJywgYnJva2VyV29ya2VyKVxuXG4gIGJyb2tlcldvcmtlci5vbm1lc3NhZ2UgPSBldnQgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSBldnQuZGF0YVxuICAgIGlmIChkYXRhLnR5cGUgPT09ICdyZWdpc3Rlck1vZHVsZScpIHtcbiAgICAgIGJyb2tlcldvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGRpcjogJ3JlcycsXG4gICAgICAgIG1zZ0lkOiBkYXRhLm1zZ0lkXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBicm9rZXJXb3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBkaXI6ICdyZXMnLFxuICAgICAgICBtc2dJZDogZGF0YS5tc2dJZCxcbiAgICAgICAgZXJyb3I6ICd1bmhhbmRsZWQgcmVxIHR5cGU6ICcgKyBkYXRhLnR5cGVcbiAgICAgIH0pXG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKCdAQC1sb2FkZXItQEAgLSBicm9rZXIgbWVzc2FnZTogJywgZXZ0LmRhdGEpXG4gIH1cblxuICAvLyBicm9rZXJXb3JrZXIucG9zdE1lc3NhZ2UoJ3Rlc3QtbWVzc2FnZS1mcm9tLWFuLWxvYWRlcicpXG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjYW4gZGVidWc/JylcbiAgfSwgMTAwMClcbn0pKCkudGhlbigoKSA9PiB7fSwgZXJyID0+IHtcbiAgY29uc29sZS5lcnJvcihlcnIpXG59KVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9