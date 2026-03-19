let NUMS = [4, 1, 2, 1, 2];

const code = [
  'class Solution:',
  '    def singleNumber(self, nums):',
  '        result=0',
  '        for num in nums:',
  '            result^=num',
  '        return result',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5 };

function toBin(n, bits = 8) {
  return (n >>> 0).toString(2).padStart(bits, '0');
}

const steps1 = [
  {"lineNum":3,"phase":"init","description":"初始化 result = 0 (二进制: 00000000)","nums":[4,1,2,1,2],"currentIdx":-1,"currentNum":null,"result":0,"prevResult":null,"done":false},
  {"lineNum":4,"phase":"xor","description":"开始遍历数组，准备异或运算","nums":[4,1,2,1,2],"currentIdx":-1,"currentNum":null,"result":0,"prevResult":null,"done":false},
  {"lineNum":4,"phase":"xor","description":"遍历 num=4: 准备计算 result XOR 4","nums":[4,1,2,1,2],"currentIdx":0,"currentNum":4,"result":0,"prevResult":0,"done":false},
  {"lineNum":5,"phase":"xor","description":"0 XOR 4 = 4 (00000000 ^ 00000100 = 00000100)","nums":[4,1,2,1,2],"currentIdx":0,"currentNum":4,"result":4,"prevResult":0,"done":false},
  {"lineNum":4,"phase":"xor","description":"遍历 num=1: 准备计算 result XOR 1","nums":[4,1,2,1,2],"currentIdx":1,"currentNum":1,"result":4,"prevResult":4,"done":false},
  {"lineNum":5,"phase":"xor","description":"4 XOR 1 = 5 (00000100 ^ 00000001 = 00000101)","nums":[4,1,2,1,2],"currentIdx":1,"currentNum":1,"result":5,"prevResult":4,"done":false},
  {"lineNum":4,"phase":"xor","description":"遍历 num=2: 准备计算 result XOR 2","nums":[4,1,2,1,2],"currentIdx":2,"currentNum":2,"result":5,"prevResult":5,"done":false},
  {"lineNum":5,"phase":"xor","description":"5 XOR 2 = 7 (00000101 ^ 00000010 = 00000111)","nums":[4,1,2,1,2],"currentIdx":2,"currentNum":2,"result":7,"prevResult":5,"done":false},
  {"lineNum":4,"phase":"xor","description":"遍历 num=1: 准备计算 result XOR 1","nums":[4,1,2,1,2],"currentIdx":3,"currentNum":1,"result":7,"prevResult":7,"done":false},
  {"lineNum":5,"phase":"xor","description":"7 XOR 1 = 6 (00000111 ^ 00000001 = 00000110) — 1 被抵消","nums":[4,1,2,1,2],"currentIdx":3,"currentNum":1,"result":6,"prevResult":7,"done":false},
  {"lineNum":4,"phase":"xor","description":"遍历 num=2: 准备计算 result XOR 2","nums":[4,1,2,1,2],"currentIdx":4,"currentNum":2,"result":6,"prevResult":6,"done":false},
  {"lineNum":5,"phase":"xor","description":"6 XOR 2 = 4 (00000110 ^ 00000010 = 00000100) — 2 被抵消","nums":[4,1,2,1,2],"currentIdx":4,"currentNum":2,"result":4,"prevResult":6,"done":false},
  {"lineNum":6,"phase":"done","description":"遍历结束！result = 4，只出现一次的数字是 4","nums":[4,1,2,1,2],"currentIdx":-1,"currentNum":null,"result":4,"prevResult":null,"done":true}
];

