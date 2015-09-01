$(document).ready( function(){
  var $board = $("#board");

  var snakePit = $board[0];
  var width = $board.width();
  var height = $board.height();
  var boardContext = snakePit.getContext("2d");
  boardContext.fillStyle = "#66e0a3";

  var cellWall = 10;

  function paintCell (x, y) {
    boardContext.fillRect(x, y, cellWall, cellWall);
  }

  paintCell(5,5);
});
