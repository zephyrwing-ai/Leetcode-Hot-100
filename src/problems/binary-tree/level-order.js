// LC 102 - Binary Tree Level Order Traversal

let TREE_LABEL = '[3,9,20,null,null,15,7]';

const code = [
  'class Solution:',
  '    def levelOrder(self, root):',
  '        if not root:',
  '            return []',
  '        result = []',
  '        queue = [root]',
  '        while queue:',
  '            level_size = len(queue)',
  '            level = []',
  '            for i in range(level_size):',
  '                node = queue.pop(0)',
  '                level.append(node.val)',
  '                if node.left:',
  '                    queue.append(node.left)',
  '                if node.right:',
  '                    queue.append(node.right)',
  '            result.append(level)',
  '        return result',
];

const lineMap = { 1: 2, 2: 4, 3: 5, 4: 6, 5: 7, 6: 8, 7: 9, 8: 10, 9: 11, 10: 12, 11: 13, 12: 14, 13: 15, 14: 16, 15: 17 };

// ── Test Case 1: root = [3,9,20,null,null,15,7] ──
const steps1 = [
  { lineNum: 2, phase: 'init', description: '初始化 result=[], queue=[3]', current: null, queue: [3], level: [], result: [], levelNum: 0, visited: [], tree: [3,9,20,null,null,15,7] },
  { lineNum: 4, phase: 'level', description: '第1层开始，queue长度=1', current: null, queue: [3], level: [], result: [], levelNum: 1, visited: [], tree: [3,9,20,null,null,15,7] },
  { lineNum: 7, phase: 'process', description: '从队列取出节点3', current: 3, queue: [], level: [], result: [], levelNum: 1, visited: [], tree: [3,9,20,null,null,15,7] },
  { lineNum: 8, phase: 'process', description: '将3加入当前层', current: 3, queue: [], level: [3], result: [], levelNum: 1, visited: [3], tree: [3,9,20,null,null,15,7] },
  { lineNum: 10, phase: 'enqueue', description: '节点3的左子节点9入队', current: 3, queue: [9], level: [3], result: [], levelNum: 1, visited: [3], tree: [3,9,20,null,null,15,7] },
  { lineNum: 12, phase: 'enqueue', description: '节点3的右子节点20入队', current: 3, queue: [9, 20], level: [3], result: [], levelNum: 1, visited: [3], tree: [3,9,20,null,null,15,7] },
  { lineNum: 13, phase: 'level', description: '第1层完成: [3]，加入结果', current: null, queue: [9, 20], level: [3], result: [[3]], levelNum: 1, visited: [3], tree: [3,9,20,null,null,15,7] },
  { lineNum: 4, phase: 'level', description: '第2层开始，queue长度=2', current: null, queue: [9, 20], level: [], result: [[3]], levelNum: 2, visited: [3], tree: [3,9,20,null,null,15,7] },
  { lineNum: 7, phase: 'process', description: '从队列取出节点9', current: 9, queue: [20], level: [], result: [[3]], levelNum: 2, visited: [3], tree: [3,9,20,null,null,15,7] },
  { lineNum: 8, phase: 'process', description: '将9加入当前层，节点9无子节点', current: 9, queue: [20], level: [9], result: [[3]], levelNum: 2, visited: [3, 9], tree: [3,9,20,null,null,15,7] },
  { lineNum: 7, phase: 'process', description: '从队列取出节点20', current: 20, queue: [], level: [9], result: [[3]], levelNum: 2, visited: [3, 9], tree: [3,9,20,null,null,15,7] },
  { lineNum: 8, phase: 'process', description: '将20加入当前层', current: 20, queue: [], level: [9, 20], result: [[3]], levelNum: 2, visited: [3, 9, 20], tree: [3,9,20,null,null,15,7] },
  { lineNum: 10, phase: 'enqueue', description: '节点20的左子节点15入队', current: 20, queue: [15], level: [9, 20], result: [[3]], levelNum: 2, visited: [3, 9, 20], tree: [3,9,20,null,null,15,7] },
  { lineNum: 12, phase: 'enqueue', description: '节点20的右子节点7入队', current: 20, queue: [15, 7], level: [9, 20], result: [[3]], levelNum: 2, visited: [3, 9, 20], tree: [3,9,20,null,null,15,7] },
  { lineNum: 13, phase: 'level', description: '第2层完成: [9,20]，加入结果', current: null, queue: [15, 7], level: [9, 20], result: [[3], [9, 20]], levelNum: 2, visited: [3, 9, 20], tree: [3,9,20,null,null,15,7] },
  { lineNum: 4, phase: 'level', description: '第3层开始，queue长度=2', current: null, queue: [15, 7], level: [], result: [[3], [9, 20]], levelNum: 3, visited: [3, 9, 20], tree: [3,9,20,null,null,15,7] },
  { lineNum: 7, phase: 'process', description: '从队列取出节点15', current: 15, queue: [7], level: [], result: [[3], [9, 20]], levelNum: 3, visited: [3, 9, 20], tree: [3,9,20,null,null,15,7] },
  { lineNum: 8, phase: 'process', description: '将15加入当前层，节点15无子节点', current: 15, queue: [7], level: [15], result: [[3], [9, 20]], levelNum: 3, visited: [3, 9, 20, 15], tree: [3,9,20,null,null,15,7] },
  { lineNum: 7, phase: 'process', description: '从队列取出节点7', current: 7, queue: [], level: [15], result: [[3], [9, 20]], levelNum: 3, visited: [3, 9, 20, 15], tree: [3,9,20,null,null,15,7] },
  { lineNum: 8, phase: 'process', description: '将7加入当前层，节点7无子节点', current: 7, queue: [], level: [15, 7], result: [[3], [9, 20]], levelNum: 3, visited: [3, 9, 20, 15, 7], tree: [3,9,20,null,null,15,7] },
  { lineNum: 13, phase: 'level', description: '第3层完成: [15,7]，加入结果', current: null, queue: [], level: [15, 7], result: [[3], [9, 20], [15, 7]], levelNum: 3, visited: [3, 9, 20, 15, 7], tree: [3,9,20,null,null,15,7] },
  { lineNum: 15, phase: 'done', description: '队列为空，返回 [[3],[9,20],[15,7]]', current: null, queue: [], level: [], result: [[3], [9, 20], [15, 7]], levelNum: 3, visited: [3, 9, 20, 15, 7], tree: [3,9,20,null,null,15,7] },
];

