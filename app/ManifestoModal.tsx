'use client';

import { useState } from 'react';

export default function ManifestoModal() {
  const [showManifesto, setShowManifesto] = useState(false);

  return (
    <>
      {/* Manifesto Button */}
      <p 
        className="text-black text-md md:text-lg hover:underline cursor-pointer"
        onClick={() => setShowManifesto(true)}
      >
        Manifesto
      </p>

      {/* Manifesto Modal Overlay */}
      {showManifesto && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={() => setShowManifesto(false)}
        >
          <div
            className="relative max-w-2xl h-[100vh] overflow-auto scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            {/* X Button */}
            <button
              onClick={() => setShowManifesto(false)}
              className="absolute top-4 right-4 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 z-10"
            >
              ×
            </button>
            
            {/* Manifesto Image */}
            <img
              src="/TheoManifesto.png"
              alt="Theo Manifesto"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </>
  );
}
