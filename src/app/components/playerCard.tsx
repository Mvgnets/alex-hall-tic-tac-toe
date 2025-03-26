import { SetStateAction } from "react";

export default function PlayerCard({
  playerNumber,
  playerScore,
  selectInstrument,
  instrument
}: {
  playerNumber: number;
  playerScore: number;
  selectInstrument: (value: SetStateAction<string>) => void;
  instrument: string;
}) {
  return (
    <div
      className={`h-52 pt-4 px-5 text-black text-center ${
        playerNumber === 1 ? "bg-blue-600 ml-4" : "bg-red-600 mr-4"
      } rounded  mt-4 flex flex-col gap-4 border-4 border-slate-900`}
    >
      <div className="font-bold">{`Player ${playerNumber}`}</div>
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
  );
}
