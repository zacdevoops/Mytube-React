# Visual reference screenshots

Design-reference captures for the StreamVault Expo prototype (`expo-mobile/`).

**Not** the official StreamVault product. Official implementation remains the Flutter app in `StremVid-Flutter`.

## Capture sources

| Set | Source | Notes |
|-----|--------|-------|
| `iphone_portrait_*` | iOS Simulator (iPhone 16e) + Expo Go | Native chrome, real device safe areas |
| `iphone_landscape_*` | Expo web @ 844×390 (Playwright) | Layout reference; no iOS status bar |
| `android_portrait_*` | Expo web @ 412×915 (Playwright) | Layout reference; Android emulator unavailable in this session |
| `android_landscape_*` | Expo web @ 915×412 (Playwright) | Layout reference |
| `tablet_portrait_*` | Expo web @ 834×1112 (Playwright) | Layout reference |
| `tablet_landscape_*` | Expo web @ 1194×834 (Playwright) | Layout reference |

## Screens

Each form factor includes: `home`, `library`, `downloads`, `settings`, `player`.

## Scripts

- `scripts/capture-visual-reference.sh` — iOS Simulator deep-link captures
- `scripts/capture-web-viewports.mjs` — Playwright viewport captures (requires Expo web + `playwright`)

## Regenerating

```bash
# Terminal A — Metro / Expo Go (iPhone portrait)
npx expo start --ios

# Terminal B — Web for remaining viewports
npx expo start --web --port 8083
EXPO_WEB_URL=http://127.0.0.1:8083 node scripts/capture-web-viewports.mjs
```
