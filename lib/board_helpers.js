const $ = require('jquery');

exports.helpers = {
  checkClick : function(x, y, board, validIndexes) {
    var selectedSquareArray = board.squares.filter(function(square) {
      var xMatch = (x >= square.x) && (x <= square.x + square.size);
      var yMatch = (y >= square.y) && (y <= square.y + square.size);
      return xMatch && yMatch;
    });
    var result = false;
    for (var i = 0; i < validIndexes.length; i++) {
      if (validIndexes[i] === selectedSquareArray[0].index) {
        result = true;
      }
    }
    return {
      result: result,
      selectedSquareArray: selectedSquareArray
    }
  },

  checkForValidSquares : function(board, validSquares, canvasElement) {
    validSquares = board.findValidSquares();

    if (validSquares.length === 0) {
      board.game.turn++;
      board.game.findCurrentPlayer();
    }
    checkForGameOver(board, validSquares, canvasElement)
  },

  makeMove : function(board, checkedSquares) {
    $('#invalid-square').empty();
    checkedSquares.selectedSquareArray[0].placePiece(board.game.currentPlayer.color);
    var flippable = [].concat.apply([], checkedSquares.selectedSquareArray[0].flippablePaths());
    flippable.forEach(function(square) {
      square.piece.color = board.game.currentPlayer.color;
    }.bind(this));
  }
};

function checkForGameOver(board, validSquares, canvasElement) {
  board.findValidSquares();
  if (validSquares.length === 0) {
    board.renderBoard(canvasElement);
    board.game.over = true;
  }
}
