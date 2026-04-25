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
        to: '/music',
        label: 'Music',
        icon: (
            <svg viewBox="0 0 24 24">
                <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" />
            </svg>
        ),
    },
    {
        to: '/friends',
        label: 'Friends',
        icon: (
            <svg viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
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
