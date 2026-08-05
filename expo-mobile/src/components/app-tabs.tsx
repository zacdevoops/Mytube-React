import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { Colors, ThemeSchemes } from '@/constants/theme';

/** Leftover Expo starter tab shell — unused by Mytube Phase 1 routes. */
export default function AppTabs() {
  const colors = ThemeSchemes.dark;

  return (
    <NativeTabs
      backgroundColor={Colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
