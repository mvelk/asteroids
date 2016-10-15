/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(1);

	document.addEventListener("DOMContentLoaded", function(event) {
	  const gameView = new GameView();
	  gameView.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);



	const GameView = function () {
	  this.canvas = document.getElementById('canvas');
	  this.ctx = canvas.getContext("2d");
	  this.game = new Game(this.canvas);
	};

	GameView.prototype.start = function() {
	  setInterval(() => {this.game.draw(this.ctx)}, 20);
	};

	module.exports = GameView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Utils = __webpack_require__(6);
	const Bullet = __webpack_require__(3);
	const Asteroid = __webpack_require__(5);
	const Ship = __webpack_require__(7);
	const MovingObject = __webpack_require__(4);

	const Game = function (canvas) {
	  this.DIM_X = canvas.width;
	  this.DIM_Y = canvas.height;
	  const NUM_ASTEROIDS = 25;
	  this.addAsteroids(this.DIM_X, this.DIM_Y, NUM_ASTEROIDS);
	  this.ship = new Ship();
	};

	Game.prototype.addAsteroids = function (maxX, maxY, numAsteroids) {
	  this.asteroids = [];
	  for (let i = 0; i < numAsteroids; i++) {
	    let pos = Game.randomPos(maxX, maxY);
	    this.asteroids.push(new Asteroid(pos));
	  }
	};

	Game.prototype.draw = function (ctx) {
	  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	  let movingObjects = this.getObjects();
	  for (let i = 0; i < movingObjects.length; i++) {
	    movingObjects[i].draw(ctx);
	  }
	  this.checkCollisions();
	  this.move();
	};

	Game.prototype.move = function() {
	  let movingObjects = this.getObjects();
	  for (let i = 0; i < movingObjects.length; i++) {
	    movingObjects[i].move();
	  }
	};

	Game.randomPos = function (maxX, maxY) {
	  let posX = Math.random() * maxX;
	  let posY = Math.random() * maxY;
	  return [posX, posY];
	};

	Game.prototype.getObjects = function () {
	  return this.asteroids.concat(this.ship);
	};

	Game.prototype.checkCollisions = function() {
	  let movingObjects = this.getObjects();
	  let ship = movingObjects.slice(-1)[0];
	  for (let i = 0; i < movingObjects.length - 1; i++) {
	    if (ship.isCollidedWith(movingObjects[i])){
	      if (ship instanceof Ship) {
	        ship.relocate([400, 300]);
	      }
	    }
	  }
	};

	Game.prototype.removeAsteroid = function (index) {
	  delete this.asteroids[index];
	};

	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const Bullet = function () {

	};

	module.exports = Bullet;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const MovingObject = function (pos, vel, radius, color) {
	  this.pos = pos;
	  this.vel = vel;
	  this.radius = radius;
	  this.color = color;
	};

	MovingObject.prototype.draw = function (ctx) {
	  let [centerX, centerY] = this.pos;
	  ctx.beginPath();
	  ctx.arc(centerX, centerY, this.radius, 0, 2 * Math.PI, false);
	  ctx.fillStyle = this.color;
	  ctx.fill();
	  ctx.closePath();
	};

	MovingObject.prototype.move = function () {
	  this.pos[0] = this.pos[0] + this.vel[0];
	  this.pos[1] = this.pos[1] + this.vel[1];
	  if (this.pos[0] > 900) {
	    this.pos[0] = 0;
	  }
	  if (this.pos[0] < -100) {
	    this.pos[0] = 800;
	  }
	  if (this.pos[1] > 700) {
	    this.pos[1] = 0;
	  }
	  if (this.pos[1] < -100) {
	    this.pos[1] = 600;
	  }
	};


	// this should be a ship method, but am getting a function undefined error when i put it there
	// needs to be debugged and refactored
	MovingObject.prototype.relocate = function (pos) {
	  this.pos = pos;
	  this.vel = [0, 0];
	};


	// this should be a ship method, but am getting a function undefined error when i put it there
	// needs to be debugged and refactored
	MovingObject.prototype.impulse = function () {

	};


	MovingObject.prototype.isCollidedWith = function (otherObject) {
	  let xDistance = otherObject.pos[0] - this.pos[0];
	  let yDistance = otherObject.pos[1] - this.pos[1];
	  let distanceBetween = Math.sqrt(Math.pow(xDistance, 2) +  Math.pow(yDistance, 2));
	  let sumOfRadii = this.radius + otherObject.radius;
	  if (sumOfRadii > distanceBetween) {
	    return true;
	  } else {
	    return false;
	  }
	};

	module.exports = MovingObject;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const Utils = __webpack_require__(6);


	const Asteroid = function (pos) {

	  let vel = [Asteroid.randomVel(1, -1), Asteroid.randomVel(1, -1)];
	  let color = Asteroid.randomColor();
	  let radius = Asteroid.randomRadius(50, 10);
	  MovingObject.call(this, pos, vel, radius, color);
	};

	Asteroid.randomVel = function(max, min) {
	  return Math.random() * (max - min) + min;
	};

	Asteroid.randomRadius = function(max, min) {
	  return Math.random() * (max - min) + min;
	};

	Asteroid.randomColor = function(){
	  let colorString = '0123456789ABCDEF';
	  let colorCode = "#";
	  for (let i = 0; i < 6; i++) {
	    let index = Math.floor(Math.random() * 16);
	    colorCode += colorString[index];
	  }
	  return colorCode;
	};

	Utils.inherits(Asteroid, MovingObject);

	module.exports = Asteroid;


/***/ },
/* 6 */
/***/ function(module, exports) {

	


	const Utils = {
	  inherits(childClass, parentClass) {
	    const Surrogate = function() {};
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate();
	    childClass.prototype.constructor = childClass;
	  }
	};

	module.exports = Utils;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const Utils = __webpack_require__(6);

	const Ship = function () {
	  let pos = [400, 300];
	  let vel = [0, 0];
	  let color = "black";
	  let radius = 15;
	  MovingObject.call(this, pos, vel, radius, color);
	};

	Ship.prototype.relocate = function (pos) {
	  this.pos = pos;
	};

	Utils.inherits(Ship, MovingObject);

	module.exports = Ship;


/***/ }
/******/ ]);