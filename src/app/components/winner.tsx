export default function Winner({
  winner,
  handleBoardReset,
}: {
  winner: number | null;
  handleBoardReset(): void;
}) {
  return (
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
  );
}
