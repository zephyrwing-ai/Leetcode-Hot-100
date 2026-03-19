let NODES = [1, 2, 3, 4];

const code = [
  'class Solution:',
  '    def swapPairs(self, head):',
  '        dummy = ListNode(0, head)',
  '        prev = dummy',
  '        while prev.next and prev.next.next:',
  '            first = prev.next',
  '            second = prev.next.next',
  '            first.next = second.next',
  '            second.next = first',
  '            prev.next = second',
  '            prev = first',
  '        return dummy.next',
];

const lineMap = { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 11 };

// ── Test Case 1: head = [1,2,3,4] ──
const steps1 = [
  { lineNum: 1, phase: 'init', description: '创建哑节点 dummy，连接到原链表头部 [1,2,3,4]', prevIdx: -1, firstIdx: -1, secondIdx: -1, order: [1,2,3,4], swappedPairs: [], nodes: [1,2,3,4] },
  { lineNum: 2, phase: 'init', description: 'prev 指向 dummy', prevIdx: -1, firstIdx: -1, secondIdx: -1, order: [1,2,3,4], swappedPairs: [], nodes: [1,2,3,4] },
  { lineNum: 3, phase: 'check', description: '检查: prev.next(1) 和 prev.next.next(2) 都存在，进入循环', prevIdx: -1, firstIdx: -1, secondIdx: -1, order: [1,2,3,4], swappedPairs: [], nodes: [1,2,3,4] },
  { lineNum: 4, phase: 'identify', description: '标记 first = prev.next = 节点 1', prevIdx: -1, firstIdx: 0, secondIdx: -1, order: [1,2,3,4], swappedPairs: [], nodes: [1,2,3,4] },
  { lineNum: 5, phase: 'identify', description: '标记 second = prev.next.next = 节点 2', prevIdx: -1, firstIdx: 0, secondIdx: 1, order: [1,2,3,4], swappedPairs: [], nodes: [1,2,3,4] },
  { lineNum: 6, phase: 'swap', description: '第一步: first.next = second.next，即 1→3', prevIdx: -1, firstIdx: 0, secondIdx: 1, order: [1,2,3,4], swappedPairs: [], nodes: [1,2,3,4] },
  { lineNum: 7, phase: 'swap', description: '第二步: second.next = first，即 2→1', prevIdx: -1, firstIdx: 0, secondIdx: 1, order: [1,2,3,4], swappedPairs: [], nodes: [1,2,3,4] },
  { lineNum: 8, phase: 'swap', description: '第三步: prev.next = second，即 dummy→2，第一对交换完成!', prevIdx: -1, firstIdx: 0, secondIdx: 1, order: [2,1,3,4], swappedPairs: [[0,1]], nodes: [1,2,3,4] },
  { lineNum: 9, phase: 'advance', description: 'prev = first，prev 移到节点 1 的位置，准备下一对', prevIdx: 1, firstIdx: -1, secondIdx: -1, order: [2,1,3,4], swappedPairs: [[0,1]], nodes: [1,2,3,4] },
  { lineNum: 3, phase: 'check', description: '检查: prev.next(3) 和 prev.next.next(4) 都存在，继续循环', prevIdx: 1, firstIdx: -1, secondIdx: -1, order: [2,1,3,4], swappedPairs: [[0,1]], nodes: [1,2,3,4] },
  { lineNum: 4, phase: 'identify', description: '标记 first = prev.next = 节点 3', prevIdx: 1, firstIdx: 2, secondIdx: -1, order: [2,1,3,4], swappedPairs: [[0,1]], nodes: [1,2,3,4] },
  { lineNum: 5, phase: 'identify', description: '标记 second = prev.next.next = 节点 4', prevIdx: 1, firstIdx: 2, secondIdx: 3, order: [2,1,3,4], swappedPairs: [[0,1]], nodes: [1,2,3,4] },
  { lineNum: 6, phase: 'swap', description: '第一步: first.next = second.next，即 3→NULL', prevIdx: 1, firstIdx: 2, secondIdx: 3, order: [2,1,3,4], swappedPairs: [[0,1]], nodes: [1,2,3,4] },
  { lineNum: 7, phase: 'swap', description: '第二步: second.next = first，即 4→3', prevIdx: 1, firstIdx: 2, secondIdx: 3, order: [2,1,3,4], swappedPairs: [[0,1]], nodes: [1,2,3,4] },
  { lineNum: 8, phase: 'swap', description: '第三步: prev.next = second，即 1→4，第二对交换完成!', prevIdx: 1, firstIdx: 2, secondIdx: 3, order: [2,1,4,3], swappedPairs: [[0,1],[2,3]], nodes: [1,2,3,4] },
  { lineNum: 9, phase: 'advance', description: 'prev = first，prev 移到节点 3 的位置', prevIdx: 3, firstIdx: -1, secondIdx: -1, order: [2,1,4,3], swappedPairs: [[0,1],[2,3]], nodes: [1,2,3,4] },
  { lineNum: 3, phase: 'check', description: 'prev.next = NULL，条件不满足，退出循环', prevIdx: 3, firstIdx: -1, secondIdx: -1, order: [2,1,4,3], swappedPairs: [[0,1],[2,3]], nodes: [1,2,3,4] },
  { lineNum: 10, phase: 'done', description: '返回 dummy.next，交换完成: [2,1,4,3]', prevIdx: -1, firstIdx: -1, secondIdx: -1, order: [2,1,4,3], swappedPairs: [[0,1],[2,3]], nodes: [1,2,3,4] },
];

