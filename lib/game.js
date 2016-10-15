const Utils = require('./utils');
const Bullet = require('./bullet');
const Asteroid = require('./asteroid');
const Ship = require('./ship');
const MovingObject = require('./moving_object');

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
