let INITIAL_ARR = [2,0,2,1,1,0];

const code = [
  'class Solution:',
  '    def sortColors(self, nums):',
  '        low,mid,high=0,0,len(nums)-1',
  '        while mid<=high:',
  '            if nums[mid]==0:',
  '                nums[low],nums[mid]=nums[mid],nums[low]',
  '                low+=1',
  '                mid+=1',
  '            elif nums[mid]==1:',
  '                mid+=1',
  '            else:',
  '                nums[mid],nums[high]=nums[high],nums[mid]',
  '                high-=1',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11, 13: 12, 14: 13 };

const colorName = { 0: '红', 1: '白', 2: '蓝' };
const colorCSS = { 0: '#ef4444', 1: '#e2e8f0', 2: '#3b82f6' };

const steps1 = [
  {"lineNum":3,"phase":"init","description":"初始化三指针: low=0, mid=0, high=5","arr":[2,0,2,1,1,0],"low":0,"mid":0,"high":5,"swapped":null,"done":false},
  {"lineNum":5,"phase":"check","description":"检查 nums[mid=0]=2，值为蓝色(2)","arr":[2,0,2,1,1,0],"low":0,"mid":0,"high":5,"swapped":null,"done":false},
  {"lineNum":13,"phase":"swap","description":"交换 nums[0] ↔ nums[5]，high 左移至 4","arr":[0,0,2,1,1,2],"low":0,"mid":0,"high":4,"swapped":[0,5],"done":false},
  {"lineNum":5,"phase":"check","description":"检查 nums[mid=0]=0，值为红色(0)","arr":[0,0,2,1,1,2],"low":0,"mid":0,"high":4,"swapped":null,"done":false},
  {"lineNum":6,"phase":"swap","description":"交换 nums[0] ↔ nums[0]（不变），low=1, mid=1","arr":[0,0,2,1,1,2],"low":1,"mid":1,"high":4,"swapped":[0,0],"done":false},
  {"lineNum":5,"phase":"check","description":"检查 nums[mid=1]=0，值为红色(0)","arr":[0,0,2,1,1,2],"low":1,"mid":1,"high":4,"swapped":null,"done":false},
  {"lineNum":6,"phase":"swap","description":"交换 nums[1] ↔ nums[1]（不变），low=2, mid=2","arr":[0,0,2,1,1,2],"low":2,"mid":2,"high":4,"swapped":[1,1],"done":false},
  {"lineNum":5,"phase":"check","description":"检查 nums[mid=2]=2，值为蓝色(2)","arr":[0,0,2,1,1,2],"low":2,"mid":2,"high":4,"swapped":null,"done":false},
  {"lineNum":13,"phase":"swap","description":"交换 nums[2] ↔ nums[4]，high 左移至 3","arr":[0,0,1,1,2,2],"low":2,"mid":2,"high":3,"swapped":[2,4],"done":false},
  {"lineNum":5,"phase":"check","description":"检查 nums[mid=2]=1，值为白色(1)","arr":[0,0,1,1,2,2],"low":2,"mid":2,"high":3,"swapped":null,"done":false},
  {"lineNum":10,"phase":"skip","description":"白色直接跳过，mid 右移至 3","arr":[0,0,1,1,2,2],"low":2,"mid":3,"high":3,"swapped":null,"done":false},
  {"lineNum":5,"phase":"check","description":"检查 nums[mid=3]=1，值为白色(1)","arr":[0,0,1,1,2,2],"low":2,"mid":3,"high":3,"swapped":null,"done":false},
  {"lineNum":10,"phase":"skip","description":"白色直接跳过，mid=4 > high=3，循环结束","arr":[0,0,1,1,2,2],"low":2,"mid":4,"high":3,"swapped":null,"done":false},
  {"lineNum":4,"phase":"done","description":"排序完成！结果: [0, 0, 1, 1, 2, 2]（荷兰国旗）","arr":[0,0,1,1,2,2],"low":2,"mid":4,"high":3,"swapped":null,"done":true}
];

