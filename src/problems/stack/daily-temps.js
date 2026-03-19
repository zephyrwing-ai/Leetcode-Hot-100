let TEMPS = [73, 74, 75, 71, 69, 72, 76, 73];

const code = [
  'class Solution:',
  '    def dailyTemperatures(self, temperatures):',
  '        n = len(temperatures)',
  '        answer = [0] * n',
  '        stack = []',
  '        for i in range(n):',
  '            while stack and temperatures[i] > temperatures[stack[-1]]:',
  '                prev = stack.pop()',
  '                answer[prev] = i - prev',
  '            stack.append(i)',
  '        return answer',
];

const lineMap = { 6: 2, 7: 3, 8: 4, 9: 5, 10: 6, 11: 7, 12: 8, 13: 9, 14: 10 };

const steps1 = [
  { lineNum: 7, phase: 'init', description: '初始化 answer 数组全为 0', temperatures: [73,74,75,71,69,72,76,73], currentI: -1, stack: [], answer: [0,0,0,0,0,0,0,0], poppedIdx: null, justPushed: null },
  { lineNum: 8, phase: 'init', description: '初始化空栈 stack = []', temperatures: [73,74,75,71,69,72,76,73], currentI: -1, stack: [], answer: [0,0,0,0,0,0,0,0], poppedIdx: null, justPushed: null },
  // i=0
  { lineNum: 9, phase: 'push', description: 'i=0, temperatures[0]=73, 栈为空，直接入栈', temperatures: [73,74,75,71,69,72,76,73], currentI: 0, stack: [], answer: [0,0,0,0,0,0,0,0], poppedIdx: null, justPushed: null },
  { lineNum: 13, phase: 'push', description: '将索引 0 压入栈', temperatures: [73,74,75,71,69,72,76,73], currentI: 0, stack: [0], answer: [0,0,0,0,0,0,0,0], poppedIdx: null, justPushed: 0 },
  // i=1
  { lineNum: 9, phase: 'pop', description: 'i=1, temperatures[1]=74 > temperatures[0]=73, 触发出栈', temperatures: [73,74,75,71,69,72,76,73], currentI: 1, stack: [0], answer: [0,0,0,0,0,0,0,0], poppedIdx: null, justPushed: null },
  { lineNum: 11, phase: 'pop', description: '弹出索引 0, answer[0] = 1 - 0 = 1', temperatures: [73,74,75,71,69,72,76,73], currentI: 1, stack: [], answer: [1,0,0,0,0,0,0,0], poppedIdx: 0, justPushed: null, freshIdx: 0 },
  { lineNum: 13, phase: 'push', description: '将索引 1 压入栈', temperatures: [73,74,75,71,69,72,76,73], currentI: 1, stack: [1], answer: [1,0,0,0,0,0,0,0], poppedIdx: null, justPushed: 1 },
  // i=2
  { lineNum: 9, phase: 'pop', description: 'i=2, temperatures[2]=75 > temperatures[1]=74, 触发出栈', temperatures: [73,74,75,71,69,72,76,73], currentI: 2, stack: [1], answer: [1,0,0,0,0,0,0,0], poppedIdx: null, justPushed: null },
  { lineNum: 11, phase: 'pop', description: '弹出索引 1, answer[1] = 2 - 1 = 1', temperatures: [73,74,75,71,69,72,76,73], currentI: 2, stack: [], answer: [1,1,0,0,0,0,0,0], poppedIdx: 1, justPushed: null, freshIdx: 1 },
  { lineNum: 13, phase: 'push', description: '将索引 2 压入栈', temperatures: [73,74,75,71,69,72,76,73], currentI: 2, stack: [2], answer: [1,1,0,0,0,0,0,0], poppedIdx: null, justPushed: 2 },
  // i=3
  { lineNum: 9, phase: 'push', description: 'i=3, temperatures[3]=71 < temperatures[2]=75, 直接入栈', temperatures: [73,74,75,71,69,72,76,73], currentI: 3, stack: [2], answer: [1,1,0,0,0,0,0,0], poppedIdx: null, justPushed: null },
  { lineNum: 13, phase: 'push', description: '将索引 3 压入栈', temperatures: [73,74,75,71,69,72,76,73], currentI: 3, stack: [2,3], answer: [1,1,0,0,0,0,0,0], poppedIdx: null, justPushed: 3 },
  // i=4
  { lineNum: 9, phase: 'push', description: 'i=4, temperatures[4]=69 < temperatures[3]=71, 直接入栈', temperatures: [73,74,75,71,69,72,76,73], currentI: 4, stack: [2,3], answer: [1,1,0,0,0,0,0,0], poppedIdx: null, justPushed: null },
  { lineNum: 13, phase: 'push', description: '将索引 4 压入栈', temperatures: [73,74,75,71,69,72,76,73], currentI: 4, stack: [2,3,4], answer: [1,1,0,0,0,0,0,0], poppedIdx: null, justPushed: 4 },
  // i=5
  { lineNum: 10, phase: 'pop', description: 'i=5, temperatures[5]=72 > temperatures[4]=69, 触发出栈', temperatures: [73,74,75,71,69,72,76,73], currentI: 5, stack: [2,3,4], answer: [1,1,0,0,0,0,0,0], poppedIdx: null, justPushed: null },
  { lineNum: 11, phase: 'pop', description: '弹出索引 4, answer[4] = 5 - 4 = 1', temperatures: [73,74,75,71,69,72,76,73], currentI: 5, stack: [2,3], answer: [1,1,0,0,1,0,0,0], poppedIdx: 4, justPushed: null, freshIdx: 4 },
  { lineNum: 11, phase: 'pop', description: '72 > temperatures[3]=71, 继续弹出索引 3, answer[3] = 5 - 3 = 2', temperatures: [73,74,75,71,69,72,76,73], currentI: 5, stack: [2], answer: [1,1,0,2,1,0,0,0], poppedIdx: 3, justPushed: null, freshIdx: 3 },
  { lineNum: 13, phase: 'push', description: '将索引 5 压入栈', temperatures: [73,74,75,71,69,72,76,73], currentI: 5, stack: [2,5], answer: [1,1,0,2,1,0,0,0], poppedIdx: null, justPushed: 5 },
  // i=6
  { lineNum: 10, phase: 'pop', description: 'i=6, temperatures[6]=76 > temperatures[5]=72, 触发出栈', temperatures: [73,74,75,71,69,72,76,73], currentI: 6, stack: [2,5], answer: [1,1,0,2,1,0,0,0], poppedIdx: null, justPushed: null },
  { lineNum: 11, phase: 'pop', description: '弹出索引 5, answer[5] = 6 - 5 = 1', temperatures: [73,74,75,71,69,72,76,73], currentI: 6, stack: [2], answer: [1,1,0,2,1,1,0,0], poppedIdx: 5, justPushed: null, freshIdx: 5 },
  { lineNum: 11, phase: 'pop', description: '76 > temperatures[2]=75, 继续弹出索引 2, answer[2] = 6 - 2 = 4', temperatures: [73,74,75,71,69,72,76,73], currentI: 6, stack: [], answer: [1,1,4,2,1,1,0,0], poppedIdx: 2, justPushed: null, freshIdx: 2 },
  { lineNum: 13, phase: 'push', description: '将索引 6 压入栈', temperatures: [73,74,75,71,69,72,76,73], currentI: 6, stack: [6], answer: [1,1,4,2,1,1,0,0], poppedIdx: null, justPushed: 6 },
  // i=7
  { lineNum: 9, phase: 'push', description: 'i=7, temperatures[7]=73 < temperatures[6]=76, 直接入栈', temperatures: [73,74,75,71,69,72,76,73], currentI: 7, stack: [6], answer: [1,1,4,2,1,1,0,0], poppedIdx: null, justPushed: null },
  { lineNum: 13, phase: 'push', description: '将索引 7 压入栈, 遍历结束', temperatures: [73,74,75,71,69,72,76,73], currentI: 7, stack: [6,7], answer: [1,1,4,2,1,1,0,0], poppedIdx: null, justPushed: 7 },
  // done
  { lineNum: 14, phase: 'record', description: '栈中剩余索引 [6,7] 的 answer 保持为 0, 返回结果', temperatures: [73,74,75,71,69,72,76,73], currentI: -1, stack: [6,7], answer: [1,1,4,2,1,1,0,0], poppedIdx: null, justPushed: null },
];

