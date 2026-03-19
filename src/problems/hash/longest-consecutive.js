let MAX_STREAK_POSSIBLE = 4;

const code = [
  'class Solution:',
  '    def longestConsecutive(self, nums):',
  '        num=set(nums)',
  '        maxlength=0',
  '        for i in num:',
  '            if i-1 not in num:',
  '                current_number=i',
  '                current_streak=1',
  '                while current_number+1 in num:',
  '                    current_number+=1',
  '                    current_streak+=1',
  '                maxlength=max(maxlength,current_streak)',
  '        return maxlength',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 10: 9, 12: 11 };

// ── Test Case 1: nums = [100,4,200,1,3,2] ──
const steps1 = [
  {lineNum:3, phase:'init', description:'将数组转换为集合（O(1) 查找），去重后: {1, 2, 3, 4, 100, 200}',
   numSet:[1,2,3,4,100,200], maxlength:0, currentI:null, curNum:null, curStreak:0, streakStart:null},
  {lineNum:4, phase:'init', description:'初始化 maxlength = 0，用于记录最长连续序列',
   numSet:[1,2,3,4,100,200], maxlength:0, currentI:null, curNum:null, curStreak:0, streakStart:null},
  {lineNum:5, phase:'check', description:'遍历集合，检查 i = 1',
   numSet:[1,2,3,4,100,200], maxlength:0, currentI:1, curNum:null, curStreak:0, streakStart:null},
  {lineNum:6, phase:'check', description:'i-1=0 不在集合中，说明 1 是某个连续序列的起点',
   numSet:[1,2,3,4,100,200], maxlength:0, currentI:1, curNum:1, curStreak:1, streakStart:1},
  {lineNum:10, phase:'push', description:'current_number+1=2 在集合中，延伸序列：current_number=2, streak=2',
   numSet:[1,2,3,4,100,200], maxlength:0, currentI:1, curNum:2, curStreak:2, streakStart:1},
  {lineNum:10, phase:'push', description:'current_number+1=3 在集合中，延伸序列：current_number=3, streak=3',
   numSet:[1,2,3,4,100,200], maxlength:0, currentI:1, curNum:3, curStreak:3, streakStart:1},
  {lineNum:10, phase:'push', description:'current_number+1=4 在集合中，延伸序列：current_number=4, streak=4',
   numSet:[1,2,3,4,100,200], maxlength:0, currentI:1, curNum:4, curStreak:4, streakStart:1},
  {lineNum:12, phase:'record', description:'current_number+1=5 不在集合中，序列 [1..4] 结束，maxlength = max(0, 4) = 4',
   numSet:[1,2,3,4,100,200], maxlength:4, currentI:1, curNum:4, curStreak:4, streakStart:1},
  {lineNum:5, phase:'check', description:'检查 i = 2',
   numSet:[1,2,3,4,100,200], maxlength:4, currentI:2, curNum:null, curStreak:0, streakStart:null},
  {lineNum:6, phase:'check', description:'i-1=1 在集合中，2 不是起点，跳过（避免重复计算）',
   numSet:[1,2,3,4,100,200], maxlength:4, currentI:2, curNum:null, curStreak:0, streakStart:null},
  {lineNum:5, phase:'check', description:'检查 i = 3',
   numSet:[1,2,3,4,100,200], maxlength:4, currentI:3, curNum:null, curStreak:0, streakStart:null},
  {lineNum:6, phase:'check', description:'i-1=2 在集合中，3 不是起点，跳过',
   numSet:[1,2,3,4,100,200], maxlength:4, currentI:3, curNum:null, curStreak:0, streakStart:null},
  {lineNum:5, phase:'check', description:'检查 i = 100',
   numSet:[1,2,3,4,100,200], maxlength:4, currentI:100, curNum:null, curStreak:0, streakStart:null},
  {lineNum:6, phase:'check', description:'i-1=99 不在集合中，100 是起点，但 101 不在集合中，序列长度仅为 1',
   numSet:[1,2,3,4,100,200], maxlength:4, currentI:100, curNum:100, curStreak:1, streakStart:100},
  {lineNum:12, phase:'check', description:'maxlength = max(4, 1) = 4，不更新',
   numSet:[1,2,3,4,100,200], maxlength:4, currentI:100, curNum:100, curStreak:1, streakStart:100},
  {lineNum:5, phase:'check', description:'检查 i = 4',
   numSet:[1,2,3,4,100,200], maxlength:4, currentI:4, curNum:null, curStreak:0, streakStart:null},
  {lineNum:6, phase:'check', description:'i-1=3 在集合中，4 不是起点，跳过',
   numSet:[1,2,3,4,100,200], maxlength:4, currentI:4, curNum:null, curStreak:0, streakStart:null},
  {lineNum:5, phase:'check', description:'检查 i = 200',
   numSet:[1,2,3,4,100,200], maxlength:4, currentI:200, curNum:null, curStreak:0, streakStart:null},
  {lineNum:6, phase:'check', description:'i-1=199 不在集合中，200 是起点，但 201 不在，序列长度 1',
   numSet:[1,2,3,4,100,200], maxlength:4, currentI:200, curNum:200, curStreak:1, streakStart:200},
  {lineNum:12, phase:'record', description:'遍历结束，maxlength = max(4, 1) = 4，最长连续序列长度为 4',
   numSet:[1,2,3,4,100,200], maxlength:4, currentI:200, curNum:200, curStreak:1, streakStart:200},
];

