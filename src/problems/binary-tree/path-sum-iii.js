const code = [
  'class Solution:',
  '    def pathSum(self, root, targetSum):',
  '        self.count = 0',
  '        prefix = {0: 1}',
  '        def dfs(node, curr_sum):',
  '            if not node:',
  '                return',
  '            curr_sum += node.val',
  '            self.count += prefix.get(',
  '                curr_sum - targetSum, 0)',
  '            prefix[curr_sum] = prefix.get(',
  '                curr_sum, 0) + 1',
  '            dfs(node.left, curr_sum)',
  '            dfs(node.right, curr_sum)',
  '            prefix[curr_sum] -= 1',
  '        dfs(root, 0)',
  '        return self.count',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 7: 7, 8: 8, 10: 10, 12: 12, 13: 13, 14: 14, 16: 16 };

// ── Test Case 1: tree = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum=8 ──
//          10
//         /  \
//        5   -3
//       / \    \
//      3   2   11
//     / \   \
//    3  -2   1

let treeNodes = [
  { id: 0, val: 10, x: 180, y: 20 },
  { id: 1, val: 5, x: 100, y: 75 },
  { id: 2, val: -3, x: 260, y: 75 },
  { id: 3, val: 3, x: 55, y: 130 },
  { id: 4, val: 2, x: 145, y: 130 },
  { id: 5, val: 11, x: 300, y: 130 },
  { id: 6, val: 3, x: 30, y: 185 },
  { id: 7, val: -2, x: 80, y: 185 },
  { id: 8, val: 1, x: 170, y: 185 },
];
let treeEdges = [[0,1],[0,2],[1,3],[1,4],[2,5],[3,6],[3,7],[4,8]];
let TARGET_SUM = 8;

