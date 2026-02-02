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

  // Get the image path for the piece
  const getPieceImage = () => {
    if (!square) return "";
    const fileName = `${square.color}${square.type}.png`;
    return `chess/${fileName}`; // Images are directly in public folder
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
        relative
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      `}
      aria-label={`Square ${String.fromCharCode(97 + (index % 8))}${8 - Math.floor(index / 8)} ${square ? `${square.color} ${square.type}` : 'empty'}`}
    >
      {/* Piece image */}
      {square && (
        <img 
          src={getPieceImage()}
          alt={`${square.color}${square.type}`}
          className="w-10 h-10 md:w-10 md:h-10 object-contain pointer-events-none select-none"
          draggable="false"
        />
      )}
      
      {/* Legal move indicator for empty squares */}
      {isLegal && !square && (
        <div className="absolute w-3 h-3 rounded-full bg-gray-600 opacity-70"></div>
      )}
      
      {/* Legal move indicator for capture squares (has piece) */}
      {isLegal && square && (
        <div className="absolute inset-0 border-4 border-red-500 border-opacity-70 pointer-events-none"></div>
      )}
    </button>
  );
}