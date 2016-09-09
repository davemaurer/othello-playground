const Board = require('../lib/board');
const Player = require('../lib/player');
const Game = require('../lib/game');
const Piece = require('../lib/piece');
const Square = require('../lib/square');
const assert = require('assert');

describe('Game', function() {
    it('should instantiate with players, turn, over and board properties', function() {
        var board = new Board();
        var game = new Game(board);

        assert.equal(game.players[0].name, 'player1');
        assert.equal(game.players[0].color, 'black');
        assert.equal(game.players[1].name, 'player2');
        assert.equal(game.players[1].color, 'white');
        assert.equal(game.turn, 0);
        assert.equal(game.over, false);
        assert(game.board);
    });

    it('sets the current player according to the turn number', function() {
        var board = new Board();
        var game = new Game(board);
        assert.equal(game.currentPlayer.color, 'black');
        game.turn = 1;
        game.findCurrentPlayer();
        assert.equal(game.currentPlayer.color, 'white');
        game.turn = 2;
        game.findCurrentPlayer();
        assert.equal(game.currentPlayer.color, 'black');

    });

    it('should place a piece on the square that is clicked on', function() {
        var board = new Board();
        var game = new Game(board);
        board.game = game;
        board.createBoard();
        board.placeFirstFourPieces();
        var square = board.squares[27];

        assert(square.piece);
    });


});
