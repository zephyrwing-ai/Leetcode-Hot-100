const code = [
  'from collections import deque',
  'class Solution:',
  '    def rightSideView(self, root):',
  '        if not root:',
  '            return []',
  '        result = []',
  '        queue = deque([root])',
  '        while queue:',
  '            level_size = len(queue)',
  '            for i in range(level_size):',
  '                node = queue.popleft()',
  '                if i == level_size - 1:',
  '                    result.append(node.val)',
  '                if node.left:',
  '                    queue.append(node.left)',
  '                if node.right:',
  '                    queue.append(node.right)',
  '        return result',
];

const lineMap = { 3: 3, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17 };

// ── Test Case 1: tree = [1,2,3,null,5,null,4] ──
//       1
//      / \
//     2   3
//      \   \
//       5   4
// Right side view: [1, 3, 4]

let treeNodes = [
  { id: 0, val: 1, x: 160, y: 30 },
  { id: 1, val: 2, x: 90, y: 90 },
  { id: 2, val: 3, x: 230, y: 90 },
  { id: 3, val: 5, x: 120, y: 150 },
  { id: 4, val: 4, x: 260, y: 150 },
];
let treeEdges = [[0, 1], [0, 2], [1, 3], [2, 4]];

const steps1 = [
  { lineNum: 5, phase: 'init', description: 'root 非空, 初始化 result=[], queue=[root]', current: null, queue: [0], visited: [], result: [], level: 0, levelSize: 0, levelI: -1, rightNode: null },
  { lineNum: 8, phase: 'level', description: '进入 while 循环, level_size = len(queue) = 1', current: null, queue: [0], visited: [], result: [], level: 0, levelSize: 1, levelI: -1, rightNode: null },
  { lineNum: 10, phase: 'dequeue', description: 'i=0: 出队节点 1', current: 0, queue: [], visited: [0], result: [], level: 0, levelSize: 1, levelI: 0, rightNode: null },
  { lineNum: 12, phase: 'pick', description: 'i=0 == level_size-1=0, 节点 1 是第 0 层最右, 加入 result', current: 0, queue: [], visited: [0], result: [1], level: 0, levelSize: 1, levelI: 0, rightNode: 0 },
  { lineNum: 14, phase: 'enqueue', description: '节点 1 有左子 2 和右子 3, 依次入队', current: 0, queue: [1, 2], visited: [0], result: [1], level: 0, levelSize: 1, levelI: 0, rightNode: 0 },
  { lineNum: 8, phase: 'level', description: '回到 while, level_size = len(queue) = 2, 第 1 层', current: null, queue: [1, 2], visited: [0], result: [1], level: 1, levelSize: 2, levelI: -1, rightNode: null },
  { lineNum: 10, phase: 'dequeue', description: 'i=0: 出队节点 2', current: 1, queue: [2], visited: [0, 1], result: [1], level: 1, levelSize: 2, levelI: 0, rightNode: null },
  { lineNum: 11, phase: 'skip', description: 'i=0 != level_size-1=1, 节点 2 不是最右, 跳过', current: 1, queue: [2], visited: [0, 1], result: [1], level: 1, levelSize: 2, levelI: 0, rightNode: null },
  { lineNum: 14, phase: 'enqueue', description: '节点 2 有右子 5, 入队', current: 1, queue: [2, 3], visited: [0, 1], result: [1], level: 1, levelSize: 2, levelI: 0, rightNode: null },
  { lineNum: 10, phase: 'dequeue', description: 'i=1: 出队节点 3', current: 2, queue: [3], visited: [0, 1, 2], result: [1], level: 1, levelSize: 2, levelI: 1, rightNode: null },
  { lineNum: 12, phase: 'pick', description: 'i=1 == level_size-1=1, 节点 3 是第 1 层最右, 加入 result', current: 2, queue: [3], visited: [0, 1, 2], result: [1, 3], level: 1, levelSize: 2, levelI: 1, rightNode: 2 },
  { lineNum: 14, phase: 'enqueue', description: '节点 3 有右子 4, 入队', current: 2, queue: [3, 4], visited: [0, 1, 2], result: [1, 3], level: 1, levelSize: 2, levelI: 1, rightNode: 2 },
  { lineNum: 8, phase: 'level', description: '回到 while, level_size = len(queue) = 2, 第 2 层', current: null, queue: [3, 4], visited: [0, 1, 2], result: [1, 3], level: 2, levelSize: 2, levelI: -1, rightNode: null },
  { lineNum: 10, phase: 'dequeue', description: 'i=0: 出队节点 5', current: 3, queue: [4], visited: [0, 1, 2, 3], result: [1, 3], level: 2, levelSize: 2, levelI: 0, rightNode: null },
  { lineNum: 11, phase: 'skip', description: 'i=0 != level_size-1=1, 节点 5 不是最右, 跳过', current: 3, queue: [4], visited: [0, 1, 2, 3], result: [1, 3], level: 2, levelSize: 2, levelI: 0, rightNode: null },
  { lineNum: 10, phase: 'dequeue', description: 'i=1: 出队节点 4', current: 4, queue: [], visited: [0, 1, 2, 3, 4], result: [1, 3], level: 2, levelSize: 2, levelI: 1, rightNode: null },
  { lineNum: 12, phase: 'pick', description: 'i=1 == level_size-1=1, 节点 4 是第 2 层最右, 加入 result', current: 4, queue: [], visited: [0, 1, 2, 3, 4], result: [1, 3, 4], level: 2, levelSize: 2, levelI: 1, rightNode: 4 },
  { lineNum: 17, phase: 'done', description: '队列为空, 遍历结束, 返回 result = [1, 3, 4]', current: null, queue: [], visited: [0, 1, 2, 3, 4], result: [1, 3, 4], level: 2, levelSize: 0, levelI: -1, rightNode: null },
];

