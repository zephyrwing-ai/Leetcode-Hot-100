const code = [
  'class Solution:',
  '    def firstMissingPositive(self, nums):',
  '        n = len(nums)',
  '        for i in range(n):',
  '            while 1 <= nums[i] <= n and nums[nums[i]-1] != nums[i]:',
  '                nums[nums[i]-1], nums[i] = nums[i], nums[nums[i]-1]',
  '        for i in range(n):',
  '            if nums[i] != i + 1:',
  '                return i + 1',
  '        return n + 1',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8 };

let NUMS = [3, 4, -1, 1];

const steps1 = [
  {"lineNum":2,"phase":"init","description":"初始化 n=4，nums=[3,4,-1,1]","nums":[3,4,-1,1],"arr":[3,4,-1,1],"i":0,"justSwapped":null,"scanIdx":-1,"found":null},
  {"lineNum":4,"phase":"swap","description":"开始遍历，i=0，检查 nums[0]=3","nums":[3,4,-1,1],"arr":[3,4,-1,1],"i":0,"justSwapped":null,"scanIdx":-1,"found":null},
  {"lineNum":4,"phase":"swap","description":"nums[0]=3 在[1,4]范围，nums[2]≠3，交换 nums[0]↔nums[2]","nums":[3,4,-1,1],"arr":[3,4,-1,1],"i":0,"justSwapped":[0,2],"scanIdx":-1,"found":null},
  {"lineNum":5,"phase":"swap","description":"交换后 nums=[-1,4,3,1]，继续检查 nums[0]=-1","nums":[3,4,-1,1],"arr":[-1,4,3,1],"i":0,"justSwapped":null,"scanIdx":-1,"found":null},
  {"lineNum":4,"phase":"swap","description":"nums[0]=-1，不在[1,4]范围，跳过，i++","nums":[3,4,-1,1],"arr":[-1,4,3,1],"i":0,"justSwapped":null,"scanIdx":-1,"found":null},
  {"lineNum":4,"phase":"swap","description":"i=1，检查 nums[1]=4，在[1,4]范围","nums":[3,4,-1,1],"arr":[-1,4,3,1],"i":1,"justSwapped":null,"scanIdx":-1,"found":null},
  {"lineNum":4,"phase":"swap","description":"nums[1]=4，nums[3]≠4，交换 nums[1]↔nums[3]","nums":[3,4,-1,1],"arr":[-1,4,3,1],"i":1,"justSwapped":[1,3],"scanIdx":-1,"found":null},
  {"lineNum":5,"phase":"swap","description":"交换后 nums=[-1,1,3,4]，继续检查 nums[1]=1","nums":[3,4,-1,1],"arr":[-1,1,3,4],"i":1,"justSwapped":null,"scanIdx":-1,"found":null},
  {"lineNum":4,"phase":"swap","description":"nums[1]=1，在[1,4]范围，nums[0]≠1，交换 nums[1]↔nums[0]","nums":[3,4,-1,1],"arr":[-1,1,3,4],"i":1,"justSwapped":[0,1],"scanIdx":-1,"found":null},
  {"lineNum":5,"phase":"swap","description":"交换后 nums=[1,-1,3,4]，nums[1]=-1 不在范围，i++","nums":[3,4,-1,1],"arr":[1,-1,3,4],"i":1,"justSwapped":null,"scanIdx":-1,"found":null},
  {"lineNum":4,"phase":"swap","description":"i=2，nums[2]=3，nums[2]=3 已在正确位置，跳过","nums":[3,4,-1,1],"arr":[1,-1,3,4],"i":2,"justSwapped":null,"scanIdx":-1,"found":null},
  {"lineNum":4,"phase":"swap","description":"i=3，nums[3]=4，nums[3]=4 已在正确位置，跳过","nums":[3,4,-1,1],"arr":[1,-1,3,4],"i":3,"justSwapped":null,"scanIdx":-1,"found":null},
  {"lineNum":6,"phase":"scan","description":"归位完成，开始扫描：i=0，nums[0]=1 == 1，正确","nums":[3,4,-1,1],"arr":[1,-1,3,4],"i":3,"justSwapped":null,"scanIdx":0,"found":null},
  {"lineNum":6,"phase":"scan","description":"i=1，nums[1]=-1 ≠ 2，找到缺失的正整数！","nums":[3,4,-1,1],"arr":[1,-1,3,4],"i":3,"justSwapped":null,"scanIdx":1,"found":null},
  {"lineNum":8,"phase":"found","description":"返回 i+1 = 2，第一个缺失的正整数是 2","nums":[3,4,-1,1],"arr":[1,-1,3,4],"i":3,"justSwapped":null,"scanIdx":1,"found":2}
];

