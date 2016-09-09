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
    if (index % 2 === 0){
      square.placePiece(this.game.players[0].color);
    } else {
      square.placePiece(this.game.players[1].color);
    }
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
    this.displayPlayerTurn();
  } else {
    this.declareWinnerAndEndGame(helper.determineWinner(this));
  }
};

Board.prototype.displayPlayerTurn = function() {
  var playerTurn = this.game.turn % 2;
    $('#turn').append(`<h1>${this.game.players[playerTurn].name}'s turn (${this.game.players[playerTurn].color})</h1>`);
};

Board.prototype.declareWinnerAndEndGame = function(scores) {
  var winningScore = Math.max(scores.black, scores.white);
  var winner = scores.black > scores.white ? 0 : 1;
  announceWinner(this, winner, winningScore);
  helper.askToPlayAgain(this);
};

function announceWinner (board, winner, score) {
  $('#turn').append(`<h1> ${board.game.players[winner].name} wins with a score of ${score.length}!! </h1>`);
}

Board.prototype.clearBoard = function () {
  location.reload();
};

Board.prototype.respondToClick = function(x, y) {
  var validSquares = this.findValidSquares();
  var validIndexes = validSquares.map(function(square) {
    return square.index;
  });
  var check = helper.checkClick(x, y, this, validIndexes);

  if (check.result) {
    helper.makeMove(this, check);
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
