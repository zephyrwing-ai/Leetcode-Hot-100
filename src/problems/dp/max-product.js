let NUMS = [2, 3, -2, 4];

const code = [
  'class Solution:',
  '    def maxProduct(self, nums):',
  '        max_prod = nums[0]',
  '        min_prod = nums[0]',
  '        result = nums[0]',
  '        for i in range(1, len(nums)):',
  '            if nums[i] < 0:',
  '                max_prod, min_prod = min_prod, max_prod',
  '            max_prod = max(nums[i], max_prod * nums[i])',
  '            min_prod = min(nums[i], min_prod * nums[i])',
  '            result = max(result, max_prod)',
  '        return result',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11 };

const steps1 = [
  {
    lineNum: 3, phase: 'init',
    description: '读取数组 nums = [2, 3, -2, 4]',
    nums: [2, 3, -2, 4],
    currentI: -1, maxProd: null, minProd: null, result: null, swapped: false,
    history: [],
  },
  {
    lineNum: 5, phase: 'init',
    description: '初始化 max_prod = min_prod = result = nums[0] = 2',
    nums: [2, 3, -2, 4],
    currentI: 0, maxProd: 2, minProd: 2, result: 2, swapped: false,
    history: [{ i: 0, max: 2, min: 2, res: 2 }],
  },
  {
    lineNum: 6, phase: 'fill',
    description: 'i=1: 进入循环，当前元素 nums[1] = 3',
    nums: [2, 3, -2, 4],
    currentI: 1, maxProd: 2, minProd: 2, result: 2, swapped: false,
    history: [{ i: 0, max: 2, min: 2, res: 2 }],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=1: nums[1]=3 > 0，不需要交换 max_prod 和 min_prod',
    nums: [2, 3, -2, 4],
    currentI: 1, maxProd: 2, minProd: 2, result: 2, swapped: false,
    history: [{ i: 0, max: 2, min: 2, res: 2 }],
  },
  {
    lineNum: 9, phase: 'fill',
    description: 'i=1: max_prod = max(3, 2*3) = 6, min_prod = min(3, 2*3) = 3, result = max(2, 6) = 6',
    nums: [2, 3, -2, 4],
    currentI: 1, maxProd: 6, minProd: 3, result: 6, swapped: false,
    history: [{ i: 0, max: 2, min: 2, res: 2 }, { i: 1, max: 6, min: 3, res: 6 }],
  },
  {
    lineNum: 6, phase: 'fill',
    description: 'i=2: 进入循环，当前元素 nums[2] = -2',
    nums: [2, 3, -2, 4],
    currentI: 2, maxProd: 6, minProd: 3, result: 6, swapped: false,
    history: [{ i: 0, max: 2, min: 2, res: 2 }, { i: 1, max: 6, min: 3, res: 6 }],
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=2: nums[2]=-2 < 0，交换 max_prod 和 min_prod！（max_prod=3, min_prod=6）',
    nums: [2, 3, -2, 4],
    currentI: 2, maxProd: 3, minProd: 6, result: 6, swapped: true,
    history: [{ i: 0, max: 2, min: 2, res: 2 }, { i: 1, max: 6, min: 3, res: 6 }],
  },
  {
    lineNum: 9, phase: 'fill',
    description: 'i=2: max_prod = max(-2, 3*(-2)) = -2, min_prod = min(-2, 6*(-2)) = -12',
    nums: [2, 3, -2, 4],
    currentI: 2, maxProd: -2, minProd: -12, result: 6, swapped: false,
    history: [{ i: 0, max: 2, min: 2, res: 2 }, { i: 1, max: 6, min: 3, res: 6 }, { i: 2, max: -2, min: -12, res: 6 }],
  },
  {
    lineNum: 11, phase: 'fill',
    description: 'i=2: result = max(6, -2) = 6，最大乘积不变',
    nums: [2, 3, -2, 4],
    currentI: 2, maxProd: -2, minProd: -12, result: 6, swapped: false,
    history: [{ i: 0, max: 2, min: 2, res: 2 }, { i: 1, max: 6, min: 3, res: 6 }, { i: 2, max: -2, min: -12, res: 6 }],
  },
  {
    lineNum: 6, phase: 'fill',
    description: 'i=3: 进入循环，当前元素 nums[3] = 4',
    nums: [2, 3, -2, 4],
    currentI: 3, maxProd: -2, minProd: -12, result: 6, swapped: false,
    history: [{ i: 0, max: 2, min: 2, res: 2 }, { i: 1, max: 6, min: 3, res: 6 }, { i: 2, max: -2, min: -12, res: 6 }],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=3: nums[3]=4 > 0，不需要交换',
    nums: [2, 3, -2, 4],
    currentI: 3, maxProd: -2, minProd: -12, result: 6, swapped: false,
    history: [{ i: 0, max: 2, min: 2, res: 2 }, { i: 1, max: 6, min: 3, res: 6 }, { i: 2, max: -2, min: -12, res: 6 }],
  },
  {
    lineNum: 9, phase: 'fill',
    description: 'i=3: max_prod = max(4, -2*4) = 4, min_prod = min(4, -12*4) = -48',
    nums: [2, 3, -2, 4],
    currentI: 3, maxProd: 4, minProd: -48, result: 6, swapped: false,
    history: [{ i: 0, max: 2, min: 2, res: 2 }, { i: 1, max: 6, min: 3, res: 6 }, { i: 2, max: -2, min: -12, res: 6 }, { i: 3, max: 4, min: -48, res: 6 }],
  },
  {
    lineNum: 11, phase: 'fill',
    description: 'i=3: result = max(6, 4) = 6，最大乘积仍为 6',
    nums: [2, 3, -2, 4],
    currentI: 3, maxProd: 4, minProd: -48, result: 6, swapped: false,
    history: [{ i: 0, max: 2, min: 2, res: 2 }, { i: 1, max: 6, min: 3, res: 6 }, { i: 2, max: -2, min: -12, res: 6 }, { i: 3, max: 4, min: -48, res: 6 }],
  },
  {
    lineNum: 12, phase: 'done',
    description: '遍历结束，返回 result = 6，最大乘积子数组为 [2, 3]',
    nums: [2, 3, -2, 4],
    currentI: -1, maxProd: 4, minProd: -48, result: 6, swapped: false,
    history: [{ i: 0, max: 2, min: 2, res: 2 }, { i: 1, max: 6, min: 3, res: 6 }, { i: 2, max: -2, min: -12, res: 6 }, { i: 3, max: 4, min: -48, res: 6 }],
  },
];