// ── Test Case 2: nums = [0,3,7,2,5,8,4,6,0,1] ──
const steps2 = [
  {lineNum:3, phase:'init', description:'转换为集合并去重: {0, 1, 2, 3, 4, 5, 6, 7, 8}',
   numSet:[0,1,2,3,4,5,6,7,8], maxlength:0, currentI:null, curNum:null, curStreak:0, streakStart:null},
  {lineNum:4, phase:'init', description:'初始化 maxlength = 0',
   numSet:[0,1,2,3,4,5,6,7,8], maxlength:0, currentI:null, curNum:null, curStreak:0, streakStart:null},
  {lineNum:5, phase:'check', description:'检查 i = 0',
   numSet:[0,1,2,3,4,5,6,7,8], maxlength:0, currentI:0, curNum:null, curStreak:0, streakStart:null},
  {lineNum:6, phase:'check', description:'i-1=-1 不在集合中，0 是起点，开始计数',
   numSet:[0,1,2,3,4,5,6,7,8], maxlength:0, currentI:0, curNum:0, curStreak:1, streakStart:0},
  {lineNum:10, phase:'push', description:'延伸序列：current_number=1, streak=2',
   numSet:[0,1,2,3,4,5,6,7,8], maxlength:0, currentI:0, curNum:1, curStreak:2, streakStart:0},
  {lineNum:10, phase:'push', description:'延伸序列：current_number=2, streak=3',
   numSet:[0,1,2,3,4,5,6,7,8], maxlength:0, currentI:0, curNum:2, curStreak:3, streakStart:0},
  {lineNum:10, phase:'push', description:'延伸序列：current_number=3, streak=4',
   numSet:[0,1,2,3,4,5,6,7,8], maxlength:0, currentI:0, curNum:3, curStreak:4, streakStart:0},
  {lineNum:10, phase:'push', description:'延伸序列：current_number=4, streak=5',
   numSet:[0,1,2,3,4,5,6,7,8], maxlength:0, currentI:0, curNum:4, curStreak:5, streakStart:0},
  {lineNum:10, phase:'push', description:'延伸序列：current_number=5, streak=6',
   numSet:[0,1,2,3,4,5,6,7,8], maxlength:0, currentI:0, curNum:5, curStreak:6, streakStart:0},
  {lineNum:10, phase:'push', description:'延伸序列：current_number=6, streak=7',
   numSet:[0,1,2,3,4,5,6,7,8], maxlength:0, currentI:0, curNum:6, curStreak:7, streakStart:0},
  {lineNum:10, phase:'push', description:'延伸序列：current_number=7, streak=8',
   numSet:[0,1,2,3,4,5,6,7,8], maxlength:0, currentI:0, curNum:7, curStreak:8, streakStart:0},
  {lineNum:10, phase:'push', description:'延伸序列：current_number=8, streak=9',
   numSet:[0,1,2,3,4,5,6,7,8], maxlength:0, currentI:0, curNum:8, curStreak:9, streakStart:0},
  {lineNum:12, phase:'record', description:'序列 [0..8] 结束，maxlength = max(0, 9) = 9',
   numSet:[0,1,2,3,4,5,6,7,8], maxlength:9, currentI:0, curNum:8, curStreak:9, streakStart:0},
  {lineNum:5, phase:'check', description:'检查其余元素（1~8），它们的前驱都在集合中，全部跳过',
   numSet:[0,1,2,3,4,5,6,7,8], maxlength:9, currentI:1, curNum:null, curStreak:0, streakStart:null},
  {lineNum:12, phase:'record', description:'遍历结束，返回 maxlength = 9，最长连续序列为 [0,1,2,3,4,5,6,7,8]',
   numSet:[0,1,2,3,4,5,6,7,8], maxlength:9, currentI:null, curNum:null, curStreak:0, streakStart:null},
];