// ── Test Case 2: tree = [1,2,3,4] ──
//       1
//      / \
//     2   3
//    /
//   4
// Right side view: [1, 3, 4]

const treeNodes2 = [
  { id: 0, val: 1, x: 160, y: 30 },
  { id: 1, val: 2, x: 90, y: 90 },
  { id: 2, val: 3, x: 230, y: 90 },
  { id: 3, val: 4, x: 55, y: 150 },
];
const treeEdges2 = [[0, 1], [0, 2], [1, 3]];

const steps2 = [
  { lineNum: 5, phase: 'init', description: 'root 非空, 初始化 result=[], queue=[root]', current: null, queue: [0], visited: [], result: [], level: 0, levelSize: 0, levelI: -1, rightNode: null },
  { lineNum: 8, phase: 'level', description: '进入 while 循环, level_size = 1, 第 0 层', current: null, queue: [0], visited: [], result: [], level: 0, levelSize: 1, levelI: -1, rightNode: null },
  { lineNum: 10, phase: 'dequeue', description: 'i=0: 出队节点 1', current: 0, queue: [], visited: [0], result: [], level: 0, levelSize: 1, levelI: 0, rightNode: null },
  { lineNum: 12, phase: 'pick', description: 'i=0 == level_size-1=0, 节点 1 是第 0 层最右, 加入 result', current: 0, queue: [], visited: [0], result: [1], level: 0, levelSize: 1, levelI: 0, rightNode: 0 },
  { lineNum: 14, phase: 'enqueue', description: '节点 1 有左子 2 和右子 3, 依次入队', current: 0, queue: [1, 2], visited: [0], result: [1], level: 0, levelSize: 1, levelI: 0, rightNode: 0 },
  { lineNum: 8, phase: 'level', description: '回到 while, level_size = 2, 第 1 层', current: null, queue: [1, 2], visited: [0], result: [1], level: 1, levelSize: 2, levelI: -1, rightNode: null },
  { lineNum: 10, phase: 'dequeue', description: 'i=0: 出队节点 2', current: 1, queue: [2], visited: [0, 1], result: [1], level: 1, levelSize: 2, levelI: 0, rightNode: null },
  { lineNum: 11, phase: 'skip', description: 'i=0 != level_size-1=1, 节点 2 不是最右, 跳过', current: 1, queue: [2], visited: [0, 1], result: [1], level: 1, levelSize: 2, levelI: 0, rightNode: null },
  { lineNum: 14, phase: 'enqueue', description: '节点 2 有左子 4, 入队', current: 1, queue: [2, 3], visited: [0, 1], result: [1], level: 1, levelSize: 2, levelI: 0, rightNode: null },
  { lineNum: 10, phase: 'dequeue', description: 'i=1: 出队节点 3', current: 2, queue: [3], visited: [0, 1, 2], result: [1], level: 1, levelSize: 2, levelI: 1, rightNode: null },
  { lineNum: 12, phase: 'pick', description: 'i=1 == level_size-1=1, 节点 3 是第 1 层最右, 加入 result', current: 2, queue: [3], visited: [0, 1, 2], result: [1, 3], level: 1, levelSize: 2, levelI: 1, rightNode: 2 },
  { lineNum: 8, phase: 'level', description: '回到 while, level_size = 1, 第 2 层', current: null, queue: [3], visited: [0, 1, 2], result: [1, 3], level: 2, levelSize: 1, levelI: -1, rightNode: null },
  { lineNum: 10, phase: 'dequeue', description: 'i=0: 出队节点 4', current: 3, queue: [], visited: [0, 1, 2, 3], result: [1, 3], level: 2, levelSize: 1, levelI: 0, rightNode: null },
  { lineNum: 12, phase: 'pick', description: 'i=0 == level_size-1=0, 节点 4 是第 2 层最右（也是唯一的）, 加入 result', current: 3, queue: [], visited: [0, 1, 2, 3], result: [1, 3, 4], level: 2, levelSize: 1, levelI: 0, rightNode: 3 },
  { lineNum: 17, phase: 'done', description: '队列为空, 返回 result = [1, 3, 4]', current: null, queue: [], visited: [0, 1, 2, 3], result: [1, 3, 4], level: 2, levelSize: 0, levelI: -1, rightNode: null },
];

