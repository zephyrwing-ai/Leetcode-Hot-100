let L1 = [2, 4, 3];
let L2 = [5, 6, 4];

const code = [
  'class Solution:',
  '    def addTwoNumbers(self, l1, l2):',
  '        dummy = ListNode(0)',
  '        cur = dummy',
  '        carry = 0',
  '        while l1 or l2 or carry:',
  '            val1 = l1.val if l1 else 0',
  '            val2 = l2.val if l2 else 0',
  '            total = val1 + val2 + carry',
  '            carry = total // 10',
  '            cur.next = ListNode(total % 10)',
  '            cur = cur.next',
  '            l1 = l1.next if l1 else None',
  '            l2 = l2.next if l2 else None',
  '        return dummy.next',
];

const lineMap = { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 11, 11: 12, 12: 13, 13: 14 };

const steps1 = [
  { lineNum: 1, phase: 'init', description: '创建哑节点 dummy = ListNode(0)', l1: [2,4,3], l2: [5,6,4], l1Idx: 0, l2Idx: 0, carry: 0, val1: null, val2: null, total: null, result: [] },
  { lineNum: 2, phase: 'init', description: 'cur 指向 dummy，carry 初始化为 0', l1: [2,4,3], l2: [5,6,4], l1Idx: 0, l2Idx: 0, carry: 0, val1: null, val2: null, total: null, result: [] },
  { lineNum: 3, phase: 'init', description: 'carry = 0，初始化进位为 0', l1: [2,4,3], l2: [5,6,4], l1Idx: 0, l2Idx: 0, carry: 0, val1: null, val2: null, total: null, result: [] },
  { lineNum: 4, phase: 'loop', description: '进入循环：l1、l2 都不为空，继续', l1: [2,4,3], l2: [5,6,4], l1Idx: 0, l2Idx: 0, carry: 0, val1: null, val2: null, total: null, result: [] },
  { lineNum: 5, phase: 'digit', description: '取 l1 当前值 val1 = 2', l1: [2,4,3], l2: [5,6,4], l1Idx: 0, l2Idx: 0, carry: 0, val1: 2, val2: null, total: null, result: [] },
  { lineNum: 6, phase: 'digit', description: '取 l2 当前值 val2 = 5', l1: [2,4,3], l2: [5,6,4], l1Idx: 0, l2Idx: 0, carry: 0, val1: 2, val2: 5, total: null, result: [] },
  { lineNum: 7, phase: 'calc', description: '计算 total = 2 + 5 + 0 = 7', l1: [2,4,3], l2: [5,6,4], l1Idx: 0, l2Idx: 0, carry: 0, val1: 2, val2: 5, total: 7, result: [] },
  { lineNum: 8, phase: 'calc', description: '计算进位 carry = 7 // 10 = 0', l1: [2,4,3], l2: [5,6,4], l1Idx: 0, l2Idx: 0, carry: 0, val1: 2, val2: 5, total: 7, result: [] },
  { lineNum: 9, phase: 'build', description: '创建新节点 val = 7 % 10 = 7，加入结果链表', l1: [2,4,3], l2: [5,6,4], l1Idx: 0, l2Idx: 0, carry: 0, val1: 2, val2: 5, total: 7, result: [7] },
  { lineNum: 10, phase: 'advance', description: 'cur 前进到新节点', l1: [2,4,3], l2: [5,6,4], l1Idx: 0, l2Idx: 0, carry: 0, val1: 2, val2: 5, total: 7, result: [7] },
  { lineNum: 11, phase: 'advance', description: 'l1 前进到下一节点', l1: [2,4,3], l2: [5,6,4], l1Idx: 1, l2Idx: 0, carry: 0, val1: null, val2: null, total: null, result: [7] },
  { lineNum: 12, phase: 'advance', description: 'l2 前进到下一节点', l1: [2,4,3], l2: [5,6,4], l1Idx: 1, l2Idx: 1, carry: 0, val1: null, val2: null, total: null, result: [7] },
  { lineNum: 5, phase: 'digit', description: '第二轮：取 val1 = 4', l1: [2,4,3], l2: [5,6,4], l1Idx: 1, l2Idx: 1, carry: 0, val1: 4, val2: null, total: null, result: [7] },
  { lineNum: 6, phase: 'digit', description: '取 val2 = 6', l1: [2,4,3], l2: [5,6,4], l1Idx: 1, l2Idx: 1, carry: 0, val1: 4, val2: 6, total: null, result: [7] },
  { lineNum: 7, phase: 'calc', description: '计算 total = 4 + 6 + 0 = 10', l1: [2,4,3], l2: [5,6,4], l1Idx: 1, l2Idx: 1, carry: 0, val1: 4, val2: 6, total: 10, result: [7] },
  { lineNum: 8, phase: 'calc', description: '计算进位 carry = 10 // 10 = 1，产生进位!', l1: [2,4,3], l2: [5,6,4], l1Idx: 1, l2Idx: 1, carry: 1, val1: 4, val2: 6, total: 10, result: [7] },
  { lineNum: 9, phase: 'build', description: '创建新节点 val = 10 % 10 = 0，加入结果链表', l1: [2,4,3], l2: [5,6,4], l1Idx: 1, l2Idx: 1, carry: 1, val1: 4, val2: 6, total: 10, result: [7, 0] },
  { lineNum: 11, phase: 'advance', description: 'l1 前进到下一节点', l1: [2,4,3], l2: [5,6,4], l1Idx: 2, l2Idx: 1, carry: 1, val1: null, val2: null, total: null, result: [7, 0] },
  { lineNum: 12, phase: 'advance', description: 'l2 前进到下一节点', l1: [2,4,3], l2: [5,6,4], l1Idx: 2, l2Idx: 2, carry: 1, val1: null, val2: null, total: null, result: [7, 0] },
  { lineNum: 5, phase: 'digit', description: '第三轮：取 val1 = 3', l1: [2,4,3], l2: [5,6,4], l1Idx: 2, l2Idx: 2, carry: 1, val1: 3, val2: null, total: null, result: [7, 0] },
  { lineNum: 6, phase: 'digit', description: '取 val2 = 4', l1: [2,4,3], l2: [5,6,4], l1Idx: 2, l2Idx: 2, carry: 1, val1: 3, val2: 4, total: null, result: [7, 0] },
  { lineNum: 7, phase: 'calc', description: '计算 total = 3 + 4 + 1(进位) = 8', l1: [2,4,3], l2: [5,6,4], l1Idx: 2, l2Idx: 2, carry: 1, val1: 3, val2: 4, total: 8, result: [7, 0] },
  { lineNum: 8, phase: 'calc', description: '计算进位 carry = 8 // 10 = 0，无进位', l1: [2,4,3], l2: [5,6,4], l1Idx: 2, l2Idx: 2, carry: 0, val1: 3, val2: 4, total: 8, result: [7, 0] },
  { lineNum: 9, phase: 'build', description: '创建新节点 val = 8 % 10 = 8，加入结果链表', l1: [2,4,3], l2: [5,6,4], l1Idx: 2, l2Idx: 2, carry: 0, val1: 3, val2: 4, total: 8, result: [7, 0, 8] },
  { lineNum: 4, phase: 'loop', description: '循环条件检查：l1=None, l2=None, carry=0，退出循环', l1: [2,4,3], l2: [5,6,4], l1Idx: 3, l2Idx: 3, carry: 0, val1: null, val2: null, total: null, result: [7, 0, 8] },
  { lineNum: 13, phase: 'done', description: '返回 dummy.next，结果 [7,0,8] 即 342+465=807', l1: [2,4,3], l2: [5,6,4], l1Idx: 3, l2Idx: 3, carry: 0, val1: null, val2: null, total: null, result: [7, 0, 8] },
];

