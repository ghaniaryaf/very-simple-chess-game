import { Square, Piece } from "./types";

export const initialBoard = (): Square[] => {
  const emptyRow = Array(8).fill(null) as Square[];
  const board: Square[] = [];

  board.push(
    { type: "R", color: "b" },
    { type: "N", color: "b" },
    { type: "B", color: "b" },
    { type: "Q", color: "b" },
    { type: "K", color: "b" },
    { type: "B", color: "b" },
    { type: "N", color: "b" },
    { type: "R", color: "b" }
  );
  for (let i = 0; i < 8; i++) board.push({ type: "P", color: "b" });
  for (let r = 0; r < 4; r++) board.push(...emptyRow);
  for (let i = 0; i < 8; i++) board.push({ type: "P", color: "w" });
  board.push(
    { type: "R", color: "w" },
    { type: "N", color: "w" },
    { type: "B", color: "w" },
    { type: "Q", color: "w" },
    { type: "K", color: "w" },
    { type: "B", color: "w" },
    { type: "N", color: "w" },
    { type: "R", color: "w" }
  );

  return board;
};

export const inBounds = (r: number, f: number) => r >= 0 && r < 8 && f >= 0 && f < 8;

export const idx = (r: number, f: number) => r * 8 + f;

export const getPieceImage = (p: Piece) => `/chess/${p.color}${p.type}.png`;

export const legalMoves = (
  board: Square[],
  fromR: number,
  fromF: number
): number[] => {
  const moves: number[] = [];
  const p = board[idx(fromR, fromF)];
  if (!p) return moves;
  const dir = p.color === "w" ? -1 : 1;

  const pushIf = (r: number, f: number) => {
    if (!inBounds(r, f)) return;
    const target = board[idx(r, f)];
    if (!target || target.color !== p.color) moves.push(idx(r, f));
  };

  switch (p.type) {
    case "P":
      const oneR = fromR + dir;
      if (inBounds(oneR, fromF) && !board[idx(oneR, fromF)]) {
        moves.push(idx(oneR, fromF));
        const startRank = p.color === "w" ? 6 : 1;
        const twoR = fromR + dir * 2;
        if (fromR === startRank && !board[idx(twoR, fromF)])
          moves.push(idx(twoR, fromF));
      }
      for (const df of [-1, 1]) {
        const r = fromR + dir;
        const f = fromF + df;
        if (inBounds(r, f)) {
          const t = board[idx(r, f)];
          if (t && t.color !== p.color) moves.push(idx(r, f));
        }
      }
      break;
    case "N":
      for (const [dr, df] of [
        [2, 1],
        [2, -1],
        [-2, 1],
        [-2, -1],
        [1, 2],
        [1, -2],
        [-1, 2],
        [-1, -2],
      ])
        pushIf(fromR + dr, fromF + df);
      break;
    case "B":
      for (const [dr, df] of [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ]) {
        let r = fromR + dr,
          f = fromF + df;
        while (inBounds(r, f)) {
          const t = board[idx(r, f)];
          if (!t) {
            moves.push(idx(r, f));
            r += dr;
            f += df;
            continue;
          }
          if (t.color !== p.color) moves.push(idx(r, f));
          break;
        }
      }
      break;
    case "R":
      for (const [dr, df] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        let r = fromR + dr,
          f = fromF + df;
        while (inBounds(r, f)) {
          const t = board[idx(r, f)];
          if (!t) {
            moves.push(idx(r, f));
            r += dr;
            f += df;
            continue;
          }
          if (t.color !== p.color) moves.push(idx(r, f));
          break;
        }
      }
      break;
    case "Q":
      for (const [dr, df] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ]) {
        let r = fromR + dr,
          f = fromF + df;
        while (inBounds(r, f)) {
          const t = board[idx(r, f)];
          if (!t) {
            moves.push(idx(r, f));
            r += dr;
            f += df;
            continue;
          }
          if (t.color !== p.color) moves.push(idx(r, f));
          break;
        }
      }
      break;
    case "K":
      for (const dr of [-1, 0, 1])
        for (const df of [-1, 0, 1]) {
          if (dr === 0 && df === 0) continue;
          pushIf(fromR + dr, fromF + df);
        }
      break;
  }

  return moves;
};