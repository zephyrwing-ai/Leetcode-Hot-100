let GRID = [
  ['1','1','0','0','0'],
  ['1','1','0','0','0'],
  ['0','0','1','0','0'],
  ['0','0','0','1','1'],
];
let ROWS = 4, COLS = 5;

const code = [
  'class Solution:',
  '    def numIslands(self, grid):',
  '        rows, cols = len(grid), len(grid[0])',
  '        count = 0',
  '        def dfs(r, c):',
  '            if r<0 or c<0 or r>=rows or c>=cols:',
  '                return',
  '            if grid[r][c] != "1":',
  '                return',
  '            grid[r][c] = "0"',
  '            dfs(r+1,c); dfs(r-1,c)',
  '            dfs(r,c+1); dfs(r,c-1)',
  '        for r in range(rows):',
  '            for c in range(cols):',
  '                if grid[r][c] == "1":',
  '                    count += 1',
  '                    dfs(r, c)',
  '        return count',
];

const lineMap = { 6: 2, 7: 3, 8: 4, 9: 5, 10: 6, 11: 7, 12: 8, 13: 9, 14: 10, 15: 11, 16: 12, 17: 13, 18: 14, 19: 15 };

const ISLAND_COLORS = ['#38bdf8', '#f59e0b', '#10b981', '#e879f9'];

