# Prompt
Music Vibe React - Complete Project Documentation
This document provides a complete, precise specification of the Music Vibe React project so that a fresh agent could rebuild it identically.

Brand Information
Brand Name: Music Vibe
Tagline: Emotions in Motion
Purpose: A music artist site showcasing releases, embedded music players, artist information, and collaborator networks
Logo Path: /Assets/musicvibe.png
Logo Usage:
HomePage: <img src="/Assets/musicvibe.png" alt="Music Vibe Logo" className="logo" />
AboutPage: Hero section logo display
MusicPage: Hero section logo display
EmbedsPage: Hero section logo display
LoadingSequencer: Phase 2 logo display (120x120px with 3px white border and pulse animation)
CSS Variables (Exact Values)
--bg: #000000;
--surface: #111111;
--surface-hover: #1a1a1a;
--card: rgba(255, 255, 255, 0.04);
--card-border: rgba(255, 255, 255, 0.08);
--text: #f5f5f5;
--text-secondary: #a0a0a0;
--muted: #666;
--accent: #8b5cf6;
--accent-glow: rgba(139, 92, 246, 0.4);
--gradient-start: #8b5cf6;
--gradient-end: #06b6d4;
--font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--radius: 16px;
--radius-sm: 10px;
--transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
Google Fonts Link Tag
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Montserrat:wght@400;600;700;800&family=Noto+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
Tech Stack with Versions
From package.json:

react: ^19.0.0
react-dom: ^19.0.0
react-router-dom: ^7.1.0
gsap: ^3.14.2
motion: ^12.34.3
vite: ^6.0.0 (devDependency)
@vitejs/plugin-react: ^4.3.0 (devDependency)
@types/react: ^19.0.0 (devDependency)
@types/react-dom: ^19.0.0 (devDependency)
Routes and Component Mapping
From src/App.jsx:

"/" → HomePage
"/about" → AboutPage
"/music" → MusicPage
"/embeds" → EmbedsPage
"/friends" → FriendsPage
Page Specifications
HomePage (src/pages/HomePage.jsx)
Layout:

Content section: max-width 1200px, margin: 0 auto, padding: 60px 24px
Header: text-align: center, padding: 80px 0 40px
Logo: /Assets/musicvibe.png (120x120px, border-radius: 50%, border: 3px solid rgba(255,255,255,0.9))
Tagline paragraph: "Some days calm and dreamy, some days heavy and loud.\nMusic that moves with you."
Glow bar: 80px wide, 4px high, background: linear-gradient(90deg, var(--gradient-start), var(--gradient-end))
SocialLinks component
CTA: Link to "/music" with text "LISTEN NOW"
All Releases section: maps tracks.json with artwork images
Work With Us section: three GlareCard components
Join Movement section: external link CTA
Text Strings (verbatim):

"Music Vibe"
"Emotions in Motion"
"Some days calm and dreamy, some days heavy and loud.\nMusic that moves with you."
"LISTEN NOW"
"Want to work with me & My Friends"
"Artist First\nOur pricing model is built for artists, not corporations. Keep your revenue."
"Fast Distribution\nGet your tracks on Spotify, Apple Music, and TikTok in record time."
"Pro Quality\nAccess to professional mastering feedback to ensure your bass hits perfectly."
"Join the movement"
"Click below to send us your latest heaters."
"JOIN"
State Variables: None Animations:

Track links: fadeInUp 0.5s ease forwards ${i * 0.08}s (staggered)
AboutPage (src/pages/AboutPage.jsx)
Layout:

Artists listing page: max-width 1200px, margin: 0 auto, padding: 0 24px, padding-bottom: 120px
Hero card: max-width 800px, margin: 0 auto, padding: 40px 60px, background: rgba(20,20,20,0.6), backdrop-filter: blur(12px), border: 1px solid rgba(255,255,255,0.06)
Glow bar
About grid container with two about-cards
Social section: gradient-title "Connect With Me"
CTA section: "Get in Touch" heading, paragraph, Discord CTA
Text Strings (verbatim):