// 2nd test case: [30,40,50,60]
const steps2 = [
  { lineNum: 7, phase: 'init', description: '初始化 answer 数组全为 0', temperatures: [30,40,50,60], currentI: -1, stack: [], answer: [0,0,0,0], poppedIdx: null, justPushed: null },
  { lineNum: 8, phase: 'init', description: '初始化空栈 stack = []', temperatures: [30,40,50,60], currentI: -1, stack: [], answer: [0,0,0,0], poppedIdx: null, justPushed: null },
  // i=0
  { lineNum: 9, phase: 'push', description: 'i=0, temperatures[0]=30, 栈为空，直接入栈', temperatures: [30,40,50,60], currentI: 0, stack: [], answer: [0,0,0,0], poppedIdx: null, justPushed: null },
  { lineNum: 13, phase: 'push', description: '将索引 0 压入栈', temperatures: [30,40,50,60], currentI: 0, stack: [0], answer: [0,0,0,0], poppedIdx: null, justPushed: 0 },
  // i=1
  { lineNum: 9, phase: 'pop', description: 'i=1, temperatures[1]=40 > temperatures[0]=30, 触发出栈', temperatures: [30,40,50,60], currentI: 1, stack: [0], answer: [0,0,0,0], poppedIdx: null, justPushed: null },
  { lineNum: 11, phase: 'pop', description: '弹出索引 0, answer[0] = 1 - 0 = 1', temperatures: [30,40,50,60], currentI: 1, stack: [], answer: [1,0,0,0], poppedIdx: 0, justPushed: null, freshIdx: 0 },
  { lineNum: 13, phase: 'push', description: '将索引 1 压入栈', temperatures: [30,40,50,60], currentI: 1, stack: [1], answer: [1,0,0,0], poppedIdx: null, justPushed: 1 },
  // i=2
  { lineNum: 9, phase: 'pop', description: 'i=2, temperatures[2]=50 > temperatures[1]=40, 触发出栈', temperatures: [30,40,50,60], currentI: 2, stack: [1], answer: [1,0,0,0], poppedIdx: null, justPushed: null },
  { lineNum: 11, phase: 'pop', description: '弹出索引 1, answer[1] = 2 - 1 = 1', temperatures: [30,40,50,60], currentI: 2, stack: [], answer: [1,1,0,0], poppedIdx: 1, justPushed: null, freshIdx: 1 },
  { lineNum: 13, phase: 'push', description: '将索引 2 压入栈', temperatures: [30,40,50,60], currentI: 2, stack: [2], answer: [1,1,0,0], poppedIdx: null, justPushed: 2 },
  // i=3
  { lineNum: 9, phase: 'pop', description: 'i=3, temperatures[3]=60 > temperatures[2]=50, 触发出栈', temperatures: [30,40,50,60], currentI: 3, stack: [2], answer: [1,1,0,0], poppedIdx: null, justPushed: null },
  { lineNum: 11, phase: 'pop', description: '弹出索引 2, answer[2] = 3 - 2 = 1', temperatures: [30,40,50,60], currentI: 3, stack: [], answer: [1,1,1,0], poppedIdx: 2, justPushed: null, freshIdx: 2 },
  { lineNum: 13, phase: 'push', description: '将索引 3 压入栈, 遍历结束', temperatures: [30,40,50,60], currentI: 3, stack: [3], answer: [1,1,1,0], poppedIdx: null, justPushed: 3 },
  { lineNum: 14, phase: 'record', description: '栈中剩余索引 [3] 的 answer 保持为 0, 返回 [1,1,1,0]', temperatures: [30,40,50,60], currentI: -1, stack: [3], answer: [1,1,1,0], poppedIdx: null, justPushed: null },
];

