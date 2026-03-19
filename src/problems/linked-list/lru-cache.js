let OPS = ['LRUCache(2)', 'put(1,1)', 'put(2,2)', 'get(1)', 'put(3,3)', 'get(2)', 'put(4,4)', 'get(1)', 'get(3)', 'get(4)'];

const code = [
  'class LRUCache:',
  '    def __init__(self, capacity):',
  '        self.cap = capacity',
  '        self.cache = {}  # key -> node',
  '        self.head = Node(0, 0)  # dummy head',
  '        self.tail = Node(0, 0)  # dummy tail',
  '        self.head.next = self.tail',
  '        self.tail.prev = self.head',
  '',
  '    def get(self, key):',
  '        if key in self.cache:',
  '            node = self.cache[key]',
  '            self._remove(node)',
  '            self._add(node)',
  '            return node.val',
  '        return -1',
  '',
  '    def put(self, key, value):',
  '        if key in self.cache:',
  '            self._remove(self.cache[key])',
  '        node = Node(key, value)',
  '        self._add(node)',
  '        self.cache[key] = node',
  '        if len(self.cache) > self.cap:',
  '            lru = self.head.next',
  '            self._remove(lru)',
  '            del self.cache[lru.key]',
];

const lineMap = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 10: 9, 11: 10, 12: 11, 13: 12, 14: 13, 15: 14, 17: 16, 18: 17, 19: 18, 20: 19, 21: 20, 22: 21, 23: 22, 24: 23, 25: 24, 26: 25 };

