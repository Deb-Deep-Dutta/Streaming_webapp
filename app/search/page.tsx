'use client';

import { useState, useEffect } from 'react';
import { tmdbFetch } from '../../lib/tmdb';
import Link from 'next/link';
import { Search as SearchIcon, X, SlidersHorizontal } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length > 2) {
        setLoading(true);
        tmdbFetch<any>('search/multi', { query, page: 1 })
          .then((data) => {
            const filtered = data.results.filter((i: any) => i.media_type !== 'person');
            setResults(filtered);
          })
          .finally(() => setLoading(false));
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="min-h-screen pt-24 px-4 md:px-12 bg-[#141414] text-white">
      {/* Search Input Bar */}
      <div className="flex items-center justify-center gap-4 mb-10 max-w-4xl mx-auto">
        <div className="relative flex-grow group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-6 w-6 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-10 py-4 rounded-full bg-[#2b2b2b] border border-transparent focus:border-white/50 focus:bg-[#333] text-white text-lg placeholder-gray-500 focus:outline-none transition-all"
            placeholder="Movies, TV shows, Genres..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Advanced Search Button */}
        <button className="flex items-center gap-2 px-6 py-4 bg-[#2b2b2b] hover:bg-[#404040] rounded-full text-gray-300 hover:text-white transition font-medium whitespace-nowrap">
          <SlidersHorizontal className="w-5 h-5" />
          <span className="hidden md:inline">Filters</span>
        </button>
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="text-center text-gray-500 animate-pulse mt-10">Searching...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 pb-20">
          {results.map((item) => {
            // --- CRITICAL FIX: Ensure correct path ---
            const mediaType = item.media_type === 'movie' ? 'movies' : 'tv';
            
            return (
              <Link 
                href={`/${mediaType}/${item.id}`} // Points to /movies/ or /tv/
                key={item.id}
                className="group relative aspect-[2/3] bg-gray-800 rounded-md overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                {item.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title || item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 text-xs p-2 text-center bg-gray-900">
                    {item.title || item.name}
                  </div>
                )}
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                  <p className="font-bold text-sm mb-2 text-white">{item.title || item.name}</p>
                  <span className="text-xs text-green-400 font-semibold">
                    {item.vote_average ? `${item.vote_average.toFixed(1)} Rating` : 'No Rating'}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      
      {!loading && results.length === 0 && query.length > 2 && (
        <div className="text-center text-gray-500 mt-10">No results found for "{query}"</div>
      )}
    </div>
  );
}