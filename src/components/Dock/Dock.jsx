import { useRef, useCallback, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Dock.css'

const NAV_ITEMS = [
    {
        to: '/',
        label: 'Home',
        icon: <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>,
    },
    {
        to: '/about',
        label: 'About',
        icon: (
            <svg viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
        ),
    },
    {
        to: '/embeds',
        label: 'Embeds',
        icon: (
            <svg viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
        ),
    },
    {
        to: '/music',
        label: 'Music',
        icon: (
            <svg viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
        ),
    },
]

const DOCK_CONFIG = {
    baseItemSize: 44,
    magnification: 72,
    distance: 160,
}

export default function Dock() {
    const wrapperRef = useRef(null)
    const mouseXRef = useRef(null)
    const isHoveringRef = useRef(false)
    const rafRef = useRef(null)
    const location = useLocation()

    const updateDockItems = useCallback(() => {
        if (!isHoveringRef.current || !wrapperRef.current) return
        const items = wrapperRef.current.querySelectorAll('.dock-item')
        items.forEach(item => {
            const rect = item.getBoundingClientRect()
            const itemCenterX = rect.left + rect.width / 2
            const dist = Math.abs(mouseXRef.current - itemCenterX)

            if (dist < DOCK_CONFIG.distance) {
                const ratio = (DOCK_CONFIG.distance - dist) / DOCK_CONFIG.distance
                const scale = (Math.cos((1 - ratio) * Math.PI) + 1) / 2
                const newSize = DOCK_CONFIG.baseItemSize + (DOCK_CONFIG.magnification - DOCK_CONFIG.baseItemSize) * scale
                item.style.setProperty('--dock-item-size', `${newSize}px`)
            } else {
                item.style.setProperty('--dock-item-size', `${DOCK_CONFIG.baseItemSize}px`)
            }
        })
        rafRef.current = requestAnimationFrame(updateDockItems)
    }, [])

    const handleMouseMove = useCallback((e) => {
        isHoveringRef.current = true
        mouseXRef.current = e.clientX
        if (!rafRef.current) {
            rafRef.current = requestAnimationFrame(updateDockItems)
        }
    }, [updateDockItems])

    const handleMouseLeave = useCallback(() => {
        isHoveringRef.current = false
        mouseXRef.current = null
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = null
        }
        if (wrapperRef.current) {
            wrapperRef.current.querySelectorAll('.dock-item').forEach(item => {
                item.style.setProperty('--dock-item-size', `${DOCK_CONFIG.baseItemSize}px`)
            })
        }
    }, [])

    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    return (
        <nav className="dock-container">
            <div
                className="dock-items-wrapper"
                ref={wrapperRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {NAV_ITEMS.map((item) => (
                    <div key={item.to} className="dock-item-wrapper">
                        <NavLink
                            to={item.to}
                            className={({ isActive }) => `dock-item${isActive ? ' active' : ''}`}
                            onClick={() => {
                                if (item.to === location.pathname) {
                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                }
                            }}
                        >
                            {item.icon}
                        </NavLink>
                        <span className="dock-label">{item.label}</span>
                    </div>
                ))}
            </div>
        </nav>
    )
}
