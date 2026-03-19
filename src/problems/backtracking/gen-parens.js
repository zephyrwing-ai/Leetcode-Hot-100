let N = 3;

const code = [
  'class Solution:',
  '    def generateParenthesis(self, n):',
  '        result = []',
  '        def backtrack(s, open, close):',
  '            if len(s) == 2 * n:',
  '                result.append(s)',
  '                return',
  '            if open < n:',
  '                backtrack(s+"(", open+1, close)',
  '            if close < open:',
  '                backtrack(s+")", open, close+1)',
  '        backtrack("", 0, 0)',
  '        return result',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12 };

const steps1 = [
  { lineNum: 2, phase: 'init', description: '初始化 result=[]，n=3', s: '', open: 0, close: 0, n: 3, result: [], action: null },
  { lineNum: 11, phase: 'init', description: '调用 backtrack("", 0, 0)', s: '', open: 0, close: 0, n: 3, result: [], action: null },
  { lineNum: 8, phase: 'explore', description: 'open=0 < 3，添加 "("', s: '(', open: 1, close: 0, n: 3, result: [], action: 'open' },
  { lineNum: 8, phase: 'explore', description: 'open=1 < 3，添加 "("', s: '((', open: 2, close: 0, n: 3, result: [], action: 'open' },
  { lineNum: 8, phase: 'explore', description: 'open=2 < 3，添加 "("', s: '(((', open: 3, close: 0, n: 3, result: [], action: 'open' },
  { lineNum: 10, phase: 'explore', description: 'open=3 不能再加 "("，close=0 < 3，添加 ")"', s: '((()' , open: 3, close: 1, n: 3, result: [], action: 'close' },
  { lineNum: 10, phase: 'explore', description: 'close=1 < 3，添加 ")"', s: '(())', open: 3, close: 2, n: 3, result: [], action: 'close' },
  { lineNum: 10, phase: 'explore', description: 'close=2 < 3，添加 ")"', s: '((()))', open: 3, close: 3, n: 3, result: [], action: 'close' },
  { lineNum: 5, phase: 'record', description: '长度=6=2*3，记录 "((()))"', s: '((()))', open: 3, close: 3, n: 3, result: ['((()))'], action: 'record' },
  { lineNum: 8, phase: 'backtrack', description: '回溯到 "(()"，尝试添加 "(" 而非 ")"', s: '(()', open: 2, close: 1, n: 3, result: ['((()))'], action: 'undo' },
  { lineNum: 8, phase: 'explore', description: 'open=2 < 3，添加 "("', s: '(()(' , open: 3, close: 1, n: 3, result: ['((()))'], action: 'open' },
  { lineNum: 10, phase: 'explore', description: 'close=1 < 3，添加 ")"', s: '(()()', open: 3, close: 2, n: 3, result: ['((()))'], action: 'close' },
  { lineNum: 10, phase: 'explore', description: 'close=2 < 3，添加 ")"', s: '(()())', open: 3, close: 3, n: 3, result: ['((()))'], action: 'close' },
  { lineNum: 5, phase: 'record', description: '长度=6，记录 "(()())"', s: '(()())', open: 3, close: 3, n: 3, result: ['(())', '(()())'], action: 'record' },
  { lineNum: 8, phase: 'backtrack', description: '回溯到 "(())"，close < open，添加 ")"', s: '(())', open: 2, close: 2, n: 3, result: ['((()))', '(()())'], action: 'undo' },
  { lineNum: 8, phase: 'explore', description: 'open=2 < 3，添加 "("', s: '(())(', open: 3, close: 2, n: 3, result: ['((()))', '(()())'], action: 'open' },
  { lineNum: 10, phase: 'explore', description: 'close=2 < 3，添加 ")"', s: '(())()', open: 3, close: 3, n: 3, result: ['((()))', '(()())'], action: 'close' },
  { lineNum: 5, phase: 'record', description: '长度=6，记录 "(())()"', s: '(())()', open: 3, close: 3, n: 3, result: ['((()))', '(()())', '(())()'], action: 'record' },
  { lineNum: 8, phase: 'backtrack', description: '回溯到 "()"，尝试新分支', s: '()', open: 1, close: 1, n: 3, result: ['((()))', '(()())', '(())()'], action: 'undo' },
  { lineNum: 8, phase: 'explore', description: 'open=1 < 3，添加 "("', s: '()(', open: 2, close: 1, n: 3, result: ['((()))', '(()())', '(())()'], action: 'open' },
  { lineNum: 8, phase: 'explore', description: 'open=2 < 3，添加 "("', s: '()((', open: 3, close: 1, n: 3, result: ['((()))', '(()())', '(())()'], action: 'open' },
  { lineNum: 10, phase: 'explore', description: 'close=1 < 3，添加 ")"', s: '()(()' , open: 3, close: 2, n: 3, result: ['((()))', '(()())', '(())()'], action: 'close' },
  { lineNum: 10, phase: 'explore', description: 'close=2 < 3，添加 ")"', s: '()(())', open: 3, close: 3, n: 3, result: ['((()))', '(()())', '(())()'], action: 'close' },
  { lineNum: 5, phase: 'record', description: '长度=6，记录 "()(())"', s: '()(())', open: 3, close: 3, n: 3, result: ['((()))', '(()())', '(())()', '()(())'], action: 'record' },
  { lineNum: 8, phase: 'backtrack', description: '回溯到 "()()"，尝试最后分支', s: '()()', open: 2, close: 2, n: 3, result: ['((()))', '(()())', '(())()', '()(())'], action: 'undo' },
  { lineNum: 8, phase: 'explore', description: 'open=2 < 3，添加 "("', s: '()()(', open: 3, close: 2, n: 3, result: ['((()))', '(()())', '(())()', '()(())'], action: 'open' },
  { lineNum: 10, phase: 'explore', description: 'close=2 < 3，添加 ")"', s: '()()()', open: 3, close: 3, n: 3, result: ['((()))', '(()())', '(())()', '()(())'], action: 'close' },
  { lineNum: 5, phase: 'record', description: '长度=6，记录 "()()()"', s: '()()()', open: 3, close: 3, n: 3, result: ['((()))', '(()())', '(())()', '()(())', '()()()'], action: 'record' },
  { lineNum: 12, phase: 'done', description: '回溯完成，共找到 5 个有效括号组合', s: '', open: 0, close: 0, n: 3, result: ['((()))', '(()())', '(())()', '()(())', '()()()'], action: null },
];

