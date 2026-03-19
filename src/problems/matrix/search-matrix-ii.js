let MATRIX = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]];
let TARGET = 5;

const code = [
  'class Solution:',
  '    def searchMatrix(self, matrix, target):',
  '        rows, cols = len(matrix), len(matrix[0])',
  '        r, c = 0, cols - 1',
  '        while r < rows and c >= 0:',
  '            if matrix[r][c] == target:',
  '                return True',
  '            elif matrix[r][c] > target:',
  '                c -= 1',
  '            else:',
  '                r += 1',
  '        return False',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11 };

// ── Test Case 1: target=5 in 5x5 matrix ──

const steps1 = [
  { lineNum: 3, phase: 'init', description: '初始化 r=0, c=4, 从右上角开始搜索, target=5', r: 0, c: 4, result: null, visited: [], eliminated: [], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 5 },
  { lineNum: 5, phase: 'compare', description: 'matrix[0][4]=15 > target=5, 排除第 4 列', r: 0, c: 4, result: null, visited: [[0,4]], eliminated: [], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 5 },
  { lineNum: 8, phase: 'move', description: 'c -= 1 → c=3, 向左移动', r: 0, c: 3, result: null, visited: [[0,4]], eliminated: [[0,4],[1,4],[2,4],[3,4],[4,4]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 5 },
  { lineNum: 5, phase: 'compare', description: 'matrix[0][3]=11 > target=5, 排除第 3 列', r: 0, c: 3, result: null, visited: [[0,4],[0,3]], eliminated: [[0,4],[1,4],[2,4],[3,4],[4,4]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 5 },
  { lineNum: 8, phase: 'move', description: 'c -= 1 → c=2, 向左移动', r: 0, c: 2, result: null, visited: [[0,4],[0,3]], eliminated: [[0,4],[1,4],[2,4],[3,4],[4,4],[0,3],[1,3],[2,3],[3,3],[4,3]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 5 },
  { lineNum: 5, phase: 'compare', description: 'matrix[0][2]=7 > target=5, 排除第 2 列', r: 0, c: 2, result: null, visited: [[0,4],[0,3],[0,2]], eliminated: [[0,4],[1,4],[2,4],[3,4],[4,4],[0,3],[1,3],[2,3],[3,3],[4,3]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 5 },
  { lineNum: 8, phase: 'move', description: 'c -= 1 → c=1', r: 0, c: 1, result: null, visited: [[0,4],[0,3],[0,2]], eliminated: [[0,4],[1,4],[2,4],[3,4],[4,4],[0,3],[1,3],[2,3],[3,3],[4,3],[0,2],[1,2],[2,2],[3,2],[4,2]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 5 },
  { lineNum: 5, phase: 'compare', description: 'matrix[0][1]=4 < target=5, 排除第 0 行', r: 0, c: 1, result: null, visited: [[0,4],[0,3],[0,2],[0,1]], eliminated: [[0,4],[1,4],[2,4],[3,4],[4,4],[0,3],[1,3],[2,3],[3,3],[4,3],[0,2],[1,2],[2,2],[3,2],[4,2]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 5 },
  { lineNum: 10, phase: 'move', description: 'r += 1 → r=1, 向下移动', r: 1, c: 1, result: null, visited: [[0,4],[0,3],[0,2],[0,1]], eliminated: [[0,4],[1,4],[2,4],[3,4],[4,4],[0,3],[1,3],[2,3],[3,3],[4,3],[0,2],[1,2],[2,2],[3,2],[4,2],[0,0],[0,1]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 5 },
  { lineNum: 5, phase: 'compare', description: 'matrix[1][1]=5 == target=5, 找到了!', r: 1, c: 1, result: true, visited: [[0,4],[0,3],[0,2],[0,1],[1,1]], eliminated: [[0,4],[1,4],[2,4],[3,4],[4,4],[0,3],[1,3],[2,3],[3,3],[4,3],[0,2],[1,2],[2,2],[3,2],[4,2],[0,0],[0,1]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 5 },
  { lineNum: 6, phase: 'done', description: '返回 True, 在位置 (1,1) 找到 target=5', r: 1, c: 1, result: true, visited: [[0,4],[0,3],[0,2],[0,1],[1,1]], eliminated: [[0,4],[1,4],[2,4],[3,4],[4,4],[0,3],[1,3],[2,3],[3,3],[4,3],[0,2],[1,2],[2,2],[3,2],[4,2],[0,0],[0,1]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 5 },
];

// ── Test Case 2: target=20 (not found) in same matrix ──

const steps2 = [
  { lineNum: 3, phase: 'init', description: '初始化 r=0, c=4, 从右上角搜索, target=20', r: 0, c: 4, result: null, visited: [], eliminated: [], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20 },
  { lineNum: 5, phase: 'compare', description: 'matrix[0][4]=15 < 20, 排除第 0 行', r: 0, c: 4, result: null, visited: [[0,4]], eliminated: [], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20 },
  { lineNum: 10, phase: 'move', description: 'r += 1 → r=1', r: 1, c: 4, result: null, visited: [[0,4]], eliminated: [[0,0],[0,1],[0,2],[0,3],[0,4]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20 },
  { lineNum: 5, phase: 'compare', description: 'matrix[1][4]=19 < 20, 排除第 1 行', r: 1, c: 4, result: null, visited: [[0,4],[1,4]], eliminated: [[0,0],[0,1],[0,2],[0,3],[0,4]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20 },
  { lineNum: 10, phase: 'move', description: 'r += 1 → r=2', r: 2, c: 4, result: null, visited: [[0,4],[1,4]], eliminated: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20 },
  { lineNum: 5, phase: 'compare', description: 'matrix[2][4]=22 > 20, 排除第 4 列', r: 2, c: 4, result: null, visited: [[0,4],[1,4],[2,4]], eliminated: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20 },
  { lineNum: 8, phase: 'move', description: 'c -= 1 → c=3', r: 2, c: 3, result: null, visited: [[0,4],[1,4],[2,4]], eliminated: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4],[2,4],[3,4],[4,4]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20 },
  { lineNum: 5, phase: 'compare', description: 'matrix[2][3]=16 < 20, 排除第 2 行', r: 2, c: 3, result: null, visited: [[0,4],[1,4],[2,4],[2,3]], eliminated: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4],[2,4],[3,4],[4,4]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20 },
  { lineNum: 10, phase: 'move', description: 'r += 1 → r=3', r: 3, c: 3, result: null, visited: [[0,4],[1,4],[2,4],[2,3]], eliminated: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4],[2,0],[2,1],[2,2],[2,3],[2,4],[3,4],[4,4]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20 },
  { lineNum: 5, phase: 'compare', description: 'matrix[3][3]=17 < 20, 排除第 3 行', r: 3, c: 3, result: null, visited: [[0,4],[1,4],[2,4],[2,3],[3,3]], eliminated: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4],[2,0],[2,1],[2,2],[2,3],[2,4],[3,4],[4,4]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20 },
  { lineNum: 10, phase: 'move', description: 'r += 1 → r=4', r: 4, c: 3, result: null, visited: [[0,4],[1,4],[2,4],[2,3],[3,3]], eliminated: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4],[2,0],[2,1],[2,2],[2,3],[2,4],[3,0],[3,1],[3,2],[3,3],[3,4],[4,4]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20 },
  { lineNum: 5, phase: 'compare', description: 'matrix[4][3]=26 > 20, 排除第 3 列', r: 4, c: 3, result: null, visited: [[0,4],[1,4],[2,4],[2,3],[3,3],[4,3]], eliminated: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4],[2,0],[2,1],[2,2],[2,3],[2,4],[3,0],[3,1],[3,2],[3,3],[3,4],[4,4]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20 },
  { lineNum: 8, phase: 'move', description: 'c -= 1 → c=2', r: 4, c: 2, result: null, visited: [[0,4],[1,4],[2,4],[2,3],[3,3],[4,3]], eliminated: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4],[2,0],[2,1],[2,2],[2,3],[2,4],[3,0],[3,1],[3,2],[3,3],[3,4],[4,3],[4,4]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20 },
  { lineNum: 5, phase: 'compare', description: 'matrix[4][2]=23 > 20, 排除第 2 列', r: 4, c: 2, result: null, visited: [[0,4],[1,4],[2,4],[2,3],[3,3],[4,3],[4,2]], eliminated: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4],[2,0],[2,1],[2,2],[2,3],[2,4],[3,0],[3,1],[3,2],[3,3],[3,4],[4,3],[4,4]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20 },
  { lineNum: 8, phase: 'move', description: 'c -= 1 → c=1', r: 4, c: 1, result: null, visited: [[0,4],[1,4],[2,4],[2,3],[3,3],[4,3],[4,2]], eliminated: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4],[2,0],[2,1],[2,2],[2,3],[2,4],[3,0],[3,1],[3,2],[3,3],[3,4],[4,2],[4,3],[4,4]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20 },
  { lineNum: 5, phase: 'compare', description: 'matrix[4][1]=21 > 20, 排除第 1 列', r: 4, c: 1, result: null, visited: [[0,4],[1,4],[2,4],[2,3],[3,3],[4,3],[4,2],[4,1]], eliminated: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4],[2,0],[2,1],[2,2],[2,3],[2,4],[3,0],[3,1],[3,2],[3,3],[3,4],[4,2],[4,3],[4,4]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20 },
  { lineNum: 8, phase: 'move', description: 'c -= 1 → c=0', r: 4, c: 0, result: null, visited: [[0,4],[1,4],[2,4],[2,3],[3,3],[4,3],[4,2],[4,1]], eliminated: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4],[2,0],[2,1],[2,2],[2,3],[2,4],[3,0],[3,1],[3,2],[3,3],[3,4],[4,1],[4,2],[4,3],[4,4]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20 },
  { lineNum: 5, phase: 'compare', description: 'matrix[4][0]=18 < 20, 排除第 4 行', r: 4, c: 0, result: null, visited: [[0,4],[1,4],[2,4],[2,3],[3,3],[4,3],[4,2],[4,1],[4,0]], eliminated: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4],[2,0],[2,1],[2,2],[2,3],[2,4],[3,0],[3,1],[3,2],[3,3],[3,4],[4,1],[4,2],[4,3],[4,4]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20 },
  { lineNum: 10, phase: 'move', description: 'r += 1 → r=5, r >= rows, 循环结束', r: 5, c: 0, result: null, visited: [[0,4],[1,4],[2,4],[2,3],[3,3],[4,3],[4,2],[4,1],[4,0]], eliminated: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4],[2,0],[2,1],[2,2],[2,3],[2,4],[3,0],[3,1],[3,2],[3,3],[3,4],[4,0],[4,1],[4,2],[4,3],[4,4]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20 },
  { lineNum: 11, phase: 'done', description: '返回 False, target=20 不在矩阵中', r: -1, c: -1, result: false, visited: [[0,4],[1,4],[2,4],[2,3],[3,3],[4,3],[4,2],[4,1],[4,0]], eliminated: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4],[2,0],[2,1],[2,2],[2,3],[2,4],[3,0],[3,1],[3,2],[3,3],[3,4],[4,0],[4,1],[4,2],[4,3],[4,4]], matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20 },
];