// ── Test Case 1: capacity=2, put(1,1),put(2,2),get(1),put(3,3),get(2),put(4,4),get(1),get(3),get(4) ──
const steps1 = [
  { lineNum: 2, phase: 'init', description: 'LRUCache(2): 初始化，容量=2，创建哈希表和双向链表', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 0, cache: {}, dll: [], cap: 2, returnVal: null },
  { lineNum: 20, phase: 'put', description: 'put(1,1): 创建节点(1,1)，加入链表尾部和哈希表', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 1, cache: {1:1}, dll: ['1:1'], cap: 2, returnVal: null },
  { lineNum: 23, phase: 'put', description: 'put(1,1): cache 大小=1 <= cap=2，无需淘汰', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 1, cache: {1:1}, dll: ['1:1'], cap: 2, returnVal: null },
  { lineNum: 20, phase: 'put', description: 'put(2,2): 创建节点(2,2)，加入链表尾部', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 2, cache: {1:1,2:2}, dll: ['1:1','2:2'], cap: 2, returnVal: null },
  { lineNum: 23, phase: 'put', description: 'put(2,2): cache 大小=2 <= cap=2，无需淘汰', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 2, cache: {1:1,2:2}, dll: ['1:1','2:2'], cap: 2, returnVal: null },
  { lineNum: 11, phase: 'get', description: 'get(1): key=1 在 cache 中，找到节点(1,1)', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 3, cache: {1:1,2:2}, dll: ['1:1','2:2'], cap: 2, returnVal: null, activeKey: 1 },
  { lineNum: 13, phase: 'get', description: 'get(1): 将(1,1)移到链表尾部（最近使用）', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 3, cache: {1:1,2:2}, dll: ['2:2','1:1'], cap: 2, returnVal: null, activeKey: 1 },
  { lineNum: 14, phase: 'get', description: 'get(1): 返回 val=1', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 3, cache: {1:1,2:2}, dll: ['2:2','1:1'], cap: 2, returnVal: 1, activeKey: 1 },
  { lineNum: 20, phase: 'put', description: 'put(3,3): 创建节点(3,3)，加入链表尾部', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 4, cache: {1:1,2:2,3:3}, dll: ['2:2','1:1','3:3'], cap: 2, returnVal: null },
  { lineNum: 24, phase: 'put', description: 'put(3,3): cache 大小=3 > cap=2，淘汰 LRU 节点 head.next = (2,2)', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 4, cache: {1:1,2:2,3:3}, dll: ['2:2','1:1','3:3'], cap: 2, returnVal: null, evicting: '2:2' },
  { lineNum: 26, phase: 'put', description: 'put(3,3): 删除(2,2)，cache = {1:1, 3:3}', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 4, cache: {1:1,3:3}, dll: ['1:1','3:3'], cap: 2, returnVal: null },
  { lineNum: 11, phase: 'get', description: 'get(2): key=2 不在 cache 中', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 5, cache: {1:1,3:3}, dll: ['1:1','3:3'], cap: 2, returnVal: null, activeKey: 2 },
  { lineNum: 15, phase: 'get', description: 'get(2): 返回 -1（未找到）', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 5, cache: {1:1,3:3}, dll: ['1:1','3:3'], cap: 2, returnVal: -1, activeKey: 2 },
  { lineNum: 20, phase: 'put', description: 'put(4,4): 创建节点(4,4)，加入链表尾部', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 6, cache: {1:1,3:3,4:4}, dll: ['1:1','3:3','4:4'], cap: 2, returnVal: null },
  { lineNum: 24, phase: 'put', description: 'put(4,4): cache 大小=3 > cap=2，淘汰 LRU 节点 (1,1)', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 6, cache: {1:1,3:3,4:4}, dll: ['1:1','3:3','4:4'], cap: 2, returnVal: null, evicting: '1:1' },
  { lineNum: 26, phase: 'put', description: 'put(4,4): 删除(1,1)，cache = {3:3, 4:4}', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 6, cache: {3:3,4:4}, dll: ['3:3','4:4'], cap: 2, returnVal: null },
  { lineNum: 11, phase: 'get', description: 'get(1): key=1 不在 cache 中', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 7, cache: {3:3,4:4}, dll: ['3:3','4:4'], cap: 2, returnVal: null, activeKey: 1 },
  { lineNum: 15, phase: 'get', description: 'get(1): 返回 -1（已被淘汰）', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 7, cache: {3:3,4:4}, dll: ['3:3','4:4'], cap: 2, returnVal: -1, activeKey: 1 },
  { lineNum: 11, phase: 'get', description: 'get(3): key=3 在 cache 中', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 8, cache: {3:3,4:4}, dll: ['3:3','4:4'], cap: 2, returnVal: null, activeKey: 3 },
  { lineNum: 13, phase: 'get', description: 'get(3): 将(3,3)移到链表尾部', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 8, cache: {3:3,4:4}, dll: ['4:4','3:3'], cap: 2, returnVal: null, activeKey: 3 },
  { lineNum: 14, phase: 'get', description: 'get(3): 返回 val=3', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 8, cache: {3:3,4:4}, dll: ['4:4','3:3'], cap: 2, returnVal: 3, activeKey: 3 },
  { lineNum: 11, phase: 'get', description: 'get(4): key=4 在 cache 中', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 9, cache: {3:3,4:4}, dll: ['4:4','3:3'], cap: 2, returnVal: null, activeKey: 4 },
  { lineNum: 13, phase: 'get', description: 'get(4): 将(4,4)移到链表尾部', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 9, cache: {3:3,4:4}, dll: ['3:3','4:4'], cap: 2, returnVal: null, activeKey: 4 },
  { lineNum: 14, phase: 'get', description: 'get(4): 返回 val=4', ops: ['LRUCache(2)','put(1,1)','put(2,2)','get(1)','put(3,3)','get(2)','put(4,4)','get(1)','get(3)','get(4)'], currentOp: 9, cache: {3:3,4:4}, dll: ['3:3','4:4'], cap: 2, returnVal: 4, activeKey: 4 },
];