// Test case 2: n=2 → ["(())", "()()"]
const steps2 = [
  { lineNum: 2, phase: 'init', description: '初始化 result=[]，n=2', s: '', open: 0, close: 0, n: 2, result: [], action: null },
  { lineNum: 11, phase: 'init', description: '调用 backtrack("", 0, 0)', s: '', open: 0, close: 0, n: 2, result: [], action: null },
  { lineNum: 8, phase: 'explore', description: 'open=0 < 2，添加 "("', s: '(', open: 1, close: 0, n: 2, result: [], action: 'open' },
  { lineNum: 8, phase: 'explore', description: 'open=1 < 2，添加 "("', s: '((', open: 2, close: 0, n: 2, result: [], action: 'open' },
  { lineNum: 10, phase: 'explore', description: 'open=2 不能再加 "("，close=0 < 2，添加 ")"', s: '(()', open: 2, close: 1, n: 2, result: [], action: 'close' },
  { lineNum: 10, phase: 'explore', description: 'close=1 < 2，添加 ")"', s: '(())', open: 2, close: 2, n: 2, result: [], action: 'close' },
  { lineNum: 5, phase: 'record', description: '长度=4=2*2，记录 "(())"', s: '(())', open: 2, close: 2, n: 2, result: ['(())'], action: 'record' },
  { lineNum: 8, phase: 'backtrack', description: '回溯到 "()"，尝试新分支', s: '()', open: 1, close: 1, n: 2, result: ['(())'], action: 'undo' },
  { lineNum: 8, phase: 'explore', description: 'open=1 < 2，添加 "("', s: '()(', open: 2, close: 1, n: 2, result: ['(())'], action: 'open' },
  { lineNum: 10, phase: 'explore', description: 'close=1 < 2，添加 ")"', s: '()()', open: 2, close: 2, n: 2, result: ['(())'], action: 'close' },
  { lineNum: 5, phase: 'record', description: '长度=4，记录 "()()"', s: '()()', open: 2, close: 2, n: 2, result: ['(())', '()()'], action: 'record' },
  { lineNum: 12, phase: 'done', description: '回溯完成，共找到 2 个有效括号组合', s: '', open: 0, close: 0, n: 2, result: ['(())', '()()'], action: null },
];

