import { Routes, Route, useLocation } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
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

    const location = useLocation();

    return (
        <ClickSpark sparkColor="#ffffff" sparkSize={12} sparkRadius={20} sparkCount={8} duration={500}>
            <FloatingLines 
                brightness={0.8}
                animationSpeed={0.5}
            />

            <Dock />
            <ScrollToTop />
            <div id="app">
                <Suspense fallback={null}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Routes location={location}>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/music" element={<MusicPage />} />
                                <Route path="/friends" element={<FriendsPage />} />
                            </Routes>
                        </motion.div>
                    </AnimatePresence>
                </Suspense>
            </div>
        </ClickSpark>
    )
}
