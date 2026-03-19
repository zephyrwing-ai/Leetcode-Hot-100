let NUMS = [3, 2, 1, 5, 6, 4];
let K = 2;

const code = [
  'import heapq',
  'class Solution:',
  '    def findKthLargest(self, nums, k):',
  '        min_heap = []',
  '        for num in nums:',
  '            heapq.heappush(min_heap, num)',
  '            if len(min_heap) > k:',
  '                heapq.heappop(min_heap)',
  '        return min_heap[0]',
];

const lineMap = { 8: 3, 9: 4, 10: 5, 11: 6, 12: 7, 13: 8 };

const steps1 = [
  { lineNum: 8, phase: 'init', description: '初始化空的最小堆, k=2', nums: [3,2,1,5,6,4], currentI: -1, currentNum: null, heap: [], justPushed: null, justPopped: null, result: null },
  // num=3
  { lineNum: 9, phase: 'push', description: 'num=3, 准备将 3 推入最小堆', nums: [3,2,1,5,6,4], currentI: 0, currentNum: 3, heap: [], justPushed: null, justPopped: null, result: null },
  { lineNum: 10, phase: 'push', description: '将 3 推入最小堆', nums: [3,2,1,5,6,4], currentI: 0, currentNum: 3, heap: [3], justPushed: 3, justPopped: null, result: null },
  { lineNum: 11, phase: 'heapify', description: '堆大小 1 <= k=2, 不需要弹出', nums: [3,2,1,5,6,4], currentI: 0, currentNum: 3, heap: [3], justPushed: null, justPopped: null, result: null },
  // num=2
  { lineNum: 9, phase: 'push', description: 'num=2, 准备将 2 推入最小堆', nums: [3,2,1,5,6,4], currentI: 1, currentNum: 2, heap: [3], justPushed: null, justPopped: null, result: null },
  { lineNum: 10, phase: 'push', description: '将 2 推入最小堆', nums: [3,2,1,5,6,4], currentI: 1, currentNum: 2, heap: [2, 3], justPushed: 2, justPopped: null, result: null },
  { lineNum: 11, phase: 'heapify', description: '堆大小 2 == k=2, 不需要弹出', nums: [3,2,1,5,6,4], currentI: 1, currentNum: 2, heap: [2, 3], justPushed: null, justPopped: null, result: null },
  // num=1
  { lineNum: 10, phase: 'push', description: 'num=1, 将 1 推入最小堆', nums: [3,2,1,5,6,4], currentI: 2, currentNum: 1, heap: [1, 2, 3], justPushed: 1, justPopped: null, result: null },
  { lineNum: 12, phase: 'pop', description: '堆大小 3 > k=2, 弹出堆顶最小值 1', nums: [3,2,1,5,6,4], currentI: 2, currentNum: 1, heap: [2, 3], justPushed: null, justPopped: 1, result: null },
  // num=5
  { lineNum: 10, phase: 'push', description: 'num=5, 将 5 推入最小堆', nums: [3,2,1,5,6,4], currentI: 3, currentNum: 5, heap: [2, 3, 5], justPushed: 5, justPopped: null, result: null },
  { lineNum: 12, phase: 'pop', description: '堆大小 3 > k=2, 弹出堆顶最小值 2', nums: [3,2,1,5,6,4], currentI: 3, currentNum: 5, heap: [3, 5], justPushed: null, justPopped: 2, result: null },
  // num=6
  { lineNum: 10, phase: 'push', description: 'num=6, 将 6 推入最小堆', nums: [3,2,1,5,6,4], currentI: 4, currentNum: 6, heap: [3, 5, 6], justPushed: 6, justPopped: null, result: null },
  { lineNum: 12, phase: 'pop', description: '堆大小 3 > k=2, 弹出堆顶最小值 3', nums: [3,2,1,5,6,4], currentI: 4, currentNum: 6, heap: [5, 6], justPushed: null, justPopped: 3, result: null },
  // num=4
  { lineNum: 10, phase: 'push', description: 'num=4, 将 4 推入最小堆', nums: [3,2,1,5,6,4], currentI: 5, currentNum: 4, heap: [4, 5, 6], justPushed: 4, justPopped: null, result: null },
  { lineNum: 12, phase: 'pop', description: '堆大小 3 > k=2, 弹出堆顶最小值 4', nums: [3,2,1,5,6,4], currentI: 5, currentNum: 4, heap: [5, 6], justPushed: null, justPopped: 4, result: null },
  // done
  { lineNum: 13, phase: 'done', description: '堆顶 min_heap[0] = 5, 即第 2 大元素', nums: [3,2,1,5,6,4], currentI: -1, currentNum: null, heap: [5, 6], justPushed: null, justPopped: null, result: 5 },
];

