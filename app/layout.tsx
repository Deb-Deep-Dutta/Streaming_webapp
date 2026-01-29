import './globals.css'
import type { Metadata } from 'next'
import TmdbAttribution from '../components/TmdbAttribution'

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
      <body>
        {children}
        <TmdbAttribution />
      </body>
    </html>
  )
}
