import { SetStateAction } from "react";

export default function PlayerCard({
  playerNumber,
  playerScore,
  selectInstrument,
  instrument,
}: {
  playerNumber: number;
  playerScore: number;
  selectInstrument: (value: SetStateAction<string>) => void;
  instrument: string;
}) {
  return (
    <div
      className={`h-50 pt-4  text-black text-center ${
        playerNumber === 1 ? "bg-linear-to-t from-blue-800 to-blue-600 ml-4" : "bg-linear-to-t from-red-800 to-red-600 mr-4"
      } rounded  mt-4 flex flex-col gap-3 border-2 border-slate-900 shadow-lg shadow-black`}
    >
      <div className="font-bold border-b-2 w-full pb-2">{`Player ${playerNumber}`}</div>
      <div className="px-5 gap-1 flex flex-col">
        <div>
          <div>Score</div>
          <div className="bg-black text-white">{playerScore}</div>
        </div>
        <div>
          <div>Instrument</div>
          <select
            className="bg-black text-white rounded p-2"
            onChange={(e) => selectInstrument(e.target.value)}
            value={instrument}
          >
            <option value="Guitar">Guitar</option>
            <option value="Piano">Piano</option>
          </select>
        </div>
      </div>
    </div>
  );
}
