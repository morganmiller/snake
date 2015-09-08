const chai = require('chai');
const assert = chai.assert;
const render = require("../lib/render");
const $ = require('jquery');

describe('rendering', function () {
  var $board = $("#board");

  var game = {
    width: 510,
    height: 510,
    board: $board[0].getContext("2d"),
    score: 0,
    cellSize: 15
  };

  it('makes board', function () {
    assert.equal(510, game.width);
    assert.equal(510, game.height);

    render.makeSnakePit(game);

    assert.equal("#000000", game.board.fillStyle);
    assert.equal("#000000", game.board.strokeStyle);
  });

  it('paints cells', function() {
    render.paintCell(0, 0, game.board, game.cellSize, "#000000");

    assert.equal("#000000", game.board.fillStyle);
  });

  it('makes starting screen', function() {
    assert.equal(131, render.startText.length);

    render.startingScreen(game);

    assert.equal("#000000", game.board.fillStyle);
    assert.equal("#000000", game.board.strokeStyle);
  });
});
