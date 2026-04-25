import { useEffect } from 'react'
import './AboutPage.css'
import SocialLinks from '../components/SocialLinks/SocialLinks'
import Footer from '../components/Footer/Footer'
import DecryptedText from '../components/DecryptedText/DecryptedText'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'

export default function AboutPage() {
    useEffect(() => {
        document.title = 'About | Music Vibe'
        const metaDesc = document.querySelector('meta[name="description"]')
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Learn about the journey of Music Vibe, an independent artist crafting emotions through sound.')
        }
    }, [])

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
                    <div className="about-grid">
                        {/* ── The Beginning ────────────────────────────── */}
                        <ScrollReveal delay={0.1}>
                            <article className="about-card gpu-accelerate">
                                <div className="about-card-icon">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                                    </svg>
                                </div>
                                <h2>The Beginning</h2>
                                <p>
                                    Music Vibe started as a simple idea: to translate raw emotion into sound.
                                    What began as bedroom experiments has evolved into a journey of sonic discovery,
                                    blending melodic elements with deep, driving rhythms.
                                </p>
                            </article>
                        </ScrollReveal>

                        {/* ── The Sound ────────────────────────────────── */}
                        <ScrollReveal delay={0.2}>
                            <article className="about-card gpu-accelerate">
                                <div className="about-card-icon">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                                    </svg>
                                </div>
                                <h2>The Sound</h2>
                                <p>
                                    "Emotions in Motion" isn't just a tagline; it's the core philosophy.
                                    Every track is designed to move you, both physically and emotionally.
                                    From high-energy peaks to introspective breakdowns, the music reflects life's variety.
                                </p>
                            </article>
                        </ScrollReveal>
                    </div>

                    {/* ── The Story (Coming Soon) ─────────────────── */}
                    <div className="about-story-wrap">
                        <ScrollReveal delay={0.3}>
                            <article className="about-card story-card gpu-accelerate">
                                <div className="about-card-icon">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.1-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-3.45.3-5 1V7c1.55-.7 3.3-1 5-1 1.2 0 2.4.15 3.5.5v11z" />
                                    </svg>
                                </div>
                                <h2>The Story</h2>
                                <p>Coming Soon...</p>
                            </article>
                        </ScrollReveal>
                    </div>
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
                        <a href="https://www.instagram.com/musicvibe725/" className="cta">CONTACT ME</a>
                    </ScrollReveal>
                </section>
            </main>

            <ScrollReveal direction="none" distance={0}>
                <Footer />
            </ScrollReveal>
        </div>
    )
}
