import { ChevronDown, Download } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { FormatRow } from '@/components/mytube/FormatRow';
import { PrimaryButton } from '@/components/mytube/PrimaryButton';
import {
  Borders,
  Colors,
  FontFamily,
  FontSize,
  IconSize,
  Radii,
  Shadows,
  Spacing,
} from '@/constants/theme';
import { audioFormats, videoFormats } from '@/data/mytube-data';
import type { MediaFormat } from '@/types/format';

export function DownloadPanel() {
  const [openPanel, setOpenPanel] = useState(true);
  const [openVideo, setOpenVideo] = useState(true);
  const [openAudio, setOpenAudio] = useState(true);
  const [selectedId, setSelectedId] = useState<string>(videoFormats[2]?.id ?? videoFormats[0].id);

  const allFormats: MediaFormat[] = [...videoFormats, ...audioFormats];
  const selected = allFormats.find((f) => f.id === selectedId);

  const onStartDownload = () => {
    const label = selected ? `${selected.label} · ${selected.ext}` : 'a format';
    Alert.alert(
      'Preview only',
      `This is a mocked download action for ${label}. No file was written, and nothing was added to Downloads.`,
    );
  };

  return (
    <View style={[styles.card, Shadows.card]}>
      <Pressable
        onPress={() => setOpenPanel((v) => !v)}
        style={styles.header}
        accessibilityRole="button">
        <View style={styles.headerLeft}>
          <Download size={IconSize.download} color={Colors.primary} />
          <Text style={styles.headerTitle}>Download</Text>
        </View>
        <ChevronDown
          size={IconSize.action}
          color={Colors.foreground}
          style={{ transform: [{ rotate: openPanel ? '0deg' : '-90deg' }] }}
        />
      </Pressable>

      {openPanel ? (
        <View style={styles.body}>
          <Pressable onPress={() => setOpenVideo((v) => !v)} style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Video</Text>
            <ChevronDown
              size={IconSize.accordion}
              color={Colors.mutedForeground}
              style={{ transform: [{ rotate: openVideo ? '0deg' : '-90deg' }] }}
            />
          </Pressable>
          {openVideo
            ? videoFormats.map((format) => (
                <FormatRow
                  key={format.id}
                  format={format}
                  selected={selectedId === format.id}
                  onPress={() => setSelectedId(format.id)}
                />
              ))
            : null}

          <Pressable onPress={() => setOpenAudio((v) => !v)} style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Audio</Text>
            <ChevronDown
              size={IconSize.accordion}
              color={Colors.mutedForeground}
              style={{ transform: [{ rotate: openAudio ? '0deg' : '-90deg' }] }}
            />
          </Pressable>
          {openAudio
            ? audioFormats.map((format) => (
                <FormatRow
                  key={format.id}
                  format={format}
                  selected={selectedId === format.id}
                  onPress={() => setSelectedId(format.id)}
                />
              ))
            : null}

          <View style={styles.cta}>
            <PrimaryButton onPress={onStartDownload}>Start Download</PrimaryButton>
          </View>
          <View style={styles.footer} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: Spacing[5],
    backgroundColor: Colors.surface,
    borderRadius: Radii['2xl'],
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  headerTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.base,
    color: Colors.foreground,
  },
  body: {
    borderTopWidth: Borders.width,
    borderTopColor: Borders.color,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[2.5],
  },
  sectionLabel: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.caption,
    color: Colors.mutedForeground,
  },
  cta: {
    paddingHorizontal: Spacing[4],
    paddingTop: Spacing[2],
    paddingBottom: Spacing[1],
  },
  footer: {
    height: Spacing[2],
  },
});
