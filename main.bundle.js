/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var render = __webpack_require__(1);
	var food = __webpack_require__(2);

	$(document).ready(function () {
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
	  var snakeBody = [{ x: 60, y: 0 }, { x: 45, y: 0 }, { x: 30, y: 0 }, { x: 15, y: 0 }];
	  var gameProcess;

	  function newGame() {
	    game.running = true;
	    gameProcess = setInterval(gameFrame, game.speed);
	    move.direction = "right";
	    snakeBody = [{ x: 60, y: 0 }, { x: 45, y: 0 }, { x: 30, y: 0 }, { x: 15, y: 0 }];
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

	    snakeBody.forEach(function (cell) {
	      render.paintCell(cell.x, cell.y, game.board, game.cellSize, "black");
	    });

	    var head = snakeBody[0];
	    if (head.x == food.x && head.y == food.y) {
	      var newHead = { x: 0, y: 0 };
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
	    if (direction === "right") newHead.x += game.cellSize;else if (direction === "left") newHead.x -= game.cellSize;else if (direction === "up") newHead.y -= game.cellSize;else if (direction === "down") newHead.y += game.cellSize;
	  }

	  function detectCollision(head) {
	    var x = head.x;
	    var y = head.y;

	    if (x < 0 || y < 0 || x >= game.width || y >= game.height || snakeCollided(head)) {
	      clearInterval(gameProcess);
	      food.x = -30;
	      food.y = -30;
	      game.running = false;
	      checkScores();
	      startingScreen();
	    }
	  }

	  function checkScores() {
	    if (game.highScore < game.score) {
	      game.highScore = game.score;
	      $("#high-score").text(game.highScore);
	    };
	    $("#last-game-score").text(game.score);
	  }

	  function startingScreen() {
	    render.startingScreen(game);
	    $(document).keyup(function (key) {
	      if (!game.running && key.which == "13") {
	        newGame();
	      };
	    });
	  }

	  function snakeCollided(head) {
	    var collisions = snakeBody.slice(1).filter(function (cell) {
	      return head.x == cell.x && head.y == cell.y;
	    });
	    return collisions.length > 0;
	  }

	  $(document).keydown(function (key) {
	    if (!move.keyPressed) {
	      var keyVal = key.which;
	      if (keyVal == "38" && move.direction != "down") move.direction = "up";else if (keyVal == "40" && move.direction != "up") move.direction = "down";else if (keyVal == "39" && move.direction != "left") move.direction = "right";else if (keyVal == "37" && move.direction != "right") move.direction = "left";
	      move.keyPressed = true;
	    }
	  });

	  startingScreen();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var render = {
	  makeSnakePit: function makeSnakePit(game) {
	    game.board.fillStyle = "#66e0a3";
	    game.board.fillRect(0, 0, game.width, game.height);
	    game.board.strokeStyle = "black";
	    game.board.strokeRect(0, 0, game.width, game.height);
	    game.board.fillStyle = "black";
	    game.board.fillText("score: " + game.score, 10, game.height - 10);
	  },

	  paintCell: function paintCell(x, y, board, cellSize, fillStyle) {
	    board.fillStyle = fillStyle;
	    board.fillRect(x, y, cellSize, cellSize);
	  },

	  startingScreen: function startingScreen(game) {
	    game.board.fillStyle = "#66e0a3";
	    game.board.fillRect(0, 0, game.width, game.height);
	    game.board.strokeStyle = "black";
	    game.board.strokeRect(0, 0, game.width, game.height);
	    game.board.fillStyle = "black";
	    this.startText.forEach(function (cell) {
	      game.board.fillRect(cell.x, cell.y, 15, 15);
	    });
	  },

	  startText: [{ x: 15, y: 15 }, { x: 15, y: 30 }, { x: 15, y: 45 }, { x: 15, y: 60 }, { x: 15, y: 75 }, { x: 15, y: 90 }, { x: 15, y: 105 }, { x: 30, y: 15 }, { x: 45, y: 15 }, { x: 60, y: 30 }, { x: 60, y: 45 }, { x: 45, y: 60 }, { x: 30, y: 60 }, { x: 90, y: 60 }, { x: 90, y: 75 }, { x: 90, y: 90 }, { x: 90, y: 105 }, { x: 90, y: 90 }, { x: 105, y: 60 }, { x: 150, y: 60 }, { x: 150, y: 75 }, { x: 165, y: 75 }, { x: 135, y: 75 }, { x: 135, y: 90 }, { x: 150, y: 105 }, { x: 165, y: 105 }, { x: 195, y: 105 }, { x: 210, y: 105 }, { x: 225, y: 90 }, { x: 195, y: 75 }, { x: 210, y: 60 }, { x: 225, y: 60 }, { x: 255, y: 105 }, { x: 270, y: 105 }, { x: 285, y: 90 }, { x: 255, y: 75 }, { x: 270, y: 60 }, { x: 285, y: 60 }, { x: 15, y: 145 }, { x: 30, y: 145 }, { x: 45, y: 145 }, { x: 60, y: 145 }, { x: 15, y: 160 }, { x: 15, y: 175 }, { x: 30, y: 190 }, { x: 45, y: 190 }, { x: 60, y: 190 }, { x: 15, y: 190 }, { x: 15, y: 205 }, { x: 15, y: 220 }, { x: 15, y: 235 }, { x: 30, y: 235 }, { x: 45, y: 235 }, { x: 60, y: 235 }, { x: 90, y: 235 }, { x: 90, y: 220 }, { x: 90, y: 205 }, { x: 90, y: 190 }, { x: 105, y: 190 }, { x: 120, y: 205 }, { x: 120, y: 220 }, { x: 120, y: 235 }, { x: 150, y: 190 }, { x: 165, y: 175 }, { x: 165, y: 190 }, { x: 165, y: 205 }, { x: 165, y: 220 }, { x: 165, y: 235 }, { x: 180, y: 190 }, { x: 210, y: 205 }, { x: 210, y: 220 }, { x: 225, y: 190 }, { x: 225, y: 205 }, { x: 225, y: 235 }, { x: 240, y: 205 }, { x: 240, y: 235 }, { x: 270, y: 235 }, { x: 270, y: 220 }, { x: 270, y: 205 }, { x: 270, y: 190 }, { x: 285, y: 190 }, { x: 15, y: 275 }, { x: 30, y: 275 }, { x: 45, y: 275 }, { x: 45, y: 290 }, { x: 45, y: 305 }, { x: 45, y: 320 }, { x: 45, y: 335 }, { x: 45, y: 350 }, { x: 45, y: 365 }, { x: 60, y: 275 }, { x: 75, y: 275 }, { x: 90, y: 350 }, { x: 90, y: 335 }, { x: 105, y: 320 }, { x: 120, y: 335 }, { x: 120, y: 350 }, { x: 105, y: 365 }, { x: 180, y: 365 }, { x: 180, y: 350 }, { x: 180, y: 335 }, { x: 180, y: 320 }, { x: 180, y: 305 }, { x: 180, y: 290 }, { x: 180, y: 275 }, { x: 195, y: 275 }, { x: 210, y: 275 }, { x: 225, y: 290 }, { x: 225, y: 305 }, { x: 210, y: 320 }, { x: 195, y: 320 }, { x: 255, y: 365 }, { x: 255, y: 350 }, { x: 255, y: 335 }, { x: 255, y: 320 }, { x: 255, y: 305 }, { x: 255, y: 290 }, { x: 285, y: 350 }, { x: 285, y: 335 }, { x: 300, y: 365 }, { x: 300, y: 320 }, { x: 315, y: 320 }, { x: 315, y: 335 }, { x: 315, y: 350 }, { x: 315, y: 365 }, { x: 345, y: 320 }, { x: 360, y: 335 }, { x: 375, y: 350 }, { x: 360, y: 365 }, { x: 375, y: 335 }, { x: 390, y: 320 }]
	};

	module.exports = render;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var render = __webpack_require__(1);

	var food = {
	  x: foodSpot(),
	  y: foodSpot(),

	  makeNewFood: function makeNewFood(snakeBody) {
	    this.x = foodSpot();
	    this.y = foodSpot();
	    var bodyCheck = snakeBody.filter(function (cell) {
	      cell.x == food.x && cell.y == food.y;
	    });
	    if (bodyCheck.length > 0) {
	      this.makeNewFood();
	    }
	  },

	  paintFood: function paintFood(board) {
	    board.drawImage(food.pic, this.x - 7, this.y - 7);
	  },

	  setFoodPic: function setFoodPic(game) {
	    var pic = new Image();
	    var imgData = randomImage();
	    pic.src = __webpack_require__(3)(imgData.url);
	    pic.id = imgData.points;
	    food.pic = pic;
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
	  for (var i = 0; i < 510 / 15; i++) {
	    foodSpots.push(i * 15);
	  }
	  return foodSpots[Math.floor(Math.random() * foodSpots.length)];
	}

	function randomImage() {
	  var n = foodFrequencies[Math.floor(Math.random() * foodFrequencies.length)];
	  return { url: "./" + n + ".png", points: points[n] };
	}

	function addFoodFrequency(foodFrequencies, pngNumber, frequency) {
	  for (var i = 0; i < frequency; i++) {
	    foodFrequencies.push(pngNumber);
	  }
	}

	module.exports = food;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./1.png": 4,
		"./10.png": 5,
		"./2.png": 6,
		"./3.png": 7,
		"./4.png": 8,
		"./5.png": 9,
		"./6.png": 10,
		"./7.png": 11,
		"./8.png": 12,
		"./9.png": 13,
		"./food": 2,
		"./food.js": 2,
		"./render": 1,
		"./render.js": 1
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 3;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "5504fd1383daa831de3749c0046c45bc.png"

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "feeb6f31a741043bdf54aea98ffec6e2.png"

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "9fe8a5cdb53693012812926a45a7d4dd.png"

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "49483d12defe419a5cdde6ad51657eee.png"

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "8d3bc7c0029cfb5fe352be1d761b0526.png"

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "6e2ea73a843827104a0541f14b87173a.png"

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "131b9f28d018617ff313d6c093cba1f3.png"

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "a8b3080630aab42b90640b35096ac1dc.png"

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "6f9250e19134095ddb0f4319d522247d.png"

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "3a851d717020723398cfec530ee33e6e.png"

/***/ }
/******/ ]);