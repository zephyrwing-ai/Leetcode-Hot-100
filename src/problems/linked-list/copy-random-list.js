let NODES_VAL = [7, 13, 11, 10, 1];
let RANDOM_IDX = [null, 0, 4, 2, 0];

const code = [
  'class Solution:',
  '    def copyRandomList(self, head):',
  '        if not head: return None',
  '        old_to_new = {}',
  '        curr = head',
  '        while curr:',
  '            old_to_new[curr] = Node(curr.val)',
  '            curr = curr.next',
  '        curr = head',
  '        while curr:',
  '            old_to_new[curr].next = old_to_new.get(curr.next)',
  '            old_to_new[curr].random = old_to_new.get(curr.random)',
  '            curr = curr.next',
  '        return old_to_new[head]',
];

const lineMap = { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 11, 11: 12, 12: 13, 13: 14 };

// ── Test Case 1: [[7,null],[13,0],[11,4],[10,2],[1,0]] ──
const steps1 = [
  { lineNum: 2, phase: 'init', description: '检查 head 不为空，进入复制流程', nodesVal: [7,13,11,10,1], randomIdx: [null,0,4,2,0], mapKeys: [], currentI: -1, pass: 0 },
  { lineNum: 3, phase: 'init', description: '创建空哈希表 old_to_new = {}', nodesVal: [7,13,11,10,1], randomIdx: [null,0,4,2,0], mapKeys: [], currentI: -1, pass: 0 },
  { lineNum: 4, phase: 'pass1', description: '第一遍遍历: curr 指向节点 0 (val=7)', nodesVal: [7,13,11,10,1], randomIdx: [null,0,4,2,0], mapKeys: [], currentI: 0, pass: 1 },
  { lineNum: 6, phase: 'pass1', description: '创建新节点 Node(7)，加入映射表', nodesVal: [7,13,11,10,1], randomIdx: [null,0,4,2,0], mapKeys: [0], currentI: 0, pass: 1 },
  { lineNum: 6, phase: 'pass1', description: 'curr → 节点 1 (val=13)，创建 Node(13)', nodesVal: [7,13,11,10,1], randomIdx: [null,0,4,2,0], mapKeys: [0,1], currentI: 1, pass: 1 },
  { lineNum: 6, phase: 'pass1', description: 'curr → 节点 2 (val=11)，创建 Node(11)', nodesVal: [7,13,11,10,1], randomIdx: [null,0,4,2,0], mapKeys: [0,1,2], currentI: 2, pass: 1 },
  { lineNum: 6, phase: 'pass1', description: 'curr → 节点 3 (val=10)，创建 Node(10)', nodesVal: [7,13,11,10,1], randomIdx: [null,0,4,2,0], mapKeys: [0,1,2,3], currentI: 3, pass: 1 },
  { lineNum: 6, phase: 'pass1', description: 'curr → 节点 4 (val=1)，创建 Node(1)。第一遍完成', nodesVal: [7,13,11,10,1], randomIdx: [null,0,4,2,0], mapKeys: [0,1,2,3,4], currentI: 4, pass: 1 },
  { lineNum: 8, phase: 'pass2', description: '第二遍遍历: curr 重新指向 head，开始设置指针', nodesVal: [7,13,11,10,1], randomIdx: [null,0,4,2,0], mapKeys: [0,1,2,3,4], currentI: 0, pass: 2 },
  { lineNum: 10, phase: 'pass2', description: '节点0: new(7).next = new(13)', nodesVal: [7,13,11,10,1], randomIdx: [null,0,4,2,0], mapKeys: [0,1,2,3,4], currentI: 0, pass: 2, linking: 'next' },
  { lineNum: 11, phase: 'pass2', description: '节点0: new(7).random = None (原 random=null)', nodesVal: [7,13,11,10,1], randomIdx: [null,0,4,2,0], mapKeys: [0,1,2,3,4], currentI: 0, pass: 2, linking: 'random' },
  { lineNum: 10, phase: 'pass2', description: '节点1: new(13).next = new(11)', nodesVal: [7,13,11,10,1], randomIdx: [null,0,4,2,0], mapKeys: [0,1,2,3,4], currentI: 1, pass: 2, linking: 'next' },
  { lineNum: 11, phase: 'pass2', description: '节点1: new(13).random = new(7) (原 random→节点0)', nodesVal: [7,13,11,10,1], randomIdx: [null,0,4,2,0], mapKeys: [0,1,2,3,4], currentI: 1, pass: 2, linking: 'random' },
  { lineNum: 10, phase: 'pass2', description: '节点2: new(11).next = new(10)', nodesVal: [7,13,11,10,1], randomIdx: [null,0,4,2,0], mapKeys: [0,1,2,3,4], currentI: 2, pass: 2, linking: 'next' },
  { lineNum: 11, phase: 'pass2', description: '节点2: new(11).random = new(1) (原 random→节点4)', nodesVal: [7,13,11,10,1], randomIdx: [null,0,4,2,0], mapKeys: [0,1,2,3,4], currentI: 2, pass: 2, linking: 'random' },
  { lineNum: 10, phase: 'pass2', description: '节点3: new(10).next = new(1)', nodesVal: [7,13,11,10,1], randomIdx: [null,0,4,2,0], mapKeys: [0,1,2,3,4], currentI: 3, pass: 2, linking: 'next' },
  { lineNum: 11, phase: 'pass2', description: '节点3: new(10).random = new(11) (原 random→节点2)', nodesVal: [7,13,11,10,1], randomIdx: [null,0,4,2,0], mapKeys: [0,1,2,3,4], currentI: 3, pass: 2, linking: 'random' },
  { lineNum: 10, phase: 'pass2', description: '节点4: new(1).next = None', nodesVal: [7,13,11,10,1], randomIdx: [null,0,4,2,0], mapKeys: [0,1,2,3,4], currentI: 4, pass: 2, linking: 'next' },
  { lineNum: 11, phase: 'pass2', description: '节点4: new(1).random = new(7) (原 random→节点0)', nodesVal: [7,13,11,10,1], randomIdx: [null,0,4,2,0], mapKeys: [0,1,2,3,4], currentI: 4, pass: 2, linking: 'random' },
  { lineNum: 13, phase: 'done', description: '返回 old_to_new[head]，深拷贝完成', nodesVal: [7,13,11,10,1], randomIdx: [null,0,4,2,0], mapKeys: [0,1,2,3,4], currentI: -1, pass: 2 },
];

