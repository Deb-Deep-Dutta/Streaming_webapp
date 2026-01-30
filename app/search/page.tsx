'use client';

import { useState, useEffect } from 'react';
import { tmdbFetch } from '../../lib/tmdb';
import Link from 'next/link';
import { Search as SearchIcon, X } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Debounced Search Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length > 2) {
        setLoading(true);
        tmdbFetch<any>('search/multi', { query, page: 1 })
          .then((data) => {
            // Filter out people, keep only movies/tv
            const filtered = data.results.filter((i: any) => i.media_type !== 'person');
            setResults(filtered);
          })
          .finally(() => setLoading(false));
      } else {
        setResults([]);
      }
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="min-h-screen pt-20 px-4 md:px-12">
      {/* Search Input Bar */}
      <div className="relative max-w-3xl mx-auto mb-10">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400 group-focus-within:text-white transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-4 border-b-2 border-gray-700 bg-transparent text-white text-xl placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
            placeholder="Movies, TV shows, Genres..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="text-center text-gray-500 animate-pulse">Searching...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {results.map((item) => (
            <Link 
              href={`/${item.media_type === 'tv' ? 'tv' : 'movies'}/${item.id}`} 
              key={item.id}
              className="group relative aspect-[2/3] bg-gray-800 rounded-md overflow-hidden hover:ring-2 hover:ring-white transition-all cursor-pointer"
            >
              {item.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 text-xs p-2 text-center">
                  {item.title || item.name}
                </div>
              )}
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                <p className="font-bold text-sm mb-2">{item.title || item.name}</p>
                <span className="text-xs text-green-400">
                  {item.vote_average?.toFixed(1)} Match
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      {!loading && results.length === 0 && query.length > 2 && (
        <div className="text-center text-gray-500">No results found for "{query}"</div>
      )}
    </div>
  );
}