// ── Test Case 2: root = [1,2,3,4,5] ──
const steps2 = [
  { lineNum: 2, phase: 'init', description: '初始化 result=[], queue=[1]', current: null, queue: [1], level: [], result: [], levelNum: 0, visited: [], tree: [1,2,3,4,5] },
  { lineNum: 4, phase: 'level', description: '第1层开始，queue长度=1', current: null, queue: [1], level: [], result: [], levelNum: 1, visited: [], tree: [1,2,3,4,5] },
  { lineNum: 7, phase: 'process', description: '从队列取出节点1', current: 1, queue: [], level: [], result: [], levelNum: 1, visited: [], tree: [1,2,3,4,5] },
  { lineNum: 8, phase: 'process', description: '将1加入当前层', current: 1, queue: [], level: [1], result: [], levelNum: 1, visited: [1], tree: [1,2,3,4,5] },
  { lineNum: 10, phase: 'enqueue', description: '节点1的左子节点2入队', current: 1, queue: [2], level: [1], result: [], levelNum: 1, visited: [1], tree: [1,2,3,4,5] },
  { lineNum: 12, phase: 'enqueue', description: '节点1的右子节点3入队', current: 1, queue: [2, 3], level: [1], result: [], levelNum: 1, visited: [1], tree: [1,2,3,4,5] },
  { lineNum: 13, phase: 'level', description: '第1层完成: [1]，加入结果', current: null, queue: [2, 3], level: [1], result: [[1]], levelNum: 1, visited: [1], tree: [1,2,3,4,5] },
  { lineNum: 4, phase: 'level', description: '第2层开始，queue长度=2', current: null, queue: [2, 3], level: [], result: [[1]], levelNum: 2, visited: [1], tree: [1,2,3,4,5] },
  { lineNum: 7, phase: 'process', description: '从队列取出节点2', current: 2, queue: [3], level: [], result: [[1]], levelNum: 2, visited: [1], tree: [1,2,3,4,5] },
  { lineNum: 8, phase: 'process', description: '将2加入当前层', current: 2, queue: [3], level: [2], result: [[1]], levelNum: 2, visited: [1, 2], tree: [1,2,3,4,5] },
  { lineNum: 10, phase: 'enqueue', description: '节点2的左子节点4入队', current: 2, queue: [3, 4], level: [2], result: [[1]], levelNum: 2, visited: [1, 2], tree: [1,2,3,4,5] },
  { lineNum: 12, phase: 'enqueue', description: '节点2的右子节点5入队', current: 2, queue: [3, 4, 5], level: [2], result: [[1]], levelNum: 2, visited: [1, 2], tree: [1,2,3,4,5] },
  { lineNum: 7, phase: 'process', description: '从队列取出节点3', current: 3, queue: [4, 5], level: [2], result: [[1]], levelNum: 2, visited: [1, 2], tree: [1,2,3,4,5] },
  { lineNum: 8, phase: 'process', description: '将3加入当前层，节点3无子节点', current: 3, queue: [4, 5], level: [2, 3], result: [[1]], levelNum: 2, visited: [1, 2, 3], tree: [1,2,3,4,5] },
  { lineNum: 13, phase: 'level', description: '第2层完成: [2,3]，加入结果', current: null, queue: [4, 5], level: [2, 3], result: [[1], [2, 3]], levelNum: 2, visited: [1, 2, 3], tree: [1,2,3,4,5] },
  { lineNum: 4, phase: 'level', description: '第3层开始，queue长度=2', current: null, queue: [4, 5], level: [], result: [[1], [2, 3]], levelNum: 3, visited: [1, 2, 3], tree: [1,2,3,4,5] },
  { lineNum: 7, phase: 'process', description: '从队列取出节点4', current: 4, queue: [5], level: [], result: [[1], [2, 3]], levelNum: 3, visited: [1, 2, 3], tree: [1,2,3,4,5] },
  { lineNum: 8, phase: 'process', description: '将4加入当前层，节点4无子节点', current: 4, queue: [5], level: [4], result: [[1], [2, 3]], levelNum: 3, visited: [1, 2, 3, 4], tree: [1,2,3,4,5] },
  { lineNum: 7, phase: 'process', description: '从队列取出节点5', current: 5, queue: [], level: [4], result: [[1], [2, 3]], levelNum: 3, visited: [1, 2, 3, 4], tree: [1,2,3,4,5] },
  { lineNum: 8, phase: 'process', description: '将5加入当前层，节点5无子节点', current: 5, queue: [], level: [4, 5], result: [[1], [2, 3]], levelNum: 3, visited: [1, 2, 3, 4, 5], tree: [1,2,3,4,5] },
  { lineNum: 13, phase: 'level', description: '第3层完成: [4,5]，加入结果', current: null, queue: [], level: [4, 5], result: [[1], [2, 3], [4, 5]], levelNum: 3, visited: [1, 2, 3, 4, 5], tree: [1,2,3,4,5] },
  { lineNum: 15, phase: 'done', description: '队列为空，返回 [[1],[2,3],[4,5]]', current: null, queue: [], level: [], result: [[1], [2, 3], [4, 5]], levelNum: 3, visited: [1, 2, 3, 4, 5], tree: [1,2,3,4,5] },
];

