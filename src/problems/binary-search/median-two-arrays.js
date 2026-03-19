let NUMS1 = [1, 3];
let NUMS2 = [2];

const code = [
  'class Solution:',
  '    def findMedianSortedArrays(self, nums1, nums2):',
  '        if len(nums1) > len(nums2):',
  '            nums1, nums2 = nums2, nums1',
  '        m, n = len(nums1), len(nums2)',
  '        left, right = 0, m',
  '        while left <= right:',
  '            i = (left + right) // 2',
  '            j = (m + n + 1) // 2 - i',
  '            lm = nums1[i-1] if i > 0 else -inf',
  '            rm = nums1[i] if i < m else inf',
  '            ln = nums2[j-1] if j > 0 else -inf',
  '            rn = nums2[j] if j < n else inf',
  '            if lm <= rn and ln <= rm:',
  '                if (m+n) % 2 == 1:',
  '                    return max(lm, ln)',
  '                return (max(lm,ln)+min(rm,rn))/2',
  '            elif lm > rn:',
  '                right = i - 1',
  '            else:',
  '                left = i + 1',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11, 13: 12, 14: 13, 15: 14, 16: 15, 17: 16, 18: 17, 19: 18, 20: 19 };

// ── Test Case 1: nums1 = [1,3], nums2 = [2] → 2.0 ──
// m=2, n=1 → swap → nums1=[2], nums2=[1,3], m=1, n=2
// half = (1+2+1)//2 = 2
// left=0, right=1
// Iter 1: i=(0+1)//2=0, j=2-0=2
//   lm=-inf (i=0), rm=nums1[0]=2, ln=nums2[1]=3, rn=inf (j=2=n)
//   lm=-inf <= rn=inf ✓, ln=3 <= rm=2? No → left=i+1=1
// Iter 2: i=(1+1)//2=1, j=2-1=1
//   lm=nums1[0]=2, rm=inf (i=1=m), ln=nums2[0]=1, rn=nums2[1]=3
//   lm=2 <= rn=3 ✓, ln=1 <= rm=inf ✓ → found!
//   (m+n)=3 odd → return max(2,1) = 2
const steps1 = [
  {"lineNum":3,"phase":"init","description":"len(nums1)=2 > len(nums2)=1，交换使 nums1 更短","nums1":[1,3],"nums2":[2],"swapped":true,"left":null,"right":null,"i":null,"j":null,"lm":null,"rm":null,"ln":null,"rn":null,"found":null},
  {"lineNum":5,"phase":"init","description":"交换后 nums1=[2], nums2=[1,3]，m=1, n=2","nums1":[2],"nums2":[1,3],"swapped":true,"left":null,"right":null,"i":null,"j":null,"lm":null,"rm":null,"ln":null,"rn":null,"found":null},
  {"lineNum":6,"phase":"init","description":"初始化 left=0, right=m=1","nums1":[2],"nums2":[1,3],"swapped":true,"left":0,"right":1,"i":null,"j":null,"lm":null,"rm":null,"ln":null,"rn":null,"found":null},
  {"lineNum":8,"phase":"calc","description":"计算分割点 i=(0+1)//2=0, j=(1+2+1)//2-0=2","nums1":[2],"nums2":[1,3],"swapped":true,"left":0,"right":1,"i":0,"j":2,"lm":null,"rm":null,"ln":null,"rn":null,"found":null},
  {"lineNum":10,"phase":"calc","description":"计算四个边界值: lm=-inf, rm=2, ln=3, rn=inf","nums1":[2],"nums2":[1,3],"swapped":true,"left":0,"right":1,"i":0,"j":2,"lm":"-inf","rm":2,"ln":3,"rn":"inf","found":null},
  {"lineNum":14,"phase":"compare","description":"检查: lm=-inf <= rn=inf ✓，但 ln=3 > rm=2 ✗，分割点需右移","nums1":[2],"nums2":[1,3],"swapped":true,"left":0,"right":1,"i":0,"j":2,"lm":"-inf","rm":2,"ln":3,"rn":"inf","found":null},
  {"lineNum":20,"phase":"shrink","description":"ln > rm，需要更多 nums1 元素在左侧，left = i+1 = 1","nums1":[2],"nums2":[1,3],"swapped":true,"left":1,"right":1,"i":0,"j":2,"lm":null,"rm":null,"ln":null,"rn":null,"found":null},
  {"lineNum":8,"phase":"calc","description":"计算分割点 i=(1+1)//2=1, j=2-1=1","nums1":[2],"nums2":[1,3],"swapped":true,"left":1,"right":1,"i":1,"j":1,"lm":null,"rm":null,"ln":null,"rn":null,"found":null},
  {"lineNum":10,"phase":"calc","description":"计算四个边界值: lm=2, rm=inf, ln=1, rn=3","nums1":[2],"nums2":[1,3],"swapped":true,"left":1,"right":1,"i":1,"j":1,"lm":2,"rm":"inf","ln":1,"rn":3,"found":null},
  {"lineNum":14,"phase":"compare","description":"检查: lm=2 <= rn=3 ✓，ln=1 <= rm=inf ✓，找到正确分割！","nums1":[2],"nums2":[1,3],"swapped":true,"left":1,"right":1,"i":1,"j":1,"lm":2,"rm":"inf","ln":1,"rn":3,"found":null},
  {"lineNum":15,"phase":"found","description":"(m+n)=3 为奇数，中位数 = max(lm, ln) = max(2, 1) = 2.0","nums1":[2],"nums2":[1,3],"swapped":true,"left":1,"right":1,"i":1,"j":1,"lm":2,"rm":"inf","ln":1,"rn":3,"found":2.0},
];

