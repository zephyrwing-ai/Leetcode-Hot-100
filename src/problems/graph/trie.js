let OPERATIONS = [
  { op: 'insert', arg: 'apple', result: null },
  { op: 'search', arg: 'apple', result: true },
  { op: 'search', arg: 'app', result: false },
  { op: 'startsWith', arg: 'app', result: true },
  { op: 'insert', arg: 'app', result: null },
  { op: 'search', arg: 'app', result: true },
];

const code = [
  'class TrieNode:',
  '    def __init__(self):',
  '        self.children = {}',
  '        self.is_end = False',
  'class Trie:',
  '    def __init__(self):',
  '        self.root = TrieNode()',
  '    def insert(self, word):',
  '        node = self.root',
  '        for ch in word:',
  '            if ch not in node.children:',
  '                node.children[ch] = TrieNode()',
  '            node = node.children[ch]',
  '        node.is_end = True',
  '    def search(self, word):',
  '        node = self.root',
  '        for ch in word:',
  '            if ch not in node.children:',
  '                return False',
  '            node = node.children[ch]',
  '        return node.is_end',
  '    def startsWith(self, prefix):',
  '        node = self.root',
  '        for ch in prefix:',
  '            if ch not in node.children:',
  '                return False',
  '            node = node.children[ch]',
  '        return True',
];

const lineMap = { 4: 1, 5: 2, 6: 3, 7: 4, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9, 13: 10, 14: 11, 15: 12, 16: 13, 17: 14, 18: 15, 19: 16, 20: 17, 21: 18, 22: 19, 23: 20, 24: 21, 25: 22, 26: 23, 27: 24, 28: 25, 29: 26, 30: 27, 31: 28 };

const emptyTrie = { id:'root', ch:'', children:[], isEnd:false };
const trieAfterA = { id:'root', ch:'', children:[{id:'a', ch:'a', children:[], isEnd:false}], isEnd:false };
const trieAfterAP = { id:'root', ch:'', children:[{id:'a', ch:'a', children:[{id:'ap', ch:'p', children:[], isEnd:false}], isEnd:false}], isEnd:false };
const trieAfterAPP = { id:'root', ch:'', children:[{id:'a', ch:'a', children:[{id:'ap', ch:'p', children:[{id:'app', ch:'p', children:[], isEnd:false}], isEnd:false}], isEnd:false}], isEnd:false };
const trieAfterAPPLE = { id:'root', ch:'', children:[{id:'a', ch:'a', children:[{id:'ap', ch:'p', children:[{id:'app', ch:'p', children:[{id:'appl', ch:'l', children:[{id:'apple', ch:'e', children:[], isEnd:true}], isEnd:false}], isEnd:false}], isEnd:false}], isEnd:false}], isEnd:false };
const trieAfterAPPEnd = { id:'root', ch:'', children:[{id:'a', ch:'a', children:[{id:'ap', ch:'p', children:[{id:'app', ch:'p', children:[{id:'appl', ch:'l', children:[{id:'apple', ch:'e', children:[], isEnd:true}], isEnd:false}], isEnd:true}], isEnd:false}], isEnd:false}], isEnd:false };

