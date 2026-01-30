import { fetchFromTMDB } from '../lib/tmdb';
import HeroBanner from '../components/HeroBanner';
import NetflixRow from '../components/NetflixRow'; // <--- Import the new component

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Fetch everything in parallel
  const [featuredData, moviesData, tvData] = await Promise.all([
    fetchFromTMDB('trending/all/week'),
    fetchFromTMDB('discover/movie', { sort_by: 'popularity.desc', page: 1 }),
    fetchFromTMDB('discover/tv', { sort_by: 'popularity.desc', page: 1 })
  ]);

  const featured = featuredData.results || [];
  const movies = moviesData.results || [];
  const tv = tvData.results || [];

  return (
    <main className="pb-20"> {/* Added padding bottom so footer doesn't overlap content */}
      
      {/* Hero Section */}
      {featured.length > 0 && <HeroBanner items={featured.slice(0, 10)} />}

      {/* Netflix Style Rows */}
      <div className="flex flex-col gap-4 mt-4 md:-mt-32 relative z-10"> 
        {/* Negative margin pulls rows up over the hero gradient like Netflix */}
        
        <NetflixRow
          title="Trending Now"
          items={featured}
        />

        <NetflixRow
          title="New Releases"
          items={movies}
        />

        <NetflixRow
          title="Popular TV Shows"
          items={tv}
        />
      </div>
    </main>
  );
}