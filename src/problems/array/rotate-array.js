const code = [
  'class Solution:',
  '    def rotate(self, nums, k):',
  '        k = k % len(nums)',
  '        def reverse(l, r):',
  '            while l < r:',
  '                nums[l],nums[r] = nums[r],nums[l]',
  '                l += 1; r -= 1',
  '        reverse(0, len(nums)-1)',
  '        reverse(0, k-1)',
  '        reverse(k, len(nums)-1)',
];

const lineMap = { 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9 };

let ARR = [1, 2, 3, 4, 5, 6, 7];
let K = 3;

const steps1 = [
  {"lineNum":2,"phase":"init","description":"k = 3 % 7 = 3，需要旋转3位","arr":[1,2,3,4,5,6,7],"justSwapped":null,"reverseRange":null,"label":"原始数组"},
  {"lineNum":7,"phase":"reverse-all","description":"第一步：反转整个数组 reverse(0,6)","arr":[1,2,3,4,5,6,7],"justSwapped":null,"reverseRange":[0,6],"label":"反转全部"},
  {"lineNum":5,"phase":"reverse-all","description":"交换 nums[0]=1 ↔ nums[6]=7","arr":[7,2,3,4,5,6,1],"justSwapped":[0,6],"reverseRange":[0,6],"label":"反转全部"},
  {"lineNum":5,"phase":"reverse-all","description":"交换 nums[1]=2 ↔ nums[5]=6","arr":[7,6,3,4,5,2,1],"justSwapped":[1,5],"reverseRange":[0,6],"label":"反转全部"},
  {"lineNum":5,"phase":"reverse-all","description":"交换 nums[2]=3 ↔ nums[4]=5","arr":[7,6,5,4,3,2,1],"justSwapped":[2,4],"reverseRange":[0,6],"label":"反转全部"},
  {"lineNum":7,"phase":"reverse-all","description":"整个数组反转完成 → [7,6,5,4,3,2,1]","arr":[7,6,5,4,3,2,1],"justSwapped":null,"reverseRange":null,"label":"反转全部完成"},
  {"lineNum":8,"phase":"reverse-left","description":"第二步：反转前 k=3 个元素 reverse(0,2)","arr":[7,6,5,4,3,2,1],"justSwapped":null,"reverseRange":[0,2],"label":"反转前k个"},
  {"lineNum":5,"phase":"reverse-left","description":"交换 nums[0]=7 ↔ nums[2]=5","arr":[5,6,7,4,3,2,1],"justSwapped":[0,2],"reverseRange":[0,2],"label":"反转前k个"},
  {"lineNum":8,"phase":"reverse-left","description":"前 k 个元素反转完成 → [5,6,7,...]","arr":[5,6,7,4,3,2,1],"justSwapped":null,"reverseRange":null,"label":"反转前k个完成"},
  {"lineNum":9,"phase":"reverse-right","description":"第三步：反转剩余元素 reverse(3,6)","arr":[5,6,7,4,3,2,1],"justSwapped":null,"reverseRange":[3,6],"label":"反转后n-k个"},
  {"lineNum":5,"phase":"reverse-right","description":"交换 nums[3]=4 ↔ nums[6]=1","arr":[5,6,7,1,3,2,4],"justSwapped":[3,6],"reverseRange":[3,6],"label":"反转后n-k个"},
  {"lineNum":5,"phase":"reverse-right","description":"交换 nums[4]=3 ↔ nums[5]=2","arr":[5,6,7,1,2,3,4],"justSwapped":[4,5],"reverseRange":[3,6],"label":"反转后n-k个"},
  {"lineNum":9,"phase":"reverse-right","description":"全部反转完成！结果 = [5,6,7,1,2,3,4]","arr":[5,6,7,1,2,3,4],"justSwapped":null,"reverseRange":null,"label":"完成"}
];

