import Image from "next/image";

export function noteHandler(index: number, instrument: string) {
  const audio = new Audio();
  switch (index) {
    case 0:
      audio.src = `/samples/tic-tac-toe-${instrument}-C3.mp3`;
      break;
    case 1:
      audio.src = `/samples/tic-tac-toe-${instrument}-E3.mp3`;
      break;
    case 2:
      audio.src = `/samples/tic-tac-toe-${instrument}-G3.mp3`;
      break;
    case 3:
      audio.src = `/samples/tic-tac-toe-${instrument}-C2.mp3`;
      break;
    case 4:
      audio.src = `/samples/tic-tac-toe-${instrument}-E2.mp3`;
      break;
    case 5:
      audio.src = `/samples/tic-tac-toe-${instrument}-G2.mp3`;
      break;
    case 6:
      audio.src = `/samples/tic-tac-toe-${instrument}-C1.mp3`;
      break;
    case 7:
      audio.src = `/samples/tic-tac-toe-${instrument}-E1.mp3`;
      break;
    case 8:
      audio.src = `/samples/tic-tac-toe-${instrument}-G1.mp3`;
      break;
    default:
      return;
  }
  audio.play();
}

export function renderColour(playerNumber: number) {
  if (playerNumber === 1) {
    return "bg-linear-to-t from-blue-800 to-blue-600 transition-colors duration-500";
  }
  if (playerNumber === 2) {
    return "bg-linear-to-t from-red-800 to-red-600 transition-colors duration-500";
  }
  return "bg-black";
}

export function renderValue(
  value: number | null,
  player1Instrument: string,
  player2Instrument: string
) {
  if (value === 1) {
    return renderIcon(player1Instrument, value);
  } else if (value === 2) {
    return renderIcon(player2Instrument, value);
  } else {
    return "";
  }
}

export function renderIcon(instrument: string, player: number) {
  if (instrument === "Guitar") {
    return (
      <Image
        src="/guitar.svg"
        alt="icon"
        width={100}
        height={100}
        className={player === 1 ? "bg-linear-to-t from-blue-800 to-blue-600" : "bg-linear-to-t from-red-800 to-red-600"}
      />
    );
  }
  if (instrument === "Piano") {
    return (
      <Image
        src="/piano.svg"
        alt="icon"
        width={100}
        height={100}
        className={player === 1 ? "bg-linear-to-t from-blue-800 to-blue-600" : "bg-linear-to-t from-red-800 to-red-600"}
      />
    );
  }
}
