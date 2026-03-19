let NODES_DATA = [3, 2, 0, -4];
let CYCLE_POS = 1;

const code = [
  'class Solution:',
  '    def hasCycle(self, head):',
  '        slow = head',
  '        fast = head',
  '        while fast and fast.next:',
  '            slow = slow.next',
  '            fast = fast.next.next',
  '            if slow == fast:',
  '                return True',
  '        return False',
];

const lineMap = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9 };

const steps1 = [
  { lineNum: 3, phase: 'init', description: '初始化 slow = head，指向节点 3', nodes: [3, 2, 0, -4], cyclePos: 1, slow: 0, fast: 0, detected: false },
  { lineNum: 4, phase: 'init', description: '初始化 fast = head，指向节点 3', nodes: [3, 2, 0, -4], cyclePos: 1, slow: 0, fast: 0, detected: false },
  { lineNum: 5, phase: 'check', description: 'fast=节点3 且 fast.next=节点2，条件成立，进入循环', nodes: [3, 2, 0, -4], cyclePos: 1, slow: 0, fast: 0, detected: false },
  { lineNum: 6, phase: 'traverse', description: 'slow 移动一步：3 -> 2', nodes: [3, 2, 0, -4], cyclePos: 1, slow: 1, fast: 0, detected: false },
  { lineNum: 7, phase: 'traverse', description: 'fast 移动两步：3 -> 2 -> 0', nodes: [3, 2, 0, -4], cyclePos: 1, slow: 1, fast: 2, detected: false },
  { lineNum: 8, phase: 'check', description: 'slow(节点2) != fast(节点0)，没有相遇，继续', nodes: [3, 2, 0, -4], cyclePos: 1, slow: 1, fast: 2, detected: false },
  { lineNum: 5, phase: 'check', description: 'fast=节点0 且 fast.next=节点-4，条件成立', nodes: [3, 2, 0, -4], cyclePos: 1, slow: 1, fast: 2, detected: false },
  { lineNum: 6, phase: 'traverse', description: 'slow 移动一步：2 -> 0', nodes: [3, 2, 0, -4], cyclePos: 1, slow: 2, fast: 2, detected: false },
  { lineNum: 7, phase: 'traverse', description: 'fast 移动两步：0 -> -4 -> 2（通过环回到节点2）', nodes: [3, 2, 0, -4], cyclePos: 1, slow: 2, fast: 1, detected: false },
  { lineNum: 8, phase: 'check', description: 'slow(节点0) != fast(节点2)，没有相遇，继续', nodes: [3, 2, 0, -4], cyclePos: 1, slow: 2, fast: 1, detected: false },
  { lineNum: 5, phase: 'check', description: 'fast=节点2 且 fast.next=节点0，条件成立', nodes: [3, 2, 0, -4], cyclePos: 1, slow: 2, fast: 1, detected: false },
  { lineNum: 6, phase: 'traverse', description: 'slow 移动一步：0 -> -4', nodes: [3, 2, 0, -4], cyclePos: 1, slow: 3, fast: 1, detected: false },
  { lineNum: 7, phase: 'traverse', description: 'fast 移动两步：2 -> 0 -> -4', nodes: [3, 2, 0, -4], cyclePos: 1, slow: 3, fast: 3, detected: false },
  { lineNum: 8, phase: 'detect', description: 'slow == fast！都指向节点 -4，检测到环！', nodes: [3, 2, 0, -4], cyclePos: 1, slow: 3, fast: 3, detected: true },
  { lineNum: 9, phase: 'done', description: '返回 True，链表中存在环', nodes: [3, 2, 0, -4], cyclePos: 1, slow: 3, fast: 3, detected: true },
];

// Test case 2: [1, 2] no cycle
// fast moves: 1->2->null, loop ends. Return False.
const steps2 = [
  { lineNum: 3, phase: 'init', description: '初始化 slow = head = 节点 1', nodes: [1, 2], cyclePos: -1, slow: 0, fast: 0, detected: false },
  { lineNum: 4, phase: 'init', description: '初始化 fast = head = 节点 1', nodes: [1, 2], cyclePos: -1, slow: 0, fast: 0, detected: false },
  { lineNum: 5, phase: 'check', description: 'fast=节点1 且 fast.next=节点2，条件成立', nodes: [1, 2], cyclePos: -1, slow: 0, fast: 0, detected: false },
  { lineNum: 6, phase: 'traverse', description: 'slow 移动一步：1 -> 2', nodes: [1, 2], cyclePos: -1, slow: 1, fast: 0, detected: false },
  { lineNum: 7, phase: 'traverse', description: 'fast 移动两步：1 -> 2 -> null', nodes: [1, 2], cyclePos: -1, slow: 1, fast: -1, detected: false },
  { lineNum: 5, phase: 'check', description: 'fast = null，while 条件不成立，退出循环', nodes: [1, 2], cyclePos: -1, slow: 1, fast: -1, detected: false },
  { lineNum: 10, phase: 'done', description: '返回 False，链表中不存在环', nodes: [1, 2], cyclePos: -1, slow: 1, fast: -1, detected: false },
];

