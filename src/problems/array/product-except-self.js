const code = [
  'class Solution:',
  '    def productExceptSelf(self, nums):',
  '        n = len(nums)',
  '        result = [1] * n',
  '        left = 1',
  '        for i in range(n):',
  '            result[i] = left',
  '            left *= nums[i]',
  '        right = 1',
  '        for i in range(n-1, -1, -1):',
  '            result[i] *= right',
  '            right *= nums[i]',
  '        return result',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11 };

let NUMS = [1, 2, 3, 4];

const steps1 = [
  {"lineNum":2,"phase":"init","description":"初始化 n=4，result=[1,1,1,1]，left=1","nums":[1,2,3,4],"result":[1,1,1,1],"leftProducts":[null,null,null,null],"rightProducts":[null,null,null,null],"left":1,"right":1,"activeIdx":-1,"pass":"none"},
  {"lineNum":4,"phase":"init","description":"准备开始左遍历，从左到右累积乘积","nums":[1,2,3,4],"result":[1,1,1,1],"leftProducts":[null,null,null,null],"rightProducts":[null,null,null,null],"left":1,"right":1,"activeIdx":-1,"pass":"none"},
  {"lineNum":5,"phase":"left-pass","description":"左遍历 i=0：result[0]=left=1，left=1*1=1","nums":[1,2,3,4],"result":[1,1,1,1],"leftProducts":[1,null,null,null],"rightProducts":[null,null,null,null],"left":1,"right":1,"activeIdx":0,"pass":"left"},
  {"lineNum":5,"phase":"left-pass","description":"左遍历 i=1：result[1]=left=1，left=1*2=2","nums":[1,2,3,4],"result":[1,1,1,1],"leftProducts":[1,1,null,null],"rightProducts":[null,null,null,null],"left":2,"right":1,"activeIdx":1,"pass":"left"},
  {"lineNum":5,"phase":"left-pass","description":"左遍历 i=2：result[2]=left=2，left=2*3=6","nums":[1,2,3,4],"result":[1,1,2,1],"leftProducts":[1,1,2,null],"rightProducts":[null,null,null,null],"left":6,"right":1,"activeIdx":2,"pass":"left"},
  {"lineNum":5,"phase":"left-pass","description":"左遍历 i=3：result[3]=left=6，left=6*4=24","nums":[1,2,3,4],"result":[1,1,2,6],"leftProducts":[1,1,2,6],"rightProducts":[null,null,null,null],"left":24,"right":1,"activeIdx":3,"pass":"left"},
  {"lineNum":7,"phase":"left-pass","description":"左乘积遍历完成，result = [1,1,2,6]","nums":[1,2,3,4],"result":[1,1,2,6],"leftProducts":[1,1,2,6],"rightProducts":[null,null,null,null],"left":24,"right":1,"activeIdx":-1,"pass":"left-done"},
  {"lineNum":8,"phase":"right-pass","description":"右遍历 i=3：result[3]=6*right=6*1=6，right=1*4=4","nums":[1,2,3,4],"result":[1,1,2,6],"leftProducts":[1,1,2,6],"rightProducts":[null,null,null,1],"left":24,"right":4,"activeIdx":3,"pass":"right"},
  {"lineNum":8,"phase":"right-pass","description":"右遍历 i=2：result[2]=2*right=2*4=8，right=4*3=12","nums":[1,2,3,4],"result":[1,1,8,6],"leftProducts":[1,1,2,6],"rightProducts":[null,null,4,1],"left":24,"right":12,"activeIdx":2,"pass":"right"},
  {"lineNum":8,"phase":"right-pass","description":"右遍历 i=1：result[1]=1*right=1*12=12，right=12*2=24","nums":[1,2,3,4],"result":[1,12,8,6],"leftProducts":[1,1,2,6],"rightProducts":[null,12,4,1],"left":24,"right":24,"activeIdx":1,"pass":"right"},
  {"lineNum":8,"phase":"right-pass","description":"右遍历 i=0：result[0]=1*right=1*24=24，right=24*1=24","nums":[1,2,3,4],"result":[24,12,8,6],"leftProducts":[1,1,2,6],"rightProducts":[24,12,4,1],"left":24,"right":24,"activeIdx":0,"pass":"right"},
  {"lineNum":11,"phase":"done","description":"完成！result = [24,12,8,6]","nums":[1,2,3,4],"result":[24,12,8,6],"leftProducts":[1,1,2,6],"rightProducts":[24,12,4,1],"left":24,"right":24,"activeIdx":-1,"pass":"done"}
];

