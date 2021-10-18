/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../an-worker-api/lib/an-worker-api.mjs":
/*!**********************************************!*\
  !*** ../an-worker-api/lib/an-worker-api.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnWorkerApi": () => (/* binding */ AnWorkerApi)
/* harmony export */ });
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nanoid */ "../an-worker-api/node_modules/nanoid/index.dev.js");


/**
 * When writing a new allnet worker module, construct an instance
 * of this class in order to communicate your module's capabilities
 * and make connections to other running modules.
 */
class AnWorkerApi {
  /**
   * Create a new AnWorkerApi instance connects to webworker communication
   * channels, and exposes the standard allnet worker module api hooks.
   */
  constructor () {
    if (globalThis.onmessage) {
      throw new Error('globalThis.onmessage is already set. You should only initialize AnWorkerApi once per web worker.')
    }
    globalThis.onmessage = evt => {
      this._handleMessage(evt.data)
    }
    this._pending = new Map()
  }

  /**
   * Emit a raw allnet module api event.
   * You probably want to use a higher-level api.
   */
  rawEvent (type, data, transfer) {
    globalThis.postMessage({
      type,
      dir: 'evt',
      data
    }, transfer)
  }

  /**
   * Make a raw allnet module api request.
   * You probably want to use a higher-level api.
   */
  rawRequest (type, data, transfer) {
    const msgId = (0,nanoid__WEBPACK_IMPORTED_MODULE_0__.nanoid)()
    globalThis.postMessage({
      type,
      dir: 'req',
      msgId,
      data
    }, transfer)
    return new Promise((resolve, reject) => {
      this._pending.set(msgId, [resolve, reject])
      setTimeout(() => {
        const res = this._pending.get(msgId)
        this._pending.delete(msgId)
        if (res) {
          res[1](new Error('timeout'))
        }
      }, 30000)
    })
  }

  /**
   */
  async registerModule (spec) {
    // don't care about response, just need it to not be an error
    await this.rawRequest(
      'registerModule',
      spec
    )
  }

  // -- private -- //

  _handleMessage (data) {
    if (data.dir === 'res') {
      const res = this._pending.get(data.msgId)
      this._pending.delete(data.msgId)
      if (res) {
        if (data.error) {
          res[1](data.error)
        } else {
          res[0](data.data)
        }
      }
    } else {
      throw new Error('dir ' + data.dir + ' not yet handled')
    }
  }
}


/***/ }),

/***/ "../an-worker-api/node_modules/nanoid/index.dev.js":
/*!*********************************************************!*\
  !*** ../an-worker-api/node_modules/nanoid/index.dev.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nanoid": () => (/* binding */ nanoid),
/* harmony export */   "customAlphabet": () => (/* binding */ customAlphabet),
/* harmony export */   "customRandom": () => (/* binding */ customRandom),
/* harmony export */   "urlAlphabet": () => (/* reexport safe */ _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__.urlAlphabet),
/* harmony export */   "random": () => (/* binding */ random)
/* harmony export */ });
/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-alphabet/index.js */ "../an-worker-api/node_modules/nanoid/url-alphabet/index.js");

if (true) {
  if (
    typeof navigator !== 'undefined' &&
    navigator.product === 'ReactNative' &&
    typeof crypto === 'undefined'
  ) {
    throw new Error(
      'React Native does not have a built-in secure random generator. ' +
        'If you don’t need unpredictable IDs use `nanoid/non-secure`. ' +
        'For secure IDs, import `react-native-get-random-values` ' +
        'before Nano ID.'
    )
  }
  if (typeof msCrypto !== 'undefined' && typeof crypto === 'undefined') {
    throw new Error(
      'Import file with `if (!window.crypto) window.crypto = window.msCrypto`' +
        ' before importing Nano ID to fix IE 11 support'
    )
  }
  if (typeof crypto === 'undefined') {
    throw new Error(
      'Your browser does not have secure random generator. ' +
        'If you don’t need unpredictable IDs, you can use nanoid/non-secure.'
    )
  }
}
let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))
let customRandom = (alphabet, size, getRandom) => {
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  let step = -~((1.6 * mask * size) / alphabet.length)
  return () => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      let j = step
      while (j--) {
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}
let customAlphabet = (alphabet, size) => customRandom(alphabet, size, random)
let nanoid = (size = 21) => {
  let id = ''
  let bytes = crypto.getRandomValues(new Uint8Array(size))
  while (size--) {
    let byte = bytes[size] & 63
    if (byte < 36) {
      id += byte.toString(36)
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte < 63) {
      id += '_'
    } else {
      id += '-'
    }
  }
  return id
}



/***/ }),

