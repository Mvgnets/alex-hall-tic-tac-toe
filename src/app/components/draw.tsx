export default function Draw({
  handleBoardReset,
}: {
  handleBoardReset(): void;
}) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full">
      <h2 className="text-3xl font-bold w-full text-center">Draw!</h2>
      <button
        className="bg-slate-500 rounded p-2 self-center text-xl"
        onClick={() => handleBoardReset()}
      >
        Reset
      </button>
    </div>
  );
}
