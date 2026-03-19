const code = [
  'class Solution:',
  '    def maxSubArray(self, nums):',
  '        current_sum = max_sum = nums[0]',
  '        for i in range(1, len(nums)):',
  '            current_sum = max(nums[i], current_sum + nums[i])',
  '            max_sum = max(max_sum, current_sum)',
  '        return max_sum',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 };

let NUMS = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

const steps1 = [
  {"lineNum":2,"phase":"init","description":"初始化 current_sum = max_sum = nums[0] = -2","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":0,"current_sum":-2,"max_sum":-2,"activeIdx":0,"bestRange":null},
  {"lineNum":3,"phase":"scan","description":"i=1，检查 nums[1]=1","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":1,"current_sum":-2,"max_sum":-2,"activeIdx":1,"bestRange":null},
  {"lineNum":4,"phase":"update","description":"current_sum = max(1, -2+1) = 1，重新开始子数组","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":1,"current_sum":1,"max_sum":-2,"activeIdx":1,"bestRange":null},
  {"lineNum":5,"phase":"record","description":"max_sum = max(-2, 1) = 1，更新最大和","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":1,"current_sum":1,"max_sum":1,"activeIdx":1,"bestRange":[1,1]},
  {"lineNum":3,"phase":"scan","description":"i=2，检查 nums[2]=-3","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":2,"current_sum":1,"max_sum":1,"activeIdx":2,"bestRange":[1,1]},
  {"lineNum":4,"phase":"update","description":"current_sum = max(-3, 1+(-3)) = -2，继续累加","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":2,"current_sum":-2,"max_sum":1,"activeIdx":2,"bestRange":[1,1]},
  {"lineNum":3,"phase":"scan","description":"i=3，检查 nums[3]=4","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":3,"current_sum":-2,"max_sum":1,"activeIdx":3,"bestRange":[1,1]},
  {"lineNum":4,"phase":"update","description":"current_sum = max(4, -2+4) = 4，重新开始子数组","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":3,"current_sum":4,"max_sum":1,"activeIdx":3,"bestRange":[1,1]},
  {"lineNum":5,"phase":"record","description":"max_sum = max(1, 4) = 4，更新最大和","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":3,"current_sum":4,"max_sum":4,"activeIdx":3,"bestRange":[3,3]},
  {"lineNum":3,"phase":"scan","description":"i=4，检查 nums[4]=-1","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":4,"current_sum":4,"max_sum":4,"activeIdx":4,"bestRange":[3,3]},
  {"lineNum":4,"phase":"update","description":"current_sum = max(-1, 4+(-1)) = 3，继续累加","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":4,"current_sum":3,"max_sum":4,"activeIdx":4,"bestRange":[3,3]},
  {"lineNum":3,"phase":"scan","description":"i=5，检查 nums[5]=2","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":5,"current_sum":3,"max_sum":4,"activeIdx":5,"bestRange":[3,3]},
  {"lineNum":4,"phase":"update","description":"current_sum = max(2, 3+2) = 5","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":5,"current_sum":5,"max_sum":4,"activeIdx":5,"bestRange":[3,3]},
  {"lineNum":5,"phase":"record","description":"max_sum = max(4, 5) = 5，更新最大和","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":5,"current_sum":5,"max_sum":5,"activeIdx":5,"bestRange":[3,5]},
  {"lineNum":3,"phase":"scan","description":"i=6，检查 nums[6]=1","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":6,"current_sum":5,"max_sum":5,"activeIdx":6,"bestRange":[3,5]},
  {"lineNum":4,"phase":"update","description":"current_sum = max(1, 5+1) = 6","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":6,"current_sum":6,"max_sum":5,"activeIdx":6,"bestRange":[3,5]},
  {"lineNum":5,"phase":"record","description":"max_sum = max(5, 6) = 6，更新最大和","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":6,"current_sum":6,"max_sum":6,"activeIdx":6,"bestRange":[3,6]},
  {"lineNum":3,"phase":"scan","description":"i=7，检查 nums[7]=-5","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":7,"current_sum":6,"max_sum":6,"activeIdx":7,"bestRange":[3,6]},
  {"lineNum":4,"phase":"update","description":"current_sum = max(-5, 6+(-5)) = 1，继续累加","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":7,"current_sum":1,"max_sum":6,"activeIdx":7,"bestRange":[3,6]},
  {"lineNum":3,"phase":"scan","description":"i=8，检查 nums[8]=4","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":8,"current_sum":1,"max_sum":6,"activeIdx":8,"bestRange":[3,6]},
  {"lineNum":4,"phase":"update","description":"current_sum = max(4, 1+4) = 5，遍历结束","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":8,"current_sum":5,"max_sum":6,"activeIdx":8,"bestRange":[3,6]},
  {"lineNum":6,"phase":"record","description":"返回 max_sum = 6，最大子数组为 [4,-1,2,1]","nums":[-2,1,-3,4,-1,2,1,-5,4],"i":8,"current_sum":5,"max_sum":6,"activeIdx":-1,"bestRange":[3,6]}
];

