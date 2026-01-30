'use client';

import { useState, useEffect } from 'react';

interface PlayerShellProps {
  tmdbId: string | number;
  mediaType: 'movie' | 'tv';
  season?: number;
  episode?: number;
  title?: string;
}

export default function PlayerShell({ 
  tmdbId, mediaType, season = 1, episode = 1, title 
}: PlayerShellProps) {
  const [src, setSrc] = useState('');

  useEffect(() => {
    // VidFast base URL
    const baseUrl = 'https://vidfast.pro';
    const themeColor = '9B59B6'; 
    
    // FIX: Explicitly set autoPlay=false in URL params
    const params = `?autoPlay=false&theme=${themeColor}&title=true`;
    
    let url = '';
    if (mediaType === 'movie') {
      url = `${baseUrl}/movie/${tmdbId}${params}`;
    } else {
      url = `${baseUrl}/tv/${tmdbId}/${season}/${episode}${params}&nextButton=true&autoNext=true`;
    }

    setSrc(url);
  }, [tmdbId, mediaType, season, episode]);

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-0 md:px-12 mt-16 md:mt-24">
      <div className="relative w-full pt-[56.25%] bg-black rounded-none md:rounded-xl overflow-hidden shadow-2xl border-0 md:border border-white/10">
        {src ? (
          <iframe
            src={src}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            // FIX: Sandbox restricts popups/redirects. 
            // We removed 'allow-popups' to stop the ads.
            sandbox="allow-forms allow-scripts allow-same-origin allow-presentation"
            allowFullScreen
            // FIX: Removed 'autoplay' from allow list
            allow="encrypted-media; picture-in-picture"
            title={title || "Video Player"}
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-500">
            <div className="animate-spin h-8 w-8 border-4 border-red-600 rounded-full border-t-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
}