import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, FontFamily, FontSize, Spacing } from '@/constants/theme';

type Props = {
  detailMeta: string;
  hashtag?: string;
  description: string;
};

export function DescriptionBlock({ detailMeta, hashtag, description }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.wrap}>
      {!expanded ? (
        <Text style={styles.meta} numberOfLines={1}>
          {detailMeta}
          {hashtag ? (
            <>
              {' · '}
              <Text style={styles.hashtag}>{hashtag}</Text>
            </>
          ) : null}
          {'  '}
          <Text style={styles.toggle} onPress={() => setExpanded(true)}>
            ...more
          </Text>
        </Text>
      ) : (
        <View>
          <Text style={styles.meta}>
            {detailMeta}
            {hashtag ? (
              <>
                {' · '}
                <Text style={styles.hashtag}>{hashtag}</Text>
              </>
            ) : null}
          </Text>
          <Text style={styles.body}>{description}</Text>
          <Pressable onPress={() => setExpanded(false)} hitSlop={6}>
            <Text style={styles.toggle}>Show less</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: Spacing[1],
  },
  meta: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    color: Colors.mutedForeground,
    lineHeight: 16,
  },
  hashtag: {
    color: Colors.secondary,
  },
  body: {
    marginTop: Spacing[2],
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    color: Colors.mutedForeground,
    lineHeight: 16,
  },
  toggle: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    color: Colors.foreground,
  },
});
