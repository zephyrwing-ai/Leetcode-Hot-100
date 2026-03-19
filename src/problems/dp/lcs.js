let TEXT1 = 'abcde';
let TEXT2 = 'ace';

const code = [
  'class Solution:',
  '    def longestCommonSubsequence(self, text1, text2):',
  '        m, n = len(text1), len(text2)',
  '        dp = [[0] * (n + 1) for _ in range(m + 1)]',
  '        for i in range(1, m + 1):',
  '            for j in range(1, n + 1):',
  '                if text1[i-1] == text2[j-1]:',
  '                    dp[i][j] = dp[i-1][j-1] + 1',
  '                else:',
  '                    dp[i][j] = max(dp[i-1][j], dp[i][j-1])',
  '        return dp[m][n]',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 9: 9, 10: 10 };

const steps1 = [
  { lineNum: 2, phase: 'init', description: '初始化 m=5 (abcde), n=3 (ace)', text1: 'abcde', text2: 'ace', row: -1, col: -1, dp: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], sources: [], isMatch: false },
  { lineNum: 3, phase: 'init', description: '创建 (m+1)x(n+1) DP 表，全部初始化为 0', text1: 'abcde', text2: 'ace', row: -1, col: -1, dp: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], sources: [], isMatch: false },
  { lineNum: 6, phase: 'fill', description: 'i=1,j=1: text1[0]="a" == text2[0]="a"，匹配！', text1: 'abcde', text2: 'ace', row: 1, col: 1, dp: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], sources: [], isMatch: true },
  { lineNum: 7, phase: 'fill', description: 'dp[1][1] = dp[0][0] + 1 = 1', text1: 'abcde', text2: 'ace', row: 1, col: 1, dp: [[0,0,0,0],[0,1,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], sources: [[0,0]], isMatch: true },
  { lineNum: 6, phase: 'fill', description: 'i=1,j=2: "a" != "c"', text1: 'abcde', text2: 'ace', row: 1, col: 2, dp: [[0,0,0,0],[0,1,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], sources: [], isMatch: false },
  { lineNum: 9, phase: 'fill', description: 'dp[1][2] = max(dp[0][2], dp[1][1]) = max(0,1) = 1', text1: 'abcde', text2: 'ace', row: 1, col: 2, dp: [[0,0,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], sources: [[0,2],[1,1]], isMatch: false },
  { lineNum: 9, phase: 'fill', description: 'dp[1][3] = max(dp[0][3], dp[1][2]) = 1', text1: 'abcde', text2: 'ace', row: 1, col: 3, dp: [[0,0,0,0],[0,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], sources: [[0,3],[1,2]], isMatch: false },
  { lineNum: 9, phase: 'fill', description: 'i=2 (b) 行：b 不匹配 a/c/e，dp[2] = [0,1,1,1]', text1: 'abcde', text2: 'ace', row: 2, col: 3, dp: [[0,0,0,0],[0,1,1,1],[0,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]], sources: [], isMatch: false },
  { lineNum: 6, phase: 'fill', description: 'i=3,j=2: text1[2]="c" == text2[1]="c"，匹配！', text1: 'abcde', text2: 'ace', row: 3, col: 2, dp: [[0,0,0,0],[0,1,1,1],[0,1,1,1],[0,1,0,0],[0,0,0,0],[0,0,0,0]], sources: [], isMatch: true },
  { lineNum: 7, phase: 'fill', description: 'dp[3][2] = dp[2][1] + 1 = 1 + 1 = 2', text1: 'abcde', text2: 'ace', row: 3, col: 2, dp: [[0,0,0,0],[0,1,1,1],[0,1,1,1],[0,1,2,0],[0,0,0,0],[0,0,0,0]], sources: [[2,1]], isMatch: true },
  { lineNum: 9, phase: 'fill', description: 'dp[3][3] = max(dp[2][3], dp[3][2]) = max(1,2) = 2', text1: 'abcde', text2: 'ace', row: 3, col: 3, dp: [[0,0,0,0],[0,1,1,1],[0,1,1,1],[0,1,2,2],[0,0,0,0],[0,0,0,0]], sources: [[2,3],[3,2]], isMatch: false },
  { lineNum: 9, phase: 'fill', description: 'i=4 (d) 行：d 不匹配 a/c/e，dp[4] = [0,1,2,2]', text1: 'abcde', text2: 'ace', row: 4, col: 3, dp: [[0,0,0,0],[0,1,1,1],[0,1,1,1],[0,1,2,2],[0,1,2,2],[0,0,0,0]], sources: [], isMatch: false },
  { lineNum: 6, phase: 'fill', description: 'i=5,j=3: text1[4]="e" == text2[2]="e"，匹配！', text1: 'abcde', text2: 'ace', row: 5, col: 3, dp: [[0,0,0,0],[0,1,1,1],[0,1,1,1],[0,1,2,2],[0,1,2,2],[0,1,2,0]], sources: [], isMatch: true },
  { lineNum: 7, phase: 'fill', description: 'dp[5][3] = dp[4][2] + 1 = 2 + 1 = 3', text1: 'abcde', text2: 'ace', row: 5, col: 3, dp: [[0,0,0,0],[0,1,1,1],[0,1,1,1],[0,1,2,2],[0,1,2,2],[0,1,2,3]], sources: [[4,2]], isMatch: true },
  { lineNum: 10, phase: 'done', description: '返回 dp[5][3] = 3，最长公共子序列长度为 3（"ace"）', text1: 'abcde', text2: 'ace', row: 5, col: 3, dp: [[0,0,0,0],[0,1,1,1],[0,1,1,1],[0,1,2,2],[0,1,2,2],[0,1,2,3]], sources: [], isMatch: false },
];

const steps2 = [
  { lineNum: 2, phase: 'init', description: '初始化 m=3 (abc), n=3 (def)', text1: 'abc', text2: 'def', row: -1, col: -1, dp: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], sources: [], isMatch: false },
  { lineNum: 6, phase: 'fill', description: 'i=1,j=1: "a" vs "d"，不相等', text1: 'abc', text2: 'def', row: 1, col: 1, dp: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], sources: [], isMatch: false },
  { lineNum: 9, phase: 'fill', description: 'dp[1][1] = max(dp[0][1], dp[1][0]) = max(0,0) = 0', text1: 'abc', text2: 'def', row: 1, col: 1, dp: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], sources: [[0,1],[1,0]], isMatch: false },
  { lineNum: 9, phase: 'fill', description: 'i=1,j=2: "a" vs "e"，不等，dp[1][2]=0', text1: 'abc', text2: 'def', row: 1, col: 2, dp: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], sources: [[0,2],[1,1]], isMatch: false },
  { lineNum: 9, phase: 'fill', description: 'i=1,j=3: "a" vs "f"，不等，dp[1][3]=0', text1: 'abc', text2: 'def', row: 1, col: 3, dp: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], sources: [[0,3],[1,2]], isMatch: false },
  { lineNum: 9, phase: 'fill', description: 'i=2 (b) 行：b 不匹配 d/e/f，全部为 0', text1: 'abc', text2: 'def', row: 2, col: 3, dp: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], sources: [], isMatch: false },
  { lineNum: 9, phase: 'fill', description: 'i=3,j=1: "c" vs "d"，不等，dp[3][1]=0', text1: 'abc', text2: 'def', row: 3, col: 1, dp: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], sources: [[2,1],[3,0]], isMatch: false },
  { lineNum: 9, phase: 'fill', description: 'i=3,j=2: "c" vs "e"，不等，dp[3][2]=0', text1: 'abc', text2: 'def', row: 3, col: 2, dp: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], sources: [[2,2],[3,1]], isMatch: false },
  { lineNum: 9, phase: 'fill', description: 'i=3,j=3: "c" vs "f"，不等，dp[3][3]=0', text1: 'abc', text2: 'def', row: 3, col: 3, dp: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], sources: [[2,3],[3,2]], isMatch: false },
  { lineNum: 10, phase: 'done', description: '返回 dp[3][3] = 0，无公共子序列', text1: 'abc', text2: 'def', row: 3, col: 3, dp: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], sources: [], isMatch: false },
];

