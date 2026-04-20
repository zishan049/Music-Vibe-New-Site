import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import SocialLinks from '../components/SocialLinks/SocialLinks'
import LogoLoop from '../components/LogoLoop/LogoLoop'
import Footer from '../components/Footer/Footer'
import DecryptedText from '../components/DecryptedText/DecryptedText'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'

export default function HomePage() {
    const [tracks, setTracks] = useState([])

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
                console.error('Error fetching tracks for homepage:', err)
            }
        }

        fetchTracks()

        // Subscribe to real-time changes
        const channel = supabase
            .channel('homepage-tracks-realtime')
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

    const getArtworkUrl = (filename) => {
        const { data } = supabase.storage.from('artwork').getPublicUrl(filename)
        return data.publicUrl
    }

    return (
        <div id="home-content">
            <section className="content-section">
                <ScrollReveal>
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
                </ScrollReveal>

                {/* ── All Releases ────────────────────────────────── */}
                <section style={{ paddingTop: '20px' }}>
                    <ScrollReveal>
                        <h2 className="stream-section-title embed-gradient-text">All Releases</h2>
                    </ScrollReveal>
                    <div className="about-grid-container">
                        {tracks.map((track, i) => (
                            <ScrollReveal
                                key={track.id}
                                delay={i * 0.05}
                                distance={20}
                            >
                                <Link
                                    to="/music"
                                    className="about-card"
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        cursor: 'pointer',
                                        display: 'block',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <img
                                            src={getArtworkUrl(track.artwork)}
                                            alt={track.title}
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '10px',
                                                objectFit: 'cover',
                                                flexShrink: 0,
                                            }}
                                            onError={(e) => {
                                                if (!e.target.src.includes('/Assets/Artwork/')) {
                                                    e.target.src = `/Assets/Artwork/${track.artwork}`
                                                }
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
                                                        background: 'rgba(255, 255, 255, 0.1)',
                                                        borderRadius: '12px',
                                                        fontSize: '0.75rem',
                                                        color: '#ffffff',
                                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    }}>
                                                        Upcoming
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>

                {/* ── Logo Loop ────────────────────────────────────── */}
                <ScrollReveal delay={0.2}>
                    <LogoLoop />
                </ScrollReveal>
            </section>

            <ScrollReveal direction="none" distance={0}>
                <Footer />
            </ScrollReveal>
        </div>
    )
}
