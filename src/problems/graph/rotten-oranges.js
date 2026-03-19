let GRID = [[2,1,1],[1,1,0],[0,1,1]];
let ROWS = 3, COLS = 3;

const code = [
  'class Solution:',
  '    def orangesRotting(self, grid):',
  '        rows, cols = len(grid), len(grid[0])',
  '        queue = deque()',
  '        fresh = 0',
  '        for r in range(rows):',
  '            for c in range(cols):',
  '                if grid[r][c] == 2:',
  '                    queue.append((r, c))',
  '                elif grid[r][c] == 1:',
  '                    fresh += 1',
  '        minutes = 0',
  '        while queue and fresh > 0:',
  '            for _ in range(len(queue)):',
  '                r, c = queue.popleft()',
  '                for dr,dc in [(1,0),(-1,0),(0,1),(0,-1)]:',
  '                    nr, nc = r+dr, c+dc',
  '                    if 0<=nr<rows and 0<=nc<cols and grid[nr][nc]==1:',
  '                        grid[nr][nc] = 2',
  '                        fresh -= 1',
  '                        queue.append((nr, nc))',
  '            minutes += 1',
  '        return minutes if fresh==0 else -1',
];

const lineMap = { 6: 2, 7: 3, 8: 4, 9: 5, 10: 6, 11: 7, 12: 8, 13: 9, 14: 10, 15: 11, 16: 12, 17: 13, 18: 14, 19: 15, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22 };

const steps = [
  { lineNum: 8, phase: 'init', description: '初始化队列和新鲜橘子计数 fresh=0', grid: [[2,1,1],[1,1,0],[0,1,1]], queue: [], fresh: 0, minutes: 0, currentCells: [], rows: 3, cols: 3 },
  { lineNum: 9, phase: 'init', description: '扫描网格：找到所有腐烂和新鲜橘子', grid: [[2,1,1],[1,1,0],[0,1,1]], queue: [], fresh: 0, minutes: 0, currentCells: [], rows: 3, cols: 3 },
  { lineNum: 12, phase: 'init', description: '(0,0) 是腐烂橘子，加入队列', grid: [[2,1,1],[1,1,0],[0,1,1]], queue: [[0,0]], fresh: 0, minutes: 0, currentCells: [[0,0]], rows: 3, cols: 3 },
  { lineNum: 14, phase: 'init', description: '统计新鲜橘子：(0,1),(0,2),(1,0),(1,1),(2,1),(2,2) 共 6 个', grid: [[2,1,1],[1,1,0],[0,1,1]], queue: [[0,0]], fresh: 6, minutes: 0, currentCells: [[0,0]], rows: 3, cols: 3 },
  // Minute 1
  { lineNum: 16, phase: 'spread', description: '第 1 分钟开始：队列中有 1 个腐烂橘子 (0,0)', grid: [[2,1,1],[1,1,0],[0,1,1]], queue: [[0,0]], fresh: 6, minutes: 0, currentCells: [[0,0]], rows: 3, cols: 3 },
  { lineNum: 19, phase: 'spread', description: '(0,0) 检查四邻：(0,1) 是新鲜橘子，感染！', grid: [[2,2,1],[1,1,0],[0,1,1]], queue: [[0,1]], fresh: 5, minutes: 0, currentCells: [[0,0]], rows: 3, cols: 3 },
  { lineNum: 22, phase: 'spread', description: '(0,0) 继续检查：(1,0) 也是新鲜橘子，感染！fresh=4，minutes=1', grid: [[2,2,1],[2,1,0],[0,1,1]], queue: [[0,1],[1,0]], fresh: 4, minutes: 1, currentCells: [[0,1],[1,0]], rows: 3, cols: 3 },
  // Minute 2
  { lineNum: 16, phase: 'spread', description: '第 2 分钟开始：队列中有 (0,1) 和 (1,0)', grid: [[2,2,1],[2,1,0],[0,1,1]], queue: [[0,1],[1,0]], fresh: 4, minutes: 1, currentCells: [[0,1],[1,0]], rows: 3, cols: 3 },
  { lineNum: 19, phase: 'spread', description: '(0,1) 感染邻居 (0,2)，fresh=3', grid: [[2,2,2],[2,1,0],[0,1,1]], queue: [[0,2]], fresh: 3, minutes: 1, currentCells: [[0,1]], rows: 3, cols: 3 },
  { lineNum: 22, phase: 'spread', description: '(1,0) 感染邻居 (1,1)，fresh=2，minutes=2', grid: [[2,2,2],[2,2,0],[0,1,1]], queue: [[0,2],[1,1]], fresh: 2, minutes: 2, currentCells: [[0,2],[1,1]], rows: 3, cols: 3 },
  // Minute 3
  { lineNum: 16, phase: 'spread', description: '第 3 分钟开始：队列中有 (0,2) 和 (1,1)', grid: [[2,2,2],[2,2,0],[0,1,1]], queue: [[0,2],[1,1]], fresh: 2, minutes: 2, currentCells: [[0,2],[1,1]], rows: 3, cols: 3 },
  { lineNum: 19, phase: 'spread', description: '(0,2) 无新鲜邻居；(1,1) 感染 (2,1)，fresh=1', grid: [[2,2,2],[2,2,0],[0,2,1]], queue: [[2,1]], fresh: 1, minutes: 2, currentCells: [[1,1]], rows: 3, cols: 3 },
  { lineNum: 22, phase: 'spread', description: 'minutes=3，队列中有 (2,1)', grid: [[2,2,2],[2,2,0],[0,2,1]], queue: [[2,1]], fresh: 1, minutes: 3, currentCells: [[2,1]], rows: 3, cols: 3 },
  // Minute 4
  { lineNum: 16, phase: 'spread', description: '第 4 分钟开始：队列中有 (2,1)', grid: [[2,2,2],[2,2,0],[0,2,1]], queue: [[2,1]], fresh: 1, minutes: 3, currentCells: [[2,1]], rows: 3, cols: 3 },
  { lineNum: 22, phase: 'spread', description: '(2,1) 感染 (2,2)，fresh=0，全部腐烂！minutes=4', grid: [[2,2,2],[2,2,0],[0,2,2]], queue: [], fresh: 0, minutes: 4, currentCells: [[2,2]], rows: 3, cols: 3 },
  // Done
  { lineNum: 26, phase: 'done', description: 'fresh=0，所有橘子已腐烂，返回 minutes=4', grid: [[2,2,2],[2,2,0],[0,2,2]], queue: [], fresh: 0, minutes: 4, currentCells: [], rows: 3, cols: 3 },
];

