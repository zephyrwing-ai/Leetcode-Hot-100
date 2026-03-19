let N = 5;

const code = [
  'class Solution:',
  '    def climbStairs(self, n):',
  '        if n <= 2: return n',
  '        dp = [0] * (n + 1)',
  '        dp[1] = 1',
  '        dp[2] = 2',
  '        for i in range(3, n + 1):',
  '            dp[i] = dp[i-1] + dp[i-2]',
  '        return dp[n]',
];

const lineMap = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8 };

const steps1 = [
  {
    lineNum: 3, phase: 'init',
    description: '判断 n=5 > 2，不满足提前返回条件',
    n: 5, dp: null, currentI: -1, sources: [],
  },
  {
    lineNum: 4, phase: 'init',
    description: '初始化 dp 数组，长度为 n+1 = 6，全部为 0',
    n: 5, dp: [0, 0, 0, 0, 0, 0], currentI: -1, sources: [],
  },
  {
    lineNum: 5, phase: 'init',
    description: '设置 dp[1] = 1（1 级台阶只有 1 种走法）',
    n: 5, dp: [0, 1, 0, 0, 0, 0], currentI: 1, sources: [],
  },
  {
    lineNum: 6, phase: 'init',
    description: '设置 dp[2] = 2（2 级台阶有 2 种走法：1+1 或 2）',
    n: 5, dp: [0, 1, 2, 0, 0, 0], currentI: 2, sources: [],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=3: 进入循环，准备计算 dp[3]',
    n: 5, dp: [0, 1, 2, 0, 0, 0], currentI: 3, sources: [1, 2],
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=3: dp[3] = dp[2] + dp[1] = 2 + 1 = 3',
    n: 5, dp: [0, 1, 2, 3, 0, 0], currentI: 3, sources: [1, 2],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=4: 进入下一次循环，准备计算 dp[4]',
    n: 5, dp: [0, 1, 2, 3, 0, 0], currentI: 4, sources: [2, 3],
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=4: dp[4] = dp[3] + dp[2] = 3 + 2 = 5',
    n: 5, dp: [0, 1, 2, 3, 5, 0], currentI: 4, sources: [2, 3],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=5: 进入最后一次循环，准备计算 dp[5]',
    n: 5, dp: [0, 1, 2, 3, 5, 0], currentI: 5, sources: [3, 4],
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=5: dp[5] = dp[4] + dp[3] = 5 + 3 = 8',
    n: 5, dp: [0, 1, 2, 3, 5, 8], currentI: 5, sources: [3, 4],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=6: 不满足 i <= n=5，循环结束',
    n: 5, dp: [0, 1, 2, 3, 5, 8], currentI: -1, sources: [],
  },
  {
    lineNum: 9, phase: 'done',
    description: '返回 dp[5] = 8，共有 8 种方法爬到第 5 级台阶',
    n: 5, dp: [0, 1, 2, 3, 5, 8], currentI: -1, sources: [],
  },
];

const steps2 = [
  {
    lineNum: 3, phase: 'init',
    description: '判断 n=3 > 2，不满足提前返回条件',
    n: 3, dp: null, currentI: -1, sources: [],
  },
  {
    lineNum: 4, phase: 'init',
    description: '初始化 dp 数组，长度为 n+1 = 4，全部为 0',
    n: 3, dp: [0, 0, 0, 0], currentI: -1, sources: [],
  },
  {
    lineNum: 5, phase: 'init',
    description: '设置 dp[1] = 1（1 级台阶只有 1 种走法）',
    n: 3, dp: [0, 1, 0, 0], currentI: 1, sources: [],
  },
  {
    lineNum: 6, phase: 'init',
    description: '设置 dp[2] = 2（2 级台阶有 2 种走法：1+1 或 2）',
    n: 3, dp: [0, 1, 2, 0], currentI: 2, sources: [],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=3: 进入循环，准备计算 dp[3]',
    n: 3, dp: [0, 1, 2, 0], currentI: 3, sources: [1, 2],
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=3: dp[3] = dp[2] + dp[1] = 2 + 1 = 3',
    n: 3, dp: [0, 1, 2, 3], currentI: 3, sources: [1, 2],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=4: 不满足 i <= n=3，循环结束',
    n: 3, dp: [0, 1, 2, 3], currentI: -1, sources: [],
  },
  {
    lineNum: 9, phase: 'done',
    description: '返回 dp[3] = 3，共有 3 种方法爬到第 3 级台阶',
    n: 3, dp: [0, 1, 2, 3], currentI: -1, sources: [],
  },
];

const phaseLabels = { init: '初始化', fill: '填表', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">DP 数组（dp[i] = 爬到第 i 级台阶的方法数）</div>
      <div class="array-row" id="dp-array"></div>
      <div class="legend-row">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(34,211,238,0.4);border:1px solid #22d3ee"></div>当前填充</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>来源参考</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">递推公式</div>
      <div id="formula-area" style="font-family:var(--font-mono);font-size:14px"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '70. Climbing Stairs — 执行可视化',
  problemDesc: `
    <p>假设你正在爬楼梯。需要 <code>n</code> 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶？</p>
    <div class="example">输入：n = 3
输出：3
解释：有三种方法：1+1+1, 1+2, 2+1</div>
    <p>提示：<code>1 <= n <= 45</code></p>
  `,
  subtitle: `n = ${N}`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: 'n = 5，斐波那契递推', steps: steps1, subtitle: 'n = 5' },
    { name: 'n = 3，最小非平凡情况', steps: steps2, subtitle: 'n = 3', setup(panel) { N = 3; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const n = s.n || N;
    const dp = s.dp || [];
    document.getElementById('dp-array').innerHTML = dp.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.currentI) cls += ' current';
      if (s.sources.includes(idx)) cls += ' in-window';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    const formulaEl = document.getElementById('formula-area');
    if (s.currentI >= 3 && s.phase === 'fill') {
      formulaEl.innerHTML = `<div>dp[${s.currentI}] = dp[${s.currentI-1}] + dp[${s.currentI-2}] = ${dp[s.currentI-1]} + ${dp[s.currentI-2]} = <span style="color:#22d3ee;font-weight:700">${dp[s.currentI]}</span></div>`;
    } else {
      formulaEl.innerHTML = `<div style="color:var(--text-muted)">dp[i] = dp[i-1] + dp[i-2]</div>`;
    }

    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">dp[${n}] = ${dp[n]}</div>
          <div class="found-sub">共有 ${dp[n]} 种方法爬到第 ${n} 级台阶</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
