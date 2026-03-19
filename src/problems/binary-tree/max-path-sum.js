const code = [
  'class Solution:',
  '    def maxPathSum(self, root):',
  '        self.max_sum = float("-inf")',
  '        def dfs(node):',
  '            if not node:',
  '                return 0',
  '            left = max(dfs(node.left), 0)',
  '            right = max(dfs(node.right), 0)',
  '            cur_path = node.val + left + right',
  '            self.max_sum = max(self.max_sum,',
  '                cur_path)',
  '            return node.val + max(left, right)',
  '        dfs(root)',
  '        return self.max_sum',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 11: 11, 12: 12, 13: 13 };

// ── Test Case 1: tree = [-10,9,20,null,null,15,7] ──
//       -10
//       / \
//      9  20
//        /  \
//       15   7
// Max path: 15 + 20 + 7 = 42

let treeNodes = [
  { id: 0, val: -10, x: 160, y: 30 },
  { id: 1, val: 9, x: 80, y: 100 },
  { id: 2, val: 20, x: 240, y: 100 },
  { id: 3, val: 15, x: 190, y: 170 },
  { id: 4, val: 7, x: 290, y: 170 },
];
let treeEdges = [[0,1],[0,2],[2,3],[2,4]];

const steps1 = [
  { lineNum: 2, phase: 'init', description: '初始化 max_sum = -∞', current: null, visited: [], maxSum: '-∞', nodeGains: {}, curPath: null },
  { lineNum: 6, phase: 'visit', description: 'DFS 访问根节点 -10, 先递归左子树', current: 0, visited: [0], maxSum: '-∞', nodeGains: {}, curPath: null },
  { lineNum: 6, phase: 'visit', description: 'DFS 访问节点 9, 它是叶节点', current: 1, visited: [0, 1], maxSum: '-∞', nodeGains: {}, curPath: null },
  { lineNum: 6, phase: 'leaf', description: '节点 9 无子节点, left=0, right=0', current: 1, visited: [0, 1], maxSum: '-∞', nodeGains: {}, curPath: null },
  { lineNum: 8, phase: 'compute', description: 'cur_path = 9+0+0 = 9, max_sum = max(-∞, 9) = 9', current: 1, visited: [0, 1], maxSum: 9, nodeGains: { 1: 9 }, curPath: 9 },
  { lineNum: 11, phase: 'return', description: '节点 9 返回 gain = 9+max(0,0) = 9', current: 1, visited: [0, 1], maxSum: 9, nodeGains: { 1: 9 }, curPath: null },
  { lineNum: 6, phase: 'visit', description: '回到 -10, 递归右子树, 访问节点 20', current: 2, visited: [0, 1, 2], maxSum: 9, nodeGains: { 1: 9 }, curPath: null },
  { lineNum: 6, phase: 'visit', description: 'DFS 访问节点 15, 叶节点', current: 3, visited: [0, 1, 2, 3], maxSum: 9, nodeGains: { 1: 9 }, curPath: null },
  { lineNum: 8, phase: 'compute', description: 'cur_path = 15+0+0 = 15, max_sum = max(9, 15) = 15', current: 3, visited: [0, 1, 2, 3], maxSum: 15, nodeGains: { 1: 9, 3: 15 }, curPath: 15 },
  { lineNum: 11, phase: 'return', description: '节点 15 返回 gain = 15', current: 3, visited: [0, 1, 2, 3], maxSum: 15, nodeGains: { 1: 9, 3: 15 }, curPath: null },
  { lineNum: 6, phase: 'visit', description: 'DFS 访问节点 7, 叶节点', current: 4, visited: [0, 1, 2, 3, 4], maxSum: 15, nodeGains: { 1: 9, 3: 15 }, curPath: null },
  { lineNum: 8, phase: 'compute', description: 'cur_path = 7+0+0 = 7, max_sum = max(15, 7) = 15 不变', current: 4, visited: [0, 1, 2, 3, 4], maxSum: 15, nodeGains: { 1: 9, 3: 15, 4: 7 }, curPath: 7 },
  { lineNum: 11, phase: 'return', description: '节点 7 返回 gain = 7', current: 4, visited: [0, 1, 2, 3, 4], maxSum: 15, nodeGains: { 1: 9, 3: 15, 4: 7 }, curPath: null },
  { lineNum: 6, phase: 'compute_parent', description: '回到节点 20: left=max(15,0)=15, right=max(7,0)=7', current: 2, visited: [0, 1, 2, 3, 4], maxSum: 15, nodeGains: { 1: 9, 3: 15, 4: 7 }, curPath: null },
  { lineNum: 8, phase: 'compute', description: 'cur_path = 20+15+7 = 42! max_sum = max(15, 42) = 42', current: 2, visited: [0, 1, 2, 3, 4], maxSum: 42, nodeGains: { 1: 9, 2: 35, 3: 15, 4: 7 }, curPath: 42 },
  { lineNum: 11, phase: 'return', description: '节点 20 返回 gain = 20+max(15,7) = 35', current: 2, visited: [0, 1, 2, 3, 4], maxSum: 42, nodeGains: { 1: 9, 2: 35, 3: 15, 4: 7 }, curPath: null },
  { lineNum: 6, phase: 'compute_parent', description: '回到根 -10: left=max(9,0)=9, right=max(35,0)=35', current: 0, visited: [0, 1, 2, 3, 4], maxSum: 42, nodeGains: { 1: 9, 2: 35, 3: 15, 4: 7 }, curPath: null },
  { lineNum: 8, phase: 'compute', description: 'cur_path = -10+9+35 = 34, max_sum = max(42, 34) = 42 不变', current: 0, visited: [0, 1, 2, 3, 4], maxSum: 42, nodeGains: { 0: 25, 1: 9, 2: 35, 3: 15, 4: 7 }, curPath: 34 },
  { lineNum: 13, phase: 'done', description: '返回 max_sum = 42, 最大路径: 15 → 20 → 7', current: null, visited: [0, 1, 2, 3, 4], maxSum: 42, nodeGains: { 0: 25, 1: 9, 2: 35, 3: 15, 4: 7 }, curPath: null },
];

