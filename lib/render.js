
var render = {
  makeSnakePit: function(game) {
    game.board.fillStyle = strober.invertBoard(game);
    game.board.fillRect(0, 0, game.width, game.height);
    game.board.strokeStyle = "black";
    game.board.strokeRect(0, 0, game.width, game.height);
    game.board.fillStyle = "black";
    game.board.fillText("score: " + game.score, 10, (game.height-10))
    strober.count++;
  },

  paintCell: function(x, y, fillStyle, game) {
    game.board.fillStyle = strober.invertSnake(game);
    game.board.fillRect(x, y, game.cellSize, game.cellSize);
  }
};

var strober = {
  invertBoard: function(game) {
    if(this.count % 2 === 0 && game.strobe) {
      return "black";
    } else {
      return "#66e0a3";
    };
  },
  invertSnake: function(game) {
    if(this.count % 2 != 0 && game.strobe) {
      return "#66e0a3";
    } else {
      return "black";
    };
  },
  count: 0
}

module.exports = render;
