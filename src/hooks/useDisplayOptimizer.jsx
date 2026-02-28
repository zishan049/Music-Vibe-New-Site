import { useEffect, useState, useRef } from 'react';

/**
 * useDisplayOptimizer — Full-power display optimizer that maintains 60 FPS
 * 
 * Features:
 * - Instant (no debounce) viewport scaling with --vh and --scale-factor
 * - Active FPS monitoring via requestAnimationFrame
 * - Dynamic quality controls (--perf-quality, --perf-blur-allowed, --perf-animation-speed)
 * - Automatic quality degradation when FPS drops, restoration when stable
 * - Device classification (mobile/tablet/desktop) and resolution detection
 */
export default function useDisplayOptimizer() {
    const [dimensions, setDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1920,
        height: typeof window !== 'undefined' ? window.innerHeight : 1080,
    });

    const fpsRef = useRef({
        frames: [],
        quality: 'high',       // high | medium | low
        stableFrames: 0,        // count of consecutive stable frames for quality restore
        lastFrameTime: 0,
        animId: null,
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const root = document.documentElement;
        const fps = fpsRef.current;

        // ═══ VIEWPORT HANDLER (instant, no debounce) ═══
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setDimensions({ width, height });

            // 1. Fix mobile viewport height (100vh includes address bar on iOS/Android)
            const vh = height * 0.01;
            root.style.setProperty('--vh', `${vh}px`);

            // 2. Scale multiplier based on 1920 base width
            const rawScale = width / 1920;
            const scale = Math.max(0.4, Math.min(rawScale, 1.5));
            root.style.setProperty('--scale-factor', scale);

            // 3. Device breakpoint flags
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

            // 4. Super-wide / Ultra-HD
            if (width > 2560) {
                document.body.setAttribute('data-resolution', 'ultrawide');
            } else {
                document.body.setAttribute('data-resolution', 'standard');
            }
        };

        // Initialize viewport immediately
        handleResize();

        // ═══ FPS MONITORING LOOP ═══
        function setQuality(level) {
            if (fps.quality === level) return;
            fps.quality = level;
            root.setAttribute('data-perf-quality', level);

            switch (level) {
                case 'high':
                    root.style.setProperty('--perf-blur-allowed', '1');
                    root.style.setProperty('--perf-animation-speed', '1');
                    root.style.setProperty('--perf-particle-density', '1');
                    break;
                case 'medium':
                    root.style.setProperty('--perf-blur-allowed', '0');
                    root.style.setProperty('--perf-animation-speed', '1.3');
                    root.style.setProperty('--perf-particle-density', '0.7');
                    break;
                case 'low':
                    root.style.setProperty('--perf-blur-allowed', '0');
                    root.style.setProperty('--perf-animation-speed', '2');
                    root.style.setProperty('--perf-particle-density', '0.4');
                    break;
            }
        }

        // Start at high quality
        setQuality('high');

        function fpsLoop(now) {
            if (fps.lastFrameTime > 0) {
                const delta = now - fps.lastFrameTime;
                const currentFps = 1000 / delta;

                // Keep rolling window of last 30 frames
                fps.frames.push(currentFps);
                if (fps.frames.length > 30) fps.frames.shift();

                // Average FPS over the window
                if (fps.frames.length >= 10) {
                    const avgFps = fps.frames.reduce((a, b) => a + b, 0) / fps.frames.length;

                    if (avgFps < 40) {
                        // Critical FPS drop — go to low quality immediately
                        setQuality('low');
                        fps.stableFrames = 0;
                    } else if (avgFps < 52) {
                        // Moderate FPS drop
                        if (fps.quality === 'high') {
                            setQuality('medium');
                        } else if (fps.quality === 'medium') {
                            setQuality('low');
                        }
                        fps.stableFrames = 0;
                    } else if (avgFps >= 57) {
                        // Stable high FPS — count up for quality restore
                        fps.stableFrames++;

                        // After ~2 seconds (120 frames at 60fps) of stability, try restoring
                        if (fps.stableFrames > 120) {
                            if (fps.quality === 'low') {
                                setQuality('medium');
                            } else if (fps.quality === 'medium') {
                                setQuality('high');
                            }
                            fps.stableFrames = 0;
                        }
                    }
                }
            }

            fps.lastFrameTime = now;
            fps.animId = requestAnimationFrame(fpsLoop);
        }

        fps.animId = requestAnimationFrame(fpsLoop);

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
