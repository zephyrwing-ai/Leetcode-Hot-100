let ARR = [5, 7, 7, 8, 8, 10];
let TARGET = 8;

const code = [
  'class Solution:',
  '    def searchRange(self, nums, target):',
  '        def findLeft(nums, target):',
  '            left, right = 0, len(nums)-1',
  '            while left <= right:',
  '                mid = (left+right)//2',
  '                if nums[mid] < target:',
  '                    left = mid+1',
  '                else:',
  '                    right = mid-1',
  '            return left',
  '        def findRight(nums, target):',
  '            left, right = 0, len(nums)-1',
  '            while left <= right:',
  '                mid = (left+right)//2',
  '                if nums[mid] <= target:',
  '                    left = mid+1',
  '                else:',
  '                    right = mid-1',
  '            return right',
  '        l,r = findLeft(nums,target), findRight(nums,target)',
  '        return [l,r] if l<=r else [-1,-1]',
];

const lineMap = { 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 13: 12, 14: 13, 15: 14, 16: 15, 17: 16, 18: 17, 19: 18, 20: 19, 21: 20, 22: 21 };

// ── Test Case 1: nums = [5,7,7,8,8,10], target = 8 → [3,4] ──
const steps1 = [
  // findLeft
  {"lineNum":4,"phase":"initLeft","description":"【查找左边界】初始化 left=0, right=5, target=8","arr":[5,7,7,8,8,10],"left":0,"right":5,"mid":null,"foundLeft":null,"foundRight":null,"activePhase":"left","target":8},
  {"lineNum":6,"phase":"calcLeft","description":"计算 mid=(0+5)//2=2","arr":[5,7,7,8,8,10],"left":0,"right":5,"mid":2,"foundLeft":null,"foundRight":null,"activePhase":"left","target":8},
  {"lineNum":7,"phase":"compareLeft","description":"nums[2]=7 < target=8，收缩 left=mid+1=3","arr":[5,7,7,8,8,10],"left":3,"right":5,"mid":2,"foundLeft":null,"foundRight":null,"activePhase":"left","target":8},
  {"lineNum":6,"phase":"calcLeft","description":"计算 mid=(3+5)//2=4","arr":[5,7,7,8,8,10],"left":3,"right":5,"mid":4,"foundLeft":null,"foundRight":null,"activePhase":"left","target":8},
  {"lineNum":9,"phase":"compareLeft","description":"nums[4]=8 >= target=8，收缩 right=mid-1=3","arr":[5,7,7,8,8,10],"left":3,"right":3,"mid":4,"foundLeft":null,"foundRight":null,"activePhase":"left","target":8},
  {"lineNum":6,"phase":"calcLeft","description":"计算 mid=(3+3)//2=3","arr":[5,7,7,8,8,10],"left":3,"right":3,"mid":3,"foundLeft":null,"foundRight":null,"activePhase":"left","target":8},
  {"lineNum":9,"phase":"compareLeft","description":"nums[3]=8 >= target=8，收缩 right=mid-1=2","arr":[5,7,7,8,8,10],"left":3,"right":2,"mid":3,"foundLeft":null,"foundRight":null,"activePhase":"left","target":8},
  {"lineNum":11,"phase":"foundLeftBound","description":"left=3 > right=2，循环结束，左边界 = 3","arr":[5,7,7,8,8,10],"left":3,"right":2,"mid":3,"foundLeft":3,"foundRight":null,"activePhase":"left","target":8},
  // findRight
  {"lineNum":13,"phase":"initRight","description":"【查找右边界】初始化 left=0, right=5, target=8","arr":[5,7,7,8,8,10],"left":0,"right":5,"mid":null,"foundLeft":3,"foundRight":null,"activePhase":"right","target":8},
  {"lineNum":15,"phase":"calcRight","description":"计算 mid=(0+5)//2=2","arr":[5,7,7,8,8,10],"left":0,"right":5,"mid":2,"foundLeft":3,"foundRight":null,"activePhase":"right","target":8},
  {"lineNum":16,"phase":"compareRight","description":"nums[2]=7 <= target=8，收缩 left=mid+1=3","arr":[5,7,7,8,8,10],"left":3,"right":5,"mid":2,"foundLeft":3,"foundRight":null,"activePhase":"right","target":8},
  {"lineNum":15,"phase":"calcRight","description":"计算 mid=(3+5)//2=4","arr":[5,7,7,8,8,10],"left":3,"right":5,"mid":4,"foundLeft":3,"foundRight":null,"activePhase":"right","target":8},
  {"lineNum":16,"phase":"compareRight","description":"nums[4]=8 <= target=8，收缩 left=mid+1=5","arr":[5,7,7,8,8,10],"left":5,"right":5,"mid":4,"foundLeft":3,"foundRight":null,"activePhase":"right","target":8},
  {"lineNum":15,"phase":"calcRight","description":"计算 mid=(5+5)//2=5","arr":[5,7,7,8,8,10],"left":5,"right":5,"mid":5,"foundLeft":3,"foundRight":null,"activePhase":"right","target":8},
  {"lineNum":18,"phase":"compareRight","description":"nums[5]=10 > target=8，收缩 right=mid-1=4","arr":[5,7,7,8,8,10],"left":5,"right":4,"mid":5,"foundLeft":3,"foundRight":null,"activePhase":"right","target":8},
  {"lineNum":20,"phase":"foundRightBound","description":"left=5 > right=4，循环结束，右边界 = 4","arr":[5,7,7,8,8,10],"left":5,"right":4,"mid":5,"foundLeft":3,"foundRight":4,"activePhase":"right","target":8},
  // Result
  {"lineNum":22,"phase":"result","description":"结果: [3, 4]，target=8 的范围是索引 3 到 4","arr":[5,7,7,8,8,10],"left":5,"right":4,"mid":null,"foundLeft":3,"foundRight":4,"activePhase":"done","target":8},
];