"About Music Vibe"
"Emotions in Motion. The story behind the sound."
"The Beginning"
"Music Vibe started as a simple idea: to translate raw emotion into sound. What began as bedroom experiments has evolved into a journey of sonic discovery, blending melodic elements with deep, driving rhythms."
"The Sound"
""Emotions in Motion" isn't just a tagline; it's the core philosophy. Every track is designed to move you, both physically and emotionally. From high-energy peaks to introspective breakdowns, the music reflects life's variety."
"Connect With Me"
"Follow the journey and stay updated with the latest releases"
"Get in Touch"
"For bookings, collaborations, or just to say hi."
"CONTACT ME"
State Variables: None Animations:

About cards: fadeInUp 0.5s ease forwards ${i * 0.08}s (staggered)
MusicPage (src/pages/MusicPage.jsx)
Layout:

Artists listing page: max-width 1200px, margin: 0 auto, padding: 0 24px, padding-bottom: 120px
Hero card: padding 24px 40px, maxWidth 480px, margin: 0 auto
Glow bar
Art gallery: display: grid, grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)), gap: 24px, max-width: 1400px, margin: 0 auto, padding: 0 32px
Art cards: links with hover effects (scale image 1.05, rotating glow border)
GlitchText for track titles
Art card meta: type, year, upcoming badge
External link icon for tracks with links
Text Strings (verbatim):

"Music"
"The visuals behind every release."
Track titles: "Dark", "Rainy Chords", "Resurrection", "K", "Stareya", "With U"
Track types: "Single" (5), "EP" (1)
Track years: "2025" (3), "2026" (3)
"Upcoming" badge (none in current data)
External link SVG
State Variables:

[, setHoveredColor] = useState(null) (unused in render, used in mouse handlers)
Animations:

Art cards: fadeInUp 0.5s ease forwards
Rotating glow: glowRotate 2s linear infinite on hover
Upcoming badge: upcomingPulse 2s ease-in-out infinite
GlitchText: CSS-based animations (see GlitchText section)
EmbedsPage (src/pages/EmbedsPage.jsx)
Layout:

Artists listing page: max-width 1200px, margin: 0 auto, padding: 0 24px, padding-bottom: 120px
Hero card: padding 24px 40px, maxWidth 480px, margin: 0 auto
Glow bar
Embed grid: display: grid, gap: 32px, max-width: 1000px, margin: 0 auto
EmbedCard components for:
Spotify: src="https://open.spotify.com/embed/artist/5ERUSqkyJrIgjkwfvBxu6U?utm_source=generator", height={352}
Amazon Music: src="https://music.amazon.in/embed/B0GN3HBZGT/?id=Cx1WWU1jD3&marketplaceId=IN&musicTerritory=IN", height={352}
Apple Music: src="https://embed.music.apple.com/in/artist/music-vibe/1796498369", height={352}
Embed bottom row: display: grid, grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)), gap: 24px, margin-top: 24px
Text Strings (verbatim):

"Embeds"
"Stream directly from your favorite platforms."
"Stream Now"
Platform labels: "Spotify", "Amazon Music", "Apple Music"
State Variables: None Animations: None (uses EmbedCard hover effects from CSS)

FriendsPage (src/pages/FriendsPage.jsx)
Layout:

Friends page: max-width 1200px, margin: 0 auto, padding: 0 24px, padding-bottom: 120px
Hero card
Glow bar
Friends menu wrapper: max-width: 900px, margin: 0 auto, display: grid, grid-template-columns: repeat(2, 1fr), gap: 20px
Each friend entry: FlowingMenu + dropdown profile card
Profile card: avatar, name, handle, title, status, visit button (if siteUrl exists)
FRIENDS Data (verbatim from source):

