// LC 104 - Maximum Depth of Binary Tree
// Input: root = [3,9,20,null,null,15,7], Output: 3

const code = [
  'class Solution:',
  '    def maxDepth(self, root):',
  '        if not root:',
  '            return 0',
  '        left_depth = self.maxDepth(root.left)',
  '        right_depth = self.maxDepth(root.right)',
  '        return max(left_depth, right_depth) + 1',
];

const lineMap = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 };

const steps1 = [
  { lineNum: 1, phase: 'call', description: '调用 maxDepth(3)，从根节点开始', current: 3, callStack: ['maxDepth(3)'], depths: {}, result: null, visited: [] },
  { lineNum: 4, phase: 'recurse', description: '递归调用 maxDepth(9)（左子节点）', current: 9, callStack: ['maxDepth(3)', 'maxDepth(9)'], depths: {}, result: null, visited: [] },
  { lineNum: 2, phase: 'base', description: '节点9的左子节点为空，返回0', current: null, callStack: ['maxDepth(3)', 'maxDepth(9)', 'maxDepth(null)'], depths: {}, result: null, visited: [] },
  { lineNum: 2, phase: 'base', description: '节点9的右子节点为空，返回0', current: null, callStack: ['maxDepth(3)', 'maxDepth(9)', 'maxDepth(null)'], depths: {}, result: null, visited: [] },
  { lineNum: 6, phase: 'return', description: '节点9: left=0, right=0, max(0,0)+1 = 1', current: 9, callStack: ['maxDepth(3)'], depths: { 9: 1 }, result: null, visited: [9] },
  { lineNum: 4, phase: 'recurse', description: '递归调用 maxDepth(20)（右子节点）', current: 20, callStack: ['maxDepth(3)', 'maxDepth(20)'], depths: { 9: 1 }, result: null, visited: [9] },
  { lineNum: 4, phase: 'recurse', description: '递归调用 maxDepth(15)（节点20的左子节点）', current: 15, callStack: ['maxDepth(3)', 'maxDepth(20)', 'maxDepth(15)'], depths: { 9: 1 }, result: null, visited: [9] },
  { lineNum: 2, phase: 'base', description: '节点15的左子节点为空，返回0', current: null, callStack: ['maxDepth(3)', 'maxDepth(20)', 'maxDepth(15)', 'maxDepth(null)'], depths: { 9: 1 }, result: null, visited: [9] },
  { lineNum: 2, phase: 'base', description: '节点15的右子节点为空，返回0', current: null, callStack: ['maxDepth(3)', 'maxDepth(20)', 'maxDepth(15)', 'maxDepth(null)'], depths: { 9: 1 }, result: null, visited: [9] },
  { lineNum: 6, phase: 'return', description: '节点15: max(0,0)+1 = 1，返回深度1', current: 15, callStack: ['maxDepth(3)', 'maxDepth(20)'], depths: { 9: 1, 15: 1 }, result: null, visited: [9, 15] },
  { lineNum: 4, phase: 'recurse', description: '递归调用 maxDepth(7)（节点20的右子节点）', current: 7, callStack: ['maxDepth(3)', 'maxDepth(20)', 'maxDepth(7)'], depths: { 9: 1, 15: 1 }, result: null, visited: [9, 15] },
  { lineNum: 2, phase: 'base', description: '节点7的左子节点为空，返回0', current: null, callStack: ['maxDepth(3)', 'maxDepth(20)', 'maxDepth(7)', 'maxDepth(null)'], depths: { 9: 1, 15: 1 }, result: null, visited: [9, 15] },
  { lineNum: 2, phase: 'base', description: '节点7的右子节点为空，返回0', current: null, callStack: ['maxDepth(3)', 'maxDepth(20)', 'maxDepth(7)', 'maxDepth(null)'], depths: { 9: 1, 15: 1 }, result: null, visited: [9, 15] },
  { lineNum: 6, phase: 'return', description: '节点7: max(0,0)+1 = 1，返回深度1', current: 7, callStack: ['maxDepth(3)', 'maxDepth(20)'], depths: { 9: 1, 15: 1, 7: 1 }, result: null, visited: [9, 15, 7] },
  { lineNum: 6, phase: 'return', description: '节点20: max(1,1)+1 = 2，返回深度2', current: 20, callStack: ['maxDepth(3)'], depths: { 9: 1, 15: 1, 7: 1, 20: 2 }, result: null, visited: [9, 15, 7, 20] },
  { lineNum: 6, phase: 'return', description: '节点3: max(1,2)+1 = 3，返回深度3', current: 3, callStack: [], depths: { 9: 1, 15: 1, 7: 1, 20: 2, 3: 3 }, result: 3, visited: [9, 15, 7, 20, 3] },
  { lineNum: 6, phase: 'done', description: '最大深度 = 3', current: null, callStack: [], depths: { 9: 1, 15: 1, 7: 1, 20: 2, 3: 3 }, result: 3, visited: [9, 15, 7, 20, 3] },
];

