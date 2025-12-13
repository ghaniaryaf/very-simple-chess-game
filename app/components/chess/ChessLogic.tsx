import { Square } from "./types";

export const initialBoard = (): Square[] => {
  const board: Square[] = new Array(64).fill(null);
  
  // Black pieces (top)
  board[0] = { type: "R", color: "b" };
  board[1] = { type: "N", color: "b" };
  board[2] = { type: "B", color: "b" };
  board[3] = { type: "Q", color: "b" };
  board[4] = { type: "K", color: "b" };
  board[5] = { type: "B", color: "b" };
  board[6] = { type: "N", color: "b" };
  board[7] = { type: "R", color: "b" };
  for (let i = 8; i < 16; i++) {
    board[i] = { type: "P", color: "b" };
  }
  
  // White pieces (bottom)
  for (let i = 48; i < 56; i++) {
    board[i] = { type: "P", color: "w" };
  }
  board[56] = { type: "R", color: "w" };
  board[57] = { type: "N", color: "w" };
  board[58] = { type: "B", color: "w" };
  board[59] = { type: "Q", color: "w" };
  board[60] = { type: "K", color: "w" };
  board[61] = { type: "B", color: "w" };
  board[62] = { type: "N", color: "w" };
  board[63] = { type: "R", color: "w" };
  
  return board;
};

export const legalMoves = (board: Square[], row: number, file: number): number[] => {
  const index = row * 8 + file;
  const piece = board[index];
  
  if (!piece) return [];
  
  const moves: number[] = [];
  const color = piece.color;
  const opponent = color === "w" ? "b" : "w";
  
  const onBoard = (r: number, f: number) => r >= 0 && r < 8 && f >= 0 && f < 8;
  
  const canMoveTo = (r: number, f: number) => {
    const targetIndex = r * 8 + f;
    const target = board[targetIndex];
    return !target || target.color === opponent;
  };
  
  switch (piece.type) {
    case "P": // Pawn
      const direction = color === "w" ? -1 : 1;
      const startRow = color === "w" ? 6 : 1;
      
      // Move forward
      if (onBoard(row + direction, file) && !board[(row + direction) * 8 + file]) {
        moves.push((row + direction) * 8 + file);
        
        // Double move from start
        if (row === startRow && onBoard(row + direction * 2, file)) {
          const doubleIndex = (row + direction * 2) * 8 + file;
          if (!board[doubleIndex]) {
            moves.push(doubleIndex);
          }
        }
      }
      
      // Capture
      for (const fOffset of [-1, 1]) {
        if (onBoard(row + direction, file + fOffset)) {
          const diagIndex = (row + direction) * 8 + (file + fOffset);
          if (board[diagIndex] && board[diagIndex]!.color === opponent) {
            moves.push(diagIndex);
          }
        }
      }
      break;
      
    case "N": // Knight
      const knightMoves = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
      ];
      
      for (const [dr, df] of knightMoves) {
        const r = row + dr;
        const f = file + df;
        if (onBoard(r, f) && canMoveTo(r, f)) {
          moves.push(r * 8 + f);
        }
      }
      break;
      
    case "B": // Bishop
      const bishopDirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
      for (const [dr, df] of bishopDirs) {
        let r = row + dr;
        let f = file + df;
        while (onBoard(r, f)) {
          const idx = r * 8 + f;
          if (!board[idx]) {
            moves.push(idx);
          } else if (board[idx]!.color === opponent) {
            moves.push(idx);
            break;
          } else {
            break;
          }
          r += dr;
          f += df;
        }
      }
      break;
      
    case "R": // Rook
      const rookDirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (const [dr, df] of rookDirs) {
        let r = row + dr;
        let f = file + df;
        while (onBoard(r, f)) {
          const idx = r * 8 + f;
          if (!board[idx]) {
            moves.push(idx);
          } else if (board[idx]!.color === opponent) {
            moves.push(idx);
            break;
          } else {
            break;
          }
          r += dr;
          f += df;
        }
      }
      break;
      
    case "Q": // Queen
      const queenDirs = [
        [-1, -1], [-1, 1], [1, -1], [1, 1],
        [-1, 0], [1, 0], [0, -1], [0, 1]
      ];
      for (const [dr, df] of queenDirs) {
        let r = row + dr;
        let f = file + df;
        while (onBoard(r, f)) {
          const idx = r * 8 + f;
          if (!board[idx]) {
            moves.push(idx);
          } else if (board[idx]!.color === opponent) {
            moves.push(idx);
            break;
          } else {
            break;
          }
          r += dr;
          f += df;
        }
      }
      break;
      
    case "K": // King
      const kingMoves = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
      ];
      for (const [dr, df] of kingMoves) {
        const r = row + dr;
        const f = file + df;
        if (onBoard(r, f) && canMoveTo(r, f)) {
          moves.push(r * 8 + f);
        }
      }
      break;
  }
  
  return moves;
};