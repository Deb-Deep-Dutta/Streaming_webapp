'use client';

import { useState, useEffect } from 'react';
import { tmdbFetch } from '../../lib/tmdb';
import Link from 'next/link';
import { Search as SearchIcon, X, SlidersHorizontal } from 'lucide-react';

const GENRES = [
  { id: 28, name: 'Action' }, { id: 35, name: 'Comedy' }, { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' }, { id: 878, name: 'Sci-Fi' }, { id: 18, name: 'Drama' }
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // If query exists, search. If not, don't clear results if user is clicking filters (logic can be expanded)
      if (query.length > 2) {
        setLoading(true);
        tmdbFetch<any>('search/multi', { query, page: 1 })
          .then((data) => {
            const filtered = data.results.filter((i: any) => i.media_type !== 'person');
            setResults(filtered);
          })
          .finally(() => setLoading(false));
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Mock function to simulate genre filtering
  const handleGenreClick = (genreName: string) => {
    setQuery(genreName); // Simple hack: search for the genre name directly
  };

  return (
    <div className="min-h-screen pt-32 px-4 md:px-12 bg-[#141414] text-white">
      {/* Search Input Bar */}
      <div className="flex flex-col gap-4 mb-10 max-w-5xl mx-auto">
        <div className="flex items-center gap-4 w-full">
            <div className="relative flex-grow group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon className="h-6 w-6 text-gray-400" />
            </div>
            <input
                type="text"
                className="block w-full pl-12 pr-10 py-4 rounded-none md:rounded-full bg-[#2b2b2b] border border-transparent focus:border-gray-500 focus:bg-[#333] text-white text-xl placeholder-gray-500 focus:outline-none transition-all"
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

            {/* Filter Toggle Button */}
            <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-4 rounded-full transition font-medium whitespace-nowrap ${showFilters ? 'bg-white text-black' : 'bg-[#2b2b2b] hover:bg-[#404040] text-gray-300'}`}
            >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="hidden md:inline">Filters</span>
            </button>
        </div>

        {/* Filter Panel (Expandable) */}
        {showFilters && (
            <div className="flex flex-wrap gap-2 p-4 bg-[#1f1f1f] rounded-xl animate-in fade-in slide-in-from-top-2">
                <span className="text-sm text-gray-400 w-full mb-2">Quick Genres:</span>
                {GENRES.map(g => (
                    <button 
                        key={g.id}
                        onClick={() => handleGenreClick(g.name)}
                        className="px-4 py-1.5 rounded-full border border-gray-600 hover:border-white hover:bg-white hover:text-black transition text-sm"
                    >
                        {g.name}
                    </button>
                ))}
            </div>
        )}
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="text-center text-gray-500 animate-pulse mt-10">Searching...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 pb-20">
          {results.map((item) => {
            const mediaType = item.media_type === 'movie' ? 'movies' : 'tv';
            return (
              <Link 
                href={`/${mediaType}/${item.id}`} 
                key={item.id}
                className="group relative aspect-[2/3] bg-gray-800 rounded-md overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer shadow-lg"
              >
                {item.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 text-xs p-2 bg-[#202020]">
                    {item.title || item.name}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                  <p className="font-bold text-sm mb-2 text-white">{item.title || item.name}</p>
                  <span className="text-green-400 font-bold text-xs">
                    {item.vote_average ? `${Math.round(item.vote_average * 10)}% Match` : ''}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}