const phaseLabels = { init: '初始化', push: '入栈', pop: '出栈', record: '返回' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">温度数组 temperatures（蓝色 = 当前遍历元素）</div>
      <div class="array-row" id="temps-array"></div>
    </div>
    <div class="card">
      <div class="section-title">单调栈（存放索引，栈顶在右）</div>
      <div class="stack-container" id="stack-area"></div>
    </div>
    <div class="card">
      <div class="section-title">结果数组 answer</div>
      <div class="array-row" id="answer-array"></div>
    </div>
  `;
}

export default {
  title: '739. Daily Temperatures -- 执行可视化',
  problemDesc: `
    <p>给定一个整数数组 <code>temperatures</code> 表示每天的温度，返回一个数组 <code>answer</code>，其中 <code>answer[i]</code> 是指对于第 <code>i</code> 天，需要等待多少天才会有更高的温度。如果之后都不会更高，则为 <code>0</code>。</p>
    <div class="example">输入：temperatures = [73,74,75,71,69,72,76,73]
输出：[1,1,4,2,1,1,0,0]</div>
  `,
  subtitle: `temperatures = [${TEMPS}]`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '[73,74,75,71,69,72,76,73]', steps: steps1, subtitle: 'temperatures = [73,74,75,71,69,72,76,73]' },
    { name: '[30,40,50,60]', steps: steps2, subtitle: 'temperatures = [30,40,50,60] → [1,1,1,0]', setup(panel) { TEMPS = [30,40,50,60]; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const temps = s.temperatures || TEMPS;
    // temperatures array
    document.getElementById('temps-array').innerHTML = temps.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.currentI) cls += ' is-active';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    // stack
    const stackEl = document.getElementById('stack-area');
    if (s.stack.length === 0) {
      stackEl.innerHTML = '<div class="stack-empty">（栈为空）</div>';
    } else {
      stackEl.innerHTML = s.stack.map((idx, i) => {
        let cls = 'stack-item';
        if (i === s.stack.length - 1) cls += ' is-top';
        if (s.justPushed !== null && idx === s.justPushed) cls += ' just-pushed';
        return `<div class="${cls}">${idx}<span style="font-size:10px;opacity:.6;margin-left:3px">(${temps[idx]})</span></div>`;
      }).join('');
    }

    // answer array
    document.getElementById('answer-array').innerHTML = s.answer.map((v, idx) => {
      let cls = 'arr-cell';
      if (v > 0) cls += ' filled';
      if (s.freshIdx === idx) cls += ' fresh';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');
  },
};