const steps = [
  // insert("apple")
  { lineNum: 11, phase: 'insert', description: 'insert("apple"): 初始化 node=root', opIdx: 0, trie: emptyTrie, currentPath: [], highlightChar: '', currentNode: 'root', operations: OPERATIONS },
  { lineNum: 15, phase: 'insert', description: 'insert("apple"): 创建节点 a', opIdx: 0, trie: trieAfterA, currentPath: ['a'], highlightChar: 'a', currentNode: 'a', operations: OPERATIONS },
  { lineNum: 15, phase: 'insert', description: 'insert("apple"): 创建节点 p', opIdx: 0, trie: trieAfterAP, currentPath: ['a','p'], highlightChar: 'p', currentNode: 'ap', operations: OPERATIONS },
  { lineNum: 15, phase: 'insert', description: 'insert("apple"): 创建节点 p (第二个)', opIdx: 0, trie: trieAfterAPP, currentPath: ['a','p','p'], highlightChar: 'p', currentNode: 'app', operations: OPERATIONS },
  { lineNum: 15, phase: 'insert', description: 'insert("apple"): 创建节点 l 和 e', opIdx: 0, trie: trieAfterAPPLE, currentPath: ['a','p','p','l','e'], highlightChar: 'e', currentNode: 'apple', operations: OPERATIONS },
  { lineNum: 17, phase: 'insert', description: 'insert("apple"): 标记 e 节点 is_end=True，插入完成', opIdx: 0, trie: trieAfterAPPLE, currentPath: ['a','p','p','l','e'], highlightChar: '', currentNode: 'apple', operations: OPERATIONS },
  // search("apple") -> true
  { lineNum: 18, phase: 'search', description: 'search("apple"): 从 root 开始沿路径查找', opIdx: 1, trie: trieAfterAPPLE, currentPath: ['a'], highlightChar: 'a', currentNode: 'a', operations: OPERATIONS },
  { lineNum: 23, phase: 'search', description: 'search("apple"): 沿 a->p->p->l->e 逐字符匹配', opIdx: 1, trie: trieAfterAPPLE, currentPath: ['a','p','p','l','e'], highlightChar: '', currentNode: 'apple', operations: OPERATIONS },
  { lineNum: 24, phase: 'search', description: 'search("apple"): 到达 e 节点，is_end=True，返回 True', opIdx: 1, trie: trieAfterAPPLE, currentPath: ['a','p','p','l','e'], highlightChar: '', currentNode: 'apple', result: true, operations: OPERATIONS },
  // search("app") -> false
  { lineNum: 18, phase: 'search', description: 'search("app"): 从 root 沿 a->p->p 查找', opIdx: 2, trie: trieAfterAPPLE, currentPath: ['a','p','p'], highlightChar: '', currentNode: 'app', operations: OPERATIONS },
  { lineNum: 24, phase: 'search', description: 'search("app"): 到达第二个 p 节点，is_end=False，返回 False', opIdx: 2, trie: trieAfterAPPLE, currentPath: ['a','p','p'], highlightChar: '', currentNode: 'app', result: false, operations: OPERATIONS },
  // startsWith("app") -> true
  { lineNum: 25, phase: 'prefix', description: 'startsWith("app"): 从 root 沿 a->p->p 查找', opIdx: 3, trie: trieAfterAPPLE, currentPath: ['a','p','p'], highlightChar: '', currentNode: 'app', operations: OPERATIONS },
  { lineNum: 31, phase: 'prefix', description: 'startsWith("app"): 路径存在即返回 True（不检查 is_end）', opIdx: 3, trie: trieAfterAPPLE, currentPath: ['a','p','p'], highlightChar: '', currentNode: 'app', result: true, operations: OPERATIONS },
  // insert("app")
  { lineNum: 11, phase: 'insert', description: 'insert("app"): 沿已有路径 a->p->p 走', opIdx: 4, trie: trieAfterAPPLE, currentPath: ['a','p','p'], highlightChar: 'p', currentNode: 'app', operations: OPERATIONS },
  { lineNum: 17, phase: 'insert', description: 'insert("app"): 标记第二个 p 为 is_end=True', opIdx: 4, trie: trieAfterAPPEnd, currentPath: ['a','p','p'], highlightChar: 'p', currentNode: 'app', operations: OPERATIONS },
  // search("app") -> true
  { lineNum: 18, phase: 'search', description: 'search("app"): 沿 a->p->p 查找', opIdx: 5, trie: trieAfterAPPEnd, currentPath: ['a','p','p'], highlightChar: '', currentNode: 'app', operations: OPERATIONS },
  { lineNum: 24, phase: 'search', description: 'search("app"): is_end=True，返回 True', opIdx: 5, trie: trieAfterAPPEnd, currentPath: ['a','p','p'], highlightChar: '', currentNode: 'app', result: true, operations: OPERATIONS },
];

// Test case 2: different word set
const OPS2 = [
  { op: 'insert', arg: 'cat', result: null },
  { op: 'insert', arg: 'car', result: null },
  { op: 'search', arg: 'car', result: true },
  { op: 'search', arg: 'ca', result: false },
  { op: 'startsWith', arg: 'ca', result: true },
];
const trieCat = { id:'root', ch:'', children:[{id:'c', ch:'c', children:[{id:'ca', ch:'a', children:[{id:'cat', ch:'t', children:[], isEnd:true}], isEnd:false}], isEnd:false}], isEnd:false };
const trieCatCar = { id:'root', ch:'', children:[{id:'c', ch:'c', children:[{id:'ca', ch:'a', children:[{id:'cat', ch:'t', children:[], isEnd:true},{id:'car', ch:'r', children:[], isEnd:true}], isEnd:false}], isEnd:false}], isEnd:false };

