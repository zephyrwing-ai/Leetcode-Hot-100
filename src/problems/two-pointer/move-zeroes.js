const code = [
  'class Solution:',
  '    def moveZeros(self,nums):',
  '        left=right=0',
  '        n=len(nums)',
  '        while right < n:',
  '            if nums[right] != 0:',
  '                nums[right],nums[left]=nums[left],nums[right]',
  '                left+=1',
  '            right+=1',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8 };

const steps = [{"lineNum":3,"codeLine":"left=right=0","phase":"init","description":"初始化 left=0, right=0，n=5","arr":[0,1,0,3,12],"left":0,"right":0,"swapped":false,"justSwapped":null},{"lineNum":5,"codeLine":"while right < n:","phase":"check","description":"right=0 < n=5，检查 arr[0]=0","arr":[0,1,0,3,12],"left":0,"right":0,"swapped":false,"justSwapped":null},{"lineNum":6,"codeLine":"if nums[right] != 0:","phase":"check","description":"arr[0]=0，跳过，right 继续向右","arr":[0,1,0,3,12],"left":0,"right":0,"swapped":false,"justSwapped":null},{"lineNum":5,"codeLine":"while right < n:","phase":"check","description":"right=1 < n=5，检查 arr[1]=1","arr":[0,1,0,3,12],"left":0,"right":1,"swapped":false,"justSwapped":null},{"lineNum":6,"codeLine":"if nums[right] != 0:","phase":"check","description":"arr[1]=1 ≠ 0，执行交换 arr[1] ↔ arr[0]","arr":[0,1,0,3,12],"left":0,"right":1,"swapped":false,"justSwapped":null},{"lineNum":7,"codeLine":"nums[right],nums[left]=nums[left],nums[right]","phase":"push","description":"交换完成，arr=[1, 0, 0, 3, 12]，left 移至 1","arr":[1,0,0,3,12],"left":1,"right":1,"swapped":true,"justSwapped":[0,1]},{"lineNum":5,"codeLine":"while right < n:","phase":"check","description":"right=2 < n=5，检查 arr[2]=0","arr":[1,0,0,3,12],"left":1,"right":2,"swapped":false,"justSwapped":null},{"lineNum":6,"codeLine":"if nums[right] != 0:","phase":"check","description":"arr[2]=0，跳过，right 继续向右","arr":[1,0,0,3,12],"left":1,"right":2,"swapped":false,"justSwapped":null},{"lineNum":5,"codeLine":"while right < n:","phase":"check","description":"right=3 < n=5，检查 arr[3]=3","arr":[1,0,0,3,12],"left":1,"right":3,"swapped":false,"justSwapped":null},{"lineNum":6,"codeLine":"if nums[right] != 0:","phase":"check","description":"arr[3]=3 ≠ 0，执行交换 arr[3] ↔ arr[1]","arr":[1,0,0,3,12],"left":1,"right":3,"swapped":false,"justSwapped":null},{"lineNum":7,"codeLine":"nums[right],nums[left]=nums[left],nums[right]","phase":"push","description":"交换完成，arr=[1, 3, 0, 0, 12]，left 移至 2","arr":[1,3,0,0,12],"left":2,"right":3,"swapped":true,"justSwapped":[1,3]},{"lineNum":5,"codeLine":"while right < n:","phase":"check","description":"right=4 < n=5，检查 arr[4]=12","arr":[1,3,0,0,12],"left":2,"right":4,"swapped":false,"justSwapped":null},{"lineNum":6,"codeLine":"if nums[right] != 0:","phase":"check","description":"arr[4]=12 ≠ 0，执行交换 arr[4] ↔ arr[2]","arr":[1,3,0,0,12],"left":2,"right":4,"swapped":false,"justSwapped":null},{"lineNum":7,"codeLine":"nums[right],nums[left]=nums[left],nums[right]","phase":"push","description":"交换完成，arr=[1, 3, 12, 0, 0]，left 移至 3","arr":[1,3,12,0,0],"left":3,"right":4,"swapped":true,"justSwapped":[2,4]},{"lineNum":5,"codeLine":"while right < n:","phase":"record","description":"right=5 = n=5，循环结束，结果: [1, 3, 12, 0, 0]","arr":[1,3,12,0,0],"left":3,"right":5,"swapped":false,"justSwapped":null}];

const phaseLabels = { init: '初始化', push: '交换', check: '检查', record: '完成' };

export default {
  title: '283. Move Zeroes — 执行可视化',
  subtitle: 'nums = [0, 1, 0, 3, 12]',
  code, lineMap, steps, phaseLabels,

  setup(panel) {
    panel.innerHTML = `
      <div class="card">
        <div class="section-title">数组 nums（L = left 指针，R = right 指针）</div>
        <div class="array-row" id="nums-array"></div>
        <div id="ptr-info-area" style="margin-top:10px;font-size:13px;font-family:monospace;color:var(--text-muted);display:flex;gap:16px"></div>
        <div class="legend-row" style="margin-top:8px">
          <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>L (left)</div>
          <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>R (right)</div>
          <div class="legend-item"><div class="legend-dot" style="background:rgba(245,158,11,0.4);border:1px solid #f59e0b"></div>刚交换</div>
          <div class="legend-item"><div class="legend-dot" style="background:rgba(100,116,139,0.35);border:1px solid #64748b"></div>值为 0</div>
        </div>
      </div>
      <div id="result-area"></div>
    `;
  },

  render(s) {
    // nums array
    const arr = s.arr;
    document.getElementById('nums-array').innerHTML = arr.map((v, idx) => {
      let cls = 'arr-cell';
      if (v === 0) cls += ' is-zero';
      if (idx === s.left) cls += ' is-left';
      if (idx === s.right) cls += ' is-right';
      if (s.justSwapped && s.justSwapped.includes(idx)) cls += ' just-swapped';

      let label = '';
      if (idx === s.left && idx === s.right) label = 'L R';
      else if (idx === s.left) label = 'L';
      else if (idx === s.right) label = 'R';

      const labelColor = label.includes('L') && label.includes('R')
        ? '#a78bfa'
        : label === 'L' ? '#4ade80' : label === 'R' ? '#38bdf8' : '';

      return `<div class="${cls}">
        <div class="arr-val">${v}</div>
        <div class="arr-idx">[${idx}]</div>
        ${label ? `<div class="ptr-label" style="color:${labelColor};font-weight:700;font-size:11px;margin-top:2px">${label}</div>` : ''}
      </div>`;
    }).join('');

    // pointer info
    const ptrInfo = document.getElementById('ptr-info-area');
    ptrInfo.innerHTML = `
      <span style="color:#4ade80">left = <b>${s.left}</b></span>
      <span style="color:#38bdf8">right = <b>${s.right}</b></span>
      ${s.swapped ? '<span style="color:#f59e0b;font-weight:600">swapped!</span>' : ''}
    `;

    // result area
    const resultEl = document.getElementById('result-area');
    if (s.phase === 'record') {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">完成</div>
          <div class="found-sub" style="margin-top:4px">结果: [${arr.join(', ')}]</div>
          <div class="array-row" style="margin-top:8px">${arr.map(v => {
            const style = v === 0
              ? 'background:rgba(100,116,139,0.18);color:#64748b'
              : 'background:rgba(74,222,128,0.15);color:#4ade80;border-color:#4ade80';
            return `<div class="arr-cell" style="${style}"><div class="arr-val">${v}</div></div>`;
          }).join('')}</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
