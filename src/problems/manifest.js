export const manifest = [
  {
    slug: 'hash/two-sum',
    title: '1. Two Sum',
    category: 'Hash',
    load: () => import('./hash/two-sum.js'),
  },
  {
    slug: 'hash/group-anagrams',
    title: '49. Group Anagrams',
    category: 'Hash',
    load: () => import('./hash/group-anagrams.js'),
  },
  {
    slug: 'hash/longest-consecutive',
    title: '128. Longest Consecutive',
    category: 'Hash',
    load: () => import('./hash/longest-consecutive.js'),
  },
  {
    slug: 'two-pointer/move-zeroes',
    title: '283. Move Zeroes',
    category: 'Two Pointer',
    load: () => import('./two-pointer/move-zeroes.js'),
  },
  {
    slug: 'two-pointer/max-area',
    title: '11. Container With Most Water',
    category: 'Two Pointer',
    load: () => import('./two-pointer/max-area.js'),
  },
  {
    slug: 'two-pointer/three-sum',
    title: '15. 3Sum',
    category: 'Two Pointer',
    load: () => import('./two-pointer/three-sum.js'),
  },
  {
    slug: 'two-pointer/trap',
    title: '42. Trapping Rain Water',
    category: 'Two Pointer',
    load: () => import('./two-pointer/trap.js'),
  },
  {
    slug: 'substring/sliding-window-max',
    title: '239. Sliding Window Maximum',
    category: 'Substring',
    load: () => import('./substring/sliding-window-max.js'),
  },
  {
    slug: 'substring/subarray-sum-k',
    title: '560. Subarray Sum Equals K',
    category: 'Substring',
    load: () => import('./substring/subarray-sum-k.js'),
  },
];
