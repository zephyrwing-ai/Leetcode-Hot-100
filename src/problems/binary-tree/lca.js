const code = [
  'class Solution:',
  '    def lowestCommonAncestor(self, root, p, q):',
  '        if not root or root == p or root == q:',
  '            return root',
  '        left = self.lowestCommonAncestor(',
  '            root.left, p, q)',
  '        right = self.lowestCommonAncestor(',
  '            root.right, p, q)',
  '        if left and right:',
  '            return root',
  '        return left if left else right',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 10: 10 };

// ── Test Case 1: tree = [3,5,1,6,2,0,8,null,null,7,4], p=5, q=1 → LCA=3 ──
//          3
//        /   \
//       5     1
//      / \   / \
//     6   2 0   8
//        / \
//       7   4

let treeNodes = [
  { id: 0, val: 3, x: 180, y: 20 },
  { id: 1, val: 5, x: 100, y: 80 },
  { id: 2, val: 1, x: 260, y: 80 },
  { id: 3, val: 6, x: 55, y: 140 },
  { id: 4, val: 2, x: 145, y: 140 },
  { id: 5, val: 0, x: 215, y: 140 },
  { id: 6, val: 8, x: 305, y: 140 },
  { id: 7, val: 7, x: 120, y: 200 },
  { id: 8, val: 4, x: 170, y: 200 },
];
let treeEdges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[4,7],[4,8]];
let P_ID = 1;
let Q_ID = 2;

const steps1 = [
  { lineNum: 2, phase: 'init', description: '开始查找 p=5 和 q=1 的最低公共祖先', current: null, visited: [], pFound: false, qFound: false, leftResult: null, rightResult: null, lca: null, callStack: ['root(3)'], pId: 1, qId: 2 },
  { lineNum: 2, phase: 'visit', description: '访问节点 3, root != p 且 root != q, 需要递归两侧', current: 0, visited: [0], pFound: false, qFound: false, leftResult: null, rightResult: null, lca: null, callStack: ['root(3)'], pId: 1, qId: 2 },
  { lineNum: 4, phase: 'recurse', description: '递归搜索左子树 root.left = 5', current: 1, visited: [0, 1], pFound: false, qFound: false, leftResult: null, rightResult: null, lca: null, callStack: ['root(3)', 'left(5)'], pId: 1, qId: 2 },
  { lineNum: 2, phase: 'found_p', description: '节点 5 == p, 直接返回该节点!', current: 1, visited: [0, 1], pFound: true, qFound: false, leftResult: 1, rightResult: null, lca: null, callStack: ['root(3)', 'left(5)'], pId: 1, qId: 2 },
  { lineNum: 3, phase: 'return', description: '左子树返回节点 5 (找到 p)', current: 0, visited: [0, 1], pFound: true, qFound: false, leftResult: 1, rightResult: null, lca: null, callStack: ['root(3)'], pId: 1, qId: 2 },
  { lineNum: 6, phase: 'recurse', description: '递归搜索右子树 root.right = 1', current: 2, visited: [0, 1, 2], pFound: true, qFound: false, leftResult: 1, rightResult: null, lca: null, callStack: ['root(3)', 'right(1)'], pId: 1, qId: 2 },
  { lineNum: 2, phase: 'found_q', description: '节点 1 == q, 直接返回该节点!', current: 2, visited: [0, 1, 2], pFound: true, qFound: true, leftResult: 1, rightResult: 2, lca: null, callStack: ['root(3)', 'right(1)'], pId: 1, qId: 2 },
  { lineNum: 3, phase: 'return', description: '右子树返回节点 1 (找到 q)', current: 0, visited: [0, 1, 2], pFound: true, qFound: true, leftResult: 1, rightResult: 2, lca: null, callStack: ['root(3)'], pId: 1, qId: 2 },
  { lineNum: 8, phase: 'check', description: 'left=5 非空且 right=1 非空, p 和 q 分别在根节点两侧', current: 0, visited: [0, 1, 2], pFound: true, qFound: true, leftResult: 1, rightResult: 2, lca: null, callStack: ['root(3)'], pId: 1, qId: 2 },
  { lineNum: 9, phase: 'decide', description: '两侧都找到了, 返回当前节点 3', current: 0, visited: [0, 1, 2], pFound: true, qFound: true, leftResult: 1, rightResult: 2, lca: 0, callStack: ['root(3)'], pId: 1, qId: 2 },
  { lineNum: 9, phase: 'done', description: 'LCA(5, 1) = 3, 最低公共祖先是根节点 3', current: 0, visited: [0, 1, 2], pFound: true, qFound: true, leftResult: 1, rightResult: 2, lca: 0, callStack: [], pId: 1, qId: 2 },
];

// ── Test Case 2: tree = [3,5,1,6,2,0,8,null,null,7,4], p=5, q=4 → LCA=5 ──
// p=5 is ancestor of q=4, so LCA=5

