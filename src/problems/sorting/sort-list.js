let INPUT_ARR = [4,2,1,3];

const code = [
  'class Solution:',
  '    def sortList(self, head):',
  '        if not head or not head.next:',
  '            return head',
  '        slow,fast=head,head.next',
  '        while fast and fast.next:',
  '            slow=slow.next',
  '            fast=fast.next.next',
  '        mid=slow.next',
  '        slow.next=None',
  '        left=self.sortList(head)',
  '        right=self.sortList(mid)',
  '        return self.merge(left,right)',
  '    def merge(self,l1,l2):',
  '        dummy=ListNode(0)',
  '        cur=dummy',
  '        while l1 and l2:',
  '            if l1.val<=l2.val:',
  '                cur.next=l1; l1=l1.next',
  '            else:',
  '                cur.next=l2; l2=l2.next',
  '            cur=cur.next',
  '        cur.next=l1 or l2',
  '        return dummy.next',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11, 13: 12, 14: 13, 15: 14, 16: 15, 17: 16, 18: 17, 19: 18, 20: 19, 21: 20, 22: 21, 23: 22, 24: 23 };

const steps1 = [
  {"lineNum":3,"phase":"init","description":"初始化链表: 4 → 2 → 1 → 3","arr":[4,2,1,3],"splitAt":null,"leftPart":null,"rightPart":null,"merged":null,"mergeI":-1,"mergeJ":-1,"currentPhase":"original","done":false},
  {"lineNum":5,"phase":"split","description":"使用快慢指针寻找中点","arr":[4,2,1,3],"splitAt":null,"leftPart":null,"rightPart":null,"merged":null,"mergeI":-1,"mergeJ":-1,"currentPhase":"finding-mid","done":false},
  {"lineNum":5,"phase":"split","description":"快慢指针找中点: slow 停在索引 1，将链表从中间断开","arr":[4,2,1,3],"splitAt":2,"leftPart":null,"rightPart":null,"merged":null,"mergeI":-1,"mergeJ":-1,"currentPhase":"finding-mid","done":false},
  {"lineNum":10,"phase":"split","description":"分割为左半: [4, 2] 和右半: [1, 3]","arr":[4,2,1,3],"splitAt":2,"leftPart":[4,2],"rightPart":[1,3],"merged":null,"mergeI":-1,"mergeJ":-1,"currentPhase":"split-done","done":false},
  {"lineNum":11,"phase":"split","description":"递归排序左半 [4, 2] → [2, 4]","arr":[4,2,1,3],"splitAt":2,"leftPart":[2,4],"rightPart":[1,3],"merged":null,"mergeI":-1,"mergeJ":-1,"currentPhase":"left-sorted","done":false},
  {"lineNum":12,"phase":"split","description":"递归排序右半 [1, 3] → [1, 3]（已有序）","arr":[4,2,1,3],"splitAt":2,"leftPart":[2,4],"rightPart":[1,3],"merged":null,"mergeI":-1,"mergeJ":-1,"currentPhase":"right-sorted","done":false},
  {"lineNum":17,"phase":"merge","description":"开始合并两个有序子链表","arr":[4,2,1,3],"leftPart":[2,4],"rightPart":[1,3],"merged":[],"mergeI":0,"mergeJ":0,"currentPhase":"merging","done":false},
  {"lineNum":17,"phase":"merge","description":"比较 left[0]=2 和 right[0]=1，取 1","arr":[4,2,1,3],"leftPart":[2,4],"rightPart":[1,3],"merged":[1],"mergeI":0,"mergeJ":1,"currentPhase":"merging","done":false},
  {"lineNum":18,"phase":"merge","description":"比较 left[0]=2 和 right[1]=3，取 2","arr":[4,2,1,3],"leftPart":[2,4],"rightPart":[1,3],"merged":[1,2],"mergeI":1,"mergeJ":1,"currentPhase":"merging","done":false},
  {"lineNum":18,"phase":"merge","description":"比较 left[1]=4 和 right[1]=3，取 3","arr":[4,2,1,3],"leftPart":[2,4],"rightPart":[1,3],"merged":[1,2,3],"mergeI":1,"mergeJ":2,"currentPhase":"merging","done":false},
  {"lineNum":23,"phase":"merge","description":"right 已耗尽，将 left 剩余 [4] 接上","arr":[4,2,1,3],"leftPart":[2,4],"rightPart":[1,3],"merged":[1,2,3,4],"mergeI":2,"mergeJ":2,"currentPhase":"merging","done":false},
  {"lineNum":24,"phase":"done","description":"合并完成！排序结果: [1, 2, 3, 4]","arr":[4,2,1,3],"leftPart":[2,4],"rightPart":[1,3],"merged":[1,2,3,4],"mergeI":2,"mergeJ":2,"currentPhase":"done","done":true}
];

