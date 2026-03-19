let LIST_A = [4, 1, 8, 4, 5];
let LIST_B = [5, 6, 1, 8, 4, 5];
let INTERSECT_A = 2;
let INTERSECT_B = 3;

const code = [
  'class Solution:',
  '    def getIntersectionNode(self, headA, headB):',
  '        pA, pB = headA, headB',
  '        while pA != pB:',
  '            pA = pA.next if pA else headB',
  '            pB = pB.next if pB else headA',
  '        return pA',
];

const lineMap = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6 };

const steps1 = [
  { lineNum: 3, phase: 'init', description: '初始化 pA 指向 A 头节点 4，pB 指向 B 头节点 5', listA: [4,1,8,4,5], listB: [5,6,1,8,4,5], intersectIdx: 2, intersectIdxB: 3, pA: 0, pB: 0, pAList: 'A', pBList: 'B', found: false },
  { lineNum: 4, phase: 'traverse', description: 'pA(4) != pB(5)，进入循环', listA: [4,1,8,4,5], listB: [5,6,1,8,4,5], intersectIdx: 2, intersectIdxB: 3, pA: 0, pB: 0, pAList: 'A', pBList: 'B', found: false },
  { lineNum: 5, phase: 'traverse', description: 'pA = pA.next → 节点 1', listA: [4,1,8,4,5], listB: [5,6,1,8,4,5], intersectIdx: 2, intersectIdxB: 3, pA: 1, pB: 0, pAList: 'A', pBList: 'B', found: false },
  { lineNum: 6, phase: 'traverse', description: 'pB = pB.next → 节点 6', listA: [4,1,8,4,5], listB: [5,6,1,8,4,5], intersectIdx: 2, intersectIdxB: 3, pA: 1, pB: 1, pAList: 'A', pBList: 'B', found: false },
  { lineNum: 5, phase: 'traverse', description: 'pA → 节点 8（交叉点）', listA: [4,1,8,4,5], listB: [5,6,1,8,4,5], intersectIdx: 2, intersectIdxB: 3, pA: 2, pB: 1, pAList: 'A', pBList: 'B', found: false },
  { lineNum: 6, phase: 'traverse', description: 'pB → 节点 1', listA: [4,1,8,4,5], listB: [5,6,1,8,4,5], intersectIdx: 2, intersectIdxB: 3, pA: 2, pB: 2, pAList: 'A', pBList: 'B', found: false },
  { lineNum: 5, phase: 'traverse', description: 'pA → 节点 4', listA: [4,1,8,4,5], listB: [5,6,1,8,4,5], intersectIdx: 2, intersectIdxB: 3, pA: 3, pB: 2, pAList: 'A', pBList: 'B', found: false },
  { lineNum: 6, phase: 'traverse', description: 'pB → 节点 8', listA: [4,1,8,4,5], listB: [5,6,1,8,4,5], intersectIdx: 2, intersectIdxB: 3, pA: 3, pB: 3, pAList: 'A', pBList: 'B', found: false },
  { lineNum: 5, phase: 'traverse', description: 'pA → 节点 5（A 末尾）', listA: [4,1,8,4,5], listB: [5,6,1,8,4,5], intersectIdx: 2, intersectIdxB: 3, pA: 4, pB: 3, pAList: 'A', pBList: 'B', found: false },
  { lineNum: 6, phase: 'traverse', description: 'pB → 节点 4', listA: [4,1,8,4,5], listB: [5,6,1,8,4,5], intersectIdx: 2, intersectIdxB: 3, pA: 4, pB: 4, pAList: 'A', pBList: 'B', found: false },
  { lineNum: 5, phase: 'switch', description: 'pA 到达 A 末尾，切换到链表 B 头节点', listA: [4,1,8,4,5], listB: [5,6,1,8,4,5], intersectIdx: 2, intersectIdxB: 3, pA: 0, pB: 4, pAList: 'B', pBList: 'B', found: false },
  { lineNum: 6, phase: 'traverse', description: 'pB → 节点 5（B 末尾）', listA: [4,1,8,4,5], listB: [5,6,1,8,4,5], intersectIdx: 2, intersectIdxB: 3, pA: 0, pB: 5, pAList: 'B', pBList: 'B', found: false },
  { lineNum: 5, phase: 'traverse', description: 'pA 在 B 上 → 节点 6', listA: [4,1,8,4,5], listB: [5,6,1,8,4,5], intersectIdx: 2, intersectIdxB: 3, pA: 1, pB: 5, pAList: 'B', pBList: 'B', found: false },
  { lineNum: 6, phase: 'switch', description: 'pB 到达 B 末尾，切换到链表 A 头节点', listA: [4,1,8,4,5], listB: [5,6,1,8,4,5], intersectIdx: 2, intersectIdxB: 3, pA: 1, pB: 0, pAList: 'B', pBList: 'A', found: false },
  { lineNum: 5, phase: 'traverse', description: 'pA → 节点 1（B 上）', listA: [4,1,8,4,5], listB: [5,6,1,8,4,5], intersectIdx: 2, intersectIdxB: 3, pA: 2, pB: 0, pAList: 'B', pBList: 'A', found: false },
  { lineNum: 6, phase: 'traverse', description: 'pB → 节点 1（A 上）', listA: [4,1,8,4,5], listB: [5,6,1,8,4,5], intersectIdx: 2, intersectIdxB: 3, pA: 2, pB: 1, pAList: 'B', pBList: 'A', found: false },
  { lineNum: 5, phase: 'traverse', description: 'pA → 节点 8（B 上交叉点）', listA: [4,1,8,4,5], listB: [5,6,1,8,4,5], intersectIdx: 2, intersectIdxB: 3, pA: 3, pB: 1, pAList: 'B', pBList: 'A', found: false },
  { lineNum: 6, phase: 'traverse', description: 'pB → 节点 8（A 上交叉点）', listA: [4,1,8,4,5], listB: [5,6,1,8,4,5], intersectIdx: 2, intersectIdxB: 3, pA: 3, pB: 2, pAList: 'B', pBList: 'A', found: false },
  { lineNum: 7, phase: 'done', description: 'pA == pB，都指向节点 8，找到交叉点！返回节点 8', listA: [4,1,8,4,5], listB: [5,6,1,8,4,5], intersectIdx: 2, intersectIdxB: 3, pA: 3, pB: 2, pAList: 'B', pBList: 'A', found: true },
];

