const Piece = require('../lib/piece');
const Square = require('../lib/square');
const Board = require('../lib/board');
const assert = require('assert');

describe('Piece', function() {
  it('exists', function() {
    var board = new Board();
    var square = new Square(0, 5, 50, 50, board);
    var piece = new Piece('white', square);

    assert(piece);
  });

  it('has color and square properties', function() {
    var board = new Board();
    var square = new Square(0, 5, 50, 50, board);
    var piece = new Piece('white', square);

    assert.equal(piece.color, 'white');
    assert.equal(piece.square, square);
  });

  it('can be placed on the board', function () {
    var board = new Board();
    var square = new Square(0, 5, 50, 50, board);

    square.placePiece('black');

    assert(square.piece);
    assert.equal(square.piece.color, 'black');
  });
});
