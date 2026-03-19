let NUMS = [2, 7, 9, 3, 1];

const code = [
  'class Solution:',
  '    def rob(self, nums):',
  '        n = len(nums)',
  '        if n == 0: return 0',
  '        if n == 1: return nums[0]',
  '        dp = [0] * n',
  '        dp[0] = nums[0]',
  '        dp[1] = max(nums[0], nums[1])',
  '        for i in range(2, n):',
  '            dp[i] = max(dp[i-1], dp[i-2] + nums[i])',
  '        return dp[-1]',
];

const lineMap = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10 };

// ── Test Case 1: nums = [2,7,9,3,1] ──
const steps1 = [
  {
    lineNum: 3, phase: 'init',
    description: '计算数组长度 n = 5',
    dp: null, currentI: -1, sources: [], choice: null, nums: [2,7,9,3,1],
  },
  {
    lineNum: 6, phase: 'init',
    description: '创建 dp 数组，长度 5，初始值全为 0',
    dp: [0, 0, 0, 0, 0], currentI: -1, sources: [], choice: null, nums: [2,7,9,3,1],
  },
  {
    lineNum: 7, phase: 'init',
    description: 'dp[0] = nums[0] = 2 — 只有第一间房可偷，最大金额就是 2',
    dp: [2, 0, 0, 0, 0], currentI: 0, sources: [], choice: 'rob', nums: [2,7,9,3,1],
  },
  {
    lineNum: 8, phase: 'init',
    description: 'dp[1] = max(nums[0], nums[1]) = max(2, 7) = 7 — 前两间房选金额更大的偷',
    dp: [2, 7, 0, 0, 0], currentI: 1, sources: [0], choice: 'skip', nums: [2,7,9,3,1],
  },
  {
    lineNum: 9, phase: 'fill',
    description: '进入循环 i=2，开始逐个填充 dp 表',
    dp: [2, 7, 0, 0, 0], currentI: 2, sources: [], choice: null, nums: [2,7,9,3,1],
  },
  {
    lineNum: 10, phase: 'fill',
    description: 'i=2: 比较 — 偷: dp[0]+nums[2] = 2+9 = 11，不偷: dp[1] = 7',
    dp: [2, 7, 0, 0, 0], currentI: 2, sources: [0, 1], choice: null, nums: [2,7,9,3,1],
  },
  {
    lineNum: 10, phase: 'fill',
    description: 'i=2: 11 > 7，选择偷第 2 间 → dp[2] = 11',
    dp: [2, 7, 11, 0, 0], currentI: 2, sources: [0, 1], choice: 'rob', nums: [2,7,9,3,1],
  },
  {
    lineNum: 9, phase: 'fill',
    description: '回到循环头，i 递增为 3',
    dp: [2, 7, 11, 0, 0], currentI: 3, sources: [], choice: null, nums: [2,7,9,3,1],
  },
  {
    lineNum: 10, phase: 'fill',
    description: 'i=3: 比较 — 偷: dp[1]+nums[3] = 7+3 = 10，不偷: dp[2] = 11',
    dp: [2, 7, 11, 0, 0], currentI: 3, sources: [1, 2], choice: null, nums: [2,7,9,3,1],
  },
  {
    lineNum: 10, phase: 'fill',
    description: 'i=3: 10 < 11，不偷第 3 间更划算 → dp[3] = 11',
    dp: [2, 7, 11, 11, 0], currentI: 3, sources: [1, 2], choice: 'skip', nums: [2,7,9,3,1],
  },
  {
    lineNum: 9, phase: 'fill',
    description: '回到循环头，i 递增为 4',
    dp: [2, 7, 11, 11, 0], currentI: 4, sources: [], choice: null, nums: [2,7,9,3,1],
  },
  {
    lineNum: 10, phase: 'fill',
    description: 'i=4: 比较 — 偷: dp[2]+nums[4] = 11+1 = 12，不偷: dp[3] = 11',
    dp: [2, 7, 11, 11, 0], currentI: 4, sources: [2, 3], choice: null, nums: [2,7,9,3,1],
  },
  {
    lineNum: 10, phase: 'fill',
    description: 'i=4: 12 > 11，选择偷第 4 间 → dp[4] = 12',
    dp: [2, 7, 11, 11, 12], currentI: 4, sources: [2, 3], choice: 'rob', nums: [2,7,9,3,1],
  },
  {
    lineNum: 11, phase: 'done',
    description: '循环结束，返回 dp[-1] = dp[4] = 12，最大偷盗金额为 12',
    dp: [2, 7, 11, 11, 12], currentI: -1, sources: [], choice: null, nums: [2,7,9,3,1],
  },
];

