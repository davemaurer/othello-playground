const Square = require('../lib/square');
const evaluateFlippablePath = require('../lib/evaluate-flippable-path');
const assert = require('assert');
const Board = require('../lib/board');
const Game = require('../lib/game');

describe('evaluateFlippablePath', function() {
    it('returns an empty array if there is no square after the head', function() {
        var board = new Board();
        var game = new Game(board);
        board.game = game;
        var square = new Square(0,0,50,null,null);
        square.board = board;
        square.squareInDirection = function() {
            return undefined;
        };
        var path = square.evaluateFlippablePath(square, 9);

        assert.deepEqual([], path);
    });

    it('returns an empty array if the square after the head is empty', function() {
        var board = new Board();
        var game = new Game(board);
        board.game = game;
        var square1 = new Square(0,0,50,board,null);
        var square2 = new Square(0,0,50,board,null);
        square1.squareInDirection = function() {
            return square2;
        };
        square1.placePiece('white');
        var path = square1.evaluateFlippablePath(square1, 9);

        assert.deepEqual([], path);
    });


    it('returns an empty array if heads next square is the same color and the square after that is empty', function() {
        var board = new Board();
        var game = new Game(board);
        board.game = game;
        var square1 = new Square(0,0,50,board,null);
        var square2 = new Square(0,0,50,board,null);
        square1.squareInDirection = function() {
            return square2;
        };
        square2.squareInDirection = function() {
            return undefined;
        };
        square1.placePiece('black');
        square2.placePiece('black');
        var path = square1.evaluateFlippablePath(square1, 9);

        assert.deepEqual([], path);
    });

    it('returns the head if the heads next is a different color', function() {
        var board = new Board();
        var game = new Game(board);
        board.game = game;
        var square1 = new Square(0,0,50,board,null);
        var square2 = new Square(0,0,50,board,null);
        square1.squareInDirection = function() {
            return square2;
        };
        square2.squareInDirection = function() {
            return undefined;
        };
        square1.placePiece('black');
        square2.placePiece('white');
        var path = square1.evaluateFlippablePath(square1, 9);

        assert(1, path.length);
        assert.equal('black', path[0].piece.color);
    });

    it('returns an empty array when the head and the next two squares are the same color and the following square is empty', function() {
        var board = new Board();
        var game = new Game(board);
        board.game = game;
        var square1 = new Square(0,0,50,board,null);
        var square2 = new Square(0,0,50,board,null);
        var square3 = new Square(0,0,50,board,null);
        var square4 = new Square(0,0,50,board,null);
        square1.squareInDirection = function() {
            return square2;
        };
        square2.squareInDirection = function() {
            return square3;
        };
        square3.squareInDirection = function() {
            return square4;
        };
        square1.placePiece('white');
        square2.placePiece('white');
        square3.placePiece('white');
        var path = square1.evaluateFlippablePath(square1, 9);

        assert.deepEqual([], path);
    });

    it('returns the head and the next square if the heads next is the same color and the next after that is a different color', function() {
        var board = new Board();
        var game = new Game(board);
        board.game = game;
        var square1 = new Square(0,0,50,board,null);
        var square2 = new Square(0,0,50,board,null);
        var square3 = new Square(0,0,50,board,null);
        square1.squareInDirection = function() {
            return square2;
        };
        square2.squareInDirection = function() {
            return square3;
        };
        square1.placePiece('white');
        square2.placePiece('white');
        square3.placePiece('black');
        var path = square1.evaluateFlippablePath(square1, 9);

        assert(2, path.length);
        assert.equal('white', path[0].piece.color);
        assert.equal('white', path[1].piece.color);
    });
});
