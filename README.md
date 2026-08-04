# StreamVault Companion

StreamVault — Lovable Build Prompt (React Native)

Build a React Native (Expo) mobile app called StreamVault — a dark-themed video/audio streaming and downloading app powered by yt-dlp.

Design System

Dark theme, background near-black (#0B0E14 style)

Primary: #7C3AED (purple), Secondary: #22D3EE (cyan), Accent: #F43F5E (pink/red)

Surface: #111827, Surface Alt: #1F2937, Text: #E5E7EB

Font: Poppins (Regular / Medium / SemiBold / Bold)

Rounded cards, soft shadows, purple gradient accents on active states

Screens to Build

1. Home

Top bar: logo, search icon, menu icon

Horizontal tabs: Trending, Music, Gaming, News

Featured video card: thumbnail, title, channel, views/date

"Recommended" vertical list of video cards (thumbnail, title, channel, views, duration badge)

2. Player

Video player with cast/rotate icons

Title, view count

Subscribe button

Action row: Like count, Dislike, Share, Add to, More

Collapsible "Download" panel:

Video options: 2160p / 1440p / 1080p / 720p / 480p (MP4, with file size)

Audio options: MP3 320kbps, MP3 192kbps, M4A 128kbps

3. Downloads

Filter chips: All / Video / Audio

"In Progress" section: progress bars with % and MB/GB

"Completed" section: thumbnails, format, file size

Storage usage bar at bottom

4. Library

Tabs: Playlists / Watch Later / History

Playlist cards: thumbnail + video count

"+ New Playlist" primary button

5. Settings

List menu: Settings, Appearance, Playback, Downloads, Privacy, Backup & Restore, About, Donate (each with icon)

Version number in footer

Navigation

Bottom tab bar: Home, Library, Downloads, Settings

Reusable Components

Primary button (filled purple, rounded) and secondary button (outlined)

Filter chips (pill-shaped, active = purple fill)

Progress bar component with time/size labels

Video/audio card component reusable across Home, Downloads, Library

Key Features (stub / scaffold)

Offline playback

Light/dark mode toggle

Playlist management

Multi-format downloads

Constraints

No login/accounts required — fully local, privacy-first

No subscriptions/channel-following feature

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c9b8e436-84ad-4333-8e8b-ce0b89aba362).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
