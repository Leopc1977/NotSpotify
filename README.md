## NotSpotify

A minimal Spotify-like web app built with Vite and React. Play around with music browsing UI, simple stats, and a clean, responsive interface.

### Features
- Basic navigation and playback UI
- Pages for Home, Search, Artists, Albums, Playlists, Daily Mix, and Stats
- Lightweight component library and utilities
- Fast dev experience with Vite

### Getting Started
1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Preview the production build:
   ```bash
   npm run preview
   ```

### Project Structure
- `src/` React app source
  - `components/` UI components and pages
  - `store/` app state and slices
  - `utils/` helper utilities
- `public/` static assets
- `spotify-layer/` Spotify-related API utilities
- `animus-components/` shared UI components
- `mobx-utils/` store helpers

### Requirements
- Node.js 18+ and npm

### Scripts
- `npm run dev`: start Vite dev server
- `npm run build`: create production build
- `npm run preview`: preview the production build

### License
MIT
