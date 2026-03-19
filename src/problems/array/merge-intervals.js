const code = [
  'class Solution:',
  '    def merge(self, intervals):',
  '        intervals.sort(key=lambda x: x[0])',
  '        merged = [intervals[0]]',
  '        for i in range(1, len(intervals)):',
  '            if intervals[i][0] <= merged[-1][1]:',
  '                merged[-1][1] = max(merged[-1][1], intervals[i][1])',
  '            else:',
  '                merged.append(intervals[i])',
  '        return merged',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8 };

let INTERVALS = [[1,3],[2,6],[8,10],[15,18]];

const BAR_COLORS = ['#38bdf8','#a78bfa','#fb923c','#4ade80'];
const MERGED_COLORS = ['#22d3ee','#c084fc','#fbbf24'];

const steps1 = [
  {"lineNum":2,"phase":"init","description":"排序后 intervals = [[1,3],[2,6],[8,10],[15,18]]","intervals":[[1,3],[2,6],[8,10],[15,18]],"merged":[],"i":-1,"activeIdx":-1,"comparing":null},
  {"lineNum":3,"phase":"init","description":"初始化 merged = [[1,3]]，放入第一个区间","intervals":[[1,3],[2,6],[8,10],[15,18]],"merged":[[1,3]],"i":0,"activeIdx":0,"comparing":null},
  {"lineNum":4,"phase":"compare","description":"i=1，取出区间 [2,6]，准备与 merged 末尾比较","intervals":[[1,3],[2,6],[8,10],[15,18]],"merged":[[1,3]],"i":1,"activeIdx":1,"comparing":[0,1]},
  {"lineNum":5,"phase":"compare","description":"intervals[1][0]=2 <= merged[-1][1]=3，有重叠","intervals":[[1,3],[2,6],[8,10],[15,18]],"merged":[[1,3]],"i":1,"activeIdx":1,"comparing":[0,1]},
  {"lineNum":6,"phase":"merge","description":"合并：merged[-1][1] = max(3,6) = 6，得 [1,6]","intervals":[[1,3],[2,6],[8,10],[15,18]],"merged":[[1,6]],"i":1,"activeIdx":1,"comparing":null},
  {"lineNum":4,"phase":"compare","description":"i=2，取出区间 [8,10]，准备与 merged 末尾比较","intervals":[[1,3],[2,6],[8,10],[15,18]],"merged":[[1,6]],"i":2,"activeIdx":2,"comparing":[1,2]},
  {"lineNum":5,"phase":"compare","description":"intervals[2][0]=8 > merged[-1][1]=6，无重叠","intervals":[[1,3],[2,6],[8,10],[15,18]],"merged":[[1,6]],"i":2,"activeIdx":2,"comparing":[1,2]},
  {"lineNum":8,"phase":"record","description":"无重叠，直接添加 [8,10] 到 merged","intervals":[[1,3],[2,6],[8,10],[15,18]],"merged":[[1,6],[8,10]],"i":2,"activeIdx":2,"comparing":null},
  {"lineNum":4,"phase":"compare","description":"i=3，取出区间 [15,18]，准备与 merged 末尾比较","intervals":[[1,3],[2,6],[8,10],[15,18]],"merged":[[1,6],[8,10]],"i":3,"activeIdx":3,"comparing":[2,3]},
  {"lineNum":5,"phase":"compare","description":"intervals[3][0]=15 > merged[-1][1]=10，无重叠","intervals":[[1,3],[2,6],[8,10],[15,18]],"merged":[[1,6],[8,10]],"i":3,"activeIdx":3,"comparing":[2,3]},
  {"lineNum":8,"phase":"record","description":"无重叠，直接添加 [15,18] 到 merged","intervals":[[1,3],[2,6],[8,10],[15,18]],"merged":[[1,6],[8,10],[15,18]],"i":3,"activeIdx":3,"comparing":null},
  {"lineNum":9,"phase":"record","description":"遍历结束，返回 merged = [[1,6],[8,10],[15,18]]","intervals":[[1,3],[2,6],[8,10],[15,18]],"merged":[[1,6],[8,10],[15,18]],"i":3,"activeIdx":-1,"comparing":null}
];

