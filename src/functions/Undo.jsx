export function undo(moves, squares, setMoves, setSquares) {
    if (moves.length === 0) return;

    const lastMove = moves.pop();
    const nextSquares = squares.slice();
    nextSquares[lastMove] = null;

    setSquares(nextSquares);
    setMoves([...moves]);
}
