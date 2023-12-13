import Image from "next/image";
import beerLogo from "../../../public/logo.svg";

export function Logo() {
  return (
    <section>
      <div className="flex flex-col items-center justify-center">
        <Image alt="Beer Logo" src={beerLogo as string} objectFit="contain" />
      </div>
    </section>
  );
}
