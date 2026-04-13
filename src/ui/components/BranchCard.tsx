import { StyleSheet, Text, View } from 'react-native';

import type { BranchPerformance } from '@/src/types/branch';
import {
  formatCompactNumber,
  formatCurrencyIDR,
  formatDateID,
  formatPercent,
} from '@/src/utils/formatters';
import { PerformanceBadge } from '@/src/ui/components/PerformanceBadge';

interface Props {
  branch: BranchPerformance;
}

export function BranchCard({ branch }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.rankCircle}>
          <Text style={styles.rankText}>#{branch.rank}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name} numberOfLines={1}>
            {branch.name}
          </Text>
          <Text style={styles.location} numberOfLines={1}>
            {branch.city} · {branch.region}
          </Text>
        </View>
        <PerformanceBadge level={branch.level} />
      </View>

      <View style={styles.divider} />

      <View style={styles.metricsRow}>
        <Metric label="Revenue" value={formatCurrencyIDR(branch.revenue)} />
        <Metric label="Achievement" value={formatPercent(branch.achievement)} />
      </View>
      <View style={styles.metricsRow}>
        <Metric label="Customers" value={formatCompactNumber(branch.customers)} />
        <Metric label="Transaksi" value={formatCompactNumber(branch.transactions)} />
      </View>

      <Text style={styles.footer}>
        Manager: {branch.manager} · Update {formatDateID(branch.updatedAt)}
      </Text>
    </View>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rankCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E7F5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0A7EA4',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#11181C',
  },
  location: {
    fontSize: 12,
    color: '#687076',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#ECEEF0',
    marginVertical: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  metric: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 11,
    color: '#687076',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181C',
    marginTop: 2,
  },
  footer: {
    marginTop: 4,
    fontSize: 11,
    color: '#9BA1A6',
  },
});
