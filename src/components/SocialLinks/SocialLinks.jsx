import { SOCIAL_ICONS, SOCIAL_LABELS } from '../../data/socialIcons'
import socialsData from '../../data/socials.json'

/**
 * SocialLinks — renders social media link badges
 * Ported from the inline social icon loaders across all pages
 */
export default function SocialLinks({ className = '' }) {
    const activeSocials = Object.entries(socialsData).filter(([, url]) => url)

    return (
        <div className={`artist-social-links ${className}`}>
            {activeSocials.map(([key, url]) => (
                <a
                    key={key}
                    href={url}
                    className={`social-link ${key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {SOCIAL_ICONS[key] || SOCIAL_ICONS.link}
                    {SOCIAL_LABELS[key] || 'Link'}
                </a>
            ))}
        </div>
    )
}
