const render = require("./render");

var food = {
  x: foodSpot(),
  y: foodSpot(),

  makeNewFood: function(snakeBody) {
    this.x = foodSpot();
    this.y = foodSpot();
    var bodyCheck = snakeBody.filter.call(this, function(cell) {
      cell.x == this.x && cell.y == this.y;
    });
    if(bodyCheck.length > 0) {
      this.makeNewFood();
    }
  },

  paintFood: function(game) {
    render.paintCell(this.x, this.y, game, this.pattern);
  },

  setFoodPic: function(game) {
    var pic = new Image();
    pic.src = require("./star.png");
    pic.onload = function() {
      food.pattern = game.board.createPattern(this, "repeat");
    };
  }
};

function foodSpot() {
  var arr = [];
  for (var i = 0; i < (675/15); i++) {
    arr.push(i*15)
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = food;
