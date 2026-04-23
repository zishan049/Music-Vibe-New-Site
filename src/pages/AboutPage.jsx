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
                        <a href="https://discord.gg/PJXdZtDMKF" className="cta">CONTACT ME</a>
                    </ScrollReveal>
                </section>
            </main>

            <ScrollReveal direction="none" distance={0}>
                <Footer />
            </ScrollReveal>
        </div>
    )
}
