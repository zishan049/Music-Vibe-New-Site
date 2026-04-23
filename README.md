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
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
</p>

---

## 📽️ The Vision
**Music Vibe** is a premium web application designed to showcase artists, releases, and collaborator networks through a **"Cinematic Dark × Editorial Luxury"** aesthetic. It is not just a website; it is an immersive environment where music meets high-end digital design.

### ✨ Key Features
- 🌌 **Generative Ambience**: Powered by Three.js `FloatingLines`, creating a living, breathing canvas of geometric light.
- 🎬 **Cinematic Loading**: A multi-phase entry sequence ensuring a premium first impression while preloading critical assets.
- 🖱️ **Tactile Interactions**: From interactive `ClickSpark` effects to a magnetic `Floating Dock`, every interaction feels physical.
- 💿 **3D Release Showcase**: Album releases feature `GlareCard` components with 3D tilt effects and dynamic glow signatures.
- 🖋️ **Glitch Typography**: Creative, editorial-grade typography reflecting raw emotion and musical energy.

---

## 🏗️ Architecture
The codebase follows a modern, component-driven React architecture optimized for performance and aesthetic precision.

```text
Music-Vibe-New-Site/
├── 📂 src/
│   ├── 🧩 components/   # UI Primitives (FloatingLines, Dock, GlareCard)
│   ├── 📊 data/         # Content Definitions (tracks.json, socials.json)
│   ├── 🪝 hooks/        # Custom Logic (Preloaders, Optimizers)
│   ├── 🖼️ pages/        # Route Views (Home, Music, About, Friends)
│   ├── 🎨 styles/       # Design System & Modern Tokens
│   ├── ⚛️ App.jsx       # Root Layout & Orchestration
│   └── 🚀 main.jsx      # Entry Point
├── 📂 public/           # High-Res Assets & Artworks
├── ⚙️ package.json      # Dependencies (React 19, Motion, Three.js)
└── 🛠️ vite.config.js    # Optimized Build Config
```

---

## 🛠️ Technology Stack

| Category | Tools |
| :--- | :--- |
| **Core** | React 19, Vite, JavaScript (ES6+) |
| **Animation** | Framer Motion, GSAP |
| **Visuals** | Three.js, CSS3 (Custom Tokens) |
| **Backend** | Supabase |
| **Icons** | Lucide React |

---

## 🎧 Content Management
Designed for creators, Music Vibe allows updates without touching core code.

### 📀 Adding Releases
Edit `src/data/tracks.json` to manage your music catalog:
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

### 🌐 Global Socials
Update `src/data/socials.json`. Leaving a link empty will automatically remove it from the UI.

---

## 🚀 Getting Started

### 📦 Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your `.env` with Supabase credentials.

### 💻 Development
```bash
npm run dev
```

### 🏗️ Production
```bash
npm run build
```

---

<p align="center">
  <b>Developed with Passion by <a href="https://github.com/zishan049">@zishan049</a></b><br>
  Part of the <b>Music Vibe</b> ecosystem.
</p>
