import { useState } from 'react';
import { undo } from './functions/Undo';
import { reset } from './functions/Reset';
import { calculateWinner } from './functions/CalculateWinner';



function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [moves, setMoves] = useState([]);

  const xIsNext = moves.length % 2 === 0;
  const buttonContainer = moves.length > 0;

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);

    setMoves([...moves, i]);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (moves.length === 9) {
    status = "Draw";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const renderSquare = (i) => (
    <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
  );

  const renderBoard = () => {
    let board = [];
    for (let row = 0; row < 3; row++) {
      let boardRow = [];
      for (let col = 0; col < 3; col++) {
        boardRow.push(renderSquare(row * 3 + col));
      }
      board.push(
        <div key={row} className="board-row">
          {boardRow}
        </div>
      );
    }
    return board;
  };

  return (
    <div className='container'>
      <div className="status">{status}</div>
      <div className='board' >{renderBoard()}</div>
      {buttonContainer && (
        <div className='button-container'>
          <button className='button1'
            style={{ backgroundColor: "green", color: "white", borderRadius: "10px" }} onClick={() => undo(moves, squares, setMoves, setSquares)}>Step Back</button>
          <button className='button1' style={{ backgroundColor: "red", color: "white", borderRadius: "10px" }} onClick={() => reset(setSquares, setMoves)}>RESET</button>
        </div>
      )}
    </div>
  );
}