// 2nd test case: [3,2,3,1,2,4,5,5,6], k=4 → answer=4
const steps2 = [
  { lineNum: 8, phase: 'init', description: '初始化空的最小堆, k=4', nums: [3,2,3,1,2,4,5,5,6], currentI: -1, currentNum: null, heap: [], justPushed: null, justPopped: null, result: null },
  { lineNum: 10, phase: 'push', description: 'num=3, 将 3 推入堆', nums: [3,2,3,1,2,4,5,5,6], currentI: 0, currentNum: 3, heap: [3], justPushed: 3, justPopped: null, result: null },
  { lineNum: 10, phase: 'push', description: 'num=2, 将 2 推入堆', nums: [3,2,3,1,2,4,5,5,6], currentI: 1, currentNum: 2, heap: [2, 3], justPushed: 2, justPopped: null, result: null },
  { lineNum: 10, phase: 'push', description: 'num=3, 将 3 推入堆', nums: [3,2,3,1,2,4,5,5,6], currentI: 2, currentNum: 3, heap: [2, 3, 3], justPushed: 3, justPopped: null, result: null },
  { lineNum: 10, phase: 'push', description: 'num=1, 将 1 推入堆', nums: [3,2,3,1,2,4,5,5,6], currentI: 3, currentNum: 1, heap: [1, 2, 3, 3], justPushed: 1, justPopped: null, result: null },
  { lineNum: 11, phase: 'heapify', description: '堆大小 4 == k=4, 不需要弹出', nums: [3,2,3,1,2,4,5,5,6], currentI: 3, currentNum: 1, heap: [1, 2, 3, 3], justPushed: null, justPopped: null, result: null },
  { lineNum: 10, phase: 'push', description: 'num=2, 将 2 推入堆', nums: [3,2,3,1,2,4,5,5,6], currentI: 4, currentNum: 2, heap: [1, 2, 2, 3, 3], justPushed: 2, justPopped: null, result: null },
  { lineNum: 12, phase: 'pop', description: '堆大小 5 > k=4, 弹出最小值 1', nums: [3,2,3,1,2,4,5,5,6], currentI: 4, currentNum: 2, heap: [2, 2, 3, 3], justPushed: null, justPopped: 1, result: null },
  { lineNum: 10, phase: 'push', description: 'num=4, 将 4 推入堆', nums: [3,2,3,1,2,4,5,5,6], currentI: 5, currentNum: 4, heap: [2, 2, 3, 3, 4], justPushed: 4, justPopped: null, result: null },
  { lineNum: 12, phase: 'pop', description: '堆大小 5 > k=4, 弹出最小值 2', nums: [3,2,3,1,2,4,5,5,6], currentI: 5, currentNum: 4, heap: [2, 3, 3, 4], justPushed: null, justPopped: 2, result: null },
  { lineNum: 10, phase: 'push', description: 'num=5, 将 5 推入堆', nums: [3,2,3,1,2,4,5,5,6], currentI: 6, currentNum: 5, heap: [2, 3, 3, 4, 5], justPushed: 5, justPopped: null, result: null },
  { lineNum: 12, phase: 'pop', description: '堆大小 5 > k=4, 弹出最小值 2', nums: [3,2,3,1,2,4,5,5,6], currentI: 6, currentNum: 5, heap: [3, 3, 4, 5], justPushed: null, justPopped: 2, result: null },
  { lineNum: 10, phase: 'push', description: 'num=5, 将 5 推入堆', nums: [3,2,3,1,2,4,5,5,6], currentI: 7, currentNum: 5, heap: [3, 3, 4, 5, 5], justPushed: 5, justPopped: null, result: null },
  { lineNum: 12, phase: 'pop', description: '堆大小 5 > k=4, 弹出最小值 3', nums: [3,2,3,1,2,4,5,5,6], currentI: 7, currentNum: 5, heap: [3, 4, 5, 5], justPushed: null, justPopped: 3, result: null },
  { lineNum: 10, phase: 'push', description: 'num=6, 将 6 推入堆', nums: [3,2,3,1,2,4,5,5,6], currentI: 8, currentNum: 6, heap: [3, 4, 5, 5, 6], justPushed: 6, justPopped: null, result: null },
  { lineNum: 12, phase: 'pop', description: '堆大小 5 > k=4, 弹出最小值 3', nums: [3,2,3,1,2,4,5,5,6], currentI: 8, currentNum: 6, heap: [4, 5, 5, 6], justPushed: null, justPopped: 3, result: null },
  { lineNum: 13, phase: 'done', description: '堆顶 min_heap[0] = 4, 即第 4 大元素', nums: [3,2,3,1,2,4,5,5,6], currentI: -1, currentNum: null, heap: [4, 5, 5, 6], justPushed: null, justPopped: null, result: 4 },
];

