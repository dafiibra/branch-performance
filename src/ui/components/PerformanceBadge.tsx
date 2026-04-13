/**
 * Presentational component murni.
 * Tidak melakukan komputasi – semua logic ada di service layer.
 */

import { StyleSheet, Text, View } from 'react-native';

import type { PerformanceLevel } from '@/src/types/branch';

interface Props {
  level: PerformanceLevel;
}

const LEVEL_META: Record<PerformanceLevel, { label: string; color: string; bg: string }> = {
  excellent: { label: 'Excellent', color: '#0F5132', bg: '#D1E7DD' },
  good: { label: 'Good', color: '#055160', bg: '#CFF4FC' },
  average: { label: 'Average', color: '#664D03', bg: '#FFF3CD' },
  poor: { label: 'Poor', color: '#842029', bg: '#F8D7DA' },
};

export function PerformanceBadge({ level }: Props) {
  const meta = LEVEL_META[level];
  return (
    <View style={[styles.container, { backgroundColor: meta.bg }]}>
      <Text style={[styles.text, { color: meta.color }]}>{meta.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
