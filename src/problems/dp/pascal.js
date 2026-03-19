let NUM_ROWS = 5;

const code = [
  'class Solution:',
  '    def generate(self, numRows):',
  '        triangle = []',
  '        for i in range(numRows):',
  '            row = [1] * (i + 1)',
  '            for j in range(1, i):',
  '                row[j] = triangle[i-1][j-1] + triangle[i-1][j]',
  '            triangle.append(row)',
  '        return triangle',
];

const lineMap = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8 };

const steps1 = [
  {
    lineNum: 3, phase: 'init',
    description: '初始化空三角形 triangle = []',
    numRows: 5, triangle: [], currentRow: -1, currentCol: -1, sources: [],
  },
  {
    lineNum: 5, phase: 'fill',
    description: 'i=0: 创建 row = [1]，第 0 行只有 1 个元素',
    numRows: 5, triangle: [[1]], currentRow: 0, currentCol: 0, sources: [],
  },
  {
    lineNum: 5, phase: 'fill',
    description: 'i=1: 创建 row = [1, 1]，第 1 行有 2 个元素',
    numRows: 5, triangle: [[1], [1, 1]], currentRow: 1, currentCol: -1, sources: [],
  },
  {
    lineNum: 5, phase: 'fill',
    description: 'i=2: 创建 row = [1, 1, 1]，准备填充中间值',
    numRows: 5, triangle: [[1], [1, 1], [1, 1, 1]], currentRow: 2, currentCol: -1, sources: [],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=2, j=1: row[1] = triangle[1][0] + triangle[1][1] = 1 + 1 = 2',
    numRows: 5, triangle: [[1], [1, 1], [1, 2, 1]], currentRow: 2, currentCol: 1, sources: [{r:1,c:0},{r:1,c:1}],
  },
  {
    lineNum: 5, phase: 'fill',
    description: 'i=3: 创建 row = [1, 1, 1, 1]，准备填充中间值',
    numRows: 5, triangle: [[1], [1, 1], [1, 2, 1], [1, 1, 1, 1]], currentRow: 3, currentCol: -1, sources: [],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=3, j=1: row[1] = triangle[2][0] + triangle[2][1] = 1 + 2 = 3',
    numRows: 5, triangle: [[1], [1, 1], [1, 2, 1], [1, 3, 1, 1]], currentRow: 3, currentCol: 1, sources: [{r:2,c:0},{r:2,c:1}],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=3, j=2: row[2] = triangle[2][1] + triangle[2][2] = 2 + 1 = 3',
    numRows: 5, triangle: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]], currentRow: 3, currentCol: 2, sources: [{r:2,c:1},{r:2,c:2}],
  },
  {
    lineNum: 5, phase: 'fill',
    description: 'i=4: 创建 row = [1, 1, 1, 1, 1]，准备填充中间值',
    numRows: 5, triangle: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 1, 1, 1, 1]], currentRow: 4, currentCol: -1, sources: [],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=4, j=1: row[1] = triangle[3][0] + triangle[3][1] = 1 + 3 = 4',
    numRows: 5, triangle: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 1, 1, 1]], currentRow: 4, currentCol: 1, sources: [{r:3,c:0},{r:3,c:1}],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=4, j=2: row[2] = triangle[3][1] + triangle[3][2] = 3 + 3 = 6',
    numRows: 5, triangle: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 1, 1]], currentRow: 4, currentCol: 2, sources: [{r:3,c:1},{r:3,c:2}],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=4, j=3: row[3] = triangle[3][2] + triangle[3][3] = 3 + 1 = 4',
    numRows: 5, triangle: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]], currentRow: 4, currentCol: 3, sources: [{r:3,c:2},{r:3,c:3}],
  },
  {
    lineNum: 9, phase: 'done',
    description: '返回完整的杨辉三角，共 5 行',
    numRows: 5, triangle: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]], currentRow: -1, currentCol: -1, sources: [],
  },
];

