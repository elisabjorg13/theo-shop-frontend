import Image from "next/image";

// Type definitions for better type safety
interface Product {
  title: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    nodes: Array<{
      url: string;
    }>;
  };
}

interface GraphQLResponse {
  data?: {
    products?: {
      nodes: Product[];
    };
  };
}

// Force dynamic rendering to avoid build-time errors
export const dynamic = 'force-dynamic';

export default async function Home() {
  // STEP 1: Security check - make sure we have the required environment variables
  if (!process.env.SHOPIFY_STORE_DOMAIN || !process.env.SHOPIFY_STOREFRONT_TOKEN) {
    throw new Error('Missing required Shopify environment variables');
  }

  // STEP 2: Make the GraphQL request to Shopify
  const res = await fetch(
    // Build URL from environment variable (e.g., "https://my-store.myshopify.com/api/2024-07/graphql.json")
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-07/graphql.json`,
    {
      // GraphQL always uses POST method (even for reading data)
      method: "POST",
      headers: {
        // Tell server we're sending JSON data
        "Content-Type": "application/json",
        // Authenticate with Shopify using our secret token
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN,
      },
      // The GraphQL query - gets first 5 products with title, handle, price, and first image
      body: JSON.stringify({
        query: `{ products(first: 5) { nodes { title handle priceRange { minVariantPrice { amount currencyCode } } images(first:1){nodes{url}} } } }`,
      }),
      // Next.js caching - revalidate every 10 seconds for fresh data
      next: { revalidate: 10 },
      // Security timeout - kill request if it takes longer than 10 seconds
      signal: AbortSignal.timeout(10000),
    }
  );

  // STEP 3: Check if the request was successful
  if (!res.ok) {
    // Don't expose full error details to avoid leaking sensitive info
    throw new Error(`Failed to fetch products: ${res.status}`);
  }
  
  // STEP 4: Parse the JSON response into JavaScript objects
  const data: GraphQLResponse = await res.json();
  
  // STEP 5: Extract products safely - use empty array if data is missing
  // The ?. operator prevents crashes if any part of the nested structure is undefined
  const products: Product[] = data?.data?.products?.nodes ?? [];

  return (
    <div className="min-h-screen bg-white relative">
      {/* Grid Background using CSS custom properties */}
      <div
        className="absolute border-1 border-black"
        style={{
          top: '120px',
          left: '5vw',
          width: '90vw',
          height: '75vh',
          backgroundPosition: 'bottom left',
          // draw lines from bottom-left, so grid "grows" from bottom-left
          backgroundImage: `
            repeating-linear-gradient(
              180deg,
              transparent 0 calc(40px - 1px),
              rgba(0,0,0,1) calc(40px - 1px) 40px
            ),
            repeating-linear-gradient(
              90deg,
              transparent 0 calc(40px - 1px),
              rgba(0,0,0,1) calc(40px - 1px) 40px
            )
          `,
        }}
      />
      
      {/* Corner Circles */}
      <div
        className="absolute"
        style={{
          top: '120px',
          left: '5vw',
          width: '90vw',
          height: '75vh',
          pointerEvents: 'none'
        }}
      >
        {/* Top Left */}
        <div
          className="absolute w-5 h-5 bg-white border border-black rounded-full"
          style={{ top: '-6px', left: '-6px' }}
        />
        {/* Top Right */}
        <div
          className="absolute w-5 h-5 bg-white border border-black rounded-full"
          style={{ top: '-6px', right: '-6px' }}
        />
        {/* Bottom Left */}
        <div
          className="absolute w-5 h-5 bg-white border border-black rounded-full"
          style={{ bottom: '-6px', left: '-6px' }}
        />
        {/* Bottom Right */}
        <div
          className="absolute w-5 h-5 bg-white border border-black rounded-full"
          style={{ bottom: '-6px', right: '-6px' }}
        />
        
        {/* Globe on Top Border */}
        <div
          className="absolute flex items-center justify-center"
          style={{ top: '-23px', left: '50%', transform: 'translateX(-50%)' }}
        >
            <img
              src="/globe.png"
              alt="Globe"
              className="w-12 h-12 bg-white rounded-full"
            />
        </div>
        
        {/* THEO IKE Logo - Top Left */}
        <div
          className="absolute -left-2 md:-left-4"
          style={{ top: '-60px' }}
        >
          <img
            src="/THEO IKE NORTH FINAL LABEL 5 X 2.1CM 1.png"
            alt="THEO IKE"
            className="w-20 md:w-24 h-auto"
          />
        </div>
        
        {/* Compass Directions - N, W, E, S */}
        {/* North */}
        <div
          className="absolute text-gray-100 font-bold text-3xl md:text-5xl"
          style={{ top: '20px', left: '50%', transform: 'translateX(-50%)' }}
        >
          N
        </div>
        
        {/* West */}
        <div
          className="absolute text-gray-100 font-bold text-3xl md:text-5xl"
          style={{ top: '50%', left: '20px', transform: 'translateY(-50%)' }}
        >
          W
        </div>
        
        {/* East */}
        <div
          className="absolute text-gray-100 font-bold text-3xl md:text-5xl"
          style={{ top: '50%', right: '20px', transform: 'translateY(-50%)' }}
        >
          E
        </div>
        
        {/* South */}
        <div
          className="absolute text-gray-100 font-bold text-3xl md:text-5xl"
          style={{ bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}
        >
          S
        </div>
      </div>
      
      {/* Shadow Ellipses - Under clothes */}
      <div
        className="absolute"
        style={{
          top: '115px',
          left: '4vw',
          width: '90vw',
          height: '75vh',
          zIndex: 8
        }}
      >
        {/* Top Left Shadow */}
        <Image
          src="/Ellipse 12.png"
          alt=""
          width={800}
          height={400}
          className="absolute opacity-100"
          style={{ 
            top: '10px', 
            left: '10px', 
            width: '60vw', 
            height: '50vh',
            filter: 'brightness(0.85)'
          }}
        />
        {/* Bottom Right Shadow */}
        <Image
          src="/Ellipse 12.png"
          alt=""
          width={800}
          height={400}
          className="absolute opacity-100"
          style={{ 
            bottom: '10px', 
            right: '10px', 
            width: '60vw', 
            height: '50vh',
            filter: 'brightness(0.85)'
          }}
        />
      </div>

      {/* Products Grid - Same size as background grid */}
      <div
        className="absolute"
        style={{
          top: '120px',
          left: '5vw',
          width: '90vw',
          height: '72.2vh',
          zIndex: 10
        }}
      >
        <div className="h-full flex flex-col justify-start items-start mt-5 md:mt-15 overflow-y-auto overflow-x-hidden scrollbar-hide">
          {/* Desktop: 3 columns, Mobile: 1 column */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full p-4">
            {products.map((p: Product) => (
              <div key={p.handle} className="flex flex-col items-center p-2">
                {/* Product Image with Hover Price Overlay - Clickable */}
                <a
                  href={`https://${process.env.NEXT_PUBLIC_SHOP_DOMAIN}/products/${p.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mb-3 group block"
                >
                  {p.images.nodes[0] ? (
                    <img
                      src={p.images.nodes[0].url}
                      alt={p.title}
                      className="w-40 h-40 md:w-50 md:h-50 object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                  
                  {/* Price Overlay - Only visible on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-white text-shadow-[0_0_1px_#000,0_0_1px_#000,0_0_1px_#000,0_0_1px_#000] font-bold text-2xl bg-opacity-80 px-3 py-1">
                      {p.priceRange.minVariantPrice.amount} {p.priceRange.minVariantPrice.currencyCode}
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
