/**
 * Vercel Serverless Function — Supabase Keep-Alive
 *
 * Triggered by Vercel Cron (see vercel.json) once daily at 00:00 UTC.
 * Also callable manually: GET /api/keep-alive
 *
 * Key resolution order (tries each until one is found):
 *   URL : VITE_SUPABASE_URL → SUPABASE_URL
 *   KEY : SUPABASE_SERVICE_ROLE_KEY → VITE_SUPABASE_ANON_KEY → SUPABASE_ANON_KEY
 *
 * The service role key is preferred for server-side functions because:
 *  - It is already confirmed present in Vercel (no VITE_ prefix issues)
 *  - Bypasses RLS, so ping_log writes always succeed
 *  - Safe to use server-side only (never exposed to browser)
 */
export default async function handler(req, res) {
  // Resolve URL — try both prefixed and unprefixed variants
  const supabaseUrl =
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL

  // Resolve KEY — prefer service role (already in Vercel), fall back to anon key
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY    ||
    process.env.SUPABASE_ANON_KEY

  // Identify which key type was resolved (for debug log only — never log the value)
  const keySource =
    process.env.SUPABASE_SERVICE_ROLE_KEY  ? 'service_role' :
    process.env.VITE_SUPABASE_ANON_KEY     ? 'vite_anon'    :
    process.env.SUPABASE_ANON_KEY          ? 'anon'         : 'none'

  console.log(`[keep-alive] env check | url: ${supabaseUrl ? 'found' : 'MISSING'} | key: ${keySource}`)

  if (!supabaseUrl || !supabaseKey) {
    console.error('[keep-alive] ERROR: Missing environment variables. Check Vercel dashboard.')
    return res.status(500).json({
      alive: false,
      error: 'Missing Supabase environment variables.',
      debug: { url: !!supabaseUrl, key: keySource },
    })
  }

  const pingUrl = `${supabaseUrl}/rest/v1/`
  const start   = Date.now()
  let httpStatus = 0
  let alive      = false
  let errorMsg   = null

  // ── Step 1: Ping Supabase ──
  try {
    const response = await fetch(pingUrl, {
      method: 'GET',
      headers: {
        apikey:         supabaseKey,
        Authorization:  `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
    })

    httpStatus = response.status
    alive      = response.ok

    if (!alive) {
      const body = await response.text().catch(() => '')
      console.error(`[keep-alive] Supabase ping failed | status: ${httpStatus} | body: ${body.slice(0, 200)}`)
    }
  } catch (err) {
    errorMsg   = err.message
    alive      = false
    httpStatus = 0
    console.error(`[keep-alive] Fetch error: ${err.message}`)
  }

  const latency_ms = Date.now() - start
  const timestamp  = new Date().toISOString()
  const source     = req.headers['x-vercel-cron'] ? 'auto' : 'manual'

  console.log(`[keep-alive] ${timestamp} | status: ${httpStatus} | latency: ${latency_ms}ms | alive: ${alive} | source: ${source} | key: ${keySource}`)

  // ── Step 2: Log result to ping_log ──
  try {
    const logRes = await fetch(`${supabaseUrl}/rest/v1/ping_log`, {
      method: 'POST',
      headers: {
        apikey:         supabaseKey,
        Authorization:  `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer:         'return=minimal',
      },
      body: JSON.stringify({ status: httpStatus, alive, latency_ms, source }),
    })

    if (!logRes.ok) {
      const logBody = await logRes.text().catch(() => '')
      console.error(`[keep-alive] ping_log write failed | status: ${logRes.status} | body: ${logBody.slice(0, 200)}`)
    } else {
      console.log(`[keep-alive] ping_log write OK`)
    }
  } catch (logErr) {
    console.error(`[keep-alive] ping_log exception: ${logErr.message}`)
  }

  return res.status(200).json({
    alive,
    status:     httpStatus,
    latency_ms,
    timestamp,
    source,
    key_used:   keySource,
    ...(errorMsg && { error: errorMsg }),
  })
}
