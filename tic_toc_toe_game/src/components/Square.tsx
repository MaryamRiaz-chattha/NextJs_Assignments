"use client"
import React from 'react';

type SquareProps = {
  value: string | null;
  onClick: () => void;
};

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button
      className="w-20 h-20 text-2xl font-bold border-2 border-gray-400 flex items-center justify-center"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
