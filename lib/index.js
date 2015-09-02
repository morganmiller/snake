$(document).ready( function(){
  var $board = $("#board");

  var snakePit = $board[0];
  var width = $board.width();
  var height = $board.height();
  var boardContext = snakePit.getContext("2d");
  var cellSize = 10;
  var gameLoop;
  var direction = "right";
  var snakeBody = [{x: 40, y: 10}, {x: 30, y:10}, {x:20, y:10}, {x:10, y:10}];
  var food = {x: foodSpot(), y: foodSpot()};
  var speed = 30;
  var score = 0;
  var gameCounter = 0
  var newDirection = direction

  var gameProcess = setInterval(gameFrame, speed);

  function makeSnakePit() {
    boardContext.fillStyle = "#66e0a3";
    boardContext.fillRect(0, 0, width, height);
    boardContext.strokeStyle = "black";
    boardContext.strokeRect(0, 0, width, height);
    boardContext.fillStyle = "black";
    boardContext.fillText("score: " + score, 10, (height-10))
  }

  function paintCell (x, y) {
    boardContext.fillStyle = "black";
    boardContext.fillRect(x, y, cellSize, cellSize);
  }

  function slither() {

    snakeBody.forEach(function(cell) {
      paintCell(cell.x,cell.y);
    });

    var head = snakeBody[0];

    if(head.x == food.x && head.y == food.y){
      var newHead = {x: 0, y: 0};
      food = {x: foodSpot(), y: foodSpot()};
      score += snakeBody.length;
    } else {
      var newHead = snakeBody.pop();
    }

    newHead.x = head.x;
    newHead.y = head.y;

    if(gameCounter % 2 === 0) { newDirection = direction }

    if (newDirection === "right") newHead.x += cellSize/2;
    else if (newDirection === "left") newHead.x -= cellSize/2;
    else if (newDirection === "up") newHead.y -= cellSize/2;
    else if (newDirection === "down") newHead.y += cellSize/2;

    snakeBody.unshift(newHead);

    detectCollision(newHead);

    gameCounter++;
  }

  function newGame() {
    direction = "right";
    snakeBody = [{x: 40, y: 10}, {x: 30, y:10}, {x:20, y:10}, {x:10, y:10}];
    food = {x: foodSpot(), y: foodSpot()};
    score = 0
  }

  function detectCollision(head) {
    var x = head.x;
    var y = head.y;

    if(x < 0 || y < 0 || x == width || y == height || snakeCollided(head)) {
      clearInterval(gameProcess);
      newGame();
      gameProcess = setInterval(gameFrame, speed);
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
    for (var i = 0; i < (width/10); i++) {
      arr.push(i*10)
    }
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function makeFood() {
    paintCell(food.x, food.y)
  }

  function gameFrame() {
    makeSnakePit();
    slither();
    makeFood();
  }

    $(document).keydown(function(key) {
      var keyVal = key.which;
      if (keyVal == "38" && direction != "down") direction = "up";
      else if (keyVal == "40" && direction != "up") direction = "down";
      else if (keyVal == "39" && direction != "left") direction = "right";
      else if (keyVal == "37" && direction != "right") direction = "left";
    });
});
