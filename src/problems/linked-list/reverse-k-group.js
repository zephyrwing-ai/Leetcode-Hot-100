let NODES = [1, 2, 3, 4, 5];
let K = 2;

const code = [
  'class Solution:',
  '    def reverseKGroup(self, head, k):',
  '        dummy = ListNode(0, head)',
  '        prevGroup = dummy',
  '        while True:',
  '            kth = prevGroup',
  '            for i in range(k):',
  '                kth = kth.next',
  '                if not kth: return dummy.next',
  '            nextGroup = kth.next',
  '            prev, curr = kth.next, prevGroup.next',
  '            for i in range(k):',
  '                nxt = curr.next',
  '                curr.next = prev',
  '                prev = curr',
  '                curr = nxt',
  '            tmp = prevGroup.next',
  '            prevGroup.next = kth',
  '            prevGroup = tmp',
];

const lineMap = { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 11, 11: 12, 12: 13, 13: 14, 14: 15, 15: 16, 16: 17, 17: 18, 18: 19 };

// ── Test Case 1: head = [1,2,3,4,5], k = 2 ──
// Group1: reverse [1,2] → [2,1]; Group2: reverse [3,4] → [4,3]; node 5 remains
const steps1 = [
  { lineNum: 1, phase: 'init', description: '创建哑节点 dummy，连接到 [1,2,3,4,5]，k=2', order: [1,2,3,4,5], prevGroup: -1, kthIdx: -1, reversing: [], reversed: [], nodes: [1,2,3,4,5], k: 2 },
  { lineNum: 2, phase: 'init', description: 'prevGroup 指向 dummy', order: [1,2,3,4,5], prevGroup: -1, kthIdx: -1, reversing: [], reversed: [], nodes: [1,2,3,4,5], k: 2 },
  { lineNum: 4, phase: 'find', description: '第一组: 从 prevGroup 出发找第 k 个节点', order: [1,2,3,4,5], prevGroup: -1, kthIdx: -1, reversing: [], reversed: [], nodes: [1,2,3,4,5], k: 2 },
  { lineNum: 6, phase: 'find', description: 'kth 移动到节点 1 (i=0)', order: [1,2,3,4,5], prevGroup: -1, kthIdx: 0, reversing: [], reversed: [], nodes: [1,2,3,4,5], k: 2 },
  { lineNum: 6, phase: 'find', description: 'kth 移动到节点 2 (i=1)，找到第 k 个节点', order: [1,2,3,4,5], prevGroup: -1, kthIdx: 1, reversing: [], reversed: [], nodes: [1,2,3,4,5], k: 2 },
  { lineNum: 9, phase: 'reverse', description: '开始反转第一组 [1,2]，prev=节点3, curr=节点1', order: [1,2,3,4,5], prevGroup: -1, kthIdx: 1, reversing: [0,1], reversed: [], nodes: [1,2,3,4,5], k: 2 },
  { lineNum: 12, phase: 'reverse', description: '反转: 节点1.next = 节点3，prev=节点1, curr=节点2', order: [1,2,3,4,5], prevGroup: -1, kthIdx: 1, reversing: [0,1], reversed: [], nodes: [1,2,3,4,5], k: 2 },
  { lineNum: 12, phase: 'reverse', description: '反转: 节点2.next = 节点1，prev=节点2, curr=节点3', order: [1,2,3,4,5], prevGroup: -1, kthIdx: 1, reversing: [0,1], reversed: [], nodes: [1,2,3,4,5], k: 2 },
  { lineNum: 16, phase: 'link', description: 'prevGroup.next = kth(节点2)，连接前驱到反转后的头', order: [2,1,3,4,5], prevGroup: -1, kthIdx: 1, reversing: [], reversed: [0,1], nodes: [1,2,3,4,5], k: 2 },
  { lineNum: 17, phase: 'link', description: 'prevGroup 移动到节点 1（原组尾），第一组反转完成', order: [2,1,3,4,5], prevGroup: 0, kthIdx: -1, reversing: [], reversed: [0,1], nodes: [1,2,3,4,5], k: 2 },
  { lineNum: 4, phase: 'find', description: '第二组: 从 prevGroup(节点1) 出发找第 k 个节点', order: [2,1,3,4,5], prevGroup: 0, kthIdx: -1, reversing: [], reversed: [0,1], nodes: [1,2,3,4,5], k: 2 },
  { lineNum: 6, phase: 'find', description: 'kth 移动到节点 3 (i=0)', order: [2,1,3,4,5], prevGroup: 0, kthIdx: 2, reversing: [], reversed: [0,1], nodes: [1,2,3,4,5], k: 2 },
  { lineNum: 6, phase: 'find', description: 'kth 移动到节点 4 (i=1)，找到第 k 个节点', order: [2,1,3,4,5], prevGroup: 0, kthIdx: 3, reversing: [], reversed: [0,1], nodes: [1,2,3,4,5], k: 2 },
  { lineNum: 9, phase: 'reverse', description: '开始反转第二组 [3,4]，prev=节点5, curr=节点3', order: [2,1,3,4,5], prevGroup: 0, kthIdx: 3, reversing: [2,3], reversed: [0,1], nodes: [1,2,3,4,5], k: 2 },
  { lineNum: 12, phase: 'reverse', description: '反转: 节点3.next = 节点5，prev=节点3, curr=节点4', order: [2,1,3,4,5], prevGroup: 0, kthIdx: 3, reversing: [2,3], reversed: [0,1], nodes: [1,2,3,4,5], k: 2 },
  { lineNum: 12, phase: 'reverse', description: '反转: 节点4.next = 节点3，prev=节点4, curr=节点5', order: [2,1,3,4,5], prevGroup: 0, kthIdx: 3, reversing: [2,3], reversed: [0,1], nodes: [1,2,3,4,5], k: 2 },
  { lineNum: 16, phase: 'link', description: 'prevGroup.next = kth(节点4)，连接前驱到反转后的头', order: [2,1,4,3,5], prevGroup: 0, kthIdx: 3, reversing: [], reversed: [0,1,2,3], nodes: [1,2,3,4,5], k: 2 },
  { lineNum: 17, phase: 'link', description: 'prevGroup 移动到节点 3（原组尾），第二组反转完成', order: [2,1,4,3,5], prevGroup: 2, kthIdx: -1, reversing: [], reversed: [0,1,2,3], nodes: [1,2,3,4,5], k: 2 },
  { lineNum: 7, phase: 'find', description: '第三组: 从 prevGroup(节点3) 出发，kth 移到节点5，再移为 NULL', order: [2,1,4,3,5], prevGroup: 2, kthIdx: 4, reversing: [], reversed: [0,1,2,3], nodes: [1,2,3,4,5], k: 2 },
  { lineNum: 7, phase: 'done', description: 'kth = NULL，不足 k 个节点，返回 dummy.next = [2,1,4,3,5]', order: [2,1,4,3,5], prevGroup: 2, kthIdx: -1, reversing: [], reversed: [0,1,2,3], nodes: [1,2,3,4,5], k: 2 },
];

