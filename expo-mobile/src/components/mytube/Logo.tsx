import { LinearGradient } from 'expo-linear-gradient';
import { Play } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, FontFamily, FontSize, Gradient, IconSize, Radii, Shadows, Spacing } from '@/constants/theme';

type Props = {
  /** Matches Lovable Logo `size` prop (Home uses 18). */
  size?: number;
};

export function Logo({ size = 18 }: Props) {
  const mark = size + 10;

  return (
    <View style={styles.row}>
      <LinearGradient
        colors={[...Gradient.primary.colors]}
        start={Gradient.primary.start}
        end={Gradient.primary.end}
        style={[
          styles.mark,
          Shadows.glow,
          {
            width: mark,
            height: mark,
            borderRadius: Radii.xl,
          },
        ]}>
        <Play
          size={IconSize.logoPlay}
          color={Colors.primaryForeground}
          fill={Colors.primaryForeground}
        />
      </LinearGradient>
      <Text style={styles.wordmark} numberOfLines={1}>
        StreamVault
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    minWidth: 0,
    flexShrink: 1,
  },
  mark: {
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  wordmark: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.lg,
    color: Colors.foreground,
    letterSpacing: -0.4,
    flexShrink: 1,
  },
});