// ── Test Case 2: nums1 = [1,2], nums2 = [3,4] → 2.5 ──
// m=2, n=2, no swap needed (equal length)
// half = (2+2+1)//2 = 2
// left=0, right=2
// Iter 1: i=(0+2)//2=1, j=2-1=1
//   lm=nums1[0]=1, rm=nums1[1]=2, ln=nums2[0]=3, rn=nums2[1]=4
//   lm=1 <= rn=4 ✓, ln=3 <= rm=2? No → left=i+1=2
// Iter 2: i=(2+2)//2=2, j=2-2=0
//   lm=nums1[1]=2, rm=inf (i=2=m), ln=-inf (j=0), rn=nums2[0]=3
//   lm=2 <= rn=3 ✓, ln=-inf <= rm=inf ✓ → found!
//   (m+n)=4 even → (max(2,-inf)+min(inf,3))/2 = (2+3)/2 = 2.5
const steps2 = [
  {"lineNum":3,"phase":"init","description":"len(nums1)=2 == len(nums2)=2，无需交换","nums1":[1,2],"nums2":[3,4],"swapped":false,"left":null,"right":null,"i":null,"j":null,"lm":null,"rm":null,"ln":null,"rn":null,"found":null},
  {"lineNum":5,"phase":"init","description":"m=2, n=2","nums1":[1,2],"nums2":[3,4],"swapped":false,"left":null,"right":null,"i":null,"j":null,"lm":null,"rm":null,"ln":null,"rn":null,"found":null},
  {"lineNum":6,"phase":"init","description":"初始化 left=0, right=m=2","nums1":[1,2],"nums2":[3,4],"swapped":false,"left":0,"right":2,"i":null,"j":null,"lm":null,"rm":null,"ln":null,"rn":null,"found":null},
  {"lineNum":8,"phase":"calc","description":"计算分割点 i=(0+2)//2=1, j=(2+2+1)//2-1=1","nums1":[1,2],"nums2":[3,4],"swapped":false,"left":0,"right":2,"i":1,"j":1,"lm":null,"rm":null,"ln":null,"rn":null,"found":null},
  {"lineNum":10,"phase":"calc","description":"计算四个边界值: lm=1, rm=2, ln=3, rn=4","nums1":[1,2],"nums2":[3,4],"swapped":false,"left":0,"right":2,"i":1,"j":1,"lm":1,"rm":2,"ln":3,"rn":4,"found":null},
  {"lineNum":14,"phase":"compare","description":"检查: lm=1 <= rn=4 ✓，但 ln=3 > rm=2 ✗，分割点需右移","nums1":[1,2],"nums2":[3,4],"swapped":false,"left":0,"right":2,"i":1,"j":1,"lm":1,"rm":2,"ln":3,"rn":4,"found":null},
  {"lineNum":20,"phase":"shrink","description":"ln > rm，需要更多 nums1 元素在左侧，left = i+1 = 2","nums1":[1,2],"nums2":[3,4],"swapped":false,"left":2,"right":2,"i":1,"j":1,"lm":null,"rm":null,"ln":null,"rn":null,"found":null},
  {"lineNum":8,"phase":"calc","description":"计算分割点 i=(2+2)//2=2, j=2-2=0","nums1":[1,2],"nums2":[3,4],"swapped":false,"left":2,"right":2,"i":2,"j":0,"lm":null,"rm":null,"ln":null,"rn":null,"found":null},
  {"lineNum":10,"phase":"calc","description":"计算四个边界值: lm=2, rm=inf, ln=-inf, rn=3","nums1":[1,2],"nums2":[3,4],"swapped":false,"left":2,"right":2,"i":2,"j":0,"lm":2,"rm":"inf","ln":"-inf","rn":3,"found":null},
  {"lineNum":14,"phase":"compare","description":"检查: lm=2 <= rn=3 ✓，ln=-inf <= rm=inf ✓，找到正确分割！","nums1":[1,2],"nums2":[3,4],"swapped":false,"left":2,"right":2,"i":2,"j":0,"lm":2,"rm":"inf","ln":"-inf","rn":3,"found":null},
  {"lineNum":17,"phase":"found","description":"(m+n)=4 为偶数，中位数 = (max(2,-inf)+min(inf,3))/2 = (2+3)/2 = 2.5","nums1":[1,2],"nums2":[3,4],"swapped":false,"left":2,"right":2,"i":2,"j":0,"lm":2,"rm":"inf","ln":"-inf","rn":3,"found":2.5},
];

