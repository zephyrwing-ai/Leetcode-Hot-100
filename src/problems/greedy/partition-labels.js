let S = 'ababcbacadefegdehijhklij';
let CHARS = S.split('');

const code = [
  'class Solution:',
  '    def partitionLabels(self, s):',
  '        last = {}',
  '        for i, c in enumerate(s):',
  '            last[c] = i',
  '        result = []',
  '        start = 0',
  '        end = 0',
  '        for i, c in enumerate(s):',
  '            end = max(end, last[c])',
  '            if i == end:',
  '                result.append(end-start+1)',
  '                start = i + 1',
  '        return result',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11, 13: 12, 14: 13 };

// Pre-compute last occurrence map for test case 1
const lastMap1 = {};
for (let i = 0; i < 'ababcbacadefegdehijhklij'.length; i++) lastMap1['ababcbacadefegdehijhklij'[i]] = i;

// ── Test Case 1: s = "ababcbacadefegdehijhklij" ──
const steps1 = [
  {
    lineNum: 3, phase: 'init',
    description: '初始化 last 哈希表',
    currentI: -1, lastMap: {}, start: 0, end: 0, result: [], phase2: false, building: false, justAdded: null, s: 'ababcbacadefegdehijhklij',
  },
  {
    lineNum: 4, phase: 'init',
    description: '第一轮遍历：记录每个字符最后出现的位置',
    currentI: -1, lastMap: {}, start: 0, end: 0, result: [], phase2: false, building: true, justAdded: null, s: 'ababcbacadefegdehijhklij',
  },
  {
    lineNum: 5, phase: 'init',
    description: '构建完成 last 表：a->8, b->5, c->7, d->14, e->15, f->11, g->13, h->19, i->22, j->23, k->20, l->21',
    currentI: -1, lastMap: {...lastMap1}, start: 0, end: 0, result: [], phase2: false, building: false, justAdded: null, s: 'ababcbacadefegdehijhklij',
  },
  {
    lineNum: 7, phase: 'init',
    description: '初始化 start=0, end=0, result=[]，开始第二轮遍历',
    currentI: -1, lastMap: {...lastMap1}, start: 0, end: 0, result: [], phase2: true, building: false, justAdded: null, s: 'ababcbacadefegdehijhklij',
  },
  // Partition 1: indices 0-8
  {
    lineNum: 9, phase: 'scan',
    description: 'i=0, c="a", last["a"]=8, end = max(0,8) = 8',
    currentI: 0, lastMap: {...lastMap1}, start: 0, end: 8, result: [], phase2: true, building: false, justAdded: 'a', s: 'ababcbacadefegdehijhklij',
  },
  {
    lineNum: 9, phase: 'scan',
    description: 'i=1, c="b", last["b"]=5, end = max(8,5) = 8',
    currentI: 1, lastMap: {...lastMap1}, start: 0, end: 8, result: [], phase2: true, building: false, justAdded: 'b', s: 'ababcbacadefegdehijhklij',
  },
  {
    lineNum: 9, phase: 'scan',
    description: 'i=2, c="a", last["a"]=8, end = max(8,8) = 8',
    currentI: 2, lastMap: {...lastMap1}, start: 0, end: 8, result: [], phase2: true, building: false, justAdded: 'a', s: 'ababcbacadefegdehijhklij',
  },
  {
    lineNum: 9, phase: 'scan',
    description: 'i=4, c="c", last["c"]=7, end = max(8,7) = 8，继续扫描到 i=8',
    currentI: 4, lastMap: {...lastMap1}, start: 0, end: 8, result: [], phase2: true, building: false, justAdded: 'c', s: 'ababcbacadefegdehijhklij',
  },
  {
    lineNum: 11, phase: 'record',
    description: 'i=8 == end=8，分割！区间 [0,8] 长度=9，加入 result',
    currentI: 8, lastMap: {...lastMap1}, start: 0, end: 8, result: [9], phase2: true, building: false, justAdded: null, s: 'ababcbacadefegdehijhklij',
  },
  // Partition 2: indices 9-15
  {
    lineNum: 9, phase: 'scan',
    description: 'i=9, c="d", last["d"]=14, end = max(9,14) = 14，新分区开始 start=9',
    currentI: 9, lastMap: {...lastMap1}, start: 9, end: 14, result: [9], phase2: true, building: false, justAdded: 'd', s: 'ababcbacadefegdehijhklij',
  },
  {
    lineNum: 9, phase: 'scan',
    description: 'i=10, c="e", last["e"]=15, end = max(14,15) = 15',
    currentI: 10, lastMap: {...lastMap1}, start: 9, end: 15, result: [9], phase2: true, building: false, justAdded: 'e', s: 'ababcbacadefegdehijhklij',
  },
  {
    lineNum: 9, phase: 'scan',
    description: 'i=11, c="f", last["f"]=11, end = max(15,11) = 15，继续扫描到 i=15',
    currentI: 11, lastMap: {...lastMap1}, start: 9, end: 15, result: [9], phase2: true, building: false, justAdded: 'f', s: 'ababcbacadefegdehijhklij',
  },
  {
    lineNum: 11, phase: 'record',
    description: 'i=15 == end=15，分割！区间 [9,15] 长度=7，加入 result',
    currentI: 15, lastMap: {...lastMap1}, start: 9, end: 15, result: [9, 7], phase2: true, building: false, justAdded: null, s: 'ababcbacadefegdehijhklij',
  },
  // Partition 3: indices 16-23
  {
    lineNum: 9, phase: 'scan',
    description: 'i=16, c="h", last["h"]=19, end = max(16,19) = 19，新分区开始 start=16',
    currentI: 16, lastMap: {...lastMap1}, start: 16, end: 19, result: [9, 7], phase2: true, building: false, justAdded: 'h', s: 'ababcbacadefegdehijhklij',
  },
  {
    lineNum: 9, phase: 'scan',
    description: 'i=17, c="i", last["i"]=22, end = max(19,22) = 22',
    currentI: 17, lastMap: {...lastMap1}, start: 16, end: 22, result: [9, 7], phase2: true, building: false, justAdded: 'i', s: 'ababcbacadefegdehijhklij',
  },
  {
    lineNum: 9, phase: 'scan',
    description: 'i=18, c="j", last["j"]=23, end = max(22,23) = 23',
    currentI: 18, lastMap: {...lastMap1}, start: 16, end: 23, result: [9, 7], phase2: true, building: false, justAdded: 'j', s: 'ababcbacadefegdehijhklij',
  },
  {
    lineNum: 9, phase: 'scan',
    description: 'i=19~22 扫描 k,l,i,j，end 保持 23，继续到 i=23',
    currentI: 22, lastMap: {...lastMap1}, start: 16, end: 23, result: [9, 7], phase2: true, building: false, justAdded: 'i', s: 'ababcbacadefegdehijhklij',
  },
  {
    lineNum: 11, phase: 'record',
    description: 'i=23 == end=23，分割！区间 [16,23] 长度=8，加入 result',
    currentI: 23, lastMap: {...lastMap1}, start: 16, end: 23, result: [9, 7, 8], phase2: true, building: false, justAdded: null, s: 'ababcbacadefegdehijhklij',
  },
  {
    lineNum: 14, phase: 'return',
    description: '遍历结束，返回 result = [9, 7, 8]',
    currentI: -1, lastMap: {...lastMap1}, start: 16, end: 23, result: [9, 7, 8], phase2: true, building: false, justAdded: null, s: 'ababcbacadefegdehijhklij',
  },
];