// Test case 2: [[1,4],[4,5]] → [[1,5]]
const steps2 = [
  {"lineNum":2,"phase":"init","description":"排序后 intervals = [[1,4],[4,5]]","intervals":[[1,4],[4,5]],"merged":[],"i":-1,"activeIdx":-1,"comparing":null},
  {"lineNum":3,"phase":"init","description":"初始化 merged = [[1,4]]，放入第一个区间","intervals":[[1,4],[4,5]],"merged":[[1,4]],"i":0,"activeIdx":0,"comparing":null},
  {"lineNum":4,"phase":"compare","description":"i=1，取出区间 [4,5]，准备与 merged 末尾比较","intervals":[[1,4],[4,5]],"merged":[[1,4]],"i":1,"activeIdx":1,"comparing":[0,1]},
  {"lineNum":5,"phase":"compare","description":"intervals[1][0]=4 <= merged[-1][1]=4，边界重叠","intervals":[[1,4],[4,5]],"merged":[[1,4]],"i":1,"activeIdx":1,"comparing":[0,1]},
  {"lineNum":6,"phase":"merge","description":"合并：merged[-1][1] = max(4,5) = 5，得 [1,5]","intervals":[[1,4],[4,5]],"merged":[[1,5]],"i":1,"activeIdx":1,"comparing":null},
  {"lineNum":9,"phase":"record","description":"遍历结束，返回 merged = [[1,5]]","intervals":[[1,4],[4,5]],"merged":[[1,5]],"i":1,"activeIdx":-1,"comparing":null}
];

const phaseLabels = { init: '初始化', compare: '比较', merge: '合并', record: '记录' };

let maxVal = 20;

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">原始区间（水平条形图）</div>
      <div id="interval-bars" style="position:relative;height:140px;margin:8px 0"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>当前比较</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(251,146,60,0.4);border:1px solid #fb923c"></div>重叠区间</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">合并结果 merged</div>
      <div id="merged-bars" style="position:relative;height:60px;margin:8px 0"></div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '56. Merge Intervals — 执行可视化',
  problemDesc: `
    <p>以数组 <code>intervals</code> 表示若干个区间的集合，其中单个区间为 <code>intervals[i] = [start_i, end_i]</code>。请你合并所有重叠的区间，并返回一个不重叠的区间数组。</p>
    <div class="example">输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠，合并为 [1,6]。</div>
    <p><strong>提示：</strong><code>intervals[i][0] <= intervals[i][1]</code>。</p>
  `,
  subtitle: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '多区间合并', steps: steps1, subtitle: 'intervals = [[1,3],[2,6],[8,10],[15,18]]' },
    { name: '边界重叠', steps: steps2, subtitle: 'intervals = [[1,4],[4,5]]', setup(panel) { INTERVALS = [[1,4],[4,5]]; maxVal = 6; setupPanel(panel); } },
  ],

  setup: setupPanel,

  render(s) {
    const intervals = s.intervals || INTERVALS;
    const scale = (v) => (v / maxVal) * 100;

    const barsEl = document.getElementById('interval-bars');
    barsEl.innerHTML = intervals.map((iv, idx) => {
      const left = scale(iv[0]);
      const width = scale(iv[1] - iv[0]);
      const color = BAR_COLORS[idx % BAR_COLORS.length];
      const isActive = idx === s.activeIdx;
      const isComparing = s.comparing && s.comparing.includes(idx);
      const opacity = isActive ? 1 : isComparing ? 0.8 : 0.5;
      const border = isActive ? '2px solid #fff' : isComparing ? '2px dashed #fbbf24' : '1px solid ' + color;
      return `<div style="position:absolute;left:${left}%;width:${Math.max(width, 2)}%;top:${idx * 32 + 4}px;height:26px;
        background:${color};opacity:${opacity};border:${border};border-radius:6px;
        display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;
        transition:all 0.3s ease">[${iv[0]},${iv[1]}]</div>`;
    }).join('');

    const mergedEl = document.getElementById('merged-bars');
    mergedEl.innerHTML = s.merged.map((iv, idx) => {
      const left = scale(iv[0]);
      const width = scale(iv[1] - iv[0]);
      const color = MERGED_COLORS[idx % MERGED_COLORS.length];
      return `<div style="position:absolute;left:${left}%;width:${Math.max(width, 2)}%;top:4px;height:30px;
        background:${color};border-radius:8px;border:2px solid ${color};
        display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;
        box-shadow:0 0 12px ${color}44;transition:all 0.3s ease">[${iv[0]},${iv[1]}]</div>`;
    }).join('');

    const resultEl = document.getElementById('result-area');
    if (s.activeIdx === -1 && s.phase === 'record') {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">合并完成</div>
          <div class="found-sub" style="margin-top:4px">结果: [${s.merged.map(iv => '[' + iv.join(',') + ']').join(', ')}]</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
