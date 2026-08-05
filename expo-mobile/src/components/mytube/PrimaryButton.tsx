import { LinearGradient } from 'expo-linear-gradient';
import { type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { Colors, FontFamily, FontSize, Gradient, Radii, Shadows, Spacing } from '@/constants/theme';

type Props = {
  children: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  compact?: boolean;
};

export function PrimaryButton({ children, onPress, disabled, style, compact }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [{ opacity: disabled ? 0.5 : pressed ? 0.85 : 1 }, style]}>
      <LinearGradient
        colors={[...Gradient.primary.colors]}
        start={Gradient.primary.start}
        end={Gradient.primary.end}
        style={[styles.button, Shadows.glow, compact && styles.compact]}>
        {typeof children === 'string' ? <Text style={styles.label}>{children}</Text> : children}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Radii.full,
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[2.5],
    alignItems: 'center',
    justifyContent: 'center',
  },
  compact: {
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[2],
  },
  label: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.base,
    color: Colors.primaryForeground,
  },
});
