const MAX_STREAK_POSSIBLE = 4;

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

const steps = [{"lineNum":3,"codeLine":"num=set(nums)","phase":"init","description":"转换为集合（O(1) 查找）: num = [1, 2, 3, 4, 100, 200]","numSet":[1,2,3,4,100,200],"maxlength":0,"currentI":null,"curNum":null,"curStreak":0,"streakStart":null},{"lineNum":4,"codeLine":"maxlength=0","phase":"init","description":"初始化 maxlength = 0","numSet":[1,2,3,4,100,200],"maxlength":0,"currentI":null,"curNum":null,"curStreak":0,"streakStart":null},{"lineNum":5,"codeLine":"for i in num:","phase":"check","description":"检查 i = 1","numSet":[1,2,3,4,100,200],"maxlength":0,"currentI":1,"curNum":null,"curStreak":0,"streakStart":null},{"lineNum":6,"codeLine":"if i-1 not in num:","phase":"check","description":"i-1=0 不在集合中，1 是连续序列的起点，开始计数","numSet":[1,2,3,4,100,200],"maxlength":0,"currentI":1,"curNum":1,"curStreak":1,"streakStart":1},{"lineNum":10,"codeLine":"current_number+=1","phase":"push","description":"延伸序列: current_number=2, current_streak=2","numSet":[1,2,3,4,100,200],"maxlength":0,"currentI":1,"curNum":2,"curStreak":2,"streakStart":1},{"lineNum":10,"codeLine":"current_number+=1","phase":"push","description":"延伸序列: current_number=3, current_streak=3","numSet":[1,2,3,4,100,200],"maxlength":0,"currentI":1,"curNum":3,"curStreak":3,"streakStart":1},{"lineNum":10,"codeLine":"current_number+=1","phase":"push","description":"延伸序列: current_number=4, current_streak=4","numSet":[1,2,3,4,100,200],"maxlength":0,"currentI":1,"curNum":4,"curStreak":4,"streakStart":1},{"lineNum":12,"codeLine":"maxlength=max(maxlength,current_streak)","phase":"record","description":"序列 [1..4] 长度=4，更新 maxlength = max(4, 4) = 4","numSet":[1,2,3,4,100,200],"maxlength":4,"currentI":1,"curNum":4,"curStreak":4,"streakStart":1},{"lineNum":5,"codeLine":"for i in num:","phase":"check","description":"检查 i = 2","numSet":[1,2,3,4,100,200],"maxlength":4,"currentI":2,"curNum":null,"curStreak":0,"streakStart":null},{"lineNum":6,"codeLine":"if i-1 not in num:","phase":"check","description":"i-1=1 在集合中，2 不是起点，跳过","numSet":[1,2,3,4,100,200],"maxlength":4,"currentI":2,"curNum":null,"curStreak":0,"streakStart":null},{"lineNum":5,"codeLine":"for i in num:","phase":"check","description":"检查 i = 3","numSet":[1,2,3,4,100,200],"maxlength":4,"currentI":3,"curNum":null,"curStreak":0,"streakStart":null},{"lineNum":6,"codeLine":"if i-1 not in num:","phase":"check","description":"i-1=2 在集合中，3 不是起点，跳过","numSet":[1,2,3,4,100,200],"maxlength":4,"currentI":3,"curNum":null,"curStreak":0,"streakStart":null},{"lineNum":5,"codeLine":"for i in num:","phase":"check","description":"检查 i = 100","numSet":[1,2,3,4,100,200],"maxlength":4,"currentI":100,"curNum":null,"curStreak":0,"streakStart":null},{"lineNum":6,"codeLine":"if i-1 not in num:","phase":"check","description":"i-1=99 不在集合中，100 是连续序列的起点，开始计数","numSet":[1,2,3,4,100,200],"maxlength":4,"currentI":100,"curNum":100,"curStreak":1,"streakStart":100},{"lineNum":12,"codeLine":"maxlength=max(maxlength,current_streak)","phase":"check","description":"序列 [100..100] 长度=1，更新 maxlength = max(4, 1) = 4","numSet":[1,2,3,4,100,200],"maxlength":4,"currentI":100,"curNum":100,"curStreak":1,"streakStart":100},{"lineNum":5,"codeLine":"for i in num:","phase":"check","description":"检查 i = 4","numSet":[1,2,3,4,100,200],"maxlength":4,"currentI":4,"curNum":null,"curStreak":0,"streakStart":null},{"lineNum":6,"codeLine":"if i-1 not in num:","phase":"check","description":"i-1=3 在集合中，4 不是起点，跳过","numSet":[1,2,3,4,100,200],"maxlength":4,"currentI":4,"curNum":null,"curStreak":0,"streakStart":null},{"lineNum":5,"codeLine":"for i in num:","phase":"check","description":"检查 i = 200","numSet":[1,2,3,4,100,200],"maxlength":4,"currentI":200,"curNum":null,"curStreak":0,"streakStart":null},{"lineNum":6,"codeLine":"if i-1 not in num:","phase":"check","description":"i-1=199 不在集合中，200 是连续序列的起点，开始计数","numSet":[1,2,3,4,100,200],"maxlength":4,"currentI":200,"curNum":200,"curStreak":1,"streakStart":200},{"lineNum":12,"codeLine":"maxlength=max(maxlength,current_streak)","phase":"record","description":"序列 [200..200] 长度=1，更新 maxlength = max(4, 1) = 4","numSet":[1,2,3,4,100,200],"maxlength":4,"currentI":200,"curNum":200,"curStreak":1,"streakStart":200}];

const phaseLabels = { init: '初始化', check: '检查', push: '延伸', record: '记录' };

export default {
  title: '128. Longest Consecutive Sequence — 执行可视化',
  subtitle: 'nums = [100, 4, 200, 1, 3, 2]',
  code, lineMap, steps, phaseLabels,

  setup(panel) {
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
  },

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
