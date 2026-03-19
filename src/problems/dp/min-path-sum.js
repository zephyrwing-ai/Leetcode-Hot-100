let GRID = [[1,3,1],[1,5,1],[4,2,1]];

const code = [
  'class Solution:',
  '    def minPathSum(self, grid):',
  '        m, n = len(grid), len(grid[0])',
  '        dp = [[0] * n for _ in range(m)]',
  '        dp[0][0] = grid[0][0]',
  '        for i in range(1, m):',
  '            dp[i][0] = dp[i-1][0] + grid[i][0]',
  '        for j in range(1, n):',
  '            dp[0][j] = dp[0][j-1] + grid[0][j]',
  '        for i in range(1, m):',
  '            for j in range(1, n):',
  '                dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])',
  '        return dp[m-1][n-1]',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12 };

const steps1 = [
  { lineNum: 2, phase: 'init', description: '读取网格 grid，初始化 m=3, n=3', grid: [[1,3,1],[1,5,1],[4,2,1]], row: -1, col: -1, dp: [[0,0,0],[0,0,0],[0,0,0]], sources: [], path: [] },
  { lineNum: 3, phase: 'init', description: '创建 dp 表，大小 3x3，全部初始化为 0', grid: [[1,3,1],[1,5,1],[4,2,1]], row: -1, col: -1, dp: [[0,0,0],[0,0,0],[0,0,0]], sources: [], path: [] },
  { lineNum: 4, phase: 'base', description: 'dp[0][0] = grid[0][0] = 1，起点', grid: [[1,3,1],[1,5,1],[4,2,1]], row: 0, col: 0, dp: [[1,0,0],[0,0,0],[0,0,0]], sources: [], path: [] },
  { lineNum: 6, phase: 'base', description: 'dp[1][0] = dp[0][0] + grid[1][0] = 1 + 1 = 2', grid: [[1,3,1],[1,5,1],[4,2,1]], row: 1, col: 0, dp: [[1,0,0],[2,0,0],[0,0,0]], sources: [[0,0]], path: [] },
  { lineNum: 6, phase: 'base', description: 'dp[2][0] = dp[1][0] + grid[2][0] = 2 + 4 = 6', grid: [[1,3,1],[1,5,1],[4,2,1]], row: 2, col: 0, dp: [[1,0,0],[2,0,0],[6,0,0]], sources: [[1,0]], path: [] },
  { lineNum: 8, phase: 'base', description: 'dp[0][1] = dp[0][0] + grid[0][1] = 1 + 3 = 4', grid: [[1,3,1],[1,5,1],[4,2,1]], row: 0, col: 1, dp: [[1,4,0],[2,0,0],[6,0,0]], sources: [[0,0]], path: [] },
  { lineNum: 8, phase: 'base', description: 'dp[0][2] = dp[0][1] + grid[0][2] = 4 + 1 = 5', grid: [[1,3,1],[1,5,1],[4,2,1]], row: 0, col: 2, dp: [[1,4,5],[2,0,0],[6,0,0]], sources: [[0,1]], path: [] },
  { lineNum: 9, phase: 'fill', description: '开始填充内部，i=1, j=1', grid: [[1,3,1],[1,5,1],[4,2,1]], row: 1, col: 1, dp: [[1,4,5],[2,0,0],[6,0,0]], sources: [[0,1],[1,0]], path: [] },
  { lineNum: 11, phase: 'fill', description: 'dp[1][1] = grid[1][1] + min(dp[0][1], dp[1][0]) = 5 + min(4,2) = 7', grid: [[1,3,1],[1,5,1],[4,2,1]], row: 1, col: 1, dp: [[1,4,5],[2,7,0],[6,0,0]], sources: [[0,1],[1,0]], path: [] },
  { lineNum: 11, phase: 'fill', description: 'dp[1][2] = grid[1][2] + min(dp[0][2], dp[1][1]) = 1 + min(5,7) = 6', grid: [[1,3,1],[1,5,1],[4,2,1]], row: 1, col: 2, dp: [[1,4,5],[2,7,6],[6,0,0]], sources: [[0,2],[1,1]], path: [] },
  { lineNum: 11, phase: 'fill', description: 'dp[2][1] = grid[2][1] + min(dp[1][1], dp[2][0]) = 2 + min(7,6) = 8', grid: [[1,3,1],[1,5,1],[4,2,1]], row: 2, col: 1, dp: [[1,4,5],[2,7,6],[6,8,0]], sources: [[1,1],[2,0]], path: [] },
  { lineNum: 11, phase: 'fill', description: 'dp[2][2] = grid[2][2] + min(dp[1][2], dp[2][1]) = 1 + min(6,8) = 7', grid: [[1,3,1],[1,5,1],[4,2,1]], row: 2, col: 2, dp: [[1,4,5],[2,7,6],[6,8,7]], sources: [[1,2],[2,1]], path: [] },
  { lineNum: 12, phase: 'done', description: '返回 dp[2][2] = 7，最小路径和为 7', grid: [[1,3,1],[1,5,1],[4,2,1]], row: 2, col: 2, dp: [[1,4,5],[2,7,6],[6,8,7]], sources: [], path: [[0,0],[1,0],[1,1],[1,2],[2,2]] },
];

