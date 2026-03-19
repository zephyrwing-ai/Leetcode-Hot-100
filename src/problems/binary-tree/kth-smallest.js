let K = 3;

const code = [
  'class Solution:',
  '    def kthSmallest(self, root, k):',
  '        stack = []',
  '        current = root',
  '        count = 0',
  '        while stack or current:',
  '            while current:',
  '                stack.append(current)',
  '                current = current.left',
  '            current = stack.pop()',
  '            count += 1',
  '            if count == k:',
  '                return current.val',
  '            current = current.right',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13 };

// ── Test Case 1: tree = [5,3,6,2,4,null,null,1], k=3 ──
// In-order: 1,2,3,4,5,6 → k=3 → answer=3

let treeNodes = [
  { id: 0, val: 5, left: 1, right: 2, x: 200, y: 30 },
  { id: 1, val: 3, left: 3, right: 4, x: 120, y: 90 },
  { id: 2, val: 6, left: null, right: null, x: 280, y: 90 },
  { id: 3, val: 2, left: 5, right: null, x: 70, y: 150 },
  { id: 4, val: 4, left: null, right: null, x: 170, y: 150 },
  { id: 5, val: 1, left: null, right: null, x: 40, y: 210 },
];
let treeEdges = [
  [0, 1], [0, 2], [1, 3], [1, 4], [3, 5]
];

const steps1 = [
  { lineNum: 2, phase: 'init', description: '初始化空栈, current = root(5), count = 0', current: 0, stack: [], visited: [], count: 0, result: null, k: 3 },
  { lineNum: 6, phase: 'left', description: '进入内层循环, current=5 非空, 将 5 压入栈', current: 0, stack: [0], visited: [], count: 0, result: null, k: 3 },
  { lineNum: 7, phase: 'left', description: 'current = 5.left = 3, 继续左下行', current: 1, stack: [0], visited: [], count: 0, result: null, k: 3 },
  { lineNum: 6, phase: 'left', description: 'current=3 非空, 将 3 压入栈', current: 1, stack: [0, 1], visited: [], count: 0, result: null, k: 3 },
  { lineNum: 7, phase: 'left', description: 'current = 3.left = 2, 继续左下行', current: 3, stack: [0, 1], visited: [], count: 0, result: null, k: 3 },
  { lineNum: 6, phase: 'left', description: 'current=2 非空, 将 2 压入栈', current: 3, stack: [0, 1, 3], visited: [], count: 0, result: null, k: 3 },
  { lineNum: 7, phase: 'left', description: 'current = 2.left = 1, 继续左下行', current: 5, stack: [0, 1, 3], visited: [], count: 0, result: null, k: 3 },
  { lineNum: 6, phase: 'left', description: 'current=1 非空, 将 1 压入栈', current: 5, stack: [0, 1, 3, 5], visited: [], count: 0, result: null, k: 3 },
  { lineNum: 7, phase: 'left', description: 'current = 1.left = null, 内层循环结束', current: null, stack: [0, 1, 3, 5], visited: [], count: 0, result: null, k: 3 },
  { lineNum: 8, phase: 'pop', description: '弹出栈顶节点 1, current = 1', current: 5, stack: [0, 1, 3], visited: [], count: 0, result: null, k: 3 },
  { lineNum: 9, phase: 'count', description: 'count = 1, 访问节点 1（第 1 小）', current: 5, stack: [0, 1, 3], visited: [5], count: 1, result: null, k: 3 },
  { lineNum: 10, phase: 'check', description: 'count=1 != k=3, 不返回', current: 5, stack: [0, 1, 3], visited: [5], count: 1, result: null, k: 3 },
  { lineNum: 12, phase: 'right', description: 'current = 1.right = null, 继续外层循环', current: null, stack: [0, 1, 3], visited: [5], count: 1, result: null, k: 3 },
  { lineNum: 8, phase: 'pop', description: '弹出栈顶节点 2, current = 2', current: 3, stack: [0, 1], visited: [5], count: 1, result: null, k: 3 },
  { lineNum: 9, phase: 'count', description: 'count = 2, 访问节点 2（第 2 小）', current: 3, stack: [0, 1], visited: [5, 3], count: 2, result: null, k: 3 },
  { lineNum: 10, phase: 'check', description: 'count=2 != k=3, 不返回', current: 3, stack: [0, 1], visited: [5, 3], count: 2, result: null, k: 3 },
  { lineNum: 12, phase: 'right', description: 'current = 2.right = null, 继续外层循环', current: null, stack: [0, 1], visited: [5, 3], count: 2, result: null, k: 3 },
  { lineNum: 8, phase: 'pop', description: '弹出栈顶节点 3, current = 3', current: 1, stack: [0], visited: [5, 3], count: 2, result: null, k: 3 },
  { lineNum: 9, phase: 'count', description: 'count = 3, 访问节点 3（第 3 小）', current: 1, stack: [0], visited: [5, 3, 1], count: 3, result: null, k: 3 },
  { lineNum: 10, phase: 'check', description: 'count=3 == k=3, 找到目标!', current: 1, stack: [0], visited: [5, 3, 1], count: 3, result: null, k: 3 },
  { lineNum: 11, phase: 'done', description: '返回 current.val = 3, 第 k=3 小的元素是 3', current: 1, stack: [0], visited: [5, 3, 1], count: 3, result: 3, k: 3 },
];

// ── Test Case 2: tree = [3,1,4,null,2], k=1 ──
// In-order: 1,2,3,4 → k=1 → answer=1

