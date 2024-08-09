import { useState } from "react";
function Square({
  value,
  onSquareClick,
}: {
  value: string | null;
  onSquareClick: () => void;
}) {
  return <button onClick={onSquareClick}>{value}</button>;
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
    if (squares[i]) {
      return;
    }
    const nextSquares = squares.slice(); //creates a copy of the squares array (nextSquares) with the JavaScript slice() Array method
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  };
  return (
    <>
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
  const currentSquares = history[history.length - 1];
  const handlePlay = (nextSquares: (string | null)[]) => {
    setXIsNext((pre) => !pre);
    setHistory((pre) => [...pre, nextSquares]);
  };
  return (
    <>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
    </>
  );
}
