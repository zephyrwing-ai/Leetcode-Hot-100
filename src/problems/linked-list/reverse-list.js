let NODES = [1, 2, 3, 4, 5];

const code = [
  'class Solution:',
  '    def reverseList(self, head):',
  '        prev = None',
  '        curr = head',
  '        while curr:',
  '            next_node = curr.next',
  '            curr.next = prev',
  '            prev = curr',
  '            curr = next_node',
  '        return prev',
];

const lineMap = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9 };

// ── Test Case 1: head = [1,2,3,4,5] ──
const steps1 = [
  {
    lineNum: 3, phase: 'init',
    description: '初始化 prev = None',
    nodes: [1, 2, 3, 4, 5], prev: -1, curr: 0, next: -1,
    reversed: [], arrows: [[0,1],[1,2],[2,3],[3,4]],
  },
  {
    lineNum: 4, phase: 'init',
    description: '初始化 curr = head，指向节点 1',
    nodes: [1, 2, 3, 4, 5], prev: -1, curr: 0, next: -1,
    reversed: [], arrows: [[0,1],[1,2],[2,3],[3,4]],
  },
  {
    lineNum: 5, phase: 'check',
    description: 'curr = 节点 1，不为空，进入循环',
    nodes: [1, 2, 3, 4, 5], prev: -1, curr: 0, next: -1,
    reversed: [], arrows: [[0,1],[1,2],[2,3],[3,4]],
  },
  {
    lineNum: 6, phase: 'save',
    description: '保存 next_node = curr.next = 节点 2',
    nodes: [1, 2, 3, 4, 5], prev: -1, curr: 0, next: 1,
    reversed: [], arrows: [[0,1],[1,2],[2,3],[3,4]],
  },
  {
    lineNum: 7, phase: 'reverse',
    description: '反转指针：curr.next = prev，节点 1 指向 None',
    nodes: [1, 2, 3, 4, 5], prev: -1, curr: 0, next: 1,
    reversed: [0], arrows: [[1,2],[2,3],[3,4]],
  },
  {
    lineNum: 8, phase: 'move',
    description: 'prev 移动到 curr（节点 1）',
    nodes: [1, 2, 3, 4, 5], prev: 0, curr: 0, next: 1,
    reversed: [0], arrows: [[1,2],[2,3],[3,4]],
  },
  {
    lineNum: 9, phase: 'move',
    description: 'curr 移动到 next_node（节点 2）',
    nodes: [1, 2, 3, 4, 5], prev: 0, curr: 1, next: 1,
    reversed: [0], arrows: [[1,2],[2,3],[3,4]],
  },
  {
    lineNum: 5, phase: 'check',
    description: 'curr = 节点 2，不为空，继续循环',
    nodes: [1, 2, 3, 4, 5], prev: 0, curr: 1, next: 1,
    reversed: [0], arrows: [[1,2],[2,3],[3,4]],
  },
  {
    lineNum: 6, phase: 'save',
    description: '保存 next_node = curr.next = 节点 3',
    nodes: [1, 2, 3, 4, 5], prev: 0, curr: 1, next: 2,
    reversed: [0], arrows: [[1,2],[2,3],[3,4]],
  },
  {
    lineNum: 7, phase: 'reverse',
    description: '反转指针：curr.next = prev，节点 2 指向节点 1',
    nodes: [1, 2, 3, 4, 5], prev: 0, curr: 1, next: 2,
    reversed: [0, 1], arrows: [[1,0],[2,3],[3,4]],
  },
  {
    lineNum: 8, phase: 'move',
    description: 'prev 移动到 curr（节点 2）',
    nodes: [1, 2, 3, 4, 5], prev: 1, curr: 1, next: 2,
    reversed: [0, 1], arrows: [[1,0],[2,3],[3,4]],
  },
  {
    lineNum: 9, phase: 'move',
    description: 'curr 移动到 next_node（节点 3）',
    nodes: [1, 2, 3, 4, 5], prev: 1, curr: 2, next: 2,
    reversed: [0, 1], arrows: [[1,0],[2,3],[3,4]],
  },
  {
    lineNum: 5, phase: 'check',
    description: 'curr = 节点 3，不为空，继续循环',
    nodes: [1, 2, 3, 4, 5], prev: 1, curr: 2, next: 2,
    reversed: [0, 1], arrows: [[1,0],[2,3],[3,4]],
  },
  {
    lineNum: 6, phase: 'save',
    description: '保存 next_node = curr.next = 节点 4',
    nodes: [1, 2, 3, 4, 5], prev: 1, curr: 2, next: 3,
    reversed: [0, 1], arrows: [[1,0],[2,3],[3,4]],
  },
  {
    lineNum: 7, phase: 'reverse',
    description: '反转指针：curr.next = prev，节点 3 指向节点 2',
    nodes: [1, 2, 3, 4, 5], prev: 1, curr: 2, next: 3,
    reversed: [0, 1, 2], arrows: [[1,0],[2,1],[3,4]],
  },
  {
    lineNum: 8, phase: 'move',
    description: 'prev 移动到 curr（节点 3）',
    nodes: [1, 2, 3, 4, 5], prev: 2, curr: 2, next: 3,
    reversed: [0, 1, 2], arrows: [[1,0],[2,1],[3,4]],
  },
  {
    lineNum: 9, phase: 'move',
    description: 'curr 移动到 next_node（节点 4）',
    nodes: [1, 2, 3, 4, 5], prev: 2, curr: 3, next: 3,
    reversed: [0, 1, 2], arrows: [[1,0],[2,1],[3,4]],
  },
  {
    lineNum: 5, phase: 'check',
    description: 'curr = 节点 4，不为空，继续循环',
    nodes: [1, 2, 3, 4, 5], prev: 2, curr: 3, next: 3,
    reversed: [0, 1, 2], arrows: [[1,0],[2,1],[3,4]],
  },
  {
    lineNum: 6, phase: 'save',
    description: '保存 next_node = curr.next = 节点 5',
    nodes: [1, 2, 3, 4, 5], prev: 2, curr: 3, next: 4,
    reversed: [0, 1, 2], arrows: [[1,0],[2,1],[3,4]],
  },
  {
    lineNum: 7, phase: 'reverse',
    description: '反转指针：curr.next = prev，节点 4 指向节点 3',
    nodes: [1, 2, 3, 4, 5], prev: 2, curr: 3, next: 4,
    reversed: [0, 1, 2, 3], arrows: [[1,0],[2,1],[3,2]],
  },
  {
    lineNum: 8, phase: 'move',
    description: 'prev 移动到 curr（节点 4）',
    nodes: [1, 2, 3, 4, 5], prev: 3, curr: 3, next: 4,
    reversed: [0, 1, 2, 3], arrows: [[1,0],[2,1],[3,2]],
  },
  {
    lineNum: 9, phase: 'move',
    description: 'curr 移动到 next_node（节点 5）',
    nodes: [1, 2, 3, 4, 5], prev: 3, curr: 4, next: 4,
    reversed: [0, 1, 2, 3], arrows: [[1,0],[2,1],[3,2]],
  },
  {
    lineNum: 5, phase: 'check',
    description: 'curr = 节点 5，不为空，继续循环',
    nodes: [1, 2, 3, 4, 5], prev: 3, curr: 4, next: 4,
    reversed: [0, 1, 2, 3], arrows: [[1,0],[2,1],[3,2]],
  },
  {
    lineNum: 6, phase: 'save',
    description: '保存 next_node = curr.next = None',
    nodes: [1, 2, 3, 4, 5], prev: 3, curr: 4, next: -1,
    reversed: [0, 1, 2, 3], arrows: [[1,0],[2,1],[3,2]],
  },
  {
    lineNum: 7, phase: 'reverse',
    description: '反转指针：curr.next = prev，节点 5 指向节点 4',
    nodes: [1, 2, 3, 4, 5], prev: 3, curr: 4, next: -1,
    reversed: [0, 1, 2, 3, 4], arrows: [[1,0],[2,1],[3,2],[4,3]],
  },
  {
    lineNum: 8, phase: 'move',
    description: 'prev 移动到 curr（节点 5）',
    nodes: [1, 2, 3, 4, 5], prev: 4, curr: 4, next: -1,
    reversed: [0, 1, 2, 3, 4], arrows: [[1,0],[2,1],[3,2],[4,3]],
  },
  {
    lineNum: 9, phase: 'move',
    description: 'curr 移动到 next_node（None），循环结束',
    nodes: [1, 2, 3, 4, 5], prev: 4, curr: -1, next: -1,
    reversed: [0, 1, 2, 3, 4], arrows: [[1,0],[2,1],[3,2],[4,3]],
  },
  {
    lineNum: 10, phase: 'done',
    description: '返回 prev（节点 5），反转完成：5 -> 4 -> 3 -> 2 -> 1 -> None',
    nodes: [1, 2, 3, 4, 5], prev: 4, curr: -1, next: -1,
    reversed: [0, 1, 2, 3, 4], arrows: [[4,3],[3,2],[2,1],[1,0]],
  },
];