const phaseLabels = { init: '初始化', check: '检查', push: '延伸', record: '记录' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">集合 num</div>
      <div class="chip-row" id="num-set"></div>
      <div class="legend-row">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>蓝色=当前i</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>绿色=连续序列</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">当前连续序列</div>
      <div id="streak-info" style="font-family:monospace;font-size:13px;color:var(--text-muted);min-height:20px"></div>
      <div class="streak-bar-wrap" style="margin-top:8px;height:22px;background:var(--bg-card,#1e293b);border-radius:6px;overflow:hidden;border:1px solid var(--border,#334155)">
        <div id="streak-bar" style="height:100%;width:0%;background:linear-gradient(90deg,#4ade80,#22d3ee);border-radius:6px;transition:width .35s ease"></div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">最长长度 maxlength</div>
      <div id="maxlen-num" style="font-size:48px;font-weight:800;text-align:center;font-family:monospace;color:#f59e0b;min-height:60px;line-height:60px">0</div>
    </div>
  `;
}

export default {
  title: '128. Longest Consecutive Sequence — 执行可视化',
  problemDesc: `
    <p>给定一个未排序的整数数组 <code>nums</code>，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。</p>
    <div class="example">输入：nums = [100,4,200,1,3,2]
输出：4
解释：最长数字连续序列是 [1,2,3,4]，长度为 4。</div>
    <p><strong>提示：</strong>请设计时间复杂度为 <code>O(n)</code> 的算法。</p>
  `,
  subtitle: 'nums = [100, 4, 200, 1, 3, 2]',
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: 'nums = [100,4,200,1,3,2]', steps: steps1, subtitle: 'nums = [100, 4, 200, 1, 3, 2]' },
    {
      name: 'nums = [0,3,7,2,5,8,4,6,0,1]', steps: steps2, subtitle: 'nums = [0,3,7,2,5,8,4,6,0,1]',
      setup(panel) { MAX_STREAK_POSSIBLE = 9; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    // --- Set chips ---
    const setEl = document.getElementById('num-set');
    const streakRange = [];
    if (s.streakStart !== null && s.curNum !== null) {
      for (let n = s.streakStart; n <= s.curNum; n++) {
        streakRange.push(n);
      }
    }
    setEl.innerHTML = s.numSet.map(v => {
      let cls = 'chip';
      if (v === s.currentI) cls += ' current-i';
      if (streakRange.includes(v)) cls += ' in-streak';
      return `<div class="${cls}">${v}</div>`;
    }).join('');

    // --- Streak info ---
    const infoEl = document.getElementById('streak-info');
    if (s.streakStart !== null && s.curNum !== null) {
      infoEl.innerHTML = `起点: <strong>${s.streakStart}</strong> &rarr; 当前: <strong>${s.curNum}</strong> &nbsp;|&nbsp; 长度: <strong>${s.curStreak}</strong>`;
    } else if (s.currentI !== null) {
      infoEl.innerHTML = `检查 i = ${s.currentI}，无连续序列`;
    } else {
      infoEl.innerHTML = '—';
    }

    // --- Streak bar ---
    const barEl = document.getElementById('streak-bar');
    const pct = Math.round((s.curStreak / MAX_STREAK_POSSIBLE) * 100);
    barEl.style.width = pct + '%';

    // --- Max length ---
    const maxEl = document.getElementById('maxlen-num');
    maxEl.textContent = s.maxlength;
  },
};