const phaseLabels = { init: '初始化', level: '层处理', process: '处理节点', enqueue: '入队', done: '完成' };

function setupPanel(panel) {
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
      <div class="section-title">队列 (Queue)</div>
      <div class="stack-container" id="queue-vis" style="min-height:36px;display:flex;gap:4px;flex-wrap:wrap;"></div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="section-title">当前层 (Level <span id="level-num">\u2014</span>)</div>
      <div id="level-vis" style="display:flex;gap:4px;min-height:36px;flex-wrap:wrap;"></div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="section-title">结果</div>
      <div id="result-vis" style="display:flex;gap:8px;min-height:36px;flex-wrap:wrap;"></div>
    </div>
  `;
}

function setupPanel2(panel) {
  TREE_LABEL = '[1,2,3,4,5]';
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">树结构</div>
      <div class="tree-container" id="tree-vis" style="display:flex;justify-content:center;padding:16px;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
          <div class="tree-node" id="tn-1">1</div>
          <div style="display:flex;gap:80px;">
            <div class="tree-node" id="tn-2">2</div>
            <div class="tree-node" id="tn-3">3</div>
          </div>
          <div style="display:flex;gap:40px;">
            <div class="tree-node" id="tn-4">4</div>
            <div class="tree-node" id="tn-5">5</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="section-title">队列 (Queue)</div>
      <div class="stack-container" id="queue-vis" style="min-height:36px;display:flex;gap:4px;flex-wrap:wrap;"></div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="section-title">当前层 (Level <span id="level-num">\u2014</span>)</div>
      <div id="level-vis" style="display:flex;gap:4px;min-height:36px;flex-wrap:wrap;"></div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="section-title">结果</div>
      <div id="result-vis" style="display:flex;gap:8px;min-height:36px;flex-wrap:wrap;"></div>
    </div>
  `;
}

