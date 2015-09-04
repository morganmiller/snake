var strober = {
  invertBoard: function() {
    if(this.count % 2 === 0) {
      return "black";
    } else {
      return "#66e0a3";
    };
  },
  invertSnake: function() {
    if(this.count % 2 === 0) {
      return "#66e0a3";
    } else {
      return "black";
    };
  },
  count: 0
}

var render = {
  makeSnakePit: function(game) {
    game.board.fillStyle = strober.invertBoard();
    game.board.fillRect(0, 0, game.width, game.height);
    game.board.strokeStyle = "black";
    game.board.strokeRect(0, 0, game.width, game.height);
    game.board.fillStyle = "black";
    game.board.fillText("score: " + game.score, 10, (game.height-10))
  },

  paintCell: function(x, y, board, cellSize, fillStyle) {
    board.fillStyle = strober.invertSnake();
    board.fillRect(x, y, cellSize, cellSize);
    strober.count++;
  }
};

module.exports = render;
