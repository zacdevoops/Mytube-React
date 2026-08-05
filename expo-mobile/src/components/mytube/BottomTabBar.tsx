import { Tabs } from 'expo-router';
import { Download, Home, Library, Settings } from 'lucide-react-native';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Borders, Colors, FontFamily, FontSize, IconSize, Spacing } from '@/constants/theme';

type TabBarRender = NonNullable<ComponentProps<typeof Tabs>['tabBar']>;
type BottomTabBarProps = TabBarRender extends (props: infer P) => React.ReactNode ? P : never;

const ICONS = {
  index: Home,
  library: Library,
  downloads: Download,
  settings: Settings,
} as const;

const LABELS = {
  index: 'Home',
  library: 'Library',
  downloads: 'Downloads',
  settings: 'Settings',
} as const;

type RouteName = keyof typeof ICONS;

export function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, Spacing[3]);

  return (
    <View style={[styles.wrap, { paddingBottom: bottomPad, borderTopColor: Borders.color }]}>
      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const { options } = descriptors[route.key];
          const name = route.name as RouteName;
          const Icon = ICONS[name] ?? Home;
          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : (LABELS[name] ?? options.title ?? route.name);
          const color = focused ? Colors.primary : Colors.mutedForeground;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.item}>
              <Icon size={IconSize.tab} color={color} />
              <Text style={[styles.label, { color }]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderTopWidth: Borders.width,
    backgroundColor: Colors.background95,
    paddingTop: Spacing[2],
    paddingHorizontal: Spacing[2],
  },
  row: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing[1],
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
  },
});
