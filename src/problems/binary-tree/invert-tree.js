// LC 226 - Invert Binary Tree
// Input: root = [4,2,7,1,3,6,9]

const code = [
  'class Solution:',
  '    def invertTree(self, root):',
  '        if not root:',
  '            return None',
  '        root.left, root.right = root.right, root.left',
  '        self.invertTree(root.left)',
  '        self.invertTree(root.right)',
  '        return root',
];

const lineMap = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7 };

const steps1 = [
  { lineNum: 1, phase: 'call', description: '调用 invertTree(4)，从根节点开始', current: 4, visited: [], tree: { 4: [2, 7], 2: [1, 3], 7: [6, 9] }, swapped: [] },
  { lineNum: 4, phase: 'swap', description: '交换节点4的左右子节点：2 <-> 7', current: 4, visited: [], tree: { 4: [7, 2], 2: [1, 3], 7: [6, 9] }, swapped: [4] },
  { lineNum: 5, phase: 'recurse', description: '递归调用 invertTree(7)（新的左子节点）', current: 7, visited: [4], tree: { 4: [7, 2], 2: [1, 3], 7: [6, 9] }, swapped: [4] },
  { lineNum: 4, phase: 'swap', description: '交换节点7的左右子节点：6 <-> 9', current: 7, visited: [4], tree: { 4: [7, 2], 2: [1, 3], 7: [9, 6] }, swapped: [4, 7] },
  { lineNum: 5, phase: 'recurse', description: '递归调用 invertTree(9)（节点7的新左子节点）', current: 9, visited: [4, 7], tree: { 4: [7, 2], 2: [1, 3], 7: [9, 6] }, swapped: [4, 7] },
  { lineNum: 2, phase: 'base', description: '节点9是叶子节点，无需交换，返回', current: 9, visited: [4, 7, 9], tree: { 4: [7, 2], 2: [1, 3], 7: [9, 6] }, swapped: [4, 7] },
  { lineNum: 6, phase: 'recurse', description: '递归调用 invertTree(6)（节点7的新右子节点）', current: 6, visited: [4, 7, 9], tree: { 4: [7, 2], 2: [1, 3], 7: [9, 6] }, swapped: [4, 7] },
  { lineNum: 2, phase: 'base', description: '节点6是叶子节点，无需交换，返回', current: 6, visited: [4, 7, 9, 6], tree: { 4: [7, 2], 2: [1, 3], 7: [9, 6] }, swapped: [4, 7] },
  { lineNum: 7, phase: 'return', description: '节点7翻转完成，返回', current: 7, visited: [4, 7, 9, 6], tree: { 4: [7, 2], 2: [1, 3], 7: [9, 6] }, swapped: [4, 7] },
  { lineNum: 6, phase: 'recurse', description: '递归调用 invertTree(2)（节点4的新右子节点）', current: 2, visited: [4, 7, 9, 6], tree: { 4: [7, 2], 2: [1, 3], 7: [9, 6] }, swapped: [4, 7] },
  { lineNum: 4, phase: 'swap', description: '交换节点2的左右子节点：1 <-> 3', current: 2, visited: [4, 7, 9, 6], tree: { 4: [7, 2], 2: [3, 1], 7: [9, 6] }, swapped: [4, 7, 2] },
  { lineNum: 5, phase: 'recurse', description: '递归调用 invertTree(3)（节点2的新左子节点）', current: 3, visited: [4, 7, 9, 6, 2], tree: { 4: [7, 2], 2: [3, 1], 7: [9, 6] }, swapped: [4, 7, 2] },
  { lineNum: 2, phase: 'base', description: '节点3是叶子节点，返回', current: 3, visited: [4, 7, 9, 6, 2, 3], tree: { 4: [7, 2], 2: [3, 1], 7: [9, 6] }, swapped: [4, 7, 2] },
  { lineNum: 6, phase: 'recurse', description: '递归调用 invertTree(1)（节点2的新右子节点）', current: 1, visited: [4, 7, 9, 6, 2, 3], tree: { 4: [7, 2], 2: [3, 1], 7: [9, 6] }, swapped: [4, 7, 2] },
  { lineNum: 2, phase: 'base', description: '节点1是叶子节点，返回', current: 1, visited: [4, 7, 9, 6, 2, 3, 1], tree: { 4: [7, 2], 2: [3, 1], 7: [9, 6] }, swapped: [4, 7, 2] },
  { lineNum: 7, phase: 'return', description: '节点2翻转完成，返回', current: 2, visited: [4, 7, 9, 6, 2, 3, 1], tree: { 4: [7, 2], 2: [3, 1], 7: [9, 6] }, swapped: [4, 7, 2] },
  { lineNum: 7, phase: 'done', description: '整棵树翻转完成！结果: [4,7,2,9,6,3,1]', current: 4, visited: [4, 7, 9, 6, 2, 3, 1], tree: { 4: [7, 2], 2: [3, 1], 7: [9, 6] }, swapped: [4, 7, 2] },
];

