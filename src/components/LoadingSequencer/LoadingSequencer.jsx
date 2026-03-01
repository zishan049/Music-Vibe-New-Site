import { useState, useEffect } from 'react'
import { SOCIAL_ICONS, SOCIAL_LABELS } from '../../data/socialIcons'
import useImagePreloader from '../../hooks/useImagePreloader'
import tracks from '../../data/tracks.json'
import './LoadingSequencer.css'

/**
 * LoadingSequencer — cinematic 2-phase loading screen
 * Phase 1: Colorful social pills fade in staggered → exit right-to-left
 *          + Image preloader runs in the background with progress bar
 * Phase 2: Logo scales in CENTER → title reveal → reposition UP to homepage → fade out
 *          Only exits after preload is confirmed complete
 */

// Preload artwork images from /Assets/Artwork/ + friend images from /Assets/Friends/
const PRELOAD_IMAGES = [
    ...tracks.map(t => `/Assets/Artwork/${t.artwork}`),
    // Friends page images
    './public/Assets/Friends/Cyu.png',
    './public/Assets/Friends/CyuBackground.png',
    './public/Assets/Friends/PrinceAlex.png',
]

const SOCIAL_PILLS = [
    { key: 'instagram', color: '#E1306C', shadow: 'rgba(225, 48, 108, 0.4)' },
    { key: 'spotify', color: '#1DB954', shadow: 'rgba(29, 185, 84, 0.4)' },
    { key: 'apple', color: '#FA2D48', shadow: 'rgba(250, 45, 72, 0.4)' },
    { key: 'amazon', color: '#00A8E1', shadow: 'rgba(0, 168, 225, 0.4)' },
    { key: 'soundcloud', color: '#FF5500', shadow: 'rgba(255, 85, 0, 0.4)' },
    { key: 'youtube', color: '#FF0000', shadow: 'rgba(255, 0, 0, 0.4)' },
    { key: 'featurefm', color: '#00C2CB', shadow: 'rgba(0, 194, 203, 0.4)' },
]

export default function LoadingSequencer() {
    const [visible, setVisible] = useState(() => !sessionStorage.getItem('musicvibe_loaded'))
    const [phase, setPhase] = useState('init')
    // phases: init → socials → exit-icons → phase2-logo → phase2-text → phase2-reposition → phase2-exit → done

    // Preload all images during Phase 1
    const { progress, isComplete: preloadDone } = useImagePreloader(visible ? PRELOAD_IMAGES : [])

    useEffect(() => {
        if (!visible) return

        // Phase 1: Show social icons after 500ms
        const t1 = setTimeout(() => setPhase('socials'), 500)

        // Phase 1 exit: Start icon exit at 3s
        const t2 = setTimeout(() => setPhase('exit-icons'), 3000)

        // Phase 2: Show logo CENTERED at 4.5s
        const t3 = setTimeout(() => setPhase('phase2-logo'), 4500)

        // Phase 2: Reveal title at 5.2s
        const t4 = setTimeout(() => setPhase('phase2-text'), 5200)

        // Phase 2 reposition: Slide content up to homepage position at 7s
        const t5 = setTimeout(() => setPhase('phase2-reposition'), 7000)

        return () => {
            clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
            clearTimeout(t4); clearTimeout(t5)
        }
    }, [visible])

    // Phase 2 exit: fire after reaching reposition phase
    // Prefers waiting for preload, but has a hard 3s max wait to never get stuck
    useEffect(() => {
        if (!visible) return
        if (phase !== 'phase2-reposition') return

        if (preloadDone) {
            // Preload already done — exit after 1.5s
            const exitTimer = setTimeout(() => setPhase('phase2-exit'), 1500)
            return () => clearTimeout(exitTimer)
        }

        // Preload not done yet — hard timeout: exit after 3s regardless
        const hardTimeout = setTimeout(() => setPhase('phase2-exit'), 3000)

        return () => clearTimeout(hardTimeout)
    }, [visible, phase, preloadDone])

    // Done: Remove from DOM after exit animation
    useEffect(() => {
        if (phase !== 'phase2-exit') return

        const doneTimer = setTimeout(() => {
            setVisible(false)
            sessionStorage.setItem('musicvibe_loaded', '1')
        }, 1500)

        return () => clearTimeout(doneTimer)
    }, [phase])

    if (!visible) return null

    const isPhase2 = phase.startsWith('phase2')
    const showSocials = phase === 'socials' || phase === 'exit-icons'
    const showIconsExit = phase === 'exit-icons'
    const showLogo = ['phase2-logo', 'phase2-text', 'phase2-reposition', 'phase2-exit'].includes(phase)
    const showText = ['phase2-text', 'phase2-reposition', 'phase2-exit'].includes(phase)
    const isRepositioned = ['phase2-reposition', 'phase2-exit'].includes(phase)
    const isExiting = phase === 'phase2-exit'

    return (
        <div className={`zl-overlay ${isExiting ? 'zl-phase-fullExit' : ''}`}>
            {/* ── Phase 1: Social Pills ── */}
            <div className={`zl-p1 ${showSocials ? 'zl-phase-socials' : ''
                } ${showIconsExit ? 'zl-phase-icons-exit' : ''} ${isPhase2 ? 'zl-p1-hidden' : ''
                }`}>
                <div className="zl-socials">
                    {SOCIAL_PILLS.map((pill) => (
                        <div
                            key={pill.key}
                            className={`zl-social-pill ${pill.key}`}
                            style={{
                                background: pill.color,
                                boxShadow: `0 0 15px ${pill.shadow}`,
                                borderColor: pill.shadow,
                            }}
                        >
                            {SOCIAL_ICONS[pill.key] || SOCIAL_ICONS.link}
                            <span className="pill-text">{SOCIAL_LABELS[pill.key]}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Preload Progress Bar ── */}
            <div className={`zl-progress-container ${isPhase2 && preloadDone ? 'zl-progress-hide' : ''}`}>
                <div
                    className="zl-progress-bar"
                    style={{ transform: `scaleX(${progress})` }}
                />
                <div
                    className="zl-progress-glow"
                    style={{ left: `${progress * 100}%` }}
                />
            </div>

            {/* ── Phase 2: Logo + Title ── */}
            <div className={`zl-p2 ${isPhase2 ? 'zl-p2-active' : ''} ${isRepositioned ? 'zl-p2-repositioned' : ''
                } ${isExiting ? 'zl-p2-exit' : ''}`}>
                <div className="zl-p2-content">
                    <img
                        src="/Assets/musicvibe.png"
                        alt="Music Vibe"
                        className={`zl-p2-logo ${showLogo ? 'zl-p2-logo-show' : ''}`}
                    />
                    <div className={`zl-p2-text ${showText ? 'zl-p2-text-show' : ''}`}>
                        <h1 className="zl-p2-title">Music <span>Vibe</span></h1>
                        <p className="zl-p2-tagline">Emotions in Motion</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
