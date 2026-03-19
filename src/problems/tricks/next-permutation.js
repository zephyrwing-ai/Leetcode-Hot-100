let NUMS = [1, 2, 3];

const code = [
  'class Solution:',
  '    def nextPermutation(self, nums):',
  '        n = len(nums)',
  '        i = n - 2',
  '        while i >= 0 and nums[i] >= nums[i+1]:',
  '            i -= 1',
  '        if i >= 0:',
  '            j = n - 1',
  '            while nums[j] <= nums[i]:',
  '                j -= 1',
  '            nums[i], nums[j] = nums[j], nums[i]',
  '        left, right = i + 1, n - 1',
  '        while left < right:',
  '            nums[left], nums[right] = nums[right], nums[left]',
  '            left += 1',
  '            right -= 1',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11, 13: 12, 14: 13, 15: 14 };

// ── Test Case 1: nums = [1,2,3] → [1,3,2] ──
// Step-by-step:
// i = n-2 = 1
// while i>=0 and nums[i]>=nums[i+1]: nums[1]=2 >= nums[2]=3? No → stop, i=1
// i>=0, so find j: j=2, nums[2]=3 > nums[1]=2 → swap nums[1],nums[2] → [1,3,2]
// reverse from i+1=2 to n-1=2 → only one element, no change → [1,3,2]
const steps1 = [
  {"lineNum":3,"phase":"init","description":"计算 n = len(nums) = 3","nums":[1,2,3],"i":null,"j":null,"swapI":null,"swapJ":null,"revL":null,"revR":null,"done":false},
  {"lineNum":4,"phase":"findI","description":"初始化 i = n-2 = 1，从右向左找第一个升序对","nums":[1,2,3],"i":1,"j":null,"swapI":null,"swapJ":null,"revL":null,"revR":null,"done":false},
  {"lineNum":5,"phase":"findI","description":"检查 nums[1]=2 >= nums[2]=3? 否，停止。i=1 即降序起点左侧","nums":[1,2,3],"i":1,"j":null,"swapI":null,"swapJ":null,"revL":null,"revR":null,"done":false},
  {"lineNum":7,"phase":"findJ","description":"i=1 >= 0，需要找 j：从右找第一个大于 nums[1]=2 的元素","nums":[1,2,3],"i":1,"j":2,"swapI":null,"swapJ":null,"revL":null,"revR":null,"done":false},
  {"lineNum":9,"phase":"findJ","description":"j=2, nums[2]=3 > nums[1]=2，找到 j=2","nums":[1,2,3],"i":1,"j":2,"swapI":null,"swapJ":null,"revL":null,"revR":null,"done":false},
  {"lineNum":11,"phase":"swap","description":"交换 nums[1] 和 nums[2]: 2 ↔ 3","nums":[1,2,3],"i":1,"j":2,"swapI":1,"swapJ":2,"revL":null,"revR":null,"done":false},
  {"lineNum":11,"phase":"swap","description":"交换完成 → [1,3,2]","nums":[1,3,2],"i":1,"j":2,"swapI":1,"swapJ":2,"revL":null,"revR":null,"done":false},
  {"lineNum":12,"phase":"reverse","description":"反转 i+1=2 到 n-1=2 的部分","nums":[1,3,2],"i":1,"j":2,"swapI":null,"swapJ":null,"revL":2,"revR":2,"done":false},
  {"lineNum":13,"phase":"reverse","description":"left=2 >= right=2，无需反转，反转结束","nums":[1,3,2],"i":1,"j":2,"swapI":null,"swapJ":null,"revL":2,"revR":2,"done":false},
  {"lineNum":14,"phase":"done","description":"完成！下一个排列: [1,3,2]","nums":[1,3,2],"i":null,"j":null,"swapI":null,"swapJ":null,"revL":null,"revR":null,"done":true},
];

