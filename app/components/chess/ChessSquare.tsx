import { Square } from "./types";
import { getPieceImage } from "./ChessLogic";

interface ChessSquareProps {
  square: Square;
  index: number;
  isSelected: boolean;
  isLegal: boolean;
  isLastFrom: boolean;
  isLastTo: boolean;
  onClick: (index: number) => void;
}

export default function ChessSquare({
  square,
  index,
  isSelected,
  isLegal,
  isLastFrom,
  isLastTo,
  onClick,
}: ChessSquareProps) {
  const r = Math.floor(index / 8);
  const f = index % 8;
  const isLight = (r + f) % 2 === 0;

  // Add coordinates to edge squares
  const showColumnLabel = r === 7;
  const showRowLabel = f === 0;

  return (
    <button
      onClick={() => onClick(index)}
      className={`
        relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center
        transition-all duration-200 focus:outline-none
        ${isLight 
          ? "bg-[#f0d9b5] hover:bg-[#e8d1a5]" 
          : "bg-[#b58863] hover:bg-[#a67852]"
        }
        ${isSelected && "scale-105 z-10"}
      `}
    >
      {/* Row coordinate (left side) */}
      {showRowLabel && (
        <span className="absolute left-1 top-1 text-xs font-medium text-gray-600/60">
          {8 - r}
        </span>
      )}

      {/* Column coordinate (bottom) */}
      {showColumnLabel && (
        <span className="absolute right-1 bottom-1 text-xs font-medium text-gray-600/60">
          {String.fromCharCode(97 + f)}
        </span>
      )}

      {/* Legal move indicator */}
      {isLegal && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-3 h-3 rounded-full ${
            square 
              ? "bg-red-400/80 border-2 border-red-500" 
              : "bg-green-500/70"
          }`} />
        </div>
      )}

      {/* Last move highlight */}
      {(isLastFrom || isLastTo) && (
        <div className="absolute inset-0 bg-yellow-300/30 pointer-events-none" />
      )}

      {/* Selected piece highlight */}
      {isSelected && (
        <div className="absolute inset-0 border-3 border-blue-500 pointer-events-none" />
      )}

      {/* Chess piece */}
      {square && (
        <img
          src={getPieceImage(square)}
          alt={`${square.color}${square.type}`}
          className="w-8 h-8 md:w-10 md:h-10 drop-shadow-md z-20 relative"
        />
      )}
    </button>
  );
}