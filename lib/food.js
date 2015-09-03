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
    var imgData = randomImage();
    pic.src = require(imgData.url);
    pic.id = imgData.points;
    food.pic = pic
  }
};

function foodSpot() {
  var arr = [];
  for (var i = 0; i < (675/15); i++) {
    arr.push(i*15)
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomImage() {
  var points = {
    1: 5,
    2: 10,
    3: 15,
    4: 20,
    5: 25,
    6: 50,
    7: 75,
    8: 100,
    9: 200,
    10: 500
  };
  var arr = [1,2,3,4,5,6,7,8,9,10];
  var n = arr[Math.floor(Math.random() * arr.length)];
  return {url: ("./" + n + ".png"), points: points[n]};
}

module.exports = food;
