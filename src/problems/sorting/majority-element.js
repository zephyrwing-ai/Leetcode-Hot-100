let NUMS = [2, 2, 1, 1, 1, 2, 2];

const code = [
  'class Solution:',
  '    def majorityElement(self, nums):',
  '        candidate = None',
  '        count = 0',
  '        for num in nums:',
  '            if count == 0:',
  '                candidate = num',
  '            count += 1 if num == candidate else -1',
  '        return candidate',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8 };

// ── Test Case 1: nums = [2,2,1,1,1,2,2] → 2 ──
const steps1 = [
  {"lineNum":3,"phase":"init","description":"初始化 candidate=None, count=0","currentIdx":-1,"candidate":null,"count":0,"done":false,"nums":[2,2,1,1,1,2,2]},
  {"lineNum":5,"phase":"vote","description":"遍历 num=2: count=0，设 candidate=2","currentIdx":0,"candidate":2,"count":0,"done":false,"nums":[2,2,1,1,1,2,2]},
  {"lineNum":8,"phase":"vote","description":"num=2 == candidate=2，count+1 → count=1","currentIdx":0,"candidate":2,"count":1,"done":false,"nums":[2,2,1,1,1,2,2]},
  {"lineNum":5,"phase":"vote","description":"遍历 num=2: num == candidate=2","currentIdx":1,"candidate":2,"count":1,"done":false,"nums":[2,2,1,1,1,2,2]},
  {"lineNum":8,"phase":"vote","description":"num=2 == candidate，count+1 → count=2","currentIdx":1,"candidate":2,"count":2,"done":false,"nums":[2,2,1,1,1,2,2]},
  {"lineNum":5,"phase":"vote","description":"遍历 num=1: num ≠ candidate=2","currentIdx":2,"candidate":2,"count":2,"done":false,"nums":[2,2,1,1,1,2,2]},
  {"lineNum":8,"phase":"vote","description":"num=1 ≠ candidate，count-1 → count=1","currentIdx":2,"candidate":2,"count":1,"done":false,"nums":[2,2,1,1,1,2,2]},
  {"lineNum":5,"phase":"vote","description":"遍历 num=1: num ≠ candidate=2","currentIdx":3,"candidate":2,"count":1,"done":false,"nums":[2,2,1,1,1,2,2]},
  {"lineNum":8,"phase":"vote","description":"num=1 ≠ candidate，count-1 → count=0","currentIdx":3,"candidate":2,"count":0,"done":false,"nums":[2,2,1,1,1,2,2]},
  {"lineNum":5,"phase":"vote","description":"遍历 num=1: count=0，更换 candidate=1","currentIdx":4,"candidate":1,"count":0,"done":false,"nums":[2,2,1,1,1,2,2]},
  {"lineNum":8,"phase":"vote","description":"num=1 == candidate=1，count+1 → count=1","currentIdx":4,"candidate":1,"count":1,"done":false,"nums":[2,2,1,1,1,2,2]},
  {"lineNum":5,"phase":"vote","description":"遍历 num=2: num ≠ candidate=1","currentIdx":5,"candidate":1,"count":1,"done":false,"nums":[2,2,1,1,1,2,2]},
  {"lineNum":8,"phase":"vote","description":"num=2 ≠ candidate，count-1 → count=0","currentIdx":5,"candidate":1,"count":0,"done":false,"nums":[2,2,1,1,1,2,2]},
  {"lineNum":5,"phase":"vote","description":"遍历 num=2: count=0，更换 candidate=2","currentIdx":6,"candidate":2,"count":0,"done":false,"nums":[2,2,1,1,1,2,2]},
  {"lineNum":8,"phase":"vote","description":"num=2 == candidate=2，count+1 → count=1","currentIdx":6,"candidate":2,"count":1,"done":false,"nums":[2,2,1,1,1,2,2]},
  {"lineNum":9,"phase":"done","description":"遍历结束！多数元素 = 2","currentIdx":-1,"candidate":2,"count":1,"done":true,"nums":[2,2,1,1,1,2,2]}
];