const treeNodes2 = [
  { id: 0, val: 3, left: 1, right: 2, x: 160, y: 30 },
  { id: 1, val: 1, left: null, right: 3, x: 90, y: 90 },
  { id: 2, val: 4, left: null, right: null, x: 230, y: 90 },
  { id: 3, val: 2, left: null, right: null, x: 120, y: 150 },
];
const treeEdges2 = [
  [0, 1], [0, 2], [1, 3]
];

const steps2 = [
  { lineNum: 2, phase: 'init', description: '初始化空栈, current = root(3), count = 0, k=1', current: 0, stack: [], visited: [], count: 0, result: null, k: 1 },
  { lineNum: 6, phase: 'left', description: 'current=3 非空, 将 3 压入栈', current: 0, stack: [0], visited: [], count: 0, result: null, k: 1 },
  { lineNum: 7, phase: 'left', description: 'current = 3.left = 1, 继续左下行', current: 1, stack: [0], visited: [], count: 0, result: null, k: 1 },
  { lineNum: 6, phase: 'left', description: 'current=1 非空, 将 1 压入栈', current: 1, stack: [0, 1], visited: [], count: 0, result: null, k: 1 },
  { lineNum: 7, phase: 'left', description: 'current = 1.left = null, 内层循环结束', current: null, stack: [0, 1], visited: [], count: 0, result: null, k: 1 },
  { lineNum: 8, phase: 'pop', description: '弹出栈顶节点 1, current = 1', current: 1, stack: [0], visited: [], count: 0, result: null, k: 1 },
  { lineNum: 9, phase: 'count', description: 'count = 1, 访问节点 1（第 1 小）', current: 1, stack: [0], visited: [1], count: 1, result: null, k: 1 },
  { lineNum: 10, phase: 'check', description: 'count=1 == k=1, 找到目标!', current: 1, stack: [0], visited: [1], count: 1, result: null, k: 1 },
  { lineNum: 11, phase: 'done', description: '返回 current.val = 1, 第 k=1 小的元素是 1', current: 1, stack: [0], visited: [1], count: 1, result: 1, k: 1 },
];

const phaseLabels = { init: '初始化', left: '左下行', pop: '弹出栈顶', count: '计数', check: '检查 k', right: '转右子树', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">BST 树结构（蓝色=当前节点, 绿色=已访问）</div>
      <div id="tree-area" style="position:relative;height:260px;width:100%"></div>
    </div>
    <div class="card">
      <div class="section-title">栈 stack</div>
      <div class="stack-container" id="stack-area"></div>
    </div>
    <div class="card" style="display:flex;gap:20px;font-size:14px;font-family:monospace">
      <span>count = <b id="count-val">0</b></span>
      <span>k = <b id="k-val">${K}</b></span>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '230. Kth Smallest Element in BST — 执行可视化',
  problemDesc: `
    <p>给定一个二叉搜索树的根节点 <code>root</code>，和一个整数 <code>k</code>，请你设计一个算法查找其中第 <code>k</code> 小的元素（从 1 开始计数）。</p>
    <div class="example">输入：root = [3,1,4,null,2], k = 1
输出：1</div>
    <p>提示：BST 的中序遍历是升序序列。</p>
  `,
  subtitle: 'root = [5,3,6,2,4,null,null,1], k = 3',
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'k = 3, tree = [5,3,6,2,4,null,null,1]', steps: steps1, subtitle: 'root = [5,3,6,2,4,null,null,1], k = 3' },
    {
      name: 'k = 1, tree = [3,1,4,null,2]', steps: steps2, subtitle: 'root = [3,1,4,null,2], k = 1',
      setup(panel) {
        K = 1;
        treeNodes = treeNodes2;
        treeEdges = treeEdges2;
        setupPanel(panel);
      }
    },
  ],

  setup: setupPanel,

  render(s) {
    const k = s.k || K;
    // Draw tree
    const treeEl = document.getElementById('tree-area');
    let svg = '<svg style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none">';
    treeEdges.forEach(([from, to]) => {
      const a = treeNodes[from], b = treeNodes[to];
      svg += `<line x1="${a.x}" y1="${a.y + 16}" x2="${b.x}" y2="${b.y}" stroke="rgba(148,163,184,0.4)" stroke-width="1.5"/>`;
    });
    svg += '</svg>';

    let nodes = '';
    treeNodes.forEach(n => {
      let cls = 'tree-node';
      if (s.current === n.id) cls += ' is-current';
      if (s.visited.includes(n.id)) cls += ' is-visited';
      if (s.result !== null && n.id === s.current) cls += ' is-target';
      nodes += `<div class="${cls}" style="position:absolute;left:${n.x - 18}px;top:${n.y}px">${n.val}</div>`;
    });
    treeEl.innerHTML = svg + nodes;

    // Stack
    const stackEl = document.getElementById('stack-area');
    if (s.stack.length === 0) {
      stackEl.innerHTML = '<div style="color:rgba(148,163,184,0.6);font-size:12px">（空栈）</div>';
    } else {
      stackEl.innerHTML = s.stack.map(id => {
        return `<div class="stack-item">${treeNodes[id].val}</div>`;
      }).join('');
    }

    // Count
    document.getElementById('count-val').textContent = s.count;
    document.getElementById('k-val').textContent = k;

    // Found
    const foundEl = document.getElementById('found-area');
    if (s.result !== null) {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">第 k 小元素</div>
          <div class="found-sub" style="margin-top:4px">k = ${k}, 答案 = ${s.result}</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
