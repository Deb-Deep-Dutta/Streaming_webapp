'use client'

import HoverPreviewTile from './HoverPreviewTile'
import { allowInlineTrailer } from '../lib/device'

export default function RecommendationRow({
  title,
  items
}: {
  title: string
  items: any[]
}) {
  const allowTrailer = allowInlineTrailer()

  return (
    <section style={{ padding: '1.5rem' }}>
      <h2>{title}</h2>

      <div
        style={{
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          paddingTop: '1rem'
        }}
      >
        {items.map((item, index) => (
          <HoverPreviewTile
            key={item.id}
            item={item}
            rank={index}
            allowTrailer={allowTrailer}
          />
        ))}
      </div>
    </section>
  )
}
