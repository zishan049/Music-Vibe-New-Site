import { useEffect, useState, useRef } from 'react';

/**
 * useDisplayOptimizer — Strict 60 FPS display optimizer
 * 
 * Features:
 * - Instant viewport scaling (--vh, --scale-factor) with NO debounce
 * - Aggressive rAF-based FPS monitoring with tight 60 FPS target
 * - Fast reaction: drops quality within 5 frames of detecting jank
 * - Frame budget tracking: each frame has a 16.67ms budget
 * - Jank detection: flags individual frames > 20ms as jank
 * - Dynamic quality controls via CSS vars and data attributes
 * - Automatic quality restoration after sustained 60 FPS
 * - GPU compositing hints on animated elements (safe for existing transforms)
 */
export default function useDisplayOptimizer() {
    const [dimensions, setDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1920,
        height: typeof window !== 'undefined' ? window.innerHeight : 1080,
    });

    const fpsRef = useRef({
        frameTimes: [],        // Last N frame deltas (ms)
        jankCount: 0,          // Consecutive janky frames
        quality: 'high',       // high | medium | low
        stableCount: 0,        // Consecutive good frames for quality restore
        lastFrameTime: 0,
        animId: null,
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const root = document.documentElement;
        const fps = fpsRef.current;

        // ═══ CONSTANTS ═══
        const JANK_THRESHOLD_MS = 20;        // Frame > 20ms = jank
        const SEVERE_JANK_MS = 33;           // Frame > 33ms = severe jank (below 30fps)
        const WINDOW_SIZE = 20;              // Rolling window for FPS averaging
        const QUICK_REACT_FRAMES = 5;        // Drop quality after this many janky frames
        const RESTORE_FRAMES = 180;          // ~3 seconds at 60fps before restoring quality

        // ═══ VIEWPORT HANDLER (instant, zero debounce) ═══
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setDimensions({ width, height });

            // 1. Mobile viewport height fix
            const vh = height * 0.01;
            root.style.setProperty('--vh', `${vh}px`);

            // 2. Scale multiplier (base 1920)
            const rawScale = width / 1920;
            const scale = Math.max(0.4, Math.min(rawScale, 1.5));
            root.style.setProperty('--scale-factor', scale);

            // 3. Device breakpoints
            const isMobile = width <= 768;
            const isTablet = width > 768 && width <= 1024;
            const isDesktop = width > 1024;

            root.style.setProperty('--is-mobile', isMobile ? '1' : '0');
            root.style.setProperty('--is-tablet', isTablet ? '1' : '0');
            root.style.setProperty('--is-desktop', isDesktop ? '1' : '0');

            if (isMobile) {
                document.body.setAttribute('data-device', 'mobile');
            } else if (isTablet) {
                document.body.setAttribute('data-device', 'tablet');
            } else {
                document.body.setAttribute('data-device', 'desktop');
            }

            // 4. Ultra-wide detection
            if (width > 2560) {
                document.body.setAttribute('data-resolution', 'ultrawide');
            } else {
                document.body.setAttribute('data-resolution', 'standard');
            }
        };

        handleResize();

        // ═══ QUALITY CONTROL ═══
        function setQuality(level) {
            if (fps.quality === level) return;
            fps.quality = level;
            root.setAttribute('data-perf-quality', level);

            switch (level) {
                case 'high':
                    root.style.setProperty('--perf-blur-allowed', '1');
                    root.style.setProperty('--perf-animation-speed', '1');
                    root.style.setProperty('--perf-particle-density', '1');
                    root.style.setProperty('--perf-transition-allowed', '1');
                    root.style.setProperty('--perf-shadow-allowed', '1');
                    break;
                case 'medium':
                    root.style.setProperty('--perf-blur-allowed', '0');
                    root.style.setProperty('--perf-animation-speed', '1.5');
                    root.style.setProperty('--perf-particle-density', '0.6');
                    root.style.setProperty('--perf-transition-allowed', '1');
                    root.style.setProperty('--perf-shadow-allowed', '1');
                    break;
                case 'low':
                    root.style.setProperty('--perf-blur-allowed', '0');
                    root.style.setProperty('--perf-animation-speed', '2.5');
                    root.style.setProperty('--perf-particle-density', '0.3');
                    root.style.setProperty('--perf-transition-allowed', '0');
                    root.style.setProperty('--perf-shadow-allowed', '0');
                    break;
            }
        }

        setQuality('high');

        // ═══ FPS MONITOR LOOP ═══
        function fpsLoop(now) {
            if (fps.lastFrameTime > 0) {
                const delta = now - fps.lastFrameTime;

                // Track frame times in rolling window
                fps.frameTimes.push(delta);
                if (fps.frameTimes.length > WINDOW_SIZE) fps.frameTimes.shift();

                // Individual frame jank detection
                const isJanky = delta > JANK_THRESHOLD_MS;
                const isSevereJank = delta > SEVERE_JANK_MS;

                if (isSevereJank) {
                    // Severe jank — immediate quality drop
                    fps.jankCount += 3; // Weight severe jank heavily
                    fps.stableCount = 0;
                } else if (isJanky) {
                    fps.jankCount++;
                    fps.stableCount = 0;
                } else {
                    // Good frame
                    fps.jankCount = Math.max(0, fps.jankCount - 1); // Slowly recover jank counter
                    fps.stableCount++;
                }

                // React quickly to sustained jank
                if (fps.jankCount >= QUICK_REACT_FRAMES) {
                    if (fps.quality === 'high') {
                        setQuality('medium');
                    } else if (fps.quality === 'medium') {
                        setQuality('low');
                    }
                    fps.jankCount = 0;
                    fps.stableCount = 0;
                }

                // Also check average FPS from the window
                if (fps.frameTimes.length >= WINDOW_SIZE) {
                    const avgDelta = fps.frameTimes.reduce((a, b) => a + b, 0) / fps.frameTimes.length;
                    const avgFps = 1000 / avgDelta;

                    if (avgFps < 45) {
                        // Average is critically low — force to lowest
                        setQuality('low');
                        fps.stableCount = 0;
                        fps.jankCount = 0;
                    } else if (avgFps < 55 && fps.quality === 'high') {
                        // Not hitting 60 target — drop one level
                        setQuality('medium');
                        fps.stableCount = 0;
                    }
                }

                // Restore quality after sustained good performance
                if (fps.stableCount >= RESTORE_FRAMES) {
                    if (fps.quality === 'low') {
                        setQuality('medium');
                    } else if (fps.quality === 'medium') {
                        setQuality('high');
                    }
                    fps.stableCount = 0;
                }
            }

            fps.lastFrameTime = now;
            fps.animId = requestAnimationFrame(fpsLoop);
        }

        fps.animId = requestAnimationFrame(fpsLoop);

        // ═══ GPU COMPOSITING HINTS ═══
        // Force GPU layers on key animated elements for better compositing
        // NOTE: Don't override transform on elements that use it for positioning (e.g. dock)
        requestAnimationFrame(() => {
            const gpuElements = document.querySelectorAll(
                '.zl-overlay, .zl-p1, .zl-p2, #particle-canvas, .particle-canvas, .art-card, .marquee__inner, .pc-card, .logo-loop-track'
            );
            gpuElements.forEach(el => {
                el.style.willChange = 'transform, opacity';
                if (!el.style.transform) {
                    el.style.transform = 'translateZ(0)';
                }
            });
            // Dock: only add will-change, don't touch transform (it uses translateX(-50%))
            const dock = document.querySelector('.dock-container');
            if (dock) dock.style.willChange = 'opacity';
        });

        // ═══ EVENT LISTENERS ═══
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        return () => {
            if (fps.animId) cancelAnimationFrame(fps.animId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, []);

    return dimensions;
}
