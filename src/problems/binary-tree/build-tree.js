const code = [
  'class Solution:',
  '    def buildTree(self, preorder, inorder):',
  '        if not preorder:',
  '            return None',
  '        root_val = preorder[0]',
  '        root = TreeNode(root_val)',
  '        mid = inorder.index(root_val)',
  '        root.left = self.buildTree(',
  '            preorder[1:mid+1], inorder[:mid])',
  '        root.right = self.buildTree(',
  '            preorder[mid+1:], inorder[mid+1:])',
  '        return root',
];

const lineMap = { 2: 2, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 10: 10, 12: 12 };

// ── Test Case 1: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7] ──
//     3
//    / \
//   9  20
//     /  \
//    15   7

let builtEdges = [
  { from: { val: 3 }, to: { val: 9 } },
  { from: { val: 3 }, to: { val: 20 } },
  { from: { val: 20 }, to: { val: 15 } },
  { from: { val: 20 }, to: { val: 7 } },
];

const steps1 = [
  { lineNum: 2, phase: 'enter', description: '调用 buildTree(preorder=[3,9,20,15,7], inorder=[9,3,15,20,7])', preorder: [3,9,20,15,7], inorder: [9,3,15,20,7], rootVal: null, mid: null, leftPre: null, leftIn: null, rightPre: null, rightIn: null, builtNodes: [], depth: 0 },
  { lineNum: 4, phase: 'root', description: 'preorder 非空, root_val = preorder[0] = 3', preorder: [3,9,20,15,7], inorder: [9,3,15,20,7], rootVal: 3, mid: null, leftPre: null, leftIn: null, rightPre: null, rightIn: null, builtNodes: [], depth: 0 },
  { lineNum: 6, phase: 'split', description: 'inorder 中找到 3 在 index=1, 左子树 inorder=[9], 右子树 inorder=[15,20,7]', preorder: [3,9,20,15,7], inorder: [9,3,15,20,7], rootVal: 3, mid: 1, leftPre: [9], leftIn: [9], rightPre: [20,15,7], rightIn: [15,20,7], builtNodes: [{ val: 3, x: 160, y: 30 }], depth: 0 },
  { lineNum: 7, phase: 'recurse', description: '递归构建左子树: buildTree([9], [9])', preorder: [9], inorder: [9], rootVal: null, mid: null, leftPre: null, leftIn: null, rightPre: null, rightIn: null, builtNodes: [{ val: 3, x: 160, y: 30 }], depth: 1 },
  { lineNum: 4, phase: 'root', description: 'root_val = preorder[0] = 9', preorder: [9], inorder: [9], rootVal: 9, mid: null, leftPre: null, leftIn: null, rightPre: null, rightIn: null, builtNodes: [{ val: 3, x: 160, y: 30 }], depth: 1 },
  { lineNum: 6, phase: 'split', description: 'inorder 中找到 9 在 index=0, 无左右子树（均为空）', preorder: [9], inorder: [9], rootVal: 9, mid: 0, leftPre: [], leftIn: [], rightPre: [], rightIn: [], builtNodes: [{ val: 3, x: 160, y: 30 }, { val: 9, x: 80, y: 90 }], depth: 1 },
  { lineNum: 12, phase: 'return', description: '节点 9 是叶节点, 构建完成, 返回', preorder: [9], inorder: [9], rootVal: 9, mid: 0, leftPre: [], leftIn: [], rightPre: [], rightIn: [], builtNodes: [{ val: 3, x: 160, y: 30 }, { val: 9, x: 80, y: 90 }], depth: 1 },
  { lineNum: 10, phase: 'recurse', description: '递归构建右子树: buildTree([20,15,7], [15,20,7])', preorder: [20,15,7], inorder: [15,20,7], rootVal: null, mid: null, leftPre: null, leftIn: null, rightPre: null, rightIn: null, builtNodes: [{ val: 3, x: 160, y: 30 }, { val: 9, x: 80, y: 90 }], depth: 1 },
  { lineNum: 4, phase: 'root', description: 'root_val = preorder[0] = 20', preorder: [20,15,7], inorder: [15,20,7], rootVal: 20, mid: null, leftPre: null, leftIn: null, rightPre: null, rightIn: null, builtNodes: [{ val: 3, x: 160, y: 30 }, { val: 9, x: 80, y: 90 }], depth: 1 },
  { lineNum: 6, phase: 'split', description: 'inorder 中找到 20 在 index=1, 左=[15], 右=[7]', preorder: [20,15,7], inorder: [15,20,7], rootVal: 20, mid: 1, leftPre: [15], leftIn: [15], rightPre: [7], rightIn: [7], builtNodes: [{ val: 3, x: 160, y: 30 }, { val: 9, x: 80, y: 90 }, { val: 20, x: 240, y: 90 }], depth: 1 },
  { lineNum: 7, phase: 'recurse', description: '递归构建 20 的左子树: buildTree([15], [15])', preorder: [15], inorder: [15], rootVal: null, mid: null, leftPre: null, leftIn: null, rightPre: null, rightIn: null, builtNodes: [{ val: 3, x: 160, y: 30 }, { val: 9, x: 80, y: 90 }, { val: 20, x: 240, y: 90 }], depth: 2 },
  { lineNum: 4, phase: 'root', description: 'root_val = 15, 叶节点', preorder: [15], inorder: [15], rootVal: 15, mid: null, leftPre: null, leftIn: null, rightPre: null, rightIn: null, builtNodes: [{ val: 3, x: 160, y: 30 }, { val: 9, x: 80, y: 90 }, { val: 20, x: 240, y: 90 }], depth: 2 },
  { lineNum: 6, phase: 'split', description: '节点 15 是叶节点, mid=0, 无子树', preorder: [15], inorder: [15], rootVal: 15, mid: 0, leftPre: [], leftIn: [], rightPre: [], rightIn: [], builtNodes: [{ val: 3, x: 160, y: 30 }, { val: 9, x: 80, y: 90 }, { val: 20, x: 240, y: 90 }, { val: 15, x: 200, y: 150 }], depth: 2 },
  { lineNum: 10, phase: 'recurse', description: '递归构建 20 的右子树: buildTree([7], [7])', preorder: [7], inorder: [7], rootVal: null, mid: null, leftPre: null, leftIn: null, rightPre: null, rightIn: null, builtNodes: [{ val: 3, x: 160, y: 30 }, { val: 9, x: 80, y: 90 }, { val: 20, x: 240, y: 90 }, { val: 15, x: 200, y: 150 }], depth: 2 },
  { lineNum: 4, phase: 'root', description: 'root_val = 7, 叶节点', preorder: [7], inorder: [7], rootVal: 7, mid: null, leftPre: null, leftIn: null, rightPre: null, rightIn: null, builtNodes: [{ val: 3, x: 160, y: 30 }, { val: 9, x: 80, y: 90 }, { val: 20, x: 240, y: 90 }, { val: 15, x: 200, y: 150 }], depth: 2 },
  { lineNum: 6, phase: 'split', description: '节点 7 是叶节点, mid=0, 无子树', preorder: [7], inorder: [7], rootVal: 7, mid: 0, leftPre: [], leftIn: [], rightPre: [], rightIn: [], builtNodes: [{ val: 3, x: 160, y: 30 }, { val: 9, x: 80, y: 90 }, { val: 20, x: 240, y: 90 }, { val: 15, x: 200, y: 150 }, { val: 7, x: 280, y: 150 }], depth: 2 },
  { lineNum: 12, phase: 'done', description: '整棵树构建完成! 根节点 3, 左子 9, 右子 20(左15,右7)', preorder: [3,9,20,15,7], inorder: [9,3,15,20,7], rootVal: 3, mid: 1, leftPre: null, leftIn: null, rightPre: null, rightIn: null, builtNodes: [{ val: 3, x: 160, y: 30 }, { val: 9, x: 80, y: 90 }, { val: 20, x: 240, y: 90 }, { val: 15, x: 200, y: 150 }, { val: 7, x: 280, y: 150 }], depth: 0 },
];

