'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { tmdbFetch } from '../../lib/tmdb'

export default function TvPage() {
  const [items, setItems] = useState<any[]>([])
  const [filters, setFilters] = useState<any>({
    year: ''
  })

  useEffect(() => {
    tmdbFetch<any>('discover/tv', {
      sort_by: 'popularity.desc',
      first_air_date_year: filters.year,
      'vote_average.gte': filters.rating
    }).then(d => setItems(d.results))
  }, [filters])

  return (
    <main style={{ padding: '1.5rem' }}>
      <h1>TV Shows</h1>

      <div style={{ marginBottom: '1rem' }}>
        <select onChange={e => setFilters({ year: e.target.value })}>
          <option value="">All Years</option>
          <option value="2024">2024+</option>
          <option value="2023">2023+</option>
          <option value="2020">2020+</option>
        </select>
      </div>

      <div className="grid">
        {items.map(i => (
          <Link key={i.id} href={`/tv/${i.id}`}>
            <img src={`https://image.tmdb.org/t/p/w342${i.poster_path}`} />
            <div>{i.name}</div>
          </Link>
        ))}
      </div>
    </main>
  )
}
