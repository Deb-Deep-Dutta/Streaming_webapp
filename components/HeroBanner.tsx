'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Item = {
  id: number
  title?: string
  name?: string
  backdrop_path: string
  overview: string
  media_type: 'movie' | 'tv'
}

export default function HeroBanner({ items }: { items: Item[] }) {
  const [index, setIndex] = useState(0)
  const current = items[index]

  useEffect(() => {
    if (!items.length) return
    const id = setInterval(() => {
      setIndex(i => (i + 1) % items.length)
    }, 8000)
    return () => clearInterval(id)
  }, [items])

  if (!current) return null

  return (
    <section
      style={{
        height: '60vh',
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.2)), url(https://image.tmdb.org/t/p/original${current.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <h1 style={{ fontSize: '3rem', maxWidth: '60%' }}>
        {current.title || current.name}
      </h1>

      <p style={{ maxWidth: '50%', margin: '1rem 0' }}>
        {current.overview.slice(0, 200)}…
      </p>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href={`/${current.media_type}/${current.id}`}>
          <button style={{ padding: '0.75rem 1.5rem' }}>▶ Play</button>
        </Link>

        <Link href={`/${current.media_type}/${current.id}`}>
          <button style={{ padding: '0.75rem 1.5rem' }}>ℹ More Info</button>
        </Link>
      </div>
    </section>
  )
}