// Pre-compute last occurrence map for test case 2
const lastMap2 = {};
for (let i = 0; i < 'eccbbbbdec'.length; i++) lastMap2['eccbbbbdec'[i]] = i;

// ── Test Case 2: s = "eccbbbbdec" ──
const steps2 = [
  {
    lineNum: 3, phase: 'init',
    description: '初始化 last 哈希表',
    currentI: -1, lastMap: {}, start: 0, end: 0, result: [], phase2: false, building: false, justAdded: null, s: 'eccbbbbdec',
  },
  {
    lineNum: 5, phase: 'init',
    description: '构建完成 last 表：e->8, c->9, b->6, d->7',
    currentI: -1, lastMap: {...lastMap2}, start: 0, end: 0, result: [], phase2: false, building: false, justAdded: null, s: 'eccbbbbdec',
  },
  {
    lineNum: 7, phase: 'init',
    description: '初始化 start=0, end=0, result=[]，开始第二轮遍历',
    currentI: -1, lastMap: {...lastMap2}, start: 0, end: 0, result: [], phase2: true, building: false, justAdded: null, s: 'eccbbbbdec',
  },
  {
    lineNum: 9, phase: 'scan',
    description: 'i=0, c="e", last["e"]=8, end = max(0,8) = 8',
    currentI: 0, lastMap: {...lastMap2}, start: 0, end: 8, result: [], phase2: true, building: false, justAdded: 'e', s: 'eccbbbbdec',
  },
  {
    lineNum: 9, phase: 'scan',
    description: 'i=1, c="c", last["c"]=9, end = max(8,9) = 9',
    currentI: 1, lastMap: {...lastMap2}, start: 0, end: 9, result: [], phase2: true, building: false, justAdded: 'c', s: 'eccbbbbdec',
  },
  {
    lineNum: 9, phase: 'scan',
    description: 'i=2, c="c", last["c"]=9, end = max(9,9) = 9',
    currentI: 2, lastMap: {...lastMap2}, start: 0, end: 9, result: [], phase2: true, building: false, justAdded: 'c', s: 'eccbbbbdec',
  },
  {
    lineNum: 9, phase: 'scan',
    description: 'i=3, c="b", last["b"]=6, end = max(9,6) = 9',
    currentI: 3, lastMap: {...lastMap2}, start: 0, end: 9, result: [], phase2: true, building: false, justAdded: 'b', s: 'eccbbbbdec',
  },
  {
    lineNum: 9, phase: 'scan',
    description: 'i=4~6 扫描 b,b,b，end 保持 9',
    currentI: 6, lastMap: {...lastMap2}, start: 0, end: 9, result: [], phase2: true, building: false, justAdded: 'b', s: 'eccbbbbdec',
  },
  {
    lineNum: 9, phase: 'scan',
    description: 'i=7, c="d", last["d"]=7, end = max(9,7) = 9，继续',
    currentI: 7, lastMap: {...lastMap2}, start: 0, end: 9, result: [], phase2: true, building: false, justAdded: 'd', s: 'eccbbbbdec',
  },
  {
    lineNum: 9, phase: 'scan',
    description: 'i=8, c="e", last["e"]=8, end = max(9,8) = 9，继续',
    currentI: 8, lastMap: {...lastMap2}, start: 0, end: 9, result: [], phase2: true, building: false, justAdded: 'e', s: 'eccbbbbdec',
  },
  {
    lineNum: 11, phase: 'record',
    description: 'i=9 == end=9，分割！区间 [0,9] 长度=10，整个字符串是一个分区',
    currentI: 9, lastMap: {...lastMap2}, start: 0, end: 9, result: [10], phase2: true, building: false, justAdded: null, s: 'eccbbbbdec',
  },
  {
    lineNum: 14, phase: 'return',
    description: '遍历结束，返回 result = [10]，所有字符交织在一起无法分割',
    currentI: -1, lastMap: {...lastMap2}, start: 0, end: 9, result: [10], phase2: true, building: false, justAdded: null, s: 'eccbbbbdec',
  },
];

