let NUMS = [1, 3, 4, 2, 2];

const code = [
  'class Solution:',
  '    def findDuplicate(self, nums):',
  '        slow = fast = 0',
  '        while True:',
  '            slow = nums[slow]',
  '            fast = nums[nums[fast]]',
  '            if slow == fast:',
  '                break',
  '        slow2 = 0',
  '        while slow != slow2:',
  '            slow = nums[slow]',
  '            slow2 = nums[slow2]',
  '        return slow',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11, 13: 12 };

// ── Test Case 1: nums = [1,3,4,2,2] → 2 ──
// Index: 0→1→3→2→4→2→4→2...  (cycle at 2↔4)
// Phase 1 (detect cycle):
//   slow=0, fast=0
//   Iter1: slow=nums[0]=1, fast=nums[nums[0]]=nums[1]=3 → fast=nums[3]=2? No, fast=nums[nums[0]]=nums[nums[0]]=nums[1]=3...
//   Let me re-trace: fast = nums[nums[fast]]
//   slow=0,fast=0
//   Iter1: slow=nums[0]=1, fast=nums[nums[0]]=nums[1]=3. slow≠fast
//   Iter2: slow=nums[1]=3, fast=nums[nums[3]]=nums[2]=4. slow≠fast
//   Iter3: slow=nums[3]=2, fast=nums[nums[4]]=nums[2]=4. slow≠fast
//   Iter4: slow=nums[2]=4, fast=nums[nums[4]]=nums[2]=4. slow==fast=4 ✓
// Phase 2 (find entrance):
//   slow=4, slow2=0
//   Iter1: slow=nums[4]=2, slow2=nums[0]=1. slow≠slow2
//   Iter2: slow=nums[2]=4, slow2=nums[1]=3. slow≠slow2
//   Iter3: slow=nums[4]=2, slow2=nums[3]=2. slow==slow2=2 ✓
//   Return 2
const steps1 = [
  {"lineNum":3,"phase":"init","description":"初始化 slow=0, fast=0","nums":[1,3,4,2,2],"slow":0,"fast":0,"slow2":null,"met":false,"found":null},
  {"lineNum":5,"phase":"phase1","description":"Phase 1: slow 走一步 → nums[0]=1","nums":[1,3,4,2,2],"slow":1,"fast":0,"slow2":null,"met":false,"found":null},
  {"lineNum":6,"phase":"phase1","description":"fast 走两步 → nums[nums[0]]=nums[1]=3","nums":[1,3,4,2,2],"slow":1,"fast":3,"slow2":null,"met":false,"found":null},
  {"lineNum":7,"phase":"phase1","description":"slow=1 ≠ fast=3，继续","nums":[1,3,4,2,2],"slow":1,"fast":3,"slow2":null,"met":false,"found":null},
  {"lineNum":5,"phase":"phase1","description":"slow 走一步 → nums[1]=3","nums":[1,3,4,2,2],"slow":3,"fast":3,"slow2":null,"met":false,"found":null},
  {"lineNum":6,"phase":"phase1","description":"fast 走两步 → nums[nums[3]]=nums[2]=4","nums":[1,3,4,2,2],"slow":3,"fast":4,"slow2":null,"met":false,"found":null},
  {"lineNum":7,"phase":"phase1","description":"slow=3 ≠ fast=4，继续","nums":[1,3,4,2,2],"slow":3,"fast":4,"slow2":null,"met":false,"found":null},
  {"lineNum":5,"phase":"phase1","description":"slow 走一步 → nums[3]=2","nums":[1,3,4,2,2],"slow":2,"fast":4,"slow2":null,"met":false,"found":null},
  {"lineNum":6,"phase":"phase1","description":"fast 走两步 → nums[nums[4]]=nums[2]=4","nums":[1,3,4,2,2],"slow":2,"fast":4,"slow2":null,"met":false,"found":null},
  {"lineNum":7,"phase":"phase1","description":"slow=2 ≠ fast=4，继续","nums":[1,3,4,2,2],"slow":2,"fast":4,"slow2":null,"met":false,"found":null},
  {"lineNum":5,"phase":"phase1","description":"slow 走一步 → nums[2]=4","nums":[1,3,4,2,2],"slow":4,"fast":4,"slow2":null,"met":false,"found":null},
  {"lineNum":6,"phase":"phase1","description":"fast 走两步 → nums[nums[4]]=nums[2]=4","nums":[1,3,4,2,2],"slow":4,"fast":4,"slow2":null,"met":false,"found":null},
  {"lineNum":7,"phase":"phase1","description":"slow=4 == fast=4，快慢指针相遇！","nums":[1,3,4,2,2],"slow":4,"fast":4,"slow2":null,"met":true,"found":null},
  {"lineNum":9,"phase":"phase2","description":"Phase 2: 初始化 slow2=0，寻找环入口","nums":[1,3,4,2,2],"slow":4,"fast":4,"slow2":0,"met":true,"found":null},
  {"lineNum":11,"phase":"phase2","description":"slow=4 ≠ slow2=0，各走一步：slow→nums[4]=2, slow2→nums[0]=1","nums":[1,3,4,2,2],"slow":2,"fast":4,"slow2":1,"met":true,"found":null},
  {"lineNum":11,"phase":"phase2","description":"slow=2 ≠ slow2=1，各走一步：slow→nums[2]=4, slow2→nums[1]=3","nums":[1,3,4,2,2],"slow":4,"fast":4,"slow2":3,"met":true,"found":null},
  {"lineNum":11,"phase":"phase2","description":"slow=4 ≠ slow2=3，各走一步：slow→nums[4]=2, slow2→nums[3]=2","nums":[1,3,4,2,2],"slow":2,"fast":4,"slow2":2,"met":true,"found":null},
  {"lineNum":13,"phase":"found","description":"slow=2 == slow2=2，环入口即重复数字！返回 2","nums":[1,3,4,2,2],"slow":2,"fast":4,"slow2":2,"met":true,"found":2},
];

