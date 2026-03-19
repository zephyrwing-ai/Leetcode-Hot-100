let NUMS = [1, 1, 1, 2, 2, 3];
let K = 2;

const code = [
  'class Solution:',
  '    def topKFrequent(self, nums, k):',
  '        count={}',
  '        for num in nums:',
  '            count[num]=count.get(num,0)+1',
  '        buckets=[[] for _ in range(len(nums)+1)]',
  '        for num,freq in count.items():',
  '            buckets[freq].append(num)',
  '        result=[]',
  '        for i in range(len(buckets)-1,-1,-1):',
  '            for num in buckets[i]:',
  '                result.append(num)',
  '                if len(result)==k:',
  '                    return result',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11, 13: 12, 14: 13 };

const steps1 = [
  {"lineNum":3,"phase":"init","description":"初始化频率哈希表 count = {}","nums":[1,1,1,2,2,3],"hashmap":{},"currentNum":null,"currentIdx":-1,"buckets":null,"result":[],"collectIdx":-1,"done":false},
  {"lineNum":4,"phase":"count","description":"开始遍历数组统计频率","nums":[1,1,1,2,2,3],"hashmap":{},"currentNum":null,"currentIdx":-1,"buckets":null,"result":[],"collectIdx":-1,"done":false},
  {"lineNum":4,"phase":"count","description":"遍历 num=1，count[1] = 0+1 = 1","nums":[1,1,1,2,2,3],"hashmap":{"1":1},"currentNum":1,"currentIdx":0,"buckets":null,"result":[],"collectIdx":-1,"done":false},
  {"lineNum":4,"phase":"count","description":"遍历 num=1，count[1] = 1+1 = 2","nums":[1,1,1,2,2,3],"hashmap":{"1":2},"currentNum":1,"currentIdx":1,"buckets":null,"result":[],"collectIdx":-1,"done":false},
  {"lineNum":4,"phase":"count","description":"遍历 num=1，count[1] = 2+1 = 3","nums":[1,1,1,2,2,3],"hashmap":{"1":3},"currentNum":1,"currentIdx":2,"buckets":null,"result":[],"collectIdx":-1,"done":false},
  {"lineNum":4,"phase":"count","description":"遍历 num=2，count[2] = 0+1 = 1","nums":[1,1,1,2,2,3],"hashmap":{"1":3,"2":1},"currentNum":2,"currentIdx":3,"buckets":null,"result":[],"collectIdx":-1,"done":false},
  {"lineNum":4,"phase":"count","description":"遍历 num=2，count[2] = 1+1 = 2","nums":[1,1,1,2,2,3],"hashmap":{"1":3,"2":2},"currentNum":2,"currentIdx":4,"buckets":null,"result":[],"collectIdx":-1,"done":false},
  {"lineNum":4,"phase":"count","description":"遍历 num=3，count[3] = 0+1 = 1","nums":[1,1,1,2,2,3],"hashmap":{"1":3,"2":2,"3":1},"currentNum":3,"currentIdx":5,"buckets":null,"result":[],"collectIdx":-1,"done":false},
  {"lineNum":6,"phase":"bucket","description":"统计完成！创建桶数组，按频率放入桶中","nums":[1,1,1,2,2,3],"hashmap":{"1":3,"2":2,"3":1},"currentNum":null,"currentIdx":-1,"buckets":{"1":[3],"2":[2],"3":[1]},"result":[],"collectIdx":-1,"done":false},
  {"lineNum":7,"phase":"bucket","description":"num=1(频率3) → buckets[3], num=2(频率2) → buckets[2], num=3(频率1) → buckets[1]","nums":[1,1,1,2,2,3],"hashmap":{"1":3,"2":2,"3":1},"currentNum":null,"currentIdx":-1,"buckets":{"1":[3],"2":[2],"3":[1]},"result":[],"collectIdx":-1,"done":false},
  {"lineNum":10,"phase":"collect","description":"从最高频率桶开始收集: buckets[3]=[1]，取出 1","nums":[1,1,1,2,2,3],"hashmap":{"1":3,"2":2,"3":1},"currentNum":1,"currentIdx":-1,"buckets":{"1":[3],"2":[2],"3":[1]},"result":[1],"collectIdx":3,"done":false},
  {"lineNum":10,"phase":"collect","description":"继续收集: buckets[2]=[2]，取出 2，result 长度=k=2","nums":[1,1,1,2,2,3],"hashmap":{"1":3,"2":2,"3":1},"currentNum":2,"currentIdx":-1,"buckets":{"1":[3],"2":[2],"3":[1]},"result":[1,2],"collectIdx":2,"done":false},
  {"lineNum":14,"phase":"done","description":"已收集 k=2 个元素，返回 [1, 2]","nums":[1,1,1,2,2,3],"hashmap":{"1":3,"2":2,"3":1},"currentNum":null,"currentIdx":-1,"buckets":{"1":[3],"2":[2],"3":[1]},"result":[1,2],"collectIdx":-1,"done":true}
];

