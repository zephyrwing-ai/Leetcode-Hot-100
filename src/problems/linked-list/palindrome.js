let NODES_DATA = [1, 2, 2, 1];

const code = [
  'class Solution:',
  '    def isPalindrome(self, head):',
  '        slow = fast = head',
  '        while fast and fast.next:',
  '            slow = slow.next',
  '            fast = fast.next.next',
  '        prev = None',
  '        while slow:',
  '            slow.next, prev, slow = prev, slow, slow.next',
  '        while prev:',
  '            if prev.val != head.val:',
  '                return False',
  '            prev = prev.next',
  '            head = head.next',
  '        return True',
];

const lineMap = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11, 13: 12, 14: 13, 15: 14 };

const steps1 = [
  { lineNum: 3, phase: 'init', description: '初始化 slow = fast = head，都指向节点 1', nodes: [1, 2, 2, 1], slow: 0, fast: 0, prev: -1, head: 0, stage: 'find-mid', reversed: [], comparing: false, compResult: null },
  { lineNum: 4, phase: 'find-mid', description: 'fast=节点1 且 fast.next=节点2，条件成立', nodes: [1, 2, 2, 1], slow: 0, fast: 0, prev: -1, head: 0, stage: 'find-mid', reversed: [], comparing: false, compResult: null },
  { lineNum: 5, phase: 'find-mid', description: 'slow 移动一步到节点 2', nodes: [1, 2, 2, 1], slow: 1, fast: 0, prev: -1, head: 0, stage: 'find-mid', reversed: [], comparing: false, compResult: null },
  { lineNum: 6, phase: 'find-mid', description: 'fast 移动两步到节点 2（索引2）', nodes: [1, 2, 2, 1], slow: 1, fast: 2, prev: -1, head: 0, stage: 'find-mid', reversed: [], comparing: false, compResult: null },
  { lineNum: 4, phase: 'find-mid', description: 'fast=节点2 且 fast.next=节点1，条件成立', nodes: [1, 2, 2, 1], slow: 1, fast: 2, prev: -1, head: 0, stage: 'find-mid', reversed: [], comparing: false, compResult: null },
  { lineNum: 5, phase: 'find-mid', description: 'slow 移动到索引 2，到达中间位置', nodes: [1, 2, 2, 1], slow: 2, fast: 2, prev: -1, head: 0, stage: 'find-mid', reversed: [], comparing: false, compResult: null },
  { lineNum: 6, phase: 'find-mid', description: 'fast 移动两步，超出末尾', nodes: [1, 2, 2, 1], slow: 2, fast: -1, prev: -1, head: 0, stage: 'find-mid', reversed: [], comparing: false, compResult: null },
  { lineNum: 4, phase: 'find-mid', description: 'fast 为 None，退出找中点循环，slow 在索引 2', nodes: [1, 2, 2, 1], slow: 2, fast: -1, prev: -1, head: 0, stage: 'find-mid', reversed: [], comparing: false, compResult: null },
  { lineNum: 7, phase: 'reverse', description: '开始反转后半部分，初始化 prev = None', nodes: [1, 2, 2, 1], slow: 2, fast: -1, prev: -1, head: 0, stage: 'reverse', reversed: [], comparing: false, compResult: null },
  { lineNum: 9, phase: 'reverse', description: '反转：节点2(索引2)指向prev(None)，prev=索引2，slow→索引3', nodes: [1, 2, 2, 1], slow: 3, fast: -1, prev: 2, head: 0, stage: 'reverse', reversed: [2], comparing: false, compResult: null },
  { lineNum: 9, phase: 'reverse', description: '反转：节点1(索引3)指向prev(节点2)，prev=索引3，slow→None', nodes: [1, 2, 2, 1], slow: -1, fast: -1, prev: 3, head: 0, stage: 'reverse', reversed: [2, 3], comparing: false, compResult: null },
  { lineNum: 8, phase: 'reverse', description: 'slow 为 None，反转完成。后半部分: 1→2→None', nodes: [1, 2, 2, 1], slow: -1, fast: -1, prev: 3, head: 0, stage: 'reverse', reversed: [2, 3], comparing: false, compResult: null },
  { lineNum: 11, phase: 'compare', description: '比较 prev.val=1 和 head.val=1，相等！', nodes: [1, 2, 2, 1], slow: -1, fast: -1, prev: 3, head: 0, stage: 'compare', reversed: [2, 3], comparing: true, compResult: 'match' },
  { lineNum: 13, phase: 'compare', description: 'prev 移到下一个（索引2，值2）', nodes: [1, 2, 2, 1], slow: -1, fast: -1, prev: 2, head: 0, stage: 'compare', reversed: [2, 3], comparing: true, compResult: null },
  { lineNum: 14, phase: 'compare', description: 'head 移到下一个（索引1，值2）', nodes: [1, 2, 2, 1], slow: -1, fast: -1, prev: 2, head: 1, stage: 'compare', reversed: [2, 3], comparing: true, compResult: null },
  { lineNum: 11, phase: 'compare', description: '比较 prev.val=2 和 head.val=2，相等！', nodes: [1, 2, 2, 1], slow: -1, fast: -1, prev: 2, head: 1, stage: 'compare', reversed: [2, 3], comparing: true, compResult: 'match' },
  { lineNum: 13, phase: 'compare', description: 'prev 移到 None，比较完毕', nodes: [1, 2, 2, 1], slow: -1, fast: -1, prev: -1, head: 1, stage: 'compare', reversed: [2, 3], comparing: true, compResult: null },
  { lineNum: 15, phase: 'done', description: '所有节点都匹配，是回文链表！返回 True', nodes: [1, 2, 2, 1], slow: -1, fast: -1, prev: -1, head: -1, stage: 'done', reversed: [2, 3], comparing: false, compResult: 'palindrome' },
];

