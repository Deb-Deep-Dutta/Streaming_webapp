import './globals.css'
import type { Metadata } from 'next'
import Providers from './providers'
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
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <BottomNav />
          <TmdbAttribution />
        </Providers>
      </body>
    </html>
  )
}
