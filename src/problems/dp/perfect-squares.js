let N = 12;

const code = [
  'class Solution:',
  '    def numSquares(self, n):',
  '        dp = [float("inf")] * (n + 1)',
  '        dp[0] = 0',
  '        for i in range(1, n + 1):',
  '            j = 1',
  '            while j * j <= i:',
  '                dp[i] = min(dp[i], dp[i - j*j] + 1)',
  '                j += 1',
  '        return dp[n]',
];

const lineMap = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9 };

const INF = Infinity;
const steps1 = [
  { lineNum: 3, phase: 'init', description: '初始化 dp 数组，长度 13，dp[0]=0，其余为 Infinity', n: 12, dp: [0, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF], currentI: -1, sources: [], bestJ: null },
  { lineNum: 4, phase: 'init', description: 'dp[0] = 0，0 不需要任何完全平方数', n: 12, dp: [0, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF], currentI: 0, sources: [], bestJ: null },
  { lineNum: 8, phase: 'fill', description: 'i=1: 尝试 j=1, dp[1]=min(Inf, dp[0]+1)=1', n: 12, dp: [0, 1, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF], currentI: 1, sources: [0], bestJ: 1 },
  { lineNum: 8, phase: 'fill', description: 'i=2: 尝试 j=1, dp[2]=min(Inf, dp[1]+1)=2', n: 12, dp: [0, 1, 2, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF], currentI: 2, sources: [1], bestJ: 1 },
  { lineNum: 8, phase: 'fill', description: 'i=3: 尝试 j=1, dp[3]=min(Inf, dp[2]+1)=3', n: 12, dp: [0, 1, 2, 3, INF, INF, INF, INF, INF, INF, INF, INF, INF], currentI: 3, sources: [2], bestJ: 1 },
  { lineNum: 8, phase: 'fill', description: 'i=4: j=1→dp[3]+1=4, j=2→dp[0]+1=1, 选 j=2, dp[4]=1', n: 12, dp: [0, 1, 2, 3, 1, INF, INF, INF, INF, INF, INF, INF, INF], currentI: 4, sources: [0], bestJ: 2 },
  { lineNum: 8, phase: 'fill', description: 'i=5: j=1→2, j=2→2, dp[5]=2', n: 12, dp: [0, 1, 2, 3, 1, 2, INF, INF, INF, INF, INF, INF, INF], currentI: 5, sources: [4, 1], bestJ: 1 },
  { lineNum: 8, phase: 'fill', description: 'i=6: j=1→3, j=2→3, dp[6]=3', n: 12, dp: [0, 1, 2, 3, 1, 2, 3, INF, INF, INF, INF, INF, INF], currentI: 6, sources: [5, 2], bestJ: 1 },
  { lineNum: 8, phase: 'fill', description: 'i=7: j=1→4, j=2→4, dp[7]=4', n: 12, dp: [0, 1, 2, 3, 1, 2, 3, 4, INF, INF, INF, INF, INF], currentI: 7, sources: [6, 3], bestJ: 1 },
  { lineNum: 8, phase: 'fill', description: 'i=8: j=1→5, j=2→dp[4]+1=2, 选 j=2, dp[8]=2', n: 12, dp: [0, 1, 2, 3, 1, 2, 3, 4, 2, INF, INF, INF, INF], currentI: 8, sources: [4], bestJ: 2 },
  { lineNum: 8, phase: 'fill', description: 'i=9: j=1→3, j=2→3, j=3→dp[0]+1=1, 选 j=3, dp[9]=1', n: 12, dp: [0, 1, 2, 3, 1, 2, 3, 4, 2, 1, INF, INF, INF], currentI: 9, sources: [0], bestJ: 3 },
  { lineNum: 8, phase: 'fill', description: 'i=10: j=1→2, j=2→3, j=3→2, dp[10]=2', n: 12, dp: [0, 1, 2, 3, 1, 2, 3, 4, 2, 1, 2, INF, INF], currentI: 10, sources: [9, 1], bestJ: 1 },
  { lineNum: 8, phase: 'fill', description: 'i=11: j=1→3, j=2→3, j=3→3, dp[11]=3', n: 12, dp: [0, 1, 2, 3, 1, 2, 3, 4, 2, 1, 2, 3, INF], currentI: 11, sources: [10, 2], bestJ: 1 },
  { lineNum: 8, phase: 'fill', description: 'i=12: j=1→4, j=2→dp[8]+1=3, j=3→4, 选 j=2, dp[12]=3', n: 12, dp: [0, 1, 2, 3, 1, 2, 3, 4, 2, 1, 2, 3, 3], currentI: 12, sources: [8], bestJ: 2 },
  { lineNum: 10, phase: 'done', description: '返回 dp[12] = 3，12 = 4 + 4 + 4', n: 12, dp: [0, 1, 2, 3, 1, 2, 3, 4, 2, 1, 2, 3, 3], currentI: -1, sources: [], bestJ: null },
];

