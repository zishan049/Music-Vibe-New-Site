import { useEffect, useRef } from 'react'
import { SOCIAL_ICONS, SOCIAL_LABELS } from '../../data/socialIcons'
import socialsData from '../../data/socials.json'
import './LogoLoop.css'

/**
 * LogoLoop — infinite-scrolling social icons marquee
 * Ported from inline scripts + logo-loop.css
 */
export default function LogoLoop() {
    const trackRef = useRef(null)

    // Filter out empty social links
    const activeSocials = Object.entries(socialsData).filter(([, url]) => url)

    useEffect(() => {
        const track = trackRef.current
        if (!track) return

        // After render, measure one set's width and set exact scroll distance
        requestAnimationFrame(() => {
            const gap = parseFloat(window.getComputedStyle(track).gap) || 0
            const oneSetWidth = track.scrollWidth / 4 + gap / 4
            track.style.setProperty('--scroll-distance', `-${oneSetWidth}px`)
        })
    }, [])

    // Create 4 copies for seamless infinite scroll
    const renderItems = () =>
        activeSocials.map(([key, url]) => (
            <a
                key={key}
                href={url}
                className={`logo-loop-item ${key}`}
                target="_blank"
                rel="noopener noreferrer"
                title={SOCIAL_LABELS[key] || 'Link'}
            >
                {SOCIAL_ICONS[key] || SOCIAL_ICONS.link}
                <span className="logo-loop-label">{SOCIAL_LABELS[key] || 'Link'}</span>
            </a>
        ))

    return (
        <section className="logo-loop-section">
            <p className="section-label">Find Me On</p>
            <div className="logo-loop-wrapper" aria-label="Social platform links">
                <div className="logo-loop-track" ref={trackRef}>
                    {renderItems()}
                    {renderItems()}
                    {renderItems()}
                    {renderItems()}
                </div>
            </div>
        </section>
    )
}