// Test case 2: grid = [[1,2],[3,4]]
// dp[0][0]=1, dp[1][0]=1+3=4, dp[0][1]=1+2=3
// dp[1][1]=4+min(3,4)=4+3=7
// Answer: 7, path: 1->2->4
const steps2 = [
  { lineNum: 2, phase: 'init', description: '读取网格 grid = [[1,2],[3,4]]，m=2, n=2', grid: [[1,2],[3,4]], row: -1, col: -1, dp: [[0,0],[0,0]], sources: [], path: [] },
  { lineNum: 3, phase: 'init', description: '创建 dp 表，大小 2x2，全部初始化为 0', grid: [[1,2],[3,4]], row: -1, col: -1, dp: [[0,0],[0,0]], sources: [], path: [] },
  { lineNum: 4, phase: 'base', description: 'dp[0][0] = grid[0][0] = 1，起点', grid: [[1,2],[3,4]], row: 0, col: 0, dp: [[1,0],[0,0]], sources: [], path: [] },
  { lineNum: 6, phase: 'base', description: 'dp[1][0] = dp[0][0] + grid[1][0] = 1 + 3 = 4', grid: [[1,2],[3,4]], row: 1, col: 0, dp: [[1,0],[4,0]], sources: [[0,0]], path: [] },
  { lineNum: 8, phase: 'base', description: 'dp[0][1] = dp[0][0] + grid[0][1] = 1 + 2 = 3', grid: [[1,2],[3,4]], row: 0, col: 1, dp: [[1,3],[4,0]], sources: [[0,0]], path: [] },
  { lineNum: 9, phase: 'fill', description: '开始填充内部，i=1, j=1', grid: [[1,2],[3,4]], row: 1, col: 1, dp: [[1,3],[4,0]], sources: [[0,1],[1,0]], path: [] },
  { lineNum: 11, phase: 'fill', description: 'dp[1][1] = grid[1][1] + min(dp[0][1], dp[1][0]) = 4 + min(3,4) = 7', grid: [[1,2],[3,4]], row: 1, col: 1, dp: [[1,3],[4,7]], sources: [[0,1],[1,0]], path: [] },
  { lineNum: 12, phase: 'done', description: '返回 dp[1][1] = 7，最小路径和为 7，路径: 1→2→4', grid: [[1,2],[3,4]], row: 1, col: 1, dp: [[1,3],[4,7]], sources: [], path: [[0,0],[0,1],[1,1]] },
];

const phaseLabels = { init: '初始化', base: '基础情况', fill: '填表', done: '完成' };

function setupPanel(panel) {
  const grid = GRID;
  const rows = grid.map((row, i) =>
    `<tr>${row.map((val, j) =>
      `<td id="dp-${i}-${j}" class="hashmap-row">
        <div style="font-size:10px;color:var(--text-muted)">g=${val}</div>
        <div id="dpv-${i}-${j}" style="font-weight:700">0</div>
      </td>`).join('')}</tr>`
  ).join('');
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">网格 DP（g=原始值，粗体=累计最小和，绿色=当前，黄色=来源，蓝色=最优路径）</div>
      <table class="hashmap-table" id="dp-table">
        <tbody>${rows}</tbody>
      </table>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>当前</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(250,204,21,0.4);border:1px solid #facc15"></div>来源</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>最优路径</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '64. Minimum Path Sum — 执行可视化',
  problemDesc: `
    <p>给定一个包含非负整数的 <code>m x n</code> 网格 <code>grid</code>，请找出一条从左上角到右下角的路径，使得路径上的数字总和最小。每次只能向下或向右移动一步。</p>
    <div class="example">输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
输出：7
解释：路径 1→3→1→1→1 的总和最小，为 7</div>
  `,
  subtitle: 'grid = [[1,3,1],[1,5,1],[4,2,1]]',
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '3x3 网格', steps: steps1, subtitle: 'grid = [[1,3,1],[1,5,1],[4,2,1]]' },
    { name: '2x2 网格', steps: steps2, subtitle: 'grid = [[1,2],[3,4]]', setup(panel) { GRID = [[1,2],[3,4]]; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const grid = s.grid || GRID;
    const m = grid.length, n = grid[0].length;
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        const el = document.getElementById(`dp-${i}-${j}`);
        const valEl = document.getElementById(`dpv-${i}-${j}`);
        if (!el || !valEl) continue;
        valEl.textContent = s.dp[i][j];
        el.className = 'hashmap-row';
        if (i === s.row && j === s.col) el.classList.add('current');
        if (s.sources.some(([r, c]) => r === i && c === j)) el.classList.add('in-window');
        if (s.path.some(([r, c]) => r === i && c === j)) el.classList.add('is-active');
      }
    }
    const resultEl = document.getElementById('result-area');
    if (s.phase === 'done') {
      const finalVal = s.dp[m-1][n-1];
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">最小路径和 = ${finalVal}</div>
          <div class="found-sub">grid = [${grid.map(r => '['+r+']').join(',')}]</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