const steps2 = [
  {"lineNum":3,"phase":"init","description":"初始化 result = 0 (二进制: 00000000)","nums":[4,1,2,1,2],"currentIdx":-1,"currentNum":null,"result":0,"prevResult":null,"done":false},
  {"lineNum":4,"phase":"xor","description":"开始遍历数组 [4,1,2,1,2]","nums":[4,1,2,1,2],"currentIdx":-1,"currentNum":null,"result":0,"prevResult":null,"done":false},
  {"lineNum":4,"phase":"xor","description":"遍历 num=4: 准备计算 result XOR 4","nums":[4,1,2,1,2],"currentIdx":0,"currentNum":4,"result":0,"prevResult":0,"done":false},
  {"lineNum":5,"phase":"xor","description":"0 XOR 4 = 4 (00000000 ^ 00000100 = 00000100)","nums":[4,1,2,1,2],"currentIdx":0,"currentNum":4,"result":4,"prevResult":0,"done":false},
  {"lineNum":4,"phase":"xor","description":"遍历 num=1: 准备计算 result XOR 1","nums":[4,1,2,1,2],"currentIdx":1,"currentNum":1,"result":4,"prevResult":4,"done":false},
  {"lineNum":5,"phase":"xor","description":"4 XOR 1 = 5 (00000100 ^ 00000001 = 00000101)","nums":[4,1,2,1,2],"currentIdx":1,"currentNum":1,"result":5,"prevResult":4,"done":false},
  {"lineNum":4,"phase":"xor","description":"遍历 num=2: 准备计算 result XOR 2","nums":[4,1,2,1,2],"currentIdx":2,"currentNum":2,"result":5,"prevResult":5,"done":false},
  {"lineNum":5,"phase":"xor","description":"5 XOR 2 = 7 (00000101 ^ 00000010 = 00000111)","nums":[4,1,2,1,2],"currentIdx":2,"currentNum":2,"result":7,"prevResult":5,"done":false},
  {"lineNum":4,"phase":"xor","description":"遍历 num=1: 准备计算 result XOR 1","nums":[4,1,2,1,2],"currentIdx":3,"currentNum":1,"result":7,"prevResult":7,"done":false},
  {"lineNum":5,"phase":"xor","description":"7 XOR 1 = 6 (00000111 ^ 00000001 = 00000110) — 1 被抵消","nums":[4,1,2,1,2],"currentIdx":3,"currentNum":1,"result":6,"prevResult":7,"done":false},
  {"lineNum":4,"phase":"xor","description":"遍历 num=2: 准备计算 result XOR 2","nums":[4,1,2,1,2],"currentIdx":4,"currentNum":2,"result":6,"prevResult":6,"done":false},
  {"lineNum":5,"phase":"xor","description":"6 XOR 2 = 4 (00000110 ^ 00000010 = 00000100) — 2 被抵消","nums":[4,1,2,1,2],"currentIdx":4,"currentNum":2,"result":4,"prevResult":6,"done":false},
  {"lineNum":6,"phase":"done","description":"遍历结束！result = 4，只出现一次的数字是 4","nums":[4,1,2,1,2],"currentIdx":-1,"currentNum":null,"result":4,"prevResult":null,"done":true}
];

// Overwrite steps2 with actual [4,1,2,1,2] data — but we need different input
// 2nd test case: [2,2,1] → answer 1
const steps2Real = [
  {"lineNum":3,"phase":"init","description":"初始化 result = 0 (二进制: 00000000)","nums":[2,2,1],"currentIdx":-1,"currentNum":null,"result":0,"prevResult":null,"done":false},
  {"lineNum":4,"phase":"xor","description":"开始遍历数组 [2,2,1]","nums":[2,2,1],"currentIdx":-1,"currentNum":null,"result":0,"prevResult":null,"done":false},
  {"lineNum":4,"phase":"xor","description":"遍历 num=2: 准备计算 result XOR 2","nums":[2,2,1],"currentIdx":0,"currentNum":2,"result":0,"prevResult":0,"done":false},
  {"lineNum":5,"phase":"xor","description":"0 XOR 2 = 2 (00000000 ^ 00000010 = 00000010)","nums":[2,2,1],"currentIdx":0,"currentNum":2,"result":2,"prevResult":0,"done":false},
  {"lineNum":4,"phase":"xor","description":"遍历 num=2: 准备计算 result XOR 2","nums":[2,2,1],"currentIdx":1,"currentNum":2,"result":2,"prevResult":2,"done":false},
  {"lineNum":5,"phase":"xor","description":"2 XOR 2 = 0 (00000010 ^ 00000010 = 00000000) — 2 被抵消!","nums":[2,2,1],"currentIdx":1,"currentNum":2,"result":0,"prevResult":2,"done":false},
  {"lineNum":4,"phase":"xor","description":"遍历 num=1: 准备计算 result XOR 1","nums":[2,2,1],"currentIdx":2,"currentNum":1,"result":0,"prevResult":0,"done":false},
  {"lineNum":5,"phase":"xor","description":"0 XOR 1 = 1 (00000000 ^ 00000001 = 00000001)","nums":[2,2,1],"currentIdx":2,"currentNum":1,"result":1,"prevResult":0,"done":false},
  {"lineNum":6,"phase":"done","description":"遍历结束！result = 1，只出现一次的数字是 1","nums":[2,2,1],"currentIdx":-1,"currentNum":null,"result":1,"prevResult":null,"done":true}
];

