import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { SOCIAL_ICONS, SOCIAL_LABELS } from '../../data/socialIcons'
import defaultSocialsData from '../../data/socials.json'

/**
 * SocialLinks — renders social media link badges with live Supabase sync
 */
export default function SocialLinks({ className = '', socials = null }) {
    const [liveSocials, setLiveSocials] = useState(socials || defaultSocialsData)

    useEffect(() => {
        if (socials) {
            setLiveSocials(socials)
            return
        }

        async function fetchSocials() {
            const { data, error } = await supabase
                .from('socials')
                .select('platform, url')

            if (!error && data?.length) {
                const obj = {}
                data.forEach(({ platform, url }) => { obj[platform] = url })
                setLiveSocials(obj)
            }
        }

        fetchSocials()

        const onVisible = () => { if (document.visibilityState === 'visible') fetchSocials() }
        document.addEventListener('visibilitychange', onVisible)

        const channel = supabase
            .channel('socials-links-channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'socials' }, fetchSocials)
            .subscribe()

        return () => {
            document.removeEventListener('visibilitychange', onVisible)
            supabase.removeChannel(channel)
        }
    }, [socials])

    const activeSocials = Object.entries(liveSocials).filter(([, url]) => url)

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
