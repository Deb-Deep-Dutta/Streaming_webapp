'use client'

import { RefObject, useEffect } from 'react'

const VIDFAST_ORIGINS = [
  'https://vidfast.pro',
  'https://vidfast.in',
  'https://vidfast.io',
  'https://vidfast.me',
  'https://vidfast.net',
  'https://vidfast.pm',
  'https://vidfast.xyz'
]

export function useVidFastEvents(
  iframeRef: RefObject<HTMLIFrameElement>
) {
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (!VIDFAST_ORIGINS.includes(event.origin)) return
      if (!event.data) return

      if (event.data.type === 'MEDIA_DATA') {
        try {
          localStorage.setItem(
            'vidfast-progress',
            JSON.stringify(event.data.data)
          )
        } catch {}
      }

      if (event.data.type === 'PLAYER_EVENT') {
        const payload = event.data.data

        if (payload?.event === 'ended') {
          // Fallback: app-level autoplay handled by router if needed
        }
      }
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [iframeRef])
}