const steps2 = [
  { lineNum: 11, phase: 'insert', description: 'insert("cat"): 初始化 node=root', opIdx: 0, trie: emptyTrie, currentPath: [], highlightChar: '', currentNode: 'root', operations: OPS2 },
  { lineNum: 15, phase: 'insert', description: 'insert("cat"): 创建 c->a->t 路径', opIdx: 0, trie: { id:'root', ch:'', children:[{id:'c', ch:'c', children:[{id:'ca', ch:'a', children:[], isEnd:false}], isEnd:false}], isEnd:false }, currentPath: ['c','a'], highlightChar: 'a', currentNode: 'ca', operations: OPS2 },
  { lineNum: 17, phase: 'insert', description: 'insert("cat"): 标记 t 为 is_end=True，完成', opIdx: 0, trie: trieCat, currentPath: ['c','a','t'], highlightChar: 't', currentNode: 'cat', operations: OPS2 },
  { lineNum: 11, phase: 'insert', description: 'insert("car"): 沿已有路径 c->a，在 a 下创建 r', opIdx: 1, trie: trieCat, currentPath: ['c','a'], highlightChar: 'a', currentNode: 'ca', operations: OPS2 },
  { lineNum: 17, phase: 'insert', description: 'insert("car"): 创建 r 节点，标记 is_end=True', opIdx: 1, trie: trieCatCar, currentPath: ['c','a','r'], highlightChar: 'r', currentNode: 'car', operations: OPS2 },
  { lineNum: 18, phase: 'search', description: 'search("car"): 沿 c->a->r 查找', opIdx: 2, trie: trieCatCar, currentPath: ['c','a','r'], highlightChar: '', currentNode: 'car', operations: OPS2 },
  { lineNum: 24, phase: 'search', description: 'search("car"): r 节点 is_end=True，返回 True', opIdx: 2, trie: trieCatCar, currentPath: ['c','a','r'], highlightChar: '', currentNode: 'car', result: true, operations: OPS2 },
  { lineNum: 18, phase: 'search', description: 'search("ca"): 沿 c->a 查找', opIdx: 3, trie: trieCatCar, currentPath: ['c','a'], highlightChar: '', currentNode: 'ca', operations: OPS2 },
  { lineNum: 24, phase: 'search', description: 'search("ca"): a 节点 is_end=False，返回 False', opIdx: 3, trie: trieCatCar, currentPath: ['c','a'], highlightChar: '', currentNode: 'ca', result: false, operations: OPS2 },
  { lineNum: 25, phase: 'prefix', description: 'startsWith("ca"): 沿 c->a 查找', opIdx: 4, trie: trieCatCar, currentPath: ['c','a'], highlightChar: '', currentNode: 'ca', operations: OPS2 },
  { lineNum: 31, phase: 'prefix', description: 'startsWith("ca"): 路径存在，返回 True', opIdx: 4, trie: trieCatCar, currentPath: ['c','a'], highlightChar: '', currentNode: 'ca', result: true, operations: OPS2 },
];

const phaseLabels = { insert: '插入', search: '搜索', prefix: '前缀查找' };

