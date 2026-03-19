let S_STR = 'ADOBECODEBANC';
let T_STR = 'ABC';

const code = [
  { text: 'class Solution:' },
  { text: '    def minWindow(self, s, t):' },
  { text: '        need = Counter(t)' },
  { text: '        missing = len(t)' },
  { text: '        left = start = end = 0' },
  { text: '        min_len = float("inf")' },
  { text: '' },
  { text: '        for right, char in enumerate(s):' },
  { text: '            if need[char] > 0:' },
  { text: '                missing -= 1' },
  { text: '            need[char] -= 1' },
  { text: '' },
  { text: '            while missing == 0:' },
  { text: '                if right - left + 1 < min_len:' },
  { text: '                    min_len = right - left + 1' },
  { text: '                    start, end = left, right + 1' },
  { text: '                need[s[left]] += 1' },
  { text: '                if need[s[left]] > 0:' },
  { text: '                    missing += 1' },
  { text: '                left += 1' },
  { text: '' },
  { text: '        return s[start:end]' },
];

const lineMap = { 3:2, 4:3, 5:4, 6:5, 8:7, 9:8, 10:9, 11:10, 13:12, 14:13, 15:14, 16:15, 17:16, 18:17, 19:18, 20:19, 22:21 };

// ── Test Case 1: s = "ADOBECODEBANC", t = "ABC" ──
const steps1 = [
  {"lineNum":3,"phase":"init","description":"初始化 need 计数器：need = {'A':1, 'B':1, 'C':1}","need":{"A":1,"B":1,"C":1,"D":0,"O":0,"E":0,"N":0},"missing":3,"left":0,"right":-1,"minLen":Infinity,"start":0,"end":0,"currentChar":null,"s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":4,"phase":"init","description":"missing = 3，表示还需要找到 3 个目标字符","need":{"A":1,"B":1,"C":1,"D":0,"O":0,"E":0,"N":0},"missing":3,"left":0,"right":-1,"minLen":Infinity,"start":0,"end":0,"currentChar":null,"s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":8,"phase":"expand","description":"right=0, char='A'，是目标字符，missing 减为 2","need":{"A":0,"B":1,"C":1,"D":0,"O":0,"E":0,"N":0},"missing":2,"left":0,"right":0,"minLen":Infinity,"start":0,"end":0,"currentChar":"A","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":8,"phase":"expand","description":"right=1, char='D'，不是目标字符，need['D']变为-1","need":{"A":0,"B":1,"C":1,"D":-1,"O":0,"E":0,"N":0},"missing":2,"left":0,"right":1,"minLen":Infinity,"start":0,"end":0,"currentChar":"D","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":8,"phase":"expand","description":"right=2, char='O'，不是目标字符","need":{"A":0,"B":1,"C":1,"D":-1,"O":-1,"E":0,"N":0},"missing":2,"left":0,"right":2,"minLen":Infinity,"start":0,"end":0,"currentChar":"O","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":8,"phase":"expand","description":"right=3, char='B'，是目标字符，missing 减为 1","need":{"A":0,"B":0,"C":1,"D":-1,"O":-1,"E":0,"N":0},"missing":1,"left":0,"right":3,"minLen":Infinity,"start":0,"end":0,"currentChar":"B","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":8,"phase":"expand","description":"right=4, char='E'，不是目标字符","need":{"A":0,"B":0,"C":1,"D":-1,"O":-1,"E":-1,"N":0},"missing":1,"left":0,"right":4,"minLen":Infinity,"start":0,"end":0,"currentChar":"E","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":8,"phase":"expand","description":"right=5, char='C'，是目标字符，missing 减为 0 → 窗口包含所有目标字符！","need":{"A":0,"B":0,"C":0,"D":-1,"O":-1,"E":-1,"N":0},"missing":0,"left":0,"right":5,"minLen":Infinity,"start":0,"end":0,"currentChar":"C","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":14,"phase":"record","description":"窗口 [0,5] 长度=6 < inf，更新最小窗口：'ADOBEC'","need":{"A":0,"B":0,"C":0,"D":-1,"O":-1,"E":-1,"N":0},"missing":0,"left":0,"right":5,"minLen":6,"start":0,"end":6,"currentChar":"C","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":17,"phase":"shrink","description":"收缩左边：移出 s[0]='A'，need['A']=1>0，missing 变为 1，左指针右移","need":{"A":1,"B":0,"C":0,"D":-1,"O":-1,"E":-1,"N":0},"missing":1,"left":1,"right":5,"minLen":6,"start":0,"end":6,"currentChar":"C","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":8,"phase":"expand","description":"right=6, char='O'，不是目标字符","need":{"A":1,"B":0,"C":0,"D":-1,"O":-2,"E":-1,"N":0},"missing":1,"left":1,"right":6,"minLen":6,"start":0,"end":6,"currentChar":"O","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":8,"phase":"expand","description":"right=7, char='D'，不是目标字符","need":{"A":1,"B":0,"C":0,"D":-2,"O":-2,"E":-1,"N":0},"missing":1,"left":1,"right":7,"minLen":6,"start":0,"end":6,"currentChar":"D","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":8,"phase":"expand","description":"right=8, char='E'，不是目标字符","need":{"A":1,"B":0,"C":0,"D":-2,"O":-2,"E":-2,"N":0},"missing":1,"left":1,"right":8,"minLen":6,"start":0,"end":6,"currentChar":"E","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":8,"phase":"expand","description":"right=9, char='B'，不是目标字符（need['B']=0，已满足）","need":{"A":1,"B":-1,"C":0,"D":-2,"O":-2,"E":-2,"N":0},"missing":1,"left":1,"right":9,"minLen":6,"start":0,"end":6,"currentChar":"B","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":8,"phase":"expand","description":"right=10, char='A'，是目标字符，missing 减为 0 → 又凑齐了！","need":{"A":0,"B":-1,"C":0,"D":-2,"O":-2,"E":-2,"N":0},"missing":0,"left":1,"right":10,"minLen":6,"start":0,"end":6,"currentChar":"A","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":14,"phase":"record","description":"窗口 [1,10] 长度=10 > 6，不更新","need":{"A":0,"B":-1,"C":0,"D":-2,"O":-2,"E":-2,"N":0},"missing":0,"left":1,"right":10,"minLen":6,"start":0,"end":6,"currentChar":"A","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":17,"phase":"shrink","description":"收缩左边：移出 s[1]='D'，need['D']=-1，仍<=0 不影响 missing","need":{"A":0,"B":-1,"C":0,"D":-1,"O":-2,"E":-2,"N":0},"missing":0,"left":2,"right":10,"minLen":6,"start":0,"end":6,"currentChar":"A","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":17,"phase":"shrink","description":"收缩左边：移出 s[2]='O'，need['O']=-1，仍<=0","need":{"A":0,"B":-1,"C":0,"D":-1,"O":-1,"E":-2,"N":0},"missing":0,"left":3,"right":10,"minLen":6,"start":0,"end":6,"currentChar":"A","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":17,"phase":"shrink","description":"收缩左边：移出 s[3]='B'，need['B']=0，仍<=0","need":{"A":0,"B":0,"C":0,"D":-1,"O":-1,"E":-2,"N":0},"missing":0,"left":4,"right":10,"minLen":6,"start":0,"end":6,"currentChar":"A","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":17,"phase":"shrink","description":"收缩左边：移出 s[4]='E'，need['E']=-1，仍<=0","need":{"A":0,"B":0,"C":0,"D":-1,"O":-1,"E":-1,"N":0},"missing":0,"left":5,"right":10,"minLen":6,"start":0,"end":6,"currentChar":"A","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":14,"phase":"record","description":"窗口 [5,10] 长度=6 = 6，不更新（不严格小于）","need":{"A":0,"B":0,"C":0,"D":-1,"O":-1,"E":-1,"N":0},"missing":0,"left":5,"right":10,"minLen":6,"start":0,"end":6,"currentChar":"A","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":17,"phase":"shrink","description":"收缩左边：移出 s[5]='C'，need['C']=1>0，missing 变为 1","need":{"A":0,"B":0,"C":1,"D":-1,"O":-1,"E":-1,"N":0},"missing":1,"left":6,"right":10,"minLen":6,"start":0,"end":6,"currentChar":"A","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":8,"phase":"expand","description":"right=11, char='N'，不是目标字符","need":{"A":0,"B":0,"C":1,"D":-1,"O":-1,"E":-1,"N":-1},"missing":1,"left":6,"right":11,"minLen":6,"start":0,"end":6,"currentChar":"N","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":8,"phase":"expand","description":"right=12, char='C'，是目标字符，missing 减为 0 → 再次凑齐！","need":{"A":0,"B":0,"C":0,"D":-1,"O":-1,"E":-1,"N":-1},"missing":0,"left":6,"right":12,"minLen":6,"start":0,"end":6,"currentChar":"C","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":14,"phase":"record","description":"窗口 [6,12] 长度=7 > 6，不更新","need":{"A":0,"B":0,"C":0,"D":-1,"O":-1,"E":-1,"N":-1},"missing":0,"left":6,"right":12,"minLen":6,"start":0,"end":6,"currentChar":"C","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":17,"phase":"shrink","description":"收缩左边：移出 s[6]='O'，need['O']=0","need":{"A":0,"B":0,"C":0,"D":-1,"O":0,"E":-1,"N":-1},"missing":0,"left":7,"right":12,"minLen":6,"start":0,"end":6,"currentChar":"C","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":17,"phase":"shrink","description":"收缩左边：移出 s[7]='D'，need['D']=0","need":{"A":0,"B":0,"C":0,"D":0,"O":0,"E":-1,"N":-1},"missing":0,"left":8,"right":12,"minLen":6,"start":0,"end":6,"currentChar":"C","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":14,"phase":"record","description":"窗口 [8,12] 长度=5 < 6，更新最小窗口：'EBANC'","need":{"A":0,"B":0,"C":0,"D":0,"O":0,"E":-1,"N":-1},"missing":0,"left":8,"right":12,"minLen":5,"start":8,"end":13,"currentChar":"C","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":17,"phase":"shrink","description":"收缩左边：移出 s[8]='E'，need['E']=0","need":{"A":0,"B":0,"C":0,"D":0,"O":0,"E":0,"N":-1},"missing":0,"left":9,"right":12,"minLen":5,"start":8,"end":13,"currentChar":"C","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":14,"phase":"record","description":"窗口 [9,12] 长度=4 < 5，更新最小窗口：'BANC'","need":{"A":0,"B":0,"C":0,"D":0,"O":0,"E":0,"N":-1},"missing":0,"left":9,"right":12,"minLen":4,"start":9,"end":13,"currentChar":"C","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":17,"phase":"shrink","description":"收缩左边：移出 s[9]='B'，need['B']=1>0，missing 变为 1，停止收缩","need":{"A":0,"B":1,"C":0,"D":0,"O":0,"E":0,"N":-1},"missing":1,"left":10,"right":12,"minLen":4,"start":9,"end":13,"currentChar":"C","s":"ADOBECODEBANC","t":"ABC"},
  {"lineNum":22,"phase":"done","description":"遍历结束，最小覆盖子串 = s[9:13] = 'BANC'，长度 = 4","need":{"A":0,"B":1,"C":0,"D":0,"O":0,"E":0,"N":-1},"missing":1,"left":10,"right":12,"minLen":4,"start":9,"end":13,"currentChar":null,"s":"ADOBECODEBANC","t":"ABC"},
];