// Test case 2: impossible case (isolated fresh orange)
const steps2 = [
  { lineNum: 8, phase: 'init', description: '初始化队列和新鲜橘子计数 fresh=0', grid: [[2,1,1],[0,1,1],[1,0,1]], queue: [], fresh: 0, minutes: 0, currentCells: [], rows: 3, cols: 3 },
  { lineNum: 12, phase: 'init', description: '(0,0) 是腐烂橘子，加入队列', grid: [[2,1,1],[0,1,1],[1,0,1]], queue: [[0,0]], fresh: 0, minutes: 0, currentCells: [[0,0]], rows: 3, cols: 3 },
  { lineNum: 14, phase: 'init', description: '统计新鲜橘子：共 6 个新鲜橘子', grid: [[2,1,1],[0,1,1],[1,0,1]], queue: [[0,0]], fresh: 6, minutes: 0, currentCells: [[0,0]], rows: 3, cols: 3 },
  { lineNum: 16, phase: 'spread', description: '第 1 分钟：(0,0) 感染 (0,1)，fresh=5', grid: [[2,2,1],[0,1,1],[1,0,1]], queue: [[0,1]], fresh: 5, minutes: 1, currentCells: [[0,1]], rows: 3, cols: 3 },
  { lineNum: 16, phase: 'spread', description: '第 2 分钟：(0,1) 感染 (0,2) 和 (1,1)，fresh=3', grid: [[2,2,2],[0,2,1],[1,0,1]], queue: [[0,2],[1,1]], fresh: 3, minutes: 2, currentCells: [[0,2],[1,1]], rows: 3, cols: 3 },
  { lineNum: 16, phase: 'spread', description: '第 3 分钟：(0,2) 无新邻居；(1,1) 感染 (1,2)，fresh=2', grid: [[2,2,2],[0,2,2],[1,0,1]], queue: [[1,2]], fresh: 2, minutes: 3, currentCells: [[1,2]], rows: 3, cols: 3 },
  { lineNum: 16, phase: 'spread', description: '第 4 分钟：(1,2) 感染 (2,2)，fresh=1', grid: [[2,2,2],[0,2,2],[1,0,2]], queue: [[2,2]], fresh: 1, minutes: 4, currentCells: [[2,2]], rows: 3, cols: 3 },
  { lineNum: 16, phase: 'spread', description: '第 5 分钟：(2,2) 无法到达 (2,0)，队列为空', grid: [[2,2,2],[0,2,2],[1,0,2]], queue: [], fresh: 1, minutes: 5, currentCells: [], rows: 3, cols: 3 },
  { lineNum: 26, phase: 'done', description: 'fresh=1 != 0，存在无法腐烂的橘子 (2,0)，返回 -1', grid: [[2,2,2],[0,2,2],[1,0,2]], queue: [], fresh: 1, minutes: -1, currentCells: [], rows: 3, cols: 3 },
];