// Test case 2: root = [2,1,3]
const steps2 = [
  { lineNum: 1, phase: 'call', description: '调用 invertTree(2)，从根节点开始', current: 2, visited: [], tree: { 2: [1, 3] }, swapped: [] },
  { lineNum: 4, phase: 'swap', description: '交换节点2的左右子节点：1 <-> 3', current: 2, visited: [], tree: { 2: [3, 1] }, swapped: [2] },
  { lineNum: 5, phase: 'recurse', description: '递归调用 invertTree(3)（新的左子节点）', current: 3, visited: [2], tree: { 2: [3, 1] }, swapped: [2] },
  { lineNum: 2, phase: 'base', description: '节点3是叶子节点，返回', current: 3, visited: [2, 3], tree: { 2: [3, 1] }, swapped: [2] },
  { lineNum: 6, phase: 'recurse', description: '递归调用 invertTree(1)（新的右子节点）', current: 1, visited: [2, 3], tree: { 2: [3, 1] }, swapped: [2] },
  { lineNum: 2, phase: 'base', description: '节点1是叶子节点，返回', current: 1, visited: [2, 3, 1], tree: { 2: [3, 1] }, swapped: [2] },
  { lineNum: 7, phase: 'return', description: '节点2翻转完成，返回', current: 2, visited: [2, 3, 1], tree: { 2: [3, 1] }, swapped: [2] },
  { lineNum: 7, phase: 'done', description: '翻转完成！结果: [2,3,1]', current: 2, visited: [2, 3, 1], tree: { 2: [3, 1] }, swapped: [2] },
];

const phaseLabels = { call: '调用', swap: '交换', recurse: '递归', base: '基准情况', return: '返回', done: '完成' };

let treeMode = 'full';

function setupPanel(panel) {
  if (treeMode === 'small') {
    panel.innerHTML = `
      <div class="card">
        <div class="section-title">树结构（翻转过程）</div>
        <div class="tree-container" id="tree-vis" style="display:flex;justify-content:center;padding:16px;">
          <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
            <div class="tree-node" id="tn-root">2</div>
            <div style="display:flex;gap:60px;">
              <div class="tree-node" id="tn-left1">1</div>
              <div class="tree-node" id="tn-right1">3</div>
            </div>
          </div>
        </div>
      </div>
      <div class="card" style="margin-top:12px;">
        <div class="section-title">已交换的节点</div>
        <div id="swapped-vis" style="display:flex;gap:4px;flex-wrap:wrap;min-height:36px;"></div>
      </div>
    `;
  } else {
    panel.innerHTML = `
      <div class="card">
        <div class="section-title">树结构（翻转过程）</div>
        <div class="tree-container" id="tree-vis" style="display:flex;justify-content:center;padding:16px;">
          <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
            <div class="tree-node" id="tn-4">4</div>
            <div style="display:flex;gap:60px;">
              <div class="tree-node" id="tn-left1">2</div>
              <div class="tree-node" id="tn-right1">7</div>
            </div>
            <div style="display:flex;gap:20px;">
              <div class="tree-node" id="tn-ll">1</div>
              <div class="tree-node" id="tn-lr">3</div>
              <div class="tree-node" id="tn-rl">6</div>
              <div class="tree-node" id="tn-rr">9</div>
            </div>
          </div>
        </div>
      </div>
      <div class="card" style="margin-top:12px;">
        <div class="section-title">已交换的节点</div>
        <div id="swapped-vis" style="display:flex;gap:4px;flex-wrap:wrap;min-height:36px;"></div>
      </div>
    `;
  }
}

