/**
 * Vercel Serverless Function — Supabase Keep-Alive
 *
 * Triggered by Vercel Cron (see vercel.json) once daily at 00:00 UTC.
 * Also callable manually: GET /api/keep-alive
 *
 * What it does:
 *  1. Pings the Supabase REST endpoint
 *  2. Measures latency in ms
 *  3. Logs the result to the `ping_log` table in Supabase
 *  4. Returns JSON with status
 */
export default async function handler(req, res) {
  const supabaseUrl  = process.env.VITE_SUPABASE_URL
  const supabaseKey  = process.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({
      alive: false,
      error: 'Missing Supabase environment variables.',
    })
  }

  const pingUrl = `${supabaseUrl}/rest/v1/`
  const start   = Date.now()
  let httpStatus = 0
  let alive      = false
  let errorMsg   = null

  try {
    const response = await fetch(pingUrl, {
      method: 'GET',
      headers: {
        apikey:        supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
    })

    httpStatus = response.status
    alive      = response.ok
  } catch (err) {
    errorMsg   = err.message
    alive      = false
    httpStatus = 0
  }

  const latency_ms = Date.now() - start
  const timestamp  = new Date().toISOString()

  console.log(`[keep-alive] ${timestamp} | status: ${httpStatus} | latency: ${latency_ms}ms | alive: ${alive}`)

  // Log result to Supabase ping_log table
  try {
    await fetch(`${supabaseUrl}/rest/v1/ping_log`, {
      method: 'POST',
      headers: {
        apikey:          supabaseKey,
        Authorization:   `Bearer ${supabaseKey}`,
        'Content-Type':  'application/json',
        Prefer:          'return=minimal',
      },
      body: JSON.stringify({
        status:     httpStatus,
        alive,
        latency_ms,
        source:     req.headers['x-vercel-cron'] ? 'vercel-cron' : 'manual',
      }),
    })
  } catch (logErr) {
    // Log failure silently — don't block the response
    console.error('[keep-alive] Failed to write to ping_log:', logErr.message)
  }

  return res.status(200).json({
    alive,
    status:     httpStatus,
    latency_ms,
    timestamp,
    ...(errorMsg && { error: errorMsg }),
  })
}