// Test case 2: [9,9] + [1] → [0,0,1]  (99 + 1 = 100)
const steps2 = [
  { lineNum: 1, phase: 'init', description: '创建哑节点 dummy = ListNode(0)，carry = 0', l1: [9,9], l2: [1], l1Idx: 0, l2Idx: 0, carry: 0, val1: null, val2: null, total: null, result: [] },
  { lineNum: 4, phase: 'loop', description: '进入循环：l1 和 l2 都不为空', l1: [9,9], l2: [1], l1Idx: 0, l2Idx: 0, carry: 0, val1: null, val2: null, total: null, result: [] },
  { lineNum: 5, phase: 'digit', description: '取 val1 = 9', l1: [9,9], l2: [1], l1Idx: 0, l2Idx: 0, carry: 0, val1: 9, val2: null, total: null, result: [] },
  { lineNum: 6, phase: 'digit', description: '取 val2 = 1', l1: [9,9], l2: [1], l1Idx: 0, l2Idx: 0, carry: 0, val1: 9, val2: 1, total: null, result: [] },
  { lineNum: 7, phase: 'calc', description: '计算 total = 9 + 1 + 0 = 10', l1: [9,9], l2: [1], l1Idx: 0, l2Idx: 0, carry: 0, val1: 9, val2: 1, total: 10, result: [] },
  { lineNum: 8, phase: 'calc', description: '计算进位 carry = 10 // 10 = 1，产生进位!', l1: [9,9], l2: [1], l1Idx: 0, l2Idx: 0, carry: 1, val1: 9, val2: 1, total: 10, result: [] },
  { lineNum: 9, phase: 'build', description: '创建新节点 val = 10 % 10 = 0', l1: [9,9], l2: [1], l1Idx: 0, l2Idx: 0, carry: 1, val1: 9, val2: 1, total: 10, result: [0] },
  { lineNum: 11, phase: 'advance', description: 'l1 前进，l2 前进到 None', l1: [9,9], l2: [1], l1Idx: 1, l2Idx: 1, carry: 1, val1: null, val2: null, total: null, result: [0] },
  { lineNum: 4, phase: 'loop', description: '循环继续：l1 不为空，carry=1', l1: [9,9], l2: [1], l1Idx: 1, l2Idx: 1, carry: 1, val1: null, val2: null, total: null, result: [0] },
  { lineNum: 5, phase: 'digit', description: '取 val1 = 9，l2 为空所以 val2 = 0', l1: [9,9], l2: [1], l1Idx: 1, l2Idx: 1, carry: 1, val1: 9, val2: 0, total: null, result: [0] },
  { lineNum: 7, phase: 'calc', description: '计算 total = 9 + 0 + 1(进位) = 10', l1: [9,9], l2: [1], l1Idx: 1, l2Idx: 1, carry: 1, val1: 9, val2: 0, total: 10, result: [0] },
  { lineNum: 8, phase: 'calc', description: '计算进位 carry = 10 // 10 = 1，再次产生进位!', l1: [9,9], l2: [1], l1Idx: 1, l2Idx: 1, carry: 1, val1: 9, val2: 0, total: 10, result: [0] },
  { lineNum: 9, phase: 'build', description: '创建新节点 val = 10 % 10 = 0', l1: [9,9], l2: [1], l1Idx: 1, l2Idx: 1, carry: 1, val1: 9, val2: 0, total: 10, result: [0, 0] },
  { lineNum: 11, phase: 'advance', description: 'l1 前进到 None', l1: [9,9], l2: [1], l1Idx: 2, l2Idx: 1, carry: 1, val1: null, val2: null, total: null, result: [0, 0] },
  { lineNum: 4, phase: 'loop', description: '循环继续：l1=None, l2=None, 但 carry=1', l1: [9,9], l2: [1], l1Idx: 2, l2Idx: 1, carry: 1, val1: null, val2: null, total: null, result: [0, 0] },
  { lineNum: 7, phase: 'calc', description: '计算 total = 0 + 0 + 1(进位) = 1', l1: [9,9], l2: [1], l1Idx: 2, l2Idx: 1, carry: 1, val1: 0, val2: 0, total: 1, result: [0, 0] },
  { lineNum: 9, phase: 'build', description: '创建新节点 val = 1，进位处理完成', l1: [9,9], l2: [1], l1Idx: 2, l2Idx: 1, carry: 0, val1: 0, val2: 0, total: 1, result: [0, 0, 1] },
  { lineNum: 13, phase: 'done', description: '返回 [0,0,1] 即 99 + 1 = 100', l1: [9,9], l2: [1], l1Idx: 2, l2Idx: 1, carry: 0, val1: null, val2: null, total: null, result: [0, 0, 1] },
];