// ── Test Case 2: nums = [3,1,3,4,2] → 3 ──
// Index chain: 0→3→4→2→3→4→2... (cycle at 3→4→2→3)
// Phase 1:
//   slow=0,fast=0
//   Iter1: slow=nums[0]=3, fast=nums[nums[0]]=nums[3]=4. slow≠fast
//   Iter2: slow=nums[3]=4, fast=nums[nums[4]]=nums[2]=3. slow≠fast
//   Iter3: slow=nums[4]=2, fast=nums[nums[3]]=nums[4]=2. slow==fast=2 ✓
// Phase 2:
//   slow=2, slow2=0
//   Iter1: slow=nums[2]=3, slow2=nums[0]=3. slow==slow2=3 ✓
//   Return 3
const steps2 = [
  {"lineNum":3,"phase":"init","description":"初始化 slow=0, fast=0","nums":[3,1,3,4,2],"slow":0,"fast":0,"slow2":null,"met":false,"found":null},
  {"lineNum":5,"phase":"phase1","description":"Phase 1: slow 走一步 → nums[0]=3","nums":[3,1,3,4,2],"slow":3,"fast":0,"slow2":null,"met":false,"found":null},
  {"lineNum":6,"phase":"phase1","description":"fast 走两步 → nums[nums[0]]=nums[3]=4","nums":[3,1,3,4,2],"slow":3,"fast":4,"slow2":null,"met":false,"found":null},
  {"lineNum":7,"phase":"phase1","description":"slow=3 ≠ fast=4，继续","nums":[3,1,3,4,2],"slow":3,"fast":4,"slow2":null,"met":false,"found":null},
  {"lineNum":5,"phase":"phase1","description":"slow 走一步 → nums[3]=4","nums":[3,1,3,4,2],"slow":4,"fast":4,"slow2":null,"met":false,"found":null},
  {"lineNum":6,"phase":"phase1","description":"fast 走两步 → nums[nums[4]]=nums[2]=3","nums":[3,1,3,4,2],"slow":4,"fast":3,"slow2":null,"met":false,"found":null},
  {"lineNum":7,"phase":"phase1","description":"slow=4 ≠ fast=3，继续","nums":[3,1,3,4,2],"slow":4,"fast":3,"slow2":null,"met":false,"found":null},
  {"lineNum":5,"phase":"phase1","description":"slow 走一步 → nums[4]=2","nums":[3,1,3,4,2],"slow":2,"fast":3,"slow2":null,"met":false,"found":null},
  {"lineNum":6,"phase":"phase1","description":"fast 走两步 → nums[nums[3]]=nums[4]=2","nums":[3,1,3,4,2],"slow":2,"fast":2,"slow2":null,"met":false,"found":null},
  {"lineNum":7,"phase":"phase1","description":"slow=2 == fast=2，快慢指针相遇！","nums":[3,1,3,4,2],"slow":2,"fast":2,"slow2":null,"met":true,"found":null},
  {"lineNum":9,"phase":"phase2","description":"Phase 2: 初始化 slow2=0，寻找环入口","nums":[3,1,3,4,2],"slow":2,"fast":2,"slow2":0,"met":true,"found":null},
  {"lineNum":11,"phase":"phase2","description":"slow=2 ≠ slow2=0，各走一步：slow→nums[2]=3, slow2→nums[0]=3","nums":[3,1,3,4,2],"slow":3,"fast":2,"slow2":3,"met":true,"found":null},
  {"lineNum":13,"phase":"found","description":"slow=3 == slow2=3，环入口即重复数字！返回 3","nums":[3,1,3,4,2],"slow":3,"fast":2,"slow2":3,"met":true,"found":3},
];

