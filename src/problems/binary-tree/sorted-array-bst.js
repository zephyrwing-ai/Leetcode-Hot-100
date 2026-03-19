// LC 108 - Convert Sorted Array to Binary Search Tree

let NUMS_INPUT = [-10, -3, 0, 5, 9];

const code = [
  'class Solution:',
  '    def sortedArrayToBST(self, nums):',
  '        def build(left, right):',
  '            if left > right:',
  '                return None',
  '            mid = (left + right) // 2',
  '            node = TreeNode(nums[mid])',
  '            node.left = build(left, mid - 1)',
  '            node.right = build(mid + 1, right)',
  '            return node',
  '        return build(0, len(nums) - 1)',
];

const lineMap = { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10 };

// ── Test Case 1: nums = [-10,-3,0,5,9] ──
const steps1 = [
  { lineNum: 9, phase: 'call', description: '调用 build(0, 4)，整个数组', current: null, nums: [-10, -3, 0, 5, 9], left: 0, right: 4, mid: null, builtNodes: [], callStack: ['build(0,4)'], treeEdges: [] },
  { lineNum: 4, phase: 'select', description: 'mid = (0+4)//2 = 2，选择 nums[2]=0 作为根节点', current: 0, nums: [-10, -3, 0, 5, 9], left: 0, right: 4, mid: 2, builtNodes: [0], callStack: ['build(0,4)'], treeEdges: [] },
  { lineNum: 6, phase: 'recurse', description: '递归 build(0, 1) 构建左子树', current: null, nums: [-10, -3, 0, 5, 9], left: 0, right: 1, mid: null, builtNodes: [0], callStack: ['build(0,4)', 'build(0,1)'], treeEdges: [] },
  { lineNum: 4, phase: 'select', description: 'mid = (0+1)//2 = 0，选择 nums[0]=-10', current: -10, nums: [-10, -3, 0, 5, 9], left: 0, right: 1, mid: 0, builtNodes: [0, -10], callStack: ['build(0,4)', 'build(0,1)'], treeEdges: [{ from: 0, to: -10, side: 'left' }] },
  { lineNum: 6, phase: 'recurse', description: '递归 build(0, -1) 构建-10的左子树', current: null, nums: [-10, -3, 0, 5, 9], left: 0, right: -1, mid: null, builtNodes: [0, -10], callStack: ['build(0,4)', 'build(0,1)', 'build(0,-1)'], treeEdges: [{ from: 0, to: -10, side: 'left' }] },
  { lineNum: 3, phase: 'base', description: 'left > right (0 > -1)，返回 None', current: null, nums: [-10, -3, 0, 5, 9], left: 0, right: -1, mid: null, builtNodes: [0, -10], callStack: ['build(0,4)', 'build(0,1)'], treeEdges: [{ from: 0, to: -10, side: 'left' }] },
  { lineNum: 7, phase: 'recurse', description: '递归 build(1, 1) 构建-10的右子树', current: null, nums: [-10, -3, 0, 5, 9], left: 1, right: 1, mid: null, builtNodes: [0, -10], callStack: ['build(0,4)', 'build(0,1)', 'build(1,1)'], treeEdges: [{ from: 0, to: -10, side: 'left' }] },
  { lineNum: 4, phase: 'select', description: 'mid = (1+1)//2 = 1，选择 nums[1]=-3', current: -3, nums: [-10, -3, 0, 5, 9], left: 1, right: 1, mid: 1, builtNodes: [0, -10, -3], callStack: ['build(0,4)', 'build(0,1)', 'build(1,1)'], treeEdges: [{ from: 0, to: -10, side: 'left' }, { from: -10, to: -3, side: 'right' }] },
  { lineNum: 3, phase: 'base', description: '-3的左右子树均为空（叶子节点）', current: -3, nums: [-10, -3, 0, 5, 9], left: 1, right: 1, mid: 1, builtNodes: [0, -10, -3], callStack: ['build(0,4)', 'build(0,1)'], treeEdges: [{ from: 0, to: -10, side: 'left' }, { from: -10, to: -3, side: 'right' }] },
  { lineNum: 8, phase: 'return', description: '节点-10构建完成，返回', current: -10, nums: [-10, -3, 0, 5, 9], left: 0, right: 1, mid: 0, builtNodes: [0, -10, -3], callStack: ['build(0,4)'], treeEdges: [{ from: 0, to: -10, side: 'left' }, { from: -10, to: -3, side: 'right' }] },
  { lineNum: 7, phase: 'recurse', description: '递归 build(3, 4) 构建右子树', current: null, nums: [-10, -3, 0, 5, 9], left: 3, right: 4, mid: null, builtNodes: [0, -10, -3], callStack: ['build(0,4)', 'build(3,4)'], treeEdges: [{ from: 0, to: -10, side: 'left' }, { from: -10, to: -3, side: 'right' }] },
  { lineNum: 4, phase: 'select', description: 'mid = (3+4)//2 = 3，选择 nums[3]=5', current: 5, nums: [-10, -3, 0, 5, 9], left: 3, right: 4, mid: 3, builtNodes: [0, -10, -3, 5], callStack: ['build(0,4)', 'build(3,4)'], treeEdges: [{ from: 0, to: -10, side: 'left' }, { from: -10, to: -3, side: 'right' }, { from: 0, to: 5, side: 'right' }] },
  { lineNum: 3, phase: 'base', description: '5的左子树为空（build(3,2) left>right）', current: 5, nums: [-10, -3, 0, 5, 9], left: 3, right: 4, mid: 3, builtNodes: [0, -10, -3, 5], callStack: ['build(0,4)', 'build(3,4)'], treeEdges: [{ from: 0, to: -10, side: 'left' }, { from: -10, to: -3, side: 'right' }, { from: 0, to: 5, side: 'right' }] },
  { lineNum: 7, phase: 'recurse', description: '递归 build(4, 4) 构建5的右子树', current: null, nums: [-10, -3, 0, 5, 9], left: 4, right: 4, mid: null, builtNodes: [0, -10, -3, 5], callStack: ['build(0,4)', 'build(3,4)', 'build(4,4)'], treeEdges: [{ from: 0, to: -10, side: 'left' }, { from: -10, to: -3, side: 'right' }, { from: 0, to: 5, side: 'right' }] },
  { lineNum: 4, phase: 'select', description: 'mid = (4+4)//2 = 4，选择 nums[4]=9', current: 9, nums: [-10, -3, 0, 5, 9], left: 4, right: 4, mid: 4, builtNodes: [0, -10, -3, 5, 9], callStack: ['build(0,4)', 'build(3,4)', 'build(4,4)'], treeEdges: [{ from: 0, to: -10, side: 'left' }, { from: -10, to: -3, side: 'right' }, { from: 0, to: 5, side: 'right' }, { from: 5, to: 9, side: 'right' }] },
  { lineNum: 3, phase: 'base', description: '9的左右子树均为空（叶子节点）', current: 9, nums: [-10, -3, 0, 5, 9], left: 4, right: 4, mid: 4, builtNodes: [0, -10, -3, 5, 9], callStack: ['build(0,4)', 'build(3,4)'], treeEdges: [{ from: 0, to: -10, side: 'left' }, { from: -10, to: -3, side: 'right' }, { from: 0, to: 5, side: 'right' }, { from: 5, to: 9, side: 'right' }] },
  { lineNum: 8, phase: 'return', description: '节点5构建完成，返回', current: 5, nums: [-10, -3, 0, 5, 9], left: 3, right: 4, mid: 3, builtNodes: [0, -10, -3, 5, 9], callStack: ['build(0,4)'], treeEdges: [{ from: 0, to: -10, side: 'left' }, { from: -10, to: -3, side: 'right' }, { from: 0, to: 5, side: 'right' }, { from: 5, to: 9, side: 'right' }] },
  { lineNum: 8, phase: 'done', description: 'BST构建完成！根节点为0', current: 0, nums: [-10, -3, 0, 5, 9], left: 0, right: 4, mid: 2, builtNodes: [0, -10, -3, 5, 9], callStack: [], treeEdges: [{ from: 0, to: -10, side: 'left' }, { from: -10, to: -3, side: 'right' }, { from: 0, to: 5, side: 'right' }, { from: 5, to: 9, side: 'right' }] },
];

