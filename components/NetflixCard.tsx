'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { tmdbFetch } from '../lib/tmdb';

export default function NetflixCard({ item }: { item: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const [trailer, setTrailer] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  
  // Decide media type (TMDB sometimes misses this in lists)
  const mediaType = item.media_type || (item.first_air_date ? 'tv' : 'movie');
  const detailsPath = `/${mediaType === 'tv' ? 'tv' : 'movies'}/${item.id}`;

  // Fetch Trailer ONLY when hovered to save data/performance
  useEffect(() => {
    if (isHovered && !trailer) {
      tmdbFetch<any>(`${mediaType}/${item.id}`, { append_to_response: 'videos' })
        .then((data) => {
          // Get Genres
          if(data.genres) setGenres(data.genres.slice(0, 3).map((g: any) => g.name));

          // Get Trailer
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Static Image (Visible normally) */}
      <div className="relative h-full w-full rounded-sm object-cover md:rounded">
         <img
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`}
          alt={item.title}
          className="rounded-sm object-cover md:rounded w-full h-full"
        />
      </div>

      {/* 2. Expanded Hover Card (Absolute overlay) */}
      {isHovered && (
        <div className="absolute top-[-20%] left-[-10%] z-50 w-[120%] rounded-md bg-[#181818] shadow-2xl transition-all duration-300 animate-in fade-in zoom-in-95 invisible md:visible">
          {/* Video / Image Area */}
          <div className="relative h-40 w-full overflow-hidden rounded-t-md">
            {trailer ? (
              <iframe
                src={`https://www.youtube.com/embed/${trailer}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1`}
                className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none scale-125" // Scale to remove YT borders
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

          {/* Action Buttons & Info */}
          <div className="p-4 shadow-lg bg-[#181818] rounded-b-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-2">
                {/* Play Button - Goes to Dedicated Page */}
                <Link href={detailsPath} className="flex items-center justify-center h-8 w-8 rounded-full bg-white hover:bg-gray-200 transition">
                  <Play className="h-4 w-4 fill-black text-black ml-0.5" />
                </Link>
                <button className="h-8 w-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white text-gray-400 hover:text-white">
                  <Plus className="h-4 w-4" />
                </button>
                <button className="h-8 w-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white text-gray-400 hover:text-white">
                  <ThumbsUp className="h-4 w-4" />
                </button>
              </div>
              <Link href={detailsPath} className="h-8 w-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white text-gray-400 hover:text-white ml-auto">
                <ChevronDown className="h-4 w-4" />
              </Link>
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-2 text-xs font-semibold text-white mb-1">
              <span className="text-green-400">{Math.round(item.vote_average * 10)}% Match</span>
              <span className="border border-gray-500 px-1 text-[10px] text-gray-400">HD</span>
            </div>

            <div className="flex flex-wrap gap-x-2 text-xs text-white">
              {genres.map((genre, i) => (
                <span key={i} className="flex items-center">
                  {genre}
                  {i < genres.length - 1 && <span className="text-gray-600 mx-1">•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}