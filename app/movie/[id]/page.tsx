'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import PlayerShell from '@/components/PlayerShell'
import { tmdbFetch } from '@/lib/tmdb'
import { buildMovieEmbedUrl } from '@/lib/vidfast'

type Movie = {
  title: string
  overview: string
  backdrop_path: string
}

export default function MoviePage() {
  const { id } = useParams<{ id: string }>()
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    tmdbFetch<Movie>(`movie/${id}`)
      .then(setMovie)
      .catch(() => {})
  }, [id])

  if (!movie) return null

  const src = buildMovieEmbedUrl(Number(id), {
    autoPlay: true,
    poster: true,
    title: false,
    theme: '16A085'
  })

  return (
    <main>
      <PlayerShell src={src} fullscreen />

      <section style={{ padding: '1rem' }}>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
      </section>
    </main>
  )
}