// Test case 2: [1, 2] → false
// slow/fast: slow→1, fast→null after one iteration. slow at index 1
// reverse: node 2 → None. prev = index 1.
// compare: prev.val=2 vs head.val=1, not equal → false
const steps2 = [
  { lineNum: 3, phase: 'init', description: '初始化 slow = fast = head，指向节点 1', nodes: [1, 2], slow: 0, fast: 0, prev: -1, head: 0, stage: 'find-mid', reversed: [], comparing: false, compResult: null },
  { lineNum: 4, phase: 'find-mid', description: 'fast=1 且 fast.next=2，条件成立', nodes: [1, 2], slow: 0, fast: 0, prev: -1, head: 0, stage: 'find-mid', reversed: [], comparing: false, compResult: null },
  { lineNum: 5, phase: 'find-mid', description: 'slow → 节点 2（索引1）', nodes: [1, 2], slow: 1, fast: 0, prev: -1, head: 0, stage: 'find-mid', reversed: [], comparing: false, compResult: null },
  { lineNum: 6, phase: 'find-mid', description: 'fast 移动两步 → null', nodes: [1, 2], slow: 1, fast: -1, prev: -1, head: 0, stage: 'find-mid', reversed: [], comparing: false, compResult: null },
  { lineNum: 4, phase: 'find-mid', description: 'fast 为 None，退出循环。slow 在索引 1', nodes: [1, 2], slow: 1, fast: -1, prev: -1, head: 0, stage: 'find-mid', reversed: [], comparing: false, compResult: null },
  { lineNum: 7, phase: 'reverse', description: '开始反转后半部分', nodes: [1, 2], slow: 1, fast: -1, prev: -1, head: 0, stage: 'reverse', reversed: [], comparing: false, compResult: null },
  { lineNum: 9, phase: 'reverse', description: '反转：节点2指向None，prev=索引1，slow→None', nodes: [1, 2], slow: -1, fast: -1, prev: 1, head: 0, stage: 'reverse', reversed: [1], comparing: false, compResult: null },
  { lineNum: 8, phase: 'reverse', description: 'slow 为 None，反转完成', nodes: [1, 2], slow: -1, fast: -1, prev: 1, head: 0, stage: 'reverse', reversed: [1], comparing: false, compResult: null },
  { lineNum: 11, phase: 'compare', description: '比较 prev.val=2 和 head.val=1，不相等！', nodes: [1, 2], slow: -1, fast: -1, prev: 1, head: 0, stage: 'compare', reversed: [1], comparing: true, compResult: 'mismatch' },
  { lineNum: 12, phase: 'done', description: '发现不匹配，不是回文链表，返回 False', nodes: [1, 2], slow: -1, fast: -1, prev: 1, head: 0, stage: 'done', reversed: [1], comparing: false, compResult: 'not-palindrome' },
];

