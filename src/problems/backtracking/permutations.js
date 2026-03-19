let NUMS = [1, 2, 3];

const code = [
  'class Solution:',
  '    def permute(self, nums):',
  '        result = []',
  '        def backtrack(path, used):',
  '            if len(path) == len(nums):',
  '                result.append(path[:])',
  '                return',
  '            for i in range(len(nums)):',
  '                if used[i]: continue',
  '                path.append(nums[i])',
  '                used[i] = True',
  '                backtrack(path, used)',
  '                path.pop()',
  '                used[i] = False',
  '        backtrack([], [False]*len(nums))',
  '        return result',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14 };

const steps1 = [
  { lineNum: 2, phase: 'init', description: '初始化结果列表 result = []', nums: [1,2,3], path: [], used: [false, false, false], result: [], currentIdx: -1, action: null },
  { lineNum: 3, phase: 'init', description: '定义回溯函数，初始调用 backtrack([], [F,F,F])', nums: [1,2,3], path: [], used: [false, false, false], result: [], currentIdx: -1, action: null },
  { lineNum: 8, phase: 'explore', description: 'i=0: 选择 nums[0]=1，加入路径', nums: [1,2,3], path: [1], used: [true, false, false], result: [], currentIdx: 0, action: 'choose' },
  { lineNum: 8, phase: 'explore', description: 'i=1: 选择 nums[1]=2，加入路径', nums: [1,2,3], path: [1, 2], used: [true, true, false], result: [], currentIdx: 1, action: 'choose' },
  { lineNum: 8, phase: 'explore', description: 'i=2: 选择 nums[2]=3，加入路径', nums: [1,2,3], path: [1, 2, 3], used: [true, true, true], result: [], currentIdx: 2, action: 'choose' },
  { lineNum: 5, phase: 'record', description: '路径长度 = 3，记录排列 [1,2,3]', nums: [1,2,3], path: [1, 2, 3], used: [true, true, true], result: [[1,2,3]], currentIdx: -1, action: 'record' },
  { lineNum: 11, phase: 'backtrack', description: '回溯：撤销选择 3，path=[1,2]', nums: [1,2,3], path: [1, 2], used: [true, true, false], result: [[1,2,3]], currentIdx: 2, action: 'undo' },
  { lineNum: 11, phase: 'backtrack', description: '回溯：撤销选择 2，path=[1]', nums: [1,2,3], path: [1], used: [true, false, false], result: [[1,2,3]], currentIdx: 1, action: 'undo' },
  { lineNum: 8, phase: 'explore', description: 'i=2: 选择 nums[2]=3，加入路径', nums: [1,2,3], path: [1, 3], used: [true, false, true], result: [[1,2,3]], currentIdx: 2, action: 'choose' },
  { lineNum: 8, phase: 'explore', description: 'i=1: 选择 nums[1]=2，加入路径', nums: [1,2,3], path: [1, 3, 2], used: [true, true, true], result: [[1,2,3]], currentIdx: 1, action: 'choose' },
  { lineNum: 5, phase: 'record', description: '路径长度 = 3，记录排列 [1,3,2]', nums: [1,2,3], path: [1, 3, 2], used: [true, true, true], result: [[1,2,3],[1,3,2]], currentIdx: -1, action: 'record' },
  { lineNum: 11, phase: 'backtrack', description: '回溯：撤销 2 和 3，回到根，尝试 nums[1]=2 开头', nums: [1,2,3], path: [], used: [false, false, false], result: [[1,2,3],[1,3,2]], currentIdx: 0, action: 'undo' },
  { lineNum: 8, phase: 'explore', description: 'i=1: 选择 nums[1]=2，加入路径', nums: [1,2,3], path: [2], used: [false, true, false], result: [[1,2,3],[1,3,2]], currentIdx: 1, action: 'choose' },
  { lineNum: 8, phase: 'explore', description: 'i=0: 选择 nums[0]=1，加入路径', nums: [1,2,3], path: [2, 1], used: [true, true, false], result: [[1,2,3],[1,3,2]], currentIdx: 0, action: 'choose' },
  { lineNum: 8, phase: 'explore', description: 'i=2: 选择 nums[2]=3，加入路径', nums: [1,2,3], path: [2, 1, 3], used: [true, true, true], result: [[1,2,3],[1,3,2]], currentIdx: 2, action: 'choose' },
  { lineNum: 5, phase: 'record', description: '路径长度 = 3，记录排列 [2,1,3]', nums: [1,2,3], path: [2, 1, 3], used: [true, true, true], result: [[1,2,3],[1,3,2],[2,1,3]], currentIdx: -1, action: 'record' },
  { lineNum: 11, phase: 'backtrack', description: '回溯：撤销 3 和 1，尝试 [2,3,...]', nums: [1,2,3], path: [2], used: [false, true, false], result: [[1,2,3],[1,3,2],[2,1,3]], currentIdx: 0, action: 'undo' },
  { lineNum: 8, phase: 'explore', description: 'i=2: 选择 nums[2]=3，加入路径', nums: [1,2,3], path: [2, 3], used: [false, true, true], result: [[1,2,3],[1,3,2],[2,1,3]], currentIdx: 2, action: 'choose' },
  { lineNum: 8, phase: 'explore', description: 'i=0: 选择 nums[0]=1，加入路径', nums: [1,2,3], path: [2, 3, 1], used: [true, true, true], result: [[1,2,3],[1,3,2],[2,1,3]], currentIdx: 0, action: 'choose' },
  { lineNum: 5, phase: 'record', description: '路径长度 = 3，记录排列 [2,3,1]', nums: [1,2,3], path: [2, 3, 1], used: [true, true, true], result: [[1,2,3],[1,3,2],[2,1,3],[2,3,1]], currentIdx: -1, action: 'record' },
  { lineNum: 11, phase: 'backtrack', description: '回溯至根，尝试 nums[2]=3 开头', nums: [1,2,3], path: [], used: [false, false, false], result: [[1,2,3],[1,3,2],[2,1,3],[2,3,1]], currentIdx: 1, action: 'undo' },
  { lineNum: 8, phase: 'explore', description: 'i=2: 选择 nums[2]=3，加入路径', nums: [1,2,3], path: [3], used: [false, false, true], result: [[1,2,3],[1,3,2],[2,1,3],[2,3,1]], currentIdx: 2, action: 'choose' },
  { lineNum: 8, phase: 'explore', description: 'i=0: 选择 nums[0]=1', nums: [1,2,3], path: [3, 1], used: [true, false, true], result: [[1,2,3],[1,3,2],[2,1,3],[2,3,1]], currentIdx: 0, action: 'choose' },
  { lineNum: 8, phase: 'explore', description: 'i=1: 选择 nums[1]=2', nums: [1,2,3], path: [3, 1, 2], used: [true, true, true], result: [[1,2,3],[1,3,2],[2,1,3],[2,3,1]], currentIdx: 1, action: 'choose' },
  { lineNum: 5, phase: 'record', description: '路径长度 = 3，记录排列 [3,1,2]', nums: [1,2,3], path: [3, 1, 2], used: [true, true, true], result: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2]], currentIdx: -1, action: 'record' },
  { lineNum: 11, phase: 'backtrack', description: '回溯：尝试 [3,2,1]', nums: [1,2,3], path: [3], used: [false, false, true], result: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2]], currentIdx: 0, action: 'undo' },
  { lineNum: 8, phase: 'explore', description: 'i=1: 选择 nums[1]=2', nums: [1,2,3], path: [3, 2], used: [false, true, true], result: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2]], currentIdx: 1, action: 'choose' },
  { lineNum: 8, phase: 'explore', description: 'i=0: 选择 nums[0]=1', nums: [1,2,3], path: [3, 2, 1], used: [true, true, true], result: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2]], currentIdx: 0, action: 'choose' },
  { lineNum: 5, phase: 'record', description: '路径长度 = 3，记录排列 [3,2,1]', nums: [1,2,3], path: [3, 2, 1], used: [true, true, true], result: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]], currentIdx: -1, action: 'record' },
  { lineNum: 14, phase: 'done', description: '回溯完成，共找到 6 个全排列', nums: [1,2,3], path: [], used: [false, false, false], result: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]], currentIdx: -1, action: null },
];

