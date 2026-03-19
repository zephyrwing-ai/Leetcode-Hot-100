let INPUT = '3[a2[c]]';

const code = [
  'class Solution:',
  '    def decodeString(self, s):',
  '        stack = []',
  '        cur_str = ""',
  '        cur_num = 0',
  '        for char in s:',
  '            if char == "[":',
  '                stack.append((cur_str, cur_num))',
  '                cur_str, cur_num = "", 0',
  '            elif char == "]":',
  '                prev_str, num = stack.pop()',
  '                cur_str = prev_str + cur_str * num',
  '            elif char.isdigit():',
  '                cur_num = cur_num*10 + int(char)',
  '            else:',
  '                cur_str += char',
  '        return cur_str',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 15: 15, 16: 16 };

const steps1 = [
  { lineNum: 2, phase: 'init', description: '初始化：空栈，cur_str=""，cur_num=0', input: '3[a2[c]]', charIdx: -1, stack: [], curStr: '', curNum: 0, action: null, result: null },
  { lineNum: 5, phase: 'push-num', description: '遍历字符 "3"，是数字', input: '3[a2[c]]', charIdx: 0, stack: [], curStr: '', curNum: 0, action: null, result: null },
  { lineNum: 13, phase: 'push-num', description: 'cur_num = 0*10 + 3 = 3', input: '3[a2[c]]', charIdx: 0, stack: [], curStr: '', curNum: 3, action: 'digit', result: null },
  { lineNum: 7, phase: 'push-str', description: '遇到 "["，将 ("", 3) 压入栈，重置 cur_str 和 cur_num', input: '3[a2[c]]', charIdx: 1, stack: [{ str: '', num: 3 }], curStr: '', curNum: 0, action: 'push', result: null },
  { lineNum: 15, phase: 'push-str', description: '字符 "a" 是字母，cur_str = "" + "a" = "a"', input: '3[a2[c]]', charIdx: 2, stack: [{ str: '', num: 3 }], curStr: 'a', curNum: 0, action: 'append', result: null },
  { lineNum: 13, phase: 'push-num', description: '字符 "2" 是数字，cur_num = 0*10 + 2 = 2', input: '3[a2[c]]', charIdx: 3, stack: [{ str: '', num: 3 }], curStr: 'a', curNum: 2, action: 'digit', result: null },
  { lineNum: 7, phase: 'push-str', description: '遇到 "["，将 ("a", 2) 压入栈，重置 cur_str 和 cur_num', input: '3[a2[c]]', charIdx: 4, stack: [{ str: '', num: 3 }, { str: 'a', num: 2 }], curStr: '', curNum: 0, action: 'push', result: null },
  { lineNum: 15, phase: 'push-str', description: '字符 "c" 是字母，cur_str = "" + "c" = "c"', input: '3[a2[c]]', charIdx: 5, stack: [{ str: '', num: 3 }, { str: 'a', num: 2 }], curStr: 'c', curNum: 0, action: 'append', result: null },
  { lineNum: 10, phase: 'decode', description: '遇到 "]"，准备弹出栈顶 ("a", 2)', input: '3[a2[c]]', charIdx: 6, stack: [{ str: '', num: 3 }, { str: 'a', num: 2 }], curStr: 'c', curNum: 0, action: 'check-pop', result: null },
  { lineNum: 11, phase: 'decode', description: '弹出 ("a", 2)，cur_str = "a" + "c"*2 = "acc"', input: '3[a2[c]]', charIdx: 6, stack: [{ str: '', num: 3 }], curStr: 'acc', curNum: 0, action: 'pop', result: null },
  { lineNum: 10, phase: 'decode', description: '遇到 "]"，准备弹出栈顶 ("", 3)', input: '3[a2[c]]', charIdx: 7, stack: [{ str: '', num: 3 }], curStr: 'acc', curNum: 0, action: 'check-pop', result: null },
  { lineNum: 11, phase: 'decode', description: '弹出 ("", 3)，cur_str = "" + "acc"*3 = "accaccacc"', input: '3[a2[c]]', charIdx: 7, stack: [], curStr: 'accaccacc', curNum: 0, action: 'pop', result: null },
  { lineNum: 16, phase: 'done', description: '遍历结束，返回 "accaccacc"', input: '3[a2[c]]', charIdx: -1, stack: [], curStr: 'accaccacc', curNum: 0, action: null, result: 'accaccacc' },
];

