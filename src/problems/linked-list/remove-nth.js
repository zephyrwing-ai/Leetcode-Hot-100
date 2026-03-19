let NODES = [1, 2, 3, 4, 5];
let N = 2;

const code = [
  'class Solution:',
  '    def removeNthFromEnd(self, head, n):',
  '        dummy = ListNode(0, head)',
  '        fast = dummy',
  '        slow = dummy',
  '        for i in range(n + 1):',
  '            fast = fast.next',
  '        while fast:',
  '            fast = fast.next',
  '            slow = slow.next',
  '        slow.next = slow.next.next',
  '        return dummy.next',
];

const lineMap = { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 11 };

// ── Test Case 1: head = [1,2,3,4,5], n = 2 ──
const steps1 = [
  { lineNum: 1, phase: 'init', description: '创建哑节点 dummy，连接到原链表头部', fast: -1, slow: -1, removed: -1, nodes: [1,2,3,4,5], n: 2 },
  { lineNum: 2, phase: 'init', description: 'fast 指向 dummy (位置 -1)', fast: -1, slow: -1, removed: -1, nodes: [1,2,3,4,5], n: 2 },
  { lineNum: 3, phase: 'init', description: 'slow 指向 dummy (位置 -1)', fast: -1, slow: -1, removed: -1, nodes: [1,2,3,4,5], n: 2 },
  { lineNum: 4, phase: 'gap', description: '开始 for 循环，让 fast 先走 n+1 = 3 步', fast: -1, slow: -1, removed: -1, nodes: [1,2,3,4,5], n: 2 },
  { lineNum: 5, phase: 'gap', description: 'fast 前进第 1 步 (i=0): fast → 节点 1', fast: 0, slow: -1, removed: -1, nodes: [1,2,3,4,5], n: 2 },
  { lineNum: 5, phase: 'gap', description: 'fast 前进第 2 步 (i=1): fast → 节点 2', fast: 1, slow: -1, removed: -1, nodes: [1,2,3,4,5], n: 2 },
  { lineNum: 5, phase: 'gap', description: 'fast 前进第 3 步 (i=2): fast → 节点 3，间距 n+1=3 建立完成', fast: 2, slow: -1, removed: -1, nodes: [1,2,3,4,5], n: 2 },
  { lineNum: 6, phase: 'move', description: 'while fast: fast 不为空，开始同步移动', fast: 2, slow: -1, removed: -1, nodes: [1,2,3,4,5], n: 2 },
  { lineNum: 7, phase: 'move', description: 'fast 前进 → 节点 4', fast: 3, slow: -1, removed: -1, nodes: [1,2,3,4,5], n: 2 },
  { lineNum: 8, phase: 'move', description: 'slow 前进 → 节点 1，间距保持 3', fast: 3, slow: 0, removed: -1, nodes: [1,2,3,4,5], n: 2 },
  { lineNum: 7, phase: 'move', description: 'fast 前进 → 节点 5', fast: 4, slow: 0, removed: -1, nodes: [1,2,3,4,5], n: 2 },
  { lineNum: 8, phase: 'move', description: 'slow 前进 → 节点 2', fast: 4, slow: 1, removed: -1, nodes: [1,2,3,4,5], n: 2 },
  { lineNum: 7, phase: 'move', description: 'fast 前进 → NULL', fast: 5, slow: 1, removed: -1, nodes: [1,2,3,4,5], n: 2 },
  { lineNum: 8, phase: 'move', description: 'slow 前进 → 节点 3，slow.next 就是要删除的节点', fast: 5, slow: 2, removed: -1, nodes: [1,2,3,4,5], n: 2 },
  { lineNum: 6, phase: 'move', description: 'fast = NULL，退出 while 循环', fast: 5, slow: 2, removed: -1, nodes: [1,2,3,4,5], n: 2 },
  { lineNum: 9, phase: 'remove', description: 'slow.next = 节点 4 就是倒数第 2 个节点，执行删除', fast: 5, slow: 2, removed: 3, nodes: [1,2,3,4,5], n: 2 },
  { lineNum: 9, phase: 'remove', description: '令 slow.next = slow.next.next，跳过节点 4', fast: 5, slow: 2, removed: 3, nodes: [1,2,3,4,5], n: 2 },
  { lineNum: 10, phase: 'done', description: '返回 dummy.next，删除完成: [1,2,3,5]', fast: 5, slow: 2, removed: 3, nodes: [1,2,3,4,5], n: 2 },
];

