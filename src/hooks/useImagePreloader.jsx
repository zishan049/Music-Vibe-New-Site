import { useState, useEffect, useRef } from 'react'

/**
 * useImagePreloader — batch-based image preloader
 * 
 * Loads images in small batches (default 2 at a time) to avoid
 * overwhelming the browser's network + decode pipeline, keeping
 * the main thread free for 60 FPS animations.
 * 
 * Each batch waits for a rAF idle gap before starting so that
 * image decode work doesn't compete with rendering frames.
 * 
 * Returns { progress (0–1), isComplete, loadedCount, totalCount }
 */
export default function useImagePreloader(imageUrls = [], batchSize = 2) {
    const [state, setState] = useState({
        progress: 0,
        isComplete: false,
        loadedCount: 0,
        totalCount: imageUrls.length,
    })
    const startedRef = useRef(false)

    useEffect(() => {
        if (startedRef.current || imageUrls.length === 0) {
            if (imageUrls.length === 0) {
                setState({ progress: 1, isComplete: true, loadedCount: 0, totalCount: 0 })
            }
            return
        }
        startedRef.current = true

        const total = imageUrls.length
        let loaded = 0
        let cancelled = false

        // Load a single image, returns a promise
        function loadImage(url) {
            return new Promise(resolve => {
                const img = new Image()
                img.onload = () => resolve(true)
                img.onerror = () => resolve(false) // Don't hang on errors
                img.src = url
            })
        }

        // Wait for a rAF idle gap — ensures we don't start new network
        // requests in the middle of a paint, keeping frames smooth
        function waitForIdleFrame() {
            return new Promise(resolve => {
                requestAnimationFrame(() => {
                    // Double-rAF trick: first rAF fires at frame start,
                    // second fires after paint — safest time to start I/O
                    requestAnimationFrame(() => resolve())
                })
            })
        }

        async function runBatches() {
            // Split URLs into batches
            const batches = []
            for (let i = 0; i < total; i += batchSize) {
                batches.push(imageUrls.slice(i, i + batchSize))
            }

            for (const batch of batches) {
                if (cancelled) return

                // Wait for an idle frame before firing the next batch
                await waitForIdleFrame()

                if (cancelled) return

                // Load this batch concurrently
                await Promise.all(batch.map(url => loadImage(url)))

                loaded += batch.length
                const progress = Math.min(loaded / total, 1)
                const isComplete = loaded >= total

                if (!cancelled) {
                    setState({
                        progress,
                        isComplete,
                        loadedCount: loaded,
                        totalCount: total,
                    })
                }
            }

            // All batches done
            if (!cancelled) {
                window.dispatchEvent(new CustomEvent('preload-complete'))
            }
        }

        runBatches()

        // Safety timeout: if images haven't loaded in 12s, force complete
        const safetyTimeout = setTimeout(() => {
            if (!cancelled && loaded < total) {
                setState({
                    progress: 1,
                    isComplete: true,
                    loadedCount: loaded,
                    totalCount: total,
                })
                window.dispatchEvent(new CustomEvent('preload-complete'))
            }
        }, 12000)

        return () => {
            cancelled = true
            clearTimeout(safetyTimeout)
        }
    }, []) // Only run once on mount

    return state
}