const steps2 = [
  {"lineNum":2,"phase":"init","description":"初始化 n=5，nums=[7,8,9,11,12]","nums":[7,8,9,11,12],"arr":[7,8,9,11,12],"i":0,"justSwapped":null,"scanIdx":-1,"found":null},
  {"lineNum":4,"phase":"swap","description":"开始遍历，i=0，检查 nums[0]=7","nums":[7,8,9,11,12],"arr":[7,8,9,11,12],"i":0,"justSwapped":null,"scanIdx":-1,"found":null},
  {"lineNum":4,"phase":"swap","description":"nums[0]=7，超出[1,5]范围，跳过","nums":[7,8,9,11,12],"arr":[7,8,9,11,12],"i":0,"justSwapped":null,"scanIdx":-1,"found":null},
  {"lineNum":4,"phase":"swap","description":"i=1，nums[1]=8，超出[1,5]范围，跳过","nums":[7,8,9,11,12],"arr":[7,8,9,11,12],"i":1,"justSwapped":null,"scanIdx":-1,"found":null},
  {"lineNum":4,"phase":"swap","description":"i=2，nums[2]=9，超出[1,5]范围，跳过","nums":[7,8,9,11,12],"arr":[7,8,9,11,12],"i":2,"justSwapped":null,"scanIdx":-1,"found":null},
  {"lineNum":4,"phase":"swap","description":"i=3，nums[3]=11，超出[1,5]范围，跳过","nums":[7,8,9,11,12],"arr":[7,8,9,11,12],"i":3,"justSwapped":null,"scanIdx":-1,"found":null},
  {"lineNum":4,"phase":"swap","description":"i=4，nums[4]=12，超出[1,5]范围，跳过","nums":[7,8,9,11,12],"arr":[7,8,9,11,12],"i":4,"justSwapped":null,"scanIdx":-1,"found":null},
  {"lineNum":6,"phase":"swap","description":"归位阶段结束，所有元素都不在[1,5]范围内，无交换","nums":[7,8,9,11,12],"arr":[7,8,9,11,12],"i":4,"justSwapped":null,"scanIdx":-1,"found":null},
  {"lineNum":6,"phase":"scan","description":"开始扫描：i=0，nums[0]=7 ≠ 1","nums":[7,8,9,11,12],"arr":[7,8,9,11,12],"i":4,"justSwapped":null,"scanIdx":0,"found":null},
  {"lineNum":8,"phase":"found","description":"返回 i+1 = 1，第一个缺失的正整数是 1","nums":[7,8,9,11,12],"arr":[7,8,9,11,12],"i":4,"justSwapped":null,"scanIdx":0,"found":1}
];

const phaseLabels = { init: '初始化', swap: '归位交换', scan: '扫描', found: '找到结果' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">数组 nums（原地归位排序）</div>
      <div class="array-row" id="nums-array"></div>
      <div id="swap-info" style="margin-top:8px;font-size:13px;font-family:monospace;color:var(--text-muted)"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(245,158,11,0.4);border:1px solid #f59e0b"></div>刚交换</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.3);border:1px solid #4ade80"></div>已归位</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>扫描位置</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '41. First Missing Positive — 执行可视化',
  problemDesc: `
    <p>给你一个未排序的整数数组 <code>nums</code>，请你找出其中没有出现的最小的正整数。</p>
    <div class="example">输入：nums = [3,4,-1,1]
输出：2
解释：1 存在于数组中，但 2 没有。</div>
    <p><strong>提示：</strong>请设计时间复杂度为 <code>O(n)</code>、空间复杂度为 <code>O(1)</code> 的算法。</p>
  `,
  subtitle: 'nums = [3, 4, -1, 1]',
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '含负数和正数', steps: steps1, subtitle: 'nums = [3, 4, -1, 1]' },
    { name: '全部为大数', steps: steps2, subtitle: 'nums = [7, 8, 9, 11, 12]', setup(panel) { NUMS = [7,8,9,11,12]; setupPanel(panel); } },
  ],

  setup: setupPanel,

  render(s) {
    const arr = s.arr || NUMS;
    const n = arr.length;
    document.getElementById('nums-array').innerHTML = arr.map((v, idx) => {
      let cls = 'arr-cell';
      const isCorrect = v === idx + 1;
      if (s.justSwapped && s.justSwapped.includes(idx)) cls += ' just-swapped';
      else if (s.scanIdx === idx) cls += ' is-active';

      let style = '';
      if (isCorrect && s.phase !== 'init') style = 'background:rgba(74,222,128,0.12);border-color:#4ade80;color:#4ade80';

      return `<div class="${cls}" style="${style}">
        <div class="arr-val">${v}</div>
        <div class="arr-idx">[${idx}]</div>
        ${isCorrect && s.phase !== 'init' ? '<div style="font-size:10px;color:#4ade80;margin-top:1px">✓</div>' : ''}
      </div>`;
    }).join('');

    document.getElementById('swap-info').innerHTML = s.phase === 'swap'
      ? `<span style="color:#a78bfa">当前 i = <b>${s.i}</b></span>`
      : s.phase === 'scan'
      ? `<span style="color:#38bdf8">扫描 i = <b>${s.scanIdx}</b></span>`
      : '';

    const resultEl = document.getElementById('result-area');
    if (s.found !== null) {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">找到答案</div>
          <div class="found-sub" style="margin-top:4px">第一个缺失的正整数 = <b>${s.found}</b></div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
