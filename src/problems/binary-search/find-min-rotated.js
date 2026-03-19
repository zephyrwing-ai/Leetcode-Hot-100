let ARR = [3, 4, 5, 1, 2];

const code = [
  'class Solution:',
  '    def findMin(self, nums):',
  '        left, right = 0, len(nums) - 1',
  '        while left < right:',
  '            mid = (left + right) // 2',
  '            if nums[mid] > nums[right]:',
  '                left = mid + 1',
  '            else:',
  '                right = mid',
  '        return nums[left]',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9 };

// ── Test Case 1: nums = [3,4,5,1,2] → 1 ──
const steps1 = [
  {"lineNum":3,"phase":"init","description":"初始化 left=0, right=4","arr":[3,4,5,1,2],"left":0,"right":4,"mid":null,"found":null},
  {"lineNum":4,"phase":"loop","description":"left=0 < right=4，进入循环","arr":[3,4,5,1,2],"left":0,"right":4,"mid":null,"found":null},
  {"lineNum":5,"phase":"calc","description":"计算 mid=(0+4)//2=2, nums[2]=5","arr":[3,4,5,1,2],"left":0,"right":4,"mid":2,"found":null},
  {"lineNum":6,"phase":"compare","description":"nums[2]=5 > nums[4]=2，最小值在右半段","arr":[3,4,5,1,2],"left":0,"right":4,"mid":2,"found":null},
  {"lineNum":7,"phase":"shrink","description":"收缩 left = mid+1 = 3","arr":[3,4,5,1,2],"left":3,"right":4,"mid":2,"found":null},
  {"lineNum":4,"phase":"loop","description":"left=3 < right=4，继续循环","arr":[3,4,5,1,2],"left":3,"right":4,"mid":null,"found":null},
  {"lineNum":5,"phase":"calc","description":"计算 mid=(3+4)//2=3, nums[3]=1","arr":[3,4,5,1,2],"left":3,"right":4,"mid":3,"found":null},
  {"lineNum":6,"phase":"compare","description":"nums[3]=1 <= nums[4]=2，最小值在左半段（含 mid）","arr":[3,4,5,1,2],"left":3,"right":4,"mid":3,"found":null},
  {"lineNum":9,"phase":"shrink","description":"收缩 right = mid = 3","arr":[3,4,5,1,2],"left":3,"right":3,"mid":3,"found":null},
  {"lineNum":4,"phase":"check","description":"left=3 == right=3，循环结束","arr":[3,4,5,1,2],"left":3,"right":3,"mid":3,"found":null},
  {"lineNum":10,"phase":"found","description":"返回 nums[3]=1，最小值为 1","arr":[3,4,5,1,2],"left":3,"right":3,"mid":3,"found":1},
];

// ── Test Case 2: nums = [4,5,6,7,0,1,2] → 0 ──
const steps2 = [
  {"lineNum":3,"phase":"init","description":"初始化 left=0, right=6","arr":[4,5,6,7,0,1,2],"left":0,"right":6,"mid":null,"found":null},
  {"lineNum":4,"phase":"loop","description":"left=0 < right=6，进入循环","arr":[4,5,6,7,0,1,2],"left":0,"right":6,"mid":null,"found":null},
  {"lineNum":5,"phase":"calc","description":"计算 mid=(0+6)//2=3, nums[3]=7","arr":[4,5,6,7,0,1,2],"left":0,"right":6,"mid":3,"found":null},
  {"lineNum":6,"phase":"compare","description":"nums[3]=7 > nums[6]=2，最小值在右半段","arr":[4,5,6,7,0,1,2],"left":0,"right":6,"mid":3,"found":null},
  {"lineNum":7,"phase":"shrink","description":"收缩 left = mid+1 = 4","arr":[4,5,6,7,0,1,2],"left":4,"right":6,"mid":3,"found":null},
  {"lineNum":4,"phase":"loop","description":"left=4 < right=6，继续循环","arr":[4,5,6,7,0,1,2],"left":4,"right":6,"mid":null,"found":null},
  {"lineNum":5,"phase":"calc","description":"计算 mid=(4+6)//2=5, nums[5]=1","arr":[4,5,6,7,0,1,2],"left":4,"right":6,"mid":5,"found":null},
  {"lineNum":6,"phase":"compare","description":"nums[5]=1 <= nums[6]=2，最小值在左半段（含 mid）","arr":[4,5,6,7,0,1,2],"left":4,"right":6,"mid":5,"found":null},
  {"lineNum":9,"phase":"shrink","description":"收缩 right = mid = 5","arr":[4,5,6,7,0,1,2],"left":4,"right":5,"mid":5,"found":null},
  {"lineNum":4,"phase":"loop","description":"left=4 < right=5，继续循环","arr":[4,5,6,7,0,1,2],"left":4,"right":5,"mid":null,"found":null},
  {"lineNum":5,"phase":"calc","description":"计算 mid=(4+5)//2=4, nums[4]=0","arr":[4,5,6,7,0,1,2],"left":4,"right":5,"mid":4,"found":null},
  {"lineNum":6,"phase":"compare","description":"nums[4]=0 <= nums[5]=1，最小值在左半段（含 mid）","arr":[4,5,6,7,0,1,2],"left":4,"right":5,"mid":4,"found":null},
  {"lineNum":9,"phase":"shrink","description":"收缩 right = mid = 4","arr":[4,5,6,7,0,1,2],"left":4,"right":4,"mid":4,"found":null},
  {"lineNum":4,"phase":"check","description":"left=4 == right=4，循环结束","arr":[4,5,6,7,0,1,2],"left":4,"right":4,"mid":4,"found":null},
  {"lineNum":10,"phase":"found","description":"返回 nums[4]=0，最小值为 0","arr":[4,5,6,7,0,1,2],"left":4,"right":4,"mid":4,"found":0},
];

const phaseLabels = { init: '初始化', loop: '循环检查', calc: '计算中点', compare: '比较', shrink: '收缩区间', check: '检查条件', found: '找到最小值' };

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
  title: '153. Find Minimum in Rotated Sorted Array — 执行可视化',
  problemDesc: `
    <p>已知一个长度为 <code>n</code> 的数组，预先按照升序排列，经由 <code>1</code> 到 <code>n</code> 次旋转后得到。请你找出并返回数组中的最小元素。要求时间复杂度为 <code>O(log n)</code>。</p>
    <div class="example">输入：nums = [3,4,5,1,2]
输出：1</div>
  `,
  subtitle: `nums = [${ARR}]`,
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'nums = [3,4,5,1,2]', steps: steps1, subtitle: 'nums = [3,4,5,1,2]' },
    {
      name: 'nums = [4,5,6,7,0,1,2]', steps: steps2, subtitle: 'nums = [4,5,6,7,0,1,2]',
      setup(panel) { ARR = [4,5,6,7,0,1,2]; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const arr = s.arr || ARR;
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
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">找到最小值</div>
          <div class="found-sub" style="margin-top:4px">最小值 = ${s.found}，位于索引 ${s.left}</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
