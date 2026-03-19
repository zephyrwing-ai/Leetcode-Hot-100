let MATRIX = [[1,2,3],[4,5,6],[7,8,9]];

const code = [
  'class Solution:',
  '    def spiralOrder(self, matrix):',
  '        result = []',
  '        top, bottom = 0, len(matrix) - 1',
  '        left, right = 0, len(matrix[0]) - 1',
  '        while top <= bottom and left <= right:',
  '            for i in range(left, right + 1):',
  '                result.append(matrix[top][i])',
  '            top += 1',
  '            for i in range(top, bottom + 1):',
  '                result.append(matrix[i][right])',
  '            right -= 1',
  '            if top <= bottom:',
  '                for i in range(right, left-1, -1):',
  '                    result.append(matrix[bottom][i])',
  '                bottom -= 1',
  '            if left <= right:',
  '                for i in range(bottom, top-1, -1):',
  '                    result.append(matrix[i][left])',
  '                left += 1',
  '        return result',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19 };

// ── Test Case 1: matrix = [[1,2,3],[4,5,6],[7,8,9]] ──
// Spiral: [1,2,3,6,9,8,7,4,5]

const steps1 = [
  { lineNum: 3, phase: 'init', description: '初始化 result=[], top=0, bottom=2, left=0, right=2', r: -1, c: -1, result: [], visited: [], direction: null, top: 0, bottom: 2, left: 0, right: 2, matrix: [[1,2,3],[4,5,6],[7,8,9]] },
  { lineNum: 5, phase: 'loop', description: '进入 while 循环, top(0)<=bottom(2) 且 left(0)<=right(2)', r: -1, c: -1, result: [], visited: [], direction: 'right', top: 0, bottom: 2, left: 0, right: 2, matrix: [[1,2,3],[4,5,6],[7,8,9]] },
  { lineNum: 6, phase: 'traverse', description: '向右遍历第 0 行: matrix[0][0]=1', r: 0, c: 0, result: [1], visited: [[0,0]], direction: 'right', top: 0, bottom: 2, left: 0, right: 2, matrix: [[1,2,3],[4,5,6],[7,8,9]] },
  { lineNum: 6, phase: 'traverse', description: '向右: matrix[0][1]=2', r: 0, c: 1, result: [1,2], visited: [[0,0],[0,1]], direction: 'right', top: 0, bottom: 2, left: 0, right: 2, matrix: [[1,2,3],[4,5,6],[7,8,9]] },
  { lineNum: 6, phase: 'traverse', description: '向右: matrix[0][2]=3, 第 0 行遍历完毕', r: 0, c: 2, result: [1,2,3], visited: [[0,0],[0,1],[0,2]], direction: 'right', top: 0, bottom: 2, left: 0, right: 2, matrix: [[1,2,3],[4,5,6],[7,8,9]] },
  { lineNum: 8, phase: 'shrink', description: 'top += 1 → top=1, 收缩上边界', r: 0, c: 2, result: [1,2,3], visited: [[0,0],[0,1],[0,2]], direction: 'down', top: 1, bottom: 2, left: 0, right: 2, matrix: [[1,2,3],[4,5,6],[7,8,9]] },
  { lineNum: 9, phase: 'traverse', description: '向下遍历第 2 列: matrix[1][2]=6', r: 1, c: 2, result: [1,2,3,6], visited: [[0,0],[0,1],[0,2],[1,2]], direction: 'down', top: 1, bottom: 2, left: 0, right: 2, matrix: [[1,2,3],[4,5,6],[7,8,9]] },
  { lineNum: 9, phase: 'traverse', description: '向下: matrix[2][2]=9, 第 2 列遍历完毕', r: 2, c: 2, result: [1,2,3,6,9], visited: [[0,0],[0,1],[0,2],[1,2],[2,2]], direction: 'down', top: 1, bottom: 2, left: 0, right: 2, matrix: [[1,2,3],[4,5,6],[7,8,9]] },
  { lineNum: 11, phase: 'shrink', description: 'right -= 1 → right=1, 收缩右边界', r: 2, c: 2, result: [1,2,3,6,9], visited: [[0,0],[0,1],[0,2],[1,2],[2,2]], direction: 'left', top: 1, bottom: 2, left: 0, right: 1, matrix: [[1,2,3],[4,5,6],[7,8,9]] },
  { lineNum: 12, phase: 'check', description: 'top(1)<=bottom(2), 可以向左遍历', r: 2, c: 2, result: [1,2,3,6,9], visited: [[0,0],[0,1],[0,2],[1,2],[2,2]], direction: 'left', top: 1, bottom: 2, left: 0, right: 1, matrix: [[1,2,3],[4,5,6],[7,8,9]] },
  { lineNum: 13, phase: 'traverse', description: '向左遍历第 2 行: matrix[2][1]=8', r: 2, c: 1, result: [1,2,3,6,9,8], visited: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,1]], direction: 'left', top: 1, bottom: 2, left: 0, right: 1, matrix: [[1,2,3],[4,5,6],[7,8,9]] },
  { lineNum: 13, phase: 'traverse', description: '向左: matrix[2][0]=7, 第 2 行遍历完毕', r: 2, c: 0, result: [1,2,3,6,9,8,7], visited: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,1],[2,0]], direction: 'left', top: 1, bottom: 2, left: 0, right: 1, matrix: [[1,2,3],[4,5,6],[7,8,9]] },
  { lineNum: 15, phase: 'shrink', description: 'bottom -= 1 → bottom=1, 收缩下边界', r: 2, c: 0, result: [1,2,3,6,9,8,7], visited: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,1],[2,0]], direction: 'up', top: 1, bottom: 1, left: 0, right: 1, matrix: [[1,2,3],[4,5,6],[7,8,9]] },
  { lineNum: 16, phase: 'check', description: 'left(0)<=right(1), 可以向上遍历', r: 2, c: 0, result: [1,2,3,6,9,8,7], visited: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,1],[2,0]], direction: 'up', top: 1, bottom: 1, left: 0, right: 1, matrix: [[1,2,3],[4,5,6],[7,8,9]] },
  { lineNum: 17, phase: 'traverse', description: '向上遍历第 0 列: matrix[1][0]=4', r: 1, c: 0, result: [1,2,3,6,9,8,7,4], visited: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,1],[2,0],[1,0]], direction: 'up', top: 1, bottom: 1, left: 0, right: 1, matrix: [[1,2,3],[4,5,6],[7,8,9]] },
  { lineNum: 19, phase: 'shrink', description: 'left += 1 → left=1, 收缩左边界', r: 1, c: 0, result: [1,2,3,6,9,8,7,4], visited: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,1],[2,0],[1,0]], direction: 'right', top: 1, bottom: 1, left: 1, right: 1, matrix: [[1,2,3],[4,5,6],[7,8,9]] },
  { lineNum: 5, phase: 'loop', description: '回到 while, top(1)<=bottom(1) 且 left(1)<=right(1), 还剩中心元素', r: -1, c: -1, result: [1,2,3,6,9,8,7,4], visited: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,1],[2,0],[1,0]], direction: 'right', top: 1, bottom: 1, left: 1, right: 1, matrix: [[1,2,3],[4,5,6],[7,8,9]] },
  { lineNum: 6, phase: 'traverse', description: '向右: matrix[1][1]=5, 最后一个元素', r: 1, c: 1, result: [1,2,3,6,9,8,7,4,5], visited: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,1],[2,0],[1,0],[1,1]], direction: 'right', top: 1, bottom: 1, left: 1, right: 1, matrix: [[1,2,3],[4,5,6],[7,8,9]] },
  { lineNum: 20, phase: 'done', description: '循环结束, 返回 result = [1,2,3,6,9,8,7,4,5]', r: -1, c: -1, result: [1,2,3,6,9,8,7,4,5], visited: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,1],[2,0],[1,0],[1,1]], direction: null, top: 2, bottom: 1, left: 1, right: 1, matrix: [[1,2,3],[4,5,6],[7,8,9]] },
];

