let OPS = [
  { op: 'push', val: -2 },
  { op: 'push', val: 0 },
  { op: 'push', val: -3 },
  { op: 'getMin' },
  { op: 'pop' },
  { op: 'top' },
  { op: 'getMin' },
];

const code = [
  'class MinStack(object):',
  '    def __init__(self):',
  '        self.stack = []',
  '        self.min_stack = []',
  '',
  '    def push(self, val):',
  '        self.stack.append(val)',
  '        if not self.min_stack or val <= self.min_stack[-1]:',
  '            self.min_stack.append(val)',
  '',
  '    def pop(self):',
  '        val = self.stack.pop()',
  '        if val == self.min_stack[-1]:',
  '            self.min_stack.pop()',
  '',
  '    def top(self):',
  '        return self.stack[-1]',
  '',
  '    def getMin(self):',
  '        return self.min_stack[-1]',
];

const lineMap = { 2: 2, 3: 3, 6: 6, 7: 7, 8: 8, 11: 11, 12: 12, 13: 13, 16: 16, 19: 19 };

const steps1 = [
  { lineNum: 2, phase: 'init', description: '初始化 MinStack：主栈和辅助最小栈均为空', mainStack: [], minStack: [], action: null, opLabel: 'MinStack()', result: null, justVal: null },
  { lineNum: 6, phase: 'push', description: 'push(-2)：准备压入主栈', mainStack: [], minStack: [], action: null, opLabel: 'push(-2)', result: null, justVal: -2 },
  { lineNum: 7, phase: 'push', description: 'push(-2)：压入主栈，-2 <= 空栈，同时压入最小栈', mainStack: [-2], minStack: [-2], action: 'push', opLabel: 'push(-2)', result: null, justVal: -2 },
  { lineNum: 6, phase: 'push', description: 'push(0)：压入主栈，0 > -2，不压入最小栈', mainStack: [-2, 0], minStack: [-2], action: 'push', opLabel: 'push(0)', result: null, justVal: 0 },
  { lineNum: 6, phase: 'push', description: 'push(-3)：准备压入主栈', mainStack: [-2, 0], minStack: [-2], action: null, opLabel: 'push(-3)', result: null, justVal: -3 },
  { lineNum: 7, phase: 'push', description: 'push(-3)：压入主栈，-3 <= -2，同时压入最小栈', mainStack: [-2, 0, -3], minStack: [-2, -3], action: 'push', opLabel: 'push(-3)', result: null, justVal: -3 },
  { lineNum: 19, phase: 'getMin', description: 'getMin()：最小栈栈顶为 -3，返回 -3', mainStack: [-2, 0, -3], minStack: [-2, -3], action: 'getMin', opLabel: 'getMin()', result: -3, justVal: null },
  { lineNum: 11, phase: 'pop', description: 'pop()：准备弹出主栈顶 -3', mainStack: [-2, 0, -3], minStack: [-2, -3], action: null, opLabel: 'pop()', result: null, justVal: -3 },
  { lineNum: 12, phase: 'pop', description: 'pop()：弹出 -3，等于最小栈顶 -3，同时弹出最小栈', mainStack: [-2, 0], minStack: [-2], action: 'pop', opLabel: 'pop()', result: null, justVal: -3 },
  { lineNum: 16, phase: 'top', description: 'top()：返回主栈顶元素 0', mainStack: [-2, 0], minStack: [-2], action: 'top', opLabel: 'top()', result: 0, justVal: null },
  { lineNum: 19, phase: 'getMin', description: 'getMin()：最小栈栈顶为 -2，返回 -2', mainStack: [-2, 0], minStack: [-2], action: 'getMin', opLabel: 'getMin()', result: -2, justVal: null },
];

// 2nd test case: different op sequence
const steps2 = [
  { lineNum: 2, phase: 'init', description: '初始化 MinStack：主栈和辅助最小栈均为空', mainStack: [], minStack: [], action: null, opLabel: 'MinStack()', result: null, justVal: null },
  { lineNum: 7, phase: 'push', description: 'push(1)：压入主栈，1 <= 空栈，同时压入最小栈', mainStack: [1], minStack: [1], action: 'push', opLabel: 'push(1)', result: null, justVal: 1 },
  { lineNum: 7, phase: 'push', description: 'push(2)：压入主栈，2 > 1，不压入最小栈', mainStack: [1, 2], minStack: [1], action: 'push', opLabel: 'push(2)', result: null, justVal: 2 },
  { lineNum: 19, phase: 'getMin', description: 'getMin()：最小栈栈顶为 1，返回 1', mainStack: [1, 2], minStack: [1], action: 'getMin', opLabel: 'getMin()', result: 1, justVal: null },
  { lineNum: 7, phase: 'push', description: 'push(0)：压入主栈，0 <= 1，同时压入最小栈', mainStack: [1, 2, 0], minStack: [1, 0], action: 'push', opLabel: 'push(0)', result: null, justVal: 0 },
  { lineNum: 19, phase: 'getMin', description: 'getMin()：最小栈栈顶为 0，返回 0', mainStack: [1, 2, 0], minStack: [1, 0], action: 'getMin', opLabel: 'getMin()', result: 0, justVal: null },
  { lineNum: 12, phase: 'pop', description: 'pop()：弹出 0，等于最小栈顶 0，同时弹出最小栈', mainStack: [1, 2], minStack: [1], action: 'pop', opLabel: 'pop()', result: null, justVal: 0 },
  { lineNum: 19, phase: 'getMin', description: 'getMin()：最小栈栈顶恢复为 1，返回 1', mainStack: [1, 2], minStack: [1], action: 'getMin', opLabel: 'getMin()', result: 1, justVal: null },
  { lineNum: 16, phase: 'top', description: 'top()：返回主栈顶元素 2', mainStack: [1, 2], minStack: [1], action: 'top', opLabel: 'top()', result: 2, justVal: null },
  { lineNum: 12, phase: 'pop', description: 'pop()：弹出 2，不等于最小栈顶 1，最小栈不变', mainStack: [1], minStack: [1], action: 'pop', opLabel: 'pop()', result: null, justVal: 2 },
  { lineNum: 16, phase: 'top', description: 'top()：返回主栈顶元素 1', mainStack: [1], minStack: [1], action: 'top', opLabel: 'top()', result: 1, justVal: null },
  { lineNum: 19, phase: 'getMin', description: 'getMin()：最小栈栈顶为 1，返回 1', mainStack: [1], minStack: [1], action: 'getMin', opLabel: 'getMin()', result: 1, justVal: null },
];

