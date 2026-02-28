import EmbedCard from '../components/EmbedCard/EmbedCard'
import LogoLoop from '../components/LogoLoop/LogoLoop'
import Footer from '../components/Footer/Footer'
import DecryptedText from '../components/DecryptedText/DecryptedText'

export default function EmbedsPage() {
    return (
        <>
            <main className="artists-listing-page">
                <section className="artists-page-hero" style={{ paddingBottom: '10px' }}>
                    <div className="hero-card" style={{ padding: '24px 40px', maxWidth: '480px', margin: '0 auto' }}>
                        <h1 className="embed-gradient-text" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
                            <DecryptedText text="Embeds" animateOn="view" sequential={true} speed={25} />
                        </h1>
                        <p style={{ fontSize: '0.9rem' }}>
                            <DecryptedText text="Stream directly from your favorite platforms." animateOn="view" sequential={true} speed={12} />
                        </p>
                        <div className="glow-bar" />
                    </div>
                </section>

                {/* ── Stream Embeds ─────────────────────────────── */}
                <section className="artists-grid-section" style={{ paddingTop: 0 }}>
                    <h2 className="stream-section-title embed-gradient-text">Stream Now</h2>
                    <div className="embed-grid">
                        {/* Spotify — full width */}
                        <EmbedCard
                            platform="spotify"
                            label="Spotify"
                            icon={
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="#1DB954">
                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                </svg>
                            }
                            src="https://open.spotify.com/embed/artist/5ERUSqkyJrIgjkwfvBxu6U?utm_source=generator"
                            height={352}
                        />

                        {/* Amazon Music — full width */}
                        <EmbedCard
                            platform="amazon"
                            label="Amazon Music"
                            icon={
                                <img
                                    src="/Assets/amazon.svg"
                                    alt="Amazon Music"
                                    className="embed-logo"
                                    style={{
                                        width: '22px',
                                        height: '22px',
                                        filter: 'invert(55%) sepia(90%) saturate(2000%) hue-rotate(170deg) brightness(1.1)',
                                    }}
                                />
                            }
                            src="https://music.amazon.in/embed/B0GN3HBZGT/?id=Cx1WWU1jD3&marketplaceId=IN&musicTerritory=IN"
                            height={352}
                        />

                        {/* Apple Music — full width */}
                        <EmbedCard
                            platform="apple"
                            label="Apple Music"
                            icon={
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="#FA2D48">
                                    <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.785-.49-2.166-1.373-.39-.896-.167-2.047.792-2.586.382-.214.81-.354 1.248-.427.378-.063.76-.1 1.14-.147.334-.04.666-.09.986-.18.258-.07.413-.238.462-.504.013-.066.018-.134.018-.2v-5.612c0-.318-.068-.563-.416-.646-.378-.09-.76-.152-1.144-.215l-3.39-.555c-.283-.046-.56-.103-.847-.118-.317-.017-.484.168-.52.49-.006.063-.01.127-.01.19v7.865c0 .523-.04 1.038-.28 1.51-.332.65-.842 1.048-1.54 1.217-.34.083-.682.14-1.03.165-1.004.066-1.862-.404-2.307-1.3-.393-.795-.21-1.877.595-2.492.398-.305.864-.465 1.356-.548.46-.077.93-.106 1.393-.175.276-.04.548-.103.81-.194.255-.09.395-.28.427-.55.01-.076.014-.154.014-.23V4.997c0-.314.05-.618.26-.86.16-.183.377-.29.617-.32.265-.03.533-.045.8-.063l3.907-.397c1.03-.105 2.06-.21 3.092-.31.342-.034.684-.04.99.143.217.128.38.307.443.553.046.178.06.362.06.548v5.823z" />
                                </svg>
                            }
                            src="https://embed.music.apple.com/in/artist/music-vibe/1796498369"
                            height={352}
                        />
                    </div>
                </section>

                {/* ── Logo Loop ────────────────────────────────────── */}
                <LogoLoop />
            </main>

            <Footer />
        </>
    )
}
