/**
 * Branch Service – LAYER BUSINESS LOGIC.
 *
 * Berisi fungsi-fungsi murni (pure functions) yang menghitung
 * metrik performa dari data Branch. Tidak mengetahui apa pun
 * tentang React/UI/storage agar mudah ditest dan dipakai ulang.
 */

import type {
  Branch,
  BranchPerformance,
  PerformanceLevel,
  PerformanceSummary,
} from '@/src/types/branch';

/** Threshold achievement (%) → level performa. */
const LEVEL_THRESHOLDS: Array<{ min: number; level: PerformanceLevel }> = [
  { min: 110, level: 'excellent' },
  { min: 95, level: 'good' },
  { min: 80, level: 'average' },
  { min: 0, level: 'poor' },
];

export const calculateAchievement = (revenue: number, target: number): number => {
  if (target <= 0) return 0;
  return (revenue / target) * 100;
};

export const classifyLevel = (achievementPercent: number): PerformanceLevel => {
  const found = LEVEL_THRESHOLDS.find((t) => achievementPercent >= t.min);
  return found ? found.level : 'poor';
};

/**
 * Menghasilkan list BranchPerformance terurut berdasarkan achievement
 * (descending) dan dilengkapi rank serta level.
 */
export const computeBranchPerformance = (branches: Branch[]): BranchPerformance[] => {
  const enriched = branches.map<Omit<BranchPerformance, 'rank'>>((branch) => {
    const achievement = calculateAchievement(branch.revenue, branch.target);
    return {
      ...branch,
      achievement,
      level: classifyLevel(achievement),
    };
  });

  return enriched
    .sort((a, b) => b.achievement - a.achievement)
    .map((branch, index) => ({ ...branch, rank: index + 1 }));
};

export const buildSummary = (branches: BranchPerformance[]): PerformanceSummary => {
  if (branches.length === 0) {
    return {
      totalRevenue: 0,
      totalTarget: 0,
      averageAchievement: 0,
      bestBranchId: null,
      worstBranchId: null,
      branchCount: 0,
    };
  }

  const totalRevenue = branches.reduce((sum, b) => sum + b.revenue, 0);
  const totalTarget = branches.reduce((sum, b) => sum + b.target, 0);
  const averageAchievement =
    branches.reduce((sum, b) => sum + b.achievement, 0) / branches.length;

  const sortedByAchievement = [...branches].sort((a, b) => b.achievement - a.achievement);

  return {
    totalRevenue,
    totalTarget,
    averageAchievement,
    bestBranchId: sortedByAchievement[0]?.id ?? null,
    worstBranchId: sortedByAchievement[sortedByAchievement.length - 1]?.id ?? null,
    branchCount: branches.length,
  };
};

export const filterByRegion = (
  branches: BranchPerformance[],
  region: string | null,
): BranchPerformance[] => {
  if (!region) return branches;
  return branches.filter((b) => b.region === region);
};
