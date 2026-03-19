let LISTS = [[1,4,5],[1,3,4],[2,6]];

const code = [
  'class Solution:',
  '    def mergeKLists(self, lists):',
  '        if not lists: return None',
  '        while len(lists) > 1:',
  '            merged = []',
  '            for i in range(0, len(lists), 2):',
  '                l1 = lists[i]',
  '                l2 = lists[i+1] if i+1 < len(lists) else None',
  '                merged.append(self.merge2(l1, l2))',
  '            lists = merged',
  '        return lists[0]',
  '',
  '    def merge2(self, l1, l2):',
  '        dummy = ListNode(0)',
  '        curr = dummy',
  '        while l1 and l2:',
  '            if l1.val <= l2.val:',
  '                curr.next = l1; l1 = l1.next',
  '            else:',
  '                curr.next = l2; l2 = l2.next',
  '            curr = curr.next',
  '        curr.next = l1 or l2',
  '        return dummy.next',
];

const lineMap = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 12: 11, 13: 12, 14: 13, 15: 14, 16: 15, 17: 16, 18: 17, 19: 18, 20: 19, 21: 20 };

// ── Test Case 1: lists = [[1,4,5],[1,3,4],[2,6]] ──
// Round 1: merge [1,4,5]+[1,3,4] → [1,1,3,4,4,5], keep [2,6]
// Round 2: merge [1,1,3,4,4,5]+[2,6] → [1,1,2,3,4,4,5,6]
const steps1 = [
  { lineNum: 2, phase: 'init', description: '输入 3 个有序链表: [1,4,5], [1,3,4], [2,6]', lists: [[1,4,5],[1,3,4],[2,6]], merging: [], merged: [], result: [], round: 0 },
  { lineNum: 3, phase: 'init', description: 'len(lists)=3 > 1，进入分治合并循环', lists: [[1,4,5],[1,3,4],[2,6]], merging: [], merged: [], result: [], round: 0 },
  { lineNum: 5, phase: 'merge', description: '第一轮: 两两配对，合并 lists[0]=[1,4,5] 和 lists[1]=[1,3,4]', lists: [[1,4,5],[1,3,4],[2,6]], merging: [0,1], merged: [], result: [], round: 1 },
  { lineNum: 16, phase: 'merge', description: '比较 1 <= 1，取 l1 的 1', lists: [[1,4,5],[1,3,4],[2,6]], merging: [0,1], merged: [1], result: [], round: 1 },
  { lineNum: 16, phase: 'merge', description: '比较 4 > 1，取 l2 的 1', lists: [[1,4,5],[1,3,4],[2,6]], merging: [0,1], merged: [1,1], result: [], round: 1 },
  { lineNum: 16, phase: 'merge', description: '比较 4 > 3，取 l2 的 3', lists: [[1,4,5],[1,3,4],[2,6]], merging: [0,1], merged: [1,1,3], result: [], round: 1 },
  { lineNum: 16, phase: 'merge', description: '比较 4 <= 4，取 l1 的 4', lists: [[1,4,5],[1,3,4],[2,6]], merging: [0,1], merged: [1,1,3,4], result: [], round: 1 },
  { lineNum: 16, phase: 'merge', description: '比较 5 > 4，取 l2 的 4', lists: [[1,4,5],[1,3,4],[2,6]], merging: [0,1], merged: [1,1,3,4,4], result: [], round: 1 },
  { lineNum: 21, phase: 'merge', description: 'l2 耗尽，追加 l1 剩余 [5]。合并结果: [1,1,3,4,4,5]', lists: [[1,4,5],[1,3,4],[2,6]], merging: [0,1], merged: [1,1,3,4,4,5], result: [], round: 1 },
  { lineNum: 8, phase: 'merge', description: 'lists[2]=[2,6] 无配对，直接加入 merged', lists: [[1,1,3,4,4,5],[2,6]], merging: [], merged: [], result: [], round: 1 },
  { lineNum: 3, phase: 'merge', description: '第一轮结束，lists = [[1,1,3,4,4,5], [2,6]]，继续合并', lists: [[1,1,3,4,4,5],[2,6]], merging: [], merged: [], result: [], round: 1 },
  { lineNum: 5, phase: 'merge', description: '第二轮: 合并 [1,1,3,4,4,5] 和 [2,6]', lists: [[1,1,3,4,4,5],[2,6]], merging: [0,1], merged: [], result: [], round: 2 },
  { lineNum: 16, phase: 'merge', description: '比较 1 <= 2，取 1', lists: [[1,1,3,4,4,5],[2,6]], merging: [0,1], merged: [1], result: [], round: 2 },
  { lineNum: 16, phase: 'merge', description: '比较 1 <= 2，取 1', lists: [[1,1,3,4,4,5],[2,6]], merging: [0,1], merged: [1,1], result: [], round: 2 },
  { lineNum: 16, phase: 'merge', description: '比较 3 > 2，取 2', lists: [[1,1,3,4,4,5],[2,6]], merging: [0,1], merged: [1,1,2], result: [], round: 2 },
  { lineNum: 16, phase: 'merge', description: '比较 3 <= 6，取 3', lists: [[1,1,3,4,4,5],[2,6]], merging: [0,1], merged: [1,1,2,3], result: [], round: 2 },
  { lineNum: 16, phase: 'merge', description: '比较 4 <= 6，取 4', lists: [[1,1,3,4,4,5],[2,6]], merging: [0,1], merged: [1,1,2,3,4], result: [], round: 2 },
  { lineNum: 16, phase: 'merge', description: '比较 4 <= 6，取 4', lists: [[1,1,3,4,4,5],[2,6]], merging: [0,1], merged: [1,1,2,3,4,4], result: [], round: 2 },
  { lineNum: 16, phase: 'merge', description: '比较 5 <= 6，取 5', lists: [[1,1,3,4,4,5],[2,6]], merging: [0,1], merged: [1,1,2,3,4,4,5], result: [], round: 2 },
  { lineNum: 21, phase: 'merge', description: 'l1 耗尽，追加 l2 剩余 [6]。合并结果: [1,1,2,3,4,4,5,6]', lists: [[1,1,3,4,4,5],[2,6]], merging: [0,1], merged: [1,1,2,3,4,4,5,6], result: [], round: 2 },
  { lineNum: 10, phase: 'done', description: 'len(lists)=1，返回最终结果 [1,1,2,3,4,4,5,6]', lists: [[1,1,2,3,4,4,5,6]], merging: [], merged: [], result: [1,1,2,3,4,4,5,6], round: 2 },
];

