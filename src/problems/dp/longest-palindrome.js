let S = 'babad';

const code = [
  'class Solution:',
  '    def longestPalindrome(self, s):',
  '        res = ""',
  '        for i in range(len(s)):',
  '            # 奇数长度回文',
  '            odd = self.expand(s, i, i)',
  '            if len(odd) > len(res):',
  '                res = odd',
  '            # 偶数长度回文',
  '            even = self.expand(s, i, i + 1)',
  '            if len(even) > len(res):',
  '                res = even',
  '        return res',
  '',
  '    def expand(self, s, l, r):',
  '        while l >= 0 and r < len(s) and s[l] == s[r]:',
  '            l -= 1',
  '            r += 1',
  '        return s[l+1:r]',
];

const lineMap = { 2: 2, 3: 3, 5: 5, 6: 6, 9: 9, 10: 10, 12: 12, 14: 14, 15: 15, 16: 16 };

const steps1 = [
  { lineNum: 2, phase: 'init', description: '初始化 res = ""，存储最长回文子串', s: 'babad', charIdx: -1, left: -1, right: -1, res: '', expandType: null },
  { lineNum: 3, phase: 'center', description: 'i=0，以 s[0]="b" 为中心尝试扩展', s: 'babad', charIdx: 0, left: 0, right: 0, res: '', expandType: 'odd' },
  { lineNum: 5, phase: 'expand', description: '奇数扩展：中心 "b"，左右越界或不等，结果 "b"', s: 'babad', charIdx: 0, left: 0, right: 0, res: '', expandType: 'odd' },
  { lineNum: 6, phase: 'update', description: '"b"（长度1）> ""（长度0），更新 res = "b"', s: 'babad', charIdx: 0, left: 0, right: 0, res: 'b', expandType: 'odd' },
  { lineNum: 3, phase: 'center', description: 'i=1，以 s[1]="a" 为中心尝试扩展', s: 'babad', charIdx: 1, left: 1, right: 1, res: 'b', expandType: 'odd' },
  { lineNum: 14, phase: 'expand', description: '奇数扩展：l=0, r=2，s[0]="b" vs s[2]="b"，相等！继续', s: 'babad', charIdx: 1, left: 0, right: 2, res: 'b', expandType: 'odd' },
  { lineNum: 6, phase: 'update', description: '扩展结果 "bab"（长度3）> "b"（长度1），更新 res = "bab"', s: 'babad', charIdx: 1, left: 0, right: 2, res: 'bab', expandType: 'odd' },
  { lineNum: 3, phase: 'center', description: 'i=2，以 s[2]="b" 为中心尝试奇数扩展', s: 'babad', charIdx: 2, left: 2, right: 2, res: 'bab', expandType: 'odd' },
  { lineNum: 14, phase: 'expand', description: '奇数扩展：l=1, r=3，s[1]="a" vs s[3]="a"，相等！', s: 'babad', charIdx: 2, left: 1, right: 3, res: 'bab', expandType: 'odd' },
  { lineNum: 14, phase: 'expand', description: '继续扩展：l=0, r=4，s[0]="b" vs s[4]="d"，不等，停止', s: 'babad', charIdx: 2, left: 1, right: 3, res: 'bab', expandType: 'odd' },
  { lineNum: 6, phase: 'update', description: '扩展结果 "aba"（长度3）= "bab"（长度3），不更新', s: 'babad', charIdx: 2, left: 1, right: 3, res: 'bab', expandType: 'odd' },
  { lineNum: 3, phase: 'center', description: 'i=3，以 s[3]="a" 为中心尝试扩展', s: 'babad', charIdx: 3, left: 3, right: 3, res: 'bab', expandType: 'odd' },
  { lineNum: 5, phase: 'expand', description: '奇数扩展：l=2, r=4，s[2]="b" vs s[4]="d"，不等，结果 "a"', s: 'babad', charIdx: 3, left: 3, right: 3, res: 'bab', expandType: 'odd' },
  { lineNum: 3, phase: 'center', description: 'i=4，以 s[4]="d" 为中心尝试扩展', s: 'babad', charIdx: 4, left: 4, right: 4, res: 'bab', expandType: 'odd' },
  { lineNum: 5, phase: 'expand', description: '奇数扩展：无法扩展，结果 "d"', s: 'babad', charIdx: 4, left: 4, right: 4, res: 'bab', expandType: 'odd' },
  { lineNum: 12, phase: 'done', description: '遍历结束，返回最长回文子串 res = "bab"，长度 3', s: 'babad', charIdx: -1, left: 0, right: 2, res: 'bab', expandType: null },
];