const FRIENDS = [
    {
        name: 'Cyuuneia',
        handle: 'Cyuuneia',
        title: 'Vocalist',
        status: 'Singing',
        avatarUrl: '/Assets/Friends/Cyu.png',
        siteUrl: 'https://cyuuneia.com/',
        image: '/Assets/Friends/CyuBackground.png'
    },
    {
        name: 'Prince Alex',
        handle: 'Prince Alex',
        title: 'Singer & Songwriter',
        status: 'Writing',
        avatarUrl: '/Assets/Friends/Alex.png',
        siteUrl: 'https://prince-alex.com/',
        image: '/Assets/Friends/AlexBackgrounnd.png'
    },
    {
        name: 'Ɍ4Vè ✗',
        handle: 'Ɍ4Vè ✗',
        title: 'Slap House Guy',
        status: 'Producing',
        avatarUrl: '/Assets/Friends/Ɍ4Vè ✗.png',
        siteUrl: 'https://zoundznation.onrender.com/',
        image: '/Assets/Friends/Ɍ4VèBackground.png',
        bgSize: '50%'
    },
    {
        name: 'Potassium',
        handle: 'Potassium',
        title: 'Vocalist',
        status: 'Singing',
        avatarUrl: '/Assets/Friends/Potassium.png',
        image: '/Assets/Friends/PotassiumBackground.png'
    },
    {
        name: 'Toothless',
        handle: 'Toothless',
        title: 'Vocalist',
        status: 'Singing',
        avatarUrl: '/Assets/Friends/Toothless.png',
        image: '/Assets/Friends/ToothlessBackground.png'
    }
]
Text Strings (verbatim):

"Friends"
"The people behind the music. Click a name to see more."
Friend names: 'Cyuuneia', 'Prince Alex', 'Ɍ4Vè ✗', 'Potassium', 'Toothless'
Friend titles: 'Vocalist', 'Singer & Songwriter', 'Slap House Guy', 'Vocalist', 'Vocalist'
Friend statuses: 'Singing', 'Writing', 'Producing', 'Singing', 'Singing'
Visit button text: "Visit Site"
State Variables:

[expandedIndex, setExpandedIndex] = useState(null)
dropdownRefs = useRef([])
Animations: Handled by FlowingMenu component (see below)

Component Specifications
ClickSpark (src/components/ClickSpark/ClickSpark.jsx)
Props:

sparkColor: string (default '#fff')
sparkSize: number (default 10)
sparkRadius: number (default 15)
sparkCount: number (default 8)
duration: number (default 400)
easing: string (default 'ease-out')
extraScale: number (default 1.0)
children: react node
State (refs):

canvasRef: useRef(null)
sparksRef: useRef([])
startTimeRef: useRef(null)
isAnimatingRef: useRef(false)
startAnimationRef: useRef(null)
Behavior:

Creates canvas matching parent dimensions
On click: emits sparkCount sparks in circular pattern
Sparks animate outward with fading trail
Resize handling via ResizeObserver
Implements custom easing functions
Animation (values):

Spark movement: distance = eased * sparkRadius * extraScale
Trail length: sparkSize * (1 - eased)
Easing functions:
linear: t
ease-in: t * t
ease-in-out: t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
ease-out (default): t * (2 - t)
Dock (src/components/Dock/Dock.jsx)
Props: None

State (refs):

wrapperRef: useRef(null)
mouseXRef: useRef(null)
isHoveringRef: useRef(false)
rafRef: useRef(null)
location: useLocation()
Behavior:

Horizontal navigation dock with magnification effect
Nav items: Home, About, Embeds, Music, Friends (SVG icons + labels)
Active item gets 'active' class
Clicking active item scrolls to top smoothly
Mouse move: magnifies items near cursor
Mouse leave: resets all items
Constants:

NAV_ITEMS: array of {to, label, icon(SVG)}
DOCK_CONFIG:
baseItemSize: 44
magnification: 72
distance: 160
Animation (values):

Item size calculation:
ratio = (DOCK_CONFIG.distance - dist) / DOCK_CONFIG.distance
scale = (Math.cos((1 - ratio) * Math.PI) + 1) / 2
newSize = DOCK_CONFIG.baseItemSize + (DOCK_CONFIG.magnification - DOCK_CONFIG.baseItemSize) * scale
Uses requestAnimationFrame for smooth updates
DecryptedText (src/components/DecryptedText/DecryptedText.jsx)
Props:

