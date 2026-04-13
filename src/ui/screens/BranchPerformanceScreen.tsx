/**
 * Screen / Container component.
 *
 * Tugasnya HANYA:
 *  - memanggil hook (state + business logic)
 *  - menyusun layout dari presentational components
 *
 * Tidak boleh berisi rumus bisnis ataupun akses data langsung.
 */

import { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useBranchPerformance } from '@/src/hooks/useBranchPerformance';
import { BranchCard } from '@/src/ui/components/BranchCard';
import { SectionHeader } from '@/src/ui/components/SectionHeader';
import { StatsSummary } from '@/src/ui/components/StatsSummary';
import type { BranchPerformance } from '@/src/types/branch';

export function BranchPerformanceScreen() {
  const {
    loading,
    branches,
    summary,
    regions,
    selectedRegion,
    setSelectedRegion,
    refresh,
  } = useBranchPerformance();

  const renderItem = useCallback(
    ({ item }: { item: BranchPerformance }) => <BranchCard branch={item} />,
    [],
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        data={branches}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <SectionHeader
              title="Branch Performance"
              subtitle="Ringkasan kinerja seluruh cabang"
            />
            <StatsSummary summary={summary} />

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Filter Region</Text>
              <View style={styles.chipsRow}>
                <Chip
                  label="Semua"
                  active={selectedRegion === null}
                  onPress={() => setSelectedRegion(null)}
                />
                {regions.map((region) => (
                  <Chip
                    key={region}
                    label={region}
                    active={selectedRegion === region}
                    onPress={() => setSelectedRegion(region)}
                  />
                ))}
              </View>
            </View>

            <SectionHeader
              title="Daftar Cabang"
              subtitle={`${branches.length} cabang ditampilkan`}
            />
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <View style={styles.emptyState}>
              <ActivityIndicator />
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Tidak ada data cabang.</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}

function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    paddingTop: 12,
    gap: 16,
  },
  filterSection: {
    gap: 8,
  },
  filterLabel: {
    fontSize: 12,
    color: '#687076',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#E9ECEF',
  },
  chipActive: {
    backgroundColor: '#0A7EA4',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#495057',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  emptyState: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    color: '#687076',
  },
});
