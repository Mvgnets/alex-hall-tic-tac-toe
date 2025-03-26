"use client";
import { useCallback, useEffect, useState } from "react";
import PlayerCard from "./components/playerCard";
import { noteHandler, renderColour, renderValue } from "./utils/global";

export default function Home() {
  const initialState = [null, null, null, null, null, null, null, null, null];
  const [playerNumber, setPlayerNumber] = useState(1);
  const [winner, setWinner] = useState<number | null>(null);
  const [board, setBoard] = useState<(number | null)[]>(initialState);
  const [player1Instrument, setPlayer1Instrument] = useState("Guitar");
  const [player2Instrument, setPlayer2Instrument] = useState("Guitar");
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const isBoardFull = board.every((value) => value !== null);

  function handleClick(index: number) {
    noteHandler(
      index,
      playerNumber === 1 ? player1Instrument : player2Instrument
    );
    setBoard(board.map((value, i) => (i === index ? playerNumber : value)));
    setPlayerNumber(playerNumber === 1 ? 2 : 1);
  }

  function handleBoardReset() {
    if (winner === 1) {
      setPlayer1Score(player1Score + 1);
    }
    if (winner === 2) {
      setPlayer2Score(player2Score + 1);
    }
    setBoard(initialState);
    setPlayerNumber(1);
    setWinner(null);
  }

  const winningChord = useCallback(
    (index1: number, index2: number, index3: number, instrument: string) => {
      noteHandler(index1, instrument);
      noteHandler(index2, instrument);
      noteHandler(index3, instrument);
    },
    []
  );

  const checkWinner = useCallback(() => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setPlayerNumber(board[a]);
        if (board[a] === 1) {
          winningChord(a, b, c, player1Instrument);
        } else if (board[a] === 2) {
          winningChord(a, b, c, player2Instrument);
        }
        return board[a];
      }
    }
    return null;
  }, [board, winningChord]);

  useEffect(() => {
    checkWinner();
  }, [board, checkWinner]);

  function Cell({ index }: { index: number }) {
    return (
      <div className="flex items-center justify-center">
        <button
          className="text-6xl font-bold flex items-center justify-center w-30 h-30 bg-black rounded"
          onClick={() => handleClick(index)}
        >
          {renderValue(board[index], player1Instrument, player2Instrument)}
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center w-full">Tic Tac Toe</h1>

        {winner ? (
          <div className="flex flex-col gap-4">
            <h2
              className={`text-3xl font-bold w-full text-center ${
                winner === 1 ? "text-blue-600" : "text-red-600"
              }`}
            >
              The winner is player {winner}!
            </h2>
            <button
              className="bg-slate-500 rounded p-2 self-center text-xl"
              onClick={() => handleBoardReset()}
            >
              Reset
            </button>
          </div>
        ) : isBoardFull ? (
          <div className="flex flex-col gap-4 justify-center items-center w-full">
            <h2 className="text-3xl font-bold w-full text-center">
              Draw!
            </h2>
            <button
              className="bg-slate-500 rounded p-2 self-center text-xl"
              onClick={() => handleBoardReset()}
            >
              Reset
            </button>
          </div>
        ) : (
          <div className={`${renderColour(playerNumber)} rounded`}>
            <div className="grid grid-cols-5 grid-rows-1 gap-2">
              <PlayerCard
                playerNumber={1}
                playerScore={player1Score}
                instrument={player1Instrument}
                selectInstrument={setPlayer1Instrument}
              />
              <div className="col-span-3 grid grid-cols-3 gap-y-6 gap-x-0 my-4">
                <Cell index={0} />
                <Cell index={1} />
                <Cell index={2} />
                <Cell index={3} />
                <Cell index={4} />
                <Cell index={5} />
                <Cell index={6} />
                <Cell index={7} />
                <Cell index={8} />
              </div>
              <PlayerCard
                playerNumber={2}
                playerScore={player2Score}
                instrument={player2Instrument}
                selectInstrument={setPlayer2Instrument}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