// ── Test Case 2: capacity=1, put(1,1), put(2,2), get(1), get(2) ──
const steps2 = [
  { lineNum: 2, phase: 'init', description: 'LRUCache(1): 初始化，容量=1', ops: ['LRUCache(1)','put(1,1)','put(2,2)','get(1)','get(2)'], currentOp: 0, cache: {}, dll: [], cap: 1, returnVal: null },
  { lineNum: 20, phase: 'put', description: 'put(1,1): 创建节点(1,1)，加入链表和哈希表', ops: ['LRUCache(1)','put(1,1)','put(2,2)','get(1)','get(2)'], currentOp: 1, cache: {1:1}, dll: ['1:1'], cap: 1, returnVal: null },
  { lineNum: 23, phase: 'put', description: 'put(1,1): cache 大小=1 <= cap=1，无需淘汰', ops: ['LRUCache(1)','put(1,1)','put(2,2)','get(1)','get(2)'], currentOp: 1, cache: {1:1}, dll: ['1:1'], cap: 1, returnVal: null },
  { lineNum: 20, phase: 'put', description: 'put(2,2): 创建节点(2,2)，加入链表尾部', ops: ['LRUCache(1)','put(1,1)','put(2,2)','get(1)','get(2)'], currentOp: 2, cache: {1:1,2:2}, dll: ['1:1','2:2'], cap: 1, returnVal: null },
  { lineNum: 24, phase: 'put', description: 'put(2,2): cache 大小=2 > cap=1，淘汰 LRU 节点 (1,1)', ops: ['LRUCache(1)','put(1,1)','put(2,2)','get(1)','get(2)'], currentOp: 2, cache: {1:1,2:2}, dll: ['1:1','2:2'], cap: 1, returnVal: null, evicting: '1:1' },
  { lineNum: 26, phase: 'put', description: 'put(2,2): 删除(1,1)，cache = {2:2}', ops: ['LRUCache(1)','put(1,1)','put(2,2)','get(1)','get(2)'], currentOp: 2, cache: {2:2}, dll: ['2:2'], cap: 1, returnVal: null },
  { lineNum: 11, phase: 'get', description: 'get(1): key=1 不在 cache 中（已被淘汰）', ops: ['LRUCache(1)','put(1,1)','put(2,2)','get(1)','get(2)'], currentOp: 3, cache: {2:2}, dll: ['2:2'], cap: 1, returnVal: null, activeKey: 1 },
  { lineNum: 15, phase: 'get', description: 'get(1): 返回 -1', ops: ['LRUCache(1)','put(1,1)','put(2,2)','get(1)','get(2)'], currentOp: 3, cache: {2:2}, dll: ['2:2'], cap: 1, returnVal: -1, activeKey: 1 },
  { lineNum: 11, phase: 'get', description: 'get(2): key=2 在 cache 中', ops: ['LRUCache(1)','put(1,1)','put(2,2)','get(1)','get(2)'], currentOp: 4, cache: {2:2}, dll: ['2:2'], cap: 1, returnVal: null, activeKey: 2 },
  { lineNum: 14, phase: 'get', description: 'get(2): 返回 val=2', ops: ['LRUCache(1)','put(1,1)','put(2,2)','get(1)','get(2)'], currentOp: 4, cache: {2:2}, dll: ['2:2'], cap: 1, returnVal: 2, activeKey: 2 },
];