// 2nd test case: [-1,5,3,4,0]
const steps2 = [
  {"lineNum":3,"phase":"init","description":"初始化链表: -1 → 5 → 3 → 4 → 0","arr":[-1,5,3,4,0],"splitAt":null,"leftPart":null,"rightPart":null,"merged":null,"mergeI":-1,"mergeJ":-1,"currentPhase":"original","done":false},
  {"lineNum":5,"phase":"split","description":"使用快慢指针寻找中点","arr":[-1,5,3,4,0],"splitAt":null,"leftPart":null,"rightPart":null,"merged":null,"mergeI":-1,"mergeJ":-1,"currentPhase":"finding-mid","done":false},
  {"lineNum":5,"phase":"split","description":"快慢指针找中点: slow 停在索引 1，将链表从中间断开","arr":[-1,5,3,4,0],"splitAt":2,"leftPart":null,"rightPart":null,"merged":null,"mergeI":-1,"mergeJ":-1,"currentPhase":"finding-mid","done":false},
  {"lineNum":10,"phase":"split","description":"分割为左半: [-1, 5] 和右半: [3, 4, 0]","arr":[-1,5,3,4,0],"splitAt":2,"leftPart":[-1,5],"rightPart":[3,4,0],"merged":null,"mergeI":-1,"mergeJ":-1,"currentPhase":"split-done","done":false},
  {"lineNum":11,"phase":"split","description":"递归排序左半 [-1, 5] → [-1, 5]（已有序）","arr":[-1,5,3,4,0],"splitAt":2,"leftPart":[-1,5],"rightPart":[3,4,0],"merged":null,"mergeI":-1,"mergeJ":-1,"currentPhase":"left-sorted","done":false},
  {"lineNum":12,"phase":"split","description":"递归排序右半 [3, 4, 0] → [0, 3, 4]","arr":[-1,5,3,4,0],"splitAt":2,"leftPart":[-1,5],"rightPart":[0,3,4],"merged":null,"mergeI":-1,"mergeJ":-1,"currentPhase":"right-sorted","done":false},
  {"lineNum":17,"phase":"merge","description":"开始合并两个有序子链表","arr":[-1,5,3,4,0],"leftPart":[-1,5],"rightPart":[0,3,4],"merged":[],"mergeI":0,"mergeJ":0,"currentPhase":"merging","done":false},
  {"lineNum":17,"phase":"merge","description":"比较 left[0]=-1 和 right[0]=0，取 -1","arr":[-1,5,3,4,0],"leftPart":[-1,5],"rightPart":[0,3,4],"merged":[-1],"mergeI":1,"mergeJ":0,"currentPhase":"merging","done":false},
  {"lineNum":18,"phase":"merge","description":"比较 left[1]=5 和 right[0]=0，取 0","arr":[-1,5,3,4,0],"leftPart":[-1,5],"rightPart":[0,3,4],"merged":[-1,0],"mergeI":1,"mergeJ":1,"currentPhase":"merging","done":false},
  {"lineNum":18,"phase":"merge","description":"比较 left[1]=5 和 right[1]=3，取 3","arr":[-1,5,3,4,0],"leftPart":[-1,5],"rightPart":[0,3,4],"merged":[-1,0,3],"mergeI":1,"mergeJ":2,"currentPhase":"merging","done":false},
  {"lineNum":18,"phase":"merge","description":"比较 left[1]=5 和 right[2]=4，取 4","arr":[-1,5,3,4,0],"leftPart":[-1,5],"rightPart":[0,3,4],"merged":[-1,0,3,4],"mergeI":1,"mergeJ":3,"currentPhase":"merging","done":false},
  {"lineNum":23,"phase":"merge","description":"right 已耗尽，将 left 剩余 [5] 接上","arr":[-1,5,3,4,0],"leftPart":[-1,5],"rightPart":[0,3,4],"merged":[-1,0,3,4,5],"mergeI":2,"mergeJ":3,"currentPhase":"merging","done":false},
  {"lineNum":24,"phase":"done","description":"合并完成！排序结果: [-1, 0, 3, 4, 5]","arr":[-1,5,3,4,0],"leftPart":[-1,5],"rightPart":[0,3,4],"merged":[-1,0,3,4,5],"mergeI":2,"mergeJ":3,"currentPhase":"done","done":true}
];