// Test case 2: nums = [-2, 0, -1]
// i=0: max=-2, min=-2, res=-2
// i=1: nums[1]=0>=0, no swap. max=max(0,-2*0)=0, min=min(0,-2*0)=0, res=max(-2,0)=0
// i=2: nums[2]=-1<0, swap: max=0,min=0. max=max(-1,0*(-1))=-1, min=min(-1,0*(-1))=-1, res=max(0,-1)=0
// Answer: 0
const steps2 = [
  {
    lineNum: 3, phase: 'init',
    description: '读取数组 nums = [-2, 0, -1]',
    nums: [-2, 0, -1],
    currentI: -1, maxProd: null, minProd: null, result: null, swapped: false,
    history: [],
  },
  {
    lineNum: 5, phase: 'init',
    description: '初始化 max_prod = min_prod = result = nums[0] = -2',
    nums: [-2, 0, -1],
    currentI: 0, maxProd: -2, minProd: -2, result: -2, swapped: false,
    history: [{ i: 0, max: -2, min: -2, res: -2 }],
  },
  {
    lineNum: 6, phase: 'fill',
    description: 'i=1: 进入循环，当前元素 nums[1] = 0',
    nums: [-2, 0, -1],
    currentI: 1, maxProd: -2, minProd: -2, result: -2, swapped: false,
    history: [{ i: 0, max: -2, min: -2, res: -2 }],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=1: nums[1]=0 >= 0，不需要交换',
    nums: [-2, 0, -1],
    currentI: 1, maxProd: -2, minProd: -2, result: -2, swapped: false,
    history: [{ i: 0, max: -2, min: -2, res: -2 }],
  },
  {
    lineNum: 9, phase: 'fill',
    description: 'i=1: max_prod = max(0, -2*0) = 0, min_prod = min(0, -2*0) = 0',
    nums: [-2, 0, -1],
    currentI: 1, maxProd: 0, minProd: 0, result: -2, swapped: false,
    history: [{ i: 0, max: -2, min: -2, res: -2 }, { i: 1, max: 0, min: 0, res: 0 }],
  },
  {
    lineNum: 11, phase: 'fill',
    description: 'i=1: result = max(-2, 0) = 0，0 把乘积链断开了',
    nums: [-2, 0, -1],
    currentI: 1, maxProd: 0, minProd: 0, result: 0, swapped: false,
    history: [{ i: 0, max: -2, min: -2, res: -2 }, { i: 1, max: 0, min: 0, res: 0 }],
  },
  {
    lineNum: 6, phase: 'fill',
    description: 'i=2: 进入循环，当前元素 nums[2] = -1',
    nums: [-2, 0, -1],
    currentI: 2, maxProd: 0, minProd: 0, result: 0, swapped: false,
    history: [{ i: 0, max: -2, min: -2, res: -2 }, { i: 1, max: 0, min: 0, res: 0 }],
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=2: nums[2]=-1 < 0，交换 max_prod 和 min_prod（交换后都是0）',
    nums: [-2, 0, -1],
    currentI: 2, maxProd: 0, minProd: 0, result: 0, swapped: true,
    history: [{ i: 0, max: -2, min: -2, res: -2 }, { i: 1, max: 0, min: 0, res: 0 }],
  },
  {
    lineNum: 9, phase: 'fill',
    description: 'i=2: max_prod = max(-1, 0*(-1)) = max(-1, 0) = 0, min_prod = min(-1, 0*(-1)) = -1',
    nums: [-2, 0, -1],
    currentI: 2, maxProd: 0, minProd: -1, result: 0, swapped: false,
    history: [{ i: 0, max: -2, min: -2, res: -2 }, { i: 1, max: 0, min: 0, res: 0 }, { i: 2, max: 0, min: -1, res: 0 }],
  },
  {
    lineNum: 11, phase: 'fill',
    description: 'i=2: result = max(0, 0) = 0，结果不变',
    nums: [-2, 0, -1],
    currentI: 2, maxProd: 0, minProd: -1, result: 0, swapped: false,
    history: [{ i: 0, max: -2, min: -2, res: -2 }, { i: 1, max: 0, min: 0, res: 0 }, { i: 2, max: 0, min: -1, res: 0 }],
  },
  {
    lineNum: 12, phase: 'done',
    description: '遍历结束，返回 result = 0。含 0 的数组中，0 断开了负数的乘积链',
    nums: [-2, 0, -1],
    currentI: -1, maxProd: 0, minProd: -1, result: 0, swapped: false,
    history: [{ i: 0, max: -2, min: -2, res: -2 }, { i: 1, max: 0, min: 0, res: 0 }, { i: 2, max: 0, min: -1, res: 0 }],
  },
];

