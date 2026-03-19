let NUMS = [10, 9, 2, 5, 3, 7, 101, 18];

const code = [
  'class Solution:',
  '    def lengthOfLIS(self, nums):',
  '        n = len(nums)',
  '        dp = [1] * n',
  '        for i in range(1, n):',
  '            for j in range(i):',
  '                if nums[j] < nums[i]:',
  '                    dp[i] = max(dp[i], dp[j] + 1)',
  '        return max(dp)',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8 };

const steps1 = [
  {
    lineNum: 4, phase: 'init',
    description: '初始化 dp 数组，全部为 1（每个元素自身构成长度 1 的子序列）',
    nums: [10, 9, 2, 5, 3, 7, 101, 18], dp: [1, 1, 1, 1, 1, 1, 1, 1], currentI: -1, sources: [], bestJ: -1,
  },
  {
    lineNum: 5, phase: 'fill',
    description: 'i=1: 开始内层循环，比较 nums[0]=10 和 nums[1]=9',
    nums: [10, 9, 2, 5, 3, 7, 101, 18], dp: [1, 1, 1, 1, 1, 1, 1, 1], currentI: 1, sources: [0], bestJ: -1,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=1: nums[0]=10 >= nums[1]=9，不满足条件，dp[1] 仍为 1',
    nums: [10, 9, 2, 5, 3, 7, 101, 18], dp: [1, 1, 1, 1, 1, 1, 1, 1], currentI: 1, sources: [], bestJ: -1,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=2: nums[2]=2，没有更小的前驱，dp[2]=1',
    nums: [10, 9, 2, 5, 3, 7, 101, 18], dp: [1, 1, 1, 1, 1, 1, 1, 1], currentI: 2, sources: [], bestJ: -1,
  },
  {
    lineNum: 5, phase: 'fill',
    description: 'i=3: nums[3]=5，检查 j=0(10>=5), j=1(9>=5), j=2(2<5)',
    nums: [10, 9, 2, 5, 3, 7, 101, 18], dp: [1, 1, 1, 1, 1, 1, 1, 1], currentI: 3, sources: [2], bestJ: -1,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=3: nums[2]=2<5，dp[3]=max(1, dp[2]+1)=2',
    nums: [10, 9, 2, 5, 3, 7, 101, 18], dp: [1, 1, 1, 2, 1, 1, 1, 1], currentI: 3, sources: [2], bestJ: 2,
  },
  {
    lineNum: 5, phase: 'fill',
    description: 'i=4: nums[4]=3，检查 j=2(2<3)',
    nums: [10, 9, 2, 5, 3, 7, 101, 18], dp: [1, 1, 1, 2, 1, 1, 1, 1], currentI: 4, sources: [2], bestJ: -1,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=4: nums[2]=2<3，dp[4]=max(1, dp[2]+1)=2',
    nums: [10, 9, 2, 5, 3, 7, 101, 18], dp: [1, 1, 1, 2, 2, 1, 1, 1], currentI: 4, sources: [2], bestJ: 2,
  },
  {
    lineNum: 5, phase: 'fill',
    description: 'i=5: nums[5]=7，检查 j=2(2<7), j=3(5<7), j=4(3<7)',
    nums: [10, 9, 2, 5, 3, 7, 101, 18], dp: [1, 1, 1, 2, 2, 1, 1, 1], currentI: 5, sources: [2, 3, 4], bestJ: -1,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=5: 最优前驱 j=3(dp[3]+1=3) 或 j=4(dp[4]+1=3)，dp[5]=3',
    nums: [10, 9, 2, 5, 3, 7, 101, 18], dp: [1, 1, 1, 2, 2, 3, 1, 1], currentI: 5, sources: [2, 3, 4], bestJ: 3,
  },
  {
    lineNum: 5, phase: 'fill',
    description: 'i=6: nums[6]=101，所有前驱都小于 101',
    nums: [10, 9, 2, 5, 3, 7, 101, 18], dp: [1, 1, 1, 2, 2, 3, 1, 1], currentI: 6, sources: [0, 1, 2, 3, 4, 5], bestJ: -1,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=6: 最优前驱 j=5(dp[5]+1=4)，dp[6]=4',
    nums: [10, 9, 2, 5, 3, 7, 101, 18], dp: [1, 1, 1, 2, 2, 3, 4, 1], currentI: 6, sources: [0, 1, 2, 3, 4, 5], bestJ: 5,
  },
  {
    lineNum: 5, phase: 'fill',
    description: 'i=7: nums[7]=18，检查哪些 nums[j]<18',
    nums: [10, 9, 2, 5, 3, 7, 101, 18], dp: [1, 1, 1, 2, 2, 3, 4, 1], currentI: 7, sources: [0, 1, 2, 3, 4, 5], bestJ: -1,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=7: 最优前驱 j=5(dp[5]+1=4)，dp[7]=4',
    nums: [10, 9, 2, 5, 3, 7, 101, 18], dp: [1, 1, 1, 2, 2, 3, 4, 4], currentI: 7, sources: [2, 3, 4, 5], bestJ: 5,
  },
  {
    lineNum: 9, phase: 'done',
    description: '返回 max(dp) = 4，最长递增子序列长度为 4（如 [2,5,7,101]）',
    nums: [10, 9, 2, 5, 3, 7, 101, 18], dp: [1, 1, 1, 2, 2, 3, 4, 4], currentI: -1, sources: [], bestJ: -1,
  },
];

