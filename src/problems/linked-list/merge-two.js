let LIST1 = [1, 2, 4];
let LIST2 = [1, 3, 4];

const code = [
  'class Solution:',
  '    def mergeTwoLists(self, list1, list2):',
  '        dummy = ListNode(-1)',
  '        cur = dummy',
  '        while list1 and list2:',
  '            if list1.val <= list2.val:',
  '                cur.next = list1',
  '                list1 = list1.next',
  '            else:',
  '                cur.next = list2',
  '                list2 = list2.next',
  '            cur = cur.next',
  '        cur.next = list1 if list1 else list2',
  '        return dummy.next',
];

const lineMap = { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 10, 9: 11, 10: 12, 11: 13 };

const steps1 = [
  { lineNum: 1, phase: 'init', description: '创建哑节点 dummy = ListNode(-1)，作为合并链表的头前节点', list1: [1,2,4], list2: [1,3,4], l1Idx: 0, l2Idx: 0, merged: [], curPick: null, pickFrom: null },
  { lineNum: 2, phase: 'init', description: 'cur 指向 dummy，后续从 cur.next 开始接入节点', list1: [1,2,4], list2: [1,3,4], l1Idx: 0, l2Idx: 0, merged: [], curPick: null, pickFrom: null },
  { lineNum: 3, phase: 'compare', description: '进入循环：list1 和 list2 都不为空，开始比较', list1: [1,2,4], list2: [1,3,4], l1Idx: 0, l2Idx: 0, merged: [], curPick: null, pickFrom: null },
  { lineNum: 4, phase: 'compare', description: '比较 list1.val=1 <= list2.val=1，条件成立', list1: [1,2,4], list2: [1,3,4], l1Idx: 0, l2Idx: 0, merged: [], curPick: 1, pickFrom: 'l1' },
  { lineNum: 5, phase: 'pick', description: '将 list1 节点(值=1)接入合并链表', list1: [1,2,4], list2: [1,3,4], l1Idx: 0, l2Idx: 0, merged: [1], curPick: 1, pickFrom: 'l1' },
  { lineNum: 6, phase: 'pick', description: 'list1 前进到下一个节点 list1=list1.next', list1: [1,2,4], list2: [1,3,4], l1Idx: 1, l2Idx: 0, merged: [1], curPick: null, pickFrom: null },
  { lineNum: 10, phase: 'advance', description: 'cur 前进到下一个节点，准备下一轮比较', list1: [1,2,4], list2: [1,3,4], l1Idx: 1, l2Idx: 0, merged: [1], curPick: null, pickFrom: null },
  { lineNum: 3, phase: 'compare', description: '继续循环：list1 和 list2 都不为空', list1: [1,2,4], list2: [1,3,4], l1Idx: 1, l2Idx: 0, merged: [1], curPick: null, pickFrom: null },
  { lineNum: 4, phase: 'compare', description: '比较 list1.val=2 > list2.val=1，条件不成立，进入 else', list1: [1,2,4], list2: [1,3,4], l1Idx: 1, l2Idx: 0, merged: [1], curPick: 1, pickFrom: 'l2' },
  { lineNum: 8, phase: 'pick', description: '将 list2 节点(值=1)接入合并链表', list1: [1,2,4], list2: [1,3,4], l1Idx: 1, l2Idx: 0, merged: [1, 1], curPick: 1, pickFrom: 'l2' },
  { lineNum: 9, phase: 'pick', description: 'list2 前进到下一个节点 list2=list2.next', list1: [1,2,4], list2: [1,3,4], l1Idx: 1, l2Idx: 1, merged: [1, 1], curPick: null, pickFrom: null },
  { lineNum: 10, phase: 'advance', description: 'cur 前进到下一个节点', list1: [1,2,4], list2: [1,3,4], l1Idx: 1, l2Idx: 1, merged: [1, 1], curPick: null, pickFrom: null },
  { lineNum: 4, phase: 'compare', description: '比较 list1.val=2 <= list2.val=3，条件成立', list1: [1,2,4], list2: [1,3,4], l1Idx: 1, l2Idx: 1, merged: [1, 1], curPick: 2, pickFrom: 'l1' },
  { lineNum: 5, phase: 'pick', description: '将 list1 节点(值=2)接入合并链表', list1: [1,2,4], list2: [1,3,4], l1Idx: 1, l2Idx: 1, merged: [1, 1, 2], curPick: 2, pickFrom: 'l1' },
  { lineNum: 6, phase: 'pick', description: 'list1 前进到下一个节点', list1: [1,2,4], list2: [1,3,4], l1Idx: 2, l2Idx: 1, merged: [1, 1, 2], curPick: null, pickFrom: null },
  { lineNum: 10, phase: 'advance', description: 'cur 前进', list1: [1,2,4], list2: [1,3,4], l1Idx: 2, l2Idx: 1, merged: [1, 1, 2], curPick: null, pickFrom: null },
  { lineNum: 4, phase: 'compare', description: '比较 list1.val=4 > list2.val=3，条件不成立', list1: [1,2,4], list2: [1,3,4], l1Idx: 2, l2Idx: 1, merged: [1, 1, 2], curPick: 3, pickFrom: 'l2' },
  { lineNum: 8, phase: 'pick', description: '将 list2 节点(值=3)接入合并链表', list1: [1,2,4], list2: [1,3,4], l1Idx: 2, l2Idx: 1, merged: [1, 1, 2, 3], curPick: 3, pickFrom: 'l2' },
  { lineNum: 9, phase: 'pick', description: 'list2 前进到下一个节点', list1: [1,2,4], list2: [1,3,4], l1Idx: 2, l2Idx: 2, merged: [1, 1, 2, 3], curPick: null, pickFrom: null },
  { lineNum: 10, phase: 'advance', description: 'cur 前进', list1: [1,2,4], list2: [1,3,4], l1Idx: 2, l2Idx: 2, merged: [1, 1, 2, 3], curPick: null, pickFrom: null },
  { lineNum: 4, phase: 'compare', description: '比较 list1.val=4 <= list2.val=4，条件成立', list1: [1,2,4], list2: [1,3,4], l1Idx: 2, l2Idx: 2, merged: [1, 1, 2, 3], curPick: 4, pickFrom: 'l1' },
  { lineNum: 5, phase: 'pick', description: '将 list1 节点(值=4)接入合并链表', list1: [1,2,4], list2: [1,3,4], l1Idx: 2, l2Idx: 2, merged: [1, 1, 2, 3, 4], curPick: 4, pickFrom: 'l1' },
  { lineNum: 6, phase: 'pick', description: 'list1 已遍历完，list1=None', list1: [1,2,4], list2: [1,3,4], l1Idx: 3, l2Idx: 2, merged: [1, 1, 2, 3, 4], curPick: null, pickFrom: null },
  { lineNum: 10, phase: 'advance', description: 'cur 前进', list1: [1,2,4], list2: [1,3,4], l1Idx: 3, l2Idx: 2, merged: [1, 1, 2, 3, 4], curPick: null, pickFrom: null },
  { lineNum: 3, phase: 'tail', description: '循环结束：list1 为空，退出 while 循环', list1: [1,2,4], list2: [1,3,4], l1Idx: 3, l2Idx: 2, merged: [1, 1, 2, 3, 4], curPick: null, pickFrom: null },
  { lineNum: 11, phase: 'tail', description: 'list1 为空，将剩余的 list2 (值=4) 接入合并链表尾部', list1: [1,2,4], list2: [1,3,4], l1Idx: 3, l2Idx: 2, merged: [1, 1, 2, 3, 4, 4], curPick: 4, pickFrom: 'l2' },
  { lineNum: 11, phase: 'done', description: '返回 dummy.next，合并完成：[1,1,2,3,4,4]', list1: [1,2,4], list2: [1,3,4], l1Idx: 3, l2Idx: 3, merged: [1, 1, 2, 3, 4, 4], curPick: null, pickFrom: null },
];

