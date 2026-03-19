let ARR = [4, 5, 6, 7, 0, 1, 2];
let TARGET = 0;

const code = [
  'class Solution:',
  '    def search(self, nums, target):',
  '        left, right = 0, len(nums) - 1',
  '        while left <= right:',
  '            mid = (left + right) // 2',
  '            if nums[mid] == target:',
  '                return mid',
  '            if nums[left] <= nums[mid]:',
  '                if nums[left]<=target<nums[mid]:',
  '                    right = mid - 1',
  '                else:',
  '                    left = mid + 1',
  '            else:',
  '                if nums[mid]<target<=nums[right]:',
  '                    left = mid + 1',
  '                else:',
  '                    right = mid - 1',
  '        return -1',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11, 13: 12, 14: 13, 15: 14, 16: 15, 17: 16, 18: 17 };

// ── Test Case 1: nums = [4,5,6,7,0,1,2], target = 0 → 4 ──
const steps1 = [
  {"lineNum":3,"phase":"init","description":"初始化 left=0, right=6, target=0","arr":[4,5,6,7,0,1,2],"left":0,"right":6,"mid":null,"sortedHalf":null,"found":null,"target":0},
  {"lineNum":5,"phase":"calc","description":"进入循环，计算 mid=(0+6)//2=3, nums[3]=7","arr":[4,5,6,7,0,1,2],"left":0,"right":6,"mid":3,"sortedHalf":null,"found":null,"target":0},
  {"lineNum":6,"phase":"compare","description":"nums[3]=7 ≠ target=0","arr":[4,5,6,7,0,1,2],"left":0,"right":6,"mid":3,"sortedHalf":null,"found":null,"target":0},
  {"lineNum":8,"phase":"judge","description":"nums[0]=4 <= nums[3]=7，左半段 [0..3] 有序","arr":[4,5,6,7,0,1,2],"left":0,"right":6,"mid":3,"sortedHalf":"left","found":null,"target":0},
  {"lineNum":9,"phase":"compare","description":"target=0 不在 [4,7) 范围内，排除左半段","arr":[4,5,6,7,0,1,2],"left":0,"right":6,"mid":3,"sortedHalf":"left","found":null,"target":0},
  {"lineNum":12,"phase":"shrink","description":"收缩 left = mid+1 = 4","arr":[4,5,6,7,0,1,2],"left":4,"right":6,"mid":3,"sortedHalf":null,"found":null,"target":0},
  {"lineNum":5,"phase":"calc","description":"计算 mid=(4+6)//2=5, nums[5]=1","arr":[4,5,6,7,0,1,2],"left":4,"right":6,"mid":5,"sortedHalf":null,"found":null,"target":0},
  {"lineNum":6,"phase":"compare","description":"nums[5]=1 ≠ target=0","arr":[4,5,6,7,0,1,2],"left":4,"right":6,"mid":5,"sortedHalf":null,"found":null,"target":0},
  {"lineNum":8,"phase":"judge","description":"nums[4]=0 <= nums[5]=1，左半段 [4..5] 有序","arr":[4,5,6,7,0,1,2],"left":4,"right":6,"mid":5,"sortedHalf":"left","found":null,"target":0},
  {"lineNum":9,"phase":"compare","description":"target=0 在 [0,1) 范围内，确认在左半段","arr":[4,5,6,7,0,1,2],"left":4,"right":6,"mid":5,"sortedHalf":"left","found":null,"target":0},
  {"lineNum":10,"phase":"shrink","description":"收缩 right = mid-1 = 4","arr":[4,5,6,7,0,1,2],"left":4,"right":4,"mid":5,"sortedHalf":null,"found":null,"target":0},
  {"lineNum":5,"phase":"calc","description":"计算 mid=(4+4)//2=4, nums[4]=0","arr":[4,5,6,7,0,1,2],"left":4,"right":4,"mid":4,"sortedHalf":null,"found":null,"target":0},
  {"lineNum":6,"phase":"found","description":"nums[4]=0 == target=0，找到目标！返回索引 4","arr":[4,5,6,7,0,1,2],"left":4,"right":4,"mid":4,"sortedHalf":null,"found":4,"target":0},
];

