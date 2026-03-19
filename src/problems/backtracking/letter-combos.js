let DIGITS = '23';
const PHONE = { '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz' };

const code = [
  'class Solution:',
  '    def letterCombinations(self, digits):',
  '        if not digits: return []',
  '        phone = {"2":"abc","3":"def","4":"ghi",',
  '                 "5":"jkl","6":"mno","7":"pqrs",',
  '                 "8":"tuv","9":"wxyz"}',
  '        result = []',
  '        def backtrack(idx, combo):',
  '            if idx == len(digits):',
  '                result.append(combo)',
  '                return',
  '            for letter in phone[digits[idx]]:',
  '                backtrack(idx+1, combo+letter)',
  '        backtrack(0, "")',
  '        return result',
];

const lineMap = { 2: 2, 3: 3, 6: 6, 7: 7, 8: 8, 9: 9, 11: 11, 12: 12, 13: 13, 14: 14 };

const steps1 = [
  { lineNum: 6, phase: 'init', description: '初始化 result = []，digits="23"', digits: '23', combo: '', digitIdx: 0, currentLetter: '', result: [], action: null },
  { lineNum: 13, phase: 'init', description: '调用 backtrack(0, "")，处理第一个数字 "2"→"abc"', digits: '23', combo: '', digitIdx: 0, currentLetter: '', result: [], action: null },
  { lineNum: 11, phase: 'explore', description: 'digits[0]="2"→"abc"，选择字母 "a"', digits: '23', combo: 'a', digitIdx: 0, currentLetter: 'a', result: [], action: 'choose' },
  { lineNum: 11, phase: 'explore', description: 'digits[1]="3"→"def"，选择字母 "d"', digits: '23', combo: 'ad', digitIdx: 1, currentLetter: 'd', result: [], action: 'choose' },
  { lineNum: 9, phase: 'record', description: 'idx=2 等于 digits 长度，记录组合 "ad"', digits: '23', combo: 'ad', digitIdx: 2, currentLetter: '', result: ['ad'], action: 'record' },
  { lineNum: 11, phase: 'explore', description: '回到 digits[1]="3"，选择字母 "e"', digits: '23', combo: 'ae', digitIdx: 1, currentLetter: 'e', result: ['ad'], action: 'choose' },
  { lineNum: 9, phase: 'record', description: '记录组合 "ae"', digits: '23', combo: 'ae', digitIdx: 2, currentLetter: '', result: ['ad', 'ae'], action: 'record' },
  { lineNum: 11, phase: 'explore', description: '回到 digits[1]="3"，选择字母 "f"', digits: '23', combo: 'af', digitIdx: 1, currentLetter: 'f', result: ['ad', 'ae'], action: 'choose' },
  { lineNum: 9, phase: 'record', description: '记录组合 "af"', digits: '23', combo: 'af', digitIdx: 2, currentLetter: '', result: ['ad', 'ae', 'af'], action: 'record' },
  { lineNum: 11, phase: 'backtrack', description: '回溯到 digits[0]="2"，选择下一个字母 "b"', digits: '23', combo: 'b', digitIdx: 0, currentLetter: 'b', result: ['ad', 'ae', 'af'], action: 'choose' },
  { lineNum: 11, phase: 'explore', description: 'digits[1]="3"→"def"，选择字母 "d"', digits: '23', combo: 'bd', digitIdx: 1, currentLetter: 'd', result: ['ad', 'ae', 'af'], action: 'choose' },
  { lineNum: 9, phase: 'record', description: '记录组合 "bd"', digits: '23', combo: 'bd', digitIdx: 2, currentLetter: '', result: ['ad', 'ae', 'af', 'bd'], action: 'record' },
  { lineNum: 11, phase: 'explore', description: '选择字母 "e"', digits: '23', combo: 'be', digitIdx: 1, currentLetter: 'e', result: ['ad', 'ae', 'af', 'bd'], action: 'choose' },
  { lineNum: 9, phase: 'record', description: '记录组合 "be"', digits: '23', combo: 'be', digitIdx: 2, currentLetter: '', result: ['ad', 'ae', 'af', 'bd', 'be'], action: 'record' },
  { lineNum: 11, phase: 'explore', description: '选择字母 "f"', digits: '23', combo: 'bf', digitIdx: 1, currentLetter: 'f', result: ['ad', 'ae', 'af', 'bd', 'be'], action: 'choose' },
  { lineNum: 9, phase: 'record', description: '记录组合 "bf"', digits: '23', combo: 'bf', digitIdx: 2, currentLetter: '', result: ['ad', 'ae', 'af', 'bd', 'be', 'bf'], action: 'record' },
  { lineNum: 11, phase: 'backtrack', description: '回溯到 digits[0]="2"，选择下一个字母 "c"', digits: '23', combo: 'c', digitIdx: 0, currentLetter: 'c', result: ['ad', 'ae', 'af', 'bd', 'be', 'bf'], action: 'choose' },
  { lineNum: 11, phase: 'explore', description: 'digits[1]="3"→"def"，选择字母 "d"', digits: '23', combo: 'cd', digitIdx: 1, currentLetter: 'd', result: ['ad', 'ae', 'af', 'bd', 'be', 'bf'], action: 'choose' },
  { lineNum: 9, phase: 'record', description: '记录组合 "cd"', digits: '23', combo: 'cd', digitIdx: 2, currentLetter: '', result: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd'], action: 'record' },
  { lineNum: 11, phase: 'explore', description: '选择字母 "e"', digits: '23', combo: 'ce', digitIdx: 1, currentLetter: 'e', result: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd'], action: 'choose' },
  { lineNum: 9, phase: 'record', description: '记录组合 "ce"', digits: '23', combo: 'ce', digitIdx: 2, currentLetter: '', result: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce'], action: 'record' },
  { lineNum: 11, phase: 'explore', description: '选择字母 "f"', digits: '23', combo: 'cf', digitIdx: 1, currentLetter: 'f', result: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce'], action: 'choose' },
  { lineNum: 9, phase: 'record', description: '记录组合 "cf"', digits: '23', combo: 'cf', digitIdx: 2, currentLetter: '', result: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'], action: 'record' },
  { lineNum: 14, phase: 'done', description: '回溯完成，共找到 9 个字母组合', digits: '23', combo: '', digitIdx: -1, currentLetter: '', result: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'], action: null },
];

// Test case 2: digits="2" → ["a","b","c"]
const steps2 = [
  { lineNum: 6, phase: 'init', description: '初始化 result = []，digits="2"', digits: '2', combo: '', digitIdx: 0, currentLetter: '', result: [], action: null },
  { lineNum: 13, phase: 'init', description: '调用 backtrack(0, "")，处理数字 "2"→"abc"', digits: '2', combo: '', digitIdx: 0, currentLetter: '', result: [], action: null },
  { lineNum: 11, phase: 'explore', description: 'digits[0]="2"→"abc"，选择字母 "a"', digits: '2', combo: 'a', digitIdx: 0, currentLetter: 'a', result: [], action: 'choose' },
  { lineNum: 9, phase: 'record', description: 'idx=1 等于 digits 长度，记录组合 "a"', digits: '2', combo: 'a', digitIdx: 1, currentLetter: '', result: ['a'], action: 'record' },
  { lineNum: 11, phase: 'explore', description: '回到 digits[0]="2"，选择字母 "b"', digits: '2', combo: 'b', digitIdx: 0, currentLetter: 'b', result: ['a'], action: 'choose' },
  { lineNum: 9, phase: 'record', description: '记录组合 "b"', digits: '2', combo: 'b', digitIdx: 1, currentLetter: '', result: ['a', 'b'], action: 'record' },
  { lineNum: 11, phase: 'explore', description: '回到 digits[0]="2"，选择字母 "c"', digits: '2', combo: 'c', digitIdx: 0, currentLetter: 'c', result: ['a', 'b'], action: 'choose' },
  { lineNum: 9, phase: 'record', description: '记录组合 "c"', digits: '2', combo: 'c', digitIdx: 1, currentLetter: '', result: ['a', 'b', 'c'], action: 'record' },
  { lineNum: 14, phase: 'done', description: '回溯完成，共找到 3 个字母组合', digits: '2', combo: '', digitIdx: -1, currentLetter: '', result: ['a', 'b', 'c'], action: null },
];

const phaseLabels = { init: '初始化', explore: '探索', backtrack: '回溯', record: '记录', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">数字到字母映射</div>
      <div class="array-row" id="digit-map"></div>
    </div>
    <div class="card">
      <div class="section-title">当前组合构建</div>
      <div class="stack-container" id="combo-area"></div>
      <div style="margin-top:8px;font-family:var(--font-mono);font-size:14px" id="current-letters"></div>
    </div>
    <div class="card">
      <div class="section-title">已收集的组合 result</div>
      <div id="result-area" style="font-family:var(--font-mono);font-size:13px;display:flex;flex-wrap:wrap;gap:6px"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '17. Letter Combinations — 执行可视化',
  problemDesc: `
    <p>给定一个仅包含数字 <code>2-9</code> 的字符串，返回所有它能表示的字母组合（按电话按键映射）。答案可以按任意顺序返回。</p>
    <div class="example">输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]</div>
  `,
  subtitle: `digits = "${DIGITS}"`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '两位数字', steps: steps1, subtitle: 'digits = "23"' },
    { name: '单个数字', steps: steps2, subtitle: 'digits = "2"', setup(panel) { DIGITS = '2'; setupPanel(panel); } },
  ],

  setup: setupPanel,

  render(s) {
    const digits = s.digits || DIGITS;
    document.getElementById('digit-map').innerHTML = digits.split('').map((d, idx) => {
      let cls = 'arr-cell';
      if (idx === s.digitIdx) cls += ' current';
      return `<div class="${cls}"><div class="arr-val">${d} → ${PHONE[d]}</div><div class="arr-idx">digits[${idx}]</div></div>`;
    }).join('');

    const comboEl = document.getElementById('combo-area');
    if (s.combo === '') {
      comboEl.innerHTML = '<div class="stack-empty">（空字符串）</div>';
    } else {
      comboEl.innerHTML = s.combo.split('').map((ch, i) => {
        let cls = 'stack-item';
        if (i === s.combo.length - 1 && s.action === 'choose') cls += ' just-pushed';
        return `<div class="${cls}">${ch}</div>`;
      }).join('');
    }

    const lettersEl = document.getElementById('current-letters');
    if (s.digitIdx >= 0 && s.digitIdx < digits.length) {
      const letters = PHONE[digits[s.digitIdx]];
      lettersEl.innerHTML = `可选字母: ${letters.split('').map(l =>
        `<span style="padding:2px 8px;margin:0 2px;border-radius:4px;${l === s.currentLetter ? 'background:rgba(34,211,238,0.3);color:#22d3ee;font-weight:700' : 'background:rgba(255,255,255,0.05)'}">${l}</span>`
      ).join('')}`;
    } else {
      lettersEl.innerHTML = '';
    }

    const resultEl = document.getElementById('result-area');
    if (s.result.length === 0) {
      resultEl.innerHTML = '<div style="color:var(--text-muted)">（暂无结果）</div>';
    } else {
      resultEl.innerHTML = s.result.map((r, i) => {
        const isNew = i === s.result.length - 1 && s.action === 'record';
        return `<div style="padding:3px 8px;border-radius:4px;${isNew ? 'background:rgba(74,222,128,0.2);color:#4ade80;font-weight:700' : 'background:rgba(255,255,255,0.05)'}">"${r}"</div>`;
      }).join('');
    }

    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">共 ${s.result.length} 个组合</div>
          <div class="found-sub">digits="${digits}" 的所有字母组合已找到</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
