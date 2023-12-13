import Link from "next/link";

export default async function Navbar() {
  return (
    <div className="navbar sticky top-0 bg-black">
      <div className="flex-1 items-center justify-center md:items-start md:justify-start">
        <a
          className="ml-2 bg-transparent text-3xl font-bold text-white"
          href="/"
        >
          JV PLÜTTERVOU
        </a>
      </div>
    </div>
  );
}
