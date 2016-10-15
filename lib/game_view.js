const Game = require('./game');



const GameView = function () {
  this.canvas = document.getElementById('canvas');
  this.ctx = canvas.getContext("2d");
  this.game = new Game(this.canvas);
};

GameView.prototype.start = function() {
  setInterval(() => {this.game.draw(this.ctx)}, 20);
};

module.exports = GameView;