text: string (required)
speed: number (default 50)
maxIterations: number (default 10)
sequential: boolean (default false)
revealDirection: string (default 'start')
useOriginalCharsOnly: boolean (default false)
characters: string (default 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+')
className: string (default '')
parentClassName: string (default '')
encryptedClassName: string (default '')
animateOn: string (default 'hover')
...props: spread to motion.span
State:

displayText: useState(text)
isHovering: useState(false)
isScrambling: useState(false)
revealedIndices: useState(new Set())
hasAnimated: useState(false)
containerRef: useRef(null)
Behavior:

Text scrambling effect on hover or view entry
Sequential or full scramble reveal
Optional original-character-only mode
Intersection Observer for view-based triggering
Motion-based smooth transitions
Animation (values):

Scramble interval: speed ms
Max iterations: maxIterations (default 10)
Reveal direction options: 'start', 'end', 'center'
Hover detection: mouseenter/mouseleave
View detection: IntersectionObserver (threshold: 0.1)
EmbedCard (src/components/EmbedCard/EmbedCard.jsx)
Props:

platform: string
label: string
icon: react node
src: string (optional)
height: number (default 352)
children: react node (optional)
Behavior:

Container for embed iframe
Shows label with icon and platform name
If src provided: displays iframe with specified height
If no src provided: displays children
Applies platform-specific classes: embed-card--${platform}
FlowingMenu (src/components/FlowingMenu/FlowingMenu.jsx)
Props:

items: array (default [])
speed: number (default 15)
textColor: string (default '#fff')
bgColor: string (default '#060010')
marqueeBgColor: string (default '#fff')
marqueeTextColor: string (default '#060010')
borderColor: string (default '#fff')
onItemClick: function
State (in MenuItem):

itemRef: useRef(null)
marqueeRef: useRef(null)
marqueeInnerRef: useRef(null)
animationRef: useRef(null)
repetitions: useState(4)
Behavior:

Creates marquee menu with background images
Horizontal scrolling marquee effect
Mouse enter: marquee slides in from top/bottom
Mouse leave: marquee slides out to top/bottom
Calculates repetitions for seamless loop based on viewport width
Uses GSAP for smooth animation
Item click: calls onItemClick(index)
Animation (values):

Marquee duration: speed (default 15s)
Marquee easing: 'none' (linear)
Marquee repeat: -1 (infinite)
Show/hide timeline: { duration: 0.6, ease: 'expo' }
Mouse enter animation:
Set marqueeRef.y: edge === 'top' ? '-101%' : '101%'
Set marqueeInnerRef.y: edge === 'top' ? '101%' : '-101%'
To y: '0%' for both
Mouse leave animation:
To y: edge === 'top' ? '-101%' : '101%' for both
GlareCard (src/components/GlareCard/GlareCard.jsx)
Props:

children: react node
className: string (default '')
State (refs):

cardRef: useRef(null)
glareRef: useRef(null)
isHoveredRef: useRef(false)
Behavior:

3D tilt effect on hover
Glare effect that follows mouse position
Perspective transform with rotateX/rotateY
Smooth transitions on enter/leave
Animation (values):

Mouse enter:
Card transition: 'transform 800ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
Glare opacity: '1'
Mouse move:
Card transform: perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)
Where:
tiltX = (yPercent - 0.5) * -20
tiltY = (xPercent - 0.5) * 20
xPercent = x / rect.width
yPercent = y / rect.height
Glare transform: translate(${x}px, ${y}px)
Mouse leave:
Card transition: 'transform 800ms cubic-bezier(0.4, 0, 0.2, 1)'
Card transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
Glare opacity: '0'
GlitchText (src/components/GlitchText/GlitchText.jsx)
Props:

children: string (required)
speed: number (default 1)
enableShadows: boolean (default true)
enableOnHover: boolean (default true)
className: string (default '')
afterColor: string (default 'red')
beforeColor: string (default 'cyan')
Behavior:

Creates glitch effect using CSS ::before and ::after pseudo-elements
Uses data-text attribute to duplicate content
Different animations for before and after elements
Conditional animations based on enableOnHover prop
Animation (values from GlitchText.css):

