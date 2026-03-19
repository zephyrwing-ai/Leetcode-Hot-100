let OPS = ['addNum(1)', 'addNum(2)', 'findMedian()', 'addNum(3)', 'findMedian()'];

const code = [
  'class MedianFinder:',
  '    def __init__(self):',
  '        self.small = []  # max-heap (negated)',
  '        self.large = []  # min-heap',
  '',
  '    def addNum(self, num):',
  '        heapq.heappush(self.small, -num)',
  '        heapq.heappush(self.large, -heapq.heappop(self.small))',
  '        if len(self.large) > len(self.small):',
  '            heapq.heappush(self.small, -heapq.heappop(self.large))',
  '',
  '    def findMedian(self):',
  '        if len(self.small) > len(self.large):',
  '            return -self.small[0]',
  '        return (-self.small[0] + self.large[0]) / 2',
];

const lineMap = { 2: 1, 3: 2, 4: 3, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 12: 11, 13: 12, 14: 13, 15: 14 };

// ── Test Case 1: addNum(1), addNum(2), findMedian(), addNum(3), findMedian() ──
const steps1 = [
  { lineNum: 2, phase: 'init', description: '初始化 MedianFinder，small（最大堆）和 large（最小堆）都为空', small: [], large: [], ops: ['addNum(1)', 'addNum(2)', 'findMedian()', 'addNum(3)', 'findMedian()'], currentOp: -1, result: null },
  { lineNum: 7, phase: 'add', description: 'addNum(1): 先将 1 加入 small → small=[-1]', small: [1], large: [], ops: ['addNum(1)', 'addNum(2)', 'findMedian()', 'addNum(3)', 'findMedian()'], currentOp: 0, result: null },
  { lineNum: 8, phase: 'add', description: 'addNum(1): 弹出 small 顶(1)放入 large → large=[1]', small: [], large: [1], ops: ['addNum(1)', 'addNum(2)', 'findMedian()', 'addNum(3)', 'findMedian()'], currentOp: 0, result: null },
  { lineNum: 10, phase: 'add', description: 'addNum(1): large 比 small 长，弹出 large 顶(1)放回 small', small: [1], large: [], ops: ['addNum(1)', 'addNum(2)', 'findMedian()', 'addNum(3)', 'findMedian()'], currentOp: 0, result: null },
  { lineNum: 7, phase: 'add', description: 'addNum(2): 先将 2 加入 small → small=[2,1]', small: [2,1], large: [], ops: ['addNum(1)', 'addNum(2)', 'findMedian()', 'addNum(3)', 'findMedian()'], currentOp: 1, result: null },
  { lineNum: 8, phase: 'add', description: 'addNum(2): 弹出 small 顶(2)放入 large → large=[2]', small: [1], large: [2], ops: ['addNum(1)', 'addNum(2)', 'findMedian()', 'addNum(3)', 'findMedian()'], currentOp: 1, result: null },
  { lineNum: 9, phase: 'add', description: 'addNum(2): 两堆长度相等，无需调整。small=[1], large=[2]', small: [1], large: [2], ops: ['addNum(1)', 'addNum(2)', 'findMedian()', 'addNum(3)', 'findMedian()'], currentOp: 1, result: null },
  { lineNum: 13, phase: 'query', description: 'findMedian(): small 和 large 长度相等', small: [1], large: [2], ops: ['addNum(1)', 'addNum(2)', 'findMedian()', 'addNum(3)', 'findMedian()'], currentOp: 2, result: null },
  { lineNum: 15, phase: 'query', description: 'findMedian(): 返回 (small[0]+large[0])/2 = (1+2)/2 = 1.5', small: [1], large: [2], ops: ['addNum(1)', 'addNum(2)', 'findMedian()', 'addNum(3)', 'findMedian()'], currentOp: 2, result: 1.5 },
  { lineNum: 7, phase: 'add', description: 'addNum(3): 先将 3 加入 small → small=[3,1]', small: [3,1], large: [2], ops: ['addNum(1)', 'addNum(2)', 'findMedian()', 'addNum(3)', 'findMedian()'], currentOp: 3, result: null },
  { lineNum: 8, phase: 'add', description: 'addNum(3): 弹出 small 顶(3)放入 large → large=[2,3]', small: [1], large: [2,3], ops: ['addNum(1)', 'addNum(2)', 'findMedian()', 'addNum(3)', 'findMedian()'], currentOp: 3, result: null },
  { lineNum: 10, phase: 'add', description: 'addNum(3): large 比 small 长，弹出 large 顶(2)放回 small', small: [2,1], large: [3], ops: ['addNum(1)', 'addNum(2)', 'findMedian()', 'addNum(3)', 'findMedian()'], currentOp: 3, result: null },
  { lineNum: 13, phase: 'query', description: 'findMedian(): small 比 large 长', small: [2,1], large: [3], ops: ['addNum(1)', 'addNum(2)', 'findMedian()', 'addNum(3)', 'findMedian()'], currentOp: 4, result: null },
  { lineNum: 14, phase: 'query', description: 'findMedian(): 返回 small[0] = 2，中位数为 2', small: [2,1], large: [3], ops: ['addNum(1)', 'addNum(2)', 'findMedian()', 'addNum(3)', 'findMedian()'], currentOp: 4, result: 2 },
];

