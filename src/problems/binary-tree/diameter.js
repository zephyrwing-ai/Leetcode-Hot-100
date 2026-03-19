// LC 543 - Diameter of Binary Tree
// Input: root = [1,2,3,4,5], Output: 3

const code = [
  'class Solution:',
  '    def diameterOfBinaryTree(self, root):',
  '        self.max_diameter = 0',
  '        def dfs(node):',
  '            if not node:',
  '                return 0',
  '            left = dfs(node.left)',
  '            right = dfs(node.right)',
  '            self.max_diameter = max(self.max_diameter,',
  '                                   left + right)',
  '            return max(left, right) + 1',
  '        dfs(root)',
  '        return self.max_diameter',
];

const lineMap = { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 11, 11: 12 };

const steps1 = [
  { lineNum: 1, phase: 'init', description: '初始化 max_diameter = 0', current: null, maxDiameter: 0, depths: {}, callStack: [], visited: [] },
  { lineNum: 11, phase: 'call', description: '调用 dfs(1)，从根节点开始', current: 1, maxDiameter: 0, depths: {}, callStack: ['dfs(1)'], visited: [] },
  { lineNum: 5, phase: 'recurse', description: '递归调用 dfs(2)（节点1的左子节点）', current: 2, maxDiameter: 0, depths: {}, callStack: ['dfs(1)', 'dfs(2)'], visited: [] },
  { lineNum: 5, phase: 'recurse', description: '递归调用 dfs(4)（节点2的左子节点）', current: 4, maxDiameter: 0, depths: {}, callStack: ['dfs(1)', 'dfs(2)', 'dfs(4)'], visited: [] },
  { lineNum: 3, phase: 'base', description: '节点4的左子节点为空，返回0', current: null, maxDiameter: 0, depths: {}, callStack: ['dfs(1)', 'dfs(2)', 'dfs(4)'], visited: [] },
  { lineNum: 3, phase: 'base', description: '节点4的右子节点为空，返回0', current: null, maxDiameter: 0, depths: {}, callStack: ['dfs(1)', 'dfs(2)', 'dfs(4)'], visited: [] },
  { lineNum: 7, phase: 'update', description: '节点4: left=0, right=0, 直径=0, max_diameter=max(0,0)=0', current: 4, maxDiameter: 0, depths: { 4: 1 }, callStack: ['dfs(1)', 'dfs(2)'], visited: [4] },
  { lineNum: 5, phase: 'recurse', description: '递归调用 dfs(5)（节点2的右子节点）', current: 5, maxDiameter: 0, depths: { 4: 1 }, callStack: ['dfs(1)', 'dfs(2)', 'dfs(5)'], visited: [4] },
  { lineNum: 3, phase: 'base', description: '节点5的左子节点为空，返回0', current: null, maxDiameter: 0, depths: { 4: 1 }, callStack: ['dfs(1)', 'dfs(2)', 'dfs(5)'], visited: [4] },
  { lineNum: 3, phase: 'base', description: '节点5的右子节点为空，返回0', current: null, maxDiameter: 0, depths: { 4: 1 }, callStack: ['dfs(1)', 'dfs(2)', 'dfs(5)'], visited: [4] },
  { lineNum: 7, phase: 'update', description: '节点5: left=0, right=0, 直径=0, max_diameter=0', current: 5, maxDiameter: 0, depths: { 4: 1, 5: 1 }, callStack: ['dfs(1)', 'dfs(2)'], visited: [4, 5] },
  { lineNum: 7, phase: 'update', description: '节点2: left=1, right=1, 直径=2, max_diameter=max(0,2)=2', current: 2, maxDiameter: 2, depths: { 4: 1, 5: 1, 2: 2 }, callStack: ['dfs(1)'], visited: [4, 5, 2] },
  { lineNum: 6, phase: 'recurse', description: '递归调用 dfs(3)（节点1的右子节点）', current: 3, maxDiameter: 2, depths: { 4: 1, 5: 1, 2: 2 }, callStack: ['dfs(1)', 'dfs(3)'], visited: [4, 5, 2] },
  { lineNum: 3, phase: 'base', description: '节点3的左子节点为空，返回0', current: null, maxDiameter: 2, depths: { 4: 1, 5: 1, 2: 2 }, callStack: ['dfs(1)', 'dfs(3)'], visited: [4, 5, 2] },
  { lineNum: 3, phase: 'base', description: '节点3的右子节点为空，返回0', current: null, maxDiameter: 2, depths: { 4: 1, 5: 1, 2: 2 }, callStack: ['dfs(1)', 'dfs(3)'], visited: [4, 5, 2] },
  { lineNum: 7, phase: 'update', description: '节点3: left=0, right=0, 直径=0, max_diameter=max(2,0)=2', current: 3, maxDiameter: 2, depths: { 4: 1, 5: 1, 2: 2, 3: 1 }, callStack: ['dfs(1)'], visited: [4, 5, 2, 3] },
  { lineNum: 7, phase: 'update', description: '节点1: left=2, right=1, 直径=3, max_diameter=max(2,3)=3', current: 1, maxDiameter: 3, depths: { 4: 1, 5: 1, 2: 2, 3: 1, 1: 3 }, callStack: [], visited: [4, 5, 2, 3, 1] },
  { lineNum: 10, phase: 'done', description: '最大直径 = 3（路径: 4->2->1->3 或 5->2->1->3）', current: null, maxDiameter: 3, depths: { 4: 1, 5: 1, 2: 2, 3: 1, 1: 3 }, callStack: [], visited: [4, 5, 2, 3, 1] },
];

