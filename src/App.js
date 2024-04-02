import "./App.css";
import { useState } from "react";
function Square({ value, handleClick }) {
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}

export default function Board() {
  // this is the state of the player
  const [player, setPlayer] = useState("X");
  // value of the squares
  const [squares, setSquares] = useState(Array(9).fill(null));

  function calculateWinner(board) {
    const possibleWins = [
      // win by rows
      0, 1, 2, 3, 4, 5, 6, 7, 8,
      // win by columns
      0, 3, 6, 1, 4, 7, 2, 5, 8,
      // win by diagonals
      0, 4, 8, 2, 4, 6,
    ];
    // check if tjere is a winner by checking if any of these possbile wins are true
    for (let i = 0; i < possibleWins.length; i += 3) {
      const [a, b, c] = possibleWins.slice(i, i + 3);
      // if board[a] is not null and board[a] is equal to board[b] and board[a] is equal to board[c]
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }
  // this function is called when the square is clicked
  function handleClick(index) {
    if (squares[index] === null) {
      const newSquares = squares.slice();
      newSquares[index] = player;
      setSquares(newSquares);
      setPlayer(player === "X" ? "O" : "X");
      // check if there is a winner
      const winner = calculateWinner(newSquares);
      if (winner !== null) {
        alert("Winner: " + winner);
      } else {
        if (newSquares.every((square) => square !== null)) {
          alert("It's a draw");
        }
      }
    }
  }
  return (
    <div>
      <div className="status">Next player: {player}</div>
      <div className="board-row">
        <Square value={squares[0]} handleClick={() => handleClick(0)} />
        <Square value={squares[1]} handleClick={() => handleClick(1)} />
        <Square value={squares[2]} handleClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} handleClick={() => handleClick(3)} />
        <Square value={squares[4]} handleClick={() => handleClick(4)} />
        <Square value={squares[5]} handleClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} handleClick={() => handleClick(6)} />
        <Square value={squares[7]} handleClick={() => handleClick(7)} />
        <Square value={squares[8]} handleClick={() => handleClick(8)} />
      </div>
    </div>
  );
}
