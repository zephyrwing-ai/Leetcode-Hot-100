let MATRIX = [[1,2,3],[4,5,6],[7,8,9]];

const code = [
  'class Solution:',
  '    def rotate(self, matrix):',
  '        n=len(matrix)',
  '        for i in range(n):',
  '            for j in range(i+1,n):',
  '                matrix[i][j],matrix[j][i]=matrix[j][i],matrix[i][j]',
  '        for i in range(n):',
  '            matrix[i].reverse()',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7 };

const steps1 = [
  {"lineNum":3,"phase":"init","description":"初始化 n=3，准备处理 3×3 矩阵","matrix":[[1,2,3],[4,5,6],[7,8,9]],"swapCells":null,"currentPhase":"original","highlightRow":-1,"done":false},
  {"lineNum":4,"phase":"transpose","description":"开始转置阶段：沿主对角线交换元素","matrix":[[1,2,3],[4,5,6],[7,8,9]],"swapCells":null,"currentPhase":"transpose","highlightRow":-1,"done":false},
  {"lineNum":5,"phase":"transpose","description":"i=0, j=1: 准备交换 matrix[0][1]=2 和 matrix[1][0]=4","matrix":[[1,2,3],[4,5,6],[7,8,9]],"swapCells":[[0,1],[1,0]],"currentPhase":"transpose","highlightRow":-1,"done":false},
  {"lineNum":5,"phase":"transpose","description":"交换完成: matrix[0][1]=4, matrix[1][0]=2","matrix":[[1,4,3],[2,5,6],[7,8,9]],"swapCells":[[0,1],[1,0]],"currentPhase":"transpose","highlightRow":-1,"done":false},
  {"lineNum":5,"phase":"transpose","description":"i=0, j=2: 准备交换 matrix[0][2]=3 和 matrix[2][0]=7","matrix":[[1,4,3],[2,5,6],[7,8,9]],"swapCells":[[0,2],[2,0]],"currentPhase":"transpose","highlightRow":-1,"done":false},
  {"lineNum":5,"phase":"transpose","description":"交换完成: matrix[0][2]=7, matrix[2][0]=3","matrix":[[1,4,7],[2,5,6],[3,8,9]],"swapCells":[[0,2],[2,0]],"currentPhase":"transpose","highlightRow":-1,"done":false},
  {"lineNum":5,"phase":"transpose","description":"i=1, j=2: 准备交换 matrix[1][2]=6 和 matrix[2][1]=8","matrix":[[1,4,7],[2,5,6],[3,8,9]],"swapCells":[[1,2],[2,1]],"currentPhase":"transpose","highlightRow":-1,"done":false},
  {"lineNum":5,"phase":"transpose","description":"交换完成: matrix[1][2]=8, matrix[2][1]=6","matrix":[[1,4,7],[2,5,8],[3,6,9]],"swapCells":[[1,2],[2,1]],"currentPhase":"transpose","highlightRow":-1,"done":false},
  {"lineNum":6,"phase":"transpose","description":"转置完成！矩阵已沿主对角线翻转","matrix":[[1,4,7],[2,5,8],[3,6,9]],"swapCells":null,"currentPhase":"transpose-done","highlightRow":-1,"done":false},
  {"lineNum":8,"phase":"reverse","description":"开始逐行翻转阶段","matrix":[[1,4,7],[2,5,8],[3,6,9]],"swapCells":null,"currentPhase":"reverse","highlightRow":-1,"done":false},
  {"lineNum":8,"phase":"reverse","description":"翻转第 0 行: [1,4,7] → [7,4,1]","matrix":[[7,4,1],[2,5,8],[3,6,9]],"swapCells":[[0,0],[0,2]],"currentPhase":"reverse","highlightRow":0,"done":false},
  {"lineNum":8,"phase":"reverse","description":"翻转第 1 行: [2,5,8] → [8,5,2]","matrix":[[7,4,1],[8,5,2],[3,6,9]],"swapCells":[[1,0],[1,2]],"currentPhase":"reverse","highlightRow":1,"done":false},
  {"lineNum":8,"phase":"reverse","description":"翻转第 2 行: [3,6,9] → [9,6,3]","matrix":[[7,4,1],[8,5,2],[9,6,3]],"swapCells":[[2,0],[2,2]],"currentPhase":"reverse","highlightRow":2,"done":false},
  {"lineNum":8,"phase":"done","description":"旋转完成！矩阵顺时针旋转 90°","matrix":[[7,4,1],[8,5,2],[9,6,3]],"swapCells":null,"currentPhase":"done","highlightRow":-1,"done":true}
];