// ── Test Case 2: lists = [[],[1],[2,3]] ──
const steps2 = [
  { lineNum: 2, phase: 'init', description: '输入 3 个链表: [], [1], [2,3]', lists: [[],[1],[2,3]], merging: [], merged: [], result: [], round: 0 },
  { lineNum: 3, phase: 'init', description: 'len(lists)=3 > 1，进入分治循环', lists: [[],[1],[2,3]], merging: [], merged: [], result: [], round: 0 },
  { lineNum: 5, phase: 'merge', description: '第一轮: 合并 lists[0]=[] 和 lists[1]=[1]', lists: [[],[1],[2,3]], merging: [0,1], merged: [], result: [], round: 1 },
  { lineNum: 21, phase: 'merge', description: 'l1 为空，直接返回 l2=[1]', lists: [[],[1],[2,3]], merging: [0,1], merged: [1], result: [], round: 1 },
  { lineNum: 8, phase: 'merge', description: 'lists[2]=[2,3] 无配对，直接加入', lists: [[1],[2,3]], merging: [], merged: [], result: [], round: 1 },
  { lineNum: 3, phase: 'merge', description: '第一轮结束，lists = [[1], [2,3]]', lists: [[1],[2,3]], merging: [], merged: [], result: [], round: 1 },
  { lineNum: 5, phase: 'merge', description: '第二轮: 合并 [1] 和 [2,3]', lists: [[1],[2,3]], merging: [0,1], merged: [], result: [], round: 2 },
  { lineNum: 16, phase: 'merge', description: '比较 1 <= 2，取 1', lists: [[1],[2,3]], merging: [0,1], merged: [1], result: [], round: 2 },
  { lineNum: 21, phase: 'merge', description: 'l1 耗尽，追加 l2 剩余 [2,3]。结果: [1,2,3]', lists: [[1],[2,3]], merging: [0,1], merged: [1,2,3], result: [], round: 2 },
  { lineNum: 10, phase: 'done', description: 'len(lists)=1，返回最终结果 [1,2,3]', lists: [[1,2,3]], merging: [], merged: [], result: [1,2,3], round: 2 },
];