// ── Test Case 2: head = [1,2,3] ──
const steps2 = [
  { lineNum: 1, phase: 'init', description: '创建哑节点 dummy，连接到原链表头部 [1,2,3]', prevIdx: -1, firstIdx: -1, secondIdx: -1, order: [1,2,3], swappedPairs: [], nodes: [1,2,3] },
  { lineNum: 2, phase: 'init', description: 'prev 指向 dummy', prevIdx: -1, firstIdx: -1, secondIdx: -1, order: [1,2,3], swappedPairs: [], nodes: [1,2,3] },
  { lineNum: 3, phase: 'check', description: '检查: prev.next(1) 和 prev.next.next(2) 都存在，进入循环', prevIdx: -1, firstIdx: -1, secondIdx: -1, order: [1,2,3], swappedPairs: [], nodes: [1,2,3] },
  { lineNum: 4, phase: 'identify', description: '标记 first = prev.next = 节点 1', prevIdx: -1, firstIdx: 0, secondIdx: -1, order: [1,2,3], swappedPairs: [], nodes: [1,2,3] },
  { lineNum: 5, phase: 'identify', description: '标记 second = prev.next.next = 节点 2', prevIdx: -1, firstIdx: 0, secondIdx: 1, order: [1,2,3], swappedPairs: [], nodes: [1,2,3] },
  { lineNum: 6, phase: 'swap', description: '第一步: first.next = second.next，即 1→3', prevIdx: -1, firstIdx: 0, secondIdx: 1, order: [1,2,3], swappedPairs: [], nodes: [1,2,3] },
  { lineNum: 7, phase: 'swap', description: '第二步: second.next = first，即 2→1', prevIdx: -1, firstIdx: 0, secondIdx: 1, order: [1,2,3], swappedPairs: [], nodes: [1,2,3] },
  { lineNum: 8, phase: 'swap', description: '第三步: prev.next = second，即 dummy→2，交换完成!', prevIdx: -1, firstIdx: 0, secondIdx: 1, order: [2,1,3], swappedPairs: [[0,1]], nodes: [1,2,3] },
  { lineNum: 9, phase: 'advance', description: 'prev = first，prev 移到节点 1 的位置', prevIdx: 1, firstIdx: -1, secondIdx: -1, order: [2,1,3], swappedPairs: [[0,1]], nodes: [1,2,3] },
  { lineNum: 3, phase: 'check', description: 'prev.next(3) 存在但 prev.next.next = NULL，不足一对，退出循环', prevIdx: 1, firstIdx: -1, secondIdx: -1, order: [2,1,3], swappedPairs: [[0,1]], nodes: [1,2,3] },
  { lineNum: 10, phase: 'done', description: '返回 dummy.next，结果: [2,1,3]，末尾节点 3 保持不动', prevIdx: -1, firstIdx: -1, secondIdx: -1, order: [2,1,3], swappedPairs: [[0,1]], nodes: [1,2,3] },
];