const steps2 = [
  {"lineNum":3,"phase":"init","description":"初始化 n=3，准备处理 3×3 矩阵","matrix":[[5,1,9],[11,2,4],[8,10,6]],"swapCells":null,"currentPhase":"original","highlightRow":-1,"done":false},
  {"lineNum":4,"phase":"transpose","description":"开始转置阶段：沿主对角线交换元素","matrix":[[5,1,9],[11,2,4],[8,10,6]],"swapCells":null,"currentPhase":"transpose","highlightRow":-1,"done":false},
  {"lineNum":5,"phase":"transpose","description":"i=0, j=1: 准备交换 matrix[0][1]=1 和 matrix[1][0]=11","matrix":[[5,1,9],[11,2,4],[8,10,6]],"swapCells":[[0,1],[1,0]],"currentPhase":"transpose","highlightRow":-1,"done":false},
  {"lineNum":5,"phase":"transpose","description":"交换完成: matrix[0][1]=11, matrix[1][0]=1","matrix":[[5,11,9],[1,2,4],[8,10,6]],"swapCells":[[0,1],[1,0]],"currentPhase":"transpose","highlightRow":-1,"done":false},
  {"lineNum":5,"phase":"transpose","description":"i=0, j=2: 准备交换 matrix[0][2]=9 和 matrix[2][0]=8","matrix":[[5,11,9],[1,2,4],[8,10,6]],"swapCells":[[0,2],[2,0]],"currentPhase":"transpose","highlightRow":-1,"done":false},
  {"lineNum":5,"phase":"transpose","description":"交换完成: matrix[0][2]=8, matrix[2][0]=9","matrix":[[5,11,8],[1,2,4],[9,10,6]],"swapCells":[[0,2],[2,0]],"currentPhase":"transpose","highlightRow":-1,"done":false},
  {"lineNum":5,"phase":"transpose","description":"i=1, j=2: 准备交换 matrix[1][2]=4 和 matrix[2][1]=10","matrix":[[5,11,8],[1,2,4],[9,10,6]],"swapCells":[[1,2],[2,1]],"currentPhase":"transpose","highlightRow":-1,"done":false},
  {"lineNum":5,"phase":"transpose","description":"交换完成: matrix[1][2]=10, matrix[2][1]=4","matrix":[[5,11,8],[1,2,10],[9,4,6]],"swapCells":[[1,2],[2,1]],"currentPhase":"transpose","highlightRow":-1,"done":false},
  {"lineNum":6,"phase":"transpose","description":"转置完成！矩阵已沿主对角线翻转","matrix":[[5,11,8],[1,2,10],[9,4,6]],"swapCells":null,"currentPhase":"transpose-done","highlightRow":-1,"done":false},
  {"lineNum":8,"phase":"reverse","description":"翻转第 0 行: [5,11,8] → [8,11,5]","matrix":[[8,11,5],[1,2,10],[9,4,6]],"swapCells":[[0,0],[0,2]],"currentPhase":"reverse","highlightRow":0,"done":false},
  {"lineNum":8,"phase":"reverse","description":"翻转第 1 行: [1,2,10] → [10,2,1]","matrix":[[8,11,5],[10,2,1],[9,4,6]],"swapCells":[[1,0],[1,2]],"currentPhase":"reverse","highlightRow":1,"done":false},
  {"lineNum":8,"phase":"reverse","description":"翻转第 2 行: [9,4,6] → [6,4,9]","matrix":[[8,11,5],[10,2,1],[6,4,9]],"swapCells":[[2,0],[2,2]],"currentPhase":"reverse","highlightRow":2,"done":false},
  {"lineNum":8,"phase":"done","description":"旋转完成！矩阵顺时针旋转 90°","matrix":[[8,11,5],[10,2,1],[6,4,9]],"swapCells":null,"currentPhase":"done","highlightRow":-1,"done":true}
];