const phaseLabels = { init: '初始化', fill: '填表', done: '完成' };

function setupPanel(panel) {
  const t1 = TEXT1.split('');
  const t2 = TEXT2.split('');
  const colHeaders = ['', ...t2].map(c => `<th>${c}</th>`).join('');
  const rowLabels = ['', ...t1];
  const rows = rowLabels.map((ch, i) =>
    `<tr><th>${ch}</th>${Array(t2.length + 1).fill(0).map((_, j) =>
      `<td id="dp-${i}-${j}" class="hashmap-row">0</td>`).join('')}</tr>`
  ).join('');
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">DP 表（行=text1，列=text2）</div>
      <table class="hashmap-table" id="dp-table">
        <thead><tr><th></th>${colHeaders}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>当前</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(250,204,21,0.4);border:1px solid #facc15"></div>来源</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>字符匹配</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '1143. Longest Common Subsequence — 执行可视化',
  problemDesc: `
    <p>给定两个字符串 <code>text1</code> 和 <code>text2</code>，返回这两个字符串的最长公共子序列的长度。子序列不要求连续，但必须保持相对顺序。如果不存在公共子序列，返回 <code>0</code>。</p>
    <div class="example">输入：text1 = "abcde", text2 = "ace"
输出：3
解释：最长公共子序列是 "ace"，长度为 3</div>
  `,
  subtitle: `text1 = "${TEXT1}", text2 = "${TEXT2}"`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '"abcde" vs "ace"，LCS=3', steps: steps1, subtitle: 'text1 = "abcde", text2 = "ace"' },
    { name: '"abc" vs "def"，LCS=0', steps: steps2, subtitle: 'text1 = "abc", text2 = "def"', setup(panel) { TEXT1 = 'abc'; TEXT2 = 'def'; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const t1 = s.text1 || TEXT1;
    const t2 = s.text2 || TEXT2;
    const m = t1.length, n = t2.length;
    const dp = s.dp || [];
    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        const el = document.getElementById(`dp-${i}-${j}`);
        if (!el) continue;
        el.textContent = dp[i] ? dp[i][j] : 0;
        el.className = 'hashmap-row';
        if (i === s.row && j === s.col) el.classList.add('current');
        if (s.sources.some(([r, c]) => r === i && c === j)) el.classList.add('in-window');
        if (s.isMatch && i === s.row && j === s.col) el.classList.add('is-active');
      }
    }
    const resultEl = document.getElementById('result-area');
    if (s.phase === 'done') {
      const val = dp[m] ? dp[m][n] : 0;
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">最长公共子序列长度 = ${val}</div>
          <div class="found-sub">${val > 0 ? `LCS 长度 = ${val}` : '无公共子序列'}</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