// ── Test Case 2: nums = [5,7,7,8,8,10], target = 6 → [-1,-1] ──
const steps2 = [
  // findLeft
  {"lineNum":4,"phase":"initLeft","description":"【查找左边界】初始化 left=0, right=5, target=6","arr":[5,7,7,8,8,10],"left":0,"right":5,"mid":null,"foundLeft":null,"foundRight":null,"activePhase":"left","target":6},
  {"lineNum":6,"phase":"calcLeft","description":"计算 mid=(0+5)//2=2","arr":[5,7,7,8,8,10],"left":0,"right":5,"mid":2,"foundLeft":null,"foundRight":null,"activePhase":"left","target":6},
  {"lineNum":9,"phase":"compareLeft","description":"nums[2]=7 >= target=6，收缩 right=mid-1=1","arr":[5,7,7,8,8,10],"left":0,"right":1,"mid":2,"foundLeft":null,"foundRight":null,"activePhase":"left","target":6},
  {"lineNum":6,"phase":"calcLeft","description":"计算 mid=(0+1)//2=0","arr":[5,7,7,8,8,10],"left":0,"right":1,"mid":0,"foundLeft":null,"foundRight":null,"activePhase":"left","target":6},
  {"lineNum":7,"phase":"compareLeft","description":"nums[0]=5 < target=6，收缩 left=mid+1=1","arr":[5,7,7,8,8,10],"left":1,"right":1,"mid":0,"foundLeft":null,"foundRight":null,"activePhase":"left","target":6},
  {"lineNum":6,"phase":"calcLeft","description":"计算 mid=(1+1)//2=1","arr":[5,7,7,8,8,10],"left":1,"right":1,"mid":1,"foundLeft":null,"foundRight":null,"activePhase":"left","target":6},
  {"lineNum":9,"phase":"compareLeft","description":"nums[1]=7 >= target=6，收缩 right=mid-1=0","arr":[5,7,7,8,8,10],"left":1,"right":0,"mid":1,"foundLeft":null,"foundRight":null,"activePhase":"left","target":6},
  {"lineNum":11,"phase":"foundLeftBound","description":"left=1 > right=0，循环结束，左边界候选 = 1","arr":[5,7,7,8,8,10],"left":1,"right":0,"mid":1,"foundLeft":1,"foundRight":null,"activePhase":"left","target":6},
  // findRight
  {"lineNum":13,"phase":"initRight","description":"【查找右边界】初始化 left=0, right=5, target=6","arr":[5,7,7,8,8,10],"left":0,"right":5,"mid":null,"foundLeft":1,"foundRight":null,"activePhase":"right","target":6},
  {"lineNum":15,"phase":"calcRight","description":"计算 mid=(0+5)//2=2","arr":[5,7,7,8,8,10],"left":0,"right":5,"mid":2,"foundLeft":1,"foundRight":null,"activePhase":"right","target":6},
  {"lineNum":18,"phase":"compareRight","description":"nums[2]=7 > target=6，收缩 right=mid-1=1","arr":[5,7,7,8,8,10],"left":0,"right":1,"mid":2,"foundLeft":1,"foundRight":null,"activePhase":"right","target":6},
  {"lineNum":15,"phase":"calcRight","description":"计算 mid=(0+1)//2=0","arr":[5,7,7,8,8,10],"left":0,"right":1,"mid":0,"foundLeft":1,"foundRight":null,"activePhase":"right","target":6},
  {"lineNum":16,"phase":"compareRight","description":"nums[0]=5 <= target=6，收缩 left=mid+1=1","arr":[5,7,7,8,8,10],"left":1,"right":1,"mid":0,"foundLeft":1,"foundRight":null,"activePhase":"right","target":6},
  {"lineNum":15,"phase":"calcRight","description":"计算 mid=(1+1)//2=1","arr":[5,7,7,8,8,10],"left":1,"right":1,"mid":1,"foundLeft":1,"foundRight":null,"activePhase":"right","target":6},
  {"lineNum":18,"phase":"compareRight","description":"nums[1]=7 > target=6，收缩 right=mid-1=0","arr":[5,7,7,8,8,10],"left":1,"right":0,"mid":1,"foundLeft":1,"foundRight":null,"activePhase":"right","target":6},
  {"lineNum":20,"phase":"foundRightBound","description":"left=1 > right=0，循环结束，右边界候选 = 0","arr":[5,7,7,8,8,10],"left":1,"right":0,"mid":1,"foundLeft":1,"foundRight":0,"activePhase":"right","target":6},
  // Result
  {"lineNum":22,"phase":"result","description":"l=1 > r=0，target=6 不存在，返回 [-1, -1]","arr":[5,7,7,8,8,10],"left":1,"right":0,"mid":null,"foundLeft":-1,"foundRight":-1,"activePhase":"done","target":6},
];

