// LC 94 - Binary Tree Inorder Traversal
// Input: root = [1,null,2,3], Output: [1,3,2]

const code = [
  'class Solution:',
  '    def inorderTraversal(self, root):',
  '        result, stack = [], []',
  '        current = root',
  '        while current or stack:',
  '            while current:',
  '                stack.append(current)',
  '                current = current.left',
  '            current = stack.pop()',
  '            result.append(current.val)',
  '            current = current.right',
  '        return result',
];

const lineMap = { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 11 };

const steps1 = [
  { lineNum: 1, phase: 'init', description: '初始化结果数组和栈为空', result: [], stack: [], current: 1, visited: [] },
  { lineNum: 2, phase: 'init', description: '设置 current = root（节点1）', result: [], stack: [], current: 1, visited: [] },
  { lineNum: 3, phase: 'traverse', description: '外层循环：current=1 存在，进入内层循环', result: [], stack: [], current: 1, visited: [] },
  { lineNum: 4, phase: 'traverse', description: '内层循环：将节点1压入栈', result: [], stack: [1], current: 1, visited: [] },
  { lineNum: 5, phase: 'traverse', description: 'current = 节点1.left = null，内层循环结束', result: [], stack: [1], current: null, visited: [] },
  { lineNum: 6, phase: 'visit', description: '从栈弹出节点1', result: [], stack: [], current: 1, visited: [] },
  { lineNum: 7, phase: 'visit', description: '将节点1的值加入结果', result: [1], stack: [], current: 1, visited: [1] },
  { lineNum: 8, phase: 'traverse', description: 'current = 节点1.right = 节点2', result: [1], stack: [], current: 2, visited: [1] },
  { lineNum: 4, phase: 'traverse', description: '内层循环：将节点2压入栈', result: [1], stack: [2], current: 2, visited: [1] },
  { lineNum: 5, phase: 'traverse', description: 'current = 节点2.left = 节点3', result: [1], stack: [2], current: 3, visited: [1] },
  { lineNum: 4, phase: 'traverse', description: '内层循环：将节点3压入栈', result: [1], stack: [2, 3], current: 3, visited: [1] },
  { lineNum: 5, phase: 'traverse', description: 'current = 节点3.left = null，内层循环结束', result: [1], stack: [2, 3], current: null, visited: [1] },
  { lineNum: 6, phase: 'visit', description: '从栈弹出节点3', result: [1], stack: [2], current: 3, visited: [1] },
  { lineNum: 7, phase: 'visit', description: '将节点3的值加入结果', result: [1, 3], stack: [2], current: 3, visited: [1, 3] },
  { lineNum: 8, phase: 'traverse', description: 'current = 节点3.right = null', result: [1, 3], stack: [2], current: null, visited: [1, 3] },
  { lineNum: 6, phase: 'visit', description: '从栈弹出节点2', result: [1, 3], stack: [], current: 2, visited: [1, 3] },
  { lineNum: 7, phase: 'visit', description: '将节点2的值加入结果', result: [1, 3, 2], stack: [], current: 2, visited: [1, 3, 2] },
  { lineNum: 8, phase: 'traverse', description: 'current = 节点2.right = null', result: [1, 3, 2], stack: [], current: null, visited: [1, 3, 2] },
  { lineNum: 9, phase: 'done', description: 'current 为空且栈为空，循环结束', result: [1, 3, 2], stack: [], current: null, visited: [1, 3, 2] },
  { lineNum: 10, phase: 'done', description: '返回结果 [1, 3, 2]', result: [1, 3, 2], stack: [], current: null, visited: [1, 3, 2] },
];