const phaseLabels = { init: '初始化', spread: 'BFS扩散', done: '完成' };

function setupPanel(panel, rows, cols) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">橘子网格（橙色=腐烂, 绿色=新鲜, 灰色=空, 青色=正在扩散）</div>
      <div id="orange-grid" style="display:inline-grid;grid-template-columns:repeat(${cols},48px);gap:3px"></div>
    </div>
    <div class="card">
      <div class="section-title">BFS 队列</div>
      <div class="stack-container" id="bfs-queue"></div>
    </div>
    <div class="card" id="info-area"></div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '994. Rotting Oranges -- 执行可视化',
  problemDesc: `
    <p>在给定的 <code>m x n</code> 网格中，每个单元格可以是 <code>0</code>（空）、<code>1</code>（新鲜橘子）或 <code>2</code>（腐烂橘子）。每分钟，腐烂橘子会使上下左右相邻的新鲜橘子腐烂。返回所有橘子腐烂所需的最少分钟数，若不可能则返回 <code>-1</code>。</p>
    <div class="example">输入：grid = [[2,1,1],[1,1,0],[0,1,1]]
输出：4</div>
  `,
  subtitle: 'grid = [[2,1,1],[1,1,0],[0,1,1]] | output: 4',
  code, lineMap, steps, phaseLabels,

  testCases: [
    {
      name: '标准用例: 4分钟全部腐烂',
      steps: steps,
      subtitle: 'grid = [[2,1,1],[1,1,0],[0,1,1]] | output: 4',
    },
    {
      name: '不可能: 孤立橘子 -> -1',
      steps: steps2,
      subtitle: 'grid = [[2,1,1],[0,1,1],[1,0,1]] | output: -1',
      setup(panel) { setupPanel(panel, 3, 3); },
    },
  ],

  setup(panel) {
    setupPanel(panel, ROWS, COLS);
  },

  render(s) {
    const rows = s.rows || ROWS;
    const cols = s.cols || COLS;
    const gridEl = document.getElementById('orange-grid');
    if (gridEl.style.gridTemplateColumns !== `repeat(${cols}, 48px)`) {
      gridEl.style.gridTemplateColumns = `repeat(${cols}, 48px)`;
    }
    let html = '';
    const curSet = new Set(s.currentCells.map(([r,c])=>`${r},${c}`));
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let cls = 'arr-cell';
        let bg = '';
        const v = s.grid[r][c];
        if (curSet.has(`${r},${c}`)) { cls += ' current'; }
        if (v === 2) bg = 'background:rgba(245,158,11,0.5);border-color:#f59e0b';
        else if (v === 1) bg = 'background:rgba(16,185,129,0.4);border-color:#10b981';
        else bg = 'background:rgba(100,100,100,0.2);border-color:#666';
        const icon = v === 2 ? '\ud83e\uddc0' : v === 1 ? '\ud83c\udf4a' : '\u00b7';
        html += `<div class="${cls}" style="width:44px;height:44px;${bg}"><div class="arr-val" style="font-size:18px">${icon}</div><div class="arr-idx">${r},${c}</div></div>`;
      }
    }
    gridEl.innerHTML = html;

    // Queue
    const qEl = document.getElementById('bfs-queue');
    if (s.queue.length === 0) {
      qEl.innerHTML = '<div class="stack-empty">（队列为空）</div>';
    } else {
      qEl.innerHTML = s.queue.map(([r,c]) =>
        `<div class="stack-item">(${r},${c})</div>`
      ).join('');
    }

    // Info
    document.getElementById('info-area').innerHTML = `
      <div class="section-title">状态</div>
      <div style="font-family:monospace;font-size:13px;color:var(--text-secondary)">
        minutes = <span style="font-weight:700;color:#f59e0b">${s.minutes}</span> &nbsp;|&nbsp;
        fresh = <span style="font-weight:700;color:#10b981">${s.fresh}</span>
      </div>
    `;

    // Result
    const resultEl = document.getElementById('result-area');
    if (s.phase === 'done') {
      if (s.minutes === -1 || s.fresh > 0) {
        resultEl.innerHTML = `<div class="card found-box" style="border-color:#ef4444;background:rgba(239,68,68,0.08)"><div class="found-icon" style="color:#ef4444">\u2717</div><div><div class="found-text">返回 -1</div><div class="found-sub">存在无法被感染的新鲜橘子</div></div></div>`;
      } else {
        resultEl.innerHTML = `<div class="card found-box"><div class="found-icon">\u2713</div><div><div class="found-text">返回 ${s.minutes} 分钟</div><div class="found-sub">BFS 逐层扩散，共需 ${s.minutes} 分钟感染所有橘子</div></div></div>`;
      }
    } else {
      resultEl.innerHTML = '';
    }
  },
};
