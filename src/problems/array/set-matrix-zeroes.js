const code = [
  'class Solution:',
  '    def setZeroes(self, matrix):',
  '        m, n = len(matrix), len(matrix[0])',
  '        rows, cols = set(), set()',
  '        for i in range(m):',
  '            for j in range(n):',
  '                if matrix[i][j] == 0:',
  '                    rows.add(i); cols.add(j)',
  '        for i in range(m):',
  '            for j in range(n):',
  '                if i in rows or j in cols:',
  '                    matrix[i][j] = 0',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10 };

let MATRIX = [[1,1,1],[1,0,1],[1,1,1]];

const steps1 = [
  {"lineNum":2,"phase":"init","description":"初始化 m=3, n=3，rows=∅, cols=∅","matrix":[[1,1,1],[1,0,1],[1,1,1]],"rows":[],"cols":[],"scanI":-1,"scanJ":-1,"zeroI":-1,"zeroJ":-1,"zeroing":false},
  {"lineNum":4,"phase":"mark","description":"开始扫描矩阵，寻找零元素","matrix":[[1,1,1],[1,0,1],[1,1,1]],"rows":[],"cols":[],"scanI":-1,"scanJ":-1,"zeroI":-1,"zeroJ":-1,"zeroing":false},
  {"lineNum":4,"phase":"mark","description":"扫描 (0,0)=1，不为零","matrix":[[1,1,1],[1,0,1],[1,1,1]],"rows":[],"cols":[],"scanI":0,"scanJ":0,"zeroI":-1,"zeroJ":-1,"zeroing":false},
  {"lineNum":4,"phase":"mark","description":"扫描 (0,1)=1，不为零","matrix":[[1,1,1],[1,0,1],[1,1,1]],"rows":[],"cols":[],"scanI":0,"scanJ":1,"zeroI":-1,"zeroJ":-1,"zeroing":false},
  {"lineNum":4,"phase":"mark","description":"扫描 (0,2)=1，不为零","matrix":[[1,1,1],[1,0,1],[1,1,1]],"rows":[],"cols":[],"scanI":0,"scanJ":2,"zeroI":-1,"zeroJ":-1,"zeroing":false},
  {"lineNum":4,"phase":"mark","description":"扫描 (1,0)=1，不为零","matrix":[[1,1,1],[1,0,1],[1,1,1]],"rows":[],"cols":[],"scanI":1,"scanJ":0,"zeroI":-1,"zeroJ":-1,"zeroing":false},
  {"lineNum":6,"phase":"mark","description":"扫描 (1,1)=0，发现零！记录 rows={1}, cols={1}","matrix":[[1,1,1],[1,0,1],[1,1,1]],"rows":[1],"cols":[1],"scanI":1,"scanJ":1,"zeroI":1,"zeroJ":1,"zeroing":false},
  {"lineNum":4,"phase":"mark","description":"扫描 (1,2)=1，不为零","matrix":[[1,1,1],[1,0,1],[1,1,1]],"rows":[1],"cols":[1],"scanI":1,"scanJ":2,"zeroI":-1,"zeroJ":-1,"zeroing":false},
  {"lineNum":4,"phase":"mark","description":"扫描 (2,0)=1，(2,1)=1，(2,2)=1，均不为零","matrix":[[1,1,1],[1,0,1],[1,1,1]],"rows":[1],"cols":[1],"scanI":2,"scanJ":2,"zeroI":-1,"zeroJ":-1,"zeroing":false},
  {"lineNum":7,"phase":"mark","description":"标记阶段完成，rows={1}, cols={1}","matrix":[[1,1,1],[1,0,1],[1,1,1]],"rows":[1],"cols":[1],"scanI":-1,"scanJ":-1,"zeroI":-1,"zeroJ":-1,"zeroing":false},
  {"lineNum":8,"phase":"zero-row","description":"置零行：第1行全部置为0","matrix":[[1,1,1],[0,0,0],[1,1,1]],"rows":[1],"cols":[1],"scanI":-1,"scanJ":-1,"zeroI":-1,"zeroJ":-1,"zeroing":true,"zeroingRows":true,"zeroingCols":false},
  {"lineNum":10,"phase":"zero-col","description":"置零列：第1列全部置为0","matrix":[[1,0,1],[0,0,0],[1,0,1]],"rows":[1],"cols":[1],"scanI":-1,"scanJ":-1,"zeroI":-1,"zeroJ":-1,"zeroing":true,"zeroingRows":false,"zeroingCols":true},
  {"lineNum":10,"phase":"done","description":"完成！矩阵 = [[1,0,1],[0,0,0],[1,0,1]]","matrix":[[1,0,1],[0,0,0],[1,0,1]],"rows":[1],"cols":[1],"scanI":-1,"scanJ":-1,"zeroI":-1,"zeroJ":-1,"zeroing":false}
];

