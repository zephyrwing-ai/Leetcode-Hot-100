const code = [
  'class Solution:',
  '    def flatten(self, root):',
  '        if not root:',
  '            return',
  '        stack = [root]',
  '        prev = None',
  '        while stack:',
  '            curr = stack.pop()',
  '            if prev:',
  '                prev.left = None',
  '                prev.right = curr',
  '            if curr.right:',
  '                stack.append(curr.right)',
  '            if curr.left:',
  '                stack.append(curr.left)',
  '            prev = curr',
];

const lineMap = { 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15 };

let treeNodes = [
  { id: 0, val: 1, x: 160, y: 30 },
  { id: 1, val: 2, x: 90, y: 90 },
  { id: 2, val: 5, x: 230, y: 90 },
  { id: 3, val: 3, x: 50, y: 150 },
  { id: 4, val: 4, x: 130, y: 150 },
  { id: 5, val: 6, x: 270, y: 150 },
];
let treeEdges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5]];
let preOrder = [0, 1, 3, 4, 2, 5];

const steps1 = [
  { lineNum: 4, phase: 'init', description: '初始化栈 [root], prev = None', current: null, stack: [0], prev: null, visited: [], linked: [] },
  { lineNum: 7, phase: 'pop', description: '弹出节点 1, prev=None 无需连接', current: 0, stack: [], prev: null, visited: [0], linked: [] },
  { lineNum: 11, phase: 'push', description: '将节点 1 的右子 5 和左子 2 压入栈', current: 0, stack: [2, 1], prev: null, visited: [0], linked: [] },
  { lineNum: 15, phase: 'link', description: 'prev = 节点 1', current: 0, stack: [2, 1], prev: 0, visited: [0], linked: [] },
  { lineNum: 7, phase: 'pop', description: '弹出节点 2', current: 1, stack: [2], prev: 0, visited: [0, 1], linked: [] },
  { lineNum: 9, phase: 'rewire', description: 'prev(1).left = None, prev(1).right = 2, 连接 1->2', current: 1, stack: [2], prev: 0, visited: [0, 1], linked: [{ from: 0, to: 1 }] },
  { lineNum: 11, phase: 'push', description: '将节点 2 的右子 4 和左子 3 压入栈', current: 1, stack: [2, 4, 3], prev: 0, visited: [0, 1], linked: [{ from: 0, to: 1 }] },
  { lineNum: 15, phase: 'link', description: 'prev = 节点 2', current: 1, stack: [2, 4, 3], prev: 1, visited: [0, 1], linked: [{ from: 0, to: 1 }] },
  { lineNum: 7, phase: 'pop', description: '弹出节点 3', current: 3, stack: [2, 4], prev: 1, visited: [0, 1, 3], linked: [{ from: 0, to: 1 }] },
  { lineNum: 9, phase: 'rewire', description: 'prev(2).right = 3, 连接 2->3', current: 3, stack: [2, 4], prev: 1, visited: [0, 1, 3], linked: [{ from: 0, to: 1 }, { from: 1, to: 3 }] },
  { lineNum: 15, phase: 'link', description: '节点 3 无子节点, prev = 节点 3', current: 3, stack: [2, 4], prev: 3, visited: [0, 1, 3], linked: [{ from: 0, to: 1 }, { from: 1, to: 3 }] },
  { lineNum: 7, phase: 'pop', description: '弹出节点 4', current: 4, stack: [2], prev: 3, visited: [0, 1, 3, 4], linked: [{ from: 0, to: 1 }, { from: 1, to: 3 }] },
  { lineNum: 9, phase: 'rewire', description: 'prev(3).right = 4, 连接 3->4', current: 4, stack: [2], prev: 3, visited: [0, 1, 3, 4], linked: [{ from: 0, to: 1 }, { from: 1, to: 3 }, { from: 3, to: 4 }] },
  { lineNum: 15, phase: 'link', description: '节点 4 无子节点, prev = 节点 4', current: 4, stack: [2], prev: 4, visited: [0, 1, 3, 4], linked: [{ from: 0, to: 1 }, { from: 1, to: 3 }, { from: 3, to: 4 }] },
  { lineNum: 7, phase: 'pop', description: '弹出节点 5', current: 2, stack: [], prev: 4, visited: [0, 1, 3, 4, 2], linked: [{ from: 0, to: 1 }, { from: 1, to: 3 }, { from: 3, to: 4 }] },
  { lineNum: 9, phase: 'rewire', description: 'prev(4).right = 5, 连接 4->5', current: 2, stack: [], prev: 4, visited: [0, 1, 3, 4, 2], linked: [{ from: 0, to: 1 }, { from: 1, to: 3 }, { from: 3, to: 4 }, { from: 4, to: 2 }] },
  { lineNum: 11, phase: 'push', description: '将节点 5 的右子 6 压入栈', current: 2, stack: [5], prev: 4, visited: [0, 1, 3, 4, 2], linked: [{ from: 0, to: 1 }, { from: 1, to: 3 }, { from: 3, to: 4 }, { from: 4, to: 2 }] },
  { lineNum: 15, phase: 'link', description: 'prev = 节点 5', current: 2, stack: [5], prev: 2, visited: [0, 1, 3, 4, 2], linked: [{ from: 0, to: 1 }, { from: 1, to: 3 }, { from: 3, to: 4 }, { from: 4, to: 2 }] },
  { lineNum: 7, phase: 'pop', description: '弹出节点 6', current: 5, stack: [], prev: 2, visited: [0, 1, 3, 4, 2, 5], linked: [{ from: 0, to: 1 }, { from: 1, to: 3 }, { from: 3, to: 4 }, { from: 4, to: 2 }] },
  { lineNum: 9, phase: 'rewire', description: 'prev(5).right = 6, 连接 5->6', current: 5, stack: [], prev: 2, visited: [0, 1, 3, 4, 2, 5], linked: [{ from: 0, to: 1 }, { from: 1, to: 3 }, { from: 3, to: 4 }, { from: 4, to: 2 }, { from: 2, to: 5 }] },
  { lineNum: 15, phase: 'done', description: '展平完成: 1->2->3->4->5->6', current: 5, stack: [], prev: 5, visited: [0, 1, 3, 4, 2, 5], linked: [{ from: 0, to: 1 }, { from: 1, to: 3 }, { from: 3, to: 4 }, { from: 4, to: 2 }, { from: 2, to: 5 }] },
];

