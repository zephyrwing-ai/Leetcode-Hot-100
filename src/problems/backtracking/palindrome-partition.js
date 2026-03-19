let S = 'aab';

const code = [
  'class Solution:',
  '    def partition(self, s):',
  '        result = []',
  '        def isPalindrome(sub):',
  '            return sub == sub[::-1]',
  '        def backtrack(start, path):',
  '            if start == len(s):',
  '                result.append(path[:])',
  '                return',
  '            for end in range(start+1, len(s)+1):',
  '                sub = s[start:end]',
  '                if isPalindrome(sub):',
  '                    path.append(sub)',
  '                    backtrack(end, path)',
  '                    path.pop()',
  '        backtrack(0, [])',
  '        return result',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16 };

const steps1 = [
  { lineNum: 2, phase: 'init', description: '初始化 result=[]，s="aab"', str: 'aab', path: [], start: 0, currentSub: '', isPalin: null, result: [], action: null },
  { lineNum: 15, phase: 'init', description: '调用 backtrack(0, [])，从索引 0 开始分割', str: 'aab', path: [], start: 0, currentSub: '', isPalin: null, result: [], action: null },
  { lineNum: 10, phase: 'explore', description: 'end=1: sub=s[0:1]="a"，检查是否回文', str: 'aab', path: [], start: 0, currentSub: 'a', isPalin: null, result: [], action: 'check' },
  { lineNum: 11, phase: 'explore', description: '"a" 是回文，加入路径', str: 'aab', path: ['a'], start: 1, currentSub: 'a', isPalin: true, result: [], action: 'choose' },
  { lineNum: 10, phase: 'explore', description: 'end=2: sub=s[1:2]="a"，检查是否回文', str: 'aab', path: ['a'], start: 1, currentSub: 'a', isPalin: null, result: [], action: 'check' },
  { lineNum: 11, phase: 'explore', description: '"a" 是回文，加入路径', str: 'aab', path: ['a', 'a'], start: 2, currentSub: 'a', isPalin: true, result: [], action: 'choose' },
  { lineNum: 10, phase: 'explore', description: 'end=3: sub=s[2:3]="b"，检查是否回文', str: 'aab', path: ['a', 'a'], start: 2, currentSub: 'b', isPalin: null, result: [], action: 'check' },
  { lineNum: 11, phase: 'explore', description: '"b" 是回文，加入路径', str: 'aab', path: ['a', 'a', 'b'], start: 3, currentSub: 'b', isPalin: true, result: [], action: 'choose' },
  { lineNum: 7, phase: 'record', description: 'start=3==len(s)，记录分割方案 ["a","a","b"]', str: 'aab', path: ['a', 'a', 'b'], start: 3, currentSub: '', isPalin: null, result: [['a','a','b']], action: 'record' },
  { lineNum: 14, phase: 'backtrack', description: '回溯：弹出 "b"，回到 path=["a","a"]', str: 'aab', path: ['a', 'a'], start: 2, currentSub: '', isPalin: null, result: [['a','a','b']], action: 'undo' },
  { lineNum: 14, phase: 'backtrack', description: '回溯：弹出 "a"，回到 path=["a"]', str: 'aab', path: ['a'], start: 1, currentSub: '', isPalin: null, result: [['a','a','b']], action: 'undo' },
  { lineNum: 10, phase: 'explore', description: 'end=3: sub=s[1:3]="ab"，检查是否回文', str: 'aab', path: ['a'], start: 1, currentSub: 'ab', isPalin: null, result: [['a','a','b']], action: 'check' },
  { lineNum: 11, phase: 'backtrack', description: '"ab" 不是回文（ab != ba），跳过', str: 'aab', path: ['a'], start: 1, currentSub: 'ab', isPalin: false, result: [['a','a','b']], action: 'skip' },
  { lineNum: 14, phase: 'backtrack', description: '回溯：弹出 "a"，回到 path=[]', str: 'aab', path: [], start: 0, currentSub: '', isPalin: null, result: [['a','a','b']], action: 'undo' },
  { lineNum: 10, phase: 'explore', description: 'end=2: sub=s[0:2]="aa"，检查是否回文', str: 'aab', path: [], start: 0, currentSub: 'aa', isPalin: null, result: [['a','a','b']], action: 'check' },
  { lineNum: 11, phase: 'explore', description: '"aa" 是回文，加入路径', str: 'aab', path: ['aa'], start: 2, currentSub: 'aa', isPalin: true, result: [['a','a','b']], action: 'choose' },
  { lineNum: 10, phase: 'explore', description: 'end=3: sub=s[2:3]="b"，检查是否回文', str: 'aab', path: ['aa'], start: 2, currentSub: 'b', isPalin: null, result: [['a','a','b']], action: 'check' },
  { lineNum: 11, phase: 'explore', description: '"b" 是回文，加入路径', str: 'aab', path: ['aa', 'b'], start: 3, currentSub: 'b', isPalin: true, result: [['a','a','b']], action: 'choose' },
  { lineNum: 7, phase: 'record', description: 'start=3==len(s)，记录分割方案 ["aa","b"]', str: 'aab', path: ['aa', 'b'], start: 3, currentSub: '', isPalin: null, result: [['a','a','b'],['aa','b']], action: 'record' },
  { lineNum: 14, phase: 'backtrack', description: '回溯：弹出 "b" 和 "aa"，回到根', str: 'aab', path: [], start: 0, currentSub: '', isPalin: null, result: [['a','a','b'],['aa','b']], action: 'undo' },
  { lineNum: 10, phase: 'explore', description: 'end=3: sub=s[0:3]="aab"，检查是否回文', str: 'aab', path: [], start: 0, currentSub: 'aab', isPalin: null, result: [['a','a','b'],['aa','b']], action: 'check' },
  { lineNum: 11, phase: 'backtrack', description: '"aab" 不是回文（aab != baa），跳过', str: 'aab', path: [], start: 0, currentSub: 'aab', isPalin: false, result: [['a','a','b'],['aa','b']], action: 'skip' },
  { lineNum: 16, phase: 'done', description: '回溯完成，共找到 2 个回文分割方案', str: 'aab', path: [], start: 0, currentSub: '', isPalin: null, result: [['a','a','b'],['aa','b']], action: null },
];