Custom properties:
--after-duration: ${speed * 3}s
--before-duration: ${speed * 2}s
--after-shadow: enableShadows ? -5px 0 ${afterColor} : 'none'
--before-shadow: enableShadows ? 5px 0 ${beforeColor} : 'none'
Keyframes glitch-before: 10-step animation with clip-path and transform values
Keyframes glitch-after: 10-step animation with different clip-path and transform values
Animation timing-function: linear
Animation iteration-count: infinite
Applied when:
Always: .glitch:not(.enable-on-hover)::before, .glitch:not(.enable-on-hover)::after { opacity: 1; }
On hover: .glitch.enable-on-hover:hover::before, .glitch.enable-on-hover:hover::after { opacity: 1; }
LogoLoop (src/components/LogoLoop/LogoLoop.jsx)
Props: None

State (ref):

trackRef: useRef(null)
Behavior:

Infinite scrolling social icons marquee
Filters socialsData to active links (non-empty URLs)
Renders 4 copies for seamless scrolling
Measures one set width on mount, sets CSS variable --scroll-distance
Applies CSS animation for continuous horizontal scroll
Animation (values):

CSS: .logo-loop-track { animation: logoScroll 30s linear infinite; }
Mobile: 20s duration (@media max-width: 768px)
Keyframes logoScroll:
from: { transform: translateX(0); }
to: { transform: translateX(var(--scroll-distance, -50%)); }
Gap: 40px (24px on mobile)
LoadingSequencer (src/components/LoadingSequencer/LoadingSequencer.jsx)
Props: None

State:

visible: useState(() => !sessionStorage.getItem('musicvibe_loaded'))
phase: useState('init')
{ progress, isComplete: preloadDone }: useImagePreloader(PRELOAD_IMAGES)
Behavior:

Cinematic 2-phase loading screen
Phase 1 (social pills):
Fade in staggered (0.1s-0.7s delays)
Image preloader progress bar
Exit right-to-left (reverse staggered 0s-0.48s delays)
Phase 2 (logo + title):
Logo: scale 0.6 → 1 with pulse animation
Title: fade in + move up 20px
Reposition: slide up to top:140px (homepage header position)
Exit: fade out after preload complete (or hard 3s timeout)
Sets sessionStorage on completion to prevent repeat shows
Constants:

PRELOAD_IMAGES:
All track artwork: /Assets/Artwork/${track.artwork} for each track
Friend images: /Assets/Friends/Cyu.png, /Assets/Friends/CyuBackground.png
SOCIAL_PILLS:
[
  { key: 'instagram', color: '#E1306C', shadow: 'rgba(225, 48, 108, 0.4)' },
  { key: 'spotify', color: '#1DB954', shadow: 'rgba(29, 185, 84, 0.4)' },
  { key: 'apple', color: '#FA2D48', shadow: 'rgba(250, 45, 72, 0.4)' },
  { key: 'amazon', color: '#00A8E1', shadow: 'rgba(0, 168, 225, 0.4)' },
  { key: 'soundcloud', color: '#FF5500', shadow: 'rgba(255, 85, 0, 0.4)' },
  { key: 'youtube', color: '#FF0000', shadow: 'rgba(255, 0, 0, 0.4)' },
  { key: 'featurefm', color: '#00C2CB', shadow: 'rgba(0, 194, 203, 0.4)' }
]
Animation (values from LoadingSequencer.css):

Phase 1 pills:
Show: opacity: 0 → 1, translateY: 20px → 0 (0.8s ease-out)
Staggered delays: nth-child(1): 0.1s, (2): 0.2s, ..., (7): 0.7s
Exit: opacity: 1 → 0, translateX: 0 → -30px (0.5s ease)
Exit staggered: nth-child(7): 0s, (6): 0.08s, ..., (1): 0.48s
Progress bar:
Width: scaleX(progress) where progress [0,1]
Glow: left: ${progress * 100}%
Phase 2:
Logo:
Initial: opacity: 0, scale: 0.6
Show: opacity: 1, scale: 1 (0.8s ease opacity, 1.2s cubic-bezier(0.23, 1, 0.32, 1) transform)
Pulse: box-shadow 0 0 20px rgba(255,255,255,0.3) → 0 0 50px rgba(255,255,255,0.6) (2s infinite alternate)
Content:
Initial: opacity: 0, translateY: 20px
Show: opacity: 1, translateY: 0 (1s ease)
Reposition: transform: translateY(calc(50vh - 280px)) → translateY(0)
Exit: opacity: 1 → 0 (1.2s ease)
Title/Tagline:
Initial: opacity: 0, translateY: 20px
Show: opacity: 1, translateY: 0 (1s ease)
ParticleCanvas (src/components/ParticleCanvas/ParticleCanvas.jsx)
Props:

