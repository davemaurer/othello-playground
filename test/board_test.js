const Board = require('../lib/board');
const assert = require('assert');
const Game = require('../lib/game');

describe('Board', function () {
    it('should have a default square size of 50 px', function() {
        var board = new Board();
        assert.equal(board.squareSize, 50);
    });

    it('should have a default number of squares in a row', function() {
        var board = new Board();
        assert.equal(board.squaresPerRow, 8);
    });

    it('should have squares', function () {
        var board = new Board();
        assert.deepEqual(board.squares, []);
    });

    it('should have 64 squares', function() {
        var board = new Board();
        board.createBoard();
        assert(board.squares[63]);
        assert.equal(board.squares.length, 64);
    });

    it('should place first four pieces', function() {
        var board = new Board();
        var game = new Game(board);
        board.game = game;
        board.createBoard();
        board.placeFirstFourPieces();

        assert.equal(board.squares[27].piece.color, "black");
        assert.equal(board.squares[28].piece.color, "white");
        assert.equal(board.squares[36].piece.color, "black");
        assert.equal(board.squares[35].piece.color, "white");
    });

    it('should find valid squares for current player to click', function() {
        var board = new Board();
        var game = new Game(board);
        board.game = game;
        board.createBoard();
        board.placeFirstFourPieces();
        var validSquares = board.findValidSquares();
        var firstValidSquare = validSquares[0];
        console.log(firstValidSquare);
        assert.equal(firstValidSquare.index, 20);
        assert.equal(validSquares.length, 4);
    });
});
