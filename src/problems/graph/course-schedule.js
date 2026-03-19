let NUM_COURSES = 4;
let PREREQS = [[1,0],[2,0],[3,1],[3,2]];

const code = [
  'class Solution:',
  '    def canFinish(self, numCourses, prerequisites):',
  '        graph = defaultdict(list)',
  '        indegree = [0] * numCourses',
  '        for crs, pre in prerequisites:',
  '            graph[pre].append(crs)',
  '            indegree[crs] += 1',
  '        queue = deque()',
  '        for i in range(numCourses):',
  '            if indegree[i] == 0:',
  '                queue.append(i)',
  '        count = 0',
  '        while queue:',
  '            node = queue.popleft()',
  '            count += 1',
  '            for nei in graph[node]:',
  '                indegree[nei] -= 1',
  '                if indegree[nei] == 0:',
  '                    queue.append(nei)',
  '        return count == numCourses',
];

const lineMap = { 6: 2, 7: 3, 8: 4, 9: 5, 10: 6, 11: 7, 12: 8, 13: 9, 14: 10, 15: 11, 16: 12, 17: 13, 18: 14, 19: 15, 20: 16, 21: 17, 22: 18, 23: 19 };

// Node positions for rendering
const NODE_POS = {
  0: { x: 120, y: 40 },
  1: { x: 60, y: 120 },
  2: { x: 180, y: 120 },
  3: { x: 120, y: 200 },
};

const EDGES = [[0,1],[0,2],[1,3],[2,3]];

const steps = [
  { lineNum: 7, phase: 'init', description: '构建邻接表：遍历先修关系数组', numCourses: 4, indegree: [0,0,0,0], graph: {}, queue: [], count: 0, processed: [], currentNode: -1, edges: [[0,1],[0,2],[1,3],[2,3]], nodePos: NODE_POS },
  { lineNum: 9, phase: 'init', description: '处理 [1,0]：0→1 边，indegree[1]+=1', numCourses: 4, indegree: [0,1,0,0], graph: {0:[1]}, queue: [], count: 0, processed: [], currentNode: -1, edges: [[0,1],[0,2],[1,3],[2,3]], nodePos: NODE_POS },
  { lineNum: 9, phase: 'init', description: '处理 [2,0]：0→2 边，indegree[2]+=1', numCourses: 4, indegree: [0,1,1,0], graph: {0:[1,2]}, queue: [], count: 0, processed: [], currentNode: -1, edges: [[0,1],[0,2],[1,3],[2,3]], nodePos: NODE_POS },
  { lineNum: 9, phase: 'init', description: '处理 [3,1]：1→3 边，indegree[3]+=1', numCourses: 4, indegree: [0,1,1,1], graph: {0:[1,2],1:[3]}, queue: [], count: 0, processed: [], currentNode: -1, edges: [[0,1],[0,2],[1,3],[2,3]], nodePos: NODE_POS },
  { lineNum: 10, phase: 'init', description: '处理 [3,2]：2→3 边，indegree=[0,1,1,2]', numCourses: 4, indegree: [0,1,1,2], graph: {0:[1,2],1:[3],2:[3]}, queue: [], count: 0, processed: [], currentNode: -1, edges: [[0,1],[0,2],[1,3],[2,3]], nodePos: NODE_POS },
  { lineNum: 14, phase: 'init', description: '扫描入度为0的节点：课程0入度=0，加入队列', numCourses: 4, indegree: [0,1,1,2], graph: {0:[1,2],1:[3],2:[3]}, queue: [0], count: 0, processed: [], currentNode: -1, edges: [[0,1],[0,2],[1,3],[2,3]], nodePos: NODE_POS },
  // Process node 0
  { lineNum: 17, phase: 'process', description: '出队课程0，count=1', numCourses: 4, indegree: [0,1,1,2], graph: {0:[1,2],1:[3],2:[3]}, queue: [], count: 1, processed: [0], currentNode: 0, edges: [[0,1],[0,2],[1,3],[2,3]], nodePos: NODE_POS },
  { lineNum: 20, phase: 'process', description: '课程0的邻居课程1：入度减1变为0，加入队列', numCourses: 4, indegree: [0,0,1,2], graph: {0:[1,2],1:[3],2:[3]}, queue: [1], count: 1, processed: [0], currentNode: 0, edges: [[0,1],[0,2],[1,3],[2,3]], nodePos: NODE_POS },
  { lineNum: 20, phase: 'process', description: '课程0的邻居课程2：入度减1变为0，加入队列', numCourses: 4, indegree: [0,0,0,2], graph: {0:[1,2],1:[3],2:[3]}, queue: [1,2], count: 1, processed: [0], currentNode: 0, edges: [[0,1],[0,2],[1,3],[2,3]], nodePos: NODE_POS },
  // Process node 1
  { lineNum: 17, phase: 'process', description: '出队课程1，count=2', numCourses: 4, indegree: [0,0,0,2], graph: {0:[1,2],1:[3],2:[3]}, queue: [2], count: 2, processed: [0,1], currentNode: 1, edges: [[0,1],[0,2],[1,3],[2,3]], nodePos: NODE_POS },
  { lineNum: 20, phase: 'process', description: '课程1的邻居课程3：入度减1变为1，暂不入队', numCourses: 4, indegree: [0,0,0,1], graph: {0:[1,2],1:[3],2:[3]}, queue: [2], count: 2, processed: [0,1], currentNode: 1, edges: [[0,1],[0,2],[1,3],[2,3]], nodePos: NODE_POS },
  // Process node 2
  { lineNum: 17, phase: 'process', description: '出队课程2，count=3', numCourses: 4, indegree: [0,0,0,1], graph: {0:[1,2],1:[3],2:[3]}, queue: [], count: 3, processed: [0,1,2], currentNode: 2, edges: [[0,1],[0,2],[1,3],[2,3]], nodePos: NODE_POS },
  { lineNum: 20, phase: 'process', description: '课程2的邻居课程3：入度减1变为0，加入队列', numCourses: 4, indegree: [0,0,0,0], graph: {0:[1,2],1:[3],2:[3]}, queue: [3], count: 3, processed: [0,1,2], currentNode: 2, edges: [[0,1],[0,2],[1,3],[2,3]], nodePos: NODE_POS },
  // Process node 3
  { lineNum: 17, phase: 'process', description: '出队课程3，count=4，无邻居需处理', numCourses: 4, indegree: [0,0,0,0], graph: {0:[1,2],1:[3],2:[3]}, queue: [], count: 4, processed: [0,1,2,3], currentNode: 3, edges: [[0,1],[0,2],[1,3],[2,3]], nodePos: NODE_POS },
  // Done
  { lineNum: 23, phase: 'done', description: 'count=4 == numCourses=4，返回 true，可以完成所有课程', numCourses: 4, indegree: [0,0,0,0], graph: {0:[1,2],1:[3],2:[3]}, queue: [], count: 4, processed: [0,1,2,3], currentNode: -1, edges: [[0,1],[0,2],[1,3],[2,3]], nodePos: NODE_POS },
];