const phaseLabels = { initLeft: '初始化(左)', calcLeft: '计算中点(左)', compareLeft: '比较(左)', foundLeftBound: '左边界确定', initRight: '初始化(右)', calcRight: '计算中点(右)', compareRight: '比较(右)', foundRightBound: '右边界确定', result: '最终结果' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">数组 nums（L = left，R = right，M = mid）</div>
      <div id="phase-label" style="margin-bottom:8px;font-size:13px;font-weight:600;color:var(--text-muted)"></div>
      <div class="array-row" id="nums-array"></div>
      <div id="ptr-info-area" style="margin-top:10px;font-size:13px;font-family:monospace;color:var(--text-muted);display:flex;gap:16px"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>L (left)</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>R (right)</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(251,146,60,0.4);border:1px solid #fb923c"></div>M (mid)</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(168,85,247,0.4);border:1px solid #a855f7"></div>已确定边界</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '34. Find First and Last Position — 执行可视化',
  problemDesc: `
    <p>给你一个按照非递减顺序排列的整数数组 <code>nums</code>，和一个目标值 <code>target</code>。请你找出给定目标值在数组中的开始位置和结束位置。要求时间复杂度为 <code>O(log n)</code>。如果不存在则返回 <code>[-1, -1]</code>。</p>
    <div class="example">输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]</div>
  `,
  subtitle: 'nums = [5, 7, 7, 8, 8, 10], target = 8',
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'target = 8 → [3,4]', steps: steps1, subtitle: 'nums = [5,7,7,8,8,10], target = 8' },
    {
      name: 'target = 6 → [-1,-1]', steps: steps2, subtitle: 'nums = [5,7,7,8,8,10], target = 6',
      setup(panel) { ARR = [5,7,7,8,8,10]; TARGET = 6; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const arr = s.arr || ARR;
    const target = s.target !== undefined ? s.target : TARGET;

    const phaseLabel = document.getElementById('phase-label');
    phaseLabel.textContent = s.activePhase === 'left' ? '阶段一：查找左边界' : s.activePhase === 'right' ? '阶段二：查找右边界' : '完成';
    phaseLabel.style.color = s.activePhase === 'left' ? '#4ade80' : s.activePhase === 'right' ? '#38bdf8' : '#a855f7';

    document.getElementById('nums-array').innerHTML = arr.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.mid) cls += ' is-active';
      if (idx === s.left && s.activePhase !== 'done') cls += ' is-left';
      if (idx === s.right && s.activePhase !== 'done') cls += ' is-right';

      const isFoundLeft = s.foundLeft !== null && s.foundLeft >= 0 && idx === s.foundLeft;
      const isFoundRight = s.foundRight !== null && s.foundRight >= 0 && idx === s.foundRight;
      let extraStyle = '';
      if (s.activePhase === 'done' && s.foundLeft !== null && s.foundRight !== null && s.foundLeft >= 0 && s.foundRight >= 0 && idx >= s.foundLeft && idx <= s.foundRight) {
        extraStyle = 'background:rgba(168,85,247,0.2);border-color:#a855f7;';
      }

      let label = '';
      const labels = [];
      if (idx === s.left && s.activePhase !== 'done') labels.push('L');
      if (idx === s.mid) labels.push('M');
      if (idx === s.right && s.activePhase !== 'done') labels.push('R');
      if (isFoundLeft) labels.push('FL');
      if (isFoundRight) labels.push('FR');
      label = labels.join(' ');

      const labelColor = labels.length > 1 ? '#a78bfa'
        : label === 'L' ? '#4ade80' : label === 'R' ? '#38bdf8' : label === 'M' ? '#fb923c' : '#a855f7';

      return `<div class="${cls}" style="${extraStyle}">
        <div class="arr-val">${v}</div>
        <div class="arr-idx">[${idx}]</div>
        ${label ? `<div class="ptr-label" style="color:${labelColor};font-weight:700;font-size:11px;margin-top:2px">${label}</div>` : ''}
      </div>`;
    }).join('');

    const ptrInfo = document.getElementById('ptr-info-area');
    ptrInfo.innerHTML = `
      ${s.activePhase !== 'done' ? `<span style="color:#4ade80">left = <b>${s.left}</b></span>` : ''}
      ${s.activePhase !== 'done' ? `<span style="color:#38bdf8">right = <b>${s.right}</b></span>` : ''}
      ${s.mid !== null ? `<span style="color:#fb923c">mid = <b>${s.mid}</b></span>` : ''}
      ${s.foundLeft !== null ? `<span style="color:#a855f7">左边界 = <b>${s.foundLeft}</b></span>` : ''}
      ${s.foundRight !== null ? `<span style="color:#a855f7">右边界 = <b>${s.foundRight}</b></span>` : ''}
    `;

    const resultEl = document.getElementById('result-area');
    if (s.phase === 'result') {
      const isNotFound = s.foundLeft === -1 && s.foundRight === -1;
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:${isNotFound ? '#ef4444' : '#a855f7'};font-size:22px;font-weight:700">${isNotFound ? '✗' : '✓'}</div>
        <div>
          <div class="found-text" style="color:${isNotFound ? '#ef4444' : '#a855f7'};font-weight:600">${isNotFound ? '未找到' : '找到范围'}</div>
          <div class="found-sub" style="margin-top:4px">${isNotFound ? `target=${target} 不存在，返回 [-1, -1]` : `target=${target} 的起止位置: [${s.foundLeft}, ${s.foundRight}]`}</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