const phaseLabels = { init: '初始化', put: '写入', get: '读取' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">操作序列</div>
      <div class="array-row" id="ops-row" style="flex-wrap:wrap"></div>
    </div>
    <div class="card">
      <div class="section-title">双向链表（左=LRU 最久未用，右=最近使用）</div>
      <div class="ll-container" id="dll-area"></div>
    </div>
    <div class="card" style="display:flex;gap:16px">
      <div style="flex:1">
        <div class="section-title">哈希表 cache</div>
        <div class="array-row" id="cache-display"></div>
      </div>
      <div style="flex:0 0 120px">
        <div class="section-title">返回值</div>
        <div id="return-val" style="font-family:var(--font-mono);font-size:24px;font-weight:700;text-align:center;min-height:36px;color:var(--text-muted)">—</div>
      </div>
    </div>
    <div class="legend-row" style="margin-top:8px">
      <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>当前操作</div>
      <div class="legend-item"><div class="legend-dot" style="background:rgba(248,113,113,0.4);border:1px solid #f87171"></div>淘汰中</div>
    </div>
  `;
}

export default {
  title: '146. LRU Cache',
  problemDesc: `
    <p>请你设计并实现一个满足 LRU（最近最少使用）缓存约束的数据结构。实现 <code>LRUCache</code> 类，<code>get</code> 和 <code>put</code> 必须以 <code>O(1)</code> 的平均时间复杂度运行。</p>
    <div class="example">输入：["LRUCache","put","put","get","put","get","put","get","get","get"]
[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]
输出：[null,null,null,1,null,-1,null,-1,3,4]</div>
    <p>提示：使用哈希表 + 双向链表实现。</p>
  `,
  subtitle: 'capacity = 2',
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'capacity=2 (LeetCode 示例)', steps: steps1, subtitle: 'capacity = 2' },
    {
      name: 'capacity=1', steps: steps2, subtitle: 'capacity = 1',
      setup(panel) { OPS = ['LRUCache(1)','put(1,1)','put(2,2)','get(1)','get(2)']; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const ops = s.ops || OPS;

    // Ops row
    document.getElementById('ops-row').innerHTML = ops.map((op, i) => {
      let cls = 'arr-cell';
      if (i === s.currentOp) cls += ' is-active';
      if (i < s.currentOp) cls += ' in-window';
      return `<div class="${cls}" style="min-width:70px"><div class="arr-val" style="font-size:10px">${op}</div><div class="arr-idx">[${i}]</div></div>`;
    }).join('');

    // DLL area
    const dllEl = document.getElementById('dll-area');
    if (s.dll.length === 0) {
      dllEl.innerHTML = '<div class="ll-node" style="opacity:0.5"><div class="ll-val" style="font-size:10px">HEAD</div></div><div class="ll-arrow"></div><div class="ll-node" style="opacity:0.5"><div class="ll-val" style="font-size:10px">TAIL</div></div>';
    } else {
      let dllHtml = '<div class="ll-node" style="opacity:0.5"><div class="ll-val" style="font-size:10px">H</div></div><div class="ll-arrow"></div>';
      s.dll.forEach((entry, i) => {
        let cls = 'll-node';
        if (s.evicting === entry) cls += ' is-removed';
        if (s.activeKey !== undefined) {
          const entryKey = parseInt(entry.split(':')[0]);
          if (entryKey === s.activeKey) cls += ' is-current';
        }
        dllHtml += `<div class="${cls}"><div class="ll-val" style="font-size:12px">${entry}</div>`;
        dllHtml += '<div class="ll-arrow"></div>';
        dllHtml += '</div>';
      });
      dllHtml += '<div class="ll-node" style="opacity:0.5"><div class="ll-val" style="font-size:10px">T</div></div>';
      dllEl.innerHTML = dllHtml;
    }

    // Cache display
    const cacheEl = document.getElementById('cache-display');
    const cacheKeys = Object.keys(s.cache);
    if (cacheKeys.length === 0) {
      cacheEl.innerHTML = '<span style="color:var(--text-muted);font-size:13px">空</span>';
    } else {
      cacheEl.innerHTML = cacheKeys.map(k => {
        let cls = 'arr-cell in-window';
        if (s.activeKey !== undefined && parseInt(k) === s.activeKey) cls += ' is-active';
        return `<div class="${cls}"><div class="arr-val">${k}:${s.cache[k]}</div></div>`;
      }).join('');
    }

    // Return value
    const retEl = document.getElementById('return-val');
    if (s.returnVal !== null && s.returnVal !== undefined) {
      const color = s.returnVal === -1 ? '#f87171' : '#4ade80';
      retEl.innerHTML = `<span style="color:${color}">${s.returnVal}</span>`;
    } else {
      retEl.innerHTML = '<span style="color:var(--text-muted)">—</span>';
    }
  },
};