const phaseLabels = { init: '初始化', push: '入堆', heapify: '检查堆大小', pop: '弹出堆顶', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">输入数组 nums（蓝色 = 当前遍历元素）</div>
      <div class="array-row" id="nums-array"></div>
    </div>
    <div class="card">
      <div class="section-title">最小堆 min_heap（大小 <= k，堆顶最小）</div>
      <div class="heap-tree" id="heap-area"></div>
    </div>
    <div id="popped-area" style="min-height:20px"></div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '215. Kth Largest Element -- 执行可视化',
  problemDesc: `
    <p>给定整数数组 <code>nums</code> 和整数 <code>k</code>，请返回数组中第 <code>k</code> 个最大的元素。注意是排序后的第 <code>k</code> 个最大元素，而不是第 <code>k</code> 个不同的元素。</p>
    <div class="example">输入：nums = [3,2,1,5,6,4], k = 2
输出：5</div>
  `,
  subtitle: `nums = [${NUMS}] | k = ${K}`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '[3,2,1,5,6,4] k=2', steps: steps1, subtitle: 'nums = [3,2,1,5,6,4] | k = 2' },
    { name: '[3,2,3,1,2,4,5,5,6] k=4', steps: steps2, subtitle: 'nums = [3,2,3,1,2,4,5,5,6] | k = 4', setup(panel) { NUMS = [3,2,3,1,2,4,5,5,6]; K = 4; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const nums = s.nums || NUMS;
    // nums array
    document.getElementById('nums-array').innerHTML = nums.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.currentI) cls += ' is-active';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    // heap tree
    const heapEl = document.getElementById('heap-area');
    if (s.heap.length === 0) {
      heapEl.innerHTML = '<div class="stack-empty">（堆为空）</div>';
    } else {
      const levels = [];
      let i = 0;
      let levelSize = 1;
      while (i < s.heap.length) {
        const level = s.heap.slice(i, i + levelSize);
        levels.push(level);
        i += levelSize;
        levelSize *= 2;
      }
      heapEl.innerHTML = levels.map((level, li) => {
        const nodes = level.map((val, ni) => {
          let cls = 'heap-node';
          if (li === 0 && ni === 0) cls += ' top';
          if (s.justPushed !== null && val === s.justPushed) cls += ' just-pushed';
          return `<div class="${cls}"><div class="heap-val">${val}</div></div>`;
        }).join('');
        return `<div class="heap-level">${nodes}</div>`;
      }).join('');
    }

    // popped indicator
    const poppedEl = document.getElementById('popped-area');
    if (s.justPopped !== null) {
      poppedEl.innerHTML = `<div style="font-size:12px;color:#ef4444;font-family:monospace;padding:4px 0">弹出: ${s.justPopped}</div>`;
    } else {
      poppedEl.innerHTML = '';
    }

    // found box
    const foundEl = document.getElementById('found-area');
    if (s.result !== null) {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="res-val">第 k 大元素 = ${s.result}</div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
