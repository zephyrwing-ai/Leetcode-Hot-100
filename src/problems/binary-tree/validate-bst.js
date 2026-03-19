// LC 98 - Validate Binary Search Tree

let TREE_LABEL = '[5,1,4,null,null,3,6]';

const code = [
  'class Solution:',
  '    def isValidBST(self, root):',
  '        def validate(node, low, high):',
  '            if not node:',
  '                return True',
  '            if not (low < node.val < high):',
  '                return False',
  '            return (validate(node.left, low, node.val)',
  '                    and validate(node.right, node.val, high))',
  '        return validate(root, float("-inf"), float("inf"))',
];

const lineMap = { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9 };

// ── Test Case 1: root = [5,1,4,null,null,3,6] (invalid) ──
const steps1 = [
  { lineNum: 8, phase: 'call', description: '调用 validate(5, -inf, +inf)', current: 5, low: '-inf', high: '+inf', valid: null, visited: [], checks: [], tree: [5,1,4,null,null,3,6] },
  { lineNum: 4, phase: 'check', description: '检查 -inf < 5 < +inf \u2192 True \u2713', current: 5, low: '-inf', high: '+inf', valid: null, visited: [], checks: [{ node: 5, range: '(-inf, +inf)', pass: true }], tree: [5,1,4,null,null,3,6] },
  { lineNum: 6, phase: 'recurse', description: '递归验证左子树: validate(1, -inf, 5)', current: 1, low: '-inf', high: '5', valid: null, visited: [5], checks: [{ node: 5, range: '(-inf, +inf)', pass: true }], tree: [5,1,4,null,null,3,6] },
  { lineNum: 4, phase: 'check', description: '检查 -inf < 1 < 5 \u2192 True \u2713', current: 1, low: '-inf', high: '5', valid: null, visited: [5], checks: [{ node: 5, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 5)', pass: true }], tree: [5,1,4,null,null,3,6] },
  { lineNum: 6, phase: 'recurse', description: '递归验证1的左子树: validate(null, -inf, 1)', current: null, low: '-inf', high: '1', valid: null, visited: [5, 1], checks: [{ node: 5, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 5)', pass: true }], tree: [5,1,4,null,null,3,6] },
  { lineNum: 3, phase: 'base', description: '节点为空，返回 True', current: null, low: '-inf', high: '1', valid: null, visited: [5, 1], checks: [{ node: 5, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 5)', pass: true }], tree: [5,1,4,null,null,3,6] },
  { lineNum: 7, phase: 'recurse', description: '递归验证1的右子树: validate(null, 1, 5)', current: null, low: '1', high: '5', valid: null, visited: [5, 1], checks: [{ node: 5, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 5)', pass: true }], tree: [5,1,4,null,null,3,6] },
  { lineNum: 3, phase: 'base', description: '节点为空，返回 True', current: null, low: '1', high: '5', valid: null, visited: [5, 1], checks: [{ node: 5, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 5)', pass: true }], tree: [5,1,4,null,null,3,6] },
  { lineNum: 6, phase: 'return', description: '节点1验证通过 \u2713', current: 1, low: '-inf', high: '5', valid: null, visited: [5, 1], checks: [{ node: 5, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 5)', pass: true }], tree: [5,1,4,null,null,3,6] },
  { lineNum: 7, phase: 'recurse', description: '递归验证右子树: validate(4, 5, +inf)', current: 4, low: '5', high: '+inf', valid: null, visited: [5, 1], checks: [{ node: 5, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 5)', pass: true }], tree: [5,1,4,null,null,3,6] },
  { lineNum: 4, phase: 'check', description: '检查 5 < 4 < +inf \u2192 False! 4\u4e0d\u5927\u4e8e5 \u2717', current: 4, low: '5', high: '+inf', valid: false, visited: [5, 1], checks: [{ node: 5, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 5)', pass: true }, { node: 4, range: '(5, +inf)', pass: false }], tree: [5,1,4,null,null,3,6] },
  { lineNum: 5, phase: 'fail', description: '节点4违反BST性质！作为5的右子节点，4应该 > 5', current: 4, low: '5', high: '+inf', valid: false, visited: [5, 1, 4], checks: [{ node: 5, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 5)', pass: true }, { node: 4, range: '(5, +inf)', pass: false }], tree: [5,1,4,null,null,3,6] },
  { lineNum: 8, phase: 'done', description: '不是有效BST！返回 False（节点4违反约束）', current: null, low: '', high: '', valid: false, visited: [5, 1, 4], checks: [{ node: 5, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 5)', pass: true }, { node: 4, range: '(5, +inf)', pass: false }], tree: [5,1,4,null,null,3,6] },
];

// ── Test Case 2: root = [2,1,3] (valid) ──
const steps2 = [
  { lineNum: 8, phase: 'call', description: '调用 validate(2, -inf, +inf)', current: 2, low: '-inf', high: '+inf', valid: null, visited: [], checks: [], tree: [2,1,3] },
  { lineNum: 4, phase: 'check', description: '检查 -inf < 2 < +inf \u2192 True \u2713', current: 2, low: '-inf', high: '+inf', valid: null, visited: [], checks: [{ node: 2, range: '(-inf, +inf)', pass: true }], tree: [2,1,3] },
  { lineNum: 6, phase: 'recurse', description: '递归验证左子树: validate(1, -inf, 2)', current: 1, low: '-inf', high: '2', valid: null, visited: [2], checks: [{ node: 2, range: '(-inf, +inf)', pass: true }], tree: [2,1,3] },
  { lineNum: 4, phase: 'check', description: '检查 -inf < 1 < 2 \u2192 True \u2713', current: 1, low: '-inf', high: '2', valid: null, visited: [2], checks: [{ node: 2, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 2)', pass: true }], tree: [2,1,3] },
  { lineNum: 6, phase: 'recurse', description: '递归验证1的左子树: validate(null, -inf, 1)', current: null, low: '-inf', high: '1', valid: null, visited: [2, 1], checks: [{ node: 2, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 2)', pass: true }], tree: [2,1,3] },
  { lineNum: 3, phase: 'base', description: '节点为空，返回 True', current: null, low: '-inf', high: '1', valid: null, visited: [2, 1], checks: [{ node: 2, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 2)', pass: true }], tree: [2,1,3] },
  { lineNum: 7, phase: 'recurse', description: '递归验证1的右子树: validate(null, 1, 2)', current: null, low: '1', high: '2', valid: null, visited: [2, 1], checks: [{ node: 2, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 2)', pass: true }], tree: [2,1,3] },
  { lineNum: 3, phase: 'base', description: '节点为空，返回 True', current: null, low: '1', high: '2', valid: null, visited: [2, 1], checks: [{ node: 2, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 2)', pass: true }], tree: [2,1,3] },
  { lineNum: 6, phase: 'return', description: '节点1验证通过 \u2713', current: 1, low: '-inf', high: '2', valid: null, visited: [2, 1], checks: [{ node: 2, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 2)', pass: true }], tree: [2,1,3] },
  { lineNum: 7, phase: 'recurse', description: '递归验证右子树: validate(3, 2, +inf)', current: 3, low: '2', high: '+inf', valid: null, visited: [2, 1], checks: [{ node: 2, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 2)', pass: true }], tree: [2,1,3] },
  { lineNum: 4, phase: 'check', description: '检查 2 < 3 < +inf \u2192 True \u2713', current: 3, low: '2', high: '+inf', valid: null, visited: [2, 1], checks: [{ node: 2, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 2)', pass: true }, { node: 3, range: '(2, +inf)', pass: true }], tree: [2,1,3] },
  { lineNum: 6, phase: 'recurse', description: '递归验证3的左子树: validate(null, 2, 3)', current: null, low: '2', high: '3', valid: null, visited: [2, 1, 3], checks: [{ node: 2, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 2)', pass: true }, { node: 3, range: '(2, +inf)', pass: true }], tree: [2,1,3] },
  { lineNum: 3, phase: 'base', description: '节点为空，返回 True', current: null, low: '2', high: '3', valid: null, visited: [2, 1, 3], checks: [{ node: 2, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 2)', pass: true }, { node: 3, range: '(2, +inf)', pass: true }], tree: [2,1,3] },
  { lineNum: 7, phase: 'recurse', description: '递归验证3的右子树: validate(null, 3, +inf)', current: null, low: '3', high: '+inf', valid: null, visited: [2, 1, 3], checks: [{ node: 2, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 2)', pass: true }, { node: 3, range: '(2, +inf)', pass: true }], tree: [2,1,3] },
  { lineNum: 3, phase: 'base', description: '节点为空，返回 True', current: null, low: '3', high: '+inf', valid: null, visited: [2, 1, 3], checks: [{ node: 2, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 2)', pass: true }, { node: 3, range: '(2, +inf)', pass: true }], tree: [2,1,3] },
  { lineNum: 6, phase: 'return', description: '节点3验证通过 \u2713', current: 3, low: '2', high: '+inf', valid: null, visited: [2, 1, 3], checks: [{ node: 2, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 2)', pass: true }, { node: 3, range: '(2, +inf)', pass: true }], tree: [2,1,3] },
  { lineNum: 8, phase: 'done', description: '是有效BST！返回 True', current: null, low: '', high: '', valid: true, visited: [2, 1, 3], checks: [{ node: 2, range: '(-inf, +inf)', pass: true }, { node: 1, range: '(-inf, 2)', pass: true }, { node: 3, range: '(2, +inf)', pass: true }], tree: [2,1,3] },
];

const phaseLabels = { call: '调用', check: '范围检查', recurse: '递归', base: '基准情况', return: '返回', fail: '违反', done: '完成' };

/*
  Tree 1:     5          Tree 2:   2
             / \                  / \
            1   4                1   3
               / \
              3   6
  Tree 1 Invalid: 4 is right child of 5 but 4 < 5
  Tree 2 Valid
*/

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">树结构</div>
      <div class="tree-container" id="tree-vis" style="display:flex;justify-content:center;padding:16px;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
          <div class="tree-node" id="tn-5">5</div>
          <div style="display:flex;gap:60px;">
            <div class="tree-node" id="tn-1">1</div>
            <div class="tree-node" id="tn-4">4</div>
          </div>
          <div style="display:flex;gap:20px;margin-left:60px;">
            <div class="tree-node" id="tn-3">3</div>
            <div class="tree-node" id="tn-6">6</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="section-title">当前范围约束</div>
      <div id="range-vis" style="font-size:1.1em;min-height:36px;display:flex;align-items:center;gap:8px;padding:8px;"></div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="section-title">验证记录</div>
      <div id="checks-vis" style="display:flex;flex-direction:column;gap:4px;min-height:36px;"></div>
    </div>
    <div class="found-box" id="result-box" style="margin-top:12px;display:none;">
      <span class="found-icon" id="result-icon">&#x2705;</span>
      <span class="found-text" id="result-text"></span>
    </div>
  `;
}

function setupPanel2(panel) {
  TREE_LABEL = '[2,1,3]';
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">树结构</div>
      <div class="tree-container" id="tree-vis" style="display:flex;justify-content:center;padding:16px;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
          <div class="tree-node" id="tn-2">2</div>
          <div style="display:flex;gap:60px;">
            <div class="tree-node" id="tn-1">1</div>
            <div class="tree-node" id="tn-3">3</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="section-title">当前范围约束</div>
      <div id="range-vis" style="font-size:1.1em;min-height:36px;display:flex;align-items:center;gap:8px;padding:8px;"></div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="section-title">验证记录</div>
      <div id="checks-vis" style="display:flex;flex-direction:column;gap:4px;min-height:36px;"></div>
    </div>
    <div class="found-box" id="result-box" style="margin-top:12px;display:none;">
      <span class="found-icon" id="result-icon">&#x2705;</span>
      <span class="found-text" id="result-text"></span>
    </div>
  `;
}

function render(s) {
  // Collect all node values from tree data
  const tree = s.tree || [5,1,4,null,null,3,6];
  const nodeVals = tree.filter(v => v !== null);

  nodeVals.forEach(val => {
    const el = document.getElementById(`tn-${val}`);
    if (!el) return;
    el.classList.remove('is-current', 'is-visited', 'is-target');
    if (s.visited.includes(val)) el.classList.add('is-visited');
    if (s.current === val) el.classList.add('is-current');
  });

  // Mark the violating node
  if (s.valid === false && s.current !== null) {
    const el = document.getElementById(`tn-${s.current}`);
    if (el) { el.classList.remove('is-current'); el.classList.add('is-target'); }
  }

  const rangeVis = document.getElementById('range-vis');
  if (rangeVis) {
    if (s.current !== null && s.low !== undefined) {
      rangeVis.innerHTML = `<span>\u8282\u70b9 <strong>${s.current}</strong> \u7684\u6709\u6548\u8303\u56f4: <code>(${s.low}, ${s.high})</code></span>`;
    } else {
      rangeVis.innerHTML = '<span style="opacity:0.5;">\u2014</span>';
    }
  }

  const checksVis = document.getElementById('checks-vis');
  if (checksVis) {
    checksVis.innerHTML = s.checks.length === 0
      ? '<span style="opacity:0.5;">\u65e0</span>'
      : s.checks.map(c => {
        const icon = c.pass ? '\u2713' : '\u2717';
        const color = c.pass ? 'var(--color-green-400,#4ade80)' : 'var(--color-red-400,#f87171)';
        return `<div style="display:flex;gap:8px;align-items:center;"><span style="color:${color};font-weight:bold;">${icon}</span><span>\u8282\u70b9${c.node}: \u8303\u56f4${c.range}</span></div>`;
      }).join('');
  }

  const rb = document.getElementById('result-box');
  const ri = document.getElementById('result-icon');
  const rt = document.getElementById('result-text');
  if (rb && ri && rt && s.phase === 'done') {
    rb.style.display = '';
    if (s.valid) { ri.innerHTML = '&#x2705;'; rt.textContent = '\u6709\u6548BST \u2713'; }
    else { ri.innerHTML = '&#x274C;'; rt.textContent = '\u65e0\u6548BST \u2014 \u8282\u70b94\u8fdd\u53cd\u7ea6\u675f (4 < 5 \u4f46\u5728\u53f3\u5b50\u6811)'; }
  } else if (rb) { rb.style.display = 'none'; }
}

export default {
  title: '98. Validate Binary Search Tree \u2014 执行可视化',
  problemDesc: `
    <p>给你一个二叉树的根节点 <code>root</code>，判断其是否是一个有效的二叉搜索树。</p>
    <div class="example">输入：root = [5,1,4,null,null,3,6]
输出：false
解释：根节点的值是 5，但右子节点 4 < 5</div>
    <p>提示：节点的左子树只包含小于当前节点的数，右子树只包含大于当前节点的数。</p>
  `,
  subtitle: `root = ${TREE_LABEL}`,
  code,
  lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'root = [5,1,4,null,null,3,6]', steps: steps1, subtitle: 'root = [5,1,4,null,null,3,6]' },
    {
      name: 'root = [2,1,3]', steps: steps2, subtitle: 'root = [2,1,3]',
      setup: setupPanel2,
    },
  ],

  setup: setupPanel,
  render,
};
