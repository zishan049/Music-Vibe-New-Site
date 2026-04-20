import SocialLinks from '../components/SocialLinks/SocialLinks'
import Footer from '../components/Footer/Footer'
import DecryptedText from '../components/DecryptedText/DecryptedText'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'

export default function AboutPage() {
    return (
        <>
            <main className="artists-listing-page">
                <ScrollReveal>
                    <section className="artists-page-hero">
                        <div className="hero-card">
                            <h1>
                                <DecryptedText text="About" animateOn="view" sequential={true} speed={25} />
                            </h1>
                            <p>
                                <DecryptedText text="The story behind the sound." animateOn="view" sequential={true} speed={12} />
                            </p>
                            <div className="glow-bar" />
                        </div>
                    </section>
                </ScrollReveal>

                <section className="about-content-section">
                    <div className="about-grid-container">
                        {/* ── The Beginning ────────────────────────────── */}
                        <ScrollReveal delay={0.1}>
                            <article className="about-card">
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
                            <article className="about-card">
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
                <ScrollReveal>
                    <section className="about-social-section">
                        <h2 className="gradient-title">Connect With Me</h2>
                        <p>Follow the journey and stay updated with the latest releases</p>
                        <SocialLinks className="about-social-icons" />
                    </section>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                    <section className="artists-cta-section" id="contact">
                        <h2>Get in Touch</h2>
                        <p>For bookings, collaborations, or just to say hi.</p>
                        <a href="https://discord.gg/PJXdZtDMKF" className="cta">CONTACT ME</a>
                    </section>
                </ScrollReveal>
            </main>

            <ScrollReveal direction="none" distance={0}>
                <Footer />
            </ScrollReveal>
        </>
    )
}
