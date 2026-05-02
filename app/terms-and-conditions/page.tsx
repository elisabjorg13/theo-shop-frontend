import Link from "next/link";

export default function TermsAndConditionsPage() {
  return (
    <div className="h-screen bg-white relative overflow-hidden">
      {/* Top navigation bar */}
      <div
        className="absolute"
        style={{
          top: "15px",
          left: 0,
          width: "100vw",
          height: "40px",
          zIndex: 15,
          borderBottom: "1px solid black",
        }}
      >
        <div className="flex justify-end items-center h-full gap-6 pr-10 font-amaranth font-bold">
          <Link
            href="/archive"
            className="text-black text-md md:text-lg hover:underline cursor-pointer"
          >
            ARCHIVE
          </Link>
          <Link
            href="/about"
            className="text-black text-md md:text-lg hover:underline cursor-pointer"
          >
            ABOUT
          </Link>
          <Link
            href="/"
            className="text-black text-md md:text-lg hover:underline cursor-pointer"
          >
            SHOP
          </Link>
        </div>
      </div>

      {/* White cover below bottom border so nothing shows under the line */}
      <div
        className="absolute"
        style={{
          top: "calc(135px + 75vh + 40px)",
          left: 0,
          width: "100vw",
          bottom: 0,
          backgroundColor: "white",
          borderTop: "1px solid black",
          zIndex: 15,
        }}
      />

      {/* Terms image in a scrollable area */}
      <div
        className="absolute"
        style={{
          top: "55px",
          left: "5vw",
          width: "90vw",
          height: "calc(135px + 75vh + 40px - 55px)",
          zIndex: 10,
        }}
      >
        <div className="h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide touch-scroll px-2 md:px-30">
          {/* File name includes a space; keep it exactly as in /public */}
          <img
            src="/_T+C_ PAGE.png"
            alt="Terms and conditions"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}

