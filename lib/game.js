const $ = require('jquery');
const Player = require('./player');

function Game(board) {
    this.board = board;
    this.players = [new Player('player1', 'black'), new Player('player2', 'white')];
    this.turn = 0;
    this.currentPlayer = this.findCurrentPlayer();
    this.over = false;
    this.counter = 0;
}

Game.prototype.welcome = function() {
    $('#othello-right').prepend(`<h1>ello</h1>`)
    $('#othello-left').prepend(`<h1>Oth</h1>`)
    $('#welcome').prepend(`${createForm()} ${createStartButton()}`)
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

function createForm(){
    return `<div id="box1"><label for="player1">Enter Player1:</label>
        <input type="text" id="player1"></br></div>
        <div id="box2"><label for="player2">Enter Player2:</label>
        <input type="text" id="player2"></br></div>`;
}

function createStartButton() {
    return `<div class="button"><button id="start">Start Game</button></div>`;
}

module.exports = Game;
