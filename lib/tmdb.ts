// lib/tmdb.ts

// --- CONFIGURATION ---
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const CLIENT_API_BASE = '/api/tmdb'; // Proxy path for client components

// --- 1. SERVER-SIDE FETCHER (For Home Page / Server Components) ---
// Direct access. Secure. Uses process.env.
export async function fetchFromTMDB(path: string, params: Record<string, string | number> = {}) {
  const url = new URL(`${TMDB_BASE_URL}/${path}`);
  url.searchParams.append('api_key', TMDB_API_KEY || '');
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 } // Cache for 1 hour
  });

  if (!res.ok) {
    console.error(`TMDB Server Error: ${res.status} ${res.statusText}`);
    return { results: [] };
  }

  return res.json();
}

// --- 2. CLIENT-SIDE FETCHER (For Search, Movies, HoverTiles) ---
// Proxy access. Safe for browser. Uses /api/tmdb.
export async function tmdbFetch<T>(
  path: string,
  params: Record<string, string | number> = {}
): Promise<T> {
  // Safety check: If this accidentally runs on server during build, return empty
  if (typeof window === 'undefined') {
    return { results: [] } as any; 
  }

  const url = new URL(`${CLIENT_API_BASE}/${path}`, window.location.origin);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error('TMDB Client fetch failed');
  }

  return res.json();
}