const phaseLabels = { init: '初始化', push: '压栈', pop: '弹栈', getMin: '获取最小值', top: '获取栈顶' };

function renderStack(items, id, justVal, action, isMinStack) {
  const el = document.getElementById(id);
  if (items.length === 0) {
    el.innerHTML = '<div class="stack-empty">（栈为空）</div>';
    return;
  }
  el.innerHTML = items.map((v, i) => {
    let cls = 'stack-item';
    if (i === items.length - 1) cls += ' is-top';
    if (isMinStack && i === items.length - 1) cls += ' is-min';
    if (action === 'push' && v === justVal && i === items.length - 1) cls += ' just-pushed';
    return `<div class="${cls}">${v}</div>`;
  }).join('');
}

function setupPanel(panel) {
  panel.innerHTML = `
    <div style="display:flex;gap:16px;flex-wrap:wrap">
      <div class="card" style="flex:1;min-width:140px">
        <div class="section-title">主栈 Stack</div>
        <div class="stack-container" id="main-stack"></div>
      </div>
      <div class="card" style="flex:1;min-width:140px">
        <div class="section-title">最小栈 Min Stack</div>
        <div class="stack-container" id="min-stack"></div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">操作日志</div>
      <div id="op-log" style="font-family:var(--font-mono);font-size:13px;display:flex;flex-direction:column;gap:4px"></div>
    </div>
    <div id="result-area"></div>
  `;
  window.__minStackLog = [];
}

export default {
  title: '155. Min Stack — 执行可视化',
  problemDesc: `
    <p>设计一个支持 <code>push</code>、<code>pop</code>、<code>top</code> 操作，并能在常数时间内检索到最小元素的栈。实现 <code>MinStack</code> 类，其中 <code>getMin()</code> 返回栈中的最小元素。</p>
    <div class="example">输入：["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]
输出：[null,null,null,null,-3,null,0,-2]</div>
  `,
  subtitle: 'push(-2), push(0), push(-3), getMin, pop, top, getMin',
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '标准操作序列', steps: steps1, subtitle: 'push(-2), push(0), push(-3), getMin, pop, top, getMin' },
    { name: '交替 push/pop', steps: steps2, subtitle: 'push(1), push(2), getMin, push(0), getMin, pop, getMin, top, pop, top, getMin', setup(panel) { setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    renderStack(s.mainStack, 'main-stack', s.justVal, s.action, false);
    renderStack(s.minStack, 'min-stack', s.justVal, s.action, true);

    // operation log
    if (!window.__minStackLog) window.__minStackLog = [];
    const logEntry = s.opLabel;
    const logs = window.__minStackLog;
    if (logs.length === 0 || logs[logs.length - 1] !== logEntry) {
      logs.push(logEntry);
    }
    const logEl = document.getElementById('op-log');
    logEl.innerHTML = logs.map((entry, i) => {
      const isCurrent = i === logs.length - 1;
      return `<div style="padding:3px 8px;border-radius:4px;${isCurrent ? 'background:rgba(56,189,248,0.12);color:#7dd3fc;border-left:3px solid #38bdf8' : 'color:var(--text-muted)'}">${entry}</div>`;
    }).join('');

    // result display
    const resultEl = document.getElementById('result-area');
    if (s.result !== null) {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">${s.opLabel} = ${s.result}</div>
          <div class="found-sub">当前主栈: [${s.mainStack}] | 最小栈: [${s.minStack}]</div>
        </div>
      </div>`;
    } else if (s.action === 'pop') {
      resultEl.innerHTML = `<div class="card found-box" style="border-color:#f87171;background:rgba(248,113,113,0.08)">
        <div class="found-icon" style="color:#f87171">\u2191</div>
        <div>
          <div class="found-text" style="color:#f87171">pop() 弹出 ${s.justVal}</div>
          <div class="found-sub">主栈: [${s.mainStack}] | 最小栈: [${s.minStack}]</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
