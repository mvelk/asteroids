const GameView = require('./game_view');

document.addEventListener("DOMContentLoaded", function(event) {
  const gameView = new GameView();
  gameView.start();
});
