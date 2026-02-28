import { useState } from 'react'
import tracks from '../data/tracks.json'
import LogoLoop from '../components/LogoLoop/LogoLoop'
import Footer from '../components/Footer/Footer'
import DecryptedText from '../components/DecryptedText/DecryptedText'
import GlitchText from '../components/GlitchText/GlitchText'
import './MusicPage.css'

export default function MusicPage() {
    const [, setHoveredColor] = useState(null)

    return (
        <>
            <main className="artists-listing-page">
                {/* ── Hero ──────────────────────────────────────── */}
                <section className="artists-page-hero">
                    <div className="hero-card" style={{ padding: '24px 40px', maxWidth: '480px', margin: '0 auto' }}>
                        <h1 className="embed-gradient-text" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
                            <DecryptedText text="Music" animateOn="view" sequential={true} speed={25} />
                        </h1>
                        <p style={{ fontSize: '0.9rem' }}>
                            <DecryptedText text="The visuals behind every release." animateOn="view" sequential={true} speed={15} />
                        </p>
                        <div className="glow-bar" />
                    </div>
                </section>

                {/* ── Gallery ──────────────────────────────── */}
                <section className="art-gallery-section">
                    <div id="art-gallery" className="art-gallery-grid">
                        {tracks.map((track, i) => {
                            const accent = track.accentColor
                            const glowColor = accent
                                ? `hsla(${accent.hue}, ${accent.sat}%, 60%, 0.6)`
                                : 'rgba(139, 92, 246, 0.6)'
                            const glitchAfter = accent
                                ? `hsl(${(accent.hue + 30) % 360}, ${accent.sat}%, 55%)`
                                : 'red'
                            const glitchBefore = accent
                                ? `hsl(${(accent.hue + 180) % 360}, ${accent.sat}%, 55%)`
                                : 'cyan'

                            return (
                                <a
                                    key={track.title}
                                    href={track.link || '#'}
                                    target={track.link ? '_blank' : undefined}
                                    rel={track.link ? 'noopener noreferrer' : undefined}
                                    className="art-card"
                                    style={{
                                        animationDelay: `${i * 0.08}s`,
                                        '--glow-color': glowColor,
                                    }}
                                    title={track.title}
                                    onMouseEnter={() => setHoveredColor(accent || null)}
                                    onMouseLeave={() => setHoveredColor(null)}
                                >
                                    <div className="art-card-inner">
                                        <img
                                            src={`/Assets/Artwork/${track.artwork}`}
                                            alt={`${track.title} artwork`}
                                            className="art-card-image"
                                            loading="lazy"
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
                            )
                        })}
                    </div>
                </section>

                {/* ── Logo Loop ────────────────────────────────── */}
                <LogoLoop />
            </main>

            <Footer />
        </>
    )
}
