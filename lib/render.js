var render = {
  makeSnakePit: function(game) {
    game.board.fillStyle = "#66e0a3";
    game.board.fillRect(0, 0, game.width, game.height);
    game.board.strokeStyle = "black";
    game.board.strokeRect(0, 0, game.width, game.height);
    game.board.fillStyle = "black";
    game.board.fillText("score: " + game.score, 10, (game.height-10))
  },

  paintCell: function(x, y, board, cellSize, fillStyle) {
    board.fillStyle = fillStyle;
    board.fillRect(x, y, cellSize, cellSize);
  }
};

module.exports = render;
