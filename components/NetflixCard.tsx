'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Play, Plus, ChevronDown } from 'lucide-react';
import { tmdbFetch } from '../lib/tmdb';

export default function NetflixCard({ item }: { item: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const [trailer, setTrailer] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Determine path safely
  const mediaType = item.media_type || (item.first_air_date ? 'tv' : 'movie');
  const pathPrefix = mediaType === 'movie' ? 'movies' : 'tv';
  const detailsPath = `/${pathPrefix}/${item.id}`;

  const handleMouseEnter = () => {
    // FIX: Delay increased to 3 seconds (3000ms)
    timerRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 3000); 
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsHovered(false);
  };

  useEffect(() => {
    if (isHovered && !trailer) {
      tmdbFetch<any>(`${mediaType}/${item.id}`, { append_to_response: 'videos' })
        .then((data) => {
          if(data.genres) setGenres(data.genres.slice(0, 3).map((g: any) => g.name));
          const vid = data.videos?.results?.find(
            (v: any) => v.type === 'Trailer' || v.type === 'Teaser'
          );
          if (vid?.key) setTrailer(vid.key);
        })
        .catch(() => {});
    }
  }, [isHovered, item.id, mediaType, trailer]);

  return (
    <div 
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:z-50"
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Main Link Wrapper - Make the whole card clickable */}
      <Link href={detailsPath} className="absolute inset-0 z-10">
        <span className="sr-only">View {item.title}</span>
      </Link>

      <div className="relative h-full w-full rounded-sm object-cover md:rounded">
         <img
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`}
          alt={item.title}
          className="rounded-sm object-cover md:rounded w-full h-full"
        />
      </div>

      {/* 2. Expanded Card */}
      {isHovered && (
        <div className="absolute top-[-20%] left-[-10%] z-50 w-[120%] rounded-md bg-[#181818] shadow-2xl transition-all duration-300 animate-in fade-in zoom-in-95 hidden md:block">
          <div className="relative h-40 w-full overflow-hidden rounded-t-md">
            {trailer ? (
              <iframe
                src={`https://www.youtube.com/embed/${trailer}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1`}
                // FIX: pointer-events-none ensures clicks go to the parent Link/Div, not the iframe
                className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none scale-125"
                allow="autoplay; encrypted-media"
              />
            ) : (
               <img
                src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="p-4 shadow-lg bg-[#181818] rounded-b-md relative z-20">
             <div className="flex items-center justify-between mb-3">
               <div className="flex gap-2">
                 {/* Explicit Link on Play Button too */}
                 <Link href={detailsPath} className="flex items-center justify-center h-8 w-8 rounded-full bg-white hover:bg-gray-200 transition">
                   <Play className="h-4 w-4 fill-black text-black ml-0.5" />
                 </Link>
                 <button className="h-8 w-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white text-gray-400 hover:text-white">
                   <Plus className="h-4 w-4" />
                 </button>
               </div>
             </div>
             <div className="flex flex-wrap gap-x-2 text-xs text-white">
               {genres.join(' • ')}
             </div>
          </div>
        </div>
      )}
    </div>
  );
}