import "./App.css";
import { useState } from "react";
function Square({ value, handleClick }) {
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}
// this function is called to check if there is a winner
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
function Board({ player, handlePlay, currentState }) {
  // this function is called when the square is clicked
  function handleClick(index) {
    if (!calculateWinner(currentState) && currentState[index] === null) {
      const newSquares = currentState.slice();
      newSquares[index] = player;
      handlePlay(newSquares);
    }
  }
  return (
    <div>
      <div className="board-row">
        <Square value={currentState[0]} handleClick={() => handleClick(0)} />
        <Square value={currentState[1]} handleClick={() => handleClick(1)} />
        <Square value={currentState[2]} handleClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={currentState[3]} handleClick={() => handleClick(3)} />
        <Square value={currentState[4]} handleClick={() => handleClick(4)} />
        <Square value={currentState[5]} handleClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={currentState[6]} handleClick={() => handleClick(6)} />
        <Square value={currentState[7]} handleClick={() => handleClick(7)} />
        <Square value={currentState[8]} handleClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default function Game() {
  // this variable represents the history of the game (array of states of the board at each move)
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // this is the state of the player
  const [player, setPlayer] = useState("X");
  // this const represents the current state of the game which the last element in the history array
  const currentState = history[history.length - 1];
  // final state
  const [finalState, setFinalState] = useState("");
  // function to update the board
  function handlePlay(nextSquares) {
    // toggle the player
    setPlayer(player === "X" ? "O" : "X");
    // update the history
    setHistory(history.concat([nextSquares]));
    // or setHistory([...history,nextSquares])
    console.log(history);
    // check if there is a winner
    const winner = calculateWinner(nextSquares);
    if (winner !== null) {
      setFinalState("Winner: " + winner);
    } else {
      if (nextSquares.every((square) => square !== null)) {
        setFinalState("It's a draw");
      }
    }
  }
  // function newGame() {
  //   setHistory([Array(9).fill(null)]);
  //   setPlayer("X");
  // }
  return (
    <div className="game">
      <h2>{finalState}</h2>
      {/* <button onClick={newGame} className="new-game-btn">
        Start new game
      </button> */}
      <div className="status">Next player: {player}</div>
      <div className="game-board">
        <Board
          player={player}
          handlePlay={handlePlay}
          currentState={currentState}
        />
      </div>
      <div className="game-info">
        <ol>
          {/* squares is the value in the array and move is the index */}
          {history.map((squares, move) => {
            let description;
            if (move > 0) {
              description = "Go to move #" + move;
            } else {
              // move=0 means that this is the initial state of the game
              description = "Go to game start";
            }
            return (
              <li key={move}>
                <button
                  onClick={() => {
                    setHistory(history.slice(0, move + 1));
                    // if the index is even so it's X turn else it's O turn becuase the first move is X
                    setPlayer(move % 2 === 0 ? "X" : "O");
                    // set the finalState to empty string
                    setFinalState("");
                  }}
                  className="historical-moves"
                >
                  {description}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
