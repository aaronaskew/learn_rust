"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcreate_wasm_app"] = self["webpackChunkcreate_wasm_app"] || []).push([["index_js"],{

/***/ "../pkg/wasm_game_of_life.js":
/*!***********************************!*\
  !*** ../pkg/wasm_game_of_life.js ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Cell: () => (/* reexport safe */ _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_0__.Cell),\n/* harmony export */   Universe: () => (/* reexport safe */ _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_0__.Universe),\n/* harmony export */   __wbg_error_f851667af71bcfc6: () => (/* reexport safe */ _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_error_f851667af71bcfc6),\n/* harmony export */   __wbg_new_abda76e883ba8a5f: () => (/* reexport safe */ _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_new_abda76e883ba8a5f),\n/* harmony export */   __wbg_random_5f61cd0d6777a993: () => (/* reexport safe */ _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_random_5f61cd0d6777a993),\n/* harmony export */   __wbg_set_wasm: () => (/* reexport safe */ _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_set_wasm),\n/* harmony export */   __wbg_stack_658279fe44541cf6: () => (/* reexport safe */ _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_stack_658279fe44541cf6),\n/* harmony export */   __wbindgen_object_drop_ref: () => (/* reexport safe */ _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_object_drop_ref),\n/* harmony export */   __wbindgen_throw: () => (/* reexport safe */ _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_throw)\n/* harmony export */ });\n/* harmony import */ var _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wasm_game_of_life_bg.wasm */ \"../pkg/wasm_game_of_life_bg.wasm\");\n/* harmony import */ var _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wasm_game_of_life_bg.js */ \"../pkg/wasm_game_of_life_bg.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_1__]);\n_wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n(0,_wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_set_wasm)(_wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_1__);\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://create-wasm-app/../pkg/wasm_game_of_life.js?");

/***/ }),