const phaseLabels = { init: '初始化', fill: '遍历', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">nums 数组</div>
      <div class="array-row" id="nums-array"></div>
    </div>
    <div class="card">
      <div class="section-title">状态追踪（max_prod / min_prod / result）</div>
      <table class="hashmap-table" id="track-table">
        <thead><tr><th>i</th><th>nums[i]</th><th>max_prod</th><th>min_prod</th><th>result</th></tr></thead>
        <tbody id="track-body"></tbody>
      </table>
    </div>
    <div class="card">
      <div class="section-title">当前状态</div>
      <div id="status-area" style="font-family:var(--font-mono);font-size:14px;display:flex;flex-direction:column;gap:6px"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '152. Maximum Product Subarray — 执行可视化',
  problemDesc: `
    <p>给你一个整数数组 <code>nums</code>，请你找出数组中乘积最大的非空连续子数组，并返回该子数组所对应的乘积。</p>
    <div class="example">输入：nums = [2,3,-2,4]
输出：6
解释：子数组 [2,3] 有最大乘积 6</div>
    <p>提示：数组中可能包含负数，负负得正需要同时维护最大值和最小值。</p>
  `,
  subtitle: `nums = [${NUMS}]`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '含负数的正结果', steps: steps1, subtitle: 'nums = [2, 3, -2, 4]' },
    { name: '含零断开乘积链', steps: steps2, subtitle: 'nums = [-2, 0, -1]', setup(panel) { NUMS = [-2, 0, -1]; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const nums = s.nums || NUMS;
    document.getElementById('nums-array').innerHTML = nums.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.currentI) cls += ' current';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    document.getElementById('track-body').innerHTML = s.history.map((h, idx) => {
      const isCurrent = idx === s.history.length - 1 && s.phase !== 'done';
      const cls = isCurrent ? ' class="hashmap-row"' : '';
      return `<tr${cls}><td>${h.i}</td><td>${nums[h.i]}</td><td>${h.max}</td><td>${h.min}</td><td>${h.res}</td></tr>`;
    }).join('');

    const statusEl = document.getElementById('status-area');
    if (s.swapped) {
      statusEl.innerHTML = `<div style="color:#facc15;font-weight:700">nums[${s.currentI}] < 0，交换 max_prod 和 min_prod</div>`;
    } else if (s.phase === 'fill') {
      statusEl.innerHTML = `
        <div>max_prod = <span style="color:#22d3ee;font-weight:700">${s.maxProd}</span></div>
        <div>min_prod = <span style="color:#f87171;font-weight:700">${s.minProd}</span></div>
        <div>result = <span style="color:#4ade80;font-weight:700">${s.result}</span></div>
      `;
    } else {
      statusEl.innerHTML = `
        <div>max_prod = ${s.maxProd !== null ? s.maxProd : '—'}</div>
        <div>min_prod = ${s.minProd !== null ? s.minProd : '—'}</div>
        <div>result = ${s.result !== null ? s.result : '—'}</div>
      `;
    }

    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">最大乘积 = ${s.result}</div>
          <div class="found-sub">nums = [${nums}]</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
