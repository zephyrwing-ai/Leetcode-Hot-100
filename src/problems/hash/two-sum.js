let NUMS = [2, 7, 11, 15];
let TARGET = 9;

const code = [
  'class Solution:',
  '    def twoSum(self, nums, target):',
  '        result={}',
  '        for i,num in enumerate(nums):',
  '            need=target-num',
  '            if need in result:',
  '                return[result[need],i]',
  '            result[num]=i',
];

const lineMap = { 11: 2, 12: 3, 13: 4, 14: 5, 16: 6, 17: 7 };

// ── Test Case 1: nums = [2,7,11,15], target = 9 ──
const steps1 = [
  {lineNum:11, phase:'init', description:'初始化空哈希表 result = {}，用于存储已遍历的数及其下标',
   hashmap:{}, currentI:-1, currentNum:null, need:null, found:false, returnVal:null, justAdded:null, nums:[2,7,11,15], target:9},
  {lineNum:12, phase:'check', description:'进入循环第 1 轮：i=0, num=2',
   hashmap:{}, currentI:0, currentNum:2, need:null, found:false, returnVal:null, justAdded:null, nums:[2,7,11,15], target:9},
  {lineNum:13, phase:'check', description:'计算互补值: need = 9 - 2 = 7，我们要在哈希表中找 7',
   hashmap:{}, currentI:0, currentNum:2, need:7, found:false, returnVal:null, justAdded:null, nums:[2,7,11,15], target:9},
  {lineNum:14, phase:'check', description:'查找 need=7：哈希表为空，7 不在其中，无法配对',
   hashmap:{}, currentI:0, currentNum:2, need:7, found:false, returnVal:null, justAdded:null, nums:[2,7,11,15], target:9},
  {lineNum:17, phase:'push', description:'将当前数存入哈希表：result[2] = 0，供后续元素查找',
   hashmap:{"2":0}, currentI:0, currentNum:2, need:7, found:false, returnVal:null, justAdded:2, nums:[2,7,11,15], target:9},
  {lineNum:12, phase:'check', description:'进入循环第 2 轮：i=1, num=7',
   hashmap:{"2":0}, currentI:1, currentNum:7, need:null, found:false, returnVal:null, justAdded:null, nums:[2,7,11,15], target:9},
  {lineNum:13, phase:'check', description:'计算互补值: need = 9 - 7 = 2，我们要在哈希表中找 2',
   hashmap:{"2":0}, currentI:1, currentNum:7, need:2, found:false, returnVal:null, justAdded:null, nums:[2,7,11,15], target:9},
  {lineNum:14, phase:'record', description:'查找 need=2：在哈希表中找到！result[2]=0，说明 nums[0]+nums[1]=9',
   hashmap:{"2":0}, currentI:1, currentNum:7, need:2, found:true, returnVal:[0,1], justAdded:null, nums:[2,7,11,15], target:9},
];

// ── Test Case 2: nums = [3,2,4], target = 6 ──
const steps2 = [
  {lineNum:11, phase:'init', description:'初始化空哈希表 result = {}',
   hashmap:{}, currentI:-1, currentNum:null, need:null, found:false, returnVal:null, justAdded:null, nums:[3,2,4], target:6},
  {lineNum:12, phase:'check', description:'进入循环第 1 轮：i=0, num=3',
   hashmap:{}, currentI:0, currentNum:3, need:null, found:false, returnVal:null, justAdded:null, nums:[3,2,4], target:6},
  {lineNum:13, phase:'check', description:'计算互补值: need = 6 - 3 = 3',
   hashmap:{}, currentI:0, currentNum:3, need:3, found:false, returnVal:null, justAdded:null, nums:[3,2,4], target:6},
  {lineNum:14, phase:'check', description:'查找 need=3：哈希表为空，3 不在其中',
   hashmap:{}, currentI:0, currentNum:3, need:3, found:false, returnVal:null, justAdded:null, nums:[3,2,4], target:6},
  {lineNum:17, phase:'push', description:'将当前数存入哈希表：result[3] = 0',
   hashmap:{"3":0}, currentI:0, currentNum:3, need:3, found:false, returnVal:null, justAdded:3, nums:[3,2,4], target:6},
  {lineNum:12, phase:'check', description:'进入循环第 2 轮：i=1, num=2',
   hashmap:{"3":0}, currentI:1, currentNum:2, need:null, found:false, returnVal:null, justAdded:null, nums:[3,2,4], target:6},
  {lineNum:13, phase:'check', description:'计算互补值: need = 6 - 2 = 4',
   hashmap:{"3":0}, currentI:1, currentNum:2, need:4, found:false, returnVal:null, justAdded:null, nums:[3,2,4], target:6},
  {lineNum:14, phase:'check', description:'查找 need=4：不在哈希表中（只有 3）',
   hashmap:{"3":0}, currentI:1, currentNum:2, need:4, found:false, returnVal:null, justAdded:null, nums:[3,2,4], target:6},
  {lineNum:17, phase:'push', description:'将当前数存入哈希表：result[2] = 1',
   hashmap:{"3":0,"2":1}, currentI:1, currentNum:2, need:4, found:false, returnVal:null, justAdded:2, nums:[3,2,4], target:6},
  {lineNum:12, phase:'check', description:'进入循环第 3 轮：i=2, num=4',
   hashmap:{"3":0,"2":1}, currentI:2, currentNum:4, need:null, found:false, returnVal:null, justAdded:null, nums:[3,2,4], target:6},
  {lineNum:13, phase:'check', description:'计算互补值: need = 6 - 4 = 2',
   hashmap:{"3":0,"2":1}, currentI:2, currentNum:4, need:2, found:false, returnVal:null, justAdded:null, nums:[3,2,4], target:6},
  {lineNum:14, phase:'record', description:'查找 need=2：在哈希表中找到！result[2]=1，返回 [1, 2]',
   hashmap:{"3":0,"2":1}, currentI:2, currentNum:4, need:2, found:true, returnVal:[1,2], justAdded:null, nums:[3,2,4], target:6},
];