// Test case 2: [1,3,5] + [2,4]
const steps2 = [
  { lineNum: 1, phase: 'init', description: '创建哑节点 dummy = ListNode(-1)', list1: [1,3,5], list2: [2,4], l1Idx: 0, l2Idx: 0, merged: [], curPick: null, pickFrom: null },
  { lineNum: 2, phase: 'init', description: 'cur 指向 dummy', list1: [1,3,5], list2: [2,4], l1Idx: 0, l2Idx: 0, merged: [], curPick: null, pickFrom: null },
  { lineNum: 4, phase: 'compare', description: '比较 list1.val=1 <= list2.val=2，条件成立', list1: [1,3,5], list2: [2,4], l1Idx: 0, l2Idx: 0, merged: [], curPick: 1, pickFrom: 'l1' },
  { lineNum: 5, phase: 'pick', description: '将 list1 节点(值=1)接入合并链表', list1: [1,3,5], list2: [2,4], l1Idx: 0, l2Idx: 0, merged: [1], curPick: 1, pickFrom: 'l1' },
  { lineNum: 6, phase: 'pick', description: 'list1 前进: list1=list1.next', list1: [1,3,5], list2: [2,4], l1Idx: 1, l2Idx: 0, merged: [1], curPick: null, pickFrom: null },
  { lineNum: 4, phase: 'compare', description: '比较 list1.val=3 > list2.val=2，进入 else', list1: [1,3,5], list2: [2,4], l1Idx: 1, l2Idx: 0, merged: [1], curPick: 2, pickFrom: 'l2' },
  { lineNum: 8, phase: 'pick', description: '将 list2 节点(值=2)接入合并链表', list1: [1,3,5], list2: [2,4], l1Idx: 1, l2Idx: 0, merged: [1, 2], curPick: 2, pickFrom: 'l2' },
  { lineNum: 9, phase: 'pick', description: 'list2 前进: list2=list2.next', list1: [1,3,5], list2: [2,4], l1Idx: 1, l2Idx: 1, merged: [1, 2], curPick: null, pickFrom: null },
  { lineNum: 4, phase: 'compare', description: '比较 list1.val=3 <= list2.val=4，条件成立', list1: [1,3,5], list2: [2,4], l1Idx: 1, l2Idx: 1, merged: [1, 2], curPick: 3, pickFrom: 'l1' },
  { lineNum: 5, phase: 'pick', description: '将 list1 节点(值=3)接入合并链表', list1: [1,3,5], list2: [2,4], l1Idx: 1, l2Idx: 1, merged: [1, 2, 3], curPick: 3, pickFrom: 'l1' },
  { lineNum: 6, phase: 'pick', description: 'list1 前进: list1=list1.next', list1: [1,3,5], list2: [2,4], l1Idx: 2, l2Idx: 1, merged: [1, 2, 3], curPick: null, pickFrom: null },
  { lineNum: 4, phase: 'compare', description: '比较 list1.val=5 > list2.val=4，进入 else', list1: [1,3,5], list2: [2,4], l1Idx: 2, l2Idx: 1, merged: [1, 2, 3], curPick: 4, pickFrom: 'l2' },
  { lineNum: 8, phase: 'pick', description: '将 list2 节点(值=4)接入合并链表', list1: [1,3,5], list2: [2,4], l1Idx: 2, l2Idx: 1, merged: [1, 2, 3, 4], curPick: 4, pickFrom: 'l2' },
  { lineNum: 9, phase: 'pick', description: 'list2 遍历完，list2=None', list1: [1,3,5], list2: [2,4], l1Idx: 2, l2Idx: 2, merged: [1, 2, 3, 4], curPick: null, pickFrom: null },
  { lineNum: 11, phase: 'tail', description: 'list2 为空，将剩余 list1 (值=5) 接入尾部', list1: [1,3,5], list2: [2,4], l1Idx: 2, l2Idx: 2, merged: [1, 2, 3, 4, 5], curPick: 5, pickFrom: 'l1' },
  { lineNum: 11, phase: 'done', description: '返回 dummy.next，合并完成：[1,2,3,4,5]', list1: [1,3,5], list2: [2,4], l1Idx: 3, l2Idx: 2, merged: [1, 2, 3, 4, 5], curPick: null, pickFrom: null },
];

