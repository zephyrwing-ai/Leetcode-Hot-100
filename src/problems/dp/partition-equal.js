let NUMS = [1, 5, 11, 5];
let TOTAL = NUMS.reduce((a, b) => a + b, 0);
let TARGET = TOTAL / 2; // 11

const code = [
  'class Solution:',
  '    def canPartition(self, nums):',
  '        total = sum(nums)',
  '        if total % 2 != 0: return False',
  '        target = total // 2',
  '        dp = [[False]*(target+1) for _ in range(len(nums)+1)]',
  '        for i in range(len(nums)+1):',
  '            dp[i][0] = True',
  '        for i in range(1, len(nums)+1):',
  '            for j in range(1, target+1):',
  '                dp[i][j] = dp[i-1][j]',
  '                if j >= nums[i-1]:',
  '                    dp[i][j] = dp[i][j] or dp[i-1][j-nums[i-1]]',
  '        return dp[len(nums)][target]',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11, 13: 12, 14: 13 };

const F = false, T = true;

const steps1 = [
  {
    lineNum: 6, phase: 'init',
    description: '初始化 dp[5][12] 二维数组，全部为 False',
    nums: [1, 5, 11, 5], target: 11,
    dp: [
      [F,F,F,F,F,F,F,F,F,F,F,F],
      [F,F,F,F,F,F,F,F,F,F,F,F],
      [F,F,F,F,F,F,F,F,F,F,F,F],
      [F,F,F,F,F,F,F,F,F,F,F,F],
      [F,F,F,F,F,F,F,F,F,F,F,F],
    ],
    currentI: -1, currentJ: -1, sourceCell: null,
  },
  {
    lineNum: 8, phase: 'init',
    description: '设置 dp[i][0] = True（和为 0 总是可以的，不选任何数）',
    nums: [1, 5, 11, 5], target: 11,
    dp: [
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,F,F,F,F,F,F,F,F,F,F,F],
    ],
    currentI: -1, currentJ: 0, sourceCell: null,
  },
  {
    lineNum: 9, phase: 'fill',
    description: 'i=1(nums[0]=1): 开始处理第一个数字',
    nums: [1, 5, 11, 5], target: 11,
    dp: [
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,F,F,F,F,F,F,F,F,F,F,F],
    ],
    currentI: 1, currentJ: -1, sourceCell: null,
  },
  {
    lineNum: 11, phase: 'fill',
    description: 'i=1, j=1: dp[1][1] = dp[0][1] or dp[0][0] = True（选数字 1）',
    nums: [1, 5, 11, 5], target: 11,
    dp: [
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,T,F,F,F,F,F,F,F,F,F,F],
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,F,F,F,F,F,F,F,F,F,F,F],
    ],
    currentI: 1, currentJ: 1, sourceCell: { r: 0, c: 0 },
  },
  {
    lineNum: 11, phase: 'fill',
    description: 'i=1: j=2~11 全为 False（只有数字 1，无法凑出更大的和）',
    nums: [1, 5, 11, 5], target: 11,
    dp: [
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,T,F,F,F,F,F,F,F,F,F,F],
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,F,F,F,F,F,F,F,F,F,F,F],
    ],
    currentI: 1, currentJ: 11, sourceCell: null,
  },
  {
    lineNum: 11, phase: 'fill',
    description: 'i=2(nums[1]=5): j=1, dp[2][1] = dp[1][1] = True（继承）',
    nums: [1, 5, 11, 5], target: 11,
    dp: [
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,T,F,F,F,F,F,F,F,F,F,F],
      [T,T,F,F,F,F,F,F,F,F,F,F],
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,F,F,F,F,F,F,F,F,F,F,F],
    ],
    currentI: 2, currentJ: 1, sourceCell: { r: 1, c: 1 },
  },
  {
    lineNum: 13, phase: 'fill',
    description: 'i=2: j=5, dp[2][5] = dp[1][5] or dp[1][0] = True（选数字 5）',
    nums: [1, 5, 11, 5], target: 11,
    dp: [
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,T,F,F,F,F,F,F,F,F,F,F],
      [T,T,F,F,F,T,F,F,F,F,F,F],
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,F,F,F,F,F,F,F,F,F,F,F],
    ],
    currentI: 2, currentJ: 5, sourceCell: { r: 1, c: 0 },
  },
  {
    lineNum: 13, phase: 'fill',
    description: 'i=2: j=6, dp[2][6] = dp[1][6] or dp[1][1] = True（1+5=6）',
    nums: [1, 5, 11, 5], target: 11,
    dp: [
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,T,F,F,F,F,F,F,F,F,F,F],
      [T,T,F,F,F,T,T,F,F,F,F,F],
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,F,F,F,F,F,F,F,F,F,F,F],
    ],
    currentI: 2, currentJ: 6, sourceCell: { r: 1, c: 1 },
  },
  {
    lineNum: 11, phase: 'fill',
    description: 'i=3(nums[2]=11): 继承 i=2 的结果，j=1→T, j=5→T, j=6→T',
    nums: [1, 5, 11, 5], target: 11,
    dp: [
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,T,F,F,F,F,F,F,F,F,F,F],
      [T,T,F,F,F,T,T,F,F,F,F,F],
      [T,T,F,F,F,T,T,F,F,F,F,F],
      [T,F,F,F,F,F,F,F,F,F,F,F],
    ],
    currentI: 3, currentJ: 6, sourceCell: { r: 2, c: 6 },
  },
  {
    lineNum: 13, phase: 'fill',
    description: 'i=3: j=11, dp[3][11] = dp[2][11] or dp[2][0] = True（选数字 11）',
    nums: [1, 5, 11, 5], target: 11,
    dp: [
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,T,F,F,F,F,F,F,F,F,F,F],
      [T,T,F,F,F,T,T,F,F,F,F,F],
      [T,T,F,F,F,T,T,F,F,F,F,T],
      [T,F,F,F,F,F,F,F,F,F,F,F],
    ],
    currentI: 3, currentJ: 11, sourceCell: { r: 2, c: 0 },
  },
  {
    lineNum: 11, phase: 'fill',
    description: 'i=4(nums[3]=5): 继承 i=3 的结果',
    nums: [1, 5, 11, 5], target: 11,
    dp: [
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,T,F,F,F,F,F,F,F,F,F,F],
      [T,T,F,F,F,T,T,F,F,F,F,F],
      [T,T,F,F,F,T,T,F,F,F,F,T],
      [T,T,F,F,F,T,T,F,F,F,F,T],
    ],
    currentI: 4, currentJ: -1, sourceCell: null,
  },
  {
    lineNum: 13, phase: 'fill',
    description: 'i=4: j=5→True（继承），j=6→True，j=10→dp[3][5]=True',
    nums: [1, 5, 11, 5], target: 11,
    dp: [
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,T,F,F,F,F,F,F,F,F,F,F],
      [T,T,F,F,F,T,T,F,F,F,F,F],
      [T,T,F,F,F,T,T,F,F,F,F,T],
      [T,T,F,F,F,T,T,F,F,F,T,T],
    ],
    currentI: 4, currentJ: 10, sourceCell: { r: 3, c: 5 },
  },
  {
    lineNum: 13, phase: 'fill',
    description: 'i=4: j=11, dp[4][11] = dp[3][11]=True，确认 dp[4][11]=True',
    nums: [1, 5, 11, 5], target: 11,
    dp: [
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,T,F,F,F,F,F,F,F,F,F,F],
      [T,T,F,F,F,T,T,F,F,F,F,F],
      [T,T,F,F,F,T,T,F,F,F,F,T],
      [T,T,F,F,F,T,T,F,F,F,T,T],
    ],
    currentI: 4, currentJ: 11, sourceCell: { r: 3, c: 11 },
  },
  {
    lineNum: 14, phase: 'done',
    description: '返回 dp[4][11] = True，可以将数组分为 {1,5,5} 和 {11}，和都为 11',
    nums: [1, 5, 11, 5], target: 11,
    dp: [
      [T,F,F,F,F,F,F,F,F,F,F,F],
      [T,T,F,F,F,F,F,F,F,F,F,F],
      [T,T,F,F,F,T,T,F,F,F,F,F],
      [T,T,F,F,F,T,T,F,F,F,F,T],
      [T,T,F,F,F,T,T,F,F,F,T,T],
    ],
    currentI: -1, currentJ: -1, sourceCell: null,
  },
];