const steps1 = [
  { lineNum: 3, phase: 'init', description: '初始化 count=0, prefix={0:1}, targetSum=8', current: null, visited: [], currSum: 0, prefix: { 0: 1 }, count: 0, foundPaths: [], targetSum: 8 },
  { lineNum: 7, phase: 'visit', description: 'DFS 访问节点 10, curr_sum = 0+10 = 10', current: 0, visited: [0], currSum: 10, prefix: { 0: 1 }, count: 0, foundPaths: [], targetSum: 8 },
  { lineNum: 8, phase: 'check', description: 'curr_sum-target = 10-8=2, prefix[2]=0, 无匹配', current: 0, visited: [0], currSum: 10, prefix: { 0: 1, 10: 1 }, count: 0, foundPaths: [], targetSum: 8 },
  { lineNum: 7, phase: 'visit', description: 'DFS 访问节点 5, curr_sum = 10+5 = 15', current: 1, visited: [0, 1], currSum: 15, prefix: { 0: 1, 10: 1 }, count: 0, foundPaths: [], targetSum: 8 },
  { lineNum: 8, phase: 'check', description: 'curr_sum-target = 15-8=7, prefix[7]=0, 无匹配', current: 1, visited: [0, 1], currSum: 15, prefix: { 0: 1, 10: 1, 15: 1 }, count: 0, foundPaths: [], targetSum: 8 },
  { lineNum: 7, phase: 'visit', description: 'DFS 访问节点 3, curr_sum = 15+3 = 18', current: 3, visited: [0, 1, 3], currSum: 18, prefix: { 0: 1, 10: 1, 15: 1 }, count: 0, foundPaths: [], targetSum: 8 },
  { lineNum: 8, phase: 'found', description: 'curr_sum-target = 18-8=10, prefix[10]=1, 找到1条路径! [5,3]', current: 3, visited: [0, 1, 3], currSum: 18, prefix: { 0: 1, 10: 1, 15: 1, 18: 1 }, count: 1, foundPaths: ['5→3'], targetSum: 8 },
  { lineNum: 7, phase: 'visit', description: 'DFS 访问叶节点 3(左子), curr_sum = 18+3 = 21', current: 6, visited: [0, 1, 3, 6], currSum: 21, prefix: { 0: 1, 10: 1, 15: 1, 18: 1 }, count: 1, foundPaths: ['5→3'], targetSum: 8 },
  { lineNum: 8, phase: 'check', description: 'curr_sum-target = 21-8=13, prefix[13]=0, 无匹配', current: 6, visited: [0, 1, 3, 6], currSum: 21, prefix: { 0: 1, 10: 1, 15: 1, 18: 1, 21: 1 }, count: 1, foundPaths: ['5→3'], targetSum: 8 },
  { lineNum: 14, phase: 'backtrack', description: '回溯叶节点 3, prefix[21] -= 1', current: 6, visited: [0, 1, 3, 6], currSum: 21, prefix: { 0: 1, 10: 1, 15: 1, 18: 1, 21: 0 }, count: 1, foundPaths: ['5→3'], targetSum: 8 },
  { lineNum: 7, phase: 'visit', description: 'DFS 访问节点 -2, curr_sum = 18+(-2) = 16', current: 7, visited: [0, 1, 3, 6, 7], currSum: 16, prefix: { 0: 1, 10: 1, 15: 1, 18: 1 }, count: 1, foundPaths: ['5→3'], targetSum: 8 },
  { lineNum: 8, phase: 'check', description: 'curr_sum-target = 16-8=8, prefix[8]=0, 无匹配', current: 7, visited: [0, 1, 3, 6, 7], currSum: 16, prefix: { 0: 1, 10: 1, 15: 1, 18: 1, 16: 1 }, count: 1, foundPaths: ['5→3'], targetSum: 8 },
  { lineNum: 14, phase: 'backtrack', description: '回溯节点 -2 和 3, 返回到节点 5', current: 3, visited: [0, 1, 3, 6, 7], currSum: 18, prefix: { 0: 1, 10: 1, 15: 1 }, count: 1, foundPaths: ['5→3'], targetSum: 8 },
  { lineNum: 7, phase: 'visit', description: 'DFS 访问节点 2, curr_sum = 15+2 = 17', current: 4, visited: [0, 1, 3, 6, 7, 4], currSum: 17, prefix: { 0: 1, 10: 1, 15: 1 }, count: 1, foundPaths: ['5→3'], targetSum: 8 },
  { lineNum: 8, phase: 'check', description: 'curr_sum-target = 17-8=9, prefix[9]=0, 无匹配', current: 4, visited: [0, 1, 3, 6, 7, 4], currSum: 17, prefix: { 0: 1, 10: 1, 15: 1, 17: 1 }, count: 1, foundPaths: ['5→3'], targetSum: 8 },
  { lineNum: 7, phase: 'visit', description: 'DFS 访问节点 1, curr_sum = 17+1 = 18', current: 8, visited: [0, 1, 3, 6, 7, 4, 8], currSum: 18, prefix: { 0: 1, 10: 1, 15: 1, 17: 1 }, count: 1, foundPaths: ['5→3'], targetSum: 8 },
  { lineNum: 8, phase: 'found', description: 'curr_sum-target = 18-8=10, prefix[10]=1, 找到路径! [5,2,1]', current: 8, visited: [0, 1, 3, 6, 7, 4, 8], currSum: 18, prefix: { 0: 1, 10: 1, 15: 1, 17: 1, 18: 1 }, count: 2, foundPaths: ['5→3', '5→2→1'], targetSum: 8 },
  { lineNum: 14, phase: 'backtrack', description: '回溯节点 1, 2, 5, 返回到节点 10', current: 0, visited: [0, 1, 3, 6, 7, 4, 8], currSum: 10, prefix: { 0: 1, 10: 1 }, count: 2, foundPaths: ['5→3', '5→2→1'], targetSum: 8 },
  { lineNum: 7, phase: 'visit', description: 'DFS 访问节点 -3, curr_sum = 10+(-3) = 7', current: 2, visited: [0, 1, 3, 6, 7, 4, 8, 2], currSum: 7, prefix: { 0: 1, 10: 1 }, count: 2, foundPaths: ['5→3', '5→2→1'], targetSum: 8 },
  { lineNum: 8, phase: 'check', description: 'curr_sum-target = 7-8=-1, prefix[-1]=0, 无匹配', current: 2, visited: [0, 1, 3, 6, 7, 4, 8, 2], currSum: 7, prefix: { 0: 1, 10: 1, 7: 1 }, count: 2, foundPaths: ['5→3', '5→2→1'], targetSum: 8 },
  { lineNum: 7, phase: 'visit', description: 'DFS 访问节点 11, curr_sum = 7+11 = 18', current: 5, visited: [0, 1, 3, 6, 7, 4, 8, 2, 5], currSum: 18, prefix: { 0: 1, 10: 1, 7: 1 }, count: 2, foundPaths: ['5→3', '5→2→1'], targetSum: 8 },
  { lineNum: 8, phase: 'found', description: 'curr_sum-target = 18-8=10, prefix[10]=1, 找到路径! [-3,11]', current: 5, visited: [0, 1, 3, 6, 7, 4, 8, 2, 5], currSum: 18, prefix: { 0: 1, 10: 1, 7: 1, 18: 1 }, count: 3, foundPaths: ['5→3', '5→2→1', '-3→11'], targetSum: 8 },
  { lineNum: 16, phase: 'done', description: '遍历完成, 共找到 3 条路径和为 8', current: null, visited: [0, 1, 3, 6, 7, 4, 8, 2, 5], currSum: 0, prefix: { 0: 1 }, count: 3, foundPaths: ['5→3', '5→2→1', '-3→11'], targetSum: 8 },
];

