let WORD1 = 'horse';
let WORD2 = 'ros';

const code = [
  'class Solution:',
  '    def minDistance(self, word1, word2):',
  '        m, n = len(word1), len(word2)',
  '        dp = [[0] * (n + 1) for _ in range(m + 1)]',
  '        for i in range(m + 1):',
  '            dp[i][0] = i',
  '        for j in range(n + 1):',
  '            dp[0][j] = j',
  '        for i in range(1, m + 1):',
  '            for j in range(1, n + 1):',
  '                if word1[i-1] == word2[j-1]:',
  '                    dp[i][j] = dp[i-1][j-1]',
  '                else:',
  '                    dp[i][j] = 1 + min(',
  '                        dp[i-1][j],',
  '                        dp[i][j-1],',
  '                        dp[i-1][j-1])',
  '        return dp[m][n]',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 13: 13, 17: 17 };

const steps1 = [
  { lineNum: 2, phase: 'init', description: '初始化 m=5 (horse), n=3 (ros)', word1: 'horse', word2: 'ros', row: -1, col: -1, dp: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], op: null, sources: [] },
  { lineNum: 3, phase: 'init', description: '创建 (m+1)x(n+1) 的 DP 表，全部初始化为 0', word1: 'horse', word2: 'ros', row: -1, col: -1, dp: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], op: null, sources: [] },
  { lineNum: 5, phase: 'base', description: '填充第一列：dp[i][0] = i（删除 i 个字符）', word1: 'horse', word2: 'ros', row: -1, col: 0, dp: [[0,0,0,0],[1,0,0,0],[2,0,0,0],[3,0,0,0],[4,0,0,0],[5,0,0,0]], op: 'delete', sources: [] },
  { lineNum: 7, phase: 'base', description: '填充第一行：dp[0][j] = j（插入 j 个字符）', word1: 'horse', word2: 'ros', row: 0, col: -1, dp: [[0,1,2,3],[1,0,0,0],[2,0,0,0],[3,0,0,0],[4,0,0,0],[5,0,0,0]], op: 'insert', sources: [] },
  { lineNum: 9, phase: 'fill', description: 'i=1,j=1: word1[0]="h" vs word2[0]="r"，不相等', word1: 'horse', word2: 'ros', row: 1, col: 1, dp: [[0,1,2,3],[1,0,0,0],[2,0,0,0],[3,0,0,0],[4,0,0,0],[5,0,0,0]], op: null, sources: [] },
  { lineNum: 13, phase: 'fill', description: 'dp[1][1] = 1+min(dp[0][1],dp[1][0],dp[0][0]) = 1+min(1,1,0) = 1（替换）', word1: 'horse', word2: 'ros', row: 1, col: 1, dp: [[0,1,2,3],[1,1,0,0],[2,0,0,0],[3,0,0,0],[4,0,0,0],[5,0,0,0]], op: 'replace', sources: [[0,0],[0,1],[1,0]] },
  { lineNum: 9, phase: 'fill', description: 'i=1,j=2: "h" vs "o"，不相等', word1: 'horse', word2: 'ros', row: 1, col: 2, dp: [[0,1,2,3],[1,1,0,0],[2,0,0,0],[3,0,0,0],[4,0,0,0],[5,0,0,0]], op: null, sources: [] },
  { lineNum: 13, phase: 'fill', description: 'dp[1][2] = 1+min(2,1,1) = 2（替换）', word1: 'horse', word2: 'ros', row: 1, col: 2, dp: [[0,1,2,3],[1,1,2,0],[2,0,0,0],[3,0,0,0],[4,0,0,0],[5,0,0,0]], op: 'replace', sources: [[0,1],[0,2],[1,1]] },
  { lineNum: 13, phase: 'fill', description: 'dp[1][3] = 1+min(3,2,2) = 3（替换），第 1 行填充完成', word1: 'horse', word2: 'ros', row: 1, col: 3, dp: [[0,1,2,3],[1,1,2,3],[2,0,0,0],[3,0,0,0],[4,0,0,0],[5,0,0,0]], op: 'replace', sources: [[0,2],[0,3],[1,2]] },
  { lineNum: 9, phase: 'fill', description: 'i=2,j=2: word1[1]="o" vs word2[1]="o"，相等！', word1: 'horse', word2: 'ros', row: 2, col: 2, dp: [[0,1,2,3],[1,1,2,3],[2,2,0,0],[3,0,0,0],[4,0,0,0],[5,0,0,0]], op: null, sources: [] },
  { lineNum: 11, phase: 'fill', description: 'dp[2][2] = dp[1][1] = 1（字符相同，无需操作）', word1: 'horse', word2: 'ros', row: 2, col: 2, dp: [[0,1,2,3],[1,1,2,3],[2,2,1,0],[3,0,0,0],[4,0,0,0],[5,0,0,0]], op: 'match', sources: [[1,1]] },
  { lineNum: 9, phase: 'fill', description: 'i=3,j=1: word1[2]="r" vs word2[0]="r"，相等！', word1: 'horse', word2: 'ros', row: 3, col: 1, dp: [[0,1,2,3],[1,1,2,3],[2,2,1,2],[3,0,0,0],[4,0,0,0],[5,0,0,0]], op: null, sources: [] },
  { lineNum: 11, phase: 'fill', description: 'dp[3][1] = dp[2][0] = 2（字符匹配）', word1: 'horse', word2: 'ros', row: 3, col: 1, dp: [[0,1,2,3],[1,1,2,3],[2,2,1,2],[3,2,0,0],[4,0,0,0],[5,0,0,0]], op: 'match', sources: [[2,0]] },
  { lineNum: 13, phase: 'fill', description: 'dp[3][2] = 1+min(1,2,2) = 2（删除）', word1: 'horse', word2: 'ros', row: 3, col: 2, dp: [[0,1,2,3],[1,1,2,3],[2,2,1,2],[3,2,2,0],[4,0,0,0],[5,0,0,0]], op: 'delete', sources: [[2,1],[2,2],[3,1]] },
  { lineNum: 13, phase: 'fill', description: 'dp[3][3] = 1+min(2,2,1) = 2（替换）', word1: 'horse', word2: 'ros', row: 3, col: 3, dp: [[0,1,2,3],[1,1,2,3],[2,2,1,2],[3,2,2,2],[4,0,0,0],[5,0,0,0]], op: 'replace', sources: [[2,2],[2,3],[3,2]] },
  { lineNum: 13, phase: 'fill', description: '第 4 行（s）: dp[4]=[4,3,3,3]', word1: 'horse', word2: 'ros', row: 4, col: 3, dp: [[0,1,2,3],[1,1,2,3],[2,2,1,2],[3,2,2,2],[4,3,3,3],[5,0,0,0]], op: 'replace', sources: [] },
  { lineNum: 13, phase: 'fill', description: '第 5 行（e）: dp[5]=[5,4,4,3]', word1: 'horse', word2: 'ros', row: 5, col: 3, dp: [[0,1,2,3],[1,1,2,3],[2,2,1,2],[3,2,2,2],[4,3,3,3],[5,4,4,3]], op: 'replace', sources: [] },
  { lineNum: 17, phase: 'done', description: '返回 dp[5][3] = 3，最少需要 3 次编辑操作', word1: 'horse', word2: 'ros', row: 5, col: 3, dp: [[0,1,2,3],[1,1,2,3],[2,2,1,2],[3,2,2,2],[4,3,3,3],[5,4,4,3]], op: null, sources: [] },
];

