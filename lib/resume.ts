export function getResumeData(tmdbId: number, type: 'movie' | 'tv') {
  try {
    const raw = localStorage.getItem('vidfast-progress')
    if (!raw) return null

    const data = JSON.parse(raw)
    const key = type === 'movie' ? `m${tmdbId}` : `t${tmdbId}`

    return data[key] || null
  } catch {
    return null
  }
}
