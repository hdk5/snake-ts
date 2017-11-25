/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Direction {
    constructor(id) {
        this.id = id;
    }
    reverse() {
        switch (this) {
            case Direction.Left:
                return Direction.Right;
            case Direction.Right:
                return Direction.Left;
            case Direction.Up:
                return Direction.Down;
            case Direction.Down:
                return Direction.Up;
        }
    }
}
Direction.Up = new Direction("Up");
Direction.Down = new Direction("Down");
Direction.Left = new Direction("Left");
Direction.Right = new Direction("Right");
/* harmony default export */ __webpack_exports__["a"] = (Direction);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Util {
    static mod(divident, divisor) {
        return ((divident % divisor) + divisor) % divisor;
    }
    ;
    static choice(arr) {
        return arr[Math.floor(Math.random() * arr.length)] || null;
    }
    static arrayClone(arr) {
        let clone = [];
        for (let obj of arr) {
            clone.push(obj.clone());
        }
        return clone;
    }
    static arrayContains(arr, el) {
        for (let obj of arr) {
            if (obj.equals(el))
                return true;
        }
        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Util;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Coords {
    constructor(row, column) {
        this._row = row;
        this._column = column;
    }
    get row() {
        return this._row;
    }
    set row(value) {
        this._row = value;
    }
    get column() {
        return this._column;
    }
    set column(value) {
        this._column = value;
    }
    clone() {
        return new Coords(this._row, this._column);
    }
    equals(obj) {
        return this.row == obj.row && this.column == obj.column;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Coords;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Coords__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Direction__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CanvasHelper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AiHelper__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__HtmlHelper__ = __webpack_require__(20);






class Game {
    constructor(htmlRoot) {
        this._htmlHelper = new __WEBPACK_IMPORTED_MODULE_5__HtmlHelper__["a" /* default */](this, htmlRoot);
        this._canvasHelper = new __WEBPACK_IMPORTED_MODULE_2__CanvasHelper__["a" /* default */](this);
        this._htmlHelper.gameInit();
        this.canvas.tabIndex = 0;
        this.canvas.onkeydown = ev => {
            switch (ev.keyCode) {
                case 37:
                    this._player.direction = __WEBPACK_IMPORTED_MODULE_1__Direction__["a" /* default */].Left;
                    break;
                case 38:
                    this._player.direction = __WEBPACK_IMPORTED_MODULE_1__Direction__["a" /* default */].Up;
                    break;
                case 39:
                    this._player.direction = __WEBPACK_IMPORTED_MODULE_1__Direction__["a" /* default */].Right;
                    break;
                case 40:
                    this._player.direction = __WEBPACK_IMPORTED_MODULE_1__Direction__["a" /* default */].Down;
                    break;
            }
        };
        console.log("Game object created.");
    }
    get score() {
        return this._score;
    }
    get htmlRoot() {
        return this._htmlHelper.root;
    }
    get difficulty() {
        return this._difficulty;
    }
    set difficulty(value) {
        this._difficulty = value;
    }
    get canvas() {
        return this._htmlHelper.canvas;
    }
    ;
    get _player() {
        return this._snakes[0];
    }
    get _enemies() {
        return this._snakes.slice(1);
    }
    static checkCollisions(self, other) {
        for (let i = 0; i < self.length; ++i) {
            for (let j = 0; j < other.length; ++j) {
                if (self[i].equals(other[j])) {
                    return self[i].clone();
                }
            }
        }
        return null;
    }
    gameOver() {
        this._htmlHelper.gameOver();
    }
    initGame(difficulty, init) {
        this._htmlHelper.gameProgress();
        this._difficulty = difficulty;
        this._field = init.field.clone();
        this._snakes = __WEBPACK_IMPORTED_MODULE_3__Util__["a" /* default */].arrayClone(init.snakes);
        this._food = this.createFood();
        this._score = 0;
        this.canvas.focus();
        cancelAnimationFrame(this._frameId);
        this._lastFrameTimeStamp = performance.now();
        this._frameId = requestAnimationFrame(this.animationLoop.bind(this));
    }
    createFood() {
        let cells = [];
        for (let i = 0; i < this._field.height; ++i) {
            for (let j = 0; j < this._field.width; ++j) {
                cells.push(new __WEBPACK_IMPORTED_MODULE_0__Coords__["a" /* default */](i, j));
            }
        }
        cellLoop: for (let i = cells.length - 1; i >= 0; --i) {
            for (let block of this._field.blocks) {
                if (cells[i].equals(block)) {
                    cells.splice(i, 1);
                    continue cellLoop;
                }
            }
            for (let snake of this._snakes) {
                for (let block of snake.snake) {
                    if (cells[i].equals(block)) {
                        cells.splice(i, 1);
                        continue cellLoop;
                    }
                }
            }
        }
        return __WEBPACK_IMPORTED_MODULE_3__Util__["a" /* default */].choice(cells);
    }
    animationLoop(frameTimeStamp) {
        if (frameTimeStamp - this._lastFrameTimeStamp < 1000 / this._difficulty) {
            requestAnimationFrame(this.animationLoop.bind(this));
            return;
        }
        this._lastFrameTimeStamp = frameTimeStamp;
        this._htmlHelper.gameScore = this._score;
        this._canvasHelper.drawField(this._field);
        this._canvasHelper.drawFood(this._food);
        this._canvasHelper.drawSnake(this._player, __WEBPACK_IMPORTED_MODULE_2__CanvasHelper__["a" /* default */].SnakeType.Player);
        for (let enemy of this._enemies) {
            this._canvasHelper.drawSnake(enemy, __WEBPACK_IMPORTED_MODULE_2__CanvasHelper__["a" /* default */].SnakeType.Enemy);
        }
        let obstacles = [];
        obstacles.push(...this._field.blocks);
        for (let snake of this._snakes) {
            obstacles.push(...snake.snake);
        }
        for (let enemy of this._enemies) {
            enemy.direction = __WEBPACK_IMPORTED_MODULE_4__AiHelper__["a" /* default */].decide(enemy.snake[0], this._food, obstacles, this._field.height, this._field.width);
        }
        for (let snake of this._snakes.filter(value => value.alive)) {
            let obstacles = [];
            obstacles.push(...this._field.blocks);
            for (let enemy of this._snakes.filter(value => value != snake)) {
                obstacles.push(...enemy.snake);
            }
            obstacles.push(...snake.snake.slice(1));
            let coords = Game.checkCollisions([snake.snake[0]], obstacles);
            console.log(coords);
            if (coords) {
                snake.alive = false;
            }
        }
        for (let snake of this._snakes.filter(value => value.alive)) {
            snake.move();
        }
        for (let snake of this._snakes) {
            if (snake.snake[0].equals(this._food)) {
                snake.feed();
                this._food = this.createFood();
                if (snake == this._player) {
                    this._score += this._difficulty;
                }
                break;
            }
        }
        if (c < Infinity) {
            c++;
            this._frameId = requestAnimationFrame(this.animationLoop.bind(this));
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;

Game.CELL_SIZE = 25;
let c = 0;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Game__ = __webpack_require__(3);
// import tilemap from './tilemap'
// import Direction from './Direction'
// import Snake from './Snake'
// import Coords from "./Coords"
// import Field from "./Field"

// import GamePreset from "./GamePreset";
// import Util from "./Util";
// (window as any).Snake = Snake;
// (window as any).Field = Field;
// (window as any).Coords = Coords;
// (window as any).Game = Game;
// (window as any).Direction = Direction;
// (window as any).tilemap = tilemap;
// (window as any).GamePreset = GamePreset;
// (window as any).Util = Util;
//
let game = new __WEBPACK_IMPORTED_MODULE_0__Game__["a" /* default */](document.getElementById("game_root"));
// game.initGame(GamePreset.Box);
window.game = game;
console.log("Bundle loaded");


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Direction__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Game__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tilemap__ = __webpack_require__(7);




var SnakeType;
(function (SnakeType) {
    SnakeType[SnakeType["Player"] = 0] = "Player";
    SnakeType[SnakeType["Enemy"] = 1] = "Enemy";
})(SnakeType || (SnakeType = {}));
class CanvasHelper {
    constructor(game) {
        this._game = game;
    }
    get _canvas() {
        return this._game.canvas;
    }
    drawFood(point) {
        this.drawCell(__WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].food, point.column, point.row, 0);
    }
    drawField(field) {
        this._canvas.width = field.width * __WEBPACK_IMPORTED_MODULE_1__Game__["a" /* default */].CELL_SIZE;
        this._canvas.height = field.height * __WEBPACK_IMPORTED_MODULE_1__Game__["a" /* default */].CELL_SIZE;
        for (let i = 0; i < field.width; ++i) {
            for (let j = 0; j < field.height; ++j) {
                this.drawCell(__WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].fieldEmpty, i, j, 0);
            }
        }
        for (let block of field.blocks) {
            this.drawCell(__WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].fieldWall, block.column, block.row, 0);
        }
    }
    drawSnake(snake, type) {
        let to, from;
        for (let i = 0; i < snake.snake.length; ++i) {
            let image, canvasX, canvasY, angle;
            if (i == 0) {
                let head = snake.snake[i];
                from = snake.direction.reverse();
                switch (from) {
                    case __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Down:
                        angle = 0;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Left:
                        angle = Math.PI / 2;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Up:
                        angle = Math.PI;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Right:
                        angle = Math.PI * 3 / 2;
                        break;
                }
                image = __WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].playerHead;
                canvasX = head.column;
                canvasY = head.row;
            }
            else if (i == snake.snake.length - 1) {
                let tail = snake.snake[i];
                to = from.reverse();
                switch (to) {
                    case __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Up:
                        angle = 0;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Right:
                        angle = Math.PI / 2;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Down:
                        angle = Math.PI;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Left:
                        angle = Math.PI * 3 / 2;
                        break;
                }
                image = __WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].playerTail;
                canvasX = tail.column;
                canvasY = tail.row;
            }
            else {
                to = from.reverse();
                let body = snake.snake[i];
                let next = snake.snake[i + 1];
                if (body.row == next.row) {
                    if (__WEBPACK_IMPORTED_MODULE_2__Util__["a" /* default */].mod(body.column + 1, snake.columns) == next.column) {
                        from = __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Right;
                    }
                    else if (__WEBPACK_IMPORTED_MODULE_2__Util__["a" /* default */].mod(body.column - 1, snake.columns) == next.column) {
                        from = __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Left;
                    }
                }
                else if (body.column == next.column) {
                    if (__WEBPACK_IMPORTED_MODULE_2__Util__["a" /* default */].mod(body.row + 1, snake.rows) == next.row) {
                        from = __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Down;
                    }
                    else if (__WEBPACK_IMPORTED_MODULE_2__Util__["a" /* default */].mod(body.row - 1, snake.rows) == next.row) {
                        from = __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Up;
                    }
                }
                if ((from == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Left && to == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Right)
                    || (from == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Right && to == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Left)) {
                    image = __WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].playerStraight;
                    angle = Math.PI / 2;
                }
                else if ((from == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Up && to == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Down)
                    || (from == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Down && to == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Up)) {
                    image = __WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].playerStraight;
                    angle = 0;
                }
                else if ((from == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Up && to == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Right)
                    || (from == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Right && to == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Up)) {
                    image = __WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].playerRotate;
                    angle = 0;
                }
                else if ((from == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Right && to == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Down)
                    || (from == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Down && to == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Right)) {
                    image = __WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].playerRotate;
                    angle = Math.PI / 2;
                }
                else if ((from == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Down && to == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Left)
                    || (from == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Left && to == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Down)) {
                    image = __WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].playerRotate;
                    angle = Math.PI;
                }
                else if ((from == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Left && to == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Up)
                    || (from == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Up && to == __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Left)) {
                    image = __WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].playerRotate;
                    angle = Math.PI * 3 / 2;
                }
                canvasX = body.column;
                canvasY = body.row;
            }
            // }
            switch (image) {
                case __WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].playerHead:
                    switch (type) {
                        case SnakeType.Player:
                            image = __WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].playerHead;
                            break;
                        case SnakeType.Enemy:
                            image = __WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].enemyHead;
                            break;
                    }
                    break;
                case __WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].playerRotate:
                    switch (type) {
                        case SnakeType.Player:
                            image = __WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].playerRotate;
                            break;
                        case SnakeType.Enemy:
                            image = __WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].enemyRotate;
                            break;
                    }
                    break;
                case __WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].playerStraight:
                    switch (type) {
                        case SnakeType.Player:
                            image = __WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].playerStraight;
                            break;
                        case SnakeType.Enemy:
                            image = __WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].enemyStraight;
                            break;
                    }
                    break;
                case __WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].playerTail:
                    switch (type) {
                        case SnakeType.Player:
                            image = __WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].playerTail;
                            break;
                        case SnakeType.Enemy:
                            image = __WEBPACK_IMPORTED_MODULE_3__tilemap__["a" /* default */].enemyTail;
                            break;
                    }
                    break;
            }
            this.drawCell(image, canvasX, canvasY, angle);
        }
    }
    ;
    drawCell(image, canvasX, canvasY, angle) {
        let ctx = this._canvas.getContext('2d');
        ctx.save();
        ctx.translate(canvasX * __WEBPACK_IMPORTED_MODULE_1__Game__["a" /* default */].CELL_SIZE, canvasY * __WEBPACK_IMPORTED_MODULE_1__Game__["a" /* default */].CELL_SIZE);
        ctx.translate(__WEBPACK_IMPORTED_MODULE_1__Game__["a" /* default */].CELL_SIZE / 2, __WEBPACK_IMPORTED_MODULE_1__Game__["a" /* default */].CELL_SIZE / 2);
        ctx.rotate(angle);
        ctx.drawImage(image, -__WEBPACK_IMPORTED_MODULE_1__Game__["a" /* default */].CELL_SIZE / 2, -__WEBPACK_IMPORTED_MODULE_1__Game__["a" /* default */].CELL_SIZE / 2, __WEBPACK_IMPORTED_MODULE_1__Game__["a" /* default */].CELL_SIZE, __WEBPACK_IMPORTED_MODULE_1__Game__["a" /* default */].CELL_SIZE);
        ctx.restore();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CanvasHelper;

CanvasHelper.SnakeType = SnakeType;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
namespace tilemap {
    export const food: HTMLImageElement = new Image();
    // food.onload = () => console.log(food);
    food.src = require("./tilemap/food.png");

    export const fieldEmpty: HTMLImageElement = new Image();
    // fieldEmpty.onload = () => console.log(fieldEmpty);
    fieldEmpty.src = require("./tilemap/field_empty.png");

    export const fieldWall: HTMLImageElement = new Image();
    // fieldWall.onload = () => console.log(fieldWall);
    fieldWall.src = require("./tilemap/field_wall.png");

    export const enemyHead: HTMLImageElement = new Image();
    // enemyHead.onload = () => console.log(enemyHead);
    enemyHead.src = require("./tilemap/enemy_head.png");

    export const enemyTail: HTMLImageElement = new Image();
    // enemyTail.onload = () => console.log(enemyTail);
    enemyTail.src = require("./tilemap/enemy_tail.png");

    export const enemyStraight: HTMLImageElement = new Image();
    // enemyStraight.onload = () => console.log(enemyStraight);
    enemyStraight.src = require("./tilemap/enemy_straight.png");

    export const enemyRotate: HTMLImageElement = new Image();
    // enemyRotate.onload = () => console.log(enemyRotate);
    enemyRotate.src = require("./tilemap/enemy_rotate.png");

    export const playerHead: HTMLImageElement = new Image();
    // playerHead.onload = () => console.log(playerHead);
    playerHead.src = require("./tilemap/player_head.png");

    export const playerTail: HTMLImageElement = new Image();
    // playerTail.onload = () => console.log(playerTail);
    playerTail.src = require("./tilemap/player_tail.png");

    export const playerStraight: HTMLImageElement = new Image();
    // playerStraight.onload = () => console.log(playerStraight);
    playerStraight.src = require("./tilemap/player_straight.png");

    export const playerRotate: HTMLImageElement = new Image();
    // playerRotate.onload = () => console.log(playerRotate);
    playerRotate.src = require("./tilemap/player_rotate.png");

}
*/
class Tilemap {
}
Tilemap.food = new Image();
Tilemap.fieldEmpty = new Image();
Tilemap.fieldWall = new Image();
Tilemap.enemyHead = new Image();
Tilemap.enemyTail = new Image();
Tilemap.enemyStraight = new Image();
Tilemap.enemyRotate = new Image();
Tilemap.playerHead = new Image();
Tilemap.playerTail = new Image();
Tilemap.playerStraight = new Image();
Tilemap.playerRotate = new Image();
Tilemap.food.src = __webpack_require__(8);
Tilemap.fieldEmpty.src = __webpack_require__(9);
Tilemap.fieldWall.src = __webpack_require__(10);
Tilemap.enemyHead.src = __webpack_require__(11);
Tilemap.enemyTail.src = __webpack_require__(12);
Tilemap.enemyStraight.src = __webpack_require__(13);
Tilemap.enemyRotate.src = __webpack_require__(14);
Tilemap.playerHead.src = __webpack_require__(15);
Tilemap.playerTail.src = __webpack_require__(16);
Tilemap.playerStraight.src = __webpack_require__(17);
Tilemap.playerRotate.src = __webpack_require__(18);
/* harmony default export */ __webpack_exports__["a"] = (Tilemap);


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTnU1rJkAAAAW0lEQVRIS+3NSwoAIAxDwV7F+x9SEQyIRPw1G+nAg65SC2FPTrldIvUBkugfSB6xB8gFGx57wgZnXWFDq46wgd2OsIFVV9jQrCdscMwFG0au5A9A/gDkD8InzArfwu+wergE2QAAAABJRU5ErkJggg=="

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAIAAABLixI0AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwQAADsEBuJFr7QAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xOdTWsmQAAAApSURBVEhLY6AyaKAGGDWLNDBqFmlg1CzSwKhZpIFRs0gDg9ws6gAGBgBU+xmuCMgmOQAAAABJRU5ErkJggg=="

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAIAAABLixI0AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwQAADsEBuJFr7QAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xOdTWsmQAAAAmSURBVEhLY3CgHhg1izQwahZpYNQs0sCoWaSBUbNIA6NmkQIcHADt0dTQuDtR2wAAAABJRU5ErkJggg=="

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xOdTWsmQAAABzSURBVEhL7cxBCsAgDERRT9P739CW0gGx32asWfrgbwKZsm3fjlpfpaHxviU0OOoXGoqa1jxLdHs+Te3jlUS3O1v/OJONnt1s9Oxmo2e3KTQQNY1Gon6hoVFLaLAvBQ2rNDSu0tC4SkPjKg2NqzQ0rkKlnP3K2OjUhp90AAAAAElFTkSuQmCC"

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xOdTWsmQAAABTSURBVEhL7c2hDcBAEMTAryb9d/hBZo4U4GM3kunu+eW597OMjVPGxilj45SxccrYOGVsnDI2Thkbp4yNU8bGKWPjlLFxytg4pcYPMH6w1hp0zgvIjuLpVy41MAAAAABJRU5ErkJggg=="

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xOdTWsmQAAABkSURBVEhLrcyxDQAgEIDAn8b9N9SKDqMFl9AyX9be1zI2p4zNKWNzyticMjanjM0pY3PK2JwyNqeMzSljc8rYnDI2p4zNKWNzyticMjanjM0pY3PK2JwyNqeMzSljc8rYnJ5mDpa4dqwbqZseAAAAAElFTkSuQmCC"

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xOdTWsmQAAABaSURBVEhL7cyxCcBAEAPBq8b9d/iOBA72QQIFDm5gQ2kszznXauhc1dC5qqFzVUPnqobOVQ2dqxo6VzV0/q2CjpMsNEyy0DDJQsMkCw2TbDR2i9CB01rrD2ZeG1xyZF3A6dwAAAAASUVORK5CYII="

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTnU1rJkAAAAiElEQVRIS+2MQQqFQAzF5v6XVvlE6A8ybe3WYDZjX9bHx5bj+iy/5jj8JKfvcGwnkx6OVGRa5y9wk7wxrRGHP2+yt0sSOR52JJHjYUcSOR52JJHjYUcSNTyuyLSOAxWZ9nBkJ5N3OPYkpzMcjXIyx+EoJ3McjnIyx+EoJ3McjnIyx+EoJxvWOgExoLpUIABYmgAAAABJRU5ErkJggg=="

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTnU1rJkAAAAaUlEQVRIS+2NOQrAMBDE9v+fzgEqBkEgMHZnYVUrxvOH63lfkvR4OCXp8XBK0uPhlKTHwylJj4dTkh4PpyQ9Hk5JejyckvR4OCXp8XBK0uPhlKTHwylJj4dTkjV4/JXTWrZ/cDgcdjJzA4EB0y3M9rbXAAAAAElFTkSuQmCC"

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTnU1rJkAAAAhElEQVRIS6WMMQrAQACD7v+fbjs4iNBSiMRNcv5wPXuTZKfHlmSnx5Zkp8eWZKfHlmSnx5Zkp8eWZKfHlmSnx5Zkp8eWZKfHlmSnx5Zkp8eWZKfHlmSnx5Zkp8eWZKfHlmSnx5Zkp8eWZKfHlmSnx5Zkp8eWZKfHlmSnx5Zkp8eW5INzbsODXLJd/56nAAAAAElFTkSuQmCC"

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTnU1rJkAAAAbUlEQVRIS+2MMQ6AMAzE+v9PA4OHyBKh0Q0steLt4rXD9dybTHIcrjLJcbjKJMfhKpMch6tMchyuMslxuMokx+EqkxyHLbMMR6eS6fHTVDI9fppKpsdPU8n0+GkqmW/8OJHEHn7elffD4fAva92z41i2DcwJlgAAAABJRU5ErkJggg=="

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Direction__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Coords__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Util__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = (class {
    static decide(origin, destination, obstacles, height, width) {
        let hashCoords = (p) => {
            return (p.row * width + p.column);
        };
        let unhashCoords = (p) => {
            let r = (p / width | 0);
            let c = p % width;
            return new __WEBPACK_IMPORTED_MODULE_1__Coords__["a" /* default */](r, c);
        };
        let getHeuristic = (p1, p2) => {
            let r = Math.min(Math.abs(p1.row - p2.row), 
            // Infinity
            height - Math.abs(p1.row - p2.row)
            // Math.min(p1.row, p2.row) + height - Math.max(p1.row, p2.row)
            );
            let c = Math.min(Math.abs(p1.column - p2.column), 
            // Infinity
            width - Math.abs(p1.column - p2.column)
            // Math.min(p1.column, p2.column) + width - Math.max(p1.column, p2.column)
            );
            return r + c;
            // return 0;
        };
        let getNeighbours = (p) => {
            let u = p.clone();
            u.row = __WEBPACK_IMPORTED_MODULE_2__Util__["a" /* default */].mod(u.row - 1, height);
            let d = p.clone();
            d.row = __WEBPACK_IMPORTED_MODULE_2__Util__["a" /* default */].mod(d.row + 1, height);
            let l = p.clone();
            l.column = __WEBPACK_IMPORTED_MODULE_2__Util__["a" /* default */].mod(l.column - 1, width);
            let r = p.clone();
            r.column = __WEBPACK_IMPORTED_MODULE_2__Util__["a" /* default */].mod(r.column + 1, width);
            let n = [u, d, l, r];
            return n
                .map(value => hashCoords(value))
                .filter(value => !obstaclesH.includes(value));
        };
        let reconstructPath = (currentH) => {
            let path = [];
            while (cameFrom.has(currentH)) {
                currentH = cameFrom.get(currentH);
                path.push(currentH);
            }
            return path;
        };
        let originH = hashCoords(origin);
        let destinationH = hashCoords(destination);
        let obstaclesH = obstacles
            .map(value => hashCoords(value))
            .filter(value => value != originH && value != destinationH);
        let closed = new Set();
        let open = new Set();
        open.add(originH);
        let cameFrom = new Map();
        let gScore = new Map();
        gScore.set(originH, 0);
        let fScore = new Map();
        fScore.set(originH, getHeuristic(origin, destination));
        while (open.size > 0) {
            let currentH;
            {
                let minF = Infinity;
                for (let o of open) {
                    let f = fScore.get(o);
                    if (f == undefined) {
                        f = Infinity;
                    }
                    if (f <= minF) {
                        currentH = o;
                        minF = f;
                    }
                }
            }
            if (currentH == destinationH) {
                let path = reconstructPath(currentH);
                path.unshift(destinationH);
                // console.log(path);
                // console.log(path.map(unhashCoords));
                let from = unhashCoords(path.pop());
                let to = unhashCoords(path.pop());
                if (from.row == to.row) {
                    if (__WEBPACK_IMPORTED_MODULE_2__Util__["a" /* default */].mod(from.column + 1, width) == to.column) {
                        return __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Right;
                    }
                    else if (__WEBPACK_IMPORTED_MODULE_2__Util__["a" /* default */].mod(from.column - 1, width) == to.column) {
                        return __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Left;
                    }
                }
                else if (from.column == to.column) {
                    if (__WEBPACK_IMPORTED_MODULE_2__Util__["a" /* default */].mod(from.row + 1, height) == to.row) {
                        return __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Down;
                    }
                    else if (__WEBPACK_IMPORTED_MODULE_2__Util__["a" /* default */].mod(from.row - 1, height) == to.row) {
                        return __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Up;
                    }
                }
                return null;
            }
            open.delete(currentH);
            closed.add(currentH);
            let neighboursH = getNeighbours(unhashCoords(currentH));
            for (let neighbourH of neighboursH) {
                if (closed.has(neighbourH)) {
                    continue;
                }
                open.add(neighbourH);
                let currentG = gScore.get(currentH);
                if (currentG == undefined) {
                    currentG = Infinity;
                }
                let neighbourG = gScore.get(neighbourH);
                if (neighbourH == undefined) {
                    neighbourH = Infinity;
                }
                let tgScore = currentG + 1;
                if (tgScore >= neighbourG) {
                    continue;
                }
                cameFrom.set(neighbourH, currentH);
                gScore.set(neighbourH, tgScore);
                fScore.set(neighbourH, tgScore + getHeuristic(unhashCoords(neighbourH), destination));
            }
        }
        return null;
    }
});


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GamePreset__ = __webpack_require__(21);

class HtmlHelper {
    constructor(game, htmlRoot) {
        this._game = game;
        this._htmlRoot = htmlRoot;
        let gameProgress = document.createElement("div");
        {
            let canvas = document.createElement("canvas");
            gameProgress.appendChild(canvas);
            gameProgress.appendChild(document.createElement("br"));
            gameProgress.appendChild(document.createTextNode("Score: "));
            let gameScore = document.createElement("span");
            gameProgress.appendChild(gameScore);
            this._gameScore = gameScore;
            this._canvas = canvas;
        }
        this._gameProgress = gameProgress;
        let gameInit = document.createElement("div");
        {
            let difficultyInput = document.createElement("input");
            {
                difficultyInput.type = "number";
                difficultyInput.min = "1";
                difficultyInput.max = "60";
                difficultyInput.value = "10";
            }
            gameInit.appendChild(document.createTextNode("Difficulty: "));
            gameInit.appendChild(difficultyInput);
            gameInit.appendChild(document.createElement("br"));
            let fieldSelect = document.createElement("select");
            let fieldOption;
            fieldOption = document.createElement("option");
            fieldOption.text = "Infinite field";
            fieldSelect.add(fieldOption);
            fieldOption = document.createElement("option");
            fieldOption.text = "Box";
            fieldSelect.add(fieldOption);
            fieldOption = document.createElement("option");
            fieldOption.text = "Grid";
            fieldSelect.add(fieldOption);
            gameInit.appendChild(document.createTextNode("Field: "));
            gameInit.appendChild(fieldSelect);
            gameInit.appendChild(document.createElement("br"));
            let gameStart = document.createElement("button");
            {
                gameStart.appendChild(document.createTextNode("Start"));
                gameStart.onclick = () => {
                    let difficulty = Number(difficultyInput.value);
                    let gamePreset;
                    switch (fieldSelect.selectedIndex) {
                        case 0:
                            gamePreset = __WEBPACK_IMPORTED_MODULE_0__GamePreset__["a" /* default */].Inf;
                            break;
                        case 1:
                            gamePreset = __WEBPACK_IMPORTED_MODULE_0__GamePreset__["a" /* default */].Box;
                            break;
                        case 2:
                            gamePreset = __WEBPACK_IMPORTED_MODULE_0__GamePreset__["a" /* default */].Grid;
                            break;
                    }
                    return game.initGame(difficulty, gamePreset);
                };
            }
            gameInit.appendChild(gameStart);
        }
        this._gameInit = gameInit;
        let gameOver = document.createElement("div");
        {
            gameOver.appendChild(document.createTextNode("You scored "));
            this._finalScore = document.createElement("span");
            gameOver.appendChild(this._finalScore);
            gameOver.appendChild(document.createElement("br"));
            let playAgain = document.createElement("button");
            {
                playAgain.appendChild(document.createTextNode("Play again"));
                playAgain.onclick = () => this.gameInit();
            }
            gameOver.appendChild(playAgain);
        }
        this._gameOver = gameOver;
    }
    set gameScore(value) {
        this._gameScore.innerHTML = String(value);
    }
    get root() {
        return this._htmlRoot;
    }
    get canvas() {
        return this._canvas;
    }
    gameInit() {
        while (this._htmlRoot.lastChild) {
            this._htmlRoot.removeChild(this._htmlRoot.lastChild);
        }
        this._htmlRoot.appendChild(this._gameInit);
    }
    gameProgress() {
        while (this._htmlRoot.lastChild) {
            this._htmlRoot.removeChild(this._htmlRoot.lastChild);
        }
        this._htmlRoot.appendChild(this._gameProgress);
    }
    gameOver() {
        while (this._htmlRoot.lastChild) {
            this._htmlRoot.removeChild(this._htmlRoot.lastChild);
        }
        this._finalScore.innerHTML = String(this._game.score);
        this._htmlRoot.appendChild(this._gameOver);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HtmlHelper;



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Snake__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Field__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Coords__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Direction__ = __webpack_require__(0);




class GamePreset {
    constructor(snakes, field) {
        this._snakes = snakes;
        this._field = field;
    }
    get snakes() {
        return this._snakes;
    }
    get field() {
        return this._field;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GamePreset;

{
    let height = 24;
    let width = 30;
    let field = new __WEBPACK_IMPORTED_MODULE_1__Field__["a" /* default */](height, width, []);
    let player = new __WEBPACK_IMPORTED_MODULE_0__Snake__["a" /* default */](height, width, [new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](0, 2), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](0, 1), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](0, 0)], __WEBPACK_IMPORTED_MODULE_3__Direction__["a" /* default */].Right);
    let enemyBL = new __WEBPACK_IMPORTED_MODULE_0__Snake__["a" /* default */](height, width, [new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](height - 3, 0), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](height - 2, 0), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](height - 1, 0)], __WEBPACK_IMPORTED_MODULE_3__Direction__["a" /* default */].Up);
    let enemyTR = new __WEBPACK_IMPORTED_MODULE_0__Snake__["a" /* default */](height, width, [new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](2, width - 1), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](1, width - 1), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](0, width - 1)], __WEBPACK_IMPORTED_MODULE_3__Direction__["a" /* default */].Down);
    let enemyBR = new __WEBPACK_IMPORTED_MODULE_0__Snake__["a" /* default */](height, width, [new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](height - 1, width - 3), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](height - 1, width - 2), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](height - 1, width - 1)], __WEBPACK_IMPORTED_MODULE_3__Direction__["a" /* default */].Left);
    let snakes = [player, enemyBL, enemyTR, enemyBR];
    GamePreset.Inf = new GamePreset(snakes, field);
}
{
    let height = 24;
    let width = 30;
    let fieldBlocks = [];
    for (let i = 0; i < height; ++i) {
        for (let j = 0; j < width; ++j) {
            if (i == 0 || j == 0 || i == height - 1 || j == width - 1) {
                fieldBlocks.push(new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](i, j));
            }
        }
    }
    let field = new __WEBPACK_IMPORTED_MODULE_1__Field__["a" /* default */](height, width, fieldBlocks);
    let player = new __WEBPACK_IMPORTED_MODULE_0__Snake__["a" /* default */](height, width, [new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](2, 4), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](2, 3), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](2, 2)], __WEBPACK_IMPORTED_MODULE_3__Direction__["a" /* default */].Right);
    let enemyBL = new __WEBPACK_IMPORTED_MODULE_0__Snake__["a" /* default */](height, width, [new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](height - 5, 2), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](height - 4, 2), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](height - 3, 2)], __WEBPACK_IMPORTED_MODULE_3__Direction__["a" /* default */].Up);
    let enemyTR = new __WEBPACK_IMPORTED_MODULE_0__Snake__["a" /* default */](height, width, [new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](4, width - 3), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](3, width - 3), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](2, width - 3)], __WEBPACK_IMPORTED_MODULE_3__Direction__["a" /* default */].Down);
    let enemyBR = new __WEBPACK_IMPORTED_MODULE_0__Snake__["a" /* default */](height, width, [new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](height - 3, width - 5), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](height - 3, width - 4), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](height - 3, width - 3)], __WEBPACK_IMPORTED_MODULE_3__Direction__["a" /* default */].Left);
    let snakes = [player, enemyBL, enemyTR, enemyBR];
    GamePreset.Box = new GamePreset(snakes, field);
}
{
    let height = 24;
    let width = 30;
    let fieldBlocks = [];
    for (let i = 0; i < height; i += 2) {
        for (let j = 0; j < width; j += 2) {
            fieldBlocks.push(new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](i, j));
        }
    }
    let field = new __WEBPACK_IMPORTED_MODULE_1__Field__["a" /* default */](height, width, fieldBlocks);
    let player = new __WEBPACK_IMPORTED_MODULE_0__Snake__["a" /* default */](height, width, [new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](1, 3), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](1, 2), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](1, 1)], __WEBPACK_IMPORTED_MODULE_3__Direction__["a" /* default */].Right);
    let enemyBL = new __WEBPACK_IMPORTED_MODULE_0__Snake__["a" /* default */](height, width, [new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](height - 3, 1), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](height - 2, 1), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](height - 1, 1)], __WEBPACK_IMPORTED_MODULE_3__Direction__["a" /* default */].Up);
    let enemyTR = new __WEBPACK_IMPORTED_MODULE_0__Snake__["a" /* default */](height, width, [new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](3, width - 1), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](2, width - 1), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](1, width - 1)], __WEBPACK_IMPORTED_MODULE_3__Direction__["a" /* default */].Down);
    let enemyBR = new __WEBPACK_IMPORTED_MODULE_0__Snake__["a" /* default */](height, width, [new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](height - 1, width - 3), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](height - 1, width - 2), new __WEBPACK_IMPORTED_MODULE_2__Coords__["a" /* default */](height - 1, width - 1)], __WEBPACK_IMPORTED_MODULE_3__Direction__["a" /* default */].Left);
    let snakes = [player, enemyBL, enemyTR, enemyBR];
    GamePreset.Grid = new GamePreset(snakes, field);
}


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Direction__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Util__ = __webpack_require__(1);