// Test case 2: [0,1] → [[0,1],[1,0]]
const steps2 = [
  { lineNum: 2, phase: 'init', description: '初始化结果列表 result = []', nums: [0,1], path: [], used: [false, false], result: [], currentIdx: -1, action: null },
  { lineNum: 3, phase: 'init', description: '调用 backtrack([], [F,F])', nums: [0,1], path: [], used: [false, false], result: [], currentIdx: -1, action: null },
  { lineNum: 8, phase: 'explore', description: 'i=0: 选择 nums[0]=0', nums: [0,1], path: [0], used: [true, false], result: [], currentIdx: 0, action: 'choose' },
  { lineNum: 8, phase: 'explore', description: 'i=1: 选择 nums[1]=1', nums: [0,1], path: [0, 1], used: [true, true], result: [], currentIdx: 1, action: 'choose' },
  { lineNum: 5, phase: 'record', description: '路径长度 = 2，记录排列 [0,1]', nums: [0,1], path: [0, 1], used: [true, true], result: [[0,1]], currentIdx: -1, action: 'record' },
  { lineNum: 11, phase: 'backtrack', description: '回溯：撤销 1 和 0，尝试 1 开头', nums: [0,1], path: [], used: [false, false], result: [[0,1]], currentIdx: 0, action: 'undo' },
  { lineNum: 8, phase: 'explore', description: 'i=1: 选择 nums[1]=1', nums: [0,1], path: [1], used: [false, true], result: [[0,1]], currentIdx: 1, action: 'choose' },
  { lineNum: 8, phase: 'explore', description: 'i=0: 选择 nums[0]=0', nums: [0,1], path: [1, 0], used: [true, true], result: [[0,1]], currentIdx: 0, action: 'choose' },
  { lineNum: 5, phase: 'record', description: '路径长度 = 2，记录排列 [1,0]', nums: [0,1], path: [1, 0], used: [true, true], result: [[0,1],[1,0]], currentIdx: -1, action: 'record' },
  { lineNum: 14, phase: 'done', description: '回溯完成，共找到 2 个全排列', nums: [0,1], path: [], used: [false, false], result: [[0,1],[1,0]], currentIdx: -1, action: null },
];

