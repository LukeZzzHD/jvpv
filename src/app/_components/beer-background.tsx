import Image from "next/image";

import Schaum from "../../../public/schaum.svg";
import Bier from "../../../public/bier.svg";

export function BeerBackground() {
  return (
    <>
      <div className="absolute z-20 h-screen w-screen">
        <Image alt="Schaum" src={Schaum as string} objectFit="contain" />
      </div>
      <div className="absolute z-10 h-screen w-screen">
        <Image alt="Bier" src={Bier as string} objectFit="contain" />
      </div>
    </>
  );
}