/***/ "../pkg/wasm_game_of_life_bg.js":
/*!**************************************!*\
  !*** ../pkg/wasm_game_of_life_bg.js ***!
  \**************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Cell: () => (/* binding */ Cell),\n/* harmony export */   Universe: () => (/* binding */ Universe),\n/* harmony export */   __wbg_error_f851667af71bcfc6: () => (/* binding */ __wbg_error_f851667af71bcfc6),\n/* harmony export */   __wbg_new_abda76e883ba8a5f: () => (/* binding */ __wbg_new_abda76e883ba8a5f),\n/* harmony export */   __wbg_random_5f61cd0d6777a993: () => (/* binding */ __wbg_random_5f61cd0d6777a993),\n/* harmony export */   __wbg_set_wasm: () => (/* binding */ __wbg_set_wasm),\n/* harmony export */   __wbg_stack_658279fe44541cf6: () => (/* binding */ __wbg_stack_658279fe44541cf6),\n/* harmony export */   __wbindgen_object_drop_ref: () => (/* binding */ __wbindgen_object_drop_ref),\n/* harmony export */   __wbindgen_throw: () => (/* binding */ __wbindgen_throw)\n/* harmony export */ });\n/* module decorator */ module = __webpack_require__.hmd(module);\nlet wasm;\nfunction __wbg_set_wasm(val) {\n    wasm = val;\n}\n\n\nconst heap = new Array(128).fill(undefined);\n\nheap.push(undefined, null, true, false);\n\nfunction getObject(idx) { return heap[idx]; }\n\nlet heap_next = heap.length;\n\nfunction dropObject(idx) {\n    if (idx < 132) return;\n    heap[idx] = heap_next;\n    heap_next = idx;\n}\n\nfunction takeObject(idx) {\n    const ret = getObject(idx);\n    dropObject(idx);\n    return ret;\n}\n\nconst lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;\n\nlet cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachedUint8Memory0 = null;\n\nfunction getUint8Memory0() {\n    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {\n        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);\n    }\n    return cachedUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    ptr = ptr >>> 0;\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n\nlet cachedInt32Memory0 = null;\n\nfunction getInt32Memory0() {\n    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {\n        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);\n    }\n    return cachedInt32Memory0;\n}\n\nfunction addHeapObject(obj) {\n    if (heap_next === heap.length) heap.push(heap.length + 1);\n    const idx = heap_next;\n    heap_next = heap[idx];\n\n    heap[idx] = obj;\n    return idx;\n}\n\nlet WASM_VECTOR_LEN = 0;\n\nconst lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;\n\nlet cachedTextEncoder = new lTextEncoder('utf-8');\n\nconst encodeString = (typeof cachedTextEncoder.encodeInto === 'function'\n    ? function (arg, view) {\n    return cachedTextEncoder.encodeInto(arg, view);\n}\n    : function (arg, view) {\n    const buf = cachedTextEncoder.encode(arg);\n    view.set(buf);\n    return {\n        read: arg.length,\n        written: buf.length\n    };\n});\n\nfunction passStringToWasm0(arg, malloc, realloc) {\n\n    if (realloc === undefined) {\n        const buf = cachedTextEncoder.encode(arg);\n        const ptr = malloc(buf.length, 1) >>> 0;\n        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);\n        WASM_VECTOR_LEN = buf.length;\n        return ptr;\n    }\n\n    let len = arg.length;\n    let ptr = malloc(len, 1) >>> 0;\n\n    const mem = getUint8Memory0();\n\n    let offset = 0;\n\n    for (; offset < len; offset++) {\n        const code = arg.charCodeAt(offset);\n        if (code > 0x7F) break;\n        mem[ptr + offset] = code;\n    }\n\n    if (offset !== len) {\n        if (offset !== 0) {\n            arg = arg.slice(offset);\n        }\n        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;\n        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);\n        const ret = encodeString(arg, view);\n\n        offset += ret.written;\n    }\n\n    WASM_VECTOR_LEN = offset;\n    return ptr;\n}\n\nfunction notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }\n/**\n*/\nclass Cell {\n\n    __destroy_into_raw() {\n        const ptr = this.__wbg_ptr;\n        this.__wbg_ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        wasm.__wbg_cell_free(ptr);\n    }\n}\n/**\n*/\nclass Universe {\n\n    static __wrap(ptr) {\n        ptr = ptr >>> 0;\n        const obj = Object.create(Universe.prototype);\n        obj.__wbg_ptr = ptr;\n\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.__wbg_ptr;\n        this.__wbg_ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        wasm.__wbg_universe_free(ptr);\n    }\n    /**\n    * @returns {Universe}\n    */\n    static new() {\n        const ret = wasm.universe_new();\n        return Universe.__wrap(ret);\n    }\n    /**\n    * @param {number} row\n    * @param {number} col\n    */\n    toggle_cell(row, col) {\n        wasm.universe_toggle_cell(this.__wbg_ptr, row, col);\n    }\n    /**\n    * Set the width of the universe.\n    *\n    * Resets all cells to the dead state.\n    * @param {number} width\n    */\n    set_width(width) {\n        wasm.universe_set_width(this.__wbg_ptr, width);\n    }\n    /**\n    * Set the height of the universe.\n    *\n    * Resets all cells to the dead state.\n    * @param {number} height\n    */\n    set_height(height) {\n        wasm.universe_set_height(this.__wbg_ptr, height);\n    }\n    /**\n    * @param {number} center_row\n    * @param {number} center_col\n    */\n    insert_glider(center_row, center_col) {\n        wasm.universe_insert_glider(this.__wbg_ptr, center_row, center_col);\n    }\n    /**\n    * @param {number} center_row\n    * @param {number} center_col\n    */\n    insert_pulsar(center_row, center_col) {\n        wasm.universe_insert_pulsar(this.__wbg_ptr, center_row, center_col);\n    }\n    /**\n    */\n    tick() {\n        wasm.universe_tick(this.__wbg_ptr);\n    }\n    /**\n    * @returns {string}\n    */\n    render() {\n        let deferred1_0;\n        let deferred1_1;\n        try {\n            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);\n            wasm.universe_render(retptr, this.__wbg_ptr);\n            var r0 = getInt32Memory0()[retptr / 4 + 0];\n            var r1 = getInt32Memory0()[retptr / 4 + 1];\n            deferred1_0 = r0;\n            deferred1_1 = r1;\n            return getStringFromWasm0(r0, r1);\n        } finally {\n            wasm.__wbindgen_add_to_stack_pointer(16);\n            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);\n        }\n    }\n    /**\n    * @returns {number}\n    */\n    width() {\n        const ret = wasm.universe_width(this.__wbg_ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {number}\n    */\n    height() {\n        const ret = wasm.universe_height(this.__wbg_ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {number}\n    */\n    cells() {\n        const ret = wasm.universe_cells(this.__wbg_ptr);\n        return ret;\n    }\n}\n\nfunction __wbg_new_abda76e883ba8a5f() {\n    const ret = new Error();\n    return addHeapObject(ret);\n};\n\nfunction __wbg_stack_658279fe44541cf6(arg0, arg1) {\n    const ret = getObject(arg1).stack;\n    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n    const len1 = WASM_VECTOR_LEN;\n    getInt32Memory0()[arg0 / 4 + 1] = len1;\n    getInt32Memory0()[arg0 / 4 + 0] = ptr1;\n};\n\nfunction __wbg_error_f851667af71bcfc6(arg0, arg1) {\n    let deferred0_0;\n    let deferred0_1;\n    try {\n        deferred0_0 = arg0;\n        deferred0_1 = arg1;\n        console.error(getStringFromWasm0(arg0, arg1));\n    } finally {\n        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);\n    }\n};\n\nfunction __wbindgen_object_drop_ref(arg0) {\n    takeObject(arg0);\n};\n\nconst __wbg_random_5f61cd0d6777a993 = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');\n\nfunction __wbindgen_throw(arg0, arg1) {\n    throw new Error(getStringFromWasm0(arg0, arg1));\n};\n\n\n\n//# sourceURL=webpack://create-wasm-app/../pkg/wasm_game_of_life_bg.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var wasm_game_of_life__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wasm-game-of-life */ \"../pkg/wasm_game_of_life.js\");\n/* harmony import */ var wasm_game_of_life_wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wasm-game-of-life/wasm_game_of_life_bg.wasm */ \"../pkg/wasm_game_of_life_bg.wasm\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([wasm_game_of_life__WEBPACK_IMPORTED_MODULE_0__, wasm_game_of_life_wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_1__]);\n([wasm_game_of_life__WEBPACK_IMPORTED_MODULE_0__, wasm_game_of_life_wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\nconst CELL_SIZE = 5; //px\nconst GRID_COLOR = \"#CCCCCC\";\nconst DEAD_COLOR = \"#FFFFFF\";\nconst ALIVE_COLOR = \"#000000\";\nlet speed = 1;\n\n// Construct the universe and get its width and height.\n/** @type {Universe} */\nlet universe = wasm_game_of_life__WEBPACK_IMPORTED_MODULE_0__.Universe.new();\n/** @type {Number} */\nconst width = universe.width();\n/** @type {Number} */\nconst height = universe.height();\n\n// Give the canvas room for all of our cells and a 1px border around each of \n// them.\n/** @type {HTMLCanvasElement} */\nconst canvas = document.getElementById(\"game-of-life-canvas\");\n\ncanvas.height = (CELL_SIZE + 1) * height + 1;\ncanvas.width = (CELL_SIZE + 1) * width + 1;\n\nconst ctx = canvas.getContext('2d');\n\nlet animationId = null;\n\n/*eslint no-debugger: \"off\"*/\nconst renderLoop = () => {\n    for (let i = 0; i < speed; i++) {\n        universe.tick();\n    }\n    drawGrid();\n    drawCells();\n\n    animationId = requestAnimationFrame(renderLoop);\n}\n\nconst isPaused = () => {\n    return animationId === null;\n}\n\nconst playPauseButton = document.getElementById(\"play-pause\");\n\nconst play = () => {\n    playPauseButton.textContent = \"⏸️\";\n    renderLoop();\n}\n\nconst pause = () => {\n    playPauseButton.textContent = \"▶️\";\n    cancelAnimationFrame(animationId);\n    animationId = null;\n}\n\nplayPauseButton.addEventListener(\"click\", () => {\n    if (isPaused()) {\n        play();\n    } else {\n        pause();\n    }\n});\n\ncanvas.addEventListener(\"click\", event => {\n    const boundingRect = canvas.getBoundingClientRect();\n\n    const scaleX = canvas.width / boundingRect.width;\n    const scaleY = canvas.height / boundingRect.height;\n\n    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;\n    const canvasTop = (event.clientY - boundingRect.top) * scaleY;\n\n    const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);\n    const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);\n\n    if (event.ctrlKey) {\n        universe.insert_glider(row, col);\n    } else if (event.shiftKey) {\n        universe.insert_pulsar(row, col);\n    } else {\n        universe.toggle_cell(row, col);\n    }\n\n    drawGrid();\n    drawCells();\n});\n\n\n\nconst drawGrid = () => {\n    ctx.beginPath();\n    ctx.strokeStyle = GRID_COLOR;\n\n    // Vertical lines\n    for (let i = 0; i <= width; i++) {\n        ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);\n        ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);\n    }\n\n    // Horizontal lines\n    for (let j = 0; j <= height; j++) {\n        ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);\n        ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1,);\n    }\n\n    ctx.stroke();\n}\n\nconst getIndex = (row, col) => row * width + col;\n\nconst bitIsSet = (n, arr) => {\n    const byte = Math.floor(n / 8);\n    const mask = 1 << (n % 8);\n    return (arr[byte] & mask) === mask;\n};\n\nconst drawCells = () => {\n\n    const cellsPtr = universe.cells();\n    const cells = new Uint8Array(wasm_game_of_life_wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_1__.memory.buffer, cellsPtr, width * height / 8);\n\n    ctx.beginPath();\n\n    for (let row = 0; row < height; row++) {\n        for (let col = 0; col < width; col++) {\n            const idx = getIndex(row, col);\n\n            ctx.fillStyle = bitIsSet(idx, cells)\n                ? ALIVE_COLOR\n                : DEAD_COLOR;\n\n            ctx.fillRect(\n                col * (CELL_SIZE + 1) + 1,\n                row * (CELL_SIZE + 1) + 1,\n                CELL_SIZE,\n                CELL_SIZE\n            );\n        }\n    }\n\n    ctx.stroke();\n};\n\nconst speedRange = document.getElementById(\"speed\");\nconst speedLabel = document.getElementById(\"speed-label\");\nconst speedSpan = document.getElementById(\"speed-span\");\n\nspeedRange.addEventListener(\"input\", event => {\n    speedLabel.value = event.target.value;\n});\nspeedSpan.addEventListener(\"change\", event => {\n    let newSpeed = event.target.value;\n    if (newSpeed > 100) {\n        newSpeed = 100;\n        speedRange.value = speedLabel.value = newSpeed;\n    }\n\n    speed = newSpeed;\n    console.log(speed);\n});\n\nconst randomizeButton = document.getElementById(\"randomize\");\nrandomizeButton.addEventListener(\"click\", () => {\n    universe = wasm_game_of_life__WEBPACK_IMPORTED_MODULE_0__.Universe.new();\n    drawCells();\n});\n\nconst clearButton = document.getElementById(\"clear\");\nclearButton.addEventListener(\"click\", () => {\n    universe.set_width(universe.width());\n    drawCells();\n});\n\ndrawGrid();\ndrawCells();\nplay();\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://create-wasm-app/./index.js?");

/***/ }),

