// app/page.tsx
import { fetchFromTMDB } from '../lib/tmdb';
import HeroBanner from '../components/HeroBanner';
import RecommendationRow from '../components/RecommendationRow';

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
    <main>
      {featured.length > 0 && <HeroBanner items={featured.slice(0, 5)} />}

      <RecommendationRow
        title="Recommended Movies"
        items={movies.slice(0, 15)}
      />

      <RecommendationRow
        title="Recommended TV Shows"
        items={tv.slice(0, 15)}
      />
    </main>
  );
}