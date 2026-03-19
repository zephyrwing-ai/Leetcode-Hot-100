let NUMS = [1, 2, 3];

const code = [
  'class Solution:',
  '    def subsets(self, nums):',
  '        result = []',
  '        def backtrack(start, path):',
  '            result.append(path[:])',
  '            for i in range(start, len(nums)):',
  '                path.append(nums[i])',
  '                backtrack(i + 1, path)',
  '                path.pop()',
  '        backtrack(0, [])',
  '        return result',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10 };

const steps1 = [
  { lineNum: 2, phase: 'init', description: '初始化结果列表 result = []', nums: [1,2,3], path: [], start: 0, result: [], currentIdx: -1, action: null },
  { lineNum: 4, phase: 'record', description: '进入 backtrack(0,[])，先记录当前子集 []', nums: [1,2,3], path: [], start: 0, result: [[]], currentIdx: -1, action: 'record' },
  { lineNum: 6, phase: 'explore', description: 'i=0: 选择包含 nums[0]=1', nums: [1,2,3], path: [1], start: 1, result: [[]], currentIdx: 0, action: 'choose' },
  { lineNum: 4, phase: 'record', description: '记录子集 [1]', nums: [1,2,3], path: [1], start: 1, result: [[], [1]], currentIdx: -1, action: 'record' },
  { lineNum: 6, phase: 'explore', description: 'i=1: 选择包含 nums[1]=2', nums: [1,2,3], path: [1, 2], start: 2, result: [[], [1]], currentIdx: 1, action: 'choose' },
  { lineNum: 4, phase: 'record', description: '记录子集 [1,2]', nums: [1,2,3], path: [1, 2], start: 2, result: [[], [1], [1,2]], currentIdx: -1, action: 'record' },
  { lineNum: 6, phase: 'explore', description: 'i=2: 选择包含 nums[2]=3', nums: [1,2,3], path: [1, 2, 3], start: 3, result: [[], [1], [1,2]], currentIdx: 2, action: 'choose' },
  { lineNum: 4, phase: 'record', description: '记录子集 [1,2,3]', nums: [1,2,3], path: [1, 2, 3], start: 3, result: [[], [1], [1,2], [1,2,3]], currentIdx: -1, action: 'record' },
  { lineNum: 8, phase: 'backtrack', description: '回溯：弹出 3，path=[1,2]，start=3 无更多选择', nums: [1,2,3], path: [1, 2], start: 2, result: [[], [1], [1,2], [1,2,3]], currentIdx: 2, action: 'undo' },
  { lineNum: 8, phase: 'backtrack', description: '回溯：弹出 2，path=[1]', nums: [1,2,3], path: [1], start: 1, result: [[], [1], [1,2], [1,2,3]], currentIdx: 1, action: 'undo' },
  { lineNum: 6, phase: 'explore', description: 'i=2: 选择包含 nums[2]=3（跳过2）', nums: [1,2,3], path: [1, 3], start: 3, result: [[], [1], [1,2], [1,2,3]], currentIdx: 2, action: 'choose' },
  { lineNum: 4, phase: 'record', description: '记录子集 [1,3]', nums: [1,2,3], path: [1, 3], start: 3, result: [[], [1], [1,2], [1,2,3], [1,3]], currentIdx: -1, action: 'record' },
  { lineNum: 8, phase: 'backtrack', description: '回溯：弹出 3 和 1，回到根', nums: [1,2,3], path: [], start: 0, result: [[], [1], [1,2], [1,2,3], [1,3]], currentIdx: 0, action: 'undo' },
  { lineNum: 6, phase: 'explore', description: 'i=1: 选择包含 nums[1]=2（从索引1开始）', nums: [1,2,3], path: [2], start: 2, result: [[], [1], [1,2], [1,2,3], [1,3]], currentIdx: 1, action: 'choose' },
  { lineNum: 4, phase: 'record', description: '记录子集 [2]', nums: [1,2,3], path: [2], start: 2, result: [[], [1], [1,2], [1,2,3], [1,3], [2]], currentIdx: -1, action: 'record' },
  { lineNum: 6, phase: 'explore', description: 'i=2: 选择包含 nums[2]=3', nums: [1,2,3], path: [2, 3], start: 3, result: [[], [1], [1,2], [1,2,3], [1,3], [2]], currentIdx: 2, action: 'choose' },
  { lineNum: 4, phase: 'record', description: '记录子集 [2,3]', nums: [1,2,3], path: [2, 3], start: 3, result: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3]], currentIdx: -1, action: 'record' },
  { lineNum: 8, phase: 'backtrack', description: '回溯：弹出 3 和 2，回到根', nums: [1,2,3], path: [], start: 0, result: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3]], currentIdx: 1, action: 'undo' },
  { lineNum: 6, phase: 'explore', description: 'i=2: 选择包含 nums[2]=3（从索引2开始）', nums: [1,2,3], path: [3], start: 3, result: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3]], currentIdx: 2, action: 'choose' },
  { lineNum: 4, phase: 'record', description: '记录子集 [3]', nums: [1,2,3], path: [3], start: 3, result: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]], currentIdx: -1, action: 'record' },
  { lineNum: 8, phase: 'backtrack', description: '回溯：弹出 3，所有分支搜索完毕', nums: [1,2,3], path: [], start: 0, result: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]], currentIdx: 2, action: 'undo' },
  { lineNum: 10, phase: 'done', description: '回溯完成，共找到 8 个子集', nums: [1,2,3], path: [], start: 0, result: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]], currentIdx: -1, action: null },
];