// Test case 2: s="a" → [["a"]]
const steps2 = [
  { lineNum: 2, phase: 'init', description: '初始化 result=[]，s="a"', str: 'a', path: [], start: 0, currentSub: '', isPalin: null, result: [], action: null },
  { lineNum: 15, phase: 'init', description: '调用 backtrack(0, [])，从索引 0 开始', str: 'a', path: [], start: 0, currentSub: '', isPalin: null, result: [], action: null },
  { lineNum: 10, phase: 'explore', description: 'end=1: sub=s[0:1]="a"，检查是否回文', str: 'a', path: [], start: 0, currentSub: 'a', isPalin: null, result: [], action: 'check' },
  { lineNum: 11, phase: 'explore', description: '"a" 是回文，加入路径', str: 'a', path: ['a'], start: 1, currentSub: 'a', isPalin: true, result: [], action: 'choose' },
  { lineNum: 7, phase: 'record', description: 'start=1==len(s)，记录分割方案 ["a"]', str: 'a', path: ['a'], start: 1, currentSub: '', isPalin: null, result: [['a']], action: 'record' },
  { lineNum: 14, phase: 'backtrack', description: '回溯：弹出 "a"，回到根', str: 'a', path: [], start: 0, currentSub: '', isPalin: null, result: [['a']], action: 'undo' },
  { lineNum: 16, phase: 'done', description: '回溯完成，仅 1 个分割方案 ["a"]', str: 'a', path: [], start: 0, currentSub: '', isPalin: null, result: [['a']], action: null },
];