const phaseLabels = { init: '初始化', 'find-mid': '找中点', reverse: '反转后半', compare: '比较', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">链表（slow / fast 指针找中点）</div>
      <div class="ll-container" id="ll-area"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>slow</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>fast</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(168,85,247,0.4);border:1px solid #a855f7"></div>已反转</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(251,146,60,0.4);border:1px solid #fb923c"></div>比较中</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">比较结果</div>
      <div id="compare-area" style="font-family:var(--font-mono);font-size:14px;color:var(--text-muted)"></div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '234. Palindrome Linked List',
  problemDesc: `
    <p>给你一个单链表的头节点 <code>head</code>，请你判断该链表是否为回文链表。</p>
    <div class="example">输入：head = [1,2,2,1]
输出：true</div>
    <p><strong>提示：</strong>O(n) 时间，O(1) 空间。</p>
  `,
  subtitle: 'head = [1, 2, 2, 1]',
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '回文 (true)', steps: steps1, subtitle: '[1,2,2,1]' },
    { name: '非回文 (false)', steps: steps2, subtitle: '[1,2]', setup(panel) { NODES_DATA = [1, 2]; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const nodes = s.nodes || NODES_DATA;
    let html = '';
    for (let i = 0; i < nodes.length; i++) {
      let cls = '';
      let label = null;
      if (s.reversed.includes(i)) cls += ' is-reversed';
      if (s.comparing && (i === s.prev || i === s.head)) cls += ' is-carry';
      if (i === s.slow && s.slow >= 0) { cls += ' is-slow'; label = { text: 'slow', cls: 'label-slow' }; }
      if (i === s.fast && s.fast >= 0) {
        cls += ' is-fast';
        if (label) label.text += ' fast';
        else label = { text: 'fast', cls: 'label-fast' };
      }
      if (s.stage === 'compare' || s.stage === 'reverse') {
        if (i === s.prev && s.prev >= 0) { cls += ' is-prev'; label = { text: 'prev', cls: 'label-prev' }; }
        if (i === s.head && s.head >= 0) {
          if (label && i === s.prev) label.text += ' head';
          else if (!label || i !== s.prev) label = { text: 'head', cls: 'label-cur' };
        }
      }
      html += `<div class="ll-node ${cls}"><div class="ll-val">${nodes[i]}</div>${label ? `<div class="ll-label ${label.cls}">${label.text}</div>` : ''}</div>`;
      if (i < nodes.length - 1) html += '<div class="ll-arrow">\u2192</div>';
    }
    html += '<div class="ll-arrow">\u2192</div><div class="ll-null">null</div>';
    document.getElementById('ll-area').innerHTML = html;

    const compEl = document.getElementById('compare-area');
    if (s.compResult === 'match') {
      const prevVal = s.prev >= 0 ? nodes[s.prev] : '?';
      const headVal = s.head >= 0 ? nodes[s.head] : '?';
      compEl.innerHTML = `<span style="color:#4ade80;font-weight:600">${prevVal} == ${headVal} \u2713</span>`;
    } else if (s.compResult === 'mismatch') {
      const prevVal = s.prev >= 0 ? nodes[s.prev] : '?';
      const headVal = s.head >= 0 ? nodes[s.head] : '?';
      compEl.innerHTML = `<span style="color:#f87171;font-weight:600">${prevVal} != ${headVal} \u2717</span>`;
    } else if (s.compResult === 'palindrome') {
      compEl.innerHTML = '<span style="color:#4ade80;font-weight:700">\u56de\u6587\uff01</span>';
    } else if (s.compResult === 'not-palindrome') {
      compEl.innerHTML = '<span style="color:#f87171;font-weight:700">\u4e0d\u662f\u56de\u6587</span>';
    } else if (s.stage === 'compare') {
      compEl.innerHTML = '<span>\u6bd4\u8f83\u4e2d...</span>';
    } else if (s.stage === 'find-mid') {
      compEl.innerHTML = '<span>\u5bfb\u627e\u4e2d\u70b9...</span>';
    } else if (s.stage === 'reverse') {
      compEl.innerHTML = '<span>\u53cd\u8f6c\u540e\u534a\u90e8\u5206...</span>';
    } else {
      compEl.innerHTML = '';
    }

    const resultEl = document.getElementById('result-area');
    if (s.phase === 'done') {
      const isPalin = s.compResult === 'palindrome';
      resultEl.innerHTML = `<div class="card found-box">
        <div class="found-icon" style="color:${isPalin ? '#4ade80' : '#f87171'}">${isPalin ? '\u2713' : '\u2717'}</div>
        <div>
          <div class="found-text" style="color:${isPalin ? '#4ade80' : '#f87171'}">${isPalin ? '\u662f\u56de\u6587\u94fe\u8868' : '\u4e0d\u662f\u56de\u6587\u94fe\u8868'}</div>
          <div class="found-sub">[${nodes.join(', ')}] \u8fd4\u56de ${isPalin ? 'True' : 'False'}</div>
        </div>
      </div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
