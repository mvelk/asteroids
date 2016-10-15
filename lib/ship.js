const MovingObject = require('./moving_object');
const Utils = require('./utils');

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