// 2nd test case: "2[abc]3[cd]ef"
const steps2 = [
  { lineNum: 2, phase: 'init', description: '初始化：空栈，cur_str=""，cur_num=0', input: '2[abc]3[cd]ef', charIdx: -1, stack: [], curStr: '', curNum: 0, action: null, result: null },
  { lineNum: 13, phase: 'push-num', description: '字符 "2" 是数字，cur_num = 0*10 + 2 = 2', input: '2[abc]3[cd]ef', charIdx: 0, stack: [], curStr: '', curNum: 2, action: 'digit', result: null },
  { lineNum: 7, phase: 'push-str', description: '遇到 "["，将 ("", 2) 压入栈，重置', input: '2[abc]3[cd]ef', charIdx: 1, stack: [{ str: '', num: 2 }], curStr: '', curNum: 0, action: 'push', result: null },
  { lineNum: 15, phase: 'push-str', description: '字符 "a"，cur_str = "a"', input: '2[abc]3[cd]ef', charIdx: 2, stack: [{ str: '', num: 2 }], curStr: 'a', curNum: 0, action: 'append', result: null },
  { lineNum: 15, phase: 'push-str', description: '字符 "b"，cur_str = "ab"', input: '2[abc]3[cd]ef', charIdx: 3, stack: [{ str: '', num: 2 }], curStr: 'ab', curNum: 0, action: 'append', result: null },
  { lineNum: 15, phase: 'push-str', description: '字符 "c"，cur_str = "abc"', input: '2[abc]3[cd]ef', charIdx: 4, stack: [{ str: '', num: 2 }], curStr: 'abc', curNum: 0, action: 'append', result: null },
  { lineNum: 11, phase: 'decode', description: '遇到 "]"，弹出 ("", 2)，cur_str = "" + "abc"*2 = "abcabc"', input: '2[abc]3[cd]ef', charIdx: 5, stack: [], curStr: 'abcabc', curNum: 0, action: 'pop', result: null },
  { lineNum: 13, phase: 'push-num', description: '字符 "3" 是数字，cur_num = 0*10 + 3 = 3', input: '2[abc]3[cd]ef', charIdx: 6, stack: [], curStr: 'abcabc', curNum: 3, action: 'digit', result: null },
  { lineNum: 7, phase: 'push-str', description: '遇到 "["，将 ("abcabc", 3) 压入栈，重置', input: '2[abc]3[cd]ef', charIdx: 7, stack: [{ str: 'abcabc', num: 3 }], curStr: '', curNum: 0, action: 'push', result: null },
  { lineNum: 15, phase: 'push-str', description: '字符 "c"，cur_str = "c"', input: '2[abc]3[cd]ef', charIdx: 8, stack: [{ str: 'abcabc', num: 3 }], curStr: 'c', curNum: 0, action: 'append', result: null },
  { lineNum: 15, phase: 'push-str', description: '字符 "d"，cur_str = "cd"', input: '2[abc]3[cd]ef', charIdx: 9, stack: [{ str: 'abcabc', num: 3 }], curStr: 'cd', curNum: 0, action: 'append', result: null },
  { lineNum: 11, phase: 'decode', description: '遇到 "]"，弹出 ("abcabc", 3)，cur_str = "abcabc" + "cd"*3 = "abcabccdcdcd"', input: '2[abc]3[cd]ef', charIdx: 10, stack: [], curStr: 'abcabccdcdcd', curNum: 0, action: 'pop', result: null },
  { lineNum: 15, phase: 'push-str', description: '字符 "e"，cur_str = "abcabccdcdcde"', input: '2[abc]3[cd]ef', charIdx: 11, stack: [], curStr: 'abcabccdcdcde', curNum: 0, action: 'append', result: null },
  { lineNum: 15, phase: 'push-str', description: '字符 "f"，cur_str = "abcabccdcdcdef"', input: '2[abc]3[cd]ef', charIdx: 12, stack: [], curStr: 'abcabccdcdcdef', curNum: 0, action: 'append', result: null },
  { lineNum: 16, phase: 'done', description: '遍历结束，返回 "abcabccdcdcdef"', input: '2[abc]3[cd]ef', charIdx: -1, stack: [], curStr: 'abcabccdcdcdef', curNum: 0, action: null, result: 'abcabccdcdcdef' },
];

