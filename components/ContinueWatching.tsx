'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Item = {
  id: number
  type: 'movie' | 'tv'
  title: string
  poster_path: string
}

export default function ContinueWatching() {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('vidfast-progress')
      if (!raw) return

      const data = JSON.parse(raw)
      const parsed: Item[] = []

      Object.values<any>(data).forEach(entry => {
        parsed.push({
          id: entry.id,
          type: entry.type,
          title: entry.title,
          poster_path: entry.poster_path
        })
      })

      setItems(parsed)
    } catch {}
  }, [])

  if (!items.length) return null

  return (
    <section style={{ marginTop: '2rem' }}>
      <h2>Continue Watching</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '1rem'
        }}
      >
        {items.map(item => (
          <Link
            key={`${item.type}-${item.id}`}
            href={`/${item.type}/${item.id}`}
          >
            <img
              src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
              alt={item.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <div>{item.title}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}
