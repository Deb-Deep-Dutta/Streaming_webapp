'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { tmdbFetch } from '../lib/tmdb'
import HeroBanner from '../components/HeroBanner'
import RecommendationRow from '../components/RecommendationRow'

export default function HomePage() {
  const [featured, setFeatured] = useState<any[]>([])
  const [movies, setMovies] = useState<any[]>([])
  const [tv, setTv] = useState<any[]>([])

  useEffect(() => {
    // Trending for hero
    tmdbFetch<any>('trending/all/week')
      .then(d => setFeatured(d.results || []))
      .catch(() => {})

    // Recommend movies
    tmdbFetch<any>('discover/movie', {
      sort_by: 'popularity.desc',
      page: 1
    })
      .then(d => setMovies(d.results || []))
      .catch(() => {})

    // Recommend tv shows
    tmdbFetch<any>('discover/tv', {
      sort_by: 'popularity.desc',
      page: 1
    })
      .then(d => setTv(d.results || []))
      .catch(() => {})
  }, [])

  return (
    <>
      <HeroBanner items={featured.slice(0, 5)} />

      <RecommendationRow
        title="Recommended Movies"
        items={movies.slice(0, 15)}
      />

      <RecommendationRow
        title="Recommended TV Shows"
        items={tv.slice(0, 15)}
      />
    </>
  )
}