// Test case 2: root = [1,2]
const steps2 = [
  { lineNum: 1, phase: 'init', description: '初始化 max_diameter = 0', current: null, maxDiameter: 0, depths: {}, callStack: [], visited: [] },
  { lineNum: 11, phase: 'call', description: '调用 dfs(1)，从根节点开始', current: 1, maxDiameter: 0, depths: {}, callStack: ['dfs(1)'], visited: [] },
  { lineNum: 5, phase: 'recurse', description: '递归调用 dfs(2)（节点1的左子节点）', current: 2, maxDiameter: 0, depths: {}, callStack: ['dfs(1)', 'dfs(2)'], visited: [] },
  { lineNum: 3, phase: 'base', description: '节点2的左子节点为空，返回0', current: null, maxDiameter: 0, depths: {}, callStack: ['dfs(1)', 'dfs(2)'], visited: [] },
  { lineNum: 3, phase: 'base', description: '节点2的右子节点为空，返回0', current: null, maxDiameter: 0, depths: {}, callStack: ['dfs(1)', 'dfs(2)'], visited: [] },
  { lineNum: 7, phase: 'update', description: '节点2: left=0, right=0, 直径=0, max_diameter=0', current: 2, maxDiameter: 0, depths: { 2: 1 }, callStack: ['dfs(1)'], visited: [2] },
  { lineNum: 6, phase: 'recurse', description: '递归调用 dfs(null)（节点1的右子节点为空）', current: null, maxDiameter: 0, depths: { 2: 1 }, callStack: ['dfs(1)'], visited: [2] },
  { lineNum: 3, phase: 'base', description: '节点为空，返回 0', current: null, maxDiameter: 0, depths: { 2: 1 }, callStack: ['dfs(1)'], visited: [2] },
  { lineNum: 7, phase: 'update', description: '节点1: left=1, right=0, 直径=1, max_diameter=max(0,1)=1', current: 1, maxDiameter: 1, depths: { 2: 1, 1: 2 }, callStack: [], visited: [2, 1] },
  { lineNum: 10, phase: 'done', description: '最大直径 = 1（路径: 2->1）', current: null, maxDiameter: 1, depths: { 2: 1, 1: 2 }, callStack: [], visited: [2, 1] },
];

const phaseLabels = { init: '初始化', call: '调用', recurse: '递归', base: '基准情况', update: '更新直径', done: '完成' };

let treeMode = 'default';