// Test case 2: [[0,1],[1,1]] → [[0,0],[0,1]]
const steps2 = [
  {"lineNum":2,"phase":"init","description":"初始化 m=2, n=2，rows=∅, cols=∅","matrix":[[0,1],[1,1]],"rows":[],"cols":[],"scanI":-1,"scanJ":-1,"zeroI":-1,"zeroJ":-1,"zeroing":false},
  {"lineNum":4,"phase":"mark","description":"开始扫描矩阵","matrix":[[0,1],[1,1]],"rows":[],"cols":[],"scanI":-1,"scanJ":-1,"zeroI":-1,"zeroJ":-1,"zeroing":false},
  {"lineNum":6,"phase":"mark","description":"扫描 (0,0)=0，发现零！记录 rows={0}, cols={0}","matrix":[[0,1],[1,1]],"rows":[0],"cols":[0],"scanI":0,"scanJ":0,"zeroI":0,"zeroJ":0,"zeroing":false},
  {"lineNum":4,"phase":"mark","description":"扫描 (0,1)=1，不为零","matrix":[[0,1],[1,1]],"rows":[0],"cols":[0],"scanI":0,"scanJ":1,"zeroI":-1,"zeroJ":-1,"zeroing":false},
  {"lineNum":4,"phase":"mark","description":"扫描 (1,0)=1，不为零","matrix":[[0,1],[1,1]],"rows":[0],"cols":[0],"scanI":1,"scanJ":0,"zeroI":-1,"zeroJ":-1,"zeroing":false},
  {"lineNum":4,"phase":"mark","description":"扫描 (1,1)=1，不为零","matrix":[[0,1],[1,1]],"rows":[0],"cols":[0],"scanI":1,"scanJ":1,"zeroI":-1,"zeroJ":-1,"zeroing":false},
  {"lineNum":7,"phase":"mark","description":"标记阶段完成，rows={0}, cols={0}","matrix":[[0,1],[1,1]],"rows":[0],"cols":[0],"scanI":-1,"scanJ":-1,"zeroI":-1,"zeroJ":-1,"zeroing":false},
  {"lineNum":8,"phase":"zero-row","description":"置零行：第0行全部置为0","matrix":[[0,0],[1,1]],"rows":[0],"cols":[0],"scanI":-1,"scanJ":-1,"zeroI":-1,"zeroJ":-1,"zeroing":true,"zeroingRows":true,"zeroingCols":false},
  {"lineNum":10,"phase":"zero-col","description":"置零列：第0列全部置为0","matrix":[[0,0],[0,1]],"rows":[0],"cols":[0],"scanI":-1,"scanJ":-1,"zeroI":-1,"zeroJ":-1,"zeroing":true,"zeroingRows":false,"zeroingCols":true},
  {"lineNum":10,"phase":"done","description":"完成！矩阵 = [[0,0],[0,1]]","matrix":[[0,0],[0,1]],"rows":[0],"cols":[0],"scanI":-1,"scanJ":-1,"zeroI":-1,"zeroJ":-1,"zeroing":false}
];

const phaseLabels = { init: '初始化', mark: '标记零', 'zero-row': '置零行', 'zero-col': '置零列', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">矩阵（网格视图）</div>
      <div id="matrix-grid"></div>
      <div id="mark-info" style="margin-top:8px;font-size:13px;font-family:monospace;color:var(--text-muted)"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>扫描位置</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(239,68,68,0.4);border:1px solid #ef4444"></div>零值/将置零</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.3);border:1px solid #4ade80"></div>非零保留</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '73. Set Matrix Zeroes — 执行可视化',
  problemDesc: `
    <p>给定一个 <code>m x n</code> 的矩阵，如果一个元素为 <code>0</code>，则将其所在行和列的所有元素都设为 <code>0</code>，请使用原地算法。</p>
    <div class="example">输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
输出：[[1,0,1],[0,0,0],[1,0,1]]</div>
    <p><strong>提示：</strong>你能使用常数空间复杂度吗？</p>
  `,
  subtitle: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]',
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '3x3矩阵中心零', steps: steps1, subtitle: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]' },
    { name: '2x2矩阵角落零', steps: steps2, subtitle: 'matrix = [[0,1],[1,1]]', setup(panel) { MATRIX = [[0,1],[1,1]]; setupPanel(panel); } },
  ],

  setup: setupPanel,

  render(s) {
    const matrix = s.matrix;
    const m = matrix.length;
    const n = matrix[0].length;

    const gridEl = document.getElementById('matrix-grid');
    let cells = '';
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        const v = matrix[i][j];
        const isScanning = i === s.scanI && j === s.scanJ;
        const isZeroFound = i === s.zeroI && j === s.zeroJ;
        const inZeroRow = s.rows.includes(i);
        const inZeroCol = s.cols.includes(j);
        const willBeZeroed = (inZeroRow || inZeroCol) && s.zeroing;

        let bg = 'rgba(255,255,255,0.05)';
        let border = '1px solid rgba(255,255,255,0.1)';
        let color = 'var(--text-primary, #e2e8f0)';

        if (isScanning) {
          bg = 'rgba(56,189,248,0.3)';
          border = '2px solid #38bdf8';
        } else if (isZeroFound || (v === 0 && s.phase !== 'init')) {
          bg = 'rgba(239,68,68,0.25)';
          border = '2px solid #ef4444';
          color = '#ef4444';
        } else if (willBeZeroed) {
          bg = 'rgba(239,68,68,0.15)';
          border = '1px solid #ef4444';
          color = '#ef4444';
        } else if (s.phase === 'done' && v !== 0) {
          bg = 'rgba(74,222,128,0.12)';
          border = '1px solid #4ade80';
          color = '#4ade80';
        }

        cells += `<div style="display:flex;align-items:center;justify-content:center;
          width:48px;height:48px;border-radius:8px;font-weight:700;font-size:16px;
          background:${bg};border:${border};color:${color};
          transition:all 0.3s ease">${v}</div>`;
      }
    }
    gridEl.innerHTML = `<div style="display:inline-grid;grid-template-columns:repeat(${n},48px);gap:6px">${cells}</div>`;

    document.getElementById('mark-info').innerHTML =
      s.rows.length > 0 || s.cols.length > 0
        ? `<span style="color:#ef4444">rows = {${s.rows.join(',')}}</span> &nbsp; <span style="color:#ef4444">cols = {${s.cols.join(',')}}</span>`
        : '';

    const resultEl = document.getElementById('result-area');
    if (s.phase === 'done') {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">置零完成</div>
          <div class="found-sub" style="margin-top:4px">结果: [${matrix.map(r => '[' + r.join(',') + ']').join(', ')}]</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