overrideColor: { hue: number, sat: number } (optional)
State (refs):

canvasRef: useRef(null)
animRef: useRef(null)
stateRef: useRef(null)
Behavior:

Cinematic deep-space particle background
Multiple particle types: dust, glowing orbs, nebula clouds, shooting stars, meteors, comets
Spatial grid for connecting dust particles
Color cycling over time
Mouse position repulsion/attraction
Resize handling to recreate particles
Constants (values):

Mobile detection: window.innerWidth <= 768
Particle counts:
DUST_COUNT: mobile 80, desktop 180
ORB_COUNT: mobile 8, desktop 18
NEBULA_COUNT: mobile 3, desktop 5
Intervals:
SHOOT_INTERVAL: 3500ms
METEOR_INTERVAL: 8000ms
COMET_INTERVAL: 12000ms
Constants:
CONNECT_DIST: 120
MOUSE_RADIUS: 150
MOUSE_STRENGTH: 1.2
CYCLE_DURATION: 7000ms
Color palettes:
const PALETTES = [
  { hue: 0, sat: 0 },
  { hue: 192, sat: 100 },
  { hue: 20, sat: 95 },
  { hue: 145, sat: 70 },
  { hue: 260, sat: 65 },
  { hue: 330, sat: 85 }
]
Particle Classes (key values):

Dust:
Size: 0.5-2.2
Base alpha: 0.15-0.55
Velocity: vx: -0.25-0.25, vy: -0.15-0.15
Depth: 0.3-1
Pulse: alpha variation ±0.1
Orb:
Size: 3-7
Base alpha: 0.2-0.5
Glow size: size * 3-5
Pulse: alpha variation ±0.15, glow variation ±6
Nebula:
Size: 120-300
Base alpha: 0.02-0.06
Velocity: vx: -0.08-0.08, vy: -0.05-0.05
Pulse: alpha variation ±0.015
Hue offset: -20 to 20
ShootingStar:
Speed: 8-16
Alpha decay: 0.012-0.025
Size: 1.5-3
Trail: max 20 points
Meteor:
Speed: 3-5.5
Size: 3.5-6
Alpha decay: 0.004-0.008
Trail: max 45 points
Hue shift: -10 to 10
Wobble: 0 to 2π for trail variation
Comet:
Speed: 2.5-4.5
Size: 3-5
Alpha decay: 0.003-0.006
Trail: max 70 points
Hue shift: -30 to 30
Curve: -0.002 to 0.002 for trail bending
Animation Loop (timing):

Color update: cycleT += (time - lastTime) / CYCLE_DURATION
Nebula update/draw
Dust update/draw + spatial grid + line drawing (CONNECT_DIST threshold)
Orb update/draw
Meteor spawn: if (time - lastMeteor > METEOR_INTERVAL)
Meteor update/draw + trail + decay
Comet spawn: if (time - lastComet > COMET_INTERVAL)
Comet update/draw + trail + decay
Shooting star spawn: if (time - lastShoot > SHOOT_INTERVAL)
Shooting star update/draw + trail + decay
Request next animation frame
Event Listeners:

resize: triggers canvas resize and particle reinitialization
mousemove: updates mouseX/Y for particle interaction
Global Effects
Particles
Implemented in ParticleCanvas component:

Position: fixed, inset: 0, z-index: 0
Dimensions: width: 100vw, height: calc(var(--vh, 1vh) * 100)
Pointer-events: none
Opacity: 1 with transition
Breathing animation:
Normal: @keyframes canvasBreathe { 0%,100% { filter: brightness(1) blur(0px); } 50% { filter: brightness(1.08) blur(0.3px); } }
Medium quality: @keyframes canvasBreatheSimple { 0%,100% { filter: brightness(1); } 50% { filter: brightness(1.05); } }
Low quality: animation: none; filter: none;
Applied: #particle-canvas.particles-active { animation: canvasBreathe 8s ease-in-out infinite; }
Custom Cursor
No custom cursor implementation found in the codebase.

