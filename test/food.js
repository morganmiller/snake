const chai = require('chai');
const assert = chai.assert;
const food = require("../lib/food");
const $ = require('jquery');

describe('food', function () {
  var $board = $("#board");

  var game = {
    speed: 70,
    width: 510,
    height: 510,
    board: $board[0].getContext("2d"),
    cellSize: 15,
    score: 0
  };

  it('generates a food pic', function () {
    food.setFoodPic(game);
    assert.equal("object", typeof food.pic);
    assert.equal("string", typeof food.pic.src);
    assert.equal("string", typeof food.pic.id);
  });

  it('makes food spots', function() {
    assert(0 < food.x < game.width);
    assert(0 < food.y < game.width);
  });

  it('makes new food', function() {
    var snakeBody = [{x: 60, y: 0}, {x: 45, y:0}, {x:30, y:0}, {x:15, y:0}];

    var firstX = food.x;
    var firstY = food.y;

    food.makeNewFood(snakeBody);

    assert(firstX !== food.x);
    assert(firstY !== food.y);

    var coordinateMatches = snakeBody.filter(function(cell) {
      cell.x == food.x && cell.y == food.y;
    });

    assert.equal(0, coordinateMatches.length)
  });
});
