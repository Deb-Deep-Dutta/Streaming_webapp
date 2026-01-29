export default function TmdbAttribution() {
  return (
    <footer
      style={{
        padding: '1.25rem 1rem',
        marginTop: '3rem',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        textAlign: 'center'
      }}
    >
      <div style={{ marginBottom: '0.5rem' }}>
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="The Movie Database"
        >
          <img
            src="/tmdb/tmdb.svg"
            alt="TMDB Logo"
            style={{
              width: '32px',
              height: '32px',
              opacity: 0.95
            }}
          />
        </a>
      </div>

      <div>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </div>
    </footer>
  )
}
