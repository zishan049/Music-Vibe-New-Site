import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from 'motion/react'
import { supabase, getStorageUrl } from '../lib/supabase'
import tracksData from '../data/tracks.json'
import socialsDataFallback from '../data/socials.json'
import SocialLinks from '../components/SocialLinks/SocialLinks'
import LogoLoop from '../components/LogoLoop/LogoLoop'
import Footer from '../components/Footer/Footer'
import DecryptedText from '../components/DecryptedText/DecryptedText'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import { SOCIAL_ICONS, SOCIAL_LABELS } from '../data/socialIcons'
import './HomePage.css'

/* ── Marquee items ────────────────────────────────── */
const MARQUEE_ITEMS = [
    'Music Vibe', 'Emotions in Motion', 'Independent Artist',
    'Original Releases', 'Streaming Now', 'Music Vibe',
    'Emotions in Motion', 'Independent Artist', 'Original Releases', 'Streaming Now',
]

/* ── Stats strip data ─────────────────────────────── */
const STATS = [
    { label: 'Genre', value: 'Electronic', sub: 'Ambient · Experimental' },
    { label: 'Since', value: '2024', sub: 'Based in India' },
    { label: 'Available On', value: '6+', sub: 'Streaming Platforms' },
]

/* ── Logo Blinker ─────────────────────────────────── */
const LOGO_BLINKER_ITEMS = ['spotify', 'apple', 'amazon', 'instagram', 'soundcloud', 'youtube', 'featurefm'];

