const render = require("./render");
const food = require("./food");

$(document).ready( function(){
  var $board = $("#board");

  var game = {
    speed: 70,
    width: $board.width(),
    height: $board.height(),
    board: $board[0].getContext("2d"),
    cellSize: 15,
    score: 0,
    running: false,
    highScore: 0
  };

  var move = {
    direction: "right",
    keyPressed: false
  };

  var gameLoop;
  var snakeBody = [{x: 60, y: 0}, {x: 45, y:0}, {x:30, y:0}, {x:15, y:0}];
  var gameProcess;

  function newGame() {
    game.running = true
    gameProcess = setInterval(gameFrame, game.speed);
    move.direction = "right";
    snakeBody = [{x: 60, y: 0}, {x: 45, y:0}, {x:30, y:0}, {x:15, y:0}];
    food.makeNewFood(snakeBody);
    game.score = 0;
    food.setFoodPic(game);
  }

  function gameFrame() {
    move.keyPressed = false;
    render.makeSnakePit(game);
    slither();
    food.paintFood(game.board);
  }

  function slither() {

    snakeBody.forEach(function(cell) {
      render.paintCell(cell.x, cell.y, game.board, game.cellSize, "black");
    });

    var head = snakeBody[0];
    if(head.x == food.x && head.y == food.y){
      var newHead = {x: 0, y: 0};
      game.score += Number(food.pic.id);
      food.setFoodPic(game);
      food.makeNewFood(snakeBody);
    } else {
      var newHead = snakeBody.pop();
    }

    newHead.x = head.x;
    newHead.y = head.y;

    checkDirection(move.direction, newHead);

    snakeBody.unshift(newHead);
    detectCollision(newHead);
  }

  function checkDirection(direction, newHead) {
    if (direction === "right") newHead.x += game.cellSize;
    else if (direction === "left") newHead.x -= game.cellSize;
    else if (direction === "up") newHead.y -= game.cellSize;
    else if (direction === "down") newHead.y += game.cellSize;
  }

  function detectCollision(head) {
    var x = head.x;
    var y = head.y;

    if(x < 0 || y < 0 || x >= game.width || y >= game.height || snakeCollided(head)) {
      clearInterval(gameProcess);
      food.x = -30;
      food.y = -30;
      game.running = false;
      checkScores();
      startingScreen();
    }
  }

  function checkScores() {
    if(game.highScore < game.score) {
      game.highScore = game.score;
      $("#high-score").text(game.highScore);
    };
    $("#last-game-score").text(game.score);
  }


  function startingScreen() {
    render.startingScreen(game);
    $(document).keyup(function(key) {
      if(!game.running && key.which == "13") {
        newGame();
      };
    });
  }

  function snakeCollided(head) {
    var collisions = snakeBody.slice(1).filter(function(cell) {
      return head.x == cell.x && head.y == cell.y
    });
    return collisions.length > 0
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

  startingScreen();
});