// ── Test Case 2: [[1,1],[2,1]] ──
const steps2 = [
  { lineNum: 2, phase: 'init', description: '检查 head 不为空', nodesVal: [1,2], randomIdx: [1,1], mapKeys: [], currentI: -1, pass: 0 },
  { lineNum: 3, phase: 'init', description: '创建空哈希表 old_to_new = {}', nodesVal: [1,2], randomIdx: [1,1], mapKeys: [], currentI: -1, pass: 0 },
  { lineNum: 4, phase: 'pass1', description: '第一遍: curr → 节点 0 (val=1)', nodesVal: [1,2], randomIdx: [1,1], mapKeys: [], currentI: 0, pass: 1 },
  { lineNum: 6, phase: 'pass1', description: '创建 Node(1)，加入映射表', nodesVal: [1,2], randomIdx: [1,1], mapKeys: [0], currentI: 0, pass: 1 },
  { lineNum: 6, phase: 'pass1', description: 'curr → 节点 1 (val=2)，创建 Node(2)。第一遍完成', nodesVal: [1,2], randomIdx: [1,1], mapKeys: [0,1], currentI: 1, pass: 1 },
  { lineNum: 8, phase: 'pass2', description: '第二遍: curr 重新指向 head', nodesVal: [1,2], randomIdx: [1,1], mapKeys: [0,1], currentI: 0, pass: 2 },
  { lineNum: 10, phase: 'pass2', description: '节点0: new(1).next = new(2)', nodesVal: [1,2], randomIdx: [1,1], mapKeys: [0,1], currentI: 0, pass: 2, linking: 'next' },
  { lineNum: 11, phase: 'pass2', description: '节点0: new(1).random = new(2) (原 random→节点1)', nodesVal: [1,2], randomIdx: [1,1], mapKeys: [0,1], currentI: 0, pass: 2, linking: 'random' },
  { lineNum: 10, phase: 'pass2', description: '节点1: new(2).next = None', nodesVal: [1,2], randomIdx: [1,1], mapKeys: [0,1], currentI: 1, pass: 2, linking: 'next' },
  { lineNum: 11, phase: 'pass2', description: '节点1: new(2).random = new(2) (原 random→节点1，指向自己)', nodesVal: [1,2], randomIdx: [1,1], mapKeys: [0,1], currentI: 1, pass: 2, linking: 'random' },
  { lineNum: 13, phase: 'done', description: '返回 old_to_new[head]，深拷贝完成', nodesVal: [1,2], randomIdx: [1,1], mapKeys: [0,1], currentI: -1, pass: 2 },
];

