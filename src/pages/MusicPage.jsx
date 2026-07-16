import { useState, useEffect } from 'react'
import { supabase, getStorageUrl } from '../lib/supabase'
import tracksData from '../data/tracks.json'
import LogoLoop from '../components/LogoLoop/LogoLoop'
import Footer from '../components/Footer/Footer'
import DecryptedText from '../components/DecryptedText/DecryptedText'
import GlitchText from '../components/GlitchText/GlitchText'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import './MusicPage.css'

/* ── Marquee items ────────────────────────────────── */
const MARQUEE_ITEMS = [
    'Music Vibe', 'Emotions in Motion', 'Independent Artist',
    'Original Releases', 'Streaming Now', 'Music Vibe',
    'Emotions in Motion', 'Independent Artist', 'Original Releases', 'Streaming Now',
]

const SmoothImage = ({ src, alt, className, i, ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <img
            src={src}
            alt={alt}
            className={`${className} ${isLoaded ? 'is-loaded' : 'is-loading'}`}
            onLoad={() => setIsLoaded(true)}
            loading={i < 4 ? 'eager' : 'lazy'}
            fetchPriority={i < 4 ? 'high' : 'auto'}
            {...props}
        />
    );
};

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
        async function fetchTracks() {
            const { data, error } = await supabase
                .from('tracks')
                .select('*')
                .order('id')

            if (error || !data?.length) {
                setTracks(tracksData)
            } else {
                setTracks(data.map(t => ({
                    ...t,
                    accent_color: (t.accent_hue != null)
                        ? { hue: t.accent_hue, sat: t.accent_sat }
                        : null
                })))
            }
            setLoading(false)
        }

        fetchTracks()

        // Re-fetch when tab becomes visible (user switches back from admin)
        const onVisible = () => { if (document.visibilityState === 'visible') fetchTracks() }
        document.addEventListener('visibilitychange', onVisible)

        // Also subscribe to Supabase Realtime (requires publication setup in Supabase)
        const channel = supabase
            .channel('music-tracks')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'tracks' }, fetchTracks)
            .subscribe()

        return () => {
            document.removeEventListener('visibilitychange', onVisible)
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

    const getArtworkUrl = (filename) => getStorageUrl('artwork', filename)

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

                    {/* Streaming Now Marquee — Ported from HomePage */}
                    <div className="music-marquee" aria-hidden="true">
                        <div className="music-marquee__track">
                            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                                <span key={i} className="music-marquee__item">
                                    {item}
                                    <span className="music-marquee__dot" />
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Gallery ──────────────────────────────── */}
                <section className={`art-gallery-section section-optimize ${!loading ? 'is-ready' : 'is-loading'}`}>
                    <div id="art-gallery" className={`art-gallery-grid ${!loading ? 'is-visible' : ''}`}>
                        {tracks.map((track, i) => {
                            const accent = track.accent_color
                            const glowColor = accent
                                ? `hsla(${accent.hue}, ${accent.sat}%, 60%, 0.6)`
                                : 'rgba(255, 255, 255, 0.4)'

                            return (
                                <ScrollReveal
                                    key={track.id || i}
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
                                            <SmoothImage
                                                src={getArtworkUrl(track.artwork)}
                                                alt={`${track.title} artwork`}
                                                className="art-card-image"
                                                i={i}
                                            />
                                            <div className="art-card-overlay">
                                                <h3 className="art-card-title">{track.title}</h3>
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

