function Piece(color, square) {
    this.color = color;
    this.square = square;
}

Piece.prototype.draw = function(context) {
    context.beginPath();

    context.fillStyle = this.color;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'black';
    context.shadowBlur = 8;
    context.arc(this.square.x + this.square.size / 2, this.square.y + this.square.size / 2, this.square.size / 2 - 3, 0, Math.PI * 2, true);
    context.fill();
    context.shadowColor = 'transparent';
};

module.exports = Piece;