// ── Test Case 2: preorder = [-1], inorder = [-1] ──
// Single node tree

const builtEdges2 = [];

const steps2 = [
  { lineNum: 2, phase: 'enter', description: '调用 buildTree(preorder=[-1], inorder=[-1])', preorder: [-1], inorder: [-1], rootVal: null, mid: null, leftPre: null, leftIn: null, rightPre: null, rightIn: null, builtNodes: [], depth: 0 },
  { lineNum: 4, phase: 'root', description: 'preorder 非空, root_val = preorder[0] = -1', preorder: [-1], inorder: [-1], rootVal: -1, mid: null, leftPre: null, leftIn: null, rightPre: null, rightIn: null, builtNodes: [], depth: 0 },
  { lineNum: 6, phase: 'split', description: 'inorder 中找到 -1 在 index=0, 无左右子树', preorder: [-1], inorder: [-1], rootVal: -1, mid: 0, leftPre: [], leftIn: [], rightPre: [], rightIn: [], builtNodes: [{ val: -1, x: 160, y: 30 }], depth: 0 },
  { lineNum: 7, phase: 'recurse', description: '递归左子树: preorder=[], 为空直接返回 None', preorder: [], inorder: [], rootVal: null, mid: null, leftPre: null, leftIn: null, rightPre: null, rightIn: null, builtNodes: [{ val: -1, x: 160, y: 30 }], depth: 1 },
  { lineNum: 10, phase: 'recurse', description: '递归右子树: preorder=[], 为空直接返回 None', preorder: [], inorder: [], rootVal: null, mid: null, leftPre: null, leftIn: null, rightPre: null, rightIn: null, builtNodes: [{ val: -1, x: 160, y: 30 }], depth: 1 },
  { lineNum: 12, phase: 'done', description: '构建完成! 只有一个根节点 -1', preorder: [-1], inorder: [-1], rootVal: -1, mid: 0, leftPre: null, leftIn: null, rightPre: null, rightIn: null, builtNodes: [{ val: -1, x: 160, y: 30 }], depth: 0 },
];

