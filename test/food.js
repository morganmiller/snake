const food = require("../lib/food");
const $ = require('jquery');

describe('food', function () {
  it('', function () {
    var $board = ("#board");

    var game = {
      speed: 70,
      width: $board.width(),
      height: $board.height(),
      board: $board[0].getContext("2d"),
      cellSize: 15,
      score: 0
    };

    setFoodPic(game);
    assert.equal("string", typeof food.pic);
  });
});