function LogoBlinker() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % LOGO_BLINKER_ITEMS.length);
        }, 1200); // Snappier cycle without blinking
        return () => clearInterval(timer);
    }, []);

    return (
        <span className="hp-cta__blinker hp-cta__blinker--logo">
            <AnimatePresence mode="wait">
                <motion.span
                    key={LOGO_BLINKER_ITEMS[index]}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={`hp-cta__logo-unit ${LOGO_BLINKER_ITEMS[index]}`}
                    style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
                >
                    {SOCIAL_ICONS[LOGO_BLINKER_ITEMS[index]]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

/* ── Word-split hero animation ────────────────────── */
function HeroWord({ word, delay }) {
    return (
        <motion.span
            className="hp-hero__word"
            initial={{ clipPath: 'inset(0 0 110% 0)', opacity: 0, y: 40 }}
            animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1, y: 0 }}
            transition={{
                duration: 1.05,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            {word}
        </motion.span>
    )
}

/* ── Release Card ─────────────────────────────────── */
function ReleaseCard({ track, index, getArtworkUrl }) {
    return (
        <Link
            to="/music"
            className="hp-release-card"
            aria-label={`Listen to ${track.title}`}
        >
            {/* Artwork */}
            <div className="hp-release-card__img-wrap">
                <img
                    className="hp-release-card__img"
                    src={getArtworkUrl(track.artwork)}
                    alt={track.title}
                    loading="lazy"
                />
                {track.status === 'Upcoming' && (
                    <span className="hp-release-card__upcoming">Upcoming</span>
                )}
                <div className="hp-release-card__play">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </div>

            {/* Info */}
            <div className="hp-release-card__info">
                <span className="hp-release-card__num">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="hp-release-card__title">{track.title}</h3>
                <p className="hp-release-card__meta">
                    {track.type} · {track.year}
                </p>
            </div>
        </Link>
    )
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function HomePage() {
    const [tracks, setTracks] = useState([])
    const [socialsData, setSocialsData] = useState(socialsDataFallback)
    const heroRef = useRef(null)

    /* ── Supabase fetches ────────────────── */
    useEffect(() => {
        async function fetchTracks() {
            const { data, error } = await supabase
                .from('tracks')
                .select('*')
                .order('id')

            if (!error && data?.length) {
                const visible = data.filter(t => t.is_visible !== false)
                setTracks(visible.map(t => ({
                    ...t,
                    accent_color: (t.accent_hue != null)
                        ? { hue: t.accent_hue, sat: t.accent_sat }
                        : null
                })))
            } else {
                setTracks(tracksData.filter(t => t.is_visible !== false))
            }
        }

        async function fetchSocials() {
            const { data, error } = await supabase
                .from('socials')
                .select('platform, url')

            if (!error && data?.length) {
                const obj = {}
                data.forEach(({ platform, url }) => { obj[platform] = url })
                setSocialsData(obj)
            }
            // on error: keep socialsDataFallback already in state
        }

        fetchTracks()
        fetchSocials()

        // Re-fetch when tab becomes visible (user switches back from admin)
        const onVisible = () => {
            if (document.visibilityState === 'visible') {
                fetchTracks()
                fetchSocials()
            }
        }
        document.addEventListener('visibilitychange', onVisible)

        // Also subscribe to Supabase Realtime
        const tracksCh = supabase
            .channel('hp-tracks')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'tracks' }, fetchTracks)
            .subscribe()

        const socialsCh = supabase
            .channel('hp-socials')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'socials' }, fetchSocials)
            .subscribe()

        return () => {
            document.removeEventListener('visibilitychange', onVisible)
            supabase.removeChannel(tracksCh)
            supabase.removeChannel(socialsCh)
        }
    }, [])

    useEffect(() => {
        document.title = 'Music Vibe | Emotions in Motion'
        const metaDesc = document.querySelector('meta[name="description"]')
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Music Vibe - Independent artist exploring ambient, electronic, and experimental soundscapes. Music that moves with you.')
        }
    }, [])

    /* ── Scroll-driven parallax ───────────────────── */
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    })

    const rawTitleY = useTransform(scrollYProgress, [0, 1], [0, -110])
    const titleY = useSpring(rawTitleY, { stiffness: 80, damping: 22 })

    const rawHeroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
    const heroOpacity = useSpring(rawHeroOpacity, { stiffness: 100, damping: 25 })

    const rawStrokeY = useTransform(scrollYProgress, [0, 1], [0, -55])
    const strokeY = useSpring(rawStrokeY, { stiffness: 55, damping: 18 })

    /* ── Interactive acoustic field (smooth cursor proximity) ── */
    const strokeMouseX = useMotionValue(0)
    const strokeMouseY = useMotionValue(0)
    const springStrokeX = useSpring(strokeMouseX, { stiffness: 45, damping: 22 })
    const springStrokeY = useSpring(strokeMouseY, { stiffness: 45, damping: 22 })

    const handleHeroMouseMove = (e) => {
        if (!heroRef.current) return
        const rect = heroRef.current.getBoundingClientRect()
        const relX = (e.clientX - rect.left) / rect.width - 0.5
        const relY = (e.clientY - rect.top) / rect.height - 0.5
        // Micro-displacement (±14px horizontal, ±10px vertical) for zero interference
        strokeMouseX.set(relX * 28)
        strokeMouseY.set(relY * 20)
    }

    const handleHeroMouseLeave = () => {
        strokeMouseX.set(0)
        strokeMouseY.set(0)
    }

    const getArtworkUrl = (filename) => getStorageUrl('artwork', filename)

    return (
        <div id="home-content" className="hp-root">

            {/* ══════════════════════════════════════
                HERO SECTION
                ══════════════════════════════════════ */}
            <section
                className="hp-hero"
                ref={heroRef}
                onMouseMove={handleHeroMouseMove}
                onMouseLeave={handleHeroMouseLeave}
            >


                {/* ── Massive display type ── */}
                <motion.div
                    className="hp-hero__display"
                    style={{ y: titleY, opacity: heroOpacity }}
                >
                    {/* Ghost stroke layer — parallax offset + layered acoustic reverberation */}
                    <motion.div
                        className="hp-hero__stroke-container"
                        aria-hidden="true"
                        style={{ y: strokeY }}
                    >
                        <motion.div
                            className="hp-hero__stroke-interactive"
                            style={{ x: springStrokeX, y: springStrokeY }}
                        >
                            {/* Primary Reverb: undulating organic float & breathing luminescence */}
                            <span className="hp-hero__title-stroke hp-hero__title-stroke--ambient" />
                            {/* Secondary Sub-harmonic Echo: out-of-phase stereo delay depth */}
                            <span className="hp-hero__title-stroke hp-hero__title-stroke--echo" />
                        </motion.div>
                    </motion.div>

                    {/* Solid title — word-by-word clip reveal (untouched foreground layer) */}
                    <h1 className="hp-hero__title-group" aria-label="Music Vibe">
                        <HeroWord word="Music" delay={0.2} />
                        <HeroWord word="Vibe" delay={0.38} />
                    </h1>
                </motion.div>

                {/* ── Bottom meta: tagline left, scroll + CTA right ── */}
                <div className="hp-hero__bottom">

                    {/* Tagline */}
                    <motion.div
                        className="hp-hero__tagline-wrap"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="hp-hero__tagline">
                            <span className="hp-hero__tagline-line hp-hero__tagline-line--strong">
                                <DecryptedText 
                                    text="Some days calm and dreamy," 
                                    animateOn="view" 
                                    initialDelay={1800} 
                                    sequential={true} 
                                    speed={25} 
                                    loop={true} 
                                    loopDelay={5000} 
                                />
                            </span>
                            <span className="hp-hero__tagline-line">
                                <DecryptedText 
                                    text="some days heavy and loud." 
                                    animateOn="view" 
                                    initialDelay={2000} 
                                    sequential={true} 
                                    speed={15} 
                                    loop={true} 
                                    loopDelay={6000} 
                                />
                            </span>
                            <span className="hp-hero__tagline-line hp-hero__tagline-line--accent">
                                <DecryptedText 
                                    text="Music that moves with you." 
                                    animateOn="view" 
                                    initialDelay={2200} 
                                    sequential={true} 
                                    speed={25} 
                                    loop={true} 
                                    loopDelay={5000} 
                                />
                            </span>
                        </p>
                    </motion.div>

                    {/* Right column: social + CTA (no overlap with scroll) */}
                    <div className="hp-hero__right">
                        {/* Social pills — staggered entry matching LoadingSequencer Phase 1 */}
                        <div className="hp-hero__social-wrap">
                            {/* We wrap SocialLinks in a div with CSS stagger animation */}
                            <motion.div
                                className="hp-hero__social-anim"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: {},
                                    visible: { transition: { staggerChildren: 0.09, delayChildren: 1.1 } }
                                }}
                            >
                                <SocialLinksAnimated socials={socialsData} />
                            </motion.div>
                        </div>

                        {/* CTA — below social */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Link to="/music" className="hp-cta">
                                <span>Listen Now</span>
                                <LogoBlinker />
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll indicator — fixed bottom-center, clear of CTA */}
                <motion.div
                    className="hp-hero__scroll"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.0 }}
                >
                    <div className="hp-hero__scroll-chars">
                        {'SCROLL'.split('').map((ch, i) => (
                            <span
                                key={i}
                                className="hp-hero__scroll-char"
                                style={{ animationDelay: `${i * 0.12}s` }}
                            >
                                {ch}
                            </span>
                        ))}
                    </div>
                    <div className="hp-hero__scroll-line" />
                </motion.div>

                <div className="hp-hero__rule" />
            </section>

            {/* ══════════════════════════════════════
                MARQUEE DIVIDER
                ══════════════════════════════════════ */}
            <div className="hp-marquee" aria-hidden="true">
                <div className="hp-marquee__track">
                    {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                        <span key={i} className="hp-marquee__item">
                            {item}
                            <span className="hp-marquee__dot" />
                        </span>
                    ))}
                </div>
            </div>

            {/* ══════════════════════════════════════
                STATS STRIP — 3-column info bar
                ══════════════════════════════════════ */}
            <ScrollReveal revealType="slide" duration={0.8} distance={30}>
                <div className="hp-about-strip">
                    <div className="hp-about-strip__inner">
                        {STATS.map((stat, i) => (
                            <React.Fragment key={stat.label}>
                                <div className="hp-about-strip__cell">
                                    <span className="hp-about-strip__cell-label">{stat.label}</span>
                                    <span className="hp-about-strip__cell-value">{stat.value}</span>
                                    <span className="hp-about-strip__cell-sub">{stat.sub}</span>
                                </div>
                                {i < STATS.length - 1 && (
                                    <div className="hp-about-strip__divider" aria-hidden="true" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* ══════════════════════════════════════
                ALL RELEASES — Card Grid
                ══════════════════════════════════════ */}
            <section className="hp-releases">
                <ScrollReveal revealType="skew" distance={20} duration={0.8}>
                    <div className="hp-releases__header">
                        <div className="hp-releases__header-left">
                            <span className="hp-releases__label">All Releases</span>
                            {tracks.length > 0 && (
                                <span className="hp-releases__count">
                                    {String(tracks.length).padStart(2, '0')}
                                </span>
                            )}
                        </div>
                        {tracks.length > 0 && (
                            <Link to="/music" className="hp-releases__view-all">
                                View All →
                            </Link>
                        )}
                    </div>
                </ScrollReveal>

                {tracks.length === 0 ? (
                    <div className="hp-releases__empty">
                        No releases yet — check back soon.
                    </div>
                ) : (
                    <div className="hp-releases__grid">
                        {tracks.map((track, i) => (
                            <ScrollReveal 
                                key={track.id || i} 
                                revealType="blur" 
                                delay={i * 0.06}
                                distance={50}
                                duration={1.4}
                            >
                                <ReleaseCard
                                    track={track}
                                    index={i}
                                    getArtworkUrl={getArtworkUrl}
                                />
                            </ScrollReveal>
                        ))}
                    </div>
                )}
            </section>

            {/* ══════════════════════════════════════
                LOGO LOOP (preserved as-is)
                ══════════════════════════════════════ */}
            <div className="hp-loop-wrap">
                <ScrollReveal revealType="scale" delay={0.1} distance={40} duration={1.1}>
                    <LogoLoop />
                </ScrollReveal>
            </div>

            {/* FOOTER */}
            <div className="hp-footer-wrap">
                <ScrollReveal direction="none" distance={0}>
                    <Footer />
                </ScrollReveal>
            </div>

        </div>
    )
}

/* ── Animated Social Links ────────────────────────────
   Mirrors LoadingSequencer Phase 1 pill animation:
   each pill slides up from Y+20 + fades in, staggered
   ─────────────────────────────────────────────────── */

const pillVariant = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.94,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
        },
    },
}

function SocialLinksAnimated({ socials }) {
    const activeSocials = Object.entries(socials).filter(([, url]) => url)

    return (
        <div className="artist-social-links hp-hero__social">
            {activeSocials.map(([key, url]) => (
                <motion.a
                    key={key}
                    href={url}
                    className={`social-link ${key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={pillVariant}
                    whileHover={{
                        y: -4,
                        scale: 1.02,
                        transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] }
                    }}
                >
                    {SOCIAL_ICONS[key] || SOCIAL_ICONS.link}
                    {SOCIAL_LABELS[key] || 'Link'}
                </motion.a>
            ))}
        </div>
    )
}
