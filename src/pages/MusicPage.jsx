import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import LogoLoop from '../components/LogoLoop/LogoLoop'
import Footer from '../components/Footer/Footer'
import DecryptedText from '../components/DecryptedText/DecryptedText'
import GlitchText from '../components/GlitchText/GlitchText'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import './MusicPage.css'

export default function MusicPage() {
    useEffect(() => {
        document.title = 'Music | Music Vibe'
        const metaDesc = document.querySelector('meta[name="description"]')
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Explore the discography of Music Vibe. Listen to the latest releases, singles, and experimental ambient tracks.')
        }
    }, [])

    const [tracks, setTracks] = useState([])
    const [loading, setLoading] = useState(true)
    const [, setHoveredColor] = useState(null)

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const { data, error } = await supabase
                    .from('tracks')
                    .select('*')
                    .order('created_at', { ascending: false })
                
                if (error) throw error
                setTracks(data || [])
            } catch (err) {
                console.error('Error fetching tracks:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchTracks()

        // Subscribe to real-time changes
        const channel = supabase
            .channel('tracks-realtime')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'tracks' },
                () => {
                    fetchTracks()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    // Completely disable right-click, drag, text selection, and middle-click on this page
    useEffect(() => {
        const block = (e) => e.preventDefault();
        const blockMouse = (e) => { if (e.button === 1 || e.button === 2) e.preventDefault(); };
        document.addEventListener('contextmenu', block);
        document.addEventListener('dragstart', block);
        document.addEventListener('selectstart', block);
        document.addEventListener('mousedown', blockMouse);
        return () => {
            document.removeEventListener('contextmenu', block);
            document.removeEventListener('dragstart', block);
            document.removeEventListener('selectstart', block);
            document.removeEventListener('mousedown', blockMouse);
        };
    }, []);

    const getArtworkUrl = (filename) => {
        const { data } = supabase.storage.from('artwork').getPublicUrl(filename)
        return data.publicUrl
    }



    return (
        <div className="music-root">
            <main className="music-main">
                {/* ── Hero ──────────────────────────────────────── */}
                <section className="music-hero gpu-accelerate">
                    <ScrollReveal>
                        <div className="music-hero-content">
                            <h1>
                                <DecryptedText text="Music" animateOn="view" sequential={true} speed={25} />
                            </h1>
                            <p>
                                <DecryptedText text="The visuals behind every release." animateOn="view" sequential={true} speed={15} />
                            </p>
                            <div className="glow-bar" />
                        </div>
                    </ScrollReveal>
                </section>

                {/* ── Gallery ──────────────────────────────── */}
                <section className="art-gallery-section section-optimize">
                    <div id="art-gallery" className="art-gallery-grid">
                        {tracks.map((track, i) => {
                            const accent = track.accent_color
                            const glowColor = accent
                                ? `hsla(${accent.hue}, ${accent.sat}%, 60%, 0.6)`
                                : 'rgba(255, 255, 255, 0.4)'
                            const glitchAfter = accent
                                ? `hsl(${(accent.hue + 30) % 360}, ${accent.sat}%, 55%)`
                                : 'red'
                            const glitchBefore = accent
                                ? `hsl(${(accent.hue + 180) % 360}, ${accent.sat}%, 55%)`
                                : 'cyan'

                            return (
                                <ScrollReveal
                                    key={track.id}
                                    delay={(i % 4) * 0.1} // Modulo to reset stagger timing per row
                                    distance={25}
                                >
                                    <a
                                        href={track.link || '#'}
                                        target={track.link ? '_blank' : undefined}
                                        rel={track.link ? 'noopener noreferrer' : undefined}
                                        className="art-card"
                                        style={{
                                            '--glow-color': glowColor,
                                        }}
                                        title={track.title}
                                        onMouseEnter={() => setHoveredColor(accent || null)}
                                        onMouseLeave={() => setHoveredColor(null)}
                                    >
                                        <div className="art-card-inner">
                                            <img
                                                src={getArtworkUrl(track.artwork)}
                                                alt={`${track.title} artwork`}
                                                className="art-card-image"
                                                loading={i < 4 ? 'eager' : 'lazy'}
                                                fetchPriority={i < 4 ? 'high' : 'auto'}
                                                onError={(e) => {
                                                    // Fallback to local if Supabase fails (useful during migration)
                                                    if (!e.target.src.includes('/Assets/Artwork/')) {
                                                        e.target.src = `/Assets/Artwork/${track.artwork}`
                                                    }
                                                }}
                                            />
                                            <div className="art-card-overlay">
                                                <GlitchText speed={1.2} enableShadows={true} enableOnHover={false} className="art-card-title" afterColor={glitchAfter} beforeColor={glitchBefore}>
                                                    {track.title}
                                                </GlitchText>
                                                <div className="art-card-meta">
                                                    <span className="art-card-type">{track.type}</span>
                                                    <span className="art-card-year">{track.year}</span>
                                                    {track.status === 'Upcoming' && (
                                                        <span className="art-card-upcoming">Upcoming</span>
                                                    )}
                                                </div>
                                                {track.link && (
                                                    <div className="art-card-external">
                                                        <svg viewBox="0 0 24 24">
                                                            <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </a>
                                </ScrollReveal>
                            )
                        })}
                    </div>
                </section>

                {/* ── Logo Loop ────────────────────────────────── */}
                <ScrollReveal delay={0.2}>
                    <LogoLoop />
                </ScrollReveal>
            </main>

            <ScrollReveal direction="none" distance={0}>
                <Footer />
            </ScrollReveal>
        </div>
    )
}