// Test case 2: root = [1,null,2]
const steps2 = [
  { lineNum: 1, phase: 'call', description: '调用 maxDepth(1)，从根节点开始', current: 1, callStack: ['maxDepth(1)'], depths: {}, result: null, visited: [] },
  { lineNum: 4, phase: 'recurse', description: '递归调用 maxDepth(null)（左子节点为空）', current: null, callStack: ['maxDepth(1)', 'maxDepth(null)'], depths: {}, result: null, visited: [] },
  { lineNum: 2, phase: 'base', description: '节点为空，返回 0', current: null, callStack: ['maxDepth(1)'], depths: {}, result: null, visited: [] },
  { lineNum: 5, phase: 'recurse', description: '递归调用 maxDepth(2)（右子节点）', current: 2, callStack: ['maxDepth(1)', 'maxDepth(2)'], depths: {}, result: null, visited: [] },
  { lineNum: 2, phase: 'base', description: '节点2的左子节点为空，返回0', current: null, callStack: ['maxDepth(1)', 'maxDepth(2)', 'maxDepth(null)'], depths: {}, result: null, visited: [] },
  { lineNum: 2, phase: 'base', description: '节点2的右子节点为空，返回0', current: null, callStack: ['maxDepth(1)', 'maxDepth(2)', 'maxDepth(null)'], depths: {}, result: null, visited: [] },
  { lineNum: 6, phase: 'return', description: '节点2: max(0,0)+1 = 1，返回深度1', current: 2, callStack: ['maxDepth(1)'], depths: { 2: 1 }, result: null, visited: [2] },
  { lineNum: 6, phase: 'return', description: '节点1: left=0, right=1, max(0,1)+1 = 2', current: 1, callStack: [], depths: { 2: 1, 1: 2 }, result: 2, visited: [2, 1] },
  { lineNum: 6, phase: 'done', description: '最大深度 = 2（树为单链形状）', current: null, callStack: [], depths: { 2: 1, 1: 2 }, result: 2, visited: [2, 1] },
];

const phaseLabels = { call: '调用', recurse: '递归', base: '基准情况', return: '返回', done: '完成' };

let treeLayout = 'default';

