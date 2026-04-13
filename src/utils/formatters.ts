/**
 * Pure utility functions untuk format tampilan.
 * Tidak boleh berisi state, side-effect, atau dependency UI.
 */

export const formatCurrencyIDR = (value: number): string =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);

export const formatCompactNumber = (value: number): string =>
  new Intl.NumberFormat('id-ID', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);

export const formatPercent = (value: number, fractionDigits = 1): string =>
  `${value.toFixed(fractionDigits)}%`;

export const formatDateID = (iso: string): string => {
  const date = new Date(iso);
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};
