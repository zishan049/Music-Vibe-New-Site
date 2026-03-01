import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import ParticleCanvas from './components/ParticleCanvas/ParticleCanvas'
import Dock from './components/Dock/Dock'
import LoadingSequencer from './components/LoadingSequencer/LoadingSequencer'
import ClickSpark from './components/ClickSpark/ClickSpark'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import MusicPage from './pages/MusicPage'
import EmbedsPage from './pages/EmbedsPage'
import FriendsPage from './pages/FriendsPage'

function ScrollToTop() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return null
}

import useDisplayOptimizer from './hooks/useDisplayOptimizer'

export default function App() {
    // Run global display optimizer for responsive scaling and --vh calculations
    useDisplayOptimizer();

    // Protect all images from right-click Save As, drag-to-tab, and middle-click
    useEffect(() => {
        const blockContextMenu = (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
            }
        };
        const blockDrag = (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
                return false;
            }
        };
        const blockMiddleClick = (e) => {
            if (e.target.tagName === 'IMG' && (e.button === 1 || e.button === 2)) {
                e.preventDefault();
            }
        };
        document.addEventListener('contextmenu', blockContextMenu);
        document.addEventListener('dragstart', blockDrag);
        document.addEventListener('mousedown', blockMiddleClick);
        document.addEventListener('drop', (e) => e.preventDefault());
        return () => {
            document.removeEventListener('contextmenu', blockContextMenu);
            document.removeEventListener('dragstart', blockDrag);
            document.removeEventListener('mousedown', blockMiddleClick);
        };
    }, []);

    return (
        <ClickSpark sparkColor="#a78bfa" sparkSize={12} sparkRadius={20} sparkCount={8} duration={500}>
            <LoadingSequencer />
            <ParticleCanvas />
            <Dock />
            <ScrollToTop />
            <div id="app">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/music" element={<MusicPage />} />
                    <Route path="/embeds" element={<EmbedsPage />} />
                    <Route path="/friends" element={<FriendsPage />} />
                </Routes>
            </div>
        </ClickSpark>
    )
}
