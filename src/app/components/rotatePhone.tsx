import Image from "next/image";

export default function RotatePhone() {
  return (
    <div className="flex flex-col mt-4 min-h-screen text-slate-700 text-center gap-4">
      <h1 className="text-2xl font-bold">
        Please rotate your device to landscape mode
      </h1>
      <Image
        src="/rotate-phone.svg"
        alt="icon"
        width={100}
        height={100}
        className={"self-center"}
      />
    </div>
  );
}