function render(s) {
  if (treeMode === 'small') {
    const t = s.tree;
    const rootChildren = t[2] || [1, 3];
    const left1El = document.getElementById('tn-left1');
    const right1El = document.getElementById('tn-right1');
    if (left1El) left1El.textContent = rootChildren[0];
    if (right1El) right1El.textContent = rootChildren[1];

    const rootEl = document.getElementById('tn-root');
    const allNodes = [rootEl, left1El, right1El];
    allNodes.forEach(el => { if (el) el.classList.remove('is-current', 'is-visited'); });
    if (rootEl && s.current === 2) rootEl.classList.add('is-current');
    if (rootEl && s.visited.includes(2)) rootEl.classList.add('is-visited');
    if (left1El && s.current === rootChildren[0]) left1El.classList.add('is-current');
    if (right1El && s.current === rootChildren[1]) right1El.classList.add('is-current');
  } else {
    const t = s.tree;
    const root4 = t[4] || [2, 7];
    const left1El = document.getElementById('tn-left1');
    const right1El = document.getElementById('tn-right1');
    if (left1El) left1El.textContent = root4[0];
    if (right1El) right1El.textContent = root4[1];

    const node2children = t[2] || [1, 3];
    const node7children = t[7] || [6, 9];

    const llEl = document.getElementById('tn-ll');
    const lrEl = document.getElementById('tn-lr');
    const rlEl = document.getElementById('tn-rl');
    const rrEl = document.getElementById('tn-rr');

    if (root4[0] === 7) {
      if (llEl) llEl.textContent = node7children[0];
      if (lrEl) lrEl.textContent = node7children[1];
      if (rlEl) rlEl.textContent = node2children[0];
      if (rrEl) rrEl.textContent = node2children[1];
    } else {
      if (llEl) llEl.textContent = node2children[0];
      if (lrEl) lrEl.textContent = node2children[1];
      if (rlEl) rlEl.textContent = node7children[0];
      if (rrEl) rrEl.textContent = node7children[1];
    }

    const allNodes = ['tn-4', 'tn-left1', 'tn-right1', 'tn-ll', 'tn-lr', 'tn-rl', 'tn-rr'];
    allNodes.forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.classList.remove('is-current', 'is-visited'); }
    });

    const tn4 = document.getElementById('tn-4');
    if (tn4) {
      if (s.current === 4) tn4.classList.add('is-current');
      if (s.visited.includes(4)) tn4.classList.add('is-visited');
    }

    const valToEl = {
      [root4[0]]: 'tn-left1', [root4[1]]: 'tn-right1',
    };
    Object.entries(valToEl).forEach(([val, id]) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (s.current === Number(val)) el.classList.add('is-current');
      if (s.visited.includes(Number(val))) el.classList.add('is-visited');
    });
  }

  const swappedVis = document.getElementById('swapped-vis');
  if (swappedVis) {
    swappedVis.innerHTML = s.swapped.length === 0
      ? '<span style="opacity:0.5;">无</span>'
      : s.swapped.map(v => `<div class="stack-item" style="background:var(--color-amber-100,#fef3c7);color:var(--color-amber-800,#92400e);">节点${v}</div>`).join('');
  }
}

export default {
  title: '226. Invert Binary Tree — 执行可视化',
  problemDesc: `
    <p>给你一棵二叉树的根节点 <code>root</code>，翻转这棵二叉树，并返回其根节点。</p>
    <div class="example">输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]</div>
    <p>提示：递归地交换每个节点的左右子树。</p>
  `,
  subtitle: 'root = [4, 2, 7, 1, 3, 6, 9]',
  code,
  lineMap,
  steps: steps1,
  phaseLabels,
  setup: setupPanel,
  render,

  testCases: [
    { name: 'root=[4,2,7,1,3,6,9]', steps: steps1, subtitle: 'root = [4,2,7,1,3,6,9]' },
    { name: 'root=[2,1,3]，最小情况', steps: steps2, subtitle: 'root = [2,1,3]', setup(panel) { treeMode = 'small'; setupPanel(panel); } },
  ],
};