const phaseLabels = { init: '初始化', explore: '探索', backtrack: '回溯', record: '记录', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">字符串 s（高亮 = 当前检查的子串）</div>
      <div class="array-row" id="str-array"></div>
    </div>
    <div class="card">
      <div class="section-title">回文检查</div>
      <div id="palin-check" style="font-family:var(--font-mono);font-size:14px"></div>
    </div>
    <div class="card">
      <div class="section-title">当前分割路径 path</div>
      <div class="stack-container" id="path-area"></div>
    </div>
    <div class="card">
      <div class="section-title">已找到的分割方案 result</div>
      <div id="result-area" style="font-family:var(--font-mono);font-size:13px"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '131. Palindrome Partitioning — 执行可视化',
  problemDesc: `
    <p>给你一个字符串 <code>s</code>，请你将 <code>s</code> 分割成一些子串，使每个子串都是回文串。返回 <code>s</code> 所有可能的分割方案。</p>
    <div class="example">输入：s = "aab"
输出：[["a","a","b"],["aa","b"]]</div>
  `,
  subtitle: `s = "${S}"`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '多种分割', steps: steps1, subtitle: 's = "aab"' },
    { name: '单字符', steps: steps2, subtitle: 's = "a"', setup(panel) { S = 'a'; setupPanel(panel); } },
  ],

  setup: setupPanel,

  render(s_state) {
    const s = s_state;
    const str = s.str || S;
    const subStart = s.start;
    const subEnd = s.currentSub ? subStart + s.currentSub.length : subStart;

    document.getElementById('str-array').innerHTML = str.split('').map((ch, idx) => {
      let cls = 'arr-cell';
      if (s.currentSub && idx >= subStart && idx < subEnd) cls += ' current';
      let partIdx = 0;
      for (const part of s.path) {
        if (idx >= partIdx && idx < partIdx + part.length) cls += ' in-window';
        partIdx += part.length;
      }
      return `<div class="${cls}"><div class="arr-val">${ch}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    const palinEl = document.getElementById('palin-check');
    if (s.currentSub) {
      const reversed = s.currentSub.split('').reverse().join('');
      const isPalin = s.currentSub === reversed;
      palinEl.innerHTML = `<div>子串 "<span style="color:#22d3ee">${s.currentSub}</span>" ${isPalin ? '==' : '!='} "<span style="color:${isPalin ? '#4ade80' : '#f87171'}">${reversed}</span>" → <span style="color:${isPalin ? '#4ade80' : '#f87171'};font-weight:700">${isPalin ? '是回文' : '非回文'}</span></div>`;
    } else {
      palinEl.innerHTML = '<div style="color:var(--text-muted)">等待检查...</div>';
    }

    const pathEl = document.getElementById('path-area');
    if (s.path.length === 0) {
      pathEl.innerHTML = '<div class="stack-empty">（路径为空）</div>';
    } else {
      pathEl.innerHTML = s.path.map((v, i) => {
        let cls = 'stack-item';
        if (i === s.path.length - 1 && s.action === 'choose') cls += ' just-pushed';
        return `<div class="${cls}">"${v}"</div>`;
      }).join('');
    }

    const resultEl = document.getElementById('result-area');
    if (s.result.length === 0) {
      resultEl.innerHTML = '<div style="color:var(--text-muted)">（暂无结果）</div>';
    } else {
      resultEl.innerHTML = s.result.map((r, i) => {
        const isNew = i === s.result.length - 1 && s.action === 'record';
        return `<div style="padding:2px 0;${isNew ? 'color:#4ade80;font-weight:700' : ''}">[${r.map(x => '"' + x + '"').join(', ')}]</div>`;
      }).join('');
    }

    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">共 ${s.result.length} 个回文分割方案</div>
          <div class="found-sub">"${str}" 的所有回文分割已找到</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