// ── Test Case 2: nums = [3,3,4] → 3 ──
const steps2 = [
  {"lineNum":3,"phase":"init","description":"初始化 candidate=None, count=0","currentIdx":-1,"candidate":null,"count":0,"done":false,"nums":[3,3,4]},
  {"lineNum":5,"phase":"vote","description":"遍历 num=3: count=0，设 candidate=3","currentIdx":0,"candidate":3,"count":0,"done":false,"nums":[3,3,4]},
  {"lineNum":8,"phase":"vote","description":"num=3 == candidate=3，count+1 → count=1","currentIdx":0,"candidate":3,"count":1,"done":false,"nums":[3,3,4]},
  {"lineNum":5,"phase":"vote","description":"遍历 num=3: num == candidate=3","currentIdx":1,"candidate":3,"count":1,"done":false,"nums":[3,3,4]},
  {"lineNum":8,"phase":"vote","description":"num=3 == candidate，count+1 → count=2","currentIdx":1,"candidate":3,"count":2,"done":false,"nums":[3,3,4]},
  {"lineNum":5,"phase":"vote","description":"遍历 num=4: num ≠ candidate=3","currentIdx":2,"candidate":3,"count":2,"done":false,"nums":[3,3,4]},
  {"lineNum":8,"phase":"vote","description":"num=4 ≠ candidate，count-1 → count=1","currentIdx":2,"candidate":3,"count":1,"done":false,"nums":[3,3,4]},
  {"lineNum":9,"phase":"done","description":"遍历结束！多数元素 = 3","currentIdx":-1,"candidate":3,"count":1,"done":true,"nums":[3,3,4]}
];

const phaseLabels = { init: '初始化', vote: '投票', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">数组 nums（蓝色 = 当前元素）</div>
      <div class="array-row" id="nums-array"></div>
    </div>
    <div class="card">
      <div class="section-title">Boyer-Moore 投票过程</div>
      <div id="vote-area" style="display:flex;gap:32px;align-items:center"></div>
      <div id="vote-bar" style="margin-top:12px"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>等于 candidate (+1)</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(239,68,68,0.4);border:1px solid #ef4444"></div>不等于 candidate (-1)</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '169. Majority Element — 执行可视化',
  problemDesc: `
    <p>给定一个大小为 <code>n</code> 的数组 <code>nums</code>，返回其中的多数元素。多数元素是指在数组中出现次数大于 <code>n/2</code> 的元素。假设数组非空且多数元素一定存在。</p>
    <div class="example">输入：nums = [2,2,1,1,1,2,2]
输出：2</div>
    <p>进阶：尝试用 O(1) 空间复杂度解决（Boyer-Moore 投票算法）。</p>
  `,
  subtitle: `nums = [${NUMS}] → output: 2`,
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'nums = [2,2,1,1,1,2,2] → 2', steps: steps1, subtitle: 'nums = [2,2,1,1,1,2,2] → output: 2' },
    {
      name: 'nums = [3,3,4] → 3', steps: steps2, subtitle: 'nums = [3,3,4] → output: 3',
      setup(panel) { NUMS = [3,3,4]; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const nums = s.nums || NUMS;
    // nums array
    document.getElementById('nums-array').innerHTML = nums.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.currentIdx) cls += ' current';
      if (idx < s.currentIdx) {
        cls += v === s.candidate ? ' is-active' : '';
      }
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    // Vote area
    const voteEl = document.getElementById('vote-area');
    voteEl.innerHTML = `
      <div style="text-align:center">
        <div style="font-size:12px;color:var(--text-muted)">candidate</div>
        <div style="font-size:28px;font-weight:700;color:#a78bfa">${s.candidate !== null ? s.candidate : '—'}</div>
      </div>
      <div style="text-align:center">
        <div style="font-size:12px;color:var(--text-muted)">count</div>
        <div style="font-size:28px;font-weight:700;color:${s.count > 0 ? '#4ade80' : s.count === 0 ? '#f59e0b' : '#ef4444'}">${s.count}</div>
      </div>
    `;

    // Vote bar - visual representation of count
    const barEl = document.getElementById('vote-bar');
    const maxCount = 3;
    const barWidth = Math.min(Math.abs(s.count) / maxCount * 100, 100);
    const barColor = s.count > 0 ? '#4ade80' : '#ef4444';
    barEl.innerHTML = `
      <div style="height:8px;background:var(--bg-secondary);border-radius:4px;overflow:hidden">
        <div style="height:100%;width:${barWidth}%;background:${barColor};border-radius:4px;transition:width 0.3s"></div>
      </div>
    `;

    // Result
    const resultEl = document.getElementById('result-area');
    if (s.done) {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">✓</div>
        <div>
          <div class="found-text">多数元素: ${s.candidate}</div>
          <div class="found-sub">Boyer-Moore 投票算法: 成对抵消后剩下的就是多数元素</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
