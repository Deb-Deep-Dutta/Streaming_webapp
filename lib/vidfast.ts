type MovieOptions = {
  autoPlay?: boolean
  theme?: string
  poster?: boolean
  title?: boolean
}

type TvOptions = MovieOptions & {
  nextButton?: boolean
  autoNext?: boolean
}

const BASE_URL = 'https://vidfast.pro'

export function buildMovieEmbedUrl(
  tmdbId: number,
  options: MovieOptions = {}
) {
  const url = new URL(`${BASE_URL}/movie/${tmdbId}`)

  Object.entries(options).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, String(value))
    }
  })

  return url.toString()
}

export function buildTvEmbedUrl(
  tmdbId: number,
  season: number,
  episode: number,
  options: TvOptions = {}
) {
  const url = new URL(`${BASE_URL}/tv/${tmdbId}/${season}/${episode}`)

  Object.entries(options).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, String(value))
    }
  })

  return url.toString()
}