// ── Test Case 2: tree = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum=22 ──
//           5
//          / \
//         4   8
//        /   / \
//       11  13  4
//      / \     / \
//     7   2   5   1
// Paths: 5→4→11→2 = 22, 5→8→4→5 = 22, 4→11→7 = 22 => count=3

const treeNodes2 = [
  { id: 0, val: 5, x: 180, y: 20 },
  { id: 1, val: 4, x: 100, y: 75 },
  { id: 2, val: 8, x: 260, y: 75 },
  { id: 3, val: 11, x: 60, y: 130 },
  { id: 4, val: 13, x: 220, y: 130 },
  { id: 5, val: 4, x: 300, y: 130 },
  { id: 6, val: 7, x: 30, y: 185 },
  { id: 7, val: 2, x: 90, y: 185 },
  { id: 8, val: 5, x: 270, y: 185 },
  { id: 9, val: 1, x: 330, y: 185 },
];
const treeEdges2 = [[0,1],[0,2],[1,3],[2,4],[2,5],[3,6],[3,7],[5,8],[5,9]];

const steps2 = [
  { lineNum: 3, phase: 'init', description: '初始化 count=0, prefix={0:1}, targetSum=22', current: null, visited: [], currSum: 0, prefix: { 0: 1 }, count: 0, foundPaths: [], targetSum: 22 },
  { lineNum: 7, phase: 'visit', description: 'DFS 访问节点 5, curr_sum = 0+5 = 5', current: 0, visited: [0], currSum: 5, prefix: { 0: 1 }, count: 0, foundPaths: [], targetSum: 22 },
  { lineNum: 8, phase: 'check', description: 'curr_sum-target = 5-22=-17, prefix[-17]=0, 无匹配', current: 0, visited: [0], currSum: 5, prefix: { 0: 1, 5: 1 }, count: 0, foundPaths: [], targetSum: 22 },
  { lineNum: 7, phase: 'visit', description: 'DFS 访问节点 4, curr_sum = 5+4 = 9', current: 1, visited: [0, 1], currSum: 9, prefix: { 0: 1, 5: 1 }, count: 0, foundPaths: [], targetSum: 22 },
  { lineNum: 8, phase: 'check', description: 'curr_sum-target = 9-22=-13, 无匹配', current: 1, visited: [0, 1], currSum: 9, prefix: { 0: 1, 5: 1, 9: 1 }, count: 0, foundPaths: [], targetSum: 22 },
  { lineNum: 7, phase: 'visit', description: 'DFS 访问节点 11, curr_sum = 9+11 = 20', current: 3, visited: [0, 1, 3], currSum: 20, prefix: { 0: 1, 5: 1, 9: 1 }, count: 0, foundPaths: [], targetSum: 22 },
  { lineNum: 8, phase: 'check', description: 'curr_sum-target = 20-22=-2, 无匹配', current: 3, visited: [0, 1, 3], currSum: 20, prefix: { 0: 1, 5: 1, 9: 1, 20: 1 }, count: 0, foundPaths: [], targetSum: 22 },
  { lineNum: 7, phase: 'visit', description: 'DFS 访问节点 7, curr_sum = 20+7 = 27', current: 6, visited: [0, 1, 3, 6], currSum: 27, prefix: { 0: 1, 5: 1, 9: 1, 20: 1 }, count: 0, foundPaths: [], targetSum: 22 },
  { lineNum: 8, phase: 'found', description: 'curr_sum-target = 27-22=5, prefix[5]=1, 找到路径! [4,11,7]', current: 6, visited: [0, 1, 3, 6], currSum: 27, prefix: { 0: 1, 5: 1, 9: 1, 20: 1, 27: 1 }, count: 1, foundPaths: ['4→11→7'], targetSum: 22 },
  { lineNum: 14, phase: 'backtrack', description: '回溯节点 7', current: 3, visited: [0, 1, 3, 6], currSum: 20, prefix: { 0: 1, 5: 1, 9: 1, 20: 1 }, count: 1, foundPaths: ['4→11→7'], targetSum: 22 },
  { lineNum: 7, phase: 'visit', description: 'DFS 访问节点 2, curr_sum = 20+2 = 22', current: 7, visited: [0, 1, 3, 6, 7], currSum: 22, prefix: { 0: 1, 5: 1, 9: 1, 20: 1 }, count: 1, foundPaths: ['4→11→7'], targetSum: 22 },
  { lineNum: 8, phase: 'found', description: 'curr_sum-target = 22-22=0, prefix[0]=1, 找到路径! [5,4,11,2]', current: 7, visited: [0, 1, 3, 6, 7], currSum: 22, prefix: { 0: 1, 5: 1, 9: 1, 20: 1, 22: 1 }, count: 2, foundPaths: ['4→11→7', '5→4→11→2'], targetSum: 22 },
  { lineNum: 14, phase: 'backtrack', description: '回溯节点 2, 11, 4, 返回到节点 5(root)', current: 0, visited: [0, 1, 3, 6, 7], currSum: 5, prefix: { 0: 1, 5: 1 }, count: 2, foundPaths: ['4→11→7', '5→4→11→2'], targetSum: 22 },
  { lineNum: 7, phase: 'visit', description: 'DFS 访问节点 8, curr_sum = 5+8 = 13', current: 2, visited: [0, 1, 3, 6, 7, 2], currSum: 13, prefix: { 0: 1, 5: 1 }, count: 2, foundPaths: ['4→11→7', '5→4→11→2'], targetSum: 22 },
  { lineNum: 8, phase: 'check', description: 'curr_sum-target = 13-22=-9, 无匹配', current: 2, visited: [0, 1, 3, 6, 7, 2], currSum: 13, prefix: { 0: 1, 5: 1, 13: 1 }, count: 2, foundPaths: ['4→11→7', '5→4→11→2'], targetSum: 22 },
  { lineNum: 7, phase: 'visit', description: 'DFS 访问节点 4(右), curr_sum = 13+4 = 17', current: 5, visited: [0, 1, 3, 6, 7, 2, 5], currSum: 17, prefix: { 0: 1, 5: 1, 13: 1 }, count: 2, foundPaths: ['4→11→7', '5→4→11→2'], targetSum: 22 },
  { lineNum: 7, phase: 'visit', description: 'DFS 访问节点 5(叶), curr_sum = 17+5 = 22', current: 8, visited: [0, 1, 3, 6, 7, 2, 5, 8], currSum: 22, prefix: { 0: 1, 5: 1, 13: 1, 17: 1 }, count: 2, foundPaths: ['4→11→7', '5→4→11→2'], targetSum: 22 },
  { lineNum: 8, phase: 'found', description: 'curr_sum-target = 22-22=0, prefix[0]=1, 找到路径! [5,8,4,5]', current: 8, visited: [0, 1, 3, 6, 7, 2, 5, 8], currSum: 22, prefix: { 0: 1, 5: 1, 13: 1, 17: 1, 22: 1 }, count: 3, foundPaths: ['4→11→7', '5→4→11→2', '5→8→4→5'], targetSum: 22 },
  { lineNum: 16, phase: 'done', description: '遍历完成, 共找到 3 条路径和为 22', current: null, visited: [0, 1, 3, 6, 7, 2, 5, 8, 9, 4], currSum: 0, prefix: { 0: 1 }, count: 3, foundPaths: ['4→11→7', '5→4→11→2', '5→8→4→5'], targetSum: 22 },
];

