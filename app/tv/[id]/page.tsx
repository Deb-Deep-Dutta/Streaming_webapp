// app/tv/[id]/page.tsx
import { fetchFromTMDB } from '../../../lib/tmdb';
import TVShowInterface from '../../../components/TVShowInterface';

export const dynamic = 'force-dynamic';

export default async function TVPage({ params }: { params: { id: string } }) {
  // Fetch Show Details AND Season 1 Details in parallel
  const [show, season1] = await Promise.all([
    fetchFromTMDB(`tv/${params.id}`),
    fetchFromTMDB(`tv/${params.id}/season/1`)
  ]);

  if (!show || !show.id) {
     return <div className="text-white pt-20 text-center">TV Show not found.</div>;
  }

  return <TVShowInterface show={show} seasonData={season1} />;
}