function setupPanel(panel) {
  if (treeLayout === 'simple') {
    panel.innerHTML = `
      <div class="card">
        <div class="section-title">树结构</div>
        <div class="tree-container" id="tree-vis" style="display:flex;justify-content:center;padding:16px;">
          <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
            <div class="tree-node" id="tn-1">1</div>
            <div style="display:flex;gap:60px;">
              <div class="tree-node null-node">∅</div>
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
        <div class="section-title">各节点深度</div>
        <div id="depth-vis" style="display:flex;gap:8px;flex-wrap:wrap;min-height:36px;"></div>
      </div>
      <div class="found-box" id="result-box" style="margin-top:12px;display:none;">
        <span class="found-icon">&#x2705;</span>
        <span class="found-text">最大深度</span>
        <span class="found-sub" id="result-val"></span>
      </div>
    `;
  } else {
    panel.innerHTML = `
      <div class="card">
        <div class="section-title">树结构</div>
        <div class="tree-container" id="tree-vis" style="display:flex;justify-content:center;padding:16px;">
          <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
            <div class="tree-node" id="tn-3">3</div>
            <div style="display:flex;gap:80px;">
              <div class="tree-node" id="tn-9">9</div>
              <div class="tree-node" id="tn-20">20</div>
            </div>
            <div style="display:flex;gap:40px;margin-left:80px;">
              <div class="tree-node" id="tn-15">15</div>
              <div class="tree-node" id="tn-7">7</div>
            </div>
          </div>
        </div>
      </div>
      <div class="card" style="margin-top:12px;">
        <div class="section-title">调用栈</div>
        <div class="stack-container" id="callstack-vis" style="min-height:36px;display:flex;gap:4px;flex-wrap:wrap;"></div>
      </div>
      <div class="card" style="margin-top:12px;">
        <div class="section-title">各节点深度</div>
        <div id="depth-vis" style="display:flex;gap:8px;flex-wrap:wrap;min-height:36px;"></div>
      </div>
      <div class="found-box" id="result-box" style="margin-top:12px;display:none;">
        <span class="found-icon">&#x2705;</span>
        <span class="found-text">最大深度</span>
        <span class="found-sub" id="result-val"></span>
      </div>
    `;
  }
}

function render(s) {
  const nodeIds = treeLayout === 'simple'
    ? { 1: 'tn-1', 2: 'tn-2' }
    : { 3: 'tn-3', 9: 'tn-9', 20: 'tn-20', 15: 'tn-15', 7: 'tn-7' };

  Object.entries(nodeIds).forEach(([val, id]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('is-current', 'is-visited');
    if (s.visited.includes(Number(val))) el.classList.add('is-visited');
    if (s.current === Number(val)) el.classList.add('is-current');
    const depth = s.depths[Number(val)];
    el.textContent = depth !== undefined ? `${val}(${depth})` : val;
  });

  const csVis = document.getElementById('callstack-vis');
  if (csVis) {
    csVis.innerHTML = s.callStack.length === 0
      ? '<span style="opacity:0.5;">空</span>'
      : s.callStack.map(c => `<div class="stack-item">${c}</div>`).join('');
  }

  const depthVis = document.getElementById('depth-vis');
  if (depthVis) {
    const entries = Object.entries(s.depths);
    depthVis.innerHTML = entries.length === 0
      ? '<span style="opacity:0.5;">—</span>'
      : entries.map(([k, v]) => `<div class="arr-cell"><div class="arr-val">${v}</div><div class="arr-idx">节点${k}</div></div>`).join('');
  }

  const rb = document.getElementById('result-box');
  const rv = document.getElementById('result-val');
  if (rb && rv) {
    if (s.result !== null) { rb.style.display = ''; rv.textContent = s.result; }
    else { rb.style.display = 'none'; }
  }
}

export default {
  title: '104. Maximum Depth of Binary Tree — 执行可视化',
  problemDesc: `
    <p>给定一个二叉树 <code>root</code>，返回其最大深度。最大深度是指从根节点到最远叶子节点的最长路径上的节点数。</p>
    <div class="example">输入：root = [3,9,20,null,null,15,7]
输出：3</div>
    <p>提示：叶子节点是没有子节点的节点。</p>
  `,
  subtitle: 'root = [3, 9, 20, null, null, 15, 7]',
  code,
  lineMap,
  steps: steps1,
  phaseLabels,
  setup: setupPanel,
  render,

  testCases: [
    { name: 'root=[3,9,20,null,null,15,7]', steps: steps1, subtitle: 'root = [3,9,20,null,null,15,7]' },
    { name: 'root=[1,null,2]，单链', steps: steps2, subtitle: 'root = [1,null,2]', setup(panel) { treeLayout = 'simple'; setupPanel(panel); } },
  ],
};
