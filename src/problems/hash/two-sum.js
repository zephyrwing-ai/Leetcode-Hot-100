const NUMS = [2, 7, 11, 15];
const TARGET = 9;

const code = [
  'class Solution(object):',
  '    def twoSum(self, nums, target):',
  '        """',
  '        :type nums: List[int]',
  '        :type target: int',
  '        :rtype: List[int]',
  '        """',
  '        result={}',
  '        for i,num in enumerate(nums):',
  '            need=target-num',
  '            if need in result:',
  '                return[result[need],i]',
  '            result[num]=i',
];

const lineMap = { 11: 7, 12: 8, 13: 9, 14: 10, 16: 11, 17: 12 };

const steps = [{"lineNum":11,"codeLine":"result={}","phase":"init","description":"\u521d\u59cb\u5316\u7a7a\u54c8\u5e0c\u8868 result = {}","hashmap":{},"currentI":-1,"currentNum":null,"need":null,"found":false,"returnVal":null,"justAdded":null},{"lineNum":12,"codeLine":"for i,num in enumerate(nums):","phase":"check","description":"\u5faa\u73af\u7b2c 1 \u8f6e: i=0, num=2","hashmap":{},"currentI":0,"currentNum":2,"need":null,"found":false,"returnVal":null,"justAdded":null},{"lineNum":13,"codeLine":"need=target-num","phase":"check","description":"\u8ba1\u7b97\u4e92\u8865\u503c: need = 9 - 2 = 7","hashmap":{},"currentI":0,"currentNum":2,"need":7,"found":false,"returnVal":null,"justAdded":null},{"lineNum":14,"codeLine":"if need in result:","phase":"check","description":"need=7 \u4e0d\u5728 result \u4e2d\uff0c\u5c06\u5f53\u524d\u6570\u5b58\u5165\u54c8\u5e0c\u8868","hashmap":{},"currentI":0,"currentNum":2,"need":7,"found":false,"returnVal":null,"justAdded":null},{"lineNum":17,"codeLine":"result[num]=i","phase":"push","description":"result[2] = 0\uff0c\u54c8\u5e0c\u8868\u73b0\u6709 1 \u6761\u8bb0\u5f55","hashmap":{"2":0},"currentI":0,"currentNum":2,"need":7,"found":false,"returnVal":null,"justAdded":2},{"lineNum":12,"codeLine":"for i,num in enumerate(nums):","phase":"check","description":"\u5faa\u73af\u7b2c 2 \u8f6e: i=1, num=7","hashmap":{"2":0},"currentI":1,"currentNum":7,"need":null,"found":false,"returnVal":null,"justAdded":null},{"lineNum":13,"codeLine":"need=target-num","phase":"check","description":"\u8ba1\u7b97\u4e92\u8865\u503c: need = 9 - 7 = 2","hashmap":{"2":0},"currentI":1,"currentNum":7,"need":2,"found":false,"returnVal":null,"justAdded":null},{"lineNum":14,"codeLine":"if need in result:","phase":"record","description":"\u2713 need=2 \u5728 result \u4e2d! result[2]=0\uff0c\u8fd4\u56de [0, 1]","hashmap":{"2":0},"currentI":1,"currentNum":7,"need":2,"found":true,"returnVal":[0,1],"justAdded":null}];

const phaseLabels = { init: '\u521d\u59cb\u5316', push: '\u5b58\u5165', check: '\u68c0\u67e5', record: '\u8fd4\u56de' };

export default {
  title: '1. Two Sum \u2014 \u6267\u884c\u53ef\u89c6\u5316',
  subtitle: `nums = [${NUMS}] | target = ${TARGET}`,
  code, lineMap, steps, phaseLabels,

  setup(panel) {
    panel.innerHTML = `
      <div class="card">
        <div class="section-title">\u8f93\u5165\u6570\u7ec4 nums\uff08\u84dd\u8272 = \u5f53\u524d\u904d\u5386\u5143\u7d20\uff09</div>
        <div class="array-row" id="nums-array"></div>
        <div style="display:inline-flex;align-items:center;gap:6px;margin-top:10px;font-size:12px;color:var(--text-muted);font-family:monospace">
          target = <span style="font-size:14px;font-weight:700;color:#f59e0b">${TARGET}</span>
        </div>
      </div>
      <div class="card">
        <div class="section-title">\u54c8\u5e0c\u8868 result\uff08key: \u6570\u503c \u2192 value: \u4e0b\u6807\uff09</div>
        <div id="hashmap-area"></div>
        <div class="legend-row">
          <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>\u521a\u5b58\u5165</div>
          <div class="legend-item"><div class="legend-dot" style="background:rgba(245,158,11,0.4);border:1px solid #f59e0b"></div>\u547d\u4e2d\u4e92\u8865\u503c (need)</div>
        </div>
      </div>
      <div id="found-area"></div>
    `;
  },

  render(s) {
    // nums array
    document.getElementById('nums-array').innerHTML = NUMS.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.currentI) cls += ' current';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    // hashmap
    const hmEl = document.getElementById('hashmap-area');
    const entries = Object.entries(s.hashmap);
    if (entries.length === 0) {
      hmEl.innerHTML = '<div class="hashmap-empty">\uff08\u54c8\u5e0c\u8868\u4e3a\u7a7a\uff09</div>';
    } else {
      const rows = entries.map(([k, v]) => {
        let cls = 'hashmap-row';
        if (s.justAdded !== null && String(s.justAdded) === k) cls += ' just-added';
        else if (s.need !== null && String(s.need) === k) cls += ' is-need';
        return `<tr class="${cls}"><td>${k}</td><td>${v}</td></tr>`;
      }).join('');
      hmEl.innerHTML = `<table class="hashmap-table"><thead><tr><th>Key (\u6570\u503c)</th><th>Value (\u4e0b\u6807)</th></tr></thead><tbody>${rows}</tbody></table>`;
    }

    // found
    const foundEl = document.getElementById('found-area');
    if (s.found && s.returnVal) {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">\u8fd4\u56de [${s.returnVal[0]}, ${s.returnVal[1]}]</div>
          <div class="found-sub">nums[${s.returnVal[0]}] + nums[${s.returnVal[1]}] = ${NUMS[s.returnVal[0]]} + ${NUMS[s.returnVal[1]]} = ${TARGET}</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
