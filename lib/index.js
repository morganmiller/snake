$(document).ready( function(){
  var $board = $("#board");

  var snakePit = $board[0];
  var width = $board.width();
  var height = $board.height();
  var boardContext = snakePit.getContext("2d");
  var cellSize = 10;
  var gameLoop;
  var direction = "right";
  var snakeBody = [{x: 40, y: 10}, {x: 30, y:10}, {x:20, y:10}];

  function makeSnakePit() {
    boardContext.fillStyle = "#66e0a3";
    boardContext.fillRect(0, 0, width, height)
    boardContext.strokeStyle = "black"
    boardContext.strokeRect(0, 0, width, height)
  }


  function paintCell (x, y) {
    boardContext.fillStyle = "black"
    boardContext.fillRect(x, y, cellSize, cellSize);
  }

  function slither() {
    snakeBody.forEach(function(cell) {
      paintCell(cell.x,cell.y);
    }
    if (direction === "right") cellx += cellSize;
    else if (direction === "left") cellx -= cellSize;
    else if (direction === "up") celly -= cellSize;
    else if (direction === "down") celly += cellSize;
  }

  function gameFrame() {
    makeSnakePit();
    slither()
  }

    $(document).keydown(function(key) {
      var keyVal = key.which;
      if (keyVal == "38" && direction != "down") direction = "up";
      else if (keyVal == "40" && direction != "up") direction = "down";
      else if (keyVal == "39" && direction != "left") direction = "right";
      else if (keyVal == "37" && direction != "right") direction = "left";
    });

  setInterval(gameFrame, 50)
});
