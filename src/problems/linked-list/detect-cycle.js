const code = [
  'class Solution:',
  '    def detectCycle(self, head):',
  '        slow = fast = head',
  '        while fast and fast.next:',
  '            slow = slow.next',
  '            fast = fast.next.next',
  '            if slow == fast:',
  '                ptr = head',
  '                while ptr != slow:',
  '                    ptr = ptr.next',
  '                    slow = slow.next',
  '                return ptr',
  '        return None',
];

const lineMap = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11, 13: 12 };

// Test case 1: [3,2,0,-4] with cycle at position 1 (node value 2)
const steps1 = [
  {
    lineNum: 3, phase: 'init',
    description: '初始化 slow = fast = head，都指向节点 3',
    nodes: [3, 2, 0, -4], cyclePos: 1,
    slow: 0, fast: 0, ptr: -1, stage: 'detect', detected: false, entrance: -1,
  },
  {
    lineNum: 4, phase: 'phase1',
    description: '阶段一：检测环。检查 fast=节点3 且 fast.next 存在，条件成立',
    nodes: [3, 2, 0, -4], cyclePos: 1,
    slow: 0, fast: 0, ptr: -1, stage: 'detect', detected: false, entrance: -1,
  },
  {
    lineNum: 5, phase: 'phase1',
    description: 'slow 移动一步：3 -> 2',
    nodes: [3, 2, 0, -4], cyclePos: 1,
    slow: 1, fast: 0, ptr: -1, stage: 'detect', detected: false, entrance: -1,
  },
  {
    lineNum: 6, phase: 'phase1',
    description: 'fast 移动两步：3 -> 2 -> 0',
    nodes: [3, 2, 0, -4], cyclePos: 1,
    slow: 1, fast: 2, ptr: -1, stage: 'detect', detected: false, entrance: -1,
  },
  {
    lineNum: 7, phase: 'phase1',
    description: '比较 slow(节点2) != fast(节点0)，未相遇，继续循环',
    nodes: [3, 2, 0, -4], cyclePos: 1,
    slow: 1, fast: 2, ptr: -1, stage: 'detect', detected: false, entrance: -1,
  },
  {
    lineNum: 4, phase: 'phase1',
    description: '检查循环条件：fast=节点0 且 fast.next 存在，条件成立',
    nodes: [3, 2, 0, -4], cyclePos: 1,
    slow: 1, fast: 2, ptr: -1, stage: 'detect', detected: false, entrance: -1,
  },
  {
    lineNum: 5, phase: 'phase1',
    description: 'slow 移动一步：2 -> 0',
    nodes: [3, 2, 0, -4], cyclePos: 1,
    slow: 2, fast: 2, ptr: -1, stage: 'detect', detected: false, entrance: -1,
  },
  {
    lineNum: 6, phase: 'phase1',
    description: 'fast 移动两步：0 -> -4 -> 2（通过环回到节点2）',
    nodes: [3, 2, 0, -4], cyclePos: 1,
    slow: 2, fast: 1, ptr: -1, stage: 'detect', detected: false, entrance: -1,
  },
  {
    lineNum: 7, phase: 'phase1',
    description: '比较 slow(节点0) != fast(节点2)，未相遇，继续循环',
    nodes: [3, 2, 0, -4], cyclePos: 1,
    slow: 2, fast: 1, ptr: -1, stage: 'detect', detected: false, entrance: -1,
  },
  {
    lineNum: 5, phase: 'phase1',
    description: 'slow 移动一步：0 -> -4',
    nodes: [3, 2, 0, -4], cyclePos: 1,
    slow: 3, fast: 1, ptr: -1, stage: 'detect', detected: false, entrance: -1,
  },
  {
    lineNum: 6, phase: 'phase1',
    description: 'fast 移动两步：2 -> 0 -> -4',
    nodes: [3, 2, 0, -4], cyclePos: 1,
    slow: 3, fast: 3, ptr: -1, stage: 'detect', detected: false, entrance: -1,
  },
  {
    lineNum: 7, phase: 'phase1',
    description: 'slow == fast！都在节点 -4，检测到环！进入阶段二',
    nodes: [3, 2, 0, -4], cyclePos: 1,
    slow: 3, fast: 3, ptr: -1, stage: 'detect', detected: true, entrance: -1,
  },
  {
    lineNum: 8, phase: 'phase2',
    description: '阶段二：找环入口。初始化 ptr = head（节点3）',
    nodes: [3, 2, 0, -4], cyclePos: 1,
    slow: 3, fast: 3, ptr: 0, stage: 'find', detected: true, entrance: -1,
  },
  {
    lineNum: 9, phase: 'phase2',
    description: '比较 ptr(节点3) != slow(节点-4)，需要继续移动',
    nodes: [3, 2, 0, -4], cyclePos: 1,
    slow: 3, fast: 3, ptr: 0, stage: 'find', detected: true, entrance: -1,
  },
  {
    lineNum: 10, phase: 'phase2',
    description: 'ptr 移动一步：3 -> 2',
    nodes: [3, 2, 0, -4], cyclePos: 1,
    slow: 3, fast: 3, ptr: 1, stage: 'find', detected: true, entrance: -1,
  },
  {
    lineNum: 11, phase: 'phase2',
    description: 'slow 移动一步：-4 -> 2（通过环回到节点2）',
    nodes: [3, 2, 0, -4], cyclePos: 1,
    slow: 1, fast: 3, ptr: 1, stage: 'find', detected: true, entrance: -1,
  },
  {
    lineNum: 9, phase: 'phase2',
    description: '比较 ptr(节点2) == slow(节点2)，找到环入口！',
    nodes: [3, 2, 0, -4], cyclePos: 1,
    slow: 1, fast: 3, ptr: 1, stage: 'found', detected: true, entrance: 1,
  },
  {
    lineNum: 12, phase: 'done',
    description: '返回 ptr（节点2），环的入口节点值为 2',
    nodes: [3, 2, 0, -4], cyclePos: 1,
    slow: 1, fast: 3, ptr: 1, stage: 'found', detected: true, entrance: 1,
  },
];

