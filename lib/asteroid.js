const MovingObject = require('./moving_object');
const Utils = require('./utils');


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