const phaseLabels = { init: '初始化', explore: '探索', backtrack: '回溯', record: '记录', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">括号计数</div>
      <div class="array-row" id="count-display"></div>
    </div>
    <div class="card">
      <div class="section-title">当前构建的字符串</div>
      <div class="stack-container" id="str-area"></div>
    </div>
    <div class="card">
      <div class="section-title">已收集的有效组合 result</div>
      <div id="result-area" style="font-family:var(--font-mono);font-size:13px;display:flex;flex-wrap:wrap;gap:6px"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '22. Generate Parentheses — 执行可视化',
  problemDesc: `
    <p>数字 <code>n</code> 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且有效的括号组合。</p>
    <div class="example">输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]</div>
  `,
  subtitle: `n = ${N}`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: 'n=3（5个组合）', steps: steps1, subtitle: 'n = 3' },
    { name: 'n=2（2个组合）', steps: steps2, subtitle: 'n = 2', setup(panel) { N = 2; setupPanel(panel); } },
  ],

  setup: setupPanel,

  render(s) {
    const n = s.n || N;
    document.getElementById('count-display').innerHTML = [
      { label: 'open', val: s.open, max: n },
      { label: 'close', val: s.close, max: n },
      { label: 'len', val: s.s.length, max: 2 * n },
    ].map(item => {
      let cls = 'arr-cell';
      if (item.val === item.max) cls += ' in-window';
      return `<div class="${cls}"><div class="arr-val">${item.val}/${item.max}</div><div class="arr-idx">${item.label}</div></div>`;
    }).join('');

    const strEl = document.getElementById('str-area');
    if (s.s === '') {
      strEl.innerHTML = '<div class="stack-empty">（空字符串）</div>';
    } else {
      strEl.innerHTML = s.s.split('').map((ch, i) => {
        let cls = 'stack-item';
        if (i === s.s.length - 1) {
          if (s.action === 'open') cls += ' just-pushed';
          if (s.action === 'close') cls += ' is-top';
        }
        return `<div class="${cls}" style="${ch === '(' ? 'color:#22d3ee' : 'color:#f59e0b'}">${ch}</div>`;
      }).join('');
    }

    const resultEl = document.getElementById('result-area');
    if (s.result.length === 0) {
      resultEl.innerHTML = '<div style="color:var(--text-muted)">（暂无结果）</div>';
    } else {
      resultEl.innerHTML = s.result.map((r, i) => {
        const isNew = i === s.result.length - 1 && s.action === 'record';
        return `<div style="padding:3px 8px;border-radius:4px;${isNew ? 'background:rgba(74,222,128,0.2);color:#4ade80;font-weight:700' : 'background:rgba(255,255,255,0.05)'}">${r}</div>`;
      }).join('');
    }

    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">共 ${s.result.length} 个有效括号组合</div>
          <div class="found-sub">卡特兰数 C(${n}) = ${s.result.length}</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