// Test case 2: has cycle -> false
const NODE_POS2 = {
  0: { x: 60, y: 60 },
  1: { x: 180, y: 60 },
};
const steps2 = [
  { lineNum: 7, phase: 'init', description: '构建邻接表：numCourses=2, prerequisites=[[1,0],[0,1]]', numCourses: 2, indegree: [0,0], graph: {}, queue: [], count: 0, processed: [], currentNode: -1, edges: [[0,1],[1,0]], nodePos: NODE_POS2 },
  { lineNum: 9, phase: 'init', description: '处理 [1,0]：0→1 边，indegree[1]+=1', numCourses: 2, indegree: [0,1], graph: {0:[1]}, queue: [], count: 0, processed: [], currentNode: -1, edges: [[0,1],[1,0]], nodePos: NODE_POS2 },
  { lineNum: 10, phase: 'init', description: '处理 [0,1]：1→0 边，indegree[0]+=1，形成环！', numCourses: 2, indegree: [1,1], graph: {0:[1],1:[0]}, queue: [], count: 0, processed: [], currentNode: -1, edges: [[0,1],[1,0]], nodePos: NODE_POS2 },
  { lineNum: 14, phase: 'init', description: '扫描入度为0的节点：没有入度为0的节点，队列为空', numCourses: 2, indegree: [1,1], graph: {0:[1],1:[0]}, queue: [], count: 0, processed: [], currentNode: -1, edges: [[0,1],[1,0]], nodePos: NODE_POS2 },
  { lineNum: 16, phase: 'process', description: '队列为空，while 循环不执行，count=0', numCourses: 2, indegree: [1,1], graph: {0:[1],1:[0]}, queue: [], count: 0, processed: [], currentNode: -1, edges: [[0,1],[1,0]], nodePos: NODE_POS2 },
  { lineNum: 23, phase: 'done', description: 'count=0 != numCourses=2，存在环，返回 false', numCourses: 2, indegree: [1,1], graph: {0:[1],1:[0]}, queue: [], count: 0, processed: [], currentNode: -1, edges: [[0,1],[1,0]], nodePos: NODE_POS2 },
];