// 2nd test case: [2,0,1]
const steps2 = [
  {"lineNum":3,"phase":"init","description":"初始化三指针: low=0, mid=0, high=2","arr":[2,0,1],"low":0,"mid":0,"high":2,"swapped":null,"done":false},
  {"lineNum":5,"phase":"check","description":"检查 nums[mid=0]=2，值为蓝色(2)","arr":[2,0,1],"low":0,"mid":0,"high":2,"swapped":null,"done":false},
  {"lineNum":13,"phase":"swap","description":"交换 nums[0] ↔ nums[2]，high 左移至 1","arr":[1,0,2],"low":0,"mid":0,"high":1,"swapped":[0,2],"done":false},
  {"lineNum":5,"phase":"check","description":"检查 nums[mid=0]=1，值为白色(1)","arr":[1,0,2],"low":0,"mid":0,"high":1,"swapped":null,"done":false},
  {"lineNum":10,"phase":"skip","description":"白色直接跳过，mid 右移至 1","arr":[1,0,2],"low":0,"mid":1,"high":1,"swapped":null,"done":false},
  {"lineNum":5,"phase":"check","description":"检查 nums[mid=1]=0，值为红色(0)","arr":[1,0,2],"low":0,"mid":1,"high":1,"swapped":null,"done":false},
  {"lineNum":6,"phase":"swap","description":"交换 nums[0] ↔ nums[1]，low=1, mid=2","arr":[0,1,2],"low":1,"mid":2,"high":1,"swapped":[0,1],"done":false},
  {"lineNum":4,"phase":"done","description":"mid=2 > high=1，循环结束。排序完成: [0, 1, 2]","arr":[0,1,2],"low":1,"mid":2,"high":1,"swapped":null,"done":false},
  {"lineNum":4,"phase":"done","description":"排序完成！结果: [0, 1, 2]（荷兰国旗）","arr":[0,1,2],"low":1,"mid":2,"high":1,"swapped":null,"done":true}
];

const phaseLabels = { init: '初始化', check: '检查', swap: '交换', skip: '跳过', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">数组 nums — 荷兰国旗问题（三指针）</div>
      <div class="array-row" id="nums-array"></div>
      <div id="ptr-info" style="margin-top:10px;font-size:13px;font-family:monospace;color:var(--text-muted);display:flex;gap:16px"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:#ef4444"></div>0 (红)</div>
        <div class="legend-item"><div class="legend-dot" style="background:#e2e8f0"></div>1 (白)</div>
        <div class="legend-item"><div class="legend-dot" style="background:#3b82f6"></div>2 (蓝)</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '75. Sort Colors — 执行可视化',
  problemDesc: `
    <p>给定一个包含红色、白色和蓝色共 <code>n</code> 个元素的数组 <code>nums</code>，原地排序使得相同颜色的元素相邻，按红、白、蓝顺序排列。用整数 <code>0</code>、<code>1</code>、<code>2</code> 分别表示红、白、蓝。</p>
    <div class="example">输入：nums = [2,0,2,1,1,0]
输出：[0,0,1,1,2,2]</div>
    <p>要求：不使用库函数排序，一趟扫描完成（荷兰国旗问题）。</p>
  `,
  subtitle: 'nums = [2, 0, 2, 1, 1, 0] → [0, 0, 1, 1, 2, 2]',
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '[2,0,2,1,1,0]', steps: steps1, subtitle: '[2,0,2,1,1,0] → [0,0,1,1,2,2]' },
    { name: '[2,0,1]', steps: steps2, subtitle: '[2,0,1] → [0,1,2]', setup(panel) { INITIAL_ARR = [2,0,1]; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const arr = s.arr;
    document.getElementById('nums-array').innerHTML = arr.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.mid) cls += ' current';
      if (s.swapped && s.swapped.includes(idx)) cls += ' is-active';
      const bg = `background:${colorCSS[v]}20;border-color:${colorCSS[v]};color:${v === 1 ? '#334155' : colorCSS[v]}`;
      let label = '';
      const labels = [];
      if (idx === s.low) labels.push('L');
      if (idx === s.mid) labels.push('M');
      if (idx === s.high) labels.push('H');
      label = labels.join(' ');
      return `<div class="${cls}" style="${bg}">
        <div class="arr-val">${v}</div>
        <div class="arr-idx">${colorName[v]}</div>
        ${label ? `<div class="ptr-label" style="font-weight:700;font-size:11px;margin-top:2px;color:var(--text-secondary)">${label}</div>` : ''}
      </div>`;
    }).join('');

    document.getElementById('ptr-info').innerHTML = `
      <span style="color:#ef4444">low = <b>${s.low}</b></span>
      <span style="color:#a78bfa">mid = <b>${s.mid}</b></span>
      <span style="color:#3b82f6">high = <b>${s.high}</b></span>
    `;

    const resultEl = document.getElementById('result-area');
    if (s.done) {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80">✓</div>
        <div>
          <div class="found-text">排序完成 — 荷兰国旗</div>
          <div class="found-sub">结果: [${arr.join(', ')}]</div>
          <div class="array-row" style="margin-top:8px">${arr.map(v =>
            `<div class="arr-cell" style="background:${colorCSS[v]}30;border-color:${colorCSS[v]};color:${colorCSS[v]}"><div class="arr-val">${v}</div></div>`
          ).join('')}</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
