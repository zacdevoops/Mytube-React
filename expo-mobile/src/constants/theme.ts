/**
 * StreamVault Expo design-reference tokens — ported from Lovable `src/styles.css` (dark theme).
 * Visual prototype only; not the official Flutter StreamVault implementation.
 * Radii resolve from `--radius: 1rem` (16px) via the declared calc() formulas.
 */

import { Platform } from 'react-native';

export const Colors = {
  background: '#0B0E14',
  foreground: '#E5E7EB',
  surface: '#111827',
  surfaceAlt: '#1F2937',
  primary: '#7C3AED',
  primaryForeground: '#FFFFFF',
  primaryGradientEnd: '#A670F3',
  secondary: '#22D3EE',
  accent: '#F43F5E',
  accentForeground: '#FFFFFF',
  muted: '#1F2937',
  mutedForeground: '#8D929D',
  border: 'rgba(255, 255, 255, 0.09)',
  background95: 'rgba(11, 14, 20, 0.95)',
  background80: 'rgba(11, 14, 20, 0.8)',
  glow: 'rgba(124, 58, 237, 0.32)',
  shadowGlow: 'rgba(124, 58, 237, 0.55)',
  black70: 'rgba(0, 0, 0, 0.7)',
} as const;

/** Phase 1 is dark-locked; both schemes map to Lovable dark tokens for leftover starter files. */
const starterScheme = {
  text: Colors.foreground,
  background: Colors.background,
  backgroundElement: Colors.surface,
  backgroundSelected: Colors.surfaceAlt,
  textSecondary: Colors.mutedForeground,
} as const;

export const ThemeSchemes = {
  light: starterScheme,
  dark: starterScheme,
} as const;

export type ThemeColor = keyof typeof starterScheme;

export const FontFamily = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semiBold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
} as const;

export const FontSize = {
  /** 10px — badges, bottom nav labels */
  xs: 10,
  /** 11px — metadata */
  sm: 11,
  /** 13px — recommended titles */
  md: 13,
  /** 14px — tabs, featured title, section heading */
  base: 14,
  /** 16px — logo wordmark */
  lg: 16,
} as const;

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
};

export const Spacing = {
  /** 2px — py-0.5 */
  0.5: 2,
  /** 4px — gap-1 */
  1: 4,
  /** 6px — px-1.5 */
  1.5: 6,
  /** 8px — gap-2, p/pt insets */
  2: 8,
  /** 10px — p-2.5, space-y-2.5 */
  2.5: 10,
  /** 12px — gap-3, p-3, mb-3 */
  3: 12,
  /** 16px — px-4, pt-4, mt-4 */
  4: 16,
  /** 20px — gap-5, mt-5 */
  5: 20,
  /** 24px — mt-6 */
  6: 24,
  /** 28px — logo mark at size 18 */
  logoMark: 28,
  /** 36px — featured play FAB (h-9 w-9) */
  playFab: 36,
  /** 64px — recommended thumb height (h-16) */
  thumbH: 64,
  /** 112px — recommended thumb width (w-28) */
  thumbW: 112,
  /** top glow height (h-72) */
  glowH: 288,
  /** Aliases for leftover Expo starter components */
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

/** Leftover Expo starter compatibility (unused by StreamVault Home). */
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

/**
 * From Lovable `@theme inline` with `--radius: 1rem` (16px):
 * sm = radius-4, md = radius-2, lg = radius, xl = radius+4, 2xl = radius+8
 */
export const Radii = {
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  full: 9999,
} as const;

export const Borders = {
  width: 1,
  color: Colors.border,
} as const;

export const Shadows = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 8,
  },
  glow: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.55,
    shadowRadius: 15,
    elevation: 10,
  },
} as const;

export const IconSize = {
  header: 20,
  tab: 20,
  cardMore: 16,
  featuredPlay: 14,
  logoPlay: 11,
} as const;

export const Gradient = {
  primary: {
    colors: [Colors.primary, Colors.primaryGradientEnd] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
} as const;
