import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

const STORAGE_BUCKET = 'assets'

/**
 * Build a public Supabase Storage CDN URL.
 * @param {'artwork'|'friends'} folder
 * @param {string} filename  e.g. 'Dark.webp'
 * @returns {string}
 */
export function getStorageUrl(folder, filename) {
    return `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}/${folder}/${encodeURIComponent(filename)}`
}