function render(s) {
  // Build nodeIds from the tree data in step if available
  const tree = s.tree || [3,9,20,null,null,15,7];
  const allNodes = tree.filter(v => v !== null);

  // Try to highlight by id "tn-<val>"
  allNodes.forEach(val => {
    const el = document.getElementById(`tn-${val}`);
    if (!el) return;
    el.classList.remove('is-current', 'is-visited');
    if (s.visited.includes(val)) el.classList.add('is-visited');
    if (s.current === val) el.classList.add('is-current');
  });

  const qVis = document.getElementById('queue-vis');
  if (qVis) {
    qVis.innerHTML = s.queue.length === 0
      ? '<span style="opacity:0.5;">空</span>'
      : s.queue.map(v => `<div class="stack-item">${v}</div>`).join('');
  }

  const ln = document.getElementById('level-num');
  if (ln) ln.textContent = s.levelNum || '\u2014';

  const lVis = document.getElementById('level-vis');
  if (lVis) {
    lVis.innerHTML = s.level.length === 0
      ? '<span style="opacity:0.5;">空</span>'
      : s.level.map(v => `<div class="arr-cell"><div class="arr-val">${v}</div></div>`).join('');
  }

  const rVis = document.getElementById('result-vis');
  if (rVis) {
    rVis.innerHTML = s.result.length === 0
      ? '<span style="opacity:0.5;">空</span>'
      : s.result.map((lvl, i) => `<div class="arr-cell"><div class="arr-val">[${lvl.join(',')}]</div><div class="arr-idx">L${i + 1}</div></div>`).join('');
  }
}

export default {
  title: '102. Binary Tree Level Order Traversal \u2014 执行可视化',
  problemDesc: `
    <p>给你二叉树的根节点 <code>root</code>，返回其节点值的层序遍历（即逐层地，从左到右访问所有节点）。</p>
    <div class="example">输入：root = [3,9,20,null,null,15,7]
输出：[[3],[9,20],[15,7]]</div>
    <p>提示：使用队列实现 BFS 广度优先搜索。</p>
  `,
  subtitle: `root = ${TREE_LABEL}`,
  code,
  lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'root = [3,9,20,null,null,15,7]', steps: steps1, subtitle: 'root = [3,9,20,null,null,15,7]' },
    {
      name: 'root = [1,2,3,4,5]', steps: steps2, subtitle: 'root = [1,2,3,4,5]',
      setup: setupPanel2,
    },
  ],

  setup: setupPanel,
  render,
};
