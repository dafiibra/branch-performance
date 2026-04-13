/**
 * Domain types untuk fitur Branch Performance.
 * Diletakkan terpisah agar dapat dipakai ulang oleh layer data,
 * service, hook, dan UI tanpa import silang antar lapisan.
 */

export type PerformanceLevel = 'excellent' | 'good' | 'average' | 'poor';

export interface Branch {
  id: string;
  name: string;
  city: string;
  region: string;
  manager: string;
  revenue: number;
  target: number;
  customers: number;
  transactions: number;
  updatedAt: string; // ISO date
}

export interface BranchPerformance extends Branch {
  achievement: number; // % achievement terhadap target (0..n)
  level: PerformanceLevel;
  rank: number;
}

export interface PerformanceSummary {
  totalRevenue: number;
  totalTarget: number;
  averageAchievement: number;
  bestBranchId: string | null;
  worstBranchId: string | null;
  branchCount: number;
}
