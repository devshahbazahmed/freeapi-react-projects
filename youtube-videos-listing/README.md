# YouTube Videos Listing

A polished YouTube-style video browsing app built with React, Vite, Tailwind CSS, and the FreeAPI public YouTube videos endpoint.

## Features

- Responsive video grid with modern dark UI
- Search videos by title, channel, or description
- Skeleton loading state while videos are fetched
- Helpful empty and error states
- Clickable video cards with YouTube embed playback
- Related videos section on the video detail page
- Normalized API layer for cleaner React components

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- React Router 7
- FreeAPI YouTube videos API

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

Run linting:

```bash
pnpm lint
```

## Project Structure

```text
src/
  components/
    Navbar.jsx
    Sidebar.jsx
    Skeleton.jsx
    VideoCard.jsx
  pages/
    Home.jsx
    VideoPage.jsx
  services/
    api.js
  App.jsx
  main.jsx
  index.css
```

## API

The app fetches videos from:

```text
https://api.freeapi.app/api/v1/public/youtube/videos
```

The response is normalized in `src/services/api.js` so the UI can work with simple fields such as `title`, `thumbnail`, `channelName`, `viewLabel`, and `duration`.