// ── Test Case 2: nums = [4,5,6,7,0,1,2], target = 3 → -1 ──
const steps2 = [
  {"lineNum":3,"phase":"init","description":"初始化 left=0, right=6, target=3","arr":[4,5,6,7,0,1,2],"left":0,"right":6,"mid":null,"sortedHalf":null,"found":null,"target":3},
  {"lineNum":5,"phase":"calc","description":"进入循环，计算 mid=(0+6)//2=3, nums[3]=7","arr":[4,5,6,7,0,1,2],"left":0,"right":6,"mid":3,"sortedHalf":null,"found":null,"target":3},
  {"lineNum":6,"phase":"compare","description":"nums[3]=7 ≠ target=3","arr":[4,5,6,7,0,1,2],"left":0,"right":6,"mid":3,"sortedHalf":null,"found":null,"target":3},
  {"lineNum":8,"phase":"judge","description":"nums[0]=4 <= nums[3]=7，左半段 [0..3] 有序","arr":[4,5,6,7,0,1,2],"left":0,"right":6,"mid":3,"sortedHalf":"left","found":null,"target":3},
  {"lineNum":9,"phase":"compare","description":"target=3 不在 [4,7) 范围内，排除左半段","arr":[4,5,6,7,0,1,2],"left":0,"right":6,"mid":3,"sortedHalf":"left","found":null,"target":3},
  {"lineNum":12,"phase":"shrink","description":"收缩 left = mid+1 = 4","arr":[4,5,6,7,0,1,2],"left":4,"right":6,"mid":3,"sortedHalf":null,"found":null,"target":3},
  {"lineNum":5,"phase":"calc","description":"计算 mid=(4+6)//2=5, nums[5]=1","arr":[4,5,6,7,0,1,2],"left":4,"right":6,"mid":5,"sortedHalf":null,"found":null,"target":3},
  {"lineNum":6,"phase":"compare","description":"nums[5]=1 ≠ target=3","arr":[4,5,6,7,0,1,2],"left":4,"right":6,"mid":5,"sortedHalf":null,"found":null,"target":3},
  {"lineNum":8,"phase":"judge","description":"nums[4]=0 <= nums[5]=1，左半段 [4..5] 有序","arr":[4,5,6,7,0,1,2],"left":4,"right":6,"mid":5,"sortedHalf":"left","found":null,"target":3},
  {"lineNum":9,"phase":"compare","description":"target=3 不在 [0,1) 范围内，排除左半段","arr":[4,5,6,7,0,1,2],"left":4,"right":6,"mid":5,"sortedHalf":"left","found":null,"target":3},
  {"lineNum":12,"phase":"shrink","description":"收缩 left = mid+1 = 6","arr":[4,5,6,7,0,1,2],"left":6,"right":6,"mid":5,"sortedHalf":null,"found":null,"target":3},
  {"lineNum":5,"phase":"calc","description":"计算 mid=(6+6)//2=6, nums[6]=2","arr":[4,5,6,7,0,1,2],"left":6,"right":6,"mid":6,"sortedHalf":null,"found":null,"target":3},
  {"lineNum":6,"phase":"compare","description":"nums[6]=2 ≠ target=3","arr":[4,5,6,7,0,1,2],"left":6,"right":6,"mid":6,"sortedHalf":null,"found":null,"target":3},
  {"lineNum":8,"phase":"judge","description":"nums[6]=2 <= nums[6]=2，左半段 [6..6] 有序","arr":[4,5,6,7,0,1,2],"left":6,"right":6,"mid":6,"sortedHalf":"left","found":null,"target":3},
  {"lineNum":9,"phase":"compare","description":"target=3 不在 [2,2) 范围内（空区间），排除","arr":[4,5,6,7,0,1,2],"left":6,"right":6,"mid":6,"sortedHalf":"left","found":null,"target":3},
  {"lineNum":12,"phase":"shrink","description":"收缩 left = mid+1 = 7","arr":[4,5,6,7,0,1,2],"left":7,"right":6,"mid":6,"sortedHalf":null,"found":null,"target":3},
  {"lineNum":18,"phase":"notfound","description":"left=7 > right=6，循环结束，target=3 不存在，返回 -1","arr":[4,5,6,7,0,1,2],"left":7,"right":6,"mid":null,"sortedHalf":null,"found":-1,"target":3},
];