const steps2 = [
  { lineNum: 2, phase: 'init', description: '初始化 m=9 (intention), n=9 (execution)', word1: 'intention', word2: 'execution', row: -1, col: -1, dp: Array.from({length:10}, ()=>Array(10).fill(0)), op: null, sources: [] },
  { lineNum: 5, phase: 'base', description: '填充第一列：dp[i][0] = i', word1: 'intention', word2: 'execution', row: -1, col: 0, dp: (() => { const d=Array.from({length:10},()=>Array(10).fill(0)); for(let i=0;i<10;i++)d[i][0]=i; return d; })(), op: 'delete', sources: [] },
  { lineNum: 7, phase: 'base', description: '填充第一行：dp[0][j] = j', word1: 'intention', word2: 'execution', row: 0, col: -1, dp: (() => { const d=Array.from({length:10},()=>Array(10).fill(0)); for(let i=0;i<10;i++){d[i][0]=i;d[0][i]=i;} return d; })(), op: 'insert', sources: [] },
  { lineNum: 9, phase: 'fill', description: 'i=1,j=1: "i" vs "e"，不相等，dp[1][1]=1+min(1,1,0)=1', word1: 'intention', word2: 'execution', row: 1, col: 1, dp: (() => { const d=Array.from({length:10},()=>Array(10).fill(0)); for(let i=0;i<10;i++){d[i][0]=i;d[0][i]=i;} d[1][1]=1; return d; })(), op: 'replace', sources: [[0,0],[0,1],[1,0]] },
  { lineNum: 9, phase: 'fill', description: 'i=2,j=5: "n" vs "u"，不相等，继续填表...', word1: 'intention', word2: 'execution', row: 2, col: 5, dp: (() => { const d=[[0,1,2,3,4,5,6,7,8,9],[1,1,2,3,4,5,6,7,8,9],[2,2,2,3,4,5,5,6,7,8],[3,3,3,3,4,4,5,6,7,8],[4,4,3,4,3,4,5,6,7,8],[5,5,4,4,4,3,4,5,6,7],[6,6,5,5,5,4,3,4,5,6],[7,7,6,6,6,5,4,4,5,6],[8,8,7,7,7,6,5,5,5,6],[9,9,8,8,7,7,6,6,5,5]]; return d; })(), op: 'replace', sources: [] },
  { lineNum: 9, phase: 'fill', description: 'i=4,j=4: "n" vs "c"→不等; i=5,j=5: "t" vs "t"→匹配！', word1: 'intention', word2: 'execution', row: 5, col: 5, dp: [[0,1,2,3,4,5,6,7,8,9],[1,1,2,3,4,5,6,7,8,9],[2,2,2,3,4,5,5,6,7,8],[3,3,3,3,4,4,5,6,7,8],[4,4,3,4,3,4,5,6,7,8],[5,5,4,4,4,3,4,5,6,7],[6,6,5,5,5,4,3,4,5,6],[7,7,6,6,6,5,4,4,5,6],[8,8,7,7,7,6,5,5,5,6],[9,9,8,8,7,7,6,6,5,5]], op: 'match', sources: [[4,4]] },
  { lineNum: 9, phase: 'fill', description: 'i=6,j=6: "i" vs "i"→匹配！dp[6][6]=dp[5][5]=3', word1: 'intention', word2: 'execution', row: 6, col: 6, dp: [[0,1,2,3,4,5,6,7,8,9],[1,1,2,3,4,5,6,7,8,9],[2,2,2,3,4,5,5,6,7,8],[3,3,3,3,4,4,5,6,7,8],[4,4,3,4,3,4,5,6,7,8],[5,5,4,4,4,3,4,5,6,7],[6,6,5,5,5,4,3,4,5,6],[7,7,6,6,6,5,4,4,5,6],[8,8,7,7,7,6,5,5,5,6],[9,9,8,8,7,7,6,6,5,5]], op: 'match', sources: [[5,5]] },
  { lineNum: 9, phase: 'fill', description: 'i=8,j=8: "o" vs "o"→匹配！dp[8][8]=dp[7][7]=4', word1: 'intention', word2: 'execution', row: 8, col: 8, dp: [[0,1,2,3,4,5,6,7,8,9],[1,1,2,3,4,5,6,7,8,9],[2,2,2,3,4,5,5,6,7,8],[3,3,3,3,4,4,5,6,7,8],[4,4,3,4,3,4,5,6,7,8],[5,5,4,4,4,3,4,5,6,7],[6,6,5,5,5,4,3,4,5,6],[7,7,6,6,6,5,4,4,5,6],[8,8,7,7,7,6,5,5,5,6],[9,9,8,8,7,7,6,6,5,5]], op: 'match', sources: [[7,7]] },
  { lineNum: 9, phase: 'fill', description: 'i=9,j=9: "n" vs "n"→匹配！dp[9][9]=dp[8][8]=5', word1: 'intention', word2: 'execution', row: 9, col: 9, dp: [[0,1,2,3,4,5,6,7,8,9],[1,1,2,3,4,5,6,7,8,9],[2,2,2,3,4,5,5,6,7,8],[3,3,3,3,4,4,5,6,7,8],[4,4,3,4,3,4,5,6,7,8],[5,5,4,4,4,3,4,5,6,7],[6,6,5,5,5,4,3,4,5,6],[7,7,6,6,6,5,4,4,5,6],[8,8,7,7,7,6,5,5,5,6],[9,9,8,8,7,7,6,6,5,5]], op: 'match', sources: [[8,8]] },
  { lineNum: 17, phase: 'done', description: '返回 dp[9][9] = 5，最少需要 5 次编辑操作', word1: 'intention', word2: 'execution', row: 9, col: 9, dp: [[0,1,2,3,4,5,6,7,8,9],[1,1,2,3,4,5,6,7,8,9],[2,2,2,3,4,5,5,6,7,8],[3,3,3,3,4,4,5,6,7,8],[4,4,3,4,3,4,5,6,7,8],[5,5,4,4,4,3,4,5,6,7],[6,6,5,5,5,4,3,4,5,6],[7,7,6,6,6,5,4,4,5,6],[8,8,7,7,7,6,5,5,5,6],[9,9,8,8,7,7,6,6,5,5]], op: null, sources: [] },
];

