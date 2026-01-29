'use client'

import { useEffect, useState } from 'react'
import { tmdbFetch } from '../lib/tmdb'
import Link from 'next/link'
import ContinueWatching from '../components/ContinueWatching'
import SurpriseMe from '../components/SurpriseMe'
import { useTVFocus } from '../components/useTVFocus'


export default function HomePage() {
  useTVFocus()

  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    tmdbFetch<any>('trending/all/week')
      .then(data => setItems(data.results))
      .catch(() => {})
  }, [])

  return (
    <main style={{ padding: '1rem' }}>
      <h1>Discover</h1>

      <SurpriseMe />
      <ContinueWatching />

      <h2 style={{ marginTop: '2rem' }}>Trending</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '1rem'
        }}
      >
        {items
          .filter(i => i.media_type === 'movie' || i.media_type === 'tv')
          .map(item => (
            <Link
              key={`${item.media_type}-${item.id}`}
              href={`/${item.media_type}/${item.id}`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                alt={item.title || item.name}
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <div>{item.title || item.name}</div>
            </Link>
          ))}
      </div>
    </main>
  )
}
