import { useState, useEffect, useRef } from 'react'

/**
 * useImagePreloader — preloads an array of image URLs concurrently
 * Returns { progress (0–1), isComplete, loadedCount, totalCount }
 * Starts immediately on mount for zero-lag preloading during Phase 1
 */
export default function useImagePreloader(imageUrls = []) {
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
        let hasCompleted = false

        const onImageDone = () => {
            loaded++
            const progress = loaded / total
            const isComplete = loaded >= total

            setState({
                progress,
                isComplete,
                loadedCount: loaded,
                totalCount: total,
            })

            if (isComplete && !hasCompleted) {
                hasCompleted = true
                // Dispatch custom event for other components to listen
                window.dispatchEvent(new CustomEvent('preload-complete'))
            }
        }

        // Fire all image loads concurrently for maximum speed
        imageUrls.forEach(url => {
            const img = new Image()
            img.onload = onImageDone
            img.onerror = onImageDone // Count errors as "done" to avoid hanging
            img.src = url
        })

        // Safety timeout: if images haven't loaded in 12s, force complete
        const safetyTimeout = setTimeout(() => {
            if (!hasCompleted) {
                hasCompleted = true
                setState(prev => ({
                    ...prev,
                    progress: 1,
                    isComplete: true,
                }))
                window.dispatchEvent(new CustomEvent('preload-complete'))
            }
        }, 12000)

        return () => clearTimeout(safetyTimeout)
    }, []) // Only run once on mount

    return state
}