function setupPanel(panel) {
  if (treeMode === 'simple') {
    panel.innerHTML = `
      <div class="card">
        <div class="section-title">树结构</div>
        <div class="tree-container" id="tree-vis" style="display:flex;justify-content:center;padding:16px;">
          <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
            <div class="tree-node" id="tn-1">1</div>
            <div style="display:flex;gap:60px;">
              <div class="tree-node" id="tn-2">2</div>
            </div>
          </div>
        </div>
      </div>
      <div class="card" style="margin-top:12px;">
        <div class="section-title">调用栈</div>
        <div class="stack-container" id="callstack-vis" style="min-height:36px;display:flex;gap:4px;flex-wrap:wrap;"></div>
      </div>
      <div class="card" style="margin-top:12px;">
        <div class="section-title">当前最大直径: <span id="diameter-val" style="color:var(--color-cyan-400,#22d3ee);">0</span></div>
        <div id="depth-vis" style="display:flex;gap:8px;flex-wrap:wrap;min-height:36px;"></div>
      </div>
      <div class="found-box" id="result-box" style="margin-top:12px;display:none;">
        <span class="found-icon">&#x2705;</span>
        <span class="found-text">直径</span>
        <span class="found-sub" id="result-val"></span>
      </div>
    `;
  } else {
    panel.innerHTML = `
      <div class="card">
        <div class="section-title">树结构</div>
        <div class="tree-container" id="tree-vis" style="display:flex;justify-content:center;padding:16px;">
          <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
            <div class="tree-node" id="tn-1">1</div>
            <div style="display:flex;gap:60px;">
              <div class="tree-node" id="tn-2">2</div>
              <div class="tree-node" id="tn-3">3</div>
            </div>
            <div style="display:flex;gap:20px;margin-right:60px;">
              <div class="tree-node" id="tn-4">4</div>
              <div class="tree-node" id="tn-5">5</div>
            </div>
          </div>
        </div>
      </div>
      <div class="card" style="margin-top:12px;">
        <div class="section-title">调用栈</div>
        <div class="stack-container" id="callstack-vis" style="min-height:36px;display:flex;gap:4px;flex-wrap:wrap;"></div>
      </div>
      <div class="card" style="margin-top:12px;">
        <div class="section-title">当前最大直径: <span id="diameter-val" style="color:var(--color-cyan-400,#22d3ee);">0</span></div>
        <div id="depth-vis" style="display:flex;gap:8px;flex-wrap:wrap;min-height:36px;"></div>
      </div>
      <div class="found-box" id="result-box" style="margin-top:12px;display:none;">
        <span class="found-icon">&#x2705;</span>
        <span class="found-text">直径</span>
        <span class="found-sub" id="result-val"></span>
      </div>
    `;
  }
}

function render(s) {
  const nodeIds = treeMode === 'simple'
    ? { 1: 'tn-1', 2: 'tn-2' }
    : { 1: 'tn-1', 2: 'tn-2', 3: 'tn-3', 4: 'tn-4', 5: 'tn-5' };

  Object.entries(nodeIds).forEach(([val, id]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('is-current', 'is-visited');
    if (s.visited.includes(Number(val))) el.classList.add('is-visited');
    if (s.current === Number(val)) el.classList.add('is-current');
    const depth = s.depths[Number(val)];
    el.textContent = depth !== undefined ? `${val}(d${depth})` : val;
  });

  const csVis = document.getElementById('callstack-vis');
  if (csVis) {
    csVis.innerHTML = s.callStack.length === 0
      ? '<span style="opacity:0.5;">空</span>'
      : s.callStack.map(c => `<div class="stack-item">${c}</div>`).join('');
  }

  const dv = document.getElementById('diameter-val');
  if (dv) dv.textContent = s.maxDiameter;

  const depthVis = document.getElementById('depth-vis');
  if (depthVis) {
    const entries = Object.entries(s.depths);
    depthVis.innerHTML = entries.length === 0
      ? '<span style="opacity:0.5;">—</span>'
      : entries.map(([k, v]) => `<div class="arr-cell"><div class="arr-val">${v}</div><div class="arr-idx">节点${k}</div></div>`).join('');
  }

  const rb = document.getElementById('result-box');
  const rv = document.getElementById('result-val');
  if (rb && rv && s.phase === 'done') { rb.style.display = ''; rv.textContent = s.maxDiameter; }
  else if (rb) { rb.style.display = 'none'; }
}

export default {
  title: '543. Diameter of Binary Tree — 执行可视化',
  problemDesc: `
    <p>给你一棵二叉树的根节点 <code>root</code>，返回该树的直径。二叉树的直径是任意两个节点之间最长路径的边数。</p>
    <div class="example">输入：root = [1,2,3,4,5]
输出：3
解释：取路径 [4,2,1,3] 或 [5,2,1,3] 的长度</div>
    <p>提示：最长路径可能不经过根节点。</p>
  `,
  subtitle: 'root = [1, 2, 3, 4, 5]',
  code,
  lineMap,
  steps: steps1,
  phaseLabels,
  setup: setupPanel,
  render,

  testCases: [
    { name: 'root=[1,2,3,4,5]，直径=3', steps: steps1, subtitle: 'root = [1,2,3,4,5]' },
    { name: 'root=[1,2]，直径=1', steps: steps2, subtitle: 'root = [1,2]', setup(panel) { treeMode = 'simple'; setupPanel(panel); } },
  ],
};