const steps2 = [
  { lineNum: 2, phase: 'init', description: '开始查找 p=5 和 q=4 的最低公共祖先', current: null, visited: [], pFound: false, qFound: false, leftResult: null, rightResult: null, lca: null, callStack: ['root(3)'], pId: 1, qId: 8 },
  { lineNum: 2, phase: 'visit', description: '访问节点 3, root != p 且 root != q, 递归两侧', current: 0, visited: [0], pFound: false, qFound: false, leftResult: null, rightResult: null, lca: null, callStack: ['root(3)'], pId: 1, qId: 8 },
  { lineNum: 4, phase: 'recurse', description: '递归搜索左子树 root.left = 5', current: 1, visited: [0, 1], pFound: false, qFound: false, leftResult: null, rightResult: null, lca: null, callStack: ['root(3)', 'left(5)'], pId: 1, qId: 8 },
  { lineNum: 2, phase: 'found_p', description: '节点 5 == p, 直接返回! (不再继续搜索子树)', current: 1, visited: [0, 1], pFound: true, qFound: false, leftResult: 1, rightResult: null, lca: null, callStack: ['root(3)', 'left(5)'], pId: 1, qId: 8 },
  { lineNum: 3, phase: 'return', description: '左子树返回节点 5 (找到 p, q=4 在其子树中)', current: 0, visited: [0, 1], pFound: true, qFound: false, leftResult: 1, rightResult: null, lca: null, callStack: ['root(3)'], pId: 1, qId: 8 },
  { lineNum: 6, phase: 'recurse', description: '递归搜索右子树 root.right = 1', current: 2, visited: [0, 1, 2], pFound: true, qFound: false, leftResult: 1, rightResult: null, lca: null, callStack: ['root(3)', 'right(1)'], pId: 1, qId: 8 },
  { lineNum: 2, phase: 'visit', description: '节点 1 != p 且 != q, 递归搜索其子树', current: 2, visited: [0, 1, 2], pFound: true, qFound: false, leftResult: 1, rightResult: null, lca: null, callStack: ['root(3)', 'right(1)'], pId: 1, qId: 8 },
  { lineNum: 4, phase: 'recurse', description: '搜索节点 1 的左子树(0)和右子树(8), 均未找到 q=4', current: 2, visited: [0, 1, 2, 5, 6], pFound: true, qFound: false, leftResult: 1, rightResult: null, lca: null, callStack: ['root(3)', 'right(1)'], pId: 1, qId: 8 },
  { lineNum: 3, phase: 'return', description: '右子树返回 null (未找到 q)', current: 0, visited: [0, 1, 2, 5, 6], pFound: true, qFound: false, leftResult: 1, rightResult: null, lca: null, callStack: ['root(3)'], pId: 1, qId: 8 },
  { lineNum: 8, phase: 'check', description: 'left=5 非空, right=null, 只有左侧找到', current: 0, visited: [0, 1, 2, 5, 6], pFound: true, qFound: false, leftResult: 1, rightResult: null, lca: null, callStack: ['root(3)'], pId: 1, qId: 8 },
  { lineNum: 10, phase: 'decide', description: '返回 left=5, 因为 p 是 q 的祖先, LCA 就是 p 本身', current: 0, visited: [0, 1, 2, 5, 6], pFound: true, qFound: true, leftResult: 1, rightResult: null, lca: 1, callStack: ['root(3)'], pId: 1, qId: 8 },
  { lineNum: 10, phase: 'done', description: 'LCA(5, 4) = 5, 节点 5 是节点 4 的祖先', current: 1, visited: [0, 1, 2, 5, 6], pFound: true, qFound: true, leftResult: 1, rightResult: null, lca: 1, callStack: [], pId: 1, qId: 8 },
];

const phaseLabels = { init: '初始化', visit: '访问节点', recurse: '递归子树', found_p: '找到 p', found_q: '找到 q', return: '返回结果', check: '判断LCA', decide: '决策', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">树结构（蓝色=当前, 橙色=p/q, 绿色=LCA）</div>
      <div id="tree-area" style="position:relative;height:250px;width:100%"></div>
    </div>
    <div class="card">
      <div class="section-title">递归调用栈</div>
      <div class="stack-container" id="stack-area"></div>
    </div>
    <div class="card" style="display:flex;gap:20px;font-size:14px;font-family:monospace">
      <span>left = <b id="left-val">null</b></span>
      <span>right = <b id="right-val">null</b></span>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '236. Lowest Common Ancestor — 执行可视化',
  problemDesc: `
    <p>给定一个二叉树，找到该树中两个指定节点 <code>p</code> 和 <code>q</code> 的最近公共祖先。最近公共祖先的定义为：对于两个节点，在树中最低的、同时是它们祖先的节点（一个节点也可以是它自己的祖先）。</p>
    <div class="example">输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出：3</div>
  `,
  subtitle: 'root = [3,5,1,6,2,0,8,null,null,7,4], p=5, q=1',
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'p=5, q=1 → LCA=3', steps: steps1, subtitle: 'p=5, q=1' },
    {
      name: 'p=5, q=4 → LCA=5', steps: steps2, subtitle: 'p=5, q=4 (p是q的祖先)',
      setup(panel) {
        P_ID = 1; Q_ID = 8;
        setupPanel(panel);
      }
    },
  ],

  setup: setupPanel,

  render(s) {
    const pId = s.pId !== undefined ? s.pId : P_ID;
    const qId = s.qId !== undefined ? s.qId : Q_ID;

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
      if (n.id === pId || n.id === qId) cls += ' is-target';
      if (s.lca === n.id) cls += ' is-target is-visited';
      nodes += `<div class="${cls}" style="position:absolute;left:${n.x - 18}px;top:${n.y}px">${n.val}</div>`;
    });
    treeEl.innerHTML = svg + nodes;

    // Call stack
    const stackEl = document.getElementById('stack-area');
    if (s.callStack.length === 0) {
      stackEl.innerHTML = '<div style="color:rgba(148,163,184,0.6);font-size:12px">（调用栈为空）</div>';
    } else {
      stackEl.innerHTML = s.callStack.map(c => `<div class="stack-item">${c}</div>`).join('');
    }

    document.getElementById('left-val').textContent = s.leftResult !== null ? treeNodes[s.leftResult].val : 'null';
    document.getElementById('right-val').textContent = s.rightResult !== null ? treeNodes[s.rightResult].val : 'null';

    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">最低公共祖先</div>
          <div class="found-sub" style="margin-top:4px">LCA(${treeNodes[pId].val}, ${treeNodes[qId].val}) = ${treeNodes[s.lca].val}</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
