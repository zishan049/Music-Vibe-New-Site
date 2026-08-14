import { useState, useEffect } from 'react'
import './AboutPage.css'
import { supabase } from '../lib/supabase'
import aboutData from '../data/about.json'
import { RenderAboutIcon } from '../data/aboutIcons'
import SocialLinks from '../components/SocialLinks/SocialLinks'
import Footer from '../components/Footer/Footer'
import DecryptedText from '../components/DecryptedText/DecryptedText'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'

export default function AboutPage() {
    const [cards, setCards] = useState(aboutData)
    const [loading, setLoading] = useState(true)
    const [contactUrl, setContactUrl] = useState('https://www.instagram.com/musicvibe725/')

    useEffect(() => {
        document.title = 'About | Music Vibe'
        const metaDesc = document.querySelector('meta[name="description"]')
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Learn about the journey of Music Vibe, an independent artist crafting emotions through sound.')
        }
    }, [])

    useEffect(() => {
        async function fetchCards() {
            const { data, error } = await supabase
                .from('about_cards')
                .select('*')
                .order('sort_order', { ascending: true })

            if (!error && data && data.length > 0) {
                setCards(data)
            } else {
                setCards(aboutData)
            }
            setLoading(false)
        }

        async function fetchContact() {
            const { data } = await supabase.from('socials').select('platform, url')
            if (data?.length) {
                const ig = data.find(s => s.platform === 'instagram')?.url
                const anyValid = data.find(s => s.url)?.url
                if (ig) setContactUrl(ig)
                else if (anyValid) setContactUrl(anyValid)
            }
        }

        fetchCards()
        fetchContact()

        const onVisible = () => {
            if (document.visibilityState === 'visible') {
                fetchCards()
                fetchContact()
            }
        }
        document.addEventListener('visibilitychange', onVisible)

        const channel = supabase
            .channel('about-cards-data')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'about_cards' }, fetchCards)
            .subscribe()

        const socialsChannel = supabase
            .channel('about-socials-data')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'socials' }, fetchContact)
            .subscribe()

        return () => {
            document.removeEventListener('visibilitychange', onVisible)
            supabase.removeChannel(channel)
            supabase.removeChannel(socialsChannel)
        }
    }, [])

    // Visible cards sorted by sort_order
    const visibleCards = cards.filter(c => c.is_visible !== false)
    const gridCards = visibleCards.filter(c => c.card_type !== 'story')
    const storyCards = visibleCards.filter(c => c.card_type === 'story')

    return (
        <div className="about-root">
            <main className="about-main">
                <section className="about-hero gpu-accelerate">
                    <ScrollReveal>
                        <div className="about-hero-content">
                            <h1>
                                <DecryptedText text="About" animateOn="view" sequential={true} speed={25} />
                            </h1>
                            <p>
                                <DecryptedText text="The story behind the sound." animateOn="view" sequential={true} speed={12} />
                            </p>
                            <div className="glow-bar" />
                        </div>
                    </ScrollReveal>
                </section>

                <section className="about-grid-section section-optimize">
                    {gridCards.length > 0 && (
                        <div className="about-grid">
                            {gridCards.map((card, idx) => (
                                <ScrollReveal key={card.id || idx} delay={0.1 * (idx + 1)}>
                                    <article className="about-card gpu-accelerate">
                                        <div className="about-card-icon">
                                            <RenderAboutIcon icon={card.icon} size={48} />
                                        </div>
                                        <h2>{card.title}</h2>
                                        <p>{card.description}</p>
                                    </article>
                                </ScrollReveal>
                            ))}
                        </div>
                    )}

                    {/* ── The Story (Centered Cards) ─────────────────── */}
                    {storyCards.length > 0 && (
                        <div className="about-story-wrap">
                            {storyCards.map((card, idx) => (
                                <ScrollReveal key={card.id || idx} delay={0.2 + 0.1 * idx}>
                                    <article className="about-card story-card gpu-accelerate">
                                        <div className="about-card-icon">
                                            <RenderAboutIcon icon={card.icon} size={48} />
                                        </div>
                                        <h2>{card.title}</h2>
                                        <p>{card.description}</p>
                                    </article>
                                </ScrollReveal>
                            ))}
                        </div>
                    )}
                </section>

                {/* ── Social Links Section ──────────────────────── */}
                <section className="about-socials section-optimize">
                    <ScrollReveal>
                        <h2 className="gradient-title">Connect With Me</h2>
                        <p>Follow the journey and stay updated with the latest releases</p>
                        <SocialLinks className="about-social-icons" />
                    </ScrollReveal>
                </section>

                <section className="about-cta section-optimize" id="contact">
                    <ScrollReveal delay={0.1}>
                        <h2>Get in Touch</h2>
                        <p>For bookings, collaborations, or just to say hi.</p>
                        <a href={contactUrl} target="_blank" rel="noopener noreferrer" className="cta">CONTACT ME</a>
                    </ScrollReveal>
                </section>
            </main>

            <ScrollReveal direction="none" distance={0}>
                <Footer />
            </ScrollReveal>
        </div>
    )
}
