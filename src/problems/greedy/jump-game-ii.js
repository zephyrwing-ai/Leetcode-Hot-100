let NUMS = [2, 3, 1, 1, 4];

const code = [
  'class Solution:',
  '    def jump(self, nums):',
  '        jumps = 0',
  '        cur_end = 0',
  '        farthest = 0',
  '        for i in range(len(nums)-1):',
  '            farthest = max(farthest, i+nums[i])',
  '            if i == cur_end:',
  '                jumps += 1',
  '                cur_end = farthest',
  '        return jumps',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10 };

// ── Test Case 1: nums = [2,3,1,1,4] ──
const steps1 = [
  {
    lineNum: 3, phase: 'init',
    description: '初始化 jumps=0, cur_end=0, farthest=0',
    currentI: -1, jumps: 0, curEnd: 0, farthest: 0, justJumped: false, nums: [2,3,1,1,4],
  },
  {
    lineNum: 6, phase: 'scan',
    description: '进入循环 i=0, nums[0]=2, i+nums[i]=2',
    currentI: 0, jumps: 0, curEnd: 0, farthest: 0, justJumped: false, nums: [2,3,1,1,4],
  },
  {
    lineNum: 7, phase: 'update',
    description: 'farthest = max(0, 0+2) = 2',
    currentI: 0, jumps: 0, curEnd: 0, farthest: 2, justJumped: false, nums: [2,3,1,1,4],
  },
  {
    lineNum: 8, phase: 'judge',
    description: 'i=0 == cur_end=0，需要跳跃！jumps=1, cur_end=2',
    currentI: 0, jumps: 1, curEnd: 2, farthest: 2, justJumped: true, nums: [2,3,1,1,4],
  },
  {
    lineNum: 6, phase: 'scan',
    description: '遍历 i=1, nums[1]=3, i+nums[i]=4',
    currentI: 1, jumps: 1, curEnd: 2, farthest: 2, justJumped: false, nums: [2,3,1,1,4],
  },
  {
    lineNum: 7, phase: 'update',
    description: 'farthest = max(2, 1+3) = 4',
    currentI: 1, jumps: 1, curEnd: 2, farthest: 4, justJumped: false, nums: [2,3,1,1,4],
  },
  {
    lineNum: 8, phase: 'judge',
    description: 'i=1 != cur_end=2，继续扫描',
    currentI: 1, jumps: 1, curEnd: 2, farthest: 4, justJumped: false, nums: [2,3,1,1,4],
  },
  {
    lineNum: 6, phase: 'scan',
    description: '遍历 i=2, nums[2]=1, i+nums[i]=3',
    currentI: 2, jumps: 1, curEnd: 2, farthest: 4, justJumped: false, nums: [2,3,1,1,4],
  },
  {
    lineNum: 7, phase: 'judge',
    description: 'farthest = max(4, 2+1) = 4，不更新',
    currentI: 2, jumps: 1, curEnd: 2, farthest: 4, justJumped: false, nums: [2,3,1,1,4],
  },
  {
    lineNum: 8, phase: 'judge',
    description: 'i=2 == cur_end=2，需要跳跃！jumps=2, cur_end=4',
    currentI: 2, jumps: 2, curEnd: 4, farthest: 4, justJumped: true, nums: [2,3,1,1,4],
  },
  {
    lineNum: 6, phase: 'scan',
    description: '遍历 i=3, nums[3]=1, i+nums[i]=4',
    currentI: 3, jumps: 2, curEnd: 4, farthest: 4, justJumped: false, nums: [2,3,1,1,4],
  },
  {
    lineNum: 7, phase: 'judge',
    description: 'farthest = max(4, 3+1) = 4，不更新。i=3 != cur_end=4',
    currentI: 3, jumps: 2, curEnd: 4, farthest: 4, justJumped: false, nums: [2,3,1,1,4],
  },
  {
    lineNum: 11, phase: 'record',
    description: '遍历结束，返回 jumps = 2',
    currentI: -1, jumps: 2, curEnd: 4, farthest: 4, justJumped: false, nums: [2,3,1,1,4],
  },
];

