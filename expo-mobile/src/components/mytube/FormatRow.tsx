import { Music2, Play } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  Borders,
  Colors,
  FontFamily,
  FontSize,
  IconSize,
  PlayerLayout,
  Radii,
  Spacing,
} from '@/constants/theme';
import type { MediaFormat } from '@/types/format';

type Props = {
  format: MediaFormat;
  selected?: boolean;
  onPress?: () => void;
};

export function FormatRow({ format, selected = false, onPress }: Props) {
  const Icon = format.kind === 'audio' ? Music2 : Play;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        selected && styles.selected,
        pressed && styles.pressed,
      ]}>
      <View style={styles.left}>
        <View style={[styles.iconBox, selected && styles.iconBoxSelected]}>
          <Icon size={IconSize.format} color={Colors.primary} />
        </View>
        <Text style={styles.label} numberOfLines={1}>
          {format.label}
        </Text>
      </View>
      <Text style={styles.right}>
        {format.ext} · {format.size}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing[3],
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[2.5],
  },
  selected: {
    backgroundColor: Colors.surfaceAlt,
  },
  pressed: {
    backgroundColor: Colors.surfaceAlt,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2.5],
    flex: 1,
    minWidth: 0,
  },
  iconBox: {
    width: PlayerLayout.formatIconBox,
    height: PlayerLayout.formatIconBox,
    borderRadius: Radii.md,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderWidth: Borders.width,
    borderColor: 'transparent',
  },
  iconBoxSelected: {
    borderColor: Colors.primary,
  },
  label: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.md,
    color: Colors.foreground,
    flexShrink: 1,
  },
  right: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    color: Colors.mutedForeground,
    flexShrink: 0,
  },
});
