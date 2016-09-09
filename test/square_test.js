const Square = require('../lib/square');
const Board = require('../lib/board');
const assert = require('assert');
const Game = require('../lib/game');

describe('Square', function () {
    it('exists', function () {
        var board = new Board();
        var square = new Square(0, 5, 50, board, 0);

        assert(square);
    });

    it('instantiates with a size, x, y, board, and index', function () {
        var board = new Board();
        var square = new Square(0, 5, 50, board, 0);
        assert.equal(square.size, 50);
        assert.equal(square.x, 0);
        assert.equal(square.y, 5);
        assert.equal(square.board, board);
        assert.equal(square.index, 0);
    });

    it('instantiates with a default piece property of null', function () {
        var board = new Board();
        var square = new Square(0, 5, 50, board, 0);
        assert.equal(square.piece, null);
    });

    it('instantiates with a default color property of green', function () {
        var board = new Board();
        var square = new Square(0, 5, 50, board, 0);
        assert.equal(square.color, 'green');
    });

    it('can find its neighbors', function () {
        var board = new Board();
        board.createBoard();
        var square = board.squares[0];
        assert.deepEqual([null, null, 1, 9, 8, null, null, null], square.getNeighbors());
    });

    it('it can place a piece', function() {
        var board = new Board();
        board.createBoard();

        var square = board.squares[0];
        square.placePiece('white');
        assert.equal('white', square.piece.color);
    });

    it('a square knows it is not playable', function() {
        var board = new Board();
        var game = new Game(board);
        board.game = game;
        board.createBoard();
        board.placeFirstFourPieces();
        var square = board.squares[0];

        assert.equal(false, square.isPlayable());
    });

    it('a square knows it is playable', function() {
        var board = new Board();
        var game = new Game(board);
        board.createBoard();
        board.game = game;
        board.placeFirstFourPieces();
        var square = board.squares[20];

        assert.equal(true, square.isPlayable());
    });

    describe('flippablePaths', function() {
        it('returns empty array when no flippable paths first scenario', function() {
            var board = new Board();
            board.createBoard();

            assert.deepEqual([], board.squares[9].flippablePaths());
        });

        it('returns empty array when no flippable paths second scenario', function() {
            var board = new Board();
            board.createBoard();

            assert.deepEqual([], board.squares[9].flippablePaths());
        });
    });
});



