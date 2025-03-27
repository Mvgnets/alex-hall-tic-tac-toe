import { renderValue } from "../utils/global";

interface ICellProps {
  index: number;
  handleClick(index: number): void;
  board: (number | null)[];
  player1Instrument: string;
  player2Instrument: string;
}

export default function Cell({
  index,
  handleClick,
  board,
  player1Instrument,
  player2Instrument,
}: ICellProps) {
  return (
    <div className="flex items-center justify-center">
      <button
        className="text-6xl font-bold flex items-center justify-center w-22 h-22 md:w-30 md:h-30 bg-black rounded shadow-lg shadow-black"
        onClick={() => handleClick(index)}
      >
        {renderValue(board[index], player1Instrument, player2Instrument)}
      </button>
    </div>
  );
}