// ── Test Case 2: nums = [1,3] ──
const steps2 = [
  { lineNum: 9, phase: 'call', description: '调用 build(0, 1)，整个数组', current: null, nums: [1, 3], left: 0, right: 1, mid: null, builtNodes: [], callStack: ['build(0,1)'], treeEdges: [] },
  { lineNum: 4, phase: 'select', description: 'mid = (0+1)//2 = 0，选择 nums[0]=1 作为根节点', current: 1, nums: [1, 3], left: 0, right: 1, mid: 0, builtNodes: [1], callStack: ['build(0,1)'], treeEdges: [] },
  { lineNum: 6, phase: 'recurse', description: '递归 build(0, -1) 构建1的左子树', current: null, nums: [1, 3], left: 0, right: -1, mid: null, builtNodes: [1], callStack: ['build(0,1)', 'build(0,-1)'], treeEdges: [] },
  { lineNum: 3, phase: 'base', description: 'left > right (0 > -1)，返回 None', current: null, nums: [1, 3], left: 0, right: -1, mid: null, builtNodes: [1], callStack: ['build(0,1)'], treeEdges: [] },
  { lineNum: 7, phase: 'recurse', description: '递归 build(1, 1) 构建1的右子树', current: null, nums: [1, 3], left: 1, right: 1, mid: null, builtNodes: [1], callStack: ['build(0,1)', 'build(1,1)'], treeEdges: [] },
  { lineNum: 4, phase: 'select', description: 'mid = (1+1)//2 = 1，选择 nums[1]=3', current: 3, nums: [1, 3], left: 1, right: 1, mid: 1, builtNodes: [1, 3], callStack: ['build(0,1)', 'build(1,1)'], treeEdges: [{ from: 1, to: 3, side: 'right' }] },
  { lineNum: 3, phase: 'base', description: '3的左右子树均为空（叶子节点）', current: 3, nums: [1, 3], left: 1, right: 1, mid: 1, builtNodes: [1, 3], callStack: ['build(0,1)'], treeEdges: [{ from: 1, to: 3, side: 'right' }] },
  { lineNum: 8, phase: 'done', description: 'BST构建完成！根节点为1，右子节点为3', current: 1, nums: [1, 3], left: 0, right: 1, mid: 0, builtNodes: [1, 3], callStack: [], treeEdges: [{ from: 1, to: 3, side: 'right' }] },
];

