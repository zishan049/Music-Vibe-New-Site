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
                </Routes>
            </div>
        </ClickSpark>
    )
}
