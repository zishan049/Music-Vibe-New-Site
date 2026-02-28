import { useEffect, useState } from 'react';

export default function useDisplayOptimizer() {
    const [dimensions, setDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1920,
        height: typeof window !== 'undefined' ? window.innerHeight : 1080,
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        let resizeTimeout;

        const handleResize = () => {
            // Debounce the resize slightly for performance
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const width = window.innerWidth;
                const height = window.innerHeight;
                setDimensions({ width, height });

                const root = document.documentElement;

                // 1. Fix mobile viewport height issues (100vh includes address bar on iOS/Android)
                // We set a --vh custom property to the actual viewport height (1% of it)
                const vh = height * 0.01;
                root.style.setProperty('--vh', `${vh}px`);

                // 2. Set an overall scale multiplier based on base width 1920
                // We clamp the minimum scale so things don't get impossibly small on tiny phones
                const rawScale = width / 1920;
                const scale = Math.max(0.4, Math.min(rawScale, 1.5));
                root.style.setProperty('--scale-factor', scale);

                // 3. Set standard breakpoints as boolean data attributes or CSS variables
                const isMobile = width <= 768;
                const isTablet = width > 768 && width <= 1024;
                const isDesktop = width > 1024;

                root.style.setProperty('--is-mobile', isMobile ? '1' : '0');
                root.style.setProperty('--is-tablet', isTablet ? '1' : '0');
                root.style.setProperty('--is-desktop', isDesktop ? '1' : '0');

                // Toggle a data-device class on body for broader CSS targeting
                if (isMobile) {
                    document.body.setAttribute('data-device', 'mobile');
                } else if (isTablet) {
                    document.body.setAttribute('data-device', 'tablet');
                } else {
                    document.body.setAttribute('data-device', 'desktop');
                }

                // 4. Handle super wide or ultra-hd screens specifically
                if (width > 2560) {
                    document.body.setAttribute('data-resolution', 'ultrawide');
                } else {
                    document.body.setAttribute('data-resolution', 'standard');
                }
            }, 50);
        };

        // Initialize on mount
        handleResize();

        // Listen for standard resize events
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        return () => {
            clearTimeout(resizeTimeout);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, []);

    return dimensions;
}
