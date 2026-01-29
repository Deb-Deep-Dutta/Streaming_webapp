'use client'

import Link from 'next/link'

export default function BottomNav() {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-around',
        padding: '0.75rem',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid #333'
      }}
      className="mobile-only"
    >
      <Link href="/">🏠 Home</Link>
      <Link href="/search">🔍 Search</Link>
    </nav>
  )
}