const phaseLabels = { init: '初始化', transpose: '转置', reverse: '翻转行', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">矩阵（先转置，再逐行翻转）</div>
      <div id="matrix-area" style="display:inline-grid;gap:4px"></div>
      <div class="legend-row" style="margin-top:10px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(245,158,11,0.4);border:1px solid #f59e0b"></div>正在交换</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>当前行</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">操作步骤</div>
      <div id="step-info" style="font-size:13px;color:var(--text-muted)">
        <div>第一步: 沿主对角线转置</div>
        <div>第二步: 每行左右翻转</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '48. Rotate Image — 执行可视化',
  problemDesc: `
    <p>给定一个 <code>n x n</code> 的二维矩阵 <code>matrix</code> 表示一个图像，请你将图像顺时针旋转 90 度。必须在原地旋转，不能使用额外矩阵。</p>
    <div class="example">输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[[7,4,1],[8,5,2],[9,6,3]]</div>
    <p><strong>提示：</strong>先转置矩阵，再逐行翻转即可实现顺时针旋转。</p>
  `,
  subtitle: 'matrix 3×3 → 顺时针旋转 90°',
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '3×3 基础矩阵', steps: steps1, subtitle: '[[1,2,3],[4,5,6],[7,8,9]] → 旋转 90°' },
    { name: '3×3 不规则矩阵', steps: steps2, subtitle: '[[5,1,9],[11,2,4],[8,10,6]] → 旋转 90°', setup(panel) { MATRIX = [[5,1,9],[11,2,4],[8,10,6]]; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const matrix = s.matrix;
    const n = matrix.length;
    const matrixEl = document.getElementById('matrix-area');
    matrixEl.style.gridTemplateColumns = `repeat(${n}, 1fr)`;

    let html = '';
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        let cls = 'arr-cell';
        let style = 'width:48px;height:48px;display:flex;align-items:center;justify-content:center;';
        const isSwap = s.swapCells && s.swapCells.some(c => c[0] === i && c[1] === j);
        const isHighlightRow = s.highlightRow === i;

        if (isSwap) {
          style += 'background:rgba(245,158,11,0.25);border-color:#f59e0b;';
          cls += ' current';
        } else if (isHighlightRow) {
          style += 'background:rgba(56,189,248,0.15);border-color:#38bdf8;';
          cls += ' in-window';
        }

        // Diagonal highlight during transpose
        if (s.currentPhase === 'transpose' && i === j) {
          style += 'background:rgba(168,85,247,0.15);border-color:#a855f7;';
        }

        html += `<div class="${cls}" style="${style}"><div class="arr-val">${matrix[i][j]}</div></div>`;
      }
    }
    matrixEl.innerHTML = html;

    // Step info
    const stepEl = document.getElementById('step-info');
    if (s.currentPhase === 'transpose' || s.currentPhase === 'transpose-done') {
      stepEl.innerHTML = '<div style="color:#a855f7;font-weight:600">第一步: 沿主对角线转置 ↗</div>';
    } else if (s.currentPhase === 'reverse') {
      stepEl.innerHTML = '<div style="color:#38bdf8;font-weight:600">第二步: 每行左右翻转 ↔</div>';
    } else if (s.currentPhase === 'done') {
      stepEl.innerHTML = '<div style="color:#4ade80;font-weight:600">两步操作完成，矩阵已旋转 90°</div>';
    }

    // Result
    const resultEl = document.getElementById('result-area');
    if (s.done) {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">✓</div>
        <div>
          <div class="found-text">旋转完成</div>
          <div class="found-sub">矩阵已顺时针旋转 90°</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
