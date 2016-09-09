function evaluateFlippablePath(head, direction) {
    var path = [];
    path.push(head);
    var nextSquare = head.squareInDirection(direction);
    while (true) {
        if (nextSquare === undefined || nextSquare.piece === null)  {
            path = [];
            break;
        } else if (nextSquare.piece.color === head.piece.color){
            path.push(nextSquare);
        } else {
            break;
        }
        nextSquare = nextSquare.squareInDirection(direction);
    }
    return path;
}

module.exports = evaluateFlippablePath;
