let HEIGHTS = [2, 1, 5, 6, 2, 3];
let MAX_H = Math.max(...HEIGHTS);

const code = [
  'class Solution:',
  '    def largestRectangleArea(self, heights):',
  '        stack = []',
  '        max_area = 0',
  '        heights.append(0)',
  '        for i in range(len(heights)):',
  '            while stack and heights[i] < heights[stack[-1]]:',
  '                h = heights[stack.pop()]',
  '                w = i if not stack else i - stack[-1] - 1',
  '                max_area = max(max_area, h * w)',
  '            stack.append(i)',
  '        return max_area',
];

const lineMap = { 7: 2, 8: 3, 9: 4, 10: 5, 11: 6, 12: 7, 13: 8, 14: 9, 15: 10, 16: 11 };

const steps1 = [
  { lineNum: 7, phase: 'init', description: '初始化空栈和 max_area = 0', currentI: -1, stack: [], maxArea: 0, heights: [2,1,5,6,2,3,0], calcSpan: null, calcH: null, calcW: null, calcArea: null, justPushed: null, poppedIdx: null },
  { lineNum: 9, phase: 'init', description: '末尾追加哨兵 0, 确保最终全部出栈', currentI: -1, stack: [], maxArea: 0, heights: [2,1,5,6,2,3,0], calcSpan: null, calcH: null, calcW: null, calcArea: null, justPushed: null, poppedIdx: null },
  // i=0
  { lineNum: 15, phase: 'push', description: 'i=0, heights[0]=2, 栈空直接入栈', currentI: 0, stack: [0], maxArea: 0, heights: [2,1,5,6,2,3,0], calcSpan: null, calcH: null, calcW: null, calcArea: null, justPushed: 0, poppedIdx: null },
  // i=1, pop
  { lineNum: 11, phase: 'pop', description: 'i=1, heights[1]=1 < heights[0]=2, 触发出栈', currentI: 1, stack: [0], maxArea: 0, heights: [2,1,5,6,2,3,0], calcSpan: null, calcH: null, calcW: null, calcArea: null, justPushed: null, poppedIdx: null },
  { lineNum: 14, phase: 'calc', description: '弹出索引 0: h=2, w=1, area=2, max_area=2', currentI: 1, stack: [], maxArea: 2, heights: [2,1,5,6,2,3,0], calcSpan: [0, 0], calcH: 2, calcW: 1, calcArea: 2, justPushed: null, poppedIdx: 0 },
  { lineNum: 15, phase: 'push', description: '将索引 1 压入栈', currentI: 1, stack: [1], maxArea: 2, heights: [2,1,5,6,2,3,0], calcSpan: null, calcH: null, calcW: null, calcArea: null, justPushed: 1, poppedIdx: null },
  // i=2, push
  { lineNum: 15, phase: 'push', description: 'i=2, heights[2]=5 >= heights[1]=1, 直接入栈', currentI: 2, stack: [1, 2], maxArea: 2, heights: [2,1,5,6,2,3,0], calcSpan: null, calcH: null, calcW: null, calcArea: null, justPushed: 2, poppedIdx: null },
  // i=3, push
  { lineNum: 15, phase: 'push', description: 'i=3, heights[3]=6 >= heights[2]=5, 直接入栈', currentI: 3, stack: [1, 2, 3], maxArea: 2, heights: [2,1,5,6,2,3,0], calcSpan: null, calcH: null, calcW: null, calcArea: null, justPushed: 3, poppedIdx: null },
  // i=4, pop 3, pop 2
  { lineNum: 11, phase: 'pop', description: 'i=4, heights[4]=2 < heights[3]=6, 触发出栈', currentI: 4, stack: [1, 2, 3], maxArea: 2, heights: [2,1,5,6,2,3,0], calcSpan: null, calcH: null, calcW: null, calcArea: null, justPushed: null, poppedIdx: null },
  { lineNum: 14, phase: 'calc', description: '弹出索引 3: h=6, w=4-2-1=1, area=6, max_area=6', currentI: 4, stack: [1, 2], maxArea: 6, heights: [2,1,5,6,2,3,0], calcSpan: [3, 3], calcH: 6, calcW: 1, calcArea: 6, justPushed: null, poppedIdx: 3 },
  { lineNum: 14, phase: 'calc', description: '弹出索引 2: h=5, w=4-1-1=2, area=10, max_area=10!', currentI: 4, stack: [1], maxArea: 10, heights: [2,1,5,6,2,3,0], calcSpan: [2, 3], calcH: 5, calcW: 2, calcArea: 10, justPushed: null, poppedIdx: 2 },
  { lineNum: 15, phase: 'push', description: '将索引 4 压入栈', currentI: 4, stack: [1, 4], maxArea: 10, heights: [2,1,5,6,2,3,0], calcSpan: null, calcH: null, calcW: null, calcArea: null, justPushed: 4, poppedIdx: null },
  // i=5, push
  { lineNum: 15, phase: 'push', description: 'i=5, heights[5]=3 >= heights[4]=2, 直接入栈', currentI: 5, stack: [1, 4, 5], maxArea: 10, heights: [2,1,5,6,2,3,0], calcSpan: null, calcH: null, calcW: null, calcArea: null, justPushed: 5, poppedIdx: null },
  // i=6 sentinel
  { lineNum: 11, phase: 'pop', description: 'i=6 (哨兵 0), heights[6]=0 < heights[5]=3, 触发出栈', currentI: 6, stack: [1, 4, 5], maxArea: 10, heights: [2,1,5,6,2,3,0], calcSpan: null, calcH: null, calcW: null, calcArea: null, justPushed: null, poppedIdx: null },
  { lineNum: 14, phase: 'calc', description: '弹出索引 5: h=3, w=6-4-1=1, area=3', currentI: 6, stack: [1, 4], maxArea: 10, heights: [2,1,5,6,2,3,0], calcSpan: [5, 5], calcH: 3, calcW: 1, calcArea: 3, justPushed: null, poppedIdx: 5 },
  { lineNum: 14, phase: 'calc', description: '弹出索引 4: h=2, w=6-1-1=4, area=8', currentI: 6, stack: [1], maxArea: 10, heights: [2,1,5,6,2,3,0], calcSpan: [2, 5], calcH: 2, calcW: 4, calcArea: 8, justPushed: null, poppedIdx: 4 },
  { lineNum: 14, phase: 'calc', description: '弹出索引 1: h=1, w=6 (栈空), area=6', currentI: 6, stack: [], maxArea: 10, heights: [2,1,5,6,2,3,0], calcSpan: [0, 5], calcH: 1, calcW: 6, calcArea: 6, justPushed: null, poppedIdx: 1 },
  // done
  { lineNum: 16, phase: 'done', description: '最大矩形面积 = 10 (高5 x 宽2, 索引2-3)', currentI: -1, stack: [], maxArea: 10, heights: [2,1,5,6,2,3,0], calcSpan: [2, 3], calcH: 5, calcW: 2, calcArea: 10, justPushed: null, poppedIdx: null },
];

