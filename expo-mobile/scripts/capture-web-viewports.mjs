/**
 * Design-reference viewport captures for StreamVault Expo prototype.
 * Not production; no download/player/native logic.
 */
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'docs', 'visual-reference');
const BASE = process.env.EXPO_WEB_URL || 'http://127.0.0.1:8083';

const devices = [
  { prefix: 'iphone', orientation: 'landscape', width: 844, height: 390, isMobile: true, hasTouch: true },
  { prefix: 'android', orientation: 'portrait', width: 412, height: 915, isMobile: true, hasTouch: true },
  { prefix: 'android', orientation: 'landscape', width: 915, height: 412, isMobile: true, hasTouch: true },
  { prefix: 'tablet', orientation: 'portrait', width: 834, height: 1112, isMobile: true, hasTouch: true },
  { prefix: 'tablet', orientation: 'landscape', width: 1194, height: 834, isMobile: true, hasTouch: true },
];

const routes = [
  { name: 'home', path: '/' },
  { name: 'library', path: '/library' },
  { name: 'downloads', path: '/downloads' },
  { name: 'settings', path: '/settings' },
  { name: 'player', path: '/player/sw4k' },
];

async function waitForApp(page) {
  await page.waitForTimeout(2000);
  try {
    await page.getByText('StreamVault').first().waitFor({ timeout: 45000 });
  } catch {
    try {
      await page.getByText(/Library|Downloads|Settings|Playback placeholder|Home/).first().waitFor({
        timeout: 15000,
      });
    } catch {
      // continue; screenshot whatever rendered
    }
  }
  await page.waitForTimeout(1000);
}

const browser = await chromium.launch({ headless: true });
fs.mkdirSync(OUT, { recursive: true });

for (const device of devices) {
  for (const route of routes) {
    const context = await browser.newContext({
      viewport: { width: device.width, height: device.height },
      deviceScaleFactor: 2,
      isMobile: device.isMobile,
      hasTouch: device.hasTouch,
      colorScheme: 'dark',
    });
    const page = await context.newPage();
    const url = `${BASE}${route.path}`;
    console.log('capture', device.prefix, device.orientation, route.name, url);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
    await waitForApp(page);
    const file = path.join(
      OUT,
      `${device.prefix}_${device.orientation}_${route.name}.png`,
    );
    await page.screenshot({ path: file, fullPage: false });
    console.log('wrote', file);
    await context.close();
  }
}

await browser.close();
console.log('done');