const phaseLabels = { init: '初始化', calc: '计算分割', compare: '检查条件', shrink: '收缩区间', found: '找到中位数' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">nums1（较短数组，二分搜索对象）</div>
      <div class="array-row" id="nums1-array"></div>
    </div>
    <div class="card">
      <div class="section-title">nums2（较长数组）</div>
      <div class="array-row" id="nums2-array"></div>
    </div>
    <div class="card">
      <div class="section-title">分割信息</div>
      <div id="partition-info" style="font-family:var(--font-mono);font-size:13px"></div>
      <div id="ptr-info-area" style="margin-top:10px;font-size:13px;font-family:monospace;color:var(--text-muted);display:flex;gap:16px;flex-wrap:wrap"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>左半部分</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(251,146,60,0.4);border:1px solid #fb923c"></div>分割线</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>右半部分</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '4. Median of Two Sorted Arrays — 执行可视化',
  problemDesc: `
    <p>给定两个大小分别为 <code>m</code> 和 <code>n</code> 的正序（从小到大）数组 <code>nums1</code> 和 <code>nums2</code>。请你找出并返回这两个正序数组的中位数。要求算法的时间复杂度为 <code>O(log(m+n))</code>。</p>
    <div class="example">输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3]，中位数 2</div>
  `,
  subtitle: `nums1 = [${NUMS1}], nums2 = [${NUMS2}]`,
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'nums1=[1,3], nums2=[2] → 2.0', steps: steps1, subtitle: 'nums1 = [1,3], nums2 = [2]' },
    {
      name: 'nums1=[1,2], nums2=[3,4] → 2.5', steps: steps2, subtitle: 'nums1 = [1,2], nums2 = [3,4]',
      setup(panel) { NUMS1 = [1,2]; NUMS2 = [3,4]; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const nums1 = s.nums1 || NUMS1;
    const nums2 = s.nums2 || NUMS2;

    // Render nums1
    document.getElementById('nums1-array').innerHTML = nums1.map((v, idx) => {
      let cls = 'arr-cell';
      if (s.i !== null && idx < s.i) cls += ' is-left';
      if (s.i !== null && idx === s.i) cls += ' is-active';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('') || '<span style="color:var(--text-muted)">(空)</span>';

    // Render nums2
    document.getElementById('nums2-array').innerHTML = nums2.map((v, idx) => {
      let cls = 'arr-cell';
      if (s.j !== null && idx < s.j) cls += ' in-window';
      if (s.j !== null && idx === s.j) cls += ' is-active';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('') || '<span style="color:var(--text-muted)">(空)</span>';

    // Partition info
    const partInfo = document.getElementById('partition-info');
    if (s.i !== null && s.j !== null) {
      const lines = [`<div>nums1 分割: i = ${s.i}（左侧 ${s.i} 个元素）</div>`,
        `<div>nums2 分割: j = ${s.j}（左侧 ${s.j} 个元素）</div>`];
      if (s.lm !== null) {
        lines.push(`<div style="margin-top:4px">lm=${s.lm}, rm=${s.rm}, ln=${s.ln}, rn=${s.rn}</div>`);
      }
      partInfo.innerHTML = lines.join('');
    } else {
      partInfo.innerHTML = '<span style="color:var(--text-muted)">等待初始化...</span>';
    }

    const ptrInfo = document.getElementById('ptr-info-area');
    ptrInfo.innerHTML = `
      ${s.left !== null ? `<span style="color:#4ade80">left = <b>${s.left}</b></span>` : ''}
      ${s.right !== null ? `<span style="color:#38bdf8">right = <b>${s.right}</b></span>` : ''}
      ${s.i !== null ? `<span style="color:#fb923c">i = <b>${s.i}</b></span>` : ''}
      ${s.j !== null ? `<span style="color:#a855f7">j = <b>${s.j}</b></span>` : ''}
    `;

    const resultEl = document.getElementById('result-area');
    if (s.found !== null) {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">✓</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">找到中位数</div>
          <div class="found-sub" style="margin-top:4px">中位数 = ${s.found}</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
