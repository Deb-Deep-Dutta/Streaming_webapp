// components/PlayerShell.tsx
'use client';

import { useState, useEffect } from 'react';

interface PlayerShellProps {
  tmdbId: string | number;
  mediaType: 'movie' | 'tv';
  season?: number;
  episode?: number;
  title?: string; // Optional: for display
}

export default function PlayerShell({ 
  tmdbId, 
  mediaType, 
  season = 1, 
  episode = 1,
  title 
}: PlayerShellProps) {
  const [src, setSrc] = useState('');

  // Setup the VidFast URL when the component mounts or props change
  useEffect(() => {
    const baseUrl = 'https://vidfast.pro';
    const themeColor = '9B59B6'; // Matching your purple theme
    
    // Construct the URL based on documentation
    let url = '';
    if (mediaType === 'movie') {
      // Endpoint: /movie/{id}?autoPlay=true&theme=...
      url = `${baseUrl}/movie/${tmdbId}?autoPlay=true&theme=${themeColor}`;
    } else {
      // Endpoint: /tv/{id}/{season}/{episode}?autoPlay=true&theme=...
      url = `${baseUrl}/tv/${tmdbId}/${season}/${episode}?autoPlay=true&theme=${themeColor}&nextButton=true&autoNext=true`;
    }

    setSrc(url);
  }, [tmdbId, mediaType, season, episode]);

  return (
    <div className="w-full max-w-screen-xl mx-auto my-8">
      {/* 16:9 Aspect Ratio Container for Responsiveness */}
      <div className="relative w-full pt-[56.25%] bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
        {src ? (
          <iframe
            src={src}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; encrypted-media; picture-in-picture"
            title={title || "Video Player"}
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-500">
            Loading Player...
          </div>
        )}
      </div>
    </div>
  );
}