const API_BASE = '/api/tmdb'

export async function tmdbFetch<T>(
  path: string,
  params: Record<string, string | number> = {}
): Promise<T> {
  const url = new URL(`${API_BASE}/${path}`, window.location.origin)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value))
  })

  const res = await fetch(url.toString())

  if (!res.ok) {
    throw new Error('TMDB fetch failed')
  }

  return res.json()
}