const steps = [
  { lineNum: 7, phase: 'init', description: '初始化行列数 rows=4, cols=5, count=0', grid: [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']], visited: Array.from({length:4},()=>Array(5).fill(0)), count: 0, currentR: -1, currentC: -1, dfsStack: [], islandId: 0, rows: 4, cols: 5 },
  { lineNum: 18, phase: 'scan', description: '开始扫描网格，从 (0,0) 开始逐行遍历', grid: [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']], visited: Array.from({length:4},()=>Array(5).fill(0)), count: 0, currentR: 0, currentC: 0, dfsStack: [], islandId: 0, rows: 4, cols: 5 },
  // Island 1: start at (0,0)
  { lineNum: 19, phase: 'scan', description: '扫描到 grid[0][0]="1"，发现新岛屿，count=1', grid: [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']], visited: Array.from({length:4},()=>Array(5).fill(0)), count: 1, currentR: 0, currentC: 0, dfsStack: [[0,0]], islandId: 1, rows: 4, cols: 5 },
  { lineNum: 13, phase: 'dfs', description: 'DFS: 访问 (0,0)，标记为已访问，探索四个方向', grid: [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']], visited: [[1,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], count: 1, currentR: 0, currentC: 0, dfsStack: [[0,1],[1,0]], islandId: 1, rows: 4, cols: 5 },
  { lineNum: 14, phase: 'dfs', description: 'DFS: 向右到 (0,1)，grid[0][1]="1"，匹配，标记已访问', grid: [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']], visited: [[1,1,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], count: 1, currentR: 0, currentC: 1, dfsStack: [[1,0],[1,1]], islandId: 1, rows: 4, cols: 5 },
  { lineNum: 14, phase: 'dfs', description: 'DFS: 从 (0,1) 向右到 (0,2)，grid[0][2]="0"，跳过', grid: [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']], visited: [[1,1,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], count: 1, currentR: 0, currentC: 2, dfsStack: [[1,0],[1,1]], islandId: 1, rows: 4, cols: 5 },
  { lineNum: 14, phase: 'dfs', description: 'DFS: 回到待探索节点，访问 (1,1)，标记已访问', grid: [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']], visited: [[1,1,0,0,0],[0,1,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], count: 1, currentR: 1, currentC: 1, dfsStack: [[1,0]], islandId: 1, rows: 4, cols: 5 },
  { lineNum: 14, phase: 'dfs', description: 'DFS: 访问 (1,0)，标记已访问，四周无未访问陆地', grid: [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']], visited: [[1,1,0,0,0],[1,1,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], count: 1, currentR: 1, currentC: 0, dfsStack: [], islandId: 1, rows: 4, cols: 5 },
  { lineNum: 14, phase: 'dfs', description: 'DFS 栈为空，岛屿 1 探索完毕，包含 4 个格子', grid: [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']], visited: [[1,1,0,0,0],[1,1,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], count: 1, currentR: -1, currentC: -1, dfsStack: [], islandId: 1, rows: 4, cols: 5 },
  // Scan past water cells
  { lineNum: 18, phase: 'scan', description: '继续扫描 (0,2)~(1,4) 均为水域"0"或已访问，跳过', grid: [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']], visited: [[1,1,0,0,0],[1,1,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], count: 1, currentR: 1, currentC: 4, dfsStack: [], islandId: 1, rows: 4, cols: 5 },
  { lineNum: 18, phase: 'scan', description: '扫描 (2,0) 和 (2,1) 为水域"0"，跳过', grid: [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']], visited: [[1,1,0,0,0],[1,1,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], count: 1, currentR: 2, currentC: 1, dfsStack: [], islandId: 1, rows: 4, cols: 5 },
  // Island 2: start at (2,2)
  { lineNum: 19, phase: 'scan', description: '扫描到 grid[2][2]="1"，发现新岛屿，count=2', grid: [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']], visited: [[1,1,0,0,0],[1,1,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], count: 2, currentR: 2, currentC: 2, dfsStack: [[2,2]], islandId: 2, rows: 4, cols: 5 },
  { lineNum: 13, phase: 'dfs', description: 'DFS: 访问 (2,2)，四周均为水域或越界，岛屿 2 仅 1 格', grid: [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']], visited: [[1,1,0,0,0],[1,1,0,0,0],[0,0,2,0,0],[0,0,0,0,0]], count: 2, currentR: 2, currentC: 2, dfsStack: [], islandId: 2, rows: 4, cols: 5 },
  // Scan past water
  { lineNum: 18, phase: 'scan', description: '扫描 (2,3)~(3,2) 均为水域，跳过', grid: [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']], visited: [[1,1,0,0,0],[1,1,0,0,0],[0,0,2,0,0],[0,0,0,0,0]], count: 2, currentR: 3, currentC: 2, dfsStack: [], islandId: 2, rows: 4, cols: 5 },
  // Island 3: start at (3,3)
  { lineNum: 19, phase: 'scan', description: '扫描到 grid[3][3]="1"，发现新岛屿，count=3', grid: [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']], visited: [[1,1,0,0,0],[1,1,0,0,0],[0,0,2,0,0],[0,0,0,0,0]], count: 3, currentR: 3, currentC: 3, dfsStack: [[3,3]], islandId: 3, rows: 4, cols: 5 },
  { lineNum: 13, phase: 'dfs', description: 'DFS: 访问 (3,3)，标记已访问，向右探索 (3,4)', grid: [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']], visited: [[1,1,0,0,0],[1,1,0,0,0],[0,0,2,0,0],[0,0,0,3,0]], count: 3, currentR: 3, currentC: 3, dfsStack: [[3,4]], islandId: 3, rows: 4, cols: 5 },
  { lineNum: 14, phase: 'dfs', description: 'DFS: 访问 (3,4)，标记已访问，四周无未访问陆地', grid: [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']], visited: [[1,1,0,0,0],[1,1,0,0,0],[0,0,2,0,0],[0,0,0,3,3]], count: 3, currentR: 3, currentC: 4, dfsStack: [], islandId: 3, rows: 4, cols: 5 },
  { lineNum: 14, phase: 'dfs', description: 'DFS 栈为空，岛屿 3 探索完毕，包含 2 个格子', grid: [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']], visited: [[1,1,0,0,0],[1,1,0,0,0],[0,0,2,0,0],[0,0,0,3,3]], count: 3, currentR: -1, currentC: -1, dfsStack: [], islandId: 3, rows: 4, cols: 5 },
  // Done
  { lineNum: 21, phase: 'done', description: '遍历结束，共发现 3 个岛屿，返回 count=3', grid: [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']], visited: [[1,1,0,0,0],[1,1,0,0,0],[0,0,2,0,0],[0,0,0,3,3]], count: 3, currentR: -1, currentC: -1, dfsStack: [], islandId: 3, rows: 4, cols: 5 },
];

// Test case 2: all water grid
const steps2 = [
  { lineNum: 7, phase: 'init', description: '初始化行列数 rows=2, cols=3, count=0', grid: [['0','0','0'],['0','0','0']], visited: [[0,0,0],[0,0,0]], count: 0, currentR: -1, currentC: -1, dfsStack: [], islandId: 0, rows: 2, cols: 3 },
  { lineNum: 18, phase: 'scan', description: '开始扫描网格，从 (0,0) 开始', grid: [['0','0','0'],['0','0','0']], visited: [[0,0,0],[0,0,0]], count: 0, currentR: 0, currentC: 0, dfsStack: [], islandId: 0, rows: 2, cols: 3 },
  { lineNum: 18, phase: 'scan', description: 'grid[0][0]="0"，是水域，跳过', grid: [['0','0','0'],['0','0','0']], visited: [[0,0,0],[0,0,0]], count: 0, currentR: 0, currentC: 0, dfsStack: [], islandId: 0, rows: 2, cols: 3 },
  { lineNum: 18, phase: 'scan', description: 'grid[0][1]="0"，是水域，跳过', grid: [['0','0','0'],['0','0','0']], visited: [[0,0,0],[0,0,0]], count: 0, currentR: 0, currentC: 1, dfsStack: [], islandId: 0, rows: 2, cols: 3 },
  { lineNum: 18, phase: 'scan', description: 'grid[0][2]="0"，是水域，跳过', grid: [['0','0','0'],['0','0','0']], visited: [[0,0,0],[0,0,0]], count: 0, currentR: 0, currentC: 2, dfsStack: [], islandId: 0, rows: 2, cols: 3 },
  { lineNum: 18, phase: 'scan', description: 'grid[1][0]="0"，是水域，跳过', grid: [['0','0','0'],['0','0','0']], visited: [[0,0,0],[0,0,0]], count: 0, currentR: 1, currentC: 0, dfsStack: [], islandId: 0, rows: 2, cols: 3 },
  { lineNum: 18, phase: 'scan', description: 'grid[1][1]="0"，是水域，跳过', grid: [['0','0','0'],['0','0','0']], visited: [[0,0,0],[0,0,0]], count: 0, currentR: 1, currentC: 1, dfsStack: [], islandId: 0, rows: 2, cols: 3 },
  { lineNum: 18, phase: 'scan', description: 'grid[1][2]="0"，是水域，跳过', grid: [['0','0','0'],['0','0','0']], visited: [[0,0,0],[0,0,0]], count: 0, currentR: 1, currentC: 2, dfsStack: [], islandId: 0, rows: 2, cols: 3 },
  { lineNum: 18, phase: 'scan', description: '扫描完所有格子，全部为水域，没有发现岛屿', grid: [['0','0','0'],['0','0','0']], visited: [[0,0,0],[0,0,0]], count: 0, currentR: -1, currentC: -1, dfsStack: [], islandId: 0, rows: 2, cols: 3 },
  { lineNum: 21, phase: 'done', description: '遍历结束，共发现 0 个岛屿，返回 count=0', grid: [['0','0','0'],['0','0','0']], visited: [[0,0,0],[0,0,0]], count: 0, currentR: -1, currentC: -1, dfsStack: [], islandId: 0, rows: 2, cols: 3 },
];

const phaseLabels = { init: '初始化', scan: '扫描', dfs: '深度优先搜索', done: '完成' };

function setupPanel(panel, rows, cols) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">网格 grid（蓝色=当前, 彩色=已访问岛屿）</div>
      <div id="grid-area" style="display:inline-grid;grid-template-columns:repeat(${cols},40px);gap:2px"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:${ISLAND_COLORS[0]}"></div>岛屿 1</div>
        <div class="legend-item"><div class="legend-dot" style="background:${ISLAND_COLORS[1]}"></div>岛屿 2</div>
        <div class="legend-item"><div class="legend-dot" style="background:${ISLAND_COLORS[2]}"></div>岛屿 3</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">DFS 栈</div>
      <div class="stack-container" id="dfs-stack"></div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '200. Number of Islands -- 执行可视化',
  problemDesc: `
    <p>给你一个由 <code>'1'</code>（陆地）和 <code>'0'</code>（水）组成的二维网格，请你计算网格中岛屿的数量。</p>
    <p>岛屿总是被水包围，并且每座岛屿只能由水平方向和/或垂直方向上相邻的陆地连接形成。</p>
    <div class="example">输入：grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]
输出：3</div>
  `,
  subtitle: `grid = ${ROWS}x${COLS} | output: 3`,
  code, lineMap, steps, phaseLabels,

  testCases: [
    {
      name: '标准用例: 3个岛屿',
      steps: steps,
      subtitle: `grid = 4x5 | output: 3`,
    },
    {
      name: '全水域: 0个岛屿',
      steps: steps2,
      subtitle: 'grid = 2x3 (全0) | output: 0',
      setup(panel) {
        setupPanel(panel, 2, 3);
      },
    },
  ],

  setup(panel) {
    setupPanel(panel, ROWS, COLS);
  },

  render(s) {
    const rows = s.rows || ROWS;
    const cols = s.cols || COLS;
    const grid = s.grid;
    const gridEl = document.getElementById('grid-area');
    if (gridEl.style.gridTemplateColumns !== `repeat(${cols}, 40px)`) {
      gridEl.style.gridTemplateColumns = `repeat(${cols}, 40px)`;
    }
    let html = '';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let cls = 'arr-cell';
        let bg = '';
        if (r === s.currentR && c === s.currentC) cls += ' current';
        if (s.visited[r][c] > 0) {
          cls += ' is-visited';
          bg = `background:${ISLAND_COLORS[s.visited[r][c]-1]}44;border-color:${ISLAND_COLORS[s.visited[r][c]-1]}`;
        }
        const val = grid[r][c];
        html += `<div class="${cls}" style="width:36px;height:36px;${bg}"><div class="arr-val">${val}</div><div class="arr-idx">${r},${c}</div></div>`;
      }
    }
    gridEl.innerHTML = html;

    // DFS stack
    const stackEl = document.getElementById('dfs-stack');
    if (s.dfsStack.length === 0) {
      stackEl.innerHTML = '<div class="stack-empty">（栈为空）</div>';
    } else {
      stackEl.innerHTML = s.dfsStack.map(([r,c]) =>
        `<div class="stack-item">(${r},${c})</div>`
      ).join('');
    }

    // Result
    const resultEl = document.getElementById('result-area');
    if (s.phase === 'done') {
      resultEl.innerHTML = `<div class="card found-box"><div class="found-icon">\u2713</div><div><div class="found-text">岛屿数量 = ${s.count}</div><div class="found-sub">通过 DFS 洪泛填充，共发现 ${s.count} 个独立岛屿</div></div></div>`;
    } else {
      resultEl.innerHTML = `<div class="card"><div class="section-title">当前岛屿数: ${s.count}</div></div>`;
    }
  },
};
