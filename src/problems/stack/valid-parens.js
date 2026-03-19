let S = '([{}])';

const code = [
  'class Solution:',
  '    def isValid(self, s):',
  '        stack = []',
  '        mapping = {")":"(", "]":"[", "}":"{"}',
  '        for char in s:',
  '            if char in mapping:',
  '                top = stack.pop() if stack else "#"',
  '                if mapping[char] != top:',
  '                    return False',
  '            else:',
  '                stack.append(char)',
  '        return len(stack) == 0',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 10: 10, 11: 11 };

const steps1 = [
  { lineNum: 2, phase: 'init', description: '初始化空栈 stack = []', input: '([{}])', charIdx: -1, stack: [], action: null, matched: null, result: null },
  { lineNum: 4, phase: 'push', description: '遍历第 1 个字符 "("，是左括号，准备压入栈', input: '([{}])', charIdx: 0, stack: [], action: null, matched: null, result: null },
  { lineNum: 10, phase: 'push', description: '"(" 压入栈', input: '([{}])', charIdx: 0, stack: ['('], action: 'push', matched: null, result: null },
  { lineNum: 10, phase: 'push', description: '遍历第 2 个字符 "["，是左括号，压入栈', input: '([{}])', charIdx: 1, stack: ['(', '['], action: 'push', matched: null, result: null },
  { lineNum: 10, phase: 'push', description: '遍历第 3 个字符 "{"，是左括号，压入栈', input: '([{}])', charIdx: 2, stack: ['(', '[', '{'], action: 'push', matched: null, result: null },
  { lineNum: 5, phase: 'check', description: '遍历第 4 个字符 "}"，是右括号，检查栈顶', input: '([{}])', charIdx: 3, stack: ['(', '[', '{'], action: 'check', matched: null, result: null },
  { lineNum: 6, phase: 'pop', description: '弹出栈顶 "{"，与 "}" 匹配成功', input: '([{}])', charIdx: 3, stack: ['(', '['], action: 'pop', matched: '{', result: null },
  { lineNum: 5, phase: 'check', description: '遍历第 5 个字符 "]"，是右括号，检查栈顶', input: '([{}])', charIdx: 4, stack: ['(', '['], action: 'check', matched: null, result: null },
  { lineNum: 6, phase: 'pop', description: '弹出栈顶 "["，与 "]" 匹配成功', input: '([{}])', charIdx: 4, stack: ['('], action: 'pop', matched: '[', result: null },
  { lineNum: 5, phase: 'check', description: '遍历第 6 个字符 ")"，是右括号，检查栈顶', input: '([{}])', charIdx: 5, stack: ['('], action: 'check', matched: null, result: null },
  { lineNum: 6, phase: 'pop', description: '弹出栈顶 "("，与 ")" 匹配成功', input: '([{}])', charIdx: 5, stack: [], action: 'pop', matched: '(', result: null },
  { lineNum: 11, phase: 'done', description: '栈为空，所有括号匹配成功，返回 True', input: '([{}])', charIdx: -1, stack: [], action: null, matched: null, result: true },
];

// 2nd test case: "(]" → false
const steps2 = [
  { lineNum: 2, phase: 'init', description: '初始化空栈 stack = []', input: '(]', charIdx: -1, stack: [], action: null, matched: null, result: null },
  { lineNum: 4, phase: 'push', description: '遍历第 1 个字符 "("，是左括号', input: '(]', charIdx: 0, stack: [], action: null, matched: null, result: null },
  { lineNum: 10, phase: 'push', description: '"(" 压入栈', input: '(]', charIdx: 0, stack: ['('], action: 'push', matched: null, result: null },
  { lineNum: 5, phase: 'check', description: '遍历第 2 个字符 "]"，是右括号，检查栈顶', input: '(]', charIdx: 1, stack: ['('], action: 'check', matched: null, result: null },
  { lineNum: 6, phase: 'pop', description: '弹出栈顶 "("，mapping["]"]="[" != "("，不匹配!', input: '(]', charIdx: 1, stack: [], action: 'pop', matched: '(', result: null },
  { lineNum: 8, phase: 'done', description: '括号类型不匹配，返回 False', input: '(]', charIdx: 1, stack: [], action: null, matched: null, result: false },
];

const phaseLabels = { init: '初始化', push: '压栈', check: '检查', pop: '弹栈', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">输入字符串（高亮 = 当前字符）</div>
      <div class="array-row" id="char-array"></div>
    </div>
    <div class="card">
      <div class="section-title">栈 Stack（底部 → 顶部）</div>
      <div class="stack-container" id="stack-area"></div>
      <div class="legend-row">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>刚压入</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(248,113,113,0.4);border:1px solid #f87171"></div>刚弹出</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>栈顶</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '20. Valid Parentheses — 执行可视化',
  problemDesc: `
    <p>给定一个只包括 <code>'('</code>、<code>')'</code>、<code>'{'</code>、<code>'}'</code>、<code>'['</code>、<code>']'</code> 的字符串 <code>s</code>，判断字符串是否有效。有效字符串需满足：左括号必须用相同类型的右括号闭合，且左括号必须以正确的顺序闭合。</p>
    <div class="example">输入：s = "([{}])"
输出：true</div>
  `,
  subtitle: `s = "${S}"`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '"([{}])" → true', steps: steps1, subtitle: 's = "([{}])" → true' },
    { name: '"(]" → false', steps: steps2, subtitle: 's = "(]" → false', setup(panel) { S = '(]'; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const input = s.input || S;
    // char array
    document.getElementById('char-array').innerHTML = input.split('').map((ch, idx) => {
      let cls = 'arr-cell';
      if (idx === s.charIdx) cls += ' current';
      if (s.matched && idx < s.charIdx) cls += ' is-skip';
      return `<div class="${cls}"><div class="arr-val">${ch}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    // stack
    const stackEl = document.getElementById('stack-area');
    if (s.stack.length === 0 && s.action !== 'pop') {
      stackEl.innerHTML = '<div class="stack-empty">（栈为空）</div>';
    } else {
      const items = [...s.stack];
      const html = items.map((item, i) => {
        let cls = 'stack-item';
        if (i === items.length - 1) cls += ' is-top';
        if (i === items.length - 1 && s.action === 'push') cls += ' just-pushed';
        return `<div class="${cls}">${item}</div>`;
      }).join('');
      let poppedHtml = '';
      if (s.action === 'pop' && s.matched) {
        poppedHtml = `<div class="stack-item just-popped">${s.matched}</div>`;
      }
      stackEl.innerHTML = (items.length === 0 ? '<div class="stack-empty">（栈为空）</div>' : html) + poppedHtml;
    }

    // result
    const resultEl = document.getElementById('result-area');
    if (s.result !== null) {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">${s.result ? '\u2713' : '\u2717'}</div>
        <div>
          <div class="found-text">返回 ${s.result ? 'True' : 'False'}</div>
          <div class="found-sub">${s.result ? '所有括号匹配成功，栈为空' : '括号匹配失败'}</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
