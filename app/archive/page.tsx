import Image from "next/image";
import Link from "next/link";
import { createClient } from "../../prismicio";

export const dynamic = "force-dynamic";

export default async function ArchivePage() {
  const client = createClient();
  const archiveImages = await client.getAllByType("archive_image");
  const featuredOrder = [
    "final-collection-1",
    "final-collection-2",
    "final-collection-3",
    "final-collection-4",
    "final-collection-5",
    "final-collection-6",
    "denmark-spread",
    "denmark-spread-2",
    "cutting-a3-spread",
    "endurance-2022",
    "navy-days-2022",
    "bil-next-2022",
    "cracker-jon-2022",
    "resolution-records-tests",
    "resolution-records-2-2022",
    "resolution-records-2022",
    "mapping-the-mind-2021",
    "bristol-mtm-spread",
    "portfolio-project-2022",
  ];

  // Keep the requested final-collection sequence first, then keep the rest in original API order.
  const sortedArchiveImages = [...archiveImages].sort((a, b) => {
    const aIndex = featuredOrder.indexOf(a.uid ?? "");
    const bIndex = featuredOrder.indexOf(b.uid ?? "");

    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return 0;
  });

  return (
    <div className="h-screen bg-white relative overflow-hidden">
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
        <div className="absolute -left-2 md:-left-4 top-[-70px] md:top-[-82px]">
          <img
            src="/THEO IKE NORTH LABEL copy.png"
            alt="THEO IKE"
            className="w-20 md:w-30 lg:w-28 h-auto"
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
            bottom: "-55px",
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
          <span className="text-black text-md md:text-lg underline underline-offset-4">ARCHIVE</span>
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

      {/* Solid white area below bottom border so nothing shows under the line */}
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

      {/* Archive images layout inside grid */}
      <div
        className="absolute"
        style={{
          top: "55px", // top edge of the scrollable archive images region
          left: "5vw",
          width: "90vw",
          height: "calc(135px + 75vh + 40px - 55px)",
          zIndex: 10,
        }}
      >
        <div className="h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide px-2 md:px-30 pb-24">
          {/* One big vertical column, images slightly overlapping */}
          {sortedArchiveImages.map((doc, index) => {
            const imageUrl = doc.data.archive_image.url;
            if (!imageUrl) return null;

            const marginTop = "0px"; // no overlap, keep strict top-to-bottom order

            return (
              <div
                key={doc.id}
                style={{ marginTop }}
              >
                <div className="flex justify-center">
                  <img
                    src={imageUrl}
                    alt={doc.data.image_title ?? "Archive image"}
                    className="w-full md:w-[54rem] max-w-[54rem] object-cover"
                  />
                </div>
              </div>
            );
          })}

          {/* Terms + copyright as part of scroll content */}
          <div className="w-full pt-6 pb-8">
            <div className="font-amaranth font-bold text-black text-sm md:text-base leading-snug">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <Link href="/terms-and-conditions" className="hover:underline cursor-pointer">
                  Terms and conditions
                </Link>
                <span>©2026 Theo Ike. All Rights Reserved. Powered by WFH Studio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


