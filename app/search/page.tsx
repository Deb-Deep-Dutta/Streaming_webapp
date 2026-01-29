'use client'

import { useState } from 'react'
import { tmdbFetch } from '@/lib/tmdb'
import Link from 'next/link'
import { useTVFocus } from '@/components/useTVFocus'

export default function SearchPage() {
  useTVFocus()

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])

  async function search() {
    if (!query.trim()) return
    const data = await tmdbFetch<any>('search/multi', { query })
    setResults(data.results || [])
  }

  return (
    <main style={{ padding: '1rem' }}>
      <h1>Search</h1>

      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search movies or TV shows"
      />

      <button onClick={search}>Search</button>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '1rem',
          marginTop: '1rem'
        }}
      >
        {results
          .filter(r => r.media_type === 'movie' || r.media_type === 'tv')
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