const phaseLabels = { init: '初始化', visit: '访问节点', check: '检查前缀和', found: '找到路径', backtrack: '回溯', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">树结构（蓝色=当前, 绿色=已访问）</div>
      <div id="tree-area" style="position:relative;height:240px;width:100%"></div>
    </div>
    <div class="card" style="display:flex;gap:20px;font-size:14px;font-family:monospace">
      <span>curr_sum = <b id="sum-val">0</b></span>
      <span>count = <b id="count-val">0</b></span>
      <span>targetSum = <b id="target-val">${TARGET_SUM}</b></span>
    </div>
    <div class="card">
      <div class="section-title">已找到的路径</div>
      <div id="paths-area" style="font-size:13px;font-family:monospace"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '437. Path Sum III — 执行可视化',
  problemDesc: `
    <p>给定一个二叉树的根节点 <code>root</code> 和一个整数 <code>targetSum</code>，求该二叉树里节点值之和等于 <code>targetSum</code> 的路径的数目。路径不需要从根节点开始，也不需要在叶子节点结束，但方向必须是向下的。</p>
    <div class="example">输入：root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
输出：3</div>
    <p>提示：使用前缀和优化搜索。</p>
  `,
  subtitle: 'root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8',
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'targetSum=8, 大树', steps: steps1, subtitle: 'root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8' },
    {
      name: 'targetSum=22', steps: steps2, subtitle: 'root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22',
      setup(panel) {
        treeNodes = treeNodes2;
        treeEdges = treeEdges2;
        TARGET_SUM = 22;
        setupPanel(panel);
      }
    },
  ],

  setup: setupPanel,

  render(s) {
    const targetSum = s.targetSum || TARGET_SUM;
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
      nodes += `<div class="${cls}" style="position:absolute;left:${n.x - 18}px;top:${n.y}px">${n.val}</div>`;
    });
    treeEl.innerHTML = svg + nodes;

    document.getElementById('sum-val').textContent = s.currSum;
    document.getElementById('count-val').textContent = s.count;
    document.getElementById('target-val').textContent = targetSum;

    const pathsEl = document.getElementById('paths-area');
    if (s.foundPaths.length === 0) {
      pathsEl.innerHTML = '<span style="color:rgba(148,163,184,0.6)">（尚未找到）</span>';
    } else {
      pathsEl.innerHTML = s.foundPaths.map((p, i) => `<div style="color:#4ade80;margin:2px 0">${i + 1}. ${p} = ${targetSum}</div>`).join('');
    }

    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">路径计数完成</div>
          <div class="found-sub" style="margin-top:4px">共 ${s.count} 条路径和为 ${targetSum}</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
