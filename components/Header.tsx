'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        padding: '1rem',
        borderBottom: '1px solid var(--bg-secondary)'
      }}
    >
      <Link href="/" style={{ fontWeight: 600 }}>
        🎬 Stream Explorer
      </Link>

      <Link href="/search">🔍 Search</Link>

      <div style={{ marginLeft: 'auto' }}>
        <ThemeToggle />
      </div>
    </header>
  )
}
