'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import PlayerShell from '@/components/PlayerShell'
import { tmdbFetch } from '@/lib/tmdb'
import { buildTvEmbedUrl } from '@/lib/vidfast'

type Episode = {
  episode_number: number
  name: string
}

type Season = {
  season_number: number
  episodes: Episode[]
}

type TvShow = {
  name: string
  overview: string
  number_of_seasons: number
}

export default function TvPage() {
  const { id } = useParams<{ id: string }>()

  const [show, setShow] = useState<TvShow | null>(null)
  const [season, setSeason] = useState(1)
  const [episode, setEpisode] = useState(1)
  const [episodes, setEpisodes] = useState<Episode[]>([])

  // Load show info
  useEffect(() => {
    tmdbFetch<TvShow>(`tv/${id}`).then(setShow).catch(() => {})
  }, [id])

  // Load season episodes
  useEffect(() => {
    tmdbFetch<Season>(`tv/${id}/season/${season}`)
      .then(data => setEpisodes(data.episodes))
      .catch(() => {})
  }, [id, season])

  if (!show) return null

  const src = buildTvEmbedUrl(Number(id), season, episode, {
    autoPlay: true,
    nextButton: true,
    autoNext: true,
    poster: true,
    title: false,
    theme: '16A085'
  })

  return (
    <main>
      <PlayerShell src={src} fullscreen />

      <section style={{ padding: '1rem' }}>
        <h1>{show.name}</h1>
        <p>{show.overview}</p>

        {/* Season Selector */}
        <div style={{ marginTop: '1rem' }}>
          <label>Season: </label>
          <select
            value={season}
            onChange={e => {
              setSeason(Number(e.target.value))
              setEpisode(1)
            }}
          >
            {Array.from({ length: show.number_of_seasons }).map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Season {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Episode Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: '0.5rem',
            marginTop: '1rem'
          }}
        >
          {episodes.map(ep => (
            <button
              key={ep.episode_number}
              onClick={() => setEpisode(ep.episode_number)}
              style={{
                padding: '0.5rem',
                borderRadius: '6px',
                background:
                  ep.episode_number === episode
                    ? 'var(--accent)'
                    : 'var(--bg-secondary)',
                color: 'inherit'
              }}
            >
              {ep.episode_number}. {ep.name}
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