const phaseLabels = { init: '初始化', calc: '计算中点', compare: '比较', judge: '判断有序半段', shrink: '收缩区间', found: '找到目标', notfound: '未找到' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">数组 nums（L = left，R = right，M = mid）</div>
      <div class="array-row" id="nums-array"></div>
      <div id="ptr-info-area" style="margin-top:10px;font-size:13px;font-family:monospace;color:var(--text-muted);display:flex;gap:16px;flex-wrap:wrap"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>L (left)</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>R (right)</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(251,146,60,0.4);border:1px solid #fb923c"></div>M (mid)</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(168,85,247,0.25);border:1px solid #a855f7"></div>有序半段</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '33. Search in Rotated Sorted Array — 执行可视化',
  problemDesc: `
    <p>整数数组 <code>nums</code> 按升序排列，在某个下标处进行了旋转。给你旋转后的数组 <code>nums</code> 和一个整数 <code>target</code>，如果 <code>target</code> 在数组中则返回其下标，否则返回 <code>-1</code>。要求时间复杂度为 <code>O(log n)</code>。</p>
    <div class="example">输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4</div>
  `,
  subtitle: `nums = [${ARR}], target = ${TARGET}`,
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'target = 0 (找到)', steps: steps1, subtitle: 'nums = [4,5,6,7,0,1,2], target = 0' },
    {
      name: 'target = 3 (未找到)', steps: steps2, subtitle: 'nums = [4,5,6,7,0,1,2], target = 3',
      setup(panel) { ARR = [4,5,6,7,0,1,2]; TARGET = 3; setupPanel(panel); }
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

      // Highlight sorted half
      let extraStyle = '';
      if (s.sortedHalf === 'left' && idx >= s.left && idx <= s.mid) {
        extraStyle = 'background:rgba(168,85,247,0.12);border-color:rgba(168,85,247,0.4);';
      } else if (s.sortedHalf === 'right' && idx >= s.mid && idx <= s.right) {
        extraStyle = 'background:rgba(168,85,247,0.12);border-color:rgba(168,85,247,0.4);';
      }

      let label = '';
      const labels = [];
      if (idx === s.left) labels.push('L');
      if (idx === s.mid) labels.push('M');
      if (idx === s.right) labels.push('R');
      label = labels.join(' ');

      const labelColor = labels.length > 1 ? '#a78bfa'
        : label === 'L' ? '#4ade80' : label === 'R' ? '#38bdf8' : label === 'M' ? '#fb923c' : '';

      return `<div class="${cls}" style="${extraStyle}">
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
      ${s.sortedHalf ? `<span style="color:#a855f7">有序半段: <b>${s.sortedHalf === 'left' ? '左' : '右'}</b></span>` : ''}
    `;

    const resultEl = document.getElementById('result-area');
    if (s.found !== null && s.found >= 0) {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">找到目标</div>
          <div class="found-sub" style="margin-top:4px">target=${target} 在索引 ${s.found} 处</div>
        </div>
      </div>`;
    } else if (s.found === -1) {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#ef4444;font-size:22px;font-weight:700">✗</div>
        <div>
          <div class="found-text" style="color:#ef4444;font-weight:600">未找到</div>
          <div class="found-sub" style="margin-top:4px">target=${target} 不存在，返回 -1</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