const phaseLabels = { init: '初始化', base: '基础情况', fill: '填表', done: '完成' };

function setupPanel(panel) {
  const w1 = WORD1.split('');
  const w2 = WORD2.split('');
  const colHeaders = ['', ...w2].map(c => `<th>${c}</th>`).join('');
  const rowLabels = ['', ...w1];
  const rows = rowLabels.map((ch, i) =>
    `<tr><th>${ch}</th>${Array(w2.length + 1).fill(0).map((_, j) =>
      `<td id="dp-${i}-${j}" class="hashmap-row">0</td>`).join('')}</tr>`
  ).join('');
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">DP 表（行=word1，列=word2，绿色=当前，黄色=来源）</div>
      <table class="hashmap-table" id="dp-table">
        <thead><tr><th></th>${colHeaders}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>当前单元格</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(250,204,21,0.4);border:1px solid #facc15"></div>来源单元格</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>字符匹配</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '72. Edit Distance — 执行可视化',
  problemDesc: `
    <p>给你两个单词 <code>word1</code> 和 <code>word2</code>，请返回将 <code>word1</code> 转换成 <code>word2</code> 所使用的最少操作数。你可以对一个单词进行三种操作：插入、删除、替换一个字符。</p>
    <div class="example">输入：word1 = "horse", word2 = "ros"
输出：3
解释：horse → rorse（替换h→r）→ ros e（删除r）→ ros（删除e）</div>
  `,
  subtitle: `word1 = "${WORD1}", word2 = "${WORD2}"`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '"horse"→"ros"，基础案例', steps: steps1, subtitle: 'word1 = "horse", word2 = "ros"' },
    { name: '"intention"→"execution"，较长字符串', steps: steps2, subtitle: 'word1 = "intention", word2 = "execution"', setup(panel) { WORD1 = 'intention'; WORD2 = 'execution'; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const word1 = s.word1 || WORD1;
    const word2 = s.word2 || WORD2;
    const m = word1.length, n = word2.length;
    const dp = s.dp || [];
    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        const el = document.getElementById(`dp-${i}-${j}`);
        if (!el) continue;
        el.textContent = dp[i] ? dp[i][j] : 0;
        el.className = 'hashmap-row';
        if (i === s.row && j === s.col) el.classList.add('current');
        if (s.sources.some(([r, c]) => r === i && c === j)) el.classList.add('in-window');
        if (s.op === 'match' && i === s.row && j === s.col) el.classList.add('is-active');
      }
    }
    const resultEl = document.getElementById('result-area');
    if (s.phase === 'done') {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">编辑距离 = ${dp[m][n]}</div>
          <div class="found-sub">"${word1}" → "${word2}" 最少需要 ${dp[m][n]} 次操作</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
