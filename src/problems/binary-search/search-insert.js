let ARR = [1, 3, 5, 6];
let TARGET = 5;

const code = [
  'class Solution:',
  '    def searchInsert(self, nums, target):',
  '        left, right = 0, len(nums) - 1',
  '        while left <= right:',
  '            mid = (left + right) // 2',
  '            if nums[mid] == target:',
  '                return mid',
  '            elif nums[mid] < target:',
  '                left = mid + 1',
  '            else:',
  '                right = mid - 1',
  '        return left',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11 };

// ── Test Case 1: nums = [1,3,5,6], target = 5 ──
const steps1 = [
  {"lineNum":3,"phase":"init","description":"初始化 left=0, right=3，target=5","arr":[1,3,5,6],"left":0,"right":3,"mid":null,"found":null,"target":5},
  {"lineNum":5,"phase":"calc","description":"进入循环，left=0 <= right=3，计算 mid=(0+3)//2=1","arr":[1,3,5,6],"left":0,"right":3,"mid":1,"found":null,"target":5},
  {"lineNum":6,"phase":"compare","description":"nums[1]=3，与 target=5 比较","arr":[1,3,5,6],"left":0,"right":3,"mid":1,"found":null,"target":5},
  {"lineNum":8,"phase":"shrink","description":"nums[1]=3 < target=5，目标在右半段，left = mid+1 = 2","arr":[1,3,5,6],"left":2,"right":3,"mid":1,"found":null,"target":5},
  {"lineNum":4,"phase":"loop","description":"回到循环头，left=2 <= right=3，继续","arr":[1,3,5,6],"left":2,"right":3,"mid":null,"found":null,"target":5},
  {"lineNum":5,"phase":"calc","description":"计算 mid=(2+3)//2=2","arr":[1,3,5,6],"left":2,"right":3,"mid":2,"found":null,"target":5},
  {"lineNum":6,"phase":"compare","description":"nums[2]=5，与 target=5 比较","arr":[1,3,5,6],"left":2,"right":3,"mid":2,"found":null,"target":5},
  {"lineNum":7,"phase":"found","description":"nums[2]=5 == target=5，找到目标！返回 mid=2","arr":[1,3,5,6],"left":2,"right":3,"mid":2,"found":2,"target":5},
];

// ── Test Case 2: nums = [1,3,5,6], target = 2 ──
const steps2 = [
  {"lineNum":3,"phase":"init","description":"初始化 left=0, right=3，target=2","arr":[1,3,5,6],"left":0,"right":3,"mid":null,"found":null,"target":2},
  {"lineNum":5,"phase":"calc","description":"进入循环，left=0 <= right=3，计算 mid=(0+3)//2=1","arr":[1,3,5,6],"left":0,"right":3,"mid":1,"found":null,"target":2},
  {"lineNum":6,"phase":"compare","description":"nums[1]=3，与 target=2 比较","arr":[1,3,5,6],"left":0,"right":3,"mid":1,"found":null,"target":2},
  {"lineNum":10,"phase":"shrink","description":"nums[1]=3 > target=2，目标在左半段，right = mid-1 = 0","arr":[1,3,5,6],"left":0,"right":0,"mid":1,"found":null,"target":2},
  {"lineNum":4,"phase":"loop","description":"回到循环头，left=0 <= right=0，继续","arr":[1,3,5,6],"left":0,"right":0,"mid":null,"found":null,"target":2},
  {"lineNum":5,"phase":"calc","description":"计算 mid=(0+0)//2=0","arr":[1,3,5,6],"left":0,"right":0,"mid":0,"found":null,"target":2},
  {"lineNum":6,"phase":"compare","description":"nums[0]=1，与 target=2 比较","arr":[1,3,5,6],"left":0,"right":0,"mid":0,"found":null,"target":2},
  {"lineNum":8,"phase":"shrink","description":"nums[0]=1 < target=2，目标在右半段，left = mid+1 = 1","arr":[1,3,5,6],"left":1,"right":0,"mid":0,"found":null,"target":2},
  {"lineNum":4,"phase":"loop","description":"left=1 > right=0，循环结束","arr":[1,3,5,6],"left":1,"right":0,"mid":null,"found":null,"target":2},
  {"lineNum":12,"phase":"insert","description":"目标不存在，返回插入位置 left=1，即 2 应插在索引 1","arr":[1,3,5,6],"left":1,"right":0,"mid":null,"found":1,"target":2},
];

const phaseLabels = { init: '初始化', calc: '计算中点', compare: '比较', shrink: '收缩区间', loop: '循环检查', found: '找到目标', insert: '插入位置' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">数组 nums（L = left，R = right，M = mid）</div>
      <div class="array-row" id="nums-array"></div>
      <div id="ptr-info-area" style="margin-top:10px;font-size:13px;font-family:monospace;color:var(--text-muted);display:flex;gap:16px"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>L (left)</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>R (right)</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(251,146,60,0.4);border:1px solid #fb923c"></div>M (mid)</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '35. Search Insert Position — 执行可视化',
  problemDesc: `
    <p>给定一个排序数组和一个目标值，在数组中找到目标值并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。请必须使用时间复杂度为 <code>O(log n)</code> 的算法。</p>
    <div class="example">输入：nums = [1,3,5,6], target = 5
输出：2</div>
  `,
  subtitle: `nums = [${ARR}], target = ${TARGET}`,
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'nums = [1,3,5,6], target = 5', steps: steps1, subtitle: 'nums = [1,3,5,6], target = 5' },
    {
      name: 'nums = [1,3,5,6], target = 2', steps: steps2, subtitle: 'nums = [1,3,5,6], target = 2',
      setup(panel) { ARR = [1,3,5,6]; TARGET = 2; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const arr = s.arr || ARR;
    const target = s.target !== undefined ? s.target : TARGET;
    document.getElementById('nums-array').innerHTML = arr.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.mid) cls += ' is-active';
      if (idx === s.left) cls += ' is-left';
      if (idx === s.right) cls += ' is-right';

      let label = '';
      const labels = [];
      if (idx === s.left) labels.push('L');
      if (idx === s.mid) labels.push('M');
      if (idx === s.right) labels.push('R');
      label = labels.join(' ');

      const labelColor = labels.length > 1 ? '#a78bfa'
        : label === 'L' ? '#4ade80' : label === 'R' ? '#38bdf8' : label === 'M' ? '#fb923c' : '';

      return `<div class="${cls}">
        <div class="arr-val">${v}</div>
        <div class="arr-idx">[${idx}]</div>
        ${label ? `<div class="ptr-label" style="color:${labelColor};font-weight:700;font-size:11px;margin-top:2px">${label}</div>` : ''}
      </div>`;
    }).join('');

    const ptrInfo = document.getElementById('ptr-info-area');
    ptrInfo.innerHTML = `
      <span style="color:#4ade80">left = <b>${s.left}</b></span>
      <span style="color:#38bdf8">right = <b>${s.right}</b></span>
      ${s.mid !== null ? `<span style="color:#fb923c">mid = <b>${s.mid}</b></span>` : ''}
    `;

    const resultEl = document.getElementById('result-area');
    if (s.found !== null) {
      const isInsert = s.phase === 'insert';
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">${isInsert ? '插入位置' : '找到目标'}</div>
          <div class="found-sub" style="margin-top:4px">${isInsert ? `target=${target} 应插入索引 ${s.found}` : `target=${target} 在索引 ${s.found} 处`}</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
