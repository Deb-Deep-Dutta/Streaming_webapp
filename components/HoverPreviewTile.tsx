'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { tmdbFetch } from '../lib/tmdb'

type Props = {
  item: any
  rank?: number
  allowTrailer: boolean
}

export default function HoverPreviewTile({ item, rank, allowTrailer }: Props) {
  const [active, setActive] = useState(false)
  const [details, setDetails] = useState<any>(null)
  const [trailer, setTrailer] = useState<string | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  function activateWithDelay() {
    timerRef.current = setTimeout(() => {
      setActive(true)
    }, 300)
  }

  function cancelActivation() {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setActive(false)
  }

  useEffect(() => {
    if (!active || details) return

    tmdbFetch<any>(
      `${item.media_type}/${item.id}`,
      { append_to_response: 'videos' }
    ).then(data => {
      setDetails(data)

      if (!allowTrailer) return

      const yt = data.videos?.results?.find(
        (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
      )

      if (yt) {
        setTrailer(
          `https://www.youtube.com/embed/${yt.key}?autoplay=1&mute=1&controls=0`
        )
      }
    })
  }, [active, allowTrailer])

  return (
    <div
      tabIndex={0}
      onMouseEnter={activateWithDelay}
      onMouseLeave={cancelActivation}
      onFocus={activateWithDelay}
      onBlur={cancelActivation}
      style={{
        position: 'relative',
        width: '180px',
        transform: active ? 'scale(1.2)' : 'scale(1)',
        zIndex: active ? 10 : 1,
        transition: 'transform 0.2s ease'
      }}
    >
      {/* TOP 10 BADGE */}
      {typeof rank === 'number' && rank < 10 && (
        <div
          style={{
            position: 'absolute',
            top: '6px',
            left: '6px',
            background: '#e50914',
            color: 'white',
            fontWeight: 700,
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '0.8rem',
            zIndex: 20
          }}
        >
          #{rank + 1}
        </div>
      )}

      {!active && (
        <img
          src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
          alt={item.title || item.name}
          style={{ width: '100%', borderRadius: '10px' }}
        />
      )}

      {active && (
        <div
          style={{
            position: 'absolute',
            top: '-40px',
            left: '-40px',
            width: '320px',
            background: '#111',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.6)'
          }}
        >
          {trailer ? (
            <iframe
              src={trailer}
              allow="autoplay; encrypted-media"
              style={{ width: '100%', height: '180px', border: 0 }}
            />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w780${item.backdrop_path}`}
              style={{ width: '100%' }}
            />
          )}

          <div style={{ padding: '0.75rem' }}>
            <div style={{ fontWeight: 600 }}>
              {item.title || item.name}
            </div>

            {details && (
              <>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                  ⭐ {details.vote_average?.toFixed(1)} / 10
                </div>

                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  {details.overview?.slice(0, 120)}…
                </p>
              </>
            )}

            <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
              <Link href={`/${item.media_type}/${item.id}`}>
                <button>▶ Play</button>
              </Link>
              <Link href={`/${item.media_type}/${item.id}`}>
                <button>ℹ Info</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
