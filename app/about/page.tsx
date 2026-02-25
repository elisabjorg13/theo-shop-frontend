import Image from "next/image";
import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";
import { createClient } from "../../prismicio";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const client = createClient();
  const info = await client.getSingle("info_text");

  return (
    <div className="min-h-screen bg-white relative">
      {/* Logo overlay */}
      <div
        className="absolute"
        style={{
          top: "120px",
          left: "5vw",
          width: "90vw",
          height: "75vh",
          pointerEvents: "none",
          zIndex: 20,
        }}
      >
        <div
          className="absolute -left-2 md:-left-4"
          style={{ top: "-80px" }}
        >
          <img
            src="/THEO IKE NORTH FINAL LABEL 5 X 2.1CM 1.png"
            alt="THEO IKE"
            className="w-20 md:w-24 h-auto"
          />
        </div>
      </div>

      {/* Shadow Ellipses */}
      <div
        className="absolute"
        style={{
          top: "115px",
          left: "4vw",
          width: "90vw",
          height: "75vh",
          zIndex: 8,
        }}
      >
        <Image
          src="/Ellipse 12.png"
          alt=""
          width={800}
          height={400}
          className="absolute opacity-100"
          style={{
            top: "10px",
            left: "10px",
            width: "60vw",
            height: "50vh",
            filter: "brightness(0.85)",
          }}
        />
        <Image
          src="/Ellipse 12.png"
          alt=""
          width={800}
          height={400}
          className="absolute opacity-100"
          style={{
            bottom: "10px",
            right: "10px",
            width: "60vw",
            height: "50vh",
            filter: "brightness(0.85)",
          }}
        />
      </div>

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
          <span className="text-black text-md md:text-lg">ABOUT</span>
          <Link
            href="/"
            className="text-black text-md md:text-lg hover:underline cursor-pointer"
          >
            SHOP
          </Link>
        </div>
      </div>

      {/* Bottom horizontal border */}
      <div
        className="absolute"
        style={{
          top: "calc(135px + 75vh + 40px)",
          left: 0,
          width: "100vw",
          borderTop: "1px solid black",
          zIndex: 15,
        }}
      />

      {/* Light grid background for about content area */}
      <div
        className="absolute"
        style={{
          top: "55px", // from the bottom of the top border
          left: 0,
          width: "100vw", // span full width between borders
          height: "calc(135px + 75vh + 40px - 55px)", // down to the top of the bottom border
          zIndex: 5,
          backgroundPosition: "bottom left",
          backgroundImage: `
            repeating-linear-gradient(
              180deg,
              transparent 0 calc(80px - 1px),
              #F0F0F0 calc(80px - 1px) 80px
            ),
            repeating-linear-gradient(
              90deg,
              transparent 0 calc(80px - 1px),
              #F0F0F0 calc(80px - 1px) 80px
            )
          `,
        }}
      />

      {/* About text content */}
      <div
        className="absolute"
        style={{
          top: "90px",
          left: "10vw",
          width: "80vw",
          height: "75vh",
          zIndex: 10,
        }}
      >
        <div className="h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide">
          <div className="h-full w-full flex justify-center items-start pt-10 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl text-black text-sm md:text-base leading-relaxed">
              {/* Left column: image */}
              <div className="w-full">
                <Image
                  src="/about.jpg"
                  alt="Studio view"
                  width={900}
                  height={1200}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              {/* Right column: about text from Prismic */}
              <div className="w-full">
                <h1>ABOUT</h1>
                <PrismicRichText field={info.data.info_text} />
                <h1>CONTACT</h1>
                <p>General inquiries: hello@theoike.com</p>
                <p>Instagram: @theoike</p>
                <p> © Theo Ike 2026</p>
                <p>Website by WFH Studio</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