const phaseLabels = { init: '初始化', level: '新层开始', dequeue: '出队', skip: '非最右跳过', pick: '选为右视图', enqueue: '子节点入队', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">树结构（蓝色=当前节点, 绿色=已访问, 橙色=右视图节点）</div>
      <div id="tree-area" style="position:relative;height:200px;width:100%"></div>
    </div>
    <div class="card">
      <div class="section-title">队列 queue</div>
      <div class="stack-container" id="queue-area"></div>
    </div>
    <div class="card">
      <div class="section-title">右视图结果 result</div>
      <div class="array-row" id="result-area"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '199. Binary Tree Right Side View — 执行可视化',
  problemDesc: `
    <p>给定一个二叉树的根节点 <code>root</code>，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。</p>
    <div class="example">输入：root = [1,2,3,null,5,null,4]
输出：[1,3,4]</div>
    <p>提示：BFS 层序遍历，取每层最后一个节点。</p>
  `,
  subtitle: 'root = [1,2,3,null,5,null,4]',
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'tree = [1,2,3,null,5,null,4]', steps: steps1, subtitle: 'root = [1,2,3,null,5,null,4]' },
    {
      name: 'tree = [1,2,3,4]', steps: steps2, subtitle: 'root = [1,2,3,4]',
      setup(panel) {
        treeNodes = treeNodes2;
        treeEdges = treeEdges2;
        setupPanel(panel);
      }
    },
  ],

  setup: setupPanel,

  render(s) {
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
      if (s.rightNode === n.id) cls += ' is-target';
      nodes += `<div class="${cls}" style="position:absolute;left:${n.x - 18}px;top:${n.y}px">${n.val}</div>`;
    });
    treeEl.innerHTML = svg + nodes;

    // Queue
    const queueEl = document.getElementById('queue-area');
    if (s.queue.length === 0) {
      queueEl.innerHTML = '<div style="color:rgba(148,163,184,0.6);font-size:12px">（空队列）</div>';
    } else {
      queueEl.innerHTML = s.queue.map(id => `<div class="stack-item">${treeNodes[id].val}</div>`).join('');
    }

    // Result
    const resultEl = document.getElementById('result-area');
    resultEl.innerHTML = s.result.map((v, i) => `<div class="arr-cell"><div class="arr-val">${v}</div><div class="arr-idx">L${i}</div></div>`).join('');

    // Found
    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">右视图</div>
          <div class="found-sub" style="margin-top:4px">result = [${s.result.join(', ')}]</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