const phaseLabels = { init: '初始化', compare: '比较', pick: '选取', advance: '前进', tail: '接尾', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">链表 list1（绿色=已取走，蓝色=当前比较）</div>
      <div class="ll-container" id="ll-list1"></div>
    </div>
    <div class="card">
      <div class="section-title">链表 list2（绿色=已取走，橙色=当前比较）</div>
      <div class="ll-container" id="ll-list2"></div>
    </div>
    <div class="card">
      <div class="section-title">合并结果（绿色=已合并，高亮=刚加入）</div>
      <div class="ll-container" id="ll-merged"></div>
    </div>
    <div class="legend-row" style="margin-top:8px">
      <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>当前 list1 比较</div>
      <div class="legend-item"><div class="legend-dot" style="background:rgba(245,158,11,0.4);border:1px solid #f59e0b"></div>当前 list2 比较</div>
      <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>已合并</div>
    </div>
  `;
}

export default {
  title: '21. Merge Two Sorted Lists',
  problemDesc: `
    <p>将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。</p>
    <div class="example">输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]</div>
    <p>提示：两个链表的节点数目范围是 <code>[0, 50]</code>。</p>
  `,
  subtitle: `list1 = [${LIST1}], list2 = [${LIST2}]`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '[1,2,4] + [1,3,4]', steps: steps1, subtitle: 'list1 = [1,2,4], list2 = [1,3,4]' },
    { name: '[1,3,5] + [2,4]', steps: steps2, subtitle: 'list1 = [1,3,5], list2 = [2,4]', setup(panel) { setupPanel(panel); } },
  ],

  setup(panel) { setupPanel(panel); },

  render(s) {
    const l1 = s.list1 || LIST1;
    const l2 = s.list2 || LIST2;

    // Render list1
    const l1El = document.getElementById('ll-list1');
    let l1Html = '';
    l1.forEach((v, i) => {
      let cls = 'll-node';
      if (i < s.l1Idx) cls += ' is-merged';
      else if (i === s.l1Idx && s.pickFrom === 'l1') cls += ' is-current';
      l1Html += `<div class="${cls}"><div class="ll-val">${v}</div>`;
      if (i < l1.length - 1) l1Html += '<div class="ll-arrow"></div>';
      l1Html += '</div>';
    });
    if (s.l1Idx >= l1.length) l1Html += '<div class="ll-null">NULL</div>';
    else l1Html += '<div class="ll-arrow"></div><div class="ll-null">NULL</div>';
    l1El.innerHTML = l1Html;

    // Render list2
    const l2El = document.getElementById('ll-list2');
    let l2Html = '';
    l2.forEach((v, i) => {
      let cls = 'll-node';
      if (i < s.l2Idx) cls += ' is-merged';
      else if (i === s.l2Idx && s.pickFrom === 'l2') cls += ' is-fast';
      l2Html += `<div class="${cls}"><div class="ll-val">${v}</div>`;
      if (i < l2.length - 1) l2Html += '<div class="ll-arrow"></div>';
      l2Html += '</div>';
    });
    if (s.l2Idx >= l2.length) l2Html += '<div class="ll-null">NULL</div>';
    else l2Html += '<div class="ll-arrow"></div><div class="ll-null">NULL</div>';
    l2El.innerHTML = l2Html;

    // Render merged list
    const mEl = document.getElementById('ll-merged');
    if (s.merged.length === 0) {
      mEl.innerHTML = '<div class="ll-null">（空）</div>';
    } else {
      let mHtml = '';
      s.merged.forEach((v, i) => {
        let cls = 'll-node is-merged';
        if (i === s.merged.length - 1 && s.curPick !== null) cls += ' is-current';
        mHtml += `<div class="${cls}"><div class="ll-val">${v}</div>`;
        if (i < s.merged.length - 1) mHtml += '<div class="ll-arrow"></div>';
        mHtml += '</div>';
      });
      mHtml += '<div class="ll-arrow"></div><div class="ll-null">NULL</div>';
      mEl.innerHTML = mHtml;
    }
  },
};
