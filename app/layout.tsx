import './globals.css'
import type { Metadata } from 'next'
import Header from '../components/Header'
import TmdbAttribution from '../components/TmdbAttribution'
import BottomNav from '../components/BottomNav'


export const metadata: Metadata = {
  title: 'Stream Explorer',
  description: 'Discover and stream movies and TV shows across devices',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Header />

        <main style={{ flex: 1 }}>
          {children}
        </main>

        <TmdbAttribution />
      <BottomNav />
      </body>
    </html>
  )
}
