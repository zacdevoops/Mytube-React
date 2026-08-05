import {
  ListPlus,
  MoreHorizontal,
  Share2,
  ThumbsDown,
  ThumbsUp,
  type LucideIcon,
} from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  Colors,
  FontFamily,
  FontSize,
  IconSize,
  PlayerLayout,
  Radii,
  Spacing,
} from '@/constants/theme';

type Reaction = 'like' | 'dislike' | null;

type ChipDef = {
  key: string;
  label: string;
  Icon: LucideIcon;
  kind: 'like' | 'dislike' | 'share' | 'save' | 'more';
};

const CHIPS: ChipDef[] = [
  { key: 'like', label: '150K', Icon: ThumbsUp, kind: 'like' },
  { key: 'dislike', label: 'Dislike', Icon: ThumbsDown, kind: 'dislike' },
  { key: 'share', label: 'Share', Icon: Share2, kind: 'share' },
  { key: 'save', label: 'Save', Icon: ListPlus, kind: 'save' },
  { key: 'more', label: 'More', Icon: MoreHorizontal, kind: 'more' },
];

export function ActionRow() {
  const [reaction, setReaction] = useState<Reaction>(null);
  const [saved, setSaved] = useState(false);

  const onPress = (kind: ChipDef['kind']) => {
    if (kind === 'like') {
      setReaction((prev) => (prev === 'like' ? null : 'like'));
      return;
    }
    if (kind === 'dislike') {
      setReaction((prev) => (prev === 'dislike' ? null : 'dislike'));
      return;
    }
    if (kind === 'save') {
      setSaved((prev) => !prev);
      return;
    }
    if (kind === 'share') {
      Alert.alert('Share', 'Share is a placeholder in this preview. No content was shared.');
      return;
    }
    Alert.alert('More', 'More options are a placeholder in this preview.');
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.row}>
      {CHIPS.map(({ key, label, Icon, kind }) => {
        const active =
          (kind === 'like' && reaction === 'like') ||
          (kind === 'dislike' && reaction === 'dislike') ||
          (kind === 'save' && saved);
        const color = active ? Colors.primary : Colors.mutedForeground;
        const displayLabel = kind === 'save' ? (saved ? 'Saved' : 'Save') : label;

        return (
          <Pressable
            key={key}
            onPress={() => onPress(kind)}
            style={({ pressed }) => [styles.chip, pressed && styles.pressed]}>
            <Icon size={IconSize.action} color={color} />
            <Text style={[styles.label, { color }]}>{displayLabel}</Text>
          </Pressable>
        );
      })}
      <View style={styles.tail} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginTop: Spacing[4],
    flexGrow: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  chip: {
    minWidth: PlayerLayout.actionMinWidth,
    alignItems: 'center',
    gap: Spacing[1],
    borderRadius: Radii['2xl'],
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[2],
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
  },
  tail: {
    width: Spacing[1],
  },
});