// Test case 2: nums = [1,2,3,5], total=11 (odd) -> false
// Actually total=11 is odd, so immediately return False
const steps2 = [
  {
    lineNum: 3, phase: 'init',
    description: '读取数组 nums = [1, 2, 3, 5]',
    nums: [1, 2, 3, 5], target: 5,
    dp: [],
    currentI: -1, currentJ: -1, sourceCell: null,
  },
  {
    lineNum: 3, phase: 'init',
    description: '计算 total = sum([1,2,3,5]) = 11',
    nums: [1, 2, 3, 5], target: 5,
    dp: [],
    currentI: -1, currentJ: -1, sourceCell: null,
  },
  {
    lineNum: 4, phase: 'init',
    description: 'total = 11 是奇数，11 % 2 != 0，无法平分！',
    nums: [1, 2, 3, 5], target: 5,
    dp: [],
    currentI: -1, currentJ: -1, sourceCell: null,
  },
  {
    lineNum: 4, phase: 'done',
    description: '直接返回 False，奇数总和不可能平分为两个相等的子集',
    nums: [1, 2, 3, 5], target: 5,
    dp: [],
    currentI: -1, currentJ: -1, sourceCell: null,
  },
];

const phaseLabels = { init: '初始化', fill: '填表', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">nums 数组</div>
      <div class="array-row" id="nums-array"></div>
    </div>
    <div class="card">
      <div class="section-title">DP 表（行=前 i 个数，列=目标和 j，T=可达，F=不可达）</div>
      <div style="overflow-x:auto">
        <table class="hashmap-table" id="dp-table">
          <thead id="dp-thead"></thead>
          <tbody id="dp-tbody"></tbody>
        </table>
      </div>
      <div class="legend-row">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(34,211,238,0.4);border:1px solid #22d3ee"></div>当前填充</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>来源参考</div>
      </div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '416. Partition Equal Subset Sum — 执行可视化',
  problemDesc: `
    <p>给你一个只包含正整数的非空数组 <code>nums</code>，判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。</p>
    <div class="example">输入：nums = [1,5,11,5]
输出：true
解释：数组可以分割成 [1,5,5] 和 [11]，和都为 11</div>
    <p>提示：本质是 0-1 背包问题，目标和为数组总和的一半。</p>
  `,
  subtitle: `nums = [${NUMS}], target = ${TARGET}`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '可以平分 (true)', steps: steps1, subtitle: 'nums = [1,5,11,5], target = 11' },
    { name: '奇数总和 (false)', steps: steps2, subtitle: 'nums = [1,2,3,5], total=11 奇数', setup(panel) { NUMS = [1,2,3,5]; TOTAL = 11; TARGET = 5; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const nums = s.nums || NUMS;
    const target = s.target || TARGET;
    document.getElementById('nums-array').innerHTML = nums.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx + 1 === s.currentI) cls += ' is-active';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    if (s.dp.length === 0) {
      // Early return case (odd total)
      document.getElementById('dp-thead').innerHTML = '';
      document.getElementById('dp-tbody').innerHTML = `<tr><td colspan="99" style="text-align:center;color:#f87171;font-weight:700;padding:20px">总和 = ${nums.reduce((a,b)=>a+b,0)} 为奇数，无法平分，直接返回 False</td></tr>`;
    } else {
      const headerCols = ['i\\j'];
      for (let j = 0; j <= target; j++) headerCols.push(j);
      document.getElementById('dp-thead').innerHTML = `<tr>${headerCols.map(h => `<th>${h}</th>`).join('')}</tr>`;

      document.getElementById('dp-tbody').innerHTML = s.dp.map((row, i) => {
        const label = i === 0 ? '0(-)' : `${i}(${nums[i-1]})`;
        const cells = row.map((v, j) => {
          let cls = '';
          if (i === s.currentI && j === s.currentJ) cls = 'current';
          if (s.sourceCell && s.sourceCell.r === i && s.sourceCell.c === j) cls = 'in-window';
          const display = v ? 'T' : '\u00b7';
          const style = v ? 'color:#4ade80;font-weight:700' : 'color:var(--text-muted)';
          return `<td class="${cls}" style="${style}">${display}</td>`;
        }).join('');
        return `<tr><td style="font-weight:700">${label}</td>${cells}</tr>`;
      }).join('');
    }

    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      const result = s.dp.length > 0 && s.dp[s.dp.length-1][target];
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">${result ? '\u2713' : '\u2717'}</div>
        <div>
          <div class="found-text">${result ? `dp[${nums.length}][${target}] = True` : 'False'}</div>
          <div class="found-sub">${result ? `可以分为两个等和子集` : `无法分为两个等和子集`}</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
