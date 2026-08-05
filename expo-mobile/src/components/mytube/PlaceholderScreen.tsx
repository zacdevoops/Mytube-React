import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/mytube/Screen';
import { Colors, FontFamily, FontSize, Spacing } from '@/constants/theme';

type Props = {
  title: string;
  subtitle?: string;
};

export function PlaceholderScreen({ title, subtitle }: Props) {
  return (
    <Screen scroll={false}>
      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing[6],
  },
  title: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.lg,
    color: Colors.foreground,
  },
  subtitle: {
    marginTop: Spacing[2],
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    color: Colors.mutedForeground,
    textAlign: 'center',
  },
});