const phaseLabels = { init: '初始化', push: '存入', check: '检查', record: '返回' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">输入数组 nums（蓝色 = 当前遍历元素）</div>
      <div class="array-row" id="nums-array"></div>
      <div style="display:inline-flex;align-items:center;gap:6px;margin-top:10px;font-size:12px;color:var(--text-muted);font-family:monospace">
        target = <span style="font-size:14px;font-weight:700;color:#f59e0b" id="target-val">${TARGET}</span>
      </div>
    </div>
    <div class="card">
      <div class="section-title">哈希表 result（key: 数值 → value: 下标）</div>
      <div id="hashmap-area"></div>
      <div class="legend-row">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>刚存入</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(245,158,11,0.4);border:1px solid #f59e0b"></div>命中互补值 (need)</div>
      </div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '1. Two Sum — 执行可视化',
  problemDesc: `
    <p>给定一个整数数组 <code>nums</code> 和一个整数目标值 <code>target</code>，请你在该数组中找出和为目标值的那两个整数，并返回它们的数组下标。</p>
    <div class="example">输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9，返回 [0, 1]。</div>
    <p><strong>提示：</strong>每种输入只会对应一个答案，不能重复使用同一元素。</p>
  `,
  subtitle: `nums = [${NUMS}] | target = ${TARGET}`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: 'nums=[2,7,11,15], target=9', steps: steps1, subtitle: 'nums = [2,7,11,15] | target = 9' },
    {
      name: 'nums=[3,2,4], target=6', steps: steps2, subtitle: 'nums = [3,2,4] | target = 6',
      setup(panel) { NUMS = [3,2,4]; TARGET = 6; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const nums = s.nums || NUMS;
    const target = s.target || TARGET;
    // nums array
    document.getElementById('nums-array').innerHTML = nums.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.currentI) cls += ' current';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    const tgtEl = document.getElementById('target-val');
    if (tgtEl) tgtEl.textContent = target;

    // hashmap
    const hmEl = document.getElementById('hashmap-area');
    const entries = Object.entries(s.hashmap);
    if (entries.length === 0) {
      hmEl.innerHTML = '<div class="hashmap-empty">（哈希表为空）</div>';
    } else {
      const rows = entries.map(([k, v]) => {
        let cls = 'hashmap-row';
        if (s.justAdded !== null && String(s.justAdded) === k) cls += ' just-added';
        else if (s.need !== null && String(s.need) === k) cls += ' is-need';
        return `<tr class="${cls}"><td>${k}</td><td>${v}</td></tr>`;
      }).join('');
      hmEl.innerHTML = `<table class="hashmap-table"><thead><tr><th>Key (数值)</th><th>Value (下标)</th></tr></thead><tbody>${rows}</tbody></table>`;
    }

    // found
    const foundEl = document.getElementById('found-area');
    if (s.found && s.returnVal) {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">返回 [${s.returnVal[0]}, ${s.returnVal[1]}]</div>
          <div class="found-sub">nums[${s.returnVal[0]}] + nums[${s.returnVal[1]}] = ${nums[s.returnVal[0]]} + ${nums[s.returnVal[1]]} = ${target}</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
