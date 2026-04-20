# Music Vibe
> A cinematic, music-focused immersive experience.

Music Vibe is a premium web application designed to showcase artists, releases, and collaborator networks through a "Cinematic Dark × Editorial Luxury" aesthetic. Built with modern web technologies, it features generative backgrounds, interactive micro-animations, and a seamless high-end user experience.

---

## ⚡ The Experience

The platform is designed to be more than a website; it is an immersive environment.

*   **Generative Ambience**: Powered by Three.js `FloatingLines`, the background is a living, breathing canvas of geometric light.
*   **Cinematic Loading**: A multi-phase entry sequence that ensures a premium first impression while preloading critical assets.
*   **Interactive Micro-animations**: From interactive `ClickSpark` effects to the magnetic `Floating Dock`, every interaction feels physical and responsive.
*   **3D Visuals**: Album releases are presented through `GlareCard` components with 3D tilt effects and dynamic glow signatures.
*   **Glitch Typography**: Creative typography that reflects the raw emotion and energy of the music.

---

## 📁 Project Architecture

The codebase follows a modern, component-driven React architecture optimized for performance and scalability.

```text
Music-Vibe-New-Site/
├── src/
│   ├── components/         # Premium UI primitives (FloatingLines, Dock, GlareCard, etc.)
│   ├── data/               # Content definitions (tracks.json, socials.json)
│   ├── hooks/              # Custom logic (Preloaders, Display Optimizers)
│   ├── pages/              # Main route views (Home, Music, About, Friends)
│   ├── styles/             # Global design system and tokens
│   ├── App.jsx             # Root layout and route orchestration
│   └── main.jsx            # Application entry point
├── public/                 # High-resolution assets and artwork
├── package.json            # Modern dependencies (React 19, Motion, Three.js)
└── vite.config.js          # Optimized build configuration
```

---

## 🛠️ Tech Stack

*   **Core**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
*   **Creative Coding**: [Three.js](https://threejs.org/) (for generative backgrounds)
*   **Backend**: [Supabase](https://supabase.com/)
*   **Styling**: Custom CSS3 with Modern Tokens
*   **Icons**: [Lucide React](https://lucide.dev/)

---

## 🎵 Content Management

Music Vibe is designed for easy content updates without touching the implementation code.

### Managing Releases
Edit `src/data/tracks.json` to add or update music.
```json
{
    "title": "Your Track",
    "artwork": "artwork-filename.jpg",
    "link": "https://ffm.to/link",
    "year": "2026",
    "type": "Single",
    "status": "Released",
    "accentColor": { "hue": 250, "sat": 80 }
}
```
> [!TIP]
> Use the `accentColor` field to match the 3D glare effects to the artwork's palette.

### Managing Socials
Update global social links in `src/data/socials.json`. Empty strings will automatically hide the corresponding icon from the UI.

---

## 🚀 Getting Started

### Installation
1. Clone the repository and navigate to the project root.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment:
   * Create a `.env` file based on the provided configuration.

### Development
Launch the local development server with hot-reloading:
```bash
npm run dev
```

### Production Build
Generate an optimized production-ready bundle:
```bash
npm run build
```

---

<p align="center">
  Developed by <b>@zishan049</b> | part of the <b>Music Vibe</b>.
</p>

