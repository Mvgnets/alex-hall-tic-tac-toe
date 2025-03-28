"use client";
import { useCallback, useEffect, useState } from "react";
import PlayerCard from "./components/playerCard";
import { noteHandler, renderColour } from "./utils/global";
import Winner from "./components/winner";
import Draw from "./components/draw";
import Cell from "./components/cell";
import RotatePhone from "./components/rotatePhone";

export default function Home() {
  const initialState = [null, null, null, null, null, null, null, null, null];
  const [playerNumber, setPlayerNumber] = useState(1);
  const [winner, setWinner] = useState<number | null>(null);
  const [board, setBoard] = useState<(number | null)[]>(initialState);
  const [player1Instrument, setPlayer1Instrument] = useState("Guitar");
  const [player2Instrument, setPlayer2Instrument] = useState("Guitar");
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [isLandscape, setIsLandscape] = useState(true);
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

  const checkWinner = useCallback(() => {
    function winningChord(
      index1: number,
      index2: number,
      index3: number,
      instrument: string
    ) {
      setTimeout(() => noteHandler(index1, instrument), 500);
      setTimeout(() => noteHandler(index2, instrument), 750);
      setTimeout(() => noteHandler(index3, instrument), 1000);
    }
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
  }, [board, player1Instrument, player2Instrument]);

  useEffect(() => {
    checkWinner();
  }, [board, checkWinner]);


  //test

  useEffect(() => {
    const checkOrientation = () => {
      const isLandscapeMode = window.matchMedia(
        "(orientation: landscape)"
      ).matches;
      setIsLandscape(isLandscapeMode);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => {
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 lg:gap-16 lg:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col lg:gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl lg:text-4xl font-bold text-center w-full">
          Tic Tac Toe
        </h1>
        {!isLandscape ? (
          <RotatePhone />
        ) : winner ? (
          <Winner winner={winner} handleBoardReset={handleBoardReset} />
        ) : isBoardFull ? (
          <Draw handleBoardReset={handleBoardReset} />
        ) : (
          <div
            className={`${renderColour(
              playerNumber
            )} rounded shadow-lg shadow-slate-700 dark:shadow-none`}
          >
            <div className="grid grid-cols-5 grid-rows-1 lg:gap-2">
              <PlayerCard
                playerNumber={1}
                playerScore={player1Score}
                instrument={player1Instrument}
                selectInstrument={setPlayer1Instrument}
              />
              <div className="col-span-3 grid grid-cols-3 gap-y-4 lg:gap-y-6 gap-x-0 my-4">
                <Cell
                  index={0}
                  handleClick={handleClick}
                  board={board}
                  player1Instrument={player1Instrument}
                  player2Instrument={player2Instrument}
                />
                <Cell
                  index={1}
                  handleClick={handleClick}
                  board={board}
                  player1Instrument={player1Instrument}
                  player2Instrument={player2Instrument}
                />
                <Cell
                  index={2}
                  handleClick={handleClick}
                  board={board}
                  player1Instrument={player1Instrument}
                  player2Instrument={player2Instrument}
                />
                <Cell
                  index={3}
                  handleClick={handleClick}
                  board={board}
                  player1Instrument={player1Instrument}
                  player2Instrument={player2Instrument}
                />
                <Cell
                  index={4}
                  handleClick={handleClick}
                  board={board}
                  player1Instrument={player1Instrument}
                  player2Instrument={player2Instrument}
                />
                <Cell
                  index={5}
                  handleClick={handleClick}
                  board={board}
                  player1Instrument={player1Instrument}
                  player2Instrument={player2Instrument}
                />
                <Cell
                  index={6}
                  handleClick={handleClick}
                  board={board}
                  player1Instrument={player1Instrument}
                  player2Instrument={player2Instrument}
                />
                <Cell
                  index={7}
                  handleClick={handleClick}
                  board={board}
                  player1Instrument={player1Instrument}
                  player2Instrument={player2Instrument}
                />
                <Cell
                  index={8}
                  handleClick={handleClick}
                  board={board}
                  player1Instrument={player1Instrument}
                  player2Instrument={player2Instrument}
                />
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
