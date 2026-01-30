// lib/tmdb.ts
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export async function fetchFromTMDB(path: string, params: Record<string, string | number> = {}) {
  const url = new URL(`${TMDB_BASE_URL}/${path}`);
  url.searchParams.append('api_key', TMDB_API_KEY || '');
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 } // Updates every hour (Safe & Efficient)
  });

  if (!res.ok) {
    console.error(`TMDB Error: ${res.status} ${res.statusText}`);
    // Return empty result instead of crashing to keep the page alive if API fails
    return { results: [] }; 
  }

  return res.json();
}