// ── Test Case 2: nums = [1,1,1,1] ──
const steps2 = [
  {
    lineNum: 3, phase: 'init',
    description: '初始化 jumps=0, cur_end=0, farthest=0',
    currentI: -1, jumps: 0, curEnd: 0, farthest: 0, justJumped: false, nums: [1,1,1,1],
  },
  {
    lineNum: 6, phase: 'scan',
    description: '进入循环 i=0, nums[0]=1, i+nums[i]=1',
    currentI: 0, jumps: 0, curEnd: 0, farthest: 0, justJumped: false, nums: [1,1,1,1],
  },
  {
    lineNum: 7, phase: 'update',
    description: 'farthest = max(0, 0+1) = 1',
    currentI: 0, jumps: 0, curEnd: 0, farthest: 1, justJumped: false, nums: [1,1,1,1],
  },
  {
    lineNum: 8, phase: 'judge',
    description: 'i=0 == cur_end=0，需要跳跃！jumps=1, cur_end=1',
    currentI: 0, jumps: 1, curEnd: 1, farthest: 1, justJumped: true, nums: [1,1,1,1],
  },
  {
    lineNum: 6, phase: 'scan',
    description: '遍历 i=1, nums[1]=1, i+nums[i]=2',
    currentI: 1, jumps: 1, curEnd: 1, farthest: 1, justJumped: false, nums: [1,1,1,1],
  },
  {
    lineNum: 7, phase: 'update',
    description: 'farthest = max(1, 1+1) = 2',
    currentI: 1, jumps: 1, curEnd: 1, farthest: 2, justJumped: false, nums: [1,1,1,1],
  },
  {
    lineNum: 8, phase: 'judge',
    description: 'i=1 == cur_end=1，需要跳跃！jumps=2, cur_end=2',
    currentI: 1, jumps: 2, curEnd: 2, farthest: 2, justJumped: true, nums: [1,1,1,1],
  },
  {
    lineNum: 6, phase: 'scan',
    description: '遍历 i=2, nums[2]=1, i+nums[i]=3',
    currentI: 2, jumps: 2, curEnd: 2, farthest: 2, justJumped: false, nums: [1,1,1,1],
  },
  {
    lineNum: 7, phase: 'update',
    description: 'farthest = max(2, 2+1) = 3',
    currentI: 2, jumps: 2, curEnd: 2, farthest: 3, justJumped: false, nums: [1,1,1,1],
  },
  {
    lineNum: 8, phase: 'judge',
    description: 'i=2 == cur_end=2，需要跳跃！jumps=3, cur_end=3',
    currentI: 2, jumps: 3, curEnd: 3, farthest: 3, justJumped: true, nums: [1,1,1,1],
  },
  {
    lineNum: 11, phase: 'record',
    description: '遍历结束，每步只能跳 1 格，返回 jumps = 3',
    currentI: -1, jumps: 3, curEnd: 3, farthest: 3, justJumped: false, nums: [1,1,1,1],
  },
];

const phaseLabels = { init: '初始化', scan: '扫描', update: '更新', judge: '判断', record: '返回' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">数组 nums（蓝色范围 = 当前跳跃区间，黄色 = 当前位置）</div>
      <div class="array-row" id="nums-array"></div>
      <div class="legend-row">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(250,204,21,0.4);border:1px solid #facc15"></div>当前位置 i</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>当前跳跃区间</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>farthest</div>
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
  title: '45. Jump Game II',
  problemDesc: `
    <p>给定一个非负整数数组 <code>nums</code>，你最初位于数组的第一个位置。数组中的每个元素代表你在该位置可以跳跃的最大长度。目标是使用最少的跳跃次数到达数组的最后一个位置。</p>
    <div class="example">输入：nums = [2,3,1,1,4]
输出：2
解释：跳到下标 1（跳 1 步），再跳到末尾（跳 3 步），共 2 次</div>
    <p>假设总是可以到达最后一个位置。</p>
  `,
  subtitle: `nums = [${NUMS}]`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: 'nums = [2,3,1,1,4]', steps: steps1, subtitle: 'nums = [2,3,1,1,4]' },
    {
      name: 'nums = [1,1,1,1]', steps: steps2, subtitle: 'nums = [1,1,1,1]',
      setup(panel) { NUMS = [1,1,1,1]; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const nums = s.nums || NUMS;
    // nums array
    document.getElementById('nums-array').innerHTML = nums.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx <= s.curEnd) cls += ' in-window';
      if (idx === s.currentI) cls += ' is-active';
      if (idx === Math.min(s.farthest, nums.length - 1)) cls += ' is-left';
      const labels = [];
      if (idx === s.curEnd && s.curEnd < nums.length - 1) labels.push('<div class="arr-label" style="color:#38bdf8">end</div>');
      if (idx === Math.min(s.farthest, nums.length - 1) && s.farthest > s.curEnd) labels.push('<div class="arr-label" style="color:#4ade80">far</div>');
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div>${labels.join('')}</div>`;
    }).join('');

    // status
    const statusEl = document.getElementById('status-area');
    const jumpColor = s.justJumped ? '#f59e0b' : 'var(--text)';
    statusEl.innerHTML = `
      <div>jumps = <span style="font-weight:700;color:${jumpColor}">${s.jumps}</span></div>
      <div>cur_end = <span style="font-weight:700;color:#38bdf8">${s.curEnd}</span></div>
      <div>farthest = <span style="font-weight:700;color:#4ade80">${s.farthest}</span></div>
      ${s.justJumped ? '<div style="color:#f59e0b;font-weight:600">>>> 触发跳跃！</div>' : ''}
    `;

    // found
    const foundEl = document.getElementById('found-area');
    if (s.phase === 'record') {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">最少跳跃次数 = ${s.jumps}</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