const phaseLabels = { init: '初始化', 'push-num': '读取数字', 'push-str': '压栈/拼接', decode: '解码', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">输入字符串（高亮 = 当前字符）</div>
      <div class="array-row" id="char-array"></div>
    </div>
    <div class="card">
      <div class="section-title">栈 Stack（存储 (prev_str, num) 对）</div>
      <div class="stack-container" id="stack-area"></div>
    </div>
    <div class="card">
      <div class="section-title">当前状态</div>
      <div id="state-area" style="font-family:var(--font-mono);font-size:13px;display:flex;flex-direction:column;gap:6px"></div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '394. Decode String — 执行可视化',
  problemDesc: `
    <p>给定一个经过编码的字符串，返回它解码后的字符串。编码规则为 <code>k[encoded_string]</code>，表示其中方括号内的 <code>encoded_string</code> 正好重复 <code>k</code> 次。</p>
    <div class="example">输入：s = "3[a2[c]]"
输出："accaccacc"</div>
  `,
  subtitle: `s = "${INPUT}"`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '3[a2[c]]', steps: steps1, subtitle: 's = "3[a2[c]]" → "accaccacc"' },
    { name: '2[abc]3[cd]ef', steps: steps2, subtitle: 's = "2[abc]3[cd]ef" → "abcabccdcdcdef"', setup(panel) { INPUT = '2[abc]3[cd]ef'; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const input = s.input || INPUT;
    // char array
    document.getElementById('char-array').innerHTML = input.split('').map((ch, idx) => {
      let cls = 'arr-cell';
      if (idx === s.charIdx) cls += ' current';
      if (idx < s.charIdx && s.charIdx >= 0) cls += ' is-skip';
      return `<div class="${cls}"><div class="arr-val">${ch}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    // stack
    const stackEl = document.getElementById('stack-area');
    if (s.stack.length === 0) {
      stackEl.innerHTML = '<div class="stack-empty">（栈为空）</div>';
    } else {
      stackEl.innerHTML = s.stack.map((item, i) => {
        let cls = 'stack-item';
        if (i === s.stack.length - 1) cls += ' is-top';
        if (i === s.stack.length - 1 && s.action === 'push') cls += ' just-pushed';
        const label = `"${item.str}", ${item.num}`;
        return `<div class="${cls}" style="width:auto;padding:0 12px">${label}</div>`;
      }).join('');
    }

    // state display
    const stateEl = document.getElementById('state-area');
    const curStrStyled = s.curStr
      ? `<span style="color:#4ade80;font-weight:700">"${s.curStr}"</span>`
      : '<span style="color:var(--text-muted)">""</span>';
    stateEl.innerHTML = `
      <div style="padding:4px 8px;border-radius:4px;background:var(--surface2)">
        cur_str = ${curStrStyled}
      </div>
      <div style="padding:4px 8px;border-radius:4px;background:var(--surface2)">
        cur_num = <span style="color:#f59e0b;font-weight:700">${s.curNum}</span>
      </div>
    `;

    // result
    const resultEl = document.getElementById('result-area');
    if (s.result !== null) {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">返回 "${s.result}"</div>
          <div class="found-sub">解码完成</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
