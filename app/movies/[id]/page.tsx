'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { tmdbFetch } from '../../lib/tmdb'
import FiltersPanel from '../../components/FiltersPanel'

export default function MoviesPage() {
  const [items, setItems] = useState<any[]>([])
  const [filters, setFilters] = useState<any>({})

  useEffect(() => {
    tmdbFetch<any>('discover/movie', {
      sort_by: 'popularity.desc',
      with_genres: filters.genre,
      with_original_language: filters.language,
      'vote_average.gte': filters.rating
    }).then(d => setItems(d.results))
  }, [filters])

  return (
    <main style={{ padding: '1.5rem' }}>
      <h1>Movies</h1>

      <FiltersPanel
        genre={filters.genre || ''}
        language={filters.language || ''}
        rating={filters.rating || ''}
        onChange={(k, v) => setFilters(f => ({ ...f, [k]: v }))}
      />

      <div className="grid">
        {items.map(i => (
          <Link key={i.id} href={`/movie/${i.id}`}>
            <img src={`https://image.tmdb.org/t/p/w342${i.poster_path}`} />
            <div>{i.title}</div>
          </Link>
        ))}
      </div>
    </main>
  )
}
