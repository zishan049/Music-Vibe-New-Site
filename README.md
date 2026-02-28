# Music Vibe (ZoundZ Nation)

Music Vibe is a dynamic, music-focused web application designed to showcase artists, their releases, artwork, and social links. The site features a premium aesthetic with interactive particle backgrounds, glassmorphism, 3D glare hover effects, and smooth loading sequences.

## 📁 Project Structure

This project has been migrated to a modern **Vite + React** architecture for better performance and easier maintainability.

```text
Music Vibe2/
├── public/                 # Static assets
│   └── Assets/             # Images, logos, and artwork (Artwork/)
├── src/                    # React Source Code
│   ├── components/         # Reusable UI components (Dock, ParticleCanvas, etc.)
│   ├── data/               # Content JSON files
│   │   ├── tracks.json     # Configuration for music tracks
│   │   ├── socials.json    # Configuration for social links
│   │   └── socialIcons.jsx # SVG icons mapping
│   ├── pages/              # Main page components (Home, Music, About, Embeds)
│   ├── styles/             # Global CSS styles
│   ├── App.jsx             # Main routing and layout wrapper
│   └── main.jsx            # React entry point
├── index.html              # Main HTML template
├── package.json            # Node.js dependencies and scripts
└── vite.config.js          # Vite configuration
```

## ✨ Key Features

- **Interactive UI**: A sleek navigation dock, 3D glare effects on feature cards, and a dynamic particle background that responds to user interaction.
- **Loading Sequence**: A custom React loading component to ensure seamless asset delivery and a premium first impression.
- **Dynamic Content Management**: Music tracks, artwork, and social links are dynamically loaded from simple JSON configuration files.
- **Media Embeds**: Integrated Spotify and Amazon Music players.
- **Art Gallery / Music Page**: A dedicated page showcasing high-quality album, EP, and Single artwork with interactive hover effects and glitch typography.
- **Responsive Design**: Designed to look flawless on both desktop and mobile devices.

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your system.

### Installation
1. Navigate to the project directory:
   ```bash
   cd "g:\Music Vibe2"
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```

### Running Locally
To start the Vite local development server:
```bash
npm run dev
```

The site will be served locally, typically at `http://localhost:5173`. Opening this URL in your browser will run the site with blazing-fast hot module replacement (HMR).

### Building for Production
To build the site for deployment (e.g., to Vercel, Netlify, or a static host):
```bash
npm run build
```
This will generate optimized static files in the `dist/` directory.

---

## 🎨 How to Manage Content

Adding new tracks or updating social links is incredibly easy and does not require touching complex code. All content is driven by the JSON files in the `src/data/` folder.

### 🎵 Managing Music Tracks

To add, modify, or remove a track, edit the **`src/data/tracks.json`** file.

#### Adding a New Track
1. Place your high-quality artwork image (e.g., `NewSong.jpg` or `NewSong.png`) into the **`public/Assets/Artwork/`** folder.
2. Open **`src/data/tracks.json`** and add a new entry to the list, formatting it like this:

```json
{
    "title": "Your Song Title",
    "artwork": "NewSong.jpg",
    "link": "https://ffm.to/yoursonglink",    
    "year": "2026",
    "type": "Single",   
    "status": "Released", 
    "accentColor": {       
        "hue": 250,        
        "sat": 80          
    }
}
```
**Notes on fields:**
- `link`: Leave as an empty string `""` if the song is not out yet.
- `type`: Can be `"Single"`, `"EP"`, or `"Album"`.
- `status`: Use `"Released"` or `"Upcoming"`. If upcoming, an "Upcoming" badge will be shown automatically.
- `accentColor`: Controls the glow and hover effects for this specific card on the Music page. Adjust the `hue` (0-360) and `sat` (0-100) to match the artwork.

#### Removing a Track
Simply delete its JSON block from `src/data/tracks.json`. Be careful to preserve the commas between the remaining items. You can also optionally delete the image file from `public/Assets/Artwork/` to save space.

### 🌐 Managing Social Links
To update where the social icons point to, edit the **`src/data/socials.json`** file.

```json
{
    "instagram": "https://instagram.com/yourprofile",
    "youtube": "https://youtube.com/yourchannel",
    "spotify": "https://open.spotify.com/artist/yourid",
    "applemusic": "https://music.apple.com/us/artist/yourid",
    "amazon": "https://music.amazon.com/artists/yourid",
    "soundcloud": "",
    "bandlab": ""
}
```
If you leave a URL empty `""`, that icon will be automatically hidden from the site.

---

## 🛠️ Tech Stack
- **Frontend Framework**: React 18, Vite
- **Styling**: Vanilla CSS3 (Custom animations, glassmorphism, gradients)
- **Routing**: React Router DOM (v6)