// ── Test Case 2: s = "a", t = "a" ──
const steps2 = [
  {"lineNum":3,"phase":"init","description":"初始化 need 计数器：need = {'a':1}","need":{"a":1},"missing":1,"left":0,"right":-1,"minLen":Infinity,"start":0,"end":0,"currentChar":null,"s":"a","t":"a"},
  {"lineNum":4,"phase":"init","description":"missing = 1，表示还需要找到 1 个目标字符","need":{"a":1},"missing":1,"left":0,"right":-1,"minLen":Infinity,"start":0,"end":0,"currentChar":null,"s":"a","t":"a"},
  {"lineNum":8,"phase":"expand","description":"right=0, char='a'，是目标字符，missing 减为 0 → 窗口包含所有目标字符！","need":{"a":0},"missing":0,"left":0,"right":0,"minLen":Infinity,"start":0,"end":0,"currentChar":"a","s":"a","t":"a"},
  {"lineNum":14,"phase":"record","description":"窗口 [0,0] 长度=1 < inf，更新最小窗口：'a'","need":{"a":0},"missing":0,"left":0,"right":0,"minLen":1,"start":0,"end":1,"currentChar":"a","s":"a","t":"a"},
  {"lineNum":17,"phase":"shrink","description":"收缩左边：移出 s[0]='a'，need['a']=1>0，missing 变为 1，左指针右移","need":{"a":1},"missing":1,"left":1,"right":0,"minLen":1,"start":0,"end":1,"currentChar":"a","s":"a","t":"a"},
  {"lineNum":22,"phase":"done","description":"遍历结束，最小覆盖子串 = s[0:1] = 'a'，长度 = 1","need":{"a":1},"missing":1,"left":1,"right":0,"minLen":1,"start":0,"end":1,"currentChar":null,"s":"a","t":"a"},
];