// Test case 2: [-1,-100,3,99], k=2 → [3,99,-1,-100]
const steps2 = [
  {"lineNum":2,"phase":"init","description":"k = 2 % 4 = 2，需要旋转2位","arr":[-1,-100,3,99],"justSwapped":null,"reverseRange":null,"label":"原始数组"},
  {"lineNum":7,"phase":"reverse-all","description":"第一步：反转整个数组 reverse(0,3)","arr":[-1,-100,3,99],"justSwapped":null,"reverseRange":[0,3],"label":"反转全部"},
  {"lineNum":5,"phase":"reverse-all","description":"交换 nums[0]=-1 ↔ nums[3]=99","arr":[99,-100,3,-1],"justSwapped":[0,3],"reverseRange":[0,3],"label":"反转全部"},
  {"lineNum":5,"phase":"reverse-all","description":"交换 nums[1]=-100 ↔ nums[2]=3","arr":[99,3,-100,-1],"justSwapped":[1,2],"reverseRange":[0,3],"label":"反转全部"},
  {"lineNum":7,"phase":"reverse-all","description":"整个数组反转完成 → [99,3,-100,-1]","arr":[99,3,-100,-1],"justSwapped":null,"reverseRange":null,"label":"反转全部完成"},
  {"lineNum":8,"phase":"reverse-left","description":"第二步：反转前 k=2 个元素 reverse(0,1)","arr":[99,3,-100,-1],"justSwapped":null,"reverseRange":[0,1],"label":"反转前k个"},
  {"lineNum":5,"phase":"reverse-left","description":"交换 nums[0]=99 ↔ nums[1]=3","arr":[3,99,-100,-1],"justSwapped":[0,1],"reverseRange":[0,1],"label":"反转前k个"},
  {"lineNum":8,"phase":"reverse-left","description":"前 k 个元素反转完成 → [3,99,...]","arr":[3,99,-100,-1],"justSwapped":null,"reverseRange":null,"label":"反转前k个完成"},
  {"lineNum":9,"phase":"reverse-right","description":"第三步：反转剩余元素 reverse(2,3)","arr":[3,99,-100,-1],"justSwapped":null,"reverseRange":[2,3],"label":"反转后n-k个"},
  {"lineNum":5,"phase":"reverse-right","description":"交换 nums[2]=-100 ↔ nums[3]=-1","arr":[3,99,-1,-100],"justSwapped":[2,3],"reverseRange":[2,3],"label":"反转后n-k个"},
  {"lineNum":9,"phase":"reverse-right","description":"全部反转完成！结果 = [3,99,-1,-100]","arr":[3,99,-1,-100],"justSwapped":null,"reverseRange":null,"label":"完成"}
];

const phaseLabels = { init: '初始化', 'reverse-all': '反转全部', 'reverse-left': '反转前k个', 'reverse-right': '反转后n-k个' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">数组 nums（三次反转法）</div>
      <div id="phase-label" style="font-size:13px;color:var(--text-muted);margin-bottom:6px;font-family:monospace"></div>
      <div class="array-row" id="nums-array"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(245,158,11,0.4);border:1px solid #f59e0b"></div>刚交换</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(139,92,246,0.3);border:1px solid #8b5cf6"></div>反转范围</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '189. Rotate Array — 执行可视化',
  problemDesc: `
    <p>给定一个整数数组 <code>nums</code>，将数组中的元素向右轮转 <code>k</code> 个位置，其中 <code>k</code> 是非负数。</p>
    <div class="example">输入：nums = [1,2,3,4,5,6,7], k = 3
输出：[5,6,7,1,2,3,4]
解释：向右轮转 1 步: [7,1,2,3,4,5,6]，2 步: [6,7,1,2,3,4,5]，3 步: [5,6,7,1,2,3,4]。</div>
    <p><strong>提示：</strong>尽可能使用原地算法，空间复杂度为 <code>O(1)</code>。</p>
  `,
  subtitle: 'nums = [1,2,3,4,5,6,7], k = 3',
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '7元素旋转3位', steps: steps1, subtitle: 'nums = [1,2,3,4,5,6,7], k = 3' },
    { name: '含负数旋转2位', steps: steps2, subtitle: 'nums = [-1,-100,3,99], k = 2', setup(panel) { ARR = [-1,-100,3,99]; K = 2; setupPanel(panel); } },
  ],

  setup: setupPanel,

  render(s) {
    document.getElementById('phase-label').textContent = s.label;

    document.getElementById('nums-array').innerHTML = s.arr.map((v, idx) => {
      let cls = 'arr-cell';
      if (s.justSwapped && s.justSwapped.includes(idx)) cls += ' just-swapped';
      const inRange = s.reverseRange && idx >= s.reverseRange[0] && idx <= s.reverseRange[1];
      if (inRange) cls += ' in-window';
      return `<div class="${cls}">
        <div class="arr-val">${v}</div>
        <div class="arr-idx">[${idx}]</div>
      </div>`;
    }).join('');

    const resultEl = document.getElementById('result-area');
    if (s.label === '完成') {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">旋转完成</div>
          <div class="found-sub" style="margin-top:4px">结果: [${s.arr.join(', ')}]</div>
          <div class="array-row" style="margin-top:8px">${s.arr.map(v =>
            `<div class="arr-cell" style="background:rgba(74,222,128,0.15);color:#4ade80;border-color:#4ade80"><div class="arr-val">${v}</div></div>`
          ).join('')}</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
