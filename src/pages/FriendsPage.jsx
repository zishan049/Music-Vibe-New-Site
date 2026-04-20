import { useState, useRef, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import FlowingMenu from '../components/FlowingMenu/FlowingMenu'
import ProfileCard from '../components/ProfileCard/ProfileCard'
import DecryptedText from '../components/DecryptedText/DecryptedText'
import LogoLoop from '../components/LogoLoop/LogoLoop'
import Footer from '../components/Footer/Footer'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import './FriendsPage.css'

export default function FriendsPage() {
    const [friends, setFriends] = useState([])
    const [loading, setLoading] = useState(true)
    const [expandedIndex, setExpandedIndex] = useState(null)
    const dropdownRefs = useRef([])

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

    /* Toggle dropdown on menu-item click */
    const handleItemClick = (index) => {
        setExpandedIndex(prev => (prev === index ? null : index))
    }

    /* Smooth scroll to opened card */
    useEffect(() => {
        if (expandedIndex !== null && dropdownRefs.current[expandedIndex]) {
            setTimeout(() => {
                dropdownRefs.current[expandedIndex]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                })
            }, 350)
        }
    }, [expandedIndex])



    return (
        <>
            <main className="friends-page">
                {/* ── Hero ─────────────────────── */}
                <ScrollReveal>
                    <section className="artists-page-hero">
                        <div className="hero-card">
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
                    </section>
                </ScrollReveal>

                {/* ── Menu + Dropdowns ─────────── */}
                <section className="friends-menu-section">
                    <div className="friends-menu-wrapper">
                        {friends.map((friend, idx) => (
                            <ScrollReveal
                                key={idx}
                                delay={(idx % 2) * 0.1} // Modulo since it's a 2-column grid
                                distance={20}
                            >
                                <div className="friends-menu-entry">
                                    {/* Single menu item rendered inline */}
                                    <FlowingMenu
                                        items={[{
                                            text: friend.name,
                                            image: friend.image,
                                            bgSize: friend.bg_size,
                                            link: '#',
                                        }]}
                                        onItemClick={() => handleItemClick(idx)}
                                        speed={12}
                                        bgColor="transparent"
                                        textColor="#f5f5f5"
                                        marqueeBgColor="rgba(255, 255, 255, 0.1)"
                                        marqueeTextColor="#fff"
                                        borderColor="rgba(255,255,255,0.08)"
                                    />
                                    
                                    {/* Dropdown Profile Card */}
                                    <div
                                        ref={el => (dropdownRefs.current[idx] = el)}
                                        className={`friends-dropdown ${expandedIndex === idx ? 'open' : ''}`}
                                    >
                                        <div className="friends-dropdown-inner">
                                            <ProfileCard
                                                avatarUrl={friend.avatarUrl}
                                                name={friend.name}
                                                handle={friend.handle}
                                                title={friend.title}
                                                status={friend.status}
                                                showUserInfo={false}
                                                behindGlowColor="rgba(255, 255, 255, 0.4)"
                                            />
                                            {friend.site_url && (
                                                <button
                                                    className="friends-visit-btn"
                                                    onClick={() => window.open(friend.site_url, '_blank', 'noopener,noreferrer')}
                                                    type="button"
                                                >
                                                    Visit Site
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            </main>

            <ScrollReveal delay={0.2}>
                <LogoLoop />
            </ScrollReveal>
            <ScrollReveal direction="none" distance={0}>
                <Footer />
            </ScrollReveal>
        </>
    )
}