// Test case 2: root = [1,2,3]
const treeNodes2 = [
  { id: 0, val: 1, x: 160, y: 30 },
  { id: 1, val: 2, x: 90, y: 90 },
  { id: 2, val: 3, x: 230, y: 90 },
];
const treeEdges2 = [[0, 1], [0, 2]];

const steps2 = [
  { lineNum: 4, phase: 'init', description: '初始化栈 [root], prev = None', current: null, stack: [0], prev: null, visited: [], linked: [] },
  { lineNum: 7, phase: 'pop', description: '弹出节点 1, prev=None', current: 0, stack: [], prev: null, visited: [0], linked: [] },
  { lineNum: 11, phase: 'push', description: '将右子 3 和左子 2 压入栈', current: 0, stack: [2, 1], prev: null, visited: [0], linked: [] },
  { lineNum: 15, phase: 'link', description: 'prev = 节点 1', current: 0, stack: [2, 1], prev: 0, visited: [0], linked: [] },
  { lineNum: 7, phase: 'pop', description: '弹出节点 2', current: 1, stack: [2], prev: 0, visited: [0, 1], linked: [] },
  { lineNum: 9, phase: 'rewire', description: 'prev(1).right = 2, 连接 1->2', current: 1, stack: [2], prev: 0, visited: [0, 1], linked: [{ from: 0, to: 1 }] },
  { lineNum: 15, phase: 'link', description: '节点 2 无子节点, prev = 节点 2', current: 1, stack: [2], prev: 1, visited: [0, 1], linked: [{ from: 0, to: 1 }] },
  { lineNum: 7, phase: 'pop', description: '弹出节点 3', current: 2, stack: [], prev: 1, visited: [0, 1, 2], linked: [{ from: 0, to: 1 }] },
  { lineNum: 9, phase: 'rewire', description: 'prev(2).right = 3, 连接 2->3', current: 2, stack: [], prev: 1, visited: [0, 1, 2], linked: [{ from: 0, to: 1 }, { from: 1, to: 2 }] },
  { lineNum: 15, phase: 'link', description: '节点 3 无子节点, prev = 节点 3', current: 2, stack: [], prev: 2, visited: [0, 1, 2], linked: [{ from: 0, to: 1 }, { from: 1, to: 2 }] },
  { lineNum: 15, phase: 'done', description: '展平完成: 1->2->3', current: 2, stack: [], prev: 2, visited: [0, 1, 2], linked: [{ from: 0, to: 1 }, { from: 1, to: 2 }] },
];