const phaseLabels = { init: '初始化', split: '分割', merge: '合并', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">原始链表</div>
      <div class="array-row" id="original-arr"></div>
    </div>
    <div class="card">
      <div class="section-title">分割 & 排序</div>
      <div id="split-area" style="display:flex;gap:24px;flex-wrap:wrap"></div>
    </div>
    <div class="card">
      <div class="section-title">合并结果</div>
      <div class="array-row" id="merged-arr"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>左半部分</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>右半部分</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(245,158,11,0.4);border:1px solid #f59e0b"></div>当前比较</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '148. Sort List — 执行可视化',
  problemDesc: `
    <p>给你链表的头结点 <code>head</code>，请将其按升序排列并返回排序后的链表。</p>
    <div class="example">输入：head = [4,2,1,3]
输出：[1,2,3,4]</div>
    <p>提示：在 <code>O(n log n)</code> 时间复杂度和常数级空间复杂度下排序链表。</p>
  `,
  subtitle: 'head = [4, 2, 1, 3] → [1, 2, 3, 4]',
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '[4,2,1,3]', steps: steps1, subtitle: 'head = [4,2,1,3] → [1,2,3,4]' },
    { name: '[-1,5,3,4,0]', steps: steps2, subtitle: 'head = [-1,5,3,4,0] → [-1,0,3,4,5]', setup(panel) { INPUT_ARR = [-1,5,3,4,0]; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    // Original array
    const origEl = document.getElementById('original-arr');
    origEl.innerHTML = s.arr.map((v, i) => {
      let cls = 'arr-cell';
      if (s.currentPhase === 'finding-mid' && s.splitAt && i === s.splitAt - 1) cls += ' current';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${i}]</div></div>`;
    }).join('');

    // Split area
    const splitEl = document.getElementById('split-area');
    if (s.leftPart && s.rightPart) {
      splitEl.innerHTML = `
        <div>
          <div style="font-size:12px;color:#4ade80;font-weight:600;margin-bottom:6px">左半 (sorted)</div>
          <div class="array-row">${s.leftPart.map((v, i) => {
            let cls = 'arr-cell is-active';
            if (s.currentPhase === 'merging' && i === s.mergeI) cls += ' current';
            return `<div class="${cls}"><div class="arr-val">${v}</div></div>`;
          }).join('')}</div>
        </div>
        <div>
          <div style="font-size:12px;color:#38bdf8;font-weight:600;margin-bottom:6px">右半 (sorted)</div>
          <div class="array-row">${s.rightPart.map((v, i) => {
            let cls = 'arr-cell in-window';
            if (s.currentPhase === 'merging' && i === s.mergeJ) cls += ' current';
            return `<div class="${cls}"><div class="arr-val">${v}</div></div>`;
          }).join('')}</div>
        </div>
      `;
    } else {
      splitEl.innerHTML = '<div style="color:var(--text-muted);font-size:13px">等待分割...</div>';
    }

    // Merged array
    const mergedEl = document.getElementById('merged-arr');
    if (s.merged) {
      mergedEl.innerHTML = s.merged.map(v => `<div class="arr-cell current"><div class="arr-val">${v}</div></div>`).join('');
    } else {
      mergedEl.innerHTML = '<div style="color:var(--text-muted);font-size:13px">等待合并...</div>';
    }

    // Result
    const resultEl = document.getElementById('result-area');
    if (s.done) {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">✓</div>
        <div>
          <div class="found-text">排序完成</div>
          <div class="found-sub">结果: [${s.merged.join(', ')}]</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