// ── Test Case 2: head = [1,2,3,4,5], k = 3 ──
// Group1: reverse [1,2,3] → [3,2,1]; nodes 4,5 remain
const steps2 = [
  { lineNum: 1, phase: 'init', description: '创建哑节点 dummy，连接到 [1,2,3,4,5]，k=3', order: [1,2,3,4,5], prevGroup: -1, kthIdx: -1, reversing: [], reversed: [], nodes: [1,2,3,4,5], k: 3 },
  { lineNum: 2, phase: 'init', description: 'prevGroup 指向 dummy', order: [1,2,3,4,5], prevGroup: -1, kthIdx: -1, reversing: [], reversed: [], nodes: [1,2,3,4,5], k: 3 },
  { lineNum: 4, phase: 'find', description: '第一组: 从 prevGroup 出发找第 k=3 个节点', order: [1,2,3,4,5], prevGroup: -1, kthIdx: -1, reversing: [], reversed: [], nodes: [1,2,3,4,5], k: 3 },
  { lineNum: 6, phase: 'find', description: 'kth → 节点 1 (i=0)', order: [1,2,3,4,5], prevGroup: -1, kthIdx: 0, reversing: [], reversed: [], nodes: [1,2,3,4,5], k: 3 },
  { lineNum: 6, phase: 'find', description: 'kth → 节点 2 (i=1)', order: [1,2,3,4,5], prevGroup: -1, kthIdx: 1, reversing: [], reversed: [], nodes: [1,2,3,4,5], k: 3 },
  { lineNum: 6, phase: 'find', description: 'kth → 节点 3 (i=2)，找到第 k 个节点', order: [1,2,3,4,5], prevGroup: -1, kthIdx: 2, reversing: [], reversed: [], nodes: [1,2,3,4,5], k: 3 },
  { lineNum: 9, phase: 'reverse', description: '开始反转第一组 [1,2,3]，prev=节点4, curr=节点1', order: [1,2,3,4,5], prevGroup: -1, kthIdx: 2, reversing: [0,1,2], reversed: [], nodes: [1,2,3,4,5], k: 3 },
  { lineNum: 12, phase: 'reverse', description: '反转: 节点1.next = 节点4，prev=节点1, curr=节点2', order: [1,2,3,4,5], prevGroup: -1, kthIdx: 2, reversing: [0,1,2], reversed: [], nodes: [1,2,3,4,5], k: 3 },
  { lineNum: 12, phase: 'reverse', description: '反转: 节点2.next = 节点1，prev=节点2, curr=节点3', order: [1,2,3,4,5], prevGroup: -1, kthIdx: 2, reversing: [0,1,2], reversed: [], nodes: [1,2,3,4,5], k: 3 },
  { lineNum: 12, phase: 'reverse', description: '反转: 节点3.next = 节点2，prev=节点3, curr=节点4，反转完成', order: [1,2,3,4,5], prevGroup: -1, kthIdx: 2, reversing: [0,1,2], reversed: [], nodes: [1,2,3,4,5], k: 3 },
  { lineNum: 16, phase: 'link', description: 'prevGroup.next = kth(节点3)，连接前驱到反转后的头', order: [3,2,1,4,5], prevGroup: -1, kthIdx: 2, reversing: [], reversed: [0,1,2], nodes: [1,2,3,4,5], k: 3 },
  { lineNum: 17, phase: 'link', description: 'prevGroup 移动到节点 1（原组尾），第一组反转完成', order: [3,2,1,4,5], prevGroup: 0, kthIdx: -1, reversing: [], reversed: [0,1,2], nodes: [1,2,3,4,5], k: 3 },
  { lineNum: 6, phase: 'find', description: '第二组: 从节点1出发，kth → 节点4(i=0), → 节点5(i=1)', order: [3,2,1,4,5], prevGroup: 0, kthIdx: 4, reversing: [], reversed: [0,1,2], nodes: [1,2,3,4,5], k: 3 },
  { lineNum: 7, phase: 'done', description: 'kth 再移一步为 NULL，不足 k=3 个节点，返回 [3,2,1,4,5]', order: [3,2,1,4,5], prevGroup: 0, kthIdx: -1, reversing: [], reversed: [0,1,2], nodes: [1,2,3,4,5], k: 3 },
];

