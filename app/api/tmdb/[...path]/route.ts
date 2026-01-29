import { NextResponse } from 'next/server'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

// Disable caching for sensitive proxy requests
export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { path: string[] } }
) {
  try {
    const apiKey = process.env.TMDB_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'TMDB API key not configured' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)

    // Build TMDB URL
    const tmdbPath = params.path.join('/')
    const tmdbUrl = new URL(`${TMDB_BASE_URL}/${tmdbPath}`)

    // Forward query params safely
    searchParams.forEach((value, key) => {
      tmdbUrl.searchParams.append(key, value)
    })

    tmdbUrl.searchParams.append('api_key', apiKey)

    const response = await fetch(tmdbUrl.toString(), {
      headers: {
        Accept: 'application/json'
      }
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'TMDB request failed' },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