const steps2 = [
  {
    lineNum: 4, phase: 'init',
    description: '初始化 dp 数组，全部为 1',
    nums: [0, 1, 0, 3, 2, 3], dp: [1, 1, 1, 1, 1, 1], currentI: -1, sources: [], bestJ: -1,
  },
  {
    lineNum: 5, phase: 'fill',
    description: 'i=1: nums[0]=0 < nums[1]=1，满足条件',
    nums: [0, 1, 0, 3, 2, 3], dp: [1, 1, 1, 1, 1, 1], currentI: 1, sources: [0], bestJ: -1,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=1: dp[1] = max(1, dp[0]+1) = 2',
    nums: [0, 1, 0, 3, 2, 3], dp: [1, 2, 1, 1, 1, 1], currentI: 1, sources: [0], bestJ: 0,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=2: nums[2]=0，没有更小的前驱（0 不 < 0, 1 不 < 0），dp[2]=1',
    nums: [0, 1, 0, 3, 2, 3], dp: [1, 2, 1, 1, 1, 1], currentI: 2, sources: [], bestJ: -1,
  },
  {
    lineNum: 5, phase: 'fill',
    description: 'i=3: nums[3]=3，检查 j=0(0<3), j=1(1<3), j=2(0<3)',
    nums: [0, 1, 0, 3, 2, 3], dp: [1, 2, 1, 1, 1, 1], currentI: 3, sources: [0, 1, 2], bestJ: -1,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=3: 最优 j=1(dp[1]+1=3)，dp[3]=3',
    nums: [0, 1, 0, 3, 2, 3], dp: [1, 2, 1, 3, 1, 1], currentI: 3, sources: [0, 1, 2], bestJ: 1,
  },
  {
    lineNum: 5, phase: 'fill',
    description: 'i=4: nums[4]=2，检查 j=0(0<2), j=1(1<2), j=2(0<2)',
    nums: [0, 1, 0, 3, 2, 3], dp: [1, 2, 1, 3, 1, 1], currentI: 4, sources: [0, 1, 2], bestJ: -1,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=4: 最优 j=1(dp[1]+1=3)，dp[4]=3',
    nums: [0, 1, 0, 3, 2, 3], dp: [1, 2, 1, 3, 3, 1], currentI: 4, sources: [0, 1, 2], bestJ: 1,
  },
  {
    lineNum: 5, phase: 'fill',
    description: 'i=5: nums[5]=3，检查 j=0(0<3), j=1(1<3), j=2(0<3), j=4(2<3)',
    nums: [0, 1, 0, 3, 2, 3], dp: [1, 2, 1, 3, 3, 1], currentI: 5, sources: [0, 1, 2, 4], bestJ: -1,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=5: 最优 j=4(dp[4]+1=4)，dp[5]=4',
    nums: [0, 1, 0, 3, 2, 3], dp: [1, 2, 1, 3, 3, 4], currentI: 5, sources: [0, 1, 2, 4], bestJ: 4,
  },
  {
    lineNum: 9, phase: 'done',
    description: '返回 max(dp) = 4，最长递增子序列如 [0,1,2,3]',
    nums: [0, 1, 0, 3, 2, 3], dp: [1, 2, 1, 3, 3, 4], currentI: -1, sources: [], bestJ: -1,
  },
];

const phaseLabels = { init: '初始化', fill: '填表', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">nums 数组</div>
      <div class="array-row" id="nums-array"></div>
    </div>
    <div class="card">
      <div class="section-title">DP 数组（dp[i] = 以 nums[i] 结尾的最长递增子序列长度）</div>
      <div class="array-row" id="dp-array"></div>
      <div class="legend-row">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(34,211,238,0.4);border:1px solid #22d3ee"></div>当前填充</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>可用前驱</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">前驱信息</div>
      <div id="info-area" style="font-family:var(--font-mono);font-size:14px"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '300. Longest Increasing Subsequence — 执行可视化',
  problemDesc: `
    <p>给你一个整数数组 <code>nums</code>，找到其中最长严格递增子序列的长度。子序列是由数组派生而来的序列，可以删除某些元素但不改变其余元素的顺序。</p>
    <div class="example">输入：nums = [10,9,2,5,3,7,101,18]
输出：4
解释：最长递增子序列是 [2,3,7,101]，长度为 4</div>
  `,
  subtitle: `nums = [${NUMS}]`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: 'nums=[10,9,2,5,3,7,101,18]', steps: steps1, subtitle: 'nums = [10,9,2,5,3,7,101,18]' },
    { name: 'nums=[0,1,0,3,2,3]', steps: steps2, subtitle: 'nums = [0,1,0,3,2,3]', setup(panel) { NUMS = [0, 1, 0, 3, 2, 3]; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const nums = s.nums || NUMS;
    const dp = s.dp || [];
    document.getElementById('nums-array').innerHTML = nums.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.currentI) cls += ' is-active';
      if (s.sources.includes(idx)) cls += ' in-window';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    document.getElementById('dp-array').innerHTML = dp.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.currentI) cls += ' current';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    const infoEl = document.getElementById('info-area');
    if (s.bestJ >= 0 && s.phase === 'fill') {
      infoEl.innerHTML = `<div>最优前驱: nums[${s.bestJ}]=${nums[s.bestJ]}，dp[${s.currentI}] = dp[${s.bestJ}] + 1 = <span style="color:#22d3ee;font-weight:700">${dp[s.currentI]}</span></div>`;
    } else if (s.phase === 'fill') {
      infoEl.innerHTML = `<div style="color:var(--text-muted)">没有合适的前驱，dp[${s.currentI}] = 1</div>`;
    } else {
      infoEl.innerHTML = `<div style="color:var(--text-muted)">dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i]</div>`;
    }

    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      const maxVal = Math.max(...dp);
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">最长递增子序列长度 = ${maxVal}</div>
          <div class="found-sub">max(dp) = ${maxVal}</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
