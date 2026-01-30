// app/movies/[id]/page.tsx
import { fetchFromTMDB } from '../../../lib/tmdb';
import PlayerShell from '../../../components/PlayerShell';

export const dynamic = 'force-dynamic';

export default async function MoviePage({ params }: { params: { id: string } }) {
  // Fetch details to get Title/Overview
  const movie = await fetchFromTMDB(`movie/${params.id}`);

  // Safety check: If movie fetch fails, handle gracefully (optional)
  if (!movie || !movie.id) {
     return <div className="text-white pt-20 text-center">Movie details not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white pt-20 pb-20">
      {/* 1. The Player Section */}
      <PlayerShell 
        tmdbId={params.id} 
        mediaType="movie" 
        title={movie.title}
      />

      {/* 2. Movie Details Section */}
      <div className="px-4 md:px-12 mt-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
           <h1 className="text-3xl md:text-5xl font-bold">{movie.title}</h1>
           {movie.vote_average && (
             <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-sm font-bold border border-green-600/50">
               {movie.vote_average.toFixed(1)} Match
             </span>
           )}
        </div>

        <div className="flex gap-4 text-gray-400 text-sm mb-6">
           <span>{movie.release_date?.split('-')[0]}</span>
           <span>•</span>
           <span>{movie.runtime} min</span>
           <span>•</span>
           <span className="uppercase border border-gray-600 px-1 text-[10px]">HD</span>
        </div>

        <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">{movie.overview}</p>
      </div>
    </div>
  );
}