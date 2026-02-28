import './EmbedCard.css'

/**
 * EmbedCard — reusable embed wrapper for Spotify, Amazon, SoundCloud iframes
 */
export default function EmbedCard({ platform, label, icon, src, height = 352, children }) {
    return (
        <div className={`embed-card embed-card--${platform}`}>
            <h3 className={`embed-label embed-label--${platform}`}>
                {icon}
                {label}
            </h3>
            {src ? (
                <div className={`${platform}-embed-wrapper`}>
                    <iframe
                        src={src}
                        width="100%"
                        height={height}
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title={`${label} embed`}
                    />
                </div>
            ) : (
                children
            )}
        </div>
    )
}
