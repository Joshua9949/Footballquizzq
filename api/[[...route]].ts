import app from '../src/index'

type Bindings = {
  VITE_GENLAYER_KEY?: string
  GENLAYER_CONTRACT_ADDRESS?: string
}

export const runtime = 'nodejs'

export default async function handler(request: Request): Promise<Response> {
  const env =
    (globalThis as {
      process?: { env?: Record<string, string | undefined> }
    }).process?.env ?? {}

  const bindings: Bindings = {
    VITE_GENLAYER_KEY: env.VITE_GENLAYER_KEY,
    GENLAYER_CONTRACT_ADDRESS: env.GENLAYER_CONTRACT_ADDRESS
  }
  return app.fetch(request, bindings)
}
