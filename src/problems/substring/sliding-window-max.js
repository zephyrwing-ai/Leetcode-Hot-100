const NUMS = [1, 3, -1, -3, 5, 3, 6, 7];
const K = 3;
const RESULT_LEN = NUMS.length - K + 1;

const code = [
  { text: 'class Solution:' },
  { text: '    def maxSlidingWindow(self, nums, k):' },
  { text: '        n=len(nums)' },
  { text: '        q=[(-nums[i],i) for i in range(k)]' },
  { text: '        heapq.heapify(q)' },
  { text: '' },
  { text: '        ans = [-q[0][0]]' },
  { text: '        for i in range(k,n):' },
  { text: '            heapq.heappush(q,(-nums[i],i))' },
  { text: '            while q[0][1] <= i-k:' },
  { text: '                heapq.heappop(q)' },
  { text: '            ans.append(-q[0][0])' },
  { text: '        return ans' },
];

const lineMap = { 3: 2, 4: 3, 5: 4, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11 };

const steps = [{"lineNum":3,"codeLine":"n=len(nums)","phase":"init","description":"初始化 n = len(nums) = 8","heap":[],"ans":[],"i":-1,"windowStart":0,"windowEnd":-1,"justPushed":null,"justPopped":null},{"lineNum":4,"codeLine":"q=[(-nums[i],i) for i in range(k)]","phase":"init","description":"构建初始列表（取负值以模拟最大堆）: q = [[-1, 0], [-3, 1], [1, 2]]","heap":[[-1,0],[-3,1],[1,2]],"ans":[],"i":-1,"windowStart":0,"windowEnd":2,"justPushed":null,"justPopped":null},{"lineNum":5,"codeLine":"heapq.heapify(q)","phase":"heapify","description":"堆化完成 → 堆顶 = [-3, 1]，对应 nums[1] = 3（当前窗口最大值）","heap":[[-3,1],[-1,0],[1,2]],"ans":[],"i":-1,"windowStart":0,"windowEnd":2,"justPushed":null,"justPopped":null},{"lineNum":7,"codeLine":"ans = [-q[0][0]]","phase":"record","description":"记录第一个窗口 [0, 2] 的最大值 = 3，ans = [3]","heap":[[-3,1],[-1,0],[1,2]],"ans":[3],"i":2,"windowStart":0,"windowEnd":2,"justPushed":null,"justPopped":null},{"lineNum":8,"codeLine":"for i in range(k,n):","phase":"check","description":"新一轮循环: i = 3，即将处理 nums[3] = -3，窗口 [1, 3]","heap":[[-3,1],[-1,0],[1,2]],"ans":[3],"i":3,"windowStart":1,"windowEnd":3,"justPushed":null,"justPopped":null},{"lineNum":9,"codeLine":"heapq.heappush(q,(-nums[i],i))","phase":"push","description":"将 (3, 3) 推入堆 [nums[3]=-3 取负] → 堆大小 = 4","heap":[[-3,1],[-1,0],[1,2],[3,3]],"ans":[3],"i":3,"windowStart":1,"windowEnd":3,"justPushed":[3,3],"justPopped":null},{"lineNum":10,"codeLine":"while q[0][1] <= i-k:","phase":"check","description":"堆顶索引 q[0][1]=1 > i-k=0，堆顶元素 nums[1]=3 仍在窗口内，退出循环","heap":[[-3,1],[-1,0],[1,2],[3,3]],"ans":[3],"i":3,"windowStart":1,"windowEnd":3,"justPushed":null,"justPopped":null},{"lineNum":12,"codeLine":"ans.append(-q[0][0])","phase":"record","description":"窗口 [1, 3] 的最大值 = 3（来自堆顶 nums[1]），ans = [3, 3]","heap":[[-3,1],[-1,0],[1,2],[3,3]],"ans":[3,3],"i":3,"windowStart":1,"windowEnd":3,"justPushed":null,"justPopped":null},{"lineNum":8,"codeLine":"for i in range(k,n):","phase":"check","description":"新一轮循环: i = 4，即将处理 nums[4] = 5，窗口 [2, 4]","heap":[[-3,1],[-1,0],[1,2],[3,3]],"ans":[3,3],"i":4,"windowStart":2,"windowEnd":4,"justPushed":null,"justPopped":null},{"lineNum":9,"codeLine":"heapq.heappush(q,(-nums[i],i))","phase":"push","description":"将 (-5, 4) 推入堆 [nums[4]=5 取负] → 堆大小 = 5","heap":[[-5,4],[-3,1],[1,2],[3,3],[-1,0]],"ans":[3,3],"i":4,"windowStart":2,"windowEnd":4,"justPushed":[-5,4],"justPopped":null},{"lineNum":10,"codeLine":"while q[0][1] <= i-k:","phase":"check","description":"堆顶索引 q[0][1]=4 > i-k=1，堆顶元素 nums[4]=5 仍在窗口内，退出循环","heap":[[-5,4],[-3,1],[1,2],[3,3],[-1,0]],"ans":[3,3],"i":4,"windowStart":2,"windowEnd":4,"justPushed":null,"justPopped":null},{"lineNum":12,"codeLine":"ans.append(-q[0][0])","phase":"record","description":"窗口 [2, 4] 的最大值 = 5（来自堆顶 nums[4]），ans = [3, 3, 5]","heap":[[-5,4],[-3,1],[1,2],[3,3],[-1,0]],"ans":[3,3,5],"i":4,"windowStart":2,"windowEnd":4,"justPushed":null,"justPopped":null},{"lineNum":8,"codeLine":"for i in range(k,n):","phase":"check","description":"新一轮循环: i = 5，即将处理 nums[5] = 3，窗口 [3, 5]","heap":[[-5,4],[-3,1],[1,2],[3,3],[-1,0]],"ans":[3,3,5],"i":5,"windowStart":3,"windowEnd":5,"justPushed":null,"justPopped":null},{"lineNum":9,"codeLine":"heapq.heappush(q,(-nums[i],i))","phase":"push","description":"将 (-3, 5) 推入堆 [nums[5]=3 取负] → 堆大小 = 6","heap":[[-5,4],[-3,1],[-3,5],[3,3],[-1,0],[1,2]],"ans":[3,3,5],"i":5,"windowStart":3,"windowEnd":5,"justPushed":[-3,5],"justPopped":null},{"lineNum":10,"codeLine":"while q[0][1] <= i-k:","phase":"check","description":"堆顶索引 q[0][1]=4 > i-k=2，堆顶元素 nums[4]=5 仍在窗口内，退出循环","heap":[[-5,4],[-3,1],[-3,5],[3,3],[-1,0],[1,2]],"ans":[3,3,5],"i":5,"windowStart":3,"windowEnd":5,"justPushed":null,"justPopped":null},{"lineNum":12,"codeLine":"ans.append(-q[0][0])","phase":"record","description":"窗口 [3, 5] 的最大值 = 5（来自堆顶 nums[4]），ans = [3, 3, 5, 5]","heap":[[-5,4],[-3,1],[-3,5],[3,3],[-1,0],[1,2]],"ans":[3,3,5,5],"i":5,"windowStart":3,"windowEnd":5,"justPushed":null,"justPopped":null},{"lineNum":8,"codeLine":"for i in range(k,n):","phase":"check","description":"新一轮循环: i = 6，即将处理 nums[6] = 6，窗口 [4, 6]","heap":[[-5,4],[-3,1],[-3,5],[3,3],[-1,0],[1,2]],"ans":[3,3,5,5],"i":6,"windowStart":4,"windowEnd":6,"justPushed":null,"justPopped":null},{"lineNum":9,"codeLine":"heapq.heappush(q,(-nums[i],i))","phase":"push","description":"将 (-6, 6) 推入堆 [nums[6]=6 取负] → 堆大小 = 7","heap":[[-6,6],[-3,1],[-5,4],[3,3],[-1,0],[1,2],[-3,5]],"ans":[3,3,5,5],"i":6,"windowStart":4,"windowEnd":6,"justPushed":[-6,6],"justPopped":null},{"lineNum":10,"codeLine":"while q[0][1] <= i-k:","phase":"check","description":"堆顶索引 q[0][1]=6 > i-k=3，堆顶元素 nums[6]=6 仍在窗口内，退出循环","heap":[[-6,6],[-3,1],[-5,4],[3,3],[-1,0],[1,2],[-3,5]],"ans":[3,3,5,5],"i":6,"windowStart":4,"windowEnd":6,"justPushed":null,"justPopped":null},{"lineNum":12,"codeLine":"ans.append(-q[0][0])","phase":"record","description":"窗口 [4, 6] 的最大值 = 6（来自堆顶 nums[6]），ans = [3, 3, 5, 5, 6]","heap":[[-6,6],[-3,1],[-5,4],[3,3],[-1,0],[1,2],[-3,5]],"ans":[3,3,5,5,6],"i":6,"windowStart":4,"windowEnd":6,"justPushed":null,"justPopped":null},{"lineNum":8,"codeLine":"for i in range(k,n):","phase":"check","description":"新一轮循环: i = 7，即将处理 nums[7] = 7，窗口 [5, 7]","heap":[[-6,6],[-3,1],[-5,4],[3,3],[-1,0],[1,2],[-3,5]],"ans":[3,3,5,5,6],"i":7,"windowStart":5,"windowEnd":7,"justPushed":null,"justPopped":null},{"lineNum":9,"codeLine":"heapq.heappush(q,(-nums[i],i))","phase":"push","description":"将 (-7, 7) 推入堆 [nums[7]=7 取负] → 堆大小 = 8","heap":[[-7,7],[-6,6],[-5,4],[-3,1],[-1,0],[1,2],[-3,5],[3,3]],"ans":[3,3,5,5,6],"i":7,"windowStart":5,"windowEnd":7,"justPushed":[-7,7],"justPopped":null},{"lineNum":10,"codeLine":"while q[0][1] <= i-k:","phase":"check","description":"堆顶索引 q[0][1]=7 > i-k=4，堆顶元素 nums[7]=7 仍在窗口内，退出循环","heap":[[-7,7],[-6,6],[-5,4],[-3,1],[-1,0],[1,2],[-3,5],[3,3]],"ans":[3,3,5,5,6],"i":7,"windowStart":5,"windowEnd":7,"justPushed":null,"justPopped":null},{"lineNum":12,"codeLine":"ans.append(-q[0][0])","phase":"record","description":"窗口 [5, 7] 的最大值 = 7（来自堆顶 nums[7]），ans = [3, 3, 5, 5, 6, 7]","heap":[[-7,7],[-6,6],[-5,4],[-3,1],[-1,0],[1,2],[-3,5],[3,3]],"ans":[3,3,5,5,6,7],"i":7,"windowStart":5,"windowEnd":7,"justPushed":null,"justPopped":null}];