// 2nd test case: [2,4]
const steps2 = [
  { lineNum: 7, phase: 'init', description: '初始化空栈和 max_area = 0', currentI: -1, stack: [], maxArea: 0, heights: [2,4,0], calcSpan: null, calcH: null, calcW: null, calcArea: null, justPushed: null, poppedIdx: null },
  { lineNum: 9, phase: 'init', description: '末尾追加哨兵 0', currentI: -1, stack: [], maxArea: 0, heights: [2,4,0], calcSpan: null, calcH: null, calcW: null, calcArea: null, justPushed: null, poppedIdx: null },
  { lineNum: 15, phase: 'push', description: 'i=0, heights[0]=2, 栈空直接入栈', currentI: 0, stack: [0], maxArea: 0, heights: [2,4,0], calcSpan: null, calcH: null, calcW: null, calcArea: null, justPushed: 0, poppedIdx: null },
  { lineNum: 15, phase: 'push', description: 'i=1, heights[1]=4 >= heights[0]=2, 直接入栈', currentI: 1, stack: [0, 1], maxArea: 0, heights: [2,4,0], calcSpan: null, calcH: null, calcW: null, calcArea: null, justPushed: 1, poppedIdx: null },
  { lineNum: 11, phase: 'pop', description: 'i=2 (哨兵 0), heights[2]=0 < heights[1]=4, 触发出栈', currentI: 2, stack: [0, 1], maxArea: 0, heights: [2,4,0], calcSpan: null, calcH: null, calcW: null, calcArea: null, justPushed: null, poppedIdx: null },
  { lineNum: 14, phase: 'calc', description: '弹出索引 1: h=4, w=2-0-1=1, area=4, max_area=4', currentI: 2, stack: [0], maxArea: 4, heights: [2,4,0], calcSpan: [1, 1], calcH: 4, calcW: 1, calcArea: 4, justPushed: null, poppedIdx: 1 },
  { lineNum: 14, phase: 'calc', description: '弹出索引 0: h=2, w=2 (栈空), area=4, max_area=4', currentI: 2, stack: [], maxArea: 4, heights: [2,4,0], calcSpan: [0, 1], calcH: 2, calcW: 2, calcArea: 4, justPushed: null, poppedIdx: 0 },
  { lineNum: 16, phase: 'done', description: '最大矩形面积 = 4 (h=4 x w=1 或 h=2 x w=2)', currentI: -1, stack: [], maxArea: 4, heights: [2,4,0], calcSpan: [0, 1], calcH: 2, calcW: 2, calcArea: 4, justPushed: null, poppedIdx: null },
];