const phaseLabels = { init: '初始化', pass1: '第一遍-创建节点', pass2: '第二遍-设置指针', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">原始链表（虚线=random 指针）</div>
      <div class="ll-container" id="ll-original"></div>
    </div>
    <div class="card">
      <div class="section-title">哈希表 old_to_new</div>
      <div class="array-row" id="map-display"></div>
    </div>
    <div class="card">
      <div class="section-title">新链表（拷贝）</div>
      <div class="ll-container" id="ll-copy"></div>
    </div>
    <div class="legend-row" style="margin-top:8px">
      <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>当前节点</div>
      <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>已映射</div>
    </div>
  `;
}

export default {
  title: '138. Copy List with Random Pointer',
  problemDesc: `
    <p>给你一个长度为 <code>n</code> 的链表，每个节点包含一个额外的随机指针 <code>random</code>，该指针可以指向链表中的任何节点或空节点。构造这个链表的深拷贝。</p>
    <div class="example">输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]</div>
    <p>提示：<code>0 <= n <= 1000</code>，用哈希表映射原节点到新节点。</p>
  `,
  subtitle: `head = [[7,null],[13,0],[11,4],[10,2],[1,0]]`,
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: '[[7,null],[13,0],[11,4],[10,2],[1,0]]', steps: steps1, subtitle: '[[7,null],[13,0],[11,4],[10,2],[1,0]]' },
    {
      name: '[[1,1],[2,1]]', steps: steps2, subtitle: '[[1,1],[2,1]]',
      setup(panel) { NODES_VAL = [1,2]; RANDOM_IDX = [1,1]; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const nodesVal = s.nodesVal || NODES_VAL;
    const randomIdx = s.randomIdx || RANDOM_IDX;
    const mapKeysSet = new Set(s.mapKeys || []);

    // Original list
    const origEl = document.getElementById('ll-original');
    let origHtml = '';
    nodesVal.forEach((v, i) => {
      let cls = 'll-node';
      if (i === s.currentI) cls += ' is-current';
      if (mapKeysSet.has(i)) cls += ' is-merged';
      const rLabel = randomIdx[i] !== null ? `r→${randomIdx[i]}` : 'r→∅';
      origHtml += `<div class="${cls}"><div class="ll-val">${v}<div style="font-size:9px;color:#a78bfa;margin-top:2px">${rLabel}</div></div>`;
      if (i < nodesVal.length - 1) origHtml += '<div class="ll-arrow"></div>';
      origHtml += '</div>';
    });
    origHtml += '<div class="ll-arrow"></div><div class="ll-null">NULL</div>';
    origEl.innerHTML = origHtml;

    // Map display
    const mapEl = document.getElementById('map-display');
    if (s.mapKeys.length === 0) {
      mapEl.innerHTML = '<span style="color:var(--text-muted);font-size:13px">空</span>';
    } else {
      mapEl.innerHTML = s.mapKeys.map(i => {
        let cls = 'arr-cell in-window';
        if (i === s.currentI) cls += ' is-active';
        return `<div class="${cls}"><div class="arr-val">${nodesVal[i]}</div><div class="arr-idx">old[${i}]→new</div></div>`;
      }).join('');
    }

    // Copy list
    const copyEl = document.getElementById('ll-copy');
    if (s.phase === 'done' || (s.pass === 2 && s.currentI === nodesVal.length - 1 && s.linking === 'random')) {
      let copyHtml = '';
      nodesVal.forEach((v, i) => {
        const rLabel = randomIdx[i] !== null ? `r→${randomIdx[i]}` : 'r→∅';
        copyHtml += `<div class="ll-node is-merged"><div class="ll-val">${v}<div style="font-size:9px;color:#a78bfa;margin-top:2px">${rLabel}</div></div>`;
        if (i < nodesVal.length - 1) copyHtml += '<div class="ll-arrow"></div>';
        copyHtml += '</div>';
      });
      copyHtml += '<div class="ll-arrow"></div><div class="ll-null">NULL</div>';
      copyEl.innerHTML = copyHtml;
    } else {
      copyEl.innerHTML = '<span style="color:var(--text-muted);font-style:italic">(构建中...)</span>';
    }
  },
};
