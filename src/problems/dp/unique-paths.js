let M = 3, NN = 7;

const code = [
  'class Solution:',
  '    def uniquePaths(self, m, n):',
  '        dp = [[1] * n for _ in range(m)]',
  '        for i in range(1, m):',
  '            for j in range(1, n):',
  '                dp[i][j] = dp[i-1][j] + dp[i][j-1]',
  '        return dp[m-1][n-1]',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 };

const steps1 = [
  { lineNum: 2, phase: 'init', description: '初始化 m=3, n=7 的网格', m: 3, n: 7, row: -1, col: -1, dp: [[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1]], sources: [] },
  { lineNum: 3, phase: 'base', description: '第一行和第一列全为 1（只有一种走法）', m: 3, n: 7, row: -1, col: -1, dp: [[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1]], sources: [] },
  { lineNum: 5, phase: 'fill', description: 'dp[1][1] = dp[0][1] + dp[1][0] = 1 + 1 = 2', m: 3, n: 7, row: 1, col: 1, dp: [[1,1,1,1,1,1,1],[1,2,1,1,1,1,1],[1,1,1,1,1,1,1]], sources: [[0,1],[1,0]] },
  { lineNum: 5, phase: 'fill', description: 'dp[1][2] = dp[0][2] + dp[1][1] = 1 + 2 = 3', m: 3, n: 7, row: 1, col: 2, dp: [[1,1,1,1,1,1,1],[1,2,3,1,1,1,1],[1,1,1,1,1,1,1]], sources: [[0,2],[1,1]] },
  { lineNum: 5, phase: 'fill', description: 'dp[1][3] = 1 + 3 = 4', m: 3, n: 7, row: 1, col: 3, dp: [[1,1,1,1,1,1,1],[1,2,3,4,1,1,1],[1,1,1,1,1,1,1]], sources: [[0,3],[1,2]] },
  { lineNum: 5, phase: 'fill', description: 'dp[1][4] = 1 + 4 = 5', m: 3, n: 7, row: 1, col: 4, dp: [[1,1,1,1,1,1,1],[1,2,3,4,5,1,1],[1,1,1,1,1,1,1]], sources: [[0,4],[1,3]] },
  { lineNum: 5, phase: 'fill', description: 'dp[1][5] = 1 + 5 = 6', m: 3, n: 7, row: 1, col: 5, dp: [[1,1,1,1,1,1,1],[1,2,3,4,5,6,1],[1,1,1,1,1,1,1]], sources: [[0,5],[1,4]] },
  { lineNum: 5, phase: 'fill', description: 'dp[1][6] = 1 + 6 = 7', m: 3, n: 7, row: 1, col: 6, dp: [[1,1,1,1,1,1,1],[1,2,3,4,5,6,7],[1,1,1,1,1,1,1]], sources: [[0,6],[1,5]] },
  { lineNum: 5, phase: 'fill', description: 'dp[2][1] = dp[1][1] + dp[2][0] = 2 + 1 = 3', m: 3, n: 7, row: 2, col: 1, dp: [[1,1,1,1,1,1,1],[1,2,3,4,5,6,7],[1,3,1,1,1,1,1]], sources: [[1,1],[2,0]] },
  { lineNum: 5, phase: 'fill', description: 'dp[2][2] = 3 + 3 = 6', m: 3, n: 7, row: 2, col: 2, dp: [[1,1,1,1,1,1,1],[1,2,3,4,5,6,7],[1,3,6,1,1,1,1]], sources: [[1,2],[2,1]] },
  { lineNum: 5, phase: 'fill', description: 'dp[2][3] = 4 + 6 = 10', m: 3, n: 7, row: 2, col: 3, dp: [[1,1,1,1,1,1,1],[1,2,3,4,5,6,7],[1,3,6,10,1,1,1]], sources: [[1,3],[2,2]] },
  { lineNum: 5, phase: 'fill', description: 'dp[2][4] = 5 + 10 = 15', m: 3, n: 7, row: 2, col: 4, dp: [[1,1,1,1,1,1,1],[1,2,3,4,5,6,7],[1,3,6,10,15,1,1]], sources: [[1,4],[2,3]] },
  { lineNum: 5, phase: 'fill', description: 'dp[2][5] = 6 + 15 = 21', m: 3, n: 7, row: 2, col: 5, dp: [[1,1,1,1,1,1,1],[1,2,3,4,5,6,7],[1,3,6,10,15,21,1]], sources: [[1,5],[2,4]] },
  { lineNum: 5, phase: 'fill', description: 'dp[2][6] = 7 + 21 = 28', m: 3, n: 7, row: 2, col: 6, dp: [[1,1,1,1,1,1,1],[1,2,3,4,5,6,7],[1,3,6,10,15,21,28]], sources: [[1,6],[2,5]] },
  { lineNum: 6, phase: 'done', description: '返回 dp[2][6] = 28，共有 28 条不同路径', m: 3, n: 7, row: 2, col: 6, dp: [[1,1,1,1,1,1,1],[1,2,3,4,5,6,7],[1,3,6,10,15,21,28]], sources: [] },
];

