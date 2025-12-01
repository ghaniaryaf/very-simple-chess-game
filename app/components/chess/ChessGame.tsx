"use client";
import React, { useState } from "react";
import { Square } from "./types";
import { initialBoard, legalMoves } from "./ChessLogic";
import ChessSquare from "./ChessSquare";

export default function ChessGame() {
  const [board, setBoard] = useState<Square[]>(initialBoard());
  const [selected, setSelected] = useState<number | null>(null);
  const [legal, setLegal] = useState<number[]>([]);
  const [turn, setTurn] = useState<"w" | "b">("w");
  const [lastMove, setLastMove] = useState<number[] | null>(null);

  const handleSquareClick = (sqIndex: number) => {
    const r = Math.floor(sqIndex / 8);
    const f = sqIndex % 8;
    const piece = board[sqIndex];

    if (selected === null) {
      if (piece && piece.color === turn) {
        setSelected(sqIndex);
        const fromR = Math.floor(sqIndex / 8);
        const fromF = sqIndex % 8;
        setLegal(legalMoves(board, fromR, fromF));
      }
      return;
    }

    if (selected === sqIndex) {
      setSelected(null);
      setLegal([]);
      return;
    }

    if (piece && piece.color === turn) {
      setSelected(sqIndex);
      const fromR = Math.floor(sqIndex / 8);
      const fromF = sqIndex % 8;
      setLegal(legalMoves(board, fromR, fromF));
      return;
    }

    if (legal.includes(sqIndex) && selected !== null) {
      const newBoard = [...board];
      const moving = newBoard[selected];
      newBoard[sqIndex] = moving;
      newBoard[selected] = null;

      if (moving && moving.type === "P") {
        const toR = Math.floor(sqIndex / 8);
        if (
          (moving.color === "w" && toR === 0) ||
          (moving.color === "b" && toR === 7)
        ) {
          newBoard[sqIndex] = { type: "Q", color: moving.color };
        }
      }

      setBoard(newBoard);
      setLastMove([selected, sqIndex]);
      setSelected(null);
      setLegal([]);
      setTurn(turn === "w" ? "b" : "w");
    } else {
      setSelected(null);
      setLegal([]);
    }
  };

  const reset = () => {
    setBoard(initialBoard());
    setTurn("w");
    setSelected(null);
    setLegal([]);
    setLastMove(null);
  };

  const undo = () => {
    if (!lastMove) return;
    const [from, to] = lastMove;
    const newBoard = [...board];
    newBoard[from] = newBoard[to];
    newBoard[to] = null;
    setBoard(newBoard);
    setLastMove(null);
    setTurn(turn === "w" ? "b" : "w");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Simple Chess
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-800"></div>
              <span className="text-sm font-medium text-gray-600">Black</span>
            </div>
            <div className="text-lg font-medium text-gray-700">
              Turn: <span className="font-bold">{turn === "w" ? "White" : "Black"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white border border-gray-300"></div>
              <span className="text-sm font-medium text-gray-600">White</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          {/* Chess Board */}
          <div className="relative">
            <div className="bg-white rounded-xl shadow-xl p-4 border border-gray-200">
              <div className="grid grid-cols-8 gap-0 w-fit mx-auto border border-gray-300 rounded-lg overflow-hidden">
                {board.map((sq, i) => (
                  <ChessSquare
                    key={i}
                    square={sq}
                    index={i}
                    isSelected={selected === i}
                    isLegal={legal.includes(i)}
                    isLastFrom={!!(lastMove && lastMove[0] === i)}
                    isLastTo={!!(lastMove && lastMove[1] === i)}
                    onClick={handleSquareClick}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Controls & Info Panel */}
          <div className="w-full lg:w-80">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              {/* Game Status */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Game Status</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Current Turn</span>
                    <div className={`px-3 py-1 rounded-full ${turn === "w" ? "bg-gray-100 text-gray-800" : "bg-gray-800 text-white"}`}>
                      {turn === "w" ? "White" : "Black"}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Selected Piece</span>
                    <span className="text-gray-800 font-medium">
                      {selected !== null && board[selected] ? 
                        `${board[selected]!.color === "w" ? "White" : "Black"} ${board[selected]!.type}` : 
                        "None"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={reset}
                    className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    New Game
                  </button>
                  <button
                    onClick={undo}
                    disabled={!lastMove}
                    className={`font-medium py-3 px-4 rounded-lg transition-colors duration-200 ${
                      lastMove 
                        ? "bg-gray-200 hover:bg-gray-300 text-gray-800" 
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Undo Move
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">How to Play</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    </div>
                    <p className="text-sm text-gray-600">Click a piece to select it and see available moves</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <p className="text-sm text-gray-600">Click highlighted squares to move</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    </div>
                    <p className="text-sm text-gray-600">Pawns auto-promote to Queens</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}