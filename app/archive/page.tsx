import Image from "next/image";
import Link from "next/link";
import ManifestoModal from "../ManifestoModal";
import { createClient } from "../../prismicio";

export const dynamic = "force-dynamic";

export default async function ArchivePage() {
  const client = createClient();
  const archiveImages = await client.getAllByType("archive_image");

  return (
    <div className="min-h-screen bg-white relative">
      {/* Logo overlay */}
      <div
        className="absolute"
        style={{
          top: "120px", // vertical position of the logo block (relative to page top)
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
          top: "115px", // vertical position of the shadow ellipses block
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
          top: "15px", // distance from very top of page to top nav bar
          left: 0,
          width: "100vw",
          height: "40px",
          zIndex: 15,
          borderBottom: "1px solid black",
        }}
      >
        <div className="flex justify-end items-center h-full gap-6 pr-10 font-amaranth font-bold">
          <span className="text-black text-md md:text-lg">ARCHIVE</span>
          <ManifestoModal />
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
          top: "calc(135px + 75vh + 40px)", // vertical position of bottom border line
          left: 0,
          width: "100vw",
          borderTop: "1px solid black",
          zIndex: 15,
        }}
      />

      {/* Archive images layout inside grid */}
      <div
        className="absolute"
        style={{
          top: "55px", // top edge of the scrollable archive images region
          left: "5vw",
          width: "90vw",
          height: "90.1vh",
          zIndex: 10,
        }}
      >
        <div className="h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide px-2 md:px-30 ">
          {/* pt-10 = inner top padding inside the scrollable area */}
          {archiveImages.map((doc, index) => {
            const isLeft = index % 2 === 0;
            const isLast = index === archiveImages.length - 1;

            // Stronger overlap and less vertical space between images
            const marginBottom = isLast ? "0px" : "-10rem";

            const imageUrl = doc.data.archive_image.url;
            if (!imageUrl) return null;

            return (
              <div
                key={doc.id}
                style={{ marginBottom }}
              >
                <div
                  className={`flex ${
                    isLeft ? "justify-start" : "justify-end"
                  }`}
                >
                  <img
                    src={imageUrl}
                    alt={doc.data.image_title ?? "Archive image"}
                    className="w-80 md:w-[28rem] object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