// Test case 2: n=13
// dp[13]: j=1→dp[12]+1=4, j=2→dp[9]+1=2, j=3→dp[4]+1=2 → dp[13]=2 (4+9)
const steps2 = [
  { lineNum: 3, phase: 'init', description: '初始化 dp 数组，长度 14，dp[0]=0，其余为 Inf', n: 13, dp: [0, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF], currentI: -1, sources: [], bestJ: null },
  { lineNum: 4, phase: 'init', description: 'dp[0] = 0', n: 13, dp: [0, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF], currentI: 0, sources: [], bestJ: null },
  { lineNum: 8, phase: 'fill', description: 'i=1: dp[1]=1 (1=1²)', n: 13, dp: [0, 1, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF], currentI: 1, sources: [0], bestJ: 1 },
  { lineNum: 8, phase: 'fill', description: 'i=2: dp[2]=2 (1+1)', n: 13, dp: [0, 1, 2, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF], currentI: 2, sources: [1], bestJ: 1 },
  { lineNum: 8, phase: 'fill', description: 'i=3: dp[3]=3 (1+1+1)', n: 13, dp: [0, 1, 2, 3, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF], currentI: 3, sources: [2], bestJ: 1 },
  { lineNum: 8, phase: 'fill', description: 'i=4: j=2→dp[0]+1=1, dp[4]=1 (4=2²)', n: 13, dp: [0, 1, 2, 3, 1, INF, INF, INF, INF, INF, INF, INF, INF, INF], currentI: 4, sources: [0], bestJ: 2 },
  { lineNum: 8, phase: 'fill', description: 'i=5~8: dp[5]=2, dp[6]=3, dp[7]=4, dp[8]=2', n: 13, dp: [0, 1, 2, 3, 1, 2, 3, 4, 2, INF, INF, INF, INF, INF], currentI: 8, sources: [4], bestJ: 2 },
  { lineNum: 8, phase: 'fill', description: 'i=9: j=3→dp[0]+1=1, dp[9]=1 (9=3²)', n: 13, dp: [0, 1, 2, 3, 1, 2, 3, 4, 2, 1, INF, INF, INF, INF], currentI: 9, sources: [0], bestJ: 3 },
  { lineNum: 8, phase: 'fill', description: 'i=10: dp[10]=2 (1+9)', n: 13, dp: [0, 1, 2, 3, 1, 2, 3, 4, 2, 1, 2, INF, INF, INF], currentI: 10, sources: [9], bestJ: 1 },
  { lineNum: 8, phase: 'fill', description: 'i=11: dp[11]=3 (1+1+9)', n: 13, dp: [0, 1, 2, 3, 1, 2, 3, 4, 2, 1, 2, 3, INF, INF], currentI: 11, sources: [10], bestJ: 1 },
  { lineNum: 8, phase: 'fill', description: 'i=12: j=2→dp[8]+1=3, dp[12]=3 (4+4+4)', n: 13, dp: [0, 1, 2, 3, 1, 2, 3, 4, 2, 1, 2, 3, 3, INF], currentI: 12, sources: [8], bestJ: 2 },
  { lineNum: 8, phase: 'fill', description: 'i=13: j=2→dp[9]+1=2, j=3→dp[4]+1=2, dp[13]=2 (4+9)', n: 13, dp: [0, 1, 2, 3, 1, 2, 3, 4, 2, 1, 2, 3, 3, 2], currentI: 13, sources: [9, 4], bestJ: 2 },
  { lineNum: 10, phase: 'done', description: '返回 dp[13] = 2，13 = 4 + 9（两个完全平方数）', n: 13, dp: [0, 1, 2, 3, 1, 2, 3, 4, 2, 1, 2, 3, 3, 2], currentI: -1, sources: [], bestJ: null },
];

const phaseLabels = { init: '初始化', fill: '填表', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">DP 数组（dp[i] = 组成 i 的最少完全平方数个数）</div>
      <div class="array-row" id="dp-array" style="flex-wrap:wrap"></div>
      <div class="legend-row">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(34,211,238,0.4);border:1px solid #22d3ee"></div>当前填充</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>来源参考</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">完全平方数提示</div>
      <div id="info-area" style="font-family:var(--font-mono);font-size:14px"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '279. Perfect Squares — 执行可视化',
  problemDesc: `
    <p>给你一个整数 <code>n</code>，返回和为 <code>n</code> 的完全平方数的最少数量。完全平方数是指形如 <code>1, 4, 9, 16, ...</code> 的整数。</p>
    <div class="example">输入：n = 12
输出：3
解释：12 = 4 + 4 + 4</div>
    <p>提示：<code>1 <= n <= 10000</code></p>
  `,
  subtitle: `n = ${N}`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: 'n = 12 (3个)', steps: steps1, subtitle: 'n = 12' },
    { name: 'n = 13 (2个)', steps: steps2, subtitle: 'n = 13', setup(panel) { N = 13; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const n = s.n || N;
    document.getElementById('dp-array').innerHTML = s.dp.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.currentI) cls += ' current';
      if (s.sources.includes(idx)) cls += ' in-window';
      const display = v === Infinity ? '\u221e' : v;
      return `<div class="${cls}"><div class="arr-val">${display}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    const infoEl = document.getElementById('info-area');
    if (s.bestJ !== null && s.phase === 'fill') {
      infoEl.innerHTML = `<div>最优选择: 减去 ${s.bestJ}\u00b2 = ${s.bestJ * s.bestJ}，dp[${s.currentI}] = dp[${s.currentI - s.bestJ * s.bestJ}] + 1 = <span style="color:#22d3ee;font-weight:700">${s.dp[s.currentI]}</span></div>`;
    } else {
      infoEl.innerHTML = `<div style="color:var(--text-muted)">dp[i] = min(dp[i - j*j] + 1) for all valid j</div>`;
    }

    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">dp[${n}] = ${s.dp[n]}</div>
          <div class="found-sub">${n} 最少需要 ${s.dp[n]} 个完全平方数</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