// ── Test Case 2: nums = [1,2,3,1] ──
const steps2 = [
  {
    lineNum: 3, phase: 'init',
    description: '计算数组长度 n = 4',
    dp: null, currentI: -1, sources: [], choice: null, nums: [1,2,3,1],
  },
  {
    lineNum: 6, phase: 'init',
    description: '创建 dp 数组，长度 4，初始值全为 0',
    dp: [0, 0, 0, 0], currentI: -1, sources: [], choice: null, nums: [1,2,3,1],
  },
  {
    lineNum: 7, phase: 'init',
    description: 'dp[0] = nums[0] = 1 — 只有第一间房，偷它得 1',
    dp: [1, 0, 0, 0], currentI: 0, sources: [], choice: 'rob', nums: [1,2,3,1],
  },
  {
    lineNum: 8, phase: 'init',
    description: 'dp[1] = max(nums[0], nums[1]) = max(1, 2) = 2 — 第二间金额更大',
    dp: [1, 2, 0, 0], currentI: 1, sources: [0], choice: 'skip', nums: [1,2,3,1],
  },
  {
    lineNum: 9, phase: 'fill',
    description: '进入循环 i=2',
    dp: [1, 2, 0, 0], currentI: 2, sources: [], choice: null, nums: [1,2,3,1],
  },
  {
    lineNum: 10, phase: 'fill',
    description: 'i=2: 比较 — 偷: dp[0]+nums[2] = 1+3 = 4，不偷: dp[1] = 2',
    dp: [1, 2, 0, 0], currentI: 2, sources: [0, 1], choice: null, nums: [1,2,3,1],
  },
  {
    lineNum: 10, phase: 'fill',
    description: 'i=2: 4 > 2，选择偷第 2 间 → dp[2] = 4',
    dp: [1, 2, 4, 0], currentI: 2, sources: [0, 1], choice: 'rob', nums: [1,2,3,1],
  },
  {
    lineNum: 9, phase: 'fill',
    description: '回到循环头，i 递增为 3',
    dp: [1, 2, 4, 0], currentI: 3, sources: [], choice: null, nums: [1,2,3,1],
  },
  {
    lineNum: 10, phase: 'fill',
    description: 'i=3: 比较 — 偷: dp[1]+nums[3] = 2+1 = 3，不偷: dp[2] = 4',
    dp: [1, 2, 4, 0], currentI: 3, sources: [1, 2], choice: null, nums: [1,2,3,1],
  },
  {
    lineNum: 10, phase: 'fill',
    description: 'i=3: 3 < 4，不偷第 3 间更划算 → dp[3] = 4',
    dp: [1, 2, 4, 4], currentI: 3, sources: [1, 2], choice: 'skip', nums: [1,2,3,1],
  },
  {
    lineNum: 11, phase: 'done',
    description: '循环结束，返回 dp[-1] = dp[3] = 4，最大偷盗金额为 4',
    dp: [1, 2, 4, 4], currentI: -1, sources: [], choice: null, nums: [1,2,3,1],
  },
];

const phaseLabels = { init: '初始化', fill: '填表', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">房屋金额 nums</div>
      <div class="array-row" id="nums-array"></div>
    </div>
    <div class="card">
      <div class="section-title">DP 数组（dp[i] = 前 i+1 间房的最大偷盗金额）</div>
      <div class="array-row" id="dp-array"></div>
      <div class="legend-row">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(34,211,238,0.4);border:1px solid #22d3ee"></div>当前填充</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>来源参考</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">决策</div>
      <div id="decision-area" style="font-family:var(--font-mono);font-size:14px"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '198. House Robber — 执行可视化',
  problemDesc: `
    <p>你是一个专业的小偷，沿街的每间房屋都藏有一定现金。相邻的房屋装有互相连通的防盗系统，如果两间相邻的房屋在同一晚上被闯入，系统会自动报警。给定一个数组 <code>nums</code> 代表每间房屋的金额，计算在不触动警报的情况下能偷到的最高金额。</p>
    <div class="example">输入：nums = [2,7,9,3,1]
输出：12
解释：偷第 0、2、4 间房，金额 = 2 + 9 + 1 = 12</div>
  `,
  subtitle: `nums = [${NUMS}]`,
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'nums = [2,7,9,3,1]', steps: steps1, subtitle: 'nums = [2,7,9,3,1]' },
    {
      name: 'nums = [1,2,3,1]', steps: steps2, subtitle: 'nums = [1,2,3,1]',
      setup(panel) { NUMS = [1,2,3,1]; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const nums = s.nums || NUMS;
    document.getElementById('nums-array').innerHTML = nums.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.currentI) cls += ' is-active';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    const dpEl = document.getElementById('dp-array');
    if (!s.dp) { dpEl.innerHTML = '<span style="color:var(--text-muted)">（尚未创建）</span>'; }
    else {
      dpEl.innerHTML = s.dp.map((v, idx) => {
        let cls = 'arr-cell';
        if (idx === s.currentI) cls += ' current';
        if (s.sources.includes(idx)) cls += ' in-window';
        return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
      }).join('');
    }

    const decEl = document.getElementById('decision-area');
    if (s.currentI >= 2 && s.phase === 'fill' && s.choice) {
      const robVal = s.dp[s.currentI - 2] + nums[s.currentI];
      const skipVal = s.dp[s.currentI - 1];
      const choiceText = s.choice === 'rob' ? '偷（dp[i-2] + nums[i]）' : '跳过（dp[i-1]）';
      decEl.innerHTML = `
        <div>偷: dp[${s.currentI-2}] + nums[${s.currentI}] = ${s.dp[s.currentI-2]} + ${nums[s.currentI]} = ${robVal}</div>
        <div>跳过: dp[${s.currentI-1}] = ${skipVal}</div>
        <div style="color:#22d3ee;font-weight:700">选择: ${choiceText} → dp[${s.currentI}] = ${s.dp[s.currentI]}</div>
      `;
    } else {
      decEl.innerHTML = `<div style="color:var(--text-muted)">dp[i] = max(dp[i-1], dp[i-2] + nums[i])</div>`;
    }

    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      const finalVal = s.dp[s.dp.length - 1];
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">最大偷盗金额 = ${finalVal}</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
