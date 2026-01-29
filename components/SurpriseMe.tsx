'use client'

import { useRouter } from 'next/navigation'
import { tmdbFetch } from '../lib/tmdb'

export default function SurpriseMe() {
  const router = useRouter()

  async function surprise() {
    const type = Math.random() > 0.5 ? 'movie' : 'tv'
    const data = await tmdbFetch<any>(`discover/${type}`, {
      sort_by: 'popularity.desc',
      page: Math.floor(Math.random() * 10) + 1
    })

    const pick = data.results[Math.floor(Math.random() * data.results.length)]
    if (pick) {
      router.push(`/${type}/${pick.id}`)
    }
  }

  return <button onClick={surprise}>🎲 Surprise Me</button>
}
