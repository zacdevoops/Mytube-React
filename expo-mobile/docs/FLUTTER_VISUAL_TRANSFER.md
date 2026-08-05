# Flutter Visual Transfer Report

**Status:** Visual comparison only — stop here. No Flutter production implementation from this document.  
**Expo role:** Isolated design-reference application inside `expo-mobile/`.  
**Official product:** Flutter StreamVault (`StremVid-Flutter`).  
**Date:** 2026-08-05

---

## 1. Scope

This report compares the accepted Expo Phase 1 Home visual prototype with existing Flutter StreamVault goldens and design tokens, then lists **only** visual elements worth transferring.

### Explicitly out of scope (do not transfer)

- React Native / Expo Router architecture
- Expo navigation or tab shell code
- Any Expo state management
- Player logic or playback placeholders as product features
- Download logic
- yt-dlp, FFmpeg, native storage, database, background tasks
- Phase 2 Expo production functionality

---

## 2. Sources compared

### Expo design reference

| Item | Location |
|------|----------|
| Screenshots | `expo-mobile/docs/visual-reference/` (30 PNGs) |
| Tokens | `expo-mobile/src/constants/theme.ts` |
| Home UI | `expo-mobile/src/app/(tabs)/index.tsx` + `components/mytube/*` |

### Flutter StreamVault

| Item | Location |
|------|----------|
| Design system | `docs/DESIGN_SYSTEM.md`, `lib/design_system/tokens/*` |
| Home goldens | `test/features/home/goldens/` |
| Explore / Search / Downloads / Library goldens | `test/features/*/goldens/`, `docs/design-proposals/*` |
| Bottom nav | `lib/design_system/components/stream_vault_bottom_navigation.dart` |

---

## 3. Branding / cleanup completed in Expo (this pass)

| Change | Result |
|--------|--------|
| Visible wordmark | `Mytube` → **StreamVault** (`Logo.tsx`, `app.json` name/slug/scheme) |
| Unused starter route | **Removed** `src/app/explore.tsx` (not in tab bar; leftover Expo template) |
| Unused starter tabs | **Removed** `app-tabs.tsx` / `app-tabs.web.tsx` (nothing imported them) |
| Typed routes | Regenerated; `/explore` removed from `.expo/types/router.d.ts` |
| Unsafe `as Href` casts | Replaced with `router.push({ pathname: '/player/[id]', params: { id } })` |

Internal folder names such as `components/mytube/` remain as implementation paths only; they are not user-visible branding.

---

## 4. High-level visual differences

| Aspect | Expo prototype | Flutter StreamVault today | Transfer? |
|--------|----------------|---------------------------|-----------|
| Primary violet | `#7C3AED` (+ gradient end `#A670F3`) | `#7C5CFF` / `#936FFF` | **Keep Flutter tokens** — borrow *shape* of accents, not Expo hex if it fights the system |
| Secondary cyan | `#22D3EE` | `#25D9FF` | Keep Flutter |
| Background | `#0B0E14` | `#080B12` | Keep Flutter; optional slight warmth only if designers insist |
| Surfaces | `#111827` / `#1F2937` | `#111722` / `#192130` / `#222C3D` | Keep Flutter hierarchy |
| Typography | **Poppins** 10–16 | **Outfit** + **Plus Jakarta Sans** | Keep Flutter fonts; transfer *sizes/weights*, not font family |
| Home layout | Compact header + text tabs + featured hero + horizontal compact rows | Search-forward / grid-oriented Home golden | **Yes — Expo Home composition is the stronger compact reference** |
| Bottom nav | 4 tabs (Home, Library, Downloads, Settings), 20px icons, 10px labels, primary color when active | Material `NavigationBar`, **5** tabs including Explore | Partial — density/active color cues; do **not** drop Explore unless product decides |
| Category tabs | Text labels + **2px purple gradient underline** (not pills) | Often FilterChip / pill chips | **Yes — text + underline pattern for Home-like rails** |
| Featured card | 16:9, radius 24, inset play FAB 36, duration badge, soft card shadow | Various video cards / hero treatments | **Yes — proportions and overlay grammar** |
| Compact media rows | Thumb **112×64**, pad 10, radius 24, 13px title / 11px meta | Mix of compact / horizontal cards | **Yes — denser recommended-row pattern** |
| Shadows / glow | Purple glow on logo + play; card shadow `0 8 24 -12` | Flatter elevation tokens | Selective — subtle card depth + restrained glow only |
| Active states | Violet icon+label; underline on tabs | Violet indicator / selected chip | Align active *language* (color + weight), stay on Flutter components |