const phaseLabels = { init: '初始化', process: '拓扑排序', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">课程依赖图（绿色=已处理, 青色=当前, 数字=入度）</div>
      <svg id="graph-svg" width="260" height="250" style="display:block;margin:0 auto"></svg>
    </div>
    <div class="card">
      <div class="section-title">BFS 队列</div>
      <div class="stack-container" id="topo-queue"></div>
    </div>
    <div class="card">
      <div class="section-title">入度数组 indegree</div>
      <div class="array-row" id="indegree-arr"></div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '207. Course Schedule -- 执行可视化',
  problemDesc: `
    <p>你这个学期必须选修 <code>numCourses</code> 门课程，记为 <code>0</code> 到 <code>numCourses - 1</code>。给你一个先修关系数组 <code>prerequisites</code>，判断是否可能完成所有课程的学习。</p>
    <div class="example">输入：numCourses = 2, prerequisites = [[1,0]]
输出：true
解释：总共 2 门课，学习课程 1 之前需要先完成课程 0，这是可以做到的。</div>
  `,
  subtitle: `numCourses=4, prerequisites=${JSON.stringify(PREREQS)} | output: true`,
  code, lineMap, steps, phaseLabels,

  testCases: [
    {
      name: '无环: 可完成 -> true',
      steps: steps,
      subtitle: `numCourses=4, prerequisites=[[1,0],[2,0],[3,1],[3,2]] | output: true`,
    },
    {
      name: '有环: 不可完成 -> false',
      steps: steps2,
      subtitle: 'numCourses=2, prerequisites=[[1,0],[0,1]] | output: false',
      setup(panel) { setupPanel(panel); },
    },
  ],

  setup(panel) {
    setupPanel(panel);
  },

  render(s) {
    const numCourses = s.numCourses || NUM_COURSES;
    const nodePos = s.nodePos || NODE_POS;
    const edges = s.edges || EDGES;

    // Graph SVG
    const svg = document.getElementById('graph-svg');
    let svgHtml = '';
    // Draw edges
    edges.forEach(([from, to]) => {
      const f = nodePos[from], t = nodePos[to];
      const dx = t.x - f.x, dy = t.y - f.y;
      const len = Math.sqrt(dx*dx + dy*dy);
      const ux = dx/len, uy = dy/len;
      const x1 = f.x + ux*22, y1 = f.y + uy*22;
      const x2 = t.x - ux*22, y2 = t.y - uy*22;
      svgHtml += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(148,163,184,0.5)" stroke-width="2" marker-end="url(#arrow)"/>`;
    });
    svgHtml += '<defs><marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6Z" fill="rgba(148,163,184,0.7)"/></marker></defs>';
    // Draw nodes
    for (let i = 0; i < numCourses; i++) {
      const p = nodePos[i];
      let fill = 'rgba(100,116,139,0.3)';
      let stroke = '#64748b';
      if (i === s.currentNode) { fill = 'rgba(56,189,248,0.4)'; stroke = '#38bdf8'; }
      else if (s.processed.includes(i)) { fill = 'rgba(16,185,129,0.4)'; stroke = '#10b981'; }
      svgHtml += `<circle cx="${p.x}" cy="${p.y}" r="22" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
      svgHtml += `<text x="${p.x}" y="${p.y+1}" text-anchor="middle" dominant-baseline="middle" fill="white" font-size="14" font-weight="700">${i}</text>`;
      svgHtml += `<text x="${p.x+26}" y="${p.y-10}" text-anchor="start" fill="rgba(148,163,184,0.8)" font-size="10">in:${s.indegree[i]}</text>`;
    }
    svg.innerHTML = svgHtml;

    // Queue
    const qEl = document.getElementById('topo-queue');
    if (s.queue.length === 0) {
      qEl.innerHTML = '<div class="stack-empty">（队列为空）</div>';
    } else {
      qEl.innerHTML = s.queue.map(n => `<div class="stack-item">课程 ${n}</div>`).join('');
    }

    // Indegree array
    document.getElementById('indegree-arr').innerHTML = s.indegree.map((v, i) => {
      let cls = 'arr-cell';
      if (i === s.currentNode) cls += ' current';
      if (s.processed.includes(i)) cls += ' is-visited';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${i}]</div></div>`;
    }).join('');

    // Result
    const resultEl = document.getElementById('result-area');
    if (s.phase === 'done') {
      const success = s.count === numCourses;
      if (success) {
        resultEl.innerHTML = `<div class="card found-box"><div class="found-icon">\u2713</div><div><div class="found-text">返回 true</div><div class="found-sub">拓扑排序处理了全部 ${numCourses} 门课程，无环</div></div></div>`;
      } else {
        resultEl.innerHTML = `<div class="card found-box" style="border-color:#ef4444;background:rgba(239,68,68,0.08)"><div class="found-icon" style="color:#ef4444">\u2717</div><div><div class="found-text">返回 false</div><div class="found-sub">只处理了 ${s.count}/${numCourses} 门课程，存在循环依赖</div></div></div>`;
      }
    } else {
      resultEl.innerHTML = `<div class="card"><div class="section-title">已处理: ${s.count} / ${numCourses}</div></div>`;
    }
  },
};
