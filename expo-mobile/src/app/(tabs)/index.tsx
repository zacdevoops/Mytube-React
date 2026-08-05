import { useRouter } from 'expo-router';
import { Menu, MoreVertical, Search } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { CategoryTab } from '@/components/mytube/CategoryTab';
import { FeaturedCard } from '@/components/mytube/FeaturedCard';
import { Logo } from '@/components/mytube/Logo';
import { MediaCard } from '@/components/mytube/MediaCard';
import { Screen } from '@/components/mytube/Screen';
import {
  Borders,
  Colors,
  FontFamily,
  FontSize,
  IconSize,
  Spacing,
} from '@/constants/theme';
import { categoryTabs, featured, recommended, type CategoryTab as CategoryName } from '@/data/mytube-data';

export default function HomeScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<CategoryName>('Trending');

  const openPlayer = (id: string) => {
    router.push({ pathname: '/player/[id]', params: { id } });
  };

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Menu size={IconSize.header} color={Colors.mutedForeground} />
          <Logo size={18} />
        </View>
        <View style={styles.headerRight}>
          <Search size={IconSize.header} color={Colors.mutedForeground} />
          <MoreVertical size={IconSize.header} color={Colors.mutedForeground} />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsScroll}
        contentContainerStyle={styles.tabs}>
        {categoryTabs.map((name) => (
          <CategoryTab
            key={name}
            label={name}
            active={tab === name}
            onPress={() => setTab(name)}
          />
        ))}
      </ScrollView>

      <FeaturedCard media={featured} onPress={() => openPlayer(featured.id)} />

      <Text style={styles.sectionTitle}>Recommended</Text>
      <View style={styles.list}>
        {recommended.map((item) => (
          <MediaCard
            key={item.id}
            media={item}
            onPress={() => openPlayer(item.id)}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing[3],
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    minWidth: 0,
    flexShrink: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    flexShrink: 0,
  },
  tabsScroll: {
    marginTop: Spacing[4],
    flexGrow: 0,
    borderBottomWidth: Borders.width,
    borderBottomColor: Borders.color,
  },
  tabs: {
    flexDirection: 'row',
    gap: Spacing[5],
  },
  sectionTitle: {
    marginTop: Spacing[6],
    marginBottom: Spacing[3],
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.base,
    color: Colors.foreground,
  },
  list: {
    gap: Spacing[2.5],
  },
});
