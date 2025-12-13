import React from "react";
import { Square } from "./types";

interface ChessSquareProps {
  square: Square;
  index: number;
  isDark: boolean;
  isSelected: boolean;
  isLegal: boolean;
  isLastFrom: boolean;
  isLastTo: boolean;
  onClick: (index: number) => void;
}

const pieceUnicode: Record<string, string> = {
  "wK": "♔", "wQ": "♕", "wR": "♖", "wB": "♗", "wN": "♘", "wP": "♙",
  "bK": "♚", "bQ": "♛", "bR": "♜", "bB": "♝", "bN": "♞", "bP": "♟",
};

export default function ChessSquare({
  square,
  index,
  isDark,
  isSelected,
  isLegal,
  isLastFrom,
  isLastTo,
  onClick,
}: ChessSquareProps) {
  
  const getBackground = () => {
    if (isSelected) return "bg-blue-300";
    if (isLastFrom) return "bg-yellow-200";
    if (isLastTo) return "bg-yellow-300";
    if (isLegal && square) return "bg-red-200"; // Capture square
    if (isLegal) return "bg-green-200"; // Empty legal square
    return isDark ? "bg-emerald-600" : "bg-emerald-100";
  };

  const getTextColor = () => {
    if (!square) return "";
    return square.color === "w" ? "text-white" : "text-gray-900";
  };

  return (
    <button
      onClick={() => onClick(index)}
      className={`
        w-12 h-12 md:w-14 md:h-14
        ${getBackground()}
        transition-colors duration-150
        hover:opacity-90
        flex items-center justify-center
        text-3xl md:text-3xl
        ${getTextColor()}
        relative
      `}
    >
      {square && pieceUnicode[`${square.color}${square.type}`]}
      
      {/* Legal move indicator for empty squares */}
      {isLegal && !square && (
        <div className="absolute w-3 h-3 rounded-full bg-gray-600 opacity-70"></div>
      )}
    </button>
  );
}