// ── Test Case 2: addNum(5), addNum(3), addNum(8), findMedian() ──
const steps2 = [
  { lineNum: 2, phase: 'init', description: '初始化 MedianFinder，两个堆都为空', small: [], large: [], ops: ['addNum(5)', 'addNum(3)', 'addNum(8)', 'findMedian()'], currentOp: -1, result: null },
  { lineNum: 7, phase: 'add', description: 'addNum(5): 先将 5 加入 small → small=[5]', small: [5], large: [], ops: ['addNum(5)', 'addNum(3)', 'addNum(8)', 'findMedian()'], currentOp: 0, result: null },
  { lineNum: 8, phase: 'add', description: 'addNum(5): 弹出 small 顶(5)放入 large → large=[5]', small: [], large: [5], ops: ['addNum(5)', 'addNum(3)', 'addNum(8)', 'findMedian()'], currentOp: 0, result: null },
  { lineNum: 10, phase: 'add', description: 'addNum(5): large 比 small 长，弹出 large 顶(5)放回 small', small: [5], large: [], ops: ['addNum(5)', 'addNum(3)', 'addNum(8)', 'findMedian()'], currentOp: 0, result: null },
  { lineNum: 7, phase: 'add', description: 'addNum(3): 先将 3 加入 small → small=[5,3]', small: [5,3], large: [], ops: ['addNum(5)', 'addNum(3)', 'addNum(8)', 'findMedian()'], currentOp: 1, result: null },
  { lineNum: 8, phase: 'add', description: 'addNum(3): 弹出 small 顶(5)放入 large → large=[5]', small: [3], large: [5], ops: ['addNum(5)', 'addNum(3)', 'addNum(8)', 'findMedian()'], currentOp: 1, result: null },
  { lineNum: 9, phase: 'add', description: 'addNum(3): 两堆长度相等，无需调整。small=[3], large=[5]', small: [3], large: [5], ops: ['addNum(5)', 'addNum(3)', 'addNum(8)', 'findMedian()'], currentOp: 1, result: null },
  { lineNum: 7, phase: 'add', description: 'addNum(8): 先将 8 加入 small → small=[8,3]', small: [8,3], large: [5], ops: ['addNum(5)', 'addNum(3)', 'addNum(8)', 'findMedian()'], currentOp: 2, result: null },
  { lineNum: 8, phase: 'add', description: 'addNum(8): 弹出 small 顶(8)放入 large → large=[5,8]', small: [3], large: [5,8], ops: ['addNum(5)', 'addNum(3)', 'addNum(8)', 'findMedian()'], currentOp: 2, result: null },
  { lineNum: 10, phase: 'add', description: 'addNum(8): large 比 small 长，弹出 large 顶(5)放回 small', small: [5,3], large: [8], ops: ['addNum(5)', 'addNum(3)', 'addNum(8)', 'findMedian()'], currentOp: 2, result: null },
  { lineNum: 13, phase: 'query', description: 'findMedian(): small 比 large 长', small: [5,3], large: [8], ops: ['addNum(5)', 'addNum(3)', 'addNum(8)', 'findMedian()'], currentOp: 3, result: null },
  { lineNum: 14, phase: 'query', description: 'findMedian(): 返回 small[0] = 5，中位数为 5', small: [5,3], large: [8], ops: ['addNum(5)', 'addNum(3)', 'addNum(8)', 'findMedian()'], currentOp: 3, result: 5 },
];