function renderTrieNode(node, x, y, parentX, parentY, svgParts, currentPath, pathSoFar, currentNodeId) {
  const isCurrent = node.id === currentNodeId;
  const isOnPath = currentPath.length > 0 && pathSoFar.length <= currentPath.length &&
    currentPath.slice(0, pathSoFar.length).join('') === pathSoFar.join('');

  let fill = 'rgba(100,116,139,0.3)';
  let stroke = '#64748b';
  if (isCurrent) { fill = 'rgba(56,189,248,0.5)'; stroke = '#38bdf8'; }
  else if (isOnPath) { fill = 'rgba(56,189,248,0.2)'; stroke = '#38bdf8'; }
  if (node.isEnd) { stroke = '#10b981'; if (!isCurrent) fill = 'rgba(16,185,129,0.3)'; }

  if (parentX !== null) {
    svgParts.push(`<line x1="${parentX}" y1="${parentY+16}" x2="${x}" y2="${y-16}" stroke="rgba(148,163,184,0.4)" stroke-width="1.5"/>`);
  }

  svgParts.push(`<circle cx="${x}" cy="${y}" r="16" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`);
  const label = node.ch || 'R';
  svgParts.push(`<text x="${x}" y="${y+1}" text-anchor="middle" dominant-baseline="middle" fill="white" font-size="12" font-weight="600">${label}</text>`);
  if (node.isEnd) {
    svgParts.push(`<text x="${x+18}" y="${y-8}" fill="#10b981" font-size="9">END</text>`);
  }

  const childCount = node.children.length;
  const spacing = 50;
  const startX = x - (childCount - 1) * spacing / 2;
  node.children.forEach((child, i) => {
    const cx = startX + i * spacing;
    const cy = y + 55;
    const newPath = [...pathSoFar, child.ch];
    renderTrieNode(child, cx, cy, x, y, svgParts, currentPath, newPath, currentNodeId);
  });
}

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">Trie 树结构（绿色=终止节点, 青色=当前路径）</div>
      <svg id="trie-svg" width="300" height="340" style="display:block;margin:0 auto"></svg>
    </div>
    <div class="card">
      <div class="section-title">操作序列</div>
      <div id="ops-list"></div>
    </div>
    <div id="result-area"></div>
  `;
}

export default {
  title: '208. Implement Trie -- 执行可视化',
  problemDesc: `
    <p>实现 <code>Trie</code>（前缀树），包含 <code>insert</code>、<code>search</code> 和 <code>startsWith</code> 三个操作。</p>
    <div class="example">输入：["Trie","insert","search","search","startsWith","insert","search"]
[[],["apple"],["apple"],["app"],["app"],["app"],["app"]]
输出：[null,null,true,false,true,null,true]</div>
  `,
  subtitle: 'insert/search/startsWith 操作序列',
  code, lineMap, steps, phaseLabels,

  testCases: [
    {
      name: '标准用例: apple/app',
      steps: steps,
      subtitle: 'insert/search apple & app',
    },
    {
      name: '不同词集: cat/car',
      steps: steps2,
      subtitle: 'insert cat,car / search / startsWith',
      setup(panel) { setupPanel(panel); },
    },
  ],

  setup(panel) {
    setupPanel(panel);
  },

  render(s) {
    const ops = s.operations || OPERATIONS;

    // Trie SVG
    const svg = document.getElementById('trie-svg');
    const parts = [];
    renderTrieNode(s.trie, 150, 30, null, null, parts, s.currentPath, [], s.currentNode);
    svg.innerHTML = parts.join('');

    // Operations list
    const opsEl = document.getElementById('ops-list');
    opsEl.innerHTML = ops.map((op, i) => {
      let style = 'display:inline-block;margin:3px;padding:4px 10px;border-radius:6px;font-size:12px;font-family:monospace;';
      if (i === s.opIdx) style += 'background:rgba(56,189,248,0.3);border:1px solid #38bdf8;';
      else if (i < s.opIdx) style += 'background:rgba(16,185,129,0.2);border:1px solid rgba(16,185,129,0.3);opacity:0.7;';
      else style += 'background:rgba(100,116,139,0.2);border:1px solid rgba(100,116,139,0.3);opacity:0.5;';
      const resStr = op.result !== null ? ` \u2192 ${op.result}` : '';
      return `<span style="${style}">${op.op}("${op.arg}")${resStr}</span>`;
    }).join('');

    // Result
    const resultEl = document.getElementById('result-area');
    if (s.result !== undefined) {
      const icon = s.result ? '\u2713' : '\u2717';
      const color = s.result ? '#10b981' : '#ef4444';
      resultEl.innerHTML = `<div class="card found-box"><div class="found-icon" style="color:${color}">${icon}</div><div><div class="found-text">${ops[s.opIdx].op}("${ops[s.opIdx].arg}") = ${s.result}</div></div></div>`;
    } else {
      resultEl.innerHTML = '';
    }
  },
};
