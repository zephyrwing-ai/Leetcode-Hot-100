let CANDIDATES = [2, 3, 6, 7];
let TARGET = 7;

const code = [
  'class Solution:',
  '    def combinationSum(self, candidates, target):',
  '        result = []',
  '        def backtrack(start, path, remain):',
  '            if remain == 0:',
  '                result.append(path[:])',
  '                return',
  '            if remain < 0: return',
  '            for i in range(start, len(candidates)):',
  '                path.append(candidates[i])',
  '                backtrack(i, path, remain-candidates[i])',
  '                path.pop()',
  '        backtrack(0, [], target)',
  '        return result',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13 };

const steps1 = [
  { lineNum: 2, phase: 'init', description: '初始化 result=[]，candidates=[2,3,6,7]，target=7', path: [], remain: 7, start: 0, currentIdx: -1, result: [], action: null, candidates: [2,3,6,7], target: 7 },
  { lineNum: 12, phase: 'init', description: '调用 backtrack(0, [], 7)', path: [], remain: 7, start: 0, currentIdx: -1, result: [], action: null, candidates: [2,3,6,7], target: 7 },
  { lineNum: 9, phase: 'explore', description: 'i=0: 选择 2，remain=7-2=5', path: [2], remain: 5, start: 0, currentIdx: 0, result: [], action: 'choose', candidates: [2,3,6,7], target: 7 },
  { lineNum: 9, phase: 'explore', description: 'i=0: 再选 2，remain=5-2=3', path: [2, 2], remain: 3, start: 0, currentIdx: 0, result: [], action: 'choose', candidates: [2,3,6,7], target: 7 },
  { lineNum: 9, phase: 'explore', description: 'i=0: 再选 2，remain=3-2=1', path: [2, 2, 2], remain: 1, start: 0, currentIdx: 0, result: [], action: 'choose', candidates: [2,3,6,7], target: 7 },
  { lineNum: 9, phase: 'explore', description: 'i=0: 再选 2，remain=1-2=-1 < 0，剪枝', path: [2, 2, 2, 2], remain: -1, start: 0, currentIdx: 0, result: [], action: 'prune', candidates: [2,3,6,7], target: 7 },
  { lineNum: 11, phase: 'backtrack', description: '回溯：弹出 2，remain=1，尝试 i=1 选 3', path: [2, 2, 2], remain: 1, start: 0, currentIdx: 0, result: [], action: 'undo', candidates: [2,3,6,7], target: 7 },
  { lineNum: 9, phase: 'explore', description: 'i=1: 选择 3，remain=1-3=-2 < 0，剪枝', path: [2, 2, 2, 3], remain: -2, start: 1, currentIdx: 1, result: [], action: 'prune', candidates: [2,3,6,7], target: 7 },
  { lineNum: 11, phase: 'backtrack', description: '回溯：后续 6,7 更大也不行，回到 path=[2,2]', path: [2, 2], remain: 3, start: 0, currentIdx: 0, result: [], action: 'undo', candidates: [2,3,6,7], target: 7 },
  { lineNum: 9, phase: 'explore', description: 'i=1: 选择 3，remain=3-3=0', path: [2, 2, 3], remain: 0, start: 1, currentIdx: 1, result: [], action: 'choose', candidates: [2,3,6,7], target: 7 },
  { lineNum: 5, phase: 'record', description: 'remain=0，找到组合 [2,2,3]！', path: [2, 2, 3], remain: 0, start: 1, currentIdx: -1, result: [[2,2,3]], action: 'record', candidates: [2,3,6,7], target: 7 },
  { lineNum: 11, phase: 'backtrack', description: '回溯：弹出 3，尝试 6 和 7（都太大，剪枝）', path: [2, 2], remain: 3, start: 0, currentIdx: 1, result: [[2,2,3]], action: 'undo', candidates: [2,3,6,7], target: 7 },
  { lineNum: 11, phase: 'backtrack', description: '回溯：弹出第二个 2，path=[2]，remain=5', path: [2], remain: 5, start: 0, currentIdx: 0, result: [[2,2,3]], action: 'undo', candidates: [2,3,6,7], target: 7 },
  { lineNum: 9, phase: 'explore', description: 'i=1: 选择 3，remain=5-3=2', path: [2, 3], remain: 2, start: 1, currentIdx: 1, result: [[2,2,3]], action: 'choose', candidates: [2,3,6,7], target: 7 },
  { lineNum: 9, phase: 'explore', description: 'i=1: 再选 3，remain=2-3=-1 < 0，剪枝', path: [2, 3, 3], remain: -1, start: 1, currentIdx: 1, result: [[2,2,3]], action: 'prune', candidates: [2,3,6,7], target: 7 },
  { lineNum: 11, phase: 'backtrack', description: '回溯：后续也不行，path=[2]，尝试 6', path: [2], remain: 5, start: 0, currentIdx: 1, result: [[2,2,3]], action: 'undo', candidates: [2,3,6,7], target: 7 },
  { lineNum: 9, phase: 'explore', description: 'i=2: 选择 6，remain=5-6=-1 < 0，剪枝', path: [2, 6], remain: -1, start: 2, currentIdx: 2, result: [[2,2,3]], action: 'prune', candidates: [2,3,6,7], target: 7 },
  { lineNum: 11, phase: 'backtrack', description: '回溯：2 开头的所有分支搜索完毕', path: [], remain: 7, start: 0, currentIdx: 0, result: [[2,2,3]], action: 'undo', candidates: [2,3,6,7], target: 7 },
  { lineNum: 9, phase: 'explore', description: 'i=1: 选择 3，remain=7-3=4', path: [3], remain: 4, start: 1, currentIdx: 1, result: [[2,2,3]], action: 'choose', candidates: [2,3,6,7], target: 7 },
  { lineNum: 9, phase: 'explore', description: 'i=1: 再选 3，remain=4-3=1', path: [3, 3], remain: 1, start: 1, currentIdx: 1, result: [[2,2,3]], action: 'choose', candidates: [2,3,6,7], target: 7 },
  { lineNum: 9, phase: 'explore', description: 'i=1: 再选 3，remain=1-3=-2 < 0，剪枝', path: [3, 3, 3], remain: -2, start: 1, currentIdx: 1, result: [[2,2,3]], action: 'prune', candidates: [2,3,6,7], target: 7 },
  { lineNum: 11, phase: 'backtrack', description: '回溯：3 开头的分支无法凑成 target', path: [], remain: 7, start: 1, currentIdx: 1, result: [[2,2,3]], action: 'undo', candidates: [2,3,6,7], target: 7 },
  { lineNum: 9, phase: 'explore', description: 'i=3: 选择 7，remain=7-7=0', path: [7], remain: 0, start: 3, currentIdx: 3, result: [[2,2,3]], action: 'choose', candidates: [2,3,6,7], target: 7 },
  { lineNum: 5, phase: 'record', description: 'remain=0，找到组合 [7]！', path: [7], remain: 0, start: 3, currentIdx: -1, result: [[2,2,3],[7]], action: 'record', candidates: [2,3,6,7], target: 7 },
  { lineNum: 13, phase: 'done', description: '回溯完成，共找到 2 个组合：[2,2,3] 和 [7]', path: [], remain: 7, start: 0, currentIdx: -1, result: [[2,2,3],[7]], action: null, candidates: [2,3,6,7], target: 7 },
];