/***/ "../an-worker-api/node_modules/nanoid/url-alphabet/index.js":
/*!******************************************************************!*\
  !*** ../an-worker-api/node_modules/nanoid/url-alphabet/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "urlAlphabet": () => (/* binding */ urlAlphabet)
/* harmony export */ });
let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'



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
  !*** ./lib/an-broker.mjs ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _allnetp2p_an_worker_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @allnetp2p/an-worker-api */ "../an-worker-api/lib/an-worker-api.mjs");


(async () => {
  console.log(_allnetp2p_an_worker_api__WEBPACK_IMPORTED_MODULE_0__.AnWorkerApi, typeof _allnetp2p_an_worker_api__WEBPACK_IMPORTED_MODULE_0__.AnWorkerApi, Object.keys(_allnetp2p_an_worker_api__WEBPACK_IMPORTED_MODULE_0__.AnWorkerApi))
  const workerApi = new _allnetp2p_an_worker_api__WEBPACK_IMPORTED_MODULE_0__.AnWorkerApi()
  // TODO pull version from package.json
  await workerApi.registerModule('system.allnetp2p.broker@0.0.1')
  console.log('BROKER WORKER REGISTER SUCCESS')

  setTimeout(() => {
    throw new Error('can debug?')
  }, 1000)
})().then(() => {}, err => {
  console.error(err)
})

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW4tYnJva2VyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUErQjs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsOENBQU07QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JGcUQ7QUFDckQsSUFBSSxJQUFJO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNvRTs7Ozs7Ozs7Ozs7Ozs7O0FDN0RwRTtBQUNBO0FBQ3NCOzs7Ozs7O1VDRnRCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOc0Q7O0FBRXREO0FBQ0EsY0FBYyxpRUFBVyxTQUFTLGlFQUFXLGNBQWMsaUVBQVc7QUFDdEUsd0JBQXdCLGlFQUFXO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUMsaUJBQWlCO0FBQ2xCO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL0BhbGxuZXRwMnAvYW4tYnJva2VyLy4uL2FuLXdvcmtlci1hcGkvbGliL2FuLXdvcmtlci1hcGkubWpzIiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tYnJva2VyLy4uL2FuLXdvcmtlci1hcGkvbm9kZV9tb2R1bGVzL25hbm9pZC9pbmRleC5kZXYuanMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1icm9rZXIvLi4vYW4td29ya2VyLWFwaS9ub2RlX21vZHVsZXMvbmFub2lkL3VybC1hbHBoYWJldC9pbmRleC5qcyIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWJyb2tlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWJyb2tlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQGFsbG5ldHAycC9hbi1icm9rZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AYWxsbmV0cDJwL2FuLWJyb2tlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BhbGxuZXRwMnAvYW4tYnJva2VyLy4vbGliL2FuLWJyb2tlci5tanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbmFub2lkIH0gZnJvbSAnbmFub2lkJ1xuXG4vKipcbiAqIFdoZW4gd3JpdGluZyBhIG5ldyBhbGxuZXQgd29ya2VyIG1vZHVsZSwgY29uc3RydWN0IGFuIGluc3RhbmNlXG4gKiBvZiB0aGlzIGNsYXNzIGluIG9yZGVyIHRvIGNvbW11bmljYXRlIHlvdXIgbW9kdWxlJ3MgY2FwYWJpbGl0aWVzXG4gKiBhbmQgbWFrZSBjb25uZWN0aW9ucyB0byBvdGhlciBydW5uaW5nIG1vZHVsZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBBbldvcmtlckFwaSB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgQW5Xb3JrZXJBcGkgaW5zdGFuY2UgY29ubmVjdHMgdG8gd2Vid29ya2VyIGNvbW11bmljYXRpb25cbiAgICogY2hhbm5lbHMsIGFuZCBleHBvc2VzIHRoZSBzdGFuZGFyZCBhbGxuZXQgd29ya2VyIG1vZHVsZSBhcGkgaG9va3MuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgaWYgKGdsb2JhbFRoaXMub25tZXNzYWdlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dsb2JhbFRoaXMub25tZXNzYWdlIGlzIGFscmVhZHkgc2V0LiBZb3Ugc2hvdWxkIG9ubHkgaW5pdGlhbGl6ZSBBbldvcmtlckFwaSBvbmNlIHBlciB3ZWIgd29ya2VyLicpXG4gICAgfVxuICAgIGdsb2JhbFRoaXMub25tZXNzYWdlID0gZXZ0ID0+IHtcbiAgICAgIHRoaXMuX2hhbmRsZU1lc3NhZ2UoZXZ0LmRhdGEpXG4gICAgfVxuICAgIHRoaXMuX3BlbmRpbmcgPSBuZXcgTWFwKClcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0IGEgcmF3IGFsbG5ldCBtb2R1bGUgYXBpIGV2ZW50LlxuICAgKiBZb3UgcHJvYmFibHkgd2FudCB0byB1c2UgYSBoaWdoZXItbGV2ZWwgYXBpLlxuICAgKi9cbiAgcmF3RXZlbnQgKHR5cGUsIGRhdGEsIHRyYW5zZmVyKSB7XG4gICAgZ2xvYmFsVGhpcy5wb3N0TWVzc2FnZSh7XG4gICAgICB0eXBlLFxuICAgICAgZGlyOiAnZXZ0JyxcbiAgICAgIGRhdGFcbiAgICB9LCB0cmFuc2ZlcilcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIGEgcmF3IGFsbG5ldCBtb2R1bGUgYXBpIHJlcXVlc3QuXG4gICAqIFlvdSBwcm9iYWJseSB3YW50IHRvIHVzZSBhIGhpZ2hlci1sZXZlbCBhcGkuXG4gICAqL1xuICByYXdSZXF1ZXN0ICh0eXBlLCBkYXRhLCB0cmFuc2Zlcikge1xuICAgIGNvbnN0IG1zZ0lkID0gbmFub2lkKClcbiAgICBnbG9iYWxUaGlzLnBvc3RNZXNzYWdlKHtcbiAgICAgIHR5cGUsXG4gICAgICBkaXI6ICdyZXEnLFxuICAgICAgbXNnSWQsXG4gICAgICBkYXRhXG4gICAgfSwgdHJhbnNmZXIpXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuX3BlbmRpbmcuc2V0KG1zZ0lkLCBbcmVzb2x2ZSwgcmVqZWN0XSlcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCByZXMgPSB0aGlzLl9wZW5kaW5nLmdldChtc2dJZClcbiAgICAgICAgdGhpcy5fcGVuZGluZy5kZWxldGUobXNnSWQpXG4gICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICByZXNbMV0obmV3IEVycm9yKCd0aW1lb3V0JykpXG4gICAgICAgIH1cbiAgICAgIH0sIDMwMDAwKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICovXG4gIGFzeW5jIHJlZ2lzdGVyTW9kdWxlIChzcGVjKSB7XG4gICAgLy8gZG9uJ3QgY2FyZSBhYm91dCByZXNwb25zZSwganVzdCBuZWVkIGl0IHRvIG5vdCBiZSBhbiBlcnJvclxuICAgIGF3YWl0IHRoaXMucmF3UmVxdWVzdChcbiAgICAgICdyZWdpc3Rlck1vZHVsZScsXG4gICAgICBzcGVjXG4gICAgKVxuICB9XG5cbiAgLy8gLS0gcHJpdmF0ZSAtLSAvL1xuXG4gIF9oYW5kbGVNZXNzYWdlIChkYXRhKSB7XG4gICAgaWYgKGRhdGEuZGlyID09PSAncmVzJykge1xuICAgICAgY29uc3QgcmVzID0gdGhpcy5fcGVuZGluZy5nZXQoZGF0YS5tc2dJZClcbiAgICAgIHRoaXMuX3BlbmRpbmcuZGVsZXRlKGRhdGEubXNnSWQpXG4gICAgICBpZiAocmVzKSB7XG4gICAgICAgIGlmIChkYXRhLmVycm9yKSB7XG4gICAgICAgICAgcmVzWzFdKGRhdGEuZXJyb3IpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzWzBdKGRhdGEuZGF0YSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RpciAnICsgZGF0YS5kaXIgKyAnIG5vdCB5ZXQgaGFuZGxlZCcpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyB1cmxBbHBoYWJldCB9IGZyb20gJy4vdXJsLWFscGhhYmV0L2luZGV4LmpzJ1xuaWYgKHRydWUpIHtcbiAgaWYgKFxuICAgIHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmXG4gICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgJiZcbiAgICB0eXBlb2YgY3J5cHRvID09PSAndW5kZWZpbmVkJ1xuICApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnUmVhY3QgTmF0aXZlIGRvZXMgbm90IGhhdmUgYSBidWlsdC1pbiBzZWN1cmUgcmFuZG9tIGdlbmVyYXRvci4gJyArXG4gICAgICAgICdJZiB5b3UgZG9u4oCZdCBuZWVkIHVucHJlZGljdGFibGUgSURzIHVzZSBgbmFub2lkL25vbi1zZWN1cmVgLiAnICtcbiAgICAgICAgJ0ZvciBzZWN1cmUgSURzLCBpbXBvcnQgYHJlYWN0LW5hdGl2ZS1nZXQtcmFuZG9tLXZhbHVlc2AgJyArXG4gICAgICAgICdiZWZvcmUgTmFubyBJRC4nXG4gICAgKVxuICB9XG4gIGlmICh0eXBlb2YgbXNDcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjcnlwdG8gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0ltcG9ydCBmaWxlIHdpdGggYGlmICghd2luZG93LmNyeXB0bykgd2luZG93LmNyeXB0byA9IHdpbmRvdy5tc0NyeXB0b2AnICtcbiAgICAgICAgJyBiZWZvcmUgaW1wb3J0aW5nIE5hbm8gSUQgdG8gZml4IElFIDExIHN1cHBvcnQnXG4gICAgKVxuICB9XG4gIGlmICh0eXBlb2YgY3J5cHRvID09PSAndW5kZWZpbmVkJykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdZb3VyIGJyb3dzZXIgZG9lcyBub3QgaGF2ZSBzZWN1cmUgcmFuZG9tIGdlbmVyYXRvci4gJyArXG4gICAgICAgICdJZiB5b3UgZG9u4oCZdCBuZWVkIHVucHJlZGljdGFibGUgSURzLCB5b3UgY2FuIHVzZSBuYW5vaWQvbm9uLXNlY3VyZS4nXG4gICAgKVxuICB9XG59XG5sZXQgcmFuZG9tID0gYnl0ZXMgPT4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheShieXRlcykpXG5sZXQgY3VzdG9tUmFuZG9tID0gKGFscGhhYmV0LCBzaXplLCBnZXRSYW5kb20pID0+IHtcbiAgbGV0IG1hc2sgPSAoMiA8PCAoTWF0aC5sb2coYWxwaGFiZXQubGVuZ3RoIC0gMSkgLyBNYXRoLkxOMikpIC0gMVxuICBsZXQgc3RlcCA9IC1+KCgxLjYgKiBtYXNrICogc2l6ZSkgLyBhbHBoYWJldC5sZW5ndGgpXG4gIHJldHVybiAoKSA9PiB7XG4gICAgbGV0IGlkID0gJydcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgbGV0IGJ5dGVzID0gZ2V0UmFuZG9tKHN0ZXApXG4gICAgICBsZXQgaiA9IHN0ZXBcbiAgICAgIHdoaWxlIChqLS0pIHtcbiAgICAgICAgaWQgKz0gYWxwaGFiZXRbYnl0ZXNbal0gJiBtYXNrXSB8fCAnJ1xuICAgICAgICBpZiAoaWQubGVuZ3RoID09PSBzaXplKSByZXR1cm4gaWRcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbmxldCBjdXN0b21BbHBoYWJldCA9IChhbHBoYWJldCwgc2l6ZSkgPT4gY3VzdG9tUmFuZG9tKGFscGhhYmV0LCBzaXplLCByYW5kb20pXG5sZXQgbmFub2lkID0gKHNpemUgPSAyMSkgPT4ge1xuICBsZXQgaWQgPSAnJ1xuICBsZXQgYnl0ZXMgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KHNpemUpKVxuICB3aGlsZSAoc2l6ZS0tKSB7XG4gICAgbGV0IGJ5dGUgPSBieXRlc1tzaXplXSAmIDYzXG4gICAgaWYgKGJ5dGUgPCAzNikge1xuICAgICAgaWQgKz0gYnl0ZS50b1N0cmluZygzNilcbiAgICB9IGVsc2UgaWYgKGJ5dGUgPCA2Mikge1xuICAgICAgaWQgKz0gKGJ5dGUgLSAyNikudG9TdHJpbmcoMzYpLnRvVXBwZXJDYXNlKClcbiAgICB9IGVsc2UgaWYgKGJ5dGUgPCA2Mykge1xuICAgICAgaWQgKz0gJ18nXG4gICAgfSBlbHNlIHtcbiAgICAgIGlkICs9ICctJ1xuICAgIH1cbiAgfVxuICByZXR1cm4gaWRcbn1cbmV4cG9ydCB7IG5hbm9pZCwgY3VzdG9tQWxwaGFiZXQsIGN1c3RvbVJhbmRvbSwgdXJsQWxwaGFiZXQsIHJhbmRvbSB9XG4iLCJsZXQgdXJsQWxwaGFiZXQgPVxuICAndXNlYW5kb20tMjZUMTk4MzQwUFg3NXB4SkFDS1ZFUllNSU5EQlVTSFdPTEZfR1FaYmZnaGprbHF2d3l6cmljdCdcbmV4cG9ydCB7IHVybEFscGhhYmV0IH1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQW5Xb3JrZXJBcGkgfSBmcm9tICdAYWxsbmV0cDJwL2FuLXdvcmtlci1hcGknXG5cbihhc3luYyAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKEFuV29ya2VyQXBpLCB0eXBlb2YgQW5Xb3JrZXJBcGksIE9iamVjdC5rZXlzKEFuV29ya2VyQXBpKSlcbiAgY29uc3Qgd29ya2VyQXBpID0gbmV3IEFuV29ya2VyQXBpKClcbiAgLy8gVE9ETyBwdWxsIHZlcnNpb24gZnJvbSBwYWNrYWdlLmpzb25cbiAgYXdhaXQgd29ya2VyQXBpLnJlZ2lzdGVyTW9kdWxlKCdzeXN0ZW0uYWxsbmV0cDJwLmJyb2tlckAwLjAuMScpXG4gIGNvbnNvbGUubG9nKCdCUk9LRVIgV09SS0VSIFJFR0lTVEVSIFNVQ0NFU1MnKVxuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHRocm93IG5ldyBFcnJvcignY2FuIGRlYnVnPycpXG4gIH0sIDEwMDApXG59KSgpLnRoZW4oKCkgPT4ge30sIGVyciA9PiB7XG4gIGNvbnNvbGUuZXJyb3IoZXJyKVxufSlcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==