const phaseLabels = { init: '初始化', push: '入栈', pop: '出栈', calc: '计算面积', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">柱状图 heights（蓝色 = 当前遍历位置）</div>
      <div id="bar-chart" style="display:flex;align-items:flex-end;gap:4px;height:120px;padding:8px 0"></div>
    </div>
    <div class="card">
      <div class="section-title">单调栈（存放索引，栈顶在右）</div>
      <div class="stack-container" id="stack-area"></div>
    </div>
    <div class="card">
      <div class="section-title">计算详情</div>
      <div id="calc-area" style="font-family:monospace;font-size:13px;color:var(--text-muted);min-height:24px"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '84. Largest Rectangle in Histogram -- 执行可视化',
  problemDesc: `
    <p>给定 <code>n</code> 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 <code>1</code>。求在该柱状图中，能够勾勒出来的矩形的最大面积。</p>
    <div class="example">输入：heights = [2,1,5,6,2,3]
输出：10
解释：最大矩形面积为 10（高5，宽2）</div>
  `,
  subtitle: `heights = [${HEIGHTS}]`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '[2,1,5,6,2,3]', steps: steps1, subtitle: 'heights = [2,1,5,6,2,3] → 10' },
    { name: '[2,4]', steps: steps2, subtitle: 'heights = [2,4] → 4', setup(panel) { HEIGHTS = [2,4]; MAX_H = 4; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const heights = s.heights || [...HEIGHTS, 0];
    const displayHeights = heights.slice(0, -1); // Remove sentinel for display
    const barMax = Math.max(...displayHeights, 1);
    // bar chart
    document.getElementById('bar-chart').innerHTML = displayHeights.map((h, idx) => {
      const pct = (h / barMax) * 100;
      let bg = 'var(--accent, #3b82f6)';
      let opacity = '0.5';
      if (idx === s.currentI) { opacity = '1'; }
      if (s.calcSpan && idx >= s.calcSpan[0] && idx <= s.calcSpan[1]) {
        bg = '#f59e0b';
        opacity = '0.85';
      }
      if (s.poppedIdx === idx) { bg = '#ef4444'; opacity = '1'; }
      return `<div style="display:flex;flex-direction:column;align-items:center;flex:1">
        <div style="font-size:11px;margin-bottom:2px;color:var(--text-muted)">${h}</div>
        <div style="width:100%;height:${pct}%;background:${bg};opacity:${opacity};border-radius:4px 4px 0 0;transition:all .3s"></div>
        <div style="font-size:10px;margin-top:2px;color:var(--text-muted)">[${idx}]</div>
      </div>`;
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
        return `<div class="${cls}">${idx}<span style="font-size:10px;opacity:.6;margin-left:3px">(h=${displayHeights[idx]})</span></div>`;
      }).join('');
    }

    // calc area
    const calcEl = document.getElementById('calc-area');
    if (s.calcH !== null) {
      calcEl.innerHTML = `高 h=${s.calcH} x 宽 w=${s.calcW} = <strong style="color:#f59e0b">${s.calcArea}</strong>`;
    } else {
      calcEl.innerHTML = '<span style="opacity:.4">--</span>';
    }

    // found box
    const foundEl = document.getElementById('found-area');
    if (s.maxArea > 0) {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="res-val">max_area = ${s.maxArea}</div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
