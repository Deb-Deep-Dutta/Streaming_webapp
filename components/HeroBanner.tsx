'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Play, Info } from 'lucide-react';

export default function HeroBanner({ items }: { items: any[] }) {
  const [index, setIndex] = useState(0);

  // Auto-rotate every 8 seconds
  useEffect(() => {
    if (!items || items.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [items]);

  if (!items || items.length === 0) return null;
  const item = items[index];

  return (
    <div className="relative w-full h-[50vh] md:h-[85vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }} // Smooth 1s fade
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
             <img 
               src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} 
               alt={item.title || item.name}
               className="w-full h-full object-cover"
             />
             {/* Gradient Overlay for text readability */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />
             <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/40 to-transparent" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content Layer (Static on top of fade) */}
      <div className="absolute bottom-[20%] left-4 md:left-12 max-w-xl z-10 space-y-4">
        <motion.h1 
          key={`title-${item.id}`} // Re-animate text on change
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl md:text-6xl font-bold text-white drop-shadow-lg"
        >
          {item.title || item.name}
        </motion.h1>

        <p className="text-gray-200 line-clamp-3 md:text-lg drop-shadow-md">
          {item.overview}
        </p>

        <div className="flex gap-3 pt-4">
          <Link 
            href={`/movies/${item.id}?autoplay=true`} 
            className="flex items-center gap-2 bg-white text-black px-6 py-2 md:px-8 md:py-3 rounded hover:bg-white/90 transition font-bold"
          >
            <Play className="fill-black w-5 h-5" /> Play
          </Link>
          <Link 
            href={`/movies/${item.id}`}
            className="flex items-center gap-2 bg-gray-500/70 text-white px-6 py-2 md:px-8 md:py-3 rounded hover:bg-gray-500/50 transition font-bold backdrop-blur-sm"
          >
             <Info className="w-5 h-5" /> More Info
          </Link>
        </div>
      </div>
    </div>
  );
}