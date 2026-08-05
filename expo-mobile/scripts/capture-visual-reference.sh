#!/usr/bin/env bash
# Capture StreamVault Expo design-reference screenshots.
# Visual prototype only — not production Flutter.
set -euo pipefail

ROOT="/Users/zac/Desktop/AI proj/streamvault-companion-main/expo-mobile"
OUT="$ROOT/docs/visual-reference"
HOST="${EXPO_HOST:-127.0.0.1:8081}"
BASE="exp://${HOST}/--"

mkdir -p "$OUT"

shot() {
  local name="$1"
  local path="$OUT/${name}.png"
  xcrun simctl io booted screenshot "$path" >/dev/null
  echo "wrote $path"
}

open_route() {
  local route="$1"
  xcrun simctl openurl booted "${BASE}${route}" >/dev/null 2>&1 || true
  sleep 2.5
}

orient() {
  # portrait | landscapeLeft
  local o="$1"
  xcrun simctl ui booted appearance dark >/dev/null 2>&1 || true
  # Prefer AppleScript orientation for Simulator app
  if [[ "$o" == "landscape" ]]; then
    osascript <<'APPLESCRIPT' >/dev/null 2>&1 || true
tell application "Simulator" to activate
tell application "System Events" to keystroke "→" using {command down}
APPLESCRIPT
  else
    osascript <<'APPLESCRIPT' >/dev/null 2>&1 || true
tell application "Simulator" to activate
tell application "System Events" to keystroke "←" using {command down}
APPLESCRIPT
  fi
  sleep 1.5
}

capture_device_set() {
  local prefix="$1"
  orient portrait
  open_route "/"
  sleep 1
  shot "${prefix}_portrait_home"
  open_route "/library"
  shot "${prefix}_portrait_library"
  open_route "/downloads"
  shot "${prefix}_portrait_downloads"
  open_route "/settings"
  shot "${prefix}_portrait_settings"
  open_route "/player/sw4k"
  shot "${prefix}_portrait_player"

  orient landscape
  open_route "/"
  sleep 1
  shot "${prefix}_landscape_home"
  open_route "/library"
  shot "${prefix}_landscape_library"
  open_route "/downloads"
  shot "${prefix}_landscape_downloads"
  open_route "/settings"
  shot "${prefix}_landscape_settings"
  open_route "/player/sw4k"
  shot "${prefix}_landscape_player"

  orient portrait
}

echo "Reloading Expo on booted simulator..."
xcrun simctl openurl booted "${BASE}/" >/dev/null 2>&1 || true
sleep 3

DEVICE=$(xcrun simctl list devices booted | rg -o "iPhone[^()]+|iPad[^()]+" | head -1 | xargs || true)
echo "Booted device: ${DEVICE:-unknown}"

# iPhone set (expects iPhone booted)
capture_device_set "iphone"

echo "Done iPhone captures."