const phaseLabels = { init: '初始化', check: '检查', identify: '定位', swap: '交换', advance: '前进', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">原始链表（黄色=交换中，紫色=prev）</div>
      <div class="ll-container" id="ll-original"></div>
    </div>
    <div class="card">
      <div class="section-title">当前链表状态</div>
      <div class="ll-container" id="ll-current"></div>
    </div>
    <div class="card">
      <div class="section-title">操作信息</div>
      <div id="swap-info" style="font-family:var(--font-mono);font-size:13px;padding:4px 0;color:var(--text)"></div>
    </div>
    <div class="legend-row" style="margin-top:8px">
      <div class="legend-item"><div class="legend-dot" style="background:rgba(167,139,250,0.4);border:1px solid #a78bfa"></div>prev</div>
      <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>first</div>
      <div class="legend-item"><div class="legend-dot" style="background:rgba(245,158,11,0.4);border:1px solid #f59e0b"></div>second</div>
      <div class="legend-item"><div class="legend-dot" style="background:rgba(250,204,21,0.4);border:1px solid #facc15"></div>已交换</div>
    </div>
  `;
}

export default {
  title: '24. Swap Nodes in Pairs',
  problemDesc: `
    <p>给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题。</p>
    <div class="example">输入：head = [1,2,3,4]
输出：[2,1,4,3]</div>
    <p>提示：链表中节点的数目在范围 <code>[0, 100]</code> 内。</p>
  `,
  subtitle: `head = [${NODES}]`,
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'head = [1,2,3,4]', steps: steps1, subtitle: 'head = [1,2,3,4]' },
    {
      name: 'head = [1,2,3]', steps: steps2, subtitle: 'head = [1,2,3]',
      setup(panel) { NODES = [1,2,3]; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const nodes = s.nodes || NODES;

    // Original list (static reference)
    const origEl = document.getElementById('ll-original');
    let origHtml = '';
    nodes.forEach((v, i) => {
      origHtml += `<div class="ll-node"><div class="ll-val">${v}</div>`;
      if (i < nodes.length - 1) origHtml += '<div class="ll-arrow"></div>';
      origHtml += '</div>';
    });
    origHtml += '<div class="ll-arrow"></div><div class="ll-null">NULL</div>';
    origEl.innerHTML = origHtml;

    // Current state list
    const curEl = document.getElementById('ll-current');
    let curHtml = '';

    // Dummy node
    let dummyCls = 'll-node';
    if (s.prevIdx === -1) dummyCls += ' is-prev';
    curHtml += `<div class="${dummyCls}"><div class="ll-val" style="font-size:11px">`;
    if (s.prevIdx === -1) curHtml += '<span class="ll-label label-prev">prev</span>';
    curHtml += 'D</div><div class="ll-arrow"></div></div>';

    // Build a map from original index to value
    const swappedSet = new Set();
    s.swappedPairs.forEach(([a, b]) => { swappedSet.add(a); swappedSet.add(b); });

    s.order.forEach((v, i) => {
      const origIdx = nodes.indexOf(v);
      let cls = 'll-node';

      if (swappedSet.has(origIdx)) cls += ' is-swapped';
      if (origIdx === s.firstIdx) cls += ' is-current';
      if (origIdx === s.secondIdx) cls += ' is-fast';
      if (origIdx === s.prevIdx) cls += ' is-prev';

      let nodeLabels = '';
      if (origIdx === s.prevIdx) nodeLabels += '<span class="ll-label label-prev">prev</span>';
      if (origIdx === s.firstIdx) nodeLabels += '<span class="ll-label label-cur">first</span>';
      if (origIdx === s.secondIdx) nodeLabels += '<span class="ll-label label-fast">second</span>';

      curHtml += `<div class="${cls}"><div class="ll-val">${nodeLabels}${v}</div>`;
      if (i < s.order.length - 1) curHtml += '<div class="ll-arrow"></div>';
      curHtml += '</div>';
    });
    curHtml += '<div class="ll-arrow"></div><div class="ll-null">NULL</div>';
    curEl.innerHTML = curHtml;

    // Swap info
    const infoEl = document.getElementById('swap-info');
    if (s.phase === 'swap' || s.phase === 'identify') {
      const f = s.firstIdx >= 0 ? nodes[s.firstIdx] : '?';
      const sc = s.secondIdx >= 0 ? nodes[s.secondIdx] : '?';
      infoEl.innerHTML = `当前操作对: [${f}, ${sc}] | 已完成交换: ${s.swappedPairs.length} 对`;
    } else if (s.phase === 'done') {
      infoEl.innerHTML = `<span style="color:#4ade80">交换完成! [${s.order}] 共交换 ${s.swappedPairs.length} 对</span>`;
    } else {
      infoEl.innerHTML = `已完成交换: ${s.swappedPairs.length} 对`;
    }
  },
};
