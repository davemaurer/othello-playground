const $ = require('jquery');
const Player = require('./player');

function Game(board) {
  this.board = board;
  this.players = [new Player('player1', 'black'), new Player('player2', 'white')];
  this.turn = 0;
  this.currentPlayer = this.findCurrentPlayer();
  this.over = false;
}

Game.prototype.welcome = function() {
  $('#othello-right').prepend(`<h1>ello</h1>`);
  $('#othello-left').prepend(`<h1>Oth</h1>`);
  $('#welcome').prepend(`${createForm()} ${createStartButton()}`);
  $('#start').on('click', function () {
    var player1 = new Player($('#player1').val(), 'black');
    var player2 = new Player($('#player2').val(), 'white');
    this.players = [player1, player2];
    $('#welcome').html('');
    $('#othello-right').html('');
    $('#othello-left').html('');
    this.setup();
  }.bind(this));
};

Game.prototype.setup = function() {
  this.board.createBoard();
  this.board.placeFirstFourPieces();
  this.board.renderBoard(this.board.canvasElement);
};

Game.prototype.findCurrentPlayer = function() {
  this.currentPlayer = this.players[this.turn % 2];
  return this.currentPlayer;
};


Game.prototype.displayPlayerTurn = function(name, color) {
  $('#turn').append(`<h1>${name}'s turn ${color}</h1>`);
};

Game.prototype.announceWinner = function(winner, score) {
  $('#turn').append(`<h1> ${winner} wins with a score of ${score}!! </h1>`);
};

Game.prototype.askToPlayAgain = function() {
  $('#turn').prepend(`<button class="button" id="play-again">Play Again</button>`);
  $('#play-again').on('click', resetGame);
};

function createForm(){
  return `<div id="box1"><label for="player1">Enter Player1:</label>
          <input type="text" id="player1"></br></div>
          <div id="box2"><label for="player2">Enter Player2:</label>
          <input type="text" id="player2"></br></div>`;
}

function createStartButton() {
  return `<div class="button"><button id="start">Start Game</button></div>`;
}

function resetGame() {
  location.reload();
}


module.exports = Game;
