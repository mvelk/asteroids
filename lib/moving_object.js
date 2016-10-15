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
