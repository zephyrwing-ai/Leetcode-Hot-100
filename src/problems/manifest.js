export const manifest = [
  // ── Hash ──
  { slug: 'hash/two-sum', title: '1. Two Sum', category: 'Hash', load: () => import('./hash/two-sum.js') },
  { slug: 'hash/group-anagrams', title: '49. Group Anagrams', category: 'Hash', load: () => import('./hash/group-anagrams.js') },
  { slug: 'hash/longest-consecutive', title: '128. Longest Consecutive', category: 'Hash', load: () => import('./hash/longest-consecutive.js') },

  // ── Two Pointer ──
  { slug: 'two-pointer/move-zeroes', title: '283. Move Zeroes', category: 'Two Pointer', load: () => import('./two-pointer/move-zeroes.js') },
  { slug: 'two-pointer/max-area', title: '11. Container With Most Water', category: 'Two Pointer', load: () => import('./two-pointer/max-area.js') },
  { slug: 'two-pointer/three-sum', title: '15. 3Sum', category: 'Two Pointer', load: () => import('./two-pointer/three-sum.js') },
  { slug: 'two-pointer/trap', title: '42. Trapping Rain Water', category: 'Two Pointer', load: () => import('./two-pointer/trap.js') },

  // ── Sliding Window ──
  { slug: 'substring/sliding-window-max', title: '239. Sliding Window Maximum', category: 'Sliding Window', load: () => import('./substring/sliding-window-max.js') },
  { slug: 'substring/subarray-sum-k', title: '560. Subarray Sum Equals K', category: 'Sliding Window', load: () => import('./substring/subarray-sum-k.js') },
  { slug: 'substring/longest-substr', title: '3. Longest Substring Without Repeating', category: 'Sliding Window', load: () => import('./substring/longest-substr.js') },
  { slug: 'substring/find-anagrams', title: '438. Find All Anagrams', category: 'Sliding Window', load: () => import('./substring/find-anagrams.js') },
  { slug: 'substring/min-window', title: '76. Minimum Window Substring', category: 'Sliding Window', load: () => import('./substring/min-window.js') },

  // ── Array ──
  { slug: 'array/max-subarray', title: '53. Maximum Subarray', category: 'Array', load: () => import('./array/max-subarray.js') },
  { slug: 'array/merge-intervals', title: '56. Merge Intervals', category: 'Array', load: () => import('./array/merge-intervals.js') },
  { slug: 'array/rotate-array', title: '189. Rotate Array', category: 'Array', load: () => import('./array/rotate-array.js') },
  { slug: 'array/product-except-self', title: '238. Product of Array Except Self', category: 'Array', load: () => import('./array/product-except-self.js') },
  { slug: 'array/first-missing-positive', title: '41. First Missing Positive', category: 'Array', load: () => import('./array/first-missing-positive.js') },

  // ── Matrix ──
  { slug: 'array/set-matrix-zeroes', title: '73. Set Matrix Zeroes', category: 'Matrix', load: () => import('./array/set-matrix-zeroes.js') },
  { slug: 'sorting/rotate-image', title: '48. Rotate Image', category: 'Matrix', load: () => import('./sorting/rotate-image.js') },
  { slug: 'matrix/spiral-matrix', title: '54. Spiral Matrix', category: 'Matrix', load: () => import('./matrix/spiral-matrix.js') },
  { slug: 'matrix/search-matrix-ii', title: '240. Search a 2D Matrix II', category: 'Matrix', load: () => import('./matrix/search-matrix-ii.js') },

  // ── Linked List ──
  { slug: 'linked-list/intersection', title: '160. Intersection of Two Linked Lists', category: 'Linked List', load: () => import('./linked-list/intersection.js') },
  { slug: 'linked-list/reverse-list', title: '206. Reverse Linked List', category: 'Linked List', load: () => import('./linked-list/reverse-list.js') },
  { slug: 'linked-list/palindrome', title: '234. Palindrome Linked List', category: 'Linked List', load: () => import('./linked-list/palindrome.js') },
  { slug: 'linked-list/has-cycle', title: '141. Linked List Cycle', category: 'Linked List', load: () => import('./linked-list/has-cycle.js') },
  { slug: 'linked-list/detect-cycle', title: '142. Linked List Cycle II', category: 'Linked List', load: () => import('./linked-list/detect-cycle.js') },
  { slug: 'linked-list/merge-two', title: '21. Merge Two Sorted Lists', category: 'Linked List', load: () => import('./linked-list/merge-two.js') },
  { slug: 'linked-list/add-two', title: '2. Add Two Numbers', category: 'Linked List', load: () => import('./linked-list/add-two.js') },
  { slug: 'linked-list/remove-nth', title: '19. Remove Nth Node From End', category: 'Linked List', load: () => import('./linked-list/remove-nth.js') },
  { slug: 'linked-list/swap-pairs', title: '24. Swap Nodes in Pairs', category: 'Linked List', load: () => import('./linked-list/swap-pairs.js') },
  { slug: 'linked-list/reverse-k-group', title: '25. Reverse Nodes in k-Group', category: 'Linked List', load: () => import('./linked-list/reverse-k-group.js') },
  { slug: 'linked-list/copy-random-list', title: '138. Copy List with Random Pointer', category: 'Linked List', load: () => import('./linked-list/copy-random-list.js') },
  { slug: 'linked-list/merge-k-lists', title: '23. Merge k Sorted Lists', category: 'Linked List', load: () => import('./linked-list/merge-k-lists.js') },
  { slug: 'linked-list/lru-cache', title: '146. LRU Cache', category: 'Linked List', load: () => import('./linked-list/lru-cache.js') },
  { slug: 'sorting/sort-list', title: '148. Sort List', category: 'Linked List', load: () => import('./sorting/sort-list.js') },

  // ── Binary Tree ──
  { slug: 'binary-tree/inorder', title: '94. Binary Tree Inorder Traversal', category: 'Binary Tree', load: () => import('./binary-tree/inorder.js') },
  { slug: 'binary-tree/max-depth', title: '104. Maximum Depth of Binary Tree', category: 'Binary Tree', load: () => import('./binary-tree/max-depth.js') },
  { slug: 'binary-tree/invert-tree', title: '226. Invert Binary Tree', category: 'Binary Tree', load: () => import('./binary-tree/invert-tree.js') },
  { slug: 'binary-tree/symmetric', title: '101. Symmetric Tree', category: 'Binary Tree', load: () => import('./binary-tree/symmetric.js') },
  { slug: 'binary-tree/diameter', title: '543. Diameter of Binary Tree', category: 'Binary Tree', load: () => import('./binary-tree/diameter.js') },
  { slug: 'binary-tree/level-order', title: '102. Binary Tree Level Order Traversal', category: 'Binary Tree', load: () => import('./binary-tree/level-order.js') },
  { slug: 'binary-tree/sorted-array-bst', title: '108. Convert Sorted Array to BST', category: 'Binary Tree', load: () => import('./binary-tree/sorted-array-bst.js') },
  { slug: 'binary-tree/validate-bst', title: '98. Validate BST', category: 'Binary Tree', load: () => import('./binary-tree/validate-bst.js') },
  { slug: 'binary-tree/kth-smallest', title: '230. Kth Smallest Element in BST', category: 'Binary Tree', load: () => import('./binary-tree/kth-smallest.js') },
  { slug: 'binary-tree/right-side', title: '199. Binary Tree Right Side View', category: 'Binary Tree', load: () => import('./binary-tree/right-side.js') },
  { slug: 'binary-tree/flatten', title: '114. Flatten Binary Tree to Linked List', category: 'Binary Tree', load: () => import('./binary-tree/flatten.js') },
  { slug: 'binary-tree/build-tree', title: '105. Construct Binary Tree', category: 'Binary Tree', load: () => import('./binary-tree/build-tree.js') },
  { slug: 'binary-tree/path-sum-iii', title: '437. Path Sum III', category: 'Binary Tree', load: () => import('./binary-tree/path-sum-iii.js') },
  { slug: 'binary-tree/lca', title: '236. Lowest Common Ancestor', category: 'Binary Tree', load: () => import('./binary-tree/lca.js') },
  { slug: 'binary-tree/max-path-sum', title: '124. Binary Tree Maximum Path Sum', category: 'Binary Tree', load: () => import('./binary-tree/max-path-sum.js') },

  // ── Graph ──
  { slug: 'graph/num-islands', title: '200. Number of Islands', category: 'Graph', load: () => import('./graph/num-islands.js') },
  { slug: 'graph/rotten-oranges', title: '994. Rotting Oranges', category: 'Graph', load: () => import('./graph/rotten-oranges.js') },
  { slug: 'graph/course-schedule', title: '207. Course Schedule', category: 'Graph', load: () => import('./graph/course-schedule.js') },

  // ── Trie ──
  { slug: 'graph/trie', title: '208. Implement Trie', category: 'Trie', load: () => import('./graph/trie.js') },

  // ── Backtracking ──
  { slug: 'backtracking/permutations', title: '46. Permutations', category: 'Backtracking', load: () => import('./backtracking/permutations.js') },
  { slug: 'backtracking/subsets', title: '78. Subsets', category: 'Backtracking', load: () => import('./backtracking/subsets.js') },
  { slug: 'backtracking/letter-combos', title: '17. Letter Combinations', category: 'Backtracking', load: () => import('./backtracking/letter-combos.js') },
  { slug: 'backtracking/combo-sum', title: '39. Combination Sum', category: 'Backtracking', load: () => import('./backtracking/combo-sum.js') },
  { slug: 'backtracking/gen-parens', title: '22. Generate Parentheses', category: 'Backtracking', load: () => import('./backtracking/gen-parens.js') },
  { slug: 'backtracking/word-search', title: '79. Word Search', category: 'Backtracking', load: () => import('./backtracking/word-search.js') },
  { slug: 'backtracking/palindrome-partition', title: '131. Palindrome Partitioning', category: 'Backtracking', load: () => import('./backtracking/palindrome-partition.js') },
  { slug: 'backtracking/n-queens', title: '51. N-Queens', category: 'Backtracking', load: () => import('./backtracking/n-queens.js') },

  // ── Binary Search ──
  { slug: 'binary-search/search-insert', title: '35. Search Insert Position', category: 'Binary Search', load: () => import('./binary-search/search-insert.js') },
  { slug: 'binary-search/search-matrix', title: '74. Search a 2D Matrix', category: 'Binary Search', load: () => import('./binary-search/search-matrix.js') },
  { slug: 'binary-search/first-last-pos', title: '34. Find First and Last Position', category: 'Binary Search', load: () => import('./binary-search/first-last-pos.js') },
  { slug: 'binary-search/search-rotated', title: '33. Search in Rotated Sorted Array', category: 'Binary Search', load: () => import('./binary-search/search-rotated.js') },
  { slug: 'binary-search/find-min-rotated', title: '153. Find Minimum in Rotated Array', category: 'Binary Search', load: () => import('./binary-search/find-min-rotated.js') },
  { slug: 'binary-search/median-two-arrays', title: '4. Median of Two Sorted Arrays', category: 'Binary Search', load: () => import('./binary-search/median-two-arrays.js') },

  // ── Stack ──
  { slug: 'stack/valid-parens', title: '20. Valid Parentheses', category: 'Stack', load: () => import('./stack/valid-parens.js') },
  { slug: 'stack/min-stack', title: '155. Min Stack', category: 'Stack', load: () => import('./stack/min-stack.js') },
  { slug: 'stack/decode-string', title: '394. Decode String', category: 'Stack', load: () => import('./stack/decode-string.js') },
  { slug: 'stack/daily-temps', title: '739. Daily Temperatures', category: 'Stack', load: () => import('./stack/daily-temps.js') },
  { slug: 'stack/largest-rectangle', title: '84. Largest Rectangle in Histogram', category: 'Stack', load: () => import('./stack/largest-rectangle.js') },

  // ── Heap ──
  { slug: 'stack/kth-largest', title: '215. Kth Largest Element', category: 'Heap', load: () => import('./stack/kth-largest.js') },
  { slug: 'sorting/top-k-frequent', title: '347. Top K Frequent Elements', category: 'Heap', load: () => import('./sorting/top-k-frequent.js') },
  { slug: 'heap/find-median', title: '295. Find Median from Data Stream', category: 'Heap', load: () => import('./heap/find-median.js') },

  // ── Greedy ──
  { slug: 'greedy/buy-sell-stock', title: '121. Best Time to Buy and Sell Stock', category: 'Greedy', load: () => import('./greedy/buy-sell-stock.js') },
  { slug: 'greedy/jump-game', title: '55. Jump Game', category: 'Greedy', load: () => import('./greedy/jump-game.js') },
  { slug: 'greedy/jump-game-ii', title: '45. Jump Game II', category: 'Greedy', load: () => import('./greedy/jump-game-ii.js') },
  { slug: 'greedy/partition-labels', title: '763. Partition Labels', category: 'Greedy', load: () => import('./greedy/partition-labels.js') },

  // ── DP ──
  { slug: 'dp/climb-stairs', title: '70. Climbing Stairs', category: 'DP', load: () => import('./dp/climb-stairs.js') },
  { slug: 'dp/pascal', title: '118. Pascal\'s Triangle', category: 'DP', load: () => import('./dp/pascal.js') },
  { slug: 'dp/rob', title: '198. House Robber', category: 'DP', load: () => import('./dp/rob.js') },
  { slug: 'dp/perfect-squares', title: '279. Perfect Squares', category: 'DP', load: () => import('./dp/perfect-squares.js') },
  { slug: 'dp/coin-change', title: '322. Coin Change', category: 'DP', load: () => import('./dp/coin-change.js') },
  { slug: 'dp/word-break', title: '139. Word Break', category: 'DP', load: () => import('./dp/word-break.js') },
  { slug: 'dp/lis', title: '300. Longest Increasing Subsequence', category: 'DP', load: () => import('./dp/lis.js') },
  { slug: 'dp/max-product', title: '152. Maximum Product Subarray', category: 'DP', load: () => import('./dp/max-product.js') },
  { slug: 'dp/partition-equal', title: '416. Partition Equal Subset Sum', category: 'DP', load: () => import('./dp/partition-equal.js') },
  { slug: 'dp/longest-valid-parens', title: '32. Longest Valid Parentheses', category: 'DP', load: () => import('./dp/longest-valid-parens.js') },

  // ── Multi-DP ──
  { slug: 'dp/unique-paths', title: '62. Unique Paths', category: 'Multi-DP', load: () => import('./dp/unique-paths.js') },
  { slug: 'dp/min-path-sum', title: '64. Minimum Path Sum', category: 'Multi-DP', load: () => import('./dp/min-path-sum.js') },
  { slug: 'dp/longest-palindrome', title: '5. Longest Palindromic Substring', category: 'Multi-DP', load: () => import('./dp/longest-palindrome.js') },
  { slug: 'dp/lcs', title: '1143. Longest Common Subsequence', category: 'Multi-DP', load: () => import('./dp/lcs.js') },
  { slug: 'dp/edit-distance', title: '72. Edit Distance', category: 'Multi-DP', load: () => import('./dp/edit-distance.js') },

  // ── Tricks ──
  { slug: 'sorting/sort-colors', title: '75. Sort Colors', category: 'Tricks', load: () => import('./sorting/sort-colors.js') },
  { slug: 'sorting/single-number', title: '136. Single Number', category: 'Tricks', load: () => import('./sorting/single-number.js') },
  { slug: 'sorting/majority-element', title: '169. Majority Element', category: 'Tricks', load: () => import('./sorting/majority-element.js') },
  { slug: 'tricks/next-permutation', title: '31. Next Permutation', category: 'Tricks', load: () => import('./tricks/next-permutation.js') },
  { slug: 'tricks/find-duplicate', title: '287. Find the Duplicate Number', category: 'Tricks', load: () => import('./tricks/find-duplicate.js') },
];
