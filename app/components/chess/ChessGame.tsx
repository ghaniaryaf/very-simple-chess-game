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
  
  // Simple undo/redo state - only one level
  const [lastState, setLastState] = useState<{
    board: Square[];
    turn: "w" | "b";
  } | null>(null);
  
  const [undoneState, setUndoneState] = useState<{
    board: Square[];
    turn: "w" | "b";
  } | null>(null);
  
  const [lastMove, setLastMove] = useState<[number, number] | null>(null);

  const handleSquareClick = (sqIndex: number) => {
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
      // Save current state for undo
      setLastState({
        board: [...board],
        turn
      });
      
      // Clear undone state since we made a new move
      setUndoneState(null);
      
      // Create new board
      const newBoard = [...board];
      const moving = newBoard[selected];
      newBoard[sqIndex] = moving;
      newBoard[selected] = null;

      // Handle pawn promotion
      if (moving && moving.type === "P") {
        const toR = Math.floor(sqIndex / 8);
        if ((moving.color === "w" && toR === 0) || (moving.color === "b" && toR === 7)) {
          newBoard[sqIndex] = { type: "Q", color: moving.color };
        }
      }

      // Update state
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
    setLastState(null);
    setUndoneState(null);
    setLastMove(null);
  };

  const undo = () => {
    if (!lastState) return;
    
    // Save current state for redo
    setUndoneState({
      board: [...board],
      turn
    });
    
    // Restore previous state
    setBoard(lastState.board);
    setTurn(lastState.turn);
    setSelected(null);
    setLegal([]);
    
    // Clear last state (can't undo again)
    setLastState(null);
  };

  const redo = () => {
    if (!undoneState) return;
    
    // Restore undone state
    setBoard(undoneState.board);
    setTurn(undoneState.turn);
    setSelected(null);
    setLegal([]);
    
    // Clear redo state
    setUndoneState(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Simple Chess</h1>
          <div className="flex items-center justify-center gap-4">
            <div className="text-lg font-medium text-gray-700">
              Turn: <span className="font-bold">{turn === "w" ? "White" : "Black"}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
          {/* Chess Board */}
          <div className="relative">
            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
              <div className="grid grid-cols-8 gap-0 w-fit mx-auto border border-gray-300 rounded overflow-hidden">
                {board.map((sq, i) => {
                  const row = Math.floor(i / 8);
                  const col = i % 8;
                  const isDark = (row + col) % 2 === 1;
                  
                  return (
                    <ChessSquare
                      key={i}
                      square={sq}
                      index={i}
                      isDark={isDark}
                      isSelected={selected === i}
                      isLegal={legal.includes(i)}
                      isLastFrom={!!(lastMove && lastMove[0] === i)}
                      isLastTo={!!(lastMove && lastMove[1] === i)}
                      onClick={handleSquareClick}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="w-full lg:w-72">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
              {/* Game Status */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-800 mb-3">Game Status</h2>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Turn:</span>
                    <div className={`px-3 py-1 rounded ${turn === "w" ? "bg-gray-100 text-gray-800" : "bg-gray-800 text-white"}`}>
                      {turn === "w" ? "White" : "Black"}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Can Undo:</span>
                    <span className={`px-2 py-1 rounded text-sm ${lastState ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"}`}>
                      {lastState ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Can Redo:</span>
                    <span className={`px-2 py-1 rounded text-sm ${undoneState ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-500"}`}>
                      {undoneState ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-800 mb-3">Actions</h2>
                <div className="space-y-3">
                  <button
                    onClick={reset}
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                  >
                    New Game
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={undo}
                      disabled={!lastState}
                      className={`font-medium py-2.5 px-4 rounded-lg transition-colors ${
                        lastState 
                          ? "bg-red-100 hover:bg-red-200 text-red-800" 
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Undo
                    </button>
                    <button
                      onClick={redo}
                      disabled={!undoneState}
                      className={`font-medium py-2.5 px-4 rounded-lg transition-colors ${
                        undoneState 
                          ? "bg-blue-100 hover:bg-blue-200 text-blue-800" 
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Redo
                    </button>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3">How to Play</h2>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                    <p>Click a piece to select it</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                    <p>Click highlighted squares to move</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 shrink-0"></div>
                    <p>Pawns promote to Queens automatically</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                    <p>Undo/Redo only works for last move</p>
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