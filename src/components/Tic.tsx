import { useState } from "react";
function Square({
  value,
  onSquareClick,
}: {
  value: string | null;
  onSquareClick: () => void;
}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({
  xIsNext,
  squares,
  onPlay,
}: {
  xIsNext: boolean;
  squares: string[] | null[];
  onPlay: (arr: (string | null)[]) => void;
}) {
  const handleClick = (i: number) => {
    const winner = calculateWinner(squares);
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice(); //creates a copy of the squares array (nextSquares) with the JavaScript slice() Array method
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  };
  const winner = calculateWinner(squares);
  let status = winner
    ? "Winner: " + winner
    : "Next Player: " + (xIsNext ? "X" : "O");
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[history.length - 1];
  const handlePlay = (nextSquares: (string | null)[]) => {
    setXIsNext((pre) => !pre);
    setHistory((pre) => [...pre, nextSquares]);
  };
  function jumpTo() {}
  const moves = history.map((squares, index) => {
    let description = index > 0 ? "Go to move #" + index : "Go to game start";
    return (
      <li key={index}>
        <button onClick={() => {}}>{description}</button>
      </li>
    );
  });
  return (
    <>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <ol>{moves}</ol>
    </>
  );
}

function calculateWinner(squares: string[] | null[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] === squares[b] && squares[b] === squares[c] && squares[a]) {
      return squares[a];
    }
  }
  return null;
}
