import { Routes, Route, useLocation } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import Dock from './components/Dock/Dock'
import FloatingLines from './components/FloatingLines/FloatingLines'
import ClickSpark from './components/ClickSpark/ClickSpark'

// Lazy load pages for performance
const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const MusicPage = lazy(() => import('./pages/MusicPage'))
const FriendsPage = lazy(() => import('./pages/FriendsPage'))

function ScrollToTop() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return null
}

export default function App() {
    // Disable right-click and protect images from drag/middle-click
    useEffect(() => {
        const blockContextMenu = (e) => {
            e.preventDefault();
        };
        const blockDragSiteWide = (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
                return false;
            }
        };
        const blockMiddleClickSiteWide = (e) => {
            // Button 1 is middle click, Button 2 is right click
            if (e.button === 1 || e.button === 2) {
                if (e.target.tagName === 'IMG') {
                    e.preventDefault();
                }
            }
        };
        document.addEventListener('contextmenu', blockContextMenu);
        document.addEventListener('dragstart', blockDragSiteWide);
        document.addEventListener('mousedown', blockMiddleClickSiteWide);
        document.addEventListener('drop', (e) => e.preventDefault());
        return () => {
            document.removeEventListener('contextmenu', blockContextMenu);
            document.removeEventListener('dragstart', blockDragSiteWide);
            document.removeEventListener('mousedown', blockMiddleClickSiteWide);
        };
    }, []);

    return (
        <ClickSpark sparkColor="#ffffff" sparkSize={12} sparkRadius={20} sparkCount={8} duration={500}>
            <FloatingLines 
                brightness={0.8}
                animationSpeed={0.5}
            />

            <Dock />
            <ScrollToTop />
            <div id="app">
                <Suspense fallback={<div style={{ background: '#000', height: '100vh', width: '100vw' }} />}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/music" element={<MusicPage />} />
                        <Route path="/friends" element={<FriendsPage />} />
                    </Routes>
                </Suspense>
            </div>
        </ClickSpark>
    )
}
