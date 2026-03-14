const NUMS = [1, 2, 1, 2, 1];
const K = 3;

const code = [
  { text: 'class Solution:' },
  { text: '    def subarraySum(self, nums, k):' },
  { text: '        prefix_sum = 0' },
  { text: '        count = 0' },
  { text: '        hashmap = {0: 1}' },
  { text: '' },
  { text: '        for num in nums:' },
  { text: '            prefix_sum += num' },
  { text: '' },
  { text: '            if prefix_sum - k in hashmap:' },
  { text: '                count += hashmap[prefix_sum - k]' },
  { text: '' },
  { text: '            hashmap[prefix_sum] = hashmap.get(prefix_sum, 0) + 1' },
  { text: '' },
  { text: '        return count' },
];

const lineMap = { 3: 2, 4: 3, 5: 4, 7: 6, 8: 7, 10: 9, 11: 10, 13: 12, 15: 14 };

const steps = [{"lineNum":3,"codeLine":"prefix_sum = 0","phase":"init","description":"初始化 prefix_sum=0, count=0, hashmap={0:1}（前缀和为0出现1次）","hashmap":{"0":1},"prefixSum":0,"count":0,"currentNum":null,"diff":null,"hit":false,"justAdded":null},{"lineNum":7,"codeLine":"for num in nums:","phase":"check","description":"处理 nums[0] = 1，当前 prefix_sum=0","hashmap":{"0":1},"prefixSum":0,"count":0,"currentNum":1,"diff":null,"hit":false,"justAdded":null,"currentIdx":0},{"lineNum":8,"codeLine":"prefix_sum += num","phase":"check","description":"前缀和更新: prefix_sum = 1","hashmap":{"0":1},"prefixSum":1,"count":0,"currentNum":1,"diff":null,"hit":false,"justAdded":null,"currentIdx":0},{"lineNum":10,"codeLine":"if prefix_sum - k in hashmap:","phase":"check","description":"prefix_sum-k = 1-3 = -2 不在 hashmap 中，count 不变=0","hashmap":{"0":1},"prefixSum":1,"count":0,"currentNum":1,"diff":-2,"hit":false,"justAdded":null,"currentIdx":0},{"lineNum":13,"codeLine":"hashmap[prefix_sum] = hashmap.get(prefix_sum, 0) + 1","phase":"push","description":"记录前缀和 1：hashmap[1] = 0 + 1 = 1","hashmap":{"0":1,"1":1},"prefixSum":1,"count":0,"currentNum":1,"diff":-2,"hit":false,"justAdded":1,"currentIdx":0},{"lineNum":7,"codeLine":"for num in nums:","phase":"check","description":"处理 nums[1] = 2，当前 prefix_sum=1","hashmap":{"0":1,"1":1},"prefixSum":1,"count":0,"currentNum":2,"diff":null,"hit":false,"justAdded":null,"currentIdx":1},{"lineNum":8,"codeLine":"prefix_sum += num","phase":"check","description":"前缀和更新: prefix_sum = 3","hashmap":{"0":1,"1":1},"prefixSum":3,"count":0,"currentNum":2,"diff":null,"hit":false,"justAdded":null,"currentIdx":1},{"lineNum":10,"codeLine":"if prefix_sum - k in hashmap:","phase":"record","description":"prefix_sum-k = 3-3 = 0 在 hashmap 中（出现 1 次），count += 1 → count=1","hashmap":{"0":1,"1":1},"prefixSum":3,"count":1,"currentNum":2,"diff":0,"hit":true,"justAdded":null,"currentIdx":1},{"lineNum":13,"codeLine":"hashmap[prefix_sum] = hashmap.get(prefix_sum, 0) + 1","phase":"push","description":"记录前缀和 3：hashmap[3] = 0 + 1 = 1","hashmap":{"0":1,"1":1,"3":1},"prefixSum":3,"count":1,"currentNum":2,"diff":0,"hit":true,"justAdded":3,"currentIdx":1},{"lineNum":7,"codeLine":"for num in nums:","phase":"check","description":"处理 nums[2] = 1，当前 prefix_sum=3","hashmap":{"0":1,"1":1,"3":1},"prefixSum":3,"count":1,"currentNum":1,"diff":null,"hit":false,"justAdded":null,"currentIdx":2},{"lineNum":8,"codeLine":"prefix_sum += num","phase":"check","description":"前缀和更新: prefix_sum = 4","hashmap":{"0":1,"1":1,"3":1},"prefixSum":4,"count":1,"currentNum":1,"diff":null,"hit":false,"justAdded":null,"currentIdx":2},{"lineNum":10,"codeLine":"if prefix_sum - k in hashmap:","phase":"record","description":"prefix_sum-k = 4-3 = 1 在 hashmap 中（出现 1 次），count += 1 → count=2","hashmap":{"0":1,"1":1,"3":1},"prefixSum":4,"count":2,"currentNum":1,"diff":1,"hit":true,"justAdded":null,"currentIdx":2},{"lineNum":13,"codeLine":"hashmap[prefix_sum] = hashmap.get(prefix_sum, 0) + 1","phase":"push","description":"记录前缀和 4：hashmap[4] = 0 + 1 = 1","hashmap":{"0":1,"1":1,"3":1,"4":1},"prefixSum":4,"count":2,"currentNum":1,"diff":1,"hit":true,"justAdded":4,"currentIdx":2},{"lineNum":7,"codeLine":"for num in nums:","phase":"check","description":"处理 nums[3] = 2，当前 prefix_sum=4","hashmap":{"0":1,"1":1,"3":1,"4":1},"prefixSum":4,"count":2,"currentNum":2,"diff":null,"hit":false,"justAdded":null,"currentIdx":3},{"lineNum":8,"codeLine":"prefix_sum += num","phase":"check","description":"前缀和更新: prefix_sum = 6","hashmap":{"0":1,"1":1,"3":1,"4":1},"prefixSum":6,"count":2,"currentNum":2,"diff":null,"hit":false,"justAdded":null,"currentIdx":3},{"lineNum":10,"codeLine":"if prefix_sum - k in hashmap:","phase":"record","description":"prefix_sum-k = 6-3 = 3 在 hashmap 中（出现 1 次），count += 1 → count=3","hashmap":{"0":1,"1":1,"3":1,"4":1},"prefixSum":6,"count":3,"currentNum":2,"diff":3,"hit":true,"justAdded":null,"currentIdx":3},{"lineNum":13,"codeLine":"hashmap[prefix_sum] = hashmap.get(prefix_sum, 0) + 1","phase":"push","description":"记录前缀和 6：hashmap[6] = 0 + 1 = 1","hashmap":{"0":1,"1":1,"3":1,"4":1,"6":1},"prefixSum":6,"count":3,"currentNum":2,"diff":3,"hit":true,"justAdded":6,"currentIdx":3},{"lineNum":7,"codeLine":"for num in nums:","phase":"check","description":"处理 nums[4] = 1，当前 prefix_sum=6","hashmap":{"0":1,"1":1,"3":1,"4":1,"6":1},"prefixSum":6,"count":3,"currentNum":1,"diff":null,"hit":false,"justAdded":null,"currentIdx":4},{"lineNum":8,"codeLine":"prefix_sum += num","phase":"check","description":"前缀和更新: prefix_sum = 7","hashmap":{"0":1,"1":1,"3":1,"4":1,"6":1},"prefixSum":7,"count":3,"currentNum":1,"diff":null,"hit":false,"justAdded":null,"currentIdx":4},{"lineNum":10,"codeLine":"if prefix_sum - k in hashmap:","phase":"record","description":"prefix_sum-k = 7-3 = 4 在 hashmap 中（出现 1 次），count += 1 → count=4","hashmap":{"0":1,"1":1,"3":1,"4":1,"6":1},"prefixSum":7,"count":4,"currentNum":1,"diff":4,"hit":true,"justAdded":null,"currentIdx":4},{"lineNum":13,"codeLine":"hashmap[prefix_sum] = hashmap.get(prefix_sum, 0) + 1","phase":"push","description":"记录前缀和 7：hashmap[7] = 0 + 1 = 1","hashmap":{"0":1,"1":1,"3":1,"4":1,"6":1,"7":1},"prefixSum":7,"count":4,"currentNum":1,"diff":4,"hit":true,"justAdded":7,"currentIdx":4}];