// Test case 2: [0] → [[], [0]]
const steps2 = [
  { lineNum: 2, phase: 'init', description: '初始化结果列表 result = []', nums: [0], path: [], start: 0, result: [], currentIdx: -1, action: null },
  { lineNum: 4, phase: 'record', description: '进入 backtrack(0,[])，记录空集 []', nums: [0], path: [], start: 0, result: [[]], currentIdx: -1, action: 'record' },
  { lineNum: 6, phase: 'explore', description: 'i=0: 选择包含 nums[0]=0', nums: [0], path: [0], start: 1, result: [[]], currentIdx: 0, action: 'choose' },
  { lineNum: 4, phase: 'record', description: '记录子集 [0]', nums: [0], path: [0], start: 1, result: [[], [0]], currentIdx: -1, action: 'record' },
  { lineNum: 8, phase: 'backtrack', description: '回溯：弹出 0，无更多选择', nums: [0], path: [], start: 0, result: [[], [0]], currentIdx: 0, action: 'undo' },
  { lineNum: 10, phase: 'done', description: '回溯完成，共找到 2 个子集', nums: [0], path: [], start: 0, result: [[], [0]], currentIdx: -1, action: null },
];

const phaseLabels = { init: '初始化', explore: '探索', backtrack: '回溯', record: '记录', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">nums 数组（高亮 = 当前选择）</div>
      <div class="array-row" id="nums-array"></div>
      <div class="legend-row">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(34,211,238,0.4);border:1px solid #22d3ee"></div>当前选择</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>在路径中</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">当前路径 path</div>
      <div class="stack-container" id="path-area"></div>
    </div>
    <div class="card">
      <div class="section-title">已收集的子集 result</div>
      <div id="result-area" style="font-family:var(--font-mono);font-size:13px"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '78. Subsets — 执行可视化',
  problemDesc: `
    <p>给你一个整数数组 <code>nums</code>，数组中的元素互不相同。返回该数组所有可能的子集（幂集）。解集不能包含重复的子集。</p>
    <div class="example">输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]</div>
  `,
  subtitle: `nums = [${NUMS}]`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '三元素子集', steps: steps1, subtitle: 'nums = [1, 2, 3]' },
    { name: '单元素子集', steps: steps2, subtitle: 'nums = [0]', setup(panel) { NUMS = [0]; setupPanel(panel); } },
  ],

  setup: setupPanel,

  render(s) {
    const nums = s.nums || NUMS;
    document.getElementById('nums-array').innerHTML = nums.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.currentIdx) cls += ' current';
      if (s.path.includes(v)) cls += ' in-window';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    const pathEl = document.getElementById('path-area');
    if (s.path.length === 0) {
      pathEl.innerHTML = '<div class="stack-empty">（空集 []）</div>';
    } else {
      pathEl.innerHTML = s.path.map((v, i) => {
        let cls = 'stack-item';
        if (i === s.path.length - 1 && s.action === 'choose') cls += ' just-pushed';
        return `<div class="${cls}">${v}</div>`;
      }).join('');
    }

    const resultEl = document.getElementById('result-area');
    if (s.result.length === 0) {
      resultEl.innerHTML = '<div style="color:var(--text-muted)">（暂无结果）</div>';
    } else {
      resultEl.innerHTML = s.result.map((r, i) => {
        const isNew = i === s.result.length - 1 && s.action === 'record';
        const display = r.length === 0 ? '[]' : `[${r.join(', ')}]`;
        return `<div style="padding:2px 0;${isNew ? 'color:#4ade80;font-weight:700' : ''}">${display}</div>`;
      }).join('');
    }

    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">共 ${s.result.length} 个子集</div>
          <div class="found-sub">2^${nums.length} = ${s.result.length} 个子集全部找到</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