const steps2 = [
  { lineNum: 2, phase: 'init', description: '初始化 res = ""，存储最长回文子串', s: 'cbbd', charIdx: -1, left: -1, right: -1, res: '', expandType: null },
  { lineNum: 3, phase: 'center', description: 'i=0，以 s[0]="c" 为中心尝试扩展', s: 'cbbd', charIdx: 0, left: 0, right: 0, res: '', expandType: 'odd' },
  { lineNum: 5, phase: 'expand', description: '奇数扩展：中心 "c"，无法扩展，结果 "c"', s: 'cbbd', charIdx: 0, left: 0, right: 0, res: '', expandType: 'odd' },
  { lineNum: 6, phase: 'update', description: '"c"（长度1）> ""（长度0），更新 res = "c"', s: 'cbbd', charIdx: 0, left: 0, right: 0, res: 'c', expandType: 'odd' },
  { lineNum: 9, phase: 'center', description: 'i=0，尝试偶数扩展 s[0]="c" 和 s[1]="b"', s: 'cbbd', charIdx: 0, left: 0, right: 1, res: 'c', expandType: 'even' },
  { lineNum: 5, phase: 'expand', description: '偶数扩展："c" != "b"，无法扩展', s: 'cbbd', charIdx: 0, left: 0, right: 0, res: 'c', expandType: 'even' },
  { lineNum: 3, phase: 'center', description: 'i=1，以 s[1]="b" 为中心尝试奇数扩展', s: 'cbbd', charIdx: 1, left: 1, right: 1, res: 'c', expandType: 'odd' },
  { lineNum: 5, phase: 'expand', description: '奇数扩展：l=0,r=2，s[0]="c" vs s[2]="b"，不等', s: 'cbbd', charIdx: 1, left: 1, right: 1, res: 'c', expandType: 'odd' },
  { lineNum: 9, phase: 'center', description: 'i=1，尝试偶数扩展 s[1]="b" 和 s[2]="b"', s: 'cbbd', charIdx: 1, left: 1, right: 2, res: 'c', expandType: 'even' },
  { lineNum: 14, phase: 'expand', description: '偶数扩展："b" == "b"，匹配！继续扩展', s: 'cbbd', charIdx: 1, left: 1, right: 2, res: 'c', expandType: 'even' },
  { lineNum: 14, phase: 'expand', description: '继续扩展：l=0,r=3，s[0]="c" vs s[3]="d"，不等，停止', s: 'cbbd', charIdx: 1, left: 1, right: 2, res: 'c', expandType: 'even' },
  { lineNum: 6, phase: 'update', description: '扩展结果 "bb"（长度2）> "c"（长度1），更新 res = "bb"', s: 'cbbd', charIdx: 1, left: 1, right: 2, res: 'bb', expandType: 'even' },
  { lineNum: 3, phase: 'center', description: 'i=2，以 s[2]="b" 为中心尝试扩展', s: 'cbbd', charIdx: 2, left: 2, right: 2, res: 'bb', expandType: 'odd' },
  { lineNum: 5, phase: 'expand', description: '奇数扩展：l=1,r=3，s[1]="b" vs s[3]="d"，不等', s: 'cbbd', charIdx: 2, left: 2, right: 2, res: 'bb', expandType: 'odd' },
  { lineNum: 3, phase: 'center', description: 'i=3，以 s[3]="d" 为中心尝试扩展', s: 'cbbd', charIdx: 3, left: 3, right: 3, res: 'bb', expandType: 'odd' },
  { lineNum: 12, phase: 'done', description: '遍历结束，返回最长回文子串 res = "bb"，长度 2', s: 'cbbd', charIdx: -1, left: 1, right: 2, res: 'bb', expandType: null },
];

const phaseLabels = { init: '初始化', center: '选中心', expand: '扩展', update: '更新', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">输入字符串（绿色 = 中心，蓝色 = 扩展范围）</div>
      <div class="array-row" id="char-array"></div>
    </div>
    <div class="card">
      <div class="section-title">当前最长回文子串</div>
      <div style="display:flex;align-items:baseline;gap:12px">
        <div id="res-display" style="font-size:32px;font-weight:800;font-family:var(--font-mono);color:var(--text-muted)">""</div>
        <div id="res-len" style="font-size:13px;color:var(--text-muted);font-family:var(--font-mono)"></div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '5. Longest Palindromic Substring — 执行可视化',
  problemDesc: `
    <p>给你一个字符串 <code>s</code>，找到 <code>s</code> 中最长的回文子串。回文串是正着读和反着读都一样的字符串。</p>
    <div class="example">输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案</div>
    <p>提示：<code>1 <= s.length <= 1000</code></p>
  `,
  subtitle: `s = "${S}"`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: 's="babad"，奇数回文', steps: steps1, subtitle: 's = "babad"' },
    { name: 's="cbbd"，偶数回文', steps: steps2, subtitle: 's = "cbbd"', setup(panel) { S = 'cbbd'; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const str = s.s || S;
    const chars = str.split('');
    document.getElementById('char-array').innerHTML = chars.map((ch, idx) => {
      let cls = 'arr-cell';
      if (idx === s.charIdx) cls += ' current';
      if (s.left >= 0 && s.right >= 0 && idx >= s.left && idx <= s.right) cls += ' in-window';
      return `<div class="${cls}"><div class="arr-val">${ch}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    const resEl = document.getElementById('res-display');
    resEl.textContent = s.res ? `"${s.res}"` : '""';
    resEl.style.color = s.res.length > 0 ? '#4ade80' : 'var(--text-muted)';

    const lenEl = document.getElementById('res-len');
    lenEl.textContent = s.res ? `长度 = ${s.res.length}` : '';

    const resultEl = document.getElementById('result-area');
    if (s.phase === 'done') {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">最长回文子串 = "${s.res}"</div>
          <div class="found-sub">长度 = ${s.res.length}</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