const phaseLabels = { init: '初始化', check: '检查', push: '记录', record: '命中' };

export default {
  title: '560. Subarray Sum Equals K',
  subtitle: 'nums = [1, 2, 1, 2, 1], k = 3',
  code, lineMap, steps, phaseLabels,

  setup(panel) {
    panel.innerHTML = `
      <div class="card">
        <div class="section-title">nums 数组（蓝色 = 当前处理元素）</div>
        <div class="array-row" id="nums-array"></div>
      </div>
      <div class="card">
        <div class="section-title">前缀和 prefix_sum</div>
        <div style="display:flex;align-items:baseline;gap:16px;flex-wrap:wrap">
          <div id="prefix-num" style="font-size:32px;font-weight:800;font-family:var(--font-mono);color:#7dd3fc;line-height:1">0</div>
          <div id="prefix-formula" style="font-size:13px;color:var(--text-muted);font-family:var(--font-mono);line-height:1.6"></div>
        </div>
      </div>
      <div class="card">
        <div class="section-title">hashmap 前缀和计数（key = 前缀和, value = 出现次数）</div>
        <div class="chip-row" id="hm-chips" style="display:flex;gap:8px;flex-wrap:wrap"></div>
      </div>
      <div class="card">
        <div class="section-title">count 结果</div>
        <div style="display:flex;align-items:baseline;gap:12px">
          <div id="count-num" style="font-size:40px;font-weight:800;font-family:var(--font-mono);line-height:1;color:var(--text-muted)">0</div>
          <div style="font-size:13px;color:var(--text-muted)">满足条件的子数组数量</div>
        </div>
      </div>
    `;
  },

  render(s) {
    // nums array
    document.getElementById('nums-array').innerHTML = NUMS.map((v, idx) => {
      const isCurrent = s.currentIdx !== undefined && s.currentIdx !== null && idx === s.currentIdx;
      let cls = 'arr-cell';
      if (isCurrent) cls += ' is-active';
      return `<div class="${cls}">
        <div class="arr-val">${v}</div>
        <div class="arr-idx">[${idx}]</div>
      </div>`;
    }).join('');

    // prefix sum
    document.getElementById('prefix-num').textContent = s.prefixSum;
    const formulaEl = document.getElementById('prefix-formula');
    if (s.diff !== null && s.diff !== undefined) {
      const hitCls = s.hit ? 'color:#4ade80;font-weight:700' : 'color:var(--text-muted)';
      const hitNote = s.hit ? ' \u2713 在 hashmap 中' : ' \u2717 不在 hashmap 中';
      formulaEl.innerHTML = `diff = prefix_sum \u2212 k = ${s.prefixSum} \u2212 ${K} = <span style="${hitCls}">${s.diff}${hitNote}</span>`;
    } else {
      formulaEl.innerHTML = '<span style="color:var(--text-muted)">\u2014</span>';
    }

    // hashmap chips
    const hmEl = document.getElementById('hm-chips');
    const hmKeys = Object.keys(s.hashmap);
    hmEl.innerHTML = hmKeys.map(k => {
      const kNum = Number(k);
      const isJustAdded = s.justAdded !== null && s.justAdded !== undefined && kNum === s.justAdded;
      const isDiffHit = s.hit && s.diff !== null && s.diff !== undefined && kNum === s.diff;
      let cls = 'hm-chip';
      if (isDiffHit) cls += ' diff-hit';
      if (isJustAdded) cls += ' just-added';
      return `<div class="${cls}">
        <span class="hm-chip-key">${k}</span>
        <span class="hm-chip-val">${s.hashmap[k]}</span>
      </div>`;
    }).join('');

    // count
    const countEl = document.getElementById('count-num');
    countEl.textContent = s.count;
    countEl.style.color = s.count > 0 ? '#4ade80' : 'var(--text-muted)';
    if (s.count > 0) countEl.style.textShadow = '0 0 12px rgba(74,222,128,0.35)';
    else countEl.style.textShadow = 'none';
  },
};
