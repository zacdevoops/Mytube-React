import { LinearGradient } from 'expo-linear-gradient';
import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Spacing } from '@/constants/theme';

type Props = {
  children: ReactNode;
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
};

export function Screen({ children, scroll = true, contentStyle }: Props) {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top + Spacing[4];
  const paddingBottom = Spacing[4];

  const content = (
    <View
      style={[
        styles.content,
        !scroll && styles.contentFill,
        { paddingTop, paddingBottom },
        contentStyle,
      ]}>
      {children}
    </View>
  );

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[Colors.glow, 'transparent']}
        locations={[0, 0.7]}
        style={styles.glow}
        pointerEvents="none"
      />
      {scroll ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  glow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Spacing.glowH,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: Spacing[4],
  },
  contentFill: {
    flex: 1,
  },
});