// Test case 2: no intersection. listA=[2,6,4], listB=[1,5]
// pA: 2→6→4→null→1(B)→5→null→2(A)→6→4→null
// pB: 1→5→null→2(A)→6→4→null→1(B)→5→null
// Both reach null at the same time → return null
const steps2 = [
  { lineNum: 3, phase: 'init', description: '初始化 pA→2, pB→1', listA: [2,6,4], listB: [1,5], intersectIdx: -1, intersectIdxB: -1, pA: 0, pB: 0, pAList: 'A', pBList: 'B', found: false },
  { lineNum: 5, phase: 'traverse', description: 'pA → 6', listA: [2,6,4], listB: [1,5], intersectIdx: -1, intersectIdxB: -1, pA: 1, pB: 0, pAList: 'A', pBList: 'B', found: false },
  { lineNum: 6, phase: 'traverse', description: 'pB → 5', listA: [2,6,4], listB: [1,5], intersectIdx: -1, intersectIdxB: -1, pA: 1, pB: 1, pAList: 'A', pBList: 'B', found: false },
  { lineNum: 5, phase: 'traverse', description: 'pA → 4', listA: [2,6,4], listB: [1,5], intersectIdx: -1, intersectIdxB: -1, pA: 2, pB: 1, pAList: 'A', pBList: 'B', found: false },
  { lineNum: 6, phase: 'switch', description: 'pB 到达 B 末尾，切换到链表 A', listA: [2,6,4], listB: [1,5], intersectIdx: -1, intersectIdxB: -1, pA: 2, pB: 0, pAList: 'A', pBList: 'A', found: false },
  { lineNum: 5, phase: 'switch', description: 'pA 到达 A 末尾，切换到链表 B', listA: [2,6,4], listB: [1,5], intersectIdx: -1, intersectIdxB: -1, pA: 0, pB: 0, pAList: 'B', pBList: 'A', found: false },
  { lineNum: 6, phase: 'traverse', description: 'pB 在 A 上 → 6', listA: [2,6,4], listB: [1,5], intersectIdx: -1, intersectIdxB: -1, pA: 0, pB: 1, pAList: 'B', pBList: 'A', found: false },
  { lineNum: 5, phase: 'traverse', description: 'pA 在 B 上 → 5', listA: [2,6,4], listB: [1,5], intersectIdx: -1, intersectIdxB: -1, pA: 1, pB: 1, pAList: 'B', pBList: 'A', found: false },
  { lineNum: 6, phase: 'traverse', description: 'pB → 4', listA: [2,6,4], listB: [1,5], intersectIdx: -1, intersectIdxB: -1, pA: 1, pB: 2, pAList: 'B', pBList: 'A', found: false },
  { lineNum: 5, phase: 'traverse', description: 'pA 到达 B 末尾 → null', listA: [2,6,4], listB: [1,5], intersectIdx: -1, intersectIdxB: -1, pA: -1, pB: 2, pAList: 'B', pBList: 'A', found: false },
  { lineNum: 6, phase: 'traverse', description: 'pB 到达 A 末尾 → null', listA: [2,6,4], listB: [1,5], intersectIdx: -1, intersectIdxB: -1, pA: -1, pB: -1, pAList: 'B', pBList: 'A', found: false },
  { lineNum: 7, phase: 'done', description: 'pA == pB == null，没有交叉点，返回 null', listA: [2,6,4], listB: [1,5], intersectIdx: -1, intersectIdxB: -1, pA: -1, pB: -1, pAList: 'B', pBList: 'A', found: false },
];

const phaseLabels = { init: '初始化', traverse: '遍历', switch: '切换链表', done: '完成' };

