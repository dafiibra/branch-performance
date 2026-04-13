import { StyleSheet, Text, View } from 'react-native';

import type { PerformanceSummary } from '@/src/types/branch';
import {
  formatCompactNumber,
  formatCurrencyIDR,
  formatPercent,
} from '@/src/utils/formatters';

interface Props {
  summary: PerformanceSummary;
}

export function StatsSummary({ summary }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <StatBox label="Total Revenue" value={formatCurrencyIDR(summary.totalRevenue)} />
        <StatBox label="Total Target" value={formatCurrencyIDR(summary.totalTarget)} />
      </View>
      <View style={styles.row}>
        <StatBox
          label="Avg. Achievement"
          value={formatPercent(summary.averageAchievement)}
          highlight
        />
        <StatBox label="Total Cabang" value={formatCompactNumber(summary.branchCount)} />
      </View>
    </View>
  );
}

function StatBox({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <View style={[styles.box, highlight && styles.boxHighlight]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, highlight && styles.valueHighlight]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  box: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F1F3F5',
  },
  boxHighlight: {
    backgroundColor: '#0A7EA4',
  },
  label: {
    fontSize: 12,
    color: '#687076',
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: '#11181C',
    marginTop: 4,
  },
  valueHighlight: {
    color: '#FFFFFF',
  },
});