// ── Test Case 2: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]] ──
// Spiral: [1,2,3,4,8,12,11,10,9,5,6,7]

const steps2 = [
  { lineNum: 3, phase: 'init', description: '初始化 result=[], top=0, bottom=2, left=0, right=3', r: -1, c: -1, result: [], visited: [], direction: null, top: 0, bottom: 2, left: 0, right: 3, matrix: [[1,2,3,4],[5,6,7,8],[9,10,11,12]] },
  { lineNum: 5, phase: 'loop', description: '进入 while 循环', r: -1, c: -1, result: [], visited: [], direction: 'right', top: 0, bottom: 2, left: 0, right: 3, matrix: [[1,2,3,4],[5,6,7,8],[9,10,11,12]] },
  { lineNum: 6, phase: 'traverse', description: '向右遍历第 0 行: 1, 2, 3, 4', r: 0, c: 3, result: [1,2,3,4], visited: [[0,0],[0,1],[0,2],[0,3]], direction: 'right', top: 0, bottom: 2, left: 0, right: 3, matrix: [[1,2,3,4],[5,6,7,8],[9,10,11,12]] },
  { lineNum: 8, phase: 'shrink', description: 'top += 1 → top=1', r: 0, c: 3, result: [1,2,3,4], visited: [[0,0],[0,1],[0,2],[0,3]], direction: 'down', top: 1, bottom: 2, left: 0, right: 3, matrix: [[1,2,3,4],[5,6,7,8],[9,10,11,12]] },
  { lineNum: 9, phase: 'traverse', description: '向下遍历第 3 列: 8, 12', r: 2, c: 3, result: [1,2,3,4,8,12], visited: [[0,0],[0,1],[0,2],[0,3],[1,3],[2,3]], direction: 'down', top: 1, bottom: 2, left: 0, right: 3, matrix: [[1,2,3,4],[5,6,7,8],[9,10,11,12]] },
  { lineNum: 11, phase: 'shrink', description: 'right -= 1 → right=2', r: 2, c: 3, result: [1,2,3,4,8,12], visited: [[0,0],[0,1],[0,2],[0,3],[1,3],[2,3]], direction: 'left', top: 1, bottom: 2, left: 0, right: 2, matrix: [[1,2,3,4],[5,6,7,8],[9,10,11,12]] },
  { lineNum: 13, phase: 'traverse', description: '向左遍历第 2 行: 11, 10, 9', r: 2, c: 0, result: [1,2,3,4,8,12,11,10,9], visited: [[0,0],[0,1],[0,2],[0,3],[1,3],[2,3],[2,2],[2,1],[2,0]], direction: 'left', top: 1, bottom: 2, left: 0, right: 2, matrix: [[1,2,3,4],[5,6,7,8],[9,10,11,12]] },
  { lineNum: 15, phase: 'shrink', description: 'bottom -= 1 → bottom=1', r: 2, c: 0, result: [1,2,3,4,8,12,11,10,9], visited: [[0,0],[0,1],[0,2],[0,3],[1,3],[2,3],[2,2],[2,1],[2,0]], direction: 'up', top: 1, bottom: 1, left: 0, right: 2, matrix: [[1,2,3,4],[5,6,7,8],[9,10,11,12]] },
  { lineNum: 17, phase: 'traverse', description: '向上遍历第 0 列: 5 (只有一个元素)', r: 1, c: 0, result: [1,2,3,4,8,12,11,10,9,5], visited: [[0,0],[0,1],[0,2],[0,3],[1,3],[2,3],[2,2],[2,1],[2,0],[1,0]], direction: 'up', top: 1, bottom: 1, left: 0, right: 2, matrix: [[1,2,3,4],[5,6,7,8],[9,10,11,12]] },
  { lineNum: 19, phase: 'shrink', description: 'left += 1 → left=1', r: 1, c: 0, result: [1,2,3,4,8,12,11,10,9,5], visited: [[0,0],[0,1],[0,2],[0,3],[1,3],[2,3],[2,2],[2,1],[2,0],[1,0]], direction: 'right', top: 1, bottom: 1, left: 1, right: 2, matrix: [[1,2,3,4],[5,6,7,8],[9,10,11,12]] },
  { lineNum: 6, phase: 'traverse', description: '向右遍历剩余: 6, 7', r: 1, c: 2, result: [1,2,3,4,8,12,11,10,9,5,6,7], visited: [[0,0],[0,1],[0,2],[0,3],[1,3],[2,3],[2,2],[2,1],[2,0],[1,0],[1,1],[1,2]], direction: 'right', top: 1, bottom: 1, left: 1, right: 2, matrix: [[1,2,3,4],[5,6,7,8],[9,10,11,12]] },
  { lineNum: 20, phase: 'done', description: '循环结束, 返回 result = [1,2,3,4,8,12,11,10,9,5,6,7]', r: -1, c: -1, result: [1,2,3,4,8,12,11,10,9,5,6,7], visited: [[0,0],[0,1],[0,2],[0,3],[1,3],[2,3],[2,2],[2,1],[2,0],[1,0],[1,1],[1,2]], direction: null, top: 2, bottom: 1, left: 1, right: 2, matrix: [[1,2,3,4],[5,6,7,8],[9,10,11,12]] },
];

