// LC 101 - Symmetric Tree

let TREE_LABEL = '[1,2,2,3,4,4,3]';

const code = [
  'class Solution:',
  '    def isSymmetric(self, root):',
  '        def isMirror(left, right):',
  '            if not left and not right:',
  '                return True',
  '            if not left or not right:',
  '                return False',
  '            return (left.val == right.val and',
  '                    isMirror(left.left, right.right) and',
  '                    isMirror(left.right, right.left))',
  '        return isMirror(root.left, root.right)',
];

const lineMap = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10 };

// ── Test Case 1: root = [1,2,2,3,4,4,3] (symmetric) ──
const steps1 = [
  { lineNum: 10, phase: 'call', description: '调用 isMirror(root.left=2, root.right=2)', current: [2, 2], pair: '2 vs 2', comparing: [], result: null, visited: [], tree: [1,2,2,3,4,4,3] },
  { lineNum: 7, phase: 'compare', description: '比较节点值: 2 == 2 ✓', current: [2, 2], pair: '2 vs 2', comparing: [[2, 2]], result: null, visited: [], tree: [1,2,2,3,4,4,3] },
  { lineNum: 8, phase: 'recurse', description: '递归调用 isMirror(2.left=3, 2.right=3)', current: [3, 3], pair: '3 vs 3', comparing: [[2, 2]], result: null, visited: [2], tree: [1,2,2,3,4,4,3] },
  { lineNum: 7, phase: 'compare', description: '比较节点值: 3 == 3 ✓', current: [3, 3], pair: '3 vs 3', comparing: [[2, 2], [3, 3]], result: null, visited: [2], tree: [1,2,2,3,4,4,3] },
  { lineNum: 8, phase: 'recurse', description: '递归调用 isMirror(3.left=null, 3.right=null)', current: [null, null], pair: 'null vs null', comparing: [[2, 2], [3, 3]], result: null, visited: [2, 3], tree: [1,2,2,3,4,4,3] },
  { lineNum: 4, phase: 'base', description: '两个都为空，返回 True', current: [null, null], pair: 'null vs null', comparing: [[2, 2], [3, 3]], result: null, visited: [2, 3], tree: [1,2,2,3,4,4,3] },
  { lineNum: 9, phase: 'recurse', description: '递归调用 isMirror(3.right=null, 3.left=null)', current: [null, null], pair: 'null vs null', comparing: [[2, 2], [3, 3]], result: null, visited: [2, 3], tree: [1,2,2,3,4,4,3] },
  { lineNum: 4, phase: 'base', description: '两个都为空，返回 True', current: [null, null], pair: 'null vs null', comparing: [[2, 2], [3, 3]], result: null, visited: [2, 3], tree: [1,2,2,3,4,4,3] },
  { lineNum: 7, phase: 'return', description: '节点3镜像匹配成功，返回 True', current: [3, 3], pair: '3 vs 3', comparing: [[2, 2]], result: null, visited: [2, 3], tree: [1,2,2,3,4,4,3] },
  { lineNum: 9, phase: 'recurse', description: '递归调用 isMirror(2.right=4, 2.left=4)', current: [4, 4], pair: '4 vs 4', comparing: [[2, 2]], result: null, visited: [2, 3], tree: [1,2,2,3,4,4,3] },
  { lineNum: 7, phase: 'compare', description: '比较节点值: 4 == 4 ✓', current: [4, 4], pair: '4 vs 4', comparing: [[2, 2], [4, 4]], result: null, visited: [2, 3], tree: [1,2,2,3,4,4,3] },
  { lineNum: 8, phase: 'recurse', description: '递归调用 isMirror(4.left=null, 4.right=null)', current: [null, null], pair: 'null vs null', comparing: [[2, 2], [4, 4]], result: null, visited: [2, 3, 4], tree: [1,2,2,3,4,4,3] },
  { lineNum: 4, phase: 'base', description: '两个都为空，返回 True', current: [null, null], pair: 'null vs null', comparing: [[2, 2], [4, 4]], result: null, visited: [2, 3, 4], tree: [1,2,2,3,4,4,3] },
  { lineNum: 9, phase: 'recurse', description: '递归调用 isMirror(4.right=null, 4.left=null)', current: [null, null], pair: 'null vs null', comparing: [[2, 2], [4, 4]], result: null, visited: [2, 3, 4], tree: [1,2,2,3,4,4,3] },
  { lineNum: 4, phase: 'base', description: '两个都为空，返回 True', current: [null, null], pair: 'null vs null', comparing: [[2, 2], [4, 4]], result: null, visited: [2, 3, 4], tree: [1,2,2,3,4,4,3] },
  { lineNum: 7, phase: 'return', description: '节点4镜像匹配成功，返回 True', current: [4, 4], pair: '4 vs 4', comparing: [[2, 2]], result: null, visited: [2, 3, 4], tree: [1,2,2,3,4,4,3] },
  { lineNum: 7, phase: 'return', description: '节点2镜像匹配成功，返回 True', current: [2, 2], pair: '2 vs 2', comparing: [], result: null, visited: [2, 3, 4], tree: [1,2,2,3,4,4,3] },
  { lineNum: 10, phase: 'done', description: '树是对称的！返回 True', current: null, pair: '', comparing: [], result: true, visited: [1, 2, 3, 4], tree: [1,2,2,3,4,4,3] },
];