const phaseLabels = { init: '初始化', merge: '合并', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">链表数组 lists</div>
      <div id="lists-display" style="display:flex;flex-direction:column;gap:8px"></div>
    </div>
    <div class="card">
      <div class="section-title">当前合并进度</div>
      <div class="ll-container" id="merge-progress"></div>
    </div>
    <div class="card">
      <div class="section-title">最终结果</div>
      <div class="ll-container" id="merge-result"></div>
    </div>
    <div class="legend-row" style="margin-top:8px">
      <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>正在合并</div>
      <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>已合并</div>
    </div>
  `;
}

export default {
  title: '23. Merge k Sorted Lists',
  problemDesc: `
    <p>给你一个链表数组，每个链表都已经按升序排列。请你将所有链表合并到一个升序链表中，返回合并后的链表。</p>
    <div class="example">输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]</div>
    <p>提示：可以使用分治法，两两合并链表。</p>
  `,
  subtitle: `lists = [${LISTS.map(l => '[' + l + ']').join(',')}]`,
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'lists=[[1,4,5],[1,3,4],[2,6]]', steps: steps1, subtitle: 'lists = [[1,4,5],[1,3,4],[2,6]]' },
    {
      name: 'lists=[[],[1],[2,3]]', steps: steps2, subtitle: 'lists = [[],[1],[2,3]]',
      setup(panel) { LISTS = [[],[1],[2,3]]; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const lists = s.lists || LISTS;
    const mergingSet = new Set(s.merging || []);

    // Lists display
    const listsEl = document.getElementById('lists-display');
    let listsHtml = '';
    lists.forEach((list, i) => {
      const isMerging = mergingSet.has(i);
      let rowHtml = `<div style="display:flex;align-items:center;gap:6px">`;
      rowHtml += `<span style="font-family:var(--font-mono);font-size:12px;color:var(--text-muted);min-width:50px">lists[${i}]</span>`;
      rowHtml += `<div class="ll-container" style="margin:0">`;
      if (list.length === 0) {
        rowHtml += '<span style="color:var(--text-muted);font-size:12px">空</span>';
      } else {
        list.forEach((v, j) => {
          let cls = 'll-node';
          if (isMerging) cls += ' is-current';
          rowHtml += `<div class="${cls}" style="min-width:28px"><div class="ll-val" style="font-size:12px">${v}</div>`;
          if (j < list.length - 1) rowHtml += '<div class="ll-arrow"></div>';
          rowHtml += '</div>';
        });
      }
      rowHtml += '</div></div>';
      listsHtml += rowHtml;
    });
    listsEl.innerHTML = listsHtml;

    // Merge progress
    const progEl = document.getElementById('merge-progress');
    if (s.merged && s.merged.length > 0) {
      let progHtml = '';
      s.merged.forEach((v, i) => {
        progHtml += `<div class="ll-node is-merged"><div class="ll-val" style="font-size:12px">${v}</div>`;
        if (i < s.merged.length - 1) progHtml += '<div class="ll-arrow"></div>';
        progHtml += '</div>';
      });
      progEl.innerHTML = progHtml;
    } else {
      progEl.innerHTML = '<span style="color:var(--text-muted);font-size:13px">—</span>';
    }

    // Result
    const resEl = document.getElementById('merge-result');
    if (s.result && s.result.length > 0) {
      let resHtml = '';
      s.result.forEach((v, i) => {
        resHtml += `<div class="ll-node is-merged"><div class="ll-val" style="font-size:12px">${v}</div>`;
        if (i < s.result.length - 1) resHtml += '<div class="ll-arrow"></div>';
        resHtml += '</div>';
      });
      resHtml += '<div class="ll-arrow"></div><div class="ll-null">NULL</div>';
      resEl.innerHTML = resHtml;
    } else {
      resEl.innerHTML = '<span style="color:var(--text-muted);font-style:italic">(进行中...)</span>';
    }
  },
};
