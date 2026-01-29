'use client'

import { useEffect, useRef } from 'react'
import { useVidFastEvents } from './useVidFastEvents'

type Props = {
  src: string
  fullscreen?: boolean
}

export default function PlayerShell({ src, fullscreen = false }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useVidFastEvents(iframeRef)

  return (
    <div
      className={
        fullscreen ? 'player-container player-fullscreen' : 'player-container'
      }
    >
      <iframe
        ref={iframeRef}
        src={src}
        allow="encrypted-media"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer"
        title="Video Player"
      />
    </div>
  )
}