// Test case 2: [1,2,3] no cycle
const steps2 = [
  {
    lineNum: 3, phase: 'init',
    description: '初始化 slow = fast = head，都指向节点 1',
    nodes: [1, 2, 3], cyclePos: -1,
    slow: 0, fast: 0, ptr: -1, stage: 'detect', detected: false, entrance: -1,
  },
  {
    lineNum: 4, phase: 'phase1',
    description: '检查循环条件：fast=节点1 且 fast.next 存在，条件成立',
    nodes: [1, 2, 3], cyclePos: -1,
    slow: 0, fast: 0, ptr: -1, stage: 'detect', detected: false, entrance: -1,
  },
  {
    lineNum: 5, phase: 'phase1',
    description: 'slow 移动一步：1 -> 2',
    nodes: [1, 2, 3], cyclePos: -1,
    slow: 1, fast: 0, ptr: -1, stage: 'detect', detected: false, entrance: -1,
  },
  {
    lineNum: 6, phase: 'phase1',
    description: 'fast 移动两步：1 -> 2 -> 3',
    nodes: [1, 2, 3], cyclePos: -1,
    slow: 1, fast: 2, ptr: -1, stage: 'detect', detected: false, entrance: -1,
  },
  {
    lineNum: 7, phase: 'phase1',
    description: '比较 slow(节点2) != fast(节点3)，未相遇',
    nodes: [1, 2, 3], cyclePos: -1,
    slow: 1, fast: 2, ptr: -1, stage: 'detect', detected: false, entrance: -1,
  },
  {
    lineNum: 4, phase: 'phase1',
    description: '检查循环条件：fast=节点3，fast.next=NULL，条件不成立',
    nodes: [1, 2, 3], cyclePos: -1,
    slow: 1, fast: 2, ptr: -1, stage: 'detect', detected: false, entrance: -1,
  },
  {
    lineNum: 5, phase: 'phase1',
    description: 'slow 移动一步：2 -> 3',
    nodes: [1, 2, 3], cyclePos: -1,
    slow: 2, fast: 2, ptr: -1, stage: 'detect', detected: false, entrance: -1,
  },
  {
    lineNum: 4, phase: 'phase1',
    description: 'while 条件检查：fast.next 为 NULL，退出循环',
    nodes: [1, 2, 3], cyclePos: -1,
    slow: 2, fast: 2, ptr: -1, stage: 'detect', detected: false, entrance: -1,
  },
  {
    lineNum: 13, phase: 'done',
    description: '链表无环，返回 None',
    nodes: [1, 2, 3], cyclePos: -1,
    slow: 2, fast: 2, ptr: -1, stage: 'no-cycle', detected: false, entrance: -1,
  },
];