// Test case 2: m=3, n=2
// dp = [[1,1],[1,1],[1,1]]
// dp[1][1] = 1+1=2, dp[2][1] = 2+1=3 → answer 3
const steps2 = [
  { lineNum: 2, phase: 'init', description: '初始化 m=3, n=2 的网格', m: 3, n: 2, row: -1, col: -1, dp: [[1,1],[1,1],[1,1]], sources: [] },
  { lineNum: 3, phase: 'base', description: '第一行和第一列全为 1', m: 3, n: 2, row: -1, col: -1, dp: [[1,1],[1,1],[1,1]], sources: [] },
  { lineNum: 5, phase: 'fill', description: 'i=1, j=1: dp[1][1] = dp[0][1] + dp[1][0] = 1 + 1 = 2', m: 3, n: 2, row: 1, col: 1, dp: [[1,1],[1,2],[1,1]], sources: [[0,1],[1,0]] },
  { lineNum: 5, phase: 'fill', description: 'i=2, j=1: dp[2][1] = dp[1][1] + dp[2][0] = 2 + 1 = 3', m: 3, n: 2, row: 2, col: 1, dp: [[1,1],[1,2],[1,3]], sources: [[1,1],[2,0]] },
  { lineNum: 6, phase: 'done', description: '返回 dp[2][1] = 3，共有 3 条不同路径', m: 3, n: 2, row: 2, col: 1, dp: [[1,1],[1,2],[1,3]], sources: [] },
];

const phaseLabels = { init: '初始化', base: '基础情况', fill: '填表', done: '完成' };

function setupPanel(panel) {
  const m = M, n = NN;
  const rows = Array.from({ length: m }, (_, i) =>
    `<tr>${Array.from({ length: n }, (_, j) =>
      `<td id="dp-${i}-${j}" class="hashmap-row">1</td>`).join('')}</tr>`
  ).join('');
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">${m}\u00d7${n} 网格 DP 表（绿色=当前，黄色=来源）</div>
      <table class="hashmap-table" id="dp-table">
        <tbody>${rows}</tbody>
      </table>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>当前单元格</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(250,204,21,0.4);border:1px solid #facc15"></div>来源（上方+左方）</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '62. Unique Paths — 执行可视化',
  problemDesc: `
    <p>一个机器人位于 <code>m x n</code> 网格的左上角，每次只能向下或向右移动一步。问总共有多少条不同的路径可以到达网格的右下角？</p>
    <div class="example">输入：m = 3, n = 7
输出：28</div>
    <p>提示：<code>1 <= m, n <= 100</code></p>
  `,
  subtitle: `m = ${M}, n = ${NN}`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '3x7 网格', steps: steps1, subtitle: 'm = 3, n = 7' },
    { name: '3x2 网格', steps: steps2, subtitle: 'm = 3, n = 2', setup(panel) { M = 3; NN = 2; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const m = s.m || M, n = s.n || NN;
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        const el = document.getElementById(`dp-${i}-${j}`);
        if (!el) continue;
        el.textContent = s.dp[i][j];
        el.className = 'hashmap-row';
        if (i === s.row && j === s.col) el.classList.add('current');
        if (s.sources.some(([r, c]) => r === i && c === j)) el.classList.add('in-window');
      }
    }
    const resultEl = document.getElementById('result-area');
    if (s.phase === 'done') {
      const ans = s.dp[m-1][n-1];
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">不同路径数 = ${ans}</div>
          <div class="found-sub">从左上角到右下角共 ${ans} 条不同路径</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