const phaseLabels = { enter: '进入递归', root: '选根节点', split: '分割数组', recurse: '递归子树', return: '返回', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">前序遍历 preorder</div>
      <div class="array-row" id="pre-array"></div>
    </div>
    <div class="card">
      <div class="section-title">中序遍历 inorder</div>
      <div class="array-row" id="in-array"></div>
    </div>
    <div class="card">
      <div class="section-title">构建中的树（逐步添加节点）</div>
      <div id="tree-area" style="position:relative;height:200px;width:100%"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '105. Construct Binary Tree — 执行可视化',
  problemDesc: `
    <p>给定两个整数数组 <code>preorder</code> 和 <code>inorder</code>，其中 <code>preorder</code> 是二叉树的前序遍历，<code>inorder</code> 是同一棵树的中序遍历，请构造二叉树并返回其根节点。</p>
    <div class="example">输入：preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
输出：[3,9,20,null,null,15,7]</div>
    <p>提示：<code>preorder</code> 和 <code>inorder</code> 均无重复元素。</p>
  `,
  subtitle: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]',
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'preorder=[3,9,20,15,7]', steps: steps1, subtitle: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]' },
    {
      name: 'preorder=[-1] (单节点)', steps: steps2, subtitle: 'preorder = [-1], inorder = [-1]',
      setup(panel) {
        builtEdges = builtEdges2;
        setupPanel(panel);
      }
    },
  ],

  setup: setupPanel,

  render(s) {
    // Preorder array
    document.getElementById('pre-array').innerHTML = s.preorder.map((v, i) => {
      let cls = 'arr-cell';
      if (v === s.rootVal) cls += ' is-active';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${i}]</div></div>`;
    }).join('');

    // Inorder array
    document.getElementById('in-array').innerHTML = s.inorder.map((v, i) => {
      let cls = 'arr-cell';
      if (v === s.rootVal) cls += ' is-active';
      if (s.leftIn && s.leftIn.includes(v)) cls += ' in-window';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${i}]</div></div>`;
    }).join('');

    // Tree
    const treeEl = document.getElementById('tree-area');
    const nodes = s.builtNodes;
    if (nodes.length === 0) {
      treeEl.innerHTML = '<div style="color:rgba(148,163,184,0.6);font-size:12px;text-align:center;padding-top:40px">（尚未构建）</div>';
    } else {
      let svg = '<svg style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none">';
      builtEdges.forEach(e => {
        const fromN = nodes.find(n => n.val === e.from.val);
        const toN = nodes.find(n => n.val === e.to.val);
        if (fromN && toN) {
          svg += `<line x1="${fromN.x}" y1="${fromN.y + 16}" x2="${toN.x}" y2="${toN.y}" stroke="rgba(148,163,184,0.4)" stroke-width="1.5"/>`;
        }
      });
      svg += '</svg>';

      let html = nodes.map((n, i) => {
        let cls = 'tree-node';
        if (i === nodes.length - 1 && s.phase !== 'done') cls += ' is-current';
        if (s.phase === 'done') cls += ' is-visited';
        return `<div class="${cls}" style="position:absolute;left:${n.x - 18}px;top:${n.y}px">${n.val}</div>`;
      }).join('');
      treeEl.innerHTML = svg + html;
    }

    // Found
    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">构建完成</div>
          <div class="found-sub" style="margin-top:4px">树: [${s.builtNodes.map(n => n.val).join(', ')}]</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
