# Music Vibe — Complete Frontend Documentation

> **Project**: Music Vibe (ZoundZ Nation)  
> **Stack**: React 19 + Vite 6 + Vanilla CSS  
> **Last Updated**: March 11, 2026

---

## Table of Contents

1. [Technology Stack](#1-technology-stack)
2. [Project Structure](#2-project-structure)
3. [Entry Points & Bootstrapping](#3-entry-points--bootstrapping)
4. [Routing & Navigation](#4-routing--navigation)
5. [Pages (5 total)](#5-pages)
6. [Components (13 total)](#6-components)
7. [Custom Hooks (2 total)](#7-custom-hooks)
8. [Data Layer](#8-data-layer)
9. [Design System & Styling](#9-design-system--styling)
10. [Asset Management](#10-asset-management)
11. [Performance Optimization](#11-performance-optimization)
12. [Image Protection System](#12-image-protection-system)
13. [Loading Sequence](#13-loading-sequence)
14. [Responsive Design](#14-responsive-design)

---

## 1. Technology Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | React | 19.0.0 |
| **Bundler** | Vite | 6.0.0 |
| **Routing** | React Router DOM | 7.1.0 |
| **Animation** | GSAP | 3.14.2 |
| **Motion** | Motion (Framer Motion) | 12.34.3 |
| **Styling** | Vanilla CSS3 | — |
| **Fonts** | Google Fonts (Inter, Montserrat, Noto Sans) | — |
| **Dev Server Port** | localhost | 3000 |

> [!NOTE]
> The project uses `"type": "module"` in `package.json`, so all imports use ESM syntax. No TypeScript — the entire codebase is `.jsx` and `.css`.

---

## 2. Project Structure

```
Music-Vibe-New-Site/
├── index.html                      # Root HTML template
├── package.json                    # Dependencies & scripts
├── vite.config.js                  # Vite config (port 3000, auto-open)
│
├── public/                         # Static assets (served as-is)
│   ├── Assets/
│   │   ├── Artwork/                # Album/EP/Single cover art (6 images)
│   │   │   ├── Dark.jpg
│   │   │   ├── RainyChords.jpg
│   │   │   ├── Resurrection.png
│   │   │   ├── Stareya.png
│   │   │   ├── With U.png
│   │   │   └── k.jpg
│   │   ├── Friends/                # Friend profile avatars & backgrounds (10 images)
│   │   │   ├── Alex.png, AlexBackgrounnd.png
│   │   │   ├── Cyu.png, CyuBackground.png
│   │   │   ├── Potassium.png, PotassiumBackground.png
│   │   │   ├── Toothless.png, ToothlessBackground.png (missing)
│   │   │   └── Ɍ4Vè ✗.png, Ɍ4VèBackground.png
│   │   ├── Themes/
│   │   │   └── Themes.css          # Legacy theme CSS
│   │   ├── Logo.jpg                # Square logo
│   │   ├── Transparent Logo.png    # Preloaded transparent logo
│   │   ├── musicvibe.png           # Main site logo (circular)
│   │   ├── amazon.svg              # Amazon Music icon
│   │   ├── bandlab.png             # BandLab icon
│   │   └── ProfileButtons.css      # Legacy CSS
│   └── Loading/                    # Legacy loading screen HTML/CSS
│       ├── Phase 1/
│       └── Phase 2/
│
├── src/                            # React source code
│   ├── main.jsx                    # App entry point
│   ├── App.jsx                     # Root component (routing, global effects)
│   ├── components/                 # 13 reusable UI components
│   │   ├── ClickSpark/
│   │   ├── DecryptedText/
│   │   ├── Dock/
│   │   ├── EmbedCard/
│   │   ├── FlowingMenu/
│   │   ├── Footer/
│   │   ├── GlareCard/
│   │   ├── GlitchText/
│   │   ├── LoadingSequencer/
│   │   ├── LogoLoop/
│   │   ├── ParticleCanvas/
│   │   ├── ProfileCard/
│   │   └── SocialLinks/
│   ├── data/                       # Content JSON + icon maps
│   │   ├── tracks.json
│   │   ├── socials.json
│   │   └── socialIcons.jsx
│   ├── hooks/                      # Custom React hooks
│   │   ├── useDisplayOptimizer.jsx
│   │   └── useImagePreloader.jsx
│   ├── pages/                      # 5 page components
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── MusicPage.jsx + MusicPage.css
│   │   ├── EmbedsPage.jsx
│   │   └── FriendsPage.jsx + FriendsPage.css
│   └── styles/
│       └── index.css               # Global stylesheet (533 lines)
│
└── dist/                           # Production build output
```

---

## 3. Entry Points & Bootstrapping

### [index.html](file:///f:/Code%20Projects/Music-Vibe-New-Site/index.html)

The root HTML file that bootstraps the app:
- Preloads the transparent logo for the loading sequence
- Loads **Google Fonts**: Inter (300/400/600/800), Montserrat (400/600/700/800), Noto Sans (400/600/700/800)
- Mounts React at `<div id="root">`
- Loads `src/main.jsx` as an ES module

### [main.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/main.jsx)

The React entry point:
- **Clears** `sessionStorage.musicvibe_loaded` on every page load — this forces the cinematic loading sequence to **always** replay on reload
- Wraps `<App />` in `<React.StrictMode>` and `<BrowserRouter>`
- Imports the global `index.css` stylesheet

### [App.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/App.jsx)

The root component. Renders, in this order:

1. **`<ClickSpark>`** — Wraps everything; adds spark particles on click anywhere
2. **`<LoadingSequencer />`** — Cinematic 2-phase loading screen (renders once per session)
3. **`<ParticleCanvas />`** — Full-screen animated particle background
4. **`<Dock />`** — Fixed navigation dock (top center)
5. **`<ScrollToTop />`** — Scrolls to top on route change (inline helper)
6. **`<Routes>`** — React Router routes for 5 pages

**Global effects in App:**
- Runs `useDisplayOptimizer()` hook for responsive scaling and FPS monitoring
- Blocks right-click, drag, and middle-click on all `<img>` elements (image protection)

---

## 4. Routing & Navigation

| Path | Component | Description |
|---|---|---|
| `/` | `<HomePage />` | Landing page with releases, feature cards, and CTA |
| `/about` | `<AboutPage />` | Origin story, philosophy, social links, contact |
| `/music` | `<MusicPage />` | Art gallery grid of all releases |
| `/embeds` | `<EmbedsPage />` | Spotify, Amazon Music, Apple Music embed players |
| `/friends` | `<FriendsPage />` | Interactive friend/collaborator profiles |

**Navigation** is handled by the **Dock** component — a fixed, floating nav bar at the top of the viewport with macOS-style icon magnification on hover.

The `ScrollToTop` utility component listens for route changes via `useLocation()` and scrolls the window to `(0, 0)` on every navigation.

---

## 5. Pages

### 5.1 HomePage — [HomePage.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/pages/HomePage.jsx)

The main landing page. Structured into these sections:

1. **Hero Header**
   - Circular logo (`musicvibe.png`)
   - Title "Music Vibe" with `<DecryptedText>` animation (scramble → reveal)
   - Tagline "Emotions in Motion" with `<DecryptedText>`
   - Glow bar divider
   - `<SocialLinks>` component
   - "LISTEN NOW" CTA button → links to `/music`

2. **All Releases Section**
   - Dynamically renders from `tracks.json`
   - Each release is an `<about-card>` styled card with:
     - 60×60px artwork thumbnail
     - Title, type (Single/EP/Album), year
     - "Upcoming" badge (purple pill) if `status === "Upcoming"`
   - Cards use staggered `fadeInUp` animation
   - Each card links to `/music`

3. **LogoLoop** — Infinite-scrolling social icons marquee

4. **Work With Us Section**
   - Three `<GlareCard>` feature cards: "Artist First", "Fast Distribution", "Pro Quality"
   - Cards have 3D tilt + glare hover effect

5. **Join the Movement Section**
   - CTA "JOIN" button → links to external ZoundZ Nation portal

6. **Footer**

---

### 5.2 AboutPage — [AboutPage.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/pages/AboutPage.jsx)

A story-driven page with glassmorphic hero card:

1. **Hero Card** (semi-transparent with backdrop blur)
   - Title "About Music Vibe" with `<DecryptedText>`
   - Subtitle with `<DecryptedText>`
   - Glow bar

2. **About Grid** (2-column auto-fit grid)
   - **"The Beginning"** card — Origin story with SVG icon
   - **"The Sound"** card — Philosophy explanation with music note SVG

3. **Social Links Section**
   - "Connect With Me" gradient title
   - `<SocialLinks>` component

4. **Contact Section**
   - "CONTACT ME" CTA → links to Discord invite

5. **Footer**

---

### 5.3 MusicPage — [MusicPage.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/pages/MusicPage.jsx) + [MusicPage.css](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/pages/MusicPage.css)

The art gallery / releases page. Key features:

1. **Hero** — Compact hero card with gradient title and `<DecryptedText>`

2. **Art Gallery Grid** (`art-gallery-grid`)
   - Responsive CSS grid: `repeat(auto-fill, minmax(300px, 1fr))`
   - Max width: 1400px
   - Each card is an `.art-card` with:
     - **1:1 aspect ratio** artwork image
     - **Rotating glow border** on hover using `conic-gradient` + CSS `@property --glow-angle`
     - **Image scale** to 1.05× on hover
     - **Overlay** on hover: gradient overlay with title, type badge, year, and external link icon
     - **GlitchText** title with per-card accent colors
     - **Accent colors** from `tracks.json` control glow and glitch shadow colors
     - **"Upcoming" badge** with pulsing cyan animation
     - `drop-shadow` glow on card hover
   - Cards have staggered `fadeInUp` entrance animation

3. **Image Protection** — Blocks right-click, drag, text selection, and middle-click

4. **LogoLoop** + **Footer**

**CSS Animations (MusicPage):**
- `glowRotate` — Rotates the conic gradient border 360° infinitely
- `@property --glow-angle` — CSS Houdini registered custom property for smooth angle interpolation
- `upcomingPulse` — Pulsing glow effect on "Upcoming" badges

---

### 5.4 EmbedsPage — [EmbedsPage.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/pages/EmbedsPage.jsx)

Streaming platform embed players:

1. **Hero** — Compact gradient title hero

2. **Embed Grid** — Three `<EmbedCard>` instances stacked vertically:
   - **Spotify** — Artist page embed (`iframe`, 352px height)
   - **Amazon Music** — Artist embed (`iframe`, 352px height)
   - **Apple Music** — Artist embed (`iframe`, 352px height)
   - Each card has a platform-colored label with SVG icon

3. **LogoLoop** + **Footer**

---

### 5.5 FriendsPage — [FriendsPage.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/pages/FriendsPage.jsx) + [FriendsPage.css](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/pages/FriendsPage.css)

Interactive collaborator profiles using an accordion-style flowing menu:

**Friend Data** (hardcoded array of 5 friends):
| Name | Title | Status | Has Site URL |
|---|---|---|---|
| Cyuuneia | Vocalist | Singing | ✅ cyuuneia.com |
| Prince Alex | Singer & Songwriter | Writing | ✅ prince-alex.com |
| Ɍ4Vè ✗ | Slap House Guy | Producing | ✅ zoundznation.onrender.com |
| Potassium | Vocalist | Singing | ❌ |
| Toothless | Vocalist | Singing | ❌ |

**Layout:**
1. **Hero Card** with `<DecryptedText>`

2. **Friends Menu Section** — 2-column grid (collapses to 1 column on mobile)
   - Each friend is rendered as a **`<FlowingMenu>`** item with full-bleed background images
   - On click → **dropdown** opens with smooth `max-height` transition:
     - **`<ProfileCard>`** with avatar, name, title, status badge
     - **"Visit Site"** button (if `siteUrl` exists)
   - Smooth scroll-into-view on dropdown open (350ms delay)
   - Only one dropdown open at a time (accordion behavior)

3. **Image Protection** — Same as MusicPage

4. **LogoLoop** + **Footer**

---

## 6. Components

### 6.1 ClickSpark — [ClickSpark.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/ClickSpark/ClickSpark.jsx)

**Purpose**: Renders spark particles on every click anywhere on the page.

**Props:**
| Prop | Default | Description |
|---|---|---|
| `sparkColor` | `#fff` | Color of spark lines |
| `sparkSize` | `10` | Length of spark lines |
| `sparkRadius` | `15` | Radius of spark explosion |
| `sparkCount` | `8` | Number of spark lines per click |
| `duration` | `400` | Animation duration (ms) |
| `easing` | `ease-out` | Easing function |
| `extraScale` | `1.0` | Distance multiplier |

**How it works:**
- Renders a full-screen `<canvas>` overlay with `pointerEvents: none` and `z-index: 9999`
- On click, creates `sparkCount` particles radiating outward from click position
- Each spark is a shrinking line that moves outward using the selected easing
- Uses `requestAnimationFrame` for smooth 60fps rendering
- Canvas auto-resizes via `ResizeObserver`

**Used in**: App.jsx (wraps the entire app)  
**Config**: `sparkColor="#a78bfa"`, `sparkSize={12}`, `sparkRadius={20}`, `sparkCount={8}`, `duration={500}`

---

### 6.2 DecryptedText — [DecryptedText.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/DecryptedText/DecryptedText.jsx)

**Purpose**: Text scramble/decrypt animation — characters randomly shuffle then resolve to the final text.

**Props:**
| Prop | Default | Description |
|---|---|---|
| `text` | — | The target text to reveal |
| `speed` | `50` | Interval (ms) between character reveals |
| `maxIterations` | `10` | Max shuffle iterations (non-sequential mode) |
| `sequential` | `false` | If true, reveals characters one-by-one |
| `revealDirection` | `start` | Direction: `start`, `end`, or `center` |
| `animateOn` | `hover` | Trigger: `hover`, `view`, or `both` |
| `characters` | A-Z + symbols | Character set for scrambling |

**How it works:**
- Uses `IntersectionObserver` for `animateOn="view"` trigger
- Characters shuffle through random glyphs while progressively revealing the real text
- In sequential mode, characters are revealed one at a time from the specified direction
- Built with `motion/react` (Framer Motion) for the wrapper `<span>`

**Used in**: HomePage, AboutPage, MusicPage, EmbedsPage, FriendsPage (all page heroes)

---

### 6.3 Dock — [Dock.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/Dock/Dock.jsx) + [Dock.css](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/Dock/Dock.css)

**Purpose**: macOS-style floating navigation dock with icon magnification.

**Navigation Items (5):**
| Icon | Route | Label |
|---|---|---|
| Home | `/` | Home |
| Person | `/about` | About |
| Spotify | `/embeds` | Embeds |
| Gallery | `/music` | Music |
| Group | `/friends` | Friends |

**Config:**
```js
baseItemSize: 44px
magnification: 72px (max size on hover)
distance: 160px (magnification falloff radius)
```

**How it works:**
- Fixed position at `top: 20px`, horizontally centered
- Glassmorphic background: `rgba(30, 30, 30, 0.65)` with `backdrop-filter: blur(20px)`
- On `mousemove`, calculates distance from cursor to each item center
- Icon size scales using a cosine curve within the `distance` radius
- Uses `requestAnimationFrame` for batched DOM updates
- Active route highlighted with purple accent (`rgba(139, 92, 246, 0.15)`)
- Hover labels appear below each icon with spring animation
- Clicking the current route scrolls to top smoothly
- Mobile: Smaller items (38px), tighter spacing

---

### 6.4 EmbedCard — [EmbedCard.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/EmbedCard/EmbedCard.jsx) + [EmbedCard.css](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/EmbedCard/EmbedCard.css)

**Purpose**: Reusable wrapper for streaming platform iframe embeds.

**Props:**
| Prop | Default | Description |
|---|---|---|
| `platform` | — | Platform key (e.g. `spotify`, `amazon`, `apple`) |
| `label` | — | Display label |
| `icon` | — | JSX icon element |
| `src` | — | iframe URL |
| `height` | `352` | iframe height in px |

**Renders**: A glassmorphic card with a colored label header and an iframe, or children as fallback.

---

### 6.5 FlowingMenu — [FlowingMenu.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/FlowingMenu/FlowingMenu.jsx) + [FlowingMenu.css](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/FlowingMenu/FlowingMenu.css)

**Purpose**: Full-width interactive menu with GSAP-powered marquee overlay on hover.

**Props:**
| Prop | Default | Description |
|---|---|---|
| `items` | `[]` | Array of `{ text, image, bgSize, link }` |
| `speed` | `15` | GSAP marquee scroll speed (seconds) |
| `textColor` | `#fff` | Default text color |
| `bgColor` | `#060010` | Menu background |
| `marqueeBgColor` | `#fff` | Marquee overlay color |
| `marqueeTextColor` | `#060010` | Marquee text color |
| `borderColor` | `#fff` | Item border color |
| `onItemClick` | — | Callback `(index) => void` |

**How it works:**
- Each menu item has a static text label and a full-bleed background image
- On hover, a **marquee overlay** slides in from the top or bottom (detected via `findClosestEdge`)
- The marquee is an infinitely-scrolling GSAP animation of repeated text
- Text repetitions are dynamically calculated based on viewport width
- Uses `expo` easing for enter/leave transitions

**Used in**: FriendsPage (one FlowingMenu per friend)

---

### 6.6 Footer — [Footer.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/Footer/Footer.jsx)

**Purpose**: Simple copyright footer.

**Renders**: `© 2026 Music Vibe. All rights reserved.`

Styled with top border, centered text, muted color. Used on all pages.

---

### 6.7 GlareCard — [GlareCard.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/GlareCard/GlareCard.jsx) + [GlareCard.css](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/GlareCard/GlareCard.css)

**Purpose**: 3D perspective tilt card with a radial light glare effect that follows the mouse.

**How it works:**
- On `mouseEnter`, enables tilt tracking with a spring transition
- On `mouseMove`, calculates cursor position as a percentage of the card
- Applies `perspective(1000px) rotateX/Y` with ±20° range and `scale3d(1.05)`
- Radial gradient "glare" follows the cursor position
- On `mouseLeave`, resets to flat with a smooth ease-out transition

**Used in**: HomePage (3 feature cards: "Artist First", "Fast Distribution", "Pro Quality")

---

### 6.8 GlitchText — [GlitchText.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/GlitchText/GlitchText.jsx) + [GlitchText.css](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/GlitchText/GlitchText.css)

**Purpose**: CSS-based glitch text effect using `::before` and `::after` pseudo-elements.

**Props:**
| Prop | Default | Description |
|---|---|---|
| `speed` | `1` | Animation speed multiplier |
| `enableShadows` | `true` | Show colored text shadows |
| `enableOnHover` | `true` | Only glitch on hover (vs. always) |
| `afterColor` | `red` | Color for `::after` shadow |
| `beforeColor` | `cyan` | Color for `::before` shadow |

**How it works:**
- Uses `content: attr(data-text)` on pseudo-elements to duplicate the text
- `clip-path: inset(...)` randomly reveals horizontal slices of the duplicated text
- Colored `text-shadow` creates chromatic aberration
- Two keyframe animations (`glitch-before` and `glitch-after`) run at different speeds

**Used in**: MusicPage (track titles on art card overlays, with per-card accent colors)

---

### 6.9 LoadingSequencer — [LoadingSequencer.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/LoadingSequencer/LoadingSequencer.jsx) + [LoadingSequencer.css](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/LoadingSequencer/LoadingSequencer.css)

**Purpose**: Cinematic 2-phase loading screen shown on first visit.

See [Section 13: Loading Sequence](#13-loading-sequence) for full details.

---

### 6.10 LogoLoop — [LogoLoop.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/LogoLoop/LogoLoop.jsx) + [LogoLoop.css](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/LogoLoop/LogoLoop.css)

**Purpose**: Infinite-scrolling marquee of social platform icons with labels.

**How it works:**
- Reads active socials from `socials.json` (filters out empty URLs)
- Renders 4× copies of the social icon list for seamless looping
- CSS `animation: logoScroll 30s linear infinite` translates the track
- Scroll distance is calculated in JS via `scrollWidth / 4` and set as `--scroll-distance`
- Edge fade mask: `mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)`
- Items are pill-shaped with icon + label, hover turns white with border highlight

**Used in**: HomePage, MusicPage, EmbedsPage, FriendsPage

---

### 6.11 ParticleCanvas — [ParticleCanvas.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/ParticleCanvas/ParticleCanvas.jsx) + [ParticleCanvas.css](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/ParticleCanvas/ParticleCanvas.css)

**Purpose**: Full-screen cinematic particle background with multiple visual layers.

**Particle Types:**

| Type | Desktop Count | Mobile Count | Description |
|---|---|---|---|
| **Dust** | 180 | 80 | Tiny drifting particles with pulse, depth parallax |
| **Orbs** | 18 | 8 | Large glowing orbs with radial gradients |
| **Nebula** | 5 | 3 | Giant soft nebula clouds (120–300px radius) |
| **Shooting Stars** | Interval: 3.5s | — | Fast-moving streaks with trails |
| **Meteors** | Interval: 8s | — | Larger, slower objects with ember-like trailing particles |
| **Comets** | Interval: 12s | — | Curved-path objects with long gradient tails |

**Visual Systems:**
- **Color Cycling**: Rotates through 6 palettes (grey, cyan, orange, green, purple, pink) over 7-second cycles with eased interpolation
- **Constellation Lines**: Spatial grid-based line connections between dust particles within 120px
- **Mouse Interaction**: Particles are repelled by the cursor within a 150px radius
- **Scaling**: Particle count scales with viewport area relative to 1920×1080
- **Breathing Animation**: CSS `canvasBreathe` animation adds subtle brightness/blur pulsing

**Performance:**
- Entire canvas runs via `requestAnimationFrame` loop
- CSS breathing animation degrades based on `data-perf-quality`:
  - `high` → Full `canvasBreathe` (brightness + blur)
  - `medium` → Simplified `canvasBreatheSimple` (brightness only)
  - `low` → No animation

---

### 6.12 ProfileCard — [ProfileCard.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/ProfileCard/ProfileCard.jsx) + [ProfileCard.css](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/ProfileCard/ProfileCard.css)

**Purpose**: Premium 3D tilt card for displaying friend/collaborator profiles.

**Props:**
| Prop | Default | Description |
|---|---|---|
| `avatarUrl` | `''` | Profile image URL |
| `name` | `'Friend'` | Display name |
| `title` | `'Artist'` | Role/title |
| `handle` | `'handle'` | Username/handle |
| `status` | `'Online'` | Status text (shown as pulsing badge) |
| `showUserInfo` | `true` | Show handle bar with contact button |
| `behindGlowEnabled` | `true` | Show glow behind the card |
| `behindGlowColor` | `rgba(139, 92, 246, 0.5)` | Glow color |
| `enableTilt` | `true` | Enable 3D mouse tracking |
| `contactUrl` | — | URL to open on button click |

**How it works:**
- Custom **tilt engine** (physics-based smoothing) with exponential decay:
  - `TAU = 0.14` (fast response during hover)
  - `TAU = 0.6` (slow intro animation)
  - Runs via `requestAnimationFrame` with delta-time calculations
- On initial mount: starts from top-right corner, smoothly eases to center
- Mouse tracking sets CSS custom properties: `--pointer-x/y`, `--rotate-x/y`, `--pointer-from-center`, etc.
- **Shine effect**: Radial gradient following pointer, blended with `soft-light`
- **Glare effect**: Elliptical radial gradient overlay
- **Behind glow**: Blurred radial spotlight following the pointer
- Card layout: full-bleed avatar (3:4 aspect ratio) with gradient overlay at bottom showing name, title, and pulsing status badge
- `React.memo` wrapped for performance

**Used in**: FriendsPage (inside each friend's dropdown)

---

### 6.13 SocialLinks — [SocialLinks.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/components/SocialLinks/SocialLinks.jsx)

**Purpose**: Renders a horizontal row of social media link badges.

**How it works:**
- Reads from `socials.json` and filters out empty URLs
- Maps each platform to its icon (from `socialIcons.jsx`) and label (from `SOCIAL_LABELS`)
- Renders as pill-shaped links with platform-specific hover colors (Spotify green, Instagram pink, etc.)

**Used in**: HomePage, AboutPage

---

## 7. Custom Hooks

### 7.1 useDisplayOptimizer — [useDisplayOptimizer.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/hooks/useDisplayOptimizer.jsx)

**Purpose**: Responsive viewport scaling + aggressive FPS-based performance management.

**Features:**

#### Viewport Handling (instant, no debounce):
- Sets `--vh` CSS variable (fixes mobile browser chrome height issues)
- Sets `--scale-factor` (ratio of viewport width to 1920px, clamped 0.4–1.5)
- Sets `--is-mobile`, `--is-tablet`, `--is-desktop` CSS variables
- Sets `data-device` and `data-resolution` body attributes

#### FPS Monitor (rAF-based):
- 20-frame rolling window for average FPS
- Jank detection: frames > 20ms flagged, > 33ms treated as severe (3× weight)
- Quality drops after 5 consecutive janky frames
- Quality restores after 180 consecutive good frames (~3 seconds)

#### Quality Levels:

| Setting | High | Medium | Low |
|---|---|---|---|
| `--perf-blur-allowed` | 1 | 0 | 0 |
| `--perf-animation-speed` | 1 | 1.5 | 2.5 |
| `--perf-particle-density` | 1 | 0.6 | 0.3 |
| `--perf-transition-allowed` | 1 | 1 | 0 |
| `--perf-shadow-allowed` | 1 | 1 | 0 |

#### GPU Compositing:
- Forces `will-change: transform, opacity` on key animated elements
- Applies `translateZ(0)` to trigger GPU layers
- Targets: loading overlay, particle canvas, art cards, marquee, profile cards, logo loop

**Used in**: App.jsx (runs globally on mount)

---

### 7.2 useImagePreloader — [useImagePreloader.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/hooks/useImagePreloader.jsx)

**Purpose**: Batch-based image preloader that loads images without blocking the main thread.

**Parameters:**
| Param | Default | Description |
|---|---|---|
| `imageUrls` | `[]` | Array of image URLs to preload |
| `batchSize` | `2` | Images loaded concurrently per batch |

**Returns:** `{ progress, isComplete, loadedCount, totalCount }`

**How it works:**
- Splits image URLs into batches of `batchSize`
- Before each batch, waits for a **double-rAF idle gap** (ensures no paint competition)
- Loads batch concurrently via `new Image()` + `Promise.all`
- Reports fractional progress (0–1)
- 12-second safety timeout: forces completion if images hang
- Dispatches `preload-complete` custom event when done
- Runs only once per mount (ref-guarded)

**Used in**: LoadingSequencer

---

## 8. Data Layer

### 8.1 tracks.json — [tracks.json](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/data/tracks.json)

Array of music releases. **Current entries (6):**

| Title | Type | Year | Status | Accent Hue |
|---|---|---|---|---|
| Dark | Single | 2025 | Released | 0 (Red) |
| Rainy Chords | Single | 2025 | Released | 35 (Orange) |
| Resurrection | Single | 2025 | Released | 210 (Blue) |
| K | Single | 2026 | Released | 340 (Pink) |
| Stareya | EP | 2026 | Released | 200 (Teal) |
| With U | Single | 2026 | Released | 300 (Purple) |

**Schema per track:**
```json
{
    "title": "string",
    "artwork": "filename.ext",        // in public/Assets/Artwork/
    "link": "URL or empty string",    // ffm.to distribution link
    "year": "YYYY",
    "type": "Single | EP | Album",
    "status": "Released | Upcoming",
    "accentColor": {
        "hue": 0-360,               // HSL hue for glow effects
        "sat": 0-100                 // HSL saturation
    }
}
```

### 8.2 socials.json — [socials.json](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/data/socials.json)

Key-value map of social platform → URL. Empty strings hide that platform.

**Active platforms:** Instagram, Spotify, Apple Music, Amazon Music, SoundCloud, YouTube, Feature.fm  
**Inactive:** BandLab, Tumblr, Other

### 8.3 socialIcons.jsx — [socialIcons.jsx](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/data/socialIcons.jsx)

Two exports:
- **`SOCIAL_ICONS`**: Object mapping platform keys → SVG JSX elements (18×18px, `fill="currentColor"`)
- **`SOCIAL_LABELS`**: Object mapping platform keys → display names (e.g. `apple` → `"Apple Music"`)

**Supported platforms:** Instagram, Spotify, Apple Music, Amazon Music, SoundCloud, YouTube, BandLab, Tumblr, Feature.fm, Link (fallback)

---

## 9. Design System & Styling

### 9.1 CSS Variables — [index.css](file:///f:/Code%20Projects/Music-Vibe-New-Site/src/styles/index.css)

```css
:root {
    --bg:              #000000;                /* Pure black background */
    --surface:         #111111;                /* Elevated surface */
    --surface-hover:   #1a1a1a;               /* Hover state */
    --card:            rgba(255, 255, 255, 0.04);  /* Card background */
    --card-border:     rgba(255, 255, 255, 0.08);  /* Card border */
    --text:            #f5f5f5;                /* Primary text */
    --text-secondary:  #a0a0a0;               /* Secondary text */
    --muted:           #666;                   /* Muted text */
    --accent:          #8b5cf6;                /* Purple accent */
    --accent-glow:     rgba(139, 92, 246, 0.4);   /* Accent glow */
    --gradient-start:  #8b5cf6;                /* Gradient purple */
    --gradient-end:    #06b6d4;                /* Gradient cyan */
    --font:            'Inter', system fonts;   /* Primary font */
    --radius:          16px;                   /* Border radius */
    --radius-sm:       10px;                   /* Small radius */
    --transition:      0.3s cubic-bezier(0.4, 0, 0.2, 1);  /* Default transition */
}
```

### 9.2 Typography

- **h1**: `clamp(2.2rem, 5vw, 3.8rem)`, weight 800, tight letter-spacing
- **h1 span / gradient text**: Purple→Cyan gradient clip
- **h2**: `clamp(1.4rem, 3vw, 2rem)`, weight 600
- **h3**: `1.1rem`, weight 600
- **Tagline**: `clamp(1rem, 2vw, 1.3rem)`, weight 300, muted color
- **Font families**: Inter (body), Montserrat (headings/cards), Noto Sans (fallback)

### 9.3 Animations

| Animation | Description |
|---|---|
| `fadeInUp` | Fade in + translate from 30px below |
| `fadeIn` | Simple opacity 0→1 |
| `slideUp` | Fade in + translate from 20px below |
| `glowRotate` | Rotate conic gradient 0→360° (MusicPage card borders) |
| `upcomingPulse` | Cyan badge glow pulse (MusicPage "Upcoming" badges) |
| `statusPulse` | Same as upcomingPulse (ProfileCard status badge) |
| `dropdownFadeIn` | Fade in + translate from -12px above (FriendsPage dropdown) |
| `logoScroll` | Infinite horizontal scroll (LogoLoop marquee) |
| `logoPulse` | Pulsing white glow (LoadingSequencer logo) |
| `canvasBreathe` | Brightness + blur pulse (ParticleCanvas) |
| `canvasBreatheSimple` | Brightness-only pulse (medium perf mode) |
| `glitch-before/after` | Clip-path + transform glitch (GlitchText) |

### 9.4 Design Patterns

- **Glassmorphism**: `backdrop-filter: blur(10-20px)` + semi-transparent backgrounds + subtle borders
- **Glow Effects**: `box-shadow` with accent color + reduced opacity
- **Gradient Text**: `background: linear-gradient(135deg, #8b5cf6, #06b6d4)` + `background-clip: text`
- **CTA Buttons**: Gradient background, rounded pill shape (50px radius), uppercase, 2px letter-spacing, hover lift + glow
- **Cards**: 4% white background, 8% white border, blur backdrop, hover raises border opacity
- **Dividers**: Gradient from `transparent` → `10% white` → `transparent`

---

## 10. Asset Management

### Static Assets (`public/Assets/`)

| Directory | Contents | Total Size |
|---|---|---|
| `Artwork/` | 6 album/EP/single cover images | ~110 MB |
| `Friends/` | 10 avatar + background images | ~51 MB |
| Root | Logo images, SVGs, legacy CSS | ~1.5 MB |

> [!IMPORTANT]
> The artwork images are very large (some up to 59 MB for `With U.png`). The `useImagePreloader` hook handles preloading these during the loading sequence to prevent janky rendering.

### Image Loading Strategy

1. **Preload** the transparent logo via `<link rel="preload">` in `index.html`
2. **Batch preload** all artwork + key friend assets during `LoadingSequencer` (2 images per batch, double-rAF gated)
3. **Lazy load** remaining images via `loading="lazy"` attribute on `<img>` tags
4. Images in the art gallery use `object-fit: cover` for consistent aspect ratios

---

## 11. Performance Optimization

### Build-Time
- **Vite** provides instant HMR and optimized production builds
- `@vitejs/plugin-react` handles JSX transform

### Runtime
- **`useDisplayOptimizer`** actively monitors FPS and degrades visual quality:
  - Disables backdrop blur filters (most expensive GPU operation)
  - Slows animation speeds
  - Reduces particle density
  - Removes transitions and shadows
- **ParticleCanvas** scales particle counts based on viewport area and device type
- **GPU compositing hints** via `will-change` and `translateZ(0)` on animated elements
- **Image preloader** uses rAF-gated batching to avoid main thread competition
- **Canvas animations** (ClickSpark, ParticleCanvas) use `requestAnimationFrame`
- **Dock magnification** uses rAF-batched DOM reads/writes
- **ProfileCard tilt engine** uses exponential-decay smoothing with early exit on convergence

---

## 12. Image Protection System

The app implements multiple layers of image protection to prevent casual downloading:

### Global (App.jsx)
- **Context menu blocked** on all `<img>` elements
- **Drag-to-save blocked** via `dragstart` event prevention
- **Middle-click and right-click blocked** on images

### CSS (index.css)
- **All images** (except `.no-protect`): `-webkit-user-drag: none`, `user-select: none`, `pointer-events: none`

### Page-Level (MusicPage, FriendsPage)
- **Additional blocking** of `contextmenu`, `dragstart`, `selectstart`, and non-left mouse clicks

---

## 13. Loading Sequence

The **LoadingSequencer** component creates a cinematic 2-phase intro:

### Phase 1: Social Pills (0–4.5s)
| Timing | Action |
|---|---|
| `0ms` | Overlay appears (black screen) |
| `500ms` | Social pills fade in with staggered delays (100ms apart) |
| | Each pill has platform color + glow (Instagram pink, Spotify green, etc.) |
| | `useImagePreloader` begins preloading all artwork in the background |
| `3000ms` | Pills exit with reverse-staggered slide-left animation |
| `4500ms` | Phase 1 fades out |

### Phase 2: Logo + Title (4.5–8.5s+)
| Timing | Action |
|---|---|
| `4500ms` | Logo scales in from 60% → 100% with pulsing white glow |
| `5200ms` | Title "Music Vibe" + tagline fade up |
| `7000ms` | Content slides UP from centered position to exact homepage header position (top: 140px) |
| `+1.5s` | If preload is complete → exit. Hard timeout: exits after 3s regardless |
| Exit | Full overlay fades out over 1.5s, then removed from DOM |

### Session Handling
- On first load: loading sequence plays, then sets `sessionStorage.musicvibe_loaded = "1"`
- On subsequent navigations (same tab): sequence is skipped
- On page reload: `main.jsx` clears the flag, so the sequence replays

### Progress Bar
- Thin gradient bar at the bottom of the screen
- Scales from 0% → 100% as images load
- Glowing dot follows the progress edge
- Hides after preload completes in Phase 2

### Preloaded Images
- All track artwork from `tracks.json`
- Key friend assets: `Cyu.png`, `CyuBackground.png`

---

## 14. Responsive Design

### Breakpoints

| Breakpoint | Device | Key Changes |
|---|---|---|
| `> 1024px` | Desktop | Full layout, all effects enabled |
| `768px – 1024px` | Tablet | `data-device="tablet"` |
| `≤ 768px` | Mobile | Reduced spacing, simplified grids, smaller dock |
| `≤ 480px` | Small Mobile | Smaller headings, 2-column art grid |
| `> 2560px` | Ultra-wide | `data-resolution="ultrawide"` |

### Mobile-Specific Adaptations
- **Dock**: Smaller items (38px), tighter gap (4px), higher position (12px)
- **Art Gallery**: `minmax(200px, 1fr)` at 768px, `repeat(2, 1fr)` at 480px
- **Content Section**: Reduced padding (16px)
- **Logo**: 90px (from 120px)
- **CTA**: Smaller padding and font
- **Embed Grid**: Single column at 768px
- **Friends Grid**: Single column at 768px
- **Particle Canvas**: Reduced particle counts (80 dust, 8 orbs, 3 nebulae)
- **LogoLoop**: Tighter gap, faster scroll (20s), smaller pills
- **Loading Pills**: Smaller padding and font on mobile
- **Loading Logo**: 90px to match viewport proportions

### CSS Techniques
- **Fluid typography**: `clamp()` for responsive font sizes
- **CSS Grid**: `auto-fit` / `auto-fill` with `minmax()` for flexible layouts
- **Viewport height fix**: `--vh` CSS variable calculated in JavaScript, used as `calc(var(--vh) * 100)` for full-height elements
- **Scale factor**: `--scale-factor` for proportional sizing based on 1920px baseline