// Test case 2: numRows = 6
const steps2 = [
  {
    lineNum: 3, phase: 'init',
    description: '初始化空三角形 triangle = []，numRows = 6',
    numRows: 6, triangle: [], currentRow: -1, currentCol: -1, sources: [],
  },
  {
    lineNum: 5, phase: 'fill',
    description: 'i=0: row = [1]',
    numRows: 6, triangle: [[1]], currentRow: 0, currentCol: 0, sources: [],
  },
  {
    lineNum: 5, phase: 'fill',
    description: 'i=1: row = [1, 1]',
    numRows: 6, triangle: [[1], [1, 1]], currentRow: 1, currentCol: -1, sources: [],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=2, j=1: row[1] = 1 + 1 = 2',
    numRows: 6, triangle: [[1], [1, 1], [1, 2, 1]], currentRow: 2, currentCol: 1, sources: [{r:1,c:0},{r:1,c:1}],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=3, j=1: 1+2=3; j=2: 2+1=3',
    numRows: 6, triangle: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]], currentRow: 3, currentCol: 2, sources: [{r:2,c:1},{r:2,c:2}],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=4, j=1: 1+3=4; j=2: 3+3=6; j=3: 3+1=4',
    numRows: 6, triangle: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]], currentRow: 4, currentCol: 3, sources: [{r:3,c:2},{r:3,c:3}],
  },
  {
    lineNum: 5, phase: 'fill',
    description: 'i=5: 创建 row = [1, 1, 1, 1, 1, 1]，准备填充中间值',
    numRows: 6, triangle: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 1, 1, 1, 1, 1]], currentRow: 5, currentCol: -1, sources: [],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=5, j=1: row[1] = triangle[4][0] + triangle[4][1] = 1 + 4 = 5',
    numRows: 6, triangle: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 1, 1, 1, 1]], currentRow: 5, currentCol: 1, sources: [{r:4,c:0},{r:4,c:1}],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=5, j=2: row[2] = triangle[4][1] + triangle[4][2] = 4 + 6 = 10',
    numRows: 6, triangle: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 1, 1, 1]], currentRow: 5, currentCol: 2, sources: [{r:4,c:1},{r:4,c:2}],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=5, j=3: row[3] = triangle[4][2] + triangle[4][3] = 6 + 4 = 10',
    numRows: 6, triangle: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 1, 1]], currentRow: 5, currentCol: 3, sources: [{r:4,c:2},{r:4,c:3}],
  },
  {
    lineNum: 7, phase: 'fill',
    description: 'i=5, j=4: row[4] = triangle[4][3] + triangle[4][4] = 4 + 1 = 5',
    numRows: 6, triangle: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 5, 1]], currentRow: 5, currentCol: 4, sources: [{r:4,c:3},{r:4,c:4}],
  },
  {
    lineNum: 9, phase: 'done',
    description: '返回完整的杨辉三角，共 6 行，最后一行: [1,5,10,10,5,1]',
    numRows: 6, triangle: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 5, 1]], currentRow: -1, currentCol: -1, sources: [],
  },
];

const phaseLabels = { init: '初始化', fill: '逐行构建', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">杨辉三角（青色 = 当前填充，绿色 = 来源参考）</div>
      <div id="triangle-area" style="display:flex;flex-direction:column;align-items:center;gap:4px"></div>
      <div class="legend-row">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(34,211,238,0.4);border:1px solid #22d3ee"></div>当前填充</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>来源参考</div>
      </div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '118. Pascal\'s Triangle — 执行可视化',
  problemDesc: `
    <p>给定一个非负整数 <code>numRows</code>，生成「杨辉三角」的前 <code>numRows</code> 行。在杨辉三角中，每个数是它左上方和右上方的数之和。</p>
    <div class="example">输入：numRows = 5
输出：[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]</div>
    <p>提示：<code>1 <= numRows <= 30</code></p>
  `,
  subtitle: `numRows = ${NUM_ROWS}`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: 'numRows = 5', steps: steps1, subtitle: 'numRows = 5' },
    { name: 'numRows = 6', steps: steps2, subtitle: 'numRows = 6', setup(panel) { NUM_ROWS = 6; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const numRows = s.numRows || NUM_ROWS;
    const area = document.getElementById('triangle-area');
    const srcSet = new Set(s.sources.map(p => `${p.r},${p.c}`));
    area.innerHTML = s.triangle.map((row, r) => {
      const cells = row.map((v, c) => {
        let cls = 'arr-cell';
        if (r === s.currentRow && c === s.currentCol) cls += ' current';
        if (srcSet.has(`${r},${c}`)) cls += ' in-window';
        return `<div class="${cls}"><div class="arr-val">${v}</div></div>`;
      }).join('');
      return `<div class="array-row" style="justify-content:center">${cells}</div>`;
    }).join('');

    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      const lastRow = s.triangle[s.triangle.length - 1];
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">杨辉三角构建完成</div>
          <div class="found-sub">共 ${numRows} 行，最后一行: [${lastRow}]</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
