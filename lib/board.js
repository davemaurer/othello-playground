const $ = require('jquery');
const Game = require('./game');
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

    var playableSquares = emptySquares.filter(function(square){
        return square.isPlayable();
    });
    console.log(playableSquares);
    return playableSquares;
};

Board.prototype.renderBoard = function(canvasElement) {
    var context = canvasElement.getContext('2d');

    this.squares.forEach(function(square) {
        square.draw(context);
    });
    $('#turn').html('');
    if (this.game.over === false) {
        if (this.game.turn % 2 === 0) {
            $('#turn').append(`<h1> ${this.game.players[0].name}'s turn (${this.game.players[0].color})</h1>`);
        } else {
            $('#turn').append(`<h1> ${this.game.players[1].name}'s turn (${this.game.players[1].color})</h1>`);
        }
    } else {
        var blackScore = this.squares.filter(function(square) {
            if (square.piece) {
                return square.piece.color == 'black'
            }
        });
        var whiteScore = this.squares.filter(function(square) {
            if (square.piece) {
                return square.piece.color == 'white'
            }
        });
        if (blackScore.length > whiteScore.length) {
            $('#turn').append(`<h1> ${this.game.players[0].name} wins with a score of ${blackScore.length}!! </h1>`);
        } else {
            $('#turn').append(`<h1> ${this.game.players[1].name} wins with a score of ${whiteScore.length}!! </h1>`);
        }
        $('#turn').prepend(`<button class="button" id="play-again">Play Again</button>`);
        $('#play-again').on('click', this.clearBoard);
    }
};

Board.prototype.clearBoard = function () {
    location.reload();
};

Board.prototype.respondToClick = function(x, y) {
    var selectedSquareArray = this.squares.filter(function(square) {
        var xMatch = (x >= square.x) && (x <= square.x + square.size);
        var yMatch = (y >= square.y) && (y <= square.y + square.size);
        return xMatch && yMatch;
    });
    var validSquares = this.findValidSquares();
    var validIndexes = validSquares.map(function(square){
        return square.index;
    });
    var result = false;
    for(var i = 0; i < validIndexes.length; i++){
        if (validIndexes[i] === selectedSquareArray[0].index) {
            result = true;
        }
    }
    if (result) {
        if (this.game.turn % 2 === 0) {
            selectedSquareArray[0].placePiece(this.game.currentPlayer.color);
            var flippable = [].concat.apply([], selectedSquareArray[0].flippablePaths());
            flippable.forEach(function(square) {
                square.piece.color = this.game.currentPlayer.color;
            }.bind(this));
        } else {
            selectedSquareArray[0].placePiece(this.game.currentPlayer.color);
            var flippable = [].concat.apply([], selectedSquareArray[0].flippablePaths());
            flippable.forEach(function(square) {
                square.piece.color = this.game.currentPlayer.color;
            }.bind(this));
        }
        this.game.turn++;
        this.game.findCurrentPlayer();
        validSquares = this.findValidSquares();
        if (validSquares.length === 0) {
            this.game.turn++;
            this.game.findCurrentPlayer();
            validSquares = this.findValidSquares();
            if (validSquares.length === 0) {
                this.renderBoard(canvasElement);
                this.game.over = true;

            }
        }
    } else {
        console.log("you can't do that");
    }
    this.renderBoard(canvasElement);
};

module.exports = Board;