const phaseLabels = { init: '初始化', explore: '探索', backtrack: '回溯', record: '记录', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">nums 数组（高亮 = 当前选择）</div>
      <div class="array-row" id="nums-array"></div>
      <div class="legend-row">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(34,211,238,0.4);border:1px solid #22d3ee"></div>当前选择</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(248,113,113,0.4);border:1px solid #f87171"></div>已使用</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">当前路径 path</div>
      <div class="stack-container" id="path-area"></div>
    </div>
    <div class="card">
      <div class="section-title">已收集的排列 result</div>
      <div id="result-area" style="font-family:var(--font-mono);font-size:13px"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '46. Permutations — 执行可视化',
  problemDesc: `
    <p>给定一个不含重复数字的数组 <code>nums</code>，返回其所有可能的全排列。可以按任意顺序返回答案。</p>
    <div class="example">输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]</div>
  `,
  subtitle: `nums = [${NUMS}]`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '三元素排列', steps: steps1, subtitle: 'nums = [1, 2, 3]' },
    { name: '两元素排列', steps: steps2, subtitle: 'nums = [0, 1]', setup(panel) { NUMS = [0,1]; setupPanel(panel); } },
  ],

  setup: setupPanel,

  render(s) {
    const nums = s.nums || NUMS;
    document.getElementById('nums-array').innerHTML = nums.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.currentIdx) cls += ' current';
      if (s.used[idx]) cls += ' in-window';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    const pathEl = document.getElementById('path-area');
    if (s.path.length === 0) {
      pathEl.innerHTML = '<div class="stack-empty">（路径为空）</div>';
    } else {
      pathEl.innerHTML = s.path.map((v, i) => {
        let cls = 'stack-item';
        if (i === s.path.length - 1 && s.action === 'choose') cls += ' just-pushed';
        if (s.action === 'undo' && i === s.path.length - 1) cls += ' is-top';
        return `<div class="${cls}">${v}</div>`;
      }).join('');
    }

    const resultEl = document.getElementById('result-area');
    if (s.result.length === 0) {
      resultEl.innerHTML = '<div style="color:var(--text-muted)">（暂无结果）</div>';
    } else {
      resultEl.innerHTML = s.result.map((r, i) => {
        const isNew = i === s.result.length - 1 && s.action === 'record';
        return `<div style="padding:2px 0;${isNew ? 'color:#4ade80;font-weight:700' : ''}">[${r.join(', ')}]</div>`;
      }).join('');
    }

    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">共 ${s.result.length} 个全排列</div>
          <div class="found-sub">回溯搜索完成</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
