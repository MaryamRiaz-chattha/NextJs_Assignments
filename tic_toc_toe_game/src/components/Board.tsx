"use client";

import React, { useState } from 'react';
import Square from './Square';

const Board: React.FC = () => {
  const [gridSize, setGridSize] = useState(3);
  const [squares, setSquares] = useState(Array(gridSize * gridSize).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index: number) => {
    if (squares[index] || calculateWinner(squares, gridSize)) return;
    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (index: number) => (
    <Square key={index} value={squares[index]} onClick={() => handleClick(index)} />
  );

  const winner = calculateWinner(squares, gridSize);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const handleGridSizeChange = (size: number) => {
    setGridSize(size);
    setSquares(Array(size * size).fill(null));
    setXIsNext(true);
  };

  return (
    <div>
      <div className="text-xl font-semibold mb-4">{status}</div>
      <div className="flex gap-4 mb-4">
        <button
          className={`py-2 px-4 border ${gridSize === 3 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          onClick={() => handleGridSizeChange(3)}
        >
          3x3 Grid
        </button>
        <button
          className={`py-2 px-4 border ${gridSize === 4 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
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
    </div>
  );
};

const calculateWinner = (squares: Array<string | null>, gridSize: number) => {
  const lines = [];

  // Rows
  for (let i = 0; i < gridSize; i++) {
    lines.push([...Array(gridSize)].map((_, j) => i * gridSize + j));
  }

  // Columns
  for (let i = 0; i < gridSize; i++) {
    lines.push([...Array(gridSize)].map((_, j) => j * gridSize + i));
  }

  // Diagonals
  lines.push([...Array(gridSize)].map((_, i) => i * gridSize + i));
  lines.push([...Array(gridSize)].map((_, i) => (i + 1) * (gridSize - 1)));

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c] && (gridSize === 3 || squares[c] === squares[d])) {
      return squares[a];
    }
  }
  return null;
};

export default Board;