// ── Test Case 2: root = [1,2,2,null,3,null,3] (not symmetric) ──
const steps2 = [
  { lineNum: 10, phase: 'call', description: '调用 isMirror(root.left=2, root.right=2)', current: [2, 2], pair: '2 vs 2', comparing: [], result: null, visited: [], tree: [1,2,2,null,3,null,3] },
  { lineNum: 7, phase: 'compare', description: '比较节点值: 2 == 2 ✓', current: [2, 2], pair: '2 vs 2', comparing: [[2, 2]], result: null, visited: [], tree: [1,2,2,null,3,null,3] },
  { lineNum: 8, phase: 'recurse', description: '递归调用 isMirror(2.left=null, 2.right=3)', current: [null, 3], pair: 'null vs 3', comparing: [[2, 2]], result: null, visited: [2], tree: [1,2,2,null,3,null,3] },
  { lineNum: 6, phase: 'base', description: '一个为空一个不为空，返回 False！', current: [null, 3], pair: 'null vs 3', comparing: [[2, 2]], result: false, visited: [2], tree: [1,2,2,null,3,null,3] },
  { lineNum: 10, phase: 'done', description: '树不是对称的！返回 False（null vs 3 不匹配）', current: null, pair: '', comparing: [], result: false, visited: [1, 2], tree: [1,2,2,null,3,null,3] },
];

const phaseLabels = { call: '调用', compare: '比较', recurse: '递归', base: '基准情况', return: '返回', done: '完成' };

/*
  Tree 1:     1            Tree 2:     1
            /   \                     / \
           2     2                   2   2
          / \   / \                   \   \
         3   4 4   3                   3   3
*/

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">树结构（镜像对比）</div>
      <div class="tree-container" id="tree-vis" style="display:flex;justify-content:center;padding:16px;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
          <div class="tree-node" id="tn-root">1</div>
          <div style="display:flex;gap:80px;">
            <div class="tree-node" id="tn-l">2</div>
            <div class="tree-node" id="tn-r">2</div>
          </div>
          <div style="display:flex;gap:20px;">
            <div class="tree-node" id="tn-ll">3</div>
            <div class="tree-node" id="tn-lr">4</div>
            <div class="tree-node" id="tn-rl">4</div>
            <div class="tree-node" id="tn-rr">3</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="section-title">当前比较对</div>
      <div id="pair-vis" style="font-size:1.1em;min-height:36px;display:flex;align-items:center;gap:8px;"></div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="section-title">已验证的镜像对</div>
      <div id="comparing-vis" style="display:flex;gap:6px;flex-wrap:wrap;min-height:36px;"></div>
    </div>
    <div class="found-box" id="result-box" style="margin-top:12px;display:none;">
      <span class="found-icon">&#x2705;</span>
      <span class="found-text" id="result-text"></span>
    </div>
  `;
}

function setupPanel2(panel) {
  TREE_LABEL = '[1,2,2,null,3,null,3]';
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">树结构（镜像对比）</div>
      <div class="tree-container" id="tree-vis" style="display:flex;justify-content:center;padding:16px;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
          <div class="tree-node" id="tn-root">1</div>
          <div style="display:flex;gap:80px;">
            <div class="tree-node" id="tn-l">2</div>
            <div class="tree-node" id="tn-r">2</div>
          </div>
          <div style="display:flex;gap:20px;">
            <div class="tree-node null-node" id="tn-ll">\u2014</div>
            <div class="tree-node" id="tn-lr">3</div>
            <div class="tree-node null-node" id="tn-rl">\u2014</div>
            <div class="tree-node" id="tn-rr">3</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="section-title">当前比较对</div>
      <div id="pair-vis" style="font-size:1.1em;min-height:36px;display:flex;align-items:center;gap:8px;"></div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="section-title">已验证的镜像对</div>
      <div id="comparing-vis" style="display:flex;gap:6px;flex-wrap:wrap;min-height:36px;"></div>
    </div>
    <div class="found-box" id="result-box" style="margin-top:12px;display:none;">
      <span class="found-icon">&#x2705;</span>
      <span class="found-text" id="result-text"></span>
    </div>
  `;
}