Noise Overlay
No explicit noise overlay, but backdrop-filter used:

Social pills: backdrop-filter: blur(6px)
Hero cards: backdrop-filter: blur(12px)
Complete File Tree
.
├── .agent/
│   ├── brandguid.md
│   ├── color.md
│   ├── rules.md
│   └── skills.md
├── .gitignore
├── FRONTEND.md
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── prompt.md
├── public/
│   ├── Assets/
│   │   ├── Artwork/
│   │   │   ├── Dark.jpg
│   │   │   ├── RainyChords.jpg
│   │   │   ├── Resurrection.png
│   │   │   ├── Stareya.png
│   │   │   ├── With U.png
│   │   │   └── k.jpg
│   │   │
│   │   ├── Friends/
│   │   │   ├── Alex.png
│   │   │   ├── AlexBackgrounnd.png
│   │   │   ├── Cyu.png
│   │   │   ├── CyuBackground.png
│   │   │   ├── Nandi Studio.png
│   │   │   ├── Potassium.png
│   │   │   ├── PotassiumBackground.png
│   │   │   ├── Toothless.png
│   │   │   ├── Ɍ4Vè ✗.png
│   │   │   └── Ɍ4VèBackground.png
│   │   │
│   │   ├── Logo.jpg
│   │   ├── ProfileButtons.css
│   │   ├── Themes/
│   │   │   └── Themes.css
│   │   ├── Transparent Logo.png
│   │   ├── amazon.svg
│   │   ├── bandlab.png
│   │   └── musicvibe.png
│   │
│   ├── Loading/
│   │   ├── Phase 1/
│   │   │   ├── Loadingicons.css
│   │   │   └── loadingscreen.html
│   │   ├── Phase 2/
│   │   │   └── phase2.html
│   │   ├── Sequncer.css
│   │   └── Sequncer.js
│   │
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   │
│   ├── components/
│   │   ├── ClickSpark/
│   │   │   └── ClickSpark.jsx
│   │   │
│   │   ├── DecryptedText/
│   │   │   └── DecryptedText.jsx
│   │   │
│   │   ├── Dock/
│   │   │   ├── Dock.css
│   │   │   └── Dock.jsx
│   │   │
│   │   ├── EmbedCard/
│   │   │   ├── EmbedCard.css
│   │   │   └── EmbedCard.jsx
│   │   │
│   │   ├── FlowingMenu/
│   │   │   ├── FlowingMenu.css
│   │   │   └── FlowingMenu.jsx
│   │   │
│   │   ├── GlareCard/
│   │   │   ├── GlareCard.css
│   │   │   └── GlareCard.jsx
│   │   │
│   │   ├── GlitchText/
│   │   │   ├── GlitchText.css
│   │   │   └── GlitchText.jsx
│   │   │
│   │   ├── LogoLoop/
│   │   │   ├── LogoLoop.css
│   │   │   └── LogoLoop.jsx
│   │   │
│   │   ├── LoadingSequencer/
│   │   │   ├── LoadingSequencer.css
│   │   │   └── LoadingSequencer.jsx
│   │   │
│   │   ├── ParticleCanvas/
│   │   │   ├── ParticleCanvas.css
│   │   │   └── ParticleCanvas.jsx
│   │   │
│   │   ├── ProfileCard/
│   │   │   ├── ProfileCard.css
│   │   │   └── ProfileCard.jsx
│   │   │
│   │   ├── SocialLinks/
│   │   │   └── SocialLinks.jsx
│   │   │
│   │   └── Footer/
│   │       └── Footer.jsx
│   │
│   ├── data/
│   │   ├── socialIcons.jsx
│   │   ├── socials.json
│   │   └── tracks.json
│   │
│   ├── hooks/
│   │   ├── useDisplayOptimizer.jsx
│   │   └── useImagePreloader.jsx
│   │
│   ├── pages/
│   │   ├── AboutPage.jsx
│   │   ├── EmbedsPage.jsx
│   │   ├── FriendsPage/
│   │   │   ├── FriendsPage.css
│   │   │   └── FriendsPage.jsx
│   │   ├── HomePage.jsx
│   │   └── MusicPage/
│   │       ├── MusicPage.css
│   │       └── MusicPage.jsx
│   │
│   └── styles/
│       └── index.css
└── vite.config.js
Data Files
tracks.json (src/data/tracks.json)
[
    {
        "title": "Dark",
        "artwork": "Dark.jpg",
        "link": "https://ffm.to/-dark",
        "year": "2025",
        "type": "Single",
        "status": "Released",
        "accentColor": { "hue": 0, "sat": 80 }
    },
    {
        "title": "Rainy Chords",
        "artwork": "RainyChords.jpg",
        "link": "https://ffm.to/rainychords",
        "year": "2025",
        "type": "Single",
        "status": "Released",
        "accentColor": { "hue": 35, "sat": 90 }
    },
    {
        "title": "Resurrection",
        "artwork": "Resurrection.png",
        "link": "https://ffm.to/wx0yao",
        "year": "2025",
        "type": "Single",
        "status": "Released",
        "accentColor": { "hue": 210, "sat": 100 }
    },
    {
        "title": "K",
        "artwork": "k.jpg",
        "link": "https://ffm.to/-K",
        "year": "2026",
        "type": "Single",
        "status": "Released",
        "accentColor": { "hue": 340, "sat": 85 }
    },
    {
        "title": "Stareya",
        "artwork": "Stareya.png",
        "link": "https://ffm.to/epstareya",
        "year": "2026",
        "type": "EP",
        "status": "Released",
        "accentColor": { "hue": 200, "sat": 60 }
    },
    {
        "title": "With U",
        "artwork": "With U.png",
        "link": "https://ffm.to/wu",
        "year": "2026",
        "type": "Single",
        "status": "Released",
        "accentColor": { "hue": 300, "sat": 80 }
    }
]
socials.json (src/data/socials.json)
{
    "instagram": "https://www.instagram.com/musicvibe725/",
    "spotify": "https://open.spotify.com/artist/5ERUSqkyJrlgjkwfvBxu6U",
    "apple": "https://music.apple.com/in/artist/music-vibe/1718336356",
    "amazon": "https://music.amazon.in/artists/B0GN3HBZGT/music-vibe",
    "soundcloud": "https://soundcloud.com/music-vibe725",
    "youtube": "https://www.youtube.com/channel/UC_8UrJEDlqUhxTdXJ6XoIqQ",
    "bandlab": "",
    "tumblr": "",
    "featurefm": "https://ffm.bio/music-vibe",
    "other": ""
}
socialIcons.jsx (src/data/socialIcons.jsx)
Exports:

SOCIAL_ICONS: object mapping platform names to SVG JSX elements
instagram, spotify, apple, amazon, soundcloud, youtube, bandlab, tumblr, featurefm, link
SOCIAL_LABELS: object mapping platform names to display strings
instagram: 'Instagram'
spotify: 'Spotify'
apple: 'Apple Music'
amazon: 'Amazon Music'
soundcloud: 'SoundCloud'
youtube: 'YouTube'
bandlab: 'BandLab'
tumblr: 'Tumblr'
featurefm: 'Feature.fm'
link: 'Link'
Hooks
useDisplayOptimizer (src/hooks/useDisplayOptimizer.jsx)
Sets CSS custom property --vh for mobile viewport height correction
Runs on mount and resize
Prevents address bar issues on mobile browsers
useImagePreloader (src/hooks/useImagePreloader.jsx)
Takes array of image URLs
Returns { progress: number, isComplete: boolean }
Progress: 0-1 based on loaded/total images
Uses Image objects to preload
Tracks loading state via onload/onerror handlers
Footer (src/components/Footer/Footer.jsx)
Simple centered footer
Text: gray color, 0.85rem font size
Padding: 40px 24px
Border-top: 1px solid rgba(255,255,255,0.06)
No dynamic content