const phaseLabels = { init: '初始化', check: '检查', traverse: '移动指针', detect: '检测到环', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">链表（slow / fast 指针检测环）</div>
      <div class="ll-container" id="ll-area" style="flex-wrap:wrap"></div>
      <div style="margin-top:6px;font-size:12px;color:var(--text-muted)" id="cycle-hint"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>slow</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>fast</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(251,146,60,0.4);border:1px solid #fb923c"></div>环入口</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">指针位置</div>
      <div id="ptr-info" style="font-family:var(--font-mono);font-size:13px;color:var(--text-muted);display:flex;gap:20px;flex-wrap:wrap"></div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '141. Linked List Cycle',
  problemDesc: `
    <p>给你一个链表的头节点 <code>head</code>，判断链表中是否有环。如果存在环则返回 <code>true</code>，否则返回 <code>false</code>。</p>
    <div class="example">输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中存在一个环，尾节点连接到第 1 个节点。</div>
    <p><strong>提示：</strong>你能用 <code>O(1)</code> 空间解决吗？使用快慢指针。</p>
  `,
  subtitle: 'head = [3, 2, 0, -4], cycle at pos 1',
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '有环 (true)', steps: steps1, subtitle: '[3,2,0,-4] cycle at pos 1' },
    { name: '无环 (false)', steps: steps2, subtitle: '[1,2] no cycle', setup(panel) { NODES_DATA = [1, 2]; CYCLE_POS = -1; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const nodes = s.nodes || NODES_DATA;
    const cyclePos = s.cyclePos !== undefined ? s.cyclePos : CYCLE_POS;
    let html = '';

    for (let i = 0; i < nodes.length; i++) {
      let cls = '';
      let label = null;

      if (i === cyclePos) cls += ' is-carry';
      if (i === s.slow && s.slow >= 0) { cls += ' is-slow'; label = { text: 'slow', cls: 'label-slow' }; }
      if (i === s.fast && s.fast >= 0) {
        cls += ' is-fast';
        if (label) label.text += ' fast';
        else label = { text: 'fast', cls: 'label-fast' };
      }
      if (s.detected && i === s.slow) cls += ' is-current';

      html += `<div class="ll-node ${cls}"><div class="ll-val">${nodes[i]}</div>${label ? `<div class="ll-label ${label.cls}">${label.text}</div>` : ''}</div>`;

      if (i < nodes.length - 1) {
        html += '<div class="ll-arrow">\u2192</div>';
      }
    }

    if (cyclePos >= 0) {
      html += `<div class="ll-arrow" style="color:#fb923c">\u21b6 \u56de\u5230 ${nodes[cyclePos]}</div>`;
    } else {
      html += '<div class="ll-arrow">\u2192</div><div class="ll-null">null</div>';
    }

    document.getElementById('ll-area').innerHTML = html;
    if (cyclePos >= 0) {
      document.getElementById('cycle-hint').textContent = `\u73af\u5165\u53e3\uff1a\u8282\u70b9 ${nodes[cyclePos]}(pos=${cyclePos})`;
    } else {
      document.getElementById('cycle-hint').textContent = '\u65e0\u73af';
    }

    const slowVal = s.slow >= 0 && s.slow < nodes.length ? nodes[s.slow] : 'null';
    const fastVal = s.fast >= 0 && s.fast < nodes.length ? nodes[s.fast] : 'null';
    document.getElementById('ptr-info').innerHTML = `
      <span style="color:#4ade80">slow = <b>${slowVal}</b></span>
      <span style="color:#38bdf8">fast = <b>${fastVal}</b></span>
      ${s.detected ? '<span style="color:#f59e0b;font-weight:600">\u2714 \u76f8\u9047!</span>' : '<span style="opacity:0.5">\u672a\u76f8\u9047</span>'}
    `;

    const resultEl = document.getElementById('result-area');
    if (s.phase === 'done') {
      if (s.detected) {
        resultEl.innerHTML = `<div class="card found-box">
          <div class="found-icon" style="color:#4ade80">\u2713</div>
          <div>
            <div class="found-text" style="color:#4ade80">\u68c0\u6d4b\u5230\u73af</div>
            <div class="found-sub">slow \u548c fast \u5728\u8282\u70b9 ${nodes[s.slow]} \u76f8\u9047\uff0c\u8fd4\u56de True</div>
          </div>
        </div>`;
      } else {
        resultEl.innerHTML = `<div class="card found-box">
          <div class="found-icon" style="color:#f87171">\u2717</div>
          <div>
            <div class="found-text" style="color:#f87171">\u65e0\u73af</div>
            <div class="found-sub">fast \u5230\u8fbe null\uff0c\u94fe\u8868\u4e2d\u4e0d\u5b58\u5728\u73af\uff0c\u8fd4\u56de False</div>
          </div>
        </div>`;
      }
    } else {
      resultEl.innerHTML = '';
    }
  },
};
