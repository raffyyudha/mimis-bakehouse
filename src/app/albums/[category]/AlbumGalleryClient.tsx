"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface AlbumGalleryClientProps {
  category: string;
  displayName: string;
  photos: string[];
}

export default function AlbumGalleryClient({ category, displayName, photos }: AlbumGalleryClientProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#faf6f0] text-gray-800 font-sans pb-24">
      {/* Premium Header */}
      <header className="bg-[#dbe3ee]/60 backdrop-blur-md sticky top-0 z-40 py-5 border-b border-[#e6dace]/40">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#c084a0] transition"
          >
            <span>←</span> Back to Home
          </Link>
          <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Mon Chéri Bake</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#2e2b2d] tracking-wide mb-3">{displayName}</h1>
          <p className="text-gray-500 text-sm md:text-base font-medium">
            {photos.length === 0 ? "Empty Album" : `${photos.length} photos in this album`}
          </p>
          <div className="w-20 h-1 bg-[#c084a0] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Gallery Grid */}
        {photos.length === 0 ? (
          <div className="max-w-md mx-auto bg-white/60 backdrop-blur-sm border border-dashed border-[#e6dace] rounded-2xl p-12 text-center shadow-sm">
            <div className="text-4xl mb-4">📷</div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">No photos in this album yet</h3>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              Drop your JPEG/PNG/WebP photos inside the folder:
            </p>
            <code className="block bg-gray-100 rounded text-xs px-2 py-1.5 mt-3 select-all font-mono text-[#c084a0]">
              public/albums/{category}/
            </code>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((photo, index) => (
              <div 
                key={photo}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative aspect-square bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-gray-100"
              >
                <Image 
                  src={photo} 
                  alt={`${displayName} photo ${index + 1}`} 
                  fill
                  className="object-cover group-hover:brightness-95 transition-all duration-300"
                  sizes="(max-w-768px) 50vw, (max-w-1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    View Photo 🔍
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedPhoto(null)}
        >
          <button 
            type="button" 
            className="absolute top-6 right-6 text-white hover:text-gray-300 text-3xl font-light focus:outline-none transition"
            onClick={() => setSelectedPhoto(null)}
          >
            &times;
          </button>
          
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center">
            <Image 
              src={selectedPhoto} 
              alt="Fullscreen photo" 
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