// ── Test Case 2: head = [1,2], n = 1 ──
const steps2 = [
  { lineNum: 1, phase: 'init', description: '创建哑节点 dummy，连接到原链表头部 [1,2]', fast: -1, slow: -1, removed: -1, nodes: [1,2], n: 1 },
  { lineNum: 2, phase: 'init', description: 'fast 指向 dummy (位置 -1)', fast: -1, slow: -1, removed: -1, nodes: [1,2], n: 1 },
  { lineNum: 3, phase: 'init', description: 'slow 指向 dummy (位置 -1)', fast: -1, slow: -1, removed: -1, nodes: [1,2], n: 1 },
  { lineNum: 4, phase: 'gap', description: '开始 for 循环，让 fast 先走 n+1 = 2 步', fast: -1, slow: -1, removed: -1, nodes: [1,2], n: 1 },
  { lineNum: 5, phase: 'gap', description: 'fast 前进第 1 步 (i=0): fast → 节点 1', fast: 0, slow: -1, removed: -1, nodes: [1,2], n: 1 },
  { lineNum: 5, phase: 'gap', description: 'fast 前进第 2 步 (i=1): fast → 节点 2，间距 n+1=2 建立完成', fast: 1, slow: -1, removed: -1, nodes: [1,2], n: 1 },
  { lineNum: 6, phase: 'move', description: 'while fast: fast 不为空，开始同步移动', fast: 1, slow: -1, removed: -1, nodes: [1,2], n: 1 },
  { lineNum: 7, phase: 'move', description: 'fast 前进 → NULL', fast: 2, slow: -1, removed: -1, nodes: [1,2], n: 1 },
  { lineNum: 8, phase: 'move', description: 'slow 前进 → 节点 1', fast: 2, slow: 0, removed: -1, nodes: [1,2], n: 1 },
  { lineNum: 6, phase: 'move', description: 'fast = NULL，退出 while 循环', fast: 2, slow: 0, removed: -1, nodes: [1,2], n: 1 },
  { lineNum: 9, phase: 'remove', description: 'slow.next = 节点 2 就是倒数第 1 个节点，执行删除', fast: 2, slow: 0, removed: 1, nodes: [1,2], n: 1 },
  { lineNum: 9, phase: 'remove', description: '令 slow.next = slow.next.next = NULL，节点 2 被移除', fast: 2, slow: 0, removed: 1, nodes: [1,2], n: 1 },
  { lineNum: 10, phase: 'done', description: '返回 dummy.next，删除完成: [1]', fast: 2, slow: 0, removed: 1, nodes: [1,2], n: 1 },
];