// Test case 2: candidates=[2], target=1 → [] (no solution)
const steps2 = [
  { lineNum: 2, phase: 'init', description: '初始化 result=[]，candidates=[2]，target=1', path: [], remain: 1, start: 0, currentIdx: -1, result: [], action: null, candidates: [2], target: 1 },
  { lineNum: 12, phase: 'init', description: '调用 backtrack(0, [], 1)', path: [], remain: 1, start: 0, currentIdx: -1, result: [], action: null, candidates: [2], target: 1 },
  { lineNum: 9, phase: 'explore', description: 'i=0: 选择 2，remain=1-2=-1 < 0', path: [2], remain: -1, start: 0, currentIdx: 0, result: [], action: 'prune', candidates: [2], target: 1 },
  { lineNum: 11, phase: 'backtrack', description: '回溯：弹出 2，没有更多候选数', path: [], remain: 1, start: 0, currentIdx: 0, result: [], action: 'undo', candidates: [2], target: 1 },
  { lineNum: 13, phase: 'done', description: '回溯完成，无法凑成 target=1，result=[]', path: [], remain: 1, start: 0, currentIdx: -1, result: [], action: null, candidates: [2], target: 1 },
];

const phaseLabels = { init: '初始化', explore: '探索', backtrack: '回溯', record: '记录', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">candidates 数组（高亮 = 当前选择）</div>
      <div class="array-row" id="cand-array"></div>
      <div class="legend-row">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(34,211,238,0.4);border:1px solid #22d3ee"></div>当前选择</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(248,113,113,0.4);border:1px solid #f87171"></div>剪枝</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">当前路径 path &amp; 剩余 remain</div>
      <div class="stack-container" id="path-area"></div>
      <div id="remain-display" style="margin-top:8px;font-family:var(--font-mono);font-size:14px"></div>
    </div>
    <div class="card">
      <div class="section-title">已找到的组合 result</div>
      <div id="result-area" style="font-family:var(--font-mono);font-size:13px"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '39. Combination Sum — 执行可视化',
  problemDesc: `
    <p>给你一个无重复元素的整数数组 <code>candidates</code> 和一个目标整数 <code>target</code>，找出所有和为 <code>target</code> 的组合。<code>candidates</code> 中的数字可以无限制重复被选取。</p>
    <div class="example">输入：candidates = [2,3,6,7], target = 7
输出：[[2,2,3],[7]]</div>
  `,
  subtitle: `candidates = [${CANDIDATES}], target = ${TARGET}`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '多解情况', steps: steps1, subtitle: 'candidates = [2,3,6,7], target = 7' },
    { name: '无解情况', steps: steps2, subtitle: 'candidates = [2], target = 1', setup(panel) { CANDIDATES = [2]; TARGET = 1; setupPanel(panel); } },
  ],

  setup: setupPanel,

  render(s) {
    const cands = s.candidates || CANDIDATES;
    const tgt = s.target || TARGET;
    document.getElementById('cand-array').innerHTML = cands.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.currentIdx) cls += (s.action === 'prune' ? ' in-window' : ' current');
      return `<div class="${cls}" style="${idx === s.currentIdx && s.action === 'prune' ? 'border-color:#f87171;background:rgba(248,113,113,0.15)' : ''}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    const pathEl = document.getElementById('path-area');
    if (s.path.length === 0) {
      pathEl.innerHTML = '<div class="stack-empty">（路径为空）</div>';
    } else {
      pathEl.innerHTML = s.path.map((v, i) => {
        let cls = 'stack-item';
        if (i === s.path.length - 1 && s.action === 'choose') cls += ' just-pushed';
        if (s.action === 'prune' && i === s.path.length - 1) cls += ' just-popped';
        return `<div class="${cls}">${v}</div>`;
      }).join('');
    }

    const remainEl = document.getElementById('remain-display');
    const remainColor = s.remain < 0 ? '#f87171' : s.remain === 0 ? '#4ade80' : '#22d3ee';
    remainEl.innerHTML = `remain = <span style="color:${remainColor};font-weight:700">${s.remain}</span> / target = ${tgt}`;

    const resultEl = document.getElementById('result-area');
    if (s.result.length === 0) {
      resultEl.innerHTML = '<div style="color:var(--text-muted)">（暂无结果）</div>';
    } else {
      resultEl.innerHTML = s.result.map((r, i) => {
        const isNew = i === s.result.length - 1 && s.action === 'record';
        return `<div style="padding:2px 0;${isNew ? 'color:#4ade80;font-weight:700' : ''}">[${r.join(', ')}] → sum=${r.reduce((a,b)=>a+b,0)}</div>`;
      }).join('');
    }

    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">共 ${s.result.length} 个组合</div>
          <div class="found-sub">${s.result.length > 0 ? '目标值 ' + tgt + ' 的所有组合已找到' : '无法凑成目标值 ' + tgt}</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
