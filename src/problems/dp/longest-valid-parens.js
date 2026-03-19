let S = '(()';

const code = [
  'class Solution:',
  '    def longestValidParentheses(self, s):',
  '        stack = [-1]',
  '        max_len = 0',
  '        for i in range(len(s)):',
  '            if s[i] == "(":',
  '                stack.append(i)',
  '            else:',
  '                stack.pop()',
  '                if not stack:',
  '                    stack.append(i)',
  '                else:',
  '                    max_len = max(max_len, i - stack[-1])',
  '        return max_len',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12 };

const steps1 = [
  { lineNum: 2, phase: 'init', description: '初始化栈 stack = [-1]，-1 作为哨兵', s: '(()', charIdx: -1, stack: [-1], maxLen: 0, matchStart: -1, matchEnd: -1 },
  { lineNum: 3, phase: 'init', description: '初始化 max_len = 0', s: '(()', charIdx: -1, stack: [-1], maxLen: 0, matchStart: -1, matchEnd: -1 },
  { lineNum: 4, phase: 'scan', description: 'i=0，当前字符 s[0] = "("', s: '(()', charIdx: 0, stack: [-1], maxLen: 0, matchStart: -1, matchEnd: -1 },
  { lineNum: 5, phase: 'scan', description: '"(" 是左括号，检查条件成立', s: '(()', charIdx: 0, stack: [-1], maxLen: 0, matchStart: -1, matchEnd: -1 },
  { lineNum: 6, phase: 'push', description: '将索引 0 压入栈', s: '(()', charIdx: 0, stack: [-1, 0], maxLen: 0, matchStart: -1, matchEnd: -1 },
  { lineNum: 4, phase: 'scan', description: 'i=1，当前字符 s[1] = "("', s: '(()', charIdx: 1, stack: [-1, 0], maxLen: 0, matchStart: -1, matchEnd: -1 },
  { lineNum: 5, phase: 'scan', description: '"(" 是左括号，检查条件成立', s: '(()', charIdx: 1, stack: [-1, 0], maxLen: 0, matchStart: -1, matchEnd: -1 },
  { lineNum: 6, phase: 'push', description: '将索引 1 压入栈', s: '(()', charIdx: 1, stack: [-1, 0, 1], maxLen: 0, matchStart: -1, matchEnd: -1 },
  { lineNum: 4, phase: 'scan', description: 'i=2，当前字符 s[2] = ")"', s: '(()', charIdx: 2, stack: [-1, 0, 1], maxLen: 0, matchStart: -1, matchEnd: -1 },
  { lineNum: 8, phase: 'pop', description: '")" 是右括号，弹出栈顶 1', s: '(()', charIdx: 2, stack: [-1, 0], maxLen: 0, matchStart: -1, matchEnd: -1 },
  { lineNum: 9, phase: 'check', description: '栈不为空（栈顶=0），进入计算长度分支', s: '(()', charIdx: 2, stack: [-1, 0], maxLen: 0, matchStart: -1, matchEnd: -1 },
  { lineNum: 11, phase: 'calc', description: 'max_len = max(0, 2 - 0) = 2，找到有效括号 s[1..2]', s: '(()', charIdx: 2, stack: [-1, 0], maxLen: 2, matchStart: 1, matchEnd: 2 },
  { lineNum: 12, phase: 'done', description: '遍历结束，返回 max_len = 2', s: '(()', charIdx: -1, stack: [-1, 0], maxLen: 2, matchStart: 1, matchEnd: 2 },
];

