let INIT_ARR = [0, 1, 0, 3, 12];

const code = [
  'class Solution:',
  '    def moveZeros(self,nums):',
  '        left=right=0',
  '        n=len(nums)',
  '        while right < n:',
  '            if nums[right] != 0:',
  '                nums[right],nums[left]=nums[left],nums[right]',
  '                left+=1',
  '            right+=1',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8 };

// ── Test Case 1: nums = [0,1,0,3,12] ──
const steps1 = [
  {lineNum:3, phase:'init', description:'初始化双指针 left=0, right=0，n=5。left 指向下一个非零元素应放的位置',
   arr:[0,1,0,3,12], left:0, right:0, swapped:false, justSwapped:null},
  {lineNum:5, phase:'check', description:'right=0 < n=5，进入循环，检查 arr[0]=0',
   arr:[0,1,0,3,12], left:0, right:0, swapped:false, justSwapped:null},
  {lineNum:6, phase:'check', description:'arr[0]=0，是零，不交换，right 直接右移',
   arr:[0,1,0,3,12], left:0, right:0, swapped:false, justSwapped:null},
  {lineNum:5, phase:'check', description:'right=1 < n=5，检查 arr[1]=1',
   arr:[0,1,0,3,12], left:0, right:1, swapped:false, justSwapped:null},
  {lineNum:6, phase:'check', description:'arr[1]=1 不等于 0，需要交换到 left 位置',
   arr:[0,1,0,3,12], left:0, right:1, swapped:false, justSwapped:null},
  {lineNum:7, phase:'push', description:'交换 arr[1]↔arr[0]：1 和 0 互换，left 右移到 1',
   arr:[1,0,0,3,12], left:1, right:1, swapped:true, justSwapped:[0,1]},
  {lineNum:5, phase:'check', description:'right=2 < n=5，检查 arr[2]=0',
   arr:[1,0,0,3,12], left:1, right:2, swapped:false, justSwapped:null},
  {lineNum:6, phase:'check', description:'arr[2]=0，是零，跳过',
   arr:[1,0,0,3,12], left:1, right:2, swapped:false, justSwapped:null},
  {lineNum:5, phase:'check', description:'right=3 < n=5，检查 arr[3]=3',
   arr:[1,0,0,3,12], left:1, right:3, swapped:false, justSwapped:null},
  {lineNum:6, phase:'check', description:'arr[3]=3 不等于 0，需要交换到 left=1 位置',
   arr:[1,0,0,3,12], left:1, right:3, swapped:false, justSwapped:null},
  {lineNum:7, phase:'push', description:'交换 arr[3]↔arr[1]：3 和 0 互换，left 右移到 2',
   arr:[1,3,0,0,12], left:2, right:3, swapped:true, justSwapped:[1,3]},
  {lineNum:5, phase:'check', description:'right=4 < n=5，检查 arr[4]=12',
   arr:[1,3,0,0,12], left:2, right:4, swapped:false, justSwapped:null},
  {lineNum:6, phase:'check', description:'arr[4]=12 不等于 0，交换到 left=2 位置',
   arr:[1,3,0,0,12], left:2, right:4, swapped:false, justSwapped:null},
  {lineNum:7, phase:'push', description:'交换 arr[4]↔arr[2]：12 和 0 互换，left 右移到 3',
   arr:[1,3,12,0,0], left:3, right:4, swapped:true, justSwapped:[2,4]},
  {lineNum:5, phase:'record', description:'right=5 = n，循环结束。所有零已移到末尾，结果: [1, 3, 12, 0, 0]',
   arr:[1,3,12,0,0], left:3, right:5, swapped:false, justSwapped:null},
];

