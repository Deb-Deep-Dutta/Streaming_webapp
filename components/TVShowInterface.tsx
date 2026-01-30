// components/TVShowInterface.tsx
'use client';

import { useState } from 'react';
import PlayerShell from './PlayerShell';

interface Episode {
  episode_number: number;
  name: string;
  overview: string;
  still_path: string;
  air_date: string;
}

interface Season {
  season_number: number;
  name: string;
  episode_count: number;
}

interface TVShowInterfaceProps {
  show: any;        // The full show object
  seasonData: any;  // Data for the default season (usually Season 1)
}

export default function TVShowInterface({ show, seasonData }: TVShowInterfaceProps) {
  const [currentSeason, setCurrentSeason] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  // In a real app, you would fetch new season data when currentSeason changes.
  // For now, we will assume we are viewing the passed seasonData.
  const [episodes, setEpisodes] = useState<Episode[]>(seasonData.episodes || []);

  return (
    <div className="min-h-screen bg-[#141414] text-white pb-20">
      
      {/* 1. The Player - Updates when state changes */}
      <PlayerShell 
        tmdbId={show.id} 
        mediaType="tv" 
        season={currentSeason}
        episode={currentEpisode}
        title={`${show.name} - S${currentSeason}:E${currentEpisode}`}
      />

      {/* 2. Show Info */}
      <div className="px-4 md:px-12 mt-4 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{show.name}</h1>
        <p className="text-gray-300 text-lg mb-8">{show.overview}</p>

        {/* 3. Season & Episode Selector */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 text-white">Episodes</h2>
          {/* (Optional: Add a dropdown here to switch seasons in the future) */}
        </div>

        <div className="grid gap-4 md:gap-6">
          {episodes.map((ep) => (
            <div 
              key={ep.episode_number}
              onClick={() => setCurrentEpisode(ep.episode_number)}
              className={`flex flex-col md:flex-row gap-4 p-4 rounded-lg cursor-pointer transition-all ${
                currentEpisode === ep.episode_number 
                  ? 'bg-gray-800 border-l-4 border-red-600' 
                  : 'hover:bg-gray-900 border-l-4 border-transparent'
              }`}
            >
              {/* Episode Thumbnail */}
              <div className="relative w-full md:w-64 aspect-video flex-shrink-0 bg-gray-800 rounded overflow-hidden">
                {ep.still_path ? (
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${ep.still_path}`} 
                    alt={ep.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 text-xs">No Image</div>
                )}
                <span className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 text-xs rounded">
                  Ep {ep.episode_number}
                </span>
              </div>

              {/* Episode Details */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-between mb-2">
                   <h3 className="text-lg font-bold text-white">{ep.episode_number}. {ep.name}</h3>
                   <span className="text-sm text-gray-400">{ep.air_date}</span>
                </div>
                <p className="text-gray-400 text-sm line-clamp-3">{ep.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}