// ── Test Case 2: tree = [1,2,3] ──
//     1
//    / \
//   2   3
// Max path: 2 + 1 + 3 = 6

const treeNodes2 = [
  { id: 0, val: 1, x: 160, y: 30 },
  { id: 1, val: 2, x: 90, y: 100 },
  { id: 2, val: 3, x: 230, y: 100 },
];
const treeEdges2 = [[0,1],[0,2]];

const steps2 = [
  { lineNum: 2, phase: 'init', description: '初始化 max_sum = -∞', current: null, visited: [], maxSum: '-∞', nodeGains: {}, curPath: null },
  { lineNum: 6, phase: 'visit', description: 'DFS 访问根节点 1, 先递归左子树', current: 0, visited: [0], maxSum: '-∞', nodeGains: {}, curPath: null },
  { lineNum: 6, phase: 'visit', description: 'DFS 访问节点 2, 叶节点', current: 1, visited: [0, 1], maxSum: '-∞', nodeGains: {}, curPath: null },
  { lineNum: 6, phase: 'leaf', description: '节点 2 无子节点, left=0, right=0', current: 1, visited: [0, 1], maxSum: '-∞', nodeGains: {}, curPath: null },
  { lineNum: 8, phase: 'compute', description: 'cur_path = 2+0+0 = 2, max_sum = max(-∞, 2) = 2', current: 1, visited: [0, 1], maxSum: 2, nodeGains: { 1: 2 }, curPath: 2 },
  { lineNum: 11, phase: 'return', description: '节点 2 返回 gain = 2', current: 1, visited: [0, 1], maxSum: 2, nodeGains: { 1: 2 }, curPath: null },
  { lineNum: 6, phase: 'visit', description: 'DFS 访问节点 3, 叶节点', current: 2, visited: [0, 1, 2], maxSum: 2, nodeGains: { 1: 2 }, curPath: null },
  { lineNum: 8, phase: 'compute', description: 'cur_path = 3+0+0 = 3, max_sum = max(2, 3) = 3', current: 2, visited: [0, 1, 2], maxSum: 3, nodeGains: { 1: 2, 2: 3 }, curPath: 3 },
  { lineNum: 11, phase: 'return', description: '节点 3 返回 gain = 3', current: 2, visited: [0, 1, 2], maxSum: 3, nodeGains: { 1: 2, 2: 3 }, curPath: null },
  { lineNum: 6, phase: 'compute_parent', description: '回到根 1: left=max(2,0)=2, right=max(3,0)=3', current: 0, visited: [0, 1, 2], maxSum: 3, nodeGains: { 1: 2, 2: 3 }, curPath: null },
  { lineNum: 8, phase: 'compute', description: 'cur_path = 1+2+3 = 6, max_sum = max(3, 6) = 6', current: 0, visited: [0, 1, 2], maxSum: 6, nodeGains: { 0: 4, 1: 2, 2: 3 }, curPath: 6 },
  { lineNum: 13, phase: 'done', description: '返回 max_sum = 6, 最大路径: 2 → 1 → 3', current: null, visited: [0, 1, 2], maxSum: 6, nodeGains: { 0: 4, 1: 2, 2: 3 }, curPath: null },
];

