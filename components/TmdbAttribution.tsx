export default function TmdbAttribution() {
  return (
    <footer
      style={{
        padding: '1rem',
        marginTop: '3rem',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        textAlign: 'center'
      }}
    >
      <div>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--accent)' }}
        >
          https://www.themoviedb.org
        </a>
      </div>
    </footer>
  )
}
