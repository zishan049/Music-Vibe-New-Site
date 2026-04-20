import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Dock from './components/Dock/Dock'

import LoadingSequencer from './components/LoadingSequencer/LoadingSequencer'
import ClickSpark from './components/ClickSpark/ClickSpark'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import MusicPage from './pages/MusicPage'
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
            <LoadingSequencer />

            <Dock />
            <ScrollToTop />
            <div id="app">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/music" element={<MusicPage />} />
                    <Route path="/friends" element={<FriendsPage />} />
                </Routes>
            </div>
        </ClickSpark>
    )
}
