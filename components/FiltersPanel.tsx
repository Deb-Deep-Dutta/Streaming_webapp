'use client'

type Props = {
  genre: string
  language: string
  rating: string
  onChange: (key: string, value: string) => void
}

export default function FiltersPanel({
  genre,
  language,
  rating,
  onChange
}: Props) {
  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}
    >
      <select value={genre} onChange={e => onChange('genre', e.target.value)}>
        <option value="">All Genres</option>
        <option value="28">Action</option>
        <option value="12">Adventure</option>
        <option value="16">Animation</option>
        <option value="35">Comedy</option>
        <option value="18">Drama</option>
        <option value="27">Horror</option>
        <option value="878">Sci-Fi</option>
      </select>

      <select
        value={language}
        onChange={e => onChange('language', e.target.value)}
      >
        <option value="">All Languages</option>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="ja">Japanese</option>
        <option value="ko">Korean</option>
        <option value="fr">French</option>
      </select>

      <select
        value={rating}
        onChange={e => onChange('rating', e.target.value)}
      >
        <option value="">Any Rating</option>
        <option value="5">5+</option>
        <option value="6">6+</option>
        <option value="7">7+</option>
        <option value="8">8+</option>
      </select>
    </section>
  )
}