function buildNode(val, cls, label) {
  return `<div class="ll-node ${cls}"><div class="ll-val">${val}</div>${label ? `<div class="ll-label ${label.cls}">${label.text}</div>` : ''}</div>`;
}

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">链表 A（pA 指针遍历）</div>
      <div class="ll-container" id="ll-a"></div>
    </div>
    <div class="card">
      <div class="section-title">链表 B（pB 指针遍历）</div>
      <div class="ll-container" id="ll-b"></div>
    </div>
    <div class="card">
      <div class="section-title">指针状态</div>
      <div id="ptr-info" style="font-family:var(--font-mono);font-size:13px;color:var(--text-muted);display:flex;gap:20px;flex-wrap:wrap"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>pA</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>pB</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(251,146,60,0.4);border:1px solid #fb923c"></div>交叉点</div>
      </div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '160. Intersection of Two Linked Lists',
  problemDesc: `
    <p>给你两个单链表的头节点 <code>headA</code> 和 <code>headB</code>，请你找出并返回两个单链表相交的起始节点。如果不存在相交节点，返回 <code>null</code>。</p>
    <div class="example">输入：listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], intersectVal = 8
输出：节点 8</div>
  `,
  subtitle: 'listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], intersect at 8',
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '有交叉点', steps: steps1, subtitle: 'intersect at 8' },
    { name: '无交叉点', steps: steps2, subtitle: '[2,6,4] & [1,5] no intersect', setup(panel) { LIST_A = [2,6,4]; LIST_B = [1,5]; INTERSECT_A = -1; INTERSECT_B = -1; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const listA = s.listA || LIST_A;
    const listB = s.listB || LIST_B;
    const intA = s.intersectIdx !== undefined ? s.intersectIdx : INTERSECT_A;
    const intB = s.intersectIdxB !== undefined ? s.intersectIdxB : INTERSECT_B;

    // Render List A
    let htmlA = '';
    for (let i = 0; i < listA.length; i++) {
      let cls = '';
      let label = null;
      if (intA >= 0 && i >= intA) cls += ' is-merged';
      if (s.pAList === 'A' && s.pA === i) { cls += ' is-current'; label = { text: 'pA', cls: 'label-cur' }; }
      if (s.pBList === 'A' && s.pB === i) { cls += ' is-fast'; label = { text: label ? label.text + ' pB' : 'pB', cls: 'label-fast' }; }
      if (s.found && intA >= 0 && i === intA) cls += ' is-carry';
      htmlA += buildNode(listA[i], cls, label);
      if (i < listA.length - 1) htmlA += '<div class="ll-arrow">\u2192</div>';
    }
    htmlA += '<div class="ll-arrow">\u2192</div><div class="ll-null">null</div>';
    document.getElementById('ll-a').innerHTML = htmlA;

    // Render List B
    let htmlB = '';
    for (let i = 0; i < listB.length; i++) {
      let cls = '';
      let label = null;
      if (intB >= 0 && i >= intB) cls += ' is-merged';
      if (s.pAList === 'B' && s.pA === i) { cls += ' is-current'; label = { text: 'pA', cls: 'label-cur' }; }
      if (s.pBList === 'B' && s.pB === i) { cls += ' is-fast'; label = { text: label ? label.text + ' pB' : 'pB', cls: 'label-fast' }; }
      if (s.found && intB >= 0 && i === intB) cls += ' is-carry';
      htmlB += buildNode(listB[i], cls, label);
      if (i < listB.length - 1) htmlB += '<div class="ll-arrow">\u2192</div>';
    }
    htmlB += '<div class="ll-arrow">\u2192</div><div class="ll-null">null</div>';
    document.getElementById('ll-b').innerHTML = htmlB;

    const pAVal = s.pA >= 0 ? (s.pAList === 'A' ? listA[s.pA] : listB[s.pA]) : 'null';
    const pBVal = s.pB >= 0 ? (s.pBList === 'A' ? listA[s.pB] : listB[s.pB]) : 'null';
    document.getElementById('ptr-info').innerHTML = `
      <span style="color:#4ade80">pA = <b>${pAVal}</b>（在链表 ${s.pAList}）</span>
      <span style="color:#38bdf8">pB = <b>${pBVal}</b>（在链表 ${s.pBList}）</span>
    `;

    const resultEl = document.getElementById('result-area');
    if (s.phase === 'done') {
      if (s.found) {
        resultEl.innerHTML = `<div class="card found-box">
          <div class="found-icon" style="color:#4ade80">\u2713</div>
          <div>
            <div class="found-text" style="color:#4ade80">找到交叉节点</div>
            <div class="found-sub">交叉节点值为 ${intA >= 0 ? listA[intA] : '?'}</div>
          </div>
        </div>`;
      } else {
        resultEl.innerHTML = `<div class="card found-box">
          <div class="found-icon" style="color:#f87171">\u2717</div>
          <div>
            <div class="found-text" style="color:#f87171">无交叉点</div>
            <div class="found-sub">两个链表不相交，返回 null</div>
          </div>
        </div>`;
      }
    } else {
      resultEl.innerHTML = '';
    }
  },
};