function render(s) {
  // Highlight current pair
  const allIds = ['tn-root', 'tn-l', 'tn-r', 'tn-ll', 'tn-lr', 'tn-rl', 'tn-rr'];
  allIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('is-current', 'is-visited');
  });

  if (s.visited.includes(1)) { const e = document.getElementById('tn-root'); if (e) e.classList.add('is-visited'); }
  if (s.visited.includes(2)) { ['tn-l', 'tn-r'].forEach(id => { const e = document.getElementById(id); if (e) e.classList.add('is-visited'); }); }
  if (s.visited.includes(3)) { ['tn-ll', 'tn-rr'].forEach(id => { const e = document.getElementById(id); if (e) e.classList.add('is-visited'); }); }
  if (s.visited.includes(4)) { ['tn-lr', 'tn-rl'].forEach(id => { const e = document.getElementById(id); if (e) e.classList.add('is-visited'); }); }

  if (s.current && s.current[0] !== null) {
    // Highlight current comparison nodes
    const val = s.current[0];
    if (val === 2) { ['tn-l', 'tn-r'].forEach(id => { const e = document.getElementById(id); if (e) e.classList.add('is-current'); }); }
    if (val === 3) { ['tn-ll', 'tn-rr'].forEach(id => { const e = document.getElementById(id); if (e) e.classList.add('is-current'); }); }
    if (val === 4) { ['tn-lr', 'tn-rl'].forEach(id => { const e = document.getElementById(id); if (e) e.classList.add('is-current'); }); }
  }

  const pairVis = document.getElementById('pair-vis');
  if (pairVis) {
    pairVis.innerHTML = s.pair ? `<span style="font-weight:600;">${s.pair}</span>` : '<span style="opacity:0.5;">\u2014</span>';
  }

  const compVis = document.getElementById('comparing-vis');
  if (compVis) {
    compVis.innerHTML = s.comparing.length === 0
      ? '<span style="opacity:0.5;">无</span>'
      : s.comparing.map(([a, b]) => `<div class="stack-item">${a} \u2194 ${b} \u2713</div>`).join('');
  }

  const rb = document.getElementById('result-box');
  const rt = document.getElementById('result-text');
  if (rb && rt) {
    if (s.result !== null) { rb.style.display = ''; rt.textContent = s.result ? '对称树 \u2713' : '非对称树 \u2717'; }
    else { rb.style.display = 'none'; }
  }
}

export default {
  title: '101. Symmetric Tree \u2014 执行可视化',
  problemDesc: `
    <p>给你一个二叉树的根节点 <code>root</code>，检查它是否轴对称。</p>
    <div class="example">输入：root = [1,2,2,3,4,4,3]
输出：true</div>
    <p>提示：如果一棵树的左子树与右子树镜像对称，那么这棵树是对称的。</p>
  `,
  subtitle: `root = ${TREE_LABEL}`,
  code,
  lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'root = [1,2,2,3,4,4,3]', steps: steps1, subtitle: 'root = [1,2,2,3,4,4,3]' },
    {
      name: 'root = [1,2,2,null,3,null,3]', steps: steps2, subtitle: 'root = [1,2,2,null,3,null,3]',
      setup: setupPanel2,
    },
  ],

  setup: setupPanel,
  render,
};
