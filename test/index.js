const chai = require('chai');
const assert = chai.assert;

describe('game state', function () {
  it('starts with a speed of 70', function () {
    var game = {speed: 70};
    assert.equal(70, game.speed);
  });
});
