import { useEffect, useState } from 'react'

type LeaguesResponse = {
  leagues?: string[]
}

export default function App() {
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')
  const [leagues, setLeagues] = useState<string[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch('/api/leagues')
        if (!res.ok) {
          throw new Error(`API failed: ${res.status}`)
        }
        const data = (await res.json()) as LeaguesResponse
        setLeagues(Array.isArray(data.leagues) ? data.leagues : [])
        setStatus('ok')
      } catch (err) {
        setStatus('error')
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    }
    run()
  }, [])

  return (
    <main className="page">
      <section className="card">
        <h1>FootballIQ</h1>
        <p>React + Vite frontend is running.</p>

        {status === 'loading' && <p className="muted">Checking API...</p>}
        {status === 'error' && (
          <p className="error">API error: {error}. Check `/api/leagues` on deploy.</p>
        )}
        {status === 'ok' && (
          <>
            <p className="ok">API connected.</p>
            <p className="muted">Leagues loaded: {leagues.length}</p>
          </>
        )}
      </section>
    </main>
  )
}