const phaseLabels = { init: '初始化', phase1: '阶段一：检测环', phase2: '阶段二：找入口', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">链表（Floyd 算法 - 快慢指针）</div>
      <div class="ll-container" id="ll-area" style="flex-wrap:wrap"></div>
      <div style="margin-top:6px;font-size:12px;color:var(--text-muted)" id="cycle-hint"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>slow</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>fast</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(168,85,247,0.4);border:1px solid #a855f7"></div>ptr</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(251,146,60,0.4);border:1px solid #fb923c"></div>环入口</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">算法阶段</div>
      <div id="phase-info" style="font-family:var(--font-mono);font-size:13px;color:var(--text-muted)"></div>
      <div id="ptr-info" style="font-family:var(--font-mono);font-size:13px;color:var(--text-muted);display:flex;gap:20px;flex-wrap:wrap;margin-top:8px"></div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '142. Linked List Cycle II',
  problemDesc: `
    <p>给定一个链表的头节点 <code>head</code>，返回链表开始入环的第一个节点。如果链表无环，则返回 <code>null</code>。</p>
    <div class="example">输入：head = [3,2,0,-4], pos = 1
输出：返回索引为 1 的链表节点
解释：链表中有一个环，其尾部连接到第二个节点</div>
    <p>提示：不允许修改链表。</p>
  `,
  subtitle: 'head = [3, 2, 0, -4], cycle at pos 1',
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '有环链表', steps: steps1, subtitle: 'head = [3, 2, 0, -4], cycle at pos 1' },
    { name: '无环链表', steps: steps2, subtitle: 'head = [1, 2, 3], no cycle', setup(panel) { setupPanel(panel); } },
  ],

  setup(panel) { setupPanel(panel); },

  render(s) {
    const nodes = s.nodes;
    const cyclePos = s.cyclePos;
    let html = '';

    for (let i = 0; i < nodes.length; i++) {
      let cls = '';
      let label = null;

      if (cyclePos >= 0 && i === cyclePos) cls += ' is-carry';
      if (s.entrance === i) cls += ' is-merged';

      if (i === s.slow) { cls += ' is-slow'; label = { text: 'slow', cls: 'label-slow' }; }
      if (i === s.fast && s.stage !== 'found') {
        cls += ' is-fast';
        if (label) label.text += ' fast';
        else label = { text: 'fast', cls: 'label-fast' };
      }
      if (i === s.ptr && s.ptr >= 0) {
        cls += ' is-current';
        if (label) label.text += ' ptr';
        else label = { text: 'ptr', cls: 'label-cur' };
      }

      html += `<div class="ll-node ${cls}"><div class="ll-val">${nodes[i]}</div>${label ? `<div class="ll-label ${label.cls}">${label.text}</div>` : ''}</div>`;

      if (i < nodes.length - 1) {
        html += '<div class="ll-arrow">\u2192</div>';
      }
    }

    if (cyclePos >= 0) {
      html += `<div class="ll-arrow" style="color:#fb923c">\u21b6 \u56de\u5230 ${nodes[cyclePos]}</div>`;
    } else {
      html += '<div class="ll-arrow">\u2192</div><div class="ll-null">NULL</div>';
    }
    document.getElementById('ll-area').innerHTML = html;

    const hintEl = document.getElementById('cycle-hint');
    if (cyclePos >= 0) {
      hintEl.textContent = `\u73af\u5165\u53e3\uff1a\u8282\u70b9 ${nodes[cyclePos]}(pos=${cyclePos})   \u2502   ${nodes[nodes.length - 1]}.next \u2192 ${nodes[cyclePos]}`;
    } else {
      hintEl.textContent = '\u65e0\u73af\u94fe\u8868';
    }

    // Phase info
    const phaseEl = document.getElementById('phase-info');
    if (s.stage === 'detect') {
      phaseEl.innerHTML = '<span style="color:#38bdf8;font-weight:600">\u9636\u6bb5\u4e00\uff1a\u5feb\u6162\u6307\u9488\u68c0\u6d4b\u73af</span>';
    } else if (s.stage === 'find') {
      phaseEl.innerHTML = '<span style="color:#a855f7;font-weight:600">\u9636\u6bb5\u4e8c\uff1aptr \u4ece head \u51fa\u53d1\uff0cslow \u7ee7\u7eed\u79fb\u52a8\uff0c\u76f8\u9047\u5904\u5373\u73af\u5165\u53e3</span>';
    } else if (s.stage === 'found') {
      phaseEl.innerHTML = `<span style="color:#4ade80;font-weight:700">\u627e\u5230\u73af\u5165\u53e3\uff1a\u8282\u70b9 ${nodes[s.entrance]}</span>`;
    } else if (s.stage === 'no-cycle') {
      phaseEl.innerHTML = '<span style="color:#f59e0b;font-weight:700">\u94fe\u8868\u65e0\u73af\uff0c\u8fd4\u56de None</span>';
    }

    // Pointer info
    document.getElementById('ptr-info').innerHTML = `
      <span style="color:#4ade80">slow = <b>${nodes[s.slow]}</b></span>
      ${s.stage === 'detect' ? `<span style="color:#38bdf8">fast = <b>${nodes[s.fast]}</b></span>` : ''}
      ${s.ptr >= 0 ? `<span style="color:#a855f7">ptr = <b>${nodes[s.ptr]}</b></span>` : ''}
      ${s.detected ? '<span style="color:#f59e0b;font-weight:600">\u2714 \u73af\u5df2\u68c0\u6d4b</span>' : ''}
    `;

    // Result
    const resultEl = document.getElementById('result-area');
    if (s.entrance >= 0) {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">\u2713</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">\u627e\u5230\u73af\u5165\u53e3</div>
          <div class="found-sub" style="margin-top:4px">\u73af\u5165\u53e3\u8282\u70b9\u503c\u4e3a ${nodes[s.entrance]}\uff0c\u4f4d\u4e8e\u7d22\u5f15 ${s.entrance}</div>
        </div>
      </div>`;
    } else if (s.stage === 'no-cycle') {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#f59e0b;font-size:22px;font-weight:700">\u2717</div>
        <div>
          <div class="found-text" style="color:#f59e0b;font-weight:600">\u65e0\u73af</div>
          <div class="found-sub" style="margin-top:4px">\u94fe\u8868\u4e2d\u4e0d\u5b58\u5728\u73af\uff0c\u8fd4\u56de None</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
