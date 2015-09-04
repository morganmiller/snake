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

  paintFood: function(board) {
    board.drawImage(food.pic, (this.x-7), (this.y-7))
  },

  setFoodPic: function(game) {
    var pic = new Image();
    pic.src = require(randomImage());
    food.pic = pic
  },
  trippy: false
};

function foodSpot() {
  var arr = [];
  for (var i = 0; i < (675/15); i++) {
    arr.push(i*15)
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomImage() {
  var arr = [1,2,3,4,5,6,7,8,9,10];
  var n = arr[Math.floor(Math.random() * arr.length)];
  if(n === 8) {
    food.trippy = true
  } else {
    food.trippy = false
  };
  return ("./" + n + ".png");
}

module.exports = food;
