import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, FontFamily, FontSize, Gradient, Radii, Spacing } from '@/constants/theme';

type Props = {
  label: string;
  active?: boolean;
  onPress?: () => void;
};

export function CategoryTab({ label, active = false, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.tab} hitSlop={4}>
      <Text style={[styles.label, active ? styles.labelActive : styles.labelInactive]}>{label}</Text>
      {active ? (
        <View style={styles.underlineTrack}>
          <LinearGradient
            colors={[...Gradient.primary.colors]}
            start={Gradient.primary.start}
            end={Gradient.primary.end}
            style={styles.underline}
          />
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tab: {
    flexShrink: 0,
    paddingHorizontal: 4,
    paddingBottom: Spacing[2],
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.base,
  },
  labelActive: {
    color: Colors.foreground,
  },
  labelInactive: {
    color: Colors.mutedForeground,
  },
  underlineTrack: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -1,
    height: 2,
  },
  underline: {
    height: 2,
    borderRadius: Radii.full,
  },
});