// Test case 2: [-1,1,0,-3,3] → [0,0,9,0,0]
const steps2 = [
  {"lineNum":2,"phase":"init","description":"初始化 n=5，result=[1,1,1,1,1]，left=1","nums":[-1,1,0,-3,3],"result":[1,1,1,1,1],"leftProducts":[null,null,null,null,null],"rightProducts":[null,null,null,null,null],"left":1,"right":1,"activeIdx":-1,"pass":"none"},
  {"lineNum":5,"phase":"left-pass","description":"左遍历 i=0：result[0]=1，left=1*(-1)=-1","nums":[-1,1,0,-3,3],"result":[1,1,1,1,1],"leftProducts":[1,null,null,null,null],"rightProducts":[null,null,null,null,null],"left":-1,"right":1,"activeIdx":0,"pass":"left"},
  {"lineNum":5,"phase":"left-pass","description":"左遍历 i=1：result[1]=-1，left=-1*1=-1","nums":[-1,1,0,-3,3],"result":[1,-1,1,1,1],"leftProducts":[1,-1,null,null,null],"rightProducts":[null,null,null,null,null],"left":-1,"right":1,"activeIdx":1,"pass":"left"},
  {"lineNum":5,"phase":"left-pass","description":"左遍历 i=2：result[2]=-1，left=-1*0=0","nums":[-1,1,0,-3,3],"result":[1,-1,-1,1,1],"leftProducts":[1,-1,-1,null,null],"rightProducts":[null,null,null,null,null],"left":0,"right":1,"activeIdx":2,"pass":"left"},
  {"lineNum":5,"phase":"left-pass","description":"左遍历 i=3：result[3]=0，left=0*(-3)=0","nums":[-1,1,0,-3,3],"result":[1,-1,-1,0,1],"leftProducts":[1,-1,-1,0,null],"rightProducts":[null,null,null,null,null],"left":0,"right":1,"activeIdx":3,"pass":"left"},
  {"lineNum":5,"phase":"left-pass","description":"左遍历 i=4：result[4]=0，left=0*3=0","nums":[-1,1,0,-3,3],"result":[1,-1,-1,0,0],"leftProducts":[1,-1,-1,0,0],"rightProducts":[null,null,null,null,null],"left":0,"right":1,"activeIdx":4,"pass":"left"},
  {"lineNum":7,"phase":"left-pass","description":"左乘积遍历完成，result = [1,-1,-1,0,0]","nums":[-1,1,0,-3,3],"result":[1,-1,-1,0,0],"leftProducts":[1,-1,-1,0,0],"rightProducts":[null,null,null,null,null],"left":0,"right":1,"activeIdx":-1,"pass":"left-done"},
  {"lineNum":8,"phase":"right-pass","description":"右遍历 i=4：result[4]=0*1=0，right=1*3=3","nums":[-1,1,0,-3,3],"result":[1,-1,-1,0,0],"leftProducts":[1,-1,-1,0,0],"rightProducts":[null,null,null,null,1],"left":0,"right":3,"activeIdx":4,"pass":"right"},
  {"lineNum":8,"phase":"right-pass","description":"右遍历 i=3：result[3]=0*3=0，right=3*(-3)=-9","nums":[-1,1,0,-3,3],"result":[1,-1,-1,0,0],"leftProducts":[1,-1,-1,0,0],"rightProducts":[null,null,null,3,1],"left":0,"right":-9,"activeIdx":3,"pass":"right"},
  {"lineNum":8,"phase":"right-pass","description":"右遍历 i=2：result[2]=-1*(-9)=9，right=-9*0=0","nums":[-1,1,0,-3,3],"result":[1,-1,9,0,0],"leftProducts":[1,-1,-1,0,0],"rightProducts":[null,null,-9,3,1],"left":0,"right":0,"activeIdx":2,"pass":"right"},
  {"lineNum":8,"phase":"right-pass","description":"右遍历 i=1：result[1]=-1*0=0，right=0*1=0","nums":[-1,1,0,-3,3],"result":[1,0,9,0,0],"leftProducts":[1,-1,-1,0,0],"rightProducts":[null,0,-9,3,1],"left":0,"right":0,"activeIdx":1,"pass":"right"},
  {"lineNum":8,"phase":"right-pass","description":"右遍历 i=0：result[0]=1*0=0，right=0*(-1)=0","nums":[-1,1,0,-3,3],"result":[0,0,9,0,0],"leftProducts":[1,-1,-1,0,0],"rightProducts":[0,0,-9,3,1],"left":0,"right":0,"activeIdx":0,"pass":"right"},
  {"lineNum":11,"phase":"done","description":"完成！result = [0,0,9,0,0]，含零元素导致大量零","nums":[-1,1,0,-3,3],"result":[0,0,9,0,0],"leftProducts":[1,-1,-1,0,0],"rightProducts":[0,0,-9,3,1],"left":0,"right":0,"activeIdx":-1,"pass":"done"}
];

