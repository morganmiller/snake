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
  },

  startingScreen: function(game) {
    game.board.fillStyle = "#66e0a3";
    game.board.fillRect(0, 0, game.width, game.height);
    game.board.strokeStyle = "black";
    game.board.strokeRect(0, 0, game.width, game.height);
    game.board.fillStyle = "black";
    this.startText.forEach(function(cell) {
      game.board.fillRect(cell.x, cell.y, 15, 15);
    });
  },

  startText: [
    {x: 15, y: 15},
    {x: 15, y: 30},
    {x: 15, y: 45},
    {x: 15, y: 60},
    {x: 15, y: 75},
    {x: 15, y: 90},
    {x: 15, y: 105},
    {x: 30, y: 15},
    {x: 45, y: 15},
    {x: 60, y: 30},
    {x: 60, y: 45},
    {x: 45, y: 60},
    {x: 30, y: 60},
    {x: 90, y: 60},
    {x: 90, y: 75},
    {x: 90, y: 90},
    {x: 90, y: 105},
    {x: 90, y: 90},
    {x: 105, y: 60},
    {x: 150, y: 60},
    {x: 150, y: 75},
    {x: 165, y: 75},
    {x: 135, y: 75},
    {x: 135, y: 90},
    {x: 150, y: 105},
    {x: 165, y: 105},
    {x: 195, y: 105},
    {x: 210, y: 105},
    {x: 225, y: 90},
    {x: 195, y: 75},
    {x: 210, y: 60},
    {x: 225, y: 60},
    {x: 255, y: 105},
    {x: 270, y: 105},
    {x: 285, y: 90},
    {x: 255, y: 75},
    {x: 270, y: 60},
    {x: 285, y: 60},
  ]
};

module.exports = render;
