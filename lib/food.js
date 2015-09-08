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

var foodFrequencies = [];
addFoodFrequency(foodFrequencies, 1, 100);
addFoodFrequency(foodFrequencies, 2, 50);
addFoodFrequency(foodFrequencies, 3, 30);
addFoodFrequency(foodFrequencies, 4, 20);
addFoodFrequency(foodFrequencies, 5, 10);
addFoodFrequency(foodFrequencies, 6, 9);
addFoodFrequency(foodFrequencies, 7, 7);
addFoodFrequency(foodFrequencies, 8, 6);
addFoodFrequency(foodFrequencies, 9, 5);
addFoodFrequency(foodFrequencies, 10, 3);

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

function foodSpot() {
  var foodSpots = [];
  for (var i = 0; i < (510/15); i++) {
    foodSpots.push(i*15)
  }
  return foodSpots[Math.floor(Math.random() * foodSpots.length)];
}

function randomImage() {
  var n = foodFrequencies[Math.floor(Math.random() * foodFrequencies.length)];
  return {url: ("./" + n + ".png"), points: points[n]};
}

function addFoodFrequency(foodFrequencies, pngNumber, frequency) {
  for(var i = 0; i < frequency; i++) {
    foodFrequencies.push(pngNumber)
  }
}

module.exports = food;