const phaseLabels = { init: '初始化', heapify: '堆化', push: '推入', check: '检查', pop: '弹出', record: '记录' };

export default {
  title: '239. Sliding Window Maximum',
  subtitle: 'nums = [1,3,-1,-3,5,3,6,7], k = 3',
  code, lineMap, steps, phaseLabels,

  setup(panel) {
    panel.innerHTML = `
      <div class="card">
        <div class="section-title">输入数组 nums（蓝色 = 当前窗口 · 绿色 = 堆顶最大值）</div>
        <div class="array-row" id="nums-array"></div>
      </div>
      <div class="card">
        <div class="section-title">最小堆 q（存储 (-nums[i], i)，堆顶为当前窗口最大值的负数）</div>
        <div id="heap-tree" class="heap-tree"></div>
        <div class="legend-row" style="margin-top:6px">
          <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.5);border:1px solid #4ade80"></div>堆顶（当前最大）</div>
          <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>刚推入</div>
          <div class="legend-item"><div class="legend-dot" style="background:rgba(248,113,113,0.3);border:1px solid #f87171"></div>已过期</div>
        </div>
      </div>
      <div class="card">
        <div class="section-title">结果数组 ans（共 ${RESULT_LEN} 个窗口）</div>
        <div class="result-row" id="result-array"></div>
      </div>
    `;
  },

  render(s) {
    // nums array
    const topIdx = s.heap.length > 0 ? s.heap[0][1] : -1;
    document.getElementById('nums-array').innerHTML = NUMS.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx >= s.windowStart && idx <= s.windowEnd) cls += ' in-window';
      if (idx === topIdx && s.heap.length > 0) cls += ' is-max';
      if (s.justPushed && s.justPushed[1] === idx) cls += ' just-pushed';
      return `<div class="${cls}">
        <div class="arr-val">${v}</div>
        <div class="arr-idx">[${idx}]</div>
      </div>`;
    }).join('');

    // heap tree
    const treeEl = document.getElementById('heap-tree');
    if (s.heap.length === 0) {
      treeEl.innerHTML = '<span class="heap-empty">（堆为空）</span>';
    } else {
      let levels = [], idx = 0, size = 1;
      while (idx < s.heap.length) {
        levels.push(s.heap.slice(idx, idx + size));
        idx += size; size *= 2;
      }
      let html = '';
      let flatIdx = 0;
      levels.forEach(level => {
        html += '<div class="heap-level">';
        level.forEach(node => {
          const negVal = node[0];
          const origIdx = node[1];
          const realVal = -negVal;
          let cls = 'heap-node';
          if (flatIdx === 0) cls += ' top';
          if (origIdx < s.windowStart) cls += ' expired';
          if (s.justPushed && s.justPushed[0] === negVal && s.justPushed[1] === origIdx) cls += ' just-pushed';
          if (s.justPopped && s.justPopped[0] === negVal && s.justPopped[1] === origIdx) cls += ' just-popped';
          html += `<div class="${cls}">
            <div class="heap-val">
              <span class="hv-num">${realVal}</span>
              <span class="hv-idx">[${origIdx}]</span>
            </div>
          </div>`;
          flatIdx++;
        });
        html += '</div>';
      });
      treeEl.innerHTML = html;
    }

    // result array
    const resEl = document.getElementById('result-array');
    const filled = s.ans.length;
    resEl.innerHTML = Array.from({ length: RESULT_LEN }, (_, i) => {
      let valCls = 'res-val';
      let val = '?';
      if (i < filled) {
        valCls += ' filled';
        val = s.ans[i];
        if (i === filled - 1 && s.phase === 'record') valCls += ' fresh';
      }
      return `<div class="res-cell">
        <div class="${valCls}">${val}</div>
        <div class="res-idx">[${i}]</div>
      </div>`;
    }).join('');
  },
};
