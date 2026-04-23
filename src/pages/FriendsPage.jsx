import { useState, useRef, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import ProfileCard from '../components/ProfileCard/ProfileCard'
import DecryptedText from '../components/DecryptedText/DecryptedText'
import LogoLoop from '../components/LogoLoop/LogoLoop'
import Footer from '../components/Footer/Footer'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import './FriendsPage.css'

export default function FriendsPage() {
    useEffect(() => {
        document.title = 'Friends | Music Vibe'
        const metaDesc = document.querySelector('meta[name="description"]')
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Meet the community and partners of Music Vibe. A network of independent creators and collaborators.')
        }
    }, [])

    const [friends, setFriends] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchFriends() {
            try {
                const { data, error } = await supabase
                    .from('friends')
                    .select('*')
                    .order('name', { ascending: true })

                if (error) throw error

                // Generate public URLs for images
                const friendsWithUrls = data.map(friend => {
                    const avatarUrl = supabase.storage
                        .from('friends')
                        .getPublicUrl(friend.avatar_url).data.publicUrl

                    const imageUrl = supabase.storage
                        .from('friends')
                        .getPublicUrl(friend.image_url).data.publicUrl

                    return {
                        ...friend,
                        avatarUrl,
                        image: imageUrl
                    }
                })

                setFriends(friendsWithUrls)
            } catch (err) {
                console.error('Error fetching friends:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchFriends()

        // Subscribe to real-time changes
        const channel = supabase
            .channel('friends-realtime')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'friends' },
                () => {
                    fetchFriends()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    // Completely disable right-click, drag, text selection, and middle-click on this page
    useEffect(() => {
        const block = (e) => e.preventDefault();
        const blockMouse = (e) => { if (e.button === 1 || e.button === 2) e.preventDefault(); };
        document.addEventListener('contextmenu', block);
        document.addEventListener('dragstart', block);
        document.addEventListener('selectstart', block);
        document.addEventListener('mousedown', blockMouse);
        return () => {
            document.removeEventListener('contextmenu', block);
            document.removeEventListener('dragstart', block);
            document.removeEventListener('selectstart', block);
            document.removeEventListener('mousedown', blockMouse);
        };
    }, []);


    return (
        <div className="friends-root">
            <main className="friends-main">
                {/* ── Hero ─────────────────────── */}
                <section className="friends-hero gpu-accelerate">
                    <ScrollReveal>
                        <div className="friends-hero-content">
                            <h1>
                                <DecryptedText text="Friends" animateOn="view" sequential={true} speed={25} />
                            </h1>
                            <p>
                                <DecryptedText
                                    text="The people behind the music. Click a name to see more."
                                    animateOn="view"
                                    sequential={true}
                                    speed={12}
                                />
                            </p>
                            <div className="glow-bar" />
                        </div>
                    </ScrollReveal>
                </section>

                {/* ── Friends Grid ─────────── */}
                <section className="friends-grid-section section-optimize">
                    {/* Row 1: Friends with Links */}
                    <div className="friends-row-container">
                        <div className="friends-grid">
                            {friends.filter(f => f.site_url).map((friend, idx) => (
                                <ScrollReveal
                                    key={friend.id || idx}
                                    delay={(idx % 4) * 0.1}
                                    distance={30}
                                >
                                    <div className="friend-card-wrapper">
                                        <ProfileCard
                                            avatarUrl={friend.avatarUrl}
                                            name={friend.name}
                                            handle={friend.handle}
                                            title={friend.title}
                                            status={friend.status}
                                            showUserInfo={false}
                                            behindGlowColor="rgba(255, 255, 255, 0.4)"
                                        />
                                        <button
                                            className="friends-visit-btn"
                                            onClick={() => window.open(friend.site_url, '_blank', 'noopener,noreferrer')}
                                            type="button"
                                        >
                                            Visit Site
                                        </button>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>

                    {/* Row 2: Friends without Links */}
                    <div className="friends-row-container second-row">
                        <div className="friends-grid">
                            {friends.filter(f => !f.site_url).map((friend, idx) => (
                                <ScrollReveal
                                    key={friend.id || idx}
                                    delay={(idx % 4) * 0.1}
                                    distance={30}
                                >
                                    <div className="friend-card-wrapper">
                                        <ProfileCard
                                            avatarUrl={friend.avatarUrl}
                                            name={friend.name}
                                            handle={friend.handle}
                                            title={friend.title}
                                            status={friend.status}
                                            showUserInfo={false}
                                            behindGlowColor="rgba(255, 255, 255, 0.4)"
                                        />
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <ScrollReveal delay={0.2}>
                <LogoLoop />
            </ScrollReveal>
            <ScrollReveal direction="none" distance={0}>
                <Footer />
            </ScrollReveal>
        </div>
    )
}