// ── Test Case 2: nums = [3,2,1] → [1,2,3] (全降序，回到最小排列) ──
// i = 1: nums[1]=2 >= nums[2]=1? Yes → i=0
// i = 0: nums[0]=3 >= nums[1]=2? Yes → i=-1
// i < 0, skip swap step
// reverse from 0 to 2 → [1,2,3]
const steps2 = [
  {"lineNum":3,"phase":"init","description":"计算 n = len(nums) = 3","nums":[3,2,1],"i":null,"j":null,"swapI":null,"swapJ":null,"revL":null,"revR":null,"done":false},
  {"lineNum":4,"phase":"findI","description":"初始化 i = n-2 = 1","nums":[3,2,1],"i":1,"j":null,"swapI":null,"swapJ":null,"revL":null,"revR":null,"done":false},
  {"lineNum":5,"phase":"findI","description":"nums[1]=2 >= nums[2]=1? 是，i 减为 0","nums":[3,2,1],"i":0,"j":null,"swapI":null,"swapJ":null,"revL":null,"revR":null,"done":false},
  {"lineNum":5,"phase":"findI","description":"nums[0]=3 >= nums[1]=2? 是，i 减为 -1","nums":[3,2,1],"i":-1,"j":null,"swapI":null,"swapJ":null,"revL":null,"revR":null,"done":false},
  {"lineNum":7,"phase":"findI","description":"i=-1 < 0，整个数组已是降序（最大排列），跳过交换步骤","nums":[3,2,1],"i":-1,"j":null,"swapI":null,"swapJ":null,"revL":null,"revR":null,"done":false},
  {"lineNum":12,"phase":"reverse","description":"反转 i+1=0 到 n-1=2 的部分","nums":[3,2,1],"i":-1,"j":null,"swapI":null,"swapJ":null,"revL":0,"revR":2,"done":false},
  {"lineNum":14,"phase":"reverse","description":"交换 nums[0] 和 nums[2]: 3 ↔ 1 → [1,2,3]","nums":[1,2,3],"i":-1,"j":null,"swapI":null,"swapJ":null,"revL":0,"revR":2,"done":false},
  {"lineNum":15,"phase":"reverse","description":"left=1, right=1，left >= right，反转结束","nums":[1,2,3],"i":-1,"j":null,"swapI":null,"swapJ":null,"revL":1,"revR":1,"done":false},
  {"lineNum":14,"phase":"done","description":"完成！下一个排列: [1,2,3]（回到最小排列）","nums":[1,2,3],"i":null,"j":null,"swapI":null,"swapJ":null,"revL":null,"revR":null,"done":true},
];

const phaseLabels = { init: '初始化', findI: '从右找降序起点', findJ: '找交换位置', swap: '交换', reverse: '反转后缀', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">数组 nums</div>
      <div class="array-row" id="nums-array"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(251,146,60,0.4);border:1px solid #fb923c"></div>i 位置</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>j 位置</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(168,85,247,0.25);border:1px solid #a855f7"></div>交换/反转区域</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '31. Next Permutation — 执行可视化',
  problemDesc: `
    <p>整数数组的下一个排列是指其整数的下一个字典序更大的排列。如果不存在更大的排列，则将其重排为最小的排列（升序）。必须原地修改，只允许使用常数额外空间。</p>
    <div class="example">输入：nums = [1,2,3]
输出：[1,3,2]</div>
    <p>提示：从右向左找第一个升序对，交换后反转右半部分。</p>
  `,
  subtitle: `nums = [${NUMS}]`,
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: '[1,2,3] → [1,3,2]', steps: steps1, subtitle: 'nums = [1,2,3]' },
    {
      name: '[3,2,1] → [1,2,3]', steps: steps2, subtitle: 'nums = [3,2,1]',
      setup(panel) { NUMS = [3,2,1]; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const nums = s.nums || NUMS;
    document.getElementById('nums-array').innerHTML = nums.map((v, idx) => {
      let cls = 'arr-cell';
      let extraStyle = '';

      if (idx === s.swapI || idx === s.swapJ) {
        extraStyle = 'background:rgba(168,85,247,0.25);border-color:#a855f7;';
      }
      if (s.revL !== null && s.revR !== null && idx >= s.revL && idx <= s.revR) {
        extraStyle = 'background:rgba(168,85,247,0.12);border-color:rgba(168,85,247,0.4);';
      }
      if (idx === s.i) cls += ' is-active';
      if (idx === s.j) cls += ' in-window';

      let label = '';
      if (idx === s.i && s.i >= 0) label = 'i';
      if (idx === s.j) label = label ? label + ',j' : 'j';

      const labelColor = label.includes(',') ? '#a78bfa' : label === 'i' ? '#fb923c' : label === 'j' ? '#38bdf8' : '';

      return `<div class="${cls}" style="${extraStyle}">
        <div class="arr-val">${v}</div>
        <div class="arr-idx">[${idx}]</div>
        ${label ? `<div class="ptr-label" style="color:${labelColor};font-weight:700;font-size:11px;margin-top:2px">${label}</div>` : ''}
      </div>`;
    }).join('');

    const resultEl = document.getElementById('result-area');
    if (s.done) {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">下一个排列</div>
          <div class="found-sub" style="margin-top:4px">[${nums}]</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
