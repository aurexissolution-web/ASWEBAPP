# Aurexis Solution Web App

This repository contains the Aurexis Solution marketing site and dashboard proof-of-concept built with React, Vite, TypeScript, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

1. Install dependencies  
   ```bash
   npm install
   ```
2. Start the development server  
   ```bash
   npm run dev
   ```

### Building for production

```bash
npm run build
npm run preview
```

## Project Structure

- `/pages` – top-level routed pages (Home, Services, Dashboard, etc.)
- `/components` – shared UI components such as Navbar, Footer, Hero, CustomCursor
- `/context` – React context for persistent demo data
- `/constants` & `/types` – reusable data and TypeScript definitions
- `vite.config.ts` – Vite configuration

## Deployment

This app can be deployed to any static hosting provider that supports Vite builds (Vercel, Netlify, GitHub Pages, Firebase Hosting, etc.). Build the project and upload the `dist` directory according to your provider’s instructions.
