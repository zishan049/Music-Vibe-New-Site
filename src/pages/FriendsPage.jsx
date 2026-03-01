import { useState, useRef, useEffect } from 'react'
import FlowingMenu from '../components/FlowingMenu/FlowingMenu'
import ProfileCard from '../components/ProfileCard/ProfileCard'
import DecryptedText from '../components/DecryptedText/DecryptedText'
import LogoLoop from '../components/LogoLoop/LogoLoop'
import Footer from '../components/Footer/Footer'
import './FriendsPage.css'

/* ── Friend data ─────────────────────────────────────── */
const FRIENDS = [
    {
        name: 'Cyuuneia',
        handle: 'Cyuuneia',
        title: 'Vocalist',
        status: 'Singing',
        avatarUrl: './public/Assets/Friends/Cyu.png',
        siteUrl: 'https://cyuuneia.com/',
        image: './public/Assets/Friends/CyuBackground.png',
    },
    {
        name: 'Prince Alex',
        handle: 'Prince Alex',
        title: 'Singer & Songwriter',
        status: 'Creating vibes',
        avatarUrl: './public/Assets/Friends/PrinceAlex.png',
        siteUrl: 'https://prince-alex.com/',
        image: './public/Assets/Friends/PrinceAlex.png',
    },
]

export default function FriendsPage() {
    const [expandedIndex, setExpandedIndex] = useState(null)
    const dropdownRefs = useRef([])

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

    /* Build FlowingMenu items from friends data */
    const menuItems = FRIENDS.map(f => ({
        text: f.name,
        image: f.image,
        link: '#',
    }))

    return (
        <>
            <main className="friends-page">
                {/* ── Hero ─────────────────────── */}
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

                {/* ── Menu + Dropdowns ─────────── */}
                <section className="friends-menu-section">
                    <div className="friends-menu-wrapper">
                        {FRIENDS.map((friend, idx) => (
                            <div key={idx} className="friends-menu-entry">
                                {/* Single menu item rendered inline */}
                                <FlowingMenu
                                    items={[{
                                        text: friend.name,
                                        image: friend.image,
                                        link: '#',
                                    }]}
                                    onItemClick={() => handleItemClick(idx)}
                                    speed={12}
                                    bgColor="transparent"
                                    textColor="#f5f5f5"
                                    marqueeBgColor="rgba(139, 92, 246, 0.9)"
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
                                            behindGlowColor="rgba(139, 92, 246, 0.45)"
                                        />
                                        {friend.siteUrl && (
                                            <button
                                                className="friends-visit-btn"
                                                onClick={() => window.open(friend.siteUrl, '_blank', 'noopener,noreferrer')}
                                                type="button"
                                            >
                                                Visit Site
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <LogoLoop />
            <Footer />
        </>
    )
}
