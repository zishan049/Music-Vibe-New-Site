import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SocialLinks from '../components/SocialLinks/SocialLinks'
import GlareCard from '../components/GlareCard/GlareCard'
import LogoLoop from '../components/LogoLoop/LogoLoop'
import Footer from '../components/Footer/Footer'
import DecryptedText from '../components/DecryptedText/DecryptedText'
import tracks from '../data/tracks.json'

export default function HomePage() {
    // Preload all artwork images in background for faster Music page load
    useEffect(() => {
        tracks.forEach(track => {
            const img = new Image()
            img.src = `/Assets/Artwork/${track.artwork}`
        })
    }, [])

    return (
        <div id="home-content">
            <section className="content-section">
                <header>
                    <img
                        src="/Assets/musicvibe.png"
                        alt="Music Vibe Logo"
                        className="logo"
                    />
                    <h1>
                        <DecryptedText text="Music Vibe" animateOn="view" sequential={true} speed={25} />
                    </h1>
                    <p className="tagline">
                        <DecryptedText text="Emotions in Motion" animateOn="view" sequential={true} speed={20} />
                    </p>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
                        Some days calm and dreamy, some days heavy and loud.
                        <br />Music that moves with you.
                    </p>
                    <div className="glow-bar" />

                    <SocialLinks className="home-social-icons" />

                    <div className="cta-container">
                        <Link to="/music" className="cta">LISTEN NOW</Link>
                    </div>
                </header>

                {/* ── All Releases ────────────────────────────────── */}
                <section style={{ paddingTop: '20px' }}>
                    <h2 className="stream-section-title embed-gradient-text">All Releases</h2>
                    <div className="about-grid-container">
                        {tracks.map((track, i) => (
                            <Link
                                key={track.title}
                                to="/music"
                                className="about-card"
                                style={{
                                    animation: `fadeInUp 0.5s ease forwards ${i * 0.08}s`,
                                    opacity: 0,
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    cursor: 'pointer',
                                    display: 'block',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <img
                                        src={`/Assets/Artwork/${track.artwork}`}
                                        alt={track.title}
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '10px',
                                            objectFit: 'cover',
                                            flexShrink: 0,
                                        }}
                                    />
                                    <div>
                                        <h3 style={{ marginBottom: '4px' }}>{track.title}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                            {track.type} · {track.year}
                                            {track.status === 'Upcoming' && (
                                                <span style={{
                                                    marginLeft: '8px',
                                                    padding: '2px 8px',
                                                    background: 'rgba(139, 92, 246, 0.15)',
                                                    borderRadius: '12px',
                                                    fontSize: '0.75rem',
                                                    color: '#8b5cf6',
                                                }}>
                                                    Upcoming
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* ── Logo Loop ────────────────────────────────────── */}
                <LogoLoop />

                {/* ── Work With Us ─────────────────────────────────── */}
                <section style={{ textAlign: 'center' }}>
                    <hr className="divider" />
                    <h2 className="stream-section-title" style={{ fontWeight: 600, letterSpacing: '0.5px', color: '#fff' }}>
                        Want to work with me & My Friends
                    </h2>
                    <div className="grid">
                        <GlareCard>
                            <h3>Artist First</h3>
                            <p>Our pricing model is built for artists, not corporations. Keep your revenue.</p>
                        </GlareCard>
                        <GlareCard>
                            <h3>Fast Distribution</h3>
                            <p>Get your tracks on Spotify, Apple Music, and TikTok in record time.</p>
                        </GlareCard>
                        <GlareCard>
                            <h3>Pro Quality</h3>
                            <p>Access to professional mastering feedback to ensure your bass hits perfectly.</p>
                        </GlareCard>
                    </div>
                </section>

                {/* ── Join Movement ────────────────────────────────── */}
                <section style={{ textAlign: 'center' }}>
                    <h2>Join the movement</h2>
                    <p style={{ marginBottom: '30px', color: 'var(--muted)' }}>
                        Click below to send us your latest heaters.
                    </p>
                    <a href="https://zoundznation.onrender.com/" className="cta" target="_blank" rel="noopener noreferrer">
                        JOIN
                    </a>
                </section>
            </section>

            <Footer />
        </div>
    )
}