const phaseLabels = { init: '初始化', 'left-pass': '左乘积遍历', 'right-pass': '右乘积遍历', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">原始数组 nums</div>
      <div class="array-row" id="nums-array"></div>
    </div>
    <div class="card">
      <div class="section-title">左乘积 (left products)</div>
      <div class="array-row" id="left-array"></div>
      <div id="left-val" style="margin-top:6px;font-size:13px;font-family:monospace;color:var(--text-muted)"></div>
    </div>
    <div class="card">
      <div class="section-title">右乘积 (right products)</div>
      <div class="array-row" id="right-array"></div>
      <div id="right-val" style="margin-top:6px;font-size:13px;font-family:monospace;color:var(--text-muted)"></div>
    </div>
    <div class="card">
      <div class="section-title">结果 result = left × right</div>
      <div class="array-row" id="result-array"></div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '238. Product of Array Except Self — 执行可视化',
  problemDesc: `
    <p>给你一个整数数组 <code>nums</code>，返回数组 <code>answer</code>，其中 <code>answer[i]</code> 等于 <code>nums</code> 中除 <code>nums[i]</code> 之外其余各元素的乘积。</p>
    <div class="example">输入：nums = [1,2,3,4]
输出：[24,12,8,6]</div>
    <p><strong>提示：</strong>不能使用除法，且在 <code>O(n)</code> 时间复杂度内完成。</p>
  `,
  subtitle: 'nums = [1, 2, 3, 4]',
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '正整数数组', steps: steps1, subtitle: 'nums = [1, 2, 3, 4]' },
    { name: '含零和负数', steps: steps2, subtitle: 'nums = [-1, 1, 0, -3, 3]', setup(panel) { NUMS = [-1,1,0,-3,3]; setupPanel(panel); } },
  ],

  setup: setupPanel,

  render(s) {
    const nums = s.nums || NUMS;
    document.getElementById('nums-array').innerHTML = nums.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.activeIdx) cls += ' is-active';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    document.getElementById('left-array').innerHTML = s.leftProducts.map((v, idx) => {
      let cls = 'arr-cell';
      if (s.pass === 'left' && idx === s.activeIdx) cls += ' is-active';
      const display = v !== null ? v : '-';
      const style = v !== null ? 'color:#38bdf8' : 'color:var(--text-muted);opacity:0.4';
      return `<div class="${cls}" style="${style}"><div class="arr-val">${display}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');
    document.getElementById('left-val').innerHTML = `<span style="color:#38bdf8">left = <b>${s.left}</b></span>`;

    document.getElementById('right-array').innerHTML = s.rightProducts.map((v, idx) => {
      let cls = 'arr-cell';
      if (s.pass === 'right' && idx === s.activeIdx) cls += ' is-active';
      const display = v !== null ? v : '-';
      const style = v !== null ? 'color:#a78bfa' : 'color:var(--text-muted);opacity:0.4';
      return `<div class="${cls}" style="${style}"><div class="arr-val">${display}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');
    document.getElementById('right-val').innerHTML = `<span style="color:#a78bfa">right = <b>${s.right}</b></span>`;

    document.getElementById('result-array').innerHTML = s.result.map((v, idx) => {
      let cls = 'arr-cell';
      const isDone = s.pass === 'done';
      const style = isDone ? 'background:rgba(74,222,128,0.15);color:#4ade80;border-color:#4ade80' : '';
      return `<div class="${cls}" style="${style}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    const resultEl = document.getElementById('result-area');
    if (s.pass === 'done') {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">计算完成</div>
          <div class="found-sub" style="margin-top:4px">result = [${s.result.join(', ')}]</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