// Test case 2: root = [1,null,2,3] - same structure but different: [1,2,3] simple
const steps2 = [
  { lineNum: 1, phase: 'init', description: '初始化结果数组和栈为空', result: [], stack: [], current: 1, visited: [] },
  { lineNum: 2, phase: 'init', description: '设置 current = root（节点1）', result: [], stack: [], current: 1, visited: [] },
  { lineNum: 4, phase: 'traverse', description: '内层循环：将节点1压入栈', result: [], stack: [1], current: 1, visited: [] },
  { lineNum: 5, phase: 'traverse', description: 'current = 节点1.left = null（无左子树），内层循环结束', result: [], stack: [1], current: null, visited: [] },
  { lineNum: 6, phase: 'visit', description: '从栈弹出节点1', result: [], stack: [], current: 1, visited: [] },
  { lineNum: 7, phase: 'visit', description: '将节点1的值加入结果', result: [1], stack: [], current: 1, visited: [1] },
  { lineNum: 8, phase: 'traverse', description: 'current = 节点1.right = 节点2', result: [1], stack: [], current: 2, visited: [1] },
  { lineNum: 4, phase: 'traverse', description: '内层循环：将节点2压入栈', result: [1], stack: [2], current: 2, visited: [1] },
  { lineNum: 5, phase: 'traverse', description: 'current = 节点2.left = 节点3', result: [1], stack: [2], current: 3, visited: [1] },
  { lineNum: 4, phase: 'traverse', description: '内层循环：将节点3压入栈', result: [1], stack: [2, 3], current: 3, visited: [1] },
  { lineNum: 5, phase: 'traverse', description: 'current = 节点3.left = null，内层循环结束', result: [1], stack: [2, 3], current: null, visited: [1] },
  { lineNum: 6, phase: 'visit', description: '从栈弹出节点3', result: [1], stack: [2], current: 3, visited: [1] },
  { lineNum: 7, phase: 'visit', description: '将节点3的值加入结果', result: [1, 3], stack: [2], current: 3, visited: [1, 3] },
  { lineNum: 8, phase: 'traverse', description: 'current = 节点3.right = null', result: [1, 3], stack: [2], current: null, visited: [1, 3] },
  { lineNum: 6, phase: 'visit', description: '从栈弹出节点2', result: [1, 3], stack: [], current: 2, visited: [1, 3] },
  { lineNum: 7, phase: 'visit', description: '将节点2的值加入结果', result: [1, 3, 2], stack: [], current: 2, visited: [1, 3, 2] },
  { lineNum: 10, phase: 'done', description: '返回结果 [1, 3, 2]', result: [1, 3, 2], stack: [], current: null, visited: [1, 3, 2] },
];

const phaseLabels = { init: '初始化', traverse: '遍历', visit: '访问', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">树结构</div>
      <div class="tree-container" id="tree-vis" style="display:flex;justify-content:center;padding:16px;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <div class="tree-node" id="tn-1" data-val="1">1</div>
          <div style="display:flex;gap:60px;position:relative;">
            <div class="tree-node null-node" id="tn-null-l">\u2205</div>
            <div class="tree-node" id="tn-2" data-val="2">2</div>
          </div>
          <div style="display:flex;gap:60px;">
            <div style="width:48px;"></div>
            <div class="tree-node" id="tn-3" data-val="3">3</div>
            <div class="tree-node null-node" id="tn-null-r2">\u2205</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="section-title">栈</div>
      <div class="stack-container" id="stack-vis" style="min-height:36px;display:flex;gap:4px;flex-wrap:wrap;"></div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="section-title">结果数组</div>
      <div id="result-vis" style="display:flex;gap:4px;min-height:36px;flex-wrap:wrap;"></div>
    </div>
  `;
}

function render(s) {
  const nodes = { 1: 'tn-1', 2: 'tn-2', 3: 'tn-3' };
  Object.entries(nodes).forEach(([val, id]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('is-current', 'is-visited');
    if (s.visited.includes(Number(val))) el.classList.add('is-visited');
    if (s.current === Number(val)) el.classList.add('is-current');
  });

  const stackVis = document.getElementById('stack-vis');
  if (stackVis) {
    stackVis.innerHTML = s.stack.length === 0
      ? '<span style="opacity:0.5;">空</span>'
      : s.stack.map(v => `<div class="stack-item">${v}</div>`).join('');
  }

  const resultVis = document.getElementById('result-vis');
  if (resultVis) {
    resultVis.innerHTML = s.result.length === 0
      ? '<span style="opacity:0.5;">空</span>'
      : s.result.map((v, i) => `<div class="arr-cell"><div class="arr-val">${v}</div><div class="arr-idx">${i}</div></div>`).join('');
  }
}

export default {
  title: '94. Binary Tree Inorder Traversal — 执行可视化',
  problemDesc: `
    <p>给定一个二叉树的根节点 <code>root</code>，返回它的中序遍历结果。</p>
    <div class="example">输入：root = [1,null,2,3]
输出：[1,3,2]</div>
    <p>提示：递归很简单，你可以通过迭代算法（使用栈）完成吗？</p>
  `,
  subtitle: 'root = [1, null, 2, 3]',
  code,
  lineMap,
  steps: steps1,
  phaseLabels,
  setup: setupPanel,
  render,

  testCases: [
    { name: 'root=[1,null,2,3]', steps: steps1, subtitle: 'root = [1,null,2,3]' },
    { name: 'root=[1,null,2,3]，同结构验证', steps: steps2, subtitle: 'root = [1,null,2,3]' },
  ],
};
