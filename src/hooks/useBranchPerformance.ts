/**
 * Hook ini menjadi "bridge" antara LAYER UI dan LAYER BUSINESS LOGIC.
 * UI hanya tahu hook ini, tidak peduli darimana data berasal,
 * dan service layer tetap pure tanpa tahu React.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';

import { loadBranches } from '@/src/data/generators/branchGenerator';
import {
  buildSummary,
  computeBranchPerformance,
  filterByRegion,
} from '@/src/services/branchService';
import type { Branch, BranchPerformance, PerformanceSummary } from '@/src/types/branch';

interface UseBranchPerformanceResult {
  loading: boolean;
  branches: BranchPerformance[];
  summary: PerformanceSummary;
  regions: string[];
  selectedRegion: string | null;
  setSelectedRegion: (region: string | null) => void;
  refresh: () => void;
}

export const useBranchPerformance = (): UseBranchPerformanceResult => {
  const [rawBranches, setRawBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const refresh = useCallback(() => {
    setLoading(true);
    // Simulasi async load (mis. fetch API). Sumber data dipisah ke layer data.
    const data = loadBranches();
    setRawBranches(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const allPerformance = useMemo(
    () => computeBranchPerformance(rawBranches),
    [rawBranches],
  );

  const branches = useMemo(
    () => filterByRegion(allPerformance, selectedRegion),
    [allPerformance, selectedRegion],
  );

  const summary = useMemo(() => buildSummary(branches), [branches]);

  const regions = useMemo(
    () => Array.from(new Set(allPerformance.map((b) => b.region))).sort(),
    [allPerformance],
  );

  return {
    loading,
    branches,
    summary,
    regions,
    selectedRegion,
    setSelectedRegion,
    refresh,
  };
};