class Snake {
    constructor(fieldHeight, fieldWidth, initial, direction) {
        this._feed = false;
        this._nextDirection = null;
        this._snake = [];
        this._alive = true;
        this._rows = fieldHeight;
        this._columns = fieldWidth;
        this._direction = direction;
        this._snake = initial;
    }
    get rows() {
        return this._rows;
    }
    get columns() {
        return this._columns;
    }
    get snake() {
        return this._snake;
    }
    get alive() {
        return this._alive;
    }
    set alive(value) {
        this._alive = value;
    }
    get direction() {
        return this._direction;
    }
    set direction(value) {
        if (this._snake.length > 1) {
            if (value === __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Right && this._direction === __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Left) {
                return;
            }
            if (value === __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Left && this._direction === __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Right) {
                return;
            }
            if (value === __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Up && this._direction === __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Down) {
                return;
            }
            if (value === __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Down && this._direction === __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Up) {
                return;
            }
        }
        this._nextDirection = value;
    }
    move() {
        let direction = this._nextDirection != null ? this._nextDirection : this.direction;
        let head = this._snake[0].clone();
        switch (direction) {
            case __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Left:
                head.column = __WEBPACK_IMPORTED_MODULE_1__Util__["a" /* default */].mod(head.column - 1, this._columns);
                break;
            case __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Right:
                head.column = __WEBPACK_IMPORTED_MODULE_1__Util__["a" /* default */].mod(head.column + 1, this._columns);
                break;
            case __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Up:
                head.row = __WEBPACK_IMPORTED_MODULE_1__Util__["a" /* default */].mod(head.row - 1, this._rows);
                break;
            case __WEBPACK_IMPORTED_MODULE_0__Direction__["a" /* default */].Down:
                head.row = __WEBPACK_IMPORTED_MODULE_1__Util__["a" /* default */].mod(head.row + 1, this._rows);
                break;
        }
        if (!this._feed) {
            this._snake.pop();
        }
        this._snake.unshift(head);
        this._direction = direction;
        this._nextDirection = null;
        this._feed = false;
    }
    feed() {
        this._feed = true;
    }
    clone() {
        return new Snake(this._rows, this._columns, __WEBPACK_IMPORTED_MODULE_1__Util__["a" /* default */].arrayClone(this._snake), this._direction);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Snake;



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Util__ = __webpack_require__(1);

class Field {
    constructor(height, width, blocks) {
        this._width = width;
        this._height = height;
        this._blocks = blocks;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get blocks() {
        return this._blocks;
    }
    clone() {
        return new Field(this._height, this._width, __WEBPACK_IMPORTED_MODULE_0__Util__["a" /* default */].arrayClone(this._blocks));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Field;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map