---

## 5. Elements worth transferring to Flutter

Transfer means: adapt the **visual treatment** into Flutter widgets that already use StreamVault tokens — not port RN code.

### 5.1 Header (compact)

**From Expo**

- Left: menu (20) + gradient play mark (~28) + wordmark 16/600
- Right: search + overflow (20), gap 12
- No avatar, no thick brand bar

**Transfer guidance**

- Prefer this compact chrome for content Home over a heavy solid violet brand strip.
- Keep StreamVault wordmark + existing Flutter iconography.
- Preserve safe-area padding and 44pt hit targets via `IconActionButton` / equivalents.

**Do not transfer:** Expo `Menu` as a drawer architecture.

### 5.2 Category tabs (text + underline)

**From Expo**

- Labels 14/500, gap ~20
- Active: foreground text + **2px gradient underline**
- Inactive: muted text, no pill fill

**Transfer guidance**

- Add a Home (or rail) tab style distinct from Downloads/Library **FilterChip** pills.
- Underline can use `StreamVaultColors.primary` → `primaryStrong` gradient.
- Keep horizontal scroll on narrow phones.

**Do not transfer:** Large pill category buttons for this Home rail.

### 5.3 Featured card

**From Expo**

- Full-width 16:9 media, radius **24**
- Duration badge bottom-right
- Circular gradient play control ~36, bottom-left inset ~8, soft purple glow
- Title 14/600 + channel·meta 11 muted; overflow affordance

**Transfer guidance**

- Useful as a Home hero / “featured” slot using Flutter `VideoCard` / new thin wrapper.
- Map radii to nearest StreamVault radius token (likely `lg`/`xl`); do not invent a parallel radius scale unless Design System updates.

### 5.4 Compact media rows

**From Expo**

- Row card: surface fill, radius 24, padding 10, gap 12
- Fixed thumb **112×64**, radius ~20
- LIVE uses accent red badge; duration uses dark badge
- Title 13/500 (2 lines), channel + meta 11

**Transfer guidance**

- Strong candidate to refine Flutter `HorizontalVideoCard` / compact list rows for Recommended / related lists.
- Keep Flutter offline/progress badges where product needs them; Expo rows are content-discovery dense, not download-status dense.

### 5.5 Bottom navigation

**From Expo**

- Compact custom bar: top hairline border, icon 20 + label 10, active = primary violet (icon **and** label)
- 4 destinations matching Expo IA

**Transfer guidance**

- Borrow **density** and **active color on both icon + label**.
- Flutter currently uses Material `NavigationBar` with **Explore** — keep Explore unless product IA changes.
- Avoid Expo’s blurred `background95` approximation unless Design System adds a glass token.

### 5.6 Spacing

**From Expo (useful rhythm)**

- Screen horizontal padding **16**
- Header gaps 8 / 12
- Tabs gap **20**, featured margin-top **20**
- Section title margin 24/12
- List item gap **10**
- Bottom content inset clearing tab bar (~112 including safe area)

**Transfer guidance**

- Map onto `StreamVaultSpacing` rather than hardcoding Expo numbers in features.
- Prefer tightening Home vertical rhythm toward Expo’s compact feel where Flutter Home feels sparse.

### 5.7 Typography (scale only)

