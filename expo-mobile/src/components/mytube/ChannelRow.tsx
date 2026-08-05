import { StyleSheet, Text, View } from 'react-native';

import { Colors, FontFamily, FontSize, PlayerLayout, Radii, Spacing } from '@/constants/theme';

type Props = {
  channel: string;
  initials: string;
  subscribers: string;
};

export function ChannelRow({ channel, initials, subscribers }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        <Text style={styles.initials}>{initials}</Text>
      </View>
      <View style={styles.text}>
        <Text style={styles.name} numberOfLines={1}>
          {channel}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {subscribers}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: Spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  avatar: {
    width: PlayerLayout.avatar,
    height: PlayerLayout.avatar,
    borderRadius: Radii.full,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  initials: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.base,
    color: Colors.foreground,
  },
  text: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.md,
    color: Colors.foreground,
  },
  meta: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    color: Colors.mutedForeground,
  },
});