const phaseLabels = { init: '初始化', scan: '扫描', record: '记录', return: '返回' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">字符数组（当前分区高亮，黄色 = 当前位置）</div>
      <div class="array-row" id="char-array" style="gap:2px"></div>
    </div>
    <div class="card">
      <div class="section-title">last 表（字符 -> 最后出现位置）</div>
      <div class="hm-chips-row" id="last-map-area"></div>
    </div>
    <div class="card">
      <div class="section-title">状态追踪</div>
      <div id="status-area" style="font-family:var(--font-mono);font-size:14px;display:flex;flex-direction:column;gap:8px"></div>
    </div>
    <div class="card">
      <div class="section-title">分区结果 result</div>
      <div id="result-area" style="font-family:var(--font-mono);font-size:14px"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '763. Partition Labels',
  problemDesc: `
    <p>给你一个字符串 <code>s</code>，把它划分为尽可能多的片段，同一字母最多出现在一个片段中。返回一个表示每个片段长度的列表。</p>
    <div class="example">输入：s = "ababcbacadefegdehijhklij"
输出：[9,7,8]
解释：划分为 "ababcbaca"、"defegde"、"hijhklij"，每个字母最多出现在一个片段中</div>
    <p>划分结果拼接后应等于原字符串，且片段数尽可能多。</p>
  `,
  subtitle: `s = "${S}"`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: 's = "ababcbaca..."', steps: steps1, subtitle: 's = "ababcbacadefegdehijhklij"' },
    {
      name: 's = "eccbbbbdec"', steps: steps2, subtitle: 's = "eccbbbbdec"',
      setup(panel) { S = 'eccbbbbdec'; CHARS = S.split(''); setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const str = s.s || S;
    const chars = str.split('');
    // char array
    document.getElementById('char-array').innerHTML = chars.map((c, idx) => {
      let cls = 'arr-cell';
      if (s.phase2 && idx >= s.start && idx <= s.end) cls += ' in-window';
      if (idx === s.currentI) cls += ' is-active';
      // Mark partition boundaries from result
      let boundary = '';
      let cumLen = 0;
      for (const len of s.result) {
        cumLen += len;
        if (idx === cumLen - 1 && cumLen <= chars.length) {
          boundary = '<div style="position:absolute;right:-2px;top:0;bottom:0;width:2px;background:#4ade80"></div>';
        }
      }
      return `<div class="${cls}" style="min-width:28px;position:relative"><div class="arr-val" style="width:28px;height:30px;font-size:12px">${c}</div><div class="arr-idx" style="font-size:9px">${idx}</div>${boundary}</div>`;
    }).join('');

    // last map chips
    const lmEl = document.getElementById('last-map-area');
    const lmEntries = Object.entries(s.lastMap);
    if (lmEntries.length === 0) {
      lmEl.innerHTML = '<div class="hashmap-empty">（尚未构建）</div>';
    } else {
      lmEl.innerHTML = lmEntries.map(([k, v]) => {
        let cls = 'hm-chip-block';
        if (s.justAdded === k) cls += ' just-added';
        return `<div class="${cls}"><span class="hm-chip-key">${k}</span><span class="hm-chip-val">${v}</span></div>`;
      }).join('');
    }

    // status
    const statusEl = document.getElementById('status-area');
    if (s.phase2) {
      statusEl.innerHTML = `
        <div>start = <span style="font-weight:700;color:#38bdf8">${s.start}</span>，end = <span style="font-weight:700;color:#4ade80">${s.end}</span></div>
        ${s.currentI >= 0 ? `<div style="color:var(--text-muted)">当前 i=${s.currentI}, c="${chars[s.currentI]}", last["${chars[s.currentI]}"]=${s.lastMap[chars[s.currentI]]}</div>` : ''}
      `;
    } else {
      statusEl.innerHTML = '<div style="color:var(--text-muted)">正在构建 last 表...</div>';
    }

    // result
    const resultEl = document.getElementById('result-area');
    if (s.result.length === 0) {
      resultEl.innerHTML = '<span style="color:var(--text-muted);font-style:italic">（空）</span>';
    } else {
      resultEl.innerHTML = s.result.map((v, i) => {
        const fresh = (s.lineNum === 11 || s.lineNum === 14) && i === s.result.length - 1 && s.lineNum !== 14 ? ' fresh' : '';
        return `<span class="chip${fresh}" style="margin-right:6px">${v}</span>`;
      }).join('');
    }

    // found
    const foundEl = document.getElementById('found-area');
    if (s.phase === 'return') {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">result = [${s.result.join(', ')}]</div>
          <div class="found-sub">${s.result.length} 个分区</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
