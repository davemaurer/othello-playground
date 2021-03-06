const $ = require('jquery');
const helper = require('./board_helpers').helpers;
const Square = require('./square');

var canvasElement = document.getElementById('game');

function Board() {
  this.game = null;
  this.squares = [];
  this.squareSize = 50;
  this.squaresPerRow = 8;
  this.canvasElement = canvasElement;
}

Board.prototype.createBoard = function() {
  for (var y = 0; y < this.squareSize * this.squaresPerRow; y += this.squareSize) {
    for (var x = 0; x < this.squareSize * this.squaresPerRow; x += this.squareSize) {
      this.squares.push(new Square(x, y, this.squareSize, this, this.squares.length));
    }
  }
  return this;
};

Board.prototype.placeFirstFourPieces = function() {
  var square0 = this.squares[27];
  var square1 = this.squares[28];
  var square2 = this.squares[36];
  var square3 = this.squares[35];
  var squares = [square0, square1, square2, square3];

  squares.forEach(function(square, index){
    var playerIndex = index % 2 === 0 ? 0 : 1;
    var playerColor = this.game.players[playerIndex].color;

    square.placePiece(playerColor);
  }.bind(this));
};

Board.prototype.findValidSquares = function() {
  var emptySquares = this.squares.filter(function(square){
    return square.piece === null;
  });

  return emptySquares.filter(function(square){
    return square.isPlayable();
  });
};

Board.prototype.renderBoard = function(canvasElement) {
  var context = canvasElement.getContext('2d');

  this.squares.forEach(function(square) {
    square.draw(context);
  });
  $('#turn').html('');
  if (this.game.over === false) {
    var playerTurn = this.game.turn % 2;
    var playerName = this.game.players[playerTurn].name;
    var playerColor = this.game.players[playerTurn].color;
    this.game.displayPlayerTurn(playerName, playerColor);
  } else {
    var scores = helper.determineWinner(this);
    this.endGame(scores);
  }
};

Board.prototype.endGame = function(scores) {
  var winningScore = Math.max(scores.black, scores.white);
  var winner = scores.black > scores.white ? 0 : 1;
  var winningName = this.game.players[winner].name;
  this.game.announceWinner(winningName, winningScore);
  this.game.askToPlayAgain();
};

Board.prototype.respondToClick = function(x, y) {
  var validSquares = this.findValidSquares();
  var validIndexes = validSquares.map(function(square) {
    return square.index;
  });
  var checkMove = helper.checkClick(x, y, this, validIndexes);

  if (checkMove.valid) {
    helper.makeMove(this, checkMove);
    this.game.turn++;
    this.game.findCurrentPlayer();
    helper.checkForValidSquares(this, validSquares, canvasElement);
  } else {
    $('#invalid-square').empty();
    $('#invalid-square').append(`<h1> Invalid square, please try again </h1>`);
  }
  this.renderBoard(canvasElement);
};

module.exports = Board;