const phaseLabels = { init: '初始化', loop: '循环开始', traverse: '遍历', shrink: '收缩边界', check: '边界检查', done: '完成' };

function setupPanel(panel) {
  const m = MATRIX.length, n = MATRIX[0].length;
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">矩阵（螺旋遍历路径）</div>
      <div id="matrix-grid" style="display:inline-grid;grid-template-columns:repeat(${n},1fr);gap:4px"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(34,211,238,0.4);border:1px solid #22d3ee"></div>当前位置</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>已访问</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">螺旋结果 result</div>
      <div class="array-row" id="result-area"></div>
    </div>
    <div class="card" style="font-size:13px;font-family:monospace">
      <span>方向: <b id="dir-val">—</b></span> &nbsp;
      <span>top=<b id="top-val">0</b> bottom=<b id="bottom-val">${m-1}</b> left=<b id="left-val">0</b> right=<b id="right-val">${n-1}</b></span>
    </div>
    <div id="found-area"></div>
  `;
}

const dirLabels = { right: '→ 右', down: '↓ 下', left: '← 左', up: '↑ 上' };

export default {
  title: '54. Spiral Matrix — 执行可视化',
  problemDesc: `
    <p>给你一个 <code>m x n</code> 的矩阵 <code>matrix</code>，请按照顺时针螺旋顺序，返回矩阵中的所有元素。</p>
    <div class="example">输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]</div>
    <p><strong>提示：</strong>模拟螺旋路径，依次遍历右、下、左、上四个方向。</p>
  `,
  subtitle: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]',
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: '3x3 矩阵', steps: steps1, subtitle: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]' },
    {
      name: '3x4 矩阵', steps: steps2, subtitle: 'matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]',
      setup(panel) {
        MATRIX = [[1,2,3,4],[5,6,7,8],[9,10,11,12]];
        setupPanel(panel);
      }
    },
  ],

  setup: setupPanel,

  render(s) {
    const matrix = s.matrix || MATRIX;
    const isVisited = (r, c) => s.visited.some(p => p[0] === r && p[1] === c);
    const isCurrent = (r, c) => s.r === r && s.c === c;

    document.getElementById('matrix-grid').innerHTML = matrix.map((row, r) =>
      row.map((val, c) => {
        let bg = 'rgba(255,255,255,0.05)';
        let border = 'rgba(255,255,255,0.1)';
        let color = 'inherit';
        if (isCurrent(r, c)) {
          bg = 'rgba(34,211,238,0.3)'; border = '#22d3ee'; color = '#22d3ee';
        } else if (isVisited(r, c)) {
          bg = 'rgba(74,222,128,0.2)'; border = '#4ade80'; color = '#4ade80';
        }
        return `<div style="width:48px;height:48px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:${bg};border:1px solid ${border};color:${color};font-weight:700;font-size:16px;font-family:var(--font-mono)">${val}</div>`;
      }).join('')
    ).join('');

    // Result
    document.getElementById('result-area').innerHTML = s.result.map((v, i) =>
      `<div class="arr-cell"><div class="arr-val">${v}</div><div class="arr-idx">[${i}]</div></div>`
    ).join('');

    // Direction & boundaries
    document.getElementById('dir-val').textContent = s.direction ? (dirLabels[s.direction] || s.direction) : '—';
    document.getElementById('top-val').textContent = s.top;
    document.getElementById('bottom-val').textContent = s.bottom;
    document.getElementById('left-val').textContent = s.left;
    document.getElementById('right-val').textContent = s.right;

    // Found
    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">螺旋遍历完成</div>
          <div class="found-sub" style="margin-top:4px">result = [${s.result.join(',')}]</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