const phaseLabels = { init: '初始化', expand: '扩展', shrink: '收缩', record: '记录', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">字符串 s（蓝色 = 当前窗口 · 绿色 = 当前字符）</div>
      <div class="array-row" id="s-array"></div>
    </div>
    <div class="card">
      <div class="section-title">need 计数（目标字符还需要的数量，>0 表示仍缺少）</div>
      <div id="need-chips" style="display:flex;gap:8px;flex-wrap:wrap"></div>
    </div>
    <div class="card">
      <div class="section-title">当前最小窗口</div>
      <div id="result-display" style="font-size:20px;font-weight:700;font-family:var(--font-mono);color:var(--text-muted)">\u2014</div>
      <div id="result-info" style="font-size:13px;color:var(--text-muted);margin-top:4px"></div>
    </div>
  `;
}

export default {
  title: '76. Minimum Window Substring',
  problemDesc: `
    <p>给你一个字符串 <code>s</code> 和一个字符串 <code>t</code>，返回 <code>s</code> 中涵盖 <code>t</code> 所有字符的最小子串。如果不存在则返回空字符串。</p>
    <div class="example">输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
解释：最小覆盖子串 "BANC" 包含了 t 中的 'A'、'B' 和 'C'。</div>
    <p><strong>提示：</strong><code>t</code> 中的字符可能重复，答案唯一。</p>
  `,
  subtitle: `s = "${S_STR}", t = "${T_STR}"`,
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 's = "ADOBECODEBANC", t = "ABC"', steps: steps1, subtitle: 's = "ADOBECODEBANC", t = "ABC"' },
    {
      name: 's = "a", t = "a"', steps: steps2, subtitle: 's = "a", t = "a"',
      setup(panel) { S_STR = 'a'; T_STR = 'a'; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const str = s.s || S_STR;
    const t = s.t || T_STR;
    const targetChars = [...new Set(t.split(''))];

    // String array
    document.getElementById('s-array').innerHTML = str.split('').map((c, i) => {
      let cls = 'arr-cell';
      if (i >= s.left && i <= s.right) cls += ' in-window';
      if (s.currentChar && i === s.right) cls += ' is-active';
      return `<div class="${cls}"><div class="arr-val">${c}</div><div class="arr-idx">[${i}]</div></div>`;
    }).join('');

    // Need chips
    document.getElementById('need-chips').innerHTML = targetChars.map(k => {
      const v = s.need[k] || 0;
      let cls = 'hm-chip';
      if (v > 0) cls += ' diff-hit';
      if (v <= 0) cls += ' just-added';
      return `<div class="${cls}"><span class="hm-chip-key">${k}</span><span class="hm-chip-val">${v}</span></div>`;
    }).join('');

    // Result
    const resEl = document.getElementById('result-display');
    const infoEl = document.getElementById('result-info');
    if (s.minLen !== Infinity && s.end > s.start) {
      resEl.textContent = str.slice(s.start, s.end);
      resEl.style.color = '#4ade80';
      infoEl.textContent = `s[${s.start}:${s.end}]，长度 = ${s.minLen}，missing = ${s.missing}`;
    } else {
      resEl.textContent = '\u2014';
      resEl.style.color = 'var(--text-muted)';
      infoEl.textContent = `missing = ${s.missing}`;
    }
  },
};