const phaseLabels = { init: '初始化', visit: '访问节点', leaf: '叶节点', compute: '计算路径', compute_parent: '收集子树增益', return: '返回增益', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">树结构（节点上方显示增益值）</div>
      <div id="tree-area" style="position:relative;height:240px;width:100%"></div>
    </div>
    <div class="card" style="display:flex;gap:20px;font-size:14px;font-family:monospace">
      <span>max_sum = <b id="max-sum-val" style="color:#4ade80">-∞</b></span>
      <span id="cur-path-info"></span>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '124. Binary Tree Maximum Path Sum — 执行可视化',
  problemDesc: `
    <p>二叉树中的路径被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。同一个节点在一条路径序列中至多出现一次。路径至少包含一个节点。给你一个二叉树的根节点 <code>root</code>，返回其最大路径和。</p>
    <div class="example">输入：root = [-10,9,20,null,null,15,7]
输出：42
解释：最优路径是 15 -> 20 -> 7，路径和为 42</div>
  `,
  subtitle: 'root = [-10, 9, 20, null, null, 15, 7]',
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'tree = [-10,9,20,null,null,15,7]', steps: steps1, subtitle: 'root = [-10,9,20,null,null,15,7]' },
    {
      name: 'tree = [1,2,3]', steps: steps2, subtitle: 'root = [1,2,3]',
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
      // Show gain above node
      const gain = s.nodeGains[n.id];
      const gainLabel = gain !== undefined ? `<div style="position:absolute;top:-18px;left:50%;transform:translateX(-50%);font-size:10px;color:#38bdf8;white-space:nowrap">gain:${gain}</div>` : '';
      nodes += `<div class="${cls}" style="position:absolute;left:${n.x - 18}px;top:${n.y}px">${gainLabel}${n.val}</div>`;
    });
    treeEl.innerHTML = svg + nodes;

    document.getElementById('max-sum-val').textContent = s.maxSum;
    const curPathEl = document.getElementById('cur-path-info');
    curPathEl.innerHTML = s.curPath !== null ? `<span>cur_path = <b style="color:#f59e0b">${s.curPath}</b></span>` : '';

    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">最大路径和</div>
          <div class="found-sub" style="margin-top:4px">max_sum = ${s.maxSum}</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