const phaseLabels = { call: '调用', select: '选择中点', recurse: '递归', base: '基准情况', return: '返回', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">输入数组</div>
      <div id="nums-vis" style="display:flex;gap:4px;flex-wrap:wrap;padding:8px;"></div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="section-title">构建中的BST</div>
      <div class="tree-container" id="tree-vis" style="display:flex;justify-content:center;padding:16px;min-height:150px;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
          <div class="tree-node null-node" id="tn-0">\u2014</div>
          <div style="display:flex;gap:60px;">
            <div class="tree-node null-node" id="tn-n10">\u2014</div>
            <div class="tree-node null-node" id="tn-5">\u2014</div>
          </div>
          <div style="display:flex;gap:20px;">
            <div style="width:48px;"></div>
            <div class="tree-node null-node" id="tn-n3">\u2014</div>
            <div style="width:48px;"></div>
            <div class="tree-node null-node" id="tn-9">\u2014</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="section-title">调用栈</div>
      <div class="stack-container" id="callstack-vis" style="min-height:36px;display:flex;gap:4px;flex-wrap:wrap;"></div>
    </div>
  `;
}

function setupPanel2(panel) {
  NUMS_INPUT = [1, 3];
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">输入数组</div>
      <div id="nums-vis" style="display:flex;gap:4px;flex-wrap:wrap;padding:8px;"></div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="section-title">构建中的BST</div>
      <div class="tree-container" id="tree-vis" style="display:flex;justify-content:center;padding:16px;min-height:150px;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
          <div class="tree-node null-node" id="tn-1">\u2014</div>
          <div style="display:flex;gap:60px;">
            <div style="width:48px;"></div>
            <div class="tree-node null-node" id="tn-3">\u2014</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="section-title">调用栈</div>
      <div class="stack-container" id="callstack-vis" style="min-height:36px;display:flex;gap:4px;flex-wrap:wrap;"></div>
    </div>
  `;
}

function render(s) {
  const nums = s.nums || NUMS_INPUT;

  // Update nums array highlighting
  const numsVis = document.getElementById('nums-vis');
  if (numsVis) {
    numsVis.innerHTML = nums.map((v, i) => {
      const isSelected = s.mid === i;
      const isMid = isSelected ? ' is-current' : '';
      const isInRange = i >= s.left && i <= s.right;
      return `<div class="arr-cell${isMid}" style="${isInRange ? 'opacity:1;' : 'opacity:0.4;'}${isSelected ? 'border-color:var(--color-cyan-400,#22d3ee);' : ''}"><div class="arr-val">${v}</div><div class="arr-idx">${i}</div></div>`;
    }).join('');
  }

  // Update tree nodes - try all possible node values
  const allVals = [...new Set(nums)];
  allVals.forEach(val => {
    // Try different id patterns
    let el = document.getElementById(`tn-${val}`);
    if (!el && val === -10) el = document.getElementById('tn-n10');
    if (!el && val === -3) el = document.getElementById('tn-n3');
    if (!el) return;
    el.classList.remove('is-current', 'is-visited', 'null-node');
    if (s.builtNodes.includes(val)) {
      el.textContent = val;
      el.classList.add('is-visited');
    } else {
      el.textContent = '\u2014';
      el.classList.add('null-node');
    }
    if (s.current === val) el.classList.add('is-current');
  });

  const csVis = document.getElementById('callstack-vis');
  if (csVis) {
    csVis.innerHTML = s.callStack.length === 0
      ? '<span style="opacity:0.5;">空</span>'
      : s.callStack.map(c => `<div class="stack-item">${c}</div>`).join('');
  }
}

export default {
  title: '108. Convert Sorted Array to BST \u2014 执行可视化',
  problemDesc: `
    <p>给你一个整数数组 <code>nums</code>，其中元素已经按升序排列，请你将其转换为一棵高度平衡二叉搜索树。</p>
    <div class="example">输入：nums = [-10,-3,0,5,9]
输出：[0,-3,9,-10,null,5]</div>
    <p>提示：高度平衡二叉树是指每个节点的左右两个子树的高度差不超过 1。</p>
  `,
  subtitle: `nums = [${NUMS_INPUT}]`,
  code,
  lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'nums = [-10,-3,0,5,9]', steps: steps1, subtitle: 'nums = [-10,-3,0,5,9]' },
    {
      name: 'nums = [1,3]', steps: steps2, subtitle: 'nums = [1,3]',
      setup: setupPanel2,
    },
  ],

  setup: setupPanel,
  render,
};
