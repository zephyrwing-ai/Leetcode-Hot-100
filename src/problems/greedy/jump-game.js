let NUMS = [2, 3, 1, 1, 4];

const code = [
  'class Solution:',
  '    def canJump(self, nums):',
  '        farthest = 0',
  '        for i in range(len(nums)):',
  '            if i > farthest:',
  '                return False',
  '            farthest = max(farthest, i+nums[i])',
  '        return True',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7 };

// ── Test Case 1: nums = [2,3,1,1,4] → true ──
const steps1 = [
  {
    lineNum: 3, phase: 'init',
    description: '初始化 farthest = 0',
    currentI: -1, farthest: 0, reachable: true, done: false, nums: [2,3,1,1,4],
  },
  {
    lineNum: 4, phase: 'scan',
    description: '进入循环 i=0, nums[0]=2, 可跳到 0+2=2',
    currentI: 0, farthest: 0, reachable: true, done: false, nums: [2,3,1,1,4],
  },
  {
    lineNum: 7, phase: 'update',
    description: 'farthest = max(0, 0+2) = 2',
    currentI: 0, farthest: 2, reachable: true, done: false, nums: [2,3,1,1,4],
  },
  {
    lineNum: 4, phase: 'scan',
    description: '遍历 i=1, nums[1]=3, 可跳到 1+3=4',
    currentI: 1, farthest: 2, reachable: true, done: false, nums: [2,3,1,1,4],
  },
  {
    lineNum: 7, phase: 'update',
    description: 'farthest = max(2, 1+3) = 4',
    currentI: 1, farthest: 4, reachable: true, done: false, nums: [2,3,1,1,4],
  },
  {
    lineNum: 4, phase: 'scan',
    description: '遍历 i=2, nums[2]=1, 可跳到 2+1=3',
    currentI: 2, farthest: 4, reachable: true, done: false, nums: [2,3,1,1,4],
  },
  {
    lineNum: 7, phase: 'judge',
    description: 'farthest = max(4, 2+1) = 4，不更新',
    currentI: 2, farthest: 4, reachable: true, done: false, nums: [2,3,1,1,4],
  },
  {
    lineNum: 4, phase: 'scan',
    description: '遍历 i=3, nums[3]=1, 可跳到 3+1=4',
    currentI: 3, farthest: 4, reachable: true, done: false, nums: [2,3,1,1,4],
  },
  {
    lineNum: 7, phase: 'judge',
    description: 'farthest = max(4, 3+1) = 4，不更新',
    currentI: 3, farthest: 4, reachable: true, done: false, nums: [2,3,1,1,4],
  },
  {
    lineNum: 4, phase: 'scan',
    description: '遍历 i=4, nums[4]=4, 可跳到 4+4=8',
    currentI: 4, farthest: 4, reachable: true, done: false, nums: [2,3,1,1,4],
  },
  {
    lineNum: 7, phase: 'update',
    description: 'farthest = max(4, 4+4) = 8',
    currentI: 4, farthest: 8, reachable: true, done: false, nums: [2,3,1,1,4],
  },
  {
    lineNum: 8, phase: 'record',
    description: '遍历结束，farthest=8 >= 4，可以到达终点，返回 True',
    currentI: -1, farthest: 8, reachable: true, done: true, nums: [2,3,1,1,4],
  },
];

