<p align="center">
  <img src="public/Assets/tp_logo.png" width="150" alt="Music Vibe Logo" />
</p>

<h1 align="center">Music Vibe</h1>

<p align="center">
  <i>A Cinematic, Music-Focused Immersive Experience</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Motion-000000?style=for-the-badge&logo=framer&logoColor=white" alt="Motion" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

---

## 📽️ The Vision
**Music Vibe** is a premium web application designed to showcase artists, releases, and collaborator networks through a **"Cinematic Dark × Editorial Luxury"** aesthetic. It is not just a website — it is an immersive environment where music meets high-end digital design.

### ✨ Key Features
- 🌌 **Generative Ambience**: Powered by Three.js `FloatingLines`, creating a living, breathing canvas of geometric light that reacts to pointer movement.
- 🖱️ **Tactile Interactions**: From interactive `ClickSpark` particle effects to a magnetic `Dock`, every interaction feels physical.
- 💿 **3D Release Showcase**: Album releases feature `GlareCard` components with 3D tilt and dynamic glow signatures.
- 🖋️ **Editorial Typography**: `GlitchText` and `DecryptedText` animations deliver raw, editorial-grade typographic energy.
- 🔒 **Asset Protection**: Right-click, drag, and middle-click guards prevent unauthorized image downloads.
- 🔄 **Live Data**: Supabase Realtime Channels sync content changes to the UI instantly.

---

## 🏗️ Architecture
The codebase follows a modern, component-driven React architecture optimized for performance and aesthetic precision.

```text
Music-Vibe-New-Site/
├── 📂 api/
│   └── keep-alive.js    # Vercel Serverless Function — daily Supabase ping
├── 📂 src/
│   ├── 🧩 components/   # 15 UI primitives (FloatingLines, Dock, GlareCard, …)
│   ├── 📊 data/         # Content files (tracks.json, socials.json, friends.json)
│   ├── 🪝 hooks/        # Custom React hooks (reserved)
│   ├── 🔧 lib/          # supabase.js — client initialisation
│   ├── 🖼️ pages/        # Route views (Home, Music, About, Friends)
│   ├── 🎨 styles/       # index.css — global design tokens & animations
│   ├── ⚛️ App.jsx       # Root layout, routing & security guards
│   └── 🚀 main.jsx      # Vite entry point
├── 📂 public/           # High-res assets & artwork
├── 📂 Admin/            # Internal admin tooling
├── 📄 vercel.json       # Cron schedule for keep-alive
├── ⚙️ package.json
└── 🛠️ vite.config.js   # Manual chunk splitting (three, motion, react)
```

---

## 🛠️ Technology Stack

| Category | Tools |
| :--- | :--- |
| **Core** | React 19, Vite 6, JavaScript (ES6+) |
| **Animation** | Motion (`motion/react`) |
| **Visuals** | Three.js, Tailwind CSS v4, Vanilla CSS |
| **Style Utilities** | `clsx`, `tailwind-merge`, `class-variance-authority` |
| **Backend** | Supabase (PostgreSQL + Realtime) |
| **Deployment** | Vercel (Serverless Functions + Cron Jobs) |
| **Icons** | Custom SVG map (`socialIcons.jsx`) |

---

## 🧩 Component Library

| Component | Role |
| :--- | :--- |
| `FloatingLines` | Three.js shader background — pointer-reactive generative lines |
| `ClickSpark` | Particle burst on every mouse click, wraps the entire app |
| `Dock` | Floating magnetic navigation dock |
| `GlareCard` | 3D tilt + glare card for release artwork |
| `GlitchText` | Glitch-style animated text |
| `DecryptedText` | Letter-scramble reveal animation |
| `ScrollReveal` | Intersection-Observer fade/slide-in wrapper |
| `PageTransition` | Motion-animated route transition |
| `SocialLinks` | Pill-style social bar driven by `socials.json` |
| `FriendCard` | Collaborator profile card |
| `ProfileCard` | Artist profile display card |
| `BorderGlow` | Animated glowing border accent |
| `LogoLoop` | Repeating scrolling logo ticker |
| `Footer` | Global site footer |
| `Skeleton` | Loading placeholder skeleton |

---

## 🎧 Content Management
Music Vibe is designed so creators can update content without touching core code.

### 📀 Adding Releases
Edit `src/data/tracks.json`:
```json
{
    "title": "Neon Dreams",
    "artwork": "neon-dreams.jpg",
    "link": "https://ffm.to/neondreams",
    "year": "2026",
    "type": "Single",
    "status": "Released",
    "accentColor": { "hue": 280, "sat": 85 }
}
```
> [!TIP]
> Use the `accentColor` field to harmonize the 3D glare effects with your artwork's palette.

### 🤝 Adding Friends / Collaborators
Edit `src/data/friends.json` to manage the collaborator network shown on the Friends page.

### 🌐 Global Socials
Update `src/data/socials.json`. Leaving a link empty will automatically hide it from the UI.

---

## 🚀 Getting Started

### 📦 Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` (or create `.env`) and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

### 💻 Development
```bash
npm run dev
# Runs on http://localhost:3000
```

### 🏗️ Production Build
```bash
npm run build
```

### 🌐 Deployment
The project is deployed on **Vercel**. A daily cron job (`vercel.json`) calls `/api/keep-alive` at `00:00 UTC` to ping Supabase and prevent database cold starts. Add `SUPABASE_SERVICE_ROLE_KEY` to Vercel environment variables for server-side keep-alive access.

---

<p align="center">
  <b>Developed with Passion by <a href="https://github.com/zishan049">@zishan049</a></b><br>
  Part of the <b>Music Vibe</b> ecosystem.
</p>
