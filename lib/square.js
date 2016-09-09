const evaluateFlippablePath = require('./evaluate-flippable-path');
const Piece = require('./piece');
const board = require('./board');
module.exports = Square;

function Square(x, y, size, board, index) {
    this.piece = null;
    this.color = "green";
    this.x = x;
    this.y = y;
    this.size = size;
    this.board = board;
    this.index = index;
    this.neighbors = this.getNeighbors();
}

Square.prototype.draw = function(context) {
    context.fillStyle = '#3F953C';
    context.fillRect(this.x, this.y, this.size, this.size);
    if (this.index % 2){
        if ((this.index < 8 && this.index > 0) || (this.index < 24 && this.index > 15) || (this.index < 40 && this.index > 31) || (this.index < 56 && this.index > 47)) {
        context.fillStyle = "#006600";
        } else {
        context.fillStyle = "green";
        }
    } else {
        if (this.index < 15 && this.index > 7 || (this.index < 31 && this.index > 23) || (this.index < 47 && this.index > 39) || (this.index < 63 && this.index > 55)) {
        context.fillStyle = "#006600";
        } else {
        context.fillStyle = "green";
        }
    }
    context.fillRect(this.x + 1, this.y + 1, this.size - 2, this.size - 2);
    if (this.piece) {
        this.piece.draw(context);
    }
    return this;
};

Square.prototype.isPlayable = function() {
    return this.flippablePaths().length > 0;
};

Square.prototype.evaluateFlippablePath = evaluateFlippablePath;

Square.prototype.flippablePaths = function() {
    return this.headsOfPotentialFlippablePaths().reduce(function(paths, head){
        var direction = this.directionToFollow(head);
        var path = this.evaluateFlippablePath(head, direction);
        if (path.length > 0) {
            paths.push(path);
        }
        return paths;
    }.bind(this), []);
};

Square.prototype.headsOfPotentialFlippablePaths = function () {
    var indexesOfNeighborSquares = this.neighbors;
    return indexesOfNeighborSquares.reduce(function(heads, index){
        if(index !== null) {
            var neighbor = this.board.squares[index];
            if (neighbor.piece && (neighbor.piece.color !== this.board.game.currentPlayer.color)) {
                heads.push(neighbor);
            }

        }
        return heads;
    }.bind(this), []);
};

Square.prototype.directionToFollow = function (otherSquare) {
    return otherSquare.index - this.index;
};

Square.prototype.squareInDirection = function (direction) {
    return this.board.squares[this.index + direction];
};

Square.prototype.placePiece = function(color) {
    this.piece = new Piece(color, this);
};

Square.prototype.getNeighbors = function() {
    var key = this.index;
    var rows = 8,
    offset = rows - 1,
        first_column_array = [0,8,16,24,32,40,48,56],
        last_column_array = [7,15,23,31,39,47,55,63];

    var neighbors = [
        key - offset - 1,     // 0 top middle(north)
        key - offset,         // 1 top right(northeast)
        key + 1,              // 2 right(east)
            key + offset + 2,     // 3 bottom right(southeast)
            key + offset + 1,     // 4 bottom middle(south)
                key + offset,         // 5 bottom left(southwest)
                key - 1,              // 6 left(west)
                    key - offset - 2      // 7 top left(northwest)
    ];

    // Top

    if(key <= rows) {
        neighbors[1] = null;
        neighbors[0] = null;
        neighbors[7] = null;
    }

    // Bottom

    if(key >= ((rows * rows) - rows)) {
        neighbors[5] = null;
        neighbors[4] = null;
        neighbors[3] = null;
    }

    // Left

    if(first_column_array.indexOf(key) != -1 ) {
        neighbors[6] = null;
        neighbors[7] = null;
        neighbors[5] = null;
    }

    // Right

    if(last_column_array.indexOf(key) != -1 ) {
        neighbors[2] = null;
        neighbors[3] = null;
        neighbors[1] = null;
    }

    this.neighbors = neighbors;
    return neighbors;
};