const phaseLabels = { init: '初始化', loop: '循环', digit: '取值', calc: '计算', build: '构建', advance: '前进', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">链表 l1（蓝色=当前处理位）</div>
      <div class="ll-container" id="ll-l1"></div>
    </div>
    <div class="card">
      <div class="section-title">链表 l2（蓝色=当前处理位）</div>
      <div class="ll-container" id="ll-l2"></div>
    </div>
    <div class="card">
      <div class="section-title">计算过程</div>
      <div id="calc-area" style="font-family:var(--font-mono);font-size:14px;padding:8px 0;color:var(--text)"></div>
    </div>
    <div class="card">
      <div class="section-title">结果链表（橙色=进位节点）</div>
      <div class="ll-container" id="ll-result"></div>
    </div>
    <div class="legend-row" style="margin-top:8px">
      <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>当前处理</div>
      <div class="legend-item"><div class="legend-dot" style="background:rgba(249,115,22,0.4);border:1px solid #f97316"></div>有进位</div>
      <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>已完成</div>
    </div>
  `;
}

export default {
  title: '2. Add Two Numbers',
  problemDesc: `
    <p>给你两个非空的链表，表示两个非负的整数。它们每位数字都是按照逆序的方式存储的，并且每个节点只能存储一位数字。</p>
    <div class="example">输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807</div>
    <p>提示：每个链表中的节点数在范围 <code>[1, 100]</code> 内。</p>
  `,
  subtitle: `l1 = [${L1}] (342), l2 = [${L2}] (465) => 807`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '[2,4,3] + [5,6,4]', steps: steps1, subtitle: 'l1 = [2,4,3] (342), l2 = [5,6,4] (465) => 807' },
    { name: '[9,9] + [1] (进位)', steps: steps2, subtitle: 'l1 = [9,9] (99), l2 = [1] (1) => 100', setup(panel) { setupPanel(panel); } },
  ],

  setup(panel) { setupPanel(panel); },

  render(s) {
    const l1 = s.l1 || L1;
    const l2 = s.l2 || L2;

    // Render l1
    const l1El = document.getElementById('ll-l1');
    let l1Html = '';
    l1.forEach((v, i) => {
      let cls = 'll-node';
      if (i < s.l1Idx) cls += ' is-merged';
      else if (i === s.l1Idx) cls += ' is-current';
      l1Html += `<div class="${cls}"><div class="ll-val">${v}</div>`;
      if (i < l1.length - 1) l1Html += '<div class="ll-arrow"></div>';
      l1Html += '</div>';
    });
    l1Html += '<div class="ll-arrow"></div><div class="ll-null">NULL</div>';
    l1El.innerHTML = l1Html;

    // Render l2
    const l2El = document.getElementById('ll-l2');
    let l2Html = '';
    l2.forEach((v, i) => {
      let cls = 'll-node';
      if (i < s.l2Idx) cls += ' is-merged';
      else if (i === s.l2Idx) cls += ' is-current';
      l2Html += `<div class="${cls}"><div class="ll-val">${v}</div>`;
      if (i < l2.length - 1) l2Html += '<div class="ll-arrow"></div>';
      l2Html += '</div>';
    });
    l2Html += '<div class="ll-arrow"></div><div class="ll-null">NULL</div>';
    l2El.innerHTML = l2Html;

    // Calc area
    const calcEl = document.getElementById('calc-area');
    if (s.val1 !== null || s.val2 !== null) {
      const v1 = s.val1 !== null ? s.val1 : '?';
      const v2 = s.val2 !== null ? s.val2 : '?';
      const carryStr = s.carry > 0 ? ` + ${s.carry}<span style="color:#f97316">(carry)</span>` : '';
      const totalStr = s.total !== null ? ` = <strong>${s.total}</strong>` : '';
      calcEl.innerHTML = `${v1} + ${v2}${carryStr}${totalStr}`;
      if (s.carry > 0) {
        calcEl.innerHTML += `<br><span style="color:#f97316;font-size:12px">carry = ${s.carry}</span>`;
      }
    } else if (s.phase === 'done') {
      const r = s.result;
      const num = parseInt(r.slice().reverse().join(''));
      calcEl.innerHTML = `<span style="color:#4ade80">结果 = ${num}</span>`;
    } else {
      calcEl.innerHTML = '<span style="color:var(--text-muted)">(等待计算)</span>';
    }

    // Render result
    const rEl = document.getElementById('ll-result');
    if (s.result.length === 0) {
      rEl.innerHTML = '<div class="ll-null">(空)</div>';
    } else {
      let rHtml = '';
      s.result.forEach((v, i) => {
        let cls = 'll-node is-merged';
        if (i === s.result.length - 1 && s.phase === 'build') cls += ' is-current';
        if (s.carry > 0 && i === s.result.length - 1) cls = 'll-node is-carry';
        rHtml += `<div class="${cls}"><div class="ll-val">${v}</div>`;
        if (i < s.result.length - 1) rHtml += '<div class="ll-arrow"></div>';
        rHtml += '</div>';
      });
      rHtml += '<div class="ll-arrow"></div><div class="ll-null">NULL</div>';
      rEl.innerHTML = rHtml;
    }
  },
};