// ── Test Case 2: head = [1,2,3] ──
const steps2 = [
  {
    lineNum: 3, phase: 'init',
    description: '初始化 prev = None',
    nodes: [1, 2, 3], prev: -1, curr: 0, next: -1,
    reversed: [], arrows: [[0,1],[1,2]],
  },
  {
    lineNum: 4, phase: 'init',
    description: '初始化 curr = head，指向节点 1',
    nodes: [1, 2, 3], prev: -1, curr: 0, next: -1,
    reversed: [], arrows: [[0,1],[1,2]],
  },
  {
    lineNum: 5, phase: 'check',
    description: 'curr = 节点 1，不为空，进入循环',
    nodes: [1, 2, 3], prev: -1, curr: 0, next: -1,
    reversed: [], arrows: [[0,1],[1,2]],
  },
  {
    lineNum: 6, phase: 'save',
    description: '保存 next_node = curr.next = 节点 2',
    nodes: [1, 2, 3], prev: -1, curr: 0, next: 1,
    reversed: [], arrows: [[0,1],[1,2]],
  },
  {
    lineNum: 7, phase: 'reverse',
    description: '反转指针：curr.next = prev，节点 1 指向 None',
    nodes: [1, 2, 3], prev: -1, curr: 0, next: 1,
    reversed: [0], arrows: [[1,2]],
  },
  {
    lineNum: 8, phase: 'move',
    description: 'prev 移动到 curr（节点 1）',
    nodes: [1, 2, 3], prev: 0, curr: 0, next: 1,
    reversed: [0], arrows: [[1,2]],
  },
  {
    lineNum: 9, phase: 'move',
    description: 'curr 移动到 next_node（节点 2）',
    nodes: [1, 2, 3], prev: 0, curr: 1, next: 1,
    reversed: [0], arrows: [[1,2]],
  },
  {
    lineNum: 5, phase: 'check',
    description: 'curr = 节点 2，不为空，继续循环',
    nodes: [1, 2, 3], prev: 0, curr: 1, next: 1,
    reversed: [0], arrows: [[1,2]],
  },
  {
    lineNum: 6, phase: 'save',
    description: '保存 next_node = curr.next = 节点 3',
    nodes: [1, 2, 3], prev: 0, curr: 1, next: 2,
    reversed: [0], arrows: [[1,2]],
  },
  {
    lineNum: 7, phase: 'reverse',
    description: '反转指针：curr.next = prev，节点 2 指向节点 1',
    nodes: [1, 2, 3], prev: 0, curr: 1, next: 2,
    reversed: [0, 1], arrows: [[1,0]],
  },
  {
    lineNum: 8, phase: 'move',
    description: 'prev 移动到 curr（节点 2）',
    nodes: [1, 2, 3], prev: 1, curr: 1, next: 2,
    reversed: [0, 1], arrows: [[1,0]],
  },
  {
    lineNum: 9, phase: 'move',
    description: 'curr 移动到 next_node（节点 3）',
    nodes: [1, 2, 3], prev: 1, curr: 2, next: 2,
    reversed: [0, 1], arrows: [[1,0]],
  },
  {
    lineNum: 5, phase: 'check',
    description: 'curr = 节点 3，不为空，继续循环',
    nodes: [1, 2, 3], prev: 1, curr: 2, next: 2,
    reversed: [0, 1], arrows: [[1,0]],
  },
  {
    lineNum: 6, phase: 'save',
    description: '保存 next_node = curr.next = None',
    nodes: [1, 2, 3], prev: 1, curr: 2, next: -1,
    reversed: [0, 1], arrows: [[1,0]],
  },
  {
    lineNum: 7, phase: 'reverse',
    description: '反转指针：curr.next = prev，节点 3 指向节点 2',
    nodes: [1, 2, 3], prev: 1, curr: 2, next: -1,
    reversed: [0, 1, 2], arrows: [[1,0],[2,1]],
  },
  {
    lineNum: 8, phase: 'move',
    description: 'prev 移动到 curr（节点 3）',
    nodes: [1, 2, 3], prev: 2, curr: 2, next: -1,
    reversed: [0, 1, 2], arrows: [[1,0],[2,1]],
  },
  {
    lineNum: 9, phase: 'move',
    description: 'curr 移动到 next_node（None），循环结束',
    nodes: [1, 2, 3], prev: 2, curr: -1, next: -1,
    reversed: [0, 1, 2], arrows: [[1,0],[2,1]],
  },
  {
    lineNum: 10, phase: 'done',
    description: '返回 prev（节点 3），反转完成：3 -> 2 -> 1 -> None',
    nodes: [1, 2, 3], prev: 2, curr: -1, next: -1,
    reversed: [0, 1, 2], arrows: [[2,1],[1,0]],
  },
];