| Role | Expo size/weight | Flutter action |
|------|------------------|----------------|
| Logo | 16 / 600 | Keep Outfit; similar optical size |
| Tabs / section | 14 / 500–600 | Plus Jakarta / Outfit titles |
| Featured title | 14 / 600 | Existing titleSmall/titleMedium |
| Row title | 13 / 500 | Slightly denser list titles |
| Meta / nav label | 10–11 / 500–600 | textMuted / labelSmall |

**Do not switch Flutter to Poppins.**

### 5.8 Shadows

**From Expo**

- Card: soft dark drop (`Shadows.card`)
- Glow: purple bloom on logo mark + featured play

**Transfer guidance**

- Optional subtle card elevation for featured + recommended rows.
- Glow must stay restrained (OLED smear / accessibility); prefer Flutter elevation tokens first.

### 5.9 Active states

**From Expo**

- Tabs: underline + brighter label
- Nav: primary on icon + label together
- No filled pill for Home categories

**Transfer guidance**

- Unify “selected = violet text/icon, not only a Material indicator pill” where it improves scanability.
- Keep contrast ≥ existing StreamVault AA targets.

---

## 6. Elements **not** worth transferring

| Expo detail | Why skip |
|-------------|----------|
| Poppins as brand font | Flutter already standardized Outfit + Plus Jakarta |
| Exact Lovable hex `#7C3AED` / `#0B0E14` | Flutter tokens already shipped across goldens |
| 4-tab IA (no Explore) | Flutter product includes Explore |
| Expo Go blue gear FAB in screenshots | Dev overlay only |
| Placeholder Library/Downloads/Settings screens | Flutter already has richer designs/proposals |
| Player placeholder layout | Flutter Player is a real feature surface |
| Real thumbnail photography style as requirement | Flutter goldens use abstract thumbs by design policy |
| Folder name `mytube` / RN file structure | Irrelevant to Flutter |

---

## 7. Screenshot index

All under `expo-mobile/docs/visual-reference/`:

### iPhone portrait (Simulator)

- `iphone_portrait_home.png`
- `iphone_portrait_library.png`
- `iphone_portrait_downloads.png`
- `iphone_portrait_settings.png`
- `iphone_portrait_player.png`

### iPhone landscape (web viewport)

- `iphone_landscape_home.png`
- `iphone_landscape_library.png`
- `iphone_landscape_downloads.png`
- `iphone_landscape_settings.png`
- `iphone_landscape_player.png`

### Android phone portrait / landscape (web viewport)

- `android_portrait_*.png` / `android_landscape_*.png` (home, library, downloads, settings, player)

### Tablet portrait / landscape (web viewport)

- `tablet_portrait_*.png` / `tablet_landscape_*.png` (home, library, downloads, settings, player)

See `visual-reference/README.md` for capture methodology.

---

## 8. Recommended Flutter adoption order (future work — not started)

1. Compact Home header treatment (no architecture change)
2. Text category tabs with underline for Home rails
3. Featured hero proportions + play overlay grammar
4. Denser recommended/media rows (112×64-class thumbs)
5. Bottom nav density / active label coloring (keep Explore)
6. Optional soft card shadow pass if goldens still feel flat

Each step should update Flutter goldens and stay on `StreamVaultColors` / typography tokens.

---

## 9. Risks

1. **Token drift** — copying Expo hexes would fork the Flutter design system.
2. **IA mismatch** — Expo omits Explore; blind nav copy would regress Flutter.
3. **Density vs a11y** — 10px nav labels need large hit areas even if text is small.
4. **Web vs native screenshots** — landscape/Android/tablet captures are web viewports; validate on real devices before locking Flutter UI.
5. **Featured glow** — easy to overdo on OLED; keep optional and subtle.

---

## 10. Conclusion

The Expo prototype is valuable as a **compact Home visual reference**: header, text tabs with underline, featured card, dense recommended rows, and quieter bottom-nav density. Flutter should absorb those **composition and density cues** while retaining its own tokens, fonts, Explore tab, and production architecture.

**No Flutter production implementation has been started from this report.**  
**No Expo Phase 2 production functionality has been started.**
