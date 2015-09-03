const renderer = require("./render")

$(document).ready( function(){
  var $board = $("#board");

  var game = {
    speed: 70,
    width: $board.width(),
    height: $board.height(),
    board: $board[0].getContext("2d"),
    cellSize: 15,
    score: 0
  }

  var move = {
    direction: "right",
    keyPressed: false
  }

  var gameLoop;
  var snakeBody = [{x: 60, y: 0}, {x: 45, y:0}, {x:30, y:0}, {x:15, y:0}];
  var food = {x: foodSpot(), y: foodSpot()};
  var food_pic = new Image();
  food_pic.src = require("./1.png");
  var pattern;
  setFoodPic(food_pic);
  var gameProcess = setInterval(gameFrame, game.speed);

  function setFoodPic(pic) {
    pic.onload = function() {
      pattern = game.board.createPattern(this, "repeat");
    };
  }

  function paintFood (x, y) {
    game.board.fillStyle = pattern;
    game.board.fillRect(x, y, game.cellSize, game.cellSize);
  }

  function paintCell (x, y, cellSize, fillStyle) {
    game.board.fillStyle = fillStyle;
    game.board.fillRect(x, y, cellSize, cellSize);
  }

  function slither() {

    snakeBody.forEach(function(cell) {
      paintCell(cell.x, cell.y, game.cellSize, "black");
    });

    var head = snakeBody[0];
    if(head.x == food.x && head.y == food.y){
      var newHead = {x: 0, y: 0};
      var newFoodPic = new Image();
      newFoodPic.src = require("./star.png");
      setFoodPic(newFoodPic);
      food = {x: foodSpot(), y: foodSpot()};
      game.score += snakeBody.length;
    } else {
      var newHead = snakeBody.pop();
    }

    newHead.x = head.x;
    newHead.y = head.y;

    if (move.direction === "right") newHead.x += game.cellSize;
    else if (move.direction === "left") newHead.x -= game.cellSize;
    else if (move.direction === "up") newHead.y -= game.cellSize;
    else if (move.direction === "down") newHead.y += game.cellSize;

    snakeBody.unshift(newHead);
    detectCollision(newHead);
  }

  function newGame() {
    move.direction = "right";
    snakeBody = [{x: 60, y: 0}, {x: 45, y:0}, {x:30, y:0}, {x:15, y:0}];
    food = {x: foodSpot(), y: foodSpot()};
    game.score = 0
  }

  function detectCollision(head) {
    var x = head.x;
    var y = head.y;

    if(x < 0 || y < 0 || x >= game.width || y >= game.height || snakeCollided(head)) {
      clearInterval(gameProcess);
      newGame();
      gameProcess = setInterval(gameFrame, game.speed);
    }
  }

  function snakeCollided(head) {
    var collisions = snakeBody.slice(1).filter(function(cell) {
      return head.x == cell.x && head.y == cell.y
    });
    return collisions.length > 0
  }

  function foodSpot() {
    var arr = [];
    for (var i = 0; i < (game.width/game.cellSize); i++) {
      arr.push(i*game.cellSize)
    }
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function makeFood() {
    var newFood = {x: food.x, y: food.y};
    var bodyCheck = snakeBody.filter(function(cell) {
      cell.x == newFood.x && cell.y == food.y;
    });
    if(bodyCheck.length > 0) {
      makeFood();
    } else {
      paintCell(food.x, food.y, game.cellSize, pattern)
    }
  }

  function gameFrame() {
    move.keyPressed = false;
    renderer.makeSnakePit(game);
    slither();
    makeFood();
  }

    $(document).keydown(function(key) {
      if(!move.keyPressed) {
      var keyVal = key.which;
      if (keyVal == "38" && move.direction != "down") move.direction = "up";
      else if (keyVal == "40" && move.direction != "up") move.direction = "down";
      else if (keyVal == "39" && move.direction != "left") move.direction = "right";
      else if (keyVal == "37" && move.direction != "right") move.direction = "left";
      move.keyPressed = true
      }
    });
});
