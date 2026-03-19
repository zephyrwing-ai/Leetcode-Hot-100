let MATRIX = [[1,3,5,7],[10,11,16,20],[23,30,34,60]];
let M = 3, N = 4;
let TARGET = 3;

const code = [
  'class Solution:',
  '    def searchMatrix(self, matrix, target):',
  '        m, n = len(matrix), len(matrix[0])',
  '        left, right = 0, m * n - 1',
  '        while left <= right:',
  '            mid = (left + right) // 2',
  '            row, col = mid // n, mid % n',
  '            if matrix[row][col] == target:',
  '                return True',
  '            elif matrix[row][col] < target:',
  '                left = mid + 1',
  '            else:',
  '                right = mid - 1',
  '        return False',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11, 13: 12, 14: 13 };

// ── Test Case 1: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3 ──
const steps1 = [
  {"lineNum":3,"phase":"init","description":"计算维度 m=3, n=4","left":0,"right":11,"mid":null,"midRow":null,"midCol":null,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":3},
  {"lineNum":4,"phase":"init","description":"初始化 left=0, right=11 (3×4-1)，target=3","left":0,"right":11,"mid":null,"midRow":null,"midCol":null,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":3},
  {"lineNum":6,"phase":"calc","description":"进入循环，计算 mid=(0+11)//2=5","left":0,"right":11,"mid":5,"midRow":1,"midCol":1,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":3},
  {"lineNum":7,"phase":"calc","description":"mid=5 → row=5//4=1, col=5%4=1，matrix[1][1]=11","left":0,"right":11,"mid":5,"midRow":1,"midCol":1,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":3},
  {"lineNum":8,"phase":"compare","description":"matrix[1][1]=11 与 target=3 比较","left":0,"right":11,"mid":5,"midRow":1,"midCol":1,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":3},
  {"lineNum":13,"phase":"shrink","description":"11 > 3，收缩右边界 right = mid-1 = 4","left":0,"right":4,"mid":5,"midRow":1,"midCol":1,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":3},
  {"lineNum":6,"phase":"calc","description":"计算 mid=(0+4)//2=2","left":0,"right":4,"mid":2,"midRow":0,"midCol":2,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":3},
  {"lineNum":7,"phase":"calc","description":"mid=2 → row=2//4=0, col=2%4=2，matrix[0][2]=5","left":0,"right":4,"mid":2,"midRow":0,"midCol":2,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":3},
  {"lineNum":8,"phase":"compare","description":"matrix[0][2]=5 与 target=3 比较","left":0,"right":4,"mid":2,"midRow":0,"midCol":2,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":3},
  {"lineNum":13,"phase":"shrink","description":"5 > 3，收缩右边界 right = mid-1 = 1","left":0,"right":1,"mid":2,"midRow":0,"midCol":2,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":3},
  {"lineNum":6,"phase":"calc","description":"计算 mid=(0+1)//2=0","left":0,"right":1,"mid":0,"midRow":0,"midCol":0,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":3},
  {"lineNum":7,"phase":"calc","description":"mid=0 → row=0//4=0, col=0%4=0，matrix[0][0]=1","left":0,"right":1,"mid":0,"midRow":0,"midCol":0,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":3},
  {"lineNum":8,"phase":"compare","description":"matrix[0][0]=1 与 target=3 比较","left":0,"right":1,"mid":0,"midRow":0,"midCol":0,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":3},
  {"lineNum":11,"phase":"shrink","description":"1 < 3，收缩左边界 left = mid+1 = 1","left":1,"right":1,"mid":0,"midRow":0,"midCol":0,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":3},
  {"lineNum":6,"phase":"calc","description":"计算 mid=(1+1)//2=1","left":1,"right":1,"mid":1,"midRow":0,"midCol":1,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":3},
  {"lineNum":7,"phase":"calc","description":"mid=1 → row=1//4=0, col=1%4=1，matrix[0][1]=3","left":1,"right":1,"mid":1,"midRow":0,"midCol":1,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":3},
  {"lineNum":8,"phase":"compare","description":"matrix[0][1]=3 == target=3，找到目标！","left":1,"right":1,"mid":1,"midRow":0,"midCol":1,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":3},
  {"lineNum":9,"phase":"found","description":"返回 True，目标 3 位于 matrix[0][1]","left":1,"right":1,"mid":1,"midRow":0,"midCol":1,"found":true,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":3},
];

// ── Test Case 2: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13 ──
const steps2 = [
  {"lineNum":3,"phase":"init","description":"计算维度 m=3, n=4","left":0,"right":11,"mid":null,"midRow":null,"midCol":null,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":13},
  {"lineNum":4,"phase":"init","description":"初始化 left=0, right=11 (3×4-1)，target=13","left":0,"right":11,"mid":null,"midRow":null,"midCol":null,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":13},
  {"lineNum":6,"phase":"calc","description":"计算 mid=(0+11)//2=5","left":0,"right":11,"mid":5,"midRow":1,"midCol":1,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":13},
  {"lineNum":7,"phase":"calc","description":"mid=5 → row=1, col=1，matrix[1][1]=11","left":0,"right":11,"mid":5,"midRow":1,"midCol":1,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":13},
  {"lineNum":8,"phase":"compare","description":"matrix[1][1]=11 与 target=13 比较","left":0,"right":11,"mid":5,"midRow":1,"midCol":1,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":13},
  {"lineNum":11,"phase":"shrink","description":"11 < 13，收缩左边界 left = mid+1 = 6","left":6,"right":11,"mid":5,"midRow":1,"midCol":1,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":13},
  {"lineNum":6,"phase":"calc","description":"计算 mid=(6+11)//2=8","left":6,"right":11,"mid":8,"midRow":2,"midCol":0,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":13},
  {"lineNum":7,"phase":"calc","description":"mid=8 → row=2, col=0，matrix[2][0]=23","left":6,"right":11,"mid":8,"midRow":2,"midCol":0,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":13},
  {"lineNum":8,"phase":"compare","description":"matrix[2][0]=23 与 target=13 比较","left":6,"right":11,"mid":8,"midRow":2,"midCol":0,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":13},
  {"lineNum":13,"phase":"shrink","description":"23 > 13，收缩右边界 right = mid-1 = 7","left":6,"right":7,"mid":8,"midRow":2,"midCol":0,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":13},
  {"lineNum":6,"phase":"calc","description":"计算 mid=(6+7)//2=6","left":6,"right":7,"mid":6,"midRow":1,"midCol":2,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":13},
  {"lineNum":7,"phase":"calc","description":"mid=6 → row=1, col=2，matrix[1][2]=16","left":6,"right":7,"mid":6,"midRow":1,"midCol":2,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":13},
  {"lineNum":8,"phase":"compare","description":"matrix[1][2]=16 与 target=13 比较","left":6,"right":7,"mid":6,"midRow":1,"midCol":2,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":13},
  {"lineNum":13,"phase":"shrink","description":"16 > 13，收缩右边界 right = mid-1 = 5","left":6,"right":5,"mid":6,"midRow":1,"midCol":2,"found":null,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":13},
  {"lineNum":5,"phase":"notfound","description":"left=6 > right=5，循环结束，target=13 不在矩阵中，返回 False","left":6,"right":5,"mid":null,"midRow":null,"midCol":null,"found":false,"matrix":[[1,3,5,7],[10,11,16,20],[23,30,34,60]],"m":3,"n":4,"target":13},
];

const phaseLabels = { init: '初始化', calc: '计算中点', compare: '比较', shrink: '收缩区间', found: '找到目标', notfound: '未找到' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">矩阵 matrix（展开为一维二分搜索）</div>
      <div id="matrix-grid" style="display:inline-grid;grid-template-columns:repeat(${N},1fr);gap:4px"></div>
      <div id="ptr-info-area" style="margin-top:10px;font-size:13px;font-family:monospace;color:var(--text-muted);display:flex;gap:16px"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>搜索范围内</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(251,146,60,0.4);border:1px solid #fb923c"></div>mid 位置</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(100,116,139,0.25);border:1px solid #64748b"></div>搜索范围外</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '74. Search a 2D Matrix — 执行可视化',
  problemDesc: `
    <p>给你一个满足下述两条属性的 <code>m x n</code> 整数矩阵：每行中的整数从左到右按非递减顺序排列；每行的第一个整数大于前一行的最后一个整数。给定一个整数 <code>target</code>，判断它是否在矩阵中。</p>
    <div class="example">输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
输出：true</div>
  `,
  subtitle: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3',
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'target = 3 (找到)', steps: steps1, subtitle: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3' },
    {
      name: 'target = 13 (未找到)', steps: steps2, subtitle: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13',
      setup(panel) { MATRIX = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]; M = 3; N = 4; TARGET = 13; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const matrix = s.matrix || MATRIX;
    const curM = s.m || M;
    const curN = s.n || N;
    const target = s.target !== undefined ? s.target : TARGET;

    const grid = document.getElementById('matrix-grid');
    grid.style.gridTemplateColumns = `repeat(${curN},1fr)`;
    let html = '';
    for (let r = 0; r < curM; r++) {
      for (let c = 0; c < curN; c++) {
        const flatIdx = r * curN + c;
        const inRange = flatIdx >= s.left && flatIdx <= s.right;
        const isMid = r === s.midRow && c === s.midCol;
        let bg = 'rgba(100,116,139,0.12)';
        let border = '1px solid rgba(100,116,139,0.25)';
        let color = 'var(--text-muted)';
        if (isMid) {
          bg = 'rgba(251,146,60,0.25)';
          border = '2px solid #fb923c';
          color = '#fb923c';
        } else if (inRange) {
          bg = 'rgba(74,222,128,0.12)';
          border = '1px solid rgba(74,222,128,0.4)';
          color = 'var(--text)';
        }
        html += `<div style="background:${bg};border:${border};border-radius:8px;padding:8px 12px;text-align:center;min-width:40px;font-weight:600;color:${color};font-size:14px;position:relative">
          ${matrix[r][c]}
          <div style="font-size:10px;opacity:0.5;margin-top:2px">[${r}][${c}]</div>
        </div>`;
      }
    }
    grid.innerHTML = html;

    const ptrInfo = document.getElementById('ptr-info-area');
    ptrInfo.innerHTML = `
      <span style="color:#4ade80">left = <b>${s.left}</b></span>
      <span style="color:#38bdf8">right = <b>${s.right}</b></span>
      ${s.mid !== null ? `<span style="color:#fb923c">mid = <b>${s.mid}</b> → [${s.midRow}][${s.midCol}]</span>` : ''}
    `;

    const resultEl = document.getElementById('result-area');
    if (s.found === true) {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">找到目标</div>
          <div class="found-sub" style="margin-top:4px">target=${target} 位于 matrix[${s.midRow}][${s.midCol}]</div>
        </div>
      </div>`;
    } else if (s.found === false) {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#ef4444;font-size:22px;font-weight:700">✗</div>
        <div>
          <div class="found-text" style="color:#ef4444;font-weight:600">未找到</div>
          <div class="found-sub" style="margin-top:4px">target=${target} 不在矩阵中，返回 False</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
