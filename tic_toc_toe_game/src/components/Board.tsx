"use client";

import React, { useState, useEffect } from "react";

type SquareProps = {
  value: string | null;
  onClick: () => void;
};

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button
      className="w-20 h-20 text-2xl font-bold border-2 border-stone-950 flex items-center justify-center"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

const Board: React.FC = () => {
  const [gridSize, setGridSize] = useState(3);
  const [squares, setSquares] = useState(Array(gridSize * gridSize).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStatus, setGameStatus] = useState("");

  useEffect(() => {
    const winner = calculateWinner(squares, gridSize);
    if (winner) {
      setGameStatus(`Winner: ${winner}`);
  
    } else if (squares.every(square => square)) {
      setGameStatus("Match Draw!");
      
    } else {
      setGameStatus(`Next player: ${xIsNext ? "X" : "O"}`);
    }
  }, [squares, gridSize, xIsNext]);

  const handleClick = (index: number) => {
    if (squares[index] || gameStatus.startsWith("Winner")) return;
    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (index: number) => (
    <Square
      key={index}
      value={squares[index]}
      onClick={() => handleClick(index)}
    />
  );

  const handleGridSizeChange = (size: number) => {
    setGridSize(size);
    resetGame(size);
  };

  const resetGame = (size = gridSize) => {
    setSquares(Array(size * size).fill(null));
    setXIsNext(true);
    setGameStatus(`Next player: X`);
  };

  

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl font-semibold mb-4">{gameStatus}</div>
      <div className="flex gap-4 mb-4">
        <button
          className={`py-2 px-4 border ${
            gridSize === 3 ? "bg-blue-500 text-white" : "bg-white text-black"
          }`}
          onClick={() => handleGridSizeChange(3)}
        >
          3x3 Grid
        </button>
        <button
          className={`py-2 px-4 border ${
            gridSize === 4 ? "bg-blue-500 text-white" : "bg-white text-black"
          }`}
          onClick={() => handleGridSizeChange(4)}
        >
          4x4 Grid
        </button>
      </div>
      <div
        className={`grid gap-1 grid-cols-${gridSize}`}
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {squares.map((_, i) => renderSquare(i))}
      </div>
      <button
        className="mt-4 py-2 px-4 bg-fuchsia-500 text-white"
        onClick={() => resetGame()}
      >
        Reset Game
      </button>
    </div>
  );
};

const calculateWinner = (squares: Array<string | null>, gridSize: number) => {
  const lines = [];

  
  for (let i = 0; i < gridSize; i++) {
    lines.push([...Array(gridSize)].map((_, j) => i * gridSize + j));
  }

  
  for (let i = 0; i < gridSize; i++) {
    lines.push([...Array(gridSize)].map((_, j) => j * gridSize + i));
  }

  
  lines.push([...Array(gridSize)].map((_, i) => i * gridSize + i));
  lines.push([...Array(gridSize)].map((_, i) => (i + 1) * (gridSize - 1)));

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[b] === squares[c] &&
      (gridSize === 3 || squares[c] === squares[d])
    ) {
      return squares[a];
    }
  }
  return null;
};

export default Board;