const steps2 = [
  { lineNum: 2, phase: 'init', description: '初始化栈 stack = [-1]，-1 作为哨兵', s: ')()())', charIdx: -1, stack: [-1], maxLen: 0, matchStart: -1, matchEnd: -1 },
  { lineNum: 3, phase: 'init', description: '初始化 max_len = 0', s: ')()())', charIdx: -1, stack: [-1], maxLen: 0, matchStart: -1, matchEnd: -1 },
  { lineNum: 4, phase: 'scan', description: 'i=0，当前字符 s[0] = ")"', s: ')()())', charIdx: 0, stack: [-1], maxLen: 0, matchStart: -1, matchEnd: -1 },
  { lineNum: 8, phase: 'pop', description: '")" 是右括号，弹出栈顶 -1', s: ')()())', charIdx: 0, stack: [], maxLen: 0, matchStart: -1, matchEnd: -1 },
  { lineNum: 9, phase: 'check', description: '栈为空！将当前索引 0 压入栈作为新哨兵', s: ')()())', charIdx: 0, stack: [0], maxLen: 0, matchStart: -1, matchEnd: -1 },
  { lineNum: 4, phase: 'scan', description: 'i=1，当前字符 s[1] = "("', s: ')()())', charIdx: 1, stack: [0], maxLen: 0, matchStart: -1, matchEnd: -1 },
  { lineNum: 6, phase: 'push', description: '将索引 1 压入栈', s: ')()())', charIdx: 1, stack: [0, 1], maxLen: 0, matchStart: -1, matchEnd: -1 },
  { lineNum: 4, phase: 'scan', description: 'i=2，当前字符 s[2] = ")"', s: ')()())', charIdx: 2, stack: [0, 1], maxLen: 0, matchStart: -1, matchEnd: -1 },
  { lineNum: 8, phase: 'pop', description: '")" 是右括号，弹出栈顶 1', s: ')()())', charIdx: 2, stack: [0], maxLen: 0, matchStart: -1, matchEnd: -1 },
  { lineNum: 11, phase: 'calc', description: 'max_len = max(0, 2 - 0) = 2，找到 s[1..2]="()"', s: ')()())', charIdx: 2, stack: [0], maxLen: 2, matchStart: 1, matchEnd: 2 },
  { lineNum: 4, phase: 'scan', description: 'i=3，当前字符 s[3] = "("', s: ')()())', charIdx: 3, stack: [0], maxLen: 2, matchStart: 1, matchEnd: 2 },
  { lineNum: 6, phase: 'push', description: '将索引 3 压入栈', s: ')()())', charIdx: 3, stack: [0, 3], maxLen: 2, matchStart: 1, matchEnd: 2 },
  { lineNum: 4, phase: 'scan', description: 'i=4，当前字符 s[4] = ")"', s: ')()())', charIdx: 4, stack: [0, 3], maxLen: 2, matchStart: 1, matchEnd: 2 },
  { lineNum: 8, phase: 'pop', description: '")" 是右括号，弹出栈顶 3', s: ')()())', charIdx: 4, stack: [0], maxLen: 2, matchStart: 1, matchEnd: 2 },
  { lineNum: 11, phase: 'calc', description: 'max_len = max(2, 4 - 0) = 4，连续匹配 s[1..4]="()()"', s: ')()())', charIdx: 4, stack: [0], maxLen: 4, matchStart: 1, matchEnd: 4 },
  { lineNum: 4, phase: 'scan', description: 'i=5，当前字符 s[5] = ")"', s: ')()())', charIdx: 5, stack: [0], maxLen: 4, matchStart: 1, matchEnd: 4 },
  { lineNum: 8, phase: 'pop', description: '")" 是右括号，弹出栈顶 0', s: ')()())', charIdx: 5, stack: [], maxLen: 4, matchStart: 1, matchEnd: 4 },
  { lineNum: 9, phase: 'check', description: '栈为空！将索引 5 作为新哨兵压入栈', s: ')()())', charIdx: 5, stack: [5], maxLen: 4, matchStart: 1, matchEnd: 4 },
  { lineNum: 12, phase: 'done', description: '遍历结束，返回 max_len = 4', s: ')()())', charIdx: -1, stack: [5], maxLen: 4, matchStart: 1, matchEnd: 4 },
];

const phaseLabels = { init: '初始化', scan: '扫描', push: '压栈', pop: '弹栈', check: '检查', calc: '计算', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">输入字符串（绿色 = 当前字符，蓝色 = 匹配区间）</div>
      <div class="array-row" id="char-array"></div>
    </div>
    <div class="card">
      <div class="section-title">栈 Stack（存储索引，底部 → 顶部）</div>
      <div class="stack-container" id="stack-area"></div>
      <div class="legend-row">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>刚压入</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(248,113,113,0.4);border:1px solid #f87171"></div>刚弹出</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">最长有效括号长度 max_len</div>
      <div id="max-len-display" style="font-size:40px;font-weight:800;font-family:var(--font-mono);color:var(--text-muted)">0</div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '32. Longest Valid Parentheses — 执行可视化',
  problemDesc: `
    <p>给你一个只包含 <code>(</code> 和 <code>)</code> 的字符串，找出最长有效（格式正确且连续）括号子串的长度。</p>
    <div class="example">输入：s = "(()"
输出：2
解释：最长有效括号子串是 "()"</div>
    <p>提示：可以使用栈或动态规划解决，时间复杂度 O(n)。</p>
  `,
  subtitle: `s = "${S}"`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: 's="(()"，简单情况', steps: steps1, subtitle: 's = "(()"' },
    { name: 's=")()())"，连续匹配', steps: steps2, subtitle: 's = ")()())"', setup(panel) { S = ')()())'; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const str = s.s || S;
    const chars = str.split('');
    document.getElementById('char-array').innerHTML = chars.map((ch, idx) => {
      let cls = 'arr-cell';
      if (idx === s.charIdx) cls += ' current';
      if (s.matchStart >= 0 && idx >= s.matchStart && idx <= s.matchEnd) cls += ' in-window';
      return `<div class="${cls}"><div class="arr-val">${ch}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    const stackEl = document.getElementById('stack-area');
    if (s.stack.length === 0) {
      stackEl.innerHTML = '<div class="stack-empty">（栈为空）</div>';
    } else {
      stackEl.innerHTML = s.stack.map((item, i) => {
        let cls = 'stack-item';
        if (i === s.stack.length - 1) cls += ' is-top';
        if (i === s.stack.length - 1 && s.phase === 'push') cls += ' just-pushed';
        return `<div class="${cls}">${item}</div>`;
      }).join('');
    }

    const maxEl = document.getElementById('max-len-display');
    maxEl.textContent = s.maxLen;
    maxEl.style.color = s.maxLen > 0 ? '#4ade80' : 'var(--text-muted)';

    const resultEl = document.getElementById('result-area');
    if (s.phase === 'done') {
      const sub = s.matchStart >= 0 ? str.slice(s.matchStart, s.matchEnd + 1) : '';
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">最长有效括号长度 = ${s.maxLen}</div>
          <div class="found-sub">${s.matchStart >= 0 ? `对应子串 s[${s.matchStart}..${s.matchEnd}] = "${sub}"` : '无有效括号'}</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