const phaseLabels = { init: '初始化', xor: '异或运算', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">输入数组 nums（蓝色 = 当前元素）</div>
      <div class="array-row" id="nums-array"></div>
    </div>
    <div class="card">
      <div class="section-title">XOR 异或运算过程</div>
      <div id="xor-area" style="font-family:monospace;font-size:14px"></div>
    </div>
    <div class="card">
      <div class="section-title">当前 result 值</div>
      <div id="result-display" style="font-family:monospace;font-size:18px;font-weight:700;color:var(--text-primary)"></div>
    </div>
    <div id="final-area"></div>
  `;
}

export default {
  title: '136. Single Number — 执行可视化',
  problemDesc: `
    <p>给你一个非空整数数组 <code>nums</code>，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。</p>
    <div class="example">输入：nums = [4,1,2,1,2]
输出：4</div>
    <p>要求：线性时间复杂度，不使用额外空间。提示：利用异或运算 <code>a ^ a = 0</code>。</p>
  `,
  subtitle: `nums = [${NUMS}] → output: 4`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: 'nums=[4,1,2,1,2]', steps: steps1, subtitle: 'nums = [4,1,2,1,2] → output: 4' },
    { name: 'nums=[2,2,1]', steps: steps2Real, subtitle: 'nums = [2,2,1] → output: 1', setup(panel) { NUMS = [2,2,1]; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const nums = s.nums || NUMS;
    // nums array
    document.getElementById('nums-array').innerHTML = nums.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.currentIdx) cls += ' current';
      if (idx < s.currentIdx) cls += ' in-window';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    // XOR area
    const xorEl = document.getElementById('xor-area');
    if (s.currentNum !== null && s.prevResult !== null) {
      const prevBin = toBin(s.prevResult);
      const numBin = toBin(s.currentNum);
      const resBin = toBin(s.result);
      xorEl.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:4px;padding:8px 0">
          <div style="color:var(--text-muted)">  result: <span style="color:#a78bfa">${prevBin}</span> (${s.prevResult})</div>
          <div style="color:var(--text-muted)">XOR num: <span style="color:#38bdf8">${numBin}</span> (${s.currentNum})</div>
          <div style="border-top:1px solid var(--border);padding-top:4px;color:#4ade80">
            = result: <span style="font-weight:700">${resBin}</span> (${s.result})
          </div>
        </div>
      `;
    } else {
      xorEl.innerHTML = '<div style="color:var(--text-muted)">等待运算...</div>';
    }

    // result display
    const resEl = document.getElementById('result-display');
    const resBin = toBin(s.result);
    resEl.innerHTML = `
      <span style="color:#a78bfa">${resBin}</span>
      <span style="color:var(--text-muted);font-size:14px;margin-left:8px">(十进制: ${s.result})</span>
    `;

    // final
    const finalEl = document.getElementById('final-area');
    if (s.done) {
      finalEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">✓</div>
        <div>
          <div class="found-text">只出现一次的数字: ${s.result}</div>
          <div class="found-sub">XOR 性质: a ^ a = 0, a ^ 0 = a，成对数字互相抵消</div>
        </div>
      </div>`;
    } else {
      finalEl.innerHTML = '';
    }
  },
};