const phaseLabels = { init: '初始化', check: '检查', save: '保存next', reverse: '反转指针', move: '移动指针', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">链表（prev / curr / next 指针）</div>
      <div class="ll-container" id="ll-area"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(251,146,60,0.4);border:1px solid #fb923c"></div>prev</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>curr</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>next</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(168,85,247,0.4);border:1px solid #a855f7"></div>已反转</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">反转后的链表</div>
      <div class="ll-container" id="ll-reversed"></div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '206. Reverse Linked List',
  problemDesc: `
    <p>给你单链表的头节点 <code>head</code>，请你反转链表，并返回反转后的链表。</p>
    <div class="example">输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]</div>
    <p><strong>提示：</strong>可以迭代或递归地反转链表，链表节点数范围为 <code>[0, 5000]</code>。</p>
  `,
  subtitle: `head = [${NODES}]`,
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'head = [1,2,3,4,5]', steps: steps1, subtitle: 'head = [1,2,3,4,5]' },
    {
      name: 'head = [1,2,3]', steps: steps2, subtitle: 'head = [1,2,3]',
      setup(panel) { NODES = [1,2,3]; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const nodes = s.nodes || NODES;
    let html = '';

    // Build original order nodes
    for (let i = 0; i < nodes.length; i++) {
      let cls = '';
      let label = null;
      if (s.reversed.includes(i)) cls += ' is-reversed';
      if (i === s.prev) { cls += ' is-prev'; label = { text: 'prev', cls: 'label-prev' }; }
      if (i === s.curr) {
        cls += ' is-current';
        if (label) label.text += ' curr';
        else label = { text: 'curr', cls: 'label-cur' };
      }
      if (i === s.next) {
        cls += ' is-fast';
        if (label) label.text += ' next';
        else label = { text: 'next', cls: 'label-fast' };
      }
      html += `<div class="ll-node ${cls}"><div class="ll-val">${nodes[i]}</div>${label ? `<div class="ll-label ${label.cls}">${label.text}</div>` : ''}</div>`;

      // Arrow
      if (i < nodes.length - 1) {
        const hasForward = s.arrows.some(a => a[0] === i && a[1] === i + 1);
        const hasReverse = s.arrows.some(a => a[0] === i + 1 && a[1] === i);
        if (hasReverse) {
          html += '<div class="ll-arrow" style="color:#a855f7">\u2190</div>';
        } else if (hasForward) {
          html += '<div class="ll-arrow">\u2192</div>';
        } else {
          html += '<div class="ll-arrow" style="opacity:0.3">\u00b7\u00b7</div>';
        }
      }
    }
    html += '<div class="ll-arrow">\u2192</div><div class="ll-null">null</div>';
    document.getElementById('ll-area').innerHTML = html;

    // Show reversed list if done
    const revEl = document.getElementById('ll-reversed');
    if (s.phase === 'done') {
      const rev = [...nodes].reverse();
      revEl.innerHTML = rev.map((v, i) => {
        let r = `<div class="ll-node is-reversed"><div class="ll-val">${v}</div></div>`;
        if (i < rev.length - 1) r += '<div class="ll-arrow" style="color:#a855f7">\u2192</div>';
        return r;
      }).join('') + '<div class="ll-arrow">\u2192</div><div class="ll-null">null</div>';
    } else {
      const revCount = s.reversed.length;
      if (revCount > 0) {
        const revNodes = s.reversed.map(idx => nodes[idx]).reverse();
        revEl.innerHTML = revNodes.map((v, i) => {
          let r = `<div class="ll-node is-reversed"><div class="ll-val">${v}</div></div>`;
          if (i < revNodes.length - 1) r += '<div class="ll-arrow" style="color:#a855f7">\u2192</div>';
          return r;
        }).join('') + '<div class="ll-arrow">\u2192</div><div class="ll-null">null</div>';
      } else {
        revEl.innerHTML = '<span style="color:var(--text-muted);font-size:13px">（尚未开始反转）</span>';
      }
    }

    // Result
    const resultEl = document.getElementById('result-area');
    if (s.phase === 'done') {
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:#4ade80;font-size:22px;font-weight:700">\u2713</div>
        <div>
          <div class="found-text" style="color:#4ade80;font-weight:600">反转完成</div>
          <div class="found-sub" style="margin-top:4px">结果: [${[...nodes].reverse().join(', ')}]</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