const phaseLabels = { init: '初始化', find: '寻找第k个', reverse: '反转', link: '连接', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">链表状态（蓝=当前组，绿=已反转，橙=kth）</div>
      <div class="ll-container" id="ll-area"></div>
    </div>
    <div class="card">
      <div class="section-title">操作信息</div>
      <div id="group-info" style="font-family:var(--font-mono);font-size:13px;padding:4px 0;color:var(--text)"></div>
    </div>
    <div class="card">
      <div class="section-title">结果链表</div>
      <div class="ll-container" id="ll-result"></div>
    </div>
    <div class="legend-row" style="margin-top:8px">
      <div class="legend-item"><div class="legend-dot" style="background:rgba(167,139,250,0.4);border:1px solid #a78bfa"></div>prevGroup</div>
      <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>反转中</div>
      <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>已反转</div>
      <div class="legend-item"><div class="legend-dot" style="background:rgba(245,158,11,0.4);border:1px solid #f59e0b"></div>kth</div>
    </div>
  `;
}

export default {
  title: '25. Reverse Nodes in k-Group',
  problemDesc: `
    <p>给你链表的头节点 <code>head</code>，每 <code>k</code> 个节点一组进行翻转，请你返回修改后的链表。如果节点总数不是 <code>k</code> 的整数倍，则最后剩余的节点保持原有顺序。</p>
    <div class="example">输入：head = [1,2,3,4,5], k = 2
输出：[2,1,4,3,5]</div>
    <p>提示：不能只是单纯改变节点内部的值，而是需要实际进行节点交换。</p>
  `,
  subtitle: `head = [${NODES}], k = ${K}`,
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'head=[1,2,3,4,5], k=2', steps: steps1, subtitle: 'head = [1,2,3,4,5], k = 2' },
    {
      name: 'head=[1,2,3,4,5], k=3', steps: steps2, subtitle: 'head = [1,2,3,4,5], k = 3',
      setup(panel) { NODES = [1,2,3,4,5]; K = 3; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const nodes = s.nodes || NODES;
    const reversingSet = new Set(s.reversing || []);
    const reversedSet = new Set(s.reversed || []);

    // Main linked list
    const llEl = document.getElementById('ll-area');
    let html = '';

    // Dummy node
    let dummyCls = 'll-node';
    if (s.prevGroup === -1) dummyCls += ' is-prev';
    html += `<div class="${dummyCls}"><div class="ll-val" style="font-size:11px">`;
    if (s.prevGroup === -1) html += '<span class="ll-label label-prev">pG</span>';
    html += 'D</div><div class="ll-arrow"></div></div>';

    s.order.forEach((v, i) => {
      const origIdx = nodes.indexOf(v);
      let cls = 'll-node';
      if (reversingSet.has(origIdx)) cls += ' is-current';
      if (reversedSet.has(origIdx)) cls += ' is-merged';
      if (origIdx === s.prevGroup) cls += ' is-prev';
      if (origIdx === s.kthIdx) cls += ' is-fast';

      let nodeLabels = '';
      if (origIdx === s.prevGroup) nodeLabels += '<span class="ll-label label-prev">pG</span>';
      if (origIdx === s.kthIdx) nodeLabels += '<span class="ll-label label-fast">kth</span>';

      html += `<div class="${cls}"><div class="ll-val">${nodeLabels}${v}</div>`;
      if (i < s.order.length - 1) html += '<div class="ll-arrow"></div>';
      html += '</div>';
    });
    html += '<div class="ll-arrow"></div><div class="ll-null">NULL</div>';
    llEl.innerHTML = html;

    // Group info
    const infoEl = document.getElementById('group-info');
    if (s.phase === 'reverse') {
      infoEl.innerHTML = `反转中: [${s.reversing.map(i => nodes[i]).join(',')}]`;
    } else if (s.phase === 'done') {
      infoEl.innerHTML = `<span style="color:#4ade80">完成! 结果: [${s.order.join(',')}]</span>`;
    } else {
      infoEl.innerHTML = `已反转节点: ${s.reversed.length} 个`;
    }

    // Result list
    const rEl = document.getElementById('ll-result');
    if (s.phase === 'done') {
      let rHtml = '';
      s.order.forEach((v, i) => {
        const origIdx = nodes.indexOf(v);
        let cls = 'll-node';
        if (reversedSet.has(origIdx)) cls += ' is-merged';
        rHtml += `<div class="${cls}"><div class="ll-val">${v}</div>`;
        if (i < s.order.length - 1) rHtml += '<div class="ll-arrow"></div>';
        rHtml += '</div>';
      });
      rHtml += '<div class="ll-arrow"></div><div class="ll-null">NULL</div>';
      rEl.innerHTML = rHtml;
    } else {
      rEl.innerHTML = '<span style="color:var(--text-muted);font-style:italic">(进行中...)</span>';
    }
  },
};