// Test case 2: nums = [5,4,-1,7,8] → max_sum = 23 (entire array)
const steps2 = [
  {"lineNum":2,"phase":"init","description":"初始化 current_sum = max_sum = nums[0] = 5","nums":[5,4,-1,7,8],"i":0,"current_sum":5,"max_sum":5,"activeIdx":0,"bestRange":[0,0]},
  {"lineNum":3,"phase":"scan","description":"i=1，检查 nums[1]=4","nums":[5,4,-1,7,8],"i":1,"current_sum":5,"max_sum":5,"activeIdx":1,"bestRange":[0,0]},
  {"lineNum":4,"phase":"update","description":"current_sum = max(4, 5+4) = 9，继续累加","nums":[5,4,-1,7,8],"i":1,"current_sum":9,"max_sum":5,"activeIdx":1,"bestRange":[0,0]},
  {"lineNum":5,"phase":"record","description":"max_sum = max(5, 9) = 9，更新最大和","nums":[5,4,-1,7,8],"i":1,"current_sum":9,"max_sum":9,"activeIdx":1,"bestRange":[0,1]},
  {"lineNum":3,"phase":"scan","description":"i=2，检查 nums[2]=-1","nums":[5,4,-1,7,8],"i":2,"current_sum":9,"max_sum":9,"activeIdx":2,"bestRange":[0,1]},
  {"lineNum":4,"phase":"update","description":"current_sum = max(-1, 9+(-1)) = 8，继续累加","nums":[5,4,-1,7,8],"i":2,"current_sum":8,"max_sum":9,"activeIdx":2,"bestRange":[0,1]},
  {"lineNum":3,"phase":"scan","description":"i=3，检查 nums[3]=7","nums":[5,4,-1,7,8],"i":3,"current_sum":8,"max_sum":9,"activeIdx":3,"bestRange":[0,1]},
  {"lineNum":4,"phase":"update","description":"current_sum = max(7, 8+7) = 15","nums":[5,4,-1,7,8],"i":3,"current_sum":15,"max_sum":9,"activeIdx":3,"bestRange":[0,1]},
  {"lineNum":5,"phase":"record","description":"max_sum = max(9, 15) = 15，更新最大和","nums":[5,4,-1,7,8],"i":3,"current_sum":15,"max_sum":15,"activeIdx":3,"bestRange":[0,3]},
  {"lineNum":3,"phase":"scan","description":"i=4，检查 nums[4]=8","nums":[5,4,-1,7,8],"i":4,"current_sum":15,"max_sum":15,"activeIdx":4,"bestRange":[0,3]},
  {"lineNum":4,"phase":"update","description":"current_sum = max(8, 15+8) = 23","nums":[5,4,-1,7,8],"i":4,"current_sum":23,"max_sum":15,"activeIdx":4,"bestRange":[0,3]},
  {"lineNum":5,"phase":"record","description":"max_sum = max(15, 23) = 23，更新最大和","nums":[5,4,-1,7,8],"i":4,"current_sum":23,"max_sum":23,"activeIdx":4,"bestRange":[0,4]},
  {"lineNum":6,"phase":"record","description":"返回 max_sum = 23，最大子数组为 [5,4,-1,7,8]（整个数组）","nums":[5,4,-1,7,8],"i":4,"current_sum":23,"max_sum":23,"activeIdx":-1,"bestRange":[0,4]}
];

const phaseLabels = { init: '初始化', scan: '扫描', update: '更新', record: '记录' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">数组 nums（高亮当前扫描位置）</div>
      <div class="array-row" id="nums-array"></div>
      <div id="sum-info" style="margin-top:12px;display:flex;gap:20px;font-size:14px;font-family:monospace"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>当前位置</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.25);border:1px solid #4ade80"></div>最大子数组范围</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '53. Maximum Subarray — 执行可视化',
  problemDesc: `
    <p>给你一个整数数组 <code>nums</code>，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。</p>
    <div class="example">输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6。</div>
    <p><strong>提示：</strong>子数组是数组中的一个连续部分。</p>
  `,
  subtitle: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '含负数混合', steps: steps1, subtitle: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]' },
    { name: '全正数为主', steps: steps2, subtitle: 'nums = [5, 4, -1, 7, 8]', setup(panel) { NUMS = [5,4,-1,7,8]; setupPanel(panel); } },
  ],

  setup: setupPanel,

  render(s) {
    const arr = s.nums || NUMS;
    document.getElementById('nums-array').innerHTML = arr.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.activeIdx) cls += ' is-active';
      if (s.bestRange && idx >= s.bestRange[0] && idx <= s.bestRange[1]) cls += ' in-window';
      return `<div class="${cls}">
        <div class="arr-val">${v}</div>
        <div class="arr-idx">[${idx}]</div>
      </div>`;
    }).join('');

    document.getElementById('sum-info').innerHTML = `
      <span style="color:#38bdf8">current_sum = <b>${s.current_sum}</b></span>
      <span style="color:#4ade80">max_sum = <b>${s.max_sum}</b></span>
    `;

    const resultEl = document.getElementById('result-area');
    if (s.phase === 'record' && s.activeIdx === -1) {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">最大子数组和</div>
          <div class="found-sub" style="margin-top:4px">max_sum = ${s.max_sum}，子数组 = [${arr.slice(s.bestRange[0], s.bestRange[1] + 1).join(', ')}]</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