const phaseLabels = { init: '初始化', pop: '弹出', push: '子节点入栈', rewire: '重新连接', link: '更新prev', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">原始树结构（蓝色=当前节点, 绿色=已处理）</div>
      <div id="tree-area" style="position:relative;height:200px;width:100%"></div>
    </div>
    <div class="card">
      <div class="section-title">栈 stack</div>
      <div class="stack-container" id="stack-area"></div>
    </div>
    <div class="card">
      <div class="section-title">展平链表</div>
      <div class="array-row" id="linked-area"></div>
    </div>
    <div id="found-area"></div>
  `;
}

function render(s) {
  const treeEl = document.getElementById('tree-area');
  let svg = '<svg style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none">';
  treeEdges.forEach(([from, to]) => {
    const a = treeNodes[from], b = treeNodes[to];
    svg += `<line x1="${a.x}" y1="${a.y + 16}" x2="${b.x}" y2="${b.y}" stroke="rgba(148,163,184,0.3)" stroke-width="1.5"/>`;
  });
  svg += '</svg>';

  let nodes = '';
  treeNodes.forEach(n => {
    let cls = 'tree-node';
    if (s.current === n.id) cls += ' is-current';
    if (s.visited.includes(n.id)) cls += ' is-visited';
    nodes += `<div class="${cls}" style="position:absolute;left:${n.x - 18}px;top:${n.y}px">${n.val}</div>`;
  });
  treeEl.innerHTML = svg + nodes;

  const stackEl = document.getElementById('stack-area');
  if (s.stack.length === 0) {
    stackEl.innerHTML = '<div style="color:rgba(148,163,184,0.6);font-size:12px">（空栈）</div>';
  } else {
    stackEl.innerHTML = s.stack.map(id => `<div class="stack-item">${treeNodes[id].val}</div>`).join('');
  }

  const linkedEl = document.getElementById('linked-area');
  const doneCount = s.visited.length;
  linkedEl.innerHTML = preOrder.slice(0, doneCount).map((id, i) => {
    const arrow = i < doneCount - 1 ? ' <span style="color:#64748b">\u2192</span> ' : '';
    let cls = 'arr-cell';
    if (s.current === id) cls += ' is-active';
    return `<div class="${cls}"><div class="arr-val">${treeNodes[id].val}</div></div>${arrow}`;
  }).join('');

  const foundEl = document.getElementById('found-area');
  if (s.phase === 'done') {
    const chain = preOrder.map(id => treeNodes[id].val).join(' \u2192 ');
    foundEl.innerHTML = `<div class="card found-box">
      <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">\u2713</div>
      <div>
        <div class="found-text" style="color:#4ade80;font-weight:600">展平完成</div>
        <div class="found-sub" style="margin-top:4px">${chain}</div>
      </div>
    </div>`;
  } else {
    foundEl.innerHTML = '';
  }
}

export default {
  title: '114. Flatten Binary Tree to Linked List — 执行可视化',
  problemDesc: `
    <p>给你二叉树的根结点 <code>root</code>，请你将它展开为一个单链表。展开后的单链表应该同样使用 <code>TreeNode</code>，其中 <code>right</code> 子指针指向链表中下一个结点，<code>left</code> 子指针始终为 <code>null</code>。展开后的顺序应该与前序遍历顺序相同。</p>
    <div class="example">输入：root = [1,2,5,3,4,null,6]
输出：[1,null,2,null,3,null,4,null,5,null,6]</div>
  `,
  subtitle: 'root = [1,2,5,3,4,null,6]',
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: 'root=[1,2,5,3,4,null,6]', steps: steps1, subtitle: 'root = [1,2,5,3,4,null,6]' },
    {
      name: 'root=[1,2,3]，最简情况',
      steps: steps2,
      subtitle: 'root = [1,2,3]',
      setup(panel) {
        treeNodes = treeNodes2;
        treeEdges = treeEdges2;
        preOrder = [0, 1, 2];
        setupPanel(panel);
      },
    },
  ],
  setup: setupPanel,
  render,
};