const phaseLabels = { init: '初始化', add: '添加元素', query: '查询中位数' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">操作序列</div>
      <div class="array-row" id="ops-row"></div>
    </div>
    <div class="card" style="display:flex;gap:16px">
      <div style="flex:1">
        <div class="section-title">small（最大堆，存较小一半）</div>
        <div class="array-row" id="small-heap"></div>
      </div>
      <div style="flex:1">
        <div class="section-title">large（最小堆，存较大一半）</div>
        <div class="array-row" id="large-heap"></div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">结果</div>
      <div id="median-result" style="font-family:var(--font-mono);font-size:18px;font-weight:700;min-height:28px;color:var(--text-muted)">—</div>
    </div>
  `;
}

export default {
  title: '295. Find Median from Data Stream — 执行可视化',
  problemDesc: `
    <p>中位数是有序整数列表中间的数。设计一个数据结构，支持以下两种操作：</p>
    <p><code>addNum(num)</code> - 从数据流中添加一个整数到数据结构中。</p>
    <p><code>findMedian()</code> - 返回目前所有元素的中位数。</p>
    <div class="example">输入：addNum(1), addNum(2), findMedian() -> 1.5, addNum(3), findMedian() -> 2</div>
    <p>如果列表长度为偶数，中位数是中间两个数的平均值。</p>
  `,
  subtitle: 'addNum(1), addNum(2), findMedian(), addNum(3), findMedian()',
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'add(1),add(2),find(),add(3),find()', steps: steps1, subtitle: 'addNum(1), addNum(2), findMedian(), addNum(3), findMedian()' },
    {
      name: 'add(5),add(3),add(8),find()', steps: steps2, subtitle: 'addNum(5), addNum(3), addNum(8), findMedian()',
      setup(panel) { OPS = ['addNum(5)', 'addNum(3)', 'addNum(8)', 'findMedian()']; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const ops = s.ops || OPS;

    // Ops row
    document.getElementById('ops-row').innerHTML = ops.map((op, i) => {
      let cls = 'arr-cell';
      if (i === s.currentOp) cls += ' is-active';
      if (i < s.currentOp) cls += ' in-window';
      return `<div class="${cls}" style="min-width:80px"><div class="arr-val" style="font-size:11px">${op}</div><div class="arr-idx">[${i}]</div></div>`;
    }).join('');

    // Small heap
    const smallEl = document.getElementById('small-heap');
    if (s.small.length === 0) {
      smallEl.innerHTML = '<span style="color:var(--text-muted);font-size:13px">空</span>';
    } else {
      smallEl.innerHTML = s.small.map((v, i) => {
        let cls = 'arr-cell';
        if (i === 0) cls += ' current';
        return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">${i === 0 ? 'top' : ''}</div></div>`;
      }).join('');
    }

    // Large heap
    const largeEl = document.getElementById('large-heap');
    if (s.large.length === 0) {
      largeEl.innerHTML = '<span style="color:var(--text-muted);font-size:13px">空</span>';
    } else {
      largeEl.innerHTML = s.large.map((v, i) => {
        let cls = 'arr-cell';
        if (i === 0) cls += ' in-window';
        return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">${i === 0 ? 'top' : ''}</div></div>`;
      }).join('');
    }

    // Result
    const resEl = document.getElementById('median-result');
    if (s.result !== null) {
      resEl.innerHTML = `<span style="color:#4ade80">中位数 = ${s.result}</span>`;
    } else {
      resEl.innerHTML = '<span style="color:var(--text-muted)">—</span>';
    }
  },
};