// 2nd test case: nums=[1], k=1
const steps2 = [
  {"lineNum":3,"phase":"init","description":"初始化频率哈希表 count = {}","nums":[1],"hashmap":{},"currentNum":null,"currentIdx":-1,"buckets":null,"result":[],"collectIdx":-1,"done":false},
  {"lineNum":4,"phase":"count","description":"开始遍历数组统计频率","nums":[1],"hashmap":{},"currentNum":null,"currentIdx":-1,"buckets":null,"result":[],"collectIdx":-1,"done":false},
  {"lineNum":4,"phase":"count","description":"遍历 num=1，count[1] = 0+1 = 1","nums":[1],"hashmap":{"1":1},"currentNum":1,"currentIdx":0,"buckets":null,"result":[],"collectIdx":-1,"done":false},
  {"lineNum":6,"phase":"bucket","description":"统计完成！创建桶数组","nums":[1],"hashmap":{"1":1},"currentNum":null,"currentIdx":-1,"buckets":{"1":[1]},"result":[],"collectIdx":-1,"done":false},
  {"lineNum":7,"phase":"bucket","description":"num=1(频率1) → buckets[1]=[1]","nums":[1],"hashmap":{"1":1},"currentNum":null,"currentIdx":-1,"buckets":{"1":[1]},"result":[],"collectIdx":-1,"done":false},
  {"lineNum":10,"phase":"collect","description":"从最高频率桶开始收集: buckets[1]=[1]，取出 1","nums":[1],"hashmap":{"1":1},"currentNum":1,"currentIdx":-1,"buckets":{"1":[1]},"result":[1],"collectIdx":1,"done":false},
  {"lineNum":14,"phase":"done","description":"已收集 k=1 个元素，返回 [1]","nums":[1],"hashmap":{"1":1},"currentNum":null,"currentIdx":-1,"buckets":{"1":[1]},"result":[1],"collectIdx":-1,"done":true}
];

const phaseLabels = { init: '初始化', count: '计数', bucket: '分桶', collect: '收集', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">输入数组 nums（蓝色 = 当前遍历元素）</div>
      <div class="array-row" id="nums-array"></div>
    </div>
    <div class="card">
      <div class="section-title">频率哈希表 count</div>
      <div id="hashmap-area"></div>
    </div>
    <div class="card">
      <div class="section-title">桶排序（频率 → 元素）</div>
      <div id="bucket-area"></div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '347. Top K Frequent Elements — 执行可视化',
  problemDesc: `
    <p>给你一个整数数组 <code>nums</code> 和一个整数 <code>k</code>，请你返回其中出现频率前 <code>k</code> 高的元素。可以按任意顺序返回答案。要求时间复杂度优于 <code>O(n log n)</code>。</p>
    <div class="example">输入：nums = [1,1,1,2,2,3], k = 2
输出：[1,2]</div>
  `,
  subtitle: `nums = [${NUMS}] | k = ${K}`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '[1,1,1,2,2,3] k=2', steps: steps1, subtitle: 'nums = [1,1,1,2,2,3] | k = 2' },
    { name: '[1] k=1', steps: steps2, subtitle: 'nums = [1] | k = 1', setup(panel) { NUMS = [1]; K = 1; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const nums = s.nums || NUMS;
    // nums array
    document.getElementById('nums-array').innerHTML = nums.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.currentIdx) cls += ' current';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    // hashmap
    const hmEl = document.getElementById('hashmap-area');
    const entries = Object.entries(s.hashmap);
    if (entries.length === 0) {
      hmEl.innerHTML = '<div class="hashmap-empty">（哈希表为空）</div>';
    } else {
      const rows = entries.map(([k, v]) => {
        let cls = 'hashmap-row';
        if (s.currentNum !== null && String(s.currentNum) === k) cls += ' just-added';
        return `<tr class="${cls}"><td>${k}</td><td>${v}</td></tr>`;
      }).join('');
      hmEl.innerHTML = `<table class="hashmap-table"><thead><tr><th>元素</th><th>频率</th></tr></thead><tbody>${rows}</tbody></table>`;
    }

    // buckets
    const bucketEl = document.getElementById('bucket-area');
    if (s.buckets) {
      const bucketHtml = Object.entries(s.buckets).sort((a, b) => Number(b[0]) - Number(a[0])).map(([freq, nums]) => {
        return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
          <span style="font-size:12px;color:var(--text-muted);min-width:60px;font-family:monospace">频率 ${freq}:</span>
          <div class="array-row">${nums.map(n => {
            let cellCls = 'arr-cell';
            if (s.result.includes(n)) cellCls += ' is-active';
            if (s.collectIdx === Number(freq)) cellCls += ' current';
            return `<div class="${cellCls}"><div class="arr-val">${n}</div></div>`;
          }).join('')}</div>
        </div>`;
      }).join('');
      bucketEl.innerHTML = bucketHtml;
    } else {
      bucketEl.innerHTML = '<div style="color:var(--text-muted);font-size:13px">等待计数完成...</div>';
    }

    // result
    const resultEl = document.getElementById('result-area');
    if (s.result.length > 0) {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">${s.done ? '✓' : '...'}</div>
        <div>
          <div class="found-text">${s.done ? '完成' : '收集中'}: result = [${s.result.join(', ')}]</div>
          ${s.done ? `<div class="found-sub">前 k 个高频元素: [${s.result.join(', ')}]</div>` : ''}
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
