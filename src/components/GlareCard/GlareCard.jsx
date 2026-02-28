import { useRef, useCallback } from 'react'
import './GlareCard.css'

/**
 * GlareCard — 3D tilt + glare hover effect
 * Ported from GlareHover.js
 */
export default function GlareCard({ children, className = '' }) {
    const cardRef = useRef(null)
    const glareRef = useRef(null)
    const isHoveredRef = useRef(false)

    const handleMouseEnter = useCallback(() => {
        isHoveredRef.current = true
        const card = cardRef.current
        if (card) {
            card.style.transition = 'transform 800ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }
        if (glareRef.current) {
            glareRef.current.style.opacity = '1'
        }
    }, [])

    const handleMouseMove = useCallback((e) => {
        if (!isHoveredRef.current || !cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const xPercent = x / rect.width
        const yPercent = y / rect.height
        const tiltX = (yPercent - 0.5) * -20
        const tiltY = (xPercent - 0.5) * 20

        cardRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`

        if (glareRef.current) {
            glareRef.current.style.transform = `translate(${x}px, ${y}px)`
        }
    }, [])

    const handleMouseLeave = useCallback(() => {
        isHoveredRef.current = false
        const card = cardRef.current
        if (card) {
            card.style.transition = 'transform 800ms cubic-bezier(0.4, 0, 0.2, 1)'
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
        }
        if (glareRef.current) {
            glareRef.current.style.opacity = '0'
        }
    }, [])

    return (
        <div
            ref={cardRef}
            className={`glare-card card ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="glare-wrapper">
                <div className="glare" ref={glareRef} />
            </div>
            {children}
        </div>
    )
}
