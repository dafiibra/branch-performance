/**
 * Generator JSON untuk data cabang.
 * Sengaja dipisah dari `branches.json` agar:
 *  - data statis (json) tetap "source of truth" yang mudah di-review
 *  - generator dapat dipakai untuk testing / seeding / mock API
 *
 * Generator ini TIDAK melakukan komputasi performa (itu tugas service layer).
 */

import type { Branch } from '@/src/types/branch';
import branchesJson from '@/src/data/branches.json';

const FIRST_NAMES = [
  'Andi', 'Sari', 'Bayu', 'Dewi', 'Rizky', 'Putri', 'Fajar', 'Intan',
  'Galih', 'Maya', 'Hendra', 'Lestari', 'Yoga', 'Nadia', 'Reza',
];

const LAST_NAMES = [
  'Pratama', 'Wulandari', 'Setiawan', 'Anggraini', 'Hidayat', 'Handayani',
  'Saputra', 'Maharani', 'Permana', 'Kusuma', 'Wijaya', 'Santoso',
];

const CITIES: Array<{ city: string; region: string }> = [
  { city: 'Jakarta', region: 'DKI Jakarta' },
  { city: 'Bandung', region: 'Jawa Barat' },
  { city: 'Surabaya', region: 'Jawa Timur' },
  { city: 'Yogyakarta', region: 'DI Yogyakarta' },
  { city: 'Makassar', region: 'Sulawesi Selatan' },
  { city: 'Medan', region: 'Sumatera Utara' },
  { city: 'Denpasar', region: 'Bali' },
  { city: 'Semarang', region: 'Jawa Tengah' },
  { city: 'Palembang', region: 'Sumatera Selatan' },
  { city: 'Balikpapan', region: 'Kalimantan Timur' },
];

/** Pseudo-random terdeterministik agar hasil generator stabil saat dites. */
const seededRandom = (seed: number) => {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

const pick = <T,>(arr: T[], rnd: () => number): T => arr[Math.floor(rnd() * arr.length)];

/**
 * Mengembalikan data cabang yang sudah ada di JSON statis.
 * Dipakai sebagai sumber utama pada runtime aplikasi.
 */
export const loadBranches = (): Branch[] => branchesJson as Branch[];

/**
 * Menghasilkan list cabang baru secara dinamis.
 * Berguna untuk demo data, testing, atau contoh API mock.
 */
export const generateBranches = (count: number, seed = 42): Branch[] => {
  const rnd = seededRandom(seed);
  const now = new Date().toISOString();

  return Array.from({ length: count }, (_, i): Branch => {
    const location = pick(CITIES, rnd);
    const target = Math.round((500 + rnd() * 1500) * 1_000_000);
    const revenue = Math.round(target * (0.6 + rnd() * 0.8));

    return {
      id: `gen-${String(i + 1).padStart(3, '0')}`,
      name: `Cabang ${location.city} ${i + 1}`,
      city: location.city,
      region: location.region,
      manager: `${pick(FIRST_NAMES, rnd)} ${pick(LAST_NAMES, rnd)}`,
      revenue,
      target,
      customers: Math.round(1000 + rnd() * 5000),
      transactions: Math.round(3000 + rnd() * 15000),
      updatedAt: now,
    };
  });
};
