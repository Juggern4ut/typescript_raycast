/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst particle_1 = __importDefault(__webpack_require__(/*! ./particle */ \"./src/js/particle.js\"));\r\nconst wall_1 = __importDefault(__webpack_require__(/*! ./wall */ \"./src/js/wall.js\"));\r\nconst canvas = document.getElementById(\"canvas\");\r\nconst ctx = canvas.getContext(\"2d\");\r\nconst particle = new particle_1.default(canvas.width / 2, canvas.height / 2);\r\nconst walls = [];\r\nfor (let i = 0; i < 5; i++) {\r\n    walls.push(new wall_1.default(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * canvas.width, Math.random() * canvas.height));\r\n}\r\nwalls.push(new wall_1.default(0, 0, canvas.width, 0));\r\nwalls.push(new wall_1.default(canvas.width, 0, canvas.width, canvas.height));\r\nwalls.push(new wall_1.default(0, canvas.height, canvas.width, canvas.height));\r\nwalls.push(new wall_1.default(0, 0, 0, canvas.height));\r\ncanvas.addEventListener(\"mousemove\", (e) => {\r\n    particle.setPosition(e.clientX, e.clientY);\r\n});\r\nfunction drawScene() {\r\n    walls.forEach((wall) => {\r\n        wall.draw(ctx);\r\n    });\r\n    particle.draw(ctx);\r\n    particle.rays.forEach((r) => {\r\n        const point = r.cast(walls);\r\n        if (point) {\r\n            ctx.strokeStyle = \"rgba(255,255,255,0.4)\";\r\n            ctx.beginPath();\r\n            ctx.moveTo(particle.position.x, particle.position.y);\r\n            ctx.lineTo(point.x, point.y);\r\n            ctx.stroke();\r\n        }\r\n        r.draw(ctx);\r\n    });\r\n}\r\nfunction clearScene() {\r\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\r\n}\r\nsetInterval(() => {\r\n    clearScene();\r\n    drawScene();\r\n}, 20);\r\n\n\n//# sourceURL=webpack://2draycasting/./src/js/main.js?");

/***/ }),

/***/ "./src/js/particle.js":
/*!****************************!*\
  !*** ./src/js/particle.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst ray_1 = __importDefault(__webpack_require__(/*! ./ray */ \"./src/js/ray.js\"));\r\nclass Particle {\r\n    constructor(x, y) {\r\n        this.rays = [];\r\n        this.position = { x, y };\r\n        for (let i = 0; i < 360; i += 1) {\r\n            this.rays.push(new ray_1.default(this.position.x, this.position.y, i));\r\n        }\r\n    }\r\n    setPosition(x, y) {\r\n        this.position = { x, y };\r\n        this.rays.forEach((r) => (r.position = { x, y }));\r\n    }\r\n    draw(ctx) {\r\n        ctx.fillStyle = \"#fff\";\r\n        ctx.beginPath();\r\n        ctx.ellipse(this.position.x, this.position.y, 5, 5, Math.PI * 2, 0, Math.PI * 2);\r\n        ctx.fill();\r\n    }\r\n}\r\nexports[\"default\"] = Particle;\r\n\n\n//# sourceURL=webpack://2draycasting/./src/js/particle.js?");

/***/ }),

/***/ "./src/js/ray.js":
/*!***********************!*\
  !*** ./src/js/ray.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Ray {\r\n    constructor(posX, posY, angle) {\r\n        this.position = { x: posX, y: posY };\r\n        this.angle = angle;\r\n    }\r\n    draw(ctx) {\r\n        ctx.strokeStyle = \"#fff\";\r\n        ctx.beginPath();\r\n        ctx.moveTo(this.position.x, this.position.y);\r\n        ctx.lineTo(this.position.x + Math.cos(this.angle * (Math.PI / 180)) * 20, this.position.y + Math.sin(this.angle * (Math.PI / 180)) * 20);\r\n        ctx.stroke();\r\n    }\r\n    cast(walls) {\r\n        let currentClosest = false;\r\n        for (let w of walls) {\r\n            const x1 = w.start.x;\r\n            const y1 = w.start.y;\r\n            const x2 = w.end.x;\r\n            const y2 = w.end.y;\r\n            const x3 = this.position.x;\r\n            const y3 = this.position.y;\r\n            const x4 = this.position.x + Math.cos(this.angle * (Math.PI / 180));\r\n            const y4 = this.position.y + Math.sin(this.angle * (Math.PI / 180));\r\n            const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);\r\n            if (den == 0)\r\n                return false;\r\n            const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;\r\n            const u = -((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / den;\r\n            if (t > 0 && t < 1 && u < 0) {\r\n                let retX = x1 + t * (x2 - x1);\r\n                let retY = y1 + t * (y2 - y1);\r\n                if (currentClosest == false || this.getDist(retX, retY) < this.getDist(currentClosest.x, currentClosest.y)) {\r\n                    currentClosest = { x: retX, y: retY };\r\n                }\r\n            }\r\n        }\r\n        return currentClosest;\r\n    }\r\n    getDist(x, y) {\r\n        const dX = Math.abs(x - this.position.x);\r\n        const dY = Math.abs(y - this.position.y);\r\n        return Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));\r\n    }\r\n}\r\nexports[\"default\"] = Ray;\r\n\n\n//# sourceURL=webpack://2draycasting/./src/js/ray.js?");

/***/ }),

/***/ "./src/js/wall.js":
/*!************************!*\
  !*** ./src/js/wall.js ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Wall {\r\n    constructor(x1, y1, x2, y2) {\r\n        this.start = { x: x1, y: y1 };\r\n        this.end = { x: x2, y: y2 };\r\n    }\r\n    /**\r\n     * Will draw the wall to the given canvas\r\n     * @param ctx The context to draw the wall onto\r\n     */\r\n    draw(ctx) {\r\n        ctx.strokeStyle = \"#fff\";\r\n        ctx.beginPath();\r\n        ctx.moveTo(this.start.x, this.start.y);\r\n        ctx.lineTo(this.end.x, this.end.y);\r\n        ctx.stroke();\r\n    }\r\n}\r\nexports[\"default\"] = Wall;\r\n\n\n//# sourceURL=webpack://2draycasting/./src/js/wall.js?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/main.js");
/******/ 	
/******/ })()
;