// ── Test Case 2: nums = [0,0,1] ──
const steps2 = [
  {lineNum:3, phase:'init', description:'初始化双指针 left=0, right=0，n=3',
   arr:[0,0,1], left:0, right:0, swapped:false, justSwapped:null},
  {lineNum:5, phase:'check', description:'right=0 < n=3，检查 arr[0]=0',
   arr:[0,0,1], left:0, right:0, swapped:false, justSwapped:null},
  {lineNum:6, phase:'check', description:'arr[0]=0，是零，跳过',
   arr:[0,0,1], left:0, right:0, swapped:false, justSwapped:null},
  {lineNum:5, phase:'check', description:'right=1 < n=3，检查 arr[1]=0',
   arr:[0,0,1], left:0, right:1, swapped:false, justSwapped:null},
  {lineNum:6, phase:'check', description:'arr[1]=0，还是零，继续跳过',
   arr:[0,0,1], left:0, right:1, swapped:false, justSwapped:null},
  {lineNum:5, phase:'check', description:'right=2 < n=3，检查 arr[2]=1',
   arr:[0,0,1], left:0, right:2, swapped:false, justSwapped:null},
  {lineNum:6, phase:'check', description:'arr[2]=1 不等于 0，需要交换到 left=0 位置',
   arr:[0,0,1], left:0, right:2, swapped:false, justSwapped:null},
  {lineNum:7, phase:'push', description:'交换 arr[2]↔arr[0]：1 和 0 互换，left 右移到 1',
   arr:[1,0,0], left:1, right:2, swapped:true, justSwapped:[0,2]},
  {lineNum:5, phase:'record', description:'right=3 = n，循环结束。结果: [1, 0, 0]',
   arr:[1,0,0], left:1, right:3, swapped:false, justSwapped:null},
];

const phaseLabels = { init: '初始化', push: '交换', check: '检查', record: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">数组 nums（L = left 指针，R = right 指针）</div>
      <div class="array-row" id="nums-array"></div>
      <div id="ptr-info-area" style="margin-top:10px;font-size:13px;font-family:monospace;color:var(--text-muted);display:flex;gap:16px"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>L (left)</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>R (right)</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(245,158,11,0.4);border:1px solid #f59e0b"></div>刚交换</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(100,116,139,0.35);border:1px solid #64748b"></div>值为 0</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '283. Move Zeroes — 执行可视化',
  problemDesc: `
    <p>给定一个数组 <code>nums</code>，编写一个函数将所有 <code>0</code> 移动到数组的末尾，同时保持非零元素的相对顺序。</p>
    <div class="example">输入：nums = [0,1,0,3,12]
输出：[1,3,12,0,0]</div>
    <p><strong>提示：</strong>必须在不复制数组的情况下原地操作。</p>
  `,
  subtitle: 'nums = [0, 1, 0, 3, 12]',
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: 'nums = [0,1,0,3,12]', steps: steps1, subtitle: 'nums = [0, 1, 0, 3, 12]' },
    {
      name: 'nums = [0,0,1]', steps: steps2, subtitle: 'nums = [0, 0, 1]',
      setup(panel) { INIT_ARR = [0,0,1]; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    // nums array
    const arr = s.arr;
    document.getElementById('nums-array').innerHTML = arr.map((v, idx) => {
      let cls = 'arr-cell';
      if (v === 0) cls += ' is-zero';
      if (idx === s.left) cls += ' is-left';
      if (idx === s.right) cls += ' is-right';
      if (s.justSwapped && s.justSwapped.includes(idx)) cls += ' just-swapped';

      let label = '';
      if (idx === s.left && idx === s.right) label = 'L R';
      else if (idx === s.left) label = 'L';
      else if (idx === s.right) label = 'R';

      const labelColor = label.includes('L') && label.includes('R')
        ? '#a78bfa'
        : label === 'L' ? '#4ade80' : label === 'R' ? '#38bdf8' : '';

      return `<div class="${cls}">
        <div class="arr-val">${v}</div>
        <div class="arr-idx">[${idx}]</div>
        ${label ? `<div class="ptr-label" style="color:${labelColor};font-weight:700;font-size:11px;margin-top:2px">${label}</div>` : ''}
      </div>`;
    }).join('');

    // pointer info
    const ptrInfo = document.getElementById('ptr-info-area');
    ptrInfo.innerHTML = `
      <span style="color:#4ade80">left = <b>${s.left}</b></span>
      <span style="color:#38bdf8">right = <b>${s.right}</b></span>
      ${s.swapped ? '<span style="color:#f59e0b;font-weight:600">swapped!</span>' : ''}
    `;

    // result area
    const resultEl = document.getElementById('result-area');
    if (s.phase === 'record') {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">\u2713</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">完成</div>
          <div class="found-sub" style="margin-top:4px">结果: [${arr.join(', ')}]</div>
          <div class="array-row" style="margin-top:8px">${arr.map(v => {
            const style = v === 0
              ? 'background:rgba(100,116,139,0.18);color:#64748b'
              : 'background:rgba(74,222,128,0.15);color:#4ade80;border-color:#4ade80';
            return `<div class="arr-cell" style="${style}"><div class="arr-val">${v}</div></div>`;
          }).join('')}</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