const phaseLabels = { init: '初始化', compare: '比较', move: '移动', done: '完成' };

function setupPanel(panel) {
  const m = MATRIX.length, n = MATRIX[0].length;
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">矩阵（从右上角搜索, target = ${TARGET}）</div>
      <div id="matrix-grid" style="display:inline-grid;grid-template-columns:repeat(${n},1fr);gap:3px"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(34,211,238,0.4);border:1px solid #22d3ee"></div>当前位置</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>已搜索</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(248,113,113,0.2);border:1px solid #f87171"></div>已排除</div>
      </div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '240. Search a 2D Matrix II — 执行可视化',
  problemDesc: `
    <p>编写一个高效的算法来搜索 <code>m x n</code> 矩阵 <code>matrix</code> 中的一个目标值 <code>target</code>。每行的元素从左到右升序排列，每列的元素从上到下升序排列。</p>
    <div class="example">输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
输出：true</div>
    <p><strong>提示：</strong>从右上角开始搜索，每次可排除一行或一列。</p>
  `,
  subtitle: 'target = 5',
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'target=5 (找到)', steps: steps1, subtitle: 'target = 5' },
    {
      name: 'target=20 (未找到)', steps: steps2, subtitle: 'target = 20',
      setup(panel) {
        TARGET = 20;
        setupPanel(panel);
      }
    },
  ],

  setup: setupPanel,

  render(s) {
    const matrix = s.matrix || MATRIX;
    const target = s.target || TARGET;
    const isVisited = (r, c) => s.visited.some(p => p[0] === r && p[1] === c);
    const isEliminated = (r, c) => s.eliminated.some(p => p[0] === r && p[1] === c);
    const isCurrent = (r, c) => s.r === r && s.c === c;

    document.getElementById('matrix-grid').innerHTML = matrix.map((row, r) =>
      row.map((val, c) => {
        let bg = 'rgba(255,255,255,0.05)';
        let border = 'rgba(255,255,255,0.1)';
        let color = 'inherit';
        if (isCurrent(r, c) && s.result === true) {
          bg = 'rgba(74,222,128,0.4)'; border = '#4ade80'; color = '#4ade80';
        } else if (isCurrent(r, c)) {
          bg = 'rgba(34,211,238,0.3)'; border = '#22d3ee'; color = '#22d3ee';
        } else if (isVisited(r, c)) {
          bg = 'rgba(74,222,128,0.15)'; border = '#4ade80'; color = '#4ade80';
        } else if (isEliminated(r, c)) {
          bg = 'rgba(248,113,113,0.1)'; border = 'rgba(248,113,113,0.3)'; color = 'rgba(148,163,184,0.4)';
        }
        return `<div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:6px;background:${bg};border:1px solid ${border};color:${color};font-weight:600;font-size:13px;font-family:var(--font-mono)">${val}</div>`;
      }).join('')
    ).join('');

    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      if (s.result) {
        foundEl.innerHTML = `<div class="card found-box">
          <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
          <div>
            <div class="found-text" style="color:#4ade80;font-weight:600">找到目标</div>
            <div class="found-sub" style="margin-top:4px">target = ${target} 在位置 (${s.r}, ${s.c})</div>
          </div>
        </div>`;
      } else {
        foundEl.innerHTML = `<div class="card found-box">
          <div class="found-icon" style="color:#f87171;font-size:22px;font-weight:700">✗</div>
          <div>
            <div class="found-text" style="color:#f87171;font-weight:600">未找到</div>
            <div class="found-sub" style="margin-top:4px">target = ${target} 不在矩阵中</div>
          </div>
        </div>`;
      }
    } else {
      foundEl.innerHTML = '';
    }
  },
};