// ── Test Case 2: nums = [3,2,1,0,4] → false ──
const steps2 = [
  {
    lineNum: 3, phase: 'init',
    description: '初始化 farthest = 0',
    currentI: -1, farthest: 0, reachable: true, done: false, nums: [3,2,1,0,4],
  },
  {
    lineNum: 4, phase: 'scan',
    description: '进入循环 i=0, nums[0]=3, 可跳到 0+3=3',
    currentI: 0, farthest: 0, reachable: true, done: false, nums: [3,2,1,0,4],
  },
  {
    lineNum: 7, phase: 'update',
    description: 'farthest = max(0, 0+3) = 3',
    currentI: 0, farthest: 3, reachable: true, done: false, nums: [3,2,1,0,4],
  },
  {
    lineNum: 4, phase: 'scan',
    description: '遍历 i=1, nums[1]=2, 可跳到 1+2=3',
    currentI: 1, farthest: 3, reachable: true, done: false, nums: [3,2,1,0,4],
  },
  {
    lineNum: 7, phase: 'judge',
    description: 'farthest = max(3, 1+2) = 3，不更新',
    currentI: 1, farthest: 3, reachable: true, done: false, nums: [3,2,1,0,4],
  },
  {
    lineNum: 4, phase: 'scan',
    description: '遍历 i=2, nums[2]=1, 可跳到 2+1=3',
    currentI: 2, farthest: 3, reachable: true, done: false, nums: [3,2,1,0,4],
  },
  {
    lineNum: 7, phase: 'judge',
    description: 'farthest = max(3, 2+1) = 3，不更新',
    currentI: 2, farthest: 3, reachable: true, done: false, nums: [3,2,1,0,4],
  },
  {
    lineNum: 4, phase: 'scan',
    description: '遍历 i=3, nums[3]=0, 可跳到 3+0=3',
    currentI: 3, farthest: 3, reachable: true, done: false, nums: [3,2,1,0,4],
  },
  {
    lineNum: 7, phase: 'judge',
    description: 'farthest = max(3, 3+0) = 3，不更新，被 0 卡住了',
    currentI: 3, farthest: 3, reachable: true, done: false, nums: [3,2,1,0,4],
  },
  {
    lineNum: 4, phase: 'scan',
    description: '遍历 i=4, 检查 i > farthest → 4 > 3',
    currentI: 4, farthest: 3, reachable: false, done: false, nums: [3,2,1,0,4],
  },
  {
    lineNum: 6, phase: 'record',
    description: 'i=4 > farthest=3，无法到达位置 4，返回 False',
    currentI: 4, farthest: 3, reachable: false, done: true, nums: [3,2,1,0,4],
  },
];

const phaseLabels = { init: '初始化', scan: '扫描', update: '更新', judge: '判断', record: '返回' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">数组 nums（蓝色 = 可达范围，黄色 = 当前位置）</div>
      <div class="array-row" id="nums-array"></div>
      <div class="legend-row">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(250,204,21,0.4);border:1px solid #facc15"></div>当前位置</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>可达范围</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>farthest 位置</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">状态追踪</div>
      <div id="status-area" style="font-family:var(--font-mono);font-size:14px;display:flex;flex-direction:column;gap:8px"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '55. Jump Game',
  problemDesc: `
    <p>给定一个非负整数数组 <code>nums</code>，你最初位于数组的第一个下标。数组中的每个元素代表你在该位置可以跳跃的最大长度。判断你是否能够到达最后一个下标。</p>
    <div class="example">输入：nums = [2,3,1,1,4]
输出：true
解释：从下标 0 跳 1 步到下标 1，然后跳 3 步到达最后一个下标</div>
  `,
  subtitle: `nums = [${NUMS}]`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: 'nums = [2,3,1,1,4]', steps: steps1, subtitle: 'nums = [2,3,1,1,4]' },
    {
      name: 'nums = [3,2,1,0,4]', steps: steps2, subtitle: 'nums = [3,2,1,0,4]',
      setup(panel) { NUMS = [3,2,1,0,4]; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const nums = s.nums || NUMS;
    // nums array
    document.getElementById('nums-array').innerHTML = nums.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx <= s.farthest && idx <= nums.length - 1) cls += ' in-window';
      if (idx === s.currentI) cls += ' is-active';
      if (idx === s.farthest && s.farthest <= nums.length - 1) cls += ' is-left';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div>${idx === s.farthest ? '<div class="arr-label" style="color:#4ade80">far</div>' : ''}</div>`;
    }).join('');

    // status
    const statusEl = document.getElementById('status-area');
    statusEl.innerHTML = `
      <div>farthest = <span style="font-weight:700;color:#4ade80">${s.farthest}</span></div>
      ${s.currentI >= 0 ? `<div style="color:var(--text-muted)">当前 i=${s.currentI}, i+nums[i] = ${s.currentI}+${nums[s.currentI]} = ${s.currentI + nums[s.currentI]}</div>` : ''}
    `;

    // found
    const foundEl = document.getElementById('found-area');
    if (s.done) {
      if (s.reachable) {
        foundEl.innerHTML = `<div class="card found-box">
          <div class="found-icon">\u2713</div>
          <div>
            <div class="found-text">返回 True</div>
            <div class="found-sub">farthest=${s.farthest} >= 末尾下标=${nums.length - 1}，可以到达终点</div>
          </div>
        </div>`;
      } else {
        foundEl.innerHTML = `<div class="card found-box">
          <div class="found-icon" style="color:#ef4444">\u2717</div>
          <div>
            <div class="found-text">返回 False</div>
            <div class="found-sub">farthest=${s.farthest} < i=${s.currentI}，无法到达终点</div>
          </div>
        </div>`;
      }
    } else {
      foundEl.innerHTML = '';
    }
  },
};