const phaseLabels = { init: '初始化', phase1: '快慢指针找相遇点', phase2: '寻找环入口', found: '找到重复数' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">数组 nums（索引 → 值 形成链表）</div>
      <div class="array-row" id="nums-array"></div>
      <div id="ptr-info-area" style="margin-top:10px;font-size:13px;font-family:monospace;color:var(--text-muted);display:flex;gap:16px;flex-wrap:wrap"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>slow</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(239,68,68,0.4);border:1px solid #ef4444"></div>fast</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>slow2</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '287. Find the Duplicate Number — 执行可视化',
  problemDesc: `
    <p>给定一个包含 <code>n + 1</code> 个整数的数组 <code>nums</code>，其中每个整数在 <code>[1, n]</code> 范围内，其中只有一个重复的整数。找出这个重复的数。</p>
    <div class="example">输入：nums = [1,3,4,2,2]
输出：2</div>
    <p>要求：不修改数组，只用 O(1) 额外空间。提示：快慢指针（Floyd 判圈法）。</p>
  `,
  subtitle: `nums = [${NUMS}]`,
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'nums = [1,3,4,2,2] → 2', steps: steps1, subtitle: 'nums = [1,3,4,2,2]' },
    {
      name: 'nums = [3,1,3,4,2] → 3', steps: steps2, subtitle: 'nums = [3,1,3,4,2]',
      setup(panel) { NUMS = [3,1,3,4,2]; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const nums = s.nums || NUMS;

    document.getElementById('nums-array').innerHTML = nums.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.slow) cls += ' is-left';
      if (idx === s.fast) cls += ' is-active';
      if (idx === s.slow2) cls += ' in-window';

      let label = '';
      const labels = [];
      if (idx === s.slow) labels.push('S');
      if (idx === s.fast && s.phase !== 'phase2' && s.phase !== 'found') labels.push('F');
      if (idx === s.slow2) labels.push('S2');
      label = labels.join(' ');

      const labelColor = labels.length > 1 ? '#a78bfa'
        : label === 'S' ? '#4ade80' : label === 'F' ? '#ef4444' : label === 'S2' ? '#38bdf8' : '';

      return `<div class="${cls}">
        <div class="arr-val">${v}</div>
        <div class="arr-idx">[${idx}]</div>
        ${label ? `<div class="ptr-label" style="color:${labelColor};font-weight:700;font-size:11px;margin-top:2px">${label}</div>` : ''}
      </div>`;
    }).join('');

    const ptrInfo = document.getElementById('ptr-info-area');
    ptrInfo.innerHTML = `
      <span style="color:#4ade80">slow = <b>${s.slow}</b></span>
      ${s.phase !== 'phase2' && s.phase !== 'found' ? `<span style="color:#ef4444">fast = <b>${s.fast}</b></span>` : ''}
      ${s.slow2 !== null ? `<span style="color:#38bdf8">slow2 = <b>${s.slow2}</b></span>` : ''}
      ${s.met ? '<span style="color:#f59e0b;font-weight:600">已相遇</span>' : ''}
    `;

    const resultEl = document.getElementById('result-area');
    if (s.found !== null) {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">找到重复数</div>
          <div class="found-sub" style="margin-top:4px">重复数字 = ${s.found}</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