const phaseLabels = { init: '初始化', gap: '建立间距', move: '同步移动', remove: '删除节点', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">链表（绿色=slow，橙色=fast，红色虚线=已删除）</div>
      <div class="ll-container" id="ll-area"></div>
    </div>
    <div class="card">
      <div class="section-title">指针位置</div>
      <div id="ptr-info" style="font-family:var(--font-mono);font-size:13px;padding:4px 0;color:var(--text)"></div>
    </div>
    <div class="card">
      <div class="section-title">删除后链表</div>
      <div class="ll-container" id="ll-result"></div>
    </div>
    <div class="legend-row" style="margin-top:8px">
      <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>slow 指针</div>
      <div class="legend-item"><div class="legend-dot" style="background:rgba(245,158,11,0.4);border:1px solid #f59e0b"></div>fast 指针</div>
      <div class="legend-item"><div class="legend-dot" style="background:rgba(248,113,113,0.4);border:1px solid #f87171"></div>待删除</div>
    </div>
  `;
}

export default {
  title: '19. Remove Nth Node From End of List',
  problemDesc: `
    <p>给你一个链表，删除链表的倒数第 <code>n</code> 个结点，并且返回链表的头结点。</p>
    <div class="example">输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]</div>
    <p>提示：尝试使用一趟扫描实现。</p>
  `,
  subtitle: `head = [${NODES}], n = ${N}`,
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'head=[1,2,3,4,5], n=2', steps: steps1, subtitle: 'head = [1,2,3,4,5], n = 2' },
    {
      name: 'head=[1,2], n=1', steps: steps2, subtitle: 'head = [1,2], n = 1',
      setup(panel) { NODES = [1,2]; N = 1; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const nodes = s.nodes || NODES;
    // Main list with dummy
    const llEl = document.getElementById('ll-area');
    let html = '';

    // Dummy node
    let dummyCls = 'll-node';
    if (s.fast === -1) dummyCls += ' is-fast';
    if (s.slow === -1) dummyCls += ' is-slow';
    html += `<div class="${dummyCls}"><div class="ll-val" style="font-size:11px">`;
    let labels = '';
    if (s.fast === -1) labels += '<span class="ll-label label-fast">fast</span>';
    if (s.slow === -1) labels += '<span class="ll-label label-slow">slow</span>';
    if (labels) html += labels;
    html += 'D</div><div class="ll-arrow"></div></div>';

    // Actual nodes
    nodes.forEach((v, i) => {
      let cls = 'll-node';
      if (i === s.removed) cls += ' is-removed';
      if (i === s.fast && s.fast < nodes.length) cls += ' is-fast';
      if (i === s.slow) cls += ' is-slow';
      let nodeLabels = '';
      if (i === s.fast && s.fast < nodes.length) nodeLabels += '<span class="ll-label label-fast">fast</span>';
      if (i === s.slow) nodeLabels += '<span class="ll-label label-slow">slow</span>';
      html += `<div class="${cls}"><div class="ll-val">${nodeLabels}${v}</div>`;
      if (i < nodes.length - 1) html += '<div class="ll-arrow"></div>';
      html += '</div>';
    });
    html += '<div class="ll-arrow"></div><div class="ll-null">NULL</div>';
    if (s.fast >= nodes.length) {
      html += '<span class="ll-label label-fast" style="position:relative;top:0;left:0;transform:none;margin-left:4px">fast</span>';
    }
    llEl.innerHTML = html;

    // Pointer info
    const ptrEl = document.getElementById('ptr-info');
    const fastPos = s.fast === -1 ? 'dummy' : (s.fast >= nodes.length ? 'NULL' : `node ${nodes[s.fast]}`);
    const slowPos = s.slow === -1 ? 'dummy' : `node ${nodes[s.slow]}`;
    const gap = s.fast - s.slow;
    ptrEl.innerHTML = `fast: ${fastPos} | slow: ${slowPos} | gap: ${gap}`;

    // Result list
    const rEl = document.getElementById('ll-result');
    if (s.removed === -1) {
      rEl.innerHTML = '<span style="color:var(--text-muted);font-style:italic">(尚未删除)</span>';
    } else {
      let rHtml = '';
      nodes.forEach((v, i) => {
        if (i === s.removed) return;
        rHtml += `<div class="ll-node is-merged"><div class="ll-val">${v}</div>`;
        const remaining = nodes.filter((_, j) => j !== s.removed);
        const posInResult = remaining.indexOf(v);
        if (posInResult < remaining.length - 1) rHtml += '<div class="ll-arrow"></div>';
        rHtml += '</div>';
      });
      rHtml += '<div class="ll-arrow"></div><div class="ll-null">NULL</div>';
      rEl.innerHTML = rHtml;
    }
  },
};