/***/ "../pkg/wasm_game_of_life_bg.wasm":
/*!****************************************!*\
  !*** ../pkg/wasm_game_of_life_bg.wasm ***!
  \****************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("/* harmony import */ var WEBPACK_IMPORTED_MODULE_0 = __webpack_require__(/*! ./wasm_game_of_life_bg.js */ \"../pkg/wasm_game_of_life_bg.js\");\nmodule.exports = __webpack_require__.v(exports, module.id, \"6360c5da5511abe3a2eb\", {\n\t\"./wasm_game_of_life_bg.js\": {\n\t\t\"__wbg_new_abda76e883ba8a5f\": WEBPACK_IMPORTED_MODULE_0.__wbg_new_abda76e883ba8a5f,\n\t\t\"__wbg_stack_658279fe44541cf6\": WEBPACK_IMPORTED_MODULE_0.__wbg_stack_658279fe44541cf6,\n\t\t\"__wbg_error_f851667af71bcfc6\": WEBPACK_IMPORTED_MODULE_0.__wbg_error_f851667af71bcfc6,\n\t\t\"__wbindgen_object_drop_ref\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_object_drop_ref,\n\t\t\"__wbg_random_5f61cd0d6777a993\": WEBPACK_IMPORTED_MODULE_0.__wbg_random_5f61cd0d6777a993,\n\t\t\"__wbindgen_throw\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_throw\n\t}\n});\n\n//# sourceURL=webpack://create-wasm-app/../pkg/wasm_game_of_life_bg.wasm?